# SI QUEST V2.3 — Cycle 388–392
**28 octobre 2026 — dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`**

## 0. HEAD et protection
HEAD distant initial : `046a33cdc4d814567c3913eb245edd9849c1b9c0`. HEAD vérifié avant rapport : `74219e3f46d0bfe93dfd344fa8231dc3b193cf3b`. Comparaison GitHub : 14 commits descendants, 12 fichiers modifiés ou créés, aucune divergence ni force push.
Fichiers protégés inchangés, SHA des blobs vérifiés : `index.html` `94165cccd6ad972a1a57699d5fcf42afde5cca53`, `src/home.js` `0ead30ab3afe119589f0a14aab99898f0e7721d7`, `src/style.css` `966e623673ce45c86c2cc6a59a4725406475db10`, `assets/archipelago-cinematic.svg` `8d75fd72f75cb662f0d2de1c5a3e1df8ab935347`. Dépôt privé ; branche d'archive `archive/pre-reconstruction-cycle28-20261025` observée ; aucune publication GitHub Pages, aucun ZIP.

## A. Audit historique 40–75
36 missions identifiées par leur ordre historique (hors nouvelles missions préfixées dans le catalogue). Tests JavaScript V8 du vrai moteur `src/investigations.js` et du vrai moteur SVG `src/investigation-diagrams.js`, avec lecture des configurations HTML, pour les valeurs min, nominale et max : **108/108 résultats finis**, **108/108 SVG structurels**, **72/72 rejets de NaN/Infinity**, et valeurs nominales conformes aux configurations. Ces contrôles ne sont pas des contre-calculs scientifiques indépendants exhaustifs.
Anomalies P2 pédagogiques corrigées dans `belt-speed-01`, `hydro-power-01`, `sampling-01` : absence de trois questions flash natives, objectifs, prérequis et critères de réussite. Ajout de trois flash par page, repères, conversions SI et hypothèses sans divulguer la réponse. **10 autres missions historiques** conservent cette lacune HTML ; le contrôleur mutualisé peut compenser partiellement, sans réception individuelle.

## B. Nouvelles missions
- **388** `ice-fusion-duration-01` : durée de fusion isotherme, m=1,50 kg, L=334 kJ/kg, P=800 W ; **626,25 s**.
- **389** `dc-motor-start-resistor-01` : résistance minimale de démarrage d'un moteur CC à E=0, U=48 V, R_a=0,40 Ω, I_lim=30 A ; **1,20 Ω**.
- **390** `shaft-min-torsion-diameter-01` : diamètre minimal d'arbre plein, C=250 N·m, τ_adm=50 MPa ; **29,420273 mm**.
- **391** `pump-apparent-leakage-flow-01` : fuite volumétrique apparente, V_g=30 cm³/tr, n=1500 tr/min, Q_u=40 L/min ; **5,00 L/min**.
- **392** `counterweight-limit-load-01` : charge maximale à équilibre des moments, m_c=150 kg, d_c=0,45 m, d=0,75 m ; **882,90 N**.
Cinq questions distinctes, cinq sous-savoirs déjà présents et différents entre eux, situations professionnelles fictives, objectifs, prérequis, trois flash, hypothèses, domaines, unités, calculs purs, SVG 2D paramétriques et graphes, trois essais et trois aides, corrigés conditionnels, décision et sauvegarde par le contrôleur mutualisé. Pas de 3D ni d'animation temporelle artificielle revendiquée.

## Corrections et contre-audit
- P2 pédagogique ×3 : pages 48, 49 et 55 corrigées ; trois flash vérifiés par page.
- P1 graphique ×1 : schéma de fuite de la mission 391, retour de fuite relié au circuit d'entrée et marqueur de débit vert assorti au vecteur ; test de non-régression ajouté.
- Aucune anomalie scientifique confirmée sur les scénarios testés ; cela ne démontre pas une réception exhaustive.

## Tests réellement exécutés
- V8 : **13/13 tests et 242 assertions PASS** avec adaptateurs `node:test`, `node:assert/strict`, `fs` et DOM simulé, sur le code et les pages effectivement enregistrés dans le dépôt ; **Node natif non exécuté**.
- Références indépendantes : **15/15** valeurs min/nominale/max PASS ; invariants de conservation et équilibres contrôlés ; **20/20** entrées invalides rejetées ; **5/5** SVG désynchronisés rejetés ; synchronisation numérique et géométrie SVG contrôlées.
- Parcours DOM simulés : **5/5 PASS** pour saisie invalide, trois essais, aides, corrigé, étoiles et sauvegarde ; ne remplace pas un navigateur.
- Catalogue exécuté : **392/392 identifiants uniques**, **17/17 univers**, **249 sous-savoirs explicitement distincts**. Les 97 missions historiques sans sous-savoir explicite demandent toujours une classification.

## CI et preuves S/G/P/F/A
GitHub Actions : pour le commit testé `74219e3f46d0bfe93dfd344fa8231dc3b193cf3b`, le statut combiné retourne `statuses=[]`. La recherche de runs exposée par le connecteur ne couvre que les événements pull request et retourne `[]` : **aucune conclusion sur les runs push n'est possible**. Le run Node antérieur `40724501348` a un job `tests-node` en échec avec `steps=null` ; journal **404 BlobNotFound**. La CI native du nouveau cycle est **BLOCKED** faute d'accès aux runs push et à leurs journaux ; aucune relance du nouveau SHA ne peut être attestée.
- **S : PASS ciblé** (contre-calculs et invariants des nouvelles missions ; historique seulement structurel/numérique).
- **G : PASS structurel ciblé** (SVG paramétriques et non-régression) ; inspection visuelle navigateur **NOT RUN**.
- **P : PASS ciblé** (contenu, trois flash et parcours simulés).
- **F : PASS V8 ciblé**, **CI native BLOCKED**, navigateur réel **NOT RUN**.
- **A : contrôles sémantiques structurels partiels ; NVDA, TalkBack et VoiceOver NOT RUN**, zoom 400 % et tactile réel **NOT RUN**.
Statut de livraison : **intégré et testé automatiquement de façon ciblée ; réception visuelle, matérielle et accessibilité non terminées**. Aucune mission déclarée validée définitivement.
