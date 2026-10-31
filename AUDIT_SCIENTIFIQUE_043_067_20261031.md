# SI QUEST V2.5 — contre-audit scientifique des missions 43–67

**Date :** 31 octobre 2026. **Lot :** 25 missions historiques, n° 43 à 67. **HEAD de départ :** `ed66827473f520c8495e903bd5ef1650f77ff623`, trois workflows GitHub Actions verts (recette `41148571971`, scientifique `41148571858`, qualité `41148572107`). **Statut :** phase 1, réception globale non acquise.

## Vérifications réalisées

Les 25 pages de missions ont été lues pour relever les configurations nominales, domaines d'entrée, unités et présence des trois questions flash. Les relations physiques ont été comparées aux formules des moteurs, avec une attention particulière aux conversions SI. Le nouveau test `tests/audit-043-067-independent.test.cjs` utilise **25 références indépendantes**, quatre points par mission (minimum, milieu, nominal, maximum), soit **100 comparaisons numériques**. Il contrôle aussi l'identifiant de catalogue, la page, les unités, les structures SVG, les valeurs non finies et les trois questions flash.

| N° | Mission | Référence physique et unité de sortie |
|---:|---|---|
| 43 | Plan incliné | `F∥ = mg sin(α)` en N, α converti en rad |
| 44 | Résultante orthogonale | `R = √(300² + F²)` en N |
| 45 | Torsion d'arbre plein | `τmax = 16T/(πd³)` en MPa, T en N·mm |
| 46 | Déformation axiale | `ε = ΔL/L₀`, sans dimension |
| 47 | Entraxe engrenages droits | `a = m(z₁+z₂)/2` en mm ; nombres de dents entiers |
| 48 | Vitesse de courroie | `v = 2πrn/60` en m/s |
| 49 | Puissance hydraulique | `P = Δp Q` en kW, bar et L/min convertis |
| 50 | Volume de vérin | `V = SL` en L, cm² et mm convertis |
| 51 | Force pneumatique | `F = pS` en N, pression manométrique |
| 52 | Puissance électrique CC | `P = UI` en W |
| 53 | Effet Joule | `P = RI²` en W |
| 54 | Constante de temps RC | `τ = RC` en s |
| 55 | Fréquence d'échantillonnage | `f = 1/Δt` en Hz, ms convertis |
| 56 | Rendements en série | `ηtotal = η₁η₂`, sans dimension |
| 57 | Résistance au roulement | `Fᵣ = cᵣN` en N |
| 58 | Transfert thermique plan | `Φ = λAΔT/e` en W |
| 59 | Écart relatif de mesure | `100|x−x₀|/x₀` en % |
| 60 | Moment d'une force | `M = Fr sin(α)` en N·m |
| 61 | Frottement cinétique | `F = μmg` en N, surface horizontale |
| 62 | Raideur ressort | `k = F/Δx` en N/m |
| 63 | Flexion section rectangulaire | `σmax = 6M/(bh²)` en MPa |
| 64 | Rapport d'engrenages | `i = z₁/z₂`, sans dimension |
| 65 | Vis à deux filets | `avance/tr = 2p` en mm/tr |
| 66 | Rentrée d'un vérin | `v = Q/[π(D²−d²)/4]` en m/s |
| 67 | Force annulaire | `F = pπ(D²−d²)/4` en N |

**Précautions scientifiques :** les relations sont établies sous les hypothèses indiquées dans chaque mission ; les équations seules ne suffisent pas à valider une décision de maintenance. En particulier, les modèles pneumatiques/hydrauliques idéaux ne prennent pas automatiquement en compte les pertes, frottements, contre-pressions ou rendements ; l'équilibre statique et la cinématique ne démontrent pas la stabilité dynamique.

## Tests et historique réel

- **Commit initial du test :** `773ddfb9f11b03b532a03cbec89f37069cd47449`. Une erreur de syntaxe dans l'extraction de configuration du harnais de test a provoqué l'échec de la première recette. Ne pas présenter cette exécution comme réussie.
- **Correction ciblée :** `72d21b5c53a6f8deed1423cf010b7075a9e90187`. Extraction sans expression régulière fragile ; aucune assertion scientifique supprimée, aucun moteur de production modifié.
- **CI sur ce commit :** [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154571874), [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154571851), [qualité scientifique](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41154571884). **En cours lors de la rédaction : vérifier leurs conclusions et le décompte des tests avant de les déclarer réussis.**

## Réception : limites et blocages

Les assertions de présence SVG, les valeurs numériques et la cohérence des unités **ne prouvent pas** la qualité visuelle, l'absence de chevauchements ou la fidélité temporelle des animations. Il manque encore la recette en navigateurs réels et sur smartphones, les contrôles manuels clavier/NVDA/TalkBack/VoiceOver, l'audit WCAG 2.2 AA/RGAA, l'audit des secrets et des données privées, ainsi que la réception pédagogique indépendante.

**Sécurité :** l'API GitHub indique que le dépôt est **public**, malgré l'exigence « privé ». La visibilité n'a pas été modifiée. Ne pas y placer de preuves personnelles ou données nominatives.

**Couverture documentaire récente :** 43–597 = **555/597 missions (93,0 %)** ; il ne s'agit pas d'un taux de réception validée. **Créations : 0** ; **catalogue : 597 missions conservées**. Aucun fichier d'accueil, carte des 17 univers, asset, navigation ou projet AppDeploy modifié. **Prochaine priorité :** confirmer les trois CI, corriger les éventuelles régressions, puis auditer les missions 18–42 et poursuivre la recette physique. **Phase 2 suspendue.**
