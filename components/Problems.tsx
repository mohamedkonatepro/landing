import { Clock, Receipt, FileClock, FolderSearch } from "lucide-react";
import Reveal from "./Reveal";

const situations = [
  {
    icon: Clock,
    titre: "Trois fois la même saisie",
    texte:
      "Les mêmes informations tapées dans un tableur, puis dans un logiciel, puis transmises à la comptabilité. Chaque semaine, par plusieurs collaborateurs.",
  },
  {
    icon: Receipt,
    titre: "Les preuves terrain perdues",
    texte:
      "Un bon de livraison égaré, des heures d'attente non notées, un extra sur chantier oublié. Des milliers d'euros de travail réel qui ne sont jamais facturés.",
  },
  {
    icon: FileClock,
    titre: "Des jours pour sortir un devis",
    texte:
      "Les demandes de chiffrage s'accumulent. Vous devez les faire le soir ou le week-end, pendant que le prospect relance ou part chez un concurrent plus réactif.",
  },
  {
    icon: FolderSearch,
    titre: "Les documents introuvables",
    texte:
      "Devis, factures, contrats, justificatifs : on les cherche dans l'urgence, perdus entre trois boîtes mail et des dossiers papier.",
  },
];

export default function Problems() {
  return (
    <section className="border-b border-trait">
      <div className="mx-auto max-w-[1200px] px-5 py-20 lg:py-24">
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-trait bg-white px-4 py-1.5 text-sm font-medium text-acier">
              Le constat
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-encre sm:text-4xl">
              Des heures de bureau que personne ne vous paie.
            </h2>
            <span className="filet-signal mx-auto mt-6" aria-hidden />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {situations.map((s, i) => (
            <Reveal key={s.titre} delai={i * 90} className="h-full">
              <div className="carte group h-full rounded-lg border border-trait bg-white p-7">
                <div className="flex items-start justify-between">
                  <s.icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-acier transition-colors duration-300 group-hover:text-signal"
                    aria-hidden
                  />
                  <span
                    className="font-mono text-xs text-acier/40 transition-colors duration-300 group-hover:text-signal"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-encre">
                  {s.titre}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-acier">
                  {s.texte}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
