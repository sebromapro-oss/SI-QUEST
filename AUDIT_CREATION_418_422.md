# SI QUEST V2.3 — Registre 418–422
Date : 29 octobre 2026. Dépôt privé sebromapro-oss/SI-QUEST, branche main.

## Traçabilité
- SHA initial : 6c026f3a1bded62fe02b8047445fe555f5d8d315
- Fichiers d'accueil protégés, sans modification : index.html (94165cccd6ad972a1a57699d5fcf42afde5cca53); src/home.js (0ead30ab3afe119589f0a14aab99898f0e7721d7); src/style.css (966e623673ce45c86c2cc6a59a4725406475db10); assets/archipelago-cinematic.svg (8d75fd72f75cb662f0d2de1c5a3e1df8ab935347).
- Ne pas annoncer de validation navigateur ou lecteur d'écran sans preuve.

## Production
- 418 — `parallel-pumps-operating-flow-01` : Pompes en parallèle — Débit de fonctionnement. Nominal 51.639778 L/s. Modèle pur, schéma SVG paramétrique, graphe, trois questions flash, trois essais/aides, corrigé et décision fictive.
- 419 — `star-delta-starting-torque-01` : Démarrage étoile-triangle — Couple initial en étoile. Nominal 60.000000 N·m. Modèle pur, schéma SVG paramétrique, graphe, trois questions flash, trois essais/aides, corrigé et décision fictive.
- 420 — `carnot-engine-efficiency-01` : Machine thermique — Rendement maximal de Carnot. Nominal 35.308397 %. Modèle pur, schéma SVG paramétrique, graphe, trois questions flash, trois essais/aides, corrigé et décision fictive.
- 421 — `sensor-thermal-offset-01` : Capteur — Dérive thermique de l'offset. Nominal 2.800000 mV. Modèle pur, schéma SVG paramétrique, graphe, trois questions flash, trois essais/aides, corrigé et décision fictive.
- 422 — `pontoon-metacentric-height-01` : Ponton rectangulaire — Hauteur métacentrique initiale. Nominal 0.416667 m. Modèle pur, schéma SVG paramétrique, graphe, trois questions flash, trois essais/aides, corrigé et décision fictive.

## Audit historique
- Périmètre historique : 36 missions 40–75, contrôle numérique/SVG/domaine via tests de non-régression existants.
- P2 : `gear-ratio-02`, axe du graphe identifié « dents » et situation métier explicitée.
- P2 : `rolling-torque-01`, question flash recadrée sur la portée du modèle de couple équivalent et contexte métier précisé.
- Tests historiques complets et CI : à vérifier sur le commit distant ; aucune preuve d'exécution native avant publication.

## Réception
- S : contre-calculs indépendants 3 états par mission, domaines et invariants prévus dans tests/batch418-422.test.cjs.
- G : géométrie SVG paramétrique et synchronisation testables ; recette visuelle réelle NOT RUN.
- P : objectifs, prérequis, questions flash, tolérances, décision fictive, corrigés détaillés.
- F : parcours DOM simulés testables ; CI GitHub Actions à contrôler.
- A : tests NVDA/TalkBack/VoiceOver et appareils réels NOT RUN.
- La création et les tests automatisés ne constituent pas une réception complète.

## Résultats exécutés — contre-audit du 29 octobre 2026
- Révision de code contrôlée : `cf0efb05adadaca93dc983e5d2fd50e1a77f3dc9` (le présent registre constitue un commit ultérieur).
- **PASS scientifique ciblé** : 15 contre-calculs indépendants (3 états × 5), 15 SVG sans valeurs non finies, 15 synchronisations géométriques, 20 rejets de paramètres hors domaine et 5 rejets de SVG désynchronisés. Total 75 vérifications ciblées dans un moteur JavaScript V8 isolé avec adaptateurs, non Node natif.
- **PASS DOM simulé** : 5/5 parcours avec le contrôleur réel, incluant saisie invalide, trois essais, aides, corrigé conditionnel, réussite, étoiles et stockage simulé. Les adaptateurs de fonctions de base ne prouvent pas une exécution navigateur.
- **PASS historique ciblé** : 36/36 pages vérifiées, 108/108 résultats numériques finis, 108/108 SVG sans NaN/Infinity, 72/72 rejets NaN/Infinity, 36/36 séries de trois questions flash. Les tests historiques ne sont pas des contre-calculs scientifiques indépendants exhaustifs.
- **P1 graphique corrigée après contre-audit** : affichage de la hauteur de réseau des pompes initialement calculé avec le coefficient nominal constant, désormais calculé avec le coefficient `k_r` du curseur : `H=k_r Q²`.
- **BLOCKED CI native** : quatre workflows du premier commit de production en échec avec étapes vides ; trois workflows du commit correctif ont échoué également, puis leurs secondes tentatives ont échoué. Aucun journal de test exploitable ; téléchargement du journal d'un job : HTTP 404 `BlobNotFound`. Il est impossible d'attribuer ces échecs au code ou d'affirmer que les tests Node ont été exécutés.
- **NOT RUN** : inspection visuelle individuelle navigateur, tests matériels Android/iPhone/Windows/Mac, NVDA, TalkBack, VoiceOver, zoom réel.
- **P2 ouvert — taxonomie** : catalogue vérifié par évaluation du module JavaScript : **422 identifiants uniques**, **17 univers**, **254 sous-savoirs explicites distincts**, **97 entrées historiques sans sous-savoir explicite**. L'objectif contractuel reste **249 sous-savoirs**. Les cinq nouveaux modèles ont reçu des libellés scientifiques précis ; la réconciliation de la taxonomie doit éviter tout rattachement scientifiquement faux. Les 422 entrées ne sont pas 422 missions reçues complètement.
- **Protection vérifiée** : `index.html`, `src/home.js`, `src/style.css`, `assets/archipelago-cinematic.svg` ont conservé les blob SHA de départ. Aucune refonte de l'accueil/carte, aucune publication GitHub Pages, aucun ZIP.
### Statuts S/G/P/F/A
| Axe | Statut | Preuve et réserve |
|---|---|---|
| S | PASS ciblé | 15 contre-calculs indépendants, 20 entrées invalides rejetées, 36 historiques contrôlées structurellement |
| G | PASS structurel ; NOT RUN visuel | SVG synchronisés, correction de la hauteur des pompes ; pas de capture navigateur |
| P | PASS ciblé | Trois questions flash, corrigés détaillés, trois essais/aides, décisions fictives ; pas d'essai en classe |
| F | PASS DOM simulé ; BLOCKED CI | 5 parcours simulés et sauvegardes ; workflows natifs sans étapes |
| A | NOT RUN | Aucun test matériel ni lecteur d'écran attesté |
