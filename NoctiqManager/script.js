const sessionKey = "noctiq-manager-session";
const storeKey = "noctiq-manager-store";
const app = document.querySelector("#app");
let firebaseApp = null;
let db = null;
let storeRef = null;
let remoteApi = null;
let currentStore = null;
let storageMode = "local";

let currentPage = "dashboard";
let filters = {};
let filterTimer;
let calendarMonth = new Date();
let calendarTimeZone = "CET";
let selectedCalendarItemKey = "";
let resultDraft = null;

const teams = [
  { id: "main", name: "Noctiq eSports", label: "Main Team" },
  { id: "academy", name: "Noctiq eSports Academy", label: "Academy" },
];

const eventColors = {
  Scrim: "#3f96ff",
  Tournament: "#f2f5ff",
  "League match": "#36d399",
  Tryout: "#a65cff",
  Meeting: "#c34cff",
  "Free Play": "#7d5cff",
  Training: "#6fb6ff",
  Hoops: "#42d3b4",
  Dropshot: "#ffcf5a",
  Snowday: "#9ee7ff",
  Heatseeker: "#ff6b8a",
  Other: "#aab6d6",
};
const eventTypes = Object.keys(eventColors);
const playerRoles = ["Captain", "Coach", "Manager", "Player", "Sub"];
const weekModes = ["3s", "2s", "1s", "Hoops", "Dropshot", "Snowday", "Heatseeker", "4s", "Rumble", "Casual", "Freeplay", "Custom pack", "Workshop map"];

const statKeys = ["mechanics", "rotation", "communication", "gameSense", "consistency", "mentality", "teamFit"];
const emptyStats = Object.fromEntries(statKeys.map((key) => [key, 5]));
const statLabels = {
  mechanics: "Mechanics",
  rotation: "Rotation",
  communication: "Communication",
  gameSense: "Game sense",
  consistency: "Consistency",
  mentality: "Mentality",
  teamFit: "Team fit",
};
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const weekDayLabels = { Hetfo: "Monday", Kedd: "Tuesday", Szerda: "Wednesday", Csutortok: "Thursday", Pentek: "Friday", Szombat: "Saturday", Vasarnap: "Sunday" };
const customMapOptions = ["Dribble Challenge 2", "Aim Training by Coco", "Speed Jump Rings", "Air Dribble Mele", "Hornets Nest", "Custom map"];
const customPackOptions = ["Aerial consistency", "Shooting consistency", "Shadow defense", "Backboard reads", "Custom pack"];
const workshopMapOptions = ["Dribble Challenge 2", "Aim Training by Coco", "Speed Jump Rings", "Air Dribble Mele", "Hornets Nest", "Custom workshop map"];
const sortLabels = {
  dateTime: "Date",
  opponent: "Opponent",
  level: "Level",
  teamId: "Team",
  prizeEur: "Prize",
  maxTeams: "Max teams",
  registeredTeams: "Registered teams",
  name: "Name",
  rlName: "Rocket League name",
  status: "Status",
  rank: "Rank",
  title: "Title",
  creatorName: "Creator",
  weeklyDay: "Weekly day",
  totalHours: "Weekly hours",
  peak1s: "Peak 1s MMR",
  peak2s: "Peak 2s MMR",
  peak3s: "Peak 3s MMR",
  contact: "Contact",
};
const resultTypes = ["Tournament", "League match"];
const logoMarkup = `<img class="brand-logo" src="assets/noctiq-logo.png" alt="Noctiq logo">`;

const adminUsers = [
  { id: "admin-kenz", name: "Kenz", username: "Kenz", password: "Kenz123", role: "Admin", approved: true, canEdit: true, systemAdmin: true, createdAt: "2026-05-27T00:00:00.000Z" },
  { id: "admin-zemsta", name: "Zemsta", username: "Zemsta", password: "Zemsta123", role: "Admin", approved: true, canEdit: true, systemAdmin: true, createdAt: "2026-05-27T00:00:00.000Z" },
];
const playerStatUsers = [
  { id: "coach-gg07", name: "GG07", username: "GG07", password: "GG07123", role: "Coach", approved: true, canEdit: false, playerStatsAccess: true, coachAccess: true, createdAt: "2026-05-27T00:00:00.000Z" },
];
const playerUsers = [
  { id: "player-prxu", name: "Prxu", username: "Prxu", password: "Prxu123", role: "Player", approved: true, canEdit: false, playerStatsAccess: false, coachAccess: false, createdAt: "2026-05-27T00:00:00.000Z" },
];
const builtInUsers = [...adminUsers, ...playerStatUsers, ...playerUsers];

// Structured data model: User, Team, Player, Tryout, Scrim, ScrimPartner, Tournament, CalendarEvent.
const seedStore = {
  users: [],
  teams,
  players: [
    { id: "p1", name: "Milan Kovacs", rlName: "Noctiq.Milo", discord: "milo.rl", teamId: "main", position: "Player", peak1s: "1740", peak2s: "1900", peak3s: "1915", profileLink: "", notes: "Core rotation leader.", stats: { mechanics: 8, rotation: 8, communication: 7, gameSense: 8, consistency: 8, mentality: 8, teamFit: 9 } },
    { id: "p2", name: "Bence Varga", rlName: "Vargaa", discord: "vargaa", teamId: "academy", position: "Sub", peak1s: "1540", peak2s: "1700", peak3s: "1680", profileLink: "", notes: "Developing mechanics, strong communication.", stats: { mechanics: 7, rotation: 6, communication: 7, gameSense: 6, mentality: 7, teamFit: 7 } },
  ],
  tryouts: [
    { id: "tr1", name: "Adam Toth", rlName: "Axi", discord: "axi_rl", rank: "1800 MMR", previousTeam: "Orbit Mix", availability: "Tuesday, Thursday 19:00", dateTime: "2026-06-02T19:00", durationMinutes: "60", teamId: "academy", opinion: "Confident third man, needs another comms test.", stats: { mechanics: 8, rotation: 7, communication: 6, gameSense: 8, consistency: 7, mentality: 8, teamFit: 7 } },
  ],
  scrims: [
    { id: "s1", dateTime: "2026-05-29T20:00", durationMinutes: "90", opponent: "Velocity Blue", level: "1900+", teamId: "main", notes: "BO7 practice" },
    { id: "s2", dateTime: "2026-05-30T18:30", durationMinutes: "90", opponent: "Neon Wolves", level: "1800", teamId: "academy", notes: "Rotation focus" },
  ],
  partners: [
    { id: "sp1", name: "Neon Wolves", level: "1800", contact: "wolfcoach", availability: "Tuesdays after 19:00", records: "BO7: 4-3, players: Milo, Vargaa", notes: "Flexible schedule, Tuesdays work well." },
    { id: "sp2", name: "Velocity Blue", level: "1900+", contact: "vel.blue", availability: "Weekends", records: "BO7: 2-4, players: Main roster", notes: "Strong opponent, ideal for the main team." },
  ],
  tournaments: [
    { id: "t1", name: "RL Central Cup", dateTime: "2026-06-08T19:00", durationMinutes: "180", prizeEur: "500", maxTeams: "32", registeredTeams: "18", link: "https://example.com/rl-central", notes: "Main roster priority.", teamId: "main" },
    { id: "t2", name: "Academy Open", dateTime: "2026-06-12T18:00", durationMinutes: "180", prizeEur: "150", maxTeams: "24", registeredTeams: "9", link: "", notes: "Good experience builder.", teamId: "academy" },
  ],
  results: [],
  events: [
    { id: "e1", title: "Main review meeting", dateTime: "2026-05-29T20:00", durationMinutes: "60", type: "Meeting", teamId: "main", notes: "Post-scrim VOD review." },
    { id: "e2", title: "Academy free play", dateTime: "2026-05-31T17:00", durationMinutes: "90", type: "Free Play", teamId: "academy", notes: "Optional." },
    { id: "e3", title: "Main training block", dateTime: "2026-06-03T19:00", durationMinutes: "120", type: "Training", teamId: "main", notes: "Kickoff variations." },
  ],
  trainingRoutines: [
    { id: "r1", title: "Academy mechanics pack", creatorId: "academy-coach", creatorName: "Academy Coach", customPackMinutes: "45", workshopMapMinutes: "80", freeplayMinutes: "45", customPacks: [{ name: "Aerial consistency", minutes: "45" }], workshopMaps: [{ name: "Dribble Challenge 2", minutes: "40" }, { name: "Aim Training by Coco", minutes: "40" }], favorites: [] },
  ],
  weeks: [],
};

