// Elk component als verhaal, zoals Kleuren en Checkbox (eigenaar 2026-11-20): een beeld in context, wat het is, de
// varianten en toestanden als vakken, doen en niet doen, toegankelijkheid, en voor developers de code en de specificatie
// achter een uitklap. Alle tekst komt uit docs/components/<slug>.md van mcg-oneui; wat daar niet staat, is "Nog niet
// vastgelegd".
import type { ReactNode } from "react";
import { Text } from "../../oneui/react/Text";
import { componenten, doc, linkVoor } from "../../lib/docs";
import { Blokken, delen, inline } from "../../lib/markdown";
import { Pagina, Sectie } from "../Pagina";
import { DoenEnNiet, NogNiet, blokken, leeg, tekst, zonder } from "../verhaal";
import { VOORBEELDEN } from "./Voorbeelden";
import { HELDEN } from "./Helden";

// Wat een eigen plek heeft op de pagina; de rest van het document komt als eigen sectie of bij de developers.
const VERHAAL = ["Wanneer gebruiken", "Do's en don'ts", "Toegankelijkheid"];
const DEVELOPERS = ["Varianten", "Instellingen", "Specificatie", "React", "In code", "Referentie"];

export function ComponentVerhaal({ slug, held, extra, beelden, toestanden }: {
  slug: string;
  /** een eigen beeld bovenaan; anders het beeld uit Helden.tsx */
  held?: ReactNode;
  /** eigen secties na de toestanden */
  extra?: ReactNode;
  /** een beeld per regel bij doen en niet doen, in de volgorde van de docs */
  beelden?: ReactNode[];
  /** eigen toestanden in plaats van de voorbeelden */
  toestanden?: ReactNode;
}) {
  const pad = `docs/components/${slug}.md`;
  const md = doc(pad) ?? "";
  const link = linkVoor("components");
  const c = componenten().find((x) => x.slug === slug);
  const Voorbeeld = VOORBEELDEN[slug] as (() => ReactNode) | undefined;
  const beeld = held ?? HELDEN[slug];
  const eigen = delen(md).filter((d) => d.kop && !VERHAAL.includes(d.kop) && !DEVELOPERS.includes(d.kop));
  const dev = DEVELOPERS.filter((k) => !(k === "Varianten" && !toestanden && !VOORBEELDEN[slug])).map((k) => [k, zonder(blokken(pad, k), ["Toegankelijkheid"])] as const).filter(([, b]) => b.length);
  const toegang = blokken(pad, "Toegankelijkheid");
  const wb = blokken(pad, "Wanneer gebruiken");
  const wanneer = leeg(wb) ? "" : tekst(wb);
  // zonder werkende voorbeelden staan de varianten uit Figma als tabel in het verhaal
  const variantTabel = !toestanden && !Voorbeeld ? blokken(pad, "Varianten") : [];

  return (
    <Pagina klasse="verhaal" titel={c?.naam} intro={wanneer ? inline(wanneer, link) : undefined}>
      {c && !c.rond && <NogNiet tekst="Nog niet in Rond." />}
      {beeld && <div className="held" data-ondergrond="subtle">{beeld}</div>}

      {(toestanden || Voorbeeld) && (
        <Sectie titel="Varianten en toestanden">
          {toestanden ?? (Voorbeeld ? <Voorbeeld /> : null)}
        </Sectie>
      )}

      {variantTabel.length > 0 && <Sectie titel="Varianten"><Blokken blokken={variantTabel} link={link} /></Sectie>}

      {extra}

      {eigen.map((d) => (
        <Sectie key={d.kop} titel={d.kop!}><Blokken blokken={d.blokken} link={link} /></Sectie>
      ))}

      <Sectie titel="Doen en niet doen">
        <DoenEnNiet bron={blokken(pad, "Do's en don'ts")} beelden={beelden} link={link} />
      </Sectie>

      <Sectie titel="Toegankelijkheid">
        {toegang.length ? <Blokken blokken={toegang} link={link} /> : <NogNiet />}
      </Sectie>

      {dev.length > 0 && (
        <Sectie titel="Voor developers">
          <details className="uitklap">
            <summary><Text as="span" variant="body-m">Code, eigenschappen en tokens</Text></summary>
            <div className="uitklap-inhoud">
              {dev.map(([k, b]) => (
                <div key={k} className="uitklap-deel">
                  <Text as="h3" variant="heading-m">{k}</Text>
                  <Blokken blokken={b} link={link} />
                </div>
              ))}
            </div>
          </details>
          <Text variant="body-m" color="low"><code>{pad}</code> in mcg-oneui · Figma: DS Components › {c?.naam ?? slug}</Text>
        </Sectie>
      )}
    </Pagina>
  );
}
