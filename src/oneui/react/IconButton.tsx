import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./IconButton.css";

export type IconButtonType = "primary" | "secondary" | "neutral" | "ghost"
  /** @deprecated Rond heeft geen randen: outline toont als neutral. */
  | "outline";
export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  /** Wat de knop doet, voor schermlezers en als tooltip. Verplicht: er staat geen tekst op. */
  "aria-label": string;
  /** Het icoon: een SVG die `currentColor` gebruikt. Kleur en maat komen van de knop. */
  icon: ReactNode;
  /** primary en secondary uit de action-tokens, neutral een grijs vlak (standaard), ghost kaal. */
  variant?: IconButtonType;
  /** Doorsnee 28, 36, 40, 48 of 56; het icoon 16, 16, 20, 24 of 24. */
  size?: IconButtonSize;
  /** HTML-type. Standaard "button". */
  htmlType?: "button" | "submit" | "reset";
}

/** OneUI Icon Button. Figma: DS Components › Icon Button. Een cirkel, altijd een vlak of kaal, nooit een rand. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = "neutral", size = "md", htmlType = "button", className, title, ...rest },
  ref,
) {
  const type = variant === "outline" ? "neutral" : variant;
  return (
    <button ref={ref} type={htmlType} title={title ?? rest["aria-label"]}
      className={["oneui-iconbutton", `oneui-iconbutton--${type}`, `oneui-iconbutton--${size}`, className].filter(Boolean).join(" ")}
      {...rest}>
      <span className="oneui-iconbutton__icon" aria-hidden="true">{icon}</span>
    </button>
  );
});
