# 002 — Tokens verwijder je in drie stappen

Datum: 2026-10-21 · Status: besloten

## Besluit

Een token, verzameling of mode in Foundations verwijder je nooit in één keer.

1. **Verouderd markeren.** Zet in de beschrijving `Verouderd: gebruik <vervanger>` en vermeld het in de changelog.
2. **Migreren.** Zet alle koppelingen in Icons, Components en de werkbestanden om. `npm run check` laat zien wat er
   nog aan hangt.
3. **Verwijderen.** Pas als de controle nul koppelingen meldt, in een volgende publicatie.

## Controle

`figma/bindings.json` bevat welke tokens Icons en Components gebruiken (export uit Figma). `npm run check` faalt
als een gebruikt token niet in `figma/variables.json` staat. Een verwijderd token dat nog in gebruik is, valt dus op
vóór het publiceren, net als een contrastfout.

## Voor AI-tools

- Verwijder of hernoem nooit een token, verzameling of mode zonder eerst de MCP-tool `afhankelijkheden` te
  gebruiken.
- Wijzig liever een waarde dan een naam. Een nieuwe naam is een nieuw token met een nieuwe sleutel; bestaande
  koppelingen gaan daar niet vanzelf mee.
- Overschrijf geen kleuren in componenten of instanties om een tokenprobleem te maskeren. Los het op in Foundations.
