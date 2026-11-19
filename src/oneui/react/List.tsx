import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { IcoonChevronRechts } from "./iconen";
import { alsIcoon, type IconName } from "./Icon";
import "./List.css";

export type ListSurface = "default" | "sunken";
export type ListItemTone = "neutral" | "magenta" | "sky" | "amber" | "violet";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** De vlakken van de items: default (wit, op de grijze pagina) of sunken (grijs, in een wit vlak). */
  surface?: ListSurface;
  children: ReactNode;
}

/**
 * OneUI List, in de stijl Rond: losse ronde vlakken met ruimte ertussen, geen scheidingslijnen. De items zijn
 * `<ListItem>`.
 */
export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  { surface = "default", className, children, ...rest },
  ref,
) {
  return (
    <ul ref={ref} className={["oneui-list", `oneui-list--${surface}`, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </ul>
  );
});

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title" | "onClick"> {
  /** De titel, in label/L. */
  title: ReactNode;
  /** De regel eronder, in body/S en text/medium. */
  description?: ReactNode;
  /** Een icoon in een cirkel vooraan: een naam uit DS-Icons (vol, zie `iconFill`) of een eigen SVG. */
  icon?: ReactNode | IconName;
  /** Een icoon met een naam is in een List item vol. Zet dit op false voor de lijn. */
  iconFill?: boolean;
  /** De kleur van die cirkel: een subtle vlak met het icoon in de deep kleur. Merkkleuren mogen hier, in het icoon. */
  tone?: ListItemTone;
  /** Iets anders vooraan in plaats van het icoon, zoals een Avatar. */
  leading?: ReactNode;
  /** Wat er rechts staat: een tijd, een badge, een vinkje. Een item dat je kunt openen krijgt anders een chevron. */
  trailing?: ReactNode;
  /** Maakt het item een link. */
  href?: string;
  /** Maakt het item een knop. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Afgerond: de titel stapt een tint terug. */
  done?: boolean;
  disabled?: boolean;
}

/** OneUI List item. Een eigen wit vlak (radius/3xl, minstens 72 hoog), titel en beschrijving, iets vooraan en rechts. */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { title, description, icon, iconFill = true, tone = "neutral", leading, trailing, href, onClick, done, disabled, className, ...rest },
  ref,
) {
  const open = !!(href || onClick);
  const rechts = trailing ?? (open ? <span className="oneui-listitem__chevron"><IcoonChevronRechts /></span> : null);
  const inhoud = (
    <>
      {leading ?? (icon && <span className={`oneui-listitem__bol oneui-listitem__bol--${tone}`} aria-hidden="true">{alsIcoon(icon, iconFill)}</span>)}
      <span className="oneui-listitem__tekst">
        <span className="oneui-listitem__titel">{title}</span>
        {description && <span className="oneui-listitem__beschrijving">{description}</span>}
      </span>
      {rechts && <span className="oneui-listitem__rechts">{rechts}</span>}
    </>
  );
  const klassen = ["oneui-listitem", open && "is-open", done && "is-done", disabled && "is-disabled", className].filter(Boolean).join(" ");
  return (
    <li ref={ref} className={klassen} {...rest}>
      {href && !disabled ? <a className="oneui-listitem__vlak" href={href} onClick={onClick}>{inhoud}</a>
        : onClick ? <button type="button" className="oneui-listitem__vlak" onClick={onClick} disabled={disabled}>{inhoud}</button>
        : <div className="oneui-listitem__vlak">{inhoud}</div>}
    </li>
  );
});
