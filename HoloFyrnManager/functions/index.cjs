const {initializeApp}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');
const {getFirestore}=require('firebase-admin/firestore');
const {onCall,HttpsError}=require('firebase-functions/v2/https');
initializeApp();
// An independently assigned Auth claim is required: legacy Firestore rules let
// clients write profile roles, so a profile role alone cannot authorize deletion.
exports.deleteManagerAccount=onCall({region:'europe-west1',maxInstances:2},async request=>{
  if(!request.auth)throw new HttpsError('unauthenticated','Sign in first.');
  if(request.auth.token.accountAdmin!==true)throw new HttpsError('permission-denied','Account deletion permission has not been enabled for this administrator.');
  const id=request.data?.userId;
  if(typeof id!=='string'||!id||id.includes('/')||id.length>128)throw new HttpsError('invalid-argument','Invalid account.');
  if(id===request.auth.uid)throw new HttpsError('failed-precondition','You cannot delete your own account.');
  const db=getFirestore(),auth=getAuth(),ref=db.doc(`users/${id}`),main=db.doc('noctiqManager/main');
  // Mark first so a failed Auth deletion is visible and retryable from the UI.
  await db.runTransaction(async tx=>{
    const [actor,target]=await Promise.all([tx.get(db.doc(`users/${request.auth.uid}`)),tx.get(ref)]);
    if(!actor.exists||actor.data().approved===false||String(actor.data().role).toLowerCase()!=='admin')throw new HttpsError('permission-denied','Administrator access required.');
    if(!target.exists)throw new HttpsError('not-found','Account profile not found.');
    if(target.data().authUid && target.data().authUid!==id)throw new HttpsError('failed-precondition','This legacy profile needs its Firebase UID corrected before deletion.');
    tx.update(ref,{approved:false,deletionPending:true});
  });
  try{await auth.deleteUser(id);}catch(error){if(error.code!=='auth/user-not-found')throw new HttpsError('unavailable','Deletion did not finish. The account is disabled; retry Delete.');}
  await db.runTransaction(async tx=>{
    const snapshot=await tx.get(main);
    if(snapshot.exists){
      const data=snapshot.data(),patch={};
      if(Array.isArray(data.users))patch.users=data.users.filter(u=>u.id!==id&&u.authUid!==id);
      if(Array.isArray(data.players))patch.players=data.players.map(p=>{
        const next={...p};for(const key of ['authUid','userId','accountId'])if(next[key]===id)next[key]='';return next;
      });
      if(data.managerV8?.notifications)patch['managerV8.notifications']=data.managerV8.notifications.filter(n=>n.userId!==id);
      if(Object.keys(patch).length)tx.update(main,patch);
    }
    tx.delete(ref);
  });
  return {deleted:true,userId:id};
});
