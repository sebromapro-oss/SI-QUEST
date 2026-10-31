# SI QUEST V2.5 — Audit navigateur et contre-calculs 410–459

**Date :** 31 octobre 2026. **Branche :** `main`. **Phase :** 1 — fiabilisation, sans nouvelles missions.

## État vérifié avant ce lot

- **HEAD initial :** `9f452ab267dcf63d844ca6d42b4061af5949c355`.
- [Recette Chromium précédente 360–409](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196093041) : **success**, sur `4f73ef44b57e97172f497cd4f0fa7306bf81a2ee`, achevée à 11:41 UTC le 31 octobre. Couverture navigateur **409/597 (68,5 %)** confirmée dans le périmètre de ces scénarios automatisés.
- Les trois workflows Node/science du HEAD initial ont également réussi : [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196306894), [contrôles](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196306914), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41196306950).

## Modifications du cycle

- [Commit navigateur `fbfe9dc5`](https://github.com/sebromapro-oss/SI-QUEST/commit/fbfe9dc540518c9999b4c842bb311af04bafb707) : **50 missions existantes supplémentaires**, sans doublons avec les 409 déjà couvertes, dans `tests/mission-browser.spec.cjs`.
- **Six scénarios Playwright ajoutés** : 25 missions par groupe, deux viewports (bureau 1440×900 et Android **émulé** 390×844), plus un contrôle clavier sur cinq missions par viewport.
- Assertions : réponse erronée, exploration qualitative après erreur, trois essais/trois aides, accès au corrigé uniquement après autorisation, SVG sans `data-result`, absence d'exception JS et de débordement horizontal.
- [Commit de contre-calculs `a135c38a`](https://github.com/sebromapro-oss/SI-QUEST/commit/a135c38accfc90d2f36d813f5198fac463b896f4) et [correctif d'assertion SVG `b98d9f1a`](https://github.com/sebromapro-oss/SI-QUEST/commit/b98d9f1ad6106ac43bb8dbb27a0325c753ac593b) : **8 modèles**, quatre points de calcul chacun, avec références analytiques indépendantes, cohérence unités et domaines, SVG structurel et invariants physiques.
- **Vérification syntaxique JavaScript : OK** sur les deux fichiers. **Recette Chromium 410–459 et résultats des tests scientifiques du nouveau code : en cours au moment de la rédaction**. Ne pas annoncer la réussite ni 459/597 avant le verdict.
- **Couverture confirmée : 409/597 ; couverture visée : 459/597 (76,9 %) sous réserve de réussite.** Missions sans recette confirmée : 188, puis 138 si succès.

## Inventaire nominatif du lot

| N° | Identifiant | Univers |
| ---: | --- | --- |
| 410 | `simply-supported-beam-stiffness-01` | `SI-04` |
| 411 | `dc-motor-start-resistor-01` | `SI-08` |
| 412 | `counterweight-limit-load-01` | `SI-03` |
| 413 | `pump-affinity-shaft-power-01` | `SI-10` |
| 414 | `sampling-nyquist-rate-01` | `SI-09` |
| 415 | `pump-affinity-head-01` | `SI-10` |
| 416 | `cylindrical-insulation-heat-flow-01` | `SI-12` |
| 417 | `adc-minimum-bits-01` | `SI-09` |
| 418 | `euler-pinned-column-load-01` | `SI-04` |
| 419 | `hydraulic-local-loss-coefficient-01` | `SI-06` |
| 420 | `metrology-welch-effective-dof-01` | `SI-13` |
| 421 | `hydraulic-pump-shaft-torque-01` | `SI-06` |
| 422 | `helical-gear-opposed-thrust-01` | `SI-05` |
| 423 | `hydraulic-laminar-critical-flow-01` | `SI-06` |
| 424 | `thermal-contact-heat-power-01` | `SI-12` |
| 425 | `process-capability-cp-01` | `SI-13` |
| 426 | `second-order-damping-from-overshoot-01` | `SI-09` |
| 427 | `cantilever-uniform-load-tip-deflection-01` | `SI-04` |
| 428 | `acoustic-normal-reflection-01` | `SI-07` |
| 429 | `ntc-beta-temperature-01` | `SI-13` |
| 430 | `cantilever-tip-slope-01` | `SI-04` |
| 431 | `rectangular-typeb-uncertainty-01` | `SI-13` |
| 432 | `semi-infinite-contact-temperature-01` | `SI-12` |
| 433 | `circular-shaft-bending-stress-01` | `SI-04` |
| 434 | `first-order-lowpass-gain-01` | `SI-09` |
| 435 | `weibull-component-reliability-01` | `SI-15` |
| 436 | `belt-effective-tension-01` | `SI-05` |
| 437 | `dc-parallel-current-divider-01` | `SI-08` |
| 438 | `exchanger-ntu-equal-capacity-01` | `SI-12` |
| 439 | `sabine-room-reverberation-01` | `SI-13` |
| 440 | `can-classic-frame-busload-01` | `SI-17` |
| 441 | `maintenance-mtbf-operating-hours-01` | `SI-15` |
| 442 | `rlc-series-quality-factor-01` | `SI-08` |
| 443 | `exchanger-ntu-zero-capacity-ratio-01` | `SI-12` |
| 444 | `slider-crank-position-01` | `SI-01` |
| 445 | `acoustic-time-leq-01` | `SI-13` |
| 446 | `resistor-johnson-noise-01` | `SI-08` |
| 447 | `radiation-net-power-01` | `SI-12` |
| 448 | `rc-series-phase-angle-01` | `SI-08` |
| 449 | `welding-linear-energy-01` | `SI-14` |
| 450 | `dc-motor-back-emf-01` | `SI-08` |
| 451 | `repeatability-sample-std-01` | `SI-13` |
| 452 | `maintenance-mttr-four-jobs-01` | `SI-15` |
| 453 | `proportional-loop-static-error-01` | `SI-09` |
| 454 | `thinwall-bredt-shear-01` | `SI-04` |
| 455 | `threephase-power-factor-pq-01` | `SI-08` |
| 456 | `cylinder-critical-insulation-radius-01` | `SI-12` |
| 457 | `metrology-worstcase-stack-01` | `SI-13` |
| 458 | `hydraulic-filter-captured-mass-01` | `SI-15` |
| 459 | `transformer-load-voltage-01` | `SI-08` |

## Périmètre et réserves

- Les huit lois contre-calculées : traverse bi-appuyée (raideur), puissance et hauteur de pompe (similitude), Nyquist avec marge, CAN (bits), Euler (flambement), indice Cp, FEM moteur CC. Les **42 autres modèles du lot ne sont pas validés individuellement** par ces huit références.
- Ces tests vérifient des comportements d'interface et des valeurs calculées, **pas** la fidélité temporelle/vectorielle de chaque animation, la validité de chaque schéma, ni les critères RGAA.
- **Appareils physiques, Firefox, Safari, NVDA, TalkBack, VoiceOver, audit RGAA et revue historique des secrets non réalisés.** Dépôt **public**, réponses attendues dans le HTML, progression locale non authentifiée.
- **597 missions conservées, 0 mission créée.** Aucun code de production, accueil, carte des 17 univers, marquage auteur, asset, application AppDeploy, backend ou budget externe modifié.
- **Phase 1 maintenue**. Prochaine étape : examiner les verdicts Node et Chromium, corriger les régressions, puis étendre la recette aux missions 460–509.
