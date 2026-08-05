# Prompt : outil de démonstration Transports Ferrandel

Brief complet à donner à un agent pour construire le projet. Autosuffisant :
tout ce qui suit se lit sans connaître la landing page FastWebApp.

Troisième des trois démonstrations sectorielles, après DoyatConstruction (BTP)
et Sorenval Logistique. Même méthode, même exigence, secteur différent.

---

## Mission

Construis un outil d'exploitation pour **Transports Ferrandel**, transporteur
routier de marchandises. Projet autonome, dans son propre dépôt, **aucune base
de données** : les données vivent en mémoire.

L'outil sert à produire les captures d'une page de vente. Il doit rendre une
seule phrase indiscutable :

> Ce que le conducteur déclare en fin de tournée devient la marge de la tournée
> et la facture du client, sans que personne ne le retape.

Tout ce qui ne sert pas cette phrase est hors périmètre. Ce n'est pas un TMS, ce
n'est pas un produit à vendre, c'est une démonstration qui doit tenir debout.

**Le mécanisme central, à construire en priorité** : une tournée clôturée depuis
le téléphone du conducteur fait bouger, en temps réel, la marge de la tournée
dans la liste et dans sa fiche. Si une seule chose fonctionne dans ce projet,
c'est celle-là. C'est elle qui sera capturée avant et après.

**La fuite d'argent que l'outil met en évidence** : les temps d'attente non
facturés. Le conducteur poireaute deux heures à quai, c'est prévu au contrat
au-delà de trente minutes, et ça ne part jamais sur la facture parce que
l'information est restée sur un papier dans la cabine. C'est l'équivalent, pour
le transport, de la marge qui dérape sur un chantier.

---

## L'entreprise

**Transports Ferrandel**, SAS, 38 salariés, basée à Chalon-sur-Saône
(Saône-et-Loire). Lot et messagerie régionale sur le quart est de la France.
22 véhicules : 9 ensembles tracteur et semi-remorque, 8 porteurs, 5 véhicules
légers. Une dizaine de clients réguliers, dont trois qui font la moitié du
chiffre.

> **Avant d'écrire la moindre ligne** : vérifier sur societe.com et à l'INPI
> qu'aucune entreprise ne porte ce nom. Les raisons sociales du type
> « Transports » suivi d'un patronyme sont très répandues dans ce métier, le
> risque de collision est réel. Si le nom existe, en changer et le signaler.

Trois personnes utilisent l'outil, et chaque écran est pensé pour l'une d'elles :

| Rôle | Qui | Ce qu'elle fait dans l'outil |
|---|---|---|
| Gérant | Bruno Ferrandel | Regarde la marge par tournée le matin, traque ce qui n'est pas facturé |
| Exploitante | Céline Maquaire | Vit dans la fiche tournée, affecte les véhicules, édite les factures |
| Conducteur | Rachid Ouaddou | Clôture sa tournée depuis son téléphone, en fin de service |

Ces noms apparaissent dans les données et doivent être cohérents d'un écran à
l'autre.

---

## Pile technique

- Next.js 16, App Router, TypeScript strict
- Tailwind CSS v4 (configuration par `@theme` dans le CSS, pas de fichier de
  configuration JavaScript)
- `lucide-react` pour les icônes
- Aucune base de données, aucun ORM, aucune authentification, aucun appel réseau
- État partagé via un contexte React, initialisé depuis un module de données de
  départ. Toute modification est perdue au rechargement, et c'est voulu

**Avant d'écrire du code Next.js, lis la documentation embarquée dans
`node_modules/next/dist/docs/`.** Cette version comporte des changements de
rupture par rapport aux versions antérieures. Ne te fie pas à ta mémoire.

```
app/
  layout.tsx
  page.tsx                    → redirige vers /tournees
  tournees/page.tsx           → liste des tournées
  tournees/[id]/page.tsx      → fiche tournée, onglets en paramètre de recherche
  cabine/page.tsx             → clôture de tournée, format mobile
components/
donnees/
  types.ts
  seed.ts
  calculs.ts                  → fonctions dérivées, pures et testables
  contexte.tsx
```

---

## Modèle de données

