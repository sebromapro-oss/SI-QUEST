# SI QUEST — Cycle horaire : création 80–81 et audit correctif

25 octobre 2026. Dépôt privé `sebromapro-oss/SI-QUEST`, branche main. HEAD de départ : `dbdbc3945ddea2828a542d127c601154890eb456`.

## A — Audit et correction des missions existantes
Mission 77 `dc-voltage-drop-01` : schéma 2D des conducteurs aller et retour complété par l'étiquette « Charge » sur le récepteur, afin d'éviter une ambiguïté de lecture entre résistances des conducteurs et charge. Test SVG de non-régression ajouté. La suite existante de contrôles des missions 40–75 est conservée ; elle doit être exécutée par GitHub Actions. Il ne s'agit pas d'une inspection visuelle exhaustive des 36 missions.

**Correction de non-régression supplémentaire :** le test historique des missions 78–79 imposait exactement 79 entrées et faisait échouer les trois workflows après extension à 81. Le test exige désormais au moins 79 missions et vérifie l'unicité sur tout le catalogue. Correctif : `c40f556e2f89227d53ba3182691e75a6b6752e49`.

## B — Missions scientifiques indépendantes
**80 — Accumulateur isotherme (`accumulator-isothermal-01`, SI-06).** Gaz parfait à température constante : p₀ = 80 bar absolus, V₀ = 10,0 L, pH = 200 bar absolus, pB initiale = 120 bar absolus. Loi pV = constante ; VH = 4,000 L ; VB = 6,667 L ; ΔV d'huile restitué = 2,667 L. Domaine 100–180 bar abs. Seuil pédagogique fictif 2,00 L. Une décharge rapide réelle nécessite éventuellement un modèle polytropique et les données constructeur.

**81 — Pont de Wheatstone (`wheatstone-bridge-01`, SI-08).** Ue = 5,00 V, R₁ = R₂ = R₃ = 1 000 Ω, R₄ initiale = 1 100 Ω. Ug = 2,500 V ; Ud = 2,61905 V ; Uout = Ud − Ug = +119,05 mV. À 1 000 Ω : équilibre et 0 mV. À 900 Ω : tension négative. Seuil fictif |Uout| ≤ 100 mV. Deux questions scientifiques nouvelles, distinctes des missions de perte de pression et de chute de tension.

Chaque mission comprend contexte métier, hypothèses, modèle et unités, trois aides et trois essais via moteur commun, corrigé conditionnel, SVG 2D paramétrique, graphique, carnet et décision technique.

## Preuves S/G/P/F/A
- **S** : tests de contre-calculs indépendants, trois jeux par modèle, invariants, signes et cas invalides écrits ; **Exécution confirmée :** trois workflows GitHub Actions terminés avec succès sur le commit `c40f556e2f89227d53ba3182691e75a6b6752e49` (contrôles scientifiques, qualité scientifique, recette Node).
- **G** : génération SVG et unités couvertes par tests ; inspection visuelle sur navigateur non réalisée.
- **P** : contexte, prérequis, corrigés et seuils fictifs documentés ; essai avec élèves non réalisé.
- **F** : 81 entrées de catalogue, DOM attendu, tests Node exécutés avec succès dans les trois workflows GitHub Actions ; navigateur réel non testé.
- **A** : balises et descriptions SVG présentes ; NVDA, TalkBack, VoiceOver, zoom et appareils réels non testés.

Aucune validation globale ne doit être annoncée sans résultats effectifs de CI et de recette visuelle/matérielle. Aucun changement d'accueil, carte, visibilité ou publication.

## Traçabilité de livraison

- Commit création des missions 80–81 et correction SVG 77 : `499de337f29711d0efadd9359ff0d965c86e604e`.
- Commit correction du test de non-régression : `c40f556e2f89227d53ba3182691e75a6b6752e49`.
- Les trois workflows de ce dernier commit ont le statut `success`. Les tests de navigateurs, lecteurs d'écran et matériels restent non réalisés.
