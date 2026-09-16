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

## 2. Firebase Authentication bekapcsolasa

1. Firebase Console -> Authentication.
2. Sign-in method.
3. Kapcsold be az Email/Password provider-t.
4. Az app feluleten username + password latszik. A username-bol az app belso Firebase Auth email azonositot keszit, igy a jelszot tovabbra is Firebase kezeli.
5. A regi frontendben tarolt jelszavas accountok mar nem hasznalatosak.
6. Az ujonnan regisztralt accountok automatikusan Player szerepkort kapnak. Admin az Admin oldalon tud kesobb jogosultsagot vagy szerepkort adni.

## 3. Firestore bekapcsolasa

1. Firebase Console -> Firestore Database.
2. Create database.
3. Publikalas elott tedd fel a projektben talalhato `firestore.rules` fajlt.
4. A jelenlegi minimum szabaly csak bejelentkezett Firebase Auth usereknek enged olvasast/irast.

## 4. GitHub Pages publikacio

Told fel a kovetkezo fajlokat a repositoryba:

- `index.html`
- `style.css`
- `script.js`
- `firebaseConfig.js`
- `assets/noctiq-logo.png`

A GitHub repository Settings -> Pages reszben valaszd ki a publikacios branchet.

## Fontos biztonsagi megjegyzes

Az app mar Firebase Authentication alapu belepest hasznal, ezert jelszot nem tarol a frontend adatmodellben. A felhasznalok username + password parossal lepnek be, a Firebase Auth hatterben kezeli a jelszot.

A szerepkorok es szerkesztesi jogosultsagok tovabbra is az app adatmodelljeben vannak. A kovetkezo biztonsagi lepes a role alapu Firestore rules, ahol admin/coach/player szerint kulon korlatozod az irasi jogokat.
