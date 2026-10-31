# SI QUEST V2.5 — Recette navigateur 260–309 et contre-calculs SI

**Date :** 31 octobre 2026. **Dépôt :** `sebromapro-oss/SI-QUEST`, branche `main`. **Phase 1.**

## Réception préalable confirmée

- [Run Chromium du lot 210–259](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41183678314) : **success**, commit `f3f3f0be96a236c98886e270dfdaea5a9d5d5f2b`, terminé le 31 octobre à 08:29:40 UTC.
- Le code navigateur du lot 210–259 n'a pas été modifié par les commits scientifiques et documentaires suivants ; couverture navigateur confirmée **259/597**, sous réserve du protocole Chromium lui-même.
- HEAD initial de ce cycle : `9ed41c58c4930c92b3ec026fceacdb13eb47b27f`. Trois workflows Node/science **success** sur ce SHA, 2 228/2 228 tests selon la recette précédente.

## Changements réellement publiés

1. [`e7db0b83`](https://github.com/sebromapro-oss/SI-QUEST/commit/e7db0b830a6f8dbd8c095e3ede59f2c6da8612f2) : extension du fichier `tests/mission-browser.spec.cjs` à **50 missions nouvelles distinctes**, numéros de couverture 260–309. Deux navigateurs Chromium : bureau 1440×900 et Android **émulé** 390×844. Six scénarios nouveaux (deux groupes de 25 et cinq contrôles clavier sur chaque viewport). Le test refuse un catalogue modifié ou une sélection avec doublons.
2. [`9cbf7048`](https://github.com/sebromapro-oss/SI-QUEST/commit/9cbf70488911e80a4e79b6d0dcbdd97db1b8a082) : neuf tests Node, huit lois physiques distinctes, **32 contre-calculs indépendants** (minimum, milieu, nominal, maximum), contrôles unités/HTML, NaN et infinities.

**Verdict de ce nouveau lot :** ne pas porter la couverture confirmée à 309/597 avant le succès du [run Chromium 41187846793](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41187846793) sur `e7db0b83`. Les workflows Node du commit scientifique `9cbf7048` doivent également être vérifiés.

## Contrôles navigateur appliqués aux 50 missions

Pour chaque mission : saisie d'une réponse volontairement incorrecte, activation de l'exploration qualitative après erreur, vérification des boutons initialement verrouillés, contrôle des trois essais et des trois aides, accès au corrigé uniquement après 3+3, visibilité SVG, absence de `data-result` prématuré, absence de débordement horizontal et d'exception JavaScript. Cinq missions sont parcourues au clavier sur chacun des deux viewports : lien d'évitement et validation par Entrée.

**Limite :** ces tests ne mesurent ni la justesse physique du mouvement animé ni les contraintes vectorielles réelles. La présence d'un SVG n'est pas une preuve de fidélité scientifique.

## Huit références scientifiques indépendantes

| Identifiant | Référence indépendante | Sortie |
| --- | --- | --- |
| `thermocouple-seebeck-voltage-01` | `E=41 µV/K × (T−20 °C)` ; conversion en mV | mV |
| `flywheel-angular-momentum-01` | `L=Jω`, `J=8 kg·m²`, `ω=2πn/60` | kg·m²/s |
| `hydro-force-02` | `F=(p×10⁵ Pa/bar)×π(0,08 m)²/4` | N |
| `adc-voltage-step-01` | `q=Uref/2¹²` ; V → mV | mV |
| `electric-power-02` | `P=24 V×I` | W |
| `copper-cable-resistance-01` | `R=(0,0175 Ω·mm²/m)×L/(2,5 mm²)` | Ω |
| `darcy-pipe-loss-01` | `Δp=fᴅ (L/D)ρv²/2`, `v=Q/A`, conversions L/min → m³/s et Pa → bar | bar |
| `gear-mesh-01` | `a=3 mm×(20+z₂)/2` | mm |

Les calculs de référence sont écrits dans les tests indépendamment des fonctions du moteur ; chaque modèle est comparé à quatre valeurs d'entrée. Ils ne démontrent pas les 42 autres lois du lot.

## Inventaire des missions sélectionnées

| N° de couverture | Identifiant |
| ---: | --- |
| 260 | `hertz-line-contact-pressure-01` |
| 261 | `gear-backlash-pitch-01` |
| 262 | `thermocouple-seebeck-voltage-01` |
| 263 | `flywheel-angular-momentum-01` |
| 264 | `copper-electroplating-thickness-01` |
| 265 | `insulation-polarization-index-01` |
| 266 | `carnot-refrigerator-cop-01` |
| 267 | `compressor-isentropic-efficiency-outlet-temperature-01` |
| 268 | `belt-capstan-min-tight-tension-01` |
| 269 | `electrohydraulic-drive-current-01` |
| 270 | `accumulator-polytropic-delivery-01` |
| 271 | `hydro-force-02` |
| 272 | `center-mass-01` |
| 273 | `adc-voltage-step-01` |
| 274 | `diesel-bsfc-01` |
| 275 | `coriolis-radial-slider-01` |
| 276 | `series-spring-stiffness-01` |
| 277 | `electric-power-02` |
| 278 | `beam-support-reaction-01` |
| 279 | `composite-wall-interface-temperature-01` |
| 280 | `rectifier-capacitor-ripple-01` |
| 281 | `parallel-rc-impedance-magnitude-01` |
| 282 | `nozzle-exit-mach-subsonic-01` |
| 283 | `pitot-incompressible-speed-01` |
| 284 | `material-thermal-effusivity-01` |
| 285 | `oil-pressure-wave-speed-01` |
| 286 | `harmonic-vibration-velocity-rms-01` |
| 287 | `laplace-straight-wire-force-01` |
| 288 | `star-delta-line-current-01` |
| 289 | `ice-fusion-duration-01` |
| 290 | `faraday-flux-rate-emf-01` |
| 291 | `isotropic-shear-modulus-01` |
| 292 | `regenerative-cylinder-speed-01` |
| 293 | `thin-wall-hoop-stress-01` |
| 294 | `accumulator-isothermal-01` |
| 295 | `restrained-thermal-stress-01` |
| 296 | `rc-lowpass-phase-lag-01` |
| 297 | `electrostatic-parallel-plate-force-01` |
| 298 | `shaft-key-shear-stress-01` |
| 299 | `copper-cable-resistance-01` |
| 300 | `darcy-pipe-loss-01` |
| 301 | `gear-mesh-01` |
| 302 | `hydrostatic-gate-force-01` |
| 303 | `pendulum-small-angle-period-01` |
| 304 | `chain-polygonal-speed-ripple-01` |
| 305 | `motor-i2t-overload-time-01` |
| 306 | `star-delta-starting-torque-01` |
| 307 | `lumped-cooling-threshold-time-01` |
| 308 | `rectangular-beam-max-shear-01` |
| 309 | `couette-viscous-shear-01` |

## Réserves et prochaine action

- **Phase 1 maintenue**, 597 missions existantes, **0 créée**.
- Le dépôt GitHub est **public** ; les résultats attendus sont dans les HTML ; la progression locale n'est pas une preuve de compétence authentifiée.
- Les essais sur Android/iPhone physiques, Firefox, Safari, NVDA, TalkBack, VoiceOver, l'audit SVG indépendant et la sécurité restent à faire.
- Aucune application AppDeploy, page d'accueil, carte des 17 univers, asset, marquage d'auteur ou donnée privée modifié.
- **Suite :** confirmer Chromium 260–309, corriger toute anomalie ; sinon rester à 259/597. Après succès, poursuivre 310–359, sans lancer la phase 2.
