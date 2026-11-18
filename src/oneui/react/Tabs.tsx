import { useRef, type KeyboardEvent, type ReactNode } from "react";
import "./Tabs.css";

export interface Tab {
  id: string;
  label: ReactNode;
  /** Bij type icon: het icoon in plaats van de tekst; `label` wordt dan het toegankelijke label. */
  icon?: ReactNode;
  /** Een aantal in een badge naast het label. */
  counter?: number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  /** Het id van de actieve tab. */
  value: string;
  onChange: (id: string) => void;
  /** label (standaard) of icon. */
  type?: "label" | "icon";
  /** Wat schermlezers horen bij de hele rij. */
  "aria-label"?: string;
  className?: string;
  /** Het id-voorvoegsel van de panelen: tab "x" bestuurt het paneel met id `${idPrefix}-x`. */
  idPrefix?: string;
}

/**
 * OneUI Tabs. Figma: DS Components › Tabs (type: label, icon; state). Wisselt tussen gelijkwaardige weergaven; er is er
 * altijd precies één actief. Pijltjestoetsen gaan naar de volgende tab, Home en End naar de eerste en laatste.
 */
export function Tabs({ tabs, value, onChange, type = "label", className, idPrefix = "oneui-tab", ...rest }: TabsProps) {
  const knoppen = useRef<(HTMLButtonElement | null)[]>([]);
  const actief = tabs.filter((t) => !t.disabled);
  const ga = (e: KeyboardEvent, i: number) => {
    const plek = actief.findIndex((t) => t.id === tabs[i].id);
    const naar = { ArrowRight: plek + 1, ArrowLeft: plek - 1, Home: 0, End: actief.length - 1 }[e.key];
    if (naar === undefined) return;
    e.preventDefault();
    const t = actief[(naar + actief.length) % actief.length];
    onChange(t.id);
    knoppen.current[tabs.indexOf(t)]?.focus();
  };
  return (
    <div role="tablist" className={["oneui-tabs", `oneui-tabs--${type}`, className].filter(Boolean).join(" ")} aria-label={rest["aria-label"]}>
      {tabs.map((t, i) => {
        const aan = t.id === value;
        return (
          <button key={t.id} ref={(el) => { knoppen.current[i] = el; }} type="button" role="tab" id={`${idPrefix}-tab-${t.id}`}
            aria-selected={aan} aria-controls={`${idPrefix}-${t.id}`} tabIndex={aan ? 0 : -1} disabled={t.disabled}
            aria-label={type === "icon" && typeof t.label === "string" ? t.label : undefined}
            className={"oneui-tab" + (aan ? " is-actief" : "")} onClick={() => onChange(t.id)} onKeyDown={(e) => ga(e, i)}>
            <span className="oneui-tab__inhoud">
              {type === "icon" && t.icon ? <span className="oneui-tab__icoon">{t.icon}</span> : <span className="oneui-tab__label">{t.label}</span>}
              {t.counter !== undefined && <span className="oneui-tab__teller">{t.counter}</span>}
            </span>
            <span className="oneui-tab__lijn" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
