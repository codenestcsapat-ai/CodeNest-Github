import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const sessionKey = "noctiq-manager-session";
const app = document.querySelector("#app");
const firebaseReady = Object.values(firebaseConfig).every((value) => typeof value === "string" && value && !value.startsWith("PASTE_"));
let firebaseApp = null;
let db = null;
let storeRef = null;
if (firebaseReady) {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  storeRef = doc(db, "noctiqManager", "main");
}
let currentStore = null;

let currentPage = "dashboard";
let filters = {};
let filterTimer;
let calendarMonth = new Date();

const teams = [
  { id: "main", name: "Noctiq eSports", label: "Main Team" },
  { id: "academy", name: "Noctiq eSports Academy", label: "Academy" },
];

const eventColors = {
  Scrim: "#3f96ff",
  Tournament: "#f2f5ff",
  Tryout: "#a65cff",
  Meeting: "#c34cff",
  "Free Play": "#7d5cff",
  Training: "#6fb6ff",
  Other: "#aab6d6",
};

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
  contact: "Contact",
};
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
    { id: "p1", name: "Milan Kovacs", rlName: "Noctiq.Milo", discord: "milo.rl", teamId: "main", position: "Starter", mmr: "1900+ SSL", availability: "Weekdays after 18:00", notes: "Core rotation leader.", status: "active", stats: { mechanics: 8, rotation: 8, communication: 7, gameSense: 8, consistency: 8, mentality: 8, teamFit: 9 } },
    { id: "p2", name: "Bence Varga", rlName: "Vargaa", discord: "vargaa", teamId: "academy", position: "Flex", mmr: "1700 GC3", availability: "Weekends and evenings", notes: "Developing mechanics, strong communication.", status: "active", stats: { mechanics: 7, rotation: 6, communication: 7, gameSense: 6, consistency: 6, mentality: 7, teamFit: 7 } },
  ],
  tryouts: [
    { id: "tr1", name: "Adam Toth", rlName: "Axi", discord: "axi_rl", rank: "1800 MMR", previousTeam: "Orbit Mix", availability: "Tuesday, Thursday 19:00", dateTime: "2026-06-02T19:00", teamId: "academy", opinion: "Confident third man, needs another comms test.", stats: { mechanics: 8, rotation: 7, communication: 6, gameSense: 8, consistency: 7, mentality: 8, teamFit: 7 } },
  ],
  scrims: [
    { id: "s1", dateTime: "2026-05-29T20:00", opponent: "Velocity Blue", level: "1900+", teamId: "main", notes: "BO7 practice" },
    { id: "s2", dateTime: "2026-05-30T18:30", opponent: "Neon Wolves", level: "1800", teamId: "academy", notes: "Rotation focus" },
  ],
  partners: [
    { id: "sp1", name: "Neon Wolves", level: "1800", contact: "wolfcoach", notes: "Flexible schedule, Tuesdays work well." },
    { id: "sp2", name: "Velocity Blue", level: "1900+", contact: "vel.blue", notes: "Strong opponent, ideal for the main team." },
  ],
  tournaments: [
    { id: "t1", name: "RL Central Cup", dateTime: "2026-06-08T19:00", prizeEur: "500", maxTeams: "32", registeredTeams: "18", link: "https://example.com/rl-central", notes: "Main roster priority.", teamId: "main" },
    { id: "t2", name: "Academy Open", dateTime: "2026-06-12T18:00", prizeEur: "150", maxTeams: "24", registeredTeams: "9", link: "", notes: "Good experience builder.", teamId: "academy" },
  ],
  events: [
    { id: "e1", title: "Main review meeting", dateTime: "2026-05-29T20:00", type: "Meeting", teamId: "main", notes: "Post-scrim VOD review." },
    { id: "e2", title: "Academy free play", dateTime: "2026-05-31T17:00", type: "Free Play", teamId: "academy", notes: "Optional." },
    { id: "e3", title: "Main training block", dateTime: "2026-06-03T19:00", type: "Training", teamId: "main", notes: "Kickoff variations." },
  ],
  trainingRoutines: [
    { id: "r1", title: "Academy mechanics week", creatorId: "academy-coach", creatorName: "Academy Coach", weeklyDay: "Tuesday", startTime: "18:00", totalHours: "6", onesMinutes: "45", twosMinutes: "60", threesMinutes: "90", freeplayMinutes: "45", customMaps: [{ name: "Dribble Challenge 2", minutes: "40" }, { name: "Aim Training by Coco", minutes: "40" }], favorites: [] },
  ],
};

