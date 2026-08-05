import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import CountUp from "./CountUp";
import Demos from "./Demos";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-trait">
      {/* Quadrillage technique, très discret */}
      <div
        aria-hidden
        className="grille-technique pointer-events-none absolute inset-0"
      />
      {/* Halo derrière le titre */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-signal), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-16 text-center lg:pt-24">
        <div className="reveal inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full border border-trait bg-white px-7 py-3 shadow-[0_1px_2px_rgba(18,35,58,0.04)]">
          <span className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-medium text-signal">
              <CountUp valeur={site.experienceAnnees} />
            </span>
            <span className="text-sm text-acier">
              années d&rsquo;expérience en développement
            </span>
          </span>
          <span className="hidden h-5 w-px bg-trait sm:block" aria-hidden />
          <span className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-medium text-signal">
              <CountUp valeur={site.projetsTermines} />
            </span>
            <span className="text-sm text-acier">
              projets livrés et terminés
            </span>
          </span>
        </div>

        <h1 className="reveal mx-auto mt-7 max-w-3xl text-4xl font-bold text-encre sm:text-5xl lg:text-[54px]">
          L&rsquo;administratif dévore vos journées. Ce n&rsquo;est pas votre
          métier.
        </h1>

        <p className="reveal-2 mx-auto mt-6 max-w-2xl text-lg text-acier">
          Devis, factures, tableurs, relances, documents éparpillés : autant
          d&rsquo;heures qui ne vont ni à vos clients, ni à votre activité.
          Nous construisons des outils sur mesure qui font ce travail à votre
          place.
        </p>

        <div className="reveal-3 mt-9">
          <a
            href="#diagnostic-form"
            className="group inline-flex items-center gap-2.5 rounded-[4px] bg-signal px-8 py-4 font-medium text-white transition-colors hover:bg-signal-fonce"
          >
            Demander un diagnostic
            <ArrowRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
          <p className="mt-4 text-sm text-acier">Réponse sous 24&nbsp;h.</p>
        </div>

        {/* Les outils construits, un par secteur. Le détail s'ouvre au clic. */}
        <div className="reveal-3 mx-auto mt-14 max-w-[1000px] text-left">
          <Demos />
        </div>
      </div>
    </section>
  );
}
