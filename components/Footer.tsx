import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-encre text-papier">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-papier"
          >
            {site.nom}
          </Link>
          <p className="mt-1 text-sm text-papier/70">
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-papier"
            >
              {site.email}
            </a>
            {site.legal.telephone && (
              <>
                <span className="px-2 text-papier/30" aria-hidden>
                  ·
                </span>
                <a
                  href={`tel:${site.legal.telephone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-papier"
                >
                  {site.legal.telephone}
                </a>
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-papier/70">
          <Link
            href="/mentions-legales"
            className="transition-colors hover:text-papier"
          >
            Mentions légales
          </Link>
          <Link
            href="/confidentialite"
            className="transition-colors hover:text-papier"
          >
            Confidentialité
          </Link>
          <span className="font-mono text-papier/60">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
