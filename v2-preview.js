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
let { siteContent, services, projects, teamIntro, team } = localizedData;
let ui = localizedData.ui;
let sectionNavigationCleanup = null;

const refreshLocalizedData = () => {
  localizedData = getLocalizedData(currentLanguage);
  ({ siteContent, services, projects, teamIntro, team } = localizedData);
  ui = getUiTranslations(currentLanguage);
};

const fallback = (value, fallbackText = "") => {
  if (typeof value === "string" && value.trim()) return value;
  return fallbackText;
};

const setText = (selector, value, fallbackText = "") => {
  const element = document.querySelector(selector);
  if (!element) return;
  element.textContent = fallback(value, fallbackText);
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const alternateLanguageUrls = {
  hu: "https://codenest.hu/",
  en: "https://codenest.hu/en/",
  de: "https://codenest.hu/de/",
  "x-default": "https://codenest.hu/",
};

const resolveRootAssetPath = (assetPath) => {
  const value = fallback(assetPath, "");
  if (!value || value.startsWith("/") || value.startsWith("#") || (value.startsWith("http://") || value.startsWith("https://")) || value.startsWith("mailto:")) return value;
  return new URL(value, import.meta.url).href;
};

const setMetaContent = (attribute, key, content) => {
  const value = fallback(content, "");
  if (!value) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.setAttribute("content", value);
};

const setCanonicalHref = (href) => {
  const value = fallback(href, "");
  if (!value) return;

  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.append(element);
  }
  element.href = value;
};

const setAlternateLanguageLinks = () => {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
  Object.entries(alternateLanguageUrls).forEach(([language, href]) => {
    const element = document.createElement("link");
    element.rel = "alternate";
    element.hreflang = language;
    element.href = href;
    document.head.append(element);
  });
};

const renderSeoMeta = () => {
  const seo = siteContent.seo || {};
  const title = fallback(seo.title, "CodeNest");
  const description = fallback(seo.description, siteContent.hero?.subheadline);
  const ogTitle = fallback(seo.ogTitle, title);
  const ogDescription = fallback(seo.ogDescription, description);
  const canonicalUrl = fallback(seo.canonicalUrl, "https://codenest.hu/");

  document.title = title;
  setMetaContent("name", "description", description);
  setMetaContent("property", "og:type", "website");
  setMetaContent("property", "og:title", ogTitle);
  setMetaContent("property", "og:description", ogDescription);
  setMetaContent("property", "og:url", canonicalUrl);
  setMetaContent("name", "twitter:card", "summary");
  setCanonicalHref(canonicalUrl);
  setAlternateLanguageLinks();
};

const createLanguageFlag = (language) => {
  const src = fallback(language.flagSrc, "");
  const flag = src ? createElement("img", "language-flag", "") : createElement("span", "language-flag language-flag-fallback", "");

  if (src) {
    flag.src = resolveRootAssetPath(src);
    flag.alt = "";
    flag.loading = "lazy";
    flag.decoding = "async";
  }

  flag.setAttribute("aria-hidden", "true");
  return flag;
};

const clearAndAppend = (selector, children) => {
  const container = document.querySelector(selector);
  if (!container) return;
  container.replaceChildren(...children);
};

const getArray = (value) => (Array.isArray(value) ? value : []);

const legalFooterLinks = [
  { label: "Jogi információk", href: "/legal-hu.html" },
];

const createNavigationLinks = (items) =>
  items.map((item) => {
    const link = createElement("a", "", fallback(item.label, "Menü"));
    link.href = fallback(item.href, "#hero");
    return link;
  });

const renderNavigation = () => {
  const items = Array.isArray(siteContent.navigation?.items)
    ? siteContent.navigation.items
    : [];

  const desktopNav = document.querySelector('[data-render="navigation"]');
  const mobileNav = document.querySelector('[data-render="mobile-navigation"]');
  const menu = document.getElementById("mobile-menu");

  if (desktopNav) {
    desktopNav.setAttribute("aria-label", ui.navigationLabel);
    desktopNav.replaceChildren(...createNavigationLinks(items));
  }

  if (mobileNav) {
    mobileNav.setAttribute("aria-label", ui.mobileMenuLabel);
    mobileNav.replaceChildren(...createNavigationLinks(items));
  }

  if (menu) menu.setAttribute("aria-label", ui.mobileMenuLabel);
};

const createLanguageOption = (language) => {
  const button = createElement("button", "language-option", "");
  const isActive = language.code === currentLanguage;
  button.type = "button";
  button.dataset.language = language.code;
  button.setAttribute("aria-label", language.name);
  button.setAttribute("aria-pressed", String(isActive));
  button.classList.toggle("is-active", isActive);
  button.append(
    createLanguageFlag(language),
    createElement("span", "language-name", language.name),
    createElement("span", "language-check", isActive ? "✓" : "")
  );
  return button;
};

