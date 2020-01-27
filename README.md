# iPlayMusic

Opgaven går ud på at opsætte et website der primært er mobiltvenligt, og er drevet af en simpel datastruktur.
Opgaven er tiltænkt som en **individuel opgave**, men I må selvfølgelig gerne vende ideer og koncepter med hinanden.

[Del 1 - Layout](#Del-1-Layout)
[Del 2 - API & data implementering](#Del-2-API-og-Data-implementering)
[Del 3 - Afspiller & animationer](#Del-3-Afspiller-og-animationer)

![alt text](https://github.com/rts-cmk-wuhf02/iPlayMusic/blob/master/iplaymusic.png "iPlayMusic hero")

# Del 1 - Layout
Fokus er at omsætte designet til funktionel ```html/css/javascript```, ud fra det ud har lært ind til videre. Designet skal følges så tæt som muligt, og fungere på kryds og tværs af flere mobil-skærmstørrelser. Det skal være muligt at skifte mellem lyst og mørkt tema men det er **ikke** et krav adressebaren er skjult som i en native app.

Der er elementer på hjemmesiden som går igen på flere af siderne, dem skal du trække ud i individuelle ```.ejs``` filer som ```templates``` der placeres i partials ```mappen``` og inkluderes efter behov. Udfordringen ligger i at splitte designet op i fornuftige og logiske dele, samt at gennemskue hvilke elementer der gentages på flere sider. Det vil også være ok at oprette templates for enkeltstående elementer.



## Views som skal produceres:
*Navnene herunder: featured, albums etc. kan du bruge til at finde det rigtige view i Adobe XD filen. Er du itvivl så spørg!*

1. Featured (index) - *Præsenter featured albums. **OBS:** Dette view skal senere integrerer lazyload*
2. Albums - *Præsentere featured albums og new releases(albums)*
3. Album Details - *liste traks for et valgt album*
4. Categories - *liste alle kategorier*
5. Playlists - *listes tracks fra en valgt playliste*
6. Player - *"Afspil" et valgt track*

## Navigation:
Fra venstre: Albums, playlists, featured, farve tema, categories(find evt. et mere passende ikon).
Afspilleren og album details er dybe links fra henholdsvis albums og playlists/album.
![alt text](https://github.com/rts-cmk-wuhf02/iPlayMusic/blob/master/navigation.png "navigation")

## Font, farve og ikoner:
**Se styleguide:** https://github.com/rts-cmk-wuhf02/iPlayMusic/blob/master/styleguide.png
**OBS:** Ikonerne er fra ionic frameworket som vi ikke arbejder med. Eksporter derfor ikoner fra XD eller integrer en anden ikon løsning ie. font-awesome eller ligende.

## Du skal bruge følgende i løsningen:
1. ```gulp```
2. ```ejs```
3. ```sass```
      * ```variabler```

---

## Tidsramme
Der er afsat 1 arbejds uge til opgaven, dvs aflevering på fredag kl 13.30 (den sidste commit til github inden fredag kl 13.30, bliver afleveringen).

---

# Del 2 - API og Data implementering

Anden del af projektet handler om få præsenteret rigtige data i iPlayMusic.

![alt text](https://github.com/rts-cmk-wuhf02/iplaymusic-TroelsAgergaard/blob/master/SpotifyAPI.png "Spotify API")

Disse data skal hentes fra musik tjenesten Spotify.

Spotify har et "entry point" for udviklere som kan findes på: https://developer.spotify.com/ Herfra kan alle nødvendige ```endpoint``` referencer findes e.g. albums, categorier, numre etc. Web API'et returneres alle ```response``` data som ```JSON objekter```. Benyt ```fetch``` til at forespørge data.

Det kræver en registerert Spotify bruger at få adgang til Web API'et.

**Opret en gratis konto:** https://www.spotify.com/dk/signup/

---

## Særlige krav til udvalgte views

**Featured:**

```Intersection Observer API'et``` til integration af ```Lazy-loading``` af billeder og indhold i takt med at det scrolles ned i viewet.

**Playlist:**

Titler på numre må ikke ombryde i to linier. Benyt ```text overflow``` eller lingende til at afkorte eventuelle lange titler med e.g. ... (tre punktummer) for at indikere at titlen ikke vises i sin fulde længde.

## Feature opgave
**Søgefunktionalitet:**

*Påbegynd først denne opgave når **alle** tidligere opgaver er løst!*

forespørg data fra search endpointet vedrørende artister, alubms, numre eller playlists som matcher en ```keyword string```. Præsenter resultaterne på en smart overskugelig måde i viewet "songs". Læs de guidelines som er beskrevet i afsnittet *"Writing a Query - guidelines"* i dokumentationen for search endpointet.

## Du skal bruge følgende i løsningen:

fetch-wrapper (Jeres eget ```npm``` modul)

## Husk den gode arbejdsgang
1. Stage løbende
2. Commit hver gang en ændring virker
3. Push dagligt

---

## Tidsramme
Der er afsat 1 arbejds uge til opgaven, dvs aflevering på fredag kl 13.30 (den sidste commit til github inden fredag kl 13.30, bliver afleveringen).

---

# Del 3 - Afspiller og animationer

Tredje del af projektet handler om at få afspilleren til at fungere og at animere UI.

![alt text](https://github.com/rts-cmk-wuhf02/iPlayMusic/blob/master/animation.gif "Animate UI")

# Afspilleren
Den første opgave i uge 3. omhandler afspilleren. Brugeren kan navigere hen til dette afspiller viewet ved at trykke på et track i en 'track-liste'. Titel, kunstner og medier på afspiller siden skal matche det track brugeren "har valgt at lytte til" i.e. trykket på.

Desværre kræver det et Spotify premium abonnement at få adgang til musikken, så det er ikke en mulighed. I denne opgave handler det om konceptet, ikke at kunne finde og afspille de korrekte musik numre.

> For Spotify premium abonnenter er det muligt at arbejde med Spotify egen webplayer ```SDK``` Det er en mulighed, men selvfølgelig ikke et krav.

Play funktionaliteten skal derfor ganske enkelt bare afspille et stykke 'demo-musik' når der trykke play. Det kræver nogle musik filer som kan afspilles, der kan man f.eks. hente noget musik herfra [Incompetech.com](https://incompetech.com/music/)

Når du har fundet lidt musik skal `<audio>` tagget e.l. implementeres på afspiller siden, og der skal skrives lidt kode som får afspilleren til at fungere, samt sikre den bliver stylet som på designet. Hvis du aldrig har prøvet at arbejde med et `<audio>` tag, så er her et par resorser som kan få dig godt fra start:

[HTML5 audio](https://www.w3schools.com/html/html5_audio.asp)

[Audio Object](https://www.w3schools.com/jsref/dom_obj_audio.asp)

# UI Animation
Anden del af opgaven består i at integrere animationer som har til hensigt at formidle et vigtigt budskab til brugeren e.g. indhold er ved at blive indlæst. En "opgave" I tidligere har løst ved at animere en lille spinner, som så er blevet vist så længe indhold endnu ikke er indlæst. Det er et **krav** at der findes en ligende løsning i denne opgave.

> "Users tend to give up on loading times way faster when shown no or a static loading screen than an animated one.
Layout Skeletons (...) seem to work very well, while spinners (...) are still better than nothing (...)" [Se artikel](https://dev.to/iamschulz/animation-for-developers-c4b?fbclid=IwAR2mYJQ-UwH07WPkPvcpJ5cSN8qIh06sDYzZEzhH2SjArGBOADP8EHUe95I)

**Læs artiklen** animation for developers, linket findes i ovenstående blockquote. I artiklen er der flere konkrete eksempler på UI animaiton som én til én kan overføres til iPlayMusic applikationen.

### I har tidligere brugt følgende til at lave animationer
1. [Anime.js](https://animejs.com/)
2. [Animate.css](https://daneden.github.io/animate.css/)
3. Keyframes CSS

Rammerne er frie, eneste **krav** er spinneren! Slå jer løs, men vær opmærksom at der i forhold til brugeren skal være et klart formål med animationen. Jeg glæder mig til at se hvad i kommer op med.

God arbejdslyst!

---

## Tidsramme
Der er afsat 4 arbejdsdage til opgaven, dvs aflevering på torsdag kl 15.10 (den sidste commit til github inden torsdag kl 15:10, bliver afleveringen).
