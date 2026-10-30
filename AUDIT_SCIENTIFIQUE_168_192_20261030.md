# SI QUEST V2.5 — contre-audit des missions 168 à 192 — 30 octobre 2026

## Périmètre et méthode
- **25 missions** réparties en cinq lots de cinq ; aucun nouveau contenu pédagogique ni modification de l'accueil.
- Relecture des cinq tests de référence : `tests/batch168-172.test.cjs`, `batch173-177.test.cjs`, `batch178-182.test.cjs`, `batch183-187.test.cjs`, `batch188-192.test.cjs`.
- Chaque test compare la production à une **formule de référence indépendante** aux cinq points min, quart, nominal, trois quarts, max : **125 points de calcul** couverts par les tests existants ; valeurs nominales, unités, bornes, rejet NaN/Infinity, SVG et explications vérifiés selon les assertions de chaque lot.
- **Preuve d'exécution réelle :** sur le SHA `8fc56a4d59f9a1652eb500f5f212372131865dbe`, 2 078 tests Node réussis, 0 échec : [contrôles scientifiques](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41122610517), [recette](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41122610520), [qualité](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/41122610712).
- Ces résultats attestent **les assertions réellement écrites**, pas une revue indépendante de tous les cas physiques ou une recette graphique visuelle.

## Inventaire et contrôles couverts
| Missions | Savoirs examinés dans les tests | Contre-références et invariants |
|---|---|---|
| 168–172 | Palier/frottement ; Poiseuille ; Doppler ultrasonore ; thermistance NTC ; fissuration | P proportionnelle à la vitesse ; débit proportionnel à Δp ; Doppler nul à vitesse nulle ; NTC 10 kΩ à 25 °C ; fissure critique proportionnelle à 1/σ². |
| 173–177 | Coup de bélier ; résistance thermique de contact ; niveaux sonores ; disponibilité ; filtration β | Δp proportionnel à Δv ; R=1/(hA) ; addition logarithmique de deux niveaux ; disponibilité décroissante avec MTTR ; efficacité nulle à β=1. |
| 178–182 | Freinage ; moyenne logarithmique des températures ; élancement ; propagation acoustique ; flexion | Distance en v²/(2μg) ; ΔT logarithmique dans le domaine 10–50 K ; λ=L/i ; perte en 20log₁₀(r/r₀) ; moment central F·L/4. |
| 183–187 | Vidange gravitaire ; mélange thermique ; résistance cuivre ; rendement volumétrique ; onde transverse de courroie | Vidange de Torricelli ; bilan énergétique des masses ; R proportionnel à L ; rendement ≤100 % dans le domaine ; célérité proportionnelle à √T. |
| 188–192 | Pression projetée palier ; réactance inductive ; refroidissement ; échauffement de frein ; résolution codeur | p=F/(Ld) ; X_L=2πfL ; puissance ρQcpΔT ; ΔT=E/(mc) ; résolution proportionnelle au diamètre. |

## Anomalie transversale CI corrigée
- Sur `cccc620b84dc00fb0d246a4ea4a151d10956448b` : **2 072/2 078** tests réussis, six échecs dans `tests/audit-218-242-independent.test.cjs` (missions 222, 226, 228, 230, 237, 241).
- Cause racine : assertion du test traitant implicitement `criteria.max === null` comme la valeur numérique zéro. Ce n'était pas une divergence des six équations physiques.
- Correction ciblée dans le test, **sans suppression de test ni relâchement des seuils numériques**, commit [8fc56a4](https://github.com/sebromapro-oss/SI-QUEST/commit/8fc56a4d59f9a1652eb500f5f212372131865dbe).
- Trois workflows verts au même SHA, dont 2 078/2 078 tests scientifiques.

## Limites et décision de réception
- **Non réalisés :** inspection visuelle individuelle des 25 SVG/animations dans un navigateur, mobile physique, clavier réel, NVDA, TalkBack, VoiceOver, audit RGAA/WCAG exhaustif, validation pédagogique en classe.
- Les tests de calcul indépendants reposent sur les hypothèses de modèle consignées ; la pertinence des hypothèses en contexte réel reste à contrôler.
- Aucun constat de défaut nouveau n'est établi pour ce lot à partir des assertions consultées ; **cela ne prouve pas l'absence de défaut**.
- **Phase 1 maintenue**, 597 missions au catalogue ; prochaine plage prioritaire **143–167**. Vérifier le HEAD et les trois runs avant toute nouvelle écriture.