```ts
export type Conducteur = {
  id: string;
  nom: string;
  permis: "C" | "CE";
  /** Coût horaire chargé, en euros. Entre 21 et 27. */
  coutHoraireCharge: number;
};

export type Vehicule = {
  id: string;
  /** Immatriculation au format français, plaque fictive. */
  immatriculation: string;
  type: "ensemble" | "porteur" | "véhicule léger";
  /** Consommation moyenne, en litres aux 100 km. */
  consommation: number;
  /** Amortissement et entretien ramenés au kilomètre, en euros. */
  coutKilometrique: number;
};

export type Client = {
  id: string;
  nom: string;
  secteur: string;
  interlocuteur: string;
  ville: string;
  /** Franchise d'attente au contrat, en minutes. Au-delà, c'est facturable. */
  franchiseAttenteMin: number;
  /** Prix de l'heure d'attente au-delà de la franchise. */
  prixHeureAttente: number;
};

export type StatutTournee =
  | "planifiée"
  | "en cours"
  | "clôturée"
  | "facturée"
  | "annulée";

export type Etape = {
  id: string;
  ordre: number;
  type: "ramasse" | "livraison";
  ville: string;
  /** Heure d'arrivée déclarée, HH:MM. */
  arrivee?: string;
  /** Heure de départ déclarée, HH:MM. */
  depart?: string;
  /** Minutes d'attente déclarées par le conducteur sur cette étape. */
  attenteMin: number;
  /** Numéro de la lettre de voiture. */
  lettreDeVoiture: string;
  /** Vrai quand la lettre de voiture signée a été photographiée. */
  signee: boolean;
};

export type Tournee = {
  id: string;
  /** Format TRN-AAAA-NNN. */
  reference: string;
  date: string;
  clientId: string;
  conducteurId: string;
  vehiculeId: string;
  statut: StatutTournee;
  /** Prix vendu au client, hors suppléments. */
  prixVendu: number;
  /** Kilomètres prévus au chiffrage. */
  kmPrevus: number;
  /** Kilomètres réellement parcourus, déclarés en fin de tournée. */
  kmReels?: number;
  /** Kilomètres parcourus à vide, déclarés. */
  kmAVide?: number;
  /** Temps de service total déclaré, en heures. */
  heuresService?: number;
  etapes: Etape[];
  /** Commentaire du conducteur. Souvent vide, parfois précieux. */
  note?: string;
  /** Vrai quand les péages ont été saisis. */
  peages: number;
  /** Sous-traitance affrétée, en euros. Zéro le plus souvent. */
  affretement: number;
};

export type Facture = {
  id: string;
  clientId: string;
  numero: string;            // FAC-AAAA-NNN
  periode: string;
  tourneeIds: string[];
  montantHT: number;
  dateEmission: string;
  dateEcheance: string;
  statut: "brouillon" | "envoyée" | "payée" | "en retard";
};
```

### Calculs dérivés

Aucune marge, aucun coût ne doit être écrit en dur dans les données de départ.
Tout se recalcule à partir des déclarations de fin de tournée, sinon les
chiffres ne se recoupent pas d'un écran à l'autre et chaque capture ment un peu.

Prix du gazole professionnel : une constante unique, 1,58 € le litre, dans
`calculs.ts`.

```ts
attenteFacturableMin(tournee) =
  Σ max(0, etape.attenteMin − client.franchiseAttenteMin)

supplementAttente(tournee) =
  attenteFacturableMin / 60 × client.prixHeureAttente

coutGazole(tournee)     = kmReels / 100 × vehicule.consommation × 1.58
coutVehicule(tournee)   = kmReels × vehicule.coutKilometrique
coutConducteur(tournee) = heuresService × conducteur.coutHoraireCharge
coutRevient(tournee)    = coutGazole + coutVehicule + coutConducteur
                          + peages + affretement

produit(tournee)        = prixVendu + supplementAttente(tournee)
margeEuros(tournee)     = produit − coutRevient
margePct(tournee)       = margeEuros / produit × 100
tauxAVide(tournee)      = kmAVide / kmReels × 100
ecartKm(tournee)        = kmReels − kmPrevus
```

**Règle d'alerte**, à afficher visuellement : une tournée est signalée quand sa
marge passe sous 5 %, ou quand son taux de kilomètres à vide dépasse 25 %. C'est
la règle qui fait passer une ligne en rouge dans la liste.

**Point de démonstration essentiel** : `supplementAttente` est calculé mais
n'est **pas** ajouté à la facture tant que l'exploitante ne l'a pas coché. La
liste doit donc afficher, quelque part, le montant d'attente facturable non
encore facturé. C'est le chiffre qui fait mal, et c'est celui qui vend l'outil.

