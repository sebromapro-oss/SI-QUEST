# SI QUEST V2.3 — Audit et création 158–162

**Date :** 26 octobre 2026, 20 h (Europe/Paris). **SHA initial :** `3391083912ca7d8c5ed949b4ae5c26dc4aa0b706`.

## Phase 0 et protection
Dépôt privé vérifié. Nouvelle page d'accueil, carte, navigation et assets non modifiés. Catalogue seul étendu ; le moteur commun est mis à jour sans toucher aux composants d'accueil. Branches d'archive préservées. Les trois workflows du SHA initial sont en état FAILURE avant exécution d'étapes (jobs sans runner ni étapes) ; journaux indisponibles (BlobNotFound).

## Chantier A — anomalies historiques et audit
- **P1 audit :** `tests/quality-gate-40-75.test.cjs` sélectionnait `catalog.levels.slice(39,75)`. L'insertion des nouveaux niveaux en tête du catalogue déplaçait la fenêtre ; le test ne contrôlait plus les vraies missions 40–75. Corrigé par les **36 identifiants explicites**, avec contrôle de présence et d'ordre. Régression ajoutée.
- **P2 graphique :** `incline-force-01` dessinait une composante du poids parallèle à la pente même pour θ = 0° et F∥ = 0 N. Flèche supprimée dans ce cas.
- **P2 graphique :** `brake-torque-01` dessinait un couple de freinage même pour α = 0 rad/s² et C = 0 N·m. Arc de couple supprimé à zéro ; repère de rotation conservé.
- Contre-audit : tests sur les deux cas nuls et non nuls. La réception exhaustive 40–75 demeure ouverte.

## Chantier B — modèles distincts
| N° | ID | Résultat nominal | Unité |
|---|---|---:|---|
| 158 | `miner-fatigue-damage-01` | 0.550000000 | sans unité |
| 159 | `thermocouple-seebeck-voltage-01` | 4.10000000 | mV |
| 160 | `transformer-turns-ratio-01` | 46.0000000 | V |
| 161 | `rc-lowpass-cutoff-01` | 3.38627538 | Hz |
| 162 | `rotating-unbalance-force-01` | 23.6870506 | N |

Modèles purs, hypothèses, limites, trois questions flash, cinq points de contre-calcul par mission, cas invalides, propriétés, schémas SVG paramétriques et courbe du contrôleur commun. Trois essais, trois aides, corrigé conditionnel et sauvegarde mutualisés. Scènes 2D de principe ; pas de 3D revendiquée. La représentation du balourd est un état de phase figé : **aucune animation temporelle synchronisée n'est déclarée reçue**.

## Statuts de preuve (à compléter avec CI et essais réels)
- **S :** contre-calculs indépendants et contrôles dimensionnels ciblés ; ne vaut pas validation globale.
- **G :** SVG structurels et cas nuls testés ; inspection visuelle individuelle **NOT RUN**.
- **P :** contenus et contrôleur commun intégrés ; essai élève **NOT RUN**.
- **F :** contrôles JavaScript V8 ciblés ; CI Node native **BLOCKED / à recontrôler sur commit final**.
- **A :** parcours clavier/zoom matériels, NVDA, TalkBack, VoiceOver **NOT RUN**.

Les cinq missions sont **codées**, non « validées » au sens du cahier des charges. Aucun déploiement GitHub Pages ni ZIP.
