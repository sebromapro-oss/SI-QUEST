# SI QUEST V2.3 — Audit et production 373–377

**Date :** 28 octobre 2026. **Dépôt :** `sebromapro-oss/SI-QUEST` (privé), branche `main`.
**HEAD distant initial :** `0306990ea55349f46a881c13fa841c818e813a8c`.
**HEAD contrôlé après corrections, avant ce registre :** `94594a1ee6f0fe53dc1e3919a7ced566a5ef3f11`.
La SHA distante finale du cycle doit être lue après ce commit, dans GitHub ; ne pas confondre SHA de production et SHA finale.

## Référentiel et protection
`CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, catalogue, moteurs, contrôleur, modèle HTML et suites de tests précédentes consultés. Les 17 univers et 249 sous-savoirs sont des catégories, non une preuve de réception. La nouvelle page d'accueil `index.html`, `src/home.js`, `src/style.css` et ses assets ne sont pas modifiés ; `src/catalog.js` reçoit uniquement cinq entrées de missions, sans remplacement des liens ni de la navigation. Dépôt privé, pas de Pages, ZIP, force push ou suppression d'archive.

## Production — cinq questions scientifiques indépendantes
| N° | Identifiant | Résultat nominal | Unité | Question |
|---|---|---:|---|---|
| 373 | `rl-series-phase-angle-01` | 57,51836 | ° | Angle de l'impédance R-L en série |
| 374 | `pump-affinity-head-01` | 25,31250 | m | Hauteur manométrique en similitude quadratique |
| 375 | `metrology-expanded-uncertainty-01` | 0,20000 | mm | Incertitude élargie k=2 de deux composantes indépendantes |
| 376 | `cylindrical-insulation-heat-flow-01` | 21,94303 | W | Flux radial stationnaire dans un isolant cylindrique |
| 377 | `spur-gear-radial-load-01` | 727,94047 | N | Effort radial de séparation d'un engrenage droit |

Chaque mission possède contexte métier, objectif, prérequis, trois questions flash, repères/hypothèses, domaine, loi, calcul pur et corrigé conditionnel avec unités, SVG 2D paramétrique, graphique, trois essais, trois aides, sauvegarde et décision fictive. La géométrie est bidimensionnelle et le modèle est statique ; aucune scène 3D ni animation temporelle n'est revendiquée. Les cinq sous-savoirs sont distincts entre ces missions et déjà présents au catalogue. L'inventaire atteint 377 identifiants uniques, 17 univers et 249 sous-savoirs explicitement distincts ; il ne vaut pas réception complète.

## Audit historique ciblé 40–75
Les 36 identifiants correspondent aux positions 40–75 du catalogue historique (de `circular-02` à `measurement-uncertainty-01`). Tests exécutés dans JavaScript V8 avec le moteur et le générateur SVG de base du dépôt : **108/108** résultats finis (3 paramètres par mission), **108/108** SVG structurels et **72/72** rejets de NaN/Infinity. Ce n'est pas une contre-expertise indépendante exhaustive des 36 modèles.

Avant correction, **19** missions de ce groupe n'avaient pas trois questions flash natives dans leur HTML. Deux écarts **P2 pédagogiques** corrigés et testés :
- `brake-torque-01` : objectifs, prérequis, questions flash, repère positif, couple de freinage algébrique négatif et module positif.
- `incline-force-01` : objectifs, prérequis, questions flash, repère tangent descendant / normal extérieur, projection du poids et distinction avec effort de retenue.

**17** missions historiques restent à compléter sur le critère HTML des questions flash ; le contrôleur peut en injecter, mais la réception individuelle sur navigateur n'est pas réalisée.

## Écarts et contre-audit
- **P1 test/graphique — corrigé :** `pump-affinity-head-01` au minimum de 800 tr/min : arrondi du marqueur SVG `data-geom-px` à 6 décimales, trop grossier pour la tolérance du test. Précision portée à 9 décimales, puis contre-test PASS.
- **P2 pédagogique — 2 corrigés :** `brake-torque-01` et `incline-force-01`.
- **P2 pédagogique — 17 ouverts :** questions flash non natives des autres pages historiques ; l'injection mutualisée n'est pas une preuve de recette individuelle.
- **CI — BLOCKED :** aucun identifiant de workflow associé au SHA consulté n'est accessible via le connecteur utilisé ; statut combiné vide et recherche de runs vide (cette dernière ne couvre que les déclenchements pull request). Impossible de consulter des jobs, journaux ou relancer une exécution sans identifiant. **Aucun test Node natif n'est revendiqué.**

## Tests et preuves S/G/P/F/A
| Contrôle | Résultat |
|---|---|
| Contre-calculs indépendants des cinq modèles, nominal/min/max | **15/15 PASS** (V8) |
| SVG synchronisés, données de géométrie | **15/15 PASS** (V8 après correction) |
| Paramètres invalides (hors bornes, NaN, Infinity) | **20/20 PASS** (V8) |
| SVG avec valeur volontairement désynchronisée | **5/5 rejetés PASS** (V8) |
| Invariants physiques des cinq modèles | **15/15 PASS** (V8) |
| Deux suites CJS réelles exécutées avec adaptateurs V8 | **11/11 PASS**, dont cinq parcours DOM simulés |
| Contrôles historiques 40–75 | **108/108 calculs, 108/108 SVG, 72/72 invalides PASS** (V8 ciblé) |
| Catalogue et liens des cinq nouvelles missions | **377/377 IDs uniques, 17/17 univers, 249 sous-savoirs** ; liens présents |
| GitHub Actions / Node natif | **BLOCKED — preuve indisponible** |
| Inspection visuelle sur navigateur réel | **NOT RUN** |
| Android, iPhone, Windows, Mac matériels | **NOT RUN** |
| NVDA, TalkBack, VoiceOver | **NOT RUN** |

**S : PASS ciblé**, pas de validation scientifique exhaustive. **G : PASS structurel**, visuel **NOT RUN**. **P : PASS ciblé**, cinq parcours DOM simulés ; réception de classe **NOT RUN**. **F : PASS V8 ciblé**, CI **BLOCKED**. **A : contrôles sémantiques partiels**, tests lecteurs d'écran **NOT RUN**. Les exigences non démontrées restent ouvertes.

## Suite
Priorité : obtenir l'accès aux runs et journaux Actions, exécuter les tests Node natifs, compléter les 17 pages historiques, inspecter réellement les schémas et l'ergonomie sur navigateurs/appareils, réaliser la recette NVDA/TalkBack/VoiceOver. **Réception complète : NON VALIDÉE.**
