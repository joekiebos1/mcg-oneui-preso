# Dialog

<!-- handmatig -->
## Wanneer gebruiken

Een korte vraag die eerst beantwoord moet worden: bevestigen, pauzeren, iets weggooien. Een groot rond vlak met een
zachte schaduw op een scrim ([besluit 004](../besluiten/004-rond-vlakken-geen-randen.md)).

## Do's en don'ts

- Doe: een titel als vraag ("Even pauzeren?") en een zin uitleg.
- Doe: de belangrijkste knop als primary; de andere ghost of neutral. In `stack` staat primary bovenaan, in `row` rechts ([Button](button.md)).
- Niet: een dialoog voor informatie die kan wachten; gebruik dan een melding op de pagina.
- Niet: een formulier van meer dan een paar velden; dat is een eigen pagina.

## Specificatie

| deel | token |
|---|---|
| vlak | `surface/default`, `radius/4xl`, `spacing/3xl` padding, `spacing/xl` tussen de delen, hoogstens 400 breed |
| schaduw | `effect/shadow/key` en `effect/shadow/ambient`, zacht en wijd |
| achtergrond | `surface/scrim` |
| icoon | een cirkel van `size/4xl` (56) in `surface/{kleur}/subtle`, het icoon (32) in `text/on-subtle/{kleur}` |
| titel | heading/M, `text/high` |
| tekst | body/M, `text/medium` |
| knoppen | `stack`: onder elkaar over de hele breedte (standaard, ook op de telefoon); `row`: rechts naast elkaar |

## React

```tsx
import { Dialog, Button } from "@mcg/oneui-react";

<Dialog open={open} onClose={() => setOpen(false)} title="Even pauzeren?" icon={<IcoonPauze />} tone="amber"
  actions={<><Button size="lg">Pauzeren</Button><Button size="lg" variant="ghost" onClick={() => setOpen(false)}>Doorgaan</Button></>}>
  Je voortgang blijft bewaard. Je kunt morgen verder waar je gebleven bent.
</Dialog>
```

| prop | waarden | standaard |
|---|---|---|
| `open`, `onClose` | open of dicht; sluiten bij Escape of een klik op de achtergrond | — |
| `title`, `children` | de vraag en de uitleg | — |
| `icon` + `tone` | een icoon; `neutral` · `magenta` · `sky` · `amber` · `violet` | `sky` |
| `actions` | de knoppen | — |
| `actionsLayout` | `stack` · `row` | `stack` |
| `dismissable` | sluiten met een klik op de achtergrond | `true` |

## Toegankelijkheid

Een native `<dialog>` met `showModal()`: de focus blijft in de dialoog, de pagina erachter is inert, Escape sluit.
De titel is de naam (`aria-labelledby`).

## Referentie

React: `react/src/Dialog.tsx` en `Dialog.css`. Nog niet in Figma.
<!-- /handmatig -->

_Alleen in code. Deze pagina staat in `scripts/docs.mjs` bij CODE._
