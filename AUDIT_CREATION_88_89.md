# SI QUEST — Audit et création des missions 88–89
Date : 26 octobre 2026. Branche privée main. HEAD initial : `7df2f7587ce67be83c2a5def9bcf2c50149ec894`.

## Chantier A — Audit et correction
Mission `hydro-annular-force-01` (lot 40–75) : le remplissage bleu de la chambre annulaire recouvrait graphiquement la tige du vérin et masquait la pièce solide. Correction : deux zones de fluide distinctes, au-dessus et au-dessous de la tige, tracées avant le piston et la tige ; déplacement de la légende des diamètres pour éviter le chevauchement avec la ligne de résultats. Test de non-régression SVG dans `tests/batch88-89.test.cjs`.

## Chantier B — Création
- Mission 88 `three-phase-power-01` (SI-08) : puissance électrique active absorbée par un moteur triphasé équilibré, P = √3 Uₗ Iₗ cos φ ; Uₗ = 400 V, Iₗ = 12 A, cos φ = 0,82. Résultat **6.817352 kW** ; seuil de 8 kW fictif. Ne pas confondre avec puissance mécanique ni apparente.
- Mission 89 `hydrostatic-column-01` (SI-06) : pression hydrostatique entre deux niveaux dans de l'huile au repos, Δp = ρgh, ρ = 850 kg/m³, g = 9,81 m/s², h = 2,50 m. Résultat **0,2084625 bar**, positif vers le bas ; seuil de 0,30 bar fictif. Ne pas confondre avec une perte de charge en écoulement.

## Registre de preuves S/G/P/F/A
| Axe | Contrôle | État |
|---|---|---|
| S | Calculs de référence indépendants, unités, signes, domaine, invariants, limites | Tests automatisés à vérifier en CI |
| G | Schémas SVG des deux nouvelles missions et zones de fluide du vérin | Contrôles de code, inspection navigateur non réalisée |
| P | Objectifs, prérequis, questions flash, trois essais/aides, corrigé et décision fictive | Code présent ; essai pédagogique non réalisé |
| F | Catalogue, HTML, moteurs et non-régressions | CI à vérifier |
| A | Titres/desc SVG, labels, moteur commun, clavier/tactile | Audit partiel ; NVDA, TalkBack et VoiceOver non réalisés |

## Réserves
Pas de tests matériels, navigateur réel, 3D manipulable, inspection visuelle exhaustive ni conformité WCAG démontrée. Aucune publication publique, refonte d'accueil/carte, ZIP ou changement de visibilité. Les deux missions sont codées ; réception globale non revendiquée.
