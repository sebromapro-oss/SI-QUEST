# SI QUEST — Recette provisoire missions 40 à 59

Date : 25 octobre 2026. Référence : [Cahier des charges maître](CAHIER_DES_CHARGES_MAITRE.md).

**Livraison de code : 20 nouvelles pages, 20 fonctions de calcul, 20 vues SVG 2D de principe, 20 profils pédagogiques et tests de référence.** Ceci ne vaut pas validation. Les vues sont des **schémas de principe** et non une preuve de fidélité physique ou des scènes 3D.

| Mission | Modèle | Schéma | Pédagogie | Navigateur | Appareils et accessibilité | Décision |
|---|---|---|---|---|---|---|
| [circular-02](missions/circular-02.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [angular-accel-01](missions/angular-accel-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [brake-torque-01](missions/brake-torque-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [incline-force-01](missions/incline-force-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [resultant-01](missions/resultant-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [torsion-01](missions/torsion-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [axial-strain-01](missions/axial-strain-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [gear-mesh-01](missions/gear-mesh-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [belt-speed-01](missions/belt-speed-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [hydro-power-01](missions/hydro-power-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [hydro-volume-01](missions/hydro-volume-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [pneumatic-force-01](missions/pneumatic-force-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [electric-power-02](missions/electric-power-02.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [joule-heat-01](missions/joule-heat-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [rc-time-01](missions/rc-time-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [sampling-01](missions/sampling-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [efficiency-chain-01](missions/efficiency-chain-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [rolling-load-01](missions/rolling-load-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [heat-transfer-01](missions/heat-transfer-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |
| [measurement-relative-01](missions/measurement-relative-01.html) | Code créé, tests à exécuter | 2D de principe, à corriger/recetter | À vérifier | Non vérifié | Non testé | Non validée |

## Non-conformités bloquantes connues

1. Les vues SVG 2D produites pour ce lot sont des schémas de principe et ne démontrent pas encore la fidélité des liaisons, vecteurs, dimensions, cinématiques et courbes ; certaines réutilisent des formes génériques.
2. Aucune vraie scène 3D manipulable n'a été produite pour ce lot. Ne pas afficher « 3D » dans l'interface de ces missions.
3. Le contrôleur commun utilise encore une tolérance numérique générique ; implémenter une tolérance par question, justifiée par la précision et les unités.
4. Vérifier le fonctionnement des trois essais, des trois aides, du corrigé conditionnel, des étoiles et de la sauvegarde en parcours élève complet.
5. Les profils métier doivent être approfondis pour chaque mission ; les décisions sont actuellement trop génériques.
6. Les tests numériques et SVG ont été **écrits**, mais leur exécution indépendante et la recette sur navigateur/appareils ne sont pas confirmées.

## Prochaine porte de validation

Exécuter `node --test tests/*.test.cjs` et le workflow GitHub Actions, corriger tous les échecs, puis inspecter individuellement les 20 scènes et les parcours de réponse. Conserver les preuves par appareil et révision. **Ne pas compter ces 20 missions comme validées avant fermeture des anomalies.**
