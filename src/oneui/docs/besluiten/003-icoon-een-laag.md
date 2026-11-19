# 003 — Een icoon is één laag

Datum: 2026-10-22 · Status: besloten · Vervangt [001](001-icoonkleur.md)

## Besluit

Elk icoon in DS Icons is één platte vorm met de naam `icon`, zonder lijnen, met één vulling gekoppeld aan
`icon/high`. Het icoonvlak zelf heeft geen vulling.

De kleur in een context zet je op die ene laag: de component of het scherm dat het icoon gebruikt, overschrijft de
vulling van `icon` met een semantisch icoontoken.

| ondergrond | token |
|---|---|
| licht, standaard | icon/high (staat er al) |
| secundair | icon/medium |
| inactief, bijvoorbeeld een tab die niet geselecteerd is | icon/low |
| vol merkvlak (bold, deep) | icon/on-bold |
| donker vlak of scrim | icon/on-inverse |
| betekenis | icon/magenta, positive, negative, warning |
| uitgeschakeld | icon/disabled |

In code is dit `currentColor`: de component zet `color`, het icoon volgt.

## Waarom

- Omdat elk icoon precies één laag met dezelfde naam heeft, blijft een kleuroverride staan als je het icoon wisselt.
  Getest: kleur gezet, drie keer gewisseld, kleur bleef volledig.
- Het past bij de rest van het systeem: iconen gebruiken de gewone semantische tokens (`icon/high`, `icon/medium`,
  `icon/low`, `icon/magenta`, `icon/on-deep`, …). Geen aparte verzameling; Foundations heeft alleen primitives, brand en
  semantic. Licht en donker regelt de semantische laag.
- Zo werken de grote Figma-bibliotheken: Material Symbols, Atlassian, Untitled UI.

## Regels

- **Nooit een vulling op het icoonvlak.**
- **Kleur alleen op de laag `icon`, en alleen met een `icon/…`-token.** Geen primitives, geen tekst- of lijntokens.
- Een nieuw icoon: lijnen omzetten naar contouren en alles samenvoegen tot één laag `icon`, schaal-constraints aan.
- **Uitzondering: iconen met doorschijnende delen** (de progress-circles, loader, chat-bubble-writing,
  message-writing, msg-writing, user-short-hair-4) hebben een laag per dekking: `icon` (100%) en bijvoorbeeld
  `icon-30` (laagdekking 30%), alle lagen op hetzelfde token. Kleur aanpassen: via Selection colors in één keer.
- De lijndikte ligt vast (1,75). Het archief met lijnen (Icons — 1,5) blijft de bron om van te tekenen.

## Uitvoering

- 2026-10-22: alle 4.131 iconen plus `ic_like` omgezet. Per icoon is de vorm vergeleken met het origineel; twee
  kleine afwijkingen apart nagekeken (hair-dryer 0,38 px, phone end met gedraaide groep).
- 2026-10-22: de verzameling `icon-context` (met `icon/current`) en `icon/on-action/bold|subtle` uit Foundations
  verwijderd. `icon/on-action` werd nergens gebruikt; `icon/current` alleen door de oude versie van Icons.
- 2026-10-23: bij het platslaan was de dekking van 17 iconen verloren gegaan (alle progress-circles werden een volle
  cirkel). Herbouwd uit het archief met een laag per dekking; omvang per icoon gelijk aan het origineel.
- 2026-10-23: dubbelen verwijderd: 923 exemplaren met dezelfde naam en dezelfde vorm (791 vormgelijk, 79
  pixelgelijk, 53 alleen verschillend in randpixels, visueel gecontroleerd). Steeds het exemplaar gehouden dat
  Components of Myndlet gebruikt; posities ongemoeid (gaten in het raster blijven). De set telt 3.208 iconen, elke
  naam één keer.
- 2026-10-23: Components bijgewerkt. Elk icoon kreeg de kleur van zijn oude mode op de laag `icon`; de oude modes
  zijn gewist. Gecorrigeerd: iconen op sky (secondary bold, ook checkbox en icon tabs) naar `icon/high`, iconen in
  focus/open en in de horizontale Nav item naar `icon/sky` (de oude mode heette daar 'secondary'), Avatar naar
  `icon/magenta` (foto: `icon/medium`). 32 verweesde iconen in Editor vervangen door DS Icons. DOC — Icon beschrijft
  het nieuwe systeem. Open: in donker thema wordt `icon/high` licht; op sky-vlakken past dan geen bestaand icoontoken.
- Daarna: het Myndlet-werkbestand.
