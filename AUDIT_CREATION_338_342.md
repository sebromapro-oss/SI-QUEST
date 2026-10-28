# SI QUEST V2.3 — Cycle 338–342 — 28 octobre 2026

## Phase 0
- Dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`, HEAD initial `d2da4266028e519b9abcb03bd690d6c5977228b9`, arbre `a684b2821678ddb39ec315c8935c215c8a93e5f1`.
- Contrats lus : cahier maître V2.3, `EXIGENCES.md`, `PRODUCTION.md`, `src/catalog.js`, modèles et tests 333–337, contrôleur mutualisé, HTML et workflows.
- Accueil protégé : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg`. Seul `src/catalog.js` est modifié pour ajouter les entrées ; aucune refonte ni écrasement.
- Branche d'archive préservée. Aucun ZIP, GitHub Pages, changement de visibilité ou force push.

## Chantier A : correction historique
- **P2 pédagogique — `hydro-volume-01`** : absence d'objectifs, prérequis, critères de réussite et trois questions flash dans le HTML, alors que les missions récentes en disposent. Ajout d'une section de réactivation, repère et conversions SI ; modèle numérique inchangé.
- Test dédié `tests/historical-hydro-volume-pedagogy.test.cjs` pour structure et valeurs 0/300/600 mm.
- Audit historique 40–75 : contrôle nominal/bornes numérique et SVG à exécuter dans le banc `tests/historical-40-75-exact.test.cjs`. Ne pas assimiler à une réception scientifique indépendante exhaustive.

## Chantier B : cinq questions scientifiques distinctes
| N° | ID | Question scientifique | Référence nominale |
|---|---|---|---|
| 338 | `battery-coulomb-soc-01` | État de charge par intégration du courant | 58 % |
| 339 | `pump-displacement-from-flow-01` | Identification de cylindrée d'une pompe | 17,7778 cm³/tr |
| 340 | `peltier-ideal-heat-01` | Contribution réversible de Peltier | 24 W |
| 341 | `acoustic-normal-reflection-01` | Réflexion de pression à incidence normale | 0,428571 |
| 342 | `entropy-two-reservoirs-01` | Entropie créée par transfert thermique | 0,5 J/K |

Chaque mission : contexte métier, objectif, prérequis, trois flash, hypothèses, unités, domaine, modèle pur, contre-référence, SVG 2D paramétrique, graphique calculé, tolérance propre, trois essais et aides mutualisés, corrigé conditionnel, décision fictive, sauvegarde. Pas de 3D ni animation temporelle revendiquée.

## Matrice de réception
| S/G/P/F/A | Statut | Preuve et limite |
|---|---|---|
| S | PASS ciblé sous réserve des tests | Trois états indépendants par mission, domaine, invariants, unités et conversions |
| G | PASS structurel sous réserve des tests / NOT RUN visuel | SVG synchronisés et attributs de géométrie ; pas de capture navigateur |
| P | PASS structurel sous réserve des tests | Trois questions flash, corrigé et trois essais/aides ; simulation DOM à exécuter |
| F | BLOCKED CI / tests V8 ciblés | Node natif GitHub Actions à vérifier |
| A | NOT RUN manuel | Sémantique HTML présente ; NVDA, TalkBack et VoiceOver non testés |

**Important :** ce registre documente les fichiers créés ; les résultats d'exécution et le SHA final doivent être confirmés après publication. Aucune réception complète n'est revendiquée.