const schemas = {
  scrims: {
    title: "Scrim entry",
    empty: { id: "", dateTime: "", opponent: "", level: "", teamId: "main", notes: "" },
    fields: [["dateTime", "Date and start time", "datetime-local"], ["opponent", "Opponent"], ["level", "Level / MMR"], ["teamId", "Noctiq team", "team"], ["notes", "Notes", "textarea"]],
    headers: ["Date", "Opponent", "Level", "Team", "Notes"],
    cells: (item) => [fmt(item.dateTime), item.opponent, item.level, teamName(item.teamId), item.notes],
    search: (item) => `${item.opponent} ${item.level} ${item.notes}`,
    sort: ["dateTime", "opponent", "level", "teamId"],
  },
  tournaments: {
    title: "Tournament entry",
    empty: { id: "", name: "", dateTime: "", prizeEur: "", maxTeams: "", registeredTeams: "", link: "", notes: "", teamId: "main" },
    fields: [["name", "Tournament name"], ["dateTime", "Start time", "datetime-local"], ["prizeEur", "Prize pool EUR", "number"], ["maxTeams", "Max teams", "number"], ["registeredTeams", "Registered teams", "number"], ["link", "Registration link", "url"], ["teamId", "Noctiq team", "team"], ["notes", "Notes", "textarea"]],
    headers: ["Date", "Name", "Prize", "Max", "Registered", "Team", "Link", "Notes"],
    cells: (item) => [fmt(item.dateTime), item.name, `${item.prizeEur || "-"} EUR`, item.maxTeams || "-", item.registeredTeams || "-", teamName(item.teamId), item.link ? `<a href="${escapeAttr(item.link)}" target="_blank">Open</a>` : "-", item.notes],
    search: (item) => `${item.name} ${item.notes}`,
    sort: ["dateTime", "prizeEur", "maxTeams", "registeredTeams", "teamId"],
  },
  players: {
    title: "Player profile",
    empty: { id: "", name: "", rlName: "", discord: "", teamId: "main", position: "", mmr: "", availability: "", notes: "", status: "active", stats: emptyStats },
    fields: [["name", "Name"], ["rlName", "Rocket League name"], ["discord", "Discord"], ["teamId", "Team", "team"], ["position", "Role / position"], ["mmr", "MMR / rank"], ["availability", "Availability"], ["status", "Status", ["active", "inactive", "sub", "tryout"]], ["notes", "Notes", "textarea"]],
    headers: ["Name", "RL", "Discord", "Team", "Role", "Rank", "Average", "Status", "Notes"],
    cells: (item) => [item.name, item.rlName, item.discord, teamName(item.teamId), item.position, item.mmr, average(item.stats), item.status, item.notes],
    search: (item) => `${item.name} ${item.rlName} ${item.discord} ${item.mmr}`,
    sort: ["name", "rlName", "teamId", "status"],
  },
  partners: {
    title: "Scrim partner",
    empty: { id: "", name: "", level: "", contact: "", notes: "" },
    fields: [["name", "Team name"], ["level", "Approx. level / MMR"], ["contact", "Contact / Discord"], ["notes", "Notes", "textarea"]],
    headers: ["Team", "Level", "Contact", "Notes"],
    cells: (item) => [item.name, item.level, item.contact, item.notes],
    search: (item) => `${item.name} ${item.level} ${item.contact} ${item.notes}`,
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
  await setDoc(storeRef, { ...cleanStore, updatedAt: serverTimestamp() }, { merge: true });
}

async function initRemoteStore() {
  if (!firebaseReady) {
    app.innerHTML = `<div class="auth-screen"><section class="auth-panel"><div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Firebase config missing</span></div></div><p class="warning">Open firebaseConfig.js and replace the PASTE_YOUR... placeholder values with your Firebase web app config. If you opened index.html directly from the ZIP, run it from a local server too.</p></section></div>`;
    return;
  }
  app.innerHTML = `<div class="auth-screen"><section class="auth-panel"><div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Loading shared database...</span></div></div></section></div>`;
  try {
    const firstSnapshot = await getDoc(storeRef);
    if (!firstSnapshot.exists()) {
      await saveStore(structuredClone(seedStore));
    }
    onSnapshot(storeRef, (snapshot) => {
      currentStore = normalizeStore(snapshot.exists() ? snapshot.data() : structuredClone(seedStore));
      render();
    }, (error) => {
      console.error(error);
      app.innerHTML = `<div class="auth-screen"><section class="auth-panel"><div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Database error</span></div></div><p class="warning">Firestore connection failed. Check firebaseConfig.js and Firestore rules.</p></section></div>`;
    });
  } catch (error) {
    console.error(error);
    app.innerHTML = `<div class="auth-screen"><section class="auth-panel"><div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Database error</span></div></div><p class="warning">Firestore connection failed. Check firebaseConfig.js and Firestore rules.</p></section></div>`;
  }
}

function normalizeStore(store) {
  const storedUsers = (store.users || [])
    .map((user) => ({ ...user, username: user.username || user.email || user.name || "" }))
    .filter((user) => !builtInUsers.some((builtInUser) => builtInUser.username.toLowerCase() === user.username.toLowerCase()))
    .map((user) => ({ ...user, name: user.name || user.username, role: user.role === "Viewer" ? "Player" : (user.role || "Player"), approved: true, canEdit: false, systemAdmin: false, playerStatsAccess: Boolean(user.playerStatsAccess), coachAccess: user.role === "Coach" || Boolean(user.coachAccess) }));
  const players = (store.players || []).map((player) => ({ ...player, notes: player.notes || "", stats: { ...emptyStats, ...(player.stats || {}) } }));
  const trainingRoutines = (store.trainingRoutines || []).map((routine) => ({ ...routine, weeklyDay: displayWeekDay(routine.weeklyDay), customMaps: routine.customMaps || [], favorites: routine.favorites || [] }));
  return { ...seedStore, ...store, users: [...builtInUsers, ...storedUsers], players, trainingRoutines };
}

function uid() {
  return crypto.randomUUID();
}

function getUser(store) {
  return store.users.find((user) => user.id === localStorage.getItem(sessionKey));
}

function isAdmin(user) {
  return Boolean(user?.systemAdmin || adminUsers.some((admin) => admin.id === user?.id));
}

function isBuiltInUser(user) {
  return builtInUsers.some((builtInUser) => builtInUser.id === user?.id || builtInUser.username.toLowerCase() === user?.username?.toLowerCase());
}

function canEdit(user) {
  return isAdmin(user);
}

function isCoach(user) {
  return Boolean(user?.coachAccess || user?.role === "Coach" || user?.playerStatsAccess);
}

function canManagePlayerStats(user) {
  return isAdmin(user) || isCoach(user);
}

function canManageEntity(user, key) {
  if (isAdmin(user)) return true;
  return isCoach(user) && ["scrims", "tryouts"].includes(key);
}

function canCreateTrainingRoutine(user) {
  return isAdmin(user) || isCoach(user);
}

function permissionLabel(user) {
  if (isAdmin(user)) return "Built-in admin";
  if (isCoach(user)) return "Coach";
  return "Player";
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

function allCalendarItems(store) {
  const events = store.events.map((item) => ({ ...item, source: "events", sourceId: item.id }));
  const scrims = store.scrims.map((item) => ({ id: `scrim-${item.id}`, sourceId: item.id, title: `Scrim vs ${item.opponent || "TBA"}`, dateTime: item.dateTime, type: "Scrim", teamId: item.teamId, notes: item.notes, source: "scrims" }));
  const tournaments = store.tournaments.map((item) => ({ id: `tournament-${item.id}`, sourceId: item.id, title: item.name || "Tournament", dateTime: item.dateTime, type: "Tournament", teamId: item.teamId, notes: item.notes, source: "tournaments" }));
  const tryouts = store.tryouts.map((item) => ({ id: `tryout-${item.id}`, sourceId: item.id, title: `Tryout: ${item.rlName || item.name || "TBA"}`, dateTime: item.dateTime, type: "Tryout", teamId: item.teamId, notes: item.opinion, source: "tryouts" }));
  return [...events, ...scrims, ...tournaments, ...tryouts].filter((item) => item.dateTime).sort((a, b) => a.dateTime.localeCompare(b.dateTime));
}

function render() {
  const store = loadStore();
  const user = getUser(store);
  if (!user) {
    renderAuth(store);
    return;
  }

  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">${logoMarkup}<div><strong>Noctiq Manager</strong><span>Rocket League team manager</span></div></div>
        <nav>
          ${navButton("dashboard", "Overview")}
          ${navButton("calendar", "Calendar")}
          ${navButton("scrims", "Scrims")}
          ${navButton("tournaments", "Tournaments")}
          ${navButton("players", "Players")}
          ${navButton("tryouts", "Tryouts")}
          ${navButton("training", "My training routine")}
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
    players: "Players",
    tryouts: "Tryouts",
    training: "My training routine",
    partners: "Scrim partners",
    admin: "Admin",
  }[page];
}

function renderPage(store, user) {
  if (currentPage === "dashboard") return dashboard(store);
  if (currentPage === "calendar") return calendarPage(store, canEdit(user));
  if (currentPage === "tryouts") return tryoutsPage(store, canManageEntity(user, "tryouts"));
  if (currentPage === "training") return trainingPage(store, user);
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
    store.users.push({ id: uid(), name: data.name || data.username, username: data.username, password: data.password, role: "Player", approved: true, canEdit: false, createdAt: new Date().toISOString() });
    saveStore(store);
    message.className = "success";
    message.textContent = "Registration complete. You can log in with player read-only access.";
  });
}

