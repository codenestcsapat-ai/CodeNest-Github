import { siteContent } from "./data/site-content.js";
import { services } from "./data/services.js";
import { projects } from "./data/projects.js";
import { teamIntro, team } from "./data/team.js";

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

const clearAndAppend = (selector, children) => {
  const container = document.querySelector(selector);
  if (!container) return;
  container.replaceChildren(...children);
};

const getArray = (value) => (Array.isArray(value) ? value : []);

const renderNavigation = () => {
  const items = Array.isArray(siteContent.navigation?.items)
    ? siteContent.navigation.items
    : [];

  const links = items.map((item) => {
    const link = createElement("a", "", fallback(item.label, "Menü"));
    link.href = fallback(item.href, "#hero");
    return link;
  });

  if (links.length) clearAndAppend('[data-render="navigation"]', links);
};

const renderHero = () => {
  const hero = siteContent.hero || {};

  setText('[data-render="hero-headline"]', hero.headline, "CodeNest V2");
  setText('[data-render="hero-subheadline"]', hero.subheadline, "V2 preview tartalom.");
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

  const before = createComparisonColumn("Előtte", beforeItems);
  const after = createComparisonColumn("Utána", afterItems);
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
  const badge = createElement("span", "project-badge", "Kiemelt munka");
  const status = createElement("span", "project-status", getProjectStatusLabel(project.status));
  const category = createElement("p", "section-kicker", fallback(project.category, "Projekt"));
  const title = createElement("h3", "", fallback(project.title, "Kiemelt munka"));
  const description = createElement("p", "project-description", fallback(project.shortDescription, "Projektleírás később."));
  const tags = createList(project.tags, "chips project-tags");
  const link = createProjectLink(project, "Projekt megnyitása");

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
  const link = createProjectLink(project, "Projekt megnyitása");

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
  link.setAttribute("aria-label", title + " projekt megnyitása");
  link.title = "Projekt megnyitása";
  return link;
};
const getProjectCaseStudyHref = (project) => {
  const explicitHref = fallback(project?.caseStudyHref, "");
  if (explicitHref) return explicitHref;
  const slug = fallback(project?.slug, "");
  return slug ? "case-study.html?project=" + encodeURIComponent(slug) : "#munkak";
};

const getProjectLiveUrl = (project) => fallback(project?.liveUrl, fallback(project?.url, ""));

const createProjectLivePreviewLink = (project, className, label) => {
  const link = createElement("a", className + " is-external-preview");
  const liveUrl = getProjectLiveUrl(project);

  link.href = liveUrl || getProjectCaseStudyHref(project);
  link.dataset.linkType = liveUrl ? "external-preview" : "case-study-preview";
  link.setAttribute("aria-label", liveUrl ? label + " megnyitása új lapon" : label + " projekt megnyitása");
  link.title = liveUrl ? "Élő oldal megnyitása" : "Projekt megnyitása";

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
  return value.includes("/") ? value : `CodeNest media web/${value}`;
};

