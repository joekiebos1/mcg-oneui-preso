import { forwardRef, type HTMLAttributes } from "react";
import "./Stepper.css";

export type StepperAppearance = "light" | "dark";

export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Totaal aantal stappen in de les (2 of meer). */
  steps: number;
  /** Huidige stap, vanaf 1. */
  current: number;
  /** light op een lichte ondergrond, dark op beeld of een donker vlak. */
  appearance?: StepperAppearance;
  /** Voorleestekst; standaard "Stap {current} van {steps}". */
  label?: string;
}

/** Hoeveel stappen er hoogstens naast de huidige te zien zijn. */
export const VENSTER = 2;

/**
 * Welke stappen zichtbaar zijn en hoe. Het venster loopt van twee voor tot twee na de huidige stap; zo staan er nooit
 * drie inactieve stippen naast elkaar. De buitenste stip aan elke kant is klein, behalve als het de huidige is.
 */
export function stepperDots(steps: number, current: number) {
  const n = Math.max(1, Math.floor(steps));
  const c = Math.min(Math.max(1, Math.floor(current)), n);
  const from = Math.max(1, c - VENSTER);
  const to = Math.min(n, c + VENSTER);
  const dots = [];
  for (let step = from; step <= to; step++) {
    const active = step === c;
    const edge = step === from || step === to;
    dots.push({ step, active, small: edge && !active });
  }
  return dots;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  { steps, current, appearance = "light", label, className, ...rest },
  ref,
) {
  const dots = stepperDots(steps, current);
  const c = dots.find((d) => d.active)?.step ?? 1;
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps}
      aria-valuenow={c}
      aria-valuetext={label ?? `Stap ${c} van ${steps}`}
      aria-label={label ?? "Voortgang"}
      className={["oneui-stepper", `oneui-stepper--${appearance}`, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {dots.map((d) => (
        <span
          key={d.step}
          aria-hidden="true"
          data-step={d.step}
          className={["oneui-stepper__dot", d.active && "is-current", d.small && "is-small"].filter(Boolean).join(" ")}
        />
      ))}
    </div>
  );
});
