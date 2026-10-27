# SI QUEST V2.3 — Audit et production 258–262 — 27 octobre 2026

## Dépôt et protection
Dépôt privé `sebromapro-oss/SI-QUEST` ; HEAD distant initial `ff32b304e3b9a14b4e4a717c93533d05af6b49f0`. Cahier V2.3, EXIGENCES, PRODUCTION, modèles, catalogue, tests et workflows consultés. Aucune modification de `index.html`, `src/home.js`, `src/style.css` ni `assets/archipelago-cinematic.svg` ; pas de ZIP, de Pages ou de force push.

## Chantier A — 40–75
36 missions historiques contrôlées sur trois états (108/108 PASS en JavaScript V8, avant commit). Contrats numériques nominaux, bornes, finitude, titre/description SVG. **P2 graphique et pédagogique corrigée** dans `frequency-01` : l'orientation du rotor dépendait de t=0,07 s sans le préciser. Le temps est désormais indiqué et `data-angle-rad` synchronisé. Contre-test n=0, 60, 120 tr/min ajouté.

## Chantier B — cinq sous-savoirs
- 258 `screw-jack-self-locking-01` : Condition d'autoblocage d'une vis carrée par comparaison des angles de frottement et d'hélice. Nominal : 5,30993247 °.
- 259 `sensor-hysteresis-fullscale-01` : Écart maximal montée-descente rapporté à l'étendue d'un signal 4–20 mA. Nominal : 1,5 %.
- 260 `gear-backlash-pitch-01` : Conversion d'un jeu angulaire en longueur d'arc tangentielle au cercle primitif. Nominal : 0,837758041 mm.
- 261 `hydraulic-filter-captured-mass-01` : Bilan massique de contamination captée à concentration et efficacité constantes. Nominal : 22,8 g.
- 262 `transformer-load-voltage-01` : Tension secondaire dans un modèle équivalent de Thévenin purement résistif. Nominal : 226,4 V.

Chaque mission a un contexte métier, objectif, prérequis, trois questions flash, hypothèses, domaine, modèle pur, calcul SI, six étapes de corrigé, décision fictive, SVG 2D paramétrique, graphe exploitable et contrôleur mutualisé pour trois essais, trois aides, sauvegarde. Pas de 3D ni de simulation temporelle artificielle.

## Preuves
- S : **PASS ciblé** ; 102 assertions préparatoires V8, 25 états comparés à des calculs indépendants, 20 invalides rejetés et propriétés physiques. 
- G : **PASS structurel ciblé** ; 25 SVG et refus des schémas désynchronisés ; **inspection navigateur NOT RUN**.
- P : **PASS structurel** ; 15 questions flash, cinq corrigés et décisions fictives ; **essai élève NOT RUN**.
- F : **PASS structurel** ; catalogue extensible et contrôleur mutualisé ; tests DOM ajoutés, exécution native CI à vérifier.
- A : **NOT RUN** ; aucun test réel NVDA, TalkBack, VoiceOver, Android, iPhone ou zoom.
- CI native : **BLOCKED** historiquement avant attribution du runner ; recontrôle nécessaire sur le commit publié.

Les contrôles structurels ne prouvent pas la conformité graphique, pédagogique ou d'accessibilité sur appareil réel. Les 262 missions sont intégrées, non intégralement réceptionnées.

## Contre-audit de la décision vis–écrou
Le plafond initial de marge angulaire (10°) n'était pas justifié par la seule condition d'autoblocage. Il a été retiré du critère : `m≥0°` ; le moteur conserve une borne numérique haute de 20° couvrant son domaine d'entrée, mais ne prétend pas qu'une marge supérieure à 10° supprime l'autoblocage. Tests supplémentaires aux deux bornes. Ce correctif ne dispense pas d'une analyse des pertes et de la sécurité de levage.
