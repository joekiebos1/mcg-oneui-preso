# Select

## Varianten

| Eigenschap | Waarden |
|---|---|
| size | md, sm |
| state | default, hover, focus, filled, open, error, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| Value | tekst |
| Message | tekst |
| label | aan/uit |
| hint | aan/uit |
| hint icon | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een Select kiest één optie uit een langere lijst. Bij minder dan zes opties is Radio makkelijker te overzien.
(Figma: DOC — Select)

## Do's en don'ts

_Nog in te vullen._

## Specificatie

Het vak is hetzelfde als bij Input.

### Het vak

| maat | hoogte | padding boven/onder | padding links/rechts | hoeken |
|---|---|---|---|---|
| md (standaard) | 48 | `spacing/lg` | `spacing/xl` | `radius/lg` |
| sm | 40 | `spacing/md` | `spacing/lg` | `radius/md` |

Vlak `surface/default`. Rand `border/thin` in `stroke/neutral/low`, hover `stroke/neutral/high`, focus 2 breed in
`stroke/sky/medium` (het vak verschuift niet). Tekst label/M in `text/high`, placeholder `text/low`. Iconen
`size/xs` in `icon/medium`, `spacing/md` van de tekst.

Rechts een chevron omlaag (`size/xs`, `icon/medium`). Niets gekozen: de placeholder in `text/low`.

De state **open** in Figma is in React de lijst van de browser zelf (een native `<select>`).

### Label, hulptekst en fout (gedeeld met Select en Editor)

| deel | token |
|---|---|
| label | label/M, `text/high` |
| hulptekst | body/XS, `text/medium` |
| ruimte tussen label, vak en hulptekst | `spacing/xs` |
| fout | vak `surface/negative/subtle`, rand `stroke/negative/medium`; de melding vervangt de hulptekst |
| uitgeschakeld | vak `surface/disabled`, rand `stroke/disabled`, tekst `text/disabled` |

## React

```tsx
import { Select } from "@mcg/oneui-react";

<Select label="Locatie" placeholder="Kies een optie" hint="Waar vindt de afspraak plaats?"
  options={[{ value: "utrecht", label: "Utrecht" }, { value: "amersfoort", label: "Amersfoort" }]}
  onChange={(v) => zet(v)} />
```

| prop | waarden | standaard |
|---|---|---|
| `options` | `{ value, label, disabled? }[]`, of `<option>`-children | — |
| `placeholder` | tekst als er niets gekozen is | — |
| `size` | `md` (48) · `sm` (40) | `md` |
| `label`, `hint`, `error` | tekst | — |
| `onChange` | `(value) => void` | — |

## Toegankelijkheid

- Een echte `<select>`: toetsenbord, schermlezer en de lijst op een telefoon werken zoals de gebruiker gewend is.
- Label, hulptekst en fout zoals bij Input.

## Referentie

React: `react/src/Select.tsx`, `Select.css` en `Veld.css`. Figma: DS Components › Select.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
