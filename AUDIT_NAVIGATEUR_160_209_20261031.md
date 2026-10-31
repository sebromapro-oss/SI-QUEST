# SI QUEST V2.5 — Recette navigateur 160–209 et cinq références scientifiques

**Date :** 31 octobre 2026. **Dépôt :** `sebromapro-oss/SI-QUEST`, branche `main`.

## Situation vérifiée au démarrage

- HEAD initial : `627e5d2385df54e22547d4a9617165681c8b7533`.
- Trois workflows Node/science réussis sur ce HEAD ; dernière recette déclarée : **2 204/2 204 tests**.
- Recette navigateur précédente : **159/597 missions distinctes** et **38/38 scénarios Chromium**.
- Le dépôt est **public**, et non privé comme indiqué dans certaines consignes.

## Modifications publiées

1. [Commit navigateur `b26eac4c`](https://github.com/sebromapro-oss/SI-QUEST/commit/b26eac4c12a3d023dbf0f9753e60dc0067f7420d) : extension du fichier `tests/mission-browser.spec.cjs` par six scénarios Playwright (deux groupes de 25 missions sur deux viewports, plus cinq missions au clavier sur chaque viewport). Vérifications : verrouillage initial, réponse incorrecte, exploration qualitative, SVG sans `data-result`, débordement horizontal, erreurs JavaScript, trois aides et trois essais, corrigé autorisé uniquement après ces conditions.
2. [Commit scientifique `610ca9b2`](https://github.com/sebromapro-oss/SI-QUEST/commit/610ca9b26cca7b0efcb124084acbd3c48019c2d2) : six tests Node supplémentaires dont cinq contre-calculs indépendants sur quatre points de domaine chacun, plus un test d'inventaire ; cohérence de la valeur HTML nominale et des unités.

**État provisoire :** couverture **visée** de 209/597, **confirmée** de 159/597 tant que la recette Chromium n'est pas terminée. Aucun résultat en cours n'est déclaré réussi.

## Contre-calculs indépendants ajoutés

| Mission | Loi indépendante | Unité | Valeur nominale calculée |
|---|---|---|---:|
| `notch-elastic-stress-factor-01` | σmax = 2,2 × F / (20×4 mm²) | MPa | 275 |
| `rc-charge-stored-energy-01` | E = ½ C [24(1−exp(−t/RC))]² | mJ | 50,97652494 |
| `hollow-shaft-elastic-twist-01` | φ = TL / (Gπ(Do⁴−Di⁴)/32), rad→° | ° | 0,20201885 |
| `fourier-number-slab-01` | Fo = αt/L² | sans unité | 0,4 |
| `ice-latent-fusion-energy-01` | Q = 334 m | kJ | 668 |

Les cinq modèles sont testés aux bornes, au milieu et au nominal, soit **20 comparaisons** ; les références sont définies indépendamment du moteur de production. Cela ne valide ni les 45 autres équations du lot ni les animations.

## Liste des 50 missions supplémentaires (sélection déterministe sans doublon)

160. `notch-elastic-stress-factor-01` — SI-04
161. `rc-charge-stored-energy-01` — SI-09
162. `hollow-shaft-elastic-twist-01` — SI-04
163. `fourier-number-slab-01` — SI-12
164. `ice-latent-fusion-energy-01` — SI-12
165. `hydrostatic-wheel-traction-01` — SI-17
166. `tank-gravity-drain-01` — SI-06
167. `resistance-02` — SI-08
168. `thermal-resistance-01` — SI-12
169. `beam-curvature-01` — SI-04
170. `buck-inductor-current-ripple-01` — SI-08
171. `profile-discrete-roughness-ra-01` — SI-13
172. `rl-series-voltage-phase-01` — SI-08
173. `two-support-eccentric-reaction-01` — SI-03
174. `shaft-key-allowable-torque-01` — SI-05
175. `entropy-two-reservoirs-01` — SI-12
176. `plane-stress-principal-max-01` — SI-04
177. `three-phase-cable-voltage-drop-01` — SI-08
178. `ntc-beta-resistance-01` — SI-08
179. `motion-01` — SI-01
180. `bearing-l10-life-01` — SI-15
181. `combined-stress-von-mises-01` — SI-04
182. `solenoid-air-core-field-01` — SI-08
183. `correlated-uncertainty-sum-01` — SI-13
184. `straight-fin-heat-rate-01` — SI-12
185. `mean-type-a-uncertainty-01` — SI-13
186. `fourbar-grashof-margin-01` — SI-05
187. `sample-hold-phase-lag-01` — SI-09
188. `bearing-projected-pressure-01` — SI-04
189. `electrical-series-01` — SI-08
190. `composite-wall-01` — SI-12
191. `rl-current-threshold-time-01` — SI-08
192. `scotch-yoke-displacement-01` — SI-01
193. `gear-lewis-tooth-bending-01` — SI-05
194. `copper-skin-depth-01` — SI-08
195. `pneumatic-receiver-pressure-rise-01` — SI-07
196. `quarter-bridge-linearization-error-01` — SI-13
197. `damped-natural-frequency-01` — SI-09
198. `sensor-hysteresis-fullscale-01` — SI-13
199. `machine-availability-01` — SI-15
200. `axial-strain-01` — SI-04
201. `thermal-radiation-01` — SI-12
202. `hydraulic-oil-compressibility-01` — SI-06
203. `fick-membrane-diffusion-01` — SI-14
204. `bearing-inner-race-bpfi-01` — SI-15
205. `gate-pressure-center-depth-01` — SI-06
206. `sudden-expansion-loss-01` — SI-06
207. `open-channel-froude-number-01` — SI-06
208. `pneumatic-choked-flow-margin-01` — SI-07
209. `thermal-penetration-length-01` — SI-12

## Réserves et réception

- L'exécution Chromium du [run 41179676226](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41179676226) doit être terminée et examinée avant de déclarer la couverture 209/597.
- Les tests Node/science du commit `610ca9b2` doivent être vérifiés sur leurs propres runs.
- Aucun test sur Android/iPhone physiques, Firefox, Safari, NVDA, TalkBack ou VoiceOver n'a été effectué par ce cycle.
- Les contrôles SVG sont structurels, sans mesure indépendante de fidélité géométrique ou temporelle.
- Dépôt public et réponses attendues en HTML : la progression locale ne constitue pas une preuve authentifiée des compétences.
- Aucune mission ajoutée ; accueil, carte des 17 univers, marquage d'auteur et applications AppDeploy inchangés. **Phase 1 maintenue**.

**Suite :** examiner les runs, corriger toute régression, étendre le navigateur à un autre lot distinct et organiser les essais réels d'accessibilité.
