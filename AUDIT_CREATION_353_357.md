# SI QUEST V2.3 — Cycle 353–357
Date : 28 octobre 2026. Dépôt privé, main.
HEAD initial vérifié : 437db15be8511bbd26c0a453126b7835879057d5. Accueil protégé : index.html, src/home.js, src/style.css, assets/archipelago-cinematic.svg inchangés. Branche d'archive conservée.
## Production
- 353 : hydraulic-pump-shaft-torque-01 — Pompe hydraulique — Couple théorique à l'arbre ; nominal 70.7355303 N·m ; sous-savoir déjà présent : Puissance absorbée et rendement de pompe.
- 354 : hollow-shaft-elastic-twist-01 — Arbre creux — Rotation élastique entre deux sections ; nominal 0.202018852 ° ; sous-savoir déjà présent : Calcul de Jp pour une section annulaire.
- 355 : hydraulic-filter-bypass-capture-01 — Filtration — Efficacité globale avec dérivation ; nominal 91.0800000 % ; sous-savoir déjà présent : Efficacité de capture particulaire issue d'un rapport bêta de filtration.
- 356 : threephase-compensated-line-current-01 — Tableau triphasé — Courant après compensation réactive ; nominal 7.35980072 A ; sous-savoir déjà présent : Triangle des puissances en triphasé.
- 357 : acoustic-energy-reflectance-01 — Acoustique — Fraction d'énergie réfléchie à une interface ; nominal 11.1111111 % ; sous-savoir déjà présent : Coefficient de réflexion de pression à incidence normale entre deux milieux.
Cinq questions indépendantes : couple d'entraînement, rotation élastique, bilan de capture avec dérivation, courant après compensation, bilan énergétique de réflexion. Aucun mouvement temporel ou 3D fictif.
## Audit historique
P2 pédagogique : kinetic-friction-01 sans questions flash natives ; ajout de trois flash, objectif, prérequis, PFS vertical et critères.
P2 scientifique/pédagogique : rolling-torque-01 avec hypothèses génériques ; explicitation de l'effort équivalent à l'axe, sens du couple, distinction avec la réaction normale, unités et seuil fictif.
## Preuves avant publication
- 71 assertions V8 ciblées : 15 cas min/nominal/max avec contre-calculs alternatifs, 15 SVG synchronisés, 20 invalides rejetés, 5 SVG désynchronisés rejetés, vecteur nul de réflexion contrôlé : PASS.
- Catalogue évalué en V8 : 357 missions, 357 identifiants uniques, 17 univers, 249 sous-savoirs explicites distincts.
- Tests Node natifs : NOT RUN avant publication ; fichiers CJS créés pour la CI.
- CI antérieure : BLOCKED, jobs sans étapes et journaux 404 BlobNotFound. Tests navigateurs, NVDA, TalkBack, VoiceOver : NOT RUN.
## S/G/P/F/A
S PASS ciblé (modèles et contre-calculs), G PASS structurel/visuel NOT RUN, P PASS structurel/usage NOT RUN, F PASS ciblé/CI BLOCKED, A contrôles HTML partiels/tests manuels NOT RUN.
**Réception complète : NON VALIDÉE.** Aucun résultat d'Actions ou d'appareil réel n'est inventé.

## Contre-audit du banc de tests
Correction avant clôture de deux assertions du nouveau test CJS : expression régulière de l'import (un seul échappement) et conservation du triangle des puissances en unités VA². Ajout du banc DOM simulé 353–357, à exécuter et à distinguer d'une recette navigateur. Aucun changement de l'accueil ni des modèles physiques.
