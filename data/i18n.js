import { siteContent as baseSiteContent } from "./site-content.js";
import { services as baseServices } from "./services.js";
import { projects as baseProjects } from "./projects.js";
import { teamIntro as baseTeamIntro, team as baseTeam } from "./team.js";

export const supportedLanguages = [
  { code: "hu", label: "HU", name: "Magyar" },
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
];

const codes = supportedLanguages.map((item) => item.code);
const storageKey = "codenest-v2-language";

export const uiTranslations = {
  hu: {
    navigationLabel: "V2 preview navigáció",
    mobileMenuLabel: "Mobil menü",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    languageLabel: "Nyelv",
    projectOpen: "Projekt megnyitása",
    liveSiteOpen: "Élő oldal megnyitása",
    liveSiteNewTab: "Élő oldal megnyitása új lapon",
    talkProject: "Beszéljünk a projektről",
    projectQuestion: "Hasonló rendszert szeretnél?",
    featuredWork: "Kiemelt munka",
    upcomingReference: "Hamarosan élesedő referencia",
    featuredReference: "Kiemelt referencia",
    liveSite: "Élő oldal",
    reference: "Referencia",
    before: "Előtte",
    after: "Utána",
    footerPages: "Oldalak",
    footerLegal: "Jogi",
    footerContact: "Kapcsolat",
    companyField: "Cég / intézmény",
    contactNote: "Nem kell kész brief. Elég pár mondat arról, min dolgozol, mi pedig segítünk kitalálni a jó következő lépést.",
    contactTrustNotes: ["Nem kell kész brief", "Elég pár mondat", "Közvetlenül velünk beszélsz"],
    contactEyebrow: "Beszélgetésindító",
    contactConversationTitle: "Írhatsz röviden is.",
    contactConversationText: "Nem sablon ajánlatot küldünk. Először megértjük, milyen helyzetből indultok, és milyen webes rendszer lenne életszerű.",
    contactCtaNote: "A beszélgetés e-mailben indul, nem kell hozzá kész specifikáció.",
    contactStarterTitle: "Mit írj nekünk?",
    contactStarterIntro: "Pár kapaszkodó, ha még nincs kész brief.",
    contactStarterPrompts: ["milyen szervezet / projekt", "mi nem működik most", "milyen tartalmat vagy folyamatot kellene kezelni", "van-e meglévő oldal vagy admin", "mikor lenne ideális indulni"],
    contactTopicTitle: "Lehetséges irányok",
    contactNextTitle: "Mi történik utána?",
    contactNextSteps: ["Visszaírunk, ha valamit pontosítani kell.", "Megnézzük, milyen rendszer lenne reális első körben.", "Ha van értelme, kapsz egy érthető következő lépést."],
    case: {
      title: "CodeNest esettanulmány",
      navigationLabel: "Esettanulmány navigáció",
      backToWork: "← Vissza a munkákhoz",
      backToWorkPlain: "Vissza a munkákhoz",
      loadingKicker: "Esettanulmány",
      loadingTitle: "Projekt betöltése...",
      loadingText: "A CodeNest V2 esettanulmány tartalma a projektek adatfájljából érkezik.",
      notFoundTitle: "Nem találjuk ezt a projektet.",
      notFoundText: "Lehet, hogy hibás vagy régi linket nyitottál meg. Menj vissza a V2 munkák szekciójához, és válassz egy projektet.",
      overviewProject: "Projekt",
      overviewType: "Típus",
      overviewStatus: "Állapot",
      challenge: "Kihívás",
      challengeTitle: "A kihívás",
      solution: "Megoldás",
      solutionTitle: "A megoldás",
      screens: "Képernyők",
      visualTitle: "Projekt képernyőképek",
      visualText: "A projekt publikus felülete desktop és mobil nézetben.",
      emptyVisual: "Képernyőkép később kerül ide.",
      modules: "Modulok",
      modulesTitle: "Fő elemek",
      lesson: "Tanulság",
      resultTitle: "Mit ad ez az alap?",
      nextStep: "Következő lépés",
      bottomTitle: "Hasonló rendszert szeretnél?",
      bottomText: "Nem kell kész specifikáció. Elég, ha röviden leírod, milyen oldalt, adminfelületet vagy digitális eszközt szeretnétek.",
      statusInProgress: "Folyamatban",
      statusFeatured: "Kiemelt munka",
      statusPublished: "Éles oldal",
    },
  },
  en: {
    navigationLabel: "V2 preview navigation",
    mobileMenuLabel: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    projectOpen: "Open project",
    liveSiteOpen: "Open live site",
    liveSiteNewTab: "Open live site in a new tab",
    talkProject: "Let’s talk about the project",
    projectQuestion: "Want a similar system?",
    featuredWork: "Featured work",
    upcomingReference: "Reference launching soon",
    featuredReference: "Featured reference",
    liveSite: "Live site",
    reference: "Reference",
    before: "Before",
    after: "After",
    footerPages: "Pages",
    footerLegal: "Legal",
    footerContact: "Contact",
    companyField: "Company / institution",
    contactNote: "You do not need a finished brief. A few clear sentences about what you are working on are enough to start.",
    contactTrustNotes: ["No finished brief needed", "A few clear sentences are enough", "You talk directly with us"],
    contactEyebrow: "Conversation starter",
    contactConversationTitle: "A short message is enough.",
    contactConversationText: "We do not send template proposals. First we understand the situation, then we help shape a realistic web system direction.",
    contactCtaNote: "The conversation starts by email; no finished specification is needed.",
    contactStarterTitle: "What should you tell us?",
    contactStarterIntro: "A few useful prompts if the brief is not ready yet.",
    contactStarterPrompts: ["what organization or project it is", "what is not working today", "what content or workflow should be handled", "whether there is an existing site or admin", "when launch would ideally happen"],
    contactTopicTitle: "Possible directions",
    contactNextTitle: "What happens next?",
    contactNextSteps: ["We reply if something needs clarifying.", "We look at what kind of system would make sense first.", "If there is a fit, you get a clear next step."],
    case: {
      title: "CodeNest case study",
      navigationLabel: "Case study navigation",
      backToWork: "← Back to work",
      backToWorkPlain: "Back to work",
      loadingKicker: "Case study",
      loadingTitle: "Loading project...",
      loadingText: "The CodeNest V2 case-study content comes from the project data file.",
      notFoundTitle: "We cannot find this project.",
      notFoundText: "The link may be wrong or outdated. Go back to the V2 work section and choose a project.",
      overviewProject: "Project",
      overviewType: "Type",
      overviewStatus: "Status",
      challenge: "Challenge",
      challengeTitle: "The challenge",
      solution: "Solution",
      solutionTitle: "The solution",
      screens: "Screens",
      visualTitle: "Project screenshots",
      visualText: "The public interface in desktop and mobile views.",
      emptyVisual: "Screenshot will be added later.",
      modules: "Modules",
      modulesTitle: "Main elements",
      lesson: "Takeaway",
      resultTitle: "What does this foundation give?",
      nextStep: "Next step",
      bottomTitle: "Want a similar system?",
      bottomText: "You do not need a finished specification. A short description of the site, admin interface or digital tool is enough to start.",
      statusInProgress: "In progress",
      statusFeatured: "Featured work",
      statusPublished: "Live site",
    },
  },
  de: {
    navigationLabel: "V2 Preview Navigation",
    mobileMenuLabel: "Mobiles Menü",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    languageLabel: "Sprache",
    projectOpen: "Projekt öffnen",
    liveSiteOpen: "Live-Seite öffnen",
    liveSiteNewTab: "Live-Seite in neuem Tab öffnen",
    talkProject: "Über das Projekt sprechen",
    projectQuestion: "Möchtest du ein ähnliches System?",
    featuredWork: "Ausgewählte Arbeit",
    upcomingReference: "Referenz geht bald live",
    featuredReference: "Ausgewählte Referenz",
    liveSite: "Live-Seite",
    reference: "Referenz",
    before: "Vorher",
    after: "Nachher",
    footerPages: "Seiten",
    footerLegal: "Rechtliches",
    footerContact: "Kontakt",
    companyField: "Firma / Institution",
    contactNote: "Du brauchst kein fertiges Briefing. Ein paar klare Sätze darüber, woran ihr arbeitet, reichen für den Anfang.",
    contactTrustNotes: ["Kein fertiges Briefing nötig", "Ein paar klare Sätze reichen", "Du sprichst direkt mit uns"],
    contactEyebrow: "Gespräch starten",
    contactConversationTitle: "Eine kurze Nachricht reicht.",
    contactConversationText: "Wir schicken kein Standardangebot. Zuerst verstehen wir die Situation und klären, welche Weblösung sinnvoll wäre.",
    contactCtaNote: "Das Gespräch beginnt per E-Mail; eine fertige Spezifikation ist nicht nötig.",
    contactStarterTitle: "Was solltest du schreiben?",
    contactStarterIntro: "Ein paar hilfreiche Punkte, wenn das Briefing noch nicht fertig ist.",
    contactStarterPrompts: ["welche Organisation oder welches Projekt", "was aktuell nicht gut funktioniert", "welche Inhalte oder Abläufe verwaltet werden sollen", "ob es bereits eine Website oder ein Admin gibt", "wann der Start ideal wäre"],
    contactTopicTitle: "Mögliche Richtungen",
    contactNextTitle: "Was passiert danach?",
    contactNextSteps: ["Wir melden uns, wenn etwas geklärt werden sollte.", "Wir schauen, welche Lösung als erster Schritt sinnvoll wäre.", "Wenn es passt, bekommst du einen klaren nächsten Schritt."],
    case: {
      title: "CodeNest Fallstudie",
      navigationLabel: "Fallstudien-Navigation",
      backToWork: "← Zurück zu den Arbeiten",
      backToWorkPlain: "Zurück zu den Arbeiten",
      loadingKicker: "Fallstudie",
      loadingTitle: "Projekt wird geladen...",
      loadingText: "Der Inhalt der CodeNest V2 Fallstudie kommt aus der Projektdatei.",
      notFoundTitle: "Wir finden dieses Projekt nicht.",
      notFoundText: "Der Link ist vielleicht falsch oder veraltet. Geh zurück zum V2 Arbeitsbereich und wähle ein Projekt.",
      overviewProject: "Projekt",
      overviewType: "Typ",
      overviewStatus: "Status",
      challenge: "Herausforderung",
      challengeTitle: "Die Herausforderung",
      solution: "Lösung",
      solutionTitle: "Die Lösung",
      screens: "Screens",
      visualTitle: "Projekt-Screenshots",
      visualText: "Die öffentliche Oberfläche in Desktop- und Mobilansicht.",
      emptyVisual: "Screenshot wird später ergänzt.",
      modules: "Module",
      modulesTitle: "Hauptelemente",
      lesson: "Erkenntnis",
      resultTitle: "Was bringt diese Grundlage?",
      nextStep: "Nächster Schritt",
      bottomTitle: "Möchtest du ein ähnliches System?",
      bottomText: "Du brauchst keine fertige Spezifikation. Eine kurze Beschreibung der Website, Adminoberfläche oder des digitalen Werkzeugs reicht für den Start.",
      statusInProgress: "In Arbeit",
      statusFeatured: "Ausgewählte Arbeit",
      statusPublished: "Live-Seite",
    },
  },
};

