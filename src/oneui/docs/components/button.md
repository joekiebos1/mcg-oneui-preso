# Button

**Mendix-route:** Atlas. Mendix-knop (action button), gestijld via het thema: btn-primary, btn-secondary enzovoort.

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
stappen af: **secondary**, dan **outline**, dan **ghost**. Naar een andere pagina gaan is een link, geen knop.

## Specificatie

Alle waarden zijn tokens (`dist/tokens.css`); gebruik geen losse kleuren of maten.

### Maten

| maat | hoogte | padding links/rechts | tekststijl | icoon |
|---|---|---|---|---|
| sm | `size/xl` (36) | `spacing/lg` (12) | label/M | `size/2xs` (16) |
| md (standaard) | `size/2xl` (40) | `spacing/xl` (16) | label/M | `size/xs` (20) |
| lg | `size/3xl` (48) | `spacing/3xl` (24) | label/L (18) | `size/sm` (24) |

Hoeken `radius/full`. Ruimte tussen icoon en label `spacing/md` (8). Rand `border/thin`.

### Kleuren per type en state

| type | vlak | hover | ingedrukt | rand | label en icoon |
|---|---|---|---|---|---|
| primary | `surface/action/bold` | `…/bold-hover` | `…/bold-pressed` | — | `text/on-action/bold` |
| secondary | `surface/secondary/bold` | `…/bold-hover` | `…/bold-pressed` | — | `text/on-bold/secondary` |
| outline | — | `surface/secondary/subtle` | `surface/secondary/subtle-pressed` | `stroke/action/subtle` | `text/high` |
| ghost | — | `surface/secondary/subtle` | `surface/secondary/subtle-pressed` | — | `text/high` |

In MCG is primary magenta met wit en secondary donker sky (sky/700) met wit; donker thema via dezelfde tokens.

- **Uitgeschakeld:** vlak `surface/disabled`, label `text/disabled`; outline en ghost zonder vlak, outline met rand
  `stroke/disabled`. Geen doorschijnendheid.
- **Focus:** een ring buiten de knop, `border/thick` breed en `spacing/2xs` los van de knop, alleen bij toetsenbordfocus.
  Kleur: `interaction/focusRing` bij primary, `stroke/action/subtle` bij de rest. De knop verschuift niet.
- **Laden:** het label blijft onzichtbaar staan (de knop houdt zijn breedte), een spinner in het midden. De knop is dan
  niet klikbaar en meldt aan schermlezers dat hij bezig is.

### Iconen

Optioneel vóór en/of na het label. Het icoon heeft de kleur van het label en groeit mee met de maat. Een icoon na het
label (chevron) suggereert navigatie. In Mendix kan een knop maar één icoon hebben; twee iconen is een voorstel.

### Toegankelijkheid

- Een echte `<button>`, standaard type "button" (verstuurt geen formulier).
- Contrast label/vlak minstens 4,5:1 in elke state, licht en donker (gecontroleerd door `npm run check`).
- Een knop met alleen een icoon is een Icon Button, met een toegankelijk label.

## Do's en don'ts

- Doe: een werkwoord als label ("Opslaan", "Verder").
- Doe: één primary per scherm.
- Niet: twee primaries naast elkaar, of een primary voor annuleren.
- Niet: kleuren of maten aanpassen per knop; vraag een nieuwe variant aan.

## Referentie

React: `react/src/Button.tsx` en `Button.css`. Mendix (startpunt): `dist/mendix/`.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
