# Nyilvános játékosok és eredmények

A `public-data.js` a `publicHoloFyrnData` Firebase HTTP-funkciót olvassa. A funkció a `noctiqManager/main` dokumentumból kizárólag a játékosneveket és a csapatok eredményeit adja vissza. A Manager Firestore-szabályait nem kell nyilvános olvasásra módosítani.

Élesítéskor a `HoloFyrnManager` mappából telepítsd a `holofyrn-accounts` funkciókódbázist a `noctiq-d1020` Firebase-projektbe:

```sh
firebase deploy --project noctiq-d1020 --only functions:holofyrn-accounts
```

Az oldal statikus fájljai a gyökérben található GitHub Pages workflow-val kerülnek ki. A Firebase-funkciót külön kell telepíteni; addig az oldal hibaüzenetet mutat az élő adatok helyén.
