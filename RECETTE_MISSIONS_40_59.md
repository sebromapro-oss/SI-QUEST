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

## Constats initiaux avant correctifs (historique, remplacés par le bilan ci-dessous)

1. Les vues SVG 2D produites pour ce lot sont des schémas de principe et ne démontrent pas encore la fidélité des liaisons, vecteurs, dimensions, cinématiques et courbes ; certaines réutilisent des formes génériques.
2. Aucune vraie scène 3D manipulable n'a été produite pour ce lot. Ne pas afficher « 3D » dans l'interface de ces missions.
3. Le contrôleur commun utilise encore une tolérance numérique générique ; implémenter une tolérance par question, justifiée par la précision et les unités.
4. Vérifier le fonctionnement des trois essais, des trois aides, du corrigé conditionnel, des étoiles et de la sauvegarde en parcours élève complet.
5. Les profils métier doivent être approfondis pour chaque mission ; les décisions sont actuellement trop génériques.
6. Les tests numériques et SVG ont été **écrits**, mais leur exécution indépendante et la recette sur navigateur/appareils ne sont pas confirmées.

## Prochaine porte de validation

Exécuter `node --test tests/*.test.cjs` et le workflow GitHub Actions, corriger tous les échecs, puis inspecter individuellement les 20 scènes et les parcours de réponse. Conserver les preuves par appareil et révision. **Ne pas compter ces 20 missions comme validées avant fermeture des anomalies.**

## Correctifs intégrés après création

- Tolérance relative par question configurable et précision de secours resserrée ; les valeurs doivent encore être spécifiées scientifiquement pour chaque mission.
- Une entrée non numérique ne consomme plus d'essai ; le corrigé devient disponible après trois essais sans clic obligatoire sur les trois indices.
- Les 20 schémas SVG disposent désormais de géométries différenciées par phénomène. Ils restent des **schémas 2D non recettés**, et certains paramètres ne gouvernent pas encore une animation physique complète.
- **Aucune scène 3D manipulable créée dans ce correctif** ; ne pas annoncer de 3D validée.
- Tests exécutés en environnement Node, contrôles visuels navigateur, tests appareils et lecteurs d'écran : **non démontrés** à la date de cette note. Le statut reste **non validé**.

## Mise à jour — scènes 3D interactives

Le module `src/scene3d.js` projette des géométries définies par des coordonnées **3D** et permet de modifier les angles de caméra dans **7 missions** : circular-02, angular-accel-01, brake-torque-01, torsion-01, gear-mesh-01, belt-speed-01, rolling-load-01. Le rendu SVG projeté ne constitue pas une preuve de géométrie CAO fidèle ou de cinématique complète. Les 13 autres missions conservent une représentation 2D, ce qui peut être suffisant selon le savoir étudié.

Le fichier `tests/scene3d.test.cjs` vérifie par code les projections et le changement de caméra. **Aucun résultat d'exécution ni test matériel n'a encore été recueilli** ; les 20 missions restent non validées.

## Bilan de réception intermédiaire — 25 octobre 2026, après correctifs

**Périmètre : missions 40–59 uniquement. Aucune mission nouvelle ajoutée.**
Les assertions ci-dessous ont été **exécutées dans un moteur JavaScript V8 isolé avec fichiers lus depuis GitHub**. Elles ne sont **ni des exécutions Node**, ni des essais navigateur, ni une inspection visuelle réelle.

| Axe | Preuve réellement exécutée | Résultat | Limite de la preuve |
|---|---|---|---|
| **S — Scientifique** | 60 références indépendantes (3 paramètres × 20 modèles), contrôles de tolérance, domaine et saisie française | Contrôles V8 réussis | Pas de confrontation expérimentale/constructeur ni de mesure d'incertitude réelle |
| **G — Graphique** | 20 rendus SVG vérifiés en V8 ; 12 schémas corrigés ; 7 scènes spatiales paramétriques, contrôles de caméra, zoom, temps et rapports géométriques | Contrôles de code réussis | Aucun contrôle visuel navigateur ; schémas et scènes restent simplifiés, sans CAO ni denture involute |
| **P — Pédagogique** | 42 tests de parcours DOM simulé sur les 20 missions : 3 essais, aides, corrigé, étoiles 3/2/1/0, réinitialisation, progression locale et commande 3D | Contrôles V8 réussis | Un DOM simulé ne prouve pas le comportement d'un navigateur réel |
| **F — Fonctionnel** | Analyse syntaxique V8 des modules modifiés ; tests reproductibles ajoutés dans `tests/acceptance-40-59.test.cjs` et `tests/mission-flow-40-59.test.cjs` | Sources et tests intégrés | **`node --test` et statut GitHub Actions non confirmés** ; recette HTTP/PWA absente |
| **A — Accessibilité** | Présence de commandes HTML natives, titres SVG, alternatives textuelles, statut de réussite, animation volontaire et réduction des mouvements | Revue de code partielle | **Aucun test manuel NVDA, TalkBack, VoiceOver, clavier réel, zoom 400 % ou WCAG complet** |

### Défauts reproduits et corrigés

- **Blocage de chargement de `gear-mesh-01`** : le graphique échantillonnait des nombres de dents fractionnaires, rejetés par le moteur. Échantillonnage entier et curseur à pas de 1 dent ; parcours DOM simulé retesté.
- **Précision mathématique incorrecte** : la déformation `0,000500` était présentée à trois décimales, rendant le corrigé inutilisable. Précision et tolérance spécifiques à chaque question, affichage et correction détaillée.
- **Axes des 20 graphiques erronés** : l'abscisse était libellée « m » quelle que soit la grandeur. Les unités des axes sont désormais propres à chaque mission.
- **Schémas scientifiquement incohérents** : entraxe et rayons primitifs, plan incliné, directions des actions de contact, circuits électriques, signal échantillonné et flèche de déformation corrigés dans le code SVG.
- **Scènes spatiales initialement décoratives** : rapports d'engrenages et entraxes désormais calculés, rotation liée au temps simulé lorsque les données la justifient ; scènes statiques conservées lorsque la cinématique n'est pas déterminable.
- **Parcours de réponse** : trois essais maximum, saisie invalide sans pénalité, aides visibles au troisième échec, corrigé sans attribution d'étoiles, verrouillage après réussite et sauvegarde versionnée.

### Réserves et décision

Les 20 missions sont **intégrées et testées partiellement en V8**, mais **aucune des 20 ne reçoit encore le statut VALIDÉ**. Les vérifications obligatoires non exécutées sont : suite Node sur le dernier commit, contrôle visuel réel de chaque mission sur ordinateur et téléphone, inspection des liaisons/vecteurs/graphes par discipline, vérification du comportement au clavier et au tactile dans un navigateur, essais manuels d'accessibilité et preuves par route. Les 13 missions sans scène 3D restent en 2D lorsque leur modèle le justifie.

**Porte de passage à la production 60+ : fermée.** Corriger les échecs des tests réels, puis seulement réévaluer l'autorisation de poursuivre la création.
