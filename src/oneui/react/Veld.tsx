import { useId, type ReactNode } from "react";
import "./Veld.css";

export type VeldSize = "md" | "sm";

/** Wat Input, Select en Editor delen: een label erboven, een hulptekst of fout eronder. */
export interface VeldProps {
  /** Het label boven het veld. Zonder label geef je het veld zelf een `aria-label`. */
  label?: ReactNode;
  /** Hulptekst onder het veld. */
  hint?: ReactNode;
  /** Een foutmelding: het veld kleurt rood en de melding vervangt de hulptekst. */
  error?: ReactNode;
}

/** De opbouw van een veld (Figma: Label, Body, Hint). `veld` krijgt de ids voor label en beschrijving. */
export function Veld({ label, hint, error, disabled, rechts, className, children }: VeldProps & {
  disabled?: boolean;
  /** Rechts in de regel onder het veld, zoals de teller. */
  rechts?: ReactNode;
  className?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}) {
  const id = useId();
  const melding = error ?? hint;
  const describedBy = melding ? `${id}-hint` : undefined;
  return (
    <div className={["oneui-veld", error ? "is-error" : "", disabled ? "is-disabled" : "", className].filter(Boolean).join(" ")}>
      {label && <label className="oneui-veld__label" htmlFor={id}>{label}</label>}
      {children({ id, describedBy, invalid: !!error })}
      {(melding || rechts) && (
        <div className="oneui-veld__hint">
          {melding && <span id={describedBy} className="oneui-veld__melding" role={error ? "alert" : undefined}>{melding}</span>}
          {rechts && <span className="oneui-veld__rechts">{rechts}</span>}
        </div>
      )}
    </div>
  );
}
