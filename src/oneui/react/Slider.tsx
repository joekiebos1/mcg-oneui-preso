import { forwardRef, useId, useState, type CSSProperties, type InputHTMLAttributes, type ReactNode } from "react";
import "./Slider.css";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange" | "size"> {
  /** Boven de slider. Zonder label geef je een `aria-label`. */
  label?: ReactNode;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  /** Onder de baan links en rechts, zoals "Heel rustig" en "Heel onrustig". Standaard min en max. */
  minLabel?: ReactNode;
  maxLabel?: ReactNode;
  /** De waarde in een pil boven de duim. Standaard aan. */
  showValue?: boolean;
  /** Hoe de waarde in de pil en voor schermlezers staat, bijv. (v) => `${v} uur`. */
  format?: (value: number) => string;
}

/**
 * OneUI Slider, in de stijl Rond: een dikke baan, een grote duim en de waarde erboven in een pil. Een gewone
 * `<input type="range">`, dus pijltjes, Home en End werken vanzelf.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, value, defaultValue, min = 0, max = 100, step = 1, onChange, minLabel, maxLabel, showValue = true, format,
    disabled, className, id, ...rest },
  ref,
) {
  const eigenId = useId();
  const veldId = id ?? eigenId;
  const [eigen, setEigen] = useState(defaultValue ?? min);
  const v = value ?? eigen;
  const tekst = format ? format(v) : String(v);
  const deel = max > min ? (Math.min(max, Math.max(min, v)) - min) / (max - min) : 0;
  return (
    <div className={["oneui-slider", disabled && "is-disabled", className].filter(Boolean).join(" ")}
      style={{ "--_deel": deel } as CSSProperties}>
      {label && <label className="oneui-slider__label" htmlFor={veldId}>{label}</label>}
      <div className="oneui-slider__spoor">
        {showValue && <span className="oneui-slider__bel" aria-hidden="true">{tekst}</span>}
        <input ref={ref} id={veldId} type="range" className="oneui-slider__veld" min={min} max={max} step={step} value={v}
          disabled={disabled} aria-valuetext={format ? tekst : undefined}
          onChange={(e) => { const n = Number(e.target.value); if (value === undefined) setEigen(n); onChange?.(n); }} {...rest} />
      </div>
      <div className="oneui-slider__schaal" aria-hidden="true">
        <span>{minLabel ?? (format ? format(min) : min)}</span><span>{maxLabel ?? (format ? format(max) : max)}</span>
      </div>
    </div>
  );
});
