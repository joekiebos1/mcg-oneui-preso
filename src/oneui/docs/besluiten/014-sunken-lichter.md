# 014 — Sunken een stap lichter

Datum: 2026-11-20 · Status: besloten (eigenaar)

## Besluit

`surface/sunken` gaat in licht één stap lichter: **slate/100 op wit** (was 200) en **slate/200 op de pagina** (was 300).
Donker blijft gelijk: slate/950 op de kaart, slate/800 op de pagina. Eén stap lichter is in donker gelijk aan de kaart
(slate/900); dan zie je een veld niet meer.

| token | licht | licht op subtle | donker | donker op subtle |
|---|---|---|---|---|
| `surface/sunken` | slate/100 (was 200) | slate/200 (was 300) | slate/950 | slate/800 |

## Waarom

De velden (Input, Select, Editor) waren te donker. Eén rol voor alles wat verzonken is, dus alles op sunken gaat mee:
de velden, de baan van Progress bar, Progress ring en Slider, List op `surface="sunken"`, het rondje in Dialog en de
hover van List item. Hover van een veld blijft een stap dieper (tussen sunken en `surface/action/neutral-hover`).

## Gevolgen

- Op wit ligt sunken nu één stap van zijn ondergrond, niet twee ([009](009-ondergrond-subtle.md)). Op de pagina ook: 200
  op 100. Dat is bewust: velden en banen worden rustiger. Het vlak van een veld hoeft geen 3:1 te halen: het is
  herkenbaar aan zijn label ([008](008-wcag-2-2-aa.md)).
- `surface/sunken` is niet meer gelijk aan `surface/action/neutral` (slate/200, op de pagina 300): een veld is lichter
  dan een neutrale knop.
- Figma: DS-Foundations opnieuw publiceren.
