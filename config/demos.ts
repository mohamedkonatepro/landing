import type { StaticImageData } from "next/image";
import montageHero from "@/public/dayot/montage-hero.png";
import montageAlerte from "@/public/dayot/montage-alerte.png";
import montageChaine from "@/public/dayot/montage-chaine.png";
import sorenvalHero from "@/public/sorenval/montage-hero.png";
import sorenvalAlerte from "@/public/sorenval/montage-alerte.png";
import sorenvalChaine from "@/public/sorenval/montage-chaine.png";
import ferrandelHero from "@/public/ferrandel/montage-hero.png";
import ferrandelAlerte from "@/public/ferrandel/montage-alerte.png";
import ferrandelChaine from "@/public/ferrandel/montage-chaine.png";

/**
 * Les outils de démonstration, un par secteur.
 *
 * Ajouter un secteur ne demande que de compléter ce tableau : la grille de la
 * page et la fenêtre de détail s'y adaptent d'elles-mêmes. Tant qu'un secteur
 * n'a pas d'outil construit, il ne figure pas ici plutôt que d'apparaître vide.
 */

export type Ecran = {
  id: string;
  titre: string;
  /** Ce que l'œil doit chercher dans l'écran. C'est le texte le plus utile. */
  aRegarder: string;
  /** Chemin du fichier d'origine, ouvert dans un nouvel onglet. */
  fichier: string;
  media:
    | { type: "image"; image: StaticImageData; alt: string }
    | { type: "video"; src: string; affiche: string; alt: string };
};

export type Demo = {
  id: string;
  /** Nom du secteur, affiché sur la carte. */
  secteur: string;
  /** Nom de l'entreprise fictive. */
  entreprise: string;
  /** Une phrase, ce que l'outil supprime comme travail. */
  promesse: string;
  /** Image de la carte, avant ouverture du détail. */
  apercu: StaticImageData;
  /** Montage d'ouverture, premier écran de la fenêtre de détail. */
  ecrans: Ecran[];
};

const btp: Demo = {
  id: "btp",
  secteur: "BTP, gros œuvre",
  entreprise: "DoyatConstruction",
  promesse:
    "Les heures pointées sur le chantier ressortent en marge et en situation de travaux, sans ressaisie.",
  apercu: montageHero,
  ecrans: [
    {
      id: "affaires",
      titre: "Le suivi des affaires",
      aRegarder:
        "La colonne MARGE %. Six chantiers, leur marge à date, et celui qui dérape signalé en rouge.",
      fichier: "/dayot/montage-hero.png",
      media: {
        type: "image",
        image: montageHero,
        alt: "Écran de suivi des affaires d'une entreprise de gros œuvre : six chantiers listés avec leur montant vendu, leur dépensé, leur marge en pourcentage et leur avancement. À droite, un téléphone affiche la saisie des heures par lot.",
      },
    },
    {
      id: "avant-apres",
      titre: "La marge, avant et après",
      aRegarder:
        "La marge passe de 14,2 % à 13,9 % parce que quatre compagnons ont pointé depuis le chantier. Personne au bureau n'a retapé une ligne.",
      fichier: "/dayot/anim-avant-apres.mp4",
      media: {
        type: "video",
        src: "/dayot/anim-avant-apres.mp4",
        affiche: "/dayot/poster-avant-apres.png",
        alt: "La ligne du chantier Résidence Les Tilleuls passe d'un dépensé de 353 501 euros et d'une marge de 14,2 pour cent à un dépensé de 354 813 euros et une marge de 13,9 pour cent.",
      },
    },
    {
      id: "terrain",
      titre: "Le pointage, sur le chantier",
      aRegarder:
        "Le nombre de gestes. Choisir le chantier, cocher les présents, régler les heures, valider. Aucun clavier à sortir.",
      fichier: "/dayot/anim-pointage-terrain.mp4",
      media: {
        type: "video",
        src: "/dayot/anim-pointage-terrain.mp4",
        affiche: "/dayot/poster-pointage-terrain.png",
        alt: "Sur un téléphone, un chef d'équipe choisit son chantier, coche quatre compagnons, saisit huit heures sur le lot Élévation, ajoute une note et une photo, puis valide.",
      },
    },
    {
      id: "chaine",
      titre: "Du pointage à la situation de travaux",
      aRegarder:
        "Les trois étapes qui s'enchaînent. La saisie au pouce sur le chantier, les heures valorisées à leur coût horaire dans la fiche affaire, puis la situation qui se compose seule, retenue de garantie et compte prorata compris.",
      fichier: "/dayot/montage-chaine.png",
      media: {
        type: "image",
        image: montageChaine,
        alt: "Trois étapes enchaînées : un pointage de 8 heures sur le lot Élévation saisi sur un téléphone, les quatre pointages valorisés en tête de la fiche affaire, puis une situation de travaux composée selon l'avancement des lots, pour un net à payer de 130 041,22 euros toutes taxes comprises.",
      },
    },
    {
      id: "derive",
      titre: "Le chantier qui dérape",
      aRegarder:
        "Les chiffres en rouge. 4,2 % de marge au lieu des 13,2 % chiffrés, pour un budget consommé à 110 % alors que le chantier n'est avancé qu'à 80 %.",
      fichier: "/dayot/montage-alerte.png",
      media: {
        type: "image",
        image: montageAlerte,
        alt: "Un chantier d'extension scolaire affiche une marge à date de 4,2 pour cent au lieu des 13,2 pour cent prévus au chiffrage, avec un budget consommé à 110,3 pour cent pour un avancement réel de 80,4 pour cent.",
      },
    },
  ],
};

