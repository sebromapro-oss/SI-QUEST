# SI QUEST — Audit et création 90–91
Date : 26 octobre 2026. HEAD de base du lot : `b49513c19e403188ed17977bec55abf2068c059b`.

## Audit A — Mission 89
`hydrostatic-column-01` : les prises haute et basse restaient séparées de 101 pixels pour toute hauteur h, même h = 0. Correction : hauteur du schéma calculée, y_bas = 84 + arrondi(100h/6), flèche adaptée, échelle 100 pixels pour 6 m. Test de non-régression à h = 0 ; 2,5 ; 6 m.

## Création B — Deux modèles indépendants
- **Mission 90 :** `natural-frequency-01`, fréquence propre masse–ressort f₀ = √(k/m)/(2π), k = 18 000 N/m, m = 40 kg, **f₀ = 3,376186 Hz**, T₀ ≈ 0,29619 s. Seuil fictif 4 Hz. Oscillation libre illustrative liée à la fréquence.
- **Mission 91 :** `rectangular-tube-inertia-01`, moment quadratique de surface d'un tube 80 × 120 mm, e = 6 mm, **I_z = 4 381 632 mm⁴ = 438,1632 cm⁴**. Seuil fictif 400 cm⁴. Coupe paramétrique à 1,25 px/mm, angles vifs idéalisés.

## Registre S/G/P/F/A
S : contre-calculs indépendants par période et intégration de y²dA, cas limites et invariants (`tests/batch90-91.test.cjs`).
G : SVG synchronisés et correction hydrostatique, inspection visuelle navigateur **non effectuée**.
P : réactivation, aides, trois essais, corrigé conditionnel et décision fictive dans le moteur commun ; essai avec élèves **non effectué**.
F : catalogue, pages et moteurs intégrés ; résultats CI à vérifier après commit.
A : descriptions SVG et labels HTML ; tests NVDA, TalkBack, VoiceOver et zoom réel **non effectués**.
Statut : **codées, réception complète non démontrée**. Aucune publication publique, ZIP, refonte accueil/carte ou changement de visibilité.

## Preuves d'exécution GitHub Actions
Révision de code `7bb19992b54f972d231caa3839254a7f4d745264` : trois workflows **terminés avec succès** le 26 octobre 2026.
- **Recette automatisée SI QUEST**, exécution `40263793395`, job `121381619687` : **554 tests Node exécutés, 554 réussis, 0 échec, 0 ignoré** ; syntaxe JavaScript réussie.
- **Contrôles scientifiques SI QUEST**, exécution `40263793405` : syntaxe, tests scientifiques et contrôle du catalogue réussis.
- **SI QUEST scientific quality**, exécution `40263793483` : vérifications scientifiques et structurelles réussies.
Ces preuves sont automatisées. Aucun test visuel navigateur réel, mobile matériel ou lecteur d'écran n'a été effectué.

## Contre-audit graphique complémentaire
Après le premier contrôle, deux défauts ont été identifiés et **corrigés dans le code** : (1) le tube était dessiné avec des coins arrondis alors que le modèle de section supposait des angles vifs ; le rectangle extérieur utilise désormais des coins géométriquement droits ; (2) le ressort et la masse étaient séparés de 12 pixels ; un segment de liaison explicite les relie. Des assertions SVG spécifiques ont été ajoutées dans `tests/batch90-91.test.cjs`. Révisions de correction : `3a3fd42d65a301c5ef76bbdfb8a975a7234d36a5`, puis `d91704648213569a46f75b99dd014d2a7dec42a1`. Les tests CI de ces révisions sont à vérifier séparément ; la recette visuelle réelle demeure non effectuée.
