# SI QUEST — Chaîne de production et registre de preuves

## Principe
Objectif : 17 univers, 249 sous-savoirs, 996 missions indépendantes. Une page, un identifiant, un problème professionnel et un modèle contrôlable par mission. Les missions non développées ne sont pas comptées.

## Chaîne de travail
1. **Architecte scientifique** : rattacher le savoir au modèle physique, définir les grandeurs, unités, signes, domaines et hypothèses.
2. **Ingénieur métier** : construire un problème crédible, un cahier des charges, des contraintes et une décision technique.
3. **Concepteur pédagogique** : réactivation, calcul guidé, investigation, indices gradués, corrigé et remédiation.
4. **Développeur simulation** : modèle pur séparé de l'interface, vecteurs/positions/graphes synchronisés, alternative textuelle.
5. **Auditeur accessibilité** : clavier, tactile, focus, contraste, zoom, réduction du mouvement et compatibilité lecteurs d'écran.
6. **Testeur indépendant** : résultats de référence calculés séparément, valeurs limites, non-régression, DOM et visuel.
7. **Intégrateur** : contrôle des liens et du catalogue, vérification des fichiers, commit GitHub et compte rendu des preuves.

Ces rôles sont des **étapes de contrôle**, pas une affirmation que sept agents autonomes exécutent réellement le travail.

## Critères de sortie par mission
- [ ] Identifiant et sous-savoir distincts, sans doublon
- [ ] Situation professionnelle, objectifs, unités et hypothèses explicites
- [ ] Modèle scientifique pur avec contrôle du domaine
- [ ] Au moins un résultat de référence indépendant et un cas limite
- [ ] Calcul de l'élève évalué sans dépendre de la décision de sécurité
- [ ] Investigation avec paramètres modifiables, décision métier et remédiation
- [ ] Animation liée aux résultats, ou justification explicite de l'absence de mouvement
- [ ] Équivalent textuel des états et des grandeurs
- [ ] Clavier, focus visible, zoom et réduction des animations
- [ ] Tests unitaires et d'interaction exécutés
- [ ] Vérification visuelle mobile et ordinateur exécutée
- [ ] Tests manuels NVDA, TalkBack et VoiceOver documentés
- [ ] Fichiers intégrés, liens vérifiés, commit tracé

## Niveaux de preuve
**Créé** : code et fichiers enregistrés.
**Testé automatiquement** : commandes, résultats et révision identifiés.
**Contrôlé visuellement** : captures/inspection à une résolution et un navigateur précis.
**Contrôlé sur appareil** : appareil, OS, navigateur et scénario précisés.
**Validé** : critères applicables satisfaits, anomalies bloquantes closes.

Ne jamais transformer un test non exécuté en validation. En cas d'échec, conserver l'état « à corriger ».

## Lots
Produire en petits lots par famille de modèles mutualisés. Une mission ne peut entrer au catalogue que si son HTML, son contrôleur et son modèle existent. Ne pas modifier l'accueil ou la carte pendant les lots scientifiques.

## Registre initial au 25 octobre 2026
| Mission | Intégration | Tests automatisés sur dernier commit | Recette navigateur | Tests matériels |
|---|---|---|---|---|
| gear-01 | Créée | À vérifier | À vérifier | À faire |
| hydro-01 | Créée | À vérifier | À vérifier | À faire |
| slope-01 | Créée | À vérifier | À vérifier | À faire |
| electric-01 | Créée | À vérifier | À vérifier | À faire |
| braking-01 | Créée | À vérifier | À vérifier | À faire |
| rolling-01 | Créée | À vérifier | À vérifier | À faire |

Ce registre doit être actualisé **à partir des résultats réellement exécutés** et non des déclarations d'avancement.
