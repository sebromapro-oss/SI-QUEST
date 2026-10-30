# SI QUEST V2.5 — Contre-audit scientifique 293–317

**Date :** 30 octobre 2026. **HEAD initial :** `25721f40c6c5fb5cf0abbf3676d3e3f1299be8b8`. **25 missions existantes**, aucune nouvelle mission.

## Contrôle indépendant

Les lois de statique/RDM, RLC, échangeurs NTU, automatique, élingage, oscillateurs, métrologie, Hertz/Brinell, acoustique, CAN, hydraulique, électrotechnique, fiabilité et transmissions ont été reconstruites à partir des données des énoncés. **75 calculs aux états minimum, nominal et maximum, 75 concordances**, écart relatif pondéré maximal **5.613e-16**. Les tests `tests/audit-293-317-independent.test.cjs` comparent aussi les valeurs HTML, les unités, les trois aides, les domaines, les critères de décision et les attributs SVG. Le modèle et la référence peuvent partager des hypothèses simplificatrices ; ce contrôle ne vaut pas réception physique générale.

| N° | Mission | Valeur nominale indépendante | Unité |
|---:|---|---:|---|
| 293 | `plane-stress-principal-max-01` | 87.0156212 | MPa |
| 294 | `rlc-series-quality-factor-01` | 3.16227766 | sans unité |
| 295 | `exchanger-ntu-zero-capacity-ratio-01` | 77.6869840 | % |
| 296 | `second-order-step-overshoot-01` | 37.2326105 | % |
| 297 | `asymmetric-sling-tension-01` | 6.52703645 | kN |
| 298 | `damped-natural-frequency-01` | 10.9981817 | rad/s |
| 299 | `rl-series-impedance-phase-01` | 51.4881127 | ° |
| 300 | `maintenance-mtbf-operating-hours-01` | 200.000000 | h |
| 301 | `sensor-midscale-linearity-error-01` | 5.00000000 | % |
| 302 | `isotropic-shear-modulus-01` | 80.7692308 | GPa |
| 303 | `hertz-line-contact-pressure-01` | 252.313252 | MPa |
| 304 | `sabine-room-reverberation-01` | 0.805000000 | s |
| 305 | `brinell-spherical-contact-pressure-01` | 2025.32277 | MPa |
| 306 | `prandtl-liquid-number-01` | 6.96666667 | sans unité |
| 307 | `can-classic-frame-busload-01` | 11.1000000 | % |
| 308 | `pitot-incompressible-speed-01` | 0.800000000 | m/s |
| 309 | `dc-parallel-current-divider-01` | 2.40000000 | A |
| 310 | `exchanger-ntu-equal-capacity-01` | 60.0000000 | % |
| 311 | `stepper-microstep-angle-01` | 0.225000000 | ° |
| 312 | `fatigue-notch-factor-01` | 1.90000000 | sans unité |
| 313 | `rectangular-beam-max-shear-01` | 3.75000000 | MPa |
| 314 | `transformer-reflected-impedance-01` | 72.0000000 | Ω |
| 315 | `fourier-number-slab-01` | 0.400000000 | sans unité |
| 316 | `weibull-component-reliability-01` | 52.7292424 | % |
| 317 | `belt-effective-tension-01` | 500.000000 | N |

## Correction graphique et vérifications géométriques

**308 — Mesure Pitot :** le trait représentant la vitesse était sans pointe et ne matérialisait pas le sens de l'écoulement. Une pointe triangulaire est ajoutée à l'extrémité du vecteur, à longueur paramétrique conservée **160v/1,3 px**. Trois tests géométriques complètent les 25 contrôles scientifiques : cercle de Mohr 293 (rayon/centre), largeur de contact Hertz 303, sens et longueur de la flèche Pitot 308.

**Limites :** les tests de parcours 3 essais/3 aides sont simulés par les tests existants ; aucun test utilisateur réel sur navigateur/mobile, NVDA/TalkBack/VoiceOver, ni recette RGAA exhaustive. Aucun contrôle exhaustif des secrets et de l'historique. La visibilité réelle du dépôt reste **publique** selon l'API GitHub. Accueil, 17 univers, navigation, HTML de missions et AppDeploy non modifiés. **Phase 1 maintenue ; suite prioritaire : missions 268–292.**
