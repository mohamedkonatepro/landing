import { site } from "@/config/site";
import { objections } from "@/config/objections";

const { legal } = site;

/**
 * Données structurées de la landing, au format JSON-LD.
 *
 * `Organization` décrit l'éditeur, `FAQPage` reprend la section « Vos
 * questions » telle qu'elle est affichée — c'est la condition posée par Google :
 * une FAQ déclarée mais absente de la page est une infraction, pas un bonus.
 *
 * Les champs d'identification encore vides dans `config/site.ts` sont omis
 * plutôt que déclarés vides : un `legalName: ""` vaut moins que pas de champ.
 */
function organisation() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.nom,
    url: site.url,
    email: site.email,
    description: site.description,
    ...(legal.raisonSociale && { legalName: legal.raisonSociale }),
    ...(legal.telephone && { telephone: legal.telephone }),
    ...(legal.tva && { vatID: legal.tva }),
    ...(legal.adresse && {
      address: {
        "@type": "PostalAddress",
        streetAddress: legal.adresse,
        addressCountry: "FR",
      },
    }),
  };
}

function faq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: objections.map((o) => ({
      "@type": "Question",
      name: o.q,
      acceptedAnswer: { "@type": "Answer", text: o.r },
    })),
  };
}

/**
 * `JSON.stringify` ne neutralise pas les chaînes hostiles : le guide Next
 * impose de remplacer `<` par son équivalent unicode, faute de quoi un
 * `</script>` glissé dans une réponse refermerait la balise.
 */
function serialiser(donnees: object) {
  return JSON.stringify(donnees).replace(/</g, "\\u003c");
}

export default function DonneesStructurees() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialiser(organisation()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialiser(faq()) }}
      />
    </>
  );
}
