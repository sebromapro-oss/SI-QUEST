# SI QUEST V2.3 — Cycle 183–187

Date : 27 octobre 2026, Europe/Paris. SHA initial : `35819281be453b4a9f116ad09dd88385b4ae612c`.

## Phase 0
Dépôt privé, main. Cahier des charges V2.3, EXIGENCES, PRODUCTION, catalogue, moteurs, modèles, tests et workflows consultés. Fichiers protégés de l'accueil (index.html, src/home.js, src/style.css, assets/archipelago-cinematic.svg) non modifiés. Catalogue enrichi sans toucher à la carte ni à sa navigation.

## Chantier A — Audit 40–75
36 missions historiques contrôlées sur trois valeurs, unités, nominal et SVG : **180 vérifications ciblées PASS** sur le HEAD initial. Quatre anomalies : P1 test de parcours 178–182 utilisant des identifiants de missions au lieu des nœuds DOM ; P1 test de catalogue imposant exactement 182 ; P2 vecteurs de flux thermique à ΔT = 0 K ; P2 flèche de courant à I = 0 A. Corrections et non-régressions ajoutées. Aucun défaut numérique observé dans les contrôles ciblés ; réception exhaustive ouverte.

## Chantier B — Missions
183. `tank-gravity-drain-01` — Durée de vidange d'une cuve à section constante par loi de Torricelli. Nominal : 2087.06791 s.
184. `water-mixing-temperature-01` — Bilan enthalpique de mélange adiabatique de deux masses d'eau. Nominal : 50.7692308 °C.
185. `copper-cable-resistance-01` — Résistance d'un conducteur homogène par résistivité et section. Nominal : 0.140000000 Ω.
186. `pump-volumetric-efficiency-01` — Rendement volumétrique d'une pompe à cylindrée fixe par débit mesuré. Nominal : 85.3333333 %.
187. `belt-transverse-wave-speed-01` — Célérité d'une petite onde transversale sur un élément tendu souple. Nominal : 50.0000000 m/s.

Trois questions flash, hypothèses, domaine, unités, modèle pur, contre-calcul indépendant, schéma 2D paramétrique, graphe non temporel, trois essais/aides, corrigé conditionnel, décision fictive et sauvegarde. Pas de fausse 3D.

## Preuves
- S : **PASS ciblé** ; G : **PASS structurel**, visuel **NOT RUN** ; P : **PASS structurel**, essai élèves **NOT RUN** ; F : **PASS V8 ciblé**, Node natif **NOT RUN** ; A : **PASS structurel partiel**, NVDA/TalkBack/VoiceOver et matériel **NOT RUN**.
- Préflight V8 : **126 assertions PASS** incluant 5 références indépendantes, bornes, cas invalides, SVG et parcours simulés (essais, corrigé, sauvegarde).
- GitHub Actions du HEAD précédent : échec avant exécution de job ; CI du nouveau commit à contrôler séparément. Les tests Node natifs et tests navigateur ne sont pas déclarés exécutés.

Statut : **codées et contrôlées automatiquement de manière ciblée, non validées en recette complète**.
