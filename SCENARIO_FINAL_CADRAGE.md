# SI QUEST — Cadrage de la future mission intégratrice (NON JOUABLE)

**Statut au cycle 25 : cahier de cadrage uniquement.** Aucun lien jouable, aucune étoile, aucun badge, aucun déverrouillage ni progression associés à ce document. Le scénario ne compte **pas** dans les 7 niveaux jouables.

## Mission proposée — Télescopique : réception avant restitution

**Rôle** : technicien chargé des contrôles de remise en service après maintenance. **Déclencheur** : un télescopique doit être restitué ; plusieurs paramètres de sous-systèmes sont incertains. **Objectif** : décider « autoriser » ou « refuser » sur la base de preuves de mesures et de calculs, sans jamais autoriser une machine présentant un risque.

### Parcours envisagé (à développer, avec données propres à une seule machine)

1. **Préparer les essais** : vérifier les conditions de sécurité, immobilisation, zone d'évolution, état initial, documents constructeur et unités.
2. **Électricité de démarrage** : choisir et vérifier une liaison électrique, interpréter tension sous charge et pertes ; si défaut, diagnostiquer avant tout essai de démarrage.
3. **Transmission** : comparer régime d'entrée/sortie, couple et sens ; refuser la restitution si la vitesse ou le couple ne correspond pas au cahier des charges.
4. **Hydraulique de flèche** : calculer les surfaces utiles selon le sens du vérin, la force réellement disponible et le temps de mouvement ; distinguer seuil de levage, limite de pression et débit.
5. **Stabilité** : établir un bilan des moments et des réactions avec géométrie de l'engin, masse de la charge, position du centre de gravité et configuration de flèche ; ne pas extrapoler à partir du modèle simplifié de Méca Lab.
6. **Freinage** : établir la distance de réaction, la décélération, la distance d'arrêt et la marge à la ligne de sécurité ; prendre en compte la limite d'adhérence et les hypothèses du modèle.
7. **Rapport de restitution** : afficher les valeurs mesurées/simulées, hypothèses, écarts, non-conformités et décision motivée. Une non-conformité de sécurité bloque l'autorisation, même si d'autres sous-systèmes sont conformes.

## Architecture et critères de réception à implémenter

- **Données cohérentes d'un même engin** : masses, géométrie, pneumatiques, circuit, pression, débits, vitesse, charges, caractéristiques de transmission. Ne pas concaténer artificiellement les six pilotes existants : leurs contextes et données ne représentent pas le même télescopique.
- **Modèles purs** dans `src/physics.js`, séparés du DOM, avec unités SI, signes, bilans énergétiques et bornes vérifiables. Les paramètres affichés doivent être les paramètres réellement utilisés par les calculs.
- **Enchaînement causal** : la réussite d'une étape débloque le contrôle suivant ; l'élève peut effectuer des essais erronés sans validation prématurée. Prévoir plusieurs causes de panne distinctes, et pas seulement un questionnaire.
- **Double verdict** : exactitude des calculs (tolérances explicites) et conformité physique/sécurité (limites strictes). Pas d'étoiles pour une réponse numériquement correcte mais une machine dangereuse, ni pour une machine sûre obtenue avec des calculs faux.
- **Accessibilité** : chaque animation a un équivalent textuel ; navigation clavier, contrastes, ordre logique, zoom et lecteurs d'écran à réceptionner manuellement.
- **Preuves avant publication** : tests unitaires et de propriétés, essais DOM corrects et erronés, vérification des animations liées aux résultats, essais HTTP/PWA distincts, puis essais sur appareils physiques et avec technologies d'assistance. Aucun scénario annoncé « jouable » avant cette recette.

**Prérequis de jeu envisagés** : les savoirs pertinents des univers SI-02, SI-04, SI-05, SI-06 et SI-08. Le déverrouillage n'est pas implémenté et ne doit pas être affiché comme acquis.
