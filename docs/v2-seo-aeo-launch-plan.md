# CodeNest V2 SEO/AEO és élesítési terv

## Cél

A V2 jelenleg működő statikus HTML/CSS/JS preview, de a fő tartalom nagy része JavaScriptből renderelődik. Élesítés előtt el kell dönteni, hogyan legyen egyszerre gyorsan indítható, kereshető, megosztható és később is karbantartható.

Ez a dokumentum nem UI design terv. A cél az, hogy a CodeNest V2 tartalma és technikai alapja ne csak böngészőben működjön, hanem keresők, megosztási előnézetek és későbbi szolgáltatásoldalak szempontjából is tisztább legyen.


## Többnyelvű URL-döntés

A jelenlegi döntés szerint az éles V2 struktúra három nyelvi belépőt kap: magyar tartalom a gyökérben, angol tartalom a `/en/` útvonalon, német tartalom a `/de/` útvonalon. A `v2-preview.html` továbbra is preview/build oldal marad, nem ez lesz a végleges publikus URL.

A nyelvváltó a preview és case-study oldalakon még `?lang=...` paraméterrel dolgozhat, mert ezek fejlesztési és dinamikus oldalak. Az éles főoldali belépőknél viszont a path lesz a nyelvi jel: `/`, `/en/`, `/de/`.

SEO/AEO szempontból ez tisztább, mert minden fő nyelv saját canonical URL-t, saját title/description alapot és később saját statikus HTML tartalmat kaphat. A `noindex, nofollow` továbbra is marad mindaddig, amíg a V2 nincs ténylegesen élesítve.

## Jelenlegi helyzet

- A V2 preview külön oldalon fut: `v2-preview.html`.
- A case study rendszer külön oldalon fut: `case-study.html?project=...`.
- A tartalom adatfájlokból jön: `data/site-content.js`, `data/services.js`, `data/projects.js`, `data/team.js`, `data/i18n.js`.
- A preview és case study head már kapott title, description, OG és canonical előkészítést.
- A `noindex, nofollow` még szándékosan marad, mert ez nem élesített főoldal.
- A nyers HTML-ben vannak jobb fallback szövegek, de a teljes oldal tartalma továbbra is JS-renderelt.

## Fő SEO/AEO kérdés

A legnagyobb kérdés nem az, hogy legyen-e meta description. Az már előkészíthető.

A valódi kérdés az, hogy élesítéskor a kereső és az AI alapú válaszrendszerek mennyi tartalmat látnak stabil HTML-ként JavaScript futtatás nélkül. Ha a teljes tartalom csak JS után jelenik meg, az működhet, de gyengébb alap, mint egy részben vagy teljesen statikus HTML.

## Ajánlott irány

A legjobb kompromisszum most: **HU root + külön /en/ és /de/ statikus belépőoldalak**, a meglévő data fájlok megtartásával.

Ez azt jelenti, hogy élesítés előtt a magyar, angol és német főoldali belépők fő szövegei, címsorai és fontos linkjei bekerülnek a saját HTML-jükbe is. A JavaScript továbbra is használható nyelvváltásra, kártyák renderelésére és case-study interakciókra, de az elsődleges magyar tartalom nem csak futás után létezik.

## Mit érdemes statikusan láthatóvá tenni?

- Hero headline és subheadline.
- A fő CTA és másodlagos CTA.
- Problem szekció címe és rövid magyarázata.
- A három fő szolgáltatás címe és rövid leírása.
- Gárdony Platform mint kiemelt munka.
- Folyamat lépések címei.
- Miért CodeNest három fő állítása.
- Bors + Dávid rövid bemutatása.
- Scope / árazás magyarázat.
- Kapcsolat CTA, email és jogi link.
- Footer navigáció és jogi link.

## Mit maradhat JS-renderelt?

- Nyelvváltás.
- Részletes kártyák teljes belső listái.
- Supporting project grid részletei.
- Case-study tartalom első körben, ha a case-study oldalak `noindex` alatt maradnak.
- Lightbox és kisebb interakciók.

## Case study SEO döntés

Rövid távon a case-study oldalak maradhatnak dinamikus `case-study.html?project=slug` formában. Ez gyors és működő megoldás, de nem ideális hosszabb távú SEO-hoz.

Középtávon jobb lenne külön statikus URL minden fontos referenciának, például `munkak/gardony-platform.html`. Erre főleg a Gárdony Platformnál van értelme, mert ez a legerősebb bizonyíték a CodeNest új pozicionálására.

## Metadata stratégia

A főoldalhoz egyértelmű title és description kell:

- Title: `CodeNest – Weboldalak, amiket használni is lehet`
- Description: `Érthető, szerkeszthető weboldalakat készítünk kisebb önkormányzatoknak, intézményeknek, szálláshelyeknek és helyi vállalkozásoknak.`

Az OG adatoknak ugyanezt az irányt kell vinniük. Élesítéskor érdemes külön OG képet készíteni, de addig nem kell képet kitalálni vagy hamis mockupot használni.

## AEO tartalmi irány

Az oldalnak egyértelműen válaszolnia kell ezekre a kérdésekre:

- Mi az a CodeNest?
- Kiknek dolgozik?
- Milyen weboldalakat épít?
- Miért fontos, hogy az oldal szerkeszthető legyen?
- Miben más, mint egy általános webügynökség?
- Hogyan indul egy projekt?
- Kell-e kész specifikáció?
- Van-e nyilvános csomagár?
- Kivel beszél az ügyfél?

Ezekre nem külön FAQ blokk kell első körben, hanem tiszta szekciószövegek. Később egy rövid FAQ segíthet, de csak akkor, ha nem teszi zsúfolttá a főoldalt.

## Launch előtt kötelező

1. `noindex, nofollow` eltávolítása csak az élesítés pillanatában.
2. `v2-preview.html` migrációs döntés: átnevezés, tartalom átemelés vagy index csere.
3. Canonical URL-ek ellenőrzése az éles URL-struktúra alapján.
4. Legal/footer linkek ellenőrzése.
5. Favicon és share preview ellenőrzése.
6. Magyar tartalom végigolvasása egyben.
7. EN/DE route-ok ellenőrzése: a `/en/` és `/de/` belépők saját canonical, hreflang és olvasható fallback tartalommal induljanak.
8. Projekt screenshotok optimalizálása és fájlméret ellenőrzése.
9. Mobil böngészős ellenőrzés.
10. GitHub Pages / CNAME / Cloudflare élesítési ellenőrzés.

## Első ajánlott implementációs lépés

A következő kódolási lépés ne meta tag legyen, mert az már részben megvan. A következő lépés egy **HU statikus HTML tartalmi alap** legyen a V2 főoldalhoz.

Ez azt jelenti, hogy a `v2-preview.html` fallback tartalma ne csak placeholder legyen, hanem tartalmilag kövesse a magyar data fájlokat. Így a JS továbbra is felül tudja renderelni az oldalt, de a dokumentum önmagában is értelmesebb lesz.

## Mit ne csináljunk most?

- Ne migráljuk még a V2-t az `index.html` helyére.
- Ne töröljük a régi homepage fájlokat.
- Ne kapcsoljuk ki a `noindex`-et preview állapotban.
- Ne adjunk hozzá nyilvános árakat.
- Ne írjunk túl hosszú FAQ-t csak SEO miatt.
- Ne kezdjünk framework migrációba.
- Ne keverjük össze ezt a kört UI design javítással.