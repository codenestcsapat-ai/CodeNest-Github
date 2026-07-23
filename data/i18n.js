import { siteContent as baseSiteContent } from "./site-content.js";
import { services as baseServices } from "./services.js";
import { projects as baseProjects } from "./projects.js";
import { teamIntro as baseTeamIntro, team as baseTeam } from "./team.js";

export const supportedLanguages = [
  { code: "hu", label: "HU", name: "Magyar", flagSrc: "Flag_of_Hungary.svg" },
  { code: "en", label: "EN", name: "English", flagSrc: "Flag_of_the_United_Kingdom.svg" },
  { code: "de", label: "DE", name: "Deutsch", flagSrc: "Flag_of_Germany.svg" },
];

const codes = supportedLanguages.map((item) => item.code);
const storageKey = "codenest-v2-language";
const languageRoutes = { hu: "/", en: "/en/", de: "/de/" };
const previewPagePattern = /(?:^|\/)(?:v2-preview|case-study)\.html$/i;

export const uiTranslations = {
  hu: {
    navigationLabel: "CodeNest navigáció",
    mobileMenuLabel: "Mobil menü",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    languageLabel: "Nyelv",
    projectOpen: "Projekt megnyitása",
    liveSiteOpen: "Élő oldal megnyitása",
    liveSiteNewTab: "Élő oldal megnyitása új lapon",
    talkProject: "20 perces ingyenes átbeszélés",
    projectQuestion: "Hasonló, frissíthető weboldalt szeretnél?",
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
    contactNote: "Nem kell kész brief. Elég pár mondat arról, milyen oldalra lenne szükség, mi pedig segítünk kitalálni a jó következő lépést.",
    contactTrustNotes: ["Nem kell kész brief", "Elég pár mondat", "Közvetlenül velünk beszélsz"],
    contactEyebrow: "Beszélgetésindító",
    contactConversationTitle: "Írhatsz röviden is.",
    contactConversationText: "Nem sablon ajánlatot küldünk. Először röviden átbeszéljük, milyen helyzetből indultok, és milyen weboldal vagy szerkeszthető online alap lenne életszerű.",
    contactCtaNote: "A 20 perces átbeszélés e-mailben indul, nem kell hozzá kész specifikáció.",
    contactStarterTitle: "Mit írj nekünk?",
    contactStarterIntro: "Pár kapaszkodó, ha még nincs kész brief.",
    contactStarterPrompts: ["milyen szervezet / projekt", "mi nem működik most", "milyen tartalmat vagy folyamatot kellene kezelni", "van-e meglévő oldal vagy admin", "mikor lenne ideális indulni"],
    contactTopicTitle: "Lehetséges irányok",
    contactNextTitle: "Mi történik utána?",
    contactNextSteps: ["Visszaírunk, ha valamit pontosítani kell.", "Megnézzük, milyen rendszer lenne reális első körben.", "Ha van értelme, kapsz egy érthető következő lépést."],
    heroMockup: {
      ariaLabel: "CodeNest \u00e1ltal \u00e9p\u00edtett haszn\u00e1lhat\u00f3 webes rendszer el\u0151n\u00e9zete",
      publicSite: "Publikus oldal",
      newsTitle: "H\u00edrek \u00e9s inform\u00e1ci\u00f3k",
      adminArea: "Adminfel\u00fclet",
      documents: "Dokumentumok",
      newPost: "\u00daj h\u00edr",
      mobileView: "Mobil n\u00e9zet",
      rows: [
        { label: "Test\u00fcleti jegyz\u0151k\u00f6nyv", status: "K\u00f6zz\u00e9t\u00e9ve" },
        { label: "Ny\u00e1ri nyitvatart\u00e1s", status: "V\u00e1zlat" },
        { label: "Rendezv\u00e9ny megh\u00edv\u00f3", status: "K\u00f6zz\u00e9t\u00e9ve" },
      ],
    },
    serviceModuleLabels: ["Dokumentumt\u00e1r", "Szerkeszthet\u0151", "Workflow"],
    projectMockupRows: [
      { label: "Dokumentumt\u00e1r", status: "Friss\u00edtve" },
      { label: "H\u00edrek", status: "K\u00f6zz\u00e9t\u00e9ve" },
      { label: "\u0170rlapok", status: "Be\u00e9rkezett" },
    ],
    legalInfoLabel: "Jogi inform\u00e1ci\u00f3k",
    homeLabel: "CodeNest f\u0151oldal",
    screenshotLabel: "k\u00e9perny\u0151k\u00e9p",
    desktopScreenshotLabel: "desktop k\u00e9perny\u0151k\u00e9p",
    mobileScreenshotLabel: "mobil k\u00e9perny\u0151k\u00e9p",
    zoomOpenSuffix: "megnyit\u00e1sa nagy n\u00e9zetben",
    livePreviewSuffix: "\u00e9l\u0151 oldal",
    contactPrivacy: {
      intro: "Az \u00fczenet elk\u00fcld\u00e9s\u00e9vel tudom\u00e1sul veszem a ",
      linkLabel: "Jogi inform\u00e1ci\u00f3kban",
      end: " foglalt adatkezel\u00e9si t\u00e1j\u00e9koztat\u00f3t.",
    },
    case: {
      title: "CodeNest esettanulmány",
      navigationLabel: "Esettanulmány navigáció",
      backToWork: "← Vissza a munkákhoz",
      backToWorkPlain: "Vissza a munkákhoz",
      loadingKicker: "Esettanulmány",
      loadingTitle: "Projekt betöltése",
      loadingText: "A CodeNest esettanulmány tartalma betöltés alatt van.",
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
      bottomTitle: "Hasonló, frissíthető weboldalt szeretnél?",
      bottomText: "Nem kell kész specifikáció. Elég, ha röviden leírod, milyen oldalt szeretnétek, mit kellene könnyebben frissíteni, és hol akadtok el most.",
      statusInProgress: "Folyamatban",
      statusFeatured: "Kiemelt munka",
      statusPublished: "Éles oldal",
    },
  },
  en: {
    navigationLabel: "CodeNest navigation",
    mobileMenuLabel: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    projectOpen: "Open project",
    liveSiteOpen: "Open live site",
    liveSiteNewTab: "Open live site in a new tab",
    talkProject: "Let us talk briefly",
    projectQuestion: "Thinking about a similar website?",
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
    contactConversationText: "We do not start with an audit or a template proposal. First we look at the situation together and see what first version would make sense.",
    contactCtaNote: "The first step is a short, practical conversation; no finished brief is needed.",
    contactStarterTitle: "What should you tell us?",
    contactStarterIntro: "A few useful prompts if the brief is not ready yet.",
    contactStarterPrompts: ["who the website is for", "what is hard to manage today", "what should be easier to update", "whether there is an existing site or admin", "when launch would ideally happen"],
    contactTopicTitle: "Possible directions",
    contactNextTitle: "What happens next?",
    contactNextSteps: ["We reply if something needs clarifying.", "We look at what would make sense as a first version.", "If the project fits, you get a clear next step."],
    heroMockup: {
      ariaLabel: "Preview of a usable web system built by CodeNest",
      publicSite: "Public page",
      newsTitle: "News and information",
      adminArea: "Admin area",
      documents: "Documents",
      newPost: "New post",
      mobileView: "Mobile view",
      rows: [
        { label: "Council minutes", status: "Published" },
        { label: "Summer opening hours", status: "Draft" },
        { label: "Event invitation", status: "Published" },
      ],
    },
    serviceModuleLabels: ["Documents", "Editable", "Workflow"],
    projectMockupRows: [
      { label: "Documents", status: "Updated" },
      { label: "News", status: "Published" },
      { label: "Forms", status: "Received" },
    ],
    legalInfoLabel: "Legal information",
    homeLabel: "CodeNest homepage",
    screenshotLabel: "screenshot",
    desktopScreenshotLabel: "desktop screenshot",
    mobileScreenshotLabel: "mobile screenshot",
    zoomOpenSuffix: "open in large view",
    livePreviewSuffix: "live site",
    contactPrivacy: {
      intro: "By sending a message, you acknowledge the privacy information in ",
      linkLabel: "Legal information",
      end: ".",
    },
    case: {
      title: "CodeNest case study",
      navigationLabel: "Case study navigation",
      backToWork: "← Back to work",
      backToWorkPlain: "Back to work",
      loadingKicker: "Case study",
      loadingTitle: "Loading project...",
      loadingText: "The CodeNest case-study content is loading.",
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
      bottomTitle: "Thinking about a similar website?",
      bottomText: "You do not need a finished brief. A short description of the website and what matters on it is enough to start.",
      statusInProgress: "In progress",
      statusFeatured: "Featured work",
      statusPublished: "Live site",
    },
  },
  de: {
    navigationLabel: "CodeNest Navigation",
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
    contactConversationText: "Wir schicken kein Standardangebot. Zuerst verstehen wir die Situation und klären, welche erste Version sinnvoll wäre.",
    contactCtaNote: "Das Gespräch beginnt per E-Mail; eine fertige Spezifikation ist nicht nötig.",
    contactStarterTitle: "Was solltest du schreiben?",
    contactStarterIntro: "Ein paar hilfreiche Punkte, wenn das Briefing noch nicht fertig ist.",
    contactStarterPrompts: ["welche Organisation oder welches Projekt", "was aktuell nicht gut funktioniert", "welche Inhalte oder Abläufe verwaltet werden sollen", "ob es bereits eine Website oder ein Admin gibt", "wann der Start ideal wäre"],
    contactTopicTitle: "Mögliche Richtungen",
    contactNextTitle: "Was passiert danach?",
    contactNextSteps: ["Wir melden uns, wenn etwas geklärt werden sollte.", "Wir schauen, welche erste Version sinnvoll wäre.", "Wenn das Projekt passt, bekommst du einen klaren nächsten Schritt."],
    heroMockup: {
      ariaLabel: "Vorschau eines nutzbaren Websystems von CodeNest",
      publicSite: "\u00d6ffentliche Seite",
      newsTitle: "Nachrichten und Informationen",
      adminArea: "Adminbereich",
      documents: "Dokumente",
      newPost: "Neue Nachricht",
      mobileView: "Mobilansicht",
      rows: [
        { label: "Sitzungsprotokoll", status: "Ver\u00f6ffentlicht" },
        { label: "Sommer\u00f6ffnungszeiten", status: "Entwurf" },
        { label: "Einladung zur Veranstaltung", status: "Ver\u00f6ffentlicht" },
      ],
    },
    serviceModuleLabels: ["Dokumente", "Pflegbar", "Workflow"],
    projectMockupRows: [
      { label: "Dokumente", status: "Aktualisiert" },
      { label: "Nachrichten", status: "Ver\u00f6ffentlicht" },
      { label: "Formulare", status: "Eingegangen" },
    ],
    legalInfoLabel: "Rechtliche Informationen",
    homeLabel: "CodeNest Startseite",
    screenshotLabel: "Screenshot",
    desktopScreenshotLabel: "Desktop-Screenshot",
    mobileScreenshotLabel: "Mobil-Screenshot",
    zoomOpenSuffix: "in gro\u00dfer Ansicht \u00f6ffnen",
    livePreviewSuffix: "Live-Seite",
    contactPrivacy: {
      intro: "Mit dem Senden einer Nachricht nimmst du die Datenschutzhinweise in den ",
      linkLabel: "rechtlichen Informationen",
      end: " zur Kenntnis.",
    },
    case: {
      title: "CodeNest Fallstudie",
      navigationLabel: "Fallstudien-Navigation",
      backToWork: "← Zurück zu den Arbeiten",
      backToWorkPlain: "Zurück zu den Arbeiten",
      loadingKicker: "Fallstudie",
      loadingTitle: "Projekt wird geladen...",
      loadingText: "Der Inhalt der CodeNest Fallstudie wird geladen.",
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
      seo: {
        title: "CodeNest – Websites that are easy to use and update",
        description: "We build clear, editable websites for smaller municipalities, institutions, accommodation providers and local businesses.",
        ogTitle: "CodeNest – Websites that are easy to use and update",
        ogDescription: "A small Hungarian studio building clear, maintainable websites and online foundations.",
        canonicalUrl: "https://codenest.hu/en/",
      },
      navigation: { items: [
        { label: "What we build", href: "#mit-epitunk" },
        { label: "Work", href: "#munkak" },
        { label: "Process", href: "#folyamat" },
        { label: "About us", href: "#bors-david" },
        { label: "Contact", href: "#kapcsolat" },
      ] },
      hero: {
        headline: "Clear websites that are easy to update later.",
        subheadline: "As a young Hungarian business, we help smaller municipalities, institutions and businesses create websites where visitors quickly find what they need and clients can update important content later.",
        primaryCta: "Request a short conversation",
        secondaryCta: "See how we help",
      },
      problem: {
        title: "A website is useful when people can find their way around it.",
        text: "A good website is not only about looking nice. Visitors need to find news, documents, prices, photos, contact details or booking information quickly. The owner also needs to update important content later.",
        painPoints: [
          { title: "Hard to update", text: "Content gets outdated because every small change needs coordination or developer help." },
          { title: "Hard-to-find information", text: "Documents, news and practical information live in too many places." },
          { title: "Unclear contact path", text: "Requests, applications and reports can easily disappear in the inbox." },
          { title: "No clear handover", text: "The site is finished, but ownership, updates and operation are not always clear." },
        ],
        beforeAfter: { before: ["Hard-to-find information", "Hard updates", "Unclear contact path"], after: ["Easy updates", "Organized content", "Comfortable on phone"] },
        solution: "We create websites that are not only nice at first glance, but useful in everyday use: visitors can find their way around, and clients can update important content.",
      },
      process: {
        title: "A simple process with clear steps.",
        intro: "We do not overcomplicate it. First we look at what the website needs to do, who will use it, what content matters and what is worth building for the first version.",
        steps: [
          { title: "Understand", text: "We get to know the goal, users, current problems and what the system needs to solve." },
          { title: "Plan", text: "We organize the pages, text, images, documents, forms or contact points that are needed." },
          { title: "Build", text: "We create the website and, when useful, an editable area so small updates do not always need a developer." },
          { title: "Hand over", text: "We train, document, hand over access and help with launch." },
          { title: "Operate", text: "If a question, small change or technical setup comes up later, we can help after launch too." },
        ],
      },
      whyCodeNest: {
        title: "Why CodeNest?",
        intro: "We do not try to sound like a large company. Two people work with you directly and build websites that clients can understand and use.",
        items: [
          { title: "Direct communication", text: "You talk to the people who actually build the website." },
          { title: "Easy updates", text: "The goal is simple: the client should be able to update the important parts of the website later." },
          { title: "Clear handover", text: "We pay attention to domains, access, updates, launch steps and external provider accounts so they are not unclear later." },
        ],
      },
      scope: {
        title: "Every project starts with scope.",
        text: "We do not publish fixed packages, because a local service provider, a guesthouse and a municipal website need different things. First we look at what is needed, what belongs in the first version and what can wait.",
        summaryPoints: ["The proposal is based on the real task: pages, content, update needs and contact points.", "Not everything has to be built at once: we separate launch-critical parts from later extensions.", "After the first conversations, you get a clear and understandable proposal."],
        includesTitle: "What do we clarify?",
        includes: ["Functions and page types", "Editable area and access", "Content that should be updated later", "Forms and contact points", "Launch setup and handover", "Future extension options"],
        ctaLabel: "Let us talk briefly",
      },
      contact: {
        title: "Let us talk briefly.",
        text: "You do not need a finished brief. Tell us what you are working on, what is hard to manage, or what you need next; we will help find the right starting point.",
        emailLabel: "Email",
        formLabels: { name: "Name", email: "Email", projectType: "Project type", message: "Message", submit: "Send a short message" },
        projectTypes: ["Municipality or institution website", "Local business or professional website", "Accommodation or tourism website", "Rethinking an existing site", "I am not sure yet"],
      },
      footer: {
        tagline: "Clear, easy-to-update websites.",
        links: [
          { label: "What we build", href: "#mit-epitunk" }, { label: "Work", href: "#munkak" }, { label: "Process", href: "#folyamat" }, { label: "About us", href: "#bors-david" }, { label: "Contact", href: "#kapcsolat" },
        ],
        legalLinks: [{ label: "Privacy", href: "legal-hu.html" }, { label: "Imprint", href: "legal-hu.html" }],
        copyright: "© 2026 CodeNest. All rights reserved.",
      },
    },
    services: {
      "onkormanyzati-es-intezmenyi-portalok": {
        title: "Municipalities and institutions",
        shortDescription: "Clear, easy-to-update websites for news, documents, events and contact information.",
        supportingText: "We help smaller municipalities and institutions create websites where residents or visitors find important information quickly, and staff can update content later.",
        features: ["News, events and notices", "Document library and downloads", "Editable frequently changing content", "Forms, notices and simple updates"],
        chips: ["portal", "admin", "documents", "forms"],
        ctaLabel: "Let us talk briefly",
      },
      "adminos-uzleti-weboldalak": {
        title: "Local businesses and professionals",
        shortDescription: "Introductory and service websites where visitors quickly understand what you do and how to contact you.",
        supportingText: "We build websites that explain the service clearly, show images or references, guide visitors toward contact and work comfortably on phones.",
        features: ["Editable services and pages", "References, images and content blocks", "Contact and request forms", "Launch and update help"],
        chips: ["editable website", "admin", "requests", "support"],
        ctaLabel: "Let us talk briefly",
      },
      "egyedi-webes-eszkozok": {
        title: "Accommodation and tourism websites",
        shortDescription: "Image-led, easy-to-use pages for guests, programs, accommodation and local attractions.",
        supportingText: "Guests usually want photos, information, prices or contact options quickly. We help with clear structure, comfortable mobile use and content that can be updated later.",
        features: ["Gallery, introduction and practical information", "Contact, booking or inquiry direction", "Simple permission logic", "Seasonal information and images"],
        chips: ["tourism", "updates", "gallery", "data"],
        ctaLabel: "Let us talk briefly",
      },
    },
    projects: {
      "gardony-platform": {
        category: "Municipality / institution",
        shortDescription: "Municipal website with news, documents, events and content that can be updated later.",
        tags: ["municipality", "portal", "admin", "documents"],
        caseStudy: {
          eyebrow: "Featured work",
          headline: "A municipal portal where the public site and editorial admin work together.",
          summary: "Gárdony Platform is an editable institutional portal for news, documents, events and local information. The important part is the system behind the public site: content stays organized, editable and easier to maintain after handover.",
          overview: [
            { label: "Type", value: "municipal / institutional portal" },
            { label: "Focus", value: "public portal + editorial admin" },
            { label: "Status", value: "featured, in progress" },
          ],
          challengeTitle: "The challenge",
          challenge: [
            "A municipal or institutional website has to organize many content types: news, documents, events and practical local information.",
            "The admin interface also needs to remain understandable for people who are not developers.",
            "Mobile presentation and public information structure need to work together with the editorial backend.",
          ],
          solutionTitle: "The solution",
          solution: [
            { title: "Editable content", text: "News, documents and local information are structured so they can be maintained in the admin and expanded later." },
            { title: "Portal logic", text: "The public website is not a separate facade, but the visible side of an organized content system." },
            { title: "Handover-ready operation", text: "The system stays understandable: who edits what, where content is updated and how the site remains maintainable." },
          ],
          visualTitle: "Public portal and admin view",
          visualText: "The screenshots show how Gárdony Platform connects public content with internal editorial updates.",
          modulesTitle: "Main modules",
          modules: ["news and notices", "document library", "events", "local content", "Directus-based editing", "responsive public interface"],
          resultTitle: "What does this foundation make possible?",
          resultText: "A portal foundation where content does not stay dependent on developers: editing, structure and public display belong to the same system.",
          takeaway: "This is the clearest example of what CodeNest means by a website: not only a public website, but something the organization can actually use.",
        },
      },
      "ildiko-fonad": {
        category: "Expert / service website",
        shortDescription: "Multilingual expert website that organizes services, introduction, gallery and contact into a clear path.",
        tags: ["expert website", "services", "gallery", "multilingual", "contact"],
        caseStudy: {
          eyebrow: "Expert website",
          headline: "A multilingual introduction site with a clear service structure.",
          summary: "The Ildiko Fonad website helps visitors understand services, professional background and the contact path quickly, without overloading the page with marketing copy.",
          overview: [
            { label: "Type", value: "expert / service website" },
            { label: "Focus", value: "services, introduction, gallery" },
            { label: "Status", value: "live site" },
          ],
          challengeTitle: "The challenge",
          challenge: ["The services needed to remain understandable across multiple languages.", "Introduction, visual material and contact path needed a clear rhythm without competing for attention."],
          solutionTitle: "The solution",
          solution: [
            { title: "Clear service structure", text: "The key information is split into readable sections so visitors can move forward easily." },
            { title: "Multilingual presence", text: "The content structure helps keep the professional message consistent across languages." },
          ],
          visualTitle: "Desktop and mobile views",
          visualText: "The screenshots show the public expert website on desktop and mobile.",
          modulesTitle: "Important content areas",
          modules: ["services", "introduction", "gallery", "multilingual content", "contact"],
          resultTitle: "Why is this a useful foundation?",
          resultText: "The website supports professional trust and orientation around the services without explaining or selling too much.",
          takeaway: "Even smaller expert websites work better when the content structure supports decision-making and contact.",
        },
      },
      googee: {
        category: "Editable business website",
        shortDescription: "Business website that makes the brand message, key information and contact path clearer.",
        tags: ["business website", "brand", "information structure"],
        caseStudy: {
          eyebrow: "Business website",
          headline: "A brand-led website with a clearer information path.",
          summary: "Googee needed a business website that supports the brand and leads visitors quickly to the most important information.",
          overview: [
            { label: "Type", value: "business website" },
            { label: "Focus", value: "brand and orientation" },
            { label: "Status", value: "live site" },
          ],
          challengeTitle: "The challenge",
          challenge: ["The business introduction needed to stay clear without feeling thin.", "The path through the page had to create orientation, not only a good first impression."],
          solutionTitle: "The solution",
          solution: [
            { title: "Organized content structure", text: "Core messages, introduction blocks and contact points appear in a clearer order." },
            { title: "Responsive presentation", text: "Desktop and mobile follow the same orientation logic, adapted to screen size." },
          ],
          visualTitle: "Business website views",
          visualText: "The screenshots show how the public business website presents the brand across screen sizes.",
          modulesTitle: "Main elements",
          modules: ["brand introduction", "information blocks", "contact path", "mobile view"],
          resultTitle: "What does this website provide?",
          resultText: "A clear online foundation that supports the first understanding between the brand and the visitor.",
          takeaway: "A business website works better when it organizes information, not only creates a strong first impression.",
        },
      },
      bossclub: {
        category: "Community / platform",
        shortDescription: "Community-focused website that turns offer, mood and brand world into a clear public presence.",
        tags: ["community", "platform", "public website"],
        caseStudy: {
          eyebrow: "Community platform",
          headline: "A community-focused website with a structured introduction.",
          summary: "BossClub presents a community offer, atmosphere and related content in a public interface that is easier to understand.",
          overview: [
            { label: "Type", value: "community / platform" },
            { label: "Focus", value: "community, offer, positioning" },
            { label: "Status", value: "live site" },
          ],
          challengeTitle: "The challenge",
          challenge: ["The community message had to be organized online without becoming an overloaded presentation.", "The community character needed to be understandable from the first views."],
          solutionTitle: "The solution",
          solution: [
            { title: "Platform-minded structure", text: "Content is arranged around the community offer instead of feeling like loose subpages." },
            { title: "Stronger first impression", text: "Visual and textual elements quickly show what kind of community the site introduces." },
          ],
          visualTitle: "Community presence screenshots",
          visualText: "Desktop and mobile views show the public, platform-like website.",
          modulesTitle: "Main elements",
          modules: ["community positioning", "offer message", "introduction blocks", "mobile view"],
          resultTitle: "What does this foundation provide?",
          resultText: "A characterful but organized website where visitors can quickly understand the community direction.",
          takeaway: "Community projects need character, but the website still has to make orientation easy.",
        },
      },
      rockvibe: {
        category: "Music / event",
        shortDescription: "Music and event website with a distinctive visual mood and clear content rhythm.",
        tags: ["music", "event", "campaign page"],
        caseStudy: {
          eyebrow: "Music / event site",
          headline: "A characterful event page where mood and content work together.",
          summary: "RockVibe needed atmosphere, but it still had to remain readable and easy to move through.",
          overview: [
            { label: "Type", value: "music / event" },
            { label: "Focus", value: "mood, content, mobile view" },
            { label: "Status", value: "live site" },
          ],
          challengeTitle: "The challenge",
          challenge: ["The visual character could not hide important content.", "Because of the event focus, visitors needed to understand the topic and next step quickly."],
          solutionTitle: "The solution",
          solution: [
            { title: "Atmospheric visual system", text: "The musical character appears in the interface while the structure stays readable." },
            { title: "Simple path through the page", text: "Content blocks build on each other so the website remains useful, not only decorative." },
          ],
          visualTitle: "Event site screenshots",
          visualText: "The screenshots show the public RockVibe desktop and mobile views.",
          modulesTitle: "Main elements",
          modules: ["music visual world", "event focus", "content blocks", "mobile view"],
          resultTitle: "What does this site provide?",
          resultText: "A characterful but understandable web interface where mood does not come at the expense of usability.",
          takeaway: "A strong visual world still needs clear information rhythm, otherwise the page becomes decoration.",
        },
      },
      greengoo: {
        category: "Brand / product",
        shortDescription: "Product- and brand-focused website that makes the offer and content easy to understand.",
        tags: ["brand", "product", "landing"],
        caseStudy: {
          eyebrow: "Brand / product",
          headline: "A product-focused landing page with a simple offer structure.",
          summary: "GreenGoo brings the offer, visual mood and related information into an understandable page rhythm.",
          overview: [
            { label: "Type", value: "brand / product" },
            { label: "Focus", value: "product communication" },
            { label: "Status", value: "live site" },
          ],
          challengeTitle: "The challenge",
          challenge: ["The product mood needed to become clear quickly without turning into an overloaded campaign page.", "The offer needed to be presented in a short, visual and mobile-friendly way."],
          solutionTitle: "The solution",
          solution: [
            { title: "Product-centered structure", text: "Visual details and content blocks support understanding of the offer." },
            { title: "Easy reading on mobile", text: "On mobile, the most important content appears in a simple, expected order." },
          ],
          visualTitle: "Brand site screenshots",
          visualText: "The screenshots show the desktop and mobile views of the product page.",
          modulesTitle: "Main elements",
          modules: ["product introduction", "brand mood", "offer blocks", "mobile view"],
          resultTitle: "What does this site provide?",
          resultText: "A simple visual brand foundation that keeps the offer understandable instead of making it more complicated.",
          takeaway: "A product page works when visitors quickly see what is being offered and the visual world supports the message without covering it.",
        },
      },
      "skillbridge-home": {
        category: "Education / application",
        shortDescription: "Educational website with application-focused content and clear information structure.",
        tags: ["education", "application", "information site"],
        caseStudy: {
          eyebrow: "Education / application",
          headline: "An educational website whose structure supports the application path.",
          summary: "SkillBridge Home helps interested visitors understand the offer, process and next step toward applying.",
          overview: [
            { label: "Type", value: "education / application site" },
            { label: "Focus", value: "information and application" },
            { label: "Status", value: "live site" },
          ],
          challengeTitle: "The challenge",
          challenge: ["Educational pages can quickly become too text-heavy.", "The path to application had to stay visible without losing the broader context."],
          solutionTitle: "The solution",
          solution: [
            { title: "Clear information hierarchy", text: "The content leads from the core offer to details and then toward the application path." },
            { title: "Application-aware structure", text: "CTAs and content blocks are part of the decision path, not isolated elements." },
          ],
          visualTitle: "Education site views",
          visualText: "Desktop and mobile screenshots show the information- and application-focused structure.",
          modulesTitle: "Main elements",
          modules: ["education information", "application path", "content hierarchy", "mobile view"],
          resultTitle: "What does this site provide?",
          resultText: "An information site where visitors can not only read, but more easily continue toward application or contact.",
          takeaway: "For educational websites, structure is as important as design: orientation and decision-making need to work together.",
        },
      },
    },
    teamIntro: { title: "Two people work with you directly.", text: "CodeNest is run by Bors and Dávid. As a young Hungarian business, we do not try to look bigger than we are. We communicate clearly, build the website carefully and hand it over so it can be used later.", trustNotes: ["Direct communication", "Faster decisions", "Fewer misunderstandings", "More personal collaboration"] },
    team: { Bors: { role: "Structure, development, editable content", shortText: "Works on the website structure, development parts and editable content logic." }, "Dávid": { role: "Frontend, implementation, communication", shortText: "Works on the visible interface, HTML/CSS/JS implementation and practical project communication." } },
  },
  de: {
    siteContent: {
      seo: {
        title: "CodeNest – Websites, die nutzbar und pflegbar bleiben",
        description: "Wir erstellen verständliche, pflegbare Websites für kleinere Gemeinden, Institutionen, Unterkünfte und lokale Unternehmen.",
        ogTitle: "CodeNest – Websites, die nutzbar und pflegbar bleiben",
        ogDescription: "Ein kleines ungarisches Studio für klare, pflegbare Websites und digitale Grundlagen.",
        canonicalUrl: "https://codenest.hu/de/",
      },
      navigation: { items: [
        { label: "Was wir bauen", href: "#mit-epitunk" }, { label: "Arbeiten", href: "#munkak" }, { label: "Prozess", href: "#folyamat" }, { label: "Über uns", href: "#bors-david" }, { label: "Kontakt", href: "#kapcsolat" },
      ] },
      hero: { headline: "Klare Websites, die später leicht aktualisiert werden können.", subheadline: "Als junges ungarisches Unternehmen helfen wir kleineren Gemeinden, Institutionen und Betrieben mit Websites, auf denen Besucher schnell finden, was sie brauchen.", primaryCta: "Kurz darüber sprechen", secondaryCta: "Ansehen, wie wir helfen" },
      problem: { title: "Eine Website ist nützlich, wenn man sich leicht zurechtfindet.", text: "Viele Organisationen brauchen keine weitere statische Website, sondern etwas, das das Team wirklich nutzen kann: Nachrichten veröffentlichen, Dokumente hochladen, Formulare empfangen, Abläufe verfolgen und den Betrieb im Blick behalten.", painPoints: [{ title: "Schwer zu aktualisieren", text: "Inhalte veralten, weil jede kleine Änderung Abstimmung oder Entwicklerhilfe braucht." }, { title: "Verstreute Inhalte", text: "Dokumente, Nachrichten und Informationen liegen an zu vielen Orten." }, { title: "E-Mail-Chaos", text: "Anfragen, Bewerbungen und Meldungen können im Posteingang leicht untergehen." }, { title: "Keine klare Übergabe", text: "Die Website ist fertig, aber Pflege, Updates und Betrieb sind nicht immer klar." }], beforeAfter: { before: ["Verstreute Inhalte", "Schwere Aktualisierung", "Unklarer Kontaktweg"], after: ["Leichte Aktualisierung", "Geordnete Inhalte", "Gut am Handy"] }, solution: "Wir bauen Websites, die nicht nur gut aussehen, sondern nach der Übergabe nutzbar, editierbar und langfristig betreibbar bleiben." },
      process: { title: "Ein einfacher Prozess mit klaren Schritten.", intro: "Wir machen es nicht komplizierter als nötig. Zuerst klären wir, was die Website leisten soll, wer sie nutzt und welche Inhalte wichtig sind.", steps: [{ title: "Verstehen", text: "Wir lernen Ziel, Nutzer, aktuelle Probleme und die Aufgabe der Website kennen." }, { title: "Ordnen", text: "Wir ordnen Seiten, Texte, Bilder, Dokumente, Formulare und Kontaktpunkte." }, { title: "Bauen", text: "Wir erstellen die Website und, wenn sinnvoll, eine leicht pflegbare Inhaltsstruktur." }, { title: "Übergeben", text: "Wir erklären die Nutzung, Übergeben Zugänge und helfen beim Start." }, { title: "Später helfen", text: "Wenn später Fragen, kleine Änderungen oder technische Einstellungen auftauchen, können wir weiterhelfen." }] },
      whyCodeNest: { title: "Warum CodeNest?", intro: "Wir sprechen nicht wie eine grosse Firma. Zwei Menschen arbeiten direkt mit dir und bauen Websites, die Kunden verstehen und nutzen können.", items: [{ title: "Direkte Kommunikation", text: "Du sprichst mit den Menschen, die die Website wirklich bauen." }, { title: "Leichte Aktualisierung", text: "Das Ziel ist einfach: wichtige Inhalte sollen später auch ohne Entwicklerhilfe aktualisiert werden können." }, { title: "Klare Übergabe", text: "Wir achten auf Domain, Zugänge, Aktualisierungen, Start und externe Konten, damit es später nicht unklar bleibt." }] },
      scope: { title: "Zuerst klären wir die Aufgabe, nicht ein Paket.", text: "Wir starten nicht mit öffentlichen Fixpaketen. Zuerst verstehen wir, wie das Website genutzt werden soll, und klären daraus Umfang, technische Grundlage und Betrieb.", summaryPoints: ["Das Angebot basiert auf Website, Adminoberfläche, Inhaltsstruktur und Abläufen, die wirklich gebraucht werden.", "Nicht alles muss sofort gebaut werden: wir trennen Startumfang und spätere Erweiterungen.", "Nach der Abstimmung bekommst du einen verständlichen Vorschlag."], includesTitle: "Was klären wir?", includes: ["Funktionen und Seitentypen", "Adminoberfläche und Rechte", "Inhaltstypen und Editierlogik", "Formulare und Kontaktpunkte", "Start-Einstellungen und Übergabe", "Optionen für spätere Erweiterung"], ctaLabel: "Über das Projekt sprechen" },
      contact: { title: "Lass uns kurz darüber sprechen.", text: "Du brauchst kein fertiges Briefing. Schreib kurz, woran ihr arbeitet oder was heute schwer zu pflegen ist; wir helfen beim naechsten sinnvollen Schritt.", emailLabel: "E-Mail", formLabels: { name: "Name", email: "E-Mail", projectType: "Projekttyp", message: "Nachricht", submit: "Kurze Nachricht senden" }, projectTypes: ["Gemeinde- oder institutionelle Website", "Website für lokale Unternehmen oder Fachleute", "Unterkunfts- oder Tourismus-Website", "Bestehende Website neu denken", "Ich weiss es noch nicht"] },
      footer: { tagline: "Klare, leicht aktualisierbare Websites.", links: [{ label: "Was wir bauen", href: "#mit-epitunk" }, { label: "Arbeiten", href: "#munkak" }, { label: "Prozess", href: "#folyamat" }, { label: "Über uns", href: "#bors-david" }, { label: "Kontakt", href: "#kapcsolat" }], legalLinks: [{ label: "Kontaktschutz", href: "legal-hu.html" }, { label: "Impressum", href: "legal-hu.html" }], copyright: "© 2026 CodeNest. Alle Rechte vorbehalten." },
    },
    services: {
      "onkormanyzati-es-intezmenyi-portalok": { title: "Gemeinden und Institutionen", shortDescription: "Klare, leicht aktualisierbare Websites für Nachrichten, Dokumente, Termine und Kontaktinformationen.", supportingText: "Wir helfen kleineren Gemeinden und Institutionen, wichtige Informationen verständlich und schnell auffindbar zu machen.", features: ["Nachrichten und Mitteilungen", "Dokumente und Downloads", "Später aktualisierbare Inhalte", "Kontakt- und Anfragepunkte"], chips: ["Gemeinde", "Dokumente", "Kontakt", "Mobil"], ctaLabel: "Kurz darüber sprechen" },
      "adminos-uzleti-weboldalak": { title: "Lokale Unternehmen und Fachleute", shortDescription: "Websites, die Angebot, Bilder, Referenzen und Kontaktwege klar zeigen.", supportingText: "Für kleine Unternehmen und Dienstleister bauen wir Websites, die verständlich wirken und später leichter pflegbar bleiben.", features: ["Leistungen und Unterseiten", "Bilder und Referenzen", "Kontakt- und Anfrageformulare", "Start-Einstellungen und spätere Hilfe"], chips: ["Business", "Leistungen", "Anfragen", "Kontakt"], ctaLabel: "Kurz darüber sprechen" },
      "egyedi-webes-eszkozok": { title: "Unterkünfte und Tourismus-Websites", shortDescription: "Klare Websites für Unterkünfte, Orte und touristische Angebote.", supportingText: "Wir zeigen Bilder, Informationen, Leistungen und Kontaktwege so, dass Besucher auch am Handy schnell weiterkommen.", features: ["Bilder und Galerie", "Anfrage- und Kontaktwege", "Informationen für Gäste", "Später pflegbare Inhalte"], chips: ["Tourismus", "Galerie", "Kontakt", "Mobil"], ctaLabel: "Kurz darüber sprechen" },
    },
    projects: {

      "gardony-platform": {
        category: "Gemeinde / Institution",
        shortDescription: "Gemeinde-Website mit Nachrichten, Dokumenten, Terminen und später aktualisierbaren Inhalten.",
        tags: ["Gemeinde", "Portal", "Admin", "Dokumente"],
        caseStudy: {
          eyebrow: "Ausgewählte Arbeit",
          headline: "Ein kommunales Portal, bei dem öffentliche Website und redaktioneller Admin zusammenarbeiten.",
          summary: "Gárdony Platform ist ein editierbares institutionelles Portal für Nachrichten, Dokumente, Veranstaltungen und lokale Inhalte. Entscheidend ist das System hinter der öffentlichen Seite: Inhalte bleiben geordnet, editierbar und nach der Übergabe leichter zu pflegen.",
          overview: [
            { label: "Typ", value: "kommunales / institutionelles Portal" },
            { label: "Fokus", value: "öffentliches Portal + redaktioneller Admin" },
            { label: "Status", value: "ausgewählt, in Arbeit" },
          ],
          challengeTitle: "Die Herausforderung",
          challenge: [
            "Eine kommunale oder institutionelle Website muss viele Inhaltstypen ordnen: Nachrichten, Dokumente, Veranstaltungen und praktische lokale Informationen.",
            "Die Adminoberfläche muss auch für Menschen verständlich bleiben, die keine Entwickler sind.",
            "Mobilansicht und öffentliche Informationsstruktur müssen mit dem redaktionellen Backend zusammenpassen.",
          ],
          solutionTitle: "Die Lösung",
          solution: [
            { title: "Editierbare Inhalte", text: "Nachrichten, Dokumente und lokale Informationen werden so strukturiert, dass sie im Admin gepflegt und später erweitert werden können." },
            { title: "Portallogik", text: "Die öffentliche Website ist keine getrennte Fassade, sondern der sichtbare Teil eines geordneten Inhaltssystems." },
            { title: "Übergabefähiger Betrieb", text: "Das System bleibt nachvollziehbar: wer was pflegt, wo Inhalte aktualisiert werden und wie die Website im Betrieb bleibt." },
          ],
          visualTitle: "Öffentliches Portal und Adminansicht",
          visualText: "Die Screenshots zeigen, wie Gárdony Platform öffentliche Inhalte mit internen Bearbeitungsabläufen verbindet.",
          modulesTitle: "Hauptmodule",
          modules: ["Nachrichten und Mitteilungen", "Dokumentenbibliothek", "Veranstaltungen", "lokale Inhalte", "Directus-basierte Bearbeitung", "responsive öffentliche Oberfläche"],
          resultTitle: "Was bringt diese Grundlage?",
          resultText: "Eine Portalgrundlage, bei der Inhalte nicht beim Entwickler hängen bleiben: Bearbeitung, Struktur und öffentliche Darstellung gehören zum selben System.",
          takeaway: "Das zeigt am klarsten, was CodeNest mit einem Website meint: nicht nur eine öffentliche Website, sondern etwas, das die Organisation wirklich nutzen kann.",
        },
      },
      "ildiko-fonad": {
        category: "Fachliche / serviceorientierte Website",
        shortDescription: "Mehrsprachige Expertinnen-Website, die Leistungen, Vorstellung, Galerie und Kontakt in einen klaren Weg bringt.",
        tags: ["Expertinnen-Seite", "Leistungen", "Galerie", "Mehrsprachigkeit", "Kontakt"],
        caseStudy: {
          eyebrow: "Expertinnen-Website",
          headline: "Eine mehrsprachige Vorstellungsseite mit klarer Leistungsstruktur.",
          summary: "Die Ildiko Fonad Website hilft Besucherinnen und Besuchern, Leistungen, fachlichen Hintergrund und Kontaktweg schnell zu verstehen, ohne die Seite mit Marketingtext zu überladen.",
          overview: [
            { label: "Typ", value: "fachliche / serviceorientierte Website" },
            { label: "Fokus", value: "Leistungen, Vorstellung, Galerie" },
            { label: "Status", value: "Live-Seite" },
          ],
          challengeTitle: "Die Herausforderung",
          challenge: ["Die Leistungen mussten in mehreren Sprachen verständlich bleiben.", "Vorstellung, visuelles Material und Kontaktweg brauchten einen klaren Rhythmus, ohne miteinander um Aufmerksamkeit zu konkurrieren."],
          solutionTitle: "Die Lösung",
          solution: [
            { title: "Klare Leistungsstruktur", text: "Die wichtigsten Informationen sind in gut lesbare Bereiche gegliedert, damit Besucher leicht weitergehen können." },
            { title: "Mehrsprachige Präsenz", text: "Die Inhaltsstruktur hilft, die fachliche Botschaft über mehrere Sprachen hinweg konsistent zu halten." },
          ],
          visualTitle: "Desktop- und Mobilansicht",
          visualText: "Die Screenshots zeigen die öffentliche Expertinnen-Website auf Desktop und Mobilgerät.",
          modulesTitle: "Wichtige Inhaltsbereiche",
          modules: ["Leistungen", "Vorstellung", "Galerie", "mehrsprachige Inhalte", "Kontakt"],
          resultTitle: "Warum ist das eine gute Grundlage?",
          resultText: "Die Website unterstützt fachliches Vertrauen und Orientierung zu den Leistungen, ohne zu viel zu erklären oder zu verkaufen.",
          takeaway: "Auch kleinere Expertenseiten funktionieren besser, wenn die Inhaltsstruktur Entscheidung und Kontaktaufnahme unterstützt.",
        },
      },
      googee: {
        category: "Editierbare Business-Website",
        shortDescription: "Business-Website, die Markenbotschaft, Kerninformationen und Kontaktweg verständlicher macht.",
        tags: ["Business-Website", "Marke", "Informationsstruktur"],
        caseStudy: {
          eyebrow: "Business-Website",
          headline: "Eine markenorientierte Website mit klarerem Informationsweg.",
          summary: "Googee brauchte eine Business-Website, die die Marke unterstützt und Besucher schnell zu den wichtigsten Informationen führt.",
          overview: [
            { label: "Typ", value: "Business-Website" },
            { label: "Fokus", value: "Marke und Orientierung" },
            { label: "Status", value: "Live-Seite" },
          ],
          challengeTitle: "Die Herausforderung",
          challenge: ["Die geschäftliche Vorstellung musste klar bleiben, ohne zu dünn zu wirken.", "Der Weg durch die Seite sollte Orientierung geben, nicht nur gut aussehen."],
          solutionTitle: "Die Lösung",
          solution: [
            { title: "Geordnete Inhaltsstruktur", text: "Kernbotschaften, Vorstellungsblöcke und Kontaktpunkte erscheinen in einer klareren Reihenfolge." },
            { title: "Responsive Darstellung", text: "Desktop und Mobilansicht folgen derselben Orientierungslogik, angepasst an die Bildschirmgröße." },
          ],
          visualTitle: "Ansichten der Business-Website",
          visualText: "Die Screenshots zeigen, wie die öffentliche Business-Website die Marke auf verschiedenen Bildschirmgrößen präsentiert.",
          modulesTitle: "Hauptelemente",
          modules: ["Markenvorstellung", "Informationsblöcke", "Kontaktweg", "Mobilansicht"],
          resultTitle: "Was bringt diese Website?",
          resultText: "Eine klare Online-Grundlage, die das erste Verständnis zwischen Marke und Besucher unterstützt.",
          takeaway: "Eine Business-Website funktioniert besser, wenn sie Informationen ordnet und nicht nur einen guten ersten Eindruck erzeugt.",
        },
      },
      bossclub: {
        category: "Community / Plattform",
        shortDescription: "Community-fokussierte Website, die Angebot, Stimmung und Markenwelt in eine klare öffentliche Präsenz bringt.",
        tags: ["Community", "Plattform", "öffentliche Website"],
        caseStudy: {
          eyebrow: "Community-Plattform",
          headline: "Eine community-fokussierte Website mit strukturierter Vorstellung.",
          summary: "BossClub präsentiert ein Community-Angebot, Atmosphäre und zugehörige Inhalte in einer öffentlichen Oberfläche, die leichter zu erfassen ist.",
          overview: [
            { label: "Typ", value: "Community / Plattform" },
            { label: "Fokus", value: "Community, Angebot, Positionierung" },
            { label: "Status", value: "Live-Seite" },
          ],
          challengeTitle: "Die Herausforderung",
          challenge: ["Die Community-Botschaft musste online geordnet werden, ohne zu einer überfüllten Vorstellung zu werden.", "Der Community-Charakter sollte schon in den ersten Ansichten verständlich sein."],
          solutionTitle: "Die Lösung",
          solution: [
            { title: "Plattformorientierte Struktur", text: "Die Inhalte sind um das Community-Angebot herum organisiert und wirken nicht wie lose Unterseiten." },
            { title: "Stärkerer erster Eindruck", text: "Visuelle und textliche Elemente zeigen schnell, welche Art von Community die Seite vorstellt." },
          ],
          visualTitle: "Screenshots der Community-Präsenz",
          visualText: "Desktop und Mobilansicht zeigen die öffentliche, plattformartige Website.",
          modulesTitle: "Hauptelemente",
          modules: ["Community-Positionierung", "Angebotsbotschaft", "Vorstellungsblöcke", "Mobilansicht"],
          resultTitle: "Was bringt diese Grundlage?",
          resultText: "Eine charaktervolle, aber geordnete Website, auf der Besucher die Community-Richtung schnell verstehen.",
          takeaway: "Community-Projekte brauchen Charakter, aber die Website muss Orientierung trotzdem leicht machen.",
        },
      },
      rockvibe: {
        category: "Musik / Event",
        shortDescription: "Musik- und Eventwebsite mit eigenständiger visueller Stimmung und klarem Inhaltsrhythmus.",
        tags: ["Musik", "Event", "Kampagnenseite"],
        caseStudy: {
          eyebrow: "Musik- / Eventseite",
          headline: "Eine charaktervolle Eventseite, auf der Stimmung und Inhalt zusammenarbeiten.",
          summary: "RockVibe brauchte Atmosphäre, musste aber trotzdem lesbar und einfach begehbar bleiben.",
          overview: [
            { label: "Typ", value: "Musik / Event" },
            { label: "Fokus", value: "Stimmung, Inhalt, Mobilansicht" },
            { label: "Status", value: "Live-Seite" },
          ],
          challengeTitle: "Die Herausforderung",
          challenge: ["Der visuelle Charakter durfte wichtige Inhalte nicht verdecken.", "Durch den Event-Charakter mussten Besucher Thema und nächsten Schritt schnell verstehen."],
          solutionTitle: "Die Lösung",
          solution: [
            { title: "Atmosphärisches visuelles System", text: "Der musikalische Charakter erscheint in der Oberfläche, während die Struktur lesbar bleibt." },
            { title: "Einfacher Weg durch die Seite", text: "Inhaltsblöcke bauen aufeinander auf, damit die Website nützlich bleibt und nicht nur dekorativ wirkt." },
          ],
          visualTitle: "Screenshots der Eventseite",
          visualText: "Die Screenshots zeigen die öffentliche RockVibe Desktop- und Mobilansicht.",
          modulesTitle: "Hauptelemente",
          modules: ["musikalische Bildwelt", "Event-Fokus", "Inhaltsblöcke", "Mobilansicht"],
          resultTitle: "Was bringt diese Seite?",
          resultText: "Eine charaktervolle, aber verständliche Weboberfläche, bei der Stimmung nicht auf Kosten der Nutzbarkeit geht.",
          takeaway: "Eine starke visuelle Welt braucht trotzdem einen klaren Informationsrhythmus, sonst wird die Seite zur Dekoration.",
        },
      },
      greengoo: {
        category: "Marke / Produkt",
        shortDescription: "Produkt- und markenorientierte Website, die Angebot und Inhalte schnell verständlich macht.",
        tags: ["Marke", "Produkt", "Landing"],
        caseStudy: {
          eyebrow: "Marke / Produkt",
          headline: "Eine produktfokussierte Landingpage mit einfacher Angebotsstruktur.",
          summary: "GreenGoo bringt Angebot, visuelle Stimmung und zugehörige Informationen in einen verständlichen Seitenrhythmus.",
          overview: [
            { label: "Typ", value: "Marke / Produkt" },
            { label: "Fokus", value: "Produktkommunikation" },
            { label: "Status", value: "Live-Seite" },
          ],
          challengeTitle: "Die Herausforderung",
          challenge: ["Die Produktstimmung musste schnell klar werden, ohne zur überfüllten Kampagnenseite zu werden.", "Das Angebot sollte kurz, visuell und mobilfreundlich präsentiert werden."],
          solutionTitle: "Die Lösung",
          solution: [
            { title: "Produktzentrierte Struktur", text: "Visuelle Details und Inhaltsblöcke unterstützen das Verständnis des Angebots." },
            { title: "Leichtes Lesen auf Mobilgeräten", text: "In der Mobilansicht erscheinen die wichtigsten Inhalte in einer einfachen, erwartbaren Reihenfolge." },
          ],
          visualTitle: "Screenshots der Markenseite",
          visualText: "Die Screenshots zeigen die Desktop- und Mobilansicht der Produktseite.",
          modulesTitle: "Hauptelemente",
          modules: ["Produktvorstellung", "Markenstimmung", "Angebotsblöcke", "Mobilansicht"],
          resultTitle: "Was bringt diese Seite?",
          resultText: "Eine einfache visuelle Markengrundlage, die das Angebot verständlich hält, statt es zu verkomplizieren.",
          takeaway: "Eine Produktseite funktioniert, wenn Besucher schnell sehen, was angeboten wird, und die visuelle Welt die Botschaft nicht überdeckt.",
        },
      },
      "skillbridge-home": {
        category: "Bildung / Anmeldung",
        shortDescription: "Bildungswebsite mit anmeldeorientierten Inhalten und klarer Informationsstruktur.",
        tags: ["Bildung", "Anmeldung", "Informationsseite"],
        caseStudy: {
          eyebrow: "Bildung / Anmeldung",
          headline: "Eine Bildungswebsite, deren Struktur den Anmeldeweg unterstützt.",
          summary: "SkillBridge Home hilft Interessierten, Angebot, Ablauf und nächsten Schritt zur Anmeldung zu verstehen.",
          overview: [
            { label: "Typ", value: "Bildungs- / Anmeldeseite" },
            { label: "Fokus", value: "Information und Anmeldung" },
            { label: "Status", value: "Live-Seite" },
          ],
          challengeTitle: "Die Herausforderung",
          challenge: ["Bildungsseiten können schnell zu textlastig werden.", "Der Weg zur Anmeldung musste sichtbar sein, ohne den größeren Kontext zu verlieren."],
          solutionTitle: "Die Lösung",
          solution: [
            { title: "Klare Informationshierarchie", text: "Die Inhalte führen vom Kernangebot zu Details und danach zum Anmeldeweg." },
            { title: "Anmeldungsnahe Struktur", text: "CTAs und Inhaltsblöcke sind Teil des Entscheidungswegs, nicht isolierte Elemente." },
          ],
          visualTitle: "Ansichten der Bildungsseite",
          visualText: "Desktop- und Mobil-Screenshots zeigen die informations- und anmeldefokussierte Struktur.",
          modulesTitle: "Hauptelemente",
          modules: ["Bildungsinformationen", "Anmeldeweg", "Inhaltshierarchie", "Mobilansicht"],
          resultTitle: "Was bringt diese Seite?",
          resultText: "Eine Informationsseite, auf der Besucher nicht nur lesen, sondern leichter Richtung Anmeldung oder Kontakt weitergehen können.",
          takeaway: "Bei Bildungswebsites ist Struktur genauso wichtig wie Design: Orientierung und Entscheidung müssen zusammen funktionieren.",
        },
      },
    },
    teamIntro: { title: "Zwei Menschen bleiben am Projekt dran.", text: "Hinter CodeNest stehen Bors und Dávid. Als kleines fokussiertes Studio übernehmen wir weniger Projekte gleichzeitig, bleiben dafür aber vom ersten Gespräch bis zum Launch direkt beteiligt.", trustNotes: ["Direkte Abstimmung", "Schnellere Entscheidungen", "Weniger Missverständnisse", "Persönlichere Zusammenarbeit"] },
    team: { Bors: { role: "Systemlogik, Backend, Adminoberflächen", shortText: "Hält Systemlogik, Kontaktstrukturen, Adminoberflächen und technische Grundlagen zusammen." }, "Dávid": { role: "Frontend, Umsetzung, Kommunikation", shortText: "Hält Nutzererlebnis, visuelle Umsetzung und gemeinsamen Projektrhythmus zusammen." } },
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

export const getPathLanguage = (pathname = "") => {
  const firstSegment = String(pathname || "").split("/").filter(Boolean)[0];
  return normalizeLanguage(firstSegment);
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
  const fromPath = typeof window !== "undefined" ? getPathLanguage(window.location.pathname) : "";
  const resolvedLanguage = fromUrl || fromPath || getStoredLanguage() || getBrowserLanguage() || "hu";
  try { window.localStorage.setItem(storageKey, resolvedLanguage); } catch (_error) {}
  return resolvedLanguage;
};

export const storeLanguage = (language) => {
  try { window.localStorage.setItem(storageKey, normalizeLanguage(language) || "hu"); } catch (_error) {}
};

export const updateUrlLanguage = (language) => {
  if (typeof window === "undefined" || !window.history?.replaceState) return;
  const lang = normalizeLanguage(language) || "hu";
  const url = new URL(window.location.href);

  if (previewPagePattern.test(url.pathname)) {
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    return;
  }

  window.history.replaceState({}, "", `${languageRoutes[lang] || "/"}${url.hash}`);
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
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || (href.startsWith("http://") || href.startsWith("https://"))) return href;
  try {
    const lang = normalizeLanguage(language) || "hu";
    const url = new URL(href, window.location.href);
    url.searchParams.set("lang", lang);
    const fileName = url.pathname.split("/").filter(Boolean).pop() || "";

    if (previewPagePattern.test(url.pathname)) {
      return `/${fileName}${url.search}${url.hash}`;
    }

    return `${fileName}${url.search}${url.hash}`;
  } catch (_error) {
    return href;
  }
};
