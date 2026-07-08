import {
  getLocalizedData,
  getUiTranslations,
  normalizeLanguage,
  resolveInitialLanguage,
  setDocumentLanguage,
  storeLanguage,
  supportedLanguages,
  updateUrlLanguage,
  withLanguageParam,
} from "./data/i18n.js";

let currentLanguage = resolveInitialLanguage();
let localizedData = getLocalizedData(currentLanguage);
let { siteContent, projects } = localizedData;
let ui = localizedData.ui;

const refreshLocalizedData = () => {
  localizedData = getLocalizedData(currentLanguage);
  ({ siteContent, projects } = localizedData);
  ui = getUiTranslations(currentLanguage);
};

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
  link.href = external ? href : withLanguageParam(href, currentLanguage);
  link.dataset.linkType = external ? "external" : href.includes("#kapcsolat") ? "contact-anchor" : "internal";

  if (external) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", label + " - " + ui.liveSiteNewTab);
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
  if (value.includes("progress")) return ui.case.statusInProgress;
  if (value.includes("highlighted")) return ui.case.statusFeatured;
  if (value.includes("published") || value.includes("live")) return ui.case.statusPublished;
  return fallback(status, ui.reference);
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

  if (liveUrl) actions.append(createButton(liveUrl, ui.liveSiteOpen, "primary", true));
  actions.append(createButton("v2-preview.html#kapcsolat", ui.talkProject, "secondary"));
  copy.append(actions);

  const card = createElement("aside", "case-hero-card");
  const heroImage = getProjectImageSrc(project, "desktop");
  const cardChildren = [];
  if (heroImage) {
    cardChildren.push(
      createImageLink(project, heroImage, "case-hero-shot", fallback(project.title, "Projekt") + " képernyőkép")
    );
  }
  cardChildren.push(
    createElement("span", "project-badge", getStatusLabel(project.status)),
    createElement("h2", "", fallback(project.title, "Projekt")),
    createElement("p", "", fallback(project.category, "CodeNest projekt")),
    createElement("p", "", fallback(project.shortDescription, fallback(data.summary, "")))
  );
  card.append(...cardChildren);

  container.append(copy, card);
  section.append(container);
  return section;
};

