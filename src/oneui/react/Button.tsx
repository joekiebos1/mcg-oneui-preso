import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./Button.css";

export type ButtonType = "primary" | "secondary" | "neutral" | "ghost"
  /** @deprecated Rond heeft geen randen: outline toont als neutral. */
  | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Nadruk. primary = de ene actie die telt; daarna secondary, neutral, ghost. Altijd een vlak, nooit een rand. */
  variant?: ButtonType;
  /** Hoogte 36, 40 of 48. Het icoon groeit mee: 16, 20 of 24. */
  size?: ButtonSize;
  /** Icoon vóór de tekst. Een SVG die `currentColor` gebruikt; kleur en maat komen van de knop. */
  iconLeft?: ReactNode;
  /** Icoon na de tekst. Een chevron suggereert navigatie, geen actie. */
  iconRight?: ReactNode;
  /** Toont de spinner en verbergt het label, zonder dat de knop van breedte verandert. */
  loading?: boolean;
  /** Wat een schermlezer hoort tijdens het laden. */
  loadingLabel?: string;
  /** HTML-type van de knop. Standaard "button", zodat een knop nooit per ongeluk een formulier verstuurt. */
  htmlType?: "button" | "submit" | "reset";
  children: ReactNode;
}

/**
 * OneUI Button. Figma: DS Components › Button. Kleuren komen uit de action-tokens, iconen erven de labelkleur
 * (docs/besluiten/003-icoon-een-laag.md: in code is dat currentColor).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", iconLeft, iconRight, loading = false, loadingLabel = "Bezig…", htmlType = "button",
    disabled, className, children, onClick, ...rest },
  ref,
) {
  const type = variant === "outline" ? "neutral" : variant;
  const classes = ["oneui-button", `oneui-button--${type}`, `oneui-button--${size}`, loading && "is-loading", className]
    .filter(Boolean).join(" ");
  return (
    <button
      ref={ref}
      type={htmlType}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? (e) => e.preventDefault() : onClick}
      {...rest}
    >
      <span className="oneui-button__content" aria-hidden={loading || undefined}>
        {iconLeft && <span className="oneui-button__icon">{iconLeft}</span>}
        <span className="oneui-button__label">{children}</span>
        {iconRight && <span className="oneui-button__icon">{iconRight}</span>}
      </span>
      {loading && (
        <span className="oneui-button__spinner" role="status">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="42 100" />
          </svg>
          <span className="oneui-visually-hidden">{loadingLabel}</span>
        </span>
      )}
    </button>
  );
});
