# SI QUEST — correctifs 433–437, 29 octobre 2026
HEAD de départ : `c4a4183e17a790b14175b71181dd35721a76f351`.

P1 S/G corrigée : rendu SVG historique acceptant un résultat désynchronisé. Vérification par le moteur scientifique, test négatif ajouté pour 36 missions × 3 états. Contrôle ciblé prépublication : 9 états valides PASS et 9 désynchronisations rejetées PASS ; la suite complète Node doit être exécutée.

P1 CI corrigée : sept tests anciens imposaient exactement 249 libellés alors que la taxonomie réelle a déjà dépassé cette cible ; le nombre cible 249 reste contrôlé, le comptage réel doit être documenté séparément. Test 428–432 rendu compatible avec l'extension du catalogue.

P2 taxonomie OUVERTE : 249 sous-savoirs cibles, 269 libellés explicites au catalogue 437, réconciliation sémantique nécessaire.

S PASS ciblé ; G PASS structurel, visuel NOT RUN ; P PASS structurel, audit exhaustif NOT RUN ; F PASS V8 ciblé, CI à confirmer ; A NOT RUN (NVDA/TalkBack/VoiceOver et appareils). Accueil protégé, aucune publication publique.

## Contre-audit complémentaire — 0caf39a54c63623daa91d25a685aa544cb6b2f3b
- Les 36 missions historiques 40–75 ont été exécutées en trois lots V8 : **108/108 états calcul/SVG PASS**, **108/108 valeurs SVG volontairement désynchronisées rejetées PASS**, **36/36 séries de questions flash PASS**.
- Cinq autres suites historiques (343–347, 348–352, 368–372, 373–377, 378–382) contenaient la même assertion de taxonomie figée à 249 ; correction des tests sans masquer l'écart réel 269 contre cible 249.
- Nouvelles missions : **6/6 tests unitaires adaptés V8 PASS** et **5/5 parcours DOM simulés PASS** ; cela ne remplace pas Node natif ou les navigateurs.
- **CI BLOCKED** : les trois workflows du SHA `0caf39a54c63623daa91d25a685aa544cb6b2f3b` ont échoué avant toute étape observable ; relance tentée, journaux Node HTTP 404 `BlobNotFound`. Cause non déterminée.
- **G visuel NOT RUN ; A matériel NOT RUN** : aucune validation NVDA, TalkBack, VoiceOver ni smartphone réel.
