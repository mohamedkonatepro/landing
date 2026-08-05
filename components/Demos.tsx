"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { demos, type Demo } from "@/config/demos";

/**
 * Une carte par secteur, l'outil correspondant en aperçu. Le détail, avec
 * tous les écrans et leurs explications, s'ouvre au clic dans une fenêtre :
 * la page d'accueil ne montre que les entrées, jamais le contenu.
 */
export default function Demos() {
  const [ouverte, setOuverte] = useState<Demo | null>(null);

  return (
    <>
      {/* La largeur suit le nombre de secteurs : une carte seule occuperait
          sinon toute la largeur du hero. Avec les trois secteurs, la grille
          s'étend et passe à trois colonnes. */}
      <div
        className={`grid gap-4 ${
          demos.length > 2
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : demos.length === 2
              ? "mx-auto max-w-[860px] sm:grid-cols-2"
              : "mx-auto max-w-[440px]"
        }`}
      >
        {demos.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setOuverte(d)}
            className="carte group overflow-hidden rounded-lg border border-trait bg-white text-left"
          >
            <span className="block overflow-hidden bg-papier">
              <Image
                src={d.apercu}
                alt=""
                sizes="(max-width: 640px) 100vw, 420px"
                className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </span>
            <span className="flex items-start justify-between gap-4 border-t border-trait p-5">
              <span className="block">
                <span className="block font-display text-lg font-semibold text-encre">
                  {d.secteur}
                </span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-acier">
                  {d.promesse}
                </span>
                <span className="mt-3 block text-sm font-medium text-signal">
                  Voir les {d.ecrans.length} écrans
                </span>
              </span>
              <ArrowUpRight
                size={20}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-acier transition-colors group-hover:text-signal"
                aria-hidden
              />
            </span>
          </button>
        ))}
      </div>

      {ouverte && (
        <Fenetre demo={ouverte} fermer={() => setOuverte(null)} />
      )}
    </>
  );
}

/**
 * Fenêtre de détail. L'élément `dialog` natif apporte le piège de focus, la
 * fermeture par la touche d'échappement et l'inertie du reste de la page,
 * sans avoir à les réécrire.
 */
function Fenetre({ demo, fermer }: { demo: Demo; fermer: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.showModal();
    const auClavier = () => fermer();
    el.addEventListener("close", auClavier);
    document.body.style.overflow = "hidden";
    return () => {
      el.removeEventListener("close", auClavier);
      document.body.style.overflow = "";
    };
  }, [fermer]);

  return (
    <dialog
      ref={ref}
      aria-label={`Outil de démonstration : ${demo.secteur}`}
      onClick={(e) => {
        if (e.target === ref.current) fermer();
      }}
      className="m-auto w-[min(1100px,92vw)] max-w-none rounded-lg bg-papier p-0 backdrop:bg-encre/70 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-trait bg-papier px-6 py-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-acier">
            {demo.secteur}
          </p>
          <h2 className="mt-1.5 font-display text-xl font-semibold text-encre">
            {demo.entreprise}
          </h2>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-acier">
            {demo.promesse}
          </p>
        </div>
        <button
          type="button"
          onClick={fermer}
          aria-label="Fermer"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-trait text-acier transition-colors hover:border-encre hover:text-encre"
        >
          <X size={18} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      <div className="space-y-8 px-6 py-8">
        {demo.ecrans.map((e, i) => (
          <figure key={e.id}>
            <figcaption className="mb-3">
              <h3 className="font-display text-base font-semibold text-encre">
                <span className="font-mono text-sm text-acier">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {e.titre}
              </h3>
              <p className="mt-1 max-w-3xl text-[15px] leading-relaxed text-acier">
                <span className="font-medium text-signal">
                  À regarder&nbsp;:{" "}
                </span>
                {e.aRegarder}
              </p>
            </figcaption>

            <div className="overflow-hidden rounded-[4px] border border-trait bg-white">
              {e.media.type === "video" ? (
                <video
                  src={e.media.src}
                  poster={e.media.affiche}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={e.media.alt}
                  className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full"
                />
              ) : (
                <Image
                  src={e.media.image}
                  alt={e.media.alt}
                  quality={90}
                  sizes="(max-width: 1100px) 92vw, 1040px"
                  className="block h-auto w-full"
                />
              )}
            </div>

            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-acier">
              <span>Outil de démonstration, données fictives.</span>
              <a
                href={e.fichier}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-signal"
              >
                Voir en grand
              </a>
            </p>
          </figure>
        ))}
      </div>
    </dialog>
  );
}
