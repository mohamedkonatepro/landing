"use client";

import { useEffect, useState } from "react";
import { useAnimationsReduites } from "./useAnimationsReduites";

const irritants = [
  "les mêmes infos saisies trois fois",
  "la marge découverte trop tard",
  "des devis jamais relancés",
  "des documents introuvables",
  "des factures ressaisies à la main",
  "des tableurs qui ne se parlent pas",
  "l'administratif fini le dimanche",
];

const ITEM_H = 68; // hauteur d'une ligne, en px
const VISIBLE = 5; // lignes affichées dans la fenêtre
const CENTRE = Math.floor(VISIBLE / 2);
const INTERVALLE = 2200; // ms entre deux lignes

export default function PainTicker() {
  const [step, setStep] = useState(0);
  const [anime, setAnime] = useState(true);
  const reduit = useAnimationsReduites();

  useEffect(() => {
    if (reduit) return;

    const id = setInterval(() => {
      setStep((s) => {
        const suivant = s + 1;
        // Arrivé sur le jeu dupliqué : on repasse au début sans transition
        if (suivant === irritants.length) {
          setTimeout(() => {
            setAnime(false);
            setStep(0);
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setAnime(true)),
            );
          }, 700);
        }
        return suivant;
      });
    }, INTERVALLE);

    return () => clearInterval(id);
  }, [reduit]);

  return (
    <section className="border-b border-trait bg-white">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20">
        {/* Intitulé */}
        <div className="relative">
          {/* Remonté par transformation, sans toucher à la hauteur du bloc :
              le centre de la colonne ne bouge pas, donc la flèche reste
              alignée sur la phrase mise en avant. */}
          <div className="lg:-translate-y-10">
            <p className="font-mono text-sm uppercase tracking-widest text-acier">
              Chaque semaine
            </p>
            {/* 360 px est la largeur minimale qui tient sur deux lignes
                à cette taille de police. */}
            <h2 className="mt-4 max-w-sm text-2xl font-bold text-encre sm:text-3xl lg:max-w-[360px]">
              Le temps ne part pas dans votre métier. Il part là.
            </h2>
          </div>

          {/* Flèche tracée à la main. Ancrée sur le centre de la rangée, qui
              est exactement la hauteur de la phrase mise en avant : la pointe
              est à y=42 dans un dessin de 56 de haut, d'où le décalage. */}
          <svg
            viewBox="0 0 140 56"
            className="absolute right-0 top-1/2 hidden h-16 w-[130px] text-signal opacity-80 lg:block"
            style={{ marginTop: "-40px", marginRight: "-30px" }}
            fill="none"
            aria-hidden
          >
            <path
              d="M4 12C34 6 38 40 70 42C92 44 106 44 130 42"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M120 36L130 42L120 48"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Liste verticale */}
        {reduit ? (
          <ul className="space-y-3">
            {irritants.map((t) => (
              <li
                key={t}
                className="flex items-baseline gap-4 text-xl text-encre"
              >
                <span className="h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_72%,transparent)]"
            style={{ height: ITEM_H * VISIBLE }}
          >
            <div
              style={{
                transform: `translateY(${(CENTRE - step) * ITEM_H}px)`,
                transition: anime
                  ? "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
              }}
            >
              {[...irritants, ...irritants].map((t, i) => {
                const actif = i === step;
                return (
                  <div
                    key={`${t}-${i}`}
                    className="flex items-center gap-5"
                    style={{ height: ITEM_H }}
                    aria-hidden={i >= irritants.length || !actif}
                  >
                    <span
                      className="w-8 shrink-0 transition-all duration-500"
                      style={{
                        height: 2,
                        background: actif
                          ? "var(--color-signal)"
                          : "var(--color-trait)",
                        opacity: actif ? 1 : 0.7,
                        transform: actif ? "scaleX(1)" : "scaleX(0.4)",
                        transformOrigin: "left",
                      }}
                      aria-hidden
                    />
                    <span
                      className={`text-2xl transition-colors duration-500 sm:text-3xl ${
                        actif
                          ? "font-display font-semibold text-signal"
                          : "text-acier/30"
                      }`}
                    >
                      {t}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
