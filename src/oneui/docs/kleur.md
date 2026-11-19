# Kleur

Vier merkkleuren, elk een ladder van 50 tot 950, plus slate als neutraal en drie signaalkleuren.
Elke stap heeft in elke ladder dezelfde lichtheid. Daardoor gedraagt bijvoorbeeld `sky/600` zich qua contrast
hetzelfde als `magenta/600`. De stappen zijn klein aan de lichte kant en worden geleidelijk groter; vanaf 500 zijn ze
gelijk ([besluit 011](../besluiten/011-ladder-200-300.md)).

| Ladder | Gebruik |
|---|---|
| magenta | merkmomenten |
| sky | de interface: knoppen, focus en wat actief is (via action), rustige vlakken, links |
| amber | warmte, uitlichten |
| violet | tweede accent: dromen, verdieping, een vierde hoofdstukkleur |
| slate | neutraal: tekst, randen, achtergronden (in de tokens `neutral`) |
| sky | ook informatieve meldingen (`informative`) |
| green, red, orange | signalen: `positive`, `negative`, `warning` |

Amber loopt van geel (zon) via goud naar terracotta.

## Lagen

1. **primitives**: de ladders zelf (`sky/400`).
2. **semantic**: wat componenten gebruiken (`surface/…`, `text/…`, `icon/…`, `stroke/…`), in licht en donker. Het
   wijst direct naar de ladders; er is geen brand-laag ([besluit 006](../besluiten/006-geen-brand-laag.md)).

Lijnen zijn er nog twee ([besluit 007](../besluiten/007-twee-lijnen.md)): `stroke/neutral/low` voor een scheidingslijn of
een lijn in tekst, `stroke/neutral/medium` voor een vorm die 3:1 moet halen. Componenten hebben geen randen
([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)); focus is `interaction/focusRing`.

De semantiek heeft twee soorten namen:

- **functie**, waar de naam iets zegt over wat het doet: `action/primary` en `action/secondary` (knoppen),
  `interaction/focusRing`, de signalen (`positive`, `negative`, `warning`, `informative`) en de neutrale opbouw
  (`surface/page`, `surface/sunken`, `text/high` …). Neutraal heeft geen subtle: een licht grijs vlak is
  `surface/page` of `surface/sunken` ([besluit 010](../besluiten/010-neutrale-vlakken.md));
- **kleur**, waar het om de kleur zelf gaat: `surface/sky/subtle`, `surface/magenta/bold`, `icon/amber`,
  `text/on-bold/violet`. Elke kleur heeft subtle (licht), bold (fel) en deep (donker).

`data-theme="dark"` zet het donkere thema aan.

## Ondergrond: op subtle

Subtle is stap 100, net als de pagina (slate/100). Een element op zo'n vlak dat zelf ook maar één stap verschilt, valt
weg: de secundaire knop (sky/200), een veld (slate/200), een actief menu-item. Daarom heeft de semantiek vier modes:
licht, donker, **licht op subtle** en **donker op subtle** ([besluit 009](../besluiten/009-ondergrond-subtle.md)).

Op subtle schuift alles één stap op: `action/secondary` wordt sky/300, `surface/sunken` slate/300, de subtle vlakken 200,
`text/low` slate/800, `action/neutral` slate/300. Wat al genoeg verschilt (de primaire knop, tekst) blijft gelijk.

- **De pagina staat standaard op subtle** ([besluit 012](../besluiten/012-pagina-op-subtle.md)): alles in `body` schuift
  vanzelf op. Een witte kaart of een wit paneel op de pagina krijgt `data-ondergrond="default"`; Dialog en een witte
  List doen dat zelf.
- **Code:** zet `data-ondergrond="subtle"` op een ander vlak van stap 100 (een subtle paneel in een witte kaart). Het
  vlak zelf houdt zijn kleur; alles erin schuift op.
- **Figma:** zet op het frame de mode van de verzameling semantic op *Light on subtle* (of *Dark on subtle*): op elk
  frame met `surface/page`, en op een subtle vlak. Een witte kaart erin zet je terug op *Light*.
- `npm run check` toetst alle tekst- en iconenparen in de vier modes.

