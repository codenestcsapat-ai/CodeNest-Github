const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup({claim=true,role='Admin',fail=false}={}){
 const docs=new Map([['users/admin',{role,approved:true}],['users/target',{authUid:'target',approved:true}],['noctiqManager/main',{users:[{id:'target'},{id:'admin'}],players:[{id:'p',authUid:'target',userId:'target',stats:{wins:3}}],results:[{id:'r'}]}]]);
 const calls=[];let handler;
 class HttpsError extends Error{constructor(code,message){super(message);this.code=code;}}
 const db={doc:path=>path,runTransaction:async fn=>{const writes=[];await fn({get:async path=>({exists:docs.has(path),data:()=>structuredClone(docs.get(path))}),update:(path,patch)=>writes.push(()=>docs.set(path,{...docs.get(path),...patch})),delete:path=>writes.push(()=>docs.delete(path))});writes.forEach(f=>f());}};
 const modules={'firebase-admin/app':{initializeApp(){}},'firebase-admin/auth':{getAuth:()=>({deleteUser:async id=>{calls.push(id);if(fail)throw {code:fail};}})},'firebase-admin/firestore':{getFirestore:()=>db},'firebase-functions/v2/https':{HttpsError,onCall:(_,fn)=>{handler=fn;return fn;}}};
 vm.runInNewContext(fs.readFileSync('HoloFyrnManager/functions/index.cjs','utf8'),{require:name=>modules[name],exports:{}});
 return {docs,calls,run:(id='target',auth={uid:'admin',token:{accountAdmin:claim}})=>handler({auth,data:{userId:id}})};
}
test('requires independent admin claim and enabled admin profile',async()=>{
 for(const options of [{claim:false},{role:'Player'}]){const s=setup(options);await assert.rejects(s.run(),{code:'permission-denied'});assert.equal(s.calls.length,0);}
 const s=setup();await assert.rejects(s.run('target',null),{code:'unauthenticated'});
});
test('rejects self deletion and invalid IDs before deleting',async()=>{const s=setup();await assert.rejects(s.run('admin'),{code:'failed-precondition'});await assert.rejects(s.run('../target'),{code:'invalid-argument'});assert.equal(s.calls.length,0);});
test('deletes login and profile, unlinks player while preserving history',async()=>{const s=setup();await s.run();assert.deepEqual(s.calls,['target']);assert.equal(s.docs.has('users/target'),false);const main=s.docs.get('noctiqManager/main');assert.equal(main.users.length,1);assert.equal(main.players[0].authUid,'');assert.equal(main.players[0].stats.wins,3);assert.equal(main.results[0].id,'r');});
test('failed Auth deletion retains disabled profile for retry',async()=>{const s=setup({fail:'auth/internal-error'});await assert.rejects(s.run(),{code:'unavailable'});assert.equal(s.docs.get('users/target').deletionPending,true);assert.equal(s.docs.get('users/target').approved,false);});
test('already removed Auth login can finish cleanup',async()=>{const s=setup({fail:'auth/user-not-found'});await s.run();assert.equal(s.docs.has('users/target'),false);});
