import { useEffect, useState } from "react";
/** Het huidige thema (van <html>); verandert als het thema wisselt. */
export function useOmgeving() {
  const lees = () => ({ thema: document.documentElement.dataset.theme ?? "light" });
  const [o, setO] = useState(lees);
  useEffect(() => {
    const m = new MutationObserver(() => setO(lees()));
    m.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => m.disconnect();
  }, []);
  return o;
}
