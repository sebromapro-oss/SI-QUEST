# SI QUEST — Audit scientifique indépendant ciblé, missions 568 à 592

**Date : 30 octobre 2026.** **Phase 1 : 597 missions existantes ; aucune nouvelle mission créée.**
**Base initiale :** `a3fe0cda883859bf5323ed725dd8d8b932459d25`.
**Périmètre :** 25 modèles, 75 références numériques indépendamment recalculées (minimum, état nominal, maximum) à partir des hypothèses et équations explicites des cinq fichiers `src/batch568-572.js` à `src/batch588-592.js`.

## Références numériques indépendantes

Les résultats sont arrondis **pour la présentation uniquement**. La comparaison des 25 états nominaux aux valeurs `expected` a été effectuée avec les valeurs non arrondies : **25 concordances sur 25**, critère `|écart| < 10⁻⁹ × max(1, |référence|)`. Les bornes sont recalculées séparément ; les tests Node existants comparent les trois états au moteur et contrôlent le domaine ainsi que les SVG.

| Mission | Minimum → résultat | Nominal → résultat | Maximum → résultat | Unité |
|---|---:|---:|---:|---|
| bearing-dn-si-index-01 | 20 → 0,600 | 40 → 1,200 | 60 → 1,800 | m/s (d·n, sans π) |
| gray-code-4bit-decode-01 | 0 → 0 | 6 → 4 | 15 → 10 | comptes |
| two-layer-wall-heat-rate-01 | 20 → 92,3077 | 60 → 36,3636 | 100 → 22,6415 | W |
| simply-supported-shaft-first-bending-speed-01 | 0,6 → 6 770,386 | 0,8 → 3 808,342 | 1,2 → 1 692,597 | tr/min |
| harmonic-vibration-velocity-rms-01 | 15 → 31,8310 | 30 → 15,9155 | 75 → 6,3662 | mm/s |
| loop-4-20ma-burden-limit-01 | 18 → 300 | 24 → 600 | 30 → 900 | Ω |
| pt100-two-wire-lead-bias-01 | 0,2 → 1,03896 | 0,6 → 3,11688 | 1,2 → 6,23377 | K |
| bearing-inner-race-bpfi-01 | 600 → 48 | 1 200 → 96 | 1 800 → 144 | Hz |
| vickers-indent-pressure-01 | 0,35 → 2 970,016 | 0,50 → 1 455,308 | 0,65 → 861,129 | MPa |
| insulation-polarization-index-01 | 300 → 1,500 | 500 → 2,500 | 900 → 4,500 | sans unité |
| optical-rayleigh-circular-aperture-01 | 1 → 0,6710 | 2 → 0,3355 | 5 → 0,1342 | mrad |
| helical-gear-transverse-module-01 | 0 → 3,000 | 20 → 3,19253 | 35 → 3,66232 | mm |
| spherical-pressure-vessel-membrane-stress-01 | 10 → 25 | 30 → 75 | 50 → 125 | MPa |
| cylindrical-wall-radial-thermal-resistance-01 | 30 → 0,00860424 | 40 → 0,01470904 | 60 → 0,02331328 | K/W |
| transformer-sinusoidal-peak-induction-01 | 200 → 1,03604 | 300 → 0,690691 | 500 → 0,414414 | T |
| milling-cutting-speed-01 | 1 000 → 1,04720 | 2 400 → 2,51327 | 4 000 → 4,18879 | m/s |
| milling-feed-per-tooth-01 | 300 → 0,0500 | 600 → 0,1000 | 1 200 → 0,2000 | mm/dent |
| four-part-pulley-ideal-tension-01 | 200 → 490,5 | 400 → 981,0 | 800 → 1 962,0 | N |
| coaxial-capacitive-level-delta-01 | 0,1 → 9,10724 | 0,3 → 27,32171 | 0,5 → 45,53618 | pF |
| radiative-net-heat-flow-01 | 50 → 79,8302 | 100 → 272,2433 | 150 → 559,6857 | W |
| soderberg-fatigue-safety-01 | 0 → 2,22222 | 70 → 1,53846 | 120 → 1,26126 | sans unité |
| strain-half-bridge-output-01 | 100 → 0,5250 | 500 → 2,6250 | 1 000 → 5,2500 | mV |
| thermal-contact-interface-resistance-01 | 200 → 0,2000 | 1 000 → 0,0400 | 2 000 → 0,0200 | K/W |
| rc-lowpass-phase-lag-01 | 20 → 7,16246 | 100 → 32,14191 | 1 000 → 80,95694 | ° (module du retard) |
| copper-skin-depth-frequency-01 | 1 000 → 2,08730 | 10 000 → 0,660061 | 20 000 → 0,466734 | mm |

