# FastWebApp — Wording de la landing page

Ce document reprend **tout le texte affiché sur la page**, bloc par bloc, dans
l'ordre de lecture. Il sert de base de travail pour réécrire les contenus.

- Chaque bloc indique son **rôle dans le parcours**, le **fichier** où le texte
  se trouve, et le **texte actuel** ligne par ligne.
- Les valeurs entre accolades (`{creneauxRestants}`, `{prixDeveloppementMin}`…)
  sont injectées automatiquement depuis `config/site.ts` : à ne pas réécrire en
  dur, mais on peut proposer une autre formulation autour.
- Les indications de longueur sont des ordres de grandeur pour que la mise en
  page tienne, pas des règles absolues.

---

## Cible et ton

**À qui on parle**
Dirigeants de PME françaises de 10 à 50 salariés, dans le BTP, la logistique et
le transport. Le lecteur type est un gérant qui a construit sa boîte, qui n'est
pas un lecteur de contenus tech, qui s'est déjà fait avoir par un prestataire du
digital, et qui manque de temps. Il ne cherche pas un logiciel : il subit une
charge administrative quotidienne.

**Ce qui le convainc**
Qu'on parle de son quotidien avec précision, et qu'on mette un chiffre sur son
problème.

**Ton**
Direct, concret, adulte. Vouvoiement. Phrases courtes. **Première personne du
pluriel (« nous »)** : on parle au nom de l'agence, jamais au nom d'une seule
personne. Seules les questions du bloc Objections font exception, puisqu'elles
reprennent les mots du dirigeant qui lit la page.

**Règles de rédaction**

| Règle | Détail |
|---|---|
| Pas de superlatifs | Interdits : révolutionnez, boostez, propulsez, solution innovante, transformation digitale |
| Pas de vocabulaire site vitrine | Interdits : site vitrine, refonte, visibilité, référencement, présence en ligne |
| Pas de tiret cadratin | Ne pas utiliser le signe « — » dans les textes ; virgule, deux-points ou point à la place |
| Pas de jargon sectoriel | Le texte doit parler aux trois secteurs à la fois : pas de « chantier », « tournée », « lettre de voiture », « pointage » seuls. Préférer devis, factures, tableurs, documents, marge, relances |
| Pas de donnée inventée | Aucun témoignage fictif, aucune note sur 5, aucun chiffre non vérifiable |
| Pas d'emoji | Jamais, nulle part |

---

## Bloc 1 — En-tête

**Rôle** : identité et accès permanent à l'action. Barre fine et collante.
**Fichier** : `components/Header.tsx`

| Élément | Texte actuel |
|---|---|
| Logotype | FastWebApp |
| Bouton | Demander un diagnostic |

---

## Bloc 2 — Accroche (hero)

**Rôle** : nommer le problème en une phrase et déclencher la prise de rendez-vous.
Premier écran, c'est le texte le plus important de la page.
**Fichier** : `components/Hero.tsx`

| Élément | Texte actuel | Contrainte |
|---|---|---|
| Chiffre 1 | **{experienceAnnees}+** années d'expérience en développement | 4 à 6 mots |
| Chiffre 2 | **{projetsTermines}+** projets livrés et terminés | 3 à 5 mots |
| Titre (H1) | L'administratif dévore vos journées. Ce n'est pas votre métier. | 8 à 14 mots, 2 phrases courtes |
| Sous-titre | Devis, factures, tableurs, relances, documents éparpillés : autant d'heures qui ne vont ni à vos clients, ni à votre activité. Nous construisons des outils sur mesure qui font ce travail à votre place. | 30 à 45 mots |
| Bouton | Demander un diagnostic | 3 à 4 mots |
| Sous le bouton | Réponse sous 24 h. | Information factuelle. Ne pas réintroduire de compteur de créneaux : la page ne doit exercer aucune pression |

**Note** : le titre doit dire que l'administratif prend un temps anormal et
empêche de se concentrer sur le vrai métier. Éviter de décrire un cas précis
(un secteur, un logiciel), rester sur le ressenti commun aux trois secteurs.

---

## Bloc 3 — Preuve

**Rôle** : crédibiliser avant que le doute s'installe.
**Fichier** : `components/SocialProof.tsx`

| Élément | Texte actuel |
|---|---|
| Intitulé | Ils m'ont fait confiance |
| Logos défilants | Disneyland Paris, SFR, Submagic, Rexel, Bizline, SGDSN, JobTeaser |

