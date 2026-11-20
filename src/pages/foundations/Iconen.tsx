// Iconen als verhaal (eigenaar 2026-11-20), zoals Kleuren: een beeld, alle iconen, lijn en vol, de kleur per ondergrond,
// doen en niet doen. De tekst komt uit docs/components/icon.md en besluit 003 van mcg-oneui.
import { useState } from "react";
import { Link } from "react-router-dom";
import { Text } from "../../oneui/react/Text";
import { Toggle } from "../../oneui/react/Toggle";
import { Icon } from "../../oneui/react/Icon";
import { ICOONNAMEN } from "../../oneui/react/icondata";
import { linkVoor } from "../../lib/docs";
import { Blokken, inline } from "../../lib/markdown";
import { Pagina, Sectie } from "../Pagina";
import { Bij, DoenEnNiet, NogNiet, Vak, blokken, tekst } from "../verhaal";

const ICON = "docs/components/icon.md";
const B003 = "docs/besluiten/003-icoon-een-laag.md";

// De ondergrond bij een icoontoken, zodat het voorbeeld klopt: wit op een vol vlak, licht op een donker vlak.
const GROND: Record<string, string> = {
  "icon/on-bold": "var(--oneui-surface-magenta-bold)",
  "icon/on-inverse": "var(--oneui-surface-inverse)",
};
const css = (t: string) => `var(--oneui-${t.replace(/\//g, "-")})`;

/** De tabel "ondergrond | token" uit besluit 003; "icon/magenta, positive, …" wordt vier tokens. */
function kleurrijen(): { ondergrond: string; tokens: string[] }[] {
  const t = blokken(B003, "Besluit").find((b) => b.soort === "tabel");
  return (t?.regels.slice(2) ?? []).map((r) => {
    const [ondergrond, token] = r.split("|").slice(1, -1).map((x) => x.trim());
    const delen = token.replace(/\s*\(.*\)/, "").split(",").map((x) => x.trim());
    return { ondergrond, tokens: delen.map((d) => (d.startsWith("icon/") ? d : `icon/${d}`)) };
  });
}

function AlleIconen() {
  const [vol, setVol] = useState(false);
  return (
    <>
      <Toggle label="Vol" checked={vol} onChange={setVol} />
      <div className="iconenraster">
        {ICOONNAMEN.map((n) => <span key={n} className="iconencel" title={n}><Icon name={n} fill={vol} /><code>{n}</code></span>)}
      </div>
    </>
  );
}

export function Iconen() {
  const link = linkVoor("components");
  const wanneer = blokken(ICON, "Wanneer gebruiken");
  const regels = blokken(B003, "Regels");
  return (
    <Pagina titel="Iconen" intro={inline(tekst(wanneer.filter((b) => b.soort === "alinea").slice(0, 1)), link)}>
      <div className="held" data-ondergrond="subtle">
        <div className="iconenrij groot">
          {(["heart-2", "moon", "calendar", "message-smile", "sparkle"] as const).map((n, i) => <Icon key={n} name={n} size="2xl" fill={i % 2 === 1} />)}
        </div>
      </div>

      <Sectie titel="Lijn en vol">
        <div className="raster r4">
          {(["heart-2", "bookmark"] as const).flatMap((n) => [false, true].map((v) => (
            <div key={n + v}><Vak><Icon name={n} size="2xl" fill={v} /></Vak><Bij titel={v ? "Vol" : "Lijn"}><code>{n}</code></Bij></div>
          )))}
        </div>
        <Blokken blokken={blokken(ICON, "Hoe vol werkt")} link={link} />
      </Sectie>

      <Sectie titel="Maten">
        <div className="held licht" data-ondergrond="subtle">
          <div className="iconenmaten">
            {(["2xs", "xs", "s", "m", "l", "xl", "2xl"] as const).map((m) => (
              <div key={m} className="iconmaat"><Icon name="heart-2" size={m} /><code>{m}</code></div>
            ))}
          </div>
        </div>
        <Blokken blokken={wanneer.filter((b) => b.soort === "lijst")} link={link} />
      </Sectie>

      <Sectie titel="Kleur" uitleg={inline(tekst(blokken(B003, "Besluit").filter((b) => b.soort === "alinea").slice(0, 2)), link)}>
        <div className="raster r4">
          {kleurrijen().map((k) => (
            <div key={k.ondergrond}>
              <Vak style={GROND[k.tokens[0]] ? { background: GROND[k.tokens[0]] } : undefined}>
                <div className={"iconenrij" + (k.tokens.length > 1 ? " krap" : "")}>{k.tokens.map((t) => <span key={t} style={{ color: css(t) }}><Icon name="heart-2" size={k.tokens.length > 1 ? "m" : "xl"} /></span>)}</div>
              </Vak>
              <Bij titel={k.ondergrond[0].toUpperCase() + k.ondergrond.slice(1)}><code>{k.tokens.join(", ")}</code></Bij>
            </div>
          ))}
        </div>
        <Blokken blokken={regels} link={linkVoor("besluiten")} />
      </Sectie>

      <Sectie titel="Doen en niet doen">
        <DoenEnNiet bron={blokken(ICON, "Do's en don'ts")} link={link} />
      </Sectie>

      <Sectie titel="Alle iconen">
        <AlleIconen />
      </Sectie>

      <Sectie titel="Nieuwe maken">
        <NogNiet />
      </Sectie>

      <Link to="/componenten/icon" className="verder"><Text as="span" variant="body-m">Het component Icon, voor developers →</Text></Link>
    </Pagina>
  );
}
