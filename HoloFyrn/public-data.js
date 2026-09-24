const teamRoutes = {
  '/teams/holofyrn-esport/': 'main',
  '/teams/holofyrn-academy/': 'academy',
  '/teams/rls-holofyrn-esport/': 'rls',
  '/teams/rls-holofyrn-academy/': 'rls-academy',
  '/teams/rls-holofyrn-elet/': 'rls-eldr',
};
let publicData = null;
let loadError = false;

function translated(en, hu) {
  const span = document.createElement('span');
  span.dataset.en = en;
  span.dataset.hu = hu;
  span.textContent = document.documentElement.lang === 'hu' ? hu : en;
  return span;
}

function emptyMessage(en, hu) {
  const p = document.createElement('p');
  p.append(translated(en, hu));
  return p;
}

function playerCard(player, index) {
  const card = document.createElement('div');
  card.className = 'player-card';
  const image = document.createElement('div');
  image.className = 'player-image public-player-image';
  const label = document.createElement('span');
  label.className = 'player-index';
  label.textContent = `${String(index + 1).padStart(2, '0')} / HF`;
  image.append(label);
  const info = document.createElement('div');
  info.className = 'player-info';
  const copy = document.createElement('div');
  const small = document.createElement('span');
  small.className = 'small-label';
  small.append(translated('ROCKET LEAGUE PLAYER', 'ROCKET LEAGUE JÁTÉKOS'));
  const name = document.createElement('h3');
  name.textContent = player.name;
  copy.append(small, name);
  info.append(copy);
  card.append(image, info);
  return card;
}

function renderPlayers(grid, players) {
  if (!grid) return;
  if (!players.length) {
    grid.replaceChildren(emptyMessage(loadError ? 'Player data is temporarily unavailable.' : 'No players listed yet.', loadError ? 'A játékosadatok átmenetileg nem érhetők el.' : 'Még nincsenek játékosok feltüntetve.'));
    return;
  }
  grid.replaceChildren(...players.map(playerCard));
}

function resultList(rows, emptyEn, emptyHu) {
  if (!rows.length) return emptyMessage(loadError ? 'Results are temporarily unavailable.' : emptyEn, loadError ? 'Az eredmények átmenetileg nem érhetők el.' : emptyHu);
  const list = document.createElement('ul');
  list.className = 'public-results';
  for (const row of rows.sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 6)) {
    const item = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = row.event;
    const details = document.createElement('span');
    details.textContent = [row.date, row.stage, row.placement].filter(Boolean).join(' · ');
    item.append(title, details);
    list.append(item);
  }
  return list;
}

function render() {
  const route = decodeURIComponent(location.hash.slice(1)) || '/';
  const team = teamRoutes[route];
  if (!publicData && !loadError) {
    const grid = document.querySelector('#main .players-grid');
    if ((team || route === '/') && grid) grid.replaceChildren(emptyMessage('Loading players…', 'Játékosok betöltése…'));
    if (team) document.querySelectorAll('#main .two-column .info-panel p').forEach(p => p.replaceWith(emptyMessage('Loading results…', 'Eredmények betöltése…')));
    return;
  }
  const players = publicData?.players || [];
  const results = publicData?.results || [];
  if (team) {
    renderPlayers(document.querySelector('#main .players-grid'), players.filter(player => player.team === team));
    const panels = document.querySelectorAll('#main .two-column .info-panel');
    if (panels.length >= 2) {
      panels[0].querySelector('p')?.replaceWith(resultList(results.filter(row => row.team === team), 'No results yet.', 'Még nincs eredmény.'));
      panels[1].querySelector('p')?.replaceWith(resultList(results.filter(row => row.team === team && row.type !== 'league'), 'No tournament results yet.', 'Még nincs versenyeredmény.'));
    }
  } else if (route === '/') {
    renderPlayers(document.querySelector('#main .players-grid'), players.filter(player => player.team === 'main'));
  }
}

document.addEventListener('holofyrn:route', render);
render();
try {
  const [{firebaseConfig}, appApi, authApi, fire] = await Promise.all([
    import('../HoloFyrnManager/firebaseConfig.js'),
    import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js'),
  ]);
  const app = appApi.initializeApp(firebaseConfig);
  const auth = authApi.getAuth(app);
  const existingUser = await new Promise((resolve, reject) => {
    const unsubscribe = authApi.onAuthStateChanged(auth, user => { unsubscribe(); resolve(user); }, reject);
  });
  if (!existingUser) await authApi.signInAnonymously(auth);
  const db = fire.initializeFirestore(app, {experimentalAutoDetectLongPolling:true,useFetchStreams:false});
  fire.onSnapshot(fire.doc(db, 'holofyrnPublic', 'main'), snapshot => {
    const data = snapshot.data();
    if (!snapshot.exists() || !Array.isArray(data.players) || !Array.isArray(data.results)) {
      publicData = {players:[],results:[]};
    } else publicData = data;
    loadError = false;
    render();
  }, error => {
    console.error('HoloFyrn public data could not be loaded', error);
    loadError = true;
    render();
  });
} catch (error) {
  console.error('HoloFyrn public data could not be loaded', error);
  loadError = true;
}
render();
