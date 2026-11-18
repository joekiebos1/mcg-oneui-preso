# 001 — Icoonkleur komt uit de context

Datum: 2026-10-21 · Status: vervangen door [003](003-icoon-een-laag.md) op 2026-10-22

## Besluit

Een icoon heeft geen eigen kleur. Elk icoon is getekend in één token, `icon/current`. De kleur komt van de plek
waar het icoon staat: de ouder zet de mode van de verzameling `icon-context`.

| mode | wijst naar | gebruik |
|---|---|---|
| high | icon/high | standaard |
| medium | icon/medium | secundair |
| low | icon/low | inactief, bijvoorbeeld een tab die niet geselecteerd is |
| on-bold | icon/on-bold | op een vol merkvlak |
| on-inverse | icon/on-inverse | op surface/inverse |
| primary, positive, negative, warning | icon/… | betekenis |
| disabled | icon/disabled | uitgeschakeld |

In code is dit `currentColor`: het icoon erft `color` van zijn ouder. Figma en code werken dus hetzelfde.

## Waarom

- Eén icoon werkt in elke context. Niemand overschrijft de kleur per instantie, dus een icoonwissel of
  componentupdate breekt niets.
- Zo werken de grote systemen ook: het icoon kent zijn kleur niet, de component die het gebruikt wel.

## Regels

- **Nooit de kleur van een icoonpad overschrijven, en nooit een vulling op het icoonvlak.** Zet de
  `icon-context`-mode op de ouder (component of instantie). Een override blijft bij een icoonwissel op de eerste laag
  staan: het nieuwe icoon wordt dan half wit, half donker (gezien in de Myndlet-speler, 2026-10-22).
- Op een scrim of donker vlak: mode `on-inverse`. Op een vol merkvlak (bold, deep): mode `on-bold`.
- Een component kiest de mode per variant, bijvoorbeeld: tab actief = high, tab niet actief = low.
- Elke mode heet zoals het icoontoken dat hij gebruikt. Figma staat maximaal 10 modes toe; daarom zijn er geen modes
  voor secondary, accent en on-action.
- `icon-context` is zichtbaar en gepubliceerd, zodat je de mode ook in een ontwerpbestand kunt zetten.

## Aanleiding

Op 2026-10-21 bleek `icon-context` (toen verborgen) samen met `icon/low` en `icon/on-inverse` uit Foundations
verwijderd. Elk icoon in Icons en Components hing eraan. De verzameling is opnieuw opgebouwd. Een eerdere hernoeming van de modes (default → high, maar ook subtle →
accent en on-inverse → secondary, met dezelfde mode-id's) is rechtgezet: elke mode heet nu naar zijn token.
De koppelingen in Icons en Components worden per mode-id omgezet. Zie [002](002-tokens-verwijderen.md) voor hoe we dit voorkomen.
