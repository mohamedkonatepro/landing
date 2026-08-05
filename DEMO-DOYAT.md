# Prompt : outil de démonstration DoyatConstruction

Ce document est le brief complet à donner à un agent pour construire le projet.
Il est autosuffisant : tout ce qui suit doit pouvoir être lu sans connaître la
landing page FastWebApp.

---

## Mission

Construis un outil de gestion d'affaires pour **DoyatConstruction**, une
entreprise de gros œuvre. Le projet est autonome, dans son propre dépôt, et ne
possède **aucune base de données** : les données vivent en mémoire.

L'outil sert à produire trois à cinq captures d'écran destinées à une page de
vente. Il doit rendre une seule phrase indiscutable :

> Une information saisie une fois sur le chantier ressort en facture et en
> marge, sans que personne ne la retape.

Tout ce qui ne sert pas cette phrase est hors périmètre. Ce n'est pas un ERP,
ce n'est pas un produit à vendre, c'est une démonstration qui doit tenir debout.

**Le mécanisme central, à construire en priorité** : un pointage saisi depuis la
vue mobile met réellement à jour la marge affichée sur la fiche affaire et dans
la liste. Si une seule chose fonctionne dans ce projet, c'est celle-là. C'est
elle qui sera capturée avant / après.

---

## L'entreprise

**DoyatConstruction**, SAS de gros œuvre, 34 salariés, basée à Nantes,
intervient en Loire-Atlantique. Quatre chantiers en cours, deux affaires en
cours de chiffrage, deux affaires récemment terminées.

Trois personnes utilisent l'outil, et chaque écran est pensé pour l'une d'elles :

| Rôle | Qui | Ce qu'elle fait dans l'outil |
|---|---|---|
| Gérant | Pascal Doyat | Regarde la liste des affaires le matin, surveille les marges |
| Conductrice de travaux | Amélie Rousseau | Vit dans la fiche affaire, saisit les achats, émet les situations |
| Chef d'équipe | Karim Belhadj | Pointe les heures depuis son téléphone, en fin de journée |

Ces noms apparaissent dans les données. Ils doivent être cohérents d'un écran à
l'autre.

---

## Pile technique

- Next.js 16, App Router, TypeScript strict
- Tailwind CSS v4 (configuration par `@theme` dans le CSS, pas de fichier de
  configuration JavaScript)
- `lucide-react` pour les icônes
- Aucune base de données, aucun ORM, aucune authentification, aucun appel réseau
- État partagé via un contexte React, initialisé depuis un module de données
  de départ. Toute modification est perdue au rechargement, et c'est voulu

**Avant d'écrire du code Next.js, lis la documentation embarquée dans
`node_modules/next/dist/docs/`.** Cette version comporte des changements de
rupture par rapport aux versions antérieures : conventions de fichiers, API,
métadonnées. Ne te fie pas à ta mémoire sur ces points.

Structure attendue :

```
app/
  layout.tsx
  page.tsx                    → redirige vers /affaires
  affaires/page.tsx           → liste des affaires
  affaires/[id]/page.tsx      → fiche affaire, onglets en paramètre de recherche
  terrain/page.tsx            → vue mobile de pointage
components/
  ...
donnees/
  types.ts                    → tous les types
  seed.ts                     → données de départ
  calculs.ts                  → fonctions dérivées, pures et testables
  contexte.tsx                → état en mémoire, actions
```

---

## Modèle de données