const schemas = {
  scrims: {
    title: "Scrim entry",
    empty: { id: "", dateTime: "", durationMinutes: "90", opponent: "", level: "", teamId: "main", notes: "" },
    fields: [["dateTime", "Date and start time", "datetime-local"], ["durationMinutes", "Duration minutes", "number"], ["opponent", "Opponent"], ["level", "Level / MMR"], ["teamId", "Noctiq team", "team"], ["notes", "Notes", "textarea"]],
    headers: ["Date", "Duration", "Opponent", "Level", "Team", "Notes"],
    cells: (item) => [fmtRange(item), `${item.durationMinutes || 0} min`, item.opponent, item.level, teamName(item.teamId), item.notes],
    search: (item) => `${item.opponent} ${item.level} ${item.notes}`,
    sort: ["dateTime", "opponent", "level", "teamId"],
  },
  tournaments: {
    title: "Tournament entry",
    empty: { id: "", name: "", dateTime: "", durationMinutes: "180", prizeEur: "", maxTeams: "", registeredTeams: "", link: "", notes: "", teamId: "main" },
    fields: [["name", "Tournament name"], ["dateTime", "Start time", "datetime-local"], ["durationMinutes", "Duration minutes", "number"], ["prizeEur", "Prize pool EUR", "number"], ["maxTeams", "Max teams", "number"], ["registeredTeams", "Registered teams", "number"], ["link", "Registration link", "url"], ["teamId", "Noctiq team", "team"], ["notes", "Notes", "textarea"]],
    headers: ["Date", "Duration", "Name", "Prize", "Max", "Registered", "Team", "Link", "Notes"],
    cells: (item) => [fmtRange(item), `${item.durationMinutes || 0} min`, item.name, `${item.prizeEur || "-"} EUR`, item.maxTeams || "-", item.registeredTeams || "-", teamName(item.teamId), item.link ? `<a href="${escapeAttr(item.link)}" target="_blank">Open</a>` : "-", item.notes],
    search: (item) => `${item.name} ${item.notes}`,
    sort: ["dateTime", "prizeEur", "maxTeams", "registeredTeams", "teamId"],
  },
  players: {
    title: "Player profile",
    empty: { id: "", name: "", rlName: "", discord: "", teamId: "main", position: "Player", peak1s: "", peak2s: "", peak3s: "", profileLink: "", notes: "", stats: emptyStats },
    fields: [["name", "Name"], ["rlName", "Rocket League name"], ["discord", "Discord"], ["teamId", "Team", "team"], ["position", "Role / position", playerRoles], ["peak1s", "Peak 1s MMR", "number"], ["peak2s", "Peak 2s MMR", "number"], ["peak3s", "Peak 3s MMR", "number"], ["profileLink", "Profile / tracker link", "url"], ["notes", "Notes", "textarea"]],
    headers: ["Name", "RL", "Discord", "Team", "Role", "Peak MMR", "Average", "Notes"],
    cells: (item) => [item.name, item.rlName, item.discord, teamName(item.teamId), item.position, peakMmrStack(item), average(item.stats), item.notes],
    search: (item) => `${item.name} ${item.rlName} ${item.discord} ${item.peak1s} ${item.peak2s} ${item.peak3s}`,
    sort: ["name", "rlName", "teamId", "position"],
  },
  partners: {
    title: "Scrim partner",
    empty: { id: "", name: "", level: "", contact: "", availability: "", records: "", notes: "" },
    fields: [["name", "Team name"], ["level", "Approx. level / MMR"], ["contact", "Contact / Discord"], ["availability", "Availability", "textarea"], ["records", "Scrim records", "textarea"], ["notes", "Notes", "textarea"]],
    headers: ["Team", "Level", "Contact", "Availability", "Scrim records", "Notes"],
    cells: (item) => [item.name, item.level, item.contact, item.availability, multiline(item.records), item.notes],
    search: (item) => `${item.name} ${item.level} ${item.contact} ${item.availability} ${item.records} ${item.notes}`,
    sort: ["name", "level", "contact"],
  },
};

function loadStore() {
  return currentStore || normalizeStore(structuredClone(seedStore));
}

async function saveStore(store) {
  const cleanStore = {
    ...store,
    users: store.users.filter((user) => !isBuiltInUser(user)),
  };
  currentStore = normalizeStore(cleanStore);
  if (storageMode === "remote" && remoteApi && storeRef) {
    try {
      await remoteApi.setDoc(storeRef, { ...cleanStore, updatedAt: remoteApi.serverTimestamp() }, { merge: true });
      return;
    } catch (error) {
      console.warn("Remote save failed, switching to local storage.", error);
      storageMode = "local";
    }
  }
  localStorage.setItem(storeKey, JSON.stringify(cleanStore));
}

async function setupFirebase() {
  try {
    const [{ firebaseConfig }, firebaseAppModule, firebaseFirestoreModule] = await Promise.all([
      import("./firebaseConfig.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"),
    ]);
    const firebaseReady = Object.values(firebaseConfig).every((value) => typeof value === "string" && value && !value.startsWith("PASTE_"));
    if (!firebaseReady) return false;
    firebaseApp = firebaseAppModule.initializeApp(firebaseConfig);
    db = firebaseFirestoreModule.getFirestore(firebaseApp);
    storeRef = firebaseFirestoreModule.doc(db, "noctiqManager", "main");
    remoteApi = firebaseFirestoreModule;
    return true;
  } catch (error) {
    console.warn("Firebase unavailable, using local storage.", error);
    return false;
  }
}

function initLocalStore() {
  storageMode = "local";
  try {
    const savedStore = localStorage.getItem(storeKey);
    currentStore = normalizeStore(savedStore ? JSON.parse(savedStore) : structuredClone(seedStore));
  } catch (error) {
    console.warn("Local store could not be loaded, using seed data.", error);
    currentStore = normalizeStore(structuredClone(seedStore));
  }
  render();
}

async function initRemoteStore() {
  app.innerHTML = `<div class="auth-screen"><section class="auth-panel"><div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Loading shared database...</span></div></div></section></div>`;
  try {
    const firebaseReady = await setupFirebase();
    if (!firebaseReady) {
      initLocalStore();
      return;
    }
    storageMode = "remote";
    const firstSnapshot = await remoteApi.getDoc(storeRef);
    if (!firstSnapshot.exists()) {
      await saveStore(structuredClone(seedStore));
    }
    remoteApi.onSnapshot(storeRef, (snapshot) => {
      currentStore = normalizeStore(snapshot.exists() ? snapshot.data() : structuredClone(seedStore));
      render();
    }, (error) => {
      console.error(error);
      initLocalStore();
    });
  } catch (error) {
    console.error(error);
    initLocalStore();
  }
}

function normalizeStore(store) {
  const storedUsers = (store.users || [])
    .map((user) => ({ ...user, username: user.username || user.email || user.name || "" }))
    .filter((user) => !builtInUsers.some((builtInUser) => builtInUser.username.toLowerCase() === user.username.toLowerCase()))
    .map((user) => {
      const role = user.role === "Viewer" ? "Player" : (user.role || "Player");
      return { ...user, name: user.name || user.username, role, approved: user.approved !== false, canEdit: role === "Admin" || Boolean(user.canEdit), systemAdmin: false, playerStatsAccess: role === "Coach" || Boolean(user.playerStatsAccess), coachAccess: Boolean(user.coachAccess) };
    });
  const players = (store.players || []).map((player) => ({
    ...player,
    position: normalizePlayerRole(player.position || player.status),
    peak1s: player.peak1s || "",
    peak2s: player.peak2s || player.mmr || "",
    peak3s: player.peak3s || "",
    profileLink: player.profileLink || "",
    notes: player.notes || "",
    stats: { ...emptyStats, ...(player.stats || {}) },
  }));
  const trainingRoutines = (store.trainingRoutines || []).map((routine) => ({
    ...routine,
    customPackMinutes: routine.customPackMinutes || routine.onesMinutes || "",
    workshopMapMinutes: routine.workshopMapMinutes || routine.twosMinutes || routine.threesMinutes || "",
    customPacks: routine.customPacks || [],
    workshopMaps: routine.workshopMaps || routine.customMaps || [],
    favorites: routine.favorites || [],
  }));
  const results = (store.results || []).map((result) => ({
    ...result,
    type: resultTypes.includes(result.type) ? result.type : "Tournament",
    resultSource: result.resultSource || (result.tournamentId ? `tournaments:${result.tournamentId}` : ""),
  }));
  const weeks = (store.weeks || []).map((week) => ({ ...week, items: week.items || [] }));
  return { ...seedStore, ...store, users: [...builtInUsers, ...storedUsers], players, trainingRoutines, results, weeks };
}

function uid() {
  return crypto.randomUUID();
}

function getUser(store) {
  return store.users.find((user) => user.id === localStorage.getItem(sessionKey));
}

function isAdmin(user) {
  return Boolean(user?.systemAdmin || user?.role === "Admin" || adminUsers.some((admin) => admin.id === user?.id));
}

function isBuiltInUser(user) {
  return builtInUsers.some((builtInUser) => builtInUser.id === user?.id || builtInUser.username.toLowerCase() === user?.username?.toLowerCase());
}

function canEdit(user) {
  return isAdmin(user);
}

function isCoach(user) {
  return Boolean(user?.coachAccess || user?.role === "Coach");
}

function canManagePlayerStats(user) {
  return isAdmin(user) || isCoach(user) || Boolean(user?.playerStatsAccess);
}

function canManageEntity(user, key) {
  if (isAdmin(user)) return true;
  return isCoach(user) && ["scrims", "tryouts", "results"].includes(key);
}

function canCreateTrainingRoutine(user) {
  return isAdmin(user) || isCoach(user);
}

