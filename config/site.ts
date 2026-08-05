/**
 * Valeurs éditables de la page. Tout ce qui change d'une offre à l'autre, ou
 * d'un mois à l'autre, se modifie ici, jamais dans les composants. Les
 * créneaux eux-mêmes sont tenus par Cal.com, pas par ce fichier.
 */

export type Reference = {
  nom: string;
  /**
   * Chemin d'un logo local dans public/logos. Sans logo, le nom s'affiche en
   * toutes lettres : aucune image n'est chargée depuis un service tiers, pour
   * ne pas exposer l'IP des visiteurs sans leur consentement.
   */
  logo?: string;
  /** Hauteur d'affichage en px (défaut : 36). Utile quand le fichier a des marges. */
  logoHauteur?: number;
  /** Décalage vertical en px (négatif = vers le haut) pour aligner visuellement. */
  logoDecalageY?: number;
};

/**
 * Projets sur lesquels nous sommes intervenus. La formulation affichée est
 * factuelle et n'affirme pas une relation client directe : ne pas la
 * transformer en « nos clients » sans accord écrit des entreprises citées.
 */
const references: readonly Reference[] = [
  { nom: "Disneyland Paris", logo: "/logos/disneyland-paris.png" },
  // Marques presque carrées : une hauteur réduite les équilibre avec les
  // mots-symboles, qui paraissent sinon deux fois plus petits.
  { nom: "Carrefour", logo: "/logos/carrefour.svg", logoHauteur: 34 },
  { nom: "SFR", logo: "/logos/sfr.svg", logoHauteur: 30 },
  { nom: "Mr.Bricolage", logo: "/logos/mr-bricolage.png", logoHauteur: 26 },
  // Logo blanc sur aplat vert, recadré au plus près du tracé : les angles
  // arrondis du composant en font une pastille assumée plutôt qu'un aplat
  // qui déborde. La variante verticale reste dans public/logos, inutilisée.
  { nom: "JobTeaser", logo: "/logos/jobteaser.png", logoHauteur: 30 },
];

/**
 * Informations légales. Les champs laissés vides s'affichent en évidence sur
 * la page « Mentions légales » : ils sont obligatoires (LCEN, art. 6 III-1) et
 * la page ne doit pas être mise en ligne tant qu'ils ne sont pas renseignés.
 */
const legal: {
  raisonSociale: string;
  formeJuridique: string;
  capital: string;
  siren: string;
  villeRcs: string;
  tva: string;
  adresse: string;
  directeurPublication: string;
  telephone: string;
  hebergeur: { nom: string; adresse: string; site: string };
  miseAJour: string;
  conservationMois: number;
} = {
  /** Dénomination sociale exacte, telle qu'inscrite au RCS. */
  raisonSociale: "",
  /** Ex. « SAS », « SASU », « EURL », ou « entrepreneur individuel ». */
  formeJuridique: "",
  /** Montant du capital social. Laisser vide pour une entreprise individuelle. */
  capital: "",
  /** 9 chiffres. */
  siren: "",
  /** Ville du greffe d'immatriculation. */
  villeRcs: "",
  /** Numéro de TVA intracommunautaire, ou vide si franchise en base. */
  tva: "",
  /** Adresse complète du siège social. */
  adresse: "",
  /** Personne physique responsable du contenu publié. */
  directeurPublication: "",
  /** Affiché sur les pages légales et dans le pied de page. */
  telephone: "",
  /** À corriger si le site n'est pas hébergé chez Vercel. */
  hebergeur: {
    nom: "Vercel Inc.",
    adresse: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    site: "https://vercel.com",
  },
  /** Date de dernière mise à jour des pages légales. */
  miseAJour: "6 août 2026",
  /** Durée de conservation des demandes de rendez-vous, en mois. */
  conservationMois: 36,
};

export const site = {
  nom: "FastWebApp",
  description:
    "Développement d'outils métier sur mesure (CRM, ERP, automatisations) pour les PME du BTP, de la logistique et du transport, de 10 à 50 salariés.",
  url: "https://fastwebapp.fr",

  // Diagnostic
  diagnosticsParMois: 4,
  dureeDiagnosticHeures: 1,

  // Développement sur mesure
  prixDeveloppementMin: 5000,

  // Preuves
  experienceAnnees: 8,
  projetsTermines: 20,
  references,

  // Contact
  email: "contact@fastwebapp.fr",

  // Pages légales
  legal,
} as const;

export type Site = typeof site;
