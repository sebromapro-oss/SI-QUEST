# SI QUEST V2.5 — revue des références scientifiques 143–167 — 30 octobre 2026

**Périmètre :** 25 missions ; cinq fichiers de tests relus : `tests/batch143-147.test.cjs`, `batch148-152.test.cjs`, `batch153-157.test.cjs`, `batch158-162.test.cjs`, `batch163-167.test.cjs`.

## Contre-références effectivement examinées
| Missions | Modèles et vérifications de cohérence dimensionnelle |
|---|---|
| 143–147 | Von Mises sous contraintes combinées (MPa) ; réponse linéaire Pt100 (Ω/°C) ; fréquence propre en torsion √(k/J)/(2π) (Hz) ; Darcy laminaire f=64/Re (sans dimension) ; angle de vérin obtenu par trigonométrie (°). |
| 148–152 | Contrainte circonférentielle de paroi mince pD/(2e) (MPa) ; Fourier Fo=αt/L² (sans dimension) ; fréquence d'engrènement Z·n/60 (Hz) ; effort d'impact ρQv (N) ; contrainte de cisaillement rectangulaire maximale 1,5V/A (MPa). |
| 153–157 | Énergie de déformation de poutre Fδ/2 (J) ; température polytropique en Kelvin puis °C ; taux C=I/Cₙ (h⁻¹) ; nombre de cavitation (p−pᵥ)/(ρv²/2) ; couple de précharge de boulon (N·m). |
| 158–162 | Cumul Miner Σnᵢ/Nᵢ ; effet Seebeck (mV) ; transformateur idéal rapport de spires ; coupure RC 1/(2πRC) (Hz) ; balourd m e ω² (N). |
| 163–167 | Effort axial d'engrenage hélicoïdal Fₜtanβ (N) ; célérité idéale √(K/ρ) (m/s) ; théorème de Huygens I_G+md² (kg·m²) ; COP Carnot de pompe à chaleur Tₕ/(Tₕ−T𝒸) (sans dimension) ; viscosité cinématique μ/ρ (mm²/s). |

## Preuves et limites
- Les tests de chaque lot contiennent des expressions de calcul distinctes des fonctions du moteur `src/investigations.js`, ainsi que des assertions d'unités, domaines et SVG. Le contrôle CI du SHA `8fc56a4d59f9a1652eb500f5f212372131865dbe` a réussi : [2 078/2 078 tests](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41122610517).
- La relecture des formules et de leur homogénéité **n'a pas révélé de divergence manifeste dans les expressions examinées**. Il ne s'agit pas d'une validation indépendante des hypothèses d'exploitation ou des dessins techniques.
- Pour le coup de bélier, la célérité d'onde et les efforts dynamiques, la géométrie réelle des conduites et les conditions aux limites doivent être explicitées avant toute utilisation professionnelle.
- **Non réalisés :** captures et comparaison visuelle des 25 SVG, animation en navigateur réel, tests sur mobile physique, tests NVDA/TalkBack/VoiceOver, réception pédagogique, RGAA complet.
- **Aucune mission nouvelle**, aucune modification des modèles physiques, de l'accueil ou des applications AppDeploy.
- **Suite :** audit 118–142, inspection SVG avec preuves visuelles, contrôles 3 essais/3 aides et tests d'accessibilité réelle. Phase 1 maintenue.
