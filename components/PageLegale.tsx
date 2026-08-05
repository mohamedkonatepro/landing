import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";
import Footer from "./Footer";

/**
 * Gabarit commun aux pages légales : même identité que la landing, sans
 * en-tête collant ni appel à l'action, pour que ces pages restent des pages
 * d'information et non un second tunnel de conversion.
 */
export default function PageLegale({
  titre,
  chapo,
  children,
}: {
  titre: string;
  chapo?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-trait">
        <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between px-5">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-encre"
          >
            {site.nom}
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-acier transition-colors hover:text-signal"
          >
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
            Retour à l&rsquo;accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[760px] flex-1 px-5 py-16 lg:py-20">
        <h1 className="text-3xl font-bold text-encre sm:text-4xl">{titre}</h1>
        {chapo && (
          <p className="mt-5 text-lg leading-relaxed text-acier">{chapo}</p>
        )}
        <p className="mt-5 font-mono text-sm text-acier">
          Dernière mise à jour : {site.legal.miseAJour}
        </p>
        <span className="filet-signal est-visible mt-8" aria-hidden />

        <div className="mt-10 space-y-12">{children}</div>
      </main>

      <Footer />
    </>
  );
}

/** Section titrée. Le contenu suit un rythme de lecture unique. */
export function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-encre">
        {titre}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-acier">
        {children}
      </div>
    </section>
  );
}

/**
 * Ligne d'identification. Une valeur vide s'affiche en évidence plutôt que de
 * disparaître : une mention légale incomplète doit se voir.
 */
export function Ligne({
  intitule,
  valeur,
}: {
  intitule: string;
  valeur?: string;
}) {
  const renseigne = Boolean(valeur && valeur.trim());
  return (
    <div className="flex flex-col gap-1 border-t border-trait py-3 sm:flex-row sm:gap-6">
      <span className="shrink-0 sm:w-56">{intitule}</span>
      {renseigne ? (
        <span className="text-encre">{valeur}</span>
      ) : (
        <span className="font-mono text-sm text-signal">à compléter</span>
      )}
    </div>
  );
}
