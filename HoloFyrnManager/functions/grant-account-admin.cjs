// Run only from a trusted administrator machine with Application Default Credentials.
const {initializeApp}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');
const {getFirestore}=require('firebase-admin/firestore');
initializeApp({projectId:'noctiq-d1020'});
(async()=>{
  const uid=process.argv[2];if(!uid)throw new Error('Usage: node grant-account-admin.cjs FIREBASE_UID');
  const profile=await getFirestore().doc(`users/${uid}`).get();
  if(!profile.exists||profile.data().approved===false||String(profile.data().role).toLowerCase()!=='admin')throw new Error('An enabled Admin profile is required.');
  const user=await getAuth().getUser(uid);
  await getAuth().setCustomUserClaims(uid,{...user.customClaims,accountAdmin:true});
  console.log('Account deletion enabled. Sign out and sign in again.');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
