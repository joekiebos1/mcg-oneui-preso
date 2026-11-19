# Toggle

## Varianten

| Eigenschap | Waarden |
|---|---|
| State | active, disabled |
| checked | false, true |

<!-- handmatig -->
## Wanneer gebruiken

Een Toggle zet één instelling aan of uit. De wijziging geldt meteen. (Figma: DOC — Toggle)

## Do's en don'ts

_Nog in te vullen._

## Specificatie

| deel | token |
|---|---|
| baan | 56 breed (`size/4xl`), 32 hoog (`size/lg`), `radius/full`, `spacing/xs` binnenrand |
| knop | 24 (`size/sm`), `text/on-action/primary` (wit, ook in donker), zachte schaduw; geen teken erin |
| label | label/M, `text/high`, `spacing/lg` naast de baan (dezelfde stijl als Checkbox, Radio en het label boven een veld) |

| state | uit | aan |
|---|---|---|
| actief | `surface/control/off` (3:1, besluit 008) | `surface/action/primary` (sky 700) |
| hover | een stap dieper | `surface/action/primary-hover` |
| uitgeschakeld | `surface/disabled` | `surface/action/primary` op 35 % |
| focus (toetsenbord) | ring `border/thick` in `interaction/focusRing`, `spacing/2xs` los | zelfde |

De knop schuift in 240 ms met een kleine veer; zonder beweging als de gebruiker dat vraagt (`prefers-reduced-motion`).

## React

```tsx
import { Toggle } from "@mcg/oneui-react";

<Toggle label="Meldingen" checked={aan} onChange={setAan} />
```

| prop | waarden | standaard |
|---|---|---|
| `label` | tekst | — |
| `onChange` | `(checked) => void` | — |

Verder alle attributen van `<input type="checkbox">` (`checked`, `defaultChecked`, `disabled`).

## Toegankelijkheid

- Een `<input type="checkbox" role="switch">`: schermlezers zeggen "schakelaar, aan/uit"; spatie schakelt.
- Zonder label: geef een `aria-label`.

## Referentie

React: `react/src/Toggle.tsx` en `Toggle.css`. Figma: DS Components › Toggle.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