const logistique: Demo = {
  id: "logistique",
  secteur: "Logistique pour compte de tiers",
  entreprise: "Sorenval Logistique",
  promesse:
    "Chaque mouvement fait sur le quai part sur la facture du donneur d'ordre, y compris les prestations hors contrat.",
  apercu: sorenvalHero,
  ecrans: [
    {
      id: "clients",
      titre: "Le suivi des donneurs d'ordre",
      aRegarder:
        "La colonne TAUX DE REFACTURATION, et les 10 193 € de manque à facturer affichés en haut : des prestations réalisées, chiffrées, et jamais transmises en facturation.",
      fichier: "/sorenval/montage-hero.png",
      media: {
        type: "image",
        image: sorenvalHero,
        alt: "Écran de suivi de six donneurs d'ordre d'un prestataire logistique, avec pour chacun le nombre de mouvements, le facturable du mois, le déjà facturé, le taux de refacturation et les prestations hors contrat. À droite, un terminal de quai affiche la saisie d'une réception de 24 palettes.",
      },
    },
    {
      id: "avant-apres",
      titre: "Le facturable, avant et après",
      aRegarder:
        "Le facturable de Maison Vaubelle passe de 37 988 € à 38 051 € parce que 24 palettes et 1,5 h de filmage manuel viennent d'être saisies sur le quai. Personne au bureau n'a retapé une ligne.",
      fichier: "/sorenval/anim-avant-apres.mp4",
      media: {
        type: "video",
        src: "/sorenval/anim-avant-apres.mp4",
        affiche: "/sorenval/poster-avant-apres.png",
        alt: "La ligne du donneur d'ordre Maison Vaubelle passe de 37 mouvements et 37 988 euros de facturable à 39 mouvements et 38 051 euros, avec des prestations hors contrat qui montent de 115 à 164 euros.",
      },
    },
    {
      id: "quai",
      titre: "La réception, sur le quai",
      aRegarder:
        "Le bouton « ajouter une prestation hors contrat ». C'est le geste de trois secondes qui fait exister les 50 € de filmage que personne ne facturait, faute de les avoir tracés.",
      fichier: "/sorenval/anim-pointage-terrain.mp4",
      media: {
        type: "video",
        src: "/sorenval/anim-pointage-terrain.mp4",
        affiche: "/sorenval/poster-pointage-terrain.png",
        alt: "Sur un terminal de quai, un chef d'équipe compte 24 palettes reçues sur le bon BL-206418, ajoute une prestation hors contrat de filmage de 1,5 heure, saisit une note et photographie le bon de livraison, puis valide une réception facturable de 64 euros.",
      },
    },
    {
      id: "chaine",
      titre: "Du quai à la facture du mois",
      aRegarder:
        "Les trois étapes qui s'enchaînent. La saisie sur le quai, les deux lignes valorisées dans la fiche du donneur d'ordre, puis la facture qui propose les prestations hors contrat à la reprise, chiffrées au temps passé et cochables une par une.",
      fichier: "/sorenval/montage-chaine.png",
      media: {
        type: "image",
        image: sorenvalChaine,
        alt: "Trois étapes enchaînées : une réception de 24 palettes et une prestation de filmage saisies sur le quai, les deux mouvements valorisés en tête de la fiche du donneur d'ordre, puis une facture composée par unité d'œuvre avec les prestations hors contrat proposées à la reprise, pour un total de 45 721 euros toutes taxes comprises.",
      },
    },
    {
      id: "derive",
      titre: "Le donneur d'ordre qui fuit",
      aRegarder:
        "Les chiffres en rouge. 70,6 % de taux de refacturation, 4 819 € de prestations hors contrat jamais transmises, et 133 776 € si ce rythme se poursuit sur douze mois.",
      fichier: "/sorenval/montage-alerte.png",
      media: {
        type: "image",
        image: sorenvalAlerte,
        alt: "Le donneur d'ordre Cheminel Distribution affiche un taux de refacturation de 70,6 pour cent, 6 329 euros de manque à facturer et 4 819 euros de prestations hors contrat, avec le détail des mouvements réalisés qu'aucune ligne du contrat ne couvre.",
      },
    },
  ],
};

