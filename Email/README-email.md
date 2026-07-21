# CodeNest bemutatkozó HTML-email

A küldhető sablon: `codenest-outreach-email.html`. Önálló, táblázatalapú HTML-email, JavaScript és külső CSS nélkül. A fontos stílusok inline szerepelnek; a `<style>` blokk csak reseteket, mobilos töréspontokat, Outlook-kompatibilitást és visszafogott dark-mode korrekciót tartalmaz.

## Változók behelyettesítése

Küldés előtt az aktív `{{...}}` helyőrzőket cseréld ki. Helyi megnyitáskor a sablon közvetlenül az `assets/` mappa képeit, valamint a projekt gyökerében lévő csapat- és profilképeket használja. Egyszerű szövegcserét, mail-merge rendszert vagy az emailküldő szolgáltató sablonmotorját is használhatod.

| Változó | Tartalom / javasolt érték |
|---|---|
| `{{ORGANIZATION_NAME}}` | A címzett neve, például `Gárdony Város Önkormányzata` |
| `{{LOGO_URL}}` | Alapérték: `https://codenest.hu/Email/assets/codenest-logo-email.png` |
| `{{HERO_PHOTO_URL}}` | Alapérték: `https://codenest.hu/team.jpg` |
| `{{BORS_PHOTO_URL}}` | `https://codenest.hu/GB_profil.jpg` |
| `{{DAVID_PHOTO_URL}}` | Alapérték: `https://codenest.hu/DF.jpg` |
| `{{ICON_WEBSITE_URL}}` | Alapérték: `https://codenest.hu/Email/assets/icon-website.png` |
| `{{ICON_CHAT_URL}}` | Alapérték: `https://codenest.hu/Email/assets/icon-chat.png` |
| `{{ICON_EDIT_URL}}` | Alapérték: `https://codenest.hu/Email/assets/icon-edit.png` |
| `{{ICON_PEOPLE_URL}}` | Alapérték: `https://codenest.hu/Email/assets/icon-people.png` |
| `{{ICON_LIGHTNING_URL}}` | Alapérték: `https://codenest.hu/Email/assets/icon-lightning.png` |
| `{{ICON_HEART_URL}}` | Alapérték: `https://codenest.hu/Email/assets/icon-heart.png` |
| `{{ICON_STORE_URL}}` | Alapérték: `https://codenest.hu/Email/assets/icon-store.png` |
| `{{ICON_CALENDAR_URL}}` | **Még kitöltendő:** fehér vonalas naptárikon publikus HTTPS URL-je |
| `{{WEBSITE_URL}}` | `https://codenest.hu/` |
| `{{CONTACT_EMAIL}}` | `info.codenest.hu@gmail.com` |

Az emailhez levágott és optimalizált képek az `Email/assets/` mappában vannak. A HTML jelenleg relatív útvonalakat használ, ezért böngészőben rögtön a helyi képeket mutatja. Valódi kiküldés előtt minden relatív `src` értéket a hozzá tartozó abszolút `https://codenest.hu/...` URL-re kell cserélni, mert az email kliensek nem érik el a helyi fájlokat. A `DF.jpg` fájlt a név alapján Dávid portréjaként, a `GB_profil.jpg` fájlt Bors portréjaként kötöttük be.

### Példa egyszerű behelyettesítésre

```text
{{ORGANIZATION_NAME}} → Gárdony Város Önkormányzata
{{WEBSITE_URL}}        → https://codenest.hu/
{{CONTACT_EMAIL}}      → info.codenest.hu@gmail.com
```

HTML-be kerülő dinamikus szöveget mindig HTML-escape-elj (`&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`, idézőjel attribútumban → `&quot;`). Az URL-eket validáld, és csak HTTPS képforrást engedj.

## Tesztelés

1. Készíts egy tesztpéldányt, és cseréld le benne az aktív szervezetnév-, kapcsolat- és naptárikon-változókat valódi értékre.
2. Nyisd meg böngészőben 870, 680, 390 és 320 px szélességen. Ellenőrizd a vízszintes overflow-t, az oszlopok törését és a hosszú email-címeket.
3. Küldj próbalevelet legalább Gmail webre, Gmail mobilra, Apple Mailre és Outlook asztali/web kliensre. Erre használható Litmus vagy Email on Acid is.
4. Kapcsold ki a képek letöltését: a szöveg, a sorrend és az értelmes `alt` feliratok képek nélkül is maradjanak használhatók.
5. Kattints a web- és email-linkre, majd ellenőrizd a tárgymezőt, feladónevet, reply-to címet és a rejtett preheadert.
6. Küldés előtt keress rá a `{{` karakterekre; találat esetén maradt ki nem cserélt változó.

## Kiküldés

A végleges HTML-t egy tranzakciós vagy marketing emailküldő rendszer HTML-forrás mezőjébe másold. A szolgáltató saját szervezetnév-változóját a `{{ORGANIZATION_NAME}}` helyén használd. Ne másold át Wordből vagy vizuális szerkesztőből, mert az átírhatja az inline stílusokat és a táblázatokat. Célszerű multipart üzenetet küldeni egy egyszerű szöveges alternatívával is.

## Ismert email-kliens korlátok

- Régebbi Windows Outlookban a `border-radius`, `box-shadow` és `object-fit` részben vagy teljesen elveszhet; a tartalom és a táblázatos szerkezet ettől még rendezett marad.
- Egyes kliensek automatikusan módosítják a színeket dark mode-ban. A sablon világos színsémát kér és ad korrekciókat, de a kliens felülírhatja ezeket.
- Letiltott képek esetén az ikonok és fotók helyett az `alt` szöveg jelenik meg. Lényeges szöveg ezért nincs képbe égetve.
- A mobilos media query-ket figyelmen kívül hagyó régi kliensek a táblázatos desktop elrendezést mutathatják.
- A Gmail kb. 102 KB fölött levághatja a HTML-t. A sablon méretét a végleges küldőrendszer által hozzáadott követőkódokkal együtt ellenőrizd.
- A naptárikon addig képhiányként jelenik meg, amíg a `{{ICON_CALENDAR_URL}}` változó nincs valós HTTPS PNG URL-re cserélve.

## Asset-checklista publikálás előtt

- [ ] az `Email/assets/` mappa publikálva a `https://codenest.hu/Email/assets/` útvonalon
- [ ] a `team.jpg`, `GB_profil.jpg` és `DF.jpg` párosítása jóváhagyva
- [ ] a hiányzó naptárikon feltöltve és a `{{ICON_CALENDAR_URL}}` változó cserélve
- [ ] minden URL 200-as választ ad bejelentkezés nélkül
- [ ] minden `{{...}}` változó behelyettesítve
- [ ] tesztküldés Gmail és Outlook kliensre elkészült
