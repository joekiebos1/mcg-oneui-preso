# Input

## Varianten

| Eigenschap | Waarden |
|---|---|
| type | text, search, number, code, textarea |
| size | md, sm |
| state | default, hover, focus, filled, error, disabled |

## Instellingen

| Eigenschap | Soort |
|---|---|
| Label | tekst |
| Value | tekst |
| Message | tekst |
| label | aan/uit |
| hint | aan/uit |
| counter | aan/uit |
| Icon left | aan/uit |
| Icon right | aan/uit |
| hint icon | aan/uit |

<!-- handmatig -->
## Wanneer gebruiken

Een Input haalt een waarde op bij de gebruiker. Het label staat erboven, hulp of een fout eronder. De rand laat de
state zien. (Figma: DOC — Input)

- **text**: één regel tekst.
- **search**: zoeken; een pil met een vergrootglas. Met een waarde verschijnt een kruisje om te wissen.
- **number**: een getal, zonder de pijltjes van de browser.
- **textarea**: meerdere regels.
- **code**: een code van een paar cijfers, elk in een eigen vakje.

## Do's en don'ts

_Nog in te vullen._

## Specificatie

Alle waarden zijn tokens (`dist/tokens.css`).

### Het vak

| maat | hoogte | padding boven/onder | padding links/rechts | hoeken |
|---|---|---|---|---|
| md (standaard) | 48 | `spacing/lg` | `spacing/xl` | `radius/lg` |
| sm | 40 | `spacing/md` | `spacing/lg` | `radius/md` |

Vlak `surface/default`. Rand `border/thin` in `stroke/neutral/low`, hover `stroke/neutral/high`, focus 2 breed in
`stroke/secondary/medium` (het vak verschuift niet). Tekst label/M in `text/high`, placeholder `text/low`. Iconen
`size/xs` in `icon/medium`, `spacing/md` van de tekst.

- **search:** hoeken `radius/full`.
- **code:** vierkante vakjes van `size/3xl` (sm `size/2xl`), `spacing/md` ertussen, het cijfer in het midden.
- **teller:** rechts in de regel van de hulptekst, body/XS.

### Label, hulptekst en fout (gedeeld met Select en Editor)

| deel | token |
|---|---|
| label | label/M, `text/high` |
| hulptekst | body/XS, `text/medium` |
| ruimte tussen label, vak en hulptekst | `spacing/xs` |
| fout | vak `surface/negative/subtle`, rand `stroke/negative/medium`; de melding vervangt de hulptekst |
| uitgeschakeld | vak `surface/disabled`, rand `stroke/disabled`, tekst `text/disabled` |

## React

```tsx
import { Input } from "@mcg/oneui-react";

<Input label="Naam" hint="Zoals op je pas" placeholder="Voornaam" />
<Input label="Zoeken" type="search" onChange={(v) => zoek(v)} />
<Input label="Mail" error="Dit is geen mailadres" />
<Input label="Code" type="code" length={4} />
```

| prop | waarden | standaard |
|---|---|---|
| `type` | `text` · `search` · `number` · `textarea` · `code` | `text` |
| `size` | `md` (48) · `sm` (40) | `md` |
| `label`, `hint`, `error` | tekst | — |
| `iconLeft`, `iconRight` | een SVG met `currentColor` | — |
| `counter` | teller "aantal/maxLength", met `maxLength` | `false` |
| `rows` | regels bij textarea | `4` |
| `length` | vakjes bij code | `4` |
| `onChange` | `(value, event) => void` | — |

Verder alle attributen van `<input>` (bij textarea van `<textarea>`).

## Toegankelijkheid

- Het label is een echt `<label>`; hulptekst en fout hangen aan het veld met `aria-describedby`.
- Bij een fout `aria-invalid` en de melding met `role="alert"`.
- Zonder zichtbaar label: geef het veld een `aria-label`.
- Code: elk vakje heeft een label ("Cijfer 1 van 4"); typen springt door, Backspace en de pijltjes gaan terug.
- Het kruisje bij search is een knop met het label "Wissen".

## Referentie

React: `react/src/Input.tsx`, `Input.css` en `Veld.css`. Figma: DS Components › Input.
<!-- /handmatig -->

_Bron: DS-Components in Figma. Varianten en instellingen worden gegenereerd door `scripts/docs.mjs`._
