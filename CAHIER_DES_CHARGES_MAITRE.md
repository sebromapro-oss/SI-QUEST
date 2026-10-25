# SI QUEST — Cahier des charges maître
**Version 2.1 — 25 octobre 2026 — Référence contractuelle permanente jusqu'à la mission 996**

> Statut : exigences cibles. Une exigence écrite ne vaut pas preuve d'implémentation. Ce document complète `EXIGENCES.md`, `PRODUCTION.md` et `RECETTE_PEDAGOGIQUE_39.md`. En cas de contradiction, les règles scientifiques et de sécurité priment.

## 1. Finalité, périmètre et principes non négociables

Plateforme ludique **universelle des savoirs de sciences industrielles**, sans classement de ses univers en CAP/Bac Pro/BTS. Objectif à terme : **17 univers, 249 sous-savoirs, 996 missions scientifiquement indépendantes** ; ces nombres sont des cibles, non des réalisations. À la date du document : **39 entrées au catalogue, sans réception globale démontrée**. Prochain lot demandé : missions 40 à 59, **20 missions nouvelles**, non de simples changements de paramètres.

Diffusion et développement **gratuits** (HTML, CSS, JavaScript statiques, GitHub privé) ; aucun hébergement, service ou abonnement payant imposé. **Ne jamais rendre public le dépôt, activer GitHub Pages, modifier la carte ou refondre l'accueil sans autorisation.** Conserver la branche d'archive `archive/pre-reconstruction-cycle28-20261025`. Commits directs traçables sur `main` ; pas de ZIP comme mode de livraison principal.

Supports : téléphones Android et iPhone, tablettes, PC Windows et Mac, au clavier, souris et tactile. Application utilisable en orientation portrait et paysage. Textes et libellés visibles **exclusivement en français** ; symboles SI normalisés admis. Code et noms techniques internes peuvent être en anglais.

## 2. Identité graphique : niveau de finition de la maquette de référence

La maquette validée par l'utilisateur constitue une **référence d'ambition visuelle**, pas une preuve de réalisation : esthétique contemporaine de jeu scientifique, illustrations techniques précises, composants reconnaissables, contraste net, badges et progression réellement fonctionnels, animations fluides, mise en page aérée.

Chaque mission comporte : bandeau univers et sous-savoir, situation métier, objectif et critères, **scène scientifique principale**, commandes d'investigation, panneau de calcul, aides progressives, essais, corrigé conditionnel, animation de réussite, étoiles, carnet d'essais, conclusion métier et bouton de retour. La scène scientifique occupe une place centrale, sans masquer les données ou les actions.

Éléments graphiques : traits nets, vecteurs avec origine et pointe correctes, codage couleur constant par grandeur, axes et unités explicites, légendes visibles et non superposées, contrastes compatibles WCAG, affichage net sur écran haute densité. Les objets et matériaux doivent être reconnaissables, sans décor faux scientifiquement. Les graphiques ne doivent pas être de simples courbes décoratives.

**Ne pas utiliser d'images génératives comme schémas physiques de référence.** Les scènes sont réalisées à partir de géométries vectorielles paramétriques, CAO fiable ou documents constructeurs autorisés, avec vérification indépendante de la physique.

## 3. Contrat scientifique obligatoire par mission

Fiche de modèle : identifiant, univers, sous-savoir, **question scientifique distincte**, contexte professionnel plausible, système isolé, schéma d'ensemble, hypothèses, référentiel, données et incertitudes, domaine de validité, grandeurs SI, signes et repères, équations justifiées, unités à chaque étape, résultats de référence, limites, erreurs typiques et décision technique.

**Chaîne pédagogique :** observer → formuler une hypothèse → choisir le modèle → calculer avec unités → vérifier la cohérence dimensionnelle et physique → faire varier les paramètres → comparer → décider et justifier.

