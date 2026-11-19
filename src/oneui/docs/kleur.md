# Kleur

Vier merkkleuren, elk een ladder van 50 tot 950, plus slate als neutraal en drie signaalkleuren.
Elke stap heeft in elke ladder dezelfde lichtheid. Daardoor gedraagt bijvoorbeeld `sky/600` zich qua contrast
hetzelfde als `magenta/600`.

| Rol | Ladder | Gebruik |
|---|---|---|
| primary | magenta | focus, merkmomenten (knoppen hebben een eigen rol: action) |
| secondary | sky | rustige vlakken, links, ondersteunende accenten |
| accent | amber | warmte, uitlichten |
| accent-2 | violet | tweede accent: dromen, verdieping, een vierde hoofdstukkleur |
| neutral | slate | tekst, randen, achtergronden |
| informative | sky | informatieve meldingen |
| positive, negative, warning | green, red, orange | signalen |

Sky is dus zowel secondary als informative. Amber loopt van geel (zon) via goud naar terracotta.

## Lagen

1. **primitives**: de ladders zelf (`sky/400`).
2. **brand**: per rol een ladder (`brand/secondary/400`), met twee modes: **Classic** en **Round**. De kleuren zijn
   in beide gelijk; ze verschillen alleen in typografie. Round gebruikt Google Sans Flex Rond (zie `figma/fonts/`).
3. **semantic**: wat componenten gebruiken (`surface/…`, `text/…`, `icon/…`, `stroke/…`), in licht en donker.

In code is Classic de standaard; `data-brand="round"` zet Round aan. `data-theme="dark"` zet het donkere thema aan.

## Deep: de donkere merkkleur

`surface/primary/deep`, `surface/secondary/deep`, `surface/accent/deep` en `surface/accent-2/deep` zijn stap 950 van de eigen ladder. Gebruik
ze als donkere achtergrond of als contrastkleur naast bold. Ze zijn in licht en donker thema gelijk.

| | deep | bold ernaast | wit erop |
|---|---|---|---|
| primary | magenta/950 | 3,2:1 | 14,8:1 |
| secondary | sky/950 | 7,6:1 | 14,6:1 |
| accent | amber/950 | 7,6:1 | 14,8:1 |
| accent-2 | violet/950 | 3,2:1 | 15,1:1 |

Tekst erop is `text/on-deep` (wit), een icoon `icon/on-deep` (wit).
Waarom 950: alleen die stap haalt in alle drie de ladders 3:1 tegen bold. Magenta bold is zelf al donker (600);
met 900 kwam magenta op 2,5:1.

## Violet (accent-2)

De ladder is gemaakt vanuit het paars van de illustraties (`#6B4BB5` is `violet/700`): per stap dezelfde lichtheid als
de andere ladders (OKLCH), tint 294–298, en hetzelfde verloop in verzadiging als magenta: naar de donkere stappen toe
minder verzadigd. Bold is stap 600, zoals bij primary, met witte tekst (4,8:1). Bold naast deep haalt 3,2:1: genoeg
voor grote tekst.

## Illustraties

Illustraties krijgen geen eigen tokens. Ze gebruiken de ladders direct (primitives); welke stap voor de grond, het
zachte vlak en de lijn staat in de illustratieregels van Myndlet. De grond is stap 950, gelijk aan deep, zodat een
illustratie naadloos aansluit op een slide met `surface/<rol>/deep`.

## Knoppen (action)

`surface/action/*`, `text/on-action/*` en `stroke/action/secondary` lopen via `brand/action/light|dark/*`.
Knoppen hebben hun eigen rol: `action/primary` is sky/700 met wit (hover 800, ingedrukt 900), `action/secondary` is sky/200 met sky/950 (hover 300, ingedrukt 400). Dat staat los van subtle, bold en deep van de merkkleuren: sky bold blijft sky/400, voor vlakken en accenten. De outline-rand is sky; in Classic en Round gelijk.

## Regels

- **Gebruik semantische tokens.** Primitives alleen in illustraties, slides en de definitie van tokens zelf.
- **Tekst op een vol merkvlak**: wit op magenta en violet, antraciet (`slate/950`) op sky en amber. De tokens
  `text/on-bold/*` regelen dit.
- **Eén ding in de contrastkleur.** Op een gekleurd vlak krijgt alleen het belangrijkste element de diepe tint van
  dezelfde familie: `sky/900` op sky, `amber/700` op amber.
- **Contrast**: tekst minstens 4,5:1, iconen en randen 3:1. `npm run check` controleert alle tekstparen voor beide
  brands, in licht en donker.

## Slides

Inhoudsslides staan op `surface/page`. Alleen de hoofdstukslides en het linkerpaneel van de paneelslides krijgen kleur: de deep-tint als
achtergrond, met bold voor het nummer of de eyebrow.

| Familie | Achtergrond | Nummer, eyebrow | Titel | Ondertitel |
|---|---|---|---|---|
| magenta | magenta/950 | surface/primary/bold | wit | magenta/200 |
| sky | sky/950 | surface/secondary/bold | wit | sky/200 |
| amber | amber/950 | surface/accent/bold | wit | amber/200 |
| violet | violet/950 | surface/accent-2/bold | wit | violet/200 |

Magenta bold op magenta deep haalt 3,2:1. Dat is genoeg voor grote tekst (WCAG: vanaf 24 px, of 18,7 px vet), dus voor het
hoofdstuknummer en de eyebrow (in de slides 24 px). Kleiner dan 24 px: geen bold op magenta deep.
