# HoloFyrn frissítése

A meglévő GitHub Pages workflow minden `main` ágra küldött frissítésnél teszteli az alkalmazást és újragenerálja a `version.json` fájlt. A verzió a HTML, JavaScript, Firebase-konfiguráció, CSS és képek tartalmából készül, kézzel nem kell verziószámot emelni.

Az oldal megnyitáskor frissen lekéri a verziót, majd verziózott címen tölti be a programot és stílusokat. Így a változatlan kiadás gyorsítótárazható, a módosított kiadás új URL-t kap. Egy már megnyitott munkamenet nem frissül magától: a közzététel után töltsd újra az oldalt. A bejelentkezés és a helyi/Firebase-adatok nem törlődnek.

GitHub Pages esetén a repository Pages beállításaiban a publikálási forrásnak **GitHub Actions** kell lennie, és a **Deploy static content to Pages** futásnak sikeresen be kell fejeződnie.

Ha közvetlenül másolod a fájlokat egy tárhelyre, feltöltés előtt futtasd a repository gyökeréből:

```sh
node NoctiqManager/build-version.cjs
```

A teljes `NoctiqManager` mappát, az új `version.json` fájllal együtt töltsd fel. A verziófájlt utolsóként érdemes feltölteni, vagy a teljes kiadást egyszerre cserélni. Apache esetén a mellékelt `.htaccess` újraellenőrizteti a módosítható fájlokat. Más saját szerveren a HTML és a `version.json` válaszához `Cache-Control: no-cache, must-revalidate` fejléc javasolt.

Az első áttérésnél, ha a böngésző még a régi, verzióellenőrzés nélküli HTML-t mutatja, egyszer szükség lehet `Ctrl+F5` frissítésre. A GitHub/CDN közzététel befejezése előtt az új kiadás még nem érhető el.
