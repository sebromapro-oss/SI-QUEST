# SI QUEST V2.5 — audit scientifique et pédagogique ciblé 68–92

**Date :** 31 octobre 2026. **Périmètre :** missions 68 à 92 (25 missions). **HEAD initial vérifié :** `acbdbce41b26e9ba828c8dab5ccb443d70fb2165` (3 workflows réussis, 2 082/2 082 tests selon le journal précédent). **Statut :** phase 1, réception non acquise.

## Contrôles effectués

Lecture des 11 suites existantes `batch60-75`, `batch76-77`, `batch78-79`, `batch80-81`, `batch82-83`, `batch84-85`, `batch86-87`, `batch88-89`, `batch90-91`, `batch92-93` et `audit-40-75-geometry`. Confrontation de chaque formule du moteur avec une relation physique indépendante et de chaque configuration nominale avec les données de mission. Un nouveau test `tests/audit-068-092-independent.test.cjs` contrôle, pour chacune des 25 missions, quatre points numériques (minimum, milieu, nominal, maximum), la cohérence des unités et du catalogue, les attributs structuraux des SVG, le refus de NaN/Infinity et les trois questions flash. **Ces 100 points numériques ne doivent être annoncés comme réussis qu'après exécution CI.**

| Missions | Références physiques et points de vigilance |
|---|---|
| 68–70 | Volume balayé d'un vérin `V=πD²L/4` (L), résistances en série `R=R₁+R₂` et en parallèle `1/R=1/R₁+1/R₂` (Ω). Le volume balayé n'est pas automatiquement une consommation en air libre : pression et conditions de référence nécessaires. |
| 71–75 | Énergie `E=LI²/2` (J), rendement `P_u=ηP_a` (kW), couple résistant `C=Fr` (N·m), résistance plane `R=e/(λA)` (K/W), incertitude relative rapportée à une grandeur de référence (%). |
| 76–77 | Poiseuille `Δp=128μLQ/(πD⁴)` avec `Q` en m³/s et conversion bar ; chute de tension `ΔU=ρ(2L)I/S` en V. Hypothèses laminaire, cuivre à température de référence et contacts négligés à conserver. |
| 78–79 | Vérin double effet `F=p_A A_p-p_B A_a` (kN), flambement d'Euler `F_{cr}=π²EI/L_{eff}²` (kN). Vérifier en atelier conditions d'appui et domaine d'Euler. |
| 80–81 | Accumulateur isotherme `pV=constante` (pressions absolues), pont de Wheatstone par diviseurs de tension (mV) et polarité. |
| 82–83 | Angle de torsion `θ=TL/(GJ)` (degrés), couple moteur hydrostatique `T=ΔpV_gη_m/(2π)` (N·m). |
| 84–85 | Énergie cinétique `E=Jω²/2` (kJ), centre de masse `x_G=Σm_ix_i/Σm_i` (m). |
| 86–87 | Willis pour couronne fixe (rapport des dentures), Stefan–Boltzmann `Φ=εσA(T_s⁴-T_a⁴)` (W) avec températures en K. |
| 88–89 | Puissance active triphasée `P=√3UIcosφ` (kW), pression hydrostatique `p=ρgh` (bar). |
| 90–92 | Fréquence propre `f=(1/2π)√(k/m)` (Hz), inertie de tube `I=(BH³-bh³)/12` (cm⁴), durée de vie L10 `L_{10h}=10⁶(C/P)^3/(60n)` (h). L10 est statistique, pas une garantie individuelle. |

## Anomalie corrigée

**Mission 77 — chute de tension d'un faisceau 12 V :** la page ne présentait aucune liste de trois questions flash (contrairement aux 24 autres missions du lot). Ajout ciblé d'une situation professionnelle, des objectifs, prérequis, critères de réussite et trois questions flash **sans réponses**. Commit `cb7f6ba5e2da0edf7299252b5de7a0d1dc44cecf`. Les données électriques, le calcul, les scripts et le corrigé ne sont pas modifiés.

**Nouveau test de non-régression :** `tests/audit-068-092-independent.test.cjs`, commit `6a7e77f9b506f7b7f5ea279beae67d3b79af3fda`. Vérification de 25 missions et 100 points numériques, en attente de conclusion CI au moment de la création du rapport.

## Réception et limites

La revue de code et les assertions SVG **ne démontrent pas** la justesse graphique ou la fidélité temporelle des animations. Les contrôles 3 essais/3 aides, la non-divulgation et le parcours 2D/3D disposent de tests transversaux, mais doivent encore être vérifiés en navigateur réel, sur mobile et avec NVDA, TalkBack et VoiceOver. RGAA/WCAG 2.2 AA, sécurité des secrets/historique et confidentialité du dépôt restent à auditer. Le dépôt était public au dernier contrôle de son API. Ne pas exposer les données personnelles et ne modifier aucun projet AppDeploy.

**Couverture documentaire récente après ce rapport :** missions 68–597 = **530/597 (88,8 %)** ; ceci ne constitue pas un taux de réception. **Nouvelles missions : 0.** Prochaine plage à examiner : 43–67, après vérification des trois workflows du HEAD et correction de toute régression. Phase 2 non autorisée.
