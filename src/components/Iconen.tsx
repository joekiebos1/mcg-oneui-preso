// Iconen in de stijl van DS Icons: 24 px, lijn 1,75, rond, kleur via currentColor (zoals in de Myndlet-app).
import type { ReactNode } from "react";

const Svg = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export const IcoonLogo = () => <Svg><circle cx="12" cy="12" r="8.5" /><path d="M8.5 13.5c1 1.5 2.2 2.2 3.5 2.2s2.5-.7 3.5-2.2" /></Svg>;
export const IcoonKleur = () => <Svg><path d="M12 3.5c3.5 4 5.5 7 5.5 9.5a5.5 5.5 0 0 1-11 0c0-2.5 2-5.5 5.5-9.5Z" /></Svg>;
export const IcoonIcoon = () => <Svg><path d="m12 4 2.3 4.8 5.2.7-3.8 3.6.9 5.2L12 15.8l-4.6 2.5.9-5.2-3.8-3.6 5.2-.7Z" /></Svg>;
export const IcoonType = () => <Svg><path d="M5 19 10.5 5h1L17 19M7.3 13.5h7.4" /><path d="M17.5 19h2" /></Svg>;
export const IcoonVorm = () => <Svg><rect x="4" y="4" width="9" height="9" rx="2.5" /><circle cx="15.5" cy="15.5" r="4.5" /></Svg>;
export const IcoonLayout = () => <Svg><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M4 9.5h16M10 9.5V20" /></Svg>;
export const IcoonIllustratie = () => <Svg><path d="M4 17c2.5-4 4.5-6 6.5-6s3 2 4.5 2 2.5-1.5 5-4.5" /><circle cx="8" cy="7" r="2" /></Svg>;
export const IcoonBeeld = () => <Svg><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><path d="m3.5 16 4.5-4 4 3.5 3-2.5 5.5 4.5" /><circle cx="15.5" cy="9.5" r="1.5" /></Svg>;
export const IcoonVideo = () => <Svg><rect x="3.5" y="6" width="12" height="12" rx="2.5" /><path d="m15.5 10.5 5-3v9l-5-3" /></Svg>;
export const IcoonGeluid = () => <Svg><path d="M4 10v4M8 7v10M12 4.5v15M16 8v8M20 10.5v3" /></Svg>;
export const IcoonComponent = () => <Svg><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="3.5" /></Svg>;
export const IcoonToegang = () => <Svg><circle cx="12" cy="5" r="1.75" /><path d="M5 8.5c2.5.8 4.8 1.2 7 1.2s4.5-.4 7-1.2M12 9.7V14m0 0-3 6m3-6 3 6" /></Svg>;
export const IcoonSurface = () => <Svg><rect x="7" y="4" width="13" height="10" rx="2" /><path d="M4 9v8.5A2.5 2.5 0 0 0 6.5 20H16" /></Svg>;
export const IcoonMotion = () => <Svg><path d="M4 16c3 0 4-8 8-8s5 8 8 8" /><circle cx="20" cy="16" r="1.5" /></Svg>;
export const IcoonTaal = () => <Svg><path d="M5 6.5h14M5 11.5h14M5 16.5h9" /></Svg>;
export const IcoonAssets = () => <Svg><path d="M4 8.5 12 4l8 4.5-8 4.5Z" /><path d="m4 12.5 8 4.5 8-4.5M4 16.5 12 21l8-4.5" /></Svg>;
export const IcoonChevron = () => <Svg><path d="m9 6 6 6-6 6" /></Svg>;
export const IcoonZijbalk = () => <Svg><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><path d="M9.5 4.5v15" /></Svg>;
export const IcoonLinks = () => <Svg><path d="M15 6l-6 6 6 6" /></Svg>;
export const IcoonRechts = () => <Svg><path d="m9 6 6 6-6 6" /></Svg>;
