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
    const cta = createElement("a", "button button-secondary", fallback(service.ctaLabel, "Beszéljünk róla"));

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
  const cards = projects.map((project) => {
    const card = createElement("article", project.highlighted ? "card card-highlighted" : "card");
    const eyebrow = createElement("p", "section-kicker", fallback(project.category, "Projekt"));
    const title = createElement("h3", "", fallback(project.title, "Projekt"));
    const description = createElement("p", "", fallback(project.shortDescription, "Projektleírás később."));
    const tags = createList(project.tags, "chips");
    const link = createElement("a", "button button-secondary", "Megnyitás");

    link.href = fallback(project.url, "#kapcsolat");
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    card.append(eyebrow, title, description);
    if (tags) card.append(tags);
    card.append(link);
    return card;
  });

  if (cards.length) clearAndAppend('[data-render="projects"]', cards);
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
  const processCards = processSteps.map((step, index) => {
    const fallbackStep = fallbackProcessSteps[index] || {};
    const card = createElement("article", "card process-card");
    const number = createElement("span", "step-number", String(index + 1).padStart(2, "0"));
    const title = createElement("h3", "", fallback(step.title, fallbackStep.title || "Lépés"));
    const text = createElement("p", "", fallback(step.text, fallbackStep.text));

    card.append(number, title, text);
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
    const card = createElement("article", "card compact-card");
    card.append(
      createElement("h3", "", fallback(item.title, fallbackItem.title || "CodeNest")),
      createElement("p", "", fallback(item.text, fallbackItem.text))
    );
    return card;
  });

  setText('[data-render="why-title"]', why.title, "Miért CodeNest");
  setText('[data-render="why-intro"]', why.intro, "V2 bizalmi pontok.");
  clearAndAppend('[data-render="why-items"]', whyCards);
};

const renderTeam = () => {
  setText('[data-render="team-title"]', teamIntro.title, "Bors + Dávid");
  setText('[data-render="team-intro"]', teamIntro.text, "Kétfős CodeNest bemutatkozás.");

  const cards = team.map((member) => {
    const card = createElement("article", "card");
    card.append(
      createElement("h3", "", fallback(member.name, "Csapattag")),
      createElement("p", "section-kicker", fallback(member.role, "Szerepkör")),
      createElement("p", "", fallback(member.shortText, "Bemutatkozás később."))
    );
    return card;
  });

  if (cards.length) clearAndAppend('[data-render="team"]', cards);
};

const renderScope = () => {
  const scope = siteContent.scope || {};
  const details = document.querySelector('[data-render="scope-details"]');
  if (!details) return;

  setText('[data-render="scope-title"]', scope.title, "Scope / árazás");
  setText('[data-render="scope-text"]', scope.text, "Scope magyarázat később.");

  const children = [];
  const includesTitle = fallback(scope.includesTitle, "");
  const includes = createList(scope.includes, "plain-list");
  const ctaLabel = fallback(scope.ctaLabel, "");

  if (includesTitle) children.push(createElement("h3", "", includesTitle));
  if (includes) children.push(includes);

  if (ctaLabel) {
    const cta = createElement("a", "button button-secondary", ctaLabel);
    cta.href = fallback(scope.ctaHref, "#kapcsolat");
    children.push(cta);
  }

  details.replaceChildren(...children);
};

const renderContact = () => {
  const contact = siteContent.contact || {};
  const details = document.querySelector('[data-render="contact-details"]');
  if (!details) return;

  setText('[data-render="contact-title"]', contact.title, "Kapcsolat");
  setText('[data-render="contact-text"]', contact.text, "Kapcsolati szöveg később.");

  const email = createElement(
    "p",
    "",
    `${fallback(contact.emailLabel, "Email")}: ${fallback(contact.email, "info@codenest.hu")}`
  );
  const title = createElement("h3", "", fallback(contact.formLabels?.projectType, "Projekt típusa"));
  const options = createList(contact.projectTypes, "plain-list");

  details.replaceChildren(email, title);
  if (options) details.append(options);
};

const renderFooter = () => {
  setText('[data-render="footer-tagline"]', siteContent.footer?.tagline, "CodeNest V2");
};

const createList = (items, className) => {
  if (!Array.isArray(items) || !items.length) return null;

  const list = createElement("ul", className);
  items.forEach((item) => {
    list.append(createElement("li", "", String(item)));
  });
  return list;
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
