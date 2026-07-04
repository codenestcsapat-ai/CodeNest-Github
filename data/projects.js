export const projects = [
  {
    title: "Gárdony Platform",
    slug: "gardony-platform",
    url: "https://gardony-platform.vercel.app/",
    liveUrl: "https://gardony-platform.vercel.app/",
    caseStudyHref: "case-study.html?project=gardony-platform",
    category: "Önkormányzat / intézmény",
    status: "highlighted / in progress",
    shortDescription:
      "Önkormányzati portál hírekkel, dokumentumtárral, eseményekkel és szerkeszthető adminlogikával.",
    tags: ["önkormányzat", "portál", "admin", "dokumentumtár"],
    desktopImage: "CodeNest media web/gardony-hero-desktop.png",
    mobileImage: "CodeNest media web/gardony-mobile-home.png",
    highlighted: true,
    caseStudy: {
      eyebrow: "Kiemelt munka",
      headline: "Önkormányzati portál, ahol a publikus oldal és az adminlogika együtt dolgozik.",
      summary:
        "A Gárdony Platform egy szerkeszthető intézményi portál hírekhez, dokumentumokhoz, eseményekhez és helyi tartalmakhoz. A fókusz nem csak a megjelenésen van, hanem azon is, hogy a rendszer átadás után kezelhető maradjon.",
      overview: [
        { label: "Típus", value: "Önkormányzati / intézményi portál" },
        { label: "Fókusz", value: "publikus portál + adminlogika" },
        { label: "Állapot", value: "kiemelt, folyamatban" },
      ],
      challengeTitle: "A kihívás",
      challenge: [
        "Egy települési vagy intézményi oldalnál sokféle tartalmat kell rendben tartani: híreket, dokumentumokat, eseményeket és praktikus információkat.",
        "A tartalomkezelésnek olyan emberek számára is átláthatónak kell maradnia, akik nem fejlesztők.",
        "A mobilnézetnek és a publikus információszerkezetnek ugyanúgy működnie kell, mint az adminfelületnek.",
      ],
      solutionTitle: "A megoldás",
      solution: [
        {
          title: "Szerkeszthető tartalmak",
          text: "A hírek, dokumentumok és helyi információk olyan szerkezetet kapnak, amely adminból kezelhető és később bővíthető.",
        },
        {
          title: "Portál logika",
          text: "A publikus oldal nem külön díszlet, hanem a tartalmi rendszer kimenete: a látogató azt látja, amit az adminban rendben lehet tartani.",
        },
        {
          title: "Átadható működés",
          text: "A rendszer célja, hogy indulás után is érthető legyen, ki mit kezel, hol frissül a tartalom és hogyan marad üzemben az oldal.",
        },
      ],
      visualTitle: "Publikus portál és adminnézet",
      visualText:
        "A képernyőképek azt mutatják, hogy a Gárdony Platform egyszerre kezel publikus tartalmakat és belső szerkesztési folyamatokat.",
      modulesTitle: "Fő modulok",
      modules: [
        "hírek és közlemények",
        "dokumentumtár",
        "események",
        "látnivalók és helyi tartalmak",
        "Directus-alapú szerkesztés",
        "reszponzív publikus felület",
      ],
      resultTitle: "Mit ad ez az alap?",
      resultText:
        "Egy olyan portálalapot, amelyben a tartalom nem ragad a fejlesztőnél: a szerkesztés, a struktúra és a publikus megjelenés egy rendszerben gondolkodik.",
      takeaway:
        "Ez az irány mutatja legjobban, mit értünk CodeNest alatt: webes rendszert építünk, nem csak egy kirakatoldalt.",
    },
  },
  {
    title: "Ildiko Fonad",
    slug: "ildiko-fonad",
    url: "https://www.ildiko-fonad.com/",
    liveUrl: "https://www.ildiko-fonad.com/",
    caseStudyHref: "case-study.html?project=ildiko-fonad",
    category: "Szakértői / szolgáltatói weboldal",
    status: "published",
    shortDescription:
      "Többnyelvű szakértői weboldal szolgáltatások, bemutatkozás, galéria és kapcsolat fókuszú felépítéssel.",
    tags: ["szakértői oldal", "szolgáltatások", "galéria", "többnyelvűség", "kapcsolat"],
    desktopImage: "CodeNest media web/ildiko-fonad-desktop.png",
    mobileImage: "CodeNest media web/ildiko-fonad-mobile.png",
    highlighted: false,
    caseStudy: {
      eyebrow: "Szakértői weboldal",
      headline: "Többnyelvű bemutatkozó oldal szolgáltatói fókuszú tartalommal.",
      summary:
        "Az Ildiko Fonad oldal célja, hogy a látogató gyorsan megértse a szolgáltatásokat, a szakmai hátteret és a kapcsolatfelvétel következő lépését.",
      overview: [
        { label: "Típus", value: "szakértői / szolgáltatói weboldal" },
        { label: "Fókusz", value: "szolgáltatások, bemutatkozás, galéria" },
        { label: "Állapot", value: "éles oldal" },
      ],
      challengeTitle: "A kihívás",
      challenge: [
        "A szolgáltatásoknak több nyelven is érthetően kellett megjelenniük.",
        "A bemutatkozás, a vizuális anyagok és a kapcsolatfelvétel nem versenyezhetnek egymással a figyelemért.",
      ],
      solutionTitle: "A megoldás",
      solution: [
        {
          title: "Tiszta szolgáltatásstruktúra",
          text: "Az oldal a legfontosabb információkat áttekinthető egységekben rendezi, hogy a látogató könnyen tovább tudjon lépni.",
        },
        {
          title: "Többnyelvű jelenlét",
          text: "A tartalmi felépítés támogatja, hogy a szakértői üzenet több nyelven is következetes maradjon.",
        },
      ],
      visualTitle: "Desktop és mobil nézet",
      visualText: "A képernyőképek a szakértői oldal publikus megjelenését mutatják.",
      modulesTitle: "Fő tartalmi egységek",
      modules: ["szolgáltatások", "bemutatkozás", "galéria", "többnyelvű tartalom", "kapcsolat"],
      resultTitle: "Miért jó alap?",
      resultText:
        "A weboldal a szakértői bizalmat és a szolgáltatói tájékozódást támogatja, felesleges ügynökségi zaj nélkül.",
      takeaway:
        "Kisebb szakértői oldalaknál is fontos, hogy a tartalom szerkezete tényleg segítse a döntést és a kapcsolatfelvételt.",
    },
  },
  {
    title: "Googee",
    slug: "googee",
    url: "https://googee.hu/",
    liveUrl: "https://googee.hu/",
    caseStudyHref: "case-study.html?project=googee",
    category: "Üzleti weboldal",
    status: "live",
    shortDescription:
      "Üzleti webes jelenlét, amely a márka bemutatását és a látogatói tájékozódást támogatja.",
    tags: ["üzleti weboldal", "márka", "bemutatkozás"],
    desktopImage: "CodeNest media web/googee-desktop.png",
    mobileImage: "CodeNest media web/googee-mobile.png",
    highlighted: false,
    caseStudy: {
      eyebrow: "Üzleti weboldal",
      headline: "Márkabemutató üzleti weboldal tiszta tartalmi útvonallal.",
      summary:
        "A Googee esetében a cél egy rendezett, márkát támogató online jelenlét volt, ahol a látogató gyorsan megtalálja a legfontosabb információkat.",
      overview: [
        { label: "Típus", value: "üzleti weboldal" },
        { label: "Fókusz", value: "márka és tájékozódás" },
        { label: "Állapot", value: "éles oldal" },
      ],
      challengeTitle: "A kihívás",
      challenge: [
        "Az üzleti bemutatkozásnak egyszerre kellett letisztultnak és informatívnak maradnia.",
        "A látogatói útvonalat úgy kellett rendezni, hogy ne csak szép oldal, hanem használható információs felület legyen.",
      ],
      solutionTitle: "A megoldás",
      solution: [
        {
          title: "Rendezett tartalmi szerkezet",
          text: "A kulcsüzenetek, bemutatkozó blokkok és kapcsolatfelvételi pontok egymásra épülő sorrendben jelennek meg.",
        },
        {
          title: "Reszponzív megjelenés",
          text: "A desktop és mobil nézet ugyanazt a tájékozódási logikát követi, csak a képernyőmérethez igazítva.",
        },
      ],
      visualTitle: "Márkaoldal több nézetben",
      visualText: "A screenshotok a publikus üzleti weboldal megjelenését mutatják.",
      modulesTitle: "Fő elemek",
      modules: ["márkabemutatás", "információs blokkok", "kapcsolati irány", "mobilnézet"],
      resultTitle: "Mit ad ez az oldal?",
      resultText:
        "Egy átlátható online alapot, amely nem próbál túl sokat mondani egyszerre, hanem a márka és a látogató közötti első tájékozódást segíti.",
      takeaway:
        "Egy üzleti weboldal akkor működik jól, ha nem csak látványt ad, hanem rendet is tesz az információk között.",
    },
  },
  {
    title: "BossClub",
    slug: "bossclub",
    url: "https://bossclub.hu/",
    liveUrl: "https://bossclub.hu/",
    caseStudyHref: "case-study.html?project=bossclub",
    category: "Közösség / platform",
    status: "live",
    shortDescription:
      "Közösségi fókuszú platform, amely egy célzott online jelenlét és tagsági élmény alapját adja.",
    tags: ["közösség", "platform", "webes jelenlét"],
    desktopImage: "CodeNest media web/bossclub-desktop.png",
    mobileImage: "CodeNest media web/bossclub-mobile.png",
    highlighted: false,
    caseStudy: {
      eyebrow: "Közösségi platform",
      headline: "Közösségi fókuszú webes jelenlét strukturált bemutatkozással.",
      summary:
        "A BossClub olyan online felületként jelenik meg, amely nem csak információt ad, hanem egy közösségi működés digitális alapját is kijelöli.",
      overview: [
        { label: "Típus", value: "közösség / platform" },
        { label: "Fókusz", value: "tagság, közösség, pozicionálás" },
        { label: "Állapot", value: "éles oldal" },
      ],
      challengeTitle: "A kihívás",
      challenge: [
        "A közösségi üzenetet úgy kellett online formába rendezni, hogy ne váljon túlzsúfolt bemutatkozássá.",
        "A tagsági és közösségi jellegnek már az első néhány képernyőn érthetőnek kellett lennie.",
      ],
      solutionTitle: "A megoldás",
      solution: [
        {
          title: "Platform-szemléletű felépítés",
          text: "A tartalom nem egyszerű aloldalakból áll, hanem egy közösségi ajánlat köré szerveződik.",
        },
        {
          title: "Erős első benyomás",
          text: "A vizuális és szöveges elemek célja, hogy gyorsan megmutassák, milyen közösségi térbe érkezik a látogató.",
        },
      ],
      visualTitle: "Közösségi jelenlét képernyőképei",
      visualText: "A desktop és mobil nézet a publikus platform-jellegű oldalt mutatja.",
      modulesTitle: "Fő elemek",
      modules: ["közösségi pozicionálás", "tagsági üzenet", "bemutatkozó blokkok", "mobilnézet"],
      resultTitle: "Mit ad ez az alap?",
      resultText:
        "Egy olyan online jelenlétet, amelynek van karaktere, de közben rendezett marad a látogatói tájékozódás.",
      takeaway:
        "Közösségi projektnél a weboldal akkor működik, ha nem csak beszél a közösségről, hanem szerkezetet is ad neki.",
    },
  },
  {
    title: "RockVibe",
    slug: "rockvibe",
    url: "https://rockvibe.neocities.org/",
    liveUrl: "https://rockvibe.neocities.org/",
    caseStudyHref: "case-study.html?project=rockvibe",
    category: "Zene / esemény",
    status: "live",
    shortDescription:
      "Zenei és eseményalapú weboldal karakteres vizuális világgal és könnyen bejárható tartalmi szerkezettel.",
    tags: ["zene", "esemény", "kampányoldal"],
    desktopImage: "CodeNest media web/rockvibe-desktop.png",
    mobileImage: "CodeNest media web/rockvibe-mobile.png",
    highlighted: false,
    caseStudy: {
      eyebrow: "Zenei / eseményoldal",
      headline: "Karakteres eseményoldal, ahol a vizuális hangulat és a tartalom együtt dolgozik.",
      summary:
        "A RockVibe egy zenei témájú oldal, ahol fontos volt a hangulat, de ugyanennyire fontos maradt, hogy a tartalom gyorsan bejárható legyen.",
      overview: [
        { label: "Típus", value: "zene / esemény" },
        { label: "Fókusz", value: "hangulat, tartalom, mobilnézet" },
        { label: "Állapot", value: "éles oldal" },
      ],
      challengeTitle: "A kihívás",
      challenge: [
        "A vizuális karakter nem takarhatta el a fontos tartalmi elemeket.",
        "Az eseményjelleg miatt a látogatónak gyorsan kellett érzékelnie a témát és a következő lépést.",
      ],
      solutionTitle: "A megoldás",
      solution: [
        {
          title: "Hangulatos vizuális rendszer",
          text: "A zenei karakter megjelenik a felületen, de a szerkezet továbbra is olvasható és követhető marad.",
        },
        {
          title: "Egyszerű bejárás",
          text: "A tartalmi blokkok úgy épülnek egymásra, hogy az oldal ne váljon plakáttá: használható webes felület marad.",
        },
      ],
      visualTitle: "Eseményoldal képernyőképei",
      visualText: "A képernyőképek a RockVibe publikus desktop és mobil megjelenését mutatják.",
      modulesTitle: "Fő elemek",
      modules: ["zenei vizuális világ", "eseményfókusz", "tartalmi blokkok", "mobilnézet"],
      resultTitle: "Mit ad ez az oldal?",
      resultText:
        "Egy karakteres, mégis átlátható webes felületet, amelyben a hangulat nem megy a használhatóság rovására.",
      takeaway:
        "Erős vizuális világ mellett is kell tiszta információs ritmus, különben az oldal gyorsan csak dekoráció lesz.",
    },
  },
  {
    title: "GreenGoo",
    slug: "greengoo",
    url: "https://greengoo.neocities.org/",
    liveUrl: "https://greengoo.neocities.org/",
    caseStudyHref: "case-study.html?project=greengoo",
    category: "Márka / termék",
    status: "live",
    shortDescription:
      "Termék- és márkafókuszú weboldal, amely egyszerűen mutatja be az ajánlatot és a kapcsolódó tartalmakat.",
    tags: ["márka", "termék", "landing"],
    desktopImage: "CodeNest media web/greengoo-desktop.png",
    mobileImage: "CodeNest media web/greengoo-mobile.png",
    highlighted: false,
    caseStudy: {
      eyebrow: "Márka / termék",
      headline: "Termékfókuszú landing oldal egyszerű ajánlatbemutatással.",
      summary:
        "A GreenGoo egy márka- és termékhangulatú oldal, ahol az ajánlatot, a vizuális világot és a kapcsolódó információkat kellett közös ritmusba rendezni.",
      overview: [
        { label: "Típus", value: "márka / termék" },
        { label: "Fókusz", value: "termékkommunikáció" },
        { label: "Állapot", value: "éles oldal" },
      ],
      challengeTitle: "A kihívás",
      challenge: [
        "A termékes hangulatnak gyorsan érthetőnek kellett lennie, de nem válhatott túlzsúfolt kampányfelületté.",
        "Az ajánlatot röviden, vizuálisan és mobilon is fogyasztható módon kellett bemutatni.",
      ],
      solutionTitle: "A megoldás",
      solution: [
        {
          title: "Termékközpontú felépítés",
          text: "A vizuális részletek és a tartalmi blokkok az ajánlat megértését támogatják.",
        },
        {
          title: "Könnyű mobil olvasás",
          text: "A mobil nézetben a legfontosabb tartalmak egymás után, tiszta ritmusban jelennek meg.",
        },
      ],
      visualTitle: "Márkaoldal képernyőképei",
      visualText: "A screenshotok a desktop és mobil termékoldal megjelenését mutatják.",
      modulesTitle: "Fő elemek",
      modules: ["termékbemutatás", "márkahangulat", "ajánlati blokkok", "mobilnézet"],
      resultTitle: "Mit ad ez az oldal?",
      resultText:
        "Egy egyszerű, vizuális márkaalapot, amely nem bonyolítja túl az ajánlatot, de segíti a látogatói megértést.",
      takeaway:
        "A termékoldal akkor jó, ha gyorsan látszik, mit kínál, és a vizuális világ nem nyomja el az üzenetet.",
    },
  },
  {
    title: "SkillBridge Home",
    slug: "skillbridge-home",
    url: "https://skillbridge-home.neocities.org/",
    liveUrl: "https://skillbridge-home.neocities.org/",
    caseStudyHref: "case-study.html?project=skillbridge-home",
    category: "Oktatás / jelentkezés",
    status: "live",
    shortDescription:
      "Oktatási célú oldal jelentkezési fókuszú tartalommal és átlátható információs felépítéssel.",
    tags: ["oktatás", "jelentkezés", "információs oldal"],
    desktopImage: "CodeNest media web/skillbridge-home-desktop.png",
    mobileImage: "CodeNest media web/skillbridge-home-mobile.png",
    highlighted: false,
    caseStudy: {
      eyebrow: "Oktatás / jelentkezés",
      headline: "Oktatási oldal, ahol az információszerkezet a jelentkezési útvonalat támogatja.",
      summary:
        "A SkillBridge Home esetében a cél az volt, hogy az érdeklődő gyorsan megértse a lehetőséget, a folyamatot és a jelentkezéshez szükséges következő lépést.",
      overview: [
        { label: "Típus", value: "oktatási / jelentkezési oldal" },
        { label: "Fókusz", value: "információ és jelentkezés" },
        { label: "Állapot", value: "éles oldal" },
      ],
      challengeTitle: "A kihívás",
      challenge: [
        "Az oktatási információknál könnyű túl sok szöveget egy oldalra zsúfolni.",
        "A jelentkezési irányt úgy kellett megmutatni, hogy közben a látogató ne veszítse el a kontextust.",
      ],
      solutionTitle: "A megoldás",
      solution: [
        {
          title: "Tiszta információs hierarchia",
          text: "A tartalmak egymásra épülnek: először a lényeg, utána a részletek és a jelentkezési irány.",
        },
        {
          title: "Jelentkezésközeli szerkezet",
          text: "A CTA-k és tartalmi blokkok nem különálló elemek, hanem a döntési folyamat részei.",
        },
      ],
      visualTitle: "Oktatási oldal nézetei",
      visualText: "A desktop és mobil screenshotok az információs és jelentkezési fókuszú felépítést mutatják.",
      modulesTitle: "Fő elemek",
      modules: ["oktatási információk", "jelentkezési útvonal", "tartalmi hierarchia", "mobilnézet"],
      resultTitle: "Mit ad ez az oldal?",
      resultText:
        "Egy olyan információs oldalt, ahol a látogató nem csak olvas, hanem könnyebben eljut a jelentkezéshez vagy érdeklődéshez.",
      takeaway:
        "Oktatási oldalaknál a jó szerkezet legalább olyan fontos, mint a design: a döntést és a tájékozódást egyszerre kell támogatni.",
    },
  },
];