Calculs séparés du rendu ; moteur déterministe et testable sans navigateur. Pas de résultat impossible, NaN, infini ou division par zéro. Contrôler les contraintes du modèle : rendement dans [0,1], géométries positives, domaine des racines, pression absolue/manométrique distinguée, signe des efforts, frottement statique mobilisé versus limite, conservation des énergies et des débits quand applicable. **Un coefficient de frottement n'est pas arbitrairement limité à 1.**

Au moins **trois jeux de données indépendants** par modèle (dont une valeur usuelle, une limite et un cas atypique), un cas invalide et un test de propriété ou conservation. Les résultats attendus sont calculés indépendamment du code testé. Ne jamais considérer comme « nouvelle mission » une simple variante de constantes ou un habillage de même question.

## 4. Tolérance des réponses et évaluation mathématique

La tolérance doit être **définie pour chaque question** : valeur de référence, unité, précision des données, chiffres significatifs, arrondi attendu, erreur absolue et/ou relative admissible. Critère par défaut seulement si validé pour la grandeur : `|réponse − référence| ≤ max(tolérance_absolue, tolérance_relative × |référence|)`. **Ne pas imposer une tolérance universelle de 1 % ou de 0,02 unité** : elle est souvent injustifiée pour de faibles valeurs, des angles, des unités très petites ou des calculs en plusieurs étapes.

Accepter virgule ou point décimal et espaces de milliers lorsque non ambigus. Rejeter saisies vides, NaN, infini, unités incohérentes, valeurs hors domaine et formats trompeurs, avec message explicatif. Ne pas arrondir les intermédiaires avant le calcul final ; expliquer la précision du résultat. Les réponses équivalentes par conversion d'unités peuvent être acceptées si l'interface autorise explicitement le choix d'unité. Contrôler la comparaison aux bornes exactes de tolérance et aux cas juste hors tolérance.

## 5. Trois essais, trois aides et corrigé conditionnel

**État initial :** réponse et résultat masqués ; schéma non révélateur ; premier essai disponible ; trois aides accessibles dans l'ordre. Chaque essai **valide** (nombre bien formé) consomme une tentative ; une saisie invalide ne doit pas consommer d'essai. Une bonne réponse déclenche immédiatement réussite, déverrouillage de l'investigation et récompense ; les tentatives suivantes ne sont plus nécessaires.

**Essai 1 erroné :** message diagnostique non révélateur, invitation à l'aide 1 (grandeurs et unités). **Essai 2 erroné :** aide 2 (choix de la loi et sens physique, sans résultat numérique). **Essai 3 erroné :** aide 3 (substitution structurée, sans révéler le résultat), puis bouton de corrigé. Le corrigé est accessible **après épuisement des trois essais et mise à disposition des trois aides** ; il doit rester accessible à l'élève bloqué, sans obligation de cliquer trois fois sur les aides. Les aides sont utilisables plus tôt si nécessaire, sans pénalité arbitraire.

Corrigé : étapes, unités, conversions, hypothèses, arrondi, validation physique, erreurs fréquentes et remédiation. Sa consultation permet l'exploration mais **ne vaut pas réussite du calcul**. Après échec, proposer une nouvelle situation indépendante ou une réinitialisation explicite ; ne pas supprimer silencieusement les traces.

## 6. Animation de réussite, étoiles et progression

À réussite réelle : scène animée scientifiquement cohérente et mouvement gratifiant **distinct**, discret et non bloquant ; annonce textuelle accessible ; possibilité de passer l'animation ; respect de `prefers-reduced-motion`. L'animation de réussite ne remplace pas l'animation scientifique. Aucun résultat ou réponse révélé prématurément.

**Barème cible :** 3 étoiles si réussite au premier essai ; 2 au deuxième ; 1 au troisième ; 0 si corrigé consulté sans réussite. Le nombre d'aides utilisées est affiché séparément et ne retire pas d'étoiles sans règle annoncée. Ne pas attribuer d'étoiles sur la simple consultation du corrigé, la modification d'un curseur ou une réponse juste non vérifiée.