const createOverview = (project, data) => {
  const overview = getArray(data.overview).length
    ? getArray(data.overview)
    : [
        { label: ui.case.overviewProject, value: fallback(project.title, "CodeNest") },
        { label: ui.case.overviewType, value: fallback(project.category, ui.reference) },
        { label: ui.case.overviewStatus, value: getStatusLabel(project.status) },
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

  challenge.append(createElement("p", "section-kicker", ui.case.challenge), createElement("h2", "", fallback(data.challengeTitle, ui.case.challengeTitle)));
  if (challengeList) challenge.append(challengeList);

  solution.append(createElement("p", "section-kicker", ui.case.solution), createElement("h2", "", fallback(data.solutionTitle, ui.case.solutionTitle)));
  getArray(data.solution).forEach((item) => {
    const card = createElement("div", "case-solution-card");
    card.append(createElement("h3", "", fallback(item.title, ui.case.solution)), createElement("p", "", fallback(item.text, "")));
    solutionCards.append(card);
  });

  if (!solutionCards.children.length) {
    const card = createElement("div", "case-solution-card");
    card.append(createElement("h3", "", ui.case.solutionTitle), createElement("p", "", fallback(project.shortDescription, "")));
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
    wrapper.dataset.linkType = "external-preview";
    wrapper.classList.add("is-external-preview");
    wrapper.title = ui.liveSiteOpen;
    wrapper.setAttribute("aria-label", alt + " - " + ui.liveSiteOpen);
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
    createElement("p", "section-kicker", ui.case.screens),
    createElement("h2", "", fallback(data.visualTitle, ui.case.visualTitle)),
    createElement("p", "", fallback(data.visualText, ui.case.visualText))
  );

  if (desktopSrc) {
    visualGrid.append(createImageLink(project, desktopSrc, "case-shot case-shot-desktop", fallback(project.title, "Projekt") + " desktop képernyőkép"));
  }

  if (mobileSrc) {
    visualGrid.append(createImageLink(project, mobileSrc, "case-shot case-shot-mobile", fallback(project.title, "Projekt") + " mobil képernyőkép"));
  }

  if (!visualGrid.children.length) {
    visualGrid.append(createElement("div", "case-empty-visual", ui.case.emptyVisual));
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

  modules.append(createElement("p", "section-kicker", ui.case.modules), createElement("h2", "", fallback(data.modulesTitle, ui.case.modulesTitle)));
  if (moduleList) modules.append(moduleList);

  result.append(
    createElement("p", "section-kicker", ui.case.lesson),
    createElement("h2", "", fallback(data.resultTitle, ui.case.resultTitle)),
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
    createButton("v2-preview.html#kapcsolat", ui.talkProject, "primary")
  );

  const copy = container.querySelector(".case-bottom-copy");
  copy.append(
    createElement("p", "section-kicker", ui.case.nextStep),
    createElement("h2", "", ui.case.bottomTitle),
    createElement("p", "", ui.case.bottomText)
  );

  section.append(container);
  return section;
};

const renderNotFound = (mount) => {
  document.title = ui.case.notFoundTitle + " | CodeNest";
  const section = createElement("section", "case-section case-not-found");
  const container = createElement("div", "container case-panel");
  container.append(
    createElement("p", "section-kicker", ui.case.loadingKicker),
    createElement("h1", "", ui.case.notFoundTitle),
    createElement("p", "", ui.case.notFoundText),
    createButton("v2-preview.html#munkak", ui.case.backToWorkPlain, "primary")
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
  document.title = fallback(project.title, "Project") + " | " + ui.case.title;

  mount.replaceChildren(
    createHero(project, data),
    createOverview(project, data),
    createChallengeAndSolution(project, data),
    createVisualSection(project, data),
    createModulesAndResult(project, data),
    createBottomCta(project)
  );
};

const createNavigationLink = (href, label) => {
  const link = createElement("a", "", label);
  link.href = withLanguageParam(href, currentLanguage);
  return link;
};

const renderCaseNavigation = () => {
  const desktopNav = document.querySelector('[data-render="case-navigation"]');
  const mobileNav = document.querySelector('[data-render="mobile-navigation"]');
  const links = [
    createNavigationLink("v2-preview.html#munkak", ui.case.backToWork),
    createNavigationLink("v2-preview.html#kapcsolat", ui.talkProject),
  ];

  if (desktopNav) {
    desktopNav.setAttribute("aria-label", ui.case.navigationLabel);
    desktopNav.replaceChildren(...links.map((link) => link.cloneNode(true)));
  }

  if (mobileNav) {
    mobileNav.setAttribute("aria-label", ui.mobileMenuLabel);
    mobileNav.replaceChildren(...links.map((link) => link.cloneNode(true)));
  }
};

const renderLanguageSwitchers = () => {
  document.querySelectorAll('[data-render="language-switcher"], [data-render="mobile-language-switcher"]').forEach((switcher) => {
    switcher.setAttribute("aria-label", ui.languageLabel);
    switcher.replaceChildren(
      ...supportedLanguages.map((language) => {
        const button = createElement("button", "language-option", language.label);
        button.type = "button";
        button.dataset.language = language.code;
        button.setAttribute("aria-label", language.name);
        button.setAttribute("aria-pressed", String(language.code === currentLanguage));
        button.classList.toggle("is-active", language.code === currentLanguage);
        return button;
      })
    );
  });

  const menuButton = document.querySelector(".menu-toggle");
  if (menuButton) {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-label", open ? ui.closeMenu : ui.openMenu);
  }
};

const renderCaseFooter = () => {
  const container = document.querySelector(".case-footer .footer-inner");
  if (!container) return;

  const footer = siteContent.footer || {};
  const brandArea = createElement("div", "footer-brand-area");
  const brand = createElement("a", "footer-brand");
  const brandMark = createElement("img", "footer-brand-mark");
  brandMark.src = "logo_footer-modified.png";
  brandMark.alt = "";
  brandMark.setAttribute("aria-hidden", "true");
  brand.append(brandMark, createElement("span", "", fallback(footer.brandName, "CodeNest")));
  brand.href = withLanguageParam("v2-preview.html#hero", currentLanguage);
  brandArea.append(
    brand,
    createElement("p", "footer-tagline", fallback(footer.tagline, "CodeNest")),
    createElement("p", "footer-copyright", fallback(footer.copyright, ""))
  );

  const groups = createElement("div", "footer-groups");
  const navGroup = createElement("div", "footer-group");
  navGroup.append(createElement("h3", "", ui.footerPages));
  const list = createElement("ul", "footer-link-list");
  getArray(footer.links).forEach((item) => {
    const li = createElement("li", "");
    const link = createElement("a", "", fallback(item.label, "Link"));
    link.href = withLanguageParam("v2-preview.html" + fallback(item.href, "#hero"), currentLanguage);
    li.append(link);
    list.append(li);
  });
  navGroup.append(list);

  const contactGroup = createElement("div", "footer-group");
  const email = fallback(siteContent.contact?.email, "");
  contactGroup.append(createElement("h3", "", ui.footerContact));
  if (email) {
    const emailLink = createElement("a", "", email);
    emailLink.href = `mailto:${email}`;
    contactGroup.append(emailLink);
  }

  groups.append(navGroup, contactGroup);
  container.replaceChildren(brandArea, groups);
};

const getMobileMenuElements = () => ({
  button: document.querySelector(".menu-toggle"),
  menu: document.getElementById("mobile-menu"),
  header: document.querySelector(".site-header"),
});

const setMobileMenuState = (open) => {
  const { button, menu } = getMobileMenuElements();
  if (!button || !menu) return;
  button.setAttribute("aria-expanded", String(open));
  button.setAttribute("aria-label", open ? ui.closeMenu : ui.openMenu);
  menu.hidden = !open;
  menu.classList.toggle("is-open", open);
};

const closeMobileMenu = () => setMobileMenuState(false);
const toggleMobileMenu = () => {
  const { button } = getMobileMenuElements();
  setMobileMenuState(button?.getAttribute("aria-expanded") !== "true");
};

const initMobileMenu = () => {
  const { button, header } = getMobileMenuElements();
  if (!button || !header) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMobileMenu();
  });

  document.addEventListener("click", (event) => {
    if (button.getAttribute("aria-expanded") !== "true") return;
    if (!header.contains(event.target)) closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 821px)").matches) closeMobileMenu();
  });
};

const setLanguage = (language) => {
  currentLanguage = normalizeLanguage(language) || "hu";
  storeLanguage(currentLanguage);
  updateUrlLanguage(currentLanguage);
  setDocumentLanguage(currentLanguage);
  refreshLocalizedData();
  renderPage();
  closeMobileMenu();
};

const initLanguageControls = () => {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("[data-language]");
    if (!button) return;
    setLanguage(button.dataset.language);
  });
};

const renderPage = () => {
  renderCaseNavigation();
  renderLanguageSwitchers();
  renderCaseFooter();
  renderCaseStudy();
};

setDocumentLanguage(currentLanguage);
renderPage();
initMobileMenu();
initLanguageControls();


