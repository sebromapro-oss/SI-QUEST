# SI QUEST — Cycle 92–93 : création et audit (26 octobre 2026)

**Base réelle :** main `8101bff76868e138059006d392c264299434cf0a`, 91 missions au catalogue. **Cible du cycle :** 93 missions.

## Chantier A — Audit et correction
Mission `hydro-power-01` du lot 40–75. Anomalie graphique et didactique : pression `p` sans unité, débit non visible, ambiguïté entre pression et différence de pression, profil professionnel générique. Correction : `Δp = ... bar ; Q = 24 L/min`, schéma fonctionnel pompe–récepteur avec retour non représenté et profil métier spécifique. Cas de contre-essai : 0 bar → 0 kW ; 150 bar → 6 kW. L'audit exhaustif du lot 40–75 reste ouvert.

## Chantier B — Deux modèles indépendants
**Mission 92 — Roulement à billes L10 :** C=24,0 kN, P=6,0 kN, n=1000 tr/min ; L10=(24/6)³×10⁶=64 000 000 tours ; L10h=64 000 000/(60×1000)=**1066,67 h**. Invariance L10h×60n pour n=400, 1000, 1600 tr/min. Seuil fictif 1000 h. L10 ne prédit pas la date de panne.

**Mission 93 — Transmetteur 4–20 mA :** plage 0–250 bar, I=12,8 mA ; p=250×(12,8−4)/16=**137,50 bar**. Points 4 mA→0 bar ; 12 mA→125 bar ; 20 mA→250 bar ; rejets hors plage. Seuil fictif 150 bar, contrôle d'étalonnage requis.

## Preuves S/G/P/F/A
| Domaine | Réalisé | Non démontré |
|---|---|---|
| S | Contre-calculs, domaines et invariants dans `tests/batch92-93.test.cjs` | Vérification sur matériel réel |
| G | SVG paramétriques, contrôles de présence et d'unités | Inspection visuelle navigateur/mobile |
| P | Objectifs, prérequis, réactivation, moteur commun essais/aides/corrigé, décision fictive | Évaluation en classe |
| F | Tests ajoutés, modèles et catalogue intégrés | CI et recette DOM à constater sur le commit |
| A | HTML sémantique, titre et description SVG | NVDA, TalkBack, VoiceOver, zoom sur appareils |

**Statut : codées ; non validées au sens de la recette complète.** Aucun changement de visibilité, accueil, carte, branche archive ou publication.

## Contre-audit automatisé réellement exécuté — 26 octobre 2026
Révision de code contrôlée : `c6df32be3f5f8403df25e58130bd229057d6ca40`.

- Suite Node : **560 tests exécutés, 560 réussis, 0 échec**, journal du workflow [Recette automatisée](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40268257621).
- Workflow [SI QUEST scientific quality](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40268257709) : **success**.
- Workflow [Contrôles scientifiques SI QUEST](https://github.com/sebromapro-oss/SI-QUEST/actions/runs/40268257658) : **success**.
- Anomalie détectée lors de la première exécution : ancien test `batch90-91` exigeait exactement 91 entrées ; corrigé pour accepter une extension sans doublon. Première CI échouée, puis contre-essai complet réussi.
- Vérifications supplémentaires exécutées dans l'environnement JavaScript de préparation : syntaxe des quatre modules modifiés, valeurs de référence, domaines, structures SVG et catalogue de 93 entrées.
- **Réserves non levées** : réception graphique sur navigateur, essais mobiles et lecteurs d'écran NVDA/TalkBack/VoiceOver, séance pédagogique réelle. Aucun résultat d'essai manuel n'est revendiqué.