function dashboard(store) {
  const calendar = allCalendarItems(store);
  const nextTournament = [...store.tournaments].filter((item) => item.dateTime).sort((a, b) => a.dateTime.localeCompare(b.dateTime))[0];
  return `
    <section class="page-grid">
      ${metric("Next tournament", nextTournament?.name || "-", nextTournament ? fmt(nextTournament.dateTime) : "no tournament")}
      <section class="panel"><h2>Active tryouts</h2>${store.tryouts.map((item) => compact(item.rlName, `${teamName(item.teamId)} / average ${average(item.stats)}`)).join("") || `<p class="muted">No tryouts yet.</p>`}</section>
      <section class="panel wide"><h2>Upcoming schedule</h2>${eventList(calendar.slice(0, 7))}</section>
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
    <section class="panel wide"><h2>Main Team records</h2>${recordTable(schema, mainRows, editable, "players")}</section>
    <section class="panel wide"><h2>Academy records</h2>${recordTable(schema, academyRows, editable, "players")}</section>
  `;
}

function captainFirst(rows) {
  return [...rows].sort((a, b) => Number(isCaptain(b)) - Number(isCaptain(a)));
}

function isCaptain(player) {
  return String(player.position || "").trim().toLowerCase() === "captain";
}



function recordTable(schema, rows, editable, key) {
  if (!rows.length) return `<p class="muted">No players found.</p>`;
  return table(schema.headers, rows.map((item) => [...schema.cells(item), rowActions(editable, key, item.id)]));
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
      <section class="panel wide"><h2>Tryout records</h2>${table(["Date", "Name", "RL", "Discord", "Rank", "Team", "Average", "Opinion"], rows.map((item) => [fmt(item.dateTime), item.name, item.rlName, item.discord, item.rank, teamName(item.teamId), average(item.stats), item.opinion, rowActions(editable, "tryouts", item.id)]))}</section>
    </section>
  `;
}

function trainingPage(store, user) {
  const routines = filteredRows(store.trainingRoutines, {
    search: (item) => `${item.title} ${item.creatorName} ${item.weeklyDay} ${routineModes(item)} ${item.customMaps.map((map) => map.name).join(" ")}`,
    sort: ["title", "creatorName", "weeklyDay", "totalHours"],
  }, "training");
  return `
    <section class="crud-layout">
      ${toolbar("training", false, false, ["title", "creatorName", "weeklyDay", "totalHours"])}
      ${canCreateTrainingRoutine(user) ? trainingRoutineForm() : ""}
      <section class="panel wide"><h2>Training packs</h2><div class="routine-grid">${routines.map((routine) => trainingRoutineCard(routine, user)).join("") || `<p class="muted">No training routines yet.</p>`}</div></section>
    </section>
  `;
}

function trainingRoutineForm() {
  return `
    <section class="panel"><h2>New training routine</h2>
      <form class="entity-form" data-entity="training-routines">
        <div class="form-grid">
          ${field("title", "Routine name")}
          ${field("weeklyDay", "Weekly day", weekDays, "Monday")}
          ${field("startTime", "Start time", "time")}
          ${field("totalHours", "Weekly hours", "number")}
          ${field("onesMinutes", "1s minutes", "number")}
          ${field("twosMinutes", "2s minutes", "number")}
          ${field("threesMinutes", "3s minutes", "number")}
          ${field("freeplayMinutes", "Freeplay minutes", "number")}
        </div>
        <details class="custom-map-box">
          <summary>Custom maps</summary>
          <div class="form-grid">
            ${[0, 1, 2].map((index) => customMapFields(index)).join("")}
          </div>
        </details>
        <button class="primary">Save routine</button>
      </form>
    </section>
  `;
}

function customMapFields(index, map = {}) {
  return `
    <label><span>Custom map ${index + 1}</span><select name="customMapName${index}"><option value="">None</option>${customMapOptions.map((name) => `<option value="${name}" ${map.name === name ? "selected" : ""}>${name}</option>`).join("")}</select></label>
    ${field(`customMapMinutes${index}`, "Minutes", "number", map.minutes || "")}
  `;
}

function trainingRoutineCard(routine, user) {
  const favorite = routine.favorites.includes(user.id);
  return `
    <article class="routine-card">
      <div class="routine-card-head">
        <div><h3>${esc(routine.title || "Untitled routine")}</h3><span>${esc(routine.creatorName || "Unknown")} / ${esc(displayWeekDay(routine.weeklyDay) || "-")} ${esc(routine.startTime || "")}</span></div>
        ${canCreateTrainingRoutine(user) ? `<button class="chip ${favorite ? "ok" : ""}" data-routine-favorite="${routine.id}">${favorite ? "Favorited" : "Add favorite"}</button>` : ""}
      </div>
      <div class="routine-stats">
        ${metricMini("Weekly hours", routine.totalHours || "0")}
        ${metricMini("1s", `${routine.onesMinutes || 0} min`)}
        ${metricMini("2s", `${routine.twosMinutes || 0} min`)}
        ${metricMini("3s", `${routine.threesMinutes || 0} min`)}
        ${metricMini("Freeplay", `${routine.freeplayMinutes || 0} min`)}
      </div>
      <details class="custom-map-box">
        <summary>Custom map list</summary>
        ${routine.customMaps.length ? routine.customMaps.map((map) => compact(map.name, `${map.minutes || 0} minutes`)).join("") : `<p class="muted">No custom maps.</p>`}
      </details>
      <div class="routine-footer">
        <span>${routine.favorites.length} favorites</span>
        ${isAdmin(user) ? `<button data-routine-delete="${routine.id}">Delete pack</button>` : ""}
      </div>
    </article>
  `;
}

function metricMini(title, value) {
  return `<div class="mini-metric"><span>${esc(title)}</span><strong>${esc(value)}</strong></div>`;
}

function routineModes(item) {
  return `1s ${item.onesMinutes || 0} 2s ${item.twosMinutes || 0} 3s ${item.threesMinutes || 0} freeplay ${item.freeplayMinutes || 0}`;
}

function sortLabel(option) {
  return sortLabels[option] || option.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function calendarPage(store, editable) {
  const f = filters.calendar || {};
  const events = allCalendarItems(store)
    .filter((item) => !f.query || `${item.title} ${item.notes}`.toLowerCase().includes(f.query.toLowerCase()))
    .filter((item) => !f.team || f.team === "all" || item.teamId === f.team)
    .filter((item) => !f.type || f.type === "all" || item.type === f.type);
  const conflicts = new Set(events.filter((item) => events.filter((other) => other.dateTime === item.dateTime).length > 1).map((item) => item.dateTime));
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
            <button data-calendar-shift="-1">Prev</button>
            <button data-calendar-today="true">Today</button>
            <button data-calendar-shift="1">Next</button>
          </div>
        </div>
        ${monthGrid(events, conflicts, monthStart, editable)}
      </section>
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
          ${dayEvents.map((item) => calendarChip(item, conflicts.has(item.dateTime), editable)).join("")}
        </div>
      </div>
    `;
  });
  return `<div class="calendar-grid">${weekdays.map((day) => `<div class="weekday">${day}</div>`).join("")}${cells.join("")}</div>`;
}

