import { Calculator, Workflow, Check, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import Reveal from "./Reveal";

const offres = [
  {
    icon: Calculator,
    titre: "Le diagnostic",
    accroche: "Le chiffrage de vos heures perdues.",
    labelPrix: "Coût",
    prix: "Offert",
    mentionPrix: null,
    cta: "Demander un diagnostic",
    ctaPrimaire: true,
    sousCta: "Réponse sous 24 h.",
    lignes: [
      `Visio de ${site.dureeDiagnosticHeures} h, sans préparation de votre côté`,
      "Votre organisation cartographiée sur une page",
      "Vos heures perdues chiffrées en euros par an",
      "Ce qui ne mérite pas de développement, dit clairement",
      "Une automatisation simple, livrée et fonctionnelle",
      "Tout vous appartient, sans aucun engagement",
    ],
  },
  {
    icon: Workflow,
    titre: "Le sur-mesure",
    accroche: "L'outil métier construit pour vous.",
    labelPrix: "à partir de",
    prix: `${new Intl.NumberFormat("fr-FR").format(site.prixDeveloppementMin)} €`,
    mentionPrix: null,
    cta: "Nous contacter",
    ctaPrimaire: true,
    sousCta: "Réponse sous 24 h.",
    lignes: [
      "CRM ou ERP adapté à votre métier",
      "Automatisation de vos process, saisie unique",
      "IA là où elle fait gagner des heures réelles",
      "Reprise de vos données existantes",
      "Formation de vos équipes à la prise en main",
      "Code documenté, hébergé sur vos comptes",
    ],
  },
];

const etapes = [
  `Visio de ${site.dureeDiagnosticHeures} h`,
  "Restitution",
  "Vous repartez avec les livrables",
];

export default function Offers() {
  return (
    <section id="diagnostic" className="relative overflow-hidden bg-encre">
      {/* Halo émeraude très diffus, pour éviter un aplat trop plat */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 opacity-[0.14]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-signal), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1000px] px-5 py-20 lg:py-24">
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-papier/20 px-4 py-1.5 text-sm font-medium text-papier/70">
              Les offres
            </span>
            <h2 className="mx-auto mt-5 max-w-xl text-3xl font-bold text-papier sm:text-4xl">
              Deux offres indépendantes.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-papier/60">
              Le diagnostic se suffit à lui-même. Vous repartez avec les
              livrables, que vous alliez plus loin ou non.
            </p>
            <span className="filet-signal mx-auto mt-6" aria-hidden />
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
          {offres.map((o, i) => (
            <Reveal key={o.titre} delai={i * 140} className="h-full">
              <div className="carte group flex h-full flex-col overflow-hidden rounded-lg border border-transparent shadow-[0_18px_50px_-24px_rgba(0,0,0,0.55)]">
                {/* Panneau haut : identité, prix, action */}
                <div className="bg-white p-8">
                  <o.icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-signal transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  />
                  <h3 className="mt-6 font-display text-2xl font-semibold text-encre">
                    {o.titre}
                  </h3>
                  <p className="mt-1 text-[15px] text-acier">{o.accroche}</p>

                  <p className="mt-8 text-sm text-acier">{o.labelPrix}</p>
                  <p className="mt-1 font-mono text-4xl font-medium text-encre">
                    {o.prix}
                    {o.mentionPrix && (
                      <span className="text-signal"> {o.mentionPrix}</span>
                    )}
                  </p>

                  <a
                    href="#diagnostic-form"
                    className={`mt-8 flex items-center justify-center gap-2.5 rounded-[4px] px-5 py-3.5 text-center font-medium transition-colors ${
                      o.ctaPrimaire
                        ? "bg-signal text-white hover:bg-signal-fonce"
                        : "border border-encre text-encre hover:bg-encre hover:text-papier"
                    }`}
                  >
                    {o.cta}
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </a>
                  <p className="mt-3 text-center text-sm text-acier">
                    {o.sousCta}
                  </p>
                </div>

                {/* Panneau bas : ce qui est inclus */}
                <div className="flex-1 border-t border-trait bg-papier p-8">
                  <ul className="space-y-3.5">
                    {o.lignes.map((l) => (
                      <li
                        key={l}
                        className="flex gap-3 text-[15px] leading-relaxed text-encre"
                      >
                        <Check
                          size={20}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0 text-signal"
                          aria-hidden
                        />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Déroulé, relié par des flèches */}
        <Reveal delai={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-papier/60">
            {etapes.map((e, i) => (
              <span key={e} className="flex items-center gap-4">
                {i > 0 && (
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="text-papier/25"
                    aria-hidden
                  />
                )}
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-papier/25 font-mono text-xs text-signal">
                    {i + 1}
                  </span>
                  {e}
                </span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
