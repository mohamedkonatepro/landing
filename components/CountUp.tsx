"use client";

import { useEffect, useRef } from "react";

type Props = {
  valeur: number;
  suffixe?: string;
};

/**
 * Compte de 0 jusqu'à la valeur quand le chiffre entre dans le champ de vision.
 * Le rendu serveur affiche déjà la valeur finale : l'animation ne fait que
 * réécrire le contenu côté client, donc rien ne casse sans JavaScript.
 */
export default function CountUp({ valeur, suffixe = "+" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        observateur.disconnect();

        const duree = 1200;
        const depart = performance.now();

        const etape = (maintenant: number) => {
          const avancement = Math.min(1, (maintenant - depart) / duree);
          const adouci = 1 - Math.pow(1 - avancement, 3);
          el.textContent = `${Math.round(valeur * adouci)}${suffixe}`;
          if (avancement < 1) requestAnimationFrame(etape);
        };

        el.textContent = `0${suffixe}`;
        requestAnimationFrame(etape);
      },
      { threshold: 0.5 },
    );

    observateur.observe(el);
    return () => observateur.disconnect();
  }, [valeur, suffixe]);

  return (
    <span ref={ref}>
      {valeur}
      {suffixe}
    </span>
  );
}
