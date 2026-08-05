# Prompt : outil de démonstration Sorenval Logistique

Brief complet à donner à un agent pour construire le projet. Autosuffisant :
tout ce qui suit se lit sans connaître la landing page FastWebApp.

Deuxième des trois démonstrations sectorielles, après DoyatConstruction (BTP).
Même méthode, même exigence, secteur différent.

---

## Mission

Construis un outil de gestion d'exploitation pour **Sorenval Logistique**,
prestataire logistique pour compte de tiers. Projet autonome, dans son propre
dépôt, **aucune base de données** : les données vivent en mémoire.

L'outil sert à produire les captures d'une page de vente. Il doit rendre une
seule phrase indiscutable :

> Chaque mouvement fait dans l'entrepôt est facturé au donneur d'ordre, sans
> que personne ne le ressaisisse ni ne l'oublie.

Tout ce qui ne sert pas cette phrase est hors périmètre. Ce n'est pas un WMS,
ce n'est pas un produit à vendre, c'est une démonstration qui doit tenir debout.

**Le mécanisme central, à construire en priorité** : une réception saisie
depuis le terminal du quai fait monter le montant facturable du donneur
d'ordre, en temps réel, dans la liste et dans sa fiche. Si une seule chose
fonctionne dans ce projet, c'est celle-là. C'est elle qui sera capturée avant
et après.

**La fuite d'argent que l'outil met en évidence** : les prestations réalisées
mais jamais refacturées. Manutentions exceptionnelles, filmage, retours,
immobilisation de support, opérations hors contrat. Elles sont faites, elles
coûtent, et elles ne partent pas sur la facture parce que personne n'a le temps
de les tracer. C'est l'équivalent, pour la logistique, de la marge qui dérape
sur un chantier.

---

## L'entreprise

**Sorenval Logistique**, SAS, 41 salariés, entrepôt de 9 400 m² à Lesquin
(Nord). Prestation logistique pour compte de tiers : stockage, préparation de
commandes, expédition, retours. Six donneurs d'ordre sous contrat, dont deux
qui pèsent la moitié de l'activité.

> **Avant d'écrire la moindre ligne** : vérifier sur societe.com et à l'INPI
> qu'aucune entreprise ne porte ce nom. Si c'est le cas, en changer et le
> signaler. Une démonstration ne doit jamais porter le nom d'une société réelle.

Trois personnes utilisent l'outil, et chaque écran est pensé pour l'une d'elles :

| Rôle | Qui | Ce qu'elle fait dans l'outil |
|---|---|---|
| Directeur d'exploitation | Xavier Delcourt | Regarde le facturable du mois par donneur d'ordre, traque ce qui n'est pas refacturé |
| Responsable d'exploitation | Nadia Berkane | Vit dans la fiche client, traite les litiges, édite la facture mensuelle |
| Chef d'équipe quai | Mickaël Thuillier | Saisit les réceptions et les expéditions depuis un terminal, sur le quai |

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
  page.tsx                    → redirige vers /clients
  clients/page.tsx            → liste des donneurs d'ordre
  clients/[id]/page.tsx       → fiche client, onglets en paramètre de recherche
  quai/page.tsx               → terminal de saisie, format mobile
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
export type Operateur = {
  id: string;
  nom: string;
  equipe: "quai" | "préparation" | "retours";
  /** Coût horaire chargé, en euros. Entre 26 et 34. */
  coutHoraireCharge: number;
};

export type Client = {
  id: string;
  /** Le donneur d'ordre. */
  nom: string;
  secteur: string;
  interlocuteur: string;
  ville: string;
  /** Début du contrat, AAAA-MM-JJ. */
  depuis: string;
};

/**
 * Le tarif contractuel, par unité d'œuvre. Ce qui n'y figure pas est une
 * prestation hors contrat : réalisée, facturable, et le plus souvent oubliée.
 */
export type LigneTarif = {
  id: string;
  clientId: string;
  uniteOeuvre:
    | "palette reçue"
    | "palette expédiée"
    | "colis préparé"
    | "palette stockée par mois"
    | "retour traité";
  prixUnitaire: number;
};

export type TypeMouvement =
  | "réception"
  | "expédition"
  | "préparation"
  | "retour"
  | "manutention exceptionnelle"
  | "filmage"
  | "immobilisation de support";