## Contrôles de physique et limites

- **Dimensionnement et unités :** conversion tr/min → s⁻¹ ; mm → m ; mA → A ; bar → Pa ; nm → m ; µm/m → déformation relative ; °C → K pour le rayonnement. Les unités affichées ci-dessus correspondent aux modèles décrits.
- **Invariants :** `n_critique ∝ 1/L²` ; `Φ_bicouche` décroît lorsque l'isolant s'épaissit ; `R_contact ∝ 1/h_c` ; `δ_peau ∝ 1/√f` ; `θ_Rayleigh ∝ 1/D` ; `ΔC_coaxiale ∝ L` ; `B̂ ∝ 1/N` ; `4T=mg` pour un palan idéal à quatre brins.
- **Cas non monotone :** le décodage Gray sur quatre bits n'est pas une fonction monotone du mot Gray interprété en entier ; le modèle utilise un domaine discret de 16 valeurs.
- **Précautions métier :** vitesse critique d'arbre sans masse ajoutée, Vickers sans protocole normatif complet, Soderberg sans spectre réel, BPFI sans glissement, Rayleigh sans aberrations, rayonnement sans convection, palan sans frottements, et réservoir sous pression **hors dimensionnement réglementaire**. Aucun critère fictif n'autorise une intervention réelle.
- **Précision :** la cohérence des 25 valeurs nominales ne vaut pas validation universelle des tolérances de saisie ni des chiffres significatifs ; ces points restent à auditer par mission.

## Correction graphique ciblée : palan quatre brins

**Anomalie constatée :** la scène de `four-part-pulley-ideal-tension-01` représentait quatre segments verticaux isolés, sans poulies ni cheminement du câble, tout en annonçant un palan. L'image ne permettait pas de vérifier le mouflage réel.

**Correction :** `src/batch583-587.js` dessine désormais un câble continu avec ancrage fixe, **deux poulies fixes et deux poulies mobiles**, quatre brins porteurs, effort au brin libre, poids et égalité `4T=mg`. Les arcs du câble suivent les poulies, sans cheminement fictif. La scène reste un modèle idéal et non une procédure de levage. Commit `266dc2681309c6c80ce3572238661c8f888859f1`.

**Contre-essai :** `tests/batch583-587.test.cjs` vérifie la continuité du tracé SVG, les quatre poulies, les quatre efforts porteurs et `4T=mg` aux trois masses du domaine. Commit `5b9bb1ef32d35dbc26bcdc78ff25686eeddc65fb`. Sur ce SHA, les trois workflows sont **verts** et la recette Node exécute **1 823 tests réussis, 0 échec** : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053706020), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053706231), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41053705995).

## Écarts et preuves encore manquantes

- **G — graphique :** contrôle de structure SVG du palan réalisé ; aucune inspection visuelle indépendante sur navigateur et sur appareil physique pendant ce cycle. Les 24 autres scènes ne sont pas déclarées graphiquement reçues.
- **S — scientifique :** 25 calculs nominaux concordants et 75 références recalculées ; pas de validation constructeur, métrologique ou expérimentale.
- **P/F — pédagogie et fonctionnement :** CI et tests DOM simulés disponibles ; pas de parcours manuel complet des 25 missions dans ce cycle.
- **A — accessibilité :** NVDA, TalkBack, VoiceOver et tests matériels non exécutés ; conformité WCAG/RGAA non acquise.
- **Sécurité :** dépôt public ; aucune preuve d'audit exhaustif des contenus et de l'historique pour les données privées.
- **Phase 2 :** toujours suspendue. Aucune mission 598+ créée.

**Prochaine action :** inspection graphique réelle des schémas, revue de précision/tolérances et du comportement des aides, puis audit scientifique d'un nouveau lot sans confondre CI verte et réception complète.
