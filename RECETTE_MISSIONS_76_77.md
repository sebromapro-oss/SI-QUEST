# SI QUEST — Registre de production et recette, missions 76–77

Date : 25 octobre 2026. Dépôt privé, branche `main`.
Révision du code effectivement testée : `dfee1abf2079f18444aacb9d97918e9db2241c21`.

## Chantier A — Audit et corrections des missions existantes

L'analyse des journaux GitHub Actions de la révision `07ab780b` a révélé 39 échecs sur 479 tests : expression régulière invalide dans une suite de recette, mocks DOM incomplets, parcours de trois aides incohérent, et libellés graphiques sans dimension. Le cycle a également corrigé les tests de non-régression dont les assertions étaient figées à 75 missions et une extraction incorrecte des configurations de mission.

**Correction fonctionnelle mutualisée :** le corrigé des missions utilisant `src/investigation-mission.js` ne devient accessible qu'après **trois essais infructueux ET trois aides effectivement demandées**. Les aides restent accessibles après épuisement des essais. La consultation du corrigé ne valide pas le calcul et ne donne aucune étoile.

**Correction graphique :** les axes SVG des grandeurs sans dimension utilisent le symbole `1` plutôt que du texte explicatif. Les tests associés vérifient les unités et les labels.

**Contre-audit :** les trois workflows GitHub Actions exécutés sur `dfee1abf` ont terminé avec le statut **success**. La suite `SI QUEST scientific quality` a exécuté **525 tests Node : 525 réussis, 0 échec**. Cela démontre la recette automatisée du code concerné, pas une validation visuelle ni matérielle de l'ensemble des missions.

## Chantier B — Deux missions indépendantes créées et intégrées

### Mission 76 — `hose-pressure-drop-01` (SI-06)

- **Situation professionnelle :** diagnostic de la perte de pression dans un flexible hydraulique droit.
- **Données :** longueur `L = 5,0 m`, diamètre intérieur `D = 0,012 m`, viscosité dynamique `μ = 0,060 Pa·s`, masse volumique `ρ = 850 kg/m³`, débit initial `Q = 2,0 L/min`.
- **Hypothèses :** écoulement newtonien, permanent, incompressible, laminaire pleinement développé ; pas de perte singulière ni de dénivelé.
- **Loi :** `Δp = 128 μLQ/(πD⁴)` (Hagen–Poiseuille).
- **Conversion :** `Q = 2/60000 = 3,333333… × 10⁻⁵ m³/s`.
- **Contre-calcul :** `Δp = 19 648,7584 Pa = 0,196487584 bar`.
- **Homogénéité :** `(Pa·s)·m·(m³/s)/m⁴ = Pa`.
- **Contrôle de domaine :** `Re = 4ρQ/(πμD) ≈ 50,1` au point initial ; `Re ≈ 150,3` à 6 L/min : hypothèse laminaire compatible sur la plage d'investigation.
- **Critère fictif d'exercice :** perte de pression maximale `0,50 bar`. Ce seuil ne remplace aucune spécification constructeur.
- **Graphique :** perte de pression en fonction du débit ; schéma 2D de conduite, sens d'écoulement et prises de pression. Aucun modèle 3D prétendu.

### Mission 77 — `dc-voltage-drop-01` (SI-08)

- **Situation professionnelle :** diagnostic d'un faisceau 12 V continu comportant un conducteur aller et un conducteur retour.
- **Données :** `U = 12 V`, longueur aller `L = 8,0 m`, longueur retour identique, section `S = 2,5 mm²`, résistivité du cuivre à la température de référence `ρ = 0,0175 Ω·mm²/m`, courant initial `I = 15 A`.
- **Hypothèses :** régime permanent, résistivité constante, résistances de contact et échauffement négligés.
- **Loi :** `R = 2ρL/S`, puis `ΔU = RI`.
- **Contre-calcul :** `R = 0,112 Ω`, `ΔU = 1,68 V`, `U_charge = 10,32 V`.
- **Homogénéité :** `(Ω·mm²/m)·m/mm² = Ω` ; `Ω·A = V`.
- **Cas limites :** `I = 0 A → ΔU = 0 V` ; doublement du courant → doublement de la chute.
- **Critère fictif d'exercice :** `ΔU ≤ 1,20 V` ; vérifier séparément l'ampacité, la protection, la température et la tension minimale du récepteur.
- **Graphique :** chute de tension en fonction du courant ; schéma 2D d'un circuit avec résistances des deux conducteurs. Aucun modèle 3D prétendu.

## Preuves et réserves

| Dimension | Preuve obtenue | Verdict |
|---|---|---|
| Scientifique (S) | Contre-calculs, unités, invariants et domaine ; tests Node | Testé automatiquement |
| Graphique (G) | SVG générés aux bornes, présence des unités et absence de NaN | Structure testée ; inspection visuelle non réalisée |
| Pédagogique (P) | Contexte, prérequis, trois essais et aides, corrigé conditionnel, décision fictive | Contrôles de code ; réception en situation non réalisée |
| Fonctionnel (F) | Catalogue à 77 missions, trois workflows GitHub réussis, 525/525 tests Node | Testé automatiquement |
| Accessibilité (A) | Balises, rôles, texte alternatif et contrôles automatisés disponibles | NVDA, TalkBack, VoiceOver, zoom et appareils réels non testés |

**Bilan :** deux missions nouvelles enregistrées et reliées au catalogue ; 77 entrées uniques. Aucun niveau ne peut être déclaré entièrement reçu sur la seule base des tests Node. Les contrôles visuels sur navigateur, téléphone, tablette et lecteurs d'écran restent obligatoires avant réception finale.