---

## Données de départ

C'est le vrai travail du projet, bien avant le CSS. Des données stériles rendent
la démonstration inutilisable, quelle que soit la qualité de l'interface.

### Règles de vraisemblance, non négociables

1. **Une tournée doit aller mal.** Un tableau où tout est vert ne convainc
   personne. C'est le signal de crédibilité le plus fort du projet.
2. Les montants sont ceux du métier : une tournée régionale de 380 km se vend
   entre 480 et 720 €, un ensemble consomme 31 à 34 litres aux 100 km, un
   porteur 22 à 26, le coût kilométrique d'amortissement et d'entretien va de
   0,18 à 0,32 € selon le véhicule, l'heure d'attente se facture 42 à 55 €,
   la franchise d'attente est de 30 ou 45 minutes selon le client.
3. Les dates sont récentes, s'étalent sur environ quatre semaines et se tiennent
   entre elles : pas de facture émise avant la tournée qu'elle couvre.
4. Au moins cinq lignes portent un commentaire tapé par un humain, avec ses
   approximations : « bloqué 2 h 10 à quai, un seul cariste sur place »,
   « déviation par la D906, chantier sur la nationale », « client fermé à
   l'arrivée, seconde présentation demain matin ».
5. Le vocabulaire est celui du métier partout : ordre de mission, lettre de
   voiture, ramasse, livraison, affrètement, temps de service, coupure,
   prise en charge, kilomètres à vide, CMR, hayon, plancher.
6. Les attentes longues sont concentrées sur un client, pas réparties
   uniformément : c'est ce qui rend l'alerte crédible et le message clair.

### Les sept tournées

| Référence | Client | Trajet | Vendu | Statut | Ce qu'elle démontre |
|---|---|---|---|---|---|
| TRN-2026-118 | Celtibois Négoce | Chalon → Mâcon → Bourg-en-Bresse | 640 € | clôturée | Le cas sain. Marge autour de 16 %, le parcours principal se joue ici |
| TRN-2026-121 | Verchamp Agro | Chalon → Dijon → Beaune | 580 € | clôturée | **Le cas qui perd.** Marge à 2,4 % : 4 h 20 d'attente cumulées sur deux quais, dont 3 h 10 facturables jamais facturées, et 180 km à vide sur 410 |
| TRN-2026-124 | Maison Perrat | Chalon → Lyon Corbas | 720 € | en cours | Une tournée du jour, partiellement renseignée |
| TRN-2026-109 | Celtibois Négoce | Chalon → Besançon | 690 € | facturée | Le cas propre et clos, facture payée |
| TRN-2026-115 | Sodilac Frais | Chalon → Chalon, messagerie | 490 € | clôturée | **Neuf étapes**, beaucoup de petites attentes sous la franchise |
| TRN-2026-112 | Verchamp Agro | Chalon → Nevers | 610 € | clôturée | **Attente facturable en attente de décision**, 1 h 45 |
| TRN-2026-103 | Maison Perrat | Chalon → Genève, affrètement partiel | 980 € | facturée | **Facture en retard**, 41 jours d'échéance dépassée. Marge écrasée par l'affrètement |

### Volumes

- **7 conducteurs**, dont Rachid Ouaddou
- **6 véhicules** au moins, avec des immatriculations fictives cohérentes
- **Entre 3 et 9 étapes par tournée**, avec heures d'arrivée et de départ
- **Environ 25 tournées** sur quatre semaines, dont les sept du tableau au
  premier plan. Des journées creuses, des pics le mardi et le vendredi
- **5 factures**, cohérentes avec les statuts du tableau

---

## Les écrans

### 1. Cabine, mobile — `/cabine`

L'écran de Rachid, fin de service, dans la cabine. Conçu pour être utilisé vite,
au pouce, souvent d'une main : cibles tactiles d'au moins 48 px, contrastes
appuyés, peu de texte.

- En-tête : la date, le nom du conducteur, le véhicule
- Sa tournée du jour, en grande carte : client, référence, nombre d'étapes
- Au choix de la tournée : saisie du kilométrage au compteur avec un pavé
  numérique large, puis pour **chaque étape** l'heure d'arrivée, l'heure de
  départ et l'attente qui se calcule seule, avec la photo de la lettre de
  voiture signée
