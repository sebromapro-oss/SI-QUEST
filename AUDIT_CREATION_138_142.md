# SI QUEST — Cycle V2.3 : missions 138–142
Date : 26 octobre 2026, cycle de 16 h (Europe/Paris).
HEAD initial : fc55579d460a2246b828b62bead0bb843efd8603.
## Protection
Les fichiers index.html, src/home.js, src/style.css et assets/archipelago-cinematic.svg sont inchangés. Les modifications du catalogue sont nécessaires à la navigation, sans changement de l'accueil. Dépôt privé, aucune publication Pages ni suppression de branche.
## Chantier A — audit 40–75
Contrôle numérique des 36 modèles aux données nominales en JavaScript V8 ; examen ciblé de deux missions sans objectifs/prérequis/réactivation (gear-ratio-02 et screw-lead-01). Deux écarts P2 corrigés à la source dans leurs HTML ; test de non-régression ajouté. Les autres missions de cette plage ne sont pas déclarées entièrement auditées S/G/P/F/A.
## Chantier B — missions
| N° | ID | Sous-savoir | Valeur nominale |
|---|---|---|---|
| 138 | hydraulic-oil-compressibility-01 | Variation de volume par module de compressibilité | 16.000000 mL |
| 139 | hollow-shaft-polar-inertia-01 | Calcul de Jp pour une section annulaire | 102.10176 cm⁴ |
| 140 | wheel-braking-slip-01 | Glissement cinématique en freinage sans inversion | 20.000000 % |
| 141 | lumped-cooling-time-constant-01 | Identification de la constante de temps d’un solide isotherme | 172.50000 s |
| 142 | adc-voltage-step-01 | Résolution en tension d’un convertisseur idéal | 2.4414063 mV |
## Preuves et réserves
- S : 87 assertions préparatoires exécutées en JS V8 (modèles, domaines, références indépendantes, SVG, catalogue et 36 nominales historiques). Statut PASS ciblé ; cas de domaine vérifiés. Les jeux de référence sont algébriquement indépendants des fonctions de production, pas des mesures expérimentales.
- G : SVG paramétriques, attributs de données, unités et absence de NaN contrôlés par assertions ; inspection visuelle individuelle NOT RUN.
- P : objectifs, prérequis, trois questions flash, hypothèses, corrigés, seuils fictifs, contexte et décisions intégrés ; essai en classe NOT RUN.
- F : 3 essais, 3 aides, sauvegarde et verrouillage réutilisent le contrôleur commun ; test Node CI et tests navigateur à consulter après commit. Aucun essai matériel déclaré.
- A : attributs textuels SVG, labels, clavier et aides hérités du contrôleur commun ; NVDA, TalkBack, VoiceOver et zoom sur appareils NOT RUN.
- Aucun test non exécuté ne vaut conformité. La réception finale S/G/P/F/A demeure ouverte.

## Contre-audit correctif
Anomalie P2 supplémentaire détectée après le premier commit : la légende du graphique thermique utilisait par erreur Δp/ΔV. Corrigée en h/τ et couverte par un test dédié. Le SHA final et les résultats CI sont à confirmer depuis la branche distante.
