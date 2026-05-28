# Noctiq Manager - Firebase / GitHub Pages beallitas

Ez a verzio mar nem LocalStorage-be menti a kozos adatokat, hanem Firebase Cloud Firestore-ba.
A GitHub Pages tovabbra is csak statikus HTML/CSS/JS fajlokat hostol, az adatbazist a Firebase adja.

Helyi inditashoz lasd: `INDITAS.md`.

## 1. Firebase projekt letrehozasa

1. Menj a Firebase Console-ba.
2. Hozz letre egy uj projektet.
3. Add hozza a Web appot.
4. Masold ki a Firebase config objektumot.
5. Nyisd meg a `firebaseConfig.js` fajlt, es csereld ki a placeholder ertekeket.

## 2. Firestore bekapcsolasa

1. Firebase Console -> Firestore Database.
2. Create database.
3. Kezdeshez valaszthatod a test modot, de elesben ne hagyd nyitva.
4. A projektben talalhato `firestore.rules` fajl csak ideiglenes teszteleshez valo.

## 3. GitHub Pages publikacio

Told fel a kovetkezo fajlokat a repositoryba:

- `index.html`
- `style.css`
- `script.js`
- `firebaseConfig.js`
- `assets/noctiq-logo.png`

A GitHub repository Settings -> Pages reszben valaszd ki a publikacios branchet.

## Fontos biztonsagi megjegyzes

Ebben a projektben a jogosultsag jelenleg kliensoldali: az app elrejti vagy megmutatja a szerkesztesi gombokat.
Ez nem valodi vedelmi szint, mert a bongeszo kodja modosithato.

Ha tenyleges, biztonsagos jogosultsag kell, akkor Firebase Authentication + Firestore Security Rules kell.
Ez meg mindig nem sajat backend, de mar valodi bejelentkezest es szerveroldali szabalyellenorzest ad.
