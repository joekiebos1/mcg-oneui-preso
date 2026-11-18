import { useEffect, useState } from "react";
/** De huidige brand en thema (van <html>), en een teller die verandert als een van beide wisselt. */
export function useOmgeving() {
  const lees = () => ({ brand: document.documentElement.dataset.brand ?? "classic", thema: document.documentElement.dataset.theme ?? "light" });
  const [o, setO] = useState(lees);
  useEffect(() => {
    const m = new MutationObserver(() => setO(lees()));
    m.observe(document.documentElement, { attributes: true, attributeFilter: ["data-brand", "data-theme"] });
    return () => m.disconnect();
  }, []);
  return o;
}
