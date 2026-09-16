# Noctiq Manager - inditas

Ez az oldal nem sima duplakattos HTML-kent mukodik megbizhatoan, mert JavaScript modulokat es Firebase importokat hasznal.
ZIP-bol kibontva mindig helyi szerverrol inditsd.

## Gyors inditas Windows alatt

1. Bontsd ki a ZIP-et egy normal mappaba.
2. Duplakatt a `NoctiqManager-inditas.bat` fajlra.
3. Nyisd meg bongeszoben:

```text
http://127.0.0.1:8000
```

Alternativa PowerShellbol:

```powershell
.\start-local-server.ps1
```

Ha a `8000`-es port mar foglalt, a script automatikusan masik portot valaszt.
Ilyenkor azt a cimet nyisd meg, amit a PowerShell kiir, peldaul:

```text
Noctiq Manager fut: http://127.0.0.1:8001
```

Leallitas: a PowerShell ablakban `Ctrl+C`.

## Ha a PowerShell blokkolja a scriptet

Futtasd ezt ugyanabban a mappaban:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-local-server.ps1
```

## Firebase beallitas

Az app kozos adatbazishoz Firebase Firestore-t hasznal, ha eleri. Ha a Firebase vagy az internet nem erheto el, automatikusan helyi modban indul, es a bongeszo `localStorage` tarolojaba ment.

A `firebaseConfig.js` fajlban ezeknek valodi Firebase Web app ertekeknek kell lenniuk:

```js
PASTE_YOUR_API_KEY_HERE
PASTE_YOUR_PROJECT_ID
PASTE_YOUR_SENDER_ID
PASTE_YOUR_APP_ID
```

Ezeket a Firebase Console-ban kapott Web app config adatokra kell cserelni, ha kozos adatbazist szeretnel. Helyi futtatashoz nem kotelezo.

Reszletes Firebase leiras: `FIREBASE_SETUP.md`.

## Mi volt a feher ures oldal oka?

Az `index.html` csak egy ures `#app` elemet tartalmazott, a teljes feluletet a `script.js` rajzolja ki.
Ha a bongeszo nem inditja el a modul scriptet, peldaul `file://` megnyitas miatt, akkor semmi nem jelent meg.

Most mar van alap hiba-uzenet az `index.html`-ben, es a `script.js` kulon jelzi, ha a Firebase config nincs kitoltve.
