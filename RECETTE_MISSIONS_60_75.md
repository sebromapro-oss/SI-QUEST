# Réception des missions 60 à 75 — contrôles exécutés et réserves

Date : 25 octobre 2026.

## Livraison
16 pages HTML, 16 modèles numériques, 16 entrées catalogue, 16 schémas SVG de principe, 16 tolérances absolues, 16 corrigés scientifiques individualisés. Catalogue : 75 missions.

## Preuves réellement obtenues pendant cette intervention
- Exécution des modules JavaScript `investigations.js`, `investigation-diagrams.js`, `catalog.js` dans un moteur JavaScript V8 et analyse syntaxique de `investigation-mission.js` : **4/4 modules analysés sans erreur de syntaxe**.
- Calculs de référence comparés à des valeurs déterminées séparément : **16/16 conformes** à 10⁻⁹ près.
- Pour chaque mission, ouverture de sa page HTML depuis GitHub, extraction de la configuration, calcul et rendu SVG pour `min`, `initial`, `max` : **48/48 cas exécutés sans exception ni valeur NaN/Infinity**.
- Contrôle individuel des unités de réponse et de la présence de la tolérance dans les 16 pages : **16/16 conformes**.
- Vérification de la présence d'un corrigé mathématique distinct pour les 16 missions : **16/16 conformes**.
- Refonte ciblée de neuf schémas qui ne représentaient pas correctement la grandeur étudiée : levier oblique, engrenages, vis, flexion, hydraulique côté tige, série, parallèle, inductance, roulement. Contrôle programmatique SVG effectué, **pas de contrôle visuel navigateur**.
- Réparation de l'assertion de nombre de missions dans `tests/batch20.test.cjs` (59 → 75) pour éviter une régression de tests après extension du catalogue.

## Réserves — ne pas présenter comme tests réalisés
- Les tests `node --test` stockés dans GitHub **n'ont pas été exécutés dans un processus Node** durant cette intervention. Les vérifications exécutées utilisent directement V8 et les fichiers récupérés du dépôt.
- Aucun essai manuel de saisie au clavier, clic, tactile, gestion des trois tentatives et trois aides dans un navigateur réel. La cohérence des contrôles d'interaction reste à démontrer.
- Les SVG sont des schémas 2D de principe. L'inspection visuelle pixel par pixel, l'absence de chevauchement de légendes et la fidélité géométrique détaillée restent ouvertes ; aucun modèle CAO ou 3D livré dans ce lot.
- Aucun test matériel Android, iPhone, Windows, Mac, NVDA, TalkBack, VoiceOver ni audit WCAG 2.2 AA exécuté.
- Les décisions techniques sont fondées sur des plages pédagogiques : elles ne doivent pas être interprétées comme une homologation constructeur.

## Verdict
**16/16 intégrées et contrôlées numériquement à trois valeurs, 0/16 réceptionnées globalement S/G/P/F/A.** Les tests navigateur et l'inspection visuelle sont des critères bloquants de réception finale.


## Cycle correctif complémentaire du 25 octobre 2026 — audit V2.2

**Défauts corrigés :**

- **Blocage du graphique de la mission `gear-ratio-02` :** l'échantillonnage de la courbe utilisait des nombres de dents fractionnaires alors que le modèle exige des entiers. Domaine discrétisé en dents entières, curseur forcé au pas 1, comme pour `gear-mesh-01`. Ce correctif a été contrôlé par analyse de source et calculs sur des valeurs entières, mais pas par un essai navigateur.
- **Seize légendes SVG incomplètes :** remplacées par symboles physiques explicites, valeurs et unités d'entrée/sortie issues du noyau scientifique. Affichage numérique passé à sept chiffres significatifs au maximum pour éviter, par exemple, de transformer 0,075 K/W en 0,08 K/W sans indication.
- **Vecteur du levier oblique :** orientation rectifiée pour que l'angle indiqué corresponde effectivement à la direction de la force dans le repère du dessin.
- **Flexion :** remplacement d'une flèche de force trompeuse par une représentation schématique de couples fléchissants ; ne constitue pas un calcul de déformée.
- **Diagnostic pédagogique :** messages spécifiques lorsqu'un signe inversé, un facteur décimal ou un arrondi semble expliquer l'écart, avec formulation prudente et sans donner la réponse.

**Tests réellement exécutés :** 16 configurations HTML lues depuis GitHub ; **48 calculs et rendus SVG** aux trois valeurs `min`, `initial`, `max` ; contrôle des unités d'entrée et de sortie et des résultats initiaux : **48/48 sans échec**. **20 contrôles de propriétés physiques, valeurs de référence et domaines** exécutés en V8 : **20/20 réussis**. Quatre cas de diagnostic pédagogique vérifiés. Le test Node persistant `tests/quality-gate-40-75.test.cjs` a été ajouté, mais **aucune exécution `node --test` vérifiable** n'est disponible pour ce cycle.

**Réserves :** les corrections graphiques ont passé les contrôles de structure SVG et de cohérence numérique, mais aucune inspection visuelle en navigateur réel ni essai sur appareil ou lecteur d'écran n'a été effectué. Les critères S/G/P/F/A non démontrés demeurent ouverts. **16/16 missions corrigées et contrôlées numériquement ; 0/16 reçues globalement.**