**Note juridique** : la formule « Ils m'ont fait confiance » suppose une
relation client directe avec chacune de ces entreprises. Si ce n'est pas le cas
pour l'une d'elles, la retirer de la liste ou revenir à une formulation
factuelle du type « Projets sur lesquels nous avons travaillé ».

---

## Bloc 4 — Les irritants (liste animée)

**Rôle** : faire dire « c'est exactement ça » en quelques secondes. Les phrases
défilent verticalement, une seule est mise en avant à la fois.
**Fichier** : `components/PainTicker.tsx`

| Élément | Texte actuel | Contrainte |
|---|---|---|
| Sur-titre | Chaque semaine | 2 à 3 mots |
| Titre (H2) | Le temps ne part pas dans votre métier. Il part là. | 8 à 12 mots |

**Les 7 phrases défilantes** (3 à 6 mots chacune, formulation homogène) :

1. les mêmes infos saisies trois fois
2. la marge découverte trop tard
3. des devis jamais relancés
4. des documents introuvables
5. des factures ressaisies à la main
6. des tableurs qui ne se parlent pas
7. l'administratif fini le dimanche

**Note** : le nombre de phrases peut changer librement, le défilement s'adapte.

---

## Bloc 5 — Le constat

**Rôle** : détailler le problème en situations reconnaissables.
**Fichier** : `components/Problems.tsx`

| Élément | Texte actuel |
|---|---|
| Badge | Le constat |
| Titre (H2) | Des journées entières partent dans des tâches qu'aucun client ne paie. |

**Les 4 cartes** (titre : 3 à 6 mots / texte : 20 à 30 mots) :

| # | Titre | Texte |
|---|---|---|
| 1 | Trois fois la même saisie | Les mêmes informations tapées dans un tableur, puis dans un logiciel, puis transmises à la comptabilité. Chaque semaine, par plusieurs collaborateurs. |
| 2 | La marge, connue trop tard | La rentabilité réelle d'une affaire n'est visible qu'une fois le mois clôturé. Trop tard pour corriger le tir si le dossier dérape. |
| 3 | Des devis sans réponse | Des propositions partent, certaines restent sans réponse. Personne n'a le temps d'assurer le suivi, et vous ignorez combien d'argent dort dehors. |
| 4 | Les documents introuvables | Devis, factures, contrats, justificatifs : on les cherche dans l'urgence, perdus entre trois boîtes mail et des dossiers papier. |

---

## Bloc 6 — Avant / après

**Rôle** : rendre la transformation lisible en 10 secondes, sans promesse chiffrée.
**Fichier** : `components/Comparison.tsx`

| Élément | Texte actuel |
|---|---|
| Badge | La différence |
| Titre (H2) | Ce qui change avec un outil fait pour votre métier. |

**Colonne gauche, titre : Aujourd'hui** (1 ligne par item, 8 à 12 mots)

1. Une information saisie trois fois, dans trois outils différents
2. La marge réelle connue des mois après, à la clôture comptable
3. Les relances de devis faites de tête, quand on y pense
4. Les documents éparpillés dans trois boîtes mail
5. Des logiciels génériques que personne n'utilise vraiment

**Colonne droite, titre : Avec un outil sur mesure** (même longueur, en miroir)

1. Une saisie unique, qui circule jusqu'à la facturation et la compta
2. La marge visible en temps réel, pas des mois après
3. Les relances qui partent toutes seules, au bon moment
4. Devis, factures, contrats, justificatifs : au même endroit
5. Un outil qui parle votre vocabulaire, adopté parce qu'il sert

**Note** : les deux listes doivent se répondre ligne à ligne, dans le même
ordre. Si une ligne change à gauche, sa contrepartie change à droite.

---

## Bloc 7 — Les offres

**Rôle** : présenter les deux offres et déclencher la réservation. C'est le
bloc de conversion principal.
**Fichier** : `components/Offers.tsx`

| Élément | Texte actuel |
|---|---|
| Badge | Les offres |
| Titre (H2) | Deux offres indépendantes. |
| Sous-titre | Le diagnostic se suffit à lui-même. Vous repartez avec les livrables, que vous alliez plus loin ou non. |

### Offre 1 (carte de gauche, action principale)

| Élément | Texte actuel | Contrainte |
|---|---|---|
| Nom | Le diagnostic | 2 à 3 mots |
| Accroche | Le chiffrage de vos heures perdues. | 5 à 8 mots, 1 ligne |
| Label prix | Coût | 1 mot |
| Prix | Offert | Ne jamais écrire « audit gratuit ». Ne pas afficher de valeur chiffrée barrée ou « valorisée » : sur cette cible, ancrer un montant sur un rendez-vous détruit la crédibilité du reste de la page |
| Bouton | Demander un diagnostic | 3 à 4 mots |
| Sous le bouton | Réponse sous 24 h. | |

