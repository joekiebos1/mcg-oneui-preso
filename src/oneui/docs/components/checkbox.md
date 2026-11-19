# Checkbox

## Varianten

| Eigenschap | Waarden |
|---|---|
| checked | unchecked, checked, indeterminate |
| size | md, sm |
| state | default, hover, focus, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| label | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een Checkbox zet één optie aan of uit. Gebruik indeterminate als een groep maar voor een deel is aangevinkt.
(Figma: DOC — Checkbox)

## Do's en don'ts

_Nog in te vullen._

## Specificatie

Hoeken `radius/xs`.

| maat | vakje | teken |
|---|---|---|
| md (standaard) | `size/xs` (20) | vink of streep 16 |
| sm | `size/2xs` (16) | 12 |

Label label/M in `text/high`, `spacing/md` naast het vakje.

| state | vlak | rand |
|---|---|---|
| uit | `surface/default` | `border/thin`, `stroke/neutral/medium` |
| hover | — | `stroke/neutral/high` |
| aan | `surface/sky/bold` | `stroke/sky/medium` |
| focus (toetsenbord) | — | `border/thick`, `stroke/sky/medium` |
| uitgeschakeld | `surface/disabled` | `stroke/disabled`; label `text/disabled` |

Vink en streep in `text/on-bold/sky`. Figma gebruikt `icon/high`; dat werd onleesbaar toen secondary bold
donker sky (sky/700) werd, dus volgt het teken de tekst op secondary bold.

## React

```tsx
import { Checkbox } from "@mcg/oneui-react";

<Checkbox label="Herinnering per mail" defaultChecked />
<Checkbox label="Alle meldingen" indeterminate={deels} checked={alles} onChange={zetAlles} />
```

| prop | waarden | standaard |
|---|---|---|
| `label` | tekst | — |
| `size` | `md` (20) · `sm` (16) | `md` |
| `indeterminate` | half aangevinkt | `false` |
| `onChange` | `(checked) => void` | — |

Verder alle attributen van `<input type="checkbox">` (`checked`, `defaultChecked`, `disabled`, `name`).

## Toegankelijkheid

- Een echte `<input type="checkbox">` onder het vakje; klikken op het label werkt ook.
- Indeterminate zet de eigenschap van de browser en `aria-checked="mixed"`.
- Zonder label: geef een `aria-label`.

## Referentie

React: `react/src/Checkbox.tsx` en `Keuze.css`. Figma: DS Components › Checkbox.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
