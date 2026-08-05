"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";
import { site } from "@/config/site";

/**
 * Limite d'erreur de la landing. Un composant client, comme l'impose React.
 *
 * L'action de reprise est `unstable_retry`, qui refait le rendu du segment en
 * rechargeant ses données : c'est ce que recommande la documentation de cette
 * version, `reset()` se contentant de remonter les enfants sans rien recharger.
 * Le nom porte un préfixe instable, à surveiller aux montées de version.
 *
 * Le pied de page n'est pas repris ici : il lit `site.legal`, et une page
 * d'erreur doit dépendre du moins de choses possible.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // En production, le message est masqué : `digest` est la seule clé qui
    // relie ce qu'a vu le visiteur aux journaux du serveur.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-[760px] flex-1 flex-col justify-center px-5 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-acier">
        Erreur
      </p>
      <h1 className="mt-4 text-3xl font-bold text-encre sm:text-4xl">
        Quelque chose s&rsquo;est mal passé.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-acier">
        L&rsquo;incident vient de chez nous, pas de vous. Réessayez : si cela
        persiste, écrivez-nous à{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-signal underline underline-offset-4"
        >
          {site.email}
        </a>
        .
      </p>
      <span className="filet-signal est-visible mx-auto mt-8" aria-hidden />

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="group inline-flex items-center gap-2.5 rounded-[4px] bg-signal px-8 py-4 font-medium text-white transition-colors hover:bg-signal-fonce"
        >
          <RotateCw
            size={20}
            strokeWidth={1.5}
            className="transition-transform duration-500 group-hover:rotate-180"
            aria-hidden
          />
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-[4px] border border-encre px-8 py-4 font-medium text-encre transition-colors hover:bg-encre hover:text-papier"
        >
          Retour à l&rsquo;accueil
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 font-mono text-xs text-acier/60">
          Référence : {error.digest}
        </p>
      )}
    </main>
  );
}