- Un champ de note facultatif
- Un seul bouton de validation, large, en bas
- Après validation : une confirmation sobre indiquant les kilomètres, le temps
  de service, l'attente totale déclarée, et le montant d'attente facturable que
  cela représente au contrat. C'est ce dernier chiffre qui fait la démonstration

Cet écran doit être présentable dans un cadre de téléphone. Il doit donc être
lisible dans une largeur de 390 px.

### 2. Liste des tournées — `/tournees`

L'écran du gérant. Barre latérale à gauche, tableau dense à droite.

Colonnes : référence, date, client, conducteur, véhicule, km réels, vendu, coût
de revient, **marge en euros et en pourcentage**, attente facturable, statut.

- La ligne de TRN-2026-121 est en alerte : marge en rouge, discret repère en
  début de ligne. Pas de bandeau, pas d'icône criarde
- Filtres au-dessus : semaine, client, conducteur, statut, recherche libre
- Bandeau de synthèse en haut : tournées de la semaine, chiffre d'affaires,
  marge moyenne, **attente facturable non facturée**, montant en attente de
  règlement
- Tri par colonne au clic

### 3. Fiche tournée — `/tournees/[id]`

Le cœur du produit. On y arrive en cliquant sur une ligne de la liste.

En-tête : référence, date, client, conducteur, véhicule, statut. À droite, un
bloc de chiffres : vendu, coût de revient, **marge en euros et en pourcentage**,
écart au kilométrage prévu, taux de kilomètres à vide.

Quatre onglets :

- **Étapes** — la liste ordonnée, avec type, ville, arrivée, départ, attente,
  attente facturable au contrat, numéro de lettre de voiture et sa photo. Les
  étapes dont l'attente dépasse la franchise sont marquées
- **Coûts** — le détail du coût de revient ligne par ligne : gazole calculé à
  partir de la consommation du véhicule, amortissement au kilomètre, coût
  conducteur, péages, affrètement. Chaque ligne montre sa formule
- **Documents** — lettres de voiture, photos, facture rattachée
- **Facturation** — voir écran 4

### 4. Facturation — onglet de la fiche

- Un récapitulatif : prix vendu au contrat, puis une ligne **« attente
  facturable : 3 h 10 au-delà de la franchise, soit 158 € »** avec une case à
  cocher
- Cocher la case fait monter le total et **la marge de la tournée**, en direct.
  C'est le geste le plus démonstratif de tout le projet
- Un bouton « Établir la facture », qui compose un aperçu mis en page à partir
  des tournées de la période, avec les suppléments retenus
- Sur la facture en retard de Maison Perrat, un repère d'échéance dépassée avec
  le nombre de jours

---

## Le parcours à jouer pour les captures

L'agent doit vérifier que cette séquence fonctionne de bout en bout :

1. Ouvrir `/tournees`. Noter la marge de TRN-2026-118, par exemple 16,2 %, et le
   montant d'attente facturable non facturée du bandeau.
2. Aller sur `/cabine`, ouvrir la tournée du jour, saisir le kilométrage,
   renseigner les heures d'arrivée et de départ de chaque étape dont une avec
   1 h 50 d'attente, ajouter une note et la photo d'une lettre de voiture,
   valider.
3. Revenir sur `/tournees`. **La marge a changé**, le coût de revient a augmenté
   avec les kilomètres réels, et l'attente facturable est apparue.
4. Ouvrir la fiche, onglet Étapes : l'étape longue est marquée, avec son attente
   au-delà de la franchise.
5. Onglet Facturation : cocher l'attente facturable. **La marge remonte**, en
   direct, sous les yeux.

Si cette séquence ne produit pas des chiffres cohérents, le projet est raté,
quelle que soit son apparence.

---

## Identité visuelle

C'est un **outil métier**, pas une page de vente. Dense, sobre, beaucoup
d'information à l'écran, peu d'animation. S'il ressemble à un site vitrine, on
devine qu'il n'a jamais servi. Reprendre exactement la palette de
DoyatConstruction, pour que les trois démonstrations forment une famille.

```css
--encre:   #0a1c17;  /* texte principal, barre latérale */
--papier:  #f7faf9;  /* fond général */
--blanc:   #ffffff;  /* fond des tableaux et des cartes */
--acier:   #566b63;  /* texte secondaire, en-têtes de colonnes */
--signal:  #058c63;  /* accent : actions principales, marge saine */
--trait:   #e3ebe7;  /* filets, bordures, séparateurs */
--alerte:  #b4341f;  /* marge dégradée, échéance dépassée */
--attente: #b07d10;  /* attente facturable non facturée */
```

