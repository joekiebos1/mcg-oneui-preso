# Progress bar

<!-- handmatig -->
## Wanneer gebruiken

Hoe ver iemand is: in een programma, een week, een upload. Een dikke baan met ronde uiteinden
([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)). Dezelfde voortgang als ring: [Progress ring](progress-ring.md).

## Do's en don'ts

- Doe: zeg waar de voortgang over gaat ("Les 3 van 7") en hoe ver ("43%" of "5 van 7 dagen").
- Niet: een balk voor iets dat geen einde heeft.

## Specificatie

| deel | token |
|---|---|
| baan | md `spacing/md` (8) dik, lg `spacing/lg` (12); `radius/full`, `surface/sunken` |
| vulling | `surface/action/primary` (sky 700), `radius/full`; schuift in 320 ms |
| kop | label/M: links `text/high`, rechts de waarde in `text/medium`; `spacing/md` boven de baan |

## React

```tsx
import { ProgressBar } from "@mcg/oneui-react";

<ProgressBar label="Les 3 van 7" value={3} max={7} />
<ProgressBar label="Week 2: slaapritme" value={5} max={7} valueLabel="5 van 7 dagen" size="lg" />
```

| prop | waarden | standaard |
|---|---|---|
| `value`, `max` | getallen | `max` 100 |
| `label` | tekst | — |
| `valueLabel` | tekst; `false` verbergt het | het percentage |
| `size` | `md` · `lg` | `md` |

## Toegankelijkheid

`role="progressbar"` met `aria-valuenow`, `aria-valuemin` en `aria-valuemax`; het label is de naam.

## Referentie

React: `react/src/Progress.tsx` en `Progress.css`. Nog niet in Figma.
<!-- /handmatig -->

_Alleen in code. Deze pagina staat in `scripts/docs.mjs` bij CODE._
