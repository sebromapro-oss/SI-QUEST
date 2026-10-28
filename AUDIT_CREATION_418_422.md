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
