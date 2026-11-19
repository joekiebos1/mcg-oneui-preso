import { type HTMLAttributes, type ReactNode } from "react";
import "./Progress.css";

const deel = (value: number, max: number) => Math.min(1, Math.max(0, max > 0 ? value / max : 0));

export type ProgressBarSize = "md" | "lg";

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  /** Standaard 100. */
  max?: number;
  /** Boven de balk links: waar de voortgang over gaat. Zonder label geef je een `aria-label`. */
  label?: ReactNode;
  /** Boven de balk rechts, zoals "43%" of "5 van 7 dagen". Standaard het percentage; `false` verbergt het. */
  valueLabel?: ReactNode | false;
  /** md 8 dik (standaard), lg 12. */
  size?: ProgressBarSize;
}

/** OneUI Progress bar, in de stijl Rond: een dikke baan met ronde uiteinden, gevuld in action/primary (sky). */
export function ProgressBar({ value, max = 100, label, valueLabel, size = "md", className, ...rest }: ProgressBarProps) {
  const d = deel(value, max);
  const rechts = valueLabel === false ? null : valueLabel ?? `${Math.round(d * 100)}%`;
  return (
    <div className={["oneui-progressbar", `oneui-progressbar--${size}`, className].filter(Boolean).join(" ")}>
      {(label || rechts) && (
        <div className="oneui-progressbar__kop" aria-hidden="true">
          <span>{label}</span>{rechts && <span className="oneui-progressbar__waarde">{rechts}</span>}
        </div>
      )}
      <div className="oneui-progressbar__baan" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}
        aria-label={typeof label === "string" ? label : undefined} {...rest}>
        <span className="oneui-progressbar__vul" style={{ width: `${d * 100}%` }} />
      </div>
    </div>
  );
}

export type ProgressRingSize = "sm" | "md" | "lg";

export interface ProgressRingProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  max?: number;
  /** In het midden, zoals "3/7". Standaard het percentage bij md en lg; sm is leeg. `false` verbergt het. */
  children?: ReactNode | false;
  /** sm 40, md 64, lg 96. */
  size?: ProgressRingSize;
  /** Wat een schermlezer hoort, bijv. "Lessen gedaan". */
  "aria-label": string;
}

/** OneUI Progress ring: dezelfde voortgang als de balk, als een ring met ronde uiteinden. Begint bovenaan. */
export function ProgressRing({ value, max = 100, children, size = "md", className, ...rest }: ProgressRingProps) {
  const d = deel(value, max);
  const midden = children === false ? null : children ?? (size === "sm" ? null : `${Math.round(d * 100)}%`);
  return (
    <div className={["oneui-progressring", `oneui-progressring--${size}`, className].filter(Boolean).join(" ")}
      role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} {...rest}>
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <circle className="oneui-progressring__baan" cx="50" cy="50" r="42" pathLength={100} />
        {d > 0 && <circle className="oneui-progressring__vul" cx="50" cy="50" r="42" pathLength={100}
          strokeDasharray={`${d * 100} 100`} />}
      </svg>
      {midden && <span className="oneui-progressring__midden" aria-hidden="true">{midden}</span>}
    </div>
  );
}
