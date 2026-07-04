import { projects } from "./data/projects.js";

const fallback = (value, fallbackText = "") => {
  if (typeof value === "string" && value.trim()) return value;
  return fallbackText;
};

const getArray = (value) => (Array.isArray(value) ? value : []);

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createButton = (href, label, variant = "secondary", external = false) => {
  const link = createElement("a", "button button-" + variant, label);
  link.href = href;

  if (external) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  return link;
};

const getProjectFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const slug = fallback(params.get("project"), "");
  return projects.find((project) => project.slug === slug);
};

const normalizeProjectImagePath = (path) => {
  const value = fallback(path, "");
  if (!value) return "";
  return value.includes("/") ? value : "CodeNest media web/" + value;
};

const getProjectImageSrc = (project, type) => {
  const directValue = project?.[type + "Image"];
  const legacyValue = project?.imageAssets?.[type];
  return normalizeProjectImagePath(directValue || legacyValue);
};

const getProjectLiveUrl = (project) => fallback(project?.liveUrl, fallback(project?.url, ""));

const getStatusLabel = (status) => {
  const value = fallback(status, "").toLowerCase();
  if (value.includes("progress")) return "Folyamatban";
  if (value.includes("highlighted")) return "Kiemelt munka";
  if (value.includes("published") || value.includes("live")) return "Éles oldal";
  return fallback(status, "Referencia");
};

const createPlainList = (items, className = "case-check-list") => {
  const values = getArray(items).filter(Boolean);
  if (!values.length) return null;

  const list = createElement("ul", className);
  values.forEach((item) => {
    const row = createElement("li", "");
    row.append(createElement("span", "case-check-icon"), createElement("span", "", String(item)));
    list.append(row);
  });
  return list;
};

const createOverviewGrid = (items) => {
  const grid = createElement("div", "case-overview-grid");
  items.forEach((item) => {
    const card = createElement("article", "case-overview-card");
    card.append(createElement("span", "", fallback(item.label, "Részlet")), createElement("strong", "", fallback(item.value, "-")));
    grid.append(card);
  });
  return grid;
};

const createHero = (project, data) => {
  const section = createElement("section", "case-section case-hero");
  const container = createElement("div", "container case-hero-grid");
  const copy = createElement("div", "case-hero-copy");
  const liveUrl = getProjectLiveUrl(project);
  const actions = createElement("div", "button-row case-actions");

  copy.append(
    createElement("p", "section-kicker", fallback(data.eyebrow, fallback(project.category, "Projekt"))),
    createElement("h1", "", fallback(data.headline, fallback(project.title, "CodeNest projekt"))),
    createElement("p", "case-summary", fallback(data.summary, fallback(project.shortDescription, "Projektleírás később.")))
  );

  if (liveUrl) actions.append(createButton(liveUrl, "Élő oldal megnyitása", "primary", true));
  actions.append(createButton("v2-preview.html#kapcsolat", "Beszéljünk a projektről", "secondary"));
  copy.append(actions);

  const card = createElement("aside", "case-hero-card");
  card.append(
    createElement("span", "project-badge", getStatusLabel(project.status)),
    createElement("h2", "", fallback(project.title, "Projekt")),
    createElement("p", "", fallback(project.category, "CodeNest projekt")),
    createElement("p", "", fallback(project.shortDescription, fallback(data.summary, "")))
  );

  container.append(copy, card);
  section.append(container);
  return section;
};

const createOverview = (project, data) => {
  const overview = getArray(data.overview).length
    ? getArray(data.overview)
    : [
        { label: "Projekt", value: fallback(project.title, "CodeNest projekt") },
        { label: "Típus", value: fallback(project.category, "Webes rendszer") },
        { label: "Állapot", value: getStatusLabel(project.status) },
      ];

  const section = createElement("section", "case-section case-overview-section");
  const container = createElement("div", "container");
  container.append(createOverviewGrid(overview));
  section.append(container);
  return section;
};

const createChallengeAndSolution = (project, data) => {
  const section = createElement("section", "case-section");
  const container = createElement("div", "container case-split");
  const challenge = createElement("article", "case-panel");
  const solution = createElement("article", "case-panel case-panel-soft");
  const challengeList = createPlainList(data.challenge || [project.shortDescription]);
  const solutionCards = createElement("div", "case-solution-grid");

  challenge.append(createElement("p", "section-kicker", "Kihívás"), createElement("h2", "", fallback(data.challengeTitle, "A kihívás")));
  if (challengeList) challenge.append(challengeList);

  solution.append(createElement("p", "section-kicker", "Megoldás"), createElement("h2", "", fallback(data.solutionTitle, "A megoldás")));
  getArray(data.solution).forEach((item) => {
    const card = createElement("div", "case-solution-card");
    card.append(createElement("h3", "", fallback(item.title, "Részlet")), createElement("p", "", fallback(item.text, "")));
    solutionCards.append(card);
  });

  if (!solutionCards.children.length) {
    const card = createElement("div", "case-solution-card");
    card.append(createElement("h3", "", "Rendezett webes alap"), createElement("p", "", fallback(project.shortDescription, "")));
    solutionCards.append(card);
  }

  solution.append(solutionCards);
  container.append(challenge, solution);
  section.append(container);
  return section;
};

