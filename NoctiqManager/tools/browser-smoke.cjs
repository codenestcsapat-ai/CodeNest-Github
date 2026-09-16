// Dependency-free Chrome smoke checks. No requests or writes to the live database.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const chrome=process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const work=fs.mkdtempSync(path.join(os.tmpdir(),'noctiq-browser-'));
const mime={'.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.html':'text/html','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try{let bytes=fs.readFileSync(file);if(file.endsWith('concept.js'))bytes=Buffer.from(bytes.toString().replace('startManager();',''));res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404).end();}
});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=spawn(chrome,['--headless=new','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${work}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
  let socket;
  try{
    const portFile=path.join(work,'DevToolsActivePort');for(let n=0;n<100&&!fs.existsSync(portFile);n++)await sleep(100);
    if(!fs.existsSync(portFile))throw new Error('Chrome did not start.');
    const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
    const tab=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
    socket=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
    let counter=0;const pending=new Map(),errors=[];
    socket.onmessage=event=>{const data=JSON.parse(event.data);if(data.id){const entry=pending.get(data.id);pending.delete(data.id);data.error?entry.reject(data.error):entry.resolve(data.result);}else if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails.exception?.description || data.params.exceptionDetails.text);};
    const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++counter;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout: '+method));},15000);pending.set(id,{resolve:result=>{clearTimeout(timer);resolve(result);},reject:error=>{clearTimeout(timer);reject(error);}});socket.send(JSON.stringify({id,method,params}));});
    const evaluate=async expression=>{const out=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(out.exceptionDetails)throw new Error(out.exceptionDetails.exception?.description || out.exceptionDetails.text);return out.result.value;};
    await call('Runtime.enable');await call('Page.enable');
    await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await call('Page.navigate',{url:`http://127.0.0.1:${server.address().port}/`});
    for(let n=0;n<100;n++){if(await evaluate("typeof state !== 'undefined'"))break;await sleep(50);}
    await evaluate(`(async()=>{
      model=await import('http://127.0.0.1:${server.address().port}/manager-data.mjs');
      authenticatedUser={uid:'admin-test'};liveReady=true;
      remoteProfiles=[{id:'admin-test',authUid:'admin-test',username:'manager',name:'Test Manager',role:'Admin',approved:true},{id:'player-test',authUid:'player-test',username:'player',name:'Test Player',role:'Player',approved:true,playerId:'player-one'}];
      remoteData={players:[{id:'player-one',name:'Test Player',rlName:'Test RL',teamId:'main',authUid:'player-test',peak1s:1200,peak2s:1700,peak3s:1500}],events:[],results:[],availability:[],managerV8:{leagues:[],leagueGames:[],notifications:[]}};
      const snapshot=(id,data)=>({id,exists:()=>!!data,data:()=>structuredClone(data)});
      services={db:{},storeRef:'main',fire:{doc:(_db,collection,id)=>collection+'/'+id,serverTimestamp:()=>new Date().toISOString(),runTransaction:async(_db,callback)=>{await callback({get:async ref=>ref==='main'?snapshot('main',remoteData):snapshot(ref.split('/')[1],remoteProfiles.find(u=>u.id===ref.split('/')[1])),set:(ref,data)=>{if(ref==='main')remoteData={...remoteData,...structuredClone(data)};else{const id=ref.split('/')[1],index=remoteProfiles.findIndex(u=>u.id===id);if(index<0)remoteProfiles.push(data);else remoteProfiles[index]={...remoteProfiles[index],...data};}}});}}};
      applyDatabase();
    })()`);
    assert.equal(await evaluate("document.querySelector('.brand-title').textContent"),'HOLOFYRN');
    assert.equal(await evaluate("document.querySelectorAll('[data-user-id]').length"),0);
    for(const view of ['overview','roster','availability','results','league','calendar','admin']){
      await evaluate(`state.view=${JSON.stringify(view)};render();`);
      assert.equal(await evaluate("!!document.querySelector('.content')"),true,view);
    }
    await evaluate("state.view='roster';render();playerModal(playerById('player-one'));document.getElementById('p-name').value='Renamed player';document.getElementById('modal-save').click();writeQueue");
    assert.equal(await evaluate('remoteData.players[0].name'),'Renamed player');
    await evaluate("state.view='availability';render();document.getElementById('a-date').value=today();document.getElementById('save-availability').click();writeQueue");
    assert.equal(await evaluate('remoteData.availability[0].playerId'),'player-one');
    await evaluate("state.view='league';render();document.getElementById('add-league').click();document.getElementById('l-name').value='Smoke league';document.getElementById('modal-save').click();writeQueue");
    await evaluate("document.querySelector('[data-league-open]').click()");
    assert.equal(await evaluate("document.querySelector('.page-title').textContent"),'Smoke league');
    await evaluate("document.getElementById('add-league-fixture').click();document.getElementById('lg-away').selectedIndex=1;document.getElementById('modal-save').click();writeQueue");
    assert.equal(await evaluate('remoteData.managerV8.leagueGames.length'),1);
    for(const tab of ['standings','matches','fixtures','scenario','playoffs','settings'])await evaluate(`state.leagueTab=${JSON.stringify(tab)};render();`);
    await evaluate("state.view='calendar';render();document.getElementById('add-event').click();document.getElementById('e-title').value='Database event';document.getElementById('modal-save').click();writeQueue");
    assert.equal(await evaluate('remoteData.events[0].title'),'Database event');
    await evaluate("openProfileModal();document.getElementById('profile-name').value='Updated manager';document.getElementById('profile-save').click();writeQueue");
    assert.equal(await evaluate('remoteProfiles[0].name'),'Updated manager');
    await evaluate("state.view='overview';render();");await sleep(300);
    fs.writeFileSync(path.join(work,'desktop.png'),Buffer.from((await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true})).data,'base64'));
    for(const width of [320,360,390,540,768,900,1024,1440]){
      await call('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width<901});
      for(const view of ['overview','roster','availability','results','league','calendar','admin']){
        await evaluate('state.sidebarOpen=false;state.view='+JSON.stringify(view)+';state.selectedLeagueId=null;render()');
        assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true,view+' overflow at '+width);
      }
      for(const tab of ['standings','matches','fixtures','scenario','playoffs','settings']){
        await evaluate('state.view="league";state.selectedLeagueId=state.leagues[0].id;state.leagueTab='+JSON.stringify(tab)+';render()');
        assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true,tab+' overflow at '+width);
      }
      await evaluate('playerModal(playerById("player-one"))');
      assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true,'modal overflow at '+width);
      await evaluate('closeModal()');
    }
    assert.equal(await evaluate('state.teams.length'),6);
    // A refresh reads persisted data and never loads the concept's demo identities.
    await evaluate("state=emptyState();applyDatabase()");assert.equal(await evaluate('state.players[0].name'),'Renamed player');
    await evaluate("authenticatedUser={uid:'player-test'};state=emptyState();applyDatabase();state.view='availability';render()");
    assert.equal(await evaluate("document.querySelectorAll('[data-view=admin]').length"),0);
    await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await evaluate("state.sidebarOpen=false;render()");
    assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true,'mobile overflow');
    fs.writeFileSync(path.join(work,'mobile.png'),Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'));
    await evaluate("document.getElementById('sidebar-toggle').click()");
    assert.equal(await evaluate("document.querySelector('.sidebar').getBoundingClientRect().left>=0"),true,'mobile navigation opens');
    // Force a failed remote write to verify the error path, not just optimistic UI.
    await evaluate("state.sidebarOpen=false;render();services.fire.runTransaction=async()=>{throw new Error('Simulated database failure')};document.getElementById('save-availability').click();writeQueue");
    assert.equal(await evaluate("document.querySelector('.modal-head h3').textContent"),'Save failed');
    assert.equal(await evaluate('liveReady'),false);
    assert.deepEqual(errors,[]);
    console.log('PASS: all pages, roster save, string-ID availability, league navigation/fixtures/tabs, calendar save, profile save, reload, player role, mobile navigation, failed-save recovery.');
    console.log('Screenshots: '+work);
  }finally{socket?.close();browser.kill();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;server.close();});
