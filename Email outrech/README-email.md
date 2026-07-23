# CodeNest outreach HTML-email sablonok

Az `Email outrech/` mappa több célcsoportos CodeNest outreach emailt tartalmaz. Mindegyik táblázatalapú, inline stílusokra épülő HTML-email, ezért böngészőben könnyen előnézhető, de emailküldés előtt kliensben is tesztelni kell.

## Sablonok

- `codenest-outreach-email.html`: általános, emberi bemutatkozó verzió.
- `codenest-outreach-business.html`: helyi vállalkozásoknak, szakembereknek és szolgáltatóknak.
- `codenest-outreach-institution.html`: önkormányzatoknak, intézményeknek és települési szereplőknek.
- `codenest-outreach-tourism.html`: szálláshelyeknek, vendéglátóhelyeknek és turisztikai szolgáltatóknak.
- `codenest-outreach-redesign.html`: régi vagy elavult weboldallal rendelkező szervezeteknek.
- `outreach-variants.md`: rövid használati jegyzet, célcsoportok és tárgymezőötletek.

## Használt változók

| Változó | Mire való |
|---|---|
| `{{ORGANIZATION_NAME}}` | A címzett szervezet vagy vállalkozás neve. |
| `{{WEBSITE_URL}}` | A CodeNest weboldal teljes HTTPS URL-je, például `https://codenest.hu/`. |
| `{{CONTACT_EMAIL}}` | Kapcsolati email cím, például `info.codenest.hu@gmail.com`. |

## Képek és assetek

A sablonok helyi előnézetben relatív képutakat használnak:

- `assets/codenest-logo-email.png`
- `assets/leaf-decoration.png`
- `assets/icon-website.png`
- `assets/icon-chat.png`
- `assets/icon-edit.png`
- `assets/icon-people.png`
- `assets/icon-lightning.png`
- `assets/icon-heart.png`
- `assets/icon-store.png`
- `assets/icon-calendar.png`
- `../Bors&David_3_laptopos.png`
- `../GB_profil.jpg`
- `../DF.jpg`

Éles emailküldés előtt a relatív képutakat publikus HTTPS URL-ekre kell cserélni, vagy az emailküldő rendszer assetkezelőjébe kell feltölteni. A lokális `../Bors&David_3_laptopos.png` útvonal böngészős preview-ban működik, de Gmailben vagy Outlookban önmagában nem fog betöltődni.

## Küldés előtti ellenőrzés

- [ ] a megfelelő célcsoportos HTML variáns kiválasztva
- [ ] `{{ORGANIZATION_NAME}}` kicserélve
- [ ] `{{WEBSITE_URL}}` kicserélve vagy a küldőrendszerben beállítva
- [ ] `{{CONTACT_EMAIL}}` kicserélve vagy a küldőrendszerben beállítva
- [ ] minden kép publikus HTTPS URL-ről betölt
- [ ] Gmail web, Gmail mobil és Outlook teszt elkészült
- [ ] képek letiltása mellett is érthető marad az email
- [ ] tömeges küldés esetén az adatkezelési és leiratkozási háttér rendezett

## Javaslat

Első körben ne mindenkinek ugyanazt a sablont küldjük. A legjobb eséllyel a célzott verziók működnek: intézménynek intézményi nyelv, vállalkozásnak üzleti nyelv, turisztikai szereplőnek vendégszemléletű nyelv.