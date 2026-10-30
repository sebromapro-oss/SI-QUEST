# SI QUEST V2.3 — Cycle 548–552 — 30 octobre 2026

## Révision et protection
HEAD initial distant : a1455107ce3379194f3d73745cb61be7bdc7d04e. Dépôt privé, branche main. Cahier V2.3, EXIGENCES, PRODUCTION, catalogue, modèles et workflows relus. Page d'accueil, carte, styles et assets protégés : aucune modification. Catalogue seul enrichi comme dépendance de navigation.

## Chantier A — historique 40–75
36 modèles contrôlés avec trois états et références indépendantes extraites du test scientifique historique : 108/108 valeurs PASS, 108/108 SVG structurels PASS. Cinq anomalies P2 de traçabilité corrigées sur torsion-01, axial-strain-01, gear-mesh-01, belt-speed-01, hydro-power-01 : objectifs, prérequis, critères copiés des textes visibles vers la configuration. Test de non-régression créé. Pas de validation navigateur ou matérielle.

## Chantier B — nouvelles missions
- 548 : maintenance-poisson-spares-twofail-01 — Pièces de rechange — Risque de deux pannes — 33.7372734 % ; Probabilité d'au moins deux défaillances selon une loi de Poisson
- 549 : humid-air-vapor-mass-density-01 — Air humide — Masse volumique de vapeur — 13.8186931 g/m³ ; Masse volumique partielle de vapeur d'eau dans un mélange gazeux idéal
- 550 : rectifier-capacitor-ripple-01 — Redresseur — Ondulation d'un condensateur de filtrage — 1.81818182 V ; Ondulation crête à crête d'un filtrage capacitif après redressement double alternance
- 551 : acoustic-two-tone-beat-01 — Diagnostic acoustique — Fréquence de battement — 6.00000000 Hz ; Fréquence de modulation d'amplitude issue de deux sons sinusoïdaux proches
- 552 : optical-grating-first-order-angle-01 — Réseau optique — Angle du premier ordre — 12.2864901 ° ; Angle de diffraction du premier ordre à incidence normale sur un réseau

Chaque mission possède une question scientifique distincte, un modèle pur avec domaine et contrôle d'entrées, trois flash, hypothèses, unités, schéma SVG paramétrique et graphe synchronisé, trois essais/aides/corrigé/sauvegarde via contrôleur mutualisé, décision métier fictive. Graphiques et schémas statiques 2D, sans simulation 3D ni animation temporelle revendiquée.

## Contrôles exécutés dans V8
Nouveaux modèles : 15/15 références contradictoires PASS, 15/15 SVG PASS, 15/15 désynchronisations rejetées, 30/30 entrées invalides rejetées. Pages 5/5, sous-savoirs distincts 5/5, catalogue 552/552 identifiants uniques et 17/17 univers. Tests Node reproductibles ajoutés, **exécution Node native NOT RUN**. CI à contrôler après publication. Recette visuelle navigateur et matériel NOT RUN, NVDA/TalkBack/VoiceOver NOT RUN.

| Axe | Statut | Preuve |
|---|---|---|
| S | PASS ciblé | 15 contre-calculs et 30 invalides V8 ; 108 historiques contradictoires |
| G | PASS structurel ; visuel NOT RUN | 15 SVG et 15 rejets désynchronisation |
| P | PASS structurel ; parcours NOT RUN | 15 questions flash, corrigés, 5 historiques tracés |
| F | PASS ciblé ; CI à vérifier | Catalogue, 5 pages, V8 ; navigateur NOT RUN |
| A | NOT RUN | HTML sémantique inspecté ; essais clavier, tactile et lecteurs d'écran non effectués |

Défauts ouverts : CI historique échoue avant attribution de runner (cause non établie) ; taxonomie 249 sous-savoirs canoniques non réconciliée ; 56 entrées anciennes sans sous-savoir explicite au catalogue selon registre antérieur ; réceptions visuelle/mobile/accessibilité incomplètes. Les missions sont intégrées, **non reçues définitivement**.