**Ce qui est inclus** (6 lignes, 6 à 10 mots chacune) :

1. Visio de {dureeDiagnosticHeures} h, sans préparation de votre côté
2. Votre organisation cartographiée sur une page
3. Vos heures perdues chiffrées en euros par an
4. Ce qui ne mérite pas de développement, dit clairement
5. Une automatisation livrée et fonctionnelle
6. Tout vous appartient, sans aucun engagement

### Offre 2 (carte de droite, secondaire)

| Élément | Texte actuel | Contrainte |
|---|---|---|
| Nom | Le sur-mesure | 2 à 3 mots |
| Accroche | L'outil métier construit pour vous. | 5 à 8 mots, 1 ligne |
| Label prix | à partir de | 3 mots |
| Prix | {prixDeveloppementMin} € | |
| Bouton | Nous contacter | Même style que le bouton principal, mène au formulaire de contact |
| Sous le bouton | Réponse sous 24 h. | |

**Ce qui est inclus** (6 lignes) :

1. Mini-CRM ou mini-ERP adapté à votre métier
2. Automatisation de vos process, saisie unique
3. IA là où elle fait gagner des heures réelles
4. Reprise de vos données existantes
5. Formation de vos équipes à la prise en main
6. Code documenté, hébergé sur vos comptes

### Sous les cartes

| Élément | Texte actuel |
|---|---|
| Déroulé (1 ligne) | **1** Visio de {dureeDiagnosticHeures} h / **2** Restitution / **3** Vous repartez avec les livrables |
| Mention | Prix HT. Le diagnostic ne vous engage à rien. |

---

## Bloc 8 — Objections

**Rôle** : lever les freins réels, avec les mots que le dirigeant emploie dans
sa tête. Réponses honnêtes, sans esquive. Affichage en accordéon.
**Fichier** : `components/Objections.tsx`

| Élément | Texte actuel |
|---|---|
| Badge | Vos questions |
| Titre (H2) | Ce que vous vous dites probablement. |

**Les 6 questions** (question : formulée comme une pensée du dirigeant /
réponse : 40 à 70 mots)

**Attention à la voix** : les *questions* sont dans les mots du dirigeant qui
lit la page, donc au « je » ou au « on ». Les *réponses* sont celles de
l'agence, donc toujours au « nous ».

**1. C'est gratuit, où est le piège ?**
Il n'y en a pas. C'est notre façon de rencontrer des entreprises et de
comprendre leurs process : nous en faisons {diagnosticsParMois} par mois, et
nous apprenons à chaque fois. Vous repartez avec la cartographie, le chiffrage
et l'automatisation, sans rien devoir ni signer. Ce qui se passe ensuite ne
dépend que de vous.

**2. On n'a pas le temps pour ça**
Une heure en visio, une seule fois. Vous n'avez rien à préparer : vous parlez
de votre entreprise, nous prenons les notes et nous faisons les calculs. Si vos
journées ressemblent à ce que décrit cette page, cette heure se rembourse dès
la première friction supprimée.

**3. On a déjà un logiciel**
Tant mieux, nous ne sommes pas là pour le remplacer. Dans la plupart des
entreprises, le problème n'est pas le logiciel : c'est ce qui se passe entre les
logiciels, à la main. Et si votre outil actuel suffit avec un meilleur
paramétrage, le diagnostic le dira noir sur blanc, et ça s'arrêtera là.

**4. Je ne suis pas à l'aise avec l'informatique**
C'est notre travail de nous adapter à vos habitudes, pas l'inverse. Les outils
que nous livrons s'utilisent comme un bon de livraison : quelques champs, dans
le vocabulaire de votre métier. Si quelqu'un sait remplir une feuille d'heures,
il saura s'en servir.

**5. Combien ça coûte vraiment, au final ?**
Rien. Le diagnostic est offert et il s'arrête là : vous gardez la cartographie,
le chiffrage et l'automatisation, coût total zéro. Il n'y a ni devis à la clé,
ni relance commerciale prévue. Si un jour vous voulez faire développer un outil,
le tarif est public sur cette page et c'est vous qui revenez vers nous.

