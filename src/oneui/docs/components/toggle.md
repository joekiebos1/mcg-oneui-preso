# Toggle

**Mendix-route:** Atlas. Mendix-checkbox in de weergave als schakelaar, gestijld via het thema.

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
| baan | 32 breed (`size/lg`), 18 hoog (`size/2xs` + `spacing/2xs`), `radius/full` |
| knop | 16, `radius/full`, `text/on-bold`, `border/thin` van de rand |
| label | label/M, `text/high`, `spacing/md` naast de baan |

| state | uit | aan |
|---|---|---|
| actief | `surface/disabled` | `surface/primary/bold` |
| uitgeschakeld | `surface/sunken` | `surface/primary/bold` op 30 % |
| focus (toetsenbord) | ring `border/thick` in `interaction/focusRing`, `spacing/2xs` los | zelfde |

De knop schuift in 160 ms; zonder beweging als de gebruiker dat vraagt (`prefers-reduced-motion`).

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
