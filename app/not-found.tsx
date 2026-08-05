import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import Footer from "@/components/Footer";

/**
 * 404. Pas d'en-tête collant ni d'appel au diagnostic : sur une page d'erreur,
 * le seul service à rendre est de ramener à l'accueil. Next y ajoute de
 * lui-même un `noindex`, il n'y a donc pas de métadonnée à déclarer ici.
 */
export default function NotFound() {
  return (
    <>
      <header className="border-b border-trait">
        <div className="mx-auto flex h-16 max-w-[760px] items-center px-5">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-encre"
          >
            {site.nom}
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[760px] flex-1 flex-col justify-center px-5 py-24 text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-acier">
          Erreur 404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-encre sm:text-4xl">
          Cette page n&rsquo;existe pas.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-acier">
          Le lien est peut-être ancien, ou l&rsquo;adresse mal recopiée. Tout ce
          que propose {site.nom}{" "}
          tient sur la page d&rsquo;accueil.
        </p>
        <span className="filet-signal est-visible mx-auto mt-8" aria-hidden />

        <div className="mt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-[4px] bg-signal px-8 py-4 font-medium text-white transition-colors hover:bg-signal-fonce"
          >
            Retour à l&rsquo;accueil
            <ArrowRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
