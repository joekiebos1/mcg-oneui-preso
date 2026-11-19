# Button

## Varianten

| Eigenschap | Waarden |
|---|---|
| type | primary, secondary, outline, ghost |
| size | sm, md, lg |
| state | default, hover, pressed, focus, disabled, loading |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| Icon left | aan/uit |
| Icon right | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een knop start een actie. Eén **primary** per scherm: de actie die er het meest toe doet. Alle andere acties
stappen af: **secondary**, dan **neutral**, dan **ghost**. Een knop is altijd een vlak of kaal, nooit een rand
([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)). Naar een andere pagina gaan is een link, geen knop.

## Specificatie

Alle waarden zijn tokens (`dist/tokens.css`); gebruik geen losse kleuren of maten.

### Maten

| maat | hoogte | padding links/rechts | tekststijl | icoon |
|---|---|---|---|---|
| sm | `size/xl` (36) | `spacing/xl` (16) | label/M | `size/2xs` (16) |
| md (standaard) | `size/2xl` (40) | `spacing/2xl` (20) | label/M | `size/xs` (20) |
| lg | `size/3xl` (48) | `spacing/3xl` (24) | label/L (18) | `size/sm` (24) |

Hoeken `radius/full`. Ruimte tussen icoon en label `spacing/md` (8). Geen rand.

### Kleuren per type en state

| type | vlak | hover | ingedrukt | label en icoon |
|---|---|---|---|---|
| primary | `surface/action/primary` | `…/primary-hover` | `…/primary-pressed` | `text/on-action/primary` |
| secondary | `surface/action/secondary` | `…/secondary-hover` | `…/secondary-pressed` | `text/on-action/secondary` |
| neutral | `surface/sunken` | tussen sunken en `surface/neutral/subtle-pressed` | `surface/neutral/subtle-pressed` | `text/high` |
| ghost | — | `surface/neutral/subtle-hover` | `surface/neutral/subtle-pressed` | `text/high` |

`outline` (Figma) toont in code als neutral; de prop werkt nog, maar is verouderd.

In MCG is primary sky/700 met wit en secondary sky/200 met sky/950; hover en ingedrukt gaan telkens één stap dieper. Donker thema via dezelfde tokens.

- **Ingedrukt:** de knop veert in tot 96 % (zonder beweging als de gebruiker dat vraagt).
- **Uitgeschakeld:** vlak `surface/disabled`, label `text/disabled`; ghost zonder vlak. Geen doorschijnendheid.
- **Focus:** een ring buiten de knop, `border/thick` breed en `spacing/2xs` los van de knop, alleen bij toetsenbordfocus.
  Kleur: `interaction/focusRing` (sky 600, in donker sky 400), voor elk type. De knop verschuift niet.
- **Laden:** het label blijft onzichtbaar staan (de knop houdt zijn breedte), een spinner in het midden. De knop is dan
  niet klikbaar en meldt aan schermlezers dat hij bezig is.

### Iconen

Optioneel vóór en/of na het label. Het icoon heeft de kleur van het label en groeit mee met de maat. Een icoon na het
label (chevron) suggereert navigatie.

### Toegankelijkheid

- Een echte `<button>`, standaard type "button" (verstuurt geen formulier).
- Contrast label/vlak minstens 4,5:1 in elke state, licht en donker (gecontroleerd door `npm run check`).
- Een knop met alleen een icoon is een Icon Button, met een toegankelijk label.

## Do's en don'ts

- Doe: een werkwoord als label ("Opslaan", "Verder").
- Doe: één primary per scherm.
- Niet: twee primaries naast elkaar, of een primary voor annuleren.
- Niet: een rand om een knop; kies neutral.
- Niet: kleuren of maten aanpassen per knop; vraag een nieuwe variant aan.

## Referentie

React: `react/src/Button.tsx` en `Button.css`.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
