# SI QUEST V2.5 — Audit scientifique 268–292

**30 octobre 2026.** HEAD initial : `c4282bfbabcb66262f241b3776294f53509c42f5`. **25 missions existantes, zéro création.**

## Contre-audit

Les 25 relations ont été recalculées indépendamment des fonctions de production aux états **minimum, milieu de domaine et maximum** : **75/75 concordances V8** (écart pondéré inférieur à 2×10⁻⁷). Les 25 valeurs nominales HTML sont contrôlées dans le nouveau test Node, dont l'exécution CI reste à confirmer. Un contrôle numérique ne démontre pas la validité physique hors hypothèses.

| N° | Mission | Valeur au milieu du domaine | Unité |
|---:|---|---:|---|
| 268 | `thinwall-bredt-shear-01` | 10 | MPa |
| 269 | `threephase-power-factor-pq-01` | 0.76822128 | sans unité |
| 270 | `battery-internal-joule-heat-01` | 281.25 | W |
| 271 | `sensor-two-point-sensitivity-01` | 30 | mV/bar |
| 272 | `cylinder-critical-insulation-radius-01` | 2.28571429 | mm |
| 273 | `differential-outer-wheel-speed-01` | 3.24 | m/s |
| 274 | `repeatability-sample-std-01` | 0.0130384048 | mm |
| 275 | `maintenance-mttr-four-jobs-01` | 48.75 | min |
| 276 | `ice-latent-fusion-energy-01` | 868.4 | kJ |
| 277 | `proportional-loop-static-error-01` | 0.869565217 | K |
| 278 | `welding-linear-energy-01` | 432 | J/mm |
| 279 | `dc-motor-back-emf-01` | 36 | V |
| 280 | `first-order-95-response-time-01` | 8.23826375 | s |
| 281 | `fourbar-grashof-margin-01` | 7.5 | mm |
| 282 | `copper-temperature-resistance-01` | 0.89432 | Ω |
| 283 | `radiation-net-power-01` | 413.139973 | W |
| 284 | `rc-series-phase-angle-01` | -8.61906391 | ° |
| 285 | `thinwall-cylinder-axial-stress-01` | 54.1666667 | MPa |
| 286 | `pneumatic-choked-flow-margin-01` | 0.0308213687 | sans unité |
| 287 | `elastic-strain-energy-density-01` | 36 | kJ/m³ |
| 288 | `slider-crank-position-01` | 172.916165 | mm |
| 289 | `gear-base-circle-diameter-01` | 110.865544 | mm |
| 290 | `acoustic-time-leq-01` | 80 | dB(A) |
| 291 | `pneumatic-choked-massflow-01` | 1.41639907 | g/s |
| 292 | `resistor-johnson-noise-01` | 2.89253054 | µV |

## Trois défauts de schéma corrigés

1. **269 — Triangle P/Q/S** : P était à 15 px/kW et Q à 7 px/kvar, pouvant dépasser la vue. Nouvelle échelle unique de 7 px par unité, entièrement visible aux bornes.
2. **270 — Batterie** : conducteur dessiné à travers la résistance interne, pouvant suggérer un court-circuit. Connexions arrêtées aux bornes.
3. **279 — Moteur CC** : trait continu à travers résistance d'induit et moteur. Conducteurs séparés, représentation série cohérente.

**28 tests Node ajoutés :** 25 lois indépendantes aux états min/nominal/max avec vérification des valeurs HTML, unités, trois aides, bornes et synchronisation SVG ; trois tests de géométrie électrique/puissance. **CI non encore vérifiée à la rédaction.**

**Limites :** aucun essai navigateur/mobile réel, NVDA/TalkBack/VoiceOver, RGAA complet, revue exhaustive de secrets/historique ou validation pédagogique. Dépôt public selon GitHub, malgré l'exigence de confidentialité. Accueil et 17 univers préservés. **Phase 1 maintenue. Prochain lot : 243–267.**
