"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";

/** Pixels par seconde du défilement automatique. */
const VITESSE = 26;
/** Délai après le dernier geste avant que le défilement reprenne, en ms. */
const REPRISE_MS = 1200;

/**
 * Bande des projets, qui défile seule et que l'on peut attraper au doigt.
 *
 * Le mouvement est un vrai défilement de la boîte, et non une transformation :
 * c'est ce qui permet de le saisir, de le lancer, et de profiter de l'inertie
 * native du navigateur.
 *
 * La liste est affichée trois fois, et la position revient d'une largeur en
 * arrière dès qu'elle dépasse le premier jeu, ce qui rend la boucle invisible.
 * Trois copies et non deux : avec deux, la course maximale vaut deux jeux
 * moins la largeur visible, soit moins d'un jeu sur un grand écran, et le
 * point de bouclage devient inatteignable. La bande s'arrêterait en butée.
 */
const COPIES = 3;
export default function BandeLogos() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sansAnimation = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /**
     * Position visée, tenue en mémoire avec ses décimales.
     *
     * Elle ne peut pas être lue depuis l'élément à chaque image : le
     * défilement automatique n'avance que d'un demi-pixel par image, et
     * plusieurs navigateurs mobiles arrondissent `scrollLeft` à l'entier.
     * L'incrément serait alors perdu à chaque tour et la bande resterait
     * immobile. On cumule donc ici, et on écrit une valeur absolue.
     */
    let position = el.scrollLeft;

    /** Ramène une position dans le premier jeu, pour une bande sans fin. */
    const normaliser = (v: number) => {
      const jeu = el.scrollWidth / COPIES;
      if (jeu <= 0) return v;
      if (v >= jeu) return v - jeu;
      if (v <= 0) return v + jeu;
      return v;
    };

    // Un écart important entre la position visée et la position réelle ne peut
    // venir que d'un geste : on se recale alors sur ce que l'utilisateur a fait.
    const auScroll = () => {
      if (Math.abs(el.scrollLeft - position) > 2) position = el.scrollLeft;
      const corrigee = normaliser(el.scrollLeft);
      if (corrigee !== el.scrollLeft) {
        el.scrollLeft = corrigee;
        position = corrigee;
      }
    };

    el.addEventListener("scroll", auScroll, { passive: true });

    if (sansAnimation) return () => el.removeEventListener("scroll", auScroll);

    let repriseA = 0;
    let dernier = 0;
    let image = 0;
    let visible = true;

    // Tout geste suspend le défilement, le temps que l'inertie retombe.
    const suspendre = () => {
      repriseA = performance.now() + REPRISE_MS;
    };
    el.addEventListener("pointerdown", suspendre);
    el.addEventListener("touchstart", suspendre, { passive: true });
    el.addEventListener("wheel", suspendre, { passive: true });

    const avancer = (maintenant: number) => {
      image = requestAnimationFrame(avancer);
      const ecart = dernier ? maintenant - dernier : 0;
      dernier = maintenant;
      if (!visible || maintenant < repriseA || ecart <= 0 || ecart > 200) return;
      position = normaliser(position + (VITESSE * ecart) / 1000);
      el.scrollLeft = position;
    };

    image = requestAnimationFrame(avancer);

    // Hors de l'écran, le défilement s'arrête : rien à animer, rien à dépenser.
    const observateur = new IntersectionObserver(
      ([entree]) => {
        visible = entree.isIntersecting;
        dernier = 0;
        position = el.scrollLeft;
      },
      { threshold: 0, rootMargin: "0px 0px 120px 0px" },
    );
    observateur.observe(el);

    return () => {
      cancelAnimationFrame(image);
      observateur.disconnect();
      el.removeEventListener("scroll", auScroll);
      el.removeEventListener("pointerdown", suspendre);
      el.removeEventListener("touchstart", suspendre);
      el.removeEventListener("wheel", suspendre);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="bande-logos mt-6 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="piste flex w-max items-center">
        {Array.from({ length: COPIES }, () => site.references)
          .flat()
          .map((r, i) => (
            <span
              key={`${r.nom}-${i}`}
              className="mx-8 flex items-center gap-2.5"
              /* Seul le premier jeu est annoncé : les copies ne servent qu'à
                 rendre la boucle continue. */
              aria-hidden={i >= site.references.length}
            >
              {r.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.logo}
                  alt={r.nom}
                  draggable={false}
                  className="w-auto rounded-[4px] object-contain"
                  /* La hauteur passe par une propriété personnalisée : le CSS
                     peut ainsi la réduire sur mobile, ce qu'un style en ligne
                     interdirait. */
                  style={
                    {
                      "--hauteur": `${r.logoHauteur ?? 36}px`,
                      marginTop: r.logoDecalageY ?? 0,
                    } as React.CSSProperties
                  }
                />
              ) : (
                <span className="whitespace-nowrap font-display text-lg font-semibold text-acier">
                  {r.nom}
                </span>
              )}
            </span>
          ))}
      </div>
    </div>
  );
}