const translations = {
  en: {
    siteContent: {
      navigation: { items: [
        { label: "What we build", href: "#mit-epitunk" },
        { label: "Work", href: "#munkak" },
        { label: "Process", href: "#folyamat" },
        { label: "About us", href: "#bors-david" },
        { label: "Contact", href: "#kapcsolat" },
      ] },
      hero: {
        headline: "Web systems you can actually use — not just look at.",
        subheadline: "We build editable websites, admin interfaces and custom digital tools for municipalities, institutions and small businesses.",
        primaryCta: "Let’s talk about the project",
        secondaryCta: "See what we build",
      },
      problem: {
        title: "Most websites get launched. Then they become hard to use.",
        text: "Many organizations do not need another static brochure site. They need a system the team can actually use: publish news, upload documents, receive forms, follow workflows and keep things running safely.",
        painPoints: [
          { title: "Hard to update", text: "Content gets outdated because every small change needs coordination or developer help." },
          { title: "Scattered content", text: "Documents, news and practical information live in too many places." },
          { title: "Email chaos", text: "Requests, applications and reports can easily disappear in the inbox." },
          { title: "No clear handover", text: "The site is finished, but ownership, updates and operation are not always clear." },
        ],
        beforeAfter: { before: ["Scattered content", "Developer dependency", "Email chaos"], after: ["Editable admin", "Organized content", "Transparent workflow"] },
        solution: "We build web systems that do not only look good, but remain usable, editable and maintainable after handover.",
      },
      process: {
        title: "A clear process without unnecessary loops.",
        intro: "As a small team, we work directly with you: first we understand what the system has to solve, then we build the structure, interface and operation around it.",
        steps: [
          { title: "Understand", text: "We get to know the goal, users, current problems and what the system needs to solve." },
          { title: "Plan", text: "We shape the page structure, content types, admin logic and required functions." },
          { title: "Build", text: "We create the website, admin interface, forms, integrations and technical foundation." },
          { title: "Hand over", text: "We train, document, hand over access and help with launch." },
          { title: "Operate", text: "If needed, we help with hosting, backups, updates, support and further development." },
        ],
      },
      whyCodeNest: {
        title: "Why CodeNest?",
        intro: "We do not work like a large agency machine. Two people, direct communication and a practical mindset behind every web system.",
        items: [
          { title: "Direct communication", text: "You talk to the people who understand and build the system." },
          { title: "Editable admin", text: "We do not hand over a closed box. Clients can manage the content and workflows they need every day." },
          { title: "Operable foundations", text: "Hosting, backups, updates, access and support are part of the system, not afterthoughts." },
        ],
      },
      scope: {
        title: "Every project starts with scope.",
        text: "We do not use public fixed package prices. First we understand what the web system has to do, then we shape the project size, technical foundation and post-launch operation around it.",
        summaryPoints: ["The proposal is based on the website, admin, content structure and workflows that are actually needed.", "Not everything has to be built at once: we separate launch-critical parts from later extensions.", "After the first conversations, you get a clear and understandable proposal."],
        includesTitle: "What do we clarify?",
        includes: ["Functions and page types", "Admin interface and permissions", "Content types and editing logic", "Forms, notifications and workflows", "Hosting, backup and support", "Future extension options"],
        ctaLabel: "Let’s talk about the project",
      },
      contact: {
        title: "Let’s talk about your project.",
        text: "You do not need a finished specification. Briefly describe what you are working on and what you need; we will help figure out the right next step.",
        emailLabel: "Email",
        formLabels: { name: "Name", email: "Email", projectType: "Project type", message: "Message", submit: "Let’s talk about the project" },
        projectTypes: ["Municipal / institutional portal", "Admin-powered business website", "Custom web tool", "Rethinking an existing site", "I am not sure yet"],
      },
      footer: {
        tagline: "Web systems you can actually use.",
        links: [
          { label: "What we build", href: "#mit-epitunk" }, { label: "Work", href: "#munkak" }, { label: "Process", href: "#folyamat" }, { label: "About us", href: "#bors-david" }, { label: "Contact", href: "#kapcsolat" },
        ],
        legalLinks: [{ label: "Privacy", href: "legal-hu.html" }, { label: "Imprint", href: "legal-hu.html" }],
        copyright: "© 2026 CodeNest. All rights reserved.",
      },
    },
    services: {
      "onkormanyzati-es-intezmenyi-portalok": { title: "Municipal and institutional portals", shortDescription: "Clear, editable portals for news, documents, events and public information.", supportingText: "We build portals where the public interface and the admin logic work together, so institutional teams can manage them long term.", features: ["News, events and announcements", "Document library and downloads", "Editable pages and menu structure", "Forms, reports and basic workflows"], chips: ["portal", "admin", "documents", "forms"], ctaLabel: "Let’s talk about the project" },
      "adminos-uzleti-weboldalak": { title: "Admin-powered business websites", shortDescription: "Business websites where content, offers, references and forms are not developer-only tasks.", supportingText: "For small businesses and service providers, we build websites with a simple admin interface behind them.", features: ["Editable services and subpages", "References, images and content blocks", "Contact and request forms", "Hosting, backup and maintenance support"], chips: ["business website", "admin", "requests", "support"], ctaLabel: "Let’s talk about the project" },
      "egyedi-webes-eszkozok": { title: "Custom web tools", shortDescription: "Small internal systems, calculators, data tools and workflows for concrete operational problems.", supportingText: "When the task is too specific for a template but does not need a full enterprise system, we build a focused web tool around it.", features: ["Custom forms and data handling", "Internal admin or dashboard views", "Simple permission logic", "Exports, notifications and workflow steps"], chips: ["web tool", "workflow", "dashboard", "data"], ctaLabel: "Let’s talk about the project" },
    },
    projects: {
      "gardony-platform": { category: "Municipality / institution", shortDescription: "Municipal portal with news, a document library, events and editable admin logic.", tags: ["municipality", "portal", "admin", "documents"], caseStudy: { eyebrow: "Featured work", headline: "A municipal portal where the public site and admin logic work together.", summary: "Gárdony Platform is an editable institutional portal for news, documents, events and local content. The focus is not only on appearance, but on keeping the system manageable after handover.", visualTitle: "Public portal and admin view", visualText: "The screenshots show how Gárdony Platform handles public content and internal editing workflows together." } },
      "ildiko-fonad": { category: "Expert / service website", shortDescription: "Multilingual expert website focused on services, introduction, gallery and contact.", tags: ["expert site", "services", "gallery", "multilingual", "contact"], caseStudy: { eyebrow: "Expert website", headline: "A multilingual introduction site with service-focused content.", summary: "The Ildiko Fonad website helps visitors quickly understand the services, professional background and next step for contact." } },
      googee: { category: "Business website", shortDescription: "Business introduction site that makes the brand message and visitor orientation clearer.", tags: ["business website", "brand", "introduction"], caseStudy: { eyebrow: "Business website", headline: "A brand-focused business website with a clear content path.", summary: "Googee is an organized business website that supports the brand and helps visitors find the key information quickly." } },
      bossclub: { category: "Community / platform", shortDescription: "Community-focused website that organizes a targeted offer and brand world into a clear format.", tags: ["community", "platform", "community site"], caseStudy: { eyebrow: "Community platform", headline: "A community-focused website with structured introduction.", summary: "BossClub presents a community offer, atmosphere and related content in a clear public interface." } },
      rockvibe: { category: "Music / event", shortDescription: "Music and event-based website with a distinct visual mood and easy-to-follow content structure.", tags: ["music", "event", "campaign site"], caseStudy: { eyebrow: "Music / event site", headline: "A characterful event site where mood and content work together.", summary: "RockVibe needed atmosphere, but also a content structure visitors can move through quickly." } },
      greengoo: { category: "Brand / product", shortDescription: "Product and brand-focused website that presents the offer and related content simply.", tags: ["brand", "product", "landing"], caseStudy: { eyebrow: "Brand / product", headline: "A product-focused landing page with simple offer presentation.", summary: "GreenGoo organizes offer, visual mood and related information into one clear rhythm." } },
      "skillbridge-home": { category: "Education / application", shortDescription: "Education-focused site with application-oriented content and clear information structure.", tags: ["education", "application", "information site"], caseStudy: { eyebrow: "Education / application", headline: "An education site where the information structure supports the application path.", summary: "SkillBridge Home helps interested visitors understand the opportunity, process and next step for applying." } },
    },
    teamIntro: { title: "Two people carry the project through.", text: "CodeNest is run by Bors and Dávid. As a small, focused development studio, we take on fewer projects at once, but carry them directly from the first conversation to launch.", trustNotes: ["Short communication path", "Faster decisions", "Fewer misunderstandings", "More personal collaboration"] },
    team: { Bors: { role: "Development, systems, backend", shortText: "Responsible for system logic, data structures, admin interfaces and technical operation." }, "Dávid": { role: "Design, frontend, project communication", shortText: "Responsible for user experience, visual implementation and the shared project rhythm." } },
  },
  de: {
    siteContent: {
      navigation: { items: [
        { label: "Was wir bauen", href: "#mit-epitunk" }, { label: "Arbeiten", href: "#munkak" }, { label: "Prozess", href: "#folyamat" }, { label: "Über uns", href: "#bors-david" }, { label: "Kontakt", href: "#kapcsolat" },
      ] },
      hero: { headline: "Websysteme, die man nicht nur ansehen, sondern wirklich nutzen kann.", subheadline: "Wir bauen editierbare Websites, Adminoberflächen und individuelle digitale Lösungen für Gemeinden, Institutionen und kleine Unternehmen.", primaryCta: "Über das Projekt sprechen", secondaryCta: "Ansehen, was wir bauen" },
      problem: { title: "Die meisten Websites werden fertig. Danach sind sie schwer zu nutzen.", text: "Viele Organisationen brauchen keine weitere statische Website, sondern ein System, das das Team wirklich nutzen kann: Nachrichten veröffentlichen, Dokumente hochladen, Formulare empfangen, Abläufe verfolgen und sicher betreiben.", painPoints: [{ title: "Schwer zu aktualisieren", text: "Inhalte veralten, weil jede kleine Änderung Abstimmung oder Entwicklerhilfe braucht." }, { title: "Verstreute Inhalte", text: "Dokumente, Nachrichten und Informationen liegen an zu vielen Orten." }, { title: "E-Mail-Chaos", text: "Anfragen, Bewerbungen und Meldungen können im Posteingang leicht untergehen." }, { title: "Keine klare Übergabe", text: "Die Website ist fertig, aber Pflege, Updates und Betrieb sind nicht immer klar." }], beforeAfter: { before: ["Verstreute Inhalte", "Abhängigkeit von Entwicklern", "E-Mail-Chaos"], after: ["Editierbarer Admin", "Geordnete Inhalte", "Transparenter Ablauf"] }, solution: "Wir bauen Websysteme, die nicht nur gut aussehen, sondern nach der Übergabe nutzbar, editierbar und langfristig betreibbar bleiben." },
      process: { title: "Ein klarer Prozess ohne unnötige Schleifen.", intro: "Als kleines Team arbeiten wir direkt mit dir: zuerst verstehen wir, was das System lösen muss, danach bauen wir Struktur, Oberfläche und Betrieb darum herum.", steps: [{ title: "Verstehen", text: "Wir lernen Ziel, Nutzer, aktuelle Probleme und die Aufgabe des Systems kennen." }, { title: "Planen", text: "Wir strukturieren Seiten, Inhaltstypen, Adminlogik und notwendige Funktionen." }, { title: "Bauen", text: "Wir erstellen Website, Adminoberfläche, Formulare, Integrationen und technische Grundlage." }, { title: "Übergeben", text: "Wir schulen, dokumentieren, übergeben Zugänge und unterstützen beim Launch." }, { title: "Betreiben", text: "Bei Bedarf helfen wir mit Hosting, Backups, Updates, Support und Weiterentwicklung." }] },
      whyCodeNest: { title: "Warum CodeNest?", intro: "Wir arbeiten nicht wie eine große Agenturmaschine. Zwei Menschen, direkte Kommunikation und ein praktischer Blick auf jedes Websystem.", items: [{ title: "Direkte Kommunikation", text: "Du sprichst mit den Menschen, die das System verstehen und bauen." }, { title: "Editierbarer Admin", text: "Wir übergeben keine geschlossene Box. Kundinnen und Kunden können Inhalte und Abläufe selbst pflegen." }, { title: "Betreibbare Grundlage", text: "Hosting, Backup, Updates, Zugänge und Support sind Teil des Systems." }] },
      scope: { title: "Jedes Projekt startet mit dem Scope.", text: "Wir haben keine öffentlichen Fixpakete. Zuerst verstehen wir, was das Websystem leisten muss, und richten Umfang, technische Grundlage und Betrieb danach aus.", summaryPoints: ["Das Angebot basiert auf Website, Adminoberfläche, Inhaltsstruktur und Abläufen, die wirklich gebraucht werden.", "Nicht alles muss sofort gebaut werden: wir trennen Startumfang und spätere Erweiterungen.", "Nach der Abstimmung bekommst du einen verständlichen Vorschlag."], includesTitle: "Was klären wir?", includes: ["Funktionen und Seitentypen", "Adminoberfläche und Rechte", "Inhaltstypen und Editierlogik", "Formulare, Benachrichtigungen und Workflows", "Hosting, Backup und Support", "Optionen für spätere Erweiterung"], ctaLabel: "Über das Projekt sprechen" },
      contact: { title: "Lass uns über dein Projekt sprechen.", text: "Du brauchst keine fertige Spezifikation. Beschreibe kurz, woran ihr arbeitet und was ihr braucht; wir helfen beim nächsten sinnvollen Schritt.", emailLabel: "E-Mail", formLabels: { name: "Name", email: "E-Mail", projectType: "Projekttyp", message: "Nachricht", submit: "Über das Projekt sprechen" }, projectTypes: ["Kommunales / institutionelles Portal", "Business-Website mit Admin", "Individuelles Webtool", "Bestehende Seite neu denken", "Ich weiß es noch nicht"] },
      footer: { tagline: "Websysteme, die man wirklich nutzen kann.", links: [{ label: "Was wir bauen", href: "#mit-epitunk" }, { label: "Arbeiten", href: "#munkak" }, { label: "Prozess", href: "#folyamat" }, { label: "Über uns", href: "#bors-david" }, { label: "Kontakt", href: "#kapcsolat" }], legalLinks: [{ label: "Datenschutz", href: "legal-hu.html" }, { label: "Impressum", href: "legal-hu.html" }], copyright: "© 2026 CodeNest. Alle Rechte vorbehalten." },
    },
    services: {
      "onkormanyzati-es-intezmenyi-portalok": { title: "Kommunale und institutionelle Portale", shortDescription: "Klare, editierbare Portale für Nachrichten, Dokumente, Veranstaltungen und öffentliche Informationen.", supportingText: "Wir bauen Portale, in denen öffentliche Oberfläche und Adminlogik zusammenarbeiten.", features: ["Nachrichten, Veranstaltungen und Mitteilungen", "Dokumentenbibliothek und Downloads", "Editierbare Seiten und Menüstruktur", "Formulare, Meldungen und einfache Workflows"], chips: ["Portal", "Admin", "Dokumente", "Formulare"], ctaLabel: "Über das Projekt sprechen" },
      "adminos-uzleti-weboldalak": { title: "Business-Websites mit Admin", shortDescription: "Websites, bei denen Inhalte, Angebote, Referenzen und Formulare nicht nur Entwickleraufgaben sind.", supportingText: "Für kleine Unternehmen und Dienstleister bauen wir Websites mit einfacher Adminoberfläche.", features: ["Editierbare Leistungen und Unterseiten", "Referenzen, Bilder und Inhaltsblöcke", "Kontakt- und Anfrageformulare", "Hosting, Backup und Wartung"], chips: ["Business-Website", "Admin", "Anfragen", "Support"], ctaLabel: "Über das Projekt sprechen" },
      "egyedi-webes-eszkozok": { title: "Individuelle Webtools", shortDescription: "Kleine interne Systeme, Rechner, Datentools und Workflows für konkrete operative Probleme.", supportingText: "Wenn die Aufgabe zu spezifisch für eine Vorlage ist, bauen wir ein fokussiertes Webtool dafür.", features: ["Individuelle Formulare und Datenhandling", "Interne Admin- oder Dashboard-Ansichten", "Einfache Rechte-Logik", "Exporte, Benachrichtigungen und Workflow-Schritte"], chips: ["Webtool", "Workflow", "Dashboard", "Daten"], ctaLabel: "Über das Projekt sprechen" },
    },
    projects: {
      "gardony-platform": { category: "Gemeinde / Institution", shortDescription: "Kommunales Portal mit Nachrichten, Dokumentenbibliothek, Veranstaltungen und editierbarer Adminlogik.", tags: ["Gemeinde", "Portal", "Admin", "Dokumente"], caseStudy: { eyebrow: "Ausgewählte Arbeit", headline: "Ein kommunales Portal, in dem öffentliche Seite und Adminlogik zusammenarbeiten.", summary: "Gárdony Platform ist ein editierbares institutionelles Portal für Nachrichten, Dokumente, Veranstaltungen und lokale Inhalte.", visualTitle: "Öffentliches Portal und Adminansicht", visualText: "Die Screenshots zeigen, wie Gárdony Platform öffentliche Inhalte und interne Bearbeitungsabläufe verbindet." } },
      "ildiko-fonad": { category: "Expertinnen- / Dienstleistungswebsite", shortDescription: "Mehrsprachige Expertinnen-Website mit Fokus auf Leistungen, Vorstellung, Galerie und Kontakt.", tags: ["Expertinnen-Seite", "Leistungen", "Galerie", "Mehrsprachigkeit", "Kontakt"], caseStudy: { eyebrow: "Expertinnen-Website", headline: "Eine mehrsprachige Vorstellungsseite mit dienstleistungsorientiertem Inhalt.", summary: "Die Ildiko Fonad Website hilft, Leistungen, fachlichen Hintergrund und Kontakt schnell zu verstehen." } },
      googee: { category: "Business-Website", shortDescription: "Business-Vorstellungsseite, die Markenbotschaft und Besucherorientierung klarer macht.", tags: ["Business-Website", "Marke", "Vorstellung"], caseStudy: { eyebrow: "Business-Website", headline: "Eine markenorientierte Business-Website mit klarer Inhaltsführung.", summary: "Bei Googee war das Ziel eine geordnete Website, die die Marke unterstützt." } },
      bossclub: { category: "Community / Plattform", shortDescription: "Community-fokussierte Website, die Angebot und Markenwelt übersichtlich ordnet.", tags: ["Community", "Plattform", "Community-Seite"], caseStudy: { eyebrow: "Community-Plattform", headline: "Eine community-fokussierte Website mit strukturierter Vorstellung.", summary: "BossClub präsentiert ein Community-Angebot, Atmosphäre und Inhalte in einer klaren Oberfläche." } },
      rockvibe: { category: "Musik / Event", shortDescription: "Musik- und Eventwebsite mit charaktervoller visueller Welt und klarer Inhaltsstruktur.", tags: ["Musik", "Event", "Kampagnenseite"], caseStudy: { eyebrow: "Musik- / Eventseite", headline: "Eine charaktervolle Eventseite, auf der Stimmung und Inhalt zusammenarbeiten.", summary: "RockVibe brauchte Atmosphäre und eine schnell nutzbare Inhaltsstruktur." } },
      greengoo: { category: "Marke / Produkt", shortDescription: "Produkt- und markenorientierte Website, die Angebot und Inhalte einfach präsentiert.", tags: ["Marke", "Produkt", "Landing"], caseStudy: { eyebrow: "Marke / Produkt", headline: "Eine produktfokussierte Landingpage mit einfacher Angebotsdarstellung.", summary: "GreenGoo ordnet Angebot, visuelle Stimmung und Informationen in einen klaren Rhythmus." } },
      "skillbridge-home": { category: "Bildung / Anmeldung", shortDescription: "Bildungsseite mit anmeldeorientierten Inhalten und klarer Informationsstruktur.", tags: ["Bildung", "Anmeldung", "Informationsseite"], caseStudy: { eyebrow: "Bildung / Anmeldung", headline: "Eine Bildungsseite, deren Informationsstruktur den Anmeldeweg unterstützt.", summary: "SkillBridge Home hilft Interessierten, Angebot, Prozess und nächsten Schritt schnell zu verstehen." } },
    },
    teamIntro: { title: "Zwei Menschen begleiten das Projekt durchgehend.", text: "Hinter CodeNest stehen Bors und Dávid. Als kleines fokussiertes Studio begleiten wir Projekte direkt vom ersten Gespräch bis zum Launch.", trustNotes: ["Kurzer Kommunikationsweg", "Schnellere Entscheidungen", "Weniger Missverständnisse", "Persönlichere Zusammenarbeit"] },
    team: { Bors: { role: "Entwicklung, Systeme, Backend", shortText: "Verantwortlich für Systemlogik, Datenstrukturen, Adminoberflächen und technischen Betrieb." }, "Dávid": { role: "Design, Frontend, Projektkommunikation", shortText: "Verantwortlich für Nutzererlebnis, visuelle Umsetzung und gemeinsamen Projektrhythmus." } },
  },
};

