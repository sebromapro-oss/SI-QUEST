# SI QUEST V2.3 — Cycle 508–512 — 29 octobre 2026

## Phase 0 — état initial
- Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`, HEAD initial `9ad715b62857f1203347ed20127bf13182113d1f`.
- Référentiels lus : `CAHIER_DES_CHARGES_MAITRE.md` V2.3, `EXIGENCES.md`, `PRODUCTION.md`, modèles, catalogue, tests et workflow scientifique.
- Accueil protégé : aucun changement à `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg`. Le catalogue est la seule dépendance d'accueil modifiée ; aucune refonte.
- CI historique : exécutions GitHub Actions en échec avant affectation d'un runner, zéro étape exécutée ; les journaux sont indisponibles. La cause infrastructurelle exacte n'est pas établie.

## Chantier A — historique 40–75
- Audit V8 des moteurs réels : 36 missions, 108 états nominal/bornes, 108 SVG avec titres et descriptions, 108 tests de désynchronisation rejetée ; 36 pages avec trois questions flash : PASS ciblé.
- Corrections P2 : sous-savoirs explicités dans les pages et le catalogue pour `electrical-parallel-01`, `inductor-energy-01`, `mechanical-efficiency-02`, `rolling-torque-01`, `thermal-resistance-01`.
- Ces vérifications ne valent ni contre-calcul contradictoire complet de chaque ancien modèle, ni recette navigateur.

## Chantier B — cinq missions scientifiques indépendantes
- **508** `bearing-outer-race-bpfo-01` (SI-15) : Roulement — Fréquence de défaut de bague extérieure ; nominal 64 Hz ; Fréquence théorique BPFO d'un roulement à billes.
- **509** `hydraulic-oil-elastic-energy-01` (SI-06) : Huile comprimée — Énergie élastique stockée ; nominal 66,66667 J ; Énergie volumique stockée par compressibilité linéaire d'un liquide.
- **510** `copper-electroplating-thickness-01` (SI-14) : Cuivrage — Épaisseur déposée par électrolyse ; nominal 14,88488 µm ; Épaisseur de dépôt électrolytique par la loi de Faraday.
- **511** `clutch-synchronization-heat-01` (SI-05) : Embrayage — Énergie dissipée à la synchronisation ; nominal 432 J ; Perte d'énergie cinétique lors du couplage de deux inerties en rotation.
- **512** `rectangular-channel-critical-depth-01` (SI-06) : Canal rectangulaire — Hauteur critique ; nominal 0,2605971 m ; Profondeur critique d'un écoulement à surface libre en canal rectangulaire.

Chaque page comporte situation professionnelle, objectifs, prérequis, trois flash, hypothèses et domaine, calcul SI, tolérance, trois essais et trois aides mutualisés, corrigé conditionnel, décision fictive, sauvegarde locale, SVG 2D paramétrique et graphe synchronisé. Les cinq pages ne chargent que quatre scripts externes. Les modèles sont distincts ; aucune 3D ou animation temporelle n'est revendiquée.

## Contrôles réalisés et limites
- Références mathématiques indépendantes : 15/15 états PASS ; 15/15 SVG et 15/15 désynchronisations rejetées PASS ; 20/20 cas invalides PASS ; cinq curseurs nominaux alignés PASS.
- Unicité du catalogue et liens : test ciblé V8 PASS avant publication ; tests Node natifs : NOT RUN dans cet environnement.
- S : PASS ciblé ; G : PASS structurel, inspection visuelle NOT RUN ; P : PASS structurel, parcours navigateur NOT RUN ; F : PASS ciblé, CI BLOCKED ; A : NOT RUN (NVDA, TalkBack, VoiceOver et appareils réels).
- Aucun test matériel ni navigateur réel revendiqué ; réception complète non prononcée.
- Taxonomie 249 sous-savoirs, mesure de performance mobile et résolution CI : ouverts.