const transport: Demo = {
  id: "transport",
  secteur: "Transport routier de marchandises",
  entreprise: "Transports Ferrandel",
  promesse:
    "Ce que le conducteur déclare en fin de tournée devient la marge de la tournée et la facture du client.",
  apercu: ferrandelHero,
  ecrans: [
    {
      id: "tournees",
      titre: "Le suivi des tournées",
      aRegarder:
        "La colonne MARGE %, et les 388 € d'attente non facturée affichés en haut : 7 h 45 passées à quai au-delà des franchises contractuelles, jamais portées sur une facture.",
      fichier: "/ferrandel/montage-hero.png",
      media: {
        type: "image",
        image: ferrandelHero,
        alt: "Écran de suivi des tournées d'un transporteur, avec pour chacune le client, le conducteur, le véhicule, les kilomètres réels, le prix vendu, le coût de revient, la marge et l'attente facturable. À droite, un téléphone de cabine affiche la saisie des heures à quai.",
      },
    },
    {
      id: "avant-apres",
      titre: "La marge, avant et après",
      aRegarder:
        "La tournée passe de « à déclarer » à 366 km, 546 € de coût de revient et 24,1 % de marge, parce que le conducteur vient de la clôturer depuis sa cabine.",
      fichier: "/ferrandel/anim-avant-apres.mp4",
      media: {
        type: "video",
        src: "/ferrandel/anim-avant-apres.mp4",
        affiche: "/ferrandel/poster-avant-apres.png",
        alt: "La ligne de la tournée TRN-2026-124 pour le client Maison Perrat passe de valeurs à déclarer à 366 kilomètres, 546 euros de coût de revient, 174 euros de marge soit 24,1 pour cent, et 56 euros d'attente facturable.",
      },
    },
    {
      id: "cabine",
      titre: "La clôture, dans la cabine",
      aRegarder:
        "Le dernier bloc de l'écran de confirmation : 2 h 50 d'attente déclarée sur quatre étapes, dont 1 h 05 au-delà de la franchise, soit 56 € que l'exploitation peut enfin porter sur la facture.",
      fichier: "/ferrandel/anim-pointage-terrain.mp4",
      media: {
        type: "video",
        src: "/ferrandel/anim-pointage-terrain.mp4",
        affiche: "/ferrandel/poster-pointage-terrain.png",
        alt: "Sur un téléphone, un conducteur saisit son kilométrage, les heures d'arrivée et de départ à chaque quai et photographie les lettres de voiture, puis valide une tournée de 366 kilomètres, 8 h 45 de service et 56 euros d'attente facturable au contrat.",
      },
    },
    {
      id: "chaine",
      titre: "De la cabine à la facture",
      aRegarder:
        "Les trois étapes qui s'enchaînent. Les 366 km valorisent le gazole à 189,68 € et l'amortissement à 98,82 €, le temps de service valorise la conduite, puis le supplément d'attente de 56,33 € s'ajoute à la facture d'une simple case à cocher.",
      fichier: "/ferrandel/montage-chaine.png",
      media: {
        type: "image",
        image: ferrandelChaine,
        alt: "Trois étapes enchaînées : les heures à quai saisies dans la cabine, le coût de revient détaillé poste par poste avec sa formule de calcul pour un total de 546,50 euros, puis une facture client où le supplément d'attente de 56,33 euros s'ajoute à la tournée, pour un total de 1 391,33 euros hors taxes.",
      },
    },
    {
      id: "derive",
      titre: "La tournée qui perd de l'argent",
      aRegarder:
        "Les chiffres en rouge. 2,4 % de marge, 180 km roulés à vide sur 410, et 3 h 10 d'attente facturable au contrat, soit 158 €, qui ne sont pas portées sur la facture.",
      fichier: "/ferrandel/montage-alerte.png",
      media: {
        type: "image",
        image: ferrandelAlerte,
        alt: "La tournée TRN-2026-121 affiche 14 euros de marge soit 2,4 pour cent, 110 kilomètres de plus que prévu au chiffrage et 43,9 pour cent de kilomètres à vide, avec le détail des étapes montrant 4 h 20 d'attente à quai dont 3 h 10 facturables au contrat et jamais facturées.",
      },
    },
  ],
};

export const demos: readonly Demo[] = [btp, logistique, transport];