function permissionLabel(user) {
  if (isBuiltInUser(user) && isAdmin(user)) return "Built-in admin";
  if (isAdmin(user)) return "Admin";
  if (isCoach(user)) return "Coach";
  if (user?.playerStatsAccess) return "Player stats";
  return "Player";
}

function roleSelect(user) {
  return `<select data-user-role="${user.id}">
    ${["Player", "Coach", "Admin"].map((role) => `<option value="${role}" ${user.role === role ? "selected" : ""}>${role}</option>`).join("")}
  </select>`;
}

function accountStatusButton(user) {
  return `<button class="chip ${user.approved ? "" : "ok"}" data-user-approved="${user.id}">${user.approved ? "Deactivate" : "Approve"}</button>`;
}

function accountAccessControls(user) {
  const coachChecked = user.coachAccess || user.role === "Coach" ? "checked" : "";
  const statsChecked = user.playerStatsAccess || user.role === "Coach" ? "checked" : "";
  return `
    <div class="checkbox-stack">
      <label><input type="checkbox" data-user-coach-access="${user.id}" ${coachChecked}> Coach tools</label>
      <label><input type="checkbox" data-user-stats-access="${user.id}" ${statsChecked}> Player stats</label>
    </div>
  `;
}

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function escapeAttr(value = "") {
  return esc(value).replace(/`/g, "&#096;");
}

function fmt(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function fmtTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: calendarTimeZone === "BST" ? "Europe/London" : "Europe/Budapest" }).format(new Date(value));
}

function endDate(item) {
  const date = new Date(item.dateTime);
  date.setMinutes(date.getMinutes() + Number(item.durationMinutes || 0));
  return date;
}

function eventsOverlap(a, b) {
  if (!a.dateTime || !b.dateTime || a.teamId !== b.teamId) return false;
  const aStart = new Date(a.dateTime);
  const bStart = new Date(b.dateTime);
  const aDuration = Number(a.durationMinutes || 0);
  const bDuration = Number(b.durationMinutes || 0);
  if (!aDuration || !bDuration) return aStart.getTime() === bStart.getTime();
  return aStart < endDate(b) && bStart < endDate(a);
}

function conflictKeys(events) {
  return new Set(events
    .filter((item) => events.some((other) => resultSourceKey(other) !== resultSourceKey(item) && eventsOverlap(item, other)))
    .map((item) => resultSourceKey(item)));
}

function fmtRange(item) {
  if (!item.dateTime) return "-";
  const start = fmt(item.dateTime);
  if (!Number(item.durationMinutes || 0)) return start;
  return `${start} - ${fmtTime(endDate(item).toISOString())}`;
}

function teamName(teamId) {
  return teamId === "main" ? "Main Team" : "Academy";
}

function average(stats) {
  const values = Object.values(stats || emptyStats).map(Number);
  return (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
}

function displayWeekDay(day) {
  return weekDayLabels[day] || day;
}

function normalizePlayerRole(role = "Player") {
  const found = playerRoles.find((item) => item.toLowerCase() === String(role).toLowerCase());
  return found || "Player";
}

function peakMmrStack(player) {
  return `<div class="stacked-cell"><span>1s: ${esc(player.peak1s || "-")}</span><span>2s: ${esc(player.peak2s || "-")}</span><span>3s: ${esc(player.peak3s || "-")}</span></div>`;
}

function multiline(value = "") {
  return esc(value).replace(/\n/g, "<br>");
}

function allCalendarItems(store) {
  const events = store.events.map((item) => ({ ...item, source: "events", sourceId: item.id }));
  const scrims = store.scrims.map((item) => ({ id: `scrim-${item.id}`, sourceId: item.id, title: `Scrim vs ${item.opponent || "TBA"}`, dateTime: item.dateTime, durationMinutes: item.durationMinutes, type: "Scrim", teamId: item.teamId, notes: item.notes, opponent: item.opponent, lineupOpponent: item.lineupOpponent, ourLineup: item.ourLineup || [], opponentLineup: item.opponentLineup || [], source: "scrims" }));
  const tournaments = store.tournaments.map((item) => ({ id: `tournament-${item.id}`, sourceId: item.id, title: item.name || "Tournament", dateTime: item.dateTime, durationMinutes: item.durationMinutes, type: "Tournament", teamId: item.teamId, notes: item.notes, lineupOpponent: item.lineupOpponent, ourLineup: item.ourLineup || [], opponentLineup: item.opponentLineup || [], source: "tournaments" }));
  const tryouts = store.tryouts.map((item) => ({ id: `tryout-${item.id}`, sourceId: item.id, title: `Tryout: ${item.rlName || item.name || "TBA"}`, dateTime: item.dateTime, durationMinutes: item.durationMinutes, type: "Tryout", teamId: item.teamId, notes: item.opinion, lineupOpponent: item.lineupOpponent, ourLineup: item.ourLineup || [], opponentLineup: item.opponentLineup || [], source: "tryouts" }));
  return [...events, ...scrims, ...tournaments, ...tryouts].filter((item) => item.dateTime).sort((a, b) => a.dateTime.localeCompare(b.dateTime));
}

function render() {
  const store = loadStore();
  const user = getUser(store);
  if (!user) {
    renderAuth(store);
    return;
  }
  if (!user.approved) {
    localStorage.removeItem(sessionKey);
    renderAuth(store);
    return;
  }
  if (currentPage === "admin" && !isAdmin(user)) currentPage = "dashboard";

  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Rocket League Team Manager</span></div></div>
        <nav>
          ${navButton("dashboard", "Overview")}
          ${navButton("calendar", "Calendar")}
          ${navButton("scrims", "Scrims")}
          ${navButton("tournaments", "Tournaments")}
          ${navButton("results", "Results")}
          ${navButton("players", "Players")}
          ${navButton("tryouts", "Tryouts")}
          ${navButton("training", "My training routine")}
          ${navButton("week", "My week")}
          ${navButton("partners", "Scrim partners")}
          ${isAdmin(user) ? navButton("admin", "Admin") : ""}
        </nav>
      </aside>
      <main>
        <header class="topbar">
          <div><p class="eyebrow">Noctiq eSports</p><h1>${pageTitle(currentPage)}</h1></div>
          <div class="user-pill"><span>${esc(user.name)}</span><strong>${user.role}</strong><button class="icon-button" data-action="logout" title="Log out">X</button></div>
        </header>
        ${renderPage(store, user)}
      </main>
    </div>
  `;
}

function navButton(page, label) {
  return `<button class="${currentPage === page ? "active" : ""}" data-page="${page}">${label}</button>`;
}

function pageTitle(page) {
  return {
    dashboard: "Overview",
    calendar: "Calendar",
    scrims: "Scrims",
    tournaments: "Tournaments",
    results: "Results",
    players: "Players",
    tryouts: "Tryouts",
    training: "My training routine",
    week: "My week",
    partners: "Scrim partners",
    admin: "Admin",
  }[page];
}

function renderPage(store, user) {
  if (currentPage === "dashboard") return dashboard(store);
  if (currentPage === "calendar") return calendarPage(store, canEdit(user), canManageEntity(user, "results"));
  if (currentPage === "results") return resultsPage(store, canManageEntity(user, "results"));
  if (currentPage === "tryouts") return tryoutsPage(store, canManageEntity(user, "tryouts"));
  if (currentPage === "training") return trainingPage(store, user);
  if (currentPage === "week") return weekPage(store, user);
  if (currentPage === "admin") return isAdmin(user) ? adminPage(store, user) : dashboard(store);
  return crudPage(store, currentPage, canManageEntity(user, currentPage), user);
}

function renderAuth(store) {
  app.innerHTML = `
    <div class="auth-screen">
      <section class="auth-panel">
        <div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Rocket League team manager</span></div></div>
        <div class="segmented">
          <button class="selected" data-auth-mode="login">Log in</button>
          <button data-auth-mode="register">Register</button>
        </div>
        <form id="auth-form" data-mode="login" class="form-grid">
          <label class="auth-name hidden"><span>Name</span><input name="name" /></label>
          <label><span>Username</span><input name="username" value="" required /></label>
          <label>
            <span>Password</span>
            <span class="password-field">
              <input name="password" type="password" value="" required />
              <button type="button" class="password-toggle" data-password-toggle aria-label="Show password" title="Show password" aria-pressed="false">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </span>
          </label>
          <button class="primary">Log in</button>
          <p id="auth-message" class="muted"></p>
        </form>
      </section>
      <section class="auth-visual">
      </section>
    </div>
  `;

  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.authMode;
      document.querySelector("#auth-form").dataset.mode = mode;
      document.querySelector(".auth-name").classList.toggle("hidden", mode === "login");
      document.querySelector(".primary").textContent = mode === "login" ? "Log in" : "Send registration";
      document.querySelectorAll("[data-auth-mode]").forEach((item) => item.classList.toggle("selected", item === button));
    });
  });

  document.querySelector("[data-password-toggle]").addEventListener("click", (event) => {
    const toggle = event.currentTarget;
    const input = toggle.closest(".password-field").querySelector('input[name="password"]');
    const shouldShow = input.type === "password";
    input.type = shouldShow ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(shouldShow));
    toggle.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
    toggle.title = shouldShow ? "Hide password" : "Show password";
  });

  document.querySelector("#auth-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const message = document.querySelector("#auth-message");
    if (event.currentTarget.dataset.mode === "login") {
      const user = store.users.find((item) => item.username.toLowerCase() === data.username.toLowerCase() && item.password === data.password);
      if (!user) message.textContent = "Invalid username or password.";
      else if (!user.approved) message.textContent = "This account is still waiting for admin approval.";
      else {
        localStorage.setItem(sessionKey, user.id);
        render();
      }
      return;
    }
    if (store.users.some((item) => item.username.toLowerCase() === data.username.toLowerCase())) {
      message.textContent = "This username is already registered.";
      return;
    }
    store.users.push({ id: uid(), name: data.name || data.username, username: data.username, password: data.password, role: "Player", approved: false, canEdit: false, playerStatsAccess: false, coachAccess: false, createdAt: new Date().toISOString() });
    saveStore(store);
    message.className = "success";
    message.textContent = "Registration sent. An admin has to approve the account before login.";
  });
}

