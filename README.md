# SI QUEST — Sciences Industrielles

Jeu pédagogique scientifique en HTML, CSS et JavaScript, sans backend. **Dépôt GitHub privé**, destiné au développement et à la recette avant publication éventuelle.

## État vérifiable — 25 octobre 2026, cycle 28

**12 niveaux distincts jouables sur 996 visés**, **12 sous-savoirs développés sur 249**, **10 univers couverts sur 17**. Les 4 îles historiques de la carte sont conservées ; les autres missions sont accessibles par les cartes et le catalogue des univers. Les compteurs de progression ne doivent refléter que les missions réellement gagnées.

Deux missions nouvelles :
- `hose-01` — **Flow Line** : débit d'huile, Reynolds, facteur de frottement, pertes réparties et singulières, puissance dissipée, coût du flexible.
- `torsion-01` — **Torque Shaft** : moment quadratique polaire, contrainte tangentielle, angle de torsion et masse d'un arbre plein.

Les modèles physiques sont indépendants de l'interface. Les calculs intermédiaires de l'élève et la conformité physique sont évalués séparément. Les indices, essais, solutions après **3 indices ET 3 essais**, étoiles, carnet d'essais et options de lecture sont conservés.

## Exécution

Ouvrir `index.html` pour consulter les missions. Pour les essais HTTP/PWA, utiliser un serveur local ou un hébergement HTTPS :

```sh
python -m http.server 8765
```

La publication GitHub Pages **n'est pas activée** ; ce dépôt privé n'est pas un site public.

## Contrôles et qualité

```sh
node --test tests/*.test.cjs
```

Les contrôles scientifiques Node s'exécutent également dans GitHub Actions (workflow `SI QUEST scientific quality`). Les essais Chromium headless du cycle 28 ont été effectués dans l'espace de travail sur trois largeurs (1440, 390, 320 px), mais **ne sont pas assimilés à des tests matériels** Android, iPhone, Windows, Mac ou à des essais NVDA/TalkBack/VoiceOver.

**Résultats locaux du cycle 28 :** 99/99 tests Node, 6 parcours DOM des deux nouvelles missions, 3 séries de non-régression, 2 animations synchronisées, 13 ressources HTTP contrôlées. Ces chiffres correspondent aux preuves locales du cycle ; le workflow GitHub exécute son propre jeu de tests et ne revendique pas ces 99 tests s'ils ne sont pas présents dans le dépôt.

## Principes de production

- 17 univers ; cible 249 sous-savoirs et 996 niveaux distincts.
- Un niveau = une situation métier, un modèle physique, des interactions, un calcul avec unités, une décision.
- Pas de niveaux fictifs ni de variantes numériques comptées comme nouvelles missions.
- Accueil et carte conservés ; correctifs d'accessibilité ponctuels autorisés.
- Compatibilité visée : Android/iPhone, Windows/Mac, clavier et tactile ; validation matérielle à effectuer.
- Aucun GitHub Pages public sans accord explicite.

**Archive de référence historique :** `SI_QUEST_CYCLE_27_GITHUB_SOURCES.zip`. Les sources actuelles sont les fichiers décompressés et versionnés sous `src/`, `assets/`, `index.html` et `play.html` ; l'archive n'est pas la version active.
