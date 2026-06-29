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

const renderNavigation = () => {
  const items = Array.isArray(siteContent.navigation?.items)
    ? siteContent.navigation.items
    : [];

  const links = items.map((item) => {
    const link = createElement("a", "", fallback(item.label, "Menü"));
    link.href = fallback(item.href, "#home");
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
};

const renderProblem = () => {
  const problem = siteContent.problem || {};

  setText('[data-render="problem-title"]', problem.title, "Problem");
  setText('[data-render="problem-text"]', problem.text, "V2 problem framing.");
};

const renderServices = () => {
  const cards = services.map((service) => {
    const card = createElement("article", "card");
    const title = createElement("h3", "", fallback(service.title, "Szolgáltatás"));
    const description = createElement("p", "", fallback(service.shortDescription, "Rövid leírás később."));
    const details = createElement("p", "", fallback(service.supportingText, ""));
    const chips = createList(service.chips, "chips");

    card.append(title, description);
    if (details.textContent) card.append(details);
    if (chips) card.append(chips);
    return card;
  });

  if (cards.length) clearAndAppend('[data-render="services"]', cards);
};

const renderProjects = () => {
  const cards = projects.map((project) => {
    const card = createElement("article", project.highlighted ? "card card-highlighted" : "card");
    const eyebrow = createElement("p", "section-kicker", fallback(project.category, "Projekt"));
    const title = createElement("h3", "", fallback(project.title, "Projekt"));
    const description = createElement("p", "", fallback(project.shortDescription, "Projektleírás később."));
    const tags = createList(project.tags, "chips");
    const link = createElement("a", "button button-secondary", "Megnyitás");

    link.href = fallback(project.url, "#projects");
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
  setText('[data-render="process-title"]', siteContent.process?.title, "Folyamat");
  setText('[data-render="process-intro"]', siteContent.process?.intro, "V2 folyamat.");

  setText('[data-render="why-title"]', siteContent.whyCodeNest?.title, "Miért CodeNest");
  setText('[data-render="why-intro"]', siteContent.whyCodeNest?.intro, "V2 bizalmi pontok.");
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
  setText('[data-render="scope-title"]', siteContent.scope?.title, "Scope / árazás");
  setText('[data-render="scope-text"]', siteContent.scope?.text, "Scope magyarázat később.");
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
