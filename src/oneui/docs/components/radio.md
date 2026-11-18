# Radio

## Varianten

| Eigenschap | Waarden |
|---|---|
| checked | false, true |
| size | md, sm |
| state | default, hover, focus, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| label | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een Radio kiest één optie uit een set. Laat altijd alle opties zien; gebruik Select bij meer dan vijf.
(Figma: DOC — Radio)

## Do's en don'ts

_Nog in te vullen._

## Specificatie

Rond (`radius/full`).

| maat | vakje | teken |
|---|---|---|
| md (standaard) | `size/xs` (20) | stip `spacing/md` (8) |
| sm | `size/2xs` (16) | stip `spacing/sm` (6) |

Label label/M in `text/high`, `spacing/md` naast het vakje.

| state | vlak | rand |
|---|---|---|
| uit | `surface/default` | `border/thin`, `stroke/neutral/medium` |
| hover | — | `stroke/neutral/high` |
| aan | `surface/secondary/bold` | `stroke/secondary/medium` |
| focus (toetsenbord) | — | `border/thick`, `stroke/secondary/medium` |
| uitgeschakeld | `surface/disabled` | `stroke/disabled`; label `text/disabled` |

De stip in `icon/on-bold`, uitgeschakeld `icon/disabled`.

## React

```tsx
import { Radio } from "@mcg/oneui-react";

<fieldset>
  <legend>Voorkeur voor een afspraak</legend>
  <Radio name="moment" value="ochtend" label="Ochtend" checked={m === "ochtend"} onChange={setM} />
  <Radio name="moment" value="middag" label="Middag" checked={m === "middag"} onChange={setM} />
</fieldset>
```

| prop | waarden | standaard |
|---|---|---|
| `name` | verplicht; radio's met dezelfde naam horen bij elkaar | — |
| `value` | verplicht | — |
| `label` | tekst | — |
| `size` | `md` (20) · `sm` (16) | `md` |
| `onChange` | `(value) => void` | — |

## Toegankelijkheid

- Een echte `<input type="radio">`: de pijltjes gaan door de groep.
- Zet een groep in een `<fieldset>` met een `<legend>`, zodat de vraag bij de opties hoort.

## Referentie

React: `react/src/Radio.tsx` en `Keuze.css`. Figma: DS Components › Radio.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