const closeLanguageDropdowns = () => {
  document.querySelectorAll(".language-switcher.is-open").forEach((switcher) => {
    const trigger = switcher.querySelector("[data-language-trigger]");
    const dropdown = switcher.querySelector(".language-dropdown");
    switcher.classList.remove("is-open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (dropdown) dropdown.hidden = true;
  });
};

const toggleLanguageDropdown = (trigger) => {
  const switcher = trigger.closest(".language-switcher");
  const dropdown = switcher?.querySelector(".language-dropdown");
  if (!switcher || !dropdown) return;
  const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
  closeLanguageDropdowns();
  switcher.classList.toggle("is-open", shouldOpen);
  trigger.setAttribute("aria-expanded", String(shouldOpen));
  dropdown.hidden = !shouldOpen;
};

const renderLanguageSwitchers = () => {
  const current = supportedLanguages.find((language) => language.code === currentLanguage) || supportedLanguages[0];

  document.querySelectorAll('[data-render="language-switcher"]').forEach((switcher) => {
    switcher.classList.add("is-compact-selector");
    switcher.setAttribute("aria-label", ui.languageLabel);

    const trigger = createElement("button", "language-trigger", "");
    trigger.type = "button";
    trigger.dataset.languageTrigger = "true";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", `${ui.languageLabel}: ${current.name}`);
    trigger.append(
      createLanguageFlag(current),
      createElement("span", "language-current", current.label),
      createElement("span", "language-chevron", "⌄")
    );

    const dropdown = createElement("div", "language-dropdown");
    dropdown.hidden = true;
    dropdown.setAttribute("role", "listbox");
    dropdown.append(...supportedLanguages.map(createLanguageOption));
    switcher.replaceChildren(trigger, dropdown);
  });

  document.querySelectorAll('[data-render="mobile-language-switcher"]').forEach((switcher) => {
    switcher.classList.add("is-mobile-language-list");
    switcher.setAttribute("aria-label", ui.languageLabel);
    const label = createElement("p", "language-section-label", ui.languageLabel);
    const list = createElement("div", "language-list");
    list.append(...supportedLanguages.map(createLanguageOption));
    switcher.replaceChildren(label, list);
  });

  const menuButton = document.querySelector(".menu-toggle");
  if (menuButton) {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-label", isOpen ? ui.closeMenu : ui.openMenu);
  }
};

const renderHero = () => {
  const hero = siteContent.hero || {};

  setText('[data-render="hero-headline"]', hero.headline, "CodeNest");
  setText('[data-render="hero-subheadline"]', hero.subheadline, "Érthető, szerkeszthető weboldalak.");
  setText('[data-render="hero-primary-cta"]', hero.primaryCta, "Kapcsolat");
  setText('[data-render="hero-secondary-cta"]', hero.secondaryCta, "Mit építünk");

  const primaryCta = document.querySelector('[data-render="hero-primary-cta"]');
  const secondaryCta = document.querySelector('[data-render="hero-secondary-cta"]');
  if (primaryCta) primaryCta.href = fallback(hero.primaryCtaHref, "#kapcsolat");
  if (secondaryCta) secondaryCta.href = fallback(hero.secondaryCtaHref, "#mit-epitunk");

  const supportItems = getArray(siteContent.whyCodeNest?.items)
    .map((item) => item.title)
    .filter(Boolean)
    .slice(0, 3);
  const supportChips = supportItems.map((item) => createElement("span", "hero-chip", item));
  if (supportChips.length) clearAndAppend('[data-render="hero-support-chips"]', supportChips);
};

const renderProblem = () => {
  const problem = siteContent.problem || {};
  const points = getArray(problem.painPoints).length ? getArray(problem.painPoints) : getArray(problem.points);

  setText('[data-render="problem-title"]', problem.title, "Problem");
  setText('[data-render="problem-text"]', problem.text, "V2 problem framing.");

  const cards = points.map((point) => {
    const card = createElement("article", "card compact-card");
    if (typeof point === "string") {
      card.append(createElement("p", "", fallback(point, "V2 problémapont.")));
      return card;
    }

    card.append(
      createElement("h3", "", fallback(point.title, "Probléma")),
      createElement("p", "", fallback(point.text, "V2 problémapont."))
    );
    return card;
  });

  if (cards.length) clearAndAppend('[data-render="problem-points"]', cards);

  renderProblemComparison(problem.beforeAfter);

  const solutionElement = document.querySelector('[data-render="problem-solution"]');
  if (solutionElement) {
    const solutionText = fallback(problem.solution, "");
    solutionElement.textContent = solutionText;
    solutionElement.hidden = !solutionText;
  }
};

const renderProblemComparison = (comparison) => {
  const container = document.querySelector('[data-render="problem-comparison"]');
  if (!container) return;

  const beforeItems = getArray(comparison?.before);
  const afterItems = getArray(comparison?.after);
  if (!beforeItems.length && !afterItems.length) return;

  const before = createComparisonColumn(ui.before, beforeItems);
  const after = createComparisonColumn(ui.after, afterItems);
  container.replaceChildren(before, after);
};

const createComparisonColumn = (title, items) => {
  const column = createElement("div", "compare-column");
  column.append(createElement("h3", "", title));

  const list = createElement("ul", "plain-list");
  items.forEach((item) => {
    list.append(createElement("li", "", String(item)));
  });

  column.append(list);
  return column;
};

const renderServices = () => {
  const cards = services.slice(0, 3).map((service, index) => {
    const card = createElement("article", "card service-card");
    const moduleHint = createServiceModule(index);
    const title = createElement("h3", "", fallback(service.title, "Szolgáltatás"));
    const description = createElement("p", "", fallback(service.shortDescription, "Rövid leírás később."));
    const details = createElement("p", "", fallback(service.supportingText, ""));
    const chips = createList(service.chips, "chips");
    const features = createList(service.features, "feature-list");
    const cta = createElement("a", "button button-secondary", fallback(service.ctaLabel, "Beszéljünk a projektről"));

    cta.href = "#kapcsolat";

    card.append(moduleHint, title, description);
    if (details.textContent) card.append(details);
    if (features) card.append(features);
    if (chips) card.append(chips);
    card.append(cta);
    return card;
  });

  if (cards.length) clearAndAppend('[data-render="services"]', cards);
};

const createServiceModule = (index) => {
  const module = createElement("div", "service-module");

  if (index === 0) {
    module.append(
      createElement("span", "module-line wide"),
      createElement("span", "module-line"),
      createElement("span", "module-pill", "Dokumentumtár")
    );
    return module;
  }

  if (index === 1) {
    module.append(
      createElement("span", "module-block"),
      createElement("span", "module-block small"),
      createElement("span", "module-pill", "Szerkeszthető")
    );
    return module;
  }

  module.append(
    createElement("span", "module-step"),
    createElement("span", "module-step"),
    createElement("span", "module-pill", "Workflow")
  );
  return module;
};

const renderProjects = () => {
  const featuredProject = projects.find((project) => project.highlighted) || projects[0];
  const supportingProjects = projects.filter((project) => project !== featuredProject);
  const children = [];

  if (featuredProject) children.push(createFeaturedProject(featuredProject));

  if (supportingProjects.length) {
    const grid = createElement("div", "project-support-grid");
    grid.append(...supportingProjects.map((project) => createProjectCard(project)));
    children.push(grid);
  }

  children.push(createProjectsCta());

  if (children.length) clearAndAppend('[data-render="projects"]', children);
};

const createFeaturedProject = (project) => {
  const card = createElement("article", "project-featured");
  const content = createElement("div", "project-featured-content");
  const badgeRow = createElement("div", "project-badge-row");
  const badge = createElement("span", "project-badge", ui.featuredWork);
  const status = createElement("span", "project-status", getProjectStatusLabel(project.status));
  const category = createElement("p", "section-kicker", fallback(project.category, "Projekt"));
  const title = createElement("h3", "", fallback(project.title, "Kiemelt munka"));
  const description = createElement("p", "project-description", fallback(project.shortDescription, "Projektleírás később."));
  const tags = createList(project.tags, "chips project-tags");
  const link = createProjectLink(project, ui.projectOpen);

  badgeRow.append(badge, status);
  content.append(badgeRow, category, title, description);
  if (tags) content.append(tags);
  content.append(link);

  card.append(content, createProjectVisual(project));
  return card;
};

const createProjectCard = (project) => {
  const card = createElement("article", "card project-card");
  const thumbnail = createProjectThumbnail(project);
  const category = createElement("p", "section-kicker", fallback(project.category, "Projekt"));
  const title = createElement("h3", "", fallback(project.title, "Projekt"));
  const description = createElement("p", "", fallback(project.shortDescription, "Projektleírás később."));
  const tags = createList(project.tags, "chips project-tags");
  const link = createProjectLink(project, ui.projectOpen);

  if (thumbnail) {
    card.classList.add("has-project-image");
    card.append(thumbnail);
  }

  card.append(category, title, description);
  if (tags) card.append(tags);
  card.append(link);
  return card;
};

const createProjectLink = (project, label) => {
  const title = fallback(project?.title, "Projekt");
  const link = createElement("a", "button button-secondary project-link", label);
  link.href = getProjectCaseStudyHref(project);
  link.dataset.linkType = "case-study";
  link.setAttribute("aria-label", title + " " + ui.projectOpen.toLowerCase());
  link.title = ui.projectOpen;
  return link;
};
const getProjectCaseStudyHref = (project) => {
  const explicitHref = fallback(project?.caseStudyHref, "");
  if (explicitHref) return withLanguageParam(explicitHref, currentLanguage);
  const slug = fallback(project?.slug, "");
  return slug ? withLanguageParam("case-study.html?project=" + encodeURIComponent(slug), currentLanguage) : "#munkak";
};

const getProjectLiveUrl = (project) => fallback(project?.liveUrl, fallback(project?.url, ""));

const createProjectLivePreviewLink = (project, className, label) => {
  const link = createElement("a", className + " is-external-preview");
  const liveUrl = getProjectLiveUrl(project);

  link.href = liveUrl || getProjectCaseStudyHref(project);
  link.dataset.linkType = liveUrl ? "external-preview" : "case-study-preview";
  link.setAttribute("aria-label", liveUrl ? label + " - " + ui.liveSiteNewTab : label + " - " + ui.projectOpen);
  link.title = liveUrl ? ui.liveSiteOpen : ui.projectOpen;

  if (liveUrl) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  return link;
};
const createProjectThumbnail = (project) => {
  const desktopSrc = getProjectImageSrc(project, "desktop");
  if (!desktopSrc) return null;

  const title = fallback(project.title, "Projekt");
  const previewLink = createProjectLivePreviewLink(
    project,
    "project-thumbnail",
    title + " élő oldal"
  );
  const image = createProjectImage(
    desktopSrc,
    title + " képernyőkép",
    "project-thumbnail-image"
  );

  image.onerror = () => {
    const card = previewLink.closest(".project-card");
    if (card) card.classList.remove("has-project-image");
    previewLink.remove();
  };

  previewLink.append(image);
  return previewLink;
};
const createProjectVisual = (project) => {
  const desktopSrc = getProjectImageSrc(project, "desktop");
  if (!desktopSrc) return createProjectMockup();

  const title = fallback(project.title, "Projekt");
  const visual = createElement("div", "project-screenshot project-featured-screenshot");
  const desktopFrame = createProjectLivePreviewLink(
    project,
    "screenshot-frame desktop-frame",
    title + " desktop nézet"
  );
  const desktopImage = createProjectImage(
    desktopSrc,
    title + " desktop képernyőkép",
    "project-screenshot-image"
  );

  desktopImage.onerror = () => {
    visual.replaceWith(createProjectMockup());
  };

  desktopFrame.append(desktopImage);
  visual.append(desktopFrame);

  const mobileSrc = getProjectImageSrc(project, "mobile");
  if (mobileSrc) {
    const mobileFrame = createProjectLivePreviewLink(
      project,
      "screenshot-frame mobile-frame",
      title + " mobil nézet"
    );
    const mobileImage = createProjectImage(
      mobileSrc,
      title + " mobil képernyőkép",
      "project-screenshot-image"
    );

    mobileImage.onerror = () => {
      mobileFrame.remove();
    };

    mobileFrame.append(mobileImage);
    visual.append(mobileFrame);
  }

  return visual;
};
const createProjectImage = (src, alt, className) => {
  const image = createElement("img", className);
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
};
const bindScreenshotZoom = (element, src, alt, variant = "desktop") => {
  if (!element || !src) return;

  element.classList.add("is-zoomable");
  element.setAttribute("role", "button");
  element.setAttribute("tabindex", "0");
  element.setAttribute("aria-label", `${alt} megnyitása nagy nézetben`);

  const open = () => openScreenshotLightbox(src, alt, variant);

  element.addEventListener("click", open);
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
};

const openScreenshotLightbox = (src, alt, variant = "desktop") => {
  let lightbox = document.querySelector(".screenshot-lightbox");

  if (!lightbox) {
    lightbox = createScreenshotLightbox();
  }

  const image = lightbox.querySelector(".screenshot-lightbox-image");
  image.src = src;
  image.alt = alt || "";

  lightbox.classList.toggle("is-mobile", variant === "mobile");
  lightbox.classList.toggle("is-desktop", variant !== "mobile");
  lightbox.classList.add("is-open");
  document.body.classList.add("has-screenshot-lightbox");

  const closeButton = lightbox.querySelector(".screenshot-lightbox-close");
  if (closeButton) closeButton.focus({ preventScroll: true });
};

const closeScreenshotLightbox = () => {
  const lightbox = document.querySelector(".screenshot-lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("is-open", "is-mobile", "is-desktop");
  document.body.classList.remove("has-screenshot-lightbox");
};

const createScreenshotLightbox = () => {
  const lightbox = createElement("div", "screenshot-lightbox");

  lightbox.innerHTML = `
    <div class="screenshot-lightbox-backdrop" data-close="true"></div>
    <div class="screenshot-lightbox-panel" role="dialog" aria-modal="true" aria-label="Képernyőkép nagy nézetben">
      <button class="screenshot-lightbox-close" type="button" aria-label="Bezárás">×</button>
      <img class="screenshot-lightbox-image" alt="">
    </div>
  `;

  document.body.append(lightbox);

  lightbox.addEventListener("click", (event) => {
    if (
      event.target.dataset.close === "true" ||
      event.target.closest(".screenshot-lightbox-close")
    ) {
      closeScreenshotLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeScreenshotLightbox();
    }
  });

  return lightbox;
};
const getProjectImageSrc = (project, type) => {
  const directValue = project?.[`${type}Image`];
  const legacyValue = project?.imageAssets?.[type];
  return normalizeProjectImagePath(directValue || legacyValue);
};

const normalizeProjectImagePath = (path) => {
  const value = fallback(path, "");
  if (!value) return "";
  return resolveRootAssetPath(value.includes("/") ? value : `CodeNest media web/${value}`);
};

const getProjectStatusLabel = (status) => {
  const value = fallback(status, "").toLowerCase();
  if (value.includes("progress")) return ui.upcomingReference;
  if (value.includes("highlighted")) return ui.featuredReference;
  if (value.includes("published") || value.includes("live")) return ui.liveSite;
  return fallback(status, ui.reference);
};
const createProjectMockup = () => {
  const mockup = createElement("div", "project-mockup");
  const portal = createElement("div", "project-mockup-panel portal-panel");
  const admin = createElement("div", "project-mockup-panel admin-panel");
  const statusHint = createElement("div", "project-status-hint");

  portal.append(
    createElement("p", "mockup-label", "Publikus portál"),
    createElement("h4", "", "Hírek és információk"),
    createElement("span", "project-line wide"),
    createElement("span", "project-line"),
    createElement("span", "project-line short")
  );

  admin.append(
    createElement("p", "mockup-label", "Admin"),
    createProjectMockupRow("Hír közzététele", "Közzétéve"),
    createProjectMockupRow("Dokumentumtár", "Frissítve"),
    createProjectMockupRow("Esemény", "Vázlat")
  );

  statusHint.append(
    createElement("span", "", "szerkeszthető tartalom"),
    createElement("span", "", "rendezett dokumentumok"),
    createElement("span", "", "átlátható működés")
  );

  mockup.append(portal, admin, statusHint);
  return mockup;
};

const createProjectMockupRow = (title, status) => {
  const row = createElement("div", "project-mockup-row");
  row.append(createElement("span", "", title), createElement("strong", "", status));
  return row;
};

const createProjectsCta = () => {
  const cta = createElement("div", "projects-cta");
  cta.append(
    createElement("p", "", ui.projectQuestion),
    createElement("a", "button button-primary", ui.talkProject)
  );

  const link = cta.querySelector("a");
  if (link) link.href = "#kapcsolat";

  return cta;
};

const renderProcessAndWhy = () => {
  const process = siteContent.process || {};
  const why = siteContent.whyCodeNest || {};
  const dataSteps = getArray(process.steps);
  const fallbackProcessSteps = [
    {
      title: "Megértjük",
      text: "Felmérjük a célt, a tartalmakat, a felhasználókat és a működési igényeket.",
    },
    {
      title: "Megtervezzük",
      text: "Átlátható szerkezetet, adatmodellt és szerkesztési logikát alakítunk ki.",
    },
    {
      title: "Megépítjük",
      text: "Elkészítjük a publikus felületet és a hozzá tartozó admin működést.",
    },
    {
      title: "Átadjuk",
      text: "Közösen végigmegyünk a használaton, élesítünk, és rendbe tesszük az indulást.",
    },
    {
      title: "Üzemeltetjük",
      text: "Igény szerint segítünk hostinggal, mentéssel, hibajavítással és későbbi bővítésekkel.",
    },
  ];
  const processSteps = dataSteps.length ? dataSteps : fallbackProcessSteps;
  const processCards = processSteps.slice(0, 5).map((step, index) => {
    const fallbackStep = fallbackProcessSteps[index] || {};
    const card = createElement("article", "process-step");
    const number = createElement("span", "step-number", String(index + 1).padStart(2, "0"));
    const body = createElement("div", "process-step-body");
    const title = createElement("h3", "", fallback(step.title, fallbackStep.title || "Lépés"));
    const text = createElement("p", "", fallback(step.text, fallbackStep.text));

    body.append(title, text);
    card.append(number, body);
    return card;
  });

  setText('[data-render="process-title"]', process.title, "Folyamat");
  setText('[data-render="process-intro"]', process.intro, "V2 folyamat.");
  clearAndAppend('[data-render="process-steps"]', processCards);

  const dataWhyItems = getArray(why.items);
  const fallbackWhyItems = [
    {
      title: "Közvetlen kommunikáció",
      text: "Kis csapatként azokkal beszélsz, akik ténylegesen tervezik és építik a rendszert.",
    },
    {
      title: "Szerkeszthető admin",
      text: "A kezelőfelület nem utólagos extra, hanem a rendszer egyik legfontosabb része.",
    },
    {
      title: "Üzemeltethető alapok",
      text: "A működéshez hosting, mentés, frissítés és támogatás is kapcsolódhat.",
    },
  ];
  const whyItems = dataWhyItems.length ? dataWhyItems : fallbackWhyItems;
  const whyCards = whyItems.map((item, index) => {
    const fallbackItem = fallbackWhyItems[index] || {};
    const card = createElement("article", "why-card");
    const icon = createWhyIcon(index);
    const body = createElement("div", "why-card-body");
    body.append(
      createElement("h3", "", fallback(item.title, fallbackItem.title || "CodeNest")),
      createElement("p", "", fallback(item.text, fallbackItem.text))
    );
    card.append(icon, body);
    return card;
  });

  setText('[data-render="why-title"]', why.title, "Miért CodeNest");
  setText('[data-render="why-intro"]', why.intro, "V2 bizalmi pontok.");
  clearAndAppend('[data-render="why-items"]', whyCards);
};

const createWhyIcon = (index) => {
  const icon = createElement("span", `why-icon why-icon-${index % 3}`);
  icon.setAttribute("aria-hidden", "true");
  return icon;
};

const renderTeam = () => {
  setText('[data-render="team-title"]', teamIntro.title, "Bors + Dávid");
  setText('[data-render="team-intro"]', teamIntro.text, "Kétfős CodeNest bemutatkozás.");

  const fallbackTrustNotes = [
    "Rövid kommunikációs út",
    "Gyorsabb döntések",
    "Kevesebb félreértés",
    "Személyesebb együttműködés",
  ];
  const trustNotesData = getArray(teamIntro.trustNotes);
  const trustNotes = (trustNotesData.length ? trustNotesData : fallbackTrustNotes).map((note) =>
    createElement("span", "", note)
  );
  if (trustNotes.length) clearAndAppend('[data-render="team-notes"]', trustNotes);

  const cards = team.map((member) => {
    const name = fallback(member.name, "Csapattag");
    const card = createElement("article", "team-card");
    const avatar = createElement("span", "team-avatar", getInitial(name));
    const content = createElement("div", "team-card-content");

    content.append(
      createElement("h3", "", name),
      createElement("p", "team-role", fallback(member.role, "Szerepkör")),
      createElement("p", "", fallback(member.shortText, "Bemutatkozás később."))
    );
    card.append(avatar, content);
    return card;
  });

  if (cards.length) clearAndAppend('[data-render="team"]', cards);
};

const getInitial = (name) => Array.from(fallback(name, "C").trim())[0]?.toUpperCase() || "C";

const renderScope = () => {
  const scope = siteContent.scope || {};
  const details = document.querySelector('[data-render="scope-details"]');
  if (!details) return;

  setText('[data-render="scope-title"]', scope.title, "Scope / árazás");
  setText('[data-render="scope-text"]', scope.text, "Scope magyarázat később.");

  const notes = getArray(scope.summaryPoints).map((point) => createElement("p", "scope-note-item", point));
  if (notes.length) clearAndAppend('[data-render="scope-notes"]', notes);

  const children = [];
  const includesTitle = fallback(scope.includesTitle, "");
  const includes = createScopeChecklist(scope.includes);
  const ctaLabel = fallback(scope.ctaLabel, "");

  if (includesTitle) children.push(createElement("h3", "", includesTitle));
  if (includes) children.push(includes);

  if (ctaLabel) {
    const cta = createElement("a", "button button-primary", ctaLabel);
    cta.href = fallback(scope.ctaHref, "#kapcsolat");
    children.push(cta);
  }

  details.replaceChildren(...children);
};

const createScopeChecklist = (items) => {
  const scopeItems = getArray(items);
  if (!scopeItems.length) return null;

  const list = createElement("ul", "scope-check-list");
  scopeItems.forEach((item) => {
    const row = createElement("li", "scope-check-row");
    const check = createElement("span", "scope-check-icon");
    check.setAttribute("aria-hidden", "true");
    row.append(check, createElement("span", "", String(item)));
    list.append(row);
  });
  return list;
};

const renderContact = () => {
  const contact = siteContent.contact || {};
  const details = document.querySelector('[data-render="contact-details"]');
  if (!details) return;

  setText('[data-render="contact-title"]', contact.title, "Kapcsolat");
  setText('[data-render="contact-text"]', contact.text, "Kapcsolati szöveg később.");

  const emailAddress = fallback(contact.email, "info@codenest.hu");
  const labels = contact.formLabels || {};
  const ctaLabel = fallback(labels.submit, ui.talkProject);
  const emailLabel = fallback(contact.emailLabel, "E-mail");

  const side = createElement("div", "contact-side contact-conversation-card");
  const eyebrow = createElement("p", "contact-eyebrow", fallback(ui.contactEyebrow, "Kapcsolat"));
  const title = createElement("h3", "contact-conversation-title", fallback(ui.contactConversationTitle, "Írhatsz röviden is."));
  const copy = createElement("p", "contact-conversation-copy", fallback(ui.contactConversationText, fallback(contact.text, "")));
  const actionRow = createElement("div", "contact-action-row");
  const cta = createElement("a", "button button-primary contact-primary-cta", ctaLabel);
  const email = createElement("a", "contact-email-card", "");
  const emailText = createElement("span", "contact-email-label", emailLabel);
  const emailValue = createElement("strong", "", emailAddress);
  const note = createElement("p", "contact-brief-note", fallback(ui.contactCtaNote, fallback(ui.contactNote, "")));
  const trustList = createElement("ul", "contact-trust-list");

  cta.href = `mailto:${emailAddress}`;
  cta.dataset.linkType = "email";
  cta.setAttribute("aria-label", ctaLabel);

  email.href = `mailto:${emailAddress}`;
  email.dataset.linkType = "email";
  email.setAttribute("aria-label", `${emailLabel}: ${emailAddress}`);
  email.append(emailText, emailValue);

  actionRow.append(cta, email);

  const legalNotice = createElement("p", "contact-legal-notice", "");
  const legalNoticeIntro = document.createTextNode("Az üzenet elküldésével tudomásul veszem a ");
  const legalNoticeLink = createElement("a", "", "Jogi információkban");
  const legalNoticeEnd = document.createTextNode(" foglalt adatkezelési tájékoztatót.");
  legalNoticeLink.href = "/legal-hu.html";
  legalNotice.append(legalNoticeIntro, legalNoticeLink, legalNoticeEnd);

  getArray(ui.contactTrustNotes).forEach((item) => {
    trustList.append(createElement("li", "", item));
  });

  side.append(eyebrow, title, copy, actionRow, legalNotice);
  if (note.textContent) side.append(note);
  if (trustList.childElementCount) side.append(trustList);

  const helper = createElement("div", "contact-helper-card");
  const helperHeader = createElement("div", "contact-helper-header");
  helperHeader.append(
    createElement("h3", "", fallback(ui.contactStarterTitle, "Mit írj nekünk?")),
    createElement("p", "contact-helper-note", fallback(ui.contactStarterIntro, fallback(ui.contactNote, "")))
  );

  const prompts = createElement("ul", "contact-starter-list");
  getArray(ui.contactStarterPrompts).forEach((prompt) => {
    prompts.append(createElement("li", "", prompt));
  });

  const topics = createElement("div", "contact-topic-block");
  const topicTitle = createElement("p", "contact-mini-title", fallback(ui.contactTopicTitle, fallback(labels.projectType, "Projekt típusa")));
  const topicList = createList(contact.projectTypes, "plain-list contact-option-list contact-topic-list");
  topics.append(topicTitle);
  if (topicList) topics.append(topicList);

  const next = createElement("div", "contact-next-card");
  const nextTitle = createElement("h4", "", fallback(ui.contactNextTitle, "Mi történik utána?"));
  const nextList = createElement("ul", "contact-next-list");
  getArray(ui.contactNextSteps).forEach((step) => {
    nextList.append(createElement("li", "", step));
  });
  next.append(nextTitle);
  if (nextList.childElementCount) next.append(nextList);

  helper.append(helperHeader);
  if (prompts.childElementCount) helper.append(prompts);
  helper.append(topics, next);

  details.replaceChildren(side, helper);
};
const renderFooter = () => {
  const footer = siteContent.footer || {};
  const container = document.querySelector('[data-render="footer"]');
  if (!container) {
    setText('[data-render="footer-tagline"]', footer.tagline, "CodeNest");
    return;
  }

  const brandArea = createElement("div", "footer-brand-area");
  const brand = createElement("a", "footer-brand");
  const brandMark = createElement("img", "footer-brand-mark");
  const brandText = createElement("span", "", fallback(footer.brandName, "CodeNest"));
  const tagline = createElement("p", "footer-tagline", fallback(footer.tagline, "CodeNest"));
  const copyrightText = fallback(footer.copyright, "© 2026 CodeNest");

  brandMark.src = resolveRootAssetPath("logo_footer-modified.png");
  brandMark.alt = "";
  brandMark.setAttribute("aria-hidden", "true");
  brandMark.loading = "eager";
  brand.append(brandMark, brandText);
  brand.href = "#hero";
  brandArea.append(brand, tagline);

  const groups = createElement("div", "footer-groups");
  const navGroup = createFooterLinkGroup(ui.footerPages, footer.links);
  const contactGroup = createElement("div", "footer-group");
  const contactTitle = createElement("h3", "", ui.footerContact);
  const contactEmail = createElement("a", "", fallback(siteContent.contact?.email, ""));

  if (contactEmail.textContent) {
    contactEmail.href = `mailto:${contactEmail.textContent}`;
    contactGroup.append(contactTitle, contactEmail);
  }

  if (navGroup) groups.append(navGroup);
  if (contactEmail.textContent) groups.append(contactGroup);

  const legalRow = createFooterLegalRow(copyrightText, legalFooterLinks);
  const footerChildren = [brandArea];
  if (groups.childElementCount) footerChildren.push(groups);
  footerChildren.push(legalRow);

  container.replaceChildren(...footerChildren);
};

const createFooterLegalRow = (copyrightText, links) => {
  const row = createElement("div", "footer-legal-row");
  const copyright = createElement("span", "footer-legal-copyright", fallback(copyrightText, "© 2026 CodeNest"));
  row.append(copyright);

  getArray(links).forEach((item) => {
    const separator = createElement("span", "footer-legal-separator", "·");
    const link = createElement("a", "", fallback(item.label, "Link"));
    separator.setAttribute("aria-hidden", "true");
    link.href = fallback(item.href, "/legal-hu.html");
    row.append(separator, link);
  });

  return row;
};

const createFooterLinkGroup = (title, links) => {
  const footerLinks = getArray(links);
  if (!footerLinks.length) return null;

  const group = createElement("div", "footer-group");
  const heading = createElement("h3", "", title);
  const list = createElement("ul", "footer-link-list");

  footerLinks.forEach((item) => {
    const listItem = createElement("li", "");
    const link = createElement("a", "", fallback(item.label, "Link"));
    link.href = fallback(item.href, "#hero");
    listItem.append(link);
    list.append(listItem);
  });

  group.append(heading, list);
  return group;
};

const createList = (items, className) => {
  if (!Array.isArray(items) || !items.length) return null;

  const list = createElement("ul", className);
  items.forEach((item) => {
    list.append(createElement("li", "", String(item)));
  });
  return list;
};

const initSectionNavigation = () => {
  if (sectionNavigationCleanup) sectionNavigationCleanup();

  const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"], .mobile-menu-nav a[href^="#"]'));
  const sectionLinks = links
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section, id } : null;
    })
    .filter(Boolean);

  if (!sectionLinks.length) return;

  const header = document.querySelector(".site-header");
  let currentActiveId = "";
  let ticking = false;
  const clickHandlers = [];

  const setActiveLink = (activeId) => {
    if (!activeId || activeId === currentActiveId) return;
    currentActiveId = activeId;

    sectionLinks.forEach(({ link, id }) => {
      const isActive = id === activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const getSectionTop = (section) => section.getBoundingClientRect().top + window.scrollY;

  const getActiveSectionId = () => {
    const headerOffset = header?.offsetHeight || 0;
    const referenceY = window.scrollY + headerOffset + window.innerHeight * 0.24;
    const isNearPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    let activeId = sectionLinks[0].id;
    if (isNearPageEnd) return sectionLinks[sectionLinks.length - 1].id;
    sectionLinks.forEach(({ section, id }) => {
      if (getSectionTop(section) <= referenceY) activeId = id;
    });
    return activeId;
  };

  const updateActiveLink = () => {
    ticking = false;
    setActiveLink(getActiveSectionId());
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActiveLink);
  };

  sectionLinks.forEach(({ link, id }) => {
    const handler = () => {
      setActiveLink(id);
      closeMobileMenu();
      window.setTimeout(requestUpdate, 120);
    };
    link.addEventListener("click", handler);
    clickHandlers.push({ link, handler });
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
  setActiveLink(getActiveSectionId());

  sectionNavigationCleanup = () => {
    clickHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    window.removeEventListener("hashchange", requestUpdate);
    sectionNavigationCleanup = null;
  };
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
  const nextLanguage = normalizeLanguage(language) || "hu";
  currentLanguage = nextLanguage;
  storeLanguage(currentLanguage);
  updateUrlLanguage(currentLanguage);
  setDocumentLanguage(currentLanguage);
  refreshLocalizedData();
  renderPage();
  closeLanguageDropdowns();
  closeMobileMenu();
};

const initLanguageControls = () => {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest("[data-language-trigger]");
    if (trigger) {
      event.stopPropagation();
      toggleLanguageDropdown(trigger);
      return;
    }

    const button = target?.closest("[data-language]");
    if (button) {
      setLanguage(button.dataset.language);
      return;
    }

    if (!target?.closest(".language-switcher")) closeLanguageDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLanguageDropdowns();
  });
};

const getSectionLabels = () => {
  const nav = siteContent.navigation?.items || [];
  return {
    problem: currentLanguage === "hu" ? "Probléma" : "Problem",
    services: fallback(nav[0]?.label, currentLanguage === "de" ? "Was wir bauen" : currentLanguage === "en" ? "What we build" : "Mit építünk"),
    projects: currentLanguage === "de" ? "Ausgewählte Arbeiten" : currentLanguage === "en" ? "Featured work" : "Kiemelt munkák",
    process: fallback(nav[2]?.label, currentLanguage === "de" ? "Prozess" : currentLanguage === "en" ? "Process" : "Folyamat"),
    why: currentLanguage === "de" ? "Warum CodeNest" : currentLanguage === "en" ? "Why CodeNest" : "Miért CodeNest",
    team: "Bors + Dávid",
    scope: currentLanguage === "de" ? "Scope / Preisfindung" : currentLanguage === "en" ? "Scope / pricing" : "Scope / árazás",
    contact: fallback(nav[4]?.label, currentLanguage === "de" ? "Kontakt" : currentLanguage === "en" ? "Contact" : "Kapcsolat"),
  };
};

const renderStaticSectionLabels = () => {
  const labels = getSectionLabels();
  setText('#problema .section-kicker', labels.problem, labels.problem);
  setText('#mit-epitunk .section-kicker', labels.services, labels.services);
  setText('#mit-epitunk h2', labels.services, labels.services);
  setText('#munkak .section-kicker', labels.projects, labels.projects);
  setText('#munkak h2', labels.projects, labels.projects);
  setText('#folyamat .section-kicker', labels.process, labels.process);
  setText('#miert-codenest .section-kicker', labels.why, labels.why);
  setText('#bors-david .section-kicker', labels.team, labels.team);
  setText('#scope-arazas .section-kicker', labels.scope, labels.scope);
  setText('#kapcsolat .section-kicker', labels.contact, labels.contact);
};
const renderPage = () => {
  renderSeoMeta();
  renderNavigation();
  renderLanguageSwitchers();
  renderStaticSectionLabels();
  renderHero();
  renderProblem();
  renderServices();
  renderProjects();
  renderProcessAndWhy();
  renderTeam();
  renderScope();
  renderContact();
  renderFooter();
  initSectionNavigation();
};

setDocumentLanguage(currentLanguage);
renderPage();
initMobileMenu();
initLanguageControls();









