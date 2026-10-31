# SI QUEST V2.5 — Recette navigateur 310–359 et 11 références SI

**Date :** 31 octobre 2026. **Branche :** `main`. **Phase 1 :** fiabilisation des 597 missions existantes.

## HEAD et état vérifié au début du cycle

- HEAD initial : `99df5597c366c2776a4804370c8c47a2dcb4c95d`.
- Trois workflows Node/science du HEAD initial : **success** (runs 41188000073, 41188000037, 41188000062).
- Recette Chromium 260–309 : **success** sur `81fd312829d95fd0c896d21b09a9ac01eb0735a2`, [run 41187987602](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187987602). Le [run 41187846793](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187846793) a également réussi.
- **Couverture navigateur confirmée avant ce lot : 309/597 (51,8 %).**

## Modifications réellement publiées

1. [`38743695`](https://github.com/sebromapro-oss/SI-QUEST/commit/387436950fad1f880201d6e7ad468a5826f915be) : six scénarios Playwright (deux groupes de 25 par viewport, plus cinq contrôles clavier sur chaque viewport) ; **50 missions distinctes supplémentaires** dans le catalogue existant. Deux configurations Chromium : bureau 1440×900 et Android **émulé** 390×844.
2. [`fd4b2fe8`](https://github.com/sebromapro-oss/SI-QUEST/commit/fd4b2fe8bc68f4b687d70609f8d7dc3fa6890371) : 11 modèles contre-calculés indépendamment à quatre points (min, milieu, nominal, max) : **44 comparaisons numériques**, unités SI, limites HTML, non-finis et inventaire. Test `tests/audit-browser-batch-310-359-eleven-models.test.cjs`.

**Verdict du nouveau lot :** couverture 310–359 **non confirmée** avant le succès de la recette Chromium déclenchée par le commit de tests. Ne pas assimiler 44 comparaisons sur 11 lois à la validation scientifique exhaustive des 50 missions.

## Protocole navigateur

Pour chaque mission : réponse incorrecte, exploration qualitative débloquée, trois aides effectivement consultées, trois essais, absence de corrigé prématuré, déverrouillage après 3+3, visibilité SVG, absence de `data-result` dans la scène avant correction, absence de débordement horizontal et d'exception JavaScript. Cinq missions supplémentaires par viewport : lien d'évitement et validation par Entrée.

Les animations et vecteurs ne sont **pas** validés physiquement par la simple présence du SVG.

## Inventaire nominatif des 50 missions

| N° de couverture | Identifiant | Univers |
| ---: | --- | --- |
| 310 | `transformer-reflected-impedance-01` | `SI-08` |
| 311 | `hydraulic-wave-roundtrip-01` | `SI-06` |
| 312 | `motor-synchronous-speed-01` | `SI-08` |
| 313 | `proportional-loop-steady-error-01` | `SI-09` |
| 314 | `thevenin-source-efficiency-01` | `SI-08` |
| 315 | `nusselt-dittus-boelter-01` | `SI-12` |
| 316 | `differential-outer-wheel-speed-01` | `SI-01` |
| 317 | `source-matched-load-power-01` | `SI-10` |
| 318 | `kinetic-01` | `SI-02` |
| 319 | `hydro-backpressure-01` | `SI-06` |
| 320 | `lumped-cooling-time-constant-01` | `SI-12` |
| 321 | `cantilever-tip-mass-frequency-01` | `SI-09` |
| 322 | `mohr-plane-principal-stress-01` | `SI-04` |
| 323 | `planetary-fixed-ring-reaction-torque-01` | `SI-05` |
| 324 | `gear-base-circle-diameter-01` | `SI-05` |
| 325 | `centrifugal-clutch-threshold-01` | `SI-05` |
| 326 | `hydraulic-pump-loss-power-01` | `SI-10` |
| 327 | `brinell-spherical-contact-pressure-01` | `SI-14` |
| 328 | `hydro-volume-01` | `SI-06` |
| 329 | `compressor-clearance-volumetric-efficiency-01` | `SI-07` |
| 330 | `three-phase-cable-max-length-01` | `SI-08` |
| 331 | `induction-motor-slip-01` | `SI-08` |
| 332 | `vibration-critical-damping-01` | `SI-09` |
| 333 | `hydrostatic-column-01` | `SI-06` |
| 334 | `radial-insulation-resistance-01` | `SI-12` |
| 335 | `built-up-beam-shear-flow-01` | `SI-04` |
| 336 | `ideal-gas-sound-speed-01` | `SI-07` |
| 337 | `first-order-95-response-time-01` | `SI-09` |
| 338 | `sinusoidal-vibration-rms-01` | `SI-09` |
| 339 | `density-01` | `SI-14` |
| 340 | `measurement-uncertainty-01` | `SI-13` |
| 341 | `fiber-numerical-aperture-01` | `SI-13` |
| 342 | `maintenance-normal-reorder-point-01` | `SI-15` |
| 343 | `braking-stop-time-01` | `SI-02` |
| 344 | `rectangular-channel-critical-depth-01` | `SI-06` |
| 345 | `thermal-contact-interface-resistance-01` | `SI-12` |
| 346 | `rc-lowpass-phase-01` | `SI-09` |
| 347 | `hydraulic-throttle-heat-01` | `SI-06` |
| 348 | `safety-stop-separation-01` | `SI-16` |
| 349 | `spring-stored-energy-01` | `SI-04` |
| 350 | `lc-resonance-01` | `SI-09` |
| 351 | `rc-highpass-gain-magnitude-01` | `SI-08` |
| 352 | `simply-supported-shaft-first-bending-speed-01` | `SI-04` |
| 353 | `sensor-two-point-sensitivity-01` | `SI-13` |
| 354 | `rotating-unbalance-force-01` | `SI-11` |
| 355 | `planetary-fixed-ring-01` | `SI-05` |
| 356 | `magnetic-airgap-force-01` | `SI-08` |
| 357 | `pump-apparent-leakage-flow-01` | `SI-06` |
| 358 | `elastic-strain-energy-density-01` | `SI-04` |
| 359 | `mechanical-efficiency-02` | `SI-10` |

## Réserves et suite

- 597 missions conservées ; **0 mission créée** ; accueil, carte des 17 univers, scripts, assets, auteur, historique et applications AppDeploy inchangés.
- Les workflows Node/science et Chromium du **nouveau lot** doivent être contrôlés sur leurs SHAs respectifs avant toute réception.
- La progression enregistrée localement ne constitue pas une preuve authentifiée de compétence. Le dépôt est public ; une vérification exhaustive des données sensibles, y compris historique Git, reste à faire.
- Essais sur appareils physiques Android/iPhone, Firefox, Safari, NVDA, TalkBack, VoiceOver, contrôle vectoriel des SVG et audit RGAA : **non réalisés**.
- **Prochaine action :** examiner le verdict navigateur 310–359, corriger toute régression, puis poursuivre 360–409 ; ne pas commencer la phase 2 (598–996) sans réception prouvée.
