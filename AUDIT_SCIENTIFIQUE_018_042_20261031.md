# SI QUEST V2.5 — contre-audit indépendant des missions 18 à 42

**31 octobre 2026.** Base GitHub `main` : `d1f7dc33481ce19679a62b62d61ea470f3be45a3` ; code, tests et rapport créés sur cette base, sans intervention sur AppDeploy.

## Périmètre et résultats établis

- 25 missions historiques 18–42 : équations et unités confrontées à 25 références de calcul écrites séparément du moteur de production ; quatre valeurs par mission (borne basse, milieu, nominal, borne haute), soit **100 contre-calculs prévus dans le test automatisé**. Les résultats CI du nouveau commit doivent être consultés avant de déclarer ces contrôles réussis.
- Défaut pédagogique constaté dans les sources : **17 missions (18–34)** sans questions flash ni dans le HTML ni dans le dictionnaire de réactivation du contrôleur. Correction : 3 questions spécifiques par mission (51 questions), injectées dans le panneau pédagogique commun. Les missions 35–42 conservent leurs trois questions HTML. Aucune réponse numérique n'est affichée dans les questions.
- Test ajouté : `tests/audit-018-042-independent.test.cjs` ; vérification de l'identité, du catalogue, des unités, des calculs, des bornes, du SVG et de la couverture des questions flash. Le dictionnaire historique `legacyFlash` reste intact pour ne pas altérer ses 30 jeux existants.
- Aucune mission créée : **597 conservées**. La couverture documentaire s'étend à 18–597, soit **580/597 (97,2 %)** ; les missions 1–17 restent à contre-auditer. Cette couverture est **documentaire**, pas une réception globale.

## Réserves et réception

- L'exécution du test est nécessaire pour confirmer les 100 points de calcul ; ne pas déduire une réussite des seules références écrites.
- Contrôle graphique SVG structurel seulement : aucune preuve de géométrie correcte sur écran réel, ni d'animation temporelle fidèle.
- NVDA, TalkBack, VoiceOver, navigateurs et appareils physiques non testés dans ce cycle. Contrôles RGAA/WCAG, sécurité, données privées et qualité pédagogique encore incomplets.
- Le dépôt GitHub est **public** contrairement à la mention « privé » du cahier des charges. Aucun changement de visibilité, aucune publication de secret.
- Les trois workflows du SHA initial `d1f7dc33481ce19679a62b62d61ea470f3be45a3` étaient verts ; ceux du nouveau commit sont à revérifier. La phase 2 (598–996) demeure bloquée.

## Suite

Vérifier les trois CI sur le commit publié ; corriger toute régression. Auditer ensuite les missions 1–17 et prioriser la recette réelle 2D/3D, mobile, clavier et lecteurs d'écran. Le registre `SUIVI_REPRISE_V2_4.md` reste la source de reprise.


## Confirmation CI et anomalie transversale corrigée

Le premier commit `4fcce38f` a révélé 12 métadonnées d'unités d'entrée absentes pour les missions 18–29 (12 tests en échec, non masqués). Le correctif `9e554a0d` a renseigné les unités des missions 10–29 sans modifier les modèles physiques ni affaiblir les assertions. Les trois workflows du commit `cd202b5e` ont réussi, avec **2 169 tests sur 2 169**, zéro échec. Ce résultat valide la CI automatisée, non la réception visuelle ou scientifique exhaustive.