Sauvegarder localement, par mission et version de modèle : tentatives, aides consultées, meilleure performance, étoiles, missions débloquées, carnet d'essais et date ; proposer export/import de progression et suppression des données. Prévenir de la volatilité du stockage local et éviter les données nominatives obligatoires. L'élève ne peut pas changer sa classe ou ses permissions par simple manipulation de l'interface si une gestion de classe est ajoutée.

## 7. Visualisations physiques 2D et 3D

**2D :** SVG paramétrique lié au modèle ; géométrie, connexions et liaisons mécaniques exactes, dimensions pertinentes, forces appliquées aux bons points, sens et signe corrects, axes, repères, échelles, déformations, états et courbes synchronisés. Toute amplification visuelle doit être indiquée. Les fils électriques respectent réellement le schéma du circuit ; aucune connexion parasite ou court-circuit graphique.

**3D :** lorsque la mission requiert une compréhension spatiale, vraie scène tridimensionnelle manipulable (géométrie 3D, profondeur, caméra, rotation/orbite, zoom accessible et équivalent 2D/textuel). Une image en perspective, une ombre ou une rotation CSS **n'est pas une simulation 3D**. Ne jamais annoncer « 3D » si le moteur n'existe pas ; une mission strictement plane peut être 2D seulement si cela suffit scientifiquement.

**Animation :** temps simulé, paramètres et résultats partagent une même source de vérité ; positions, vitesses, accélérations, forces, contraintes, jauges et courbes sont cohérentes à chaque image. Boutons lire/pause/reprendre/remettre à zéro, réglage de vitesse, pas à pas si pertinent, légende des vecteurs, état textuel. La variation des données doit mettre à jour toutes les vues sans incohérence ni saut non physique. Cas limites visuels : pente ±, blocage, inversion du sens, contre-pression, butée, jeu, effort nul selon le sujet.

**Performance :** dégradation progressive sur mobile, contrôle des ressources, animations non bloquantes ; pas de chargement de moteur 3D lourd pour une mission 2D. Les bibliothèques utilisées doivent rester compatibles avec l'hébergement statique gratuit et la politique de confidentialité.

## 8. Investigation, professionnalisation et différenciation

Chaque mission propose une **décision métier argumentée** à partir d'une comparaison à un critère donné et contextualisé : choisir un réglage, vérifier un dimensionnement, identifier une anomalie ou décider d'une mesure complémentaire. La conformité pédagogique simulée est **distincte** de l'autorisation d'intervenir sur un équipement réel ; tout seuil inventé est indiqué comme fictif. Prévoir des scénarios de maintenance, de mesure et de diagnostic plausibles.

Les niveaux portent sur des savoirs SI généraux, avec difficultés progressives et aides adaptatives, sans imposer une étiquette CAP/Bac Pro/BTS à l'univers. Le professeur peut choisir une mission et consulter son corrigé ; les réponses et seuils ne doivent pas être exposés dans la vue élève avant déverrouillage. Une application statique ne garantit pas le secret absolu d'un corrigé présent dans son code : **ne jamais présenter un masquage JavaScript comme une sécurité serveur**.

## 9. Inclusion et accessibilité

Objectif **WCAG 2.2 AA / RGAA 4.1.2** avec preuve, sans déclaration de conformité anticipée. Structure sémantique, titres, libellés, contrastes, focus, parcours clavier complet, absence de piège, annonces accessibles, descriptions alternatives des schémas, tableaux de valeurs accessibles, contrôle des animations, zoom 200 % et 400 %, cibles tactiles suffisamment grandes. DYS : typographie lisible, consignes courtes, étapes numérotées, absence de pression temporelle, personnalisation de l'affichage ; assistance audio seulement si accessible et utile.

Tests manuels **NVDA sous Windows, TalkBack sous Android et VoiceOver sur appareil Apple** ; les simulations et audits automatiques ne s'y substituent pas. Documenter navigateur, appareil, version, parcours, preuve et anomalies. Compatibilité Windows/Mac/iPhone/Android et portrait/paysage démontrée sur matériel, non supposée.

## 10. Recette indépendante et statuts