function dashboard(store) {
  const calendar = allCalendarItems(store);
  const upcomingCalendar = calendar.filter((item) => endDate(item) >= new Date());
  const nextTournament = [...store.tournaments].filter((item) => item.dateTime).sort((a, b) => a.dateTime.localeCompare(b.dateTime))[0];
  return `
    <section class="page-grid">
      ${metric("Next tournament", nextTournament?.name || "-", nextTournament ? fmt(nextTournament.dateTime) : "no tournament")}
      <section class="panel"><h2>Active tryouts</h2>${store.tryouts.map((item) => compact(item.rlName, `${teamName(item.teamId)} / average ${average(item.stats)}`)).join("") || `<p class="muted">No tryouts yet.</p>`}</section>
      <section class="panel wide"><h2>Upcoming schedule</h2>${eventList(upcomingCalendar.slice(0, 7))}</section>
    </section>
  `;
}

function metric(title, value, hint) {
  return `<article class="metric"><span>${esc(title)}</span><strong>${esc(value)}</strong><small>${esc(hint)}</small></article>`;
}

function compact(title, subtitle) {
  return `<div class="compact-row"><strong>${esc(title)}</strong><span>${esc(subtitle)}</span></div>`;
}

function eventList(events) {
  return `<div class="event-list">${events.map((item) => compact(item.title, `${fmt(item.dateTime)} / ${item.type} / ${teamName(item.teamId)}`)).join("") || `<p class="muted">No upcoming events.</p>`}</div>`;
}

function crudPage(store, key, editable, user) {
  const schema = schemas[key];
  const rows = filteredRows(store[key], schema, key);
  const playerStatsEditable = key === "players" && canManagePlayerStats(user);
  const form = key === "players"
    ? (editable ? playerForm() : (playerStatsEditable ? playerStatsForm(store.players) : ""))
    : (editable ? entityForm(key, schema) : "");
  return `
    <section class="crud-layout">
      ${toolbar(key, key !== "partners", false, schema.sort)}
      ${form}
      ${key === "players" ? playerRecords(schema, rows, editable) : `<section class="panel wide"><h2>Records</h2>${table(schema.headers, rows.map((item) => [...schema.cells(item), rowActions(editable, key, item.id)]))}</section>`}
    </section>
  `;
}

function playerRecords(schema, rows, editable) {
  const mainRows = captainFirst(rows.filter((item) => item.teamId === "main"));
  const academyRows = captainFirst(rows.filter((item) => item.teamId === "academy"));
  return `
    <section class="panel wide"><h2>Main Team player details</h2><div class="player-card-grid">${mainRows.map((player) => playerDetailCard(player, editable)).join("") || `<p class="muted">No main team players found.</p>`}</div></section>
    <section class="panel wide"><h2>Academy player details</h2><div class="player-card-grid">${academyRows.map((player) => playerDetailCard(player, editable)).join("") || `<p class="muted">No academy players found.</p>`}</div></section>
    <section class="panel wide"><h2>Main Team records</h2>${recordTable(schema, mainRows, editable, "players")}</section>
    <section class="panel wide"><h2>Academy records</h2>${recordTable(schema, academyRows, editable, "players")}</section>
  `;
}

function captainFirst(rows) {
  return [...rows].sort((a, b) => {
    const coachOrder = Number(isCoachRole(a)) - Number(isCoachRole(b));
    if (coachOrder) return coachOrder;
    const captainOrder = Number(isCaptain(b)) - Number(isCaptain(a));
    if (captainOrder) return captainOrder;
    return String(a.rlName || a.name || "").localeCompare(String(b.rlName || b.name || ""));
  });
}

function isCaptain(player) {
  return String(player.position || "").trim().toLowerCase() === "captain";
}

function isCoachRole(player) {
  return String(player.position || "").trim().toLowerCase() === "coach";
}



function recordTable(schema, rows, editable, key) {
  if (!rows.length) return `<p class="muted">No players found.</p>`;
  return table(schema.headers, rows.map((item) => [...schema.cells(item), rowActions(editable, key, item.id)]));
}

function playerDetailCard(player, editable) {
  const coach = isCoachRole(player);
  return `
    <article class="routine-card">
      <div class="routine-card-head">
        <div><h3>${esc(player.rlName || player.name)}</h3><span>${esc(player.name)} / ${esc(player.position)} / ${teamName(player.teamId)}</span></div>
        ${editable ? `<button data-edit="players:${player.id}">Edit</button>` : ""}
      </div>
      ${coach ? "" : `
        <div class="routine-stats">
          ${metricMini("1s peak", player.peak1s || "-")}
          ${metricMini("2s peak", player.peak2s || "-")}
          ${metricMini("3s peak", player.peak3s || "-")}
          ${metricMini("Average", average(player.stats))}
          ${player.profileLink ? `<a class="mini-metric player-link-box" href="${escapeAttr(player.profileLink)}" target="_blank" rel="noreferrer"><span>Link</span><strong>Open</strong></a>` : metricMini("Link", "-")}
        </div>
        <div class="stat-bars">
          ${statKeys.map((key) => `<div><span>${statLabels[key]}</span><strong>${Number(player.stats?.[key] ?? 0)}</strong><meter min="0" max="10" value="${Number(player.stats?.[key] ?? 0)}"></meter></div>`).join("")}
        </div>
      `}
    </article>
  `;
}

function tryoutsPage(store, editable) {
  const rows = filteredRows(store.tryouts, {
    search: (item) => `${item.name} ${item.rlName} ${item.discord} ${item.rank} ${item.opinion}`,
    sort: ["dateTime", "rlName", "teamId"],
  }, "tryouts");
  return `
    <section class="crud-layout">
      ${toolbar("tryouts", true, false, ["dateTime", "rlName", "rank", "teamId"])}
      ${editable ? tryoutForm() : ""}
      <section class="panel wide"><h2>Tryout records</h2>${table(["Date", "Duration", "Name", "RL", "Discord", "Rank", "Team", "Average", "Opinion"], rows.map((item) => [fmtRange(item), `${item.durationMinutes || 0} min`, item.name, item.rlName, item.discord, item.rank, teamName(item.teamId), average(item.stats), item.opinion, rowActions(editable, "tryouts", item.id)]))}</section>
    </section>
  `;
}

function resultsPage(store, editable) {
  const rows = filteredResults(store);
  const tournamentResults = rows.filter((item) => item.type === "Tournament");
  const leagueResults = rows.filter((item) => item.type === "League match");
  const draft = resultDraft || { id: "", resultSource: "", type: "Tournament", title: "", dateTime: "", teamId: "main", opponent: "", placement: "", score: "", notes: "" };
  return `
    <section class="crud-layout">
      ${toolbar("results", true, false, ["dateTime", "title", "teamId"])}
      ${editable ? resultForm(store, draft) : ""}
      ${resultGroup("Tournament results", tournamentResults, editable)}
      ${resultGroup("League match results", leagueResults, editable)}
    </section>
  `;
}

function filteredResults(store) {
  const f = filters.results || {};
  return [...(store.results || [])]
    .filter((item) => !f.query || `${item.title} ${item.opponent} ${item.score} ${item.placement} ${item.notes}`.toLowerCase().includes(f.query.toLowerCase()))
    .filter((item) => !f.team || f.team === "all" || item.teamId === f.team)
    .sort((a, b) => (f.sort || "dateTime") === "dateTime" ? String(b.dateTime || "").localeCompare(String(a.dateTime || "")) : sortCompare(a, b, f.sort || "title"));
}

function resultGroup(title, rows, editable) {
  const mainRows = rows.filter((item) => item.teamId === "main");
  const academyRows = rows.filter((item) => item.teamId === "academy");
  return `
    <section class="panel wide">
      <h2>${title}</h2>
      <div class="result-columns">
        <div>
          <h3>Main Team</h3>
          ${resultTable(mainRows, editable)}
        </div>
        <div>
          <h3>Academy</h3>
          ${resultTable(academyRows, editable)}
        </div>
      </div>
    </section>
  `;
}

function resultTable(rows, editable) {
  if (!rows.length) return `<p class="muted">No results yet.</p>`;
  return table(["Date", "Event", "Opponent", "Placement", "Score / result", "Notes"], rows.map((item) => [
    fmt(item.dateTime),
    item.title,
    item.opponent || "-",
    item.placement || "-",
    item.score || "-",
    item.notes || "",
    rowActions(editable, "results", item.id),
  ]));
}

