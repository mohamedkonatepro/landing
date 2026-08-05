import { X, Check, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Les quatre premières lignes répondent une à une aux quatre cartes du
 * constat, dans le même ordre : la même douleur, retournée. La cinquième
 * n'a pas de carte, elle répond à l'objection du logiciel déjà en place.
 */
const aujourdhui = [
  "Une information saisie trois fois, dans trois outils différents",
  "Des heures d'attente et des extras oubliés, jamais facturés",
  "Les devis chiffrés le soir, quand le prospect a déjà relancé",
  "Les documents éparpillés dans trois boîtes mail",
  "Des logiciels génériques que personne n'utilise vraiment",
];

const avec = [
  "Une saisie unique, qui circule jusqu'à la facturation et la compta",
  "Chaque heure et chaque extra tracés sur place, donc facturés",
  "Un devis chiffré et envoyé dans la journée, pendant que c'est chaud",
  "Devis, factures, contrats, justificatifs : au même endroit",
  "Un outil qui parle votre vocabulaire, adopté parce qu'il sert",
];

export default function Comparison() {
  return (
    <section className="border-b border-trait">
      <div className="mx-auto max-w-[1200px] px-5 py-20 lg:py-24">
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-trait bg-white px-4 py-1.5 text-sm font-medium text-acier">
              La différence
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-encre sm:text-4xl">
              Ce qui change avec un outil fait pour votre métier.
            </h2>
            <span className="filet-signal mx-auto mt-6" aria-hidden />
          </div>
        </Reveal>

        <div className="relative mx-auto mt-14 grid max-w-5xl items-stretch gap-5 lg:grid-cols-2">
          {/* Aujourd'hui */}
          <Reveal className="h-full">
            <div className="h-full rounded-lg border border-trait bg-white p-8">
              <h3 className="font-display text-xl font-semibold text-acier">
                Aujourd&rsquo;hui
              </h3>
              <ul className="mt-6 space-y-5">
                {aujourdhui.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-acier"
                  >
                    <X
                      size={20}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-acier/60"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Flèche de passage, visible en grand écran */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            aria-hidden
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-trait bg-signal text-white shadow-[0_6px_18px_-6px_rgba(232,89,12,0.6)]">
              <ArrowRight size={22} strokeWidth={1.5} />
            </span>
          </div>

          {/* Avec un outil sur mesure */}
          <Reveal delai={140} className="h-full">
            <div className="h-full rounded-lg bg-encre p-8 text-papier">
              <h3 className="font-display text-xl font-semibold">
                Avec un outil sur mesure
              </h3>
              <ul className="mt-6 space-y-5">
                {avec.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-papier/90"
                  >
                    <Check
                      size={20}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-signal"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