Een keuze die uit staat (Checkbox, Radio, de baan van Toggle) is `surface/action/neutral`, net als de neutrale knop. Op
subtle schuift die mee naar slate/300. Hij haalt geen 3:1: een uitzondering voor nu ([besluit 008](../besluiten/008-wcag-2-2-aa.md)).

## Deep: de donkere merkkleur

`surface/magenta/deep`, `surface/sky/deep`, `surface/amber/deep` en `surface/violet/deep` zijn stap 950 van de eigen ladder. Gebruik
ze als donkere achtergrond of als contrastkleur naast bold. Ze zijn in licht en donker thema gelijk.

| | deep | bold ernaast | wit erop |
|---|---|---|---|
| magenta | magenta/950 | 3,2:1 | 14,8:1 |
| sky | sky/950 | 7,6:1 | 14,6:1 |
| amber | amber/950 | 7,6:1 | 14,8:1 |
| violet | violet/950 | 3,2:1 | 15,1:1 |

Tekst erop is `text/on-deep` (wit), een icoon `icon/on-deep` (wit).
Waarom 950: alleen die stap haalt in alle drie de ladders 3:1 tegen bold. Magenta bold is zelf al donker (600);
met 900 kwam magenta op 2,5:1.

## Violet

De ladder is gemaakt vanuit het paars van de illustraties (`#6B4BB5` is `violet/700`): per stap dezelfde lichtheid als
de andere ladders (OKLCH), tint 294–298, en hetzelfde verloop in verzadiging als magenta: naar de donkere stappen toe
minder verzadigd. Bold is stap 600, zoals bij magenta, met witte tekst (4,8:1). Bold naast deep haalt 3,2:1: genoeg
voor grote tekst.

## Illustraties

Illustraties krijgen geen eigen tokens. Ze gebruiken de ladders direct (primitives); welke stap voor de grond, het
zachte vlak en de lijn staat in de illustratieregels van Myndlet. De grond is stap 950, gelijk aan deep, zodat een
illustratie naadloos aansluit op een slide met `surface/<kleur>/deep`.

## Knoppen (action)

Knoppen hebben hun eigen rol: `surface/action/primary` is sky/700 met wit (hover 800, ingedrukt 900),
`surface/action/secondary` is sky/200 met sky/950 (hover 300, ingedrukt 400), en `surface/action/neutral` is slate/200
met `text/high` (hover 300, ingedrukt 400): de neutrale knop, en een Checkbox, Radio of Toggle die uit staat. Een
knop zonder vlak (ghost, Nav item) krijgt bij hover `surface/action/neutral` en ingedrukt `surface/action/neutral-hover`.
Dat staat los van subtle, bold en deep:
`surface/sky/bold` blijft sky/400, voor vlakken en accenten. `interaction/focusRing` is sky/600
(donker sky/400).

## Regels

- **Gebruik semantische tokens.** Primitives alleen in illustraties, slides en de definitie van tokens zelf.
- **Tekst op een vol merkvlak**: wit op magenta en violet, antraciet (`slate/950`) op sky en amber. De tokens
  `text/on-bold/*` regelen dit.
- **Eén ding in de contrastkleur.** Op een gekleurd vlak krijgt alleen het belangrijkste element de diepe tint van
  dezelfde familie: `sky/900` op sky, `amber/700` op amber.
- **Contrast**: tekst minstens 4,5:1, iconen en randen 3:1. `npm run check` controleert alle tekstparen, in licht
  en donker.

## Slides

Inhoudsslides staan op `surface/page`. Alleen de hoofdstukslides en het linkerpaneel van de paneelslides krijgen kleur: de deep-tint als
achtergrond, met bold voor het nummer of de eyebrow.

| Familie | Achtergrond | Nummer, eyebrow | Titel | Ondertitel |
|---|---|---|---|---|
| magenta | magenta/950 | surface/magenta/bold | wit | magenta/200 |
| sky | sky/950 | surface/sky/bold | wit | sky/200 |
| amber | amber/950 | surface/amber/bold | wit | amber/200 |
| violet | violet/950 | surface/violet/bold | wit | violet/200 |

Magenta bold op magenta deep haalt 3,2:1. Dat is genoeg voor grote tekst (WCAG: vanaf 24 px, of 18,7 px vet), dus voor het
hoofdstuknummer en de eyebrow (in de slides 24 px). Kleiner dan 24 px: geen bold op magenta deep.
