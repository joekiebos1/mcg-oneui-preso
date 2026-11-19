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

In de stijl Rond: een gevuld vlak zonder rand, zoals de baan van Toggle. Hoeken `radius/md` (sm `radius/sm`).

| maat | vakje | teken |
|---|---|---|
| md (standaard) | `size/sm` (24) | vink of streep 16 |
| sm | `size/xs` (20) | 14 |

Label label/M in `text/high`, `spacing/lg` naast het vakje; de eerste regel staat midden naast het vakje.

| state | vlak |
|---|---|
| uit | `surface/neutral/subtle-pressed` |
| hover | een stap dieper (10 % `icon/high` erdoor) |
| aan | `surface/action/primary`, hover `surface/action/primary-hover` |
| ingedrukt | schaal 0,9 |
| focus (toetsenbord) | een ring van `border/thick` in `interaction/focusRing`, `spacing/2xs` los van het vakje |
| uitgeschakeld | `surface/disabled`, aan op 35 %; label `text/disabled` |

Vink en streep in `text/on-action/primary`, met een dikke lijn (3).

Let op: uit haalt 1,5:1 tegen wit, net als de baan van Toggle. WCAG vraagt 3:1 voor de vorm van een bediening; het label
ernaast maakt hem herkenbaar, maar een los vakje zonder label is te licht.

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
