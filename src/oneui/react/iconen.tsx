// Kleine iconen die de componenten zelf nodig hebben, in de stijl van DS Icons: lijn, rond, currentColor.
// Kleur en maat komen van de plek waar ze staan (docs/besluiten/003-icoon-een-laag.md).
import type { ReactNode } from "react";

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false">{children}</svg>
);

export const IcoonChevronOmlaag = () => <Svg><path d="m6 9 6 6 6-6" /></Svg>;
export const IcoonZoek = () => <Svg><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></Svg>;
export const IcoonVink = () => <Svg><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>;
export const IcoonMin = () => <Svg><path d="M6 12h12" /></Svg>;
export const IcoonVet = () => <Svg><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" /></Svg>;
export const IcoonCursief = () => <Svg><path d="M11 5h6M7 19h6M14 5l-4 14" /></Svg>;
export const IcoonOnderstreept = () => <Svg><path d="M7 5v6a5 5 0 0 0 10 0V5M5 20h14" /></Svg>;
export const IcoonKop1 = () => <Svg><path d="M4 6v12M12 6v12M4 12h8M17 10l2.5-2V18" /></Svg>;
export const IcoonKop2 = () => <Svg><path d="M4 6v12M12 6v12M4 12h8M16.5 10a2.25 2.25 0 1 1 3.9 1.6L16.5 18h4.5" /></Svg>;
export const IcoonGenummerd = () => <Svg><path d="M10 6h10M10 12h10M10 18h10M4 5l1.5-1V9M4 15h2.5L4 19h2.5" /></Svg>;
export const IcoonOpsomming = () => <Svg><path d="M10 6h10M10 12h10M10 18h10" /><circle cx="5" cy="6" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="5" cy="18" r="1" /></Svg>;
export const IcoonLijn = () => <Svg><path d="M4 12h16" /></Svg>;
export const IcoonLink = () => <Svg><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></Svg>;
export const IcoonKruis = () => <Svg><path d="M7 7l10 10M17 7 7 17" /></Svg>;
export const IcoonChevronRechts = () => <Svg><path d="m9 6 6 6-6 6" /></Svg>;