function completedResultSources(store) {
  return allCalendarItems(store)
    .filter((item) => item.dateTime && endDate(item) < new Date())
    .sort((a, b) => b.dateTime.localeCompare(a.dateTime));
}

function resultSourceKey(item) {
  return `${item.source}:${item.sourceId}`;
}

function findCalendarItem(store, key) {
  return allCalendarItems(store).find((item) => resultSourceKey(item) === key);
}

function findCalendarSource(store, key) {
  const [source, sourceId] = key.split(":");
  if (!store[source]) return null;
  return store[source].find((item) => item.id === sourceId) || null;
}

function selectedOurLineupOption(savedLineup, player) {
  return savedLineup.some((item) => item.id === player.id || item.name === player.rlName || item.name === player.name);
}

function ourLineupOptions(savedPlayer, ownPlayers) {
  const saved = savedPlayer ? [savedPlayer] : [];
  const hasSavedPlayer = savedPlayer && ownPlayers.some((player) => selectedOurLineupOption(saved, player));
  return `
    <option value="">Unknown / empty</option>
    ${savedPlayer && !hasSavedPlayer ? `<option value="" selected disabled>${esc(savedPlayer.name || "Saved player")}</option>` : ""}
    ${ownPlayers.map((player) => `<option value="${player.id}" ${selectedOurLineupOption(saved, player) ? "selected" : ""}>${esc(player.rlName || player.name)}</option>`).join("")}
  `;
}

function collectLineupDraft(store) {
  const opponentInput = document.querySelector('input[name="resultOpponentDraft"]');
  const ourLineup = [0, 1, 2, 3]
    .map((index) => {
      const playerId = document.querySelector(`[name="ourLineup${index}"]`)?.value;
      const player = store.players.find((item) => item.id === playerId);
      return player ? { id: player.id, name: player.rlName || player.name, link: player.profileLink || "" } : null;
    })
    .filter(Boolean);
  const opponentLineup = [0, 1, 2, 3]
    .map((index) => ({
      name: document.querySelector(`[name="opponentLineupName${index}"]`)?.value || "",
      link: document.querySelector(`[name="opponentLineupLink${index}"]`)?.value || "",
    }))
    .filter((player) => player.name || player.link);
  return { lineupOpponent: opponentInput?.value || "", ourLineup, opponentLineup };
}

function saveCalendarLineup(store, key) {
  const source = findCalendarSource(store, key);
  if (!source) return null;
  const draft = collectLineupDraft(store);
  source.lineupOpponent = draft.lineupOpponent;
  source.ourLineup = draft.ourLineup;
  source.opponentLineup = draft.opponentLineup;
  return draft;
}

function resultForm(store, item = { id: "", resultSource: "", type: "Tournament", title: "", dateTime: "", teamId: "main", opponent: "", placement: "", score: "", notes: "" }) {
  const sources = completedResultSources(store);
  return `
    <section class="panel"><h2>${item.id ? "Edit result" : "New result"}</h2>
      <form class="entity-form" data-entity="results" data-id="${item.id || ""}">
        <div class="form-grid">
          <label><span>Played calendar item</span><select name="resultSource" required><option value="">Select played calendar item</option>${sources.map((source) => `<option value="${resultSourceKey(source)}" ${item.resultSource === resultSourceKey(source) ? "selected" : ""}>${esc(source.title)} / ${source.type} / ${teamName(source.teamId)} / ${fmt(source.dateTime)}</option>`).join("")}</select></label>
          ${field("opponent", "Opponent", "text", item.opponent)}
          ${field("placement", "Placement", "text", item.placement)}
          ${field("score", "Score / result", "text", item.score)}
          ${field("notes", "Notes", "textarea", item.notes)}
        </div>
        <button class="primary">Save result</button>
      </form>
    </section>
  `;
}

function trainingPage(store, user) {
  const routines = filteredRows(store.trainingRoutines, {
    search: (item) => `${item.title} ${item.creatorName} ${routineModes(item)} ${(item.customPacks || []).map((pack) => pack.name).join(" ")} ${(item.workshopMaps || []).map((map) => map.name).join(" ")}`,
    sort: ["title", "creatorName"],
  }, "training");
  return `
    <section class="crud-layout">
      ${toolbar("training", false, false, ["title", "creatorName"])}
      ${canCreateTrainingRoutine(user) ? trainingRoutineForm() : ""}
      <section class="panel wide"><h2>Training packs</h2><div class="routine-grid">${routines.map((routine) => trainingRoutineCard(routine, user)).join("") || `<p class="muted">No training routines yet.</p>`}</div></section>
    </section>
  `;
}

function trainingRoutineForm(item = { id: "", title: "", customPackMinutes: "", workshopMapMinutes: "", freeplayMinutes: "", customPacks: [], workshopMaps: [] }) {
  return `
    <section class="panel"><h2>${item.id ? "Edit training routine" : "New training routine"}</h2>
      <form class="entity-form" data-entity="training-routines" data-id="${item.id || ""}">
        <div class="form-grid">
          ${field("title", "Routine name", "text", item.title)}
          ${field("customPackMinutes", "Custom pack minutes", "number", item.customPackMinutes)}
          ${field("workshopMapMinutes", "Workshop map minutes", "number", item.workshopMapMinutes)}
          ${field("freeplayMinutes", "Freeplay minutes", "number", item.freeplayMinutes)}
        </div>
        <details class="custom-map-box">
          <summary>Custom packs</summary>
          <div class="form-grid">
            ${[0, 1, 2, 3, 4].map((index) => trainingItemFields("customPack", index, customPackOptions, item.customPacks?.[index])).join("")}
          </div>
        </details>
        <details class="custom-map-box">
          <summary>Workshop maps</summary>
          <div class="form-grid">
            ${[0, 1, 2, 3, 4].map((index) => trainingItemFields("workshopMap", index, workshopMapOptions, item.workshopMaps?.[index])).join("")}
          </div>
        </details>
        <button class="primary">Save routine</button>
      </form>
    </section>
  `;
}

function trainingItemFields(prefix, index, options, item = {}) {
  return `
    <label><span>${prefix === "customPack" ? "Custom pack" : "Workshop map"} ${index + 1}</span><select name="${prefix}Name${index}"><option value="">None</option>${options.map((name) => `<option value="${name}" ${item.name === name ? "selected" : ""}>${name}</option>`).join("")}</select></label>
    ${field(`${prefix}Minutes${index}`, "Minutes", "number", item.minutes || "")}
  `;
}

function trainingRoutineCard(routine, user) {
  const favorite = routine.favorites.includes(user.id);
  return `
    <article class="routine-card">
      <div class="routine-card-head">
        <div><h3>${esc(routine.title || "Untitled routine")}</h3><span>${esc(routine.creatorName || "Unknown")}</span></div>
        ${canCreateTrainingRoutine(user) ? `<button class="chip ${favorite ? "ok" : ""}" data-routine-favorite="${routine.id}">${favorite ? "Favorited" : "Add favorite"}</button>` : ""}
      </div>
      <div class="routine-stats">
        ${metricMini("Custom pack", `${routine.customPackMinutes || 0} min`)}
        ${metricMini("Workshop", `${routine.workshopMapMinutes || 0} min`)}
        ${metricMini("Freeplay", `${routine.freeplayMinutes || 0} min`)}
      </div>
      <details class="custom-map-box">
        <summary>Custom packs</summary>
        ${(routine.customPacks || []).length ? routine.customPacks.map((pack) => compact(pack.name, `${pack.minutes || 0} minutes`)).join("") : `<p class="muted">No custom packs.</p>`}
      </details>
      <details class="custom-map-box">
        <summary>Workshop maps</summary>
        ${(routine.workshopMaps || []).length ? routine.workshopMaps.map((map) => compact(map.name, `${map.minutes || 0} minutes`)).join("") : `<p class="muted">No workshop maps.</p>`}
      </details>
      <div class="routine-footer">
        <span>${routine.favorites.length} favorites</span>
        ${canCreateTrainingRoutine(user) ? `<button data-routine-edit="${routine.id}">Edit pack</button>` : ""}
        ${isAdmin(user) ? `<button data-routine-delete="${routine.id}">Delete pack</button>` : ""}
      </div>
    </article>
  `;
}

function metricMini(title, value) {
  return `<div class="mini-metric"><span>${esc(title)}</span><strong>${esc(value)}</strong></div>`;
}

function routineModes(item) {
  return `custom pack ${item.customPackMinutes || 0} workshop ${item.workshopMapMinutes || 0} freeplay ${item.freeplayMinutes || 0}`;
}