**Par mission**, produire les cinq preuves distinctes : S = exactitude scientifique (unités, invariants, cas limites), G = fidélité graphique (2D/3D et synchronisation), P = pédagogie (trois essais/aides, calcul, correction, décision), F = fonctionnement (DOM, navigation, persistance, performance), A = accessibilité (automatique et manuelle). Pour chaque preuve : identifiant, date, révision Git, environnement, scénario, résultat attendu/obtenu, capture ou journal, anomalie, correction et contre-essai.

États stricts : **Prévue → Codée → Testée automatiquement → Recettée visuellement → Recettée sur appareils → Validée**. Une mission peut être « À corriger » à toute étape. Une mission n'est « Validée » que si toutes les preuves applicables sont satisfaites et les défauts bloquants fermés. Les 39 missions présentes au catalogue ne sont **pas** automatiquement validées. Les tests CI doivent bloquer l'acceptation d'un lot en cas d'échec ; ne pas prétendre à une recette matérielle sans l'avoir réalisée.

Exécuter : vérification syntaxique, tests unitaires indépendants, tests de propriétés et tolérances, tests d'interaction des trois essais et aides, non-révélation des réponses, contrôle des SVG et animations, tests visuels multi-écrans, contrôles d'accessibilité, vérification du catalogue et des liens. Les scénarios doivent être reproductibles.

## 11. Priorités et production des missions 40 à 59

1. **Stabiliser les 39 missions existantes** et corriger les erreurs scientifiques, graphiques et de parcours détectées ; conserver le registre des non-conformités.
2. Définir pour les missions 40–59 **20 questions et modèles réellement distincts**, une fiche scientifique et une fiche de recette par mission ; vérifier l'absence de doublons avec les 39.
3. Développer le moteur commun (tolérance par question, trois essais/aides, corrigé, étoiles, animation de réussite, persistance), puis les scènes propres à chaque modèle.
4. Produire les représentations 2D exactes ; ajouter des scènes 3D **uniquement** lorsqu'elles sont nécessaires et réellement implémentées.
5. Exécuter et archiver les tests ; corriger avant publication des commits ; ne déclarer « livré » que le code effectivement poussé, « validé » que la mission effectivement recettée.

**Règle de cadence :** viser 20 missions pour le prochain lot demandé, mais **ne jamais sacrifier l'indépendance scientifique, l'accessibilité ou les preuves pour atteindre le nombre**. Une mission incomplète est déclarée incomplète, jamais comptée comme validée.

## 12. Contrôle des changements

Chaque modification indique : exigence liée, fichiers, raison, risque de régression, tests exécutés, résultats, SHA et limites. Aucune suppression de missions, publication publique ou changement d'architecture majeur sans justification et autorisation. Ce cahier des charges doit être relu après chaque lot et les écarts enregistrés dans le registre de recette.

## 13. Applicabilité jusqu'à la mission 996

**Ce cahier des charges s'applique sans exception à toutes les missions 1 à 996**, aux moteurs mutualisés et à toutes les révisions ultérieures. Les missions 40 à 59 constituent uniquement le prochain lot de production, non une limite d'application. Les missions existantes doivent être remises en conformité progressivement, avec preuves conservées.

Chaque nouveau lot doit : (1) partir du HEAD GitHub réel ; (2) vérifier les régressions et les défauts ouverts ; (3) créer des missions scientifiquement indépendantes ; (4) satisfaire les mêmes exigences de tolérance, trois essais, trois aides, corrigé conditionnel, animation, étoiles, 2D/3D selon pertinence, accessibilité ; (5) exécuter les contrôles disponibles ; (6) consigner le nombre **créé**, **testé** et **validé** séparément ; (7) publier uniquement sur le dépôt privé et conserver l'historique.

Aucune cadence, même horaire, n'autorise à déclarer une mission validée sans les preuves exigées. Les améliorations du cahier des charges s'appliquent rétroactivement aux missions déjà créées et sont versionnées. **L'achèvement du projet exige 996 missions indépendantes reçues**, pas 996 liens au catalogue.
