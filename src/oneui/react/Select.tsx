import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";
import { Veld, type VeldProps, type VeldSize } from "./Veld";
import { IcoonChevronOmlaag } from "./iconen";
import "./Select.css";

export interface SelectOptie { value: string; label: ReactNode; disabled?: boolean }

export interface SelectProps extends VeldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "onChange"> {
  /** De keuzes. Of geef `<option>`-elementen als children. */
  options?: SelectOptie[];
  /** Tekst als er nog niets gekozen is, zoals "Kies een optie". */
  placeholder?: string;
  /** md 48 hoog (standaard), sm 40. */
  size?: VeldSize;
  onChange?: (value: string) => void;
}

/**
 * OneUI Select. Figma: DS Components › Select (size, state). Een echte `<select>`: de lijst die openklapt is die van het
 * apparaat, zodat hij met toetsenbord, schermlezer en op een telefoon vanzelf goed werkt.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, options, placeholder, size = "md", value, defaultValue, onChange, disabled, className, children, ...rest },
  ref,
) {
  const leeg = value === undefined ? defaultValue === undefined : value === "";
  return (
    <Veld label={label} hint={hint} error={error} disabled={disabled} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className={`oneui-vak oneui-vak--${size} oneui-select`}>
          <select ref={ref} id={id} className={"oneui-vak__tekst oneui-select__veld" + (leeg && placeholder ? " is-leeg" : "")}
            aria-describedby={describedBy} aria-invalid={invalid || undefined} disabled={disabled}
            value={value} defaultValue={value === undefined ? (defaultValue ?? (placeholder ? "" : undefined)) : undefined}
            onChange={(e) => { e.currentTarget.classList.toggle("is-leeg", e.currentTarget.value === ""); onChange?.(e.target.value); }}
            {...rest}>
            {placeholder && <option value="" disabled hidden>{placeholder}</option>}
            {options?.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
            {children}
          </select>
          <span className="oneui-vak__icoon oneui-select__chevron"><IcoonChevronOmlaag /></span>
        </div>
      )}
    </Veld>
  );
});
