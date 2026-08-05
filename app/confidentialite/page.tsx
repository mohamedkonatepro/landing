import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import PageLegale, { Section, Ligne } from "@/components/PageLegale";

const { legal } = site;

export const metadata: Metadata = {
  title: `Politique de confidentialité : ${site.nom}`,
  description:
    "Quelles données sont collectées par le formulaire de demande de rendez-vous, pourquoi, combien de temps elles sont conservées et comment exercer vos droits.",
  robots: { index: false, follow: true },
};

/**
 * Décrit exactement ce que fait le site : la prise de rendez-vous est confiée
 * à Cal.com, chargé dans la page. Toute évolution de cette intégration, ou du
 * reste du code, doit être répercutée ici.
 */
export default function Confidentialite() {
  return (
    <PageLegale
      titre="Politique de confidentialité"
      chapo="Ce site ne collecte de données que lorsque vous prenez rendez-vous. La prise de rendez-vous est assurée par un outil tiers, Cal.com, chargé dans la page. En dehors de cet outil, le site n'utilise aucune mesure d'audience ni traceur publicitaire."
    >
      <Section titre="Responsable du traitement">
        <div>
          <Ligne intitule="Responsable" valeur={legal.raisonSociale} />
          <Ligne intitule="Adresse" valeur={legal.adresse} />
          <Ligne intitule="Contact" valeur={site.email} />
        </div>
        <p>
          Les informations complètes d&rsquo;identification figurent dans les{" "}
          <Link
            href="/mentions-legales"
            className="text-signal underline underline-offset-4"
          >
            mentions légales
          </Link>
          .
        </p>
      </Section>

      <Section titre="Données collectées">
        <p>
          Elles proviennent du calendrier de prise de rendez-vous, et sont
          celles que vous saisissez au moment de réserver :
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>votre nom et votre adresse électronique ;</li>
          <li>
            le créneau que vous choisissez, et les éventuelles précisions que
            vous ajoutez ;
          </li>
          <li>
            les données techniques nécessaires au fonctionnement du calendrier,
            décrites plus bas.
          </li>
        </ul>
        <p>
          Aucun profilage n&rsquo;est réalisé, et aucune décision automatisée
          n&rsquo;est prise à partir de ces données.
        </p>
      </Section>

      <Section titre="Finalité et base légale">
        <p>
          Ces données servent uniquement à vous recontacter pour organiser le
          rendez-vous que vous demandez, et à échanger sur votre besoin.
        </p>
        <p>
          La base légale est l&rsquo;exécution de mesures précontractuelles
          prises à votre demande (article 6.1.b du RGPD). Sans ces
          informations, nous ne pouvons pas vous répondre.
        </p>
        <p>
          Vos coordonnées ne sont utilisées pour aucune prospection non
          sollicitée, et ne sont ni vendues, ni louées, ni cédées.
        </p>
      </Section>

      <Section titre="Destinataires et sous-traitants">
        <p>
          Vos données de rendez-vous sont traitées pour notre compte par les
          prestataires techniques suivants, en qualité de sous-traitants au sens
          de l&rsquo;article 28 du RGPD :
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            <span className="text-encre">Cal.com, Inc.</span> (États-Unis), qui
            fournit le calendrier de prise de rendez-vous. Le calendrier est
            chargé directement dans la page&nbsp;: en l&rsquo;affichant, votre
            navigateur communique avec les serveurs de Cal.com, qui reçoit à ce
            titre votre adresse IP et dépose des cookies nécessaires à son
            fonctionnement. Les informations que vous saisissez pour réserver
            sont enregistrées chez Cal.com et nous sont transmises.
          </li>
          <li>
            <span className="text-encre">{legal.hebergeur.nom}</span>, pour
            l&rsquo;hébergement du site.
          </li>
        </ul>
        <p>
          Ces transferts hors Union européenne sont encadrés par les clauses
          contractuelles types de la Commission européenne et, le cas échéant,
          par le cadre de protection des données UE&nbsp;–&nbsp;États-Unis. Le
          détail du traitement réalisé par Cal.com figure dans sa propre
          politique de confidentialité, sur{" "}
          <a
            href="https://cal.com/privacy"
            className="text-signal underline underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
          >
            cal.com/privacy
          </a>
          .
        </p>
      </Section>

      <Section titre="Durée de conservation">
        <p>
          Les demandes sont conservées {legal.conservationMois} mois à compter
          du dernier échange, puis supprimées. Si une relation contractuelle
          naît de votre demande, les documents associés sont conservés pendant
          la durée légale applicable aux documents commerciaux et comptables.
        </p>
      </Section>

      <Section titre="Cookies et ressources tierces">
        <p>
          En dehors du calendrier de rendez-vous, ce site ne dépose aucun cookie
          et n&rsquo;utilise aucun outil de mesure d&rsquo;audience ni traceur
          publicitaire. Les polices de caractères et les logos affichés sont
          servis depuis ce site.
        </p>
        <p>
          Le calendrier fait exception : il est fourni par Cal.com et chargé
          depuis ses serveurs. Il dépose des cookies strictement nécessaires à
          son fonctionnement et communique avec Cal.com dès qu&rsquo;il
          s&rsquo;affiche. Ces cookies ne servent ni à la publicité, ni au suivi
          de votre navigation sur d&rsquo;autres sites.
        </p>
      </Section>

      <Section titre="Sécurité">
        <p>
          Les échanges avec le site comme avec le calendrier de rendez-vous sont
          chiffrés (HTTPS).
        </p>
      </Section>

      <Section titre="Vos droits">
        <p>
          Vous disposez d&rsquo;un droit d&rsquo;accès, de rectification,
          d&rsquo;effacement, de limitation et d&rsquo;opposition au traitement,
          ainsi que d&rsquo;un droit à la portabilité de vos données.
        </p>
        <p>
          Pour les exercer, écrivez à{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-signal underline underline-offset-4"
          >
            {site.email}
          </a>
          . Nous répondons dans un délai d&rsquo;un mois.
        </p>
        <p>
          Si la réponse ne vous satisfait pas, vous pouvez introduire une
          réclamation auprès de la CNIL,{" "}
          <a
            href="https://www.cnil.fr"
            className="text-signal underline underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
          >
            www.cnil.fr
          </a>
          , 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
      </Section>
    </PageLegale>
  );
}
