# SI QUEST V2.3 — Lot 408–412 — 28 octobre 2026
## Départ et protection
HEAD de départ : `b493af01def725de487d95fe1a344d8046a56af3`. Cahier maître V2.3, EXIGENCES, PRODUCTION, modèles, catalogue, contrôleur, tests et workflows lus. Dépôt privé ; archive conservée. Fichiers protégés hors modifications : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` et leurs dépendances.
## Chantier A — anomalies reproduites
- P1 : tests `batch398-402.test.cjs` et `batch403-407.test.cjs` comparaient l'unicité des identifiants à un total historique fixe (402/407), incompatible avec tout ajout. Remplacement par la taille effective du catalogue, en conservant la vérification des seuils historiques.
- P2 : `measurement-relative-01` décrivait x=80,4 mm comme une mesure constante alors que l'investigation varie x ; le texte distingue maintenant nominal et variable.
- P2 : `thermal-resistance-01` évoquait un seuil fictif sans le chiffrer ; le critère pédagogique 0,40 K/W est désormais explicite.
- Les 36 missions historiques 40–75 restent à recetter visuellement et matériellement. Aucun succès visuel ni WCAG n'est inféré d'un test de code.
## Chantier B — cinq modèles indépendants
- 408 : `viscous-damper-cycle-energy-01` — Amortisseur visqueux — Énergie dissipée par cycle ; référence nominale 10.6591728 J ; sous-savoir : Coefficient d'amortissement critique d'un oscillateur masse-ressort linéaire.
- 409 : `series-availability-two-machines-01` — Ligne de production — Disponibilité de deux postes en série ; référence nominale 94.4138474 % ; sous-savoir : Disponibilité intrinsèque à partir des moyennes MTBF et MTTR.
- 410 : `threephase-motor-line-current-01` — Moteur triphasé — Courant absorbé ; référence nominale 15.0018259 A ; sous-savoir : Triangle des puissances en triphasé.
- 411 : `beam-couple-support-reaction-01` — Traverse bi-appuyée — Réaction sous couple appliqué ; référence nominale 600.000000 N ; sous-savoir : Équilibre statique et moments.
- 412 : `wall-convection-conduction-heatflow-01` — Paroi — Flux avec convection des deux côtés ; référence nominale 300.000000 W ; sous-savoir : Résistances thermiques de deux couches en série.
Modèles purs à domaine contrôlé, hypothèses, trois questions flash, trois aides et essais via contrôleur commun, corrigé conditionnel, décisions fictives, SVG 2D spécifiques et graphe synchronisé. Aucun moteur 3D ni animation temporelle non justifiée revendiqué.
## Porte de réception
Tests indépendants min/nominal/max, domaines invalides, invariants, SVG et DOM simulé fournis dans `tests/batch408-412*.test.cjs`. Le statut CI natif et les journaux doivent être vérifiés sur le SHA final ; ne jamais marquer PASS sans exécution observée.
S : contrôles numériques ciblés ; G : SVG structurel, visuel NOT RUN ; P : contenu et parcours DOM simulé ; F : CI à vérifier ; A : tests manuels NVDA/TalkBack/VoiceOver NOT RUN. Réception complète NON ACQUISE.

## Contre-audit graphique complémentaire
- P1 : les trois conducteurs du moteur triphasé s'arrêtaient avant les points de connexion géométriques au stator ; extrémités raccordées à la circonférence, trois bornes explicites, test de non-régression.
- P1 : réactions d'appui A et B représentées par segments sans pointe ; ajout de pointes orientées vers le haut et test de leurs coordonnées pour M = 200 N·m.
- Tests V8 syntaxe et géométrie ajoutés ; vérification CI native à effectuer sur SHA final.
