# SI QUEST V2.3 — Cycle 503–507 — 29 octobre 2026

## Phase 0
HEAD initial distant : `8b96017625c532accae72dfd5775ec92fea5d7f0`. Dépôt privé et branche main. Cahier V2.3, EXIGENCES.md, PRODUCTION.md, modèles, catalogue, tests, workflows et dépendances de l'accueil consultés. L'accueil utilise src/catalog.js : seules cinq métadonnées historiques et cinq nouvelles entrées y sont modifiées ; aucun HTML/CSS/JS/SVG de l'accueil ni de la carte n'est remplacé.

## Chantier A — audit et corrections
Priorité historique 40–75 : revue ciblée des cinq entrées encore sans sous-savoir : screw-lead-01, hydro-cylinder-speed-02, hydro-annular-force-01, pneumatic-consumption-01, electrical-series-01. Sous-savoir explicite ajouté à leur page et au catalogue (P2 traçabilité). Correction P1 de la désignation erronée « Vitesse d'avance hydraulique » en « Vitesse de rentrée » dans le catalogue, sans changer la loi scientifique. Test de non-régression ajouté.
La suite historique existante couvre 36 missions, 108 états et les SVG ; son exécution Node native sur ce cycle reste conditionnée par la CI. Aucun résultat de test historique non exécuté n'est revendiqué.

## Chantier B — 5 missions scientifiques distinctes
- 503 capillary-meniscus-pressure-01 : pression de Laplace d'un ménisque mouillant, nominal 240 Pa.
- 504 magnetic-core-reluctance-01 : réluctance d'un noyau linéaire, nominal 442,0971 kA/Wb.
- 505 ntc-beta-resistance-01 : résistance NTC selon β, nominal 5,301467 kΩ.
- 506 pv-module-fill-factor-01 : facteur de forme photovoltaïque, nominal 79,36508 %.
- 507 battery-peukert-runtime-01 : durée de décharge selon Peukert, nominal 9,012505 h.

Modèles purs, domaines, unités, hypothèses, contre-calculs indépendants, cinq corrections en cinq étapes, trois flash, critères fictifs, SVG 2D paramétriques et courbes calculées. Les pages nouvelles ne chargent que quatre scripts externes (moteurs de base, lot, contrôleur) au lieu de la chaîne cumulative ; les composants d'accueil sont inchangés. Le contrôleur commun fournit trois essais, trois aides, corrigé conditionnel, carnet et sauvegarde. Pas d'animation temporelle physique ni de 3D revendiquée.

## Tests et réception
Contrôles JavaScript V8 de génération : 15/15 calculs indépendants PASS, 15/15 SVG PASS, 15/15 désynchronisations rejetées PASS, 20/20 paramètres invalides rejetés PASS ; 5 curseurs nominaux alignés PASS. Test Node natif et test DOM navigateur : NOT RUN à l'instant de génération. CI GitHub Actions : à consulter après publication. Tests Android/iOS, NVDA/TalkBack/VoiceOver, audit visuel et zoom : NOT RUN.

Statuts : S PASS ciblé ; G PASS structurel / visuel NOT RUN ; P PASS structurel / parcours réel NOT RUN ; F PASS ciblé / CI en attente ; A NOT RUN. Aucune réception complète n'est déclarée. La taxonomie canonique 249 sous-savoirs reste à réconcilier ; ne pas assimiler libellés distincts et sous-savoirs canoniques. 