```ts
export type Qualification =
  | "chef d'équipe"
  | "maçon"
  | "coffreur"
  | "manœuvre"
  | "grutier";

export type Compagnon = {
  id: string;
  nom: string;
  qualification: Qualification;
  /** Coût horaire chargé, en euros. Entre 34 et 44 selon la qualification. */
  coutHoraireCharge: number;
};

export type Client = {
  id: string;
  nom: string;
  contact: string;
  email: string;
  telephone: string;
  ville: string;
};

export type Lot = {
  id: string;
  nom: string;
  montantVendu: number;
  /** 0 à 100. Saisi par la conductrice de travaux. */
  avancementPct: number;
};

export type StatutAffaire = "chiffrage" | "en cours" | "terminée" | "perdue";

export type Affaire = {
  id: string;
  /** Format AFF-AAAA-NNN. */
  reference: string;
  nom: string;
  clientId: string;
  ville: string;
  statut: StatutAffaire;
  montantVendu: number;
  dateDebut: string;      // AAAA-MM-JJ
  dateFinPrevue: string;
  /** Prévisionnel au chiffrage, sert à mesurer la dérive. */
  budgetHeures: number;
  budgetAchats: number;
  lots: Lot[];
};

export type Pointage = {
  id: string;
  affaireId: string;
  lotId: string;
  compagnonId: string;
  date: string;
  heures: number;
  /** Commentaire libre du chef d'équipe. Souvent vide, parfois précieux. */
  note?: string;
  /** Nom de fichier d'une photo de chantier, si présente. */
  photo?: string;
};

export type Achat = {
  id: string;
  affaireId: string;
  fournisseur: string;
  libelle: string;
  montantHT: number;
  date: string;
  /** Nom de fichier du bon de livraison photographié. */
  justificatif?: string;
};

export type TypeDocument = "devis" | "situation" | "facture";
export type StatutDocument =
  | "brouillon"
  | "envoyé"
  | "accepté"
  | "payé"
  | "en retard";

export type Document = {
  id: string;
  affaireId: string;
  type: TypeDocument;
  /** Format DEV-AAAA-NNN, SIT-AAAA-NNN, FAC-AAAA-NNN. */
  numero: string;
  libelle: string;
  montantHT: number;
  dateEmission: string;
  dateEcheance?: string;
  statut: StatutDocument;
  /** Dates des relances déjà parties. */
  relances: string[];
};
```

### Calculs dérivés

Aucune marge, aucun total ne doit être écrit en dur dans les données de départ.
Tout se recalcule à partir des pointages et des achats, sinon les chiffres ne se
recouperont pas d'un écran à l'autre et chaque capture mentira un peu.

```ts
deboursHeures(affaire)  = Σ pointage.heures × compagnon.coutHoraireCharge
deboursAchats(affaire)  = Σ achat.montantHT
debours(affaire)        = deboursHeures + deboursAchats
margeEuros(affaire)     = affaire.montantVendu − debours(affaire)
margePct(affaire)       = margeEuros / affaire.montantVendu × 100
heuresPointees(affaire) = Σ pointage.heures
avancement(affaire)     = Σ (lot.montantVendu × lot.avancementPct) / Σ lot.montantVendu
```

**Règle d'alerte**, à afficher visuellement : une affaire est en dérive si sa
marge est inférieure à 8 %, ou si le pourcentage de budget consommé dépasse
l'avancement de plus de 15 points. C'est la règle qui fait passer une ligne en
rouge dans la liste.

---

## Données de départ

C'est le vrai travail du projet, bien avant le CSS. Des données stériles rendent
la démonstration inutilisable, quelle que soit la qualité de l'interface.

### Règles de vraisemblance, non négociables

1. **Une affaire doit aller mal.** Un tableau où tout est vert ne convainc
   personne. C'est le signal de crédibilité le plus fort du projet.
2. Les montants sont ceux du gros œuvre en Loire-Atlantique : chantiers de
   35 000 € à 450 000 €, coût horaire chargé entre 34 et 44 €.
3. Les dates sont récentes, s'étalent sur environ six semaines et se tiennent
   entre elles : pas de facture émise avant la situation qui la justifie.
4. Au moins cinq lignes portent un commentaire tapé par un humain, avec ses
   approximations : « client a demandé un décalage, voir mail du 12 »,
   « reprise coffrage angle nord suite intempéries », « manque 2 palettes,
   livraison reportée à lundi ».
5. Le vocabulaire est celui du métier partout : lots, situation de travaux,
   retenue de garantie, compte prorata, DGD, coffrage, banches, ferraillage.
6. Fournisseurs plausibles : Point.P, Chausson Matériaux, Lafarge, Loxam,
   Frans Bonhomme, Sarl Guérin Location.

### Les six affaires

