# 004 — Rond: vlakken en ruimte, geen randen

Datum: 2026-11-19 · Status: besloten

## Besluit

De componenten volgen de stijl Rond, zoals in de schetsen die zijn goedgekeurd:

- **Geen randen en geen scheidingslijnen.** Een component is een vlak of is kaal. Wat bij elkaar hoort, scheidt
  ruimte, geen lijn.
- **Pillen en cirkels.** Knoppen, zoekvelden, menu-items en tellers zijn `radius/full`. Vlakken krijgen een grote
  afronding: velden `radius/2xl`, lijstitems `radius/3xl`, dialogen `radius/4xl`.
- **Outline wordt neutral.** Het type outline van Button en Icon Button toont in code als neutral: een grijs vlak
  (`surface/sunken`) met `text/high`. `outline` blijft werken, maar is verouderd.
- **Een veld is een gevuld vlak.** `surface/sunken` zonder rand; hover een stap dieper; bij focus wit met een
  zachte schaduw, los van de pagina; bij een fout `surface/negative/subtle`.
- **Dik en rond.** Toggle, voortgang en slider hebben dikke banen met ronde uiteinden en een grote knop of duim.
- **Ruim binnenwerk.** Knoppen hebben meer ruimte naast het label; label en hint van een veld staan in lijn met de
  tekst in het vak.
- **Kleur.** De interface gebruikt alleen sky en neutraal: action/primary (sky 700) en action/secondary (sky 200) voor
  wat je aanklikt of aanzet, `surface/sky/subtle` voor wat actief is. Merkkleuren alleen in iconen (bijvoorbeeld
  de cirkel vooraan in een lijstitem); signaalkleuren voor meldingen.
- **Uitzondering: een keuze die uit staat.** Checkbox, Radio en Toggle hebben uit een rand van `border/thick` in
  `stroke/neutral/medium`; aan zijn ze een vol vlak in action/primary. Zonder rand haalt de lege stand geen 3:1
  (WCAG 2.2 AA, 1.4.11, [besluit 008](008-wcag-2-2-aa.md)). Uit heeft een rand, aan is vol: voor alle drie hetzelfde
  (eigenaar 2026-11-19).
- **Focus** alleen bij het toetsenbord: een ring van `border/thick` in `interaction/focusRing`, `spacing/2xs` los.

## Waarom

Randen en lijnen maken een scherm druk en technisch. Vlakken met ruimte ertussen lezen rustiger, passen bij de
ronde letter en zijn op een telefoon groter om aan te tikken.

## Gevolgen

- Code: Button, Icon Button, Input (en Select, dat hetzelfde vak deelt), Toggle, Dialog, List, Nav item,
  Progress bar, Progress ring en Slider in `react/src`.
- Figma: de componenten in DS Components volgen nog; tot dan wijkt Figma hier af van code.
- Tabs staat nog niet in Rond.