function weekPage(store, user) {
  const selectedPlayerId = (filters.week || {}).playerId || store.players[0]?.id || "";
  const selectedPlayer = store.players.find((player) => player.id === selectedPlayerId);
  const week = store.weeks.find((item) => item.playerId === selectedPlayerId) || { title: selectedPlayer ? `${selectedPlayer.rlName || selectedPlayer.name}'s week` : "My week", playerId: selectedPlayerId, items: [] };
  const teamEvents = selectedPlayer ? allCalendarItems(store).filter((item) => item.teamId === selectedPlayer.teamId || isAdmin(user)) : [];
  return `
    <section class="crud-layout">
      <div class="toolbar">
        <label><span>Player</span><select data-filter="week" data-filter-kind="playerId">${store.players.map((player) => `<option value="${player.id}" ${player.id === selectedPlayerId ? "selected" : ""}>${esc(player.rlName || player.name)}</option>`).join("")}</select></label>
      </div>
      ${canCreateTrainingRoutine(user) ? weekForm(week, selectedPlayerId) : ""}
      <section class="panel wide"><h2>${esc(week.title || "My week")}</h2>${weekGrid(week.items || [])}</section>
      <section class="panel wide"><h2>Player schedule from calendar</h2>${eventList(teamEvents.slice(0, 12))}</section>
    </section>
  `;
}

function weekForm(week, playerId) {
  return `
    <section class="panel"><h2>Plan week</h2>
      <form class="entity-form" data-entity="week-items" data-player-id="${playerId}">
        <div class="form-grid">
          ${field("title", "Week name", "text", week.title || "")}
          ${field("day", "Day", weekDays, "Monday")}
          ${field("startTime", "Start time", "time")}
          ${field("endTime", "End time", "time")}
          ${field("mode", "Mode", weekModes, "3s")}
          ${field("notes", "Notes", "textarea")}
        </div>
        <button class="primary">Add to week</button>
      </form>
    </section>
  `;
}

function weekGrid(items) {
  return `<div class="week-grid">${weekDays.map((day) => `
    <section class="week-day">
      <h3>${day}</h3>
      ${items.filter((item) => item.day === day).sort((a, b) => String(a.startTime).localeCompare(String(b.startTime))).map((item) => `
        <div class="compact-row">
          <strong>${esc(item.startTime || "--:--")} - ${esc(item.endTime || "--:--")} / ${esc(item.mode)}</strong>
          <span>${esc(item.notes || "")}</span>
          <button data-week-delete="${item.id}">Delete</button>
        </div>
      `).join("") || `<p class="muted">No plan.</p>`}
    </section>
  `).join("")}</div>`;
}

function sortLabel(option) {
  return sortLabels[option] || option.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function calendarPage(store, editable, canRecordResults) {
  const f = filters.calendar || {};
  const events = allCalendarItems(store)
    .filter((item) => !f.query || `${item.title} ${item.notes}`.toLowerCase().includes(f.query.toLowerCase()))
    .filter((item) => !f.team || f.team === "all" || item.teamId === f.team)
    .filter((item) => !f.type || f.type === "all" || item.type === f.type);
  const conflicts = conflictKeys(events);
  const monthStart = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  const monthLabel = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(monthStart);
  return `
    <section class="crud-layout">
      ${toolbar("calendar", true, true, [])}
      ${editable ? calendarForm() : ""}
      <section class="panel wide calendar-panel">
        <div class="calendar-head">
          <h2>${monthLabel}</h2>
          <div class="row-actions">
            <button class="${calendarTimeZone === "CET" ? "selected" : ""}" data-calendar-timezone="CET">CET</button>
            <button class="${calendarTimeZone === "BST" ? "selected" : ""}" data-calendar-timezone="BST">BST</button>
            <button data-calendar-shift="-1">Prev</button>
            <button data-calendar-today="true">Today</button>
            <button data-calendar-shift="1">Next</button>
          </div>
        </div>
        ${monthGrid(events, conflicts, monthStart, editable)}
      </section>
      ${calendarEventDialog(store, canRecordResults)}
    </section>
  `;
}

function monthGrid(events, conflicts, monthStart, editable) {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const first = new Date(monthStart);
  const mondayOffset = (first.getDay() + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - mondayOffset);
  const cells = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const dayEvents = events.filter((item) => sameDay(new Date(item.dateTime), date));
    const inMonth = date.getMonth() === monthStart.getMonth();
    const today = sameDay(date, new Date());
    return `
      <div class="calendar-cell ${inMonth ? "" : "muted-cell"} ${today ? "today-cell" : ""}">
        <div class="day-number">${date.getDate()}</div>
        <div class="day-events">
          ${dayEvents.map((item) => calendarChip(item, conflicts.has(resultSourceKey(item)), editable)).join("")}
        </div>
      </div>
    `;
  });
  return `<div class="calendar-grid">${weekdays.map((day) => `<div class="weekday">${day}</div>`).join("")}${cells.join("")}</div>`;
}

function calendarChip(item, conflict, editable) {
  const time = fmtTime(item.dateTime);
  const duration = Number(item.durationMinutes || 0);
  const end = duration ? `-${fmtTime(endDate(item).toISOString())}` : "";
  return `
    <div class="calendar-chip ${conflict ? "conflict-chip" : ""}" style="border-left-color:${eventColors[item.type]}" data-calendar-open="${resultSourceKey(item)}">
      <div class="chip-main"><strong>${time}${end}</strong><span title="${escapeAttr(item.title)}">${esc(item.title)}</span></div>
      <small>${item.type} / ${teamName(item.teamId)}</small>
      ${editable ? `<div class="chip-actions"><button data-edit="${item.source}:${item.sourceId}">Edit</button><button data-delete="${item.source}:${item.sourceId}">Delete</button></div>` : ""}
    </div>
  `;
}