export type Mouvement = {
  id: string;
  clientId: string;
  type: TypeMouvement;
  date: string;
  /** Palettes, colis, ou supports selon le type. */
  quantite: number;
  /** Temps réellement passé, en heures. Sert au coût. */
  heures: number;
  operateurId: string;
  /** Numéro de bon de livraison ou de commande. */
  reference: string;
  /** Commentaire du chef d'équipe. Souvent vide, parfois précieux. */
  note?: string;
  photo?: string;
  /** Vrai quand le mouvement est déjà parti sur une facture. */
  facture: boolean;
};

export type Litige = {
  id: string;
  clientId: string;
  mouvementId: string;
  date: string;
  motif: "casse" | "manquant" | "erreur d'adresse" | "support non rendu";
  quantite: number;
  montantEnJeu: number;
  statut: "ouvert" | "accepté" | "refusé";
};

export type Facture = {
  id: string;
  clientId: string;
  /** Format FAC-AAAA-NNN. */
  numero: string;
  periode: string;            // « mars 2026 »
  montantHT: number;
  dateEmission: string;
  dateEcheance: string;
  statut: "brouillon" | "envoyée" | "payée" | "en retard";
};
```

### Calculs dérivés

Aucun montant, aucun taux ne doit être écrit en dur dans les données de départ.
Tout se recalcule à partir des mouvements, sinon les chiffres ne se recoupent
pas d'un écran à l'autre et chaque capture ment un peu.

```ts
prixUnitaire(mouvement)   = tarif du client pour cette unité d'œuvre, sinon 0
facturable(mouvement)     = quantite × prixUnitaire(mouvement)
horsContrat(mouvement)    = aucun tarif contractuel ne couvre ce type
coutOperation(mouvement)  = heures × operateur.coutHoraireCharge

