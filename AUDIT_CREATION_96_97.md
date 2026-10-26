# SI QUEST — Cycle 96–97 : audit et production
Date : 26 octobre 2026 ; dépôt privé `sebromapro-oss/SI-QUEST`, branche `main`. HEAD de départ : `8bc3914d6678934760e273caabb6ba14004b56bc`.

## Chantier A — Audit de la mission 40–75
Mission `rolling-load-01` : les vecteurs poids et réaction normale étaient dessinés au-delà de leurs limites géométriques (poids sous le sol, réaction au-dessus du centre de roue). Correction des points d’arrivée, rappel du sens des forces, assertion SVG dédiée et contre-calcul de Fᵣ = cᵣ N pour cᵣ = 0 et 0,025. Le test du lot 94–95 ne bloque plus les extensions du catalogue au-delà de 95 missions.

## Chantier B — Deux nouvelles missions scientifiques
**96 — Convection d’une paroi** (SI-12) : Φ = h A ΔT, h = 25 W/(m²·K), A = 1,50 m², ΔT = 45 K, soit **1 687,50 W**. Convection stationnaire, coefficient uniforme, critère fictif 2 000 W. Schéma 2D et courbe synchronisés, contre-calcul par sommation des échanges de surface.

**97 — Orifice hydraulique calibré** (SI-06) : Q = Cd A √(2Δp/ρ), d = 2,00 mm, Cd = 0,62, ρ = 850 kg/m³, Δp = 20 bar ; résultat **8,017 L/min**. Graphique en racine carrée et représentation 2D paramétrique, critère fictif 9 L/min. Hypothèses de Cd constant, fluide incompressible et absence de cavitation à vérifier.

## Preuves S/G/P/F/A
**S** : tests indépendants de surface discrétisée et de Bernoulli, cas zéro et hors domaine, invariants linéaires/racine carrée ; **G** : assertions sur le SVG et les vecteurs, pas de réception navigateur ; **P** : prérequis, questions flash, trois essais et aides, corrigé conditionnel et décision métier via moteur commun ; **F** : suite Node et workflows à vérifier sur le commit ; **A** : structure sémantique, textes et descriptions SVG codés, mais tests NVDA, TalkBack, VoiceOver, zoom et appareils réels non réalisés.

**Statut :** intégration technique en cours de recette ; ne pas déclarer « validé » avant preuves manuelles. Pas de ZIP, aucune modification d'accueil/carte, pas de publication Pages, dépôt et branches d'archive préservés.
