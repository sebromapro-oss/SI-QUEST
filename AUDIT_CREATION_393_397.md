# SI QUEST V2.3 — Audit et création 393–397
**28 octobre 2026 — dépôt privé, branche main**

## Phase 0
HEAD initial distant : `91dc642770a2c1f8c483ff2246725b1bb287194a`. HEAD après intégration des fichiers, avant ce rapport : `1a3dd2b396865a692c37baad7da485faf7ccfe9a`. Écritures GitHub séquentielles sur main, sans force push ni reset. Dépôt privé vérifié. SHA protégés inchangés : index.html = 94165cccd6ad972a1a57699d5fcf42afde5cca53 ; src/home.js = 0ead30ab3afe119589f0a14aab99898f0e7721d7 ; src/style.css = 966e623673ce45c86c2cc6a59a4725406475db10 ; assets/archipelago-cinematic.svg = 8d75fd72f75cb662f0d2de1c5a3e1df8ab935347. Aucune modification de l'accueil, de sa carte, de ses styles ou de son illustration ; aucune publication GitHub Pages, aucun ZIP.

Références lues : CAHIER_DES_CHARGES_MAITRE.md V2.3, EXIGENCES.md, PRODUCTION.md, catalogue, moteurs de calcul et SVG, contrôleur, modèle HTML et tests des lots précédents.

## Chantier A — Missions historiques 40–75
36 missions auditées sur min/nominal/max avec moteurs JavaScript réels : **108/108 calculs finis**, **108/108 SVG structurels**, **72/72 NaN/Infinity rejetés**. Ce contrôle n'est pas une validation scientifique indépendante exhaustive des 36 modèles.
Trois corrections **P2 pédagogiques** intégrées et contre-testées : electric-power-02 (P=UI, V×A=W), joule-heat-01 (P=RI², puissance ≠ énergie), rc-time-01 (τ=RC, µF→F et charge à 63,2 %). Objectifs, prérequis, hypothèses, critères et trois questions flash ajoutés.
**7 P2 encore ouverts** sur les flash HTML : efficiency-chain-01, heat-transfer-01, moment-arm-02, spring-stiffness-01, electrical-series-01, inductor-energy-01, mechanical-efficiency-02.

## Chantier B — Cinq missions indépendantes
- **393** rc-charge-stored-energy-01 : énergie pendant charge RC, t=5 s → **50,9765 mJ**.
- **394** cylinder-required-flow-01 : débit de vérin pour 0,40 m en 5 s → **9,42478 L/min**.
- **395** sling-allowable-angle-01 : angle maximal à la verticale, charge 8 kN et Tadm 6 kN → **48,1897°**.
- **396** induction-developed-power-01 : puissance mécanique développée, Pδ=15 kW et s=4 % → **14,400 kW**.
- **397** simply-supported-beam-stiffness-01 : raideur verticale, portée 3 m → **2,98667 kN/mm**.

Cinq sous-savoirs existants différents ; situations métier fictives, objectifs, prérequis, trois questions flash, hypothèses, domaines, unités, critères et décisions contextualisées. Modèles purs, SVG 2D paramétriques, graphes après déverrouillage, trois essais, trois aides, corrigé conditionnel et sauvegarde par contrôleur partagé. Aucune 3D ni animation temporelle revendiquée.

## Tests réellement exécutés
- **15/15** références scientifiques min/nominal/max indépendantes et SVG synchronisés.
- **20/20** paramètres invalides rejetés ; **5/5** SVG désynchronisés rejetés ; invariants physiques contrôlés.
- Tests CJS avec adaptateurs V8 sur fichiers réellement enregistrés : **7/7 tests scientifiques et catalogue, 159 assertions PASS**.
- Parcours avec contrôleur réel et DOM simulé : **5/5 PASS, 80 assertions** (saisie invalide, trois essais, aides, corrigé, étoiles, sauvegarde).
- Total ciblé V8 : **12/12 tests, 239 assertions PASS**. Tests Node natifs **BLOCKED/NOT RUN**.
- Catalogue vérifié : **397/397 identifiants uniques**, **17/17 univers**, **249 sous-savoirs explicitement distincts**. 97 missions historiques sans sous-savoir explicite à classifier.

GitHub Actions : statut combiné du SHA avant rapport = `statuses=[]`, recherche de runs exposée limitée aux PR = `[]`. Ancien job tests-node du run 40724501348 en échec avec `steps=null`. Aucun journal de run push ni relance du SHA courant disponible : **CI native BLOCKED**. Ne pas assimiler V8 à Node natif.

## Réception S/G/P/F/A
| Axe | Statut | Limites |
|---|---|---|
| S scientifique | **PASS ciblé** | 15 références ; historique non validé indépendamment de façon exhaustive |
| G graphique | **PASS structurel ciblé** | SVG ; inspection visuelle navigateur **NOT RUN** |
| P pédagogique | **PASS ciblé** | 5 missions et 3 historiques corrigées ; observation élèves **NOT RUN** |
| F fonctionnel | **PASS V8 ciblé ; CI BLOCKED** | DOM simulé ; navigateurs réels **NOT RUN** |
| A accessibilité | **NOT RUN manuel** | NVDA, TalkBack, VoiceOver, zoom 400 % et tactile réel non exécutés |

**Intégré et testé automatiquement de manière ciblée, non réceptionné complètement.** Aucune validation sur appareil réel revendiquée.
