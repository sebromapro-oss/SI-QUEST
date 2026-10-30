# SI QUEST V2.5 — revue scientifique ciblée 93–117 — 30 octobre 2026

**Périmètre :** 25 missions (n° 93 à 117), sept fichiers de tests existants. **HEAD de départ :** `0ef3cce36267b4a925df78f8f11fa04c8e8041ff`. **Nature du travail :** revue de code, équations et assertions ; pas une nouvelle exécution indépendante des 25 scènes en navigateur.

| Missions | Tests consultés | Relations physiques et invariants examinés |
|---|---|---|
| 93 | `batch92-93.test.cjs` | Capteur 4–20 mA : conversion affine de 4 mA → 0 à 20 mA → 250 ; six points de contrôle, domaine et symétrie des résultats. |
| 94–95 | `batch94-95.test.cjs` | Vanne immergée : intégration hydrostatique d'une pression triangulaire et dépendance en `h²` (kN). Cabestan : `T₂/T₁=e^{μθ}`, inversion logarithmique et limites de frottement. |
| 96–97 | `batch96-97.test.cjs` | Convection `Φ=hAΔT` (W), sommation par surfaces et linéarité en `h` ; orifice `Q=C_d A√(2Δp/ρ)` (L/min), loi en racine de la pression et flèche nulle à débit nul. |
| 98–102 | `batch98-102.test.cjs` | Soupape `pA=F`, réactions de poutre `R_A+R_B=F`, résonance LC `ω²LC=1`, rendement de vis `tanλ/tan(λ+φ)`, compression isentropique d'un gaz parfait en températures absolues. |
| 103–107 | `batch103-107.test.cjs` | Vitesse de moteur hydraulique débit/cylindrée, flèche de poutre `FL³/(48EI)`, triangle triphasé `P²+Q²=S²`, transitoire RL `i=I_∞(1-e^{-t/τ})`, NPSH disponible par bilan de charge. |
| 108–112 | `batch108-112.test.cjs` | Cisaillement sur deux sections `F/(2A)`, Reynolds `ρvD/μ`, résistances thermiques en série, incertitudes quadratiques et angle limite de basculement `tanθ=b/h`. |
| 113–117 | `audit-cycle-113-117.test.cjs` | Puissance de pompe `ΔpQ/η` (kW), temps d'arrêt `v/a` (s), courbure `M/(EI)` (m⁻¹), autonomie `C/I` (h), pont de jauges et microdéformations. |

**Constat :** les sept suites incluent des calculs de référence distincts, des contrôles d'unités et/ou des bornes, des tests de structure SVG et des vérifications pédagogiques. Aucune divergence manifeste n'a été établie par la revue des expressions lues. **Ce constat ne démontre pas que toutes les représentations sont exactes** ; les tests de rendu sont essentiellement structurels.

## Dépendance bloquante commune

Le contrôleur `src/investigation-mission.js` maintient les simulations verrouillées après une réponse erronée, comme détaillé dans [l'audit 118–142](AUDIT_SCIENTIFIQUE_118_142_20261030.md). Le correctif doit permettre une exploration même en cas d'erreur **sans exposer le résultat nominal avant les essais** et sans contourner les trois aides ni le corrigé.

## Réserves de réception

Aucun test réel mobile, navigateur graphique, NVDA, TalkBack, VoiceOver ni audit RGAA exhaustif. Pas d'audit complet des secrets ni de l'historique ; dépôt public selon l'API GitHub. Aucun changement d'accueil, des 17 univers, de moteur, de mission HTML ou d'application AppDeploy ; aucune mission nouvelle.

**Couverture documentaire récente :** 93–597 = **505 missions sur 597 (84,6 %)**. Il s'agit d'une couverture de revue, **pas d'une réception scientifique, graphique, pédagogique et fonctionnelle à 84,6 %**. Phase 1 maintenue ; prochaine plage 68–92 et correction de la dépendance d'animation.
