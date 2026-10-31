# SI QUEST V2.5 — Recette navigateur 360–409

**Date :** 31 octobre 2026. **Branche :** `main`. **Phase 1 :** fiabilisation.

## Preuves initiales

- HEAD distant : `f2b1891b7b3d2367c578e735670714ee77d4e1a5`.
- Les trois workflows Node/science du HEAD initial ont réussi : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192170719), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192171062), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192170895).
- [Chromium 310–359](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41192037459) : **success** sur `38743695`. Couverture navigateur automatisée confirmée **359/597 (60,1 %)**.

## Nouveau lot de 50 missions

- Ajout de **six scénarios Playwright** : 25 missions × 2 groupes × 2 viewports (bureau 1440×900, Android **émulé** 390×844), et contrôle clavier sur cinq missions par viewport.
- Tests : trois essais et trois aides, exploration qualitative après erreur, corrigé verrouillé avant autorisation, SVG visible sans attribut `data-result`, absence de débordement horizontal et d'erreurs JavaScript.
- Sélection sans doublon : invariant **359 missions avant, 409 après**. Aucun modèle scientifique nouveau contre-calculé dans ce commit ; la réussite des interactions ne valide pas la justesse des équations ou des animations.
- **Statut : soumis à la CI, verdict Chromium du nouveau lot en attente.** Ne confirmer **409/597 (68,5 %)** qu'après réussite. Couverture confirmée avant la nouvelle recette : **359/597**.

## Inventaire nominatif

| N° | Identifiant | Univers |
| ---: | --- | --- |
| 360 | `radiative-net-heat-flow-01` | `SI-12` |
| 361 | `optical-rayleigh-circular-aperture-01` | `SI-13` |
| 362 | `helical-gear-transverse-module-01` | `SI-05` |
| 363 | `transformer-sinusoidal-peak-induction-01` | `SI-08` |
| 364 | `humid-air-vapor-mass-density-01` | `SI-12` |
| 365 | `optical-grating-first-order-angle-01` | `SI-13` |
| 366 | `bolt-joint-external-load-share-01` | `SI-04` |
| 367 | `thin-lens-inspection-magnification-01` | `SI-13` |
| 368 | `photodiode-shot-noise-rms-01` | `SI-08` |
| 369 | `gear-involute-base-pitch-01` | `SI-05` |
| 370 | `hall-copper-voltage-magnitude-01` | `SI-08` |
| 371 | `u-tube-differential-manometer-01` | `SI-06` |
| 372 | `absolute-encoder-angular-step-01` | `SI-13` |
| 373 | `trapezoid-plate-centroid-01` | `SI-03` |
| 374 | `pwm-ideal-average-voltage-01` | `SI-08` |
| 375 | `annular-rotor-polar-inertia-01` | `SI-02` |
| 376 | `type1-ramp-steady-error-01` | `SI-09` |
| 377 | `induction-rotor-current-frequency-01` | `SI-08` |
| 378 | `parallel-key-bearing-pressure-01` | `SI-05` |
| 379 | `gear-tangential-backlash-angle-01` | `SI-05` |
| 380 | `gyro-rotor-precession-torque-01` | `SI-02` |
| 381 | `triangular-gate-hydrostatic-force-01` | `SI-06` |
| 382 | `hollow-rectangular-section-inertia-01` | `SI-04` |
| 383 | `pid-derivative-sine-amplitude-01` | `SI-09` |
| 384 | `rotating-thin-ring-hoop-stress-01` | `SI-04` |
| 385 | `transformer-shortcircuit-current-01` | `SI-08` |
| 386 | `hydraulic-critical-reynolds-flow-01` | `SI-06` |
| 387 | `incline-towing-friction-01` | `SI-03` |
| 388 | `humid-air-dew-point-01` | `SI-12` |
| 389 | `porous-filter-darcy-flow-01` | `SI-06` |
| 390 | `battery-loaded-terminal-voltage-01` | `SI-08` |
| 391 | `bolt-elastic-preload-extension-01` | `SI-04` |
| 392 | `triangular-load-right-reaction-01` | `SI-03` |
| 393 | `electrochemical-iron-loss-faraday-01` | `SI-14` |
| 394 | `lumped-cooling-temperature-01` | `SI-12` |
| 395 | `braking-front-axle-load-01` | `SI-02` |
| 396 | `pneumatic-doubleacting-freeair-01` | `SI-07` |
| 397 | `series-capacitors-voltage-division-01` | `SI-08` |
| 398 | `relief-valve-spring-cracking-01` | `SI-06` |
| 399 | `buck-ideal-duty-ratio-01` | `SI-08` |
| 400 | `capacitor-ripple-esr-heating-01` | `SI-08` |
| 401 | `accumulator-polytropic-work-01` | `SI-06` |
| 402 | `parallel-pumps-operating-flow-01` | `SI-06` |
| 403 | `sensor-thermal-offset-01` | `SI-13` |
| 404 | `thermal-exergy-destruction-01` | `SI-12` |
| 405 | `series-availability-two-machines-01` | `SI-15` |
| 406 | `beam-couple-support-reaction-01` | `SI-03` |
| 407 | `wall-convection-conduction-heatflow-01` | `SI-12` |
| 408 | `cylinder-required-flow-01` | `SI-06` |
| 409 | `sling-allowable-angle-01` | `SI-03` |

## Réserves

**597 missions conservées, zéro mission créée.** Aucune modification du code de production, de l'accueil, de la carte des 17 univers, du marquage auteur, des assets ni des applications AppDeploy. Appareils physiques, Firefox, Safari, NVDA, TalkBack, VoiceOver, RGAA, fidélité vectorielle et audit historique de sécurité non vérifiés. Dépôt **public**, progression locale non authentifiée. Phase 2 suspendue.
