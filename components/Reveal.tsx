"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationsReduites } from "./useAnimationsReduites";

type Props = {
  children: React.ReactNode;
  /** Retard en ms, pour décaler les éléments d'une même rangée. */
  delai?: number;
  className?: string;
};

/**
 * Révèle son contenu quand il entre dans le champ de vision.
 *
 * Trois garde-fous, pour qu'aucun contenu ne puisse rester invisible :
 * 1. animations désactivées par l'utilisateur : on affiche tout de suite
 * 2. élément déjà à l'écran au montage : on affiche tout de suite
 * 3. IntersectionObserver absent ou muet : un écouteur de défilement prend le relais
 */
export default function Reveal({ children, delai = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduit = useAnimationsReduites();
  const [revele, setRevele] = useState(false);

  // Garde-fou 1 : animations désactivées, tout est visible sans observation.
  const visible = reduit || revele;

  useEffect(() => {
    if (reduit) return;
    const el = ref.current;
    if (!el) return;

    const hauteurEcran = () =>
      window.innerHeight || document.documentElement.clientHeight || 0;

    // Vrai dès que l'élément a atteint le bas de l'écran, et le reste s'il est
    // déjà passé au-dessus : on n'arrive jamais sur du contenu resté invisible,
    // que ce soit en remontant ou en arrivant par une ancre. Hauteur d'écran
    // non mesurable : on affiche plutôt que de risquer de laisser du contenu
    // invisible.
    const dansEcran = () => {
      const h = hauteurEcran();
      if (!h) return true;
      return el.getBoundingClientRect().top < h - 40;
    };

    let observateur: IntersectionObserver | undefined;

    const afficher = () => {
      setRevele(true);
      observateur?.disconnect();
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
    };

    const auDefilement = () => {
      if (dansEcran()) afficher();
    };

    if (typeof IntersectionObserver !== "undefined") {
      observateur = new IntersectionObserver(
        ([entree]) => {
          if (entree.isIntersecting) afficher();
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );
      observateur.observe(el);
    }

    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement, { passive: true });

    // Garde-fous 2 et 3, en un seul examen différé d'une image : l'élément déjà
    // à l'écran au montage, et l'absence d'IntersectionObserver. Différé pour
    // ne pas appeler setState dans le corps de l'effet, ce qui déclencherait un
    // rendu en cascade.
    const image = requestAnimationFrame(auDefilement);

    return () => {
      cancelAnimationFrame(image);
      observateur?.disconnect();
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
    };
  }, [reduit]);

  return (
    <div
      ref={ref}
      className={`reveal-item ${visible ? "est-visible" : ""} ${className}`}
      style={delai ? { transitionDelay: `${delai}ms` } : undefined}
    >
      {children}
    </div>
  );
}