- Titres et chiffres clés : une grotesque compacte, graisse 600 ou 700
- Texte courant : une linéale humaniste lisible en petit corps
- **Tous les chiffres, montants, immatriculations et références : police à
  chasse fixe.** C'est ce qui donne l'aspect « outil » plutôt que « brochure »,
  et ça permet l'alignement à droite dans les colonnes
- Rayons de 4 px maximum. Ombres quasi inexistantes. Pas de dégradé
- Lignes de tableau à 44 px de haut, séparées par un filet de 1 px
- Montants alignés à droite, séparateur de milliers français, symbole € suffixé
- Les heures en format 24 h avec deux points, les durées en `3 h 10`

---

## Livrables attendus

Cinq visuels, à déposer dans `public/ferrandel/` de la landing. Les formats
reprennent exactement ceux de DoyatConstruction, pour que les trois secteurs
s'affichent de la même façon.

| Fichier | Format | Contenu |
|---|---|---|
| `montage-hero.png` | 2480 × 1368 | La liste des tournées en grand, un téléphone de cabine à droite. Titre incrusté et sous-titre en haut |
| `anim-avant-apres.mp4` | 1100 × 174, ~5 s, en boucle | La ligne d'une tournée, avant puis après la clôture : coût de revient et marge qui bougent |
| `anim-pointage-terrain.mp4` | 380 × 822, ~10 s, en boucle | La clôture complète d'une tournée dans la cabine, jusqu'à l'écran de confirmation qui annonce l'attente facturable |
| `montage-chaine.png` | 2480 × ~3100 | Trois étapes : la clôture en cabine, les étapes et les coûts valorisés dans la fiche, la facture avec le supplément d'attente retenu |
| `montage-alerte.png` | 2480 × ~1240 | TRN-2026-121 : la ligne en rouge dans la liste, puis sa fiche avec la marge à 2,4 %, les 180 km à vide et les 3 h 10 d'attente jamais facturées |

Fournir aussi une **affiche** pour chaque vidéo, qui est sa **dernière image** :
`poster-avant-apres.png` et `poster-pointage-terrain.png`. Elle s'affiche pour
les personnes ayant demandé moins d'animations, donc l'état final doit y être
lisible.

Livrer les animations en `.mp4`, pas en `.gif` : deux à trois fois plus légères
à qualité égale.

---

## Ce qu'il ne faut surtout pas construire

Chacun de ces éléments peut coûter une semaine et n'apparaîtra sur aucune
capture :

authentification, gestion des rôles, écran de paramétrage, multi-utilisateur
réel, carte et suivi de position, optimisation de tournée, planning à barres,
chronotachygraphe, gestion des temps de conduite réglementaires, module de
maintenance des véhicules, EDI, export comptable, envoi réel de courriels,
notifications, mode sombre, traduction, animations élaborées, tests
automatisés, responsive parfait sur toutes les tailles d'écran (seuls 390 px et
1440 px comptent).

---

## Langue et ton de l'interface

- Français, vouvoiement, aucune abréviation anglaise dans l'interface
- Vocabulaire du transport partout, jamais de terme générique quand un terme
  métier existe : « lettre de voiture » et non « bon », « ramasse » et non
  « collecte », « temps de service » et non « durée de travail »
- Aucun emoji, nulle part
- Pas de tiret cadratin dans les textes : virgule, deux-points ou point
- Aucun texte de remplissage : pas de « Lorem ipsum », pas de « Client A », pas
  de « Tournée 1 ». Chaque libellé visible doit être plausible
- Les immatriculations sont fictives mais au bon format

---

## Critères de réussite

1. La séquence de captures ci-dessus fonctionne, et les chiffres se recoupent
   entre les trois écrans
2. Cocher l'attente facturable fait remonter la marge de la tournée, en direct
3. L'écran de cabine est utilisable et lisible à 390 px de large
4. La liste des tournées tient sur un écran de 1440 px sans défilement
   horizontal, avec les sept tournées visibles
5. La tournée qui perd de l'argent se repère en moins de deux secondes
6. Aucune marge, aucun coût n'est écrit en dur : tout est calculé
7. Aucun texte de remplissage ne subsiste dans l'interface
8. `npx tsc --noEmit` et `npm run build` passent sans erreur
9. Les cinq visuels et les deux affiches sont produits aux formats du tableau
