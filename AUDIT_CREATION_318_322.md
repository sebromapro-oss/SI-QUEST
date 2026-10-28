# SI QUEST V2.3 — Cycle 318–322 — 28 octobre 2026

## Phase 0 — Référence et protection
Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`, SHA initial `6ec43f4007c409960bb1704de622ce8daceac83f`. Cahier des charges maître V2.3, EXIGENCES.md, PRODUCTION.md, modèles, catalogue, contrôleur et tests consultés. La nouvelle page d'accueil et la carte ne sont pas modifiées. Branche `archive/pre-reconstruction-cycle28-20261025` conservée. Aucun ZIP ni GitHub Pages.

## Chantier A — Audit et correction historique 40–75
36 missions historiques contrôlées sur trois paramètres (minimum, nominal, maximum) : **108/108 calculs finis et 108/108 SVG structurels PASS** en JavaScript V8, avec les moteurs réels. Couverture de la réactivation : **36/36 PASS** après correction.
Deux anomalies **P2 pédagogiques** reproduites : `inductor-energy-01` et `mechanical-efficiency-02` n'avaient pas trois questions flash dans leur HTML et n'étaient pas couvertes par `legacyFlash`. Ajout de trois questions distinctes pour chacune dans le contrôleur commun. Tests de couverture et de non-régression ajoutés. Les contrôles numériques et SVG ne constituent pas une validation scientifique indépendante exhaustive des 36 missions.

## Chantier B — Missions indépendantes
318 `pump-npsh-available-01` — NPSH disponible (SI-06).
319 `circular-shaft-bending-stress-01` — contrainte de flexion d'arbre circulaire (SI-04).
320 `mean-type-a-uncertainty-01` — incertitude type A de la moyenne, n entier (SI-13).
321 `induction-motor-slip-01` — glissement moteur asynchrone (SI-08).
322 `first-order-lowpass-gain-01` — gain harmonique d'un passe-bas du premier ordre (SI-09).
Chaque mission comprend un sous-savoir distinct, une situation métier, objectifs, prérequis, trois questions flash, hypothèses, conversions SI, modèle pur, domaine, tolérance, SVG 2D paramétrique, graphe calculé, trois essais/aides, corrigé conditionnel détaillé, décision fictive et sauvegarde via le contrôleur commun. Pas de 3D ni de mouvement temporel artificiel.

## Tests effectivement exécutés
- V8 sur moteurs scientifiques et graphiques réels : 15/15 jeux de référence (trois par mission) PASS.
- Domaines invalides : 20/20 rejets PASS, plus 1/1 rejet du n fractionnaire.
- SVG désynchronisés : 5/5 rejets PASS.
- Tests ciblés nouveaux modèles, propriétés physiques, catalogue, géométrie et parcours DOM simulés : **12/12 tests PASS** dans V8, dont 5 parcours DOM simulés (saisies invalides, trois essais, trois aides, corrigé, étoiles, sauvegarde).
- Catalogue simulé : **322/322 identifiants uniques**, 17/17 univers.
- Historique 40–75 : **108/108 numériques et 108/108 SVG PASS**, 36/36 réactivations couvertes.
- CI GitHub Actions : **BLOCKED** tant qu'aucune étape Node native ne s'exécute ; consulter les runs du commit final. Tests natifs Node : **NOT RUN** à ce stade.
- Recette visuelle navigateur et appareils : **NOT RUN** ; NVDA/TalkBack/VoiceOver : **NOT RUN**.

## Réception S/G/P/F/A
S : **PASS ciblé**, réception scientifique exhaustive non terminée.
G : **PASS structurel**, inspection visuelle **NOT RUN**.
P : **PASS structurel et DOM simulé**, observations en classe **NOT RUN**.
F : **PASS ciblé V8**, CI native **BLOCKED**.
A : structure sémantique vérifiée partiellement, lecteurs d'écran et matériel **NOT RUN**.
La réception globale reste ouverte. La publication privée d'un commit n'équivaut pas à une validation complète.
