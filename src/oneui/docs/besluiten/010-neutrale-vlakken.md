# 010 — Neutrale vlakken: rollen, geen subtle

Datum: 2026-11-19 · Status: besloten (eigenaar)

## Besluit

Neutraal heeft geen `subtle` meer. `surface/neutral/subtle`, `-hover` en `-pressed` zijn weg. Ze hadden dezelfde
waarden als rollen die er al waren: tien namen voor vier kleuren. Een grijs vlak heet naar wat het is.

| was | wordt | licht |
|---|---|---|
| `surface/neutral/subtle` | `surface/page` (een vlak), `surface/sunken` (een veld) | slate/100, 200 |
| `surface/neutral/subtle-hover` | `surface/action/neutral` | slate/200 |
| `surface/neutral/subtle-pressed` | `surface/action/neutral-hover` | slate/300 |

Een knop zonder vlak (ghost, Icon Button ghost, Nav item, de knoppen van Editor) krijgt bij hover het vlak van de
neutrale knop en ingedrukt diens hover. In licht, donker en licht op subtle is dat dezelfde kleur als eerst; in donker
op subtle één stap lichter.

`surface/neutral/bold` (en hover, ingedrukt) blijft: een donker vlak is een kleur, geen rol.

## Wat blijft

| rol | licht | donker |
|---|---|---|
| `surface/page` | slate/100 | slate/950 |
| `surface/default` | wit | slate/900 |
| `surface/raised` | wit | slate/800 |
| `surface/sunken` | slate/200 | slate/950 |
| `surface/disabled` | slate/200 | slate/800 |
| `surface/action/neutral` (hover, ingedrukt) | slate/200 (300, 400) | slate/800 (700, 700) |

## Werkwijze

Besluit [002](002-tokens-verwijderen.md) in één keer, zoals bij [007](007-twee-lijnen.md): eerst alles omgezet (code,
de preso, Myndlet; DS Components had geen koppelingen), toen verwijderd uit Foundations.