function calendarEventDialog(store, canRecordResults) {
  if (!selectedCalendarItemKey) return "";
  const item = findCalendarItem(store, selectedCalendarItemKey);
  if (!item) return "";
  const played = endDate(item) < new Date();
  const teamLabel = item.teamId === "academy" ? "Noctiq Academy" : "Noctiq";
  const ownPlayers = store.players.filter((player) => player.teamId === item.teamId && !isCoachRole(player));
  const savedOurLineup = item.ourLineup || [];
  const savedOpponentLineup = item.opponentLineup || [];
  const opponentName = item.lineupOpponent || item.opponent || "";
  return `
    <div class="modal-backdrop" data-calendar-close="true">
      <section class="modal-panel" role="dialog" aria-modal="true">
        <div class="modal-head">
          <div>
            <p class="eyebrow">${fmtRange(item)}</p>
            <h2>${teamLabel} VS <span data-opponent-title>${esc(opponentName || "TBA")}</span></h2>
            <p class="muted">${esc(item.title)} / ${esc(item.type)} / ${teamName(item.teamId)}</p>
          </div>
          <button class="icon-button" data-calendar-close="true" title="Close">X</button>
        </div>
        <div class="form-grid">
          <label><span>Opponent</span><input name="resultOpponentDraft" value="${escapeAttr(opponentName)}" data-opponent-input></label>
        </div>
        <div class="lineup-grid">
          <section class="lineup-panel">
            <h3>Our lineup</h3>
            ${[0, 1, 2, 3].map((index) => `
              <label><span>Player ${index + 1}</span><select name="ourLineup${index}">
                ${ourLineupOptions(savedOurLineup[index], ownPlayers)}
              </select></label>
            `).join("")}
          </section>
          <section class="lineup-panel">
            <h3>Opponent lineup</h3>
            ${[0, 1, 2, 3].map((index) => `
              <div class="lineup-row">
                <label><span>Player ${index + 1}</span><input name="opponentLineupName${index}" value="${escapeAttr(savedOpponentLineup[index]?.name || "")}"></label>
                <label><span>Link</span><input name="opponentLineupLink${index}" type="url" value="${escapeAttr(savedOpponentLineup[index]?.link || "")}"></label>
              </div>
            `).join("")}
          </section>
        </div>
        ${!played ? `<p class="warning">Result can be recorded after this event has been played.</p>` : ""}
        <div class="row-actions modal-actions">
          ${canRecordResults ? `<button class="primary" data-calendar-save-lineup="${resultSourceKey(item)}">Save lineup</button>` : ""}
          ${canRecordResults && played ? `<button class="primary" data-record-result="${resultSourceKey(item)}">Record result</button>` : ""}
          <button data-calendar-close="true">Close</button>
        </div>
      </section>
    </div>
  `;
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function adminPage(store, user) {
  if (!isAdmin(user)) return `<section class="panel"><h2>Admin</h2><p class="warning">Admin access is required for this page.</p></section>`;
  const createdUsers = store.users.filter((item) => !isBuiltInUser(item));
  const userRows = createdUsers.map((item) => [
    esc(item.name),
    esc(item.username),
    permissionLabel(item),
    roleSelect(item),
    accountAccessControls(item),
    accountStatusButton(item),
    item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US") : "-",
    `<button data-user-delete="${item.id}">Delete</button>`,
  ]);
  return `
    <section class="panel wide">
      <h2>Created accounts</h2>
      ${createdUsers.length ? table(["Name", "Username", "Permission", "Role", "Access", "Status", "Created"], userRows) : `<p class="muted">No created accounts yet.</p>`}
    </section>
    <section class="panel wide">
      <h2>Built-in admins</h2>
      ${table(["Name", "Username", "Permission", "Status", "Created"], adminUsers.map((item) => [
        esc(item.name),
        esc(item.username),
        permissionLabel(item),
        "Active",
        new Date(item.createdAt).toLocaleDateString("en-US"),
        "-",
      ]))}
    </section>
  `;
}

function toolbar(key, hasTeam, hasType, sortOptions) {
  const f = filters[key] || {};
  return `
    <div class="toolbar">
      <label><span>Search</span><input data-filter="${key}" data-filter-kind="query" value="${escapeAttr(f.query || "")}" placeholder="Search by name, note, rank..."></label>
      ${hasTeam ? `<label><span>Filter by team</span><select data-filter="${key}" data-filter-kind="team"><option value="all">All teams</option><option value="main" ${f.team === "main" ? "selected" : ""}>Main Team</option><option value="academy" ${f.team === "academy" ? "selected" : ""}>Academy</option></select></label>` : ""}
      ${hasType ? `<label><span>Filter by type</span><select data-filter="${key}" data-filter-kind="type"><option value="all">All types</option>${Object.keys(eventColors).map((type) => `<option ${f.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label>` : ""}
      ${sortOptions.length ? `<label><span>Sort by</span><select data-filter="${key}" data-filter-kind="sort">${sortOptions.map((item) => `<option value="${item}" ${f.sort === item ? "selected" : ""}>${sortLabel(item)}</option>`).join("")}</select></label>` : ""}
    </div>
  `;
}

function entityForm(key, schema, item = schema.empty) {
  return `
    <section class="panel"><h2>${schema.title}</h2>
      <form class="entity-form" data-entity="${key}" data-id="${item.id || ""}">
        <div class="form-grid">${schema.fields.map(([name, label, type]) => field(name, label, type, item[name])).join("")}</div>
        <button class="primary">Save</button>
      </form>
    </section>
  `;
}

function playerForm(item = schemas.players.empty) {
  const stats = { ...emptyStats, ...(item.stats || {}) };
  return `
    <section class="panel"><h2>Player profile</h2>
      <form class="entity-form" data-entity="players" data-id="${item.id || ""}">
        <div class="form-grid">${schemas.players.fields.map(([name, label, type]) => field(name, label, type, item[name])).join("")}</div>
        ${statSliders(stats)}
        <button class="primary">Save / average ${average(stats)}</button>
      </form>
    </section>
  `;
}

function playerStatsForm(players, item = players[0]) {
  if (!item) return "";
  const stats = { ...emptyStats, ...(item.stats || {}) };
  return `
    <section class="panel"><h2>Player rating</h2>
      <form class="entity-form" data-entity="player-stats" data-id="${item.id}">
        <div class="form-grid">
          <label><span>Player</span><select name="playerId" data-player-stat-select>${players.map((player) => `<option value="${player.id}" ${player.id === item.id ? "selected" : ""}>${esc(player.rlName || player.name)}</option>`).join("")}</select></label>
          ${field("notes", "Notes", "textarea", item.notes)}
        </div>
        ${statSliders(stats)}
        <button class="primary">Save rating / average ${average(stats)}</button>
      </form>
    </section>
  `;
}

function tryoutForm(item = { id: "", name: "", rlName: "", discord: "", rank: "", previousTeam: "", availability: "", dateTime: "", durationMinutes: "60", teamId: "main", opinion: "", stats: emptyStats }) {
  const fields = [["name", "Name"], ["rlName", "RL name"], ["discord", "Discord"], ["rank", "Rank / MMR"], ["previousTeam", "Previous team"], ["availability", "Availability"], ["dateTime", "Tryout date", "datetime-local"], ["durationMinutes", "Duration minutes", "number"], ["teamId", "Noctiq team", "team"], ["opinion", "Admin/coach opinion", "textarea"]];
  const stats = { ...emptyStats, ...(item.stats || {}) };
  return `
    <section class="panel"><h2>Tryout entry</h2>
      <form class="entity-form" data-entity="tryouts" data-id="${item.id || ""}">
        <div class="form-grid">${fields.map(([name, label, type]) => field(name, label, type, item[name])).join("")}</div>
        ${statSliders(stats)}
        <button class="primary">Save / average ${average(stats)}</button>
      </form>
    </section>
  `;
}

function statSliders(stats) {
  return `<div class="stat-grid">${statKeys.map((key) => `<label><span>${statLabels[key]}</span><input name="stat-${key}" type="range" min="0" max="10" value="${stats[key]}"><strong>${stats[key]}</strong></label>`).join("")}</div>`;
}

function calendarForm(item = { id: "", title: "", dateTime: "", durationMinutes: "60", type: "Meeting", teamId: "main", notes: "" }) {
  return `
    <section class="panel"><h2>Calendar event</h2>
      <form class="entity-form" data-entity="events" data-id="${item.id || ""}">
        <div class="form-grid">
          ${field("title", "Title", "text", item.title)}
          ${field("dateTime", "Date and time", "datetime-local", item.dateTime)}
          ${field("durationMinutes", "Duration minutes", "number", item.durationMinutes)}
          ${field("type", "Type", eventTypes, item.type)}
          ${field("teamId", "Noctiq team", "team", item.teamId)}
          ${field("notes", "Notes", "textarea", item.notes)}
        </div>
        <button class="primary">Save</button>
      </form>
    </section>
  `;
}

function field(name, label, type = "text", value = "") {
  if (type === "team") {
    return `<label><span>${label}</span><select name="${name}"><option value="main" ${value === "main" ? "selected" : ""}>Main Team</option><option value="academy" ${value === "academy" ? "selected" : ""}>Academy</option></select></label>`;
  }
  if (Array.isArray(type)) {
    return `<label><span>${label}</span><select name="${name}">${type.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
  }
  if (type === "textarea") {
    return `<label><span>${label}</span><textarea name="${name}" rows="2">${esc(value)}</textarea></label>`;
  }
  return `<label><span>${label}</span><input name="${name}" type="${type}" value="${escapeAttr(value)}"></label>`;
}

function table(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${[...headers, ""].map((header) => `<th>${esc(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function rowActions(editable, key, id) {
  if (!editable) return "-";
  return `<div class="row-actions"><button data-edit="${key}:${id}">Edit</button><button data-delete="${key}:${id}">Delete</button></div>`;
}

function filteredRows(rows, schema, key) {
  const f = filters[key] || {};
  return [...rows]
    .filter((item) => !f.query || schema.search(item).toLowerCase().includes(f.query.toLowerCase()))
    .filter((item) => !f.team || f.team === "all" || item.teamId === f.team)
    .sort((a, b) => sortCompare(a, b, f.sort || schema.sort[0]));
}

function sortCompare(a, b, key) {
  if (["prizeEur", "maxTeams", "registeredTeams"].includes(key)) return Number(b[key] || 0) - Number(a[key] || 0);
  return String(a[key] || "").localeCompare(String(b[key] || ""));
}

document.addEventListener("click", (event) => {
  const store = loadStore();
  const activeUser = getUser(store);
  const calendarChip = event.target.closest("[data-calendar-open]");

  if (event.target.dataset?.calendarClose) {
    selectedCalendarItemKey = "";
    render();
    return;
  }

  if (calendarChip && !event.target.closest("button")) {
    selectedCalendarItemKey = calendarChip.dataset.calendarOpen;
    render();
    return;
  }

  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.page) {
    currentPage = button.dataset.page;
    render();
  }

  if (button.dataset.calendarClose) {
    selectedCalendarItemKey = "";
    render();
  }

  if (button.dataset.calendarSaveLineup) {
    if (!canManageEntity(activeUser, "results")) return;
    if (!saveCalendarLineup(store, button.dataset.calendarSaveLineup)) return;
    saveStore(store);
    render();
  }

  if (button.dataset.recordResult) {
    if (!canManageEntity(activeUser, "results")) return;
    const source = findCalendarItem(store, button.dataset.recordResult);
    if (!source) return;
    const lineupDraft = saveCalendarLineup(store, button.dataset.recordResult) || { lineupOpponent: "" };
    saveStore(store);
    resultDraft = {
      id: "",
      resultSource: button.dataset.recordResult,
      type: source.type === "Tournament" ? "Tournament" : "League match",
      title: source.title,
      dateTime: source.dateTime,
      teamId: source.teamId,
      opponent: lineupDraft.lineupOpponent || source.opponent || "",
      placement: "",
      score: "",
      notes: "",
    };
    selectedCalendarItemKey = "";
    currentPage = "results";
    render();
  }

  if (button.dataset.action === "logout") {
    if (!confirm("Are you sure you want to log out?")) return;
    localStorage.removeItem(sessionKey);
    render();
  }

  if (button.dataset.calendarShift) {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + Number(button.dataset.calendarShift), 1);
    render();
  }

  if (button.dataset.calendarToday) {
    calendarMonth = new Date();
    render();
  }

  if (button.dataset.calendarTimezone) {
    calendarTimeZone = button.dataset.calendarTimezone;
    render();
  }

  if (button.dataset.delete) {
    const [key, id] = button.dataset.delete.split(":");
    if (!canManageEntity(activeUser, key)) return;
    if (["events", "scrims", "tournaments", "tryouts", "results"].includes(key) && !confirm("Are you sure you want to delete this item?")) return;
    store[key] = store[key].filter((item) => item.id !== id);
    saveStore(store);
    render();
  }

  if (button.dataset.edit) {
    const [key, id] = button.dataset.edit.split(":");
    if (!canManageEntity(activeUser, key)) return;
    const item = store[key].find((entry) => entry.id === id);
    const formPanel = document.querySelector(".crud-layout .panel");
    if (!item || !formPanel) return;
    if (key === "tryouts") formPanel.outerHTML = tryoutForm(item);
    else if (key === "events") formPanel.outerHTML = calendarForm(item);
    else if (key === "players") formPanel.outerHTML = playerForm(item);
    else if (key === "results") formPanel.outerHTML = resultForm(store, item);
    else formPanel.outerHTML = entityForm(key, schemas[key], item);
  }

  if (button.dataset.routineFavorite) {
    if (!canCreateTrainingRoutine(activeUser)) return;
    const routine = store.trainingRoutines.find((item) => item.id === button.dataset.routineFavorite);
    if (!routine || !activeUser) return;
    routine.favorites = routine.favorites || [];
    if (routine.favorites.includes(activeUser.id)) routine.favorites = routine.favorites.filter((id) => id !== activeUser.id);
    else routine.favorites.push(activeUser.id);
    saveStore(store);
    render();
  }

  if (button.dataset.routineEdit) {
    if (!canCreateTrainingRoutine(activeUser)) return;
    const routine = store.trainingRoutines.find((item) => item.id === button.dataset.routineEdit);
    const formPanel = document.querySelector(".crud-layout .panel");
    if (routine && formPanel) formPanel.outerHTML = trainingRoutineForm(routine);
  }

  if (button.dataset.routineDelete) {
    if (!isAdmin(activeUser)) return;
    if (!confirm("Are you sure you want to delete this training pack?")) return;
    store.trainingRoutines = store.trainingRoutines.filter((item) => item.id !== button.dataset.routineDelete);
    saveStore(store);
    render();
  }

  if (button.dataset.userApproved) {
    if (!isAdmin(activeUser)) return;
    const user = store.users.find((item) => item.id === button.dataset.userApproved);
    if (!user || isBuiltInUser(user)) return;
    user.approved = !user.approved;
    if (!user.approved && localStorage.getItem(sessionKey) === user.id) localStorage.removeItem(sessionKey);
    saveStore(store);
    render();
  }

  if (button.dataset.userDelete) {
    if (!isAdmin(activeUser)) return;
    const user = store.users.find((item) => item.id === button.dataset.userDelete);
    if (!user || isBuiltInUser(user)) return;
    if (!confirm(`Are you sure you want to delete ${user.username}?`)) return;
    store.users = store.users.filter((item) => item.id !== button.dataset.userDelete);
    if (localStorage.getItem(sessionKey) === button.dataset.userDelete) localStorage.removeItem(sessionKey);
    saveStore(store);
    render();
  }

  if (button.dataset.weekDelete) {
    if (!canCreateTrainingRoutine(activeUser)) return;
    for (const week of store.weeks) {
      week.items = (week.items || []).filter((item) => item.id !== button.dataset.weekDelete);
    }
    saveStore(store);
    render();
  }
});

document.addEventListener("submit", (event) => {
  if (!event.target.matches(".entity-form")) return;
  event.preventDefault();
  const store = loadStore();
  const activeUser = getUser(store);
  const form = event.target;
  const key = form.dataset.entity;
  if (key === "player-stats" && !canManagePlayerStats(activeUser)) return;
  if (key === "training-routines" && !canCreateTrainingRoutine(activeUser)) return;
  if (key === "week-items" && !canCreateTrainingRoutine(activeUser)) return;
  if (!["player-stats", "training-routines", "week-items"].includes(key) && !canManageEntity(activeUser, key)) return;
  const entry = Object.fromEntries(new FormData(form));

  if (key === "player-stats") {
    const player = store.players.find((item) => item.id === entry.playerId);
    if (!player) return;
    player.stats = Object.fromEntries(statKeys.map((stat) => [stat, Number(entry[`stat-${stat}`] || 5)]));
    player.notes = entry.notes || "";
    saveStore(store);
    render();
    return;
  }

  if (key === "training-routines") {
    const customPacks = [0, 1, 2, 3, 4]
      .map((index) => ({ name: entry[`customPackName${index}`], minutes: entry[`customPackMinutes${index}`] }))
      .filter((pack) => pack.name && Number(pack.minutes || 0) > 0);
    const workshopMaps = [0, 1, 2, 3, 4]
      .map((index) => ({ name: entry[`workshopMapName${index}`], minutes: entry[`workshopMapMinutes${index}`] }))
      .filter((map) => map.name && Number(map.minutes || 0) > 0);
    const routine = {
      id: form.dataset.id || uid(),
      title: entry.title || "Untitled routine",
      creatorId: activeUser.id,
      creatorName: activeUser.name,
      customPackMinutes: entry.customPackMinutes,
      workshopMapMinutes: entry.workshopMapMinutes,
      freeplayMinutes: entry.freeplayMinutes,
      customPacks,
      workshopMaps,
      favorites: store.trainingRoutines.find((item) => item.id === form.dataset.id)?.favorites || [],
    };
    const index = store.trainingRoutines.findIndex((item) => item.id === routine.id);
    if (index >= 0) store.trainingRoutines[index] = routine;
    else store.trainingRoutines.push(routine);
    saveStore(store);
    render();
    return;
  }

  if (key === "week-items") {
    const playerId = form.dataset.playerId;
    let week = store.weeks.find((item) => item.playerId === playerId);
    if (!week) {
      week = { id: uid(), playerId, title: entry.title || "My week", items: [] };
      store.weeks.push(week);
    }
    week.title = entry.title || week.title || "My week";
    week.items.push({ id: uid(), day: entry.day, startTime: entry.startTime, endTime: entry.endTime, mode: entry.mode, notes: entry.notes });
    saveStore(store);
    render();
    return;
  }

  if (key === "results") {
    const source = completedResultSources(store).find((item) => resultSourceKey(item) === entry.resultSource);
    if (!source) return;
    entry.type = source.type === "Tournament" ? "Tournament" : "League match";
    entry.title = source.title;
    entry.dateTime = source.dateTime;
    entry.teamId = source.teamId;
    entry.source = source.source;
    entry.sourceId = source.sourceId;
    entry.tournamentId = source.source === "tournaments" ? source.sourceId : "";
    resultDraft = null;
  }

  if (key === "tryouts" || key === "players") {
    entry.stats = Object.fromEntries(statKeys.map((stat) => [stat, Number(entry[`stat-${stat}`] || 5)]));
    statKeys.forEach((stat) => delete entry[`stat-${stat}`]);
  }

  entry.id = form.dataset.id || uid();
  const index = store[key].findIndex((item) => item.id === entry.id);
  if (index >= 0) store[key][index] = entry;
  else store[key].push(entry);
  saveStore(store);
  render();
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-filter]")) {
    const key = event.target.dataset.filter;
    const kind = event.target.dataset.filterKind;
    filters[key] = { ...(filters[key] || {}), [kind]: event.target.value };
    if (kind === "query") {
      clearTimeout(filterTimer);
      filterTimer = setTimeout(render, 250);
      return;
    }
    render();
  }

  if (event.target.matches('input[type="range"]')) {
    event.target.nextElementSibling.textContent = event.target.value;
  }

  if (event.target.matches("[data-opponent-input]")) {
    const target = document.querySelector("[data-opponent-title]");
    if (target) target.textContent = event.target.value || "TBA";
  }
});

document.addEventListener("change", (event) => {
  const store = loadStore();
  const activeUser = getUser(store);

  if (event.target.matches("[data-filter]")) {
    const key = event.target.dataset.filter;
    const kind = event.target.dataset.filterKind;
    filters[key] = { ...(filters[key] || {}), [kind]: event.target.value };
    render();
  }

  if (event.target.matches("[data-user-role]")) {
    if (!isAdmin(activeUser)) return;
    const user = store.users.find((item) => item.id === event.target.dataset.userRole);
    if (!user || isBuiltInUser(user)) return;
    user.role = event.target.value;
    user.canEdit = user.role === "Admin";
    if (user.role === "Coach") {
      user.coachAccess = true;
      user.playerStatsAccess = true;
    }
    saveStore(store);
    render();
  }

  if (event.target.matches("[data-user-coach-access]")) {
    if (!isAdmin(activeUser)) return;
    const user = store.users.find((item) => item.id === event.target.dataset.userCoachAccess);
    if (!user || isBuiltInUser(user)) return;
    user.coachAccess = event.target.checked;
    saveStore(store);
    render();
  }

  if (event.target.matches("[data-user-stats-access]")) {
    if (!isAdmin(activeUser)) return;
    const user = store.users.find((item) => item.id === event.target.dataset.userStatsAccess);
    if (!user || isBuiltInUser(user)) return;
    user.playerStatsAccess = event.target.checked;
    saveStore(store);
    render();
  }

  if (event.target.matches("[data-player-stat-select]")) {
    if (!canManagePlayerStats(activeUser)) return;
    const player = store.players.find((item) => item.id === event.target.value);
    const formPanel = event.target.closest(".panel");
    if (player && formPanel) formPanel.outerHTML = playerStatsForm(store.players, player);
  }
});

initRemoteStore();
