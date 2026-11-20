# 009 — Ondergrond: op subtle

Datum: 2026-11-19 · Status: besloten (eigenaar)

## Probleem

Subtle (stap 100) is even licht als de pagina (slate/100). Elke stap in elke kleur is even licht, dus een subtle vlak
verschilt van de pagina alleen in tint (1,00:1). Een element dat één stap van zijn ondergrond ligt, valt daar weg: de
secundaire knop (sky/200 op 100: 1,08:1), een veld (slate/200), een actief menu-item. Op wit liggen ze twee stappen
af en zijn ze goed te zien.

## Besluit

De verzameling semantic krijgt twee modes erbij: **Light on subtle** en **Dark on subtle**. Op een vlak van stap 100
schuift alles erin één stap op, zodat het weer twee stappen van zijn ondergrond ligt.

| token | licht | licht op subtle | donker | donker op subtle |
|---|---|---|---|---|
| `surface/action/secondary` (hover, ingedrukt) | sky/200 (300, 400) | sky/300 (400, 400) | sky/800 (700, 700) | gelijk |
| `surface/action/neutral` (hover, ingedrukt) | slate/200 (300, 400) | slate/300 (400, 400) | slate/800 (700, 700) | gelijk |
| `surface/sunken`, `surface/disabled` | slate/200 | slate/300 | slate/950, 800 | slate/800, 700 |
| `surface/<kleur>/subtle` (hover, ingedrukt) | 100 (200, 300) | 200 (300, 400) | 950 (900, 800) | 900 (800, 700) |
| `surface/<signaal>/subtle` | 100 | 200 | 950 | 900 |
| `text/low` | slate/700 | slate/800 | slate/300 | gelijk |
| `icon/sky` | sky/600 | sky/700 | sky/300 | gelijk |

`text/low` en `icon/sky` schuiven mee omdat ze op slate/300 anders onder 4,5:1 en 3:1 komen. Ingedrukt van de
secundaire knop blijft sky/400: sky/500 haalt met de tekst erop 4,3:1.

`surface/neutral/subtle` stond hier ook; die is weg ([besluit 010](010-neutrale-vlakken.md)).

Wit (`surface/default`) helpt niet: wit op de pagina is 1,06:1.

## Hoe

- Code: `data-ondergrond="subtle"` op het vlak; de waarden gelden voor alles erin, niet voor het vlak zelf.
  `data-ondergrond="default"` zet het terug. De build maakt de CSS uit `figma/variables.json`, waar een token met vier
  waarden op subtle anders is.
- Figma: de mode van de verzameling semantic op het frame.
- `npm run check` toetst alle paren in de vier modes; `npm run vergelijk` vergelijkt alle vier met Figma.

De pagina zelf staat sinds [besluit 012](012-pagina-op-subtle.md) standaard op subtle.