const getProjectStatusLabel = (status) => {
  const value = fallback(status, "").toLowerCase();
  if (value.includes("progress")) return "Hamarosan élesedő referencia";
  if (value.includes("highlighted")) return "Kiemelt referencia";
  if (value.includes("live")) return "Élő oldal";
  return fallback(status, "Referencia");
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
    createElement("p", "", "Hasonló rendszert szeretnél?"),
    createElement("a", "button button-primary", "Beszéljünk a projektről")
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
  const side = createElement("div", "contact-side");
  const email = createElement(
    "a",
    "contact-email-card",
    `${fallback(contact.emailLabel, "E-mail")}: ${emailAddress}`
  );
  const trustList = createElement("ul", "contact-trust-list");
  ["Nem kell kész specifikáció", "Közvetlenül velünk beszélsz", "1-2 munkanapon belül válaszolunk"].forEach((note) => {
    trustList.append(createElement("li", "", note));
  });

  email.href = `mailto:${emailAddress}`;
  email.dataset.linkType = "email";
  email.setAttribute("aria-label", "E-mail írása a CodeNestnek");
  side.append(email, trustList);

  const formPreview = createElement("div", "contact-form-preview");
  const title = createElement("h3", "", fallback(labels.projectType, "Projekt típusa"));
  const note = createElement("p", "contact-form-note", "A beszélgetés e-mailben indul, nem kell kész specifikáció.");
  const options = createList(contact.projectTypes, "plain-list contact-option-list");
  const fieldGrid = createElement("div", "contact-field-grid");
  [
    fallback(labels.name, "Név"),
    fallback(labels.email, "E-mail"),
    "Cég / intézmény",
    fallback(labels.message, "Üzenet"),
  ].forEach((label, index) => {
    const field = createElement("span", index === 3 ? "contact-field is-message" : "contact-field", label);
    fieldGrid.append(field);
  });
  const cta = createElement("a", "button button-primary", fallback(labels.submit, "Beszéljünk a projektről"));
  cta.href = `mailto:${emailAddress}`;
  cta.dataset.linkType = "email";
  cta.setAttribute("aria-label", "Projektindító e-mail írása a CodeNestnek");

  formPreview.append(title, note);
  if (options) formPreview.append(options);
  formPreview.append(fieldGrid, cta);
  details.replaceChildren(side, formPreview);
};
const renderFooter = () => {
  const footer = siteContent.footer || {};
  const container = document.querySelector('[data-render="footer"]');
  if (!container) {
    setText('[data-render="footer-tagline"]', footer.tagline, "CodeNest V2");
    return;
  }

  const brandArea = createElement("div", "footer-brand-area");
  const brand = createElement("a", "footer-brand");
  const brandMark = createElement("img", "footer-brand-mark");
  const brandText = createElement("span", "", fallback(footer.brandName, "CodeNest"));
  const tagline = createElement("p", "footer-tagline", fallback(footer.tagline, "CodeNest V2"));
  const copyright = createElement("p", "footer-copyright", fallback(footer.copyright, ""));

  brandMark.src = "logo_footer-modified.png";
  brandMark.alt = "";
  brandMark.setAttribute("aria-hidden", "true");
  brandMark.loading = "eager";
  brand.append(brandMark, brandText);
  brand.href = "#hero";
  brandArea.append(brand, tagline);
  if (copyright.textContent) brandArea.append(copyright);

  const groups = createElement("div", "footer-groups");
  const navGroup = createFooterLinkGroup("Oldalak", footer.links);
  const legalGroup = createFooterLinkGroup("Jogi", footer.legalLinks);
  const contactGroup = createElement("div", "footer-group");
  const contactTitle = createElement("h3", "", "Kapcsolat");
  const contactEmail = createElement("a", "", fallback(siteContent.contact?.email, ""));

  if (contactEmail.textContent) {
    contactEmail.href = `mailto:${contactEmail.textContent}`;
    contactGroup.append(contactTitle, contactEmail);
  }

  if (navGroup) groups.append(navGroup);
  if (legalGroup) groups.append(legalGroup);
  if (contactEmail.textContent) groups.append(contactGroup);

  container.replaceChildren(brandArea, groups);
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
  const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (!links.length) return;

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

  const setActiveLink = (activeId) => {
    if (!activeId || activeId === currentActiveId) return;
    currentActiveId = activeId;

    sectionLinks.forEach(({ link, id }) => {
      const isActive = id === activeId;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
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
      if (getSectionTop(section) <= referenceY) {
        activeId = id;
      }
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
    link.addEventListener("click", () => {
      setActiveLink(id);
      window.setTimeout(requestUpdate, 120);
    });
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", () => window.setTimeout(requestUpdate, 80));

  setActiveLink(getActiveSectionId());
};
renderNavigation();
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

