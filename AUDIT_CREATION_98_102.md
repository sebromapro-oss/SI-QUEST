# SI QUEST — Réception du lot 98–102 et audit 40–75
**26 octobre 2026 — branche main — registre de preuves vérifiables**

## Point de départ et conservation de l'accueil
HEAD de départ : `86a5e6070ea6324aa83791a5f389de479088538c`. La page d'accueil archipel ajoutée par l'utilisateur (17 univers) a été reconnue et **n'a pas été modifiée** : `index.html`, `src/home.js`, `src/style.css` conservent leurs blobs d'origine. Le catalogue partagé est enrichi sans remplacer l'accueil. Le dépôt reste privé, sans Pages ni ZIP.

## Chantier A — Missions existantes
- `kinetic-friction-01` (lot 40–75) : force de frottement auparavant dessinée sous le contact ; vecteur repositionné au contact du patin et opposé à la vitesse. Test sur µ = 0 ; 0,1 ; 0,3 ; 0,8.
- `spring-stiffness-01` (lot 40–75) : dessin du ressort disjoint de sa charge ; continuité géométrique rétablie entre ancrage, spires, masse et force appliquée. Test sur F = 0 ; 100 ; 300 ; 500 N.
- Tests d'accueil hérités : deux assertions devenues fausses après la nouvelle page d'accueil (ancienne terminologie, ancienne règle CSS) ; réécrites pour vérifier la navigation actuelle, le catalogue et l'accessibilité structurelle **sans modifier l'accueil**.
- Tests de catalogue hérités : deux assertions à effectif fixe (97) incompatibles avec une production incrémentale ; remplacées par une borne minimale et un contrôle d'unicité.
- Nouveaux schémas : libellés SVG « sans unité » / « bar abs » remplacés par les symboles mathématiques attendus dans le graphique ; valeur et unité complète maintenues dans le texte accessible. Bloc de vis aligné sur le plan incliné.

## Chantier B — Cinq questions scientifiques distinctes
| N° | Mission | Référence initiale | Domaine d'investigation | Contrôle indépendant |
|---|---|---:|---|---|
| 98 | Soupape — pression de tarage | 120,00 bar (x = 15 mm) | 0–25 mm | pA = kx |
| 99 | Poutre — réaction d'appui | 5,000 kN (a = 0,75 m) | 0–2 m | ΣFᵧ = 0 ; ΣM = 0 |
| 100 | Circuit LC — fréquence propre | 103,821 Hz (C = 47 µF) | 10–100 µF | (2πf)²LC = 1 |
| 101 | Vis de levage — rendement | 0,473524 (µ = 0,15) | 0–0,30 | rapport travail utile / travail fourni |
| 102 | Compresseur — température isentropique | 191,147 °C (p₂ = 5 bar abs) | 1–8 bar abs | TV^(γ−1) = constante |

Les cinq missions comprennent un contexte professionnel, des hypothèses et limites, une question indépendante, un calcul élève, une tolérance propre, un modèle déterministe séparé, un schéma 2D paramétrique, une courbe calculée, trois essais et trois aides mutualisés, un corrigé conditionnel, une décision métier sur critère **fictif**, un carnet d'essais et la sauvegarde locale. Les cinq cas limites et les valeurs invalides sont testés.

## Contrôles et contre-audit
- **S — Scientifique :** calculs numériques, unités, domaines, propriétés de conservation et contre-calculs indépendants codés dans `tests/batch98-102.test.cjs` et `tests/audit-40-75-geometry.test.cjs`. Aucun test ne démontre à lui seul la validité du modèle hors de ses hypothèses.
- **G — Graphique :** contrôles de structure SVG, position de contact, continuité du ressort, raccordements et paramétrage. **Inspection visuelle réelle non effectuée**.
- **P — Pédagogique :** contexte, prérequis, réactivation, tolérances et corrigés intégrés ; essais utilisateur en situation réelle **non effectués**.
- **F — Fonctionnel :** tests Node et GitHub Actions à lire sur le SHA final ; les premiers tests du lot ont détecté deux échecs (ancien effectif 97 et texte SVG), corrigés avant clôture. Le moteur partagé des essais et aides n'a pas été remplacé.
- **A — Accessibilité :** structure HTML, libellés, états textuels, focus et réduction des mouvements contrôlés par les tests existants ; **NVDA Windows, TalkBack Android, VoiceOver iPhone, zoom et appareils réels non testés manuellement**.

## Réserves et périmètre non reçu
L'audit individuel exhaustif des missions 40–75 reste à poursuivre ; les 102 entrées du catalogue ne valent pas 102 réceptions complètes. Les graphiques et animations doivent être inspectés sur navigateurs et appareils réels. Les fonctions 3D ne sont pas revendiquées pour ce lot 2D. Aucune conformité WCAG/RGAA globale n'est proclamée sans preuves manuelles.
