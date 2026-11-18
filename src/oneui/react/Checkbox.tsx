import { forwardRef, useEffect, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import { IcoonMin, IcoonVink } from "./iconen";
import "./Keuze.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /** De tekst naast het vakje. Zonder label geef je het vakje een `aria-label`. */
  label?: ReactNode;
  /** md 20 (standaard), sm 16. */
  size?: "md" | "sm";
  /** Half aangevinkt: een deel van wat eronder valt, staat aan. */
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

/** OneUI Checkbox. Figma: DS Components › Checkbox (checked: unchecked, checked, indeterminate; size; state). */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, size = "md", indeterminate = false, disabled, className, onChange, ...rest },
  ref,
) {
  const veld = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => veld.current!);
  useEffect(() => { if (veld.current) veld.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <label className={["oneui-keuze", "oneui-checkbox", `oneui-keuze--${size}`, disabled && "is-disabled", className].filter(Boolean).join(" ")}>
      <input ref={veld} type="checkbox" className="oneui-keuze__veld" disabled={disabled}
        aria-checked={indeterminate ? "mixed" : undefined} onChange={(e) => onChange?.(e.target.checked)} {...rest} />
      <span className="oneui-keuze__vak" aria-hidden="true">
        <span className="oneui-checkbox__teken is-vink"><IcoonVink /></span>
        <span className="oneui-checkbox__teken is-min"><IcoonMin /></span>
      </span>
      {label && <span className="oneui-keuze__label">{label}</span>}
    </label>
  );
});
