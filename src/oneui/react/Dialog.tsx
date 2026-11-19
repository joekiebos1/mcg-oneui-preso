import { useEffect, useId, useRef, type ReactNode } from "react";
import "./Dialog.css";

export type DialogActions = "stack" | "row";
export type DialogTone = "neutral" | "magenta" | "sky" | "amber" | "violet";

export interface DialogProps {
  open: boolean;
  /** Bij Escape, een klik op de achtergrond of een knop die sluit. */
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  /** Een icoon in een grote cirkel boven de titel. */
  icon?: ReactNode;
  /** De kleur van die cirkel: een subtle vlak met het icoon in de deep kleur. */
  tone?: DialogTone;
  /** De knoppen, de belangrijkste eerst. */
  actions?: ReactNode;
  /** stack: onder elkaar over de hele breedte (standaard, ook op de telefoon). row: rechts naast elkaar. */
  actionsLayout?: DialogActions;
  /** Sluit niet bij een klik op de achtergrond, alleen met een knop of Escape. */
  dismissable?: boolean;
  className?: string;
}

/**
 * OneUI Dialog, in de stijl Rond: een groot rond vlak (radius/4xl) met een zachte schaduw op een scrim. Een native
 * `<dialog>` met `showModal()`: de focus blijft erin, Escape sluit, de rest van de pagina is inert.
 */
export function Dialog({ open, onClose, title, children, icon, tone = "sky", actions, actionsLayout = "stack",
  dismissable = true, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titelId = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", ""); }
    if (!open && d.open) { if (typeof d.close === "function") d.close(); else d.removeAttribute("open"); }
  }, [open]);
  return (
    <dialog ref={ref} className={["oneui-dialog", className].filter(Boolean).join(" ")} aria-labelledby={titelId}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => { if (dismissable && e.target === ref.current) onClose(); }}>
      <div className="oneui-dialog__vlak">
        {icon && <span className={`oneui-dialog__bol oneui-dialog__bol--${tone}`} aria-hidden="true">{icon}</span>}
        <h2 id={titelId} className="oneui-dialog__titel">{title}</h2>
        {children && <div className="oneui-dialog__tekst">{children}</div>}
        {actions && <div className={`oneui-dialog__acties oneui-dialog__acties--${actionsLayout}`}>{actions}</div>}
      </div>
    </dialog>
  );
}