**6. On va dépendre de vous, non ?**
Non, et c'est une règle que nous nous imposons : tout ce que nous livrons vous
appartient. Le code est documenté, hébergé sur vos comptes, sans abonnement
captif. N'importe quel développeur peut reprendre l'outil, y compris sans nous.

---

## Bloc 9 — Prise de rendez-vous

**Rôle** : convertir. Le visiteur choisit lui-même son créneau, sans étape
intermédiaire ni attente de réponse.
**Fichier** : `components/Booking.tsx`

| Élément | Texte actuel |
|---|---|
| Badge | Demander |
| Titre (H2) | Choisissez votre créneau. |
| Sous-titre | Réservé aux entreprises de 10 à 50 salariés du BTP, de la logistique et du transport. Visio d'{dureeDiagnosticHeures} h, rien à préparer de votre côté. |

**Calendrier**

Le calendrier est un module Cal.com intégré, en thème clair. Les textes qu'il
affiche (nom du rendez-vous, durée, questions posées au moment de la
réservation, message de confirmation, email de rappel) **ne se modifient pas
dans ce document** : ils se règlent directement dans le compte Cal.com, sur le
type de rendez-vous `{cal.lien}`.

À vérifier côté Cal.com pour rester cohérent avec la page :

- le nom du rendez-vous et sa description reprennent le vocabulaire de la page
- la durée annoncée correspond bien à {dureeDiagnosticHeures} h
- les questions du formulaire de réservation servent de filtre : entreprise,
  effectif (10 à 50), secteur (BTP, logistique, transport), et le processus
  administratif qui coûte le plus cher aujourd'hui
- le message de confirmation ne réintroduit aucune allusion à une prestation
  payante
---

## Bloc 10 — Pied de page

**Rôle** : minimal, sur fond encre. Une seule ligne : la marque à gauche,
les mentions à droite. Volontairement dépouillé pour que la seule action de
la page reste la prise de rendez-vous.
**Fichier** : `components/Footer.tsx`

| Élément | Texte actuel |
|---|---|
| Nom | FastWebApp |
| Lien | Mentions légales |
| Année | © année en cours, calculée automatiquement |

---

## Textes hors page (référencement et partage)

**Fichier** : `app/layout.tsx` et `config/site.ts`

| Élément | Texte actuel | Contrainte |
|---|---|---|
| Titre de l'onglet et résultat Google | FastWebApp : outils métier sur mesure pour PME du BTP, de la logistique et du transport | 60 caractères idéalement, 70 maximum |
| Description Google et réseaux sociaux | Développement d'outils métier sur mesure (mini-CRM, mini-ERP, automatisations) pour les PME du BTP, de la logistique et du transport, de 10 à 50 salariés. | 150 à 160 caractères |
| Titre de partage réseaux sociaux | FastWebApp : outils métier sur mesure | Court |

---

## Valeurs modifiables sans toucher au texte

Ces valeurs sont centralisées dans `config/site.ts` et se répercutent partout
sur la page. Les mettre à jour ne demande aucune réécriture.

| Valeur | Actuellement | Où elle apparaît |
|---|---|---|
| `moisAffiche` | août | Plus affiché sur la page principale, conservé pour `/v2` |
| `diagnosticsParMois` | 4 | Objection 1 uniquement |
| `creneauxRestants` | 2 | Plus affiché sur la page principale, conservé pour `/v2` |
| `valeurDiagnostic` | 990 | Plus affiché sur la page principale, conservé pour la page `/v2` |
| `dureeDiagnosticHeures` | 1 | Offres, déroulé, objection 2 |
| `prixDeveloppementMin` | 5000 | Offre 2 |
| `experienceAnnees` | 8 | Accroche |
| `projetsTermines` | 20 | Accroche |
| `email` | contact@fastwebapp.fr | Pied de page |
| `references` | 7 entreprises | Bloc preuve |

---

## Rappel des éléments absents volontairement

- **Aucun témoignage client** tant qu'aucun avis réel et vérifiable n'existe.
  Un composant `components/References.tsx` est prêt à en recevoir, il est vide
  et commenté.
- **Aucune note sur 5 étoiles**, aucun nombre de clients estimé.
- **Le mot « audit gratuit »** n'apparaît nulle part : le terme est saturé par
  les agences à bas prix et abîme le positionnement. On dit « diagnostic ».

---

## Comment rendre les propositions

Le plus simple pour intégrer ensuite : reprendre ce document, garder les titres
de blocs et les libellés de lignes, et remplacer uniquement le texte de la
colonne « Texte actuel ». Signaler les lignes supprimées ou ajoutées.
