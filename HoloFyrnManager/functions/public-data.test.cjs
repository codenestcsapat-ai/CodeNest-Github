const {test} = require('node:test');
const assert = require('node:assert/strict');
const {publicHoloFyrnData} = require('./public-data.cjs');

test('public feed includes team names and results but excludes private manager fields', () => {
  const feed = publicHoloFyrnData({
    players:[{id:'private-id',name:'Kenz',teamId:'main',discord:'secret',notes:'private',authUid:'secret'}],
    users:[{email:'private@example.com'}],
    results:[{title:'Autumn Cup',teamId:'main',managerType:'tournament',date:'2026-09-20',placement:'1st',prizeEur:500,notes:'private'}],
    managerV8:{leagueGames:[{played:true,home:'HoloFyrn Esports',away:'Rival',homeSeries:3,awaySeries:1,date:'2026-09-21'}]},
  });
  assert.deepEqual(feed.players,[{name:'Kenz',team:'main'}]);
  assert.equal(feed.results.length,2);
  assert.deepEqual(feed.results[0],{team:'main',type:'tournament',date:'2026-09-20',event:'Autumn Cup',stage:'',placement:'1st'});
  assert.deepEqual(feed.results[1],{team:'main',type:'league',date:'2026-09-21',event:'HoloFyrn Esports vs Rival',stage:'',placement:'3–1'});
  assert.doesNotMatch(JSON.stringify(feed),/private|secret|authUid|prizeEur/);
});
