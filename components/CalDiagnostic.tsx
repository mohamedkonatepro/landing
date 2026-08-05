"use client";

import { useEffect } from "react";

/** Identifiant de l'agenda Cal.com et de son espace de noms. */
const CAL_LIEN = "fastwebapp/diagnostic";
const CAL_NAMESPACE = "diagnostic";

// Types minimaux pour la file d'attente de l'API Cal, sans `any`.
type CalApi = ((...args: unknown[]) => void) & {
  ns?: Record<string, CalApi>;
  q?: unknown[][];
  loaded?: boolean;
};
declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/**
 * Prise de rendez-vous Cal.com, en intégration continue dans la page.
 *
 * Le script est chargé depuis app.cal.com : c'est un service tiers, déclaré
 * comme tel dans la politique de confidentialité. La couleur de marque reprend
 * l'accent du site pour que le calendrier ne détonne pas.
 */
export default function CalDiagnostic() {
  useEffect(() => {
    // Boucle d'amorçage officielle de Cal, transposée en TypeScript avec des
    // paramètres du reste au lieu de `arguments`. Elle insère le script une
    // seule fois, puis empile les commandes en attendant qu'il soit prêt.
    (function (C: Window, A: string, L: string) {
      const empiler = (a: CalApi, ar: unknown[]) => {
        (a.q ??= []).push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...ar: unknown[]) {
          const cal = C.Cal as CalApi;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: CalApi = function (...apiAr: unknown[]) {
              empiler(api, apiAr);
            } as CalApi;
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns![namespace] = cal.ns![namespace] || api;
              empiler(cal.ns![namespace], ar);
              empiler(cal, ["initNamespace", namespace]);
            } else {
              empiler(cal, ar);
            }
            return;
          }
          empiler(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal!;
    Cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });

    Cal.ns![CAL_NAMESPACE]("inline", {
      elementOrSelector: "#cal-diagnostic",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: CAL_LIEN,
    });

    Cal.ns![CAL_NAMESPACE]("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#058c63" },
        dark: { "cal-brand": "#058c63" },
      },
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, []);

  return (
    <div
      id="cal-diagnostic"
      className="min-h-[640px] w-full overflow-hidden rounded-lg border border-trait bg-white"
    />
  );
}
