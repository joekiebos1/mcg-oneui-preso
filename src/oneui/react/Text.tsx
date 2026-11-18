import { forwardRef, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import "./Text.css";

/** De tekststijlen uit DS Foundations, in dezelfde namen (display/S → "display-s"). */
export type TextStyle =
  | "display-xl" | "display-l" | "display-m" | "display-s"
  | "heading-l" | "heading-m" | "heading-s"
  | "title-xl" | "title-l" | "title-m" | "title-s"
  | "body-xl" | "body-l" | "body-m" | "body-s" | "body-xs" | "body-2xs"
  | "label-xl" | "label-l" | "label-m" | "label-s";

/** De teksttokens: text/high, text/medium, … */
export type TextColor =
  | "high" | "medium" | "low" | "subtle" | "disabled" | "link"
  | "on-bold" | "on-deep" | "on-inverse";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Tekststijl uit Foundations. Standaard body-m. */
  variant?: TextStyle;
  /** Kleur: een text/…-token. Standaard high. */
  color?: TextColor;
  /** Het HTML-element. Kies op betekenis (h1, h2, p, span), niet op uiterlijk; de stijl regelt het uiterlijk. */
  as?: ElementType;
  children: ReactNode;
}

/** OneUI Text. Figma: de tekststijlen in DS Foundations. Geen eigen maten of kleuren: alleen tokens. */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { variant = "body-m", color = "high", as: Tag = "p", className, style, children, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={["oneui-text", `oneui-text--${variant}`, className].filter(Boolean).join(" ")}
      style={{ "--_color": `var(--oneui-text-${color})`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
});
