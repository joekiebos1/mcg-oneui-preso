# Progress ring

<!-- handmatig -->
## Wanneer gebruiken

Voortgang als ring, waar weinig ruimte is of als het getal in het midden de hoofdzaak is ("3/7"). Zelfde kleuren als
de [Progress bar](progress-bar.md).

## Specificatie

| maat | doorsnee | midden |
|---|---|---|
| sm | `size/2xl` (40) | leeg |
| md (standaard) | `size/5xl` (64) | label/M |
| lg | 2 × `size/3xl` (96) | heading/M |

De baan in `surface/sunken`, de vulling in `surface/action/primary` met ronde uiteinden; hij begint bovenaan en
loopt met de klok mee. De lijn is 12 % van de doorsnee (sm 16 %).

## React

```tsx
import { ProgressRing } from "@mcg/oneui-react";

<ProgressRing aria-label="Lessen gedaan" value={3} max={7} size="lg">3/7</ProgressRing>
<ProgressRing aria-label="Week 2" value={71} />
```

| prop | waarden | standaard |
|---|---|---|
| `value`, `max` | getallen | `max` 100 |
| `children` | wat er in het midden staat; `false` verbergt het | het percentage (md, lg) |
| `size` | `sm` · `md` · `lg` | `md` |
| `aria-label` | waar de voortgang over gaat (verplicht) | — |

## Referentie

React: `react/src/Progress.tsx` en `Progress.css`. Nog niet in Figma.
<!-- /handmatig -->

_Alleen in code. Deze pagina staat in `scripts/docs.mjs` bij CODE._