| Référence | Nom | Ville | Montant | Statut | Ce qu'elle démontre |
|---|---|---|---|---|---|
| AFF-2026-014 | Résidence Les Tilleuls, 18 logements | Vertou | 412 000 € | en cours | Le cas sain. Marge autour de 14 %, avancement 62 %. C'est l'affaire du parcours principal |
| AFF-2026-009 | Extension groupe scolaire Jules-Verne | Rezé | 186 500 € | en cours | **Le cas qui dérape.** Marge à 4,2 %, environ 180 heures de dépassement sur le lot élévation, notes de reprise après intempéries. La ligne rouge |
| AFF-2026-021 | Bâtiment logistique Zone de la Pentecôte | Carquefou | 448 000 € | en cours | Un démarrage récent, avancement 12 %, peu de pointages |
| AFF-2026-025 | Réhabilitation halle marchande | Ancenis | 268 000 € | chiffrage | **Le devis sans réponse.** Émis le 04/03, relancé le 12/03 puis le 27/03, toujours sans retour |
| AFF-2025-088 | Maison individuelle Bertin | Saint-Sébastien-sur-Loire | 96 000 € | terminée | Le cas propre et clos. Marge 18 %, facture payée |
| AFF-2026-002 | Mur de soutènement | Basse-Goulaine | 34 500 € | terminée | **La facture en retard**, 42 jours d'échéance dépassée |

### Volumes

- **8 compagnons**, dont Karim Belhadj, chef d'équipe
- **Lots** : terrassement, fondations, élévation, dalle portée, enduit, VRD.
  Trois à cinq lots par affaire, jamais les mêmes combinaisons
- **Environ 120 pointages**, répartis sur six semaines, concentrés sur les
  affaires en cours. Des journées à 7 h, quelques-unes à 9 h ou 10 h, des
  absences. Pas de régularité mécanique
- **Environ 40 achats**, de 180 € à 14 000 €
- **Une douzaine de documents**, cohérents avec les statuts du tableau

---

## Les écrans

### 1. Vue terrain, mobile — `/terrain`

L'écran de Karim, chef d'équipe, à 18 h sur le chantier. Conçu pour le pouce et
pour être lu au soleil : cibles tactiles d'au moins 48 px, contrastes appuyés,
peu de texte.

- En-tête : la date du jour, le nom de l'utilisateur
- La liste de ses chantiers du jour, en grandes cartes
- Au choix d'un chantier : sélection des compagnons présents par simple appui
  (leur liste habituelle est pré-cochée), saisie des heures par lot avec des
  boutons plus / moins et non un clavier, champ de note facultatif, ajout d'une
  photo
- Un seul bouton de validation, large, en bas
- Après validation : une confirmation sobre qui indique ce qui vient d'être
  enregistré, et rien d'autre. Pas de tableau de bord, pas de statistique

Cet écran doit être présentable dans un cadre de téléphone pour la capture.
Prévois donc que la page soit lisible dans une largeur de 390 px.

### 2. Liste des affaires — `/affaires`

L'écran du gérant, celui où il passe le plus de temps. Barre latérale à gauche,
tableau dense à droite.

Colonnes : référence, nom de l'affaire, client, ville, montant vendu, dépensé,
**marge en euros et en pourcentage**, avancement (barre fine), statut.

- La ligne de l'affaire Jules-Verne est visuellement en alerte : marge en rouge,
  discret repère en début de ligne. Pas de gros bandeau, pas d'icône criarde
- Filtres simples au-dessus : statut, et une recherche libre
- Un bandeau de synthèse en haut : nombre d'affaires en cours, chiffre
  d'affaires engagé, marge moyenne, montant en attente de règlement
- Tri par colonne au clic

### 3. Fiche affaire — `/affaires/[id]`

Le cœur du produit. On y arrive en cliquant sur la ligne de la liste.

En-tête : référence, nom, client, ville, statut, dates. À droite, un bloc de
chiffres : montant vendu, dépensé, **marge en euros et en pourcentage**, écart au
prévisionnel. Barre d'avancement par lot en dessous.

Quatre onglets :

- **Heures** — la liste des pointages, par date décroissante, avec compagnon,
  lot, heures, note, photo. Le pointage saisi depuis la vue terrain apparaît en
  tête, et un repère discret indique qu'il est récent
- **Achats** — fournisseur, libellé, montant, date, justificatif. Un bouton
  d'ajout qui ouvre un formulaire court avec dépôt de photo
- **Documents** — devis, situations, factures, avec statut et historique des
  relances
- **Facturation** — voir écran 4

### 4. Facturation — onglet de la fiche affaire

