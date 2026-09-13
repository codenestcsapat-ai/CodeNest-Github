const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(`${__dirname}/script.js`, 'utf8').replace(/initRemoteStore\(\);\s*$/, '');
const context = vm.createContext({ document: { querySelector: () => ({}), addEventListener() {} }, console, Intl, Date, structuredClone });
vm.runInContext(source, context);
const run = (code) => vm.runInContext(code, context);

test('accepts minute-precise ranges outside the old fixed evening slots', () => {
  assert.equal(run('availabilityRangeError({ date: "2026-09-14", startTime: "06:15", endTime: "14:45" })'), '');
});
test('rejects missing, invalid, equal and reversed range boundaries', () => {
  for (const entry of [
    { date: '2026-02-30', startTime: '18:00', endTime: '20:00' },
    { date: '', startTime: '18:00', endTime: '20:00' },
    { date: '2026-09-14', startTime: '', endTime: '20:00' },
    { date: '2026-09-14', startTime: '18:00', endTime: '24:00' },
    { date: '2026-09-14', startTime: '18:00', endTime: '18:00' },
    { date: '2026-09-14', startTime: '21:00', endTime: '18:00' },
  ]) assert.ok(run(`availabilityRangeError(${JSON.stringify(entry)})`));
});
test('date-specific availability stays in its week, legacy recurring rows remain visible', () => {
  const entries = [
    { id: 'next', date: '2026-09-21', day: 'Monday', startTime: '08:00' },
    { id: 'dated', date: '2026-09-14', day: 'Tuesday', startTime: '18:30' },
    { id: 'weekly', day: 'Monday', startTime: '10:15' },
  ];
  assert.equal(run(`availabilityEntriesForDate(${JSON.stringify(entries)}, "2026-09-14").map(x => x.id).join(',')`), 'weekly,dated');
});
test('players can change only their own availability; staff can manage roster entries', () => {
  assert.equal(run('canManageAvailabilityForPlayer({ id: "u", role: "Player", playerId: "own" }, { id: "own" })'), true);
  assert.equal(run('canManageAvailabilityForPlayer({ id: "u", role: "Player", playerId: "own" }, { id: "other" })'), false);
  assert.equal(run('canManageAvailabilityForPlayer({ id: "admin", role: "Admin" }, { id: "other" })'), true);
  assert.equal(run('canManageAvailabilityForPlayer(null, { id: "own" })'), false);
});
test('legacy player names are resolved within the correct team', () => {
  assert.equal(run('availabilityEntryPlayer({players:[{id:"a",name:"Same",teamId:"main"},{id:"b",name:"Same",teamId:"academy"}]}, {playerName:"Same",teamId:"academy"}).id'), 'b');
});

test('all six roster identities are distinct and the existing SYNQ id is preserved', () => {
  assert.equal(run('teams.length'), 6);
  assert.equal(run('new Set(teamIds()).size'), 6);
  assert.equal(run('teams.find(t => t.id === "rls").label'), 'SYNQ');
  for (const id of ['rls_esport', 'rls_academy', 'rls_eldr']) {
    assert.equal(run(`validTeamId("${id}")`), id);
    assert.ok(run(`teamBrandMarkup("${id}").includes("RLS /")`));
    assert.ok(run(`teamSelector({ players: [] }).includes('data-roster-team="${id}"')`));
  }
});

test('non-admin availability follows the menu selection and ignores all-team filters', () => {
  for (const role of ['Player', 'Captain', 'Coach', 'Manager']) {
    run('selectedTeamContextId = "rls_eldr"; filters.availability = { team: "all" };');
    assert.equal(run(`availabilityTeamScope({ role: "${role}" })`), 'rls_eldr');
    assert.equal(run(`visibleAvailabilityRows({availability:[{id:"main-row",teamId:"main"},{id:"eldr-row",teamId:"rls_eldr"}]}, {role:"${role}",playerId:"main-player"}).map(x=>x.id).join(',')`), 'eldr-row');
  }
  run('selectedTeamContextId = "academy";');
  assert.equal(run('availabilityTeamScope({role:"Player"})'), 'academy');
});

test('only admins can select an all-team overview', () => {
  run('selectedTeamContextId = "rls_esport"; filters.availability = {};');
  assert.equal(run('availabilityTeamScope({role:"Admin"})'), 'rls_esport');
  run('filters.availability.team = "all";');
  assert.equal(run('visibleAvailabilityRows({availability:[{teamId:"main"},{teamId:"rls_eldr"}]}, {role:"Admin"}).length'), 2);
  run('filters.availability.team = "rls_academy";');
  assert.equal(run('availabilityTeamScope({role:"Admin"})'), 'rls_academy');
  assert.equal(run('visibleAvailabilityRows({availability:[{teamId:"main"}]}, null).length'), 0);
});

test('rendered player page contains only the selected roster and no other-team player selector', () => {
  run('selectedTeamContextId = "rls_eldr"; filters.availability = {team:"all"};');
  const html = run(`availabilityPage({players:[{id:"own",name:"Main-only player",teamId:"main"}],availability:[]}, {role:"Player",playerId:"own"})`);
  assert.equal((html.match(/wide availability-panel/g) || []).length, 1);
  assert.ok(html.includes('RLS HoloFyrn Eldr Availability'));
  assert.ok(!html.includes('data-filter="availability"'));
  assert.ok(!html.includes('Main-only player'));
  const adminHtml = run('availabilityPage({players:[],availability:[]}, {role:"Admin"})');
  assert.equal((adminHtml.match(/wide availability-panel/g) || []).length, 6);
  assert.ok(adminHtml.includes('data-filter="availability"'));
});
