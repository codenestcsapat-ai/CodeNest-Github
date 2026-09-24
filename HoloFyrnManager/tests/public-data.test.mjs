import {test} from 'node:test';
import assert from 'node:assert/strict';
import {publicHoloFyrnData} from '../public-data.mjs';

test('public projection contains team players and results without private fields', () => {
  const feed = publicHoloFyrnData({
    players:[{id:'private-id',name:'Kenz',teamId:'main',position:'Captain',publicBio:'Team captain',discord:'secret',notes:'private',authUid:'secret'}],
    users:[{email:'private@example.com'}],
    results:[{title:'Autumn Cup',teamId:'main',managerType:'tournament',date:'2026-09-20',placement:'1st',prizeEur:500,notes:'private'}],
    managerV8:{leagueGames:[{played:true,home:'HoloFyrn Esports',away:'Rival',homeSeries:3,awaySeries:1,date:'2026-09-21'}]},
  });
  assert.deepEqual(feed.players,[{name:'Kenz',team:'main',role:'Captain',bio:'Team captain'}]);
  assert.deepEqual(feed.results[0],{team:'main',type:'tournament',date:'2026-09-20',event:'Autumn Cup',stage:'',placement:'1st'});
  assert.deepEqual(feed.results[1],{team:'main',type:'league',date:'2026-09-21',event:'HoloFyrn Esports vs Rival',stage:'',placement:'3–1'});
  assert.doesNotMatch(JSON.stringify(feed),/private|secret|authUid|prizeEur/);
});

test('a played game between two HoloFyrn teams appears on both team pages', () => {
  const feed = publicHoloFyrnData({managerV8:{leagueGames:[{
    played:true,home:'HoloFyrn Esports',away:'HoloFyrn Academy',
    homeSeries:2,awaySeries:3,date:'2026-09-24',
  }]}});
  assert.deepEqual(feed.results.map(row => row.team), ['main','academy']);
  assert.equal(feed.results[0].placement, '2–3');
});
