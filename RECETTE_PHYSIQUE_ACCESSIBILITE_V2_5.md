# SI QUEST V2.5 — Protocole de réception matérielle et accessibilité

**Statut au 31 octobre 2026 : protocole préparé, exécution physique NON RÉALISÉE.** Ce document ne vaut ni certification RGAA ni validation par lecteur d'écran. Le succès de Chromium émulé et des tests Node ne remplace pas les contrôles ci-dessous.

## Objet et traçabilité

Périmètre : accueil utilisateur préservé, carte des 17 univers, navigation, missions existantes (597), moteur d'investigation, essais/aides, graphismes 2D/3D et sauvegarde locale. Pour chaque anomalie, conserver : SHA `main`, identifiant mission, navigateur/OS/version, appareil réel ou machine virtuelle, étapes reproductibles, capture/vidéo, résultat attendu/obtenu, gravité, correction et contre-recette.

| ID | Configuration physique à réceptionner | Statut |
|---|---|---|
| MAT-01 | PC Windows, Chrome stable, clavier seul, zoom 100/200/400 % | Non réalisé |
| MAT-02 | PC Windows, Firefox stable, clavier seul, zoom 100/200/400 % | Non réalisé |
| MAT-03 | PC Windows, NVDA + Firefox, lecture et formulaires | Non réalisé |
| MAT-04 | PC Windows, NVDA + Chrome, lecture et formulaires | Non réalisé |
| MAT-05 | Smartphone Android physique, Chrome, portrait/paysage | Non réalisé |
| MAT-06 | Smartphone Android physique, TalkBack + Chrome | Non réalisé |
| MAT-07 | iPhone physique, Safari, portrait/paysage | Non réalisé |
| MAT-08 | iPhone physique, VoiceOver + Safari | Non réalisé |
| MAT-09 | macOS, Safari + VoiceOver, clavier seul | Non réalisé |

## Scénario fonctionnel à reproduire sur chaque configuration

1. Ouvrir l'accueil et atteindre les 17 univers sans souris ; activer un univers et une mission, puis revenir à l'accueil sans perte de contexte.
2. Contrôler titre, langue FR, ordre de lecture, lien d'évitement, hiérarchie des titres, libellés de champs, unités, prérequis, objectifs et consignes. Les figures doivent avoir une alternative pertinente et non un simple titre décoratif.
3. Répondre volontairement faux. Le message d'erreur doit être perceptible, le focus doit rester prévisible et la simulation doit devenir exploratoire sans dévoiler de résultat chiffré ni le corrigé.
4. Vérifier le déplacement du paramètre au clavier et au toucher ; annoncer les bornes et unités. Contrôler l'absence de valeur hors domaine, NaN, infini ou blocage. Vérifier Start/Stop/pause sur les scènes animées si ces commandes sont présentes.
5. Effectuer trois erreurs et consulter les trois aides. Le corrigé doit rester masqué avant les deux conditions, puis être accessible. Les messages et changements d'état doivent être annoncés par le lecteur d'écran.
6. Réinitialiser, recommencer et fournir une réponse juste. Vérifier la progression, les messages, les badges et les limites de la sauvegarde locale. Aucun état local ne doit être présenté comme une preuve de compétence authentifiée.
7. Tester l'agrandissement du texte, le retour à la ligne, les zones de saisie, les boutons, les graphiques, l'orientation et la réduction des animations. Aucun contrôle indispensable ne doit devenir inaccessible.

## Critères WCAG 2.2 AA / RGAA à vérifier

| Famille | Critère de réception |
|---|---|
| Clavier et focus | Aucun piège au clavier ; ordre logique ; focus visible et non masqué ; activation par Entrée/Espace selon le composant |
| Information et structure | Titres, régions, liens, labels, messages d'état et alternatives non ambigus ; informations non transmises uniquement par couleur ou mouvement |
| Contraste | Texte ordinaire ≥ 4,5:1 ; grand texte et éléments graphiques utiles ≥ 3:1 ; vérifier états désactivé/actif/focus |
| Zoom et réorganisation | Zoom 200 % et réorganisation à largeur équivalente 320 CSS px sans perte d'information ni défilement bidirectionnel inutile |
| Cibles tactiles | Cibles ≥ 24×24 CSS px ou exception normative documentée ; espacement suffisant pour éviter les erreurs de toucher |
| Erreurs de saisie | Erreur identifiée, correction proposée, conservation des données utiles, annonce accessible, pas de pénalisation pour format numérique invalide |
| Animation | Possibilité de pause/arrêt si requise, respect des préférences de réduction du mouvement, pas de contenu déclenchant de risque photosensible |
| État dynamique | Résultats, essais restants, aides, verrouillage du corrigé et décisions annoncés de façon compréhensible par NVDA/TalkBack/VoiceOver |
| DYS | Lisibilité, espacement, formulations courtes, unités explicites, pas de dépendance à la mémoire immédiate ou à la couleur seule |
| Confidentialité | Absence de secrets dans les données exposées ; progression locale non assimilée à une identité ou une preuve d'évaluation |

## Échantillonnage et règle de réception

La recette automatisée vise **597/597 missions** dans Chromium. Pour la réception matérielle, contrôler au minimum l'accueil, une mission de chaque univers (17), les contrôleurs historiques 001–009, une mission 3D, une mission à entrée discrète, une mission avec seuil de décision et une mission comportant une réponse négative ou une singularité. **Un défaut de composant partagé impose de contre-tester les missions dépendantes.** Les tests automatiques ne prouvent pas à eux seuls la conformité RGAA.

Pour chaque configuration MAT-01 à MAT-09, produire un relevé `PASS / FAIL / BLOQUÉ / NON TESTÉ`, daté et associé au SHA. Le statut global reste **NON RÉCEPTIONNÉ** tant que des tests obligatoires sont non réalisés ou que des anomalies critiques subsistent.

## Dépendances et responsabilités

Le dépôt GitHub est public et les résultats attendus sont lisibles dans les fichiers HTML ; le verrouillage du corrigé est pédagogique, non une protection serveur. L'authentification, le suivi certifié des compétences et les preuves privées nécessitent un backend avec contrôle d'accès. Toute intégration à SI FRANCE doit être transmise au pilote AppDeploy ; **ne pas modifier AppDeploy depuis SI QUEST**.

La phase 2 (missions 598–996) reste suspendue tant que la réception scientifique, fonctionnelle, graphique, accessibilité et sécurité n'est pas démontrée.