const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const clone = (value) => {
  if (Array.isArray(value)) return value.map(clone);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clone(item)]));
  return value;
};
const merge = (base, patch) => {
  if (patch === undefined) return clone(base);
  if (Array.isArray(patch)) return clone(patch);
  if (!isObject(patch)) return patch;
  const output = isObject(base) ? clone(base) : {};
  Object.entries(patch).forEach(([key, value]) => {
    output[key] = merge(output[key], value);
  });
  return output;
};

export const normalizeLanguage = (language) => {
  const code = String(language || "").trim().toLowerCase().slice(0, 2);
  return codes.includes(code) ? code : "";
};

export const getUrlLanguage = (search = "") => {
  try { return normalizeLanguage(new URLSearchParams(search).get("lang")); } catch (_error) { return ""; }
};

export const getStoredLanguage = () => {
  try { return normalizeLanguage(window.localStorage.getItem(storageKey)); } catch (_error) { return ""; }
};

export const getBrowserLanguage = () => {
  if (typeof navigator === "undefined") return "";
  const list = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
  return normalizeLanguage(list.find((language) => normalizeLanguage(language)));
};

export const resolveInitialLanguage = () => {
  const fromUrl = typeof window !== "undefined" ? getUrlLanguage(window.location.search) : "";
  return fromUrl || getStoredLanguage() || getBrowserLanguage() || "hu";
};

