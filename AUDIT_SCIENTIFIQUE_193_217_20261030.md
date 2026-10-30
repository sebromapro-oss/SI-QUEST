# SI QUEST V2.5 — Contre-audit numérique des missions 193 à 217

**30 octobre 2026.** HEAD contrôlé : `1b958dc284279bfce58ea4b6c459741805d7cfec` ; **25 missions existantes, aucune création**.

## Méthode et résultats

Les 25 modèles ont été exécutés dans le moteur V8 aux trois états **minimum / milieu / maximum** et confrontés aux références algébriques distinctes du moteur, déjà consignées dans les cinq fichiers `tests/batch193-197.test.cjs` à `tests/batch213-217.test.cjs`. **75/75 concordances** avec écart relatif pondéré maximal **2,75×10⁻¹⁶**. Les 25 pages HTML nominales ont été vérifiées indépendamment : **25/25 valeurs attendues, unités et trois questions flash cohérentes**. Les 75 SVG de principe générés comportent titre et description et ne présentent pas de NaN/Infinity.

| N° | Mission | Résultat au milieu du domaine | Unité |
|---:|---|---:|---|
| 193 | `safety-stop-separation-01` | 0.57 | m |
| 194 | `safety-proof-test-pfd-01` | 0.438 | % |
| 195 | `production-bottleneck-01` | 55 | pièces/h |
| 196 | `electrohydraulic-drive-current-01` | 52.083333 | A |
| 197 | `material-thermal-diffusivity-01` | 13.461538 | mm²/s |
| 198 | `rotor-centripetal-acceleration-01` | 1598.8759 | m/s² |
| 199 | `parallel-thermal-bridges-01` | 48.4 | W |
| 200 | `sampling-alias-frequency-01` | 75 | Hz |
| 201 | `regenerative-cylinder-speed-01` | 0.14589203 | m/s |
| 202 | `buoyancy-immersed-volume-01` | 490.5 | N |
| 203 | `beam-uniform-load-deflection-01` | 0.49603175 | mm |
| 204 | `hydraulic-fluid-stiffness-01` | 25.454545 | MN/m |
| 205 | `motor-synchronous-speed-01` | 1200 | tr/min |
| 206 | `biot-number-plate-01` | 0.035 | sans unité |
| 207 | `basquin-fatigue-life-01` | 554928.96 | cycles |
| 208 | `shaft-torsional-shear-stress-01` | 15.915494 | MPa |
| 209 | `series-rl-impedance-01` | 37.241918 | Ω |
| 210 | `series-system-reliability-01` | 50.915642 | % |
| 211 | `dry-air-ideal-density-01` | 3.5657071 | kg/m³ |
| 212 | `parallel-spring-stiffness-01` | 105 | N/mm |
| 213 | `dc-bus-discharge-time-01` | 59.521825 | s |
| 214 | `regenerative-braking-energy-01` | 25.92 | kJ |
| 215 | `proportional-saturation-01` | 75 | % |
| 216 | `hydraulic-local-loss-01` | 0.063199088 | bar |
| 217 | `process-capability-cpk-01` | 1.6666667 | sans unité |

## Analyse technique et limites

Les lois couvertes comprennent l'arrêt protecteur illustratif (193), la PFD approximative (194), les débits de ligne (195), les bilans électrohydrauliques (196), la diffusivité thermique (197), la dynamique circulaire (198), les ponts thermiques (199), l'aliasing à 75 Hz (200), la régénération hydraulique (201), la poussée d'Archimède (202), la flexion (203), la raideur d'huile (204), la vitesse synchrone (205), le nombre de Biot (206), la fatigue de Basquin (207), la torsion (208), l'impédance RL (209), la fiabilité série (210), le gaz parfait (211), les ressorts parallèles (212), la décharge RC (213), la récupération d'énergie (214), la saturation proportionnelle (215), les pertes singulières (216) et le Cpk (217).

**Aucune correction de modèle ou de SVG n'a été justifiée par les contrôles numériques et l'inspection statique de ce lot.** Cela ne signifie pas qu'une inspection visuelle sur navigateur ou une validation physique indépendante complète ait été faite. Les références de tests préexistantes ne sont pas une preuve externe. Aucune modification des pages, de l'accueil, des 17 univers ou des applications AppDeploy.

**CI du commit précédent :** trois workflows déclenchés sur `1b958dc284279bfce58ea4b6c459741805d7cfec` mais **encore en attente (« queued ») au moment de la vérification** ; ne pas déclarer le nouveau HEAD vert avant confirmation. Les essais matériels, NVDA/TalkBack/VoiceOver, audit RGAA complet, sécurité des secrets/historique et réception pédagogique restent non réalisés. Le dépôt est déclaré public par GitHub.

**Bilan de ce cycle étendu : 50 missions 193–242 contrôlées numériquement, 5 incohérences SVG corrigées sur 218–242, 30 nouveaux tests Node préparés et publiés, aucune mission créée.** Phase 1 maintenue. Prochain lot **168–192**, après contre-recette du HEAD.
