# SI QUEST V2.5 — Audit scientifique 243–267

**30 octobre 2026.** HEAD initial `74c46dd40cf52fa39db70f9c6322b96a61d5d6e1`. **25 missions existantes, zéro création.**

## Contre-audit numérique indépendant

Les 25 lois ont été recalculées indépendamment des fonctions de production, aux états minimum, milieu du domaine et maximum : **75/75 concordances en JavaScript V8** (tolérance relative pondérée 2×10⁻⁷). Le nouveau test Node contrôle en outre les valeurs nominales HTML, unités, trois aides, critères de décision, valeurs invalides et synchronisation des SVG ; son résultat CI reste à vérifier. L'exactitude physique hors des hypothèses déclarées n'est pas démontrée.

| N° | Mission | Valeur au milieu du domaine | Unité |
|---:|---|---:|---|
| 243 | `planetary-carrier-speed-01` | 225 | tr/min |
| 244 | `capacitor-stored-energy-01` | 5.875 | J |
| 245 | `sensor-temperature-drift-01` | 43.2 | mV |
| 246 | `belt-centrifugal-tension-01` | 50 | N |
| 247 | `thermal-penetration-length-01` | 69.4550214 | mm |
| 248 | `hydrostatic-center-pressure-01` | 3.30769231 | m |
| 249 | `induction-rotor-frequency-01` | 3 | Hz |
| 250 | `fillet-weld-double-shear-01` | 8.83883476 | MPa |
| 251 | `parallel-plate-capacitance-01` | 0.19318228 | nF |
| 252 | `isotropic-volume-expansion-01` | 4.83 | mL |
| 253 | `bearing-pv-factor-01` | 2.35619449 | MPa·m/s |
| 254 | `three-phase-cable-voltage-drop-01` | 4.04145188 | V |
| 255 | `hydraulic-throttle-heat-01` | 1.25 | kW |
| 256 | `pneumatic-receiver-fill-time-01` | 100 | s |
| 257 | `half-power-damping-ratio-01` | 0.1125 | sans unité |
| 258 | `screw-jack-self-locking-01` | 4.48121814 | ° |
| 259 | `sensor-hysteresis-fullscale-01` | 1.875 | % |
| 260 | `gear-backlash-pitch-01` | 1.04719755 | mm |
| 261 | `hydraulic-filter-captured-mass-01` | 28.5 | g |
| 262 | `transformer-load-voltage-01` | 225.5 | V |
| 263 | `bearing-static-safety-01` | 2 | sans unité |
| 264 | `vibration-critical-damping-01` | 5830.95189 | N·s/m |
| 265 | `material-thermal-effusivity-01` | 1200 | W·√s/(m²·K) |
| 266 | `metrology-worstcase-stack-01` | 0.17 | mm |
| 267 | `hydraulic-wave-roundtrip-01` | 87.5 | ms |

## Trois défauts de représentation corrigés

- **250 — Soudures :** l'annotation « 2 × L = 80 mm » contredisait les deux cordons de **80 mm chacun** utilisés dans la section résistante. Correction « 2 cordons × 80 mm ».
- **255 — Étranglement hydraulique :** les deux triangles se touchaient au col alors qu'un débit de 15 L/min était imposé. Un passage libre de 28 px est désormais visible ; il reste schématique, sans prétendre représenter la section réelle.
- **264 — Masse-ressort-amortisseur :** l'amortisseur était fixé en x=355 px même lorsque la masse raccourcie s'arrêtait à x=330 px. Sa fixation suit maintenant le bord de la masse (35 px avant l'extrémité) pour toutes les valeurs de m.

**28 tests Node ajoutés :** 25 contre-calculs et 3 tests de géométrie/annotation. **CI à vérifier après publication.** Accueil utilisateur, carte des 17 univers, navigation, HTML des missions et AppDeploy non modifiés.

**Limites :** navigateur/mobile physiques, NVDA/TalkBack/VoiceOver, audit RGAA complet, revue exhaustive des secrets/historique et réception pédagogique non réalisés. Dépôt public selon GitHub. **Phase 1 maintenue ; prochain lot 218–242.**
