# SI QUEST — Audit scientifique ciblé des missions 593 à 597

**30 octobre 2026 — Phase 1, audit numérique ciblé.** Référence initiale : `16766cc316a7202d8528e57f1ce2c5cac959a26a`. Ce document n'est **pas** une réception globale des 597 missions.

## Méthode

Les cinq expressions ci-dessous ont été recalculées à partir des hypothèses et constantes documentées dans `src/batch593-597.js`, indépendamment des fonctions `physics.calculate` du moteur. Trois points du domaine sont contrôlés pour chaque modèle (borne basse, point initial, borne haute). Les unités sont indiquées et les propriétés physiques analysées. Les tests existants `tests/batch593-597.test.cjs` vérifient les bornes, les entrées invalides, la cohérence des SVG et les invariants. Un nouveau test compare aussi le résultat **rédigé** du corrigé radiatif à une référence indépendante.

| Mission | Référence basse | Référence initiale | Référence haute | Loi et propriété contrôlée |
|---|---:|---:|---:|---|
| `radiation-surface-ambient-01` | 300 K → 39,7352 W | 373 K → 652,5101 W | 500 K → 3 001,0316 W | εσA(T⁴−293⁴), croissance pour T>293 K |
| `thermal-peclet-transport-01` | 0,001 m/s → 1 428,5714 | 0,014 m/s → 20 000 | 0,050 m/s → 71 428,5714 | vL/α, adimensionnel, proportionnalité à v |
| `kelvin-voigt-parallel-force-01` | 0 mm → 50 N | 10 mm → 250 N | 20 mm → 450 N | kx+cv, effort visqueux 50 N à x=0 |
| `capillary-pressure-drop-01` | 0,05 L/min → 1,6579 kPa | 0,20 L/min → 6,6315 kPa | 1,00 L/min → 33,1573 kPa | 8μLQ/(πr⁴), proportionnalité à Q |
| `dielectric-parallel-plate-capacitance-01` | 0,5 mm → 4,4271 nF | 1,0 mm → 2,2135 nF | 5,0 mm → 0,4427 nF | ε₀εᵣA/d, proportionnalité inverse à d |

## Anomalie scientifique corrigée

Dans `src/batch593-597.js`, le corrigé du rayonnement affichait **« ≈ 654 W »**, en contradiction avec le calcul détaillé et la référence **652,5101 W**. Le texte a été corrigé en **« ≈ 652,51 W »**. Un test dédié impose désormais une concordance à 0,01 W près entre la valeur imprimée et un calcul indépendant. La formule physique et le moteur de calcul n'ont pas été modifiés.

## Limites et risques restant ouverts

- La comparaison numérique n'est pas une vérification expérimentale ou constructeur.
- Le modèle radiatif néglige la convection ; la loi simplifiée suppose une enceinte noire étendue et une surface grise.
- Le nombre de Péclet dépend de la longueur caractéristique retenue.
- Kelvin–Voigt est un modèle linéaire simplifié ; la vitesse d'allongement est supposée constante.
- Hagen–Poiseuille suppose un écoulement laminaire établi d'un fluide newtonien dans une conduite circulaire rigide.
- Le condensateur plan néglige les effets de bord, potentiellement sensibles selon le rapport dimensions/entrefer.
- Les tests visuels de chaque mission sur navigateurs, appareils physiques, NVDA, TalkBack et VoiceOver **ne sont pas réalisés dans ce cycle**.
- Aucun contrôle du dépôt public fondé sur le seul nom des fichiers ne suffit à certifier l'absence de données personnelles ou de secrets dans le contenu ou l'historique.

**Statut :** audit numérique ciblé réalisé ; réception graphique, pédagogique, sécurité et accessibilité non acquise. Aucune mission 598+ ajoutée.
