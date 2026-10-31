# SI QUEST — Réception contradictoire ciblée du 31 octobre 2026

**Périmètre :** branche `main`, 597 missions existantes, phase 1 exclusivement. Aucune mission 598+ créée. Accueil, carte des 17 univers et marquage auteur préservés.

## 1. Neuf missions fondamentales — règle des trois essais

Missions contrôlées et corrigées : `rolling-01`, `cooling-01`, `electric-01`, `slope-01`, `spring-01`, `lever-01`, `braking-01`, `hydro-02` et `gear-01`.

- Les six premières ont reçu une garde anti-quatrième essai dans les commits `b376ca8d`, `3451dd19`, `6221604e`, `f603c7f5`, `f994c621` et `659ea0d4`. Les trois dernières ont été corrigées dans `8ba57d9a`, `f52eb8c6` et `f6243032`.
- `1cf4358c` : verrouillage après réussite, désactivation du bouton de validation et tests transversaux. **Régression de recette détectée** : 19 tests Node en échec sur un commit intermédiaire, dont 18 simulations DOM incapables d'exécuter `querySelector` et un ancien test qui cherchait la garde précédente. Le comportement métier n'a pas été déclaré validé.
- `f2395fde` : garde métier conservée, bouton désactivé lorsqu'un navigateur expose `querySelector`, repli sûr pour les doubles DOM et mise à jour des tests. **9/9 assertions transversales exécutées en V8 isolé et réussies** sur le code distant. Ce résultat n'est pas une recette navigateur.
- Le corrigé ne doit pas être rendu disponible après réussite autonome ; après trois erreurs, il exige les trois aides. Les simulations qualitatives restent accessibles après une première tentative.

## 2. Sept scènes 3D — robustesse numérique

- `b6579b74` : protection contre les débordements arithmétiques, phases temporelles non finies et nombres de dents non sûrs. Les sept scènes existantes sont concernées : mouvement circulaire, accélération angulaire, couple de freinage, torsion, engrenages, courroie et résistance au roulement.
- **3/3 tests de bornes exécutés dans un moteur V8 indépendant et réussis** ; les 7 scènes sont exercées sur une valeur extrême et les animations sur des phases extrêmes. Les tests scientifiques nominaux précédents restent en place.
- Ces contrôles ne certifient pas la géométrie CAO, la fidélité de contact ni le rendu réel sur mobile.

## 3. Contre-audit des missions de production 443–467

- **25/25 pages HTML relues directement depuis GitHub**, identifiées par leur **ID stable** dans les cinq fichiers `src/batch443-447.js` à `src/batch463-467.js`.
- **25/25 concordances** entre configuration de la page et métadonnées du modèle : identifiant, bornes, valeur initiale, formule et unités.
- **25/25 valeurs attendues** concordantes avec les références nominales déjà publiées dans `AUDIT_SCIENTIFIQUE_443_467_20261030.md`, avec tolérance de contre-lecture `max(0,001 ; 0,0002 × |référence|)`. Écart absolu maximal constaté : **0,000487 dans l'unité propre à chaque mission**, imputable à la précision d'affichage des références.
- **25/25** pages avec exactement trois questions flash HTML, langue française, lien d'évitement et absence de script distant/iframe dans le contrôle ciblé.
- Attention : les numéros **443–467 désignent ici l'ordre de production**, et non les indices actuels du tableau `SICatalog.levels` (réordonné). Toujours citer les IDs pour éviter de fausses attributions.
- Ce contrôle croisé est **distinct d'un nouveau recalcul scientifique indépendant** et ne constitue pas une inspection visuelle.

## 4. Sécurité, CI et réserves

- Recherche GitHub Code Search sur huit motifs indicatifs de secrets/identifiants : **0 résultat indexé** pour chacun ; couverture limitée à l'index courant, pas à l'historique ni aux artefacts.
- Dépôt **public**, branche `main` non protégée au contrôle API du cycle. Corrigés intégrés aux pages publiques et progression locale non authentifiée : ne pas stocker de preuves pédagogiques privées dans ce dépôt.
- Trois workflows Node/science ont réussi sur le SHA `f6243032` (avant le changement transversal). Les exécutions sur `1cf4358c`, `6bad4d86` et `26ad3c55` ont échoué ; **ne pas masquer ces échecs**. Les workflows du correctif `f2395fde` et de `b6579b74` restent à vérifier par SHA.
- Essais Android/iOS physiques, Safari/Firefox, NVDA/TalkBack/VoiceOver, audit RGAA/WCAG et revue exhaustive des secrets historiques : **non réalisés**. Réception globale 597/597 : **non prononcée**.

## Prochaine action

Vérifier les trois workflows et la recette Playwright du dernier HEAD ; traiter tout échec sans suppression de tests ; poursuivre l'audit graphique et les essais d'accessibilité. Aucune nouvelle mission avant réception de la phase 1.
