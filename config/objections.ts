import { site } from "./site";

/**
 * Les objections traitées sur la page, et leurs réponses.
 *
 * Sorties du composant pour avoir une source unique : la section « Vos
 * questions » les affiche, et le JSON-LD `FAQPage` les déclare aux moteurs.
 * Une réponse modifiée ici l'est donc aux deux endroits à la fois.
 */
export const objections: readonly { q: string; r: string }[] = [
  {
    q: "C'est gratuit, où est le piège ?",
    r: `Il n'y en a pas. C'est notre façon de rencontrer des entreprises et de comprendre leurs process : nous en faisons ${site.diagnosticsParMois} par mois, et nous apprenons à chaque fois. Vous repartez avec la cartographie, le chiffrage et l'automatisation simple, sans rien devoir ni signer. Ce qui se passe ensuite ne dépend que de vous.`,
  },
  {
    q: "On n'a pas le temps pour ça",
    r: "Une heure en visio, une seule fois. Vous n'avez rien à préparer : vous parlez de votre entreprise, nous prenons les notes et nous faisons les calculs. Si vos journées ressemblent à ce que décrit cette page, cette heure se rembourse dès la première friction supprimée.",
  },
  {
    q: "On a déjà un logiciel",
    r: "Tant mieux, nous ne sommes pas là pour le remplacer. Dans la plupart des entreprises, le problème n'est pas le logiciel : c'est ce qui se passe entre les logiciels, à la main. Et si votre outil actuel suffit avec un meilleur paramétrage, le diagnostic le dira noir sur blanc, et ça s'arrêtera là.",
  },
  {
    q: "Je ne suis pas à l'aise avec l'informatique",
    r: "C'est notre travail de nous adapter à vos habitudes, pas l'inverse. Les outils que nous livrons s'utilisent comme un bon de livraison : quelques champs, dans le vocabulaire de votre métier. Si quelqu'un sait remplir une feuille d'heures, il saura s'en servir.",
  },
  {
    q: "Combien ça coûte vraiment, au final ?",
    r: "Rien. Le diagnostic est offert et il s'arrête là : vous gardez la cartographie, le chiffrage et l'automatisation simple, coût total zéro. Il n'y a ni devis à la clé, ni relance commerciale prévue. Si un jour vous voulez faire développer un outil, le tarif est public sur cette page et c'est vous qui revenez vers nous.",
  },
  {
    q: "On va dépendre de vous, non ?",
    r: "Non, et c'est une règle que nous nous imposons : tout ce que nous livrons vous appartient. Le code est documenté, hébergé sur vos comptes, sans abonnement captif. N'importe quel développeur peut reprendre l'outil, y compris sans nous.",
  },
];
