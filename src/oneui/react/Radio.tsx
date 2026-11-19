import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import "./Keuze.css";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /** De tekst naast het rondje. */
  label?: ReactNode;
  /** Radio's met dezelfde `name` horen bij elkaar: er kan er één aan staan. */
  name: string;
  value: string;
  /** md 24 (standaard), sm 20. */
  size?: "md" | "sm";
  onChange?: (value: string) => void;
}

/** OneUI Radio. Figma: DS Components › Radio (checked, size, state). Zet een groep in een `<fieldset>` met een `<legend>`. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, size = "md", disabled, className, onChange, ...rest },
  ref,
) {
  return (
    <label className={["oneui-keuze", "oneui-radio", `oneui-keuze--${size}`, disabled && "is-disabled", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="radio" className="oneui-keuze__veld" disabled={disabled} onChange={(e) => onChange?.(e.target.value)} {...rest} />
      <span className="oneui-keuze__vak" aria-hidden="true"><span className="oneui-radio__stip" /></span>
      {label && <span className="oneui-keuze__label">{label}</span>}
    </label>
  );
});
