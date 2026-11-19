import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import "./NavItem.css";

export type NavItemOrientation = "vertical" | "horizontal";

export interface NavProps extends HTMLAttributes<HTMLElement> {
  /** vertical: een zijmenu, de items onder elkaar. horizontal: naast elkaar. */
  orientation?: NavItemOrientation;
  /** Wat een schermlezer hoort, bijv. "Hoofdmenu". */
  "aria-label": string;
  children: ReactNode;
}

/** OneUI Nav: een `<nav>` met `<NavItem>`s, zonder lijnen. */
export function Nav({ orientation = "vertical", className, children, ...rest }: NavProps) {
  return (
    <nav className={["oneui-nav", `oneui-nav--${orientation}`, className].filter(Boolean).join(" ")} {...rest}>
      <ul className="oneui-nav__lijst">{children}</ul>
    </nav>
  );
}

export interface NavItemProps {
  label: ReactNode;
  /** Een icoon vooraan. Het mag een merkkleur hebben; de pil zelf blijft neutraal of sky. */
  icon?: ReactNode;
  /** Een aantal rechts, zoals ongelezen berichten. */
  counter?: number;
  /** De pagina waar je bent: een sky pil, en `aria-current="page"`. */
  active?: boolean;
  disabled?: boolean;
  orientation?: NavItemOrientation;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
}

/** OneUI Nav item. Figma: DS Components › Nav item (orientation, state; counter, icon). In de stijl Rond: een pil. */
export const NavItem = forwardRef<HTMLElement, NavItemProps>(function NavItem(
  { label, icon, counter, active, disabled, orientation = "vertical", href, onClick, className },
  ref,
) {
  const klassen = ["oneui-navitem", `oneui-navitem--${orientation}`, active && "is-active", disabled && "is-disabled", className]
    .filter(Boolean).join(" ");
  const inhoud = (
    <>
      {icon && <span className="oneui-navitem__icon" aria-hidden="true">{icon}</span>}
      <span className="oneui-navitem__label">{label}</span>
      {counter !== undefined && counter > 0 && <span className="oneui-navitem__counter">{counter > 99 ? "99+" : counter}</span>}
    </>
  );
  const huidig = active ? ("page" as const) : undefined;
  return (
    <li className="oneui-nav__item">
      {href && !disabled
        ? <a ref={ref as never} className={klassen} href={href} onClick={onClick} aria-current={huidig}>{inhoud}</a>
        : <button ref={ref as never} type="button" className={klassen} onClick={onClick} disabled={disabled} aria-current={huidig}>{inhoud}</button>}
    </li>
  );
});