export const storeLanguage = (language) => {
  try { window.localStorage.setItem(storageKey, normalizeLanguage(language) || "hu"); } catch (_error) {}
};

export const updateUrlLanguage = (language) => {
  if (typeof window === "undefined" || !window.history?.replaceState) return;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", normalizeLanguage(language) || "hu");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

export const setDocumentLanguage = (language) => {
  if (typeof document !== "undefined") document.documentElement.lang = normalizeLanguage(language) || "hu";
};

export const getUiTranslations = (language) => uiTranslations[normalizeLanguage(language) || "hu"] || uiTranslations.hu;

export const getLocalizedData = (language) => {
  const lang = normalizeLanguage(language) || "hu";
  const data = translations[lang] || {};
  return {
    language: lang,
    ui: getUiTranslations(lang),
    siteContent: merge(baseSiteContent, data.siteContent),
    services: baseServices.map((service) => merge(service, data.services?.[service.slug])),
    projects: baseProjects.map((project) => merge(project, data.projects?.[project.slug])),
    teamIntro: merge(baseTeamIntro, data.teamIntro),
    team: baseTeam.map((member) => merge(member, data.team?.[member.name])),
  };
};

export const withLanguageParam = (href, language) => {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || /^https?:\/\//i.test(href)) return href;
  try {
    const url = new URL(href, window.location.href);
    url.searchParams.set("lang", normalizeLanguage(language) || "hu");
    return `${url.pathname.split("/").pop()}${url.search}${url.hash}`;
  } catch (_error) {
    return href;
  }
};
