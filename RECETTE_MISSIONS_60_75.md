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
