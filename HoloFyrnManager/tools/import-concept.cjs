// Extract the supplied single-file design without shipping duplicated base64 images.
// Usage: node NoctiqManager/tools/import-concept.cjs path/to/concept.html
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
let html = fs.readFileSync(process.argv[2], 'utf8');
fs.mkdirSync(path.join(root, 'assets/concept'), { recursive: true });
const assets = new Map();
html = html.replace(/data:image\/([\w+.-]+);base64,([A-Za-z0-9+/=]+)/g, (_, type, data) => {
  const bytes = Buffer.from(data, 'base64');
  const hash = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 16);
  const name = `assets/concept/${hash}.${type === 'jpeg' ? 'jpg' : type}`;
  if (!assets.has(name)) fs.writeFileSync(path.join(root, name), bytes);
  assets.set(name, bytes.length);
  return name;
});
const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
let js = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
const from = js.indexOf('const seed =');
const to = js.indexOf('const NAV_SECTIONS', from);
js = js.slice(0, from) + `const seed = emptyState();\n\n` + js.slice(to);
js = js.replace(/function loadState\(\)[^\n]*/, 'function loadState(){ return emptyState(); }')
  .replace(/function save\(\)[^\n]*/, 'function save(){ return queueSave(); }')
  .replace(/function resetDemo\(\)[^\n]*/, '')
  .replace(/let state = loadState\(\);/, 'let state = loadState();')
  .replace(/\nrender\(\);\s*$/, '\nstartManager();\n')
  .replace(/const STORE_KEY = [^\n]*\n/, '')
  .replaceAll('HOLOFYRN', 'NOCTIQ').replaceAll('Holofyrn', 'Noctiq')
  .replace(/function teamLogo\(\)\{[^\n]*\}/, "function teamLogo(){return 'assets/noctiq-logo.png';}")
  .replace(/<div class="user-menu-title">Switch demo account<\/div>\$\{state\.users\.map[\s\S]*?\.join\(''\)\}/, '<button class="user-option" id="account-settings">My profile</button><a class="user-option" href="classic.html">Training &amp; team tools</a>')
  .replace('<button class="btn small" id="reset-demo">Reset demo</button>', '<span class="sync-status" id="sync-status" role="status"></span><button class="btn small" id="logout">Log out</button>')
  .replace(/document\.querySelectorAll\('\[data-user-id\]'\)[^\n]*/, '')
  .replace("document.getElementById('reset-demo')?.addEventListener('click',resetDemo);", "bindConnectedActions();")
  .replace("const playerId=+value('a-player')", "const playerId=value('a-player')")
  .replace(/\+value\('([^']*(?:player|account)[^']*)'\)/g, "value('$1')")
  .replaceAll("weekDates('2026-09-14')", 'weekDates(availabilityWeekStart())')
  .replaceAll('value="2026-09-15"', 'value="${today()}"')
  .replaceAll('<span class="tag">14–20 Sept</span>', '<div class="toolbar"><button class="btn small" id="availability-prev" aria-label="Previous week">←</button><span class="tag">${dateFmt(days[0].iso)} – ${dateFmt(days[6].iso)}</span><button class="btn small" id="availability-next" aria-label="Next week">→</button></div>')
  .replaceAll("created:'2026-09-15'", 'created:new Date().toISOString()')
  .replaceAll('from the demo', 'from the database')
  .replaceAll("'2026-09-15'", 'today()')
  .replaceAll("state.calendarCursor='2026-09'", "state.calendarCursor=today().slice(0,7)")
  .replaceAll('value="2026-10-01"', 'value="${today()}"')
  .replaceAll('value="2026-09-25"', 'value="${today()}"')
  .replaceAll('supported in this prototype', 'supported')
  .replaceAll('canEdit=isAdmin()||e.creatorUserId===state.currentUserId', 'canEdit=!e.source&&(isAdmin()||e.creatorUserId===state.currentUserId)')
  .replaceAll("currentPlayer()?.id===a.playerId", "String(currentPlayer()?.id)===String(a.playerId)")
  .replaceAll('esc(p.tracker||TRACKER_HOME)', 'esc(safeUrl(p.tracker)||TRACKER_HOME)')
  .replaceAll('esc(u.discordUrl)', 'esc(safeUrl(u.discordUrl))')
  .replaceAll('esc(u.instagramUrl)', 'esc(safeUrl(u.instagramUrl))')
  .replaceAll('esc(u.xUrl)', 'esc(safeUrl(u.xUrl))')
  .replaceAll('const obj={id,accountId', 'const obj={...p,id,accountId')
  .replaceAll('const obj={id:e?.id||Date.now()', 'const obj={...e,id:e?.id||Date.now()')
  .replaceAll("const id=p?.id||Date.now()", "const id=p?.id||crypto.randomUUID()")
  .replaceAll('id:Date.now()', 'id:crypto.randomUUID()')
  .replaceAll('id:r?.id||Date.now()', 'id:r?.id||crypto.randomUUID()')
  .replaceAll('id:e?.id||Date.now()', 'id:e?.id||crypto.randomUUID()')
  .replaceAll('state.selectedLeagueId=+b.dataset.leagueOpen', 'state.selectedLeagueId=b.dataset.leagueOpen')
  .replaceAll('id:existing?.id||Date.now()+g.id', 'id:existing?.id||crypto.randomUUID()')
  .replaceAll('state.notifications.push({id:Date.now()+Math.floor(Math.random()*1000)', 'state.notifications.push({id:crypto.randomUUID()')
  .replaceAll('.sort((a,b)=>b.id-a.id)', ".sort((a,b)=>String(b.created || '').localeCompare(String(a.created || '')))")
  .replaceAll('<button class="btn icon-btn" id="sidebar-toggle">', '<button class="btn icon-btn" id="sidebar-toggle" aria-label="Toggle navigation">')
  .replaceAll('const invitedIds=eventInvitedUserIds(e)', 'const invitedIds=eventInvitedUserIds(e)')
  .replaceAll('file.size>2.7*1024*1024', "!/^image\\/(png|jpeg|webp|gif)$/.test(file.type)||file.size>200*1024")
  .replaceAll('Keep profile images/GIFs below about 2.7 MB for localStorage.', 'Use a PNG, JPEG, WebP or GIF smaller than 200 KB.')
  .replace("visibleEventsForCurrentUser().sort", "visibleEventsForCurrentUser().filter(e=>e.date>=today()).sort")
  .replaceAll('src="${u.avatarData}"', 'src="${esc(safeUrl(u.avatarData, true))}"')
  .replaceAll('src="${pendingAvatar}"', 'src="${esc(safeUrl(pendingAvatar, true))}"');
// Production implementations live in connected.js, in the same module scope.
for (const name of ['accountModal', 'bindAdmin', 'currentUser']) js = js.replace(new RegExp(`function ${name}\\([^\\n]*\\n`), '');
js = js.replace('function render(){ensureAccess();', 'function render(){if(!currentUser())return;ensureAccess();');
js = js.replace('bindCommon();bindView();}', 'bindCommon();bindView();updateSyncStatus();}');
// Match the concept visually while preventing writes from claiming premature success.
js = js.replaceAll("toast('Player saved'", "toast('Saving player'")
  .replaceAll("toast('Profile saved'", "toast('Saving profile'")
  .replaceAll("toast('Calendar entry saved'", "toast('Saving calendar entry'")
  .replaceAll("toast('Availability added'", "toast('Saving availability'");
fs.writeFileSync(path.join(root, 'concept.css'), css);
fs.writeFileSync(path.join(root, 'concept.js'), `// Imported from the user-supplied V8.2 design; Firebase services are in connected.js.\n${js}\n`);
console.log(`Extracted ${assets.size} unique images (${[...assets.values()].reduce((a,b)=>a+b,0)} bytes), CSS and UI.`);
