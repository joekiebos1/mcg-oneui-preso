import { forwardRef, useImperativeHandle, useRef, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Veld, type VeldProps, type VeldSize } from "./Veld";
import { IcoonKruis, IcoonZoek } from "./iconen";
import "./Input.css";

export type InputType = "text" | "search" | "number" | "textarea" | "code";

export interface InputProps extends VeldProps, Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /** text (standaard), search (met zoekicoon), number, textarea (meerdere regels) of code (losse vakjes per cijfer). */
  type?: InputType;
  /** md 48 hoog (standaard), sm 40. */
  size?: VeldSize;
  /** Icoon links in het veld. Bij search staat er al een zoekicoon. */
  iconLeft?: ReactNode;
  /** Icoon rechts in het veld. */
  iconRight?: ReactNode;
  /** Toon de teller "aantal/maxLength" rechts onder het veld. Werkt met `maxLength`. */
  counter?: boolean;
  /** Aantal regels bij textarea. */
  rows?: number;
  /** Aantal vakjes bij code. */
  length?: number;
  onChange?: (value: string, e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * OneUI Input. Figma: DS Components › Input (type, size, state). Label, hulptekst, fout en teller komen uit Veld.
 */
export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  { label, hint, error, type = "text", size = "md", iconLeft, iconRight, counter, rows = 4, length = 4, maxLength,
    value, defaultValue, onChange, disabled, className, ...rest },
  ref,
) {
  const [eigen, setEigen] = useState(String(defaultValue ?? ""));
  const waarde = value !== undefined ? String(value) : eigen;
  const zet = (v: string, e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (value === undefined) setEigen(v);
    onChange?.(v, e);
  };
  const veld = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => veld.current as HTMLInputElement | HTMLTextAreaElement);
  const teller = counter && maxLength ? `${waarde.length}/${maxLength}` : undefined;

  return (
    <Veld label={label} hint={hint} error={error} disabled={disabled} rechts={teller} className={className}>
      {({ id, describedBy, invalid }) => {
        const aria = { id, "aria-describedby": describedBy, "aria-invalid": invalid || undefined, disabled };
        if (type === "code") return <Code {...aria} length={length} waarde={waarde} zet={zet} size={size} />;
        const links = iconLeft ?? (type === "search" ? <IcoonZoek /> : null);
        return (
          <div className={`oneui-vak oneui-vak--${size}${type === "textarea" || type === "search" ? ` oneui-vak--${type}` : ""}`}>
            {links && <span className="oneui-vak__icoon">{links}</span>}
            {type === "textarea" ? (
              <textarea ref={veld as React.Ref<HTMLTextAreaElement>} className="oneui-vak__tekst" rows={rows} maxLength={maxLength}
                value={waarde} onChange={(e) => zet(e.target.value, e)} {...aria}
                {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
            ) : (
              <input ref={veld as React.Ref<HTMLInputElement>} className="oneui-vak__tekst" maxLength={maxLength}
                type={type === "number" ? "number" : type === "search" ? "search" : "text"}
                inputMode={type === "number" ? "decimal" : undefined}
                value={waarde} onChange={(e) => zet(e.target.value, e)} {...aria} {...rest} />
            )}
            {type === "search" && waarde && !disabled && (
              <button type="button" className="oneui-vak__wis" aria-label="Wissen"
                onClick={() => { zet(""); veld.current?.focus(); }}><IcoonKruis /></button>
            )}
            {iconRight && <span className="oneui-vak__icoon">{iconRight}</span>}
          </div>
        );
      }}
    </Veld>
  );
});

/** Een code van een paar cijfers, elk in een eigen vakje. Typen gaat vanzelf door naar het volgende vakje. */
function Code({ id, length, waarde, zet, size, disabled, ...aria }: {
  id: string; length: number; waarde: string; zet: (v: string) => void; size: VeldSize; disabled?: boolean;
  "aria-describedby"?: string; "aria-invalid"?: boolean;
}) {
  const vakjes = useRef<(HTMLInputElement | null)[]>([]);
  const tekens = Array.from({ length }, (_, i) => waarde[i] ?? "");
  const naar = (i: number) => vakjes.current[Math.max(0, Math.min(length - 1, i))]?.focus();
  const zetOp = (i: number, t: string) => {
    const nieuw = tekens.slice(); nieuw[i] = t; zet(nieuw.join("").slice(0, length));
  };
  return (
    <div className="oneui-code" role="group" aria-labelledby={undefined}>
      {tekens.map((t, i) => (
        <div key={i} className={`oneui-vak oneui-vak--${size} oneui-code__vak`}>
          <input ref={(el) => { vakjes.current[i] = el; }} id={i === 0 ? id : undefined} className="oneui-vak__tekst"
            inputMode="numeric" autoComplete={i === 0 ? "one-time-code" : "off"} maxLength={1} value={t} disabled={disabled}
            aria-label={`Cijfer ${i + 1} van ${length}`} {...aria}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "");
              if (v.length > 1) { zet((tekens.slice(0, i).join("") + v).slice(0, length)); naar(i + v.length); return; }
              zetOp(i, v); if (v) naar(i + 1);
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !t) naar(i - 1);
              if (e.key === "ArrowLeft") naar(i - 1);
              if (e.key === "ArrowRight") naar(i + 1);
            }} />
        </div>
      ))}
    </div>
  );
}
