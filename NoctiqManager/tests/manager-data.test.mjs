import test from 'node:test';
import assert from 'node:assert/strict';
import {fromDatabase,changesBetween,toDatabase,applyChanges,validateChanges} from '../manager-data.mjs';
const profiles=[{id:'auth-admin',authUid:'auth-admin',name:'Admin',username:'admin',role:'Admin',approved:true},{id:'auth-player',authUid:'auth-player',name:'Player',username:'player',role:'Player',approved:true,playerId:'p-one'}];
const database={players:[{id:'p-one',name:'Player',rlName:'Player RL',teamId:'main',peak1s:'1200',peak2s:'1700',peak3s:'1500',authUid:'auth-player',notes:'Staff notes',stats:{mechanics:7}}],results:[{id:'r-one',type:'Match',title:'Existing match',dateTime:'2026-09-01T19:30',score:'3-1',replayLinks:['https://example.com/replay']}],events:[{id:'e-one',title:'Training',dateTime:'2026-09-20T19:00',teamId:'main',durationMinutes:90,notes:'Keep this'}],availability:[],trainingRoutines:[{id:'training-1',title:'Existing routine'}],managerV8:{version:1,leagues:[],leagueGames:[],notifications:[]}};
test('legacy data and Firebase account links appear without seed rows',()=>{
  const state=fromDatabase(database,profiles,'auth-player');assert.equal(state.currentUserId,'auth-player');assert.equal(state.players[0].accountId,'auth-player');assert.equal(state.players[0].m2,1700);assert.equal(state.users[1].linkedPlayerId,'p-one');assert.equal(state.events[0].duration,90);assert.equal(state.results[0].placement,'3-1');assert.equal(state.leagues.length,0);
});
test('a roster edit preserves legacy stats and unrelated database collections',()=>{
  const before=fromDatabase(database,profiles,'auth-admin'),after=structuredClone(before);after.players[0].name='Updated';
  const {patch}=toDatabase(database,profiles,'auth-admin',changesBetween(before,after));
  assert.equal(patch.players[0].name,'Updated');assert.equal(patch.players[0].stats.mechanics,7);assert.equal(patch.players[0].notes,'Staff notes');assert.deepEqual(Object.keys(patch),['players']);
});
test('another result stays byte-for-byte unchanged when a result is added',()=>{
  const before=fromDatabase(database,profiles,'auth-admin'),after=structuredClone(before);after.results.push({id:'r-two',team:'main',type:'tournament',date:'2026-09-21',event:'Cup',stage:'Final',placement:'1st',prizeMoney:20,result:'win'});
  const {patch}=toDatabase(database,profiles,'auth-admin',changesBetween(before,after));assert.deepEqual(patch.results[0],database.results[0]);assert.equal(patch.results[1].prizeEur,20);
});
test('concurrent edits merge independent fields and reject conflicts',()=>{
  const before=[{id:'x',name:'A',role:'Player'}];const changes=changesBetween({players:before},{players:[{...before[0],name:'B'}]}).players;
  assert.deepEqual(applyChanges([{...before[0],role:'Captain'}],changes),[{id:'x',name:'B',role:'Captain'}]);
  assert.throws(()=>applyChanges([{...before[0],name:'C'}],changes),/another user/);
  assert.throws(()=>applyChanges([],changes),/deleted/);
});
test('players can update their own profile but cannot promote themselves',()=>{
  const before=fromDatabase(database,profiles,'auth-player'),after=structuredClone(before);after.users[1].displayName='New name';
  const output=toDatabase(database,profiles,'auth-player',changesBetween(before,after));assert.equal(output.userWrites[0].name,'New name');assert.equal(output.patch.users,undefined);
  after.users[1].role='admin';assert.throws(()=>toDatabase(database,profiles,'auth-player',changesBetween(before,after)),/own profile/);
});
test('availability accepts Firebase string IDs and rejects invalid times or other players',()=>{
  const before=fromDatabase(database,profiles,'auth-player'),after=structuredClone(before);after.availability.push({id:'a-one',playerId:'p-one',date:'2026-09-20',from:'18:00',until:'20:00'});
  const output=toDatabase(database,profiles,'auth-player',changesBetween(before,after));assert.equal(output.patch.availability[0].playerId,'p-one');assert.equal(output.patch.availability[0].startTime,'18:00');
  after.availability[0].until='17:00';assert.throws(()=>toDatabase(database,profiles,'auth-player',changesBetween(before,after)),/time range/);
  after.availability[0].playerId='someone-else';assert.throws(()=>toDatabase(database,profiles,'auth-player',changesBetween(before,after)),/own availability/);
});
test('league changes preserve the other extension arrays',()=>{
  const before=fromDatabase(database,profiles,'auth-admin'),after=structuredClone(before);after.leagues.push({id:'league-uuid',name:'League',participants:['Noctiq','Other']});
  const {patch}=toDatabase(database,profiles,'auth-admin',changesBetween(before,after));assert.equal(patch.managerV8.leagues.length,1);assert.deepEqual(patch.managerV8.notifications,[]);assert.equal(patch.players,undefined);
});
test('calendar save preserves old notes and actual local time',()=>{
  const before=fromDatabase(database,profiles,'auth-admin'),after=structuredClone(before);after.events[0].title='Updated event';
  const {patch}=toDatabase(database,profiles,'auth-admin',changesBetween(before,after));assert.equal(patch.events[0].notes,'Keep this');assert.equal(new Date(patch.events[0].startsAtUtc).getHours(),19);
});
test('disabled accounts cannot save and source calendar entries cannot be overwritten',()=>{
  assert.throws(()=>validateChanges({}, {approved:false},[]),/access/);
  assert.throws(()=>validateChanges({events:[{after:{id:'scrims:one',source:'scrims'}}]},{role:'admin'},[]),/team tools/);
});
test('rebranding merges saved teams and keeps league references and seed keys aligned',()=>{
 const data=structuredClone(database);
 data.managerV8.teams=[{id:'main',name:'Noctiq eSports'},{id:'academy',name:'Noctiq eSports Academy'},{id:'custom',name:'Guest Team'}];
 data.managerV8.leagues=[{id:'league',participants:['Noctiq eSports','Noctiq eSports Academy','Guest Team'],config:{seeds:{'Noctiq eSports':1,'Noctiq eSports Academy':2}},playoffs:{rounds:[{matches:[{home:'Noctiq eSports Academy'}]}]}}];
 data.managerV8.leagueGames=[{id:'game',home:'Noctiq eSports',away:'Noctiq eSports Academy'}];
 const before=fromDatabase(data,profiles,'auth-admin');
 assert.equal(before.teams.length,7);assert.equal(new Set(before.teams.map(t=>t.id)).size,7);
 assert.equal(before.teams.find(t=>t.id==='academy').name,'HoloFyrn Academy');
 assert.equal(before.leagues[0].config.seeds['HoloFyrn Esports'],1);
 assert.equal(before.leagues[0].playoffs.rounds[0].matches[0].home,'HoloFyrn Academy');
 assert.equal(before.leagueGames[0].home,'HoloFyrn Esports');
 assert.equal(data.managerV8.leagueGames[0].home,'Noctiq eSports');
 const after=structuredClone(before);after.leagueGames[0].played=true;
 const {patch}=toDatabase(data,profiles,'auth-admin',changesBetween(before,after));
 const reloaded=fromDatabase({...data,...patch},profiles,'auth-admin');
 assert.deepEqual(reloaded.leagues[0].participants,['HoloFyrn Esports','HoloFyrn Academy','Guest Team']);
 assert.equal(reloaded.leagueGames[0].played,true);
});