facturableDuMois(client)  = Σ facturable(mouvements du mois)
dejaFacture(client)       = Σ facturable(mouvements du mois où facture = true)
manqueAFacturer(client)   = facturableDuMois − dejaFacture
horsContratDuMois(client) = Σ coutOperation(mouvements hors contrat du mois)
tauxRefacturation(client) = dejaFacture / facturableDuMois × 100
coutDuMois(client)        = Σ coutOperation(mouvements du mois)
margeDuMois(client)       = facturableDuMois − coutDuMois
```

**Règle d'alerte**, à afficher visuellement : un client est signalé quand son
taux de refacturation passe sous 90 %, ou quand ses prestations hors contrat du
mois dépassent 1 500 € de coût. C'est la règle qui fait passer une ligne en
rouge dans la liste.

---

## Données de départ

C'est le vrai travail du projet, bien avant le CSS. Des données stériles rendent
la démonstration inutilisable, quelle que soit la qualité de l'interface.

### Règles de vraisemblance, non négociables

1. **Un client doit aller mal.** Un tableau où tout est vert ne convainc
   personne. C'est le signal de crédibilité le plus fort du projet.
2. Les montants sont ceux du métier : 2,80 € la palette reçue, 3,40 € la palette
   expédiée, 0,55 € le colis préparé, 12 € la palette stockée par mois, 6,50 € le
   retour traité. Coût horaire chargé entre 26 et 34 €.
3. Les dates sont récentes, s'étalent sur environ six semaines et se tiennent
   entre elles : pas de facture émise avant les mouvements qui la composent.
4. Au moins cinq lignes portent un commentaire tapé par un humain, avec ses
   approximations : « 3 palettes filmées à la main, palettiseur en panne »,
   « camion arrivé à 19 h 40, équipe rappelée », « support consigné non rendu,
   relancé le transporteur ».
5. Le vocabulaire est celui du métier partout : unité d'œuvre, donneur d'ordre,
   support, emplacement, picking, cross-docking, inventaire tournant, écart de
   stock, palette consignée, cerclage, UVC.
6. Les mouvements hors contrat existent en quantité chez un seul client, pas
   répartis uniformément : c'est ce qui rend l'alerte crédible.

### Les six donneurs d'ordre

| Nom | Secteur | Facturable du mois | Ce qu'il démontre |
|---|---|---|---|
| Maison Vaubelle | Agroalimentaire sec | ~38 000 € | Le cas sain. Taux de refacturation à 99 %, le parcours principal se joue ici |
| Cheminel Distribution | Quincaillerie, second œuvre | ~21 500 € | **Le cas qui fuit.** Taux à 71 %, environ 4 800 € de prestations hors contrat jamais refacturées : manutentions exceptionnelles, filmage manuel, supports immobilisés. La ligne rouge |
| Ondelys Cosmétique | Cosmétique, petits colis | ~29 000 € | Le gros volume de préparation, 14 000 colis au mois |
| Tissages du Lys | Textile | ~9 200 € | Un client saisonnier, activité faible ce mois |
| Bracourt Frères | Matériel électrique | ~16 400 € | **Litiges ouverts** : trois casses et un manquant non tranchés |
| Verlaine & Cie | Vins et spiritueux | ~11 800 € | **Facture en retard**, 38 jours d'échéance dépassée |

### Volumes

- **9 opérateurs**, dont Mickaël Thuillier, chef d'équipe quai
- **Environ 200 mouvements** répartis sur six semaines, concentrés sur les gros
  clients. Des journées creuses, des pics le lundi et le jeudi. Pas de
  régularité mécanique
- **Une trentaine de lignes hors contrat**, dont les trois quarts chez Cheminel
- **8 litiges**, dont 4 ouverts
- **6 factures**, cohérentes avec les statuts du tableau

---

## Les écrans

### 1. Terminal de quai, mobile — `/quai`

L'écran de Mickaël, sur le quai, camion à décharger. Conçu pour être utilisé
debout, avec des gants : cibles tactiles d'au moins 48 px, contrastes appuyés,
peu de texte.

- En-tête : la date, le nom de l'utilisateur, le quai
- Les arrivages attendus du jour, en grandes cartes : donneur d'ordre, numéro de
  bon, palettes annoncées
- Au choix d'un arrivage : saisie des palettes reçues avec des boutons plus et
  moins, un bouton « écart » qui ouvre la saisie d'un manquant ou d'une casse,
  un champ de note, l'ajout d'une photo du bon de livraison
- Un bouton pour ajouter une **prestation hors contrat** : filmage manuel,
  manutention exceptionnelle, immobilisation de support, avec le temps passé.
  C'est le geste qui fait exister l'argent aujourd'hui perdu
- Un seul bouton de validation, large, en bas
- Après validation : une confirmation sobre indiquant ce qui vient d'être
  enregistré, et le montant facturable que cela représente. Rien d'autre

Cet écran doit être présentable dans un cadre de téléphone. Il doit donc être
lisible dans une largeur de 390 px.

### 2. Liste des donneurs d'ordre — `/clients`

L'écran du directeur d'exploitation. Barre latérale à gauche, tableau dense à
droite.

Colonnes : client, secteur, mouvements du mois, facturable, déjà facturé,
**taux de refacturation**, hors contrat, marge, statut de la facture.

- La ligne de Cheminel Distribution est en alerte : taux en rouge, discret
  repère en début de ligne. Pas de bandeau, pas d'icône criarde
- Filtres au-dessus : période, statut de facture, recherche libre
- Bandeau de synthèse en haut : facturable du mois, déjà facturé, **manque à
  facturer**, montant en attente de règlement
- Tri par colonne au clic

### 3. Fiche donneur d'ordre — `/clients/[id]`

Le cœur du produit. On y arrive en cliquant sur une ligne de la liste.

En-tête : nom, secteur, interlocuteur, contrat depuis. À droite, un bloc de
chiffres : facturable du mois, déjà facturé, **manque à facturer**, taux de
refacturation, prestations hors contrat en euros.

Quatre onglets :

- **Mouvements** — la liste par date décroissante, avec type, quantité, unité
  d'œuvre, prix unitaire appliqué, montant facturable, opérateur, note, photo.
  Les lignes hors contrat sont marquées, avec la mention « aucun tarif au
  contrat ». La réception saisie depuis le quai apparaît en tête, repérée
- **Stock** — palettes en stock par emplacement, entrées et sorties du mois,
  écart d'inventaire
- **Litiges** — motif, quantité, montant en jeu, statut, avec le mouvement lié
- **Facturation** — voir écran 4

### 4. Facturation — onglet de la fiche

- Un bouton « Établir la facture du mois »
- Au clic : un aperçu de facture se compose **à partir des mouvements**, sans
  ressaisie. Une ligne par unité d'œuvre avec quantité, prix unitaire, total,
  puis un bloc distinct « prestations hors contrat » que l'exploitant coche pour
  refacturer, chiffré au temps passé. Un aperçu mis en page, pas un formulaire
- Le total se met à jour quand on coche ou décoche une prestation hors contrat
- Sur la facture en retard de Verlaine & Cie, un repère d'échéance dépassée avec
  le nombre de jours

---

## Le parcours à jouer pour les captures

L'agent doit vérifier que cette séquence fonctionne de bout en bout :

1. Ouvrir `/clients`. Noter le facturable du mois de Maison Vaubelle et son taux
   de refacturation.
2. Aller sur `/quai`, choisir l'arrivage Maison Vaubelle, saisir 24 palettes
   reçues, ajouter une prestation hors contrat de filmage manuel de 1,5 h avec
   une note, valider.
3. Revenir sur `/clients`. **Le facturable a augmenté**, le hors contrat aussi,
   le taux de refacturation a bougé.
4. Ouvrir la fiche du client, onglet Mouvements : la réception est en tête, avec
   sa note, sa photo et son montant. La ligne hors contrat porte sa mention.
5. Onglet Facturation : établir la facture. Cocher la prestation hors contrat.
   Le total monte du bon montant.

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
--signal:  #058c63;  /* accent : actions principales, taux sain */
--trait:   #e3ebe7;  /* filets, bordures, séparateurs */
--alerte:  #b4341f;  /* taux dégradé, échéance dépassée */
--attente: #b07d10;  /* litige ouvert, en attente de règlement */
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

## Livrables attendus

Cinq visuels, à déposer dans `public/sorenval/` de la landing. Les formats
reprennent exactement ceux de DoyatConstruction, pour que les trois secteurs
s'affichent de la même façon.

| Fichier | Format | Contenu |
|---|---|---|
| `montage-hero.png` | 2480 × 1368 | La liste des donneurs d'ordre en grand, un terminal de quai à droite. Titre incrusté et sous-titre en haut |
| `anim-avant-apres.mp4` | 1100 × 174, ~5 s, en boucle | La ligne de Maison Vaubelle, avant puis après la réception : facturable et taux qui bougent |
| `anim-pointage-terrain.mp4` | 380 × 822, ~10 s, en boucle | La saisie complète d'une réception sur le terminal, jusqu'à l'écran de confirmation |
| `montage-chaine.png` | 2480 × ~3100 | Trois étapes : la saisie au quai, les mouvements valorisés dans la fiche, la facture composée |
| `montage-alerte.png` | 2480 × ~1240 | Cheminel Distribution : la ligne en rouge dans la liste, puis sa fiche avec le taux, le hors contrat et le manque à facturer |

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
réel, plan d'entrepôt interactif, gestion d'emplacements au niveau de l'allée,
lecture de code-barres réelle, EDI, module de transport, export comptable, envoi
réel de courriels, notifications, mode sombre, traduction, animations élaborées,
tests automatisés, responsive parfait sur toutes les tailles d'écran (seuls
390 px et 1440 px comptent).

---

## Langue et ton de l'interface

- Français, vouvoiement, aucune abréviation anglaise dans l'interface
- Vocabulaire de la logistique partout, jamais de terme générique quand un terme
  métier existe : « unité d'œuvre » et non « type de prestation », « donneur
  d'ordre » et non « client » dans les intitulés de colonnes
- Aucun emoji, nulle part
- Pas de tiret cadratin dans les textes : virgule, deux-points ou point
- Aucun texte de remplissage : pas de « Lorem ipsum », pas de « Client A », pas
  de « Produit 1 ». Chaque libellé visible doit être plausible

---

## Critères de réussite

1. La séquence de captures ci-dessus fonctionne, et les chiffres se recoupent
   entre les trois écrans
2. Le terminal de quai est utilisable et lisible à 390 px de large
3. La liste des donneurs d'ordre tient sur un écran de 1440 px sans défilement
   horizontal, avec les six clients visibles
4. Le client qui fuit se repère en moins de deux secondes
5. Aucun montant, aucun taux n'est écrit en dur : tout est calculé
6. Aucun texte de remplissage ne subsiste dans l'interface
7. `npx tsc --noEmit` et `npm run build` passent sans erreur
8. Les cinq visuels et les deux affiches sont produits aux formats du tableau
