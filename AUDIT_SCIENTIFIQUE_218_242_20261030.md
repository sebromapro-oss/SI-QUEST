# SI QUEST V2.5 — Contre-audit scientifique des missions 218 à 242

**30 octobre 2026.** HEAD de départ : `afe89cbf307483b0f644f58eef38c7ce196adfab`. 25 missions existantes ; **aucune mission nouvelle**.

## Vérifications réellement effectuées

Les 25 équations ont été confrontées à des références indépendantes, reformulées à partir des hypothèses physiques déclarées (Stokes, Maxwell, Lamé, Thévenin, Couette, ressorts, dilatation, vibrations, hydraulique, thermique, etc.). Évaluation dans le moteur JavaScript V8 aux états minimum, milieu du domaine et maximum : **75/75 résultats concordants**, écart relatif pondéré maximal **3,36 × 10⁻¹⁶**. Les **25 configurations HTML nominales** ont été comparées à leur moteur scientifique : **25/25 concordantes**. Les SVG ont été générés aux trois états sans NaN ni valeur infinie. Contrôles structurels : unités, titre/description SVG et trois questions flash ; les essais sur appareil restent à réaliser.

| N° | Identifiant | Résultat au milieu du domaine | Unité |
|---:|---|---:|---|
| 218 | `stokes-sphere-drag-01` | 0.188495559 | mN |
| 219 | `magnetic-airgap-force-01` | 12.7323954 | N |
| 220 | `gear-tooth-tangential-force-01` | 2000 | N |
| 221 | `pendulum-small-angle-period-01` | 2.10398048 | s |
| 222 | `radial-insulation-resistance-01` | 2.78859747 | K/W |
| 223 | `sinusoidal-vibration-rms-01` | 12.5619556 | m/s² |
| 224 | `thick-cylinder-hoop-stress-01` | 22.8205128 | MPa |
| 225 | `three-phase-neutral-imbalance-01` | 3.46410162 | A |
| 226 | `source-matched-load-power-01` | 51.4285714 | W |
| 227 | `couette-viscous-shear-01` | 2.4 | N |
| 228 | `series-spring-stiffness-01` | 37.3333333 | kN/m |
| 229 | `poisson-lateral-contraction-01` | -3.85714286 | µm |
| 230 | `differential-thermal-clearance-01` | 0.151 | mm |
| 231 | `three-phase-voltage-unbalance-01` | 1.65289256 | % |
| 232 | `vibration-base-transmissibility-01` | 0.841078013 | sans unité |
| 233 | `shaft-key-shear-stress-01` | 20.8333333 | MPa |
| 234 | `transformer-winding-copper-loss-01` | 300 | W |
| 235 | `straight-fin-efficiency-01` | 0.644585136 | sans unité |
| 236 | `brake-pad-sector-pressure-01` | 0.153033599 | MPa |
| 237 | `hydrostatic-wheel-traction-01` | 3246.76084 | N |
| 238 | `shaft-key-bearing-pressure-01` | 50 | MPa |
| 239 | `ultrasonic-time-of-flight-01` | 1.2005 | m |
| 240 | `square-screw-lead-angle-01` | 5.68062982 | ° |
| 241 | `capillary-rise-water-01` | 24.7862357 | mm |
| 242 | `sample-hold-phase-lag-01` | -36 | ° |

## Cinq incohérences graphiques corrigées

1. **222 — Isolation cylindrique :** le rayon extérieur SVG est maintenant proportionnel à r₂/r₁, avec r₁ = 28 px correspondant à 25 mm ; l'ancienne loi de rayon 42 + 0,8(r₂−30) ne respectait pas le rapport géométrique.
2. **226 — Source de Thévenin :** les fils du générateur rejoignent les deux plaques du symbole électrique ; suppression des deux interruptions de 6 px qui représentaient un circuit ouvert.
3. **227 — Couette :** inversion du profil des vecteurs vitesse dans le film : vitesse maximale au voisinage de la plaque supérieure mobile et décroissante vers la plaque inférieure fixe.
4. **237 — Transmission hydrostatique :** alignement du centre de roue et de l'axe du réducteur, ajout d'un arbre de liaison, repositionnement de la ligne de sol au point de contact.
5. **241 — Capillarité :** remplacement de la parabole du ménisque par un arc circulaire tangent aux parois verticales (θ = 0°) ; rayon schématique lié au rayon de capillaire, tout en restant non métrique.

**30 tests Node ajoutés :** 25 tests indépendants de calcul/HTML/SVG/domaines/critères et cinq tests géométriques spécifiques. La CI du nouveau commit doit être vérifiée séparément : aucun résultat futur n'est anticipé.

## Limites et décision

Ces contre-calculs vérifient les modèles **dans leurs hypothèses** ; ils ne constituent pas une validation de l'applicabilité des lois aux équipements réels. Les schémas restent des représentations de principe, pas des plans CAO. Les parcours clavier sont simulés dans les tests existants ; les essais sur navigateur, Android/iOS et les lecteurs NVDA, TalkBack et VoiceOver, la réception RGAA/WCAG complète et l'audit exhaustif des secrets/historique ne sont pas réalisés. GitHub déclare le dépôt **public**, malgré la mention « privé » dans le cahier des charges.

Accueil, 17 univers, navigation, pages HTML, assets, historique et toutes les applications AppDeploy préservés. **Phase 1 maintenue. Prochain lot : 193–217, puis 168–192 si la qualité des vérifications le permet.**
