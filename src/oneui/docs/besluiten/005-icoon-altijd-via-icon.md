# 005 — Een icoon staat altijd in het Icon-component, met lijn of vol

Datum: 2026-11-19 · Status: besloten

## Besluit

- Elk icoon in Figma staat in het component **Icon** (DS Components): in componenten, demo's en schermen. Een icoon
  uit DS-Icons zet je niet los neer.
- Icon heeft **Icon Asset** (welk icoon) en **size** (zeven maten). De laag Icon Asset is blootgesteld: wie een Icon
  of een component met een Icon gebruikt, ziet ook de eigenschappen van het icoon zelf.
- Een icoon met een volle variant is in DS-Icons een set met de eigenschap **Fill**: `false` is de lijn (het
  oorspronkelijke component, met dezelfde key), `true` het volle icoon. Zo staat er onder Icon een schakelaar Fill.
- Hoe vol eruitziet, volgt vaste regels (zie [Icon](../components/icon.md)).

## Waarom

Eén plek voor maat, kleur en stijl. Omdat de lijnversie zijn key houdt, blijven bestaande ontwerpen werken; omdat
de laag in beide varianten `icon` heet, blijft een kleur staan als je Fill wisselt ([besluit 003](003-icoon-een-laag.md)).

## Gevolgen

- In DS Components zijn alle losse iconen omgezet naar Icon: in de demo's, op Other en in de Audio player. Iconen met
  een maat buiten de zeven (14, 17, 18) staan nu op de dichtstbijzijnde maat.
- De oude Sidebar Navi had een eigen icoon-eigenschap; die is weg, het icoon staat nu in een blootgesteld Icon.
- 65 iconen hebben een volle variant (de iconen die in de ontwerpen gebruikt worden). De rest van DS-Icons nog niet.
- DS-Icons en DS Components moeten gepubliceerd worden voordat de schakelaar in andere bestanden werkt.