- Un bouton « Établir la situation de travaux »
- Au clic : un aperçu de document se compose **à partir des données de
  l'affaire**, sans aucune ressaisie. Les lots, leur avancement, les montants,
  la retenue de garantie, le total. Un aperçu mis en page, pas un formulaire
- Sur les documents envoyés sans réponse, une mention du type « Relance
  automatique envoyée le 12/03. Prochaine relance le 27/03. »
- Sur la facture en retard de l'affaire AFF-2026-002, un repère d'échéance
  dépassée avec le nombre de jours

---

## Le parcours à jouer pour les captures

L'agent doit vérifier que cette séquence fonctionne de bout en bout :

1. Ouvrir `/affaires`. Noter la marge de l'affaire Les Tilleuls, par exemple
   14,2 %.
2. Aller sur `/terrain`, choisir Les Tilleuls, pointer 4 compagnons × 8 h sur le
   lot élévation, ajouter une note, valider.
3. Revenir sur `/affaires`. **La marge a baissé**, la ligne dépensé a augmenté.
4. Ouvrir la fiche de l'affaire, onglet Heures : le pointage est là, en tête,
   avec sa note.
5. Onglet Facturation : établir la situation. Les heures fraîchement saisies
   sont dans le calcul.

Si cette séquence ne produit pas des chiffres cohérents, le projet est raté,
quelle que soit son apparence.

---

## Identité visuelle

C'est un **outil métier**, pas une page de vente. Dense, sobre, beaucoup
d'information à l'écran, peu d'animation. S'il ressemble à un site vitrine, on
devine qu'il n'a jamais servi.

```css
--encre:   #0a1c17;  /* texte principal, barre latérale */
--papier:  #f7faf9;  /* fond général */
--blanc:   #ffffff;  /* fond des tableaux et des cartes */
--acier:   #566b63;  /* texte secondaire, en-têtes de colonnes */
--signal:  #058c63;  /* accent : actions principales, marge saine */
--trait:   #e3ebe7;  /* filets, bordures, séparateurs */
--alerte:  #b4341f;  /* marge en dérive, échéance dépassée */
--attente: #b07d10;  /* devis sans réponse, en attente de règlement */
```

- Titres et chiffres clés : une grotesque compacte, graisse 600 ou 700
- Texte courant : une linéale humaniste lisible en petit corps
- **Tous les chiffres, montants et références : police à chasse fixe.** C'est ce
  qui donne l'aspect « outil » plutôt que « brochure », et ça permet
  l'alignement à droite dans les colonnes
- Rayons de 4 px maximum. Ombres quasi inexistantes. Pas de dégradé
- Lignes de tableau à 44 px de haut, séparées par un filet de 1 px
- Montants alignés à droite, séparateur de milliers français, symbole € suffixé

---

## Ce qu'il ne faut surtout pas construire

Chacun de ces éléments peut coûter une semaine et n'apparaîtra sur aucune
capture :

authentification, gestion des rôles et des droits, écran de paramétrage,
multi-utilisateur réel, planning de type Gantt, module de ressources humaines,
CRM, export comptable, envoi réel de courriels, notifications, mode sombre,
traduction, animations élaborées, tests automatisés, responsive parfait sur
toutes les tailles d'écran (seuls 390 px et 1440 px comptent).

---

## Langue et ton de l'interface

- Français, vouvoiement, aucune abréviation anglaise dans l'interface
- Vocabulaire du bâtiment partout, jamais de terme générique quand un terme
  métier existe : « situation de travaux » et non « facture intermédiaire »
- Aucun emoji, nulle part
- Pas de tiret cadratin dans les textes : virgule, deux-points ou point
- Aucun texte de remplissage : pas de « Lorem ipsum », pas de « Client A »,
  pas de « Projet 1 ». Chaque libellé visible doit être plausible

---

## Critères de réussite

Le projet est terminé quand :

1. La séquence de captures ci-dessus fonctionne, et les chiffres se recoupent
   entre les trois écrans
2. La vue terrain est utilisable et lisible à 390 px de large
3. La liste des affaires tient sur un écran de 1440 px sans défilement
   horizontal, avec les six affaires visibles
4. L'affaire en dérive se repère en moins de deux secondes
5. Aucun montant, aucune marge n'est écrit en dur : tout est calculé
6. Aucun texte de remplissage ne subsiste dans l'interface
7. `npx tsc --noEmit` et `npm run build` passent sans erreur
