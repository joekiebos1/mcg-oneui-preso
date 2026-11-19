import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import "./Toggle.css";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "size"> {
  /** De tekst naast de schakelaar. Zonder label geef je hem een `aria-label`. */
  label?: ReactNode;
  onChange?: (checked: boolean) => void;
}

/**
 * OneUI Toggle. Figma: DS Components › Toggle (State: active, disabled; checked). Een checkbox met de rol switch: hij
 * werkt meteen, zonder opslaan. Rond: een dikke baan met een grote witte knop.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, disabled, className, onChange, ...rest },
  ref,
) {
  return (
    <label className={["oneui-toggle", disabled && "is-disabled", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="checkbox" role="switch" className="oneui-toggle__veld" disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)} {...rest} />
      <span className="oneui-toggle__baan" aria-hidden="true">
        <span className="oneui-toggle__knop" />
      </span>
      {label && <span className="oneui-toggle__label">{label}</span>}
    </label>
  );
});