function calendarChip(item, conflict, editable) {
  const time = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(new Date(item.dateTime));
  return `
    <div class="calendar-chip ${conflict ? "conflict-chip" : ""}" style="border-left-color:${eventColors[item.type]}">
      <div class="chip-main"><strong>${time}</strong><span>${esc(item.title)}</span></div>
      <small>${item.type} / ${teamName(item.teamId)}</small>
      ${editable ? `<div class="chip-actions"><button data-edit="${item.source}:${item.sourceId}">Edit</button><button data-delete="${item.source}:${item.sourceId}">Delete</button></div>` : ""}
    </div>
  `;
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function adminPage(store, user) {
  if (!isAdmin(user)) return `<section class="panel"><h2>Admin</h2><p class="warning">Admin access is required for this page.</p></section>`;
  return `
    <section class="panel wide">
      <h2>Users</h2>
      ${table(["Name", "Username", "Permission", "Status", "Created"], store.users.map((item) => [
        item.name,
        item.username,
        permissionLabel(item),
        item.approved ? "Active" : "Pending",
        new Date(item.createdAt).toLocaleDateString("en-US"),
        !isBuiltInUser(item) ? `<button data-user-delete="${item.id}">Delete</button>` : "-",
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

function tryoutForm(item = { id: "", name: "", rlName: "", discord: "", rank: "", previousTeam: "", availability: "", dateTime: "", teamId: "main", opinion: "", stats: emptyStats }) {
  const fields = [["name", "Name"], ["rlName", "RL name"], ["discord", "Discord"], ["rank", "Rank / MMR"], ["previousTeam", "Previous team"], ["availability", "Availability"], ["dateTime", "Tryout date", "datetime-local"], ["teamId", "Noctiq team", "team"], ["opinion", "Admin/coach opinion", "textarea"]];
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
  return `<div class="stat-grid">${statKeys.map((key) => `<label><span>${statLabels[key]}</span><input name="stat-${key}" type="range" min="1" max="10" value="${stats[key]}"><strong>${stats[key]}</strong></label>`).join("")}</div>`;
}

function calendarForm(item = { id: "", title: "", dateTime: "", type: "Meeting", teamId: "main", notes: "" }) {
  return `
    <section class="panel"><h2>Calendar event</h2>
      <form class="entity-form" data-entity="events" data-id="${item.id || ""}">
        <div class="form-grid">
          ${field("title", "Title", "text", item.title)}
          ${field("dateTime", "Date and time", "datetime-local", item.dateTime)}
          ${field("type", "Type", Object.keys(eventColors).filter((type) => !["Scrim", "Tournament", "Tryout"].includes(type)), item.type)}
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
  const button = event.target.closest("button");
  if (!button) return;
  const store = loadStore();
  const activeUser = getUser(store);

  if (button.dataset.page) {
    currentPage = button.dataset.page;
    render();
  }

  if (button.dataset.action === "logout") {
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

  if (button.dataset.delete) {
    const [key, id] = button.dataset.delete.split(":");
    if (!canManageEntity(activeUser, key)) return;
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

  if (button.dataset.routineDelete) {
    if (!isAdmin(activeUser)) return;
    store.trainingRoutines = store.trainingRoutines.filter((item) => item.id !== button.dataset.routineDelete);
    saveStore(store);
    render();
  }

  if (button.dataset.userApproved) {
    if (!isAdmin(activeUser)) return;
    const user = store.users.find((item) => item.id === button.dataset.userApproved);
    user.approved = !user.approved;
    saveStore(store);
    render();
  }

  if (button.dataset.userDelete) {
    if (!isAdmin(activeUser)) return;
    store.users = store.users.filter((item) => item.id !== button.dataset.userDelete && !isBuiltInUser(item));
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
  if (!["player-stats", "training-routines"].includes(key) && !canManageEntity(activeUser, key)) return;
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
    const customMaps = [0, 1, 2]
      .map((index) => ({ name: entry[`customMapName${index}`], minutes: entry[`customMapMinutes${index}`] }))
      .filter((map) => map.name && Number(map.minutes || 0) > 0);
    store.trainingRoutines.push({
      id: uid(),
      title: entry.title || "Untitled routine",
      creatorId: activeUser.id,
      creatorName: activeUser.name,
      weeklyDay: entry.weeklyDay,
      startTime: entry.startTime,
      totalHours: entry.totalHours,
      onesMinutes: entry.onesMinutes,
      twosMinutes: entry.twosMinutes,
      threesMinutes: entry.threesMinutes,
      freeplayMinutes: entry.freeplayMinutes,
      customMaps,
      favorites: [],
    });
    saveStore(store);
    render();
    return;
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
    user.role = event.target.value;
    if (["Admin", "Coach"].includes(user.role)) user.canEdit = true;
    saveStore(store);
    render();
  }

  if (event.target.matches("[data-user-edit]")) {
    if (!isAdmin(activeUser)) return;
    const user = store.users.find((item) => item.id === event.target.dataset.userEdit);
    user.canEdit = event.target.checked;
    saveStore(store);
  }

  if (event.target.matches("[data-player-stat-select]")) {
    if (!canManagePlayerStats(activeUser)) return;
    const player = store.players.find((item) => item.id === event.target.value);
    const formPanel = event.target.closest(".panel");
    if (player && formPanel) formPanel.outerHTML = playerStatsForm(store.players, player);
  }
});

initRemoteStore();
