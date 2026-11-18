# Tabs

**Mendix-route:** Atlas. Mendix tab container, gestijld via het thema.

## Varianten

| Eigenschap | Waarden |
|---|---|
| type | label, icon |
| state | default, hover, active, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| counter | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Tabs wisselen tussen views die naast elkaar staan. Er is altijd precies één tab actief. (Figma: DOC — Tabs)

## Do's en don'ts

_Nog in te vullen._

## Specificatie

| deel | token |
|---|---|
| inhoud | padding 0 `spacing/xl`, label/M; icoon `size/xs` |
| lijn | `spacing/lg` onder de inhoud, over de hele tab |
| teller | Badge counter: 20 hoog, `surface/inverse`, `text/on-inverse`, label/S |

| state | tekst | lijn |
|---|---|---|
| default | `text/medium` | 2, `stroke/neutral/low` |
| hover | `text/high` | 2, `stroke/neutral/medium` |
| actief | `text/high` (icoon `icon/primary`) | 3, `stroke/primary/medium` |
| uitgeschakeld | `text/disabled` | 2, `stroke/neutral/low` |

Focus (toetsenbord): `border/thick` in `stroke/secondary/medium`. Past de rij niet, dan scrolt hij horizontaal.

## React

```tsx
import { Tabs } from "@mcg/oneui-react";

<Tabs aria-label="Inbox" value={tab} onChange={setTab} idPrefix="inbox" tabs={[
  { id: "afspraken", label: "Afspraken" },
  { id: "berichten", label: "Berichten", counter: 3 },
  { id: "archief", label: "Archief", disabled: true },
]} />
<div role="tabpanel" id={`inbox-${tab}`} aria-labelledby={`inbox-tab-${tab}`}>…</div>
```

| prop | waarden | standaard |
|---|---|---|
| `tabs` | `{ id, label, icon?, counter?, disabled? }[]` | — |
| `value` | id van de actieve tab | — |
| `onChange` | `(id) => void` | — |
| `type` | `label` · `icon` | `label` |
| `aria-label` | wat de rij is | — |
| `idPrefix` | koppelt tab en paneel | — |

Bij type icon is `label` het toegankelijke label van het icoon.

## Toegankelijkheid

- `role="tablist"` met `role="tab"` en `aria-selected`; alleen de actieve tab staat in de tabvolgorde.
- Pijl links en rechts, Home en End gaan naar een andere tab en slaan uitgeschakelde over.
- Met `idPrefix` wijst elke tab met `aria-controls` naar zijn paneel.

## Referentie

React: `react/src/Tabs.tsx` en `Tabs.css`. Figma: DS Components › Tabs.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
