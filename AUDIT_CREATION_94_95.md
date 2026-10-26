# SI QUEST — Audit et création des missions 94–95

Date : 26 octobre 2026 ; dépôt privé, branche `main` ; parent du lot : `46fa5be93fa89da10698eef8c491fd56ffa5036a`.

## A — Audit et corrections
**Défaut P/F du moteur commun, affectant aussi les missions 40–75 :** après trois réponses erronées valides, le corrigé exigeait encore trois clics « Indice ». La version 2.2 du cahier des charges interdit cette obligation. Correction : les trois aides deviennent automatiquement visibles au troisième échec ; le corrigé se déverrouille sans action supplémentaire. Les aides consultées précédemment restent cumulées et visibles après rechargement. Une réponse correcte conserve l'accès immédiat à l'investigation et les étoiles. Tests de contrat mis à jour. L'assertion de catalogue du lot 92–93 est désormais extensible ; un test du lot 94–95 exige exactement 95 entrées uniques.

## B — Missions créées
**94 — Poussée hydrostatique sur une porte verticale (SI-06).** Question scientifique indépendante : intégration de la pression linéaire sur la surface immergée. h = 1,50 m ; F = 13,2435 kN ; centre de poussée à 1,00 m sous la surface libre. Graphique F(h) quadratique et schéma 2D de la répartition triangulaire, critère fictif 15 kN.

**95 — Adhérence courroie–poulie (SI-11).** Question indépendante : tension maximale du brin tendu à l'imminence du glissement. μ = 0,40 ; θ = π rad ; T_mou = 200 N ; T_tendu,lim = 702,72 N. Graphique exponentiel, contact demi-poulie et tensions tangentielles 2D ; critère fictif 600 N. La limite d'adhérence n'est pas présentée comme une tension réelle.

## Preuves et réserves
**S :** contre-calculs indépendants programmés : intégration numérique de p(z), inversion logarithmique de la loi du cabestan, bornes et paramètres invalides.
**G :** diagrammes 2D paramétriques, unités et positions contrôlables par code ; réception visuelle sur navigateur non effectuée.
**P :** prérequis, réactivation, calcul, trois essais, aides automatiques après échec, corrigé conditionnel, décision métier.
**F :** tests automatisés à exécuter sur GitHub Actions après le commit ; aucune réussite CI présumée.
**A :** titres, descriptions SVG et annonces textuelles présents ; tests NVDA, TalkBack, VoiceOver, zoom et appareils réels non réalisés.

**Statut :** codé et vérifié syntaxiquement ; validation complète suspendue à la CI, aux essais visuels, matériels, d'accessibilité et à la réception pédagogique. Pas de refonte accueil/carte, pas de publication GitHub Pages, pas de ZIP, aucune branche supprimée.
