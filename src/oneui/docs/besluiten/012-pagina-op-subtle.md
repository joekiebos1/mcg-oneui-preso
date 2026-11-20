# 012 — De pagina staat op subtle

Datum: 2026-11-19 · Status: besloten (eigenaar)

## Besluit

`surface/page` is slate/100 (sinds [015](015-ladder-50-100.md) slate/50, even licht): een subtle ondergrond. Alles wat direct op de pagina staat, krijgt daarom vanzelf de waarden
van "op subtle" ([besluit 009](009-ondergrond-subtle.md)). Een wit vlak op de pagina (een kaart, een paneel) zet het
terug met `data-ondergrond="default"`.

## Hoe

- Code: `tokens.css` past "op subtle" toe op alles in `body`, zonder gewicht (`:where`), zodat
  `data-ondergrond="default"` altijd wint. Op `body` zelf zet `data-ondergrond="default"` het voor de hele pagina uit.
- Componenten die zelf een wit vlak zijn, zetten het terug: Dialog en List (wit). Een eigen witte kaart of een wit
  paneel in een app krijgt `data-ondergrond="default"`.
- Figma: een frame op `surface/page` krijgt de mode Light on subtle (of Dark on subtle); een witte kaart erin Light.

## Ook

`surface/sunken` in donker van slate/900 naar slate/950. Op 900 was hij gelijk aan `surface/default`, en waren velden op
een kaart niet te zien. Nu ligt een veld in donker iets dieper dan de kaart, zoals in licht. Op de pagina (donker op
subtle) blijft hij slate/800.
