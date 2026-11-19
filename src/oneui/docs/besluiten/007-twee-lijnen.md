# 007 — Twee lijnen

Datum: 2026-11-19 · Status: besloten (eigenaar)

## Besluit

De stroke-laag gaat van 29 naar 2 tokens. Componenten hebben geen randen meer ([004](004-rond-vlakken-geen-randen.md)),
dus de randen per kleur en per signaal zijn niet meer nodig.

| blijft | waarvoor |
|---|---|
| `stroke/neutral/low` | een scheidingslijn, een lijn in tekst, de lijn onder Tabs |
| `stroke/neutral/medium` | een vorm die 3:1 moet halen tegen zijn achtergrond |

Weg: `stroke/neutral/high`, `stroke/disabled`, `stroke/action/secondary` en `low`, `medium`, `high` van magenta, sky,
amber, violet, positive, negative, warning en informative.

## Vervangers

| was | wordt |
|---|---|
| `stroke/neutral/high` | `stroke/neutral/medium` |
| `stroke/disabled` | `stroke/neutral/low` (zelfde waarde) |
| `stroke/action/secondary`, `stroke/sky/*` | `interaction/focusRing` (zelfde waarde) |
| `stroke/magenta/*` | `surface/magenta/bold` |
| `stroke/negative/*` | `icon/negative` |

## Werkwijze

Besluit [002](002-tokens-verwijderen.md) is in één keer gevolgd: eerst alle koppelingen omgezet (code, Myndlet, de
preso en DS Components in Figma), toen pas verwijderd uit Foundations.
