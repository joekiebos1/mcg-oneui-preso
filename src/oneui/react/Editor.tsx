import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { IcoonCursief, IcoonGenummerd, IcoonKop1, IcoonKop2, IcoonLijn, IcoonLink, IcoonOnderstreept, IcoonOpsomming, IcoonVet } from "./iconen";
import "./Veld.css";
import "./Editor.css";

export interface EditorProps {
  /** De inhoud als HTML, bij het begin. De editor houdt daarna zelf bij wat er staat. */
  defaultValue?: string;
  /** Na elke wijziging: de inhoud als HTML. */
  onChange?: (html: string) => void;
  /** Tekst als de editor leeg is. */
  placeholder?: string;
  /** Het label erboven. Zonder label geef je een `aria-label`. */
  label?: ReactNode;
  "aria-label"?: string;
  /** Toon de werkbalk (standaard aan). */
  toolbar?: boolean;
  disabled?: boolean;
  /** Vraagt het adres voor een link. Standaard een venstertje van de browser. */
  vraagLink?: () => string | null | Promise<string | null>;
  className?: string;
}

type Knop = { naam: string; icoon: ReactNode; doe: () => void; aan?: () => boolean };

/**
 * OneUI Editor. Figma: DS Components › Editor (toolbar, state). Rijke tekst voor verslagen en notities: vet, cursief,
 * onderstreept, twee koppen, lijsten, een lijn en een link. De werkbalk staat onder de tekst.
 */
export function Editor({ defaultValue = "", onChange, placeholder, label, toolbar = true, disabled, vraagLink, className, ...rest }: EditorProps) {
  const id = useId();
  const vlak = useRef<HTMLDivElement>(null);
  const [leeg, setLeeg] = useState(!defaultValue);
  const [, ververs] = useState(0);

  useEffect(() => { if (vlak.current) vlak.current.innerHTML = defaultValue; }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const kijk = () => { if (vlak.current?.contains(document.getSelection()?.anchorNode ?? null)) ververs((n) => n + 1); };
    document.addEventListener("selectionchange", kijk);
    return () => document.removeEventListener("selectionchange", kijk);
  }, []);

  const gewijzigd = useCallback(() => {
    const html = vlak.current?.innerHTML ?? "";
    setLeeg(!vlak.current?.textContent?.trim() && !vlak.current?.querySelector("hr, li"));
    onChange?.(html);
  }, [onChange]);

  const opdracht = (cmd: string, arg?: string) => { vlak.current?.focus(); document.execCommand(cmd, false, arg); gewijzigd(); };
  const status = (cmd: string) => { try { return document.queryCommandState(cmd); } catch { return false; } };
  const blok = () => { try { return String(document.queryCommandValue("formatBlock")).toLowerCase().replace(/[<>]/g, ""); } catch { return ""; } };
  const kop = (h: "h1" | "h2") => opdracht("formatBlock", blok() === h ? "p" : h);
  const link = async () => {
    const sel = document.getSelection(); const bereik = sel && sel.rangeCount ? sel.getRangeAt(0) : null;
    const adres = await (vraagLink ? vraagLink() : window.prompt("Adres van de link", "https://"));
    if (!adres) return;
    if (bereik) { sel!.removeAllRanges(); sel!.addRange(bereik); }
    opdracht("createLink", adres);
  };

  const groepen: Knop[][] = [
    [{ naam: "Vet", icoon: <IcoonVet />, doe: () => opdracht("bold"), aan: () => status("bold") },
     { naam: "Cursief", icoon: <IcoonCursief />, doe: () => opdracht("italic"), aan: () => status("italic") },
     { naam: "Onderstreept", icoon: <IcoonOnderstreept />, doe: () => opdracht("underline"), aan: () => status("underline") }],
    [{ naam: "Kop 1", icoon: <IcoonKop1 />, doe: () => kop("h1"), aan: () => blok() === "h1" },
     { naam: "Kop 2", icoon: <IcoonKop2 />, doe: () => kop("h2"), aan: () => blok() === "h2" }],
    [{ naam: "Genummerde lijst", icoon: <IcoonGenummerd />, doe: () => opdracht("insertOrderedList"), aan: () => status("insertOrderedList") },
     { naam: "Opsomming", icoon: <IcoonOpsomming />, doe: () => opdracht("insertUnorderedList"), aan: () => status("insertUnorderedList") }],
    [{ naam: "Lijn", icoon: <IcoonLijn />, doe: () => opdracht("insertHorizontalRule") },
     { naam: "Link", icoon: <IcoonLink />, doe: link }],
  ];

  return (
    <div className={["oneui-veld", disabled && "is-disabled", className].filter(Boolean).join(" ")}>
      {label && <label className="oneui-veld__label" id={`${id}-label`} htmlFor={id}>{label}</label>}
      <div className={"oneui-editor" + (disabled ? " is-disabled" : "")}>
        <div ref={vlak} id={id} className={"oneui-editor__tekst" + (leeg ? " is-leeg" : "")} role="textbox" aria-multiline="true"
          aria-labelledby={label ? `${id}-label` : undefined} aria-label={label ? undefined : rest["aria-label"]}
          aria-disabled={disabled || undefined} contentEditable={!disabled} suppressContentEditableWarning
          data-placeholder={placeholder} onInput={gewijzigd} />
        {toolbar && (
          <div className="oneui-editor__werkbalk" role="toolbar" aria-label="Opmaak" aria-controls={id}>
            {groepen.map((g, i) => (
              <span key={i} className="oneui-editor__groep">
                {g.map((k) => (
                  <button key={k.naam} type="button" className="oneui-editor__knop" title={k.naam} aria-label={k.naam}
                    aria-pressed={k.aan ? k.aan() : undefined} disabled={disabled}
                    onMouseDown={(e) => e.preventDefault()} onClick={k.doe}>
                    {k.icoon}
                  </button>
                ))}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
