# SI QUEST V2.3 — Cycle 333–337 — 28 octobre 2026

## Phase 0 — dépôt et sécurité
- Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`, HEAD initial distant `710069ee5216b7962d85486407d97ef11ea0ae8b`, arbre `53e7de028205d3460587169383883012a5f95f5f`.
- Contrats consultés : `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, modèles `src/investigations.js`, `src/investigation-diagrams.js`, lots précédents, `src/catalog.js`, contrôleur `src/investigation-mission.js`, HTML de mission, tests et workflows.
- Dépendances d'accueil : `index.html`, `src/home.js`, `src/style.css`, `src/catalog.js`, `assets/archipelago-cinematic.svg`. Le catalogue est une dépendance partagée ; seule l'insertion de cinq entrées dans `src/catalog.js` est autorisée ici. Aucun fichier de l'accueil, de la carte ou des assets n'est modifié.
- Branche d'archive `archive/pre-reconstruction-cycle28-20261025` présente : `e990ffba51bd49d5faf9f190ed4b48e73b675ce4`. Aucun force push, aucune modification de visibilité, aucun GitHub Pages ni ZIP.

## Chantier A — corrections historiques
- **P1 fonctionnel (banc de tests)** : `tests/batch328-332-flow.test.cjs` construisait son faux DOM à partir des identifiants de missions, au lieu des identifiants des éléments HTML (`main`, `curve`, `calc`, `answer`, etc.). Les parcours étaient donc non exécutables tels quels. Correction du jeu d'identifiants ; contre-audit V8 du vrai contrôleur avec modèles du lot 323–332 : **5/5 parcours PASS, 80 assertions**.
- **P2 pédagogique (mission 59 : `measurement-relative-01`)** : situation professionnelle, objectif explicite, prérequis, trois questions flash et distinction entre écart relatif et décision de conformité insuffisamment explicités dans le HTML. Ajout d'une section de réactivation et d'un critère fictif ; test de non-régression : **1/1 PASS**. Le modèle numérique n'est pas modifié.
- **Audit structurel et numérique 40–75** : 36 missions, minimum/nominal/maximum, **108/108 calculs finis PASS et 108/108 SVG structurels PASS**, à partir du moteur et des pages réels ; ce test n'est **pas** une contre-validation scientifique indépendante de toutes les équations. Contrôles répartis en trois groupes de 12. Couverture native des flash : 10/36 ; les autres sont gérés par le contrôleur, sans prétendre ici avoir testé chaque parcours clavier.

## Chantier B — cinq missions indépendantes
| Numéro | ID | Sous-savoir | Résultat nominal |
|---|---|---|---|
| 333 | `parallel-reliability-01` | Fiabilité d'une redondance active indépendante | 98,95 % |
| 334 | `induction-rotor-copper-loss-01` | Pertes Joule rotor liées au glissement | 0,600 kW |
| 335 | `ntc-beta-temperature-01` | Inversion de la loi β d'une CTN | 30,1078 °C |
| 336 | `cantilever-tip-slope-01` | Rotation en bout d'une console chargée | 0,803571 mrad |
| 337 | `ideal-gas-sound-speed-01` | Célérité acoustique d'un gaz parfait | 347,189 m/s |

Chaque mission contient situation métier, objectif, prérequis, trois flash, hypothèses, domaine, unités et conversions, calcul pur, tolérance dédiée, trois essais et trois aides du contrôleur mutualisé, corrigé conditionnel détaillé, décision fictive, SVG 2D paramétrique, courbe et sauvegarde locale. L'absence d'animation temporelle est justifiée par l'absence de loi de mouvement. Aucune 3D revendiquée.

## Contre-audit avant publication
- V8 sur code scientifique et test CJS du nouveau lot : **6/6 tests PASS, 168 assertions**. 15 références indépendantes (minimum/nominal/maximum), invariants physiques, rejets hors domaine, schémas synchronisés, conversions, tolérances, unicité.
- Contrôleur réel sur DOM simulé : **5/5 nouveaux parcours PASS, 80 assertions** ; saisie invalide, trois essais, aides, corrigé conditionnel, succès, trois étoiles, sauvegarde.
- Banc historique 328–332 réparé : **5/5 parcours PASS, 80 assertions**.
- Mission historique corrigée : **1/1 test PASS**.
- Liens et scripts : **5/5 pages avec 23 scripts référencés chacun, 23/23 uniques, aucune dépendance manquante**, retour vers accueil préservé.
- Catalogue simulé avec nouvelle insertion : **337/337 identifiants uniques, 17/17 univers, 240 sous-savoirs explicitement distincts**. Les 97 missions historiques sans sous-savoir explicite restent à classifier.
- **CI GitHub Actions antérieure** : les trois jobs du HEAD initial `710069e` sont en FAIL avant toute étape observable (`steps=[]`). Logs du job Node : HTTP 404 `BlobNotFound`. La cause exacte n'est pas établie ; cela ne constitue pas une preuve d'échec des tests Node.
- **Node natif sur code final** : NOT RUN localement ; CI du commit publié à vérifier.
- **Recette visuelle navigateur, Android/iPhone, NVDA, TalkBack, VoiceOver** : NOT RUN. Aucune réception complète déclarée.

## Matrice de preuves S/G/P/F/A
| Domaine | Statut | Preuve et limite |
|---|---|---|
| S | PASS ciblé | 15 références et invariants V8 ; validation indépendante exhaustive NOT RUN |
| G | PASS structurel / NOT RUN visuel | SVG synchronisés et bornes ; pas de capture navigateur |
| P | PASS ciblé | Flash, contexte, corrigés et 10 parcours DOM simulés |
| F | PASS V8 / BLOCKED CI | Modèles, contrôleur et sauvegarde simulée ; Node GitHub Actions non prouvé |
| A | PASS structurel partiel / NOT RUN manuel | HTML sémantique et textes alternatifs ; lecteurs d'écran non testés |

## Publication et vérification CI après production
- Commit de production privé sur `main` : `9168577e858217ad4fe27bfc304843be6fb6a1c7` ; 13 fichiers modifiés ou ajoutés, sans changement des fichiers protégés de l'accueil.
- `origin/main` relu après publication : `9168577e858217ad4fe27bfc304843be6fb6a1c7` ; 337 pages HTML de missions présentes.
- CI sur ce commit : **4/4 workflows FAIL avant toute étape observable**, jobs sans étapes, donc **BLOCKED pour la réception Node**. Runs : Node `40643398137`, scientifique `40643398188`, qualité scientifique `40643398139`, navigateur accueil `40643398199`.
- Deuxième tentative demandée pour Node et scientifique : **FAIL** (`run_attempt=2` pour les deux). Journaux des jobs Node et scientifique : **HTTP 404 BlobNotFound** ; diagnostic de l'infrastructure GitHub Actions non établi. Aucun succès CI revendiqué.
- Tests navigateur, matériels et lecteurs d'écran : **NOT RUN**. Le projet reste en réception partielle.
- La présente mise à jour documentaire génère un commit supplémentaire ; consulter `origin/main` pour son SHA final.

