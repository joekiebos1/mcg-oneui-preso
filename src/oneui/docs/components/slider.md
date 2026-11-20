# Slider

<!-- handmatig -->
## Wanneer gebruiken

Een waarde op een schaal kiezen: hoe onrustig, hoeveel uur. Een dikke baan, een duim die groot genoeg is voor een
duim, en de waarde erboven in een pil ([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)).

## Do's en don'ts

- Doe: woorden aan de uiteinden als de getallen niets zeggen ("Heel rustig", "Heel onrustig").
- Niet: een slider voor een precieze waarde; gebruik dan een Input van type number.

## Specificatie

| deel | token |
|---|---|
| baan | `spacing/md` (8) dik, `radius/full`, `surface/sunken`; gevuld tot de duim in `surface/action/primary` |
| duim | `size/md` (28), een rand van `spacing/sm` in `surface/default` om een stip in `surface/action/primary`, zachte schaduw |
| waarde | een pil in `surface/inverse` met `text/on-inverse`, label/S, boven het midden van de duim |
| label | label/M, `text/high` |
| schaal | body/XS, `text/medium`, links en rechts onder de baan |
| uitgeschakeld | het component op 40 % ([besluit 013](../besluiten/013-uitgeschakeld-gedimd.md)) |

Focus alleen bij het toetsenbord: de ring om de duim.

## React

```tsx
import { Slider } from "@mcg/oneui-react";

<Slider label="Hoe onrustig voel je je?" min={0} max={10} defaultValue={6}
  minLabel="Heel rustig" maxLabel="Heel onrustig" onChange={zet} />
```

| prop | waarden | standaard |
|---|---|---|
| `value` of `defaultValue` | getal | `min` |
| `min`, `max`, `step` | getallen | 0, 100, 1 |
| `onChange` | `(value) => void` | — |
| `label`, `minLabel`, `maxLabel` | tekst | `min` en `max` |
| `showValue` | de pil boven de duim | `true` |
| `format` | `(v) => tekst`, ook voor schermlezers | — |

## Toegankelijkheid

Een `<input type="range">`: pijltjes, Page Up/Down, Home en End werken vanzelf. Met `format` hoort een schermlezer
de tekst ("7 uur") via `aria-valuetext`.

## Referentie

React: `react/src/Slider.tsx` en `Slider.css`. Nog niet in Figma.
<!-- /handmatig -->

_Alleen in code. Deze pagina staat in `scripts/docs.mjs` bij CODE._
