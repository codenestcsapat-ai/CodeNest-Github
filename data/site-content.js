export const siteContent = {
  navigation: {
    items: [
      { label: "Mit építünk", href: "#mit-epitunk" },
      { label: "Munkák", href: "#munkak" },
      { label: "Folyamat", href: "#folyamat" },
      { label: "Rólunk", href: "#bors-david" },
      { label: "Kapcsolat", href: "#kapcsolat" },
    ],
    languages: ["HU", "EN", "DE"],
  },

  hero: {
    headline: "Webes rendszerek, amiket nem csak nézni lehet, hanem használni is.",
    subheadline:
      "Szerkeszthető weboldalakat, adminfelületeket és egyedi digitális megoldásokat építünk önkormányzatoknak, intézményeknek és kisvállalkozásoknak.",
    primaryCta: "Beszéljünk a projektről",
    secondaryCta: "Megnézem, mit építünk",
    primaryCtaHref: "#kapcsolat",
    secondaryCtaHref: "#mit-epitunk",
  },

  problem: {
    title: "A legtöbb weboldal elkészül. Aztán nehéz használni.",
    text:
      "Sok szervezetnek nem újabb statikus bemutatkozó oldalra van szüksége, hanem olyan rendszerre, amit a csapat tényleg tud használni: híreket kezelni, dokumentumokat feltölteni, űrlapokat fogadni, folyamatokat követni és biztonságosan működtetni.",
    painPoints: [
      {
        title: "Nehéz frissíteni",
        text: "A tartalom elavul, mert minden módosítás külön utánajárást vagy fejlesztői segítséget igényel.",
      },
      {
        title: "Szétszórt tartalmak",
        text: "Dokumentumok, hírek és információk több helyen élnek, ezért nehéz rendben tartani őket.",
      },
      {
        title: "E-mail káosz",
        text: "Ajánlatkérések, jelentkezések és bejelentések könnyen elvesznek a beérkező üzenetek között.",
      },
      {
        title: "Nincs biztos átadás",
        text: "A weboldal elkészül, de nem mindig egyértelmű, ki kezeli, hogyan frissül és ki tartja üzemben.",
      },
    ],
    beforeAfter: {
      before: ["Szétszórt tartalmak", "Fejlesztőfüggőség", "E-mail káosz"],
      after: ["Szerkeszthető admin", "Rendezett tartalom", "Átlátható folyamat"],
    },
    points: [
      "A tartalom legyen szerkeszthető fejlesztői segítség nélkül.",
      "Az adminfelület legyen átlátható azoknak is, akik naponta használják.",
      "A weboldal kapcsolódjon a valódi munkafolyamatokhoz.",
      "Az indulás után is legyen karbantartás, mentés és támogatás.",
    ],
    solution:
      "Mi olyan webes rendszereket építünk, amelyek nemcsak jól néznek ki, hanem átadás után is használhatók, szerkeszthetők és hosszú távon üzemeltethetők maradnak.",
  },

  process: {
    title: "Átgondolt folyamat, felesleges körök nélkül.",
    intro:
      "Kis csapatként közvetlenül dolgozunk veled: először megértjük, mire kell a rendszer, utána építünk hozzá használható szerkezetet, felületet és működést.",
    steps: [
      {
        title: "Megértjük",
        text: "Megismerjük a célt, a felhasználókat, a jelenlegi problémákat és azt, hogy mit kell a rendszernek megoldania.",
      },
      {
        title: "Megtervezzük",
        text: "Felépítjük az oldalstruktúrát, a tartalomtípusokat, az adminlogikát és a szükséges funkciókat.",
      },
      {
        title: "Megépítjük",
        text: "Elkészítjük a weboldalt, adminfelületet, űrlapokat, integrációkat és a szükséges technikai alapokat.",
      },
      {
        title: "Átadjuk",
        text: "Betanítunk, dokumentálunk, átadjuk a hozzáféréseket, és segítünk az éles indulásban.",
      },
      {
        title: "Üzemeltetjük",
        text: "Igény esetén gondoskodunk a hostingról, mentésekről, frissítésekről, supportról és továbbfejlesztésről.",
      },
    ],
  },

  whyCodeNest: {
    title: "Miért CodeNest?",
    intro:
      "Nem nagy ügynökségi gépezetként dolgozunk. Két emberrel, közvetlen kommunikációval és gyakorlati szemlélettel építünk webes rendszereket.",
    items: [
      {
        title: "Közvetlen kommunikáció",
        text: "Nem account manageren keresztül dolgozol. Azokkal beszélsz, akik ténylegesen értik és építik a rendszert.",
      },
      {
        title: "Szerkeszthető admin",
        text: "Nem zárt dobozt adunk át. A cél, hogy az ügyfél is tudja kezelni azokat a tartalmakat és folyamatokat, amelyek a mindennapi működéshez kellenek.",
      },
      {
        title: "Üzemeltethető alapok",
        text: "A hosting, backup, frissítések, hozzáférések és support nem utólagos gondolatok, hanem a rendszer részei.",
      },
    ],
  },

  scope: {
    title: "Minden projekt scope alapján indul.",
    text:
      "Nincsenek publikus, fix csomagáraink. Először megértjük, mire kell használni a webes rendszert, majd ehhez igazítjuk a feladat méretét, technikai alapját és az átadás utáni működést.",
    summaryPoints: [
      "Az ajánlat a szükséges weboldalra, adminfelületre, tartalmi szerkezetre és munkafolyamatokra épül.",
      "Nem kell mindent egyszerre megépíteni: különválasztjuk az induláshoz fontos részeket és a későbbi bővítéseket.",
      "Az egyeztetés után érthető, átlátható javaslatot adunk a feladatra.",
    ],
    includesTitle: "Mi alapján tisztázzuk?",
    includes: [
      "Funkciók és oldaltípusok",
      "Adminfelület és jogosultságok",
      "Tartalomtípusok és szerkesztési logika",
      "Űrlapok, értesítések és workflow-k",
      "Hosting, mentés és support",
      "Későbbi bővítés lehetőségei",
    ],
    ctaLabel: "Beszéljünk a projektről",
    ctaHref: "#kapcsolat",
  },

  contact: {
    title: "Beszéljünk arról, mire kell használnod a rendszert.",
    text:
      "Írd le röviden, milyen weboldalt, portált, adminfelületet vagy eszközt szeretnél. Nem kell kész specifikáció: elég, ha látjuk a problémát és a célt.",
    emailLabel: "Email",
    email: "info.codenest.hu@gmail.com",
    formLabels: {
      name: "Név",
      email: "Email",
      projectType: "Projekt típusa",
      message: "Üzenet",
      submit: "Elküldöm",
    },
    projectTypes: [
      "Önkormányzati vagy intézményi portál",
      "Adminos üzleti weboldal",
      "Egyedi webes eszköz",
      "Űrlap vagy munkafolyamat",
      "Hosting, backup vagy támogatás",
      "Még nem tudom pontosan",
    ],
  },

  footer: {
    tagline: "Webes rendszerek, amiket nem csak nézni lehet, hanem használni is.",
    links: [
      { label: "Mit építünk", href: "#mit-epitunk" },
      { label: "Munkák", href: "#munkak" },
      { label: "Folyamat", href: "#folyamat" },
      { label: "Kapcsolat", href: "#kapcsolat" },
    ],
    legalLinks: [
      { label: "Impresszum", href: "legal-hu.html" },
      { label: "Adatvédelem", href: "legal-hu.html" },
    ],
  },
};
