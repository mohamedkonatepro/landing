import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import PageLegale, { Section, Ligne } from "@/components/PageLegale";

const { legal } = site;

export const metadata: Metadata = {
  title: `Mentions légales : ${site.nom}`,
  description: `Informations légales du site ${site.url} : éditeur, hébergeur, propriété intellectuelle.`,
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  const capitalise = legal.capital
    ? `${legal.formeJuridique} au capital de ${legal.capital}`
    : legal.formeJuridique;

  return (
    <PageLegale
      titre="Mentions légales"
      chapo="Informations prévues par l'article 6 III-1 de la loi du 21 juin 2004 pour la confiance dans l'économie numérique."
    >
      <Section titre="Éditeur du site">
        <div>
          <Ligne intitule="Dénomination sociale" valeur={legal.raisonSociale} />
          <Ligne intitule="Forme juridique" valeur={capitalise} />
          <Ligne intitule="Siège social" valeur={legal.adresse} />
          <Ligne
            intitule="Immatriculation"
            valeur={
              legal.siren
                ? `SIREN ${legal.siren}${
                    legal.villeRcs ? `, RCS de ${legal.villeRcs}` : ""
                  }`
                : ""
            }
          />
          <Ligne intitule="TVA intracommunautaire" valeur={legal.tva} />
          <Ligne
            intitule="Directeur de la publication"
            valeur={legal.directeurPublication}
          />
          <Ligne intitule="Téléphone" valeur={legal.telephone} />
          <Ligne intitule="Adresse électronique" valeur={site.email} />
        </div>
      </Section>

      <Section titre="Hébergeur">
        <p>
          Le site est hébergé par {legal.hebergeur.nom},{" "}
          {legal.hebergeur.adresse}.
        </p>
        <p>
          <a
            href={legal.hebergeur.site}
            className="text-signal underline underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
          >
            {legal.hebergeur.site}
          </a>
        </p>
      </Section>

      <Section titre="Propriété intellectuelle">
        <p>
          Les textes, la structure et les éléments graphiques de ce site sont la
          propriété de son éditeur. Toute reproduction ou représentation, totale
          ou partielle, sans autorisation écrite préalable, est interdite.
        </p>
        <p>
          Les livrables réalisés dans le cadre d&rsquo;une prestation
          n&rsquo;entrent pas dans ce périmètre : le code produit pour un client
          lui appartient, selon les termes convenus avec lui.
        </p>
      </Section>

      <Section titre="Marques et projets cités">
        <p>
          Les noms et logos d&rsquo;entreprises affichés sous
          l&rsquo;intitulé « Projets sur lesquels nous sommes intervenus » sont
          la propriété exclusive de leurs titulaires respectifs. Ils sont
          mentionnés à titre de référence de projets auxquels nous avons
          contribué, à titre professionnel ou en tant que prestataire.
        </p>
        <p>
          Cette mention n&rsquo;implique ni relation commerciale actuelle, ni
          partenariat, ni recommandation, ni parrainage de la part de ces
          entreprises. Toute entreprise citée peut demander le retrait de sa
          mention en écrivant à {site.email} : elle sera retirée sans délai.
        </p>
      </Section>

      <Section titre="Responsabilité">
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif
          et peuvent évoluer. Les tarifs indiqués s&rsquo;entendent hors taxes
          et ne constituent pas une offre contractuelle : seul un devis signé
          engage l&rsquo;éditeur.
        </p>
        <p>
          L&rsquo;éditeur ne saurait être tenu responsable des dommages
          résultant d&rsquo;une indisponibilité temporaire du site ou de
          l&rsquo;usage fait des informations qu&rsquo;il contient.
        </p>
      </Section>

      <Section titre="Données personnelles et cookies">
        <p>
          Le traitement des données transmises via le formulaire de demande de
          rendez-vous est détaillé dans la{" "}
          <Link
            href="/confidentialite"
            className="text-signal underline underline-offset-4"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </Section>
    </PageLegale>
  );
}
