# SI QUEST V2.5 — Audit indépendant des missions 318 à 342

**Date :** 30 octobre 2026. **HEAD initial :** `a42d15c096eb08ee0fc778c7159279c23fba9316`. **Périmètre :** 25 missions existantes, sans ajout.

## Résultats numériques

25 lois ont été reconstruites indépendamment à partir des hypothèses déclarées (pression absolue, flexion de Navier, incertitudes A/B, glissement, inertie de section, Froude, courroie, effusivité, Coriolis, quantification CAN, convection, torsion, fiabilité, moteur asynchrone, thermistance, pente de console, acoustique, électrochimie et second principe). Trois états par mission (minimum, nominal, maximum) : **75/75 concordances** avec les modèles, écart relatif pondéré maximal **4.774e-15**. Les 25 valeurs nominales HTML et les trois aides par mission ont également été contrôlées. La validation porte sur les hypothèses affichées, non sur la pertinence constructeur de tous les seuils fictifs.

| N° | Mission | Valeur nominale indépendante | Unité |
|---:|---|---:|---|
| 318 | `pump-npsh-available-01` | 7.97145770 | m |
| 319 | `circular-shaft-bending-stress-01` | 19.0985932 | MPa |
| 320 | `mean-type-a-uncertainty-01` | 0.0100000000 | mm |
| 321 | `induction-motor-slip-01` | 4.00000000 | % |
| 322 | `first-order-lowpass-gain-01` | 0.447213595 | sans unité |
| 323 | `i-section-inertia-01` | 0.0000318133333 | m⁴ |
| 324 | `metrology-guardband-margin-01` | 0.0200000000 | mm |
| 325 | `open-channel-froude-number-01` | 0.903047282 | sans unité |
| 326 | `belt-slip-driven-speed-01` | 582.000000 | tr/min |
| 327 | `semi-infinite-contact-temperature-01` | 84.0000000 | °C |
| 328 | `coriolis-slider-01` | 8.40000000 | m/s² |
| 329 | `adc-quantization-rms-01` | 0.704773278 | mV |
| 330 | `nusselt-dittus-boelter-01` | 191.189508 | sans unité |
| 331 | `rectangular-typeb-uncertainty-01` | 0.0346410162 | mm |
| 332 | `hollow-shaft-torsional-stress-01` | 13.8020547 | MPa |
| 333 | `parallel-reliability-01` | 98.9500000 | % |
| 334 | `induction-rotor-copper-loss-01` | 0.600000000 | kW |
| 335 | `ntc-beta-temperature-01` | 30.1078019 | °C |
| 336 | `cantilever-tip-slope-01` | 0.803571429 | mrad |
| 337 | `ideal-gas-sound-speed-01` | 347.188709 | m/s |
| 338 | `battery-coulomb-soc-01` | 58.0000000 | % |
| 339 | `pump-displacement-from-flow-01` | 17.7777778 | cm³/tr |
| 340 | `peltier-ideal-heat-01` | 24.0000000 | W |
| 341 | `acoustic-normal-reflection-01` | 0.428571429 | sans unité |
| 342 | `entropy-two-reservoirs-01` | 0.500000000 | J/K |

## Anomalies graphiques identifiées et corrigées

1. **319 — Flexion arbre plein :** la section d'extrémité avait un rayon SVG de 42 px, alors que l'arbre longitudinal avait une hauteur de 80 px (diamètre 80 px). Rayon ramené à **40 px** et diamètre d'axe à **80 px** (x=455–535), conformément à la géométrie représentée. Pas de modification de la loi physique.
2. **341 — Réflexion acoustique :** la légende annonçait une onde transmise sans rayon correspondant. Ajout du rayon transmis, longueur **160(1+r) px**, avec le coefficient de transmission de pression **t=1+r** à incidence normale. Le rayon réfléchi reste **160r px**. Vérification indépendante du bilan d'énergie **(1+r)² Z₁/Z₂ = 1−r²** pour des milieux sans pertes.

**Non-régression :** `tests/audit-318-342-independent.test.cjs` ajoute 25 contrôles scientifiques (3 états, HTML, domaines, SVG, unités, décisions) et deux contrôles géométriques/acoustiques. Les tests d'interaction existants des cinq lots (3 essais/3 aides, sauvegarde) restent en place ; ils ne remplacent pas des essais utilisateur sur appareils.

## Limites de réception

Aucun test navigateur visuel sur écran réel, aucune mesure mobile, aucun essai NVDA/TalkBack/VoiceOver ni contrôle RGAA exhaustif réalisé pendant cet audit. Aucun secret ni historique complet inspecté. Le dépôt GitHub est signalé **public** par l'API, malgré sa désignation comme privé dans la demande. Aucune modification de visibilité, d'accueil, de carte 17 univers, d'HTML de mission, de données privées ou de projet AppDeploy. **Phase 1 maintenue** ; prochain lot **293–317** après validation CI du présent commit.
