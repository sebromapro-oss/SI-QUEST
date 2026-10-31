# SI QUEST V2.5 — Audit navigateur 210–259 et références scientifiques

**Date :** 31 octobre 2026. **Périmètre :** dépôt `sebromapro-oss/SI-QUEST`, branche `main`, phase 1.

## Point de départ vérifié

- HEAD initial distant : `29b209882937f81021b7417ce16ffb1df8afe95b`.
- 597 missions conservées ; 209 missions déjà couvertes par Chromium, 388 restantes avant ce lot.
- Trois workflows Node/science réussis au HEAD initial ; **2 216/2 216 tests Node** selon le dernier bilan.
- Dépôt **public** malgré la mention « privé » dans le cahier des charges.

## Commits publiés

1. [`f3f3f0be`](https://github.com/sebromapro-oss/SI-QUEST/commit/f3f3f0be96a236c98886e270dfdaea5a9d5d5f2b) : six scénarios Playwright supplémentaires sur 50 missions uniques, deux groupes de 25 sur bureau 1440×900 et Android émulé 390×844 ; parcours clavier de cinq missions par viewport.
2. [`4c3d7eda`](https://github.com/sebromapro-oss/SI-QUEST/commit/4c3d7edae7910ba8289a278da4b4b62630f06542) : sept tests Node nouveaux, six modèles scientifiques, **24 points de contre-calcul** (bornes, milieu et nominal), cohérence des unités et valeurs HTML, rejets de NaN/±Infinity.

**Statut à l'écriture :** couverture navigateur **visée** 259/597, **confirmée** 209/597 tant que le run Chromium n'est pas réussi. **Aucune nouvelle mission créée.** Ne pas assimiler ces tests à une réception physique ou scientifique exhaustive.

## Contrôles du lot

Pour chaque mission : saisie d'une réponse erronée, activation de l'exploration après erreur, verrouillage du corrigé, trois aides et trois essais, apparition du corrigé seulement après autorisation, SVG visible sans `data-result` prématuré, absence de débordement horizontal et d'exception JavaScript. Sur cinq missions : Tab, lien d'évitement, Entrée et confidentialité du corrigé.

**Six références scientifiques indépendantes :**

| Modèle | Relation de référence | Unité de sortie |
| --- | --- | --- |
| `parallel-spring-stiffness-01` | `k_eq = 40 + k_2` | N/mm |
| `transformer-turns-ratio-01` | `U_2 = 230 N_2 / 1000` | V |
| `material-thermal-diffusivity-01` | `alpha = lambda / (7800×500) × 10^6` | mm²/s |
| `euler-buckling-01` | `P_cr = pi² × 210×10^9 × (pi×0,02^4/64) / L² / 1000` | kN |
| `power-01` | `P = 120 × 2 pi n / (60×1000)` | kW |
| `hydraulic-throttle-temperature-rise-01` | `Delta T = (Delta p en bar × 10^5) / (850×2000)` | K |

Ces lois sont formulées dans le test sans appeler le moteur de production pour calculer la référence. Les modèles sont idéalisés ; ces contrôles ne prouvent ni les autres 44 équations du lot ni la justesse des animations.

## Missions du lot 210–259

| N° | Identifiant | Univers |
| ---: | --- | --- |
| 210 | `shaft-min-torsion-diameter-01` | SI-04 |
| 211 | `hydraulic-throttle-temperature-rise-01` | SI-06 |
| 212 | `process-capability-cpk-01` | SI-13 |
| 213 | `ultrasonic-doppler-shift-01` | SI-13 |
| 214 | `accel-01` | SI-01 |
| 215 | `rc-time-01` | SI-09 |
| 216 | `orifice-flow-01` | SI-06 |
| 217 | `coaxial-capacitive-level-delta-01` | SI-13 |
| 218 | `solid-shaft-torsion-energy-01` | SI-04 |
| 219 | `adc-quantization-max-error-01` | SI-09 |
| 220 | `battery-coulomb-soc-01` | SI-10 |
| 221 | `parallel-spring-stiffness-01` | SI-04 |
| 222 | `power-01` | SI-10 |
| 223 | `adiabatic-compressor-01` | SI-07 |
| 224 | `oring-groove-squeeze-01` | SI-14 |
| 225 | `cylindrical-wall-radial-thermal-resistance-01` | SI-12 |
| 226 | `radiation-two-gray-plates-01` | SI-12 |
| 227 | `parallel-reliability-01` | SI-15 |
| 228 | `induction-rotor-frequency-01` | SI-08 |
| 229 | `transformer-turns-ratio-01` | SI-08 |
| 230 | `strain-01` | SI-04 |
| 231 | `gear-ratio-02` | SI-05 |
| 232 | `npsh-available-01` | SI-06 |
| 233 | `rod-longitudinal-wave-speed-01` | SI-14 |
| 234 | `inglis-elliptical-hole-kt-01` | SI-04 |
| 235 | `hydraulic-orifice-ideal-flow-01` | SI-06 |
| 236 | `metrology-expanded-uncertainty-01` | SI-13 |
| 237 | `capacitor-stored-energy-01` | SI-08 |
| 238 | `buoyancy-immersed-volume-01` | SI-02 |
| 239 | `battery-discharge-c-rate-01` | SI-10 |
| 240 | `potential-01` | SI-02 |
| 241 | `stability-overturn-angle-01` | SI-03 |
| 242 | `piezoelectric-direct-charge-01` | SI-13 |
| 243 | `rotor-balance-correction-mass-01` | SI-11 |
| 244 | `acoustic-two-tone-beat-01` | SI-13 |
| 245 | `open-belt-wrap-angle-01` | SI-05 |
| 246 | `i-section-inertia-01` | SI-04 |
| 247 | `ultrasonic-time-of-flight-01` | SI-13 |
| 248 | `material-thermal-diffusivity-01` | SI-14 |
| 249 | `gear-mesh-frequency-01` | SI-05 |
| 250 | `pulley-01` | SI-05 |
| 251 | `strain-gauge-bridge-01` | SI-13 |
| 252 | `spherical-shell-thermal-resistance-01` | SI-12 |
| 253 | `pontoon-metacentric-height-01` | SI-03 |
| 254 | `regen-braking-soc-gain-01` | SI-10 |
| 255 | `pump-npsh-available-01` | SI-06 |
| 256 | `transformer-winding-copper-loss-01` | SI-08 |
| 257 | `pump-affinity-power-01` | SI-10 |
| 258 | `euler-buckling-01` | SI-04 |
| 259 | `spring-series-01` | SI-04 |

## Réserves et suite

- [Recette Chromium](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183678314) : **en cours** lors de cette rédaction ; ne pas déclarer 259/597 avant le verdict.
- [Recette Node](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183697305), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183697306), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183697316) : **en attente** lors de cette rédaction.
- Appareils Android/iPhone physiques, Firefox, Safari, NVDA, TalkBack, VoiceOver, fidélité des animations, revue indépendante des SVG et audit complet de sécurité **non réalisés**.
- Progression locale non authentifiée ; les réponses sont accessibles dans le HTML public : **ne pas utiliser comme preuve certifiée de compétence**.
- Aucun code AppDeploy, accueil, carte des 17 univers, asset, marquage d'auteur ou historique modifié.
- **Prochaine action :** examiner les runs, corriger les échecs, confirmer la couverture réellement prouvée, puis poursuivre la recette 260–309. **Phase 2 vers 996 suspendue.**
