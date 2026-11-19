import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ICONEN, type IconName } from "./icondata";
import "./Icon.css";

export type { IconName } from "./icondata";
export type IconSize = "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl";

export interface IconProps extends Omit<ComponentPropsWithoutRef<"svg">, "fill"> {
  /** Het icoon uit DS-Icons. */
  name: IconName;
  /** Vol in plaats van lijn. Voor wat gekozen of actief is, en in List item. */
  fill?: boolean;
  /** 2xs 12, xs 16, s 20, m 24, l 32, xl 40, 2xl 48. In een component (Button, List item …) bepaalt dat de maat. */
  size?: IconSize;
  /** Wat het icoon zegt, als er geen tekst naast staat. Zonder label is het decoratief en verborgen voor schermlezers. */
  label?: string;
}

/**
 * OneUI Icon. Figma: DS Components › Icon (Icon Asset, size, Fill). Elk icoon in de interface staat in dit
 * component (besluit 005). Kleur via currentColor: zet de kleur op de plek waar het staat, met een icon-token.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, fill = false, size = "m", label, className, ...rest },
  ref,
) {
  const paden = ICONEN[name][fill ? "v" : "l"].split("|");
  return (
    <svg ref={ref} viewBox="0 0 20 20" fill="currentColor" focusable="false"
      className={["oneui-icon", `oneui-icon--${size}`, className].filter(Boolean).join(" ")}
      role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}
      data-icon={name} data-fill={fill || undefined} {...rest}>
      {paden.map((p, i) => p.startsWith("!")
        ? <path key={i} d={p.slice(1)} fillRule="evenodd" clipRule="evenodd" />
        : <path key={i} d={p} />)}
    </svg>
  );
});

/** Voor componenten met een prop `icon`: een naam wordt een `<Icon>`, al het andere blijft zoals het is. */
export function alsIcoon(icon: ReactNode | IconName, fill = false): ReactNode {
  return typeof icon === "string" && icon in ICONEN ? <Icon name={icon as IconName} fill={fill} /> : icon;
}