const createImageLink = (project, src, className, alt) => {
  const liveUrl = getProjectLiveUrl(project);
  const wrapper = createElement(liveUrl ? "a" : "figure", className);
  const image = createElement("img", "", alt);
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";

  if (liveUrl) {
    wrapper.href = liveUrl;
    wrapper.target = "_blank";
    wrapper.rel = "noopener noreferrer";
    wrapper.setAttribute("aria-label", alt + " megnyitása az élő oldalon");
  }

  image.onerror = () => wrapper.remove();
  wrapper.append(image);
  return wrapper;
};

const createVisualSection = (project, data) => {
  const desktopSrc = getProjectImageSrc(project, "desktop");
  const mobileSrc = getProjectImageSrc(project, "mobile");
  const section = createElement("section", "case-section case-visual-section");
  const container = createElement("div", "container");
  const header = createElement("div", "case-section-header");
  const visualGrid = createElement("div", "case-visual-grid");

  header.append(
    createElement("p", "section-kicker", "Képernyők"),
    createElement("h2", "", fallback(data.visualTitle, "Projekt képernyőképek")),
    createElement("p", "", fallback(data.visualText, "A projekt publikus felülete desktop és mobil nézetben."))
  );

  if (desktopSrc) {
    visualGrid.append(createImageLink(project, desktopSrc, "case-shot case-shot-desktop", fallback(project.title, "Projekt") + " desktop képernyőkép"));
  }

  if (mobileSrc) {
    visualGrid.append(createImageLink(project, mobileSrc, "case-shot case-shot-mobile", fallback(project.title, "Projekt") + " mobil képernyőkép"));
  }

  if (!visualGrid.children.length) {
    visualGrid.append(createElement("div", "case-empty-visual", "Képernyőkép később kerül ide."));
  }

  container.append(header, visualGrid);
  section.append(container);
  return section;
};

const createModulesAndResult = (project, data) => {
  const section = createElement("section", "case-section");
  const container = createElement("div", "container case-split case-result-split");
  const modules = createElement("article", "case-panel case-panel-soft");
  const result = createElement("article", "case-panel");
  const moduleList = createPlainList(data.modules, "case-module-list");

  modules.append(createElement("p", "section-kicker", "Modulok"), createElement("h2", "", fallback(data.modulesTitle, "Fő elemek")));
  if (moduleList) modules.append(moduleList);

  result.append(
    createElement("p", "section-kicker", "Tanulság"),
    createElement("h2", "", fallback(data.resultTitle, "Mit ad ez az alap?")),
    createElement("p", "", fallback(data.resultText, fallback(project.shortDescription, "")))
  );

  const takeaway = fallback(data.takeaway, "");
  if (takeaway) result.append(createElement("p", "case-takeaway", takeaway));

  container.append(modules, result);
  section.append(container);
  return section;
};

const createBottomCta = (project) => {
  const section = createElement("section", "case-section case-bottom-section");
  const container = createElement("div", "container case-bottom-cta");
  container.append(
    createElement("div", "case-bottom-copy"),
    createButton("v2-preview.html#kapcsolat", "Beszéljünk a projektről", "primary")
  );

  const copy = container.querySelector(".case-bottom-copy");
  copy.append(
    createElement("p", "section-kicker", "Következő lépés"),
    createElement("h2", "", "Hasonló rendszert szeretnél?"),
    createElement("p", "", "Nem kell kész specifikáció. Elég, ha röviden leírod, milyen oldalt, adminfelületet vagy digitális eszközt szeretnétek.")
  );

  section.append(container);
  return section;
};

const renderNotFound = (mount) => {
  document.title = "Projekt nem található | CodeNest";
  const section = createElement("section", "case-section case-not-found");
  const container = createElement("div", "container case-panel");
  container.append(
    createElement("p", "section-kicker", "Esettanulmány"),
    createElement("h1", "", "Nem találjuk ezt a projektet."),
    createElement("p", "", "Lehet, hogy hibás vagy régi linket nyitottál meg. Menj vissza a V2 munkák szekciójához, és válassz egy projektet."),
    createButton("v2-preview.html#munkak", "Vissza a munkákhoz", "primary")
  );
  section.append(container);
  mount.replaceChildren(section);
};

const renderCaseStudy = () => {
  const mount = document.querySelector('[data-render="case-study"]');
  if (!mount) return;

  const project = getProjectFromUrl();
  if (!project) {
    renderNotFound(mount);
    return;
  }

  const data = project.caseStudy || {};
  document.title = fallback(project.title, "Projekt") + " | CodeNest esettanulmány";

  mount.replaceChildren(
    createHero(project, data),
    createOverview(project, data),
    createChallengeAndSolution(project, data),
    createVisualSection(project, data),
    createModulesAndResult(project, data),
    createBottomCta(project)
  );
};

renderCaseStudy();
