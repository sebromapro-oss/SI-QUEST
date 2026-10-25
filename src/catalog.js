(function (root) {
  'use strict';
  // The 249 subskills / 996 levels are production targets, NOT a claim of implemented content.
  const targets = Object.freeze({ universes: 17, subskills: 249, levels: 996 });
  const worlds = [
    ['SI-01', 'Outils scientifiques et modélisation'],
    ['SI-02', 'Statique et actions mécaniques'],
    ['SI-03', 'Cinématique'],
    ['SI-04', 'Dynamique et vibrations'],
    ['SI-05', 'Transmissions et mécanismes'],
    ['SI-06', 'Hydraulique et mécanique des fluides'],
    ['SI-07', 'Pneumatique et vide'],
    ['SI-08', 'Électricité et électrotechnique'],
    ['SI-09', 'Électronique et systèmes embarqués'],
    ['SI-10', 'Automatique et informatique industrielle'],
    ['SI-11', 'Résistance des matériaux et structures'],
    ['SI-12', 'Thermodynamique et thermique'],
    ['SI-13', 'Métrologie et qualité'],
    ['SI-14', 'Matériaux, fabrication et conception'],
    ['SI-15', 'Robotique et mécatronique'],
    ['SI-16', 'Énergie, environnement et sûreté'],
    ['SI-17', 'Analyse des systèmes et diagnostic']
  ].map(([id, title]) => Object.freeze({ id, title }));
  const levels = [
    {
      id: 'hose-01', world: 'SI-06', skill: 'Pertes de charge réparties et singulières dans un flexible hydraulique',
      title: 'Flow Line', subtitle: 'Choisir le flexible de retour du banc', icon: '🛠', color: 'blue',
      type: 'hose', mechanic: 'Choisir le diamètre intérieur du flexible ; visualiser vitesse, pertes de charge et énergie dissipée.',
      context: 'Un banc hydraulique doit transférer 35 L/min d’huile sur 8 m de flexible. La masse volumique est de 860 kg/m³, la viscosité dynamique à température de service de 0,030 Pa·s. Les raccords totalisent K = 4. Le budget est de 180 €.',
      goal: 'Choisis un diamètre intérieur parmi 8, 10, 12, 16, 20 et 25 mm. Calcule la vitesse moyenne v = Q/S et la perte de charge Δp. La mise en service exige v ≤ 5 m/s, Δp ≤ 6 bar et coût ≤ 180 €. Observe l’effet du diamètre sur la circulation de l’huile.',
      formula: 'Q = 35/60 000 m³/s ; v = 4Q/(πD²) ; Re = ρvD/μ ; Δp = (f L/D + K)ρv²/2 ; P_perdue = Δp Q. En régime laminaire f = 64/Re ; en transition 2 300–4 000 interpolation ; turbulent : Swamee–Jain. Fluide newtonien incompressible, conduites lisses à rugosité ε = 0,05 mm.',
      hints: ['Convertis le débit en m³/s et le diamètre en m avant de calculer la section.', 'Le diamètre agit au carré sur la vitesse ; la perte de charge dépend aussi de f et des singularités.', 'À 16 mm, v ≈ 2,90 m/s ; le coût est de 150 €. Vérifie Re et Δp avec la formule fournie.'],
      config: { flowLpm: 35, lengthM: 8, densityKgM3: 860, dynamicViscosityPaS: 0.03, roughnessMm: 0.05,
        minorLossCoefficient: 4, maxVelocityMps: 5, maxPressureDropBar: 6, maxBudgetEuro: 180,
        options: [{ diameterMm: 8, costEuro: 50 }, { diameterMm: 10, costEuro: 70 }, { diameterMm: 12, costEuro: 95 },
          { diameterMm: 16, costEuro: 150 }, { diameterMm: 20, costEuro: 220 }, { diameterMm: 25, costEuro: 300 }] },
      input: { label: 'Diamètre intérieur', unit: 'mm', min: 8, max: 25, step: 1, value: 12 }
    },
    {
      id: 'torsion-01', world: 'SI-11', skill: 'Contrainte tangentielle, moment quadratique polaire et angle de torsion',
      title: 'Torque Shaft', subtitle: 'Valider l’arbre de transmission', icon: '🔩', color: 'purple',
      type: 'torsion', mechanic: 'Sélectionner le diamètre d’un arbre plein et observer la torsion sous couple transmis.',
      context: 'Un arbre plein en acier de longueur 1,0 m transmet un couple constant de 350 N·m. Le module de cisaillement est G = 80 GPa ; la masse volumique est de 7 850 kg/m³. Le montage tolère au plus 70 MPa de contrainte, 2° de torsion et 10 kg de masse.',
      goal: 'Choisis un diamètre normalisé parmi 20, 25, 30, 35, 40 et 45 mm. Calcule J = πd⁴/32, τ_max = 16T/(πd³) et θ = TL/(GJ). Valide l’arbre si les trois limites sont respectées. Observe la déformation angulaire, amplifiée visuellement et sans valeur géométrique de mesure.',
      formula: 'J = πd⁴/32 [m⁴] ; τ_max = Td/(2J) [Pa] ; θ = TL/(GJ) [rad] ; m = ρπd²L/4 [kg]. Hypothèses : arbre circulaire plein, torsion pure élastique, petites déformations, aucune concentration de contrainte.',
      hints: ['Le diamètre doit être converti en mètres ; J dépend de la puissance quatrième.', 'Compare la contrainte en MPa, l’angle en degrés et la masse en kg : trois critères distincts.', 'Pour 35 mm, la torsion vaut environ 1,70° ; vérifie les deux autres critères.'],
      config: { torqueNm: 350, lengthM: 1, shearModulusPa: 80000000000, densityKgM3: 7850,
        maxStressMPa: 70, maxTwistDeg: 2, maxMassKg: 10, standardDiametersMm: [20, 25, 30, 35, 40, 45] },
      input: { label: 'Diamètre de l’arbre', unit: 'mm', min: 20, max: 45, step: 1, value: 30 }
    },

    {
      id: 'pneumatic-01', world: 'SI-07', skill: 'Effort pneumatique, ressort de rappel et course utile',
      title: 'Air Actuator', subtitle: 'Déployer le verrou pneumatique', icon: '🫧', color: 'blue',
      type: 'pneumatic', mechanic: 'Régler le détendeur et observer la course réellement permise par l’équilibre des forces.',
      context: 'Sur une presse de conditionnement, un vérin pneumatique simple effet doit pousser un verrou sur 80 mm. Il rencontre une résistance de 300 N et un ressort de rappel préchargé à 80 N, de raideur 2 000 N/m. La pression doit rester sous 4,0 bar en service.',
      goal: 'Calcule la surface d’un piston de 50 mm, la force de poussée ηpS et la force du ressort en fin de course. Règle la pression de 0 à 6 bar. Observe la course obtenue ; autorise la mise en service uniquement si la course atteint 80 mm et si la pression reste ≤ 4,0 bar.',
      formula: 'S = πD²/4 ; F_p = ηpS ; F_r(x) = F₀ + kx ; x_équilibre = min(course, max(0, (F_p − F_charge − F₀)/k)). Modèle quasi statique, débit imposé, air supposé à pression constante.',
      hints: ['Convertis 50 mm en 0,050 m et les bar en pascals.', 'En fin de course, le ressort oppose F₀ + kx, en plus de la charge.', 'p_min = (300 + 80 + 2 000 × 0,080)/(0,85 × π × 0,050²/4) ≈ 3,24 bar.'],
      config: { diameterMm: 50, efficiency: 0.85, loadN: 300, preloadN: 80, stiffnessNPerM: 2000,
        strokeM: 0.08, flowLpm: 15, maxPressureBar: 6, maxOperatingPressureBar: 4, trialDurationS: 4 },
      input: { label: 'Pression au détendeur', unit: 'bar', min: 0, max: 6, step: 0.1, value: 2.5 }
    },
    {
      id: 'thermal-01', world: 'SI-12', skill: 'Bilan thermique de refroidissement et puissance de pompe',
      title: 'Thermo Control', subtitle: 'Refroidir le moteur au banc', icon: '🌡', color: 'amber',
      type: 'thermal', mechanic: 'Ajuster le débit de liquide, vérifier l’élévation de température et la consommation de pompe.',
      context: 'Un moteur au banc cède 25 kW au circuit de refroidissement. Le liquide arrive à 75 °C. Le circuit présente une perte de charge supposée constante de 1,5 bar ; le rendement de pompe est de 60 %.',
      goal: 'Règle le débit de 10 à 80 L/min. Calcule le débit massique, l’élévation thermique et la puissance de pompe. Pour autoriser l’essai prolongé : ΔT ≤ 8 K ET puissance de pompe ≤ 230 W. Observe le réchauffement transitoire puis juge le régime permanent.',
      formula: 'ṁ = ρQ ; ΔT = Φ/(ṁcₚ) ; P_pompe = Δp Q/η ; T_sortie(t) = T_entrée + ΔT(1 − e^(−t/τ)). ρ = 1 000 kg/m³, cₚ = 4 180 J/(kg·K), τ = 15 s. Perte de charge constante, pas de thermostat.',
      hints: ['Convertis Q : 1 L/min = 1/60 000 m³/s.', 'Le débit massique vaut ρQ. Un débit plus fort diminue ΔT, mais augmente la puissance de pompe.', 'À 45 L/min, ṁ = 0,75 kg/s ; ΔT ≈ 7,97 K ; P_pompe = 187,5 W.'],
      config: { heatInputW: 25000, densityKgM3: 1000, heatCapacityJPerKgK: 4180,
        inletTemperatureC: 75, pressureDropPa: 150000, pumpEfficiency: 0.6,
        timeConstantS: 15, trialDurationS: 60, maxTemperatureRiseK: 8, maxPumpPowerW: 230 },
      input: { label: 'Débit de liquide', unit: 'L/min', min: 10, max: 80, step: 1, value: 25 }
    },
    {
      id: 'metrology-01', world: 'SI-13', skill: 'Incertitude composée et décision de conformité avec garde',
      title: 'Precision Gate', subtitle: 'Contrôler un axe avant remontage', icon: '📏', color: 'cyan',
      type: 'metrology', mechanic: 'Sélectionner un instrument en tenant compte de la résolution, de l’incertitude et du budget.',
      context: 'Un axe doit mesurer entre 49,90 et 50,10 mm. Une mesure stabilisée indique 49,94 mm. La répétabilité évaluée vaut 0,008 mm (écart-type). Le service dispose de 350 € pour choisir un instrument.',
      goal: 'Choisis une résolution proposée (0,01 ; 0,02 ; 0,05 ; 0,10 mm). Calcule l’incertitude élargie U = 2u_c, puis vérifie que l’intervalle [mesure − U ; mesure + U] reste dans la tolérance. Autorise le remontage uniquement si l’instrument est proposé, son coût ≤ 350 € et la conformité est démontrée.',
      formula: 'u_r = r/√12 ; u_c = √(u_r² + u_rép²) ; U = 2u_c ; acceptation si m − U ≥ L_inf et m + U ≤ L_sup. Hypothèses : composantes indépendantes, distribution uniforme de résolution, facteur 2 conventionnel.',
      hints: ['La résolution est une largeur de quantification : l’incertitude-type correspondante vaut r/√12.', 'Combine la répétabilité et la résolution quadratiquement, puis multiplie par 2.', 'À r = 0,05 mm : U ≈ 0,033 mm ; intervalle ≈ [49,907 ; 49,973] mm. Instrument à 140 € : accepté.'],
      config: { measuredMm: 49.94, lowerLimitMm: 49.90, upperLimitMm: 50.10,
        repeatabilityStdMm: 0.008, coverageFactor: 2, maxBudgetEuro: 350,
        instrumentOptions: [{ resolutionMm: 0.01, costEuro: 620 },{ resolutionMm: 0.02, costEuro: 290 },
          { resolutionMm: 0.05, costEuro: 140 },{ resolutionMm: 0.10, costEuro: 50 }] },
      input: { label: 'Résolution de l’instrument', unit: 'mm', min: 0.01, max: 0.10, step: 0.01, value: 0.10 }
    },
    {
      id: 'gear-01', world: 'SI-05', skill: 'Rapport de transmission d’un engrenage extérieur',
      title: 'Gear Forge', subtitle: 'Relancer le convoyeur', icon: '⚙', color: 'amber',
      type: 'gear', mechanic: 'Choisir physiquement la roue menée pour obtenir vitesse et couple.',
      context: 'Dans un atelier, un convoyeur doit redémarrer. Le moteur entraîne une roue de 20 dents à 900 tr/min. Tu dois choisir la roue menée pour obtenir la bonne vitesse de sortie.',
      goal: 'Calcule le nombre de dents Z₂ nécessaire pour obtenir une vitesse de sortie de 300 tr/min (en valeur absolue). Vérifie ensuite que le couple transmis atteint au moins 24 N·m. Saisis Z₂ en nombre entier de dents, puis lance un essai. Observe la vitesse et le sens de rotation.',
      formula: 'n₂ = −n₁ × Z₁/Z₂ ; |C₂| = η × C₁ × Z₂/Z₁ ; P₂ = η × P₁.',
      hints: ['Deux roues extérieures tournent en sens opposés.', 'Pour réduire la vitesse par trois, la roue menée doit avoir trois fois plus de dents.', 'Utilise n₂ = −n₁ × Z₁/Z₂ puis vérifie |C₂| = η × C₁ × Z₂/Z₁.'],
      config: { n1Rpm: 900, z1: 20, torqueNm: 9, efficiency: 0.9, targetRpm: 300, minimumTorqueNm: 24, toleranceRpm: 0.000001 },
      input: { label: 'Ma roue menée : nombre de dents Z₂', unit: 'dents', min: 12, max: 120, step: 1, value: 40 }
    },
    {
      id: 'moment-01', world: 'SI-02', skill: 'Équilibre en rotation autour d’un pivot',
      title: 'Méca Lab', subtitle: 'Équilibrer le bras de levage', icon: '⚖', color: 'cyan',
      type: 'moment', mechanic: 'Déplacer une masse sur un bras de levier jusqu’à annuler le moment résultant.',
      context: 'Un bras de levage est soumis à une charge de 450 N située à 2 m du pivot. De l’autre côté, un contrepoids exerce une force de 300 N. Tu dois choisir sa position pour équilibrer le bras.',
      goal: 'Calcule la distance d du contrepoids au pivot pour équilibrer les moments. Saisis d en mètres, puis lance un essai. Observe de quel côté le bras bascule. La mission est réussie si la valeur absolue du moment résultant ne dépasse pas 15 N·m.',
      formula: 'M_O = F × d ; ΣM_O = F_g × d_g − F_d × d_d ; R_O = F_g + F_d.',
      hints: ['La force et la distance au pivot interviennent toutes deux.', 'Équilibre : moment à gauche = moment à droite.', '450 N × 2 m = 300 N × d. Déplace le contrepoids pour annuler ΣM_O.'],
      config: { loadN: 450, leftArmM: 2, counterweightN: 300, toleranceNm: 15, inertiaKgM2: 1500, trialDurationS: 4 },
      input: { label: 'Ma distance d du contrepoids au pivot', unit: 'm', min: 0.5, max: 5, step: 0.1, value: 1.5 }
    },
    {
      id: 'gravity-01', world: 'SI-03', skill: 'Mouvement rectiligne uniformément varié',
      title: 'Gravity Run', subtitle: 'Positionner le rover', icon: '🚀', color: 'purple',
      type: 'rover', mechanic: 'Régler la force motrice, lancer le rover et analyser sa trajectoire et sa vitesse.',
      context: 'Un rover de 400 kg part du repos. Il doit atteindre une station située à 48 m en 8 s. Une force résistante constante de 120 N s’oppose au mouvement. Sa vitesse ne doit pas dépasser 12,5 m/s.',
      goal: '1. Calcule l’accélération nécessaire pour parcourir 48 m en 8 s depuis le repos. 2. Calcule la résultante des forces avec le PFD. 3. Déduis la force motrice en tenant compte des 120 N de résistance. Saisis tes trois résultats, puis lance le rover. Même si tu te trompes, observe la distance parcourue et la vitesse finale. Réussite : distance entre 46,5 et 49,5 m et vitesse finale ≤ 12,5 m/s.',
      formula: 'a = (F_m − F_r)/m ; x(t) = v₀t + ½at² ; v(t) = v₀ + at.',
      hints: ['La résistance au roulement s’oppose à la traction.', 'La vitesse augmente linéairement lorsque la force résultante est constante.', 'Calcule a avec le PFD, puis utilise x = ½at² puisque v₀ = 0.'],
      config: { massKg: 400, rollingResistanceN: 120, initialSpeedMps: 0, durationS: 8, targetDistanceM: 48, distanceToleranceM: 1.5, speedLimitMps: 12.5 },
      input: { label: 'Force de traction du moteur', unit: 'N', min: 0, max: 1200, step: 20, value: 400 }
    },
    {
      id: 'electric-01', world: 'SI-08', skill: 'Chute de tension et pertes Joule dans un circuit de démarrage',
      title: 'Volt Start', subtitle: 'Remettre le démarreur en service', icon: '⚡', color: 'cyan',
      type: 'electric', mechanic: 'Dimensionner une liaison 12 V : observer la chute de tension, les pertes thermiques et la masse du cuivre.',
      context: 'Après réparation d’un engin, le démarreur reçoit une alimentation 12,6 V. Le contrôle se fait à 180 A pendant 4 s. Le conducteur cuivre aller-retour mesure 4,0 m au total, avec 0,5 mΩ de résistance de contacts. Choisis la section normalisée du câble pour autoriser le démarrage sans échauffement excessif ni surmasse.',
      goal: 'Sélectionne une section parmi 6, 10, 16, 25, 35 et 50 mm². Calcule la résistance totale, la chute de tension, la tension au démarreur, les pertes Joule et la masse de cuivre. Lance un essai : le démarreur ne tourne que si U ≥ 10,5 V. La mise en service exige aussi P_pertes ≤ 200 W et une masse de cuivre ≤ 0,70 kg. Les essais incorrects restent possibles et leurs conséquences sont visibles.',
      formula: 'R_Cu = ρL/S ; R_tot = R_Cu + R_contacts ; ΔU = I × R_tot ; U_d = U_b − ΔU ; P_pertes = I² × R_tot ; m_Cu = ρ_m × L × S × 10⁻⁶. Hypothèses : I constant, cuivre à 20 °C.',
      hints: ['La longueur électrique de 4 m comprend l’aller et le retour : ne la double pas.', 'Pour une section plus grande, la résistance et les pertes diminuent, mais la masse augmente.', 'Teste les sections normalisées : 10 mm² dissipe trop ; 25 mm² dépasse la limite de masse.'],
      config: { batteryVoltageV: 12.6, currentA: 180, totalCopperLengthM: 4,
        copperResistivityOhmMm2PerM: 0.0175, contactResistanceOhm: 0.0005,
        copperDensityKgM3: 8960, minimumStarterVoltageV: 10.5,
        maxLossW: 200, maxCopperMassKg: 0.70, standardSectionsMm2: [6, 10, 16, 25, 35, 50] },
      input: { label: 'Section de la liaison électrique', unit: 'mm²', min: 6, max: 50, step: 1, value: 10 }
    },
    {
      id: 'spring-01', world: 'SI-11', skill: 'Loi de Hooke, énergie élastique et butée de compression',
      title: 'Spring Guard', subtitle: 'Protéger le support de machine', icon: '🌀', color: 'purple',
      type: 'spring', mechanic: 'Choisir un ressort et observer sa compression, sa réserve d’énergie et la réaction de la butée.',
      context: 'Une machine agricole exerce une charge verticale quasi statique de 1 200 N sur un support élastique. Une butée mécanique limite la compression à 32 mm. Le support doit se comprimer entre 26 et 31 mm pour fonctionner correctement, sans transmettre d’effort à la butée. Pour limiter le retour élastique à la décharge, l’énergie emmagasinée ne doit pas dépasser 17 J.',
      goal: 'Choisis une raideur normalisée parmi 25, 30, 35, 40, 45, 50 et 60 N/mm. Calcule la compression libre x = F/k, puis vérifie la compression réelle limitée par la butée, l’effort du ressort et l’énergie élastique. Lance un essai, même avec un mauvais choix. Réussite : 26 à 31 mm de compression, butée sans effort, énergie ≤ 17 J et raideur proposée.',
      formula: 'k_SI = 1000 × k_(N/mm) ; x_libre = F/k_SI ; x_réel = min(x_libre, 0,032 m) ; F_ressort = k_SI × x_réel ; F_butée = max(0, F − F_ressort) ; E = ½ k_SI × x_réel². Modèle linéaire quasi statique, sans amortissement.',
      hints: ['Convertis la raideur : 1 N/mm = 1000 N/m. La compression libre vaut F/k.', 'Une raideur trop faible entraîne le contact avec la butée ; une raideur trop forte donne une compression insuffisante.', 'Pour 1 200 N, compare k = 40 N/mm (30 mm, 18 J) et k = 45 N/mm (26,67 mm, 16 J).'],
      config: { loadN: 1200, maxStrokeMm: 32, minimumUsefulStrokeMm: 26, maximumUsefulStrokeMm: 31, maximumEnergyJ: 17, standardStiffnessNPerMm: [25, 30, 35, 40, 45, 50, 60] },
      input: { label: 'Raideur du ressort', unit: 'N/mm', min: 20, max: 70, step: 1, value: 35 }
    },
    {
      id: 'brake-01', world: 'SI-04', skill: 'PFD en freinage, distance d’arrêt et limite d’adhérence',
      title: 'Brake Point', subtitle: 'Arrêter le télescopique avant la zone de sécurité', icon: '🛑', color: 'amber',
      type: 'brake', mechanic: 'Régler un freinage réel : distance de réaction, décélération, adhérence et roues bloquées.',
      context: 'Un télescopique de 6 000 kg roule à 4,0 m/s sur une aire d’essais plane. La ligne de sécurité est à 7,0 m devant l’avant de la machine. Le conducteur met 0,80 s à réagir ; pendant ce délai la vitesse reste constante. Au freinage, une résistance au roulement de 300 N s’ajoute à l’effort de freinage. L’adhérence limite la force transmise au sol.',
      goal: 'Choisis une force de freinage commandée entre 8 et 24 kN. Calcule la distance de réaction, la décélération, la distance de freinage puis la distance d’arrêt totale. Saisis ton estimation de distance (tolérance de calcul ± 0,10 m), puis lance l’essai. Le télescopique doit s’arrêter avant 7,0 m, sans blocage des roues. Une commande supérieure à la limite d’adhérence provoque une glissade : la force de freinage devient μ_glisse × m × g. Les essais erronés restent possibles.',
      formula: 'F_adh,max = μ_s m g ; F_f,eff = F_commandée si F_commandée ≤ F_adh,max, sinon μ_glisse m g (roues bloquées) ; a = −(F_f,eff + F_r)/m ; d_r = v₀t_r ; d_f = v₀²/(2|a|) ; d_arrêt = d_r + d_f. Route horizontale, modèle à effort constant, sans ABS.',
      hints: ['Commence par d_r = v₀ × t_r : la réaction consomme déjà une partie des 7 m.', 'Pour éviter la glissade, compare la commande à μ_s × m × g. Une commande excessive bloque les roues dans ce modèle sans ABS.', 'À 16 kN, |a| = (16 000 + 300)/6 000 = 2,717 m/s² ; d_f = 16/(2 × 2,717) ≈ 2,945 m ; d_arrêt ≈ 6,145 m.'],
      config: { massKg: 6000, initialSpeedMps: 4, reactionTimeS: 0.8, rollingResistanceN: 300,
        staticFrictionCoefficient: 0.35, slidingFrictionCoefficient: 0.23, gravityMps2: 9.81,
        safetyLineM: 7, trialDurationS: 4, calculationToleranceM: 0.10, wheelRadiusM: 0.48 },
      input: { label: 'Force de freinage commandée', unit: 'kN', min: 8, max: 24, step: 0.5, value: 10 }
    },
    {
      id: 'hydro-01', world: 'SI-06', skill: 'Effort d’un vérin hydraulique en sortie de tige',
      title: 'Hydro Flow', subtitle: 'Lever la charge sans surpression', icon: '💧', color: 'blue',
      type: 'hydro', mechanic: 'Régler la pression de service pour soulever la charge sans gaspiller la pression.',
      context: 'Un vérin hydraulique doit soulever une charge de 12 000 N. Son piston mesure 40 mm de diamètre. Le rendement mécanique est de 90 %. La pression maximale autorisée est de 160 bar. La pompe fournit 2 L/min (rendement volumétrique 90 %) et la course utile est de 80 mm.',
      goal: 'Calcule la surface du piston et la pression minimale de levage. Choisis une pression de service, puis lance le vérin : le débit impose la vitesse de tige. Un réglage insuffisant laisse la charge immobile ; une surpression déclenche le verrouillage de sécurité. Réussite : levage possible, pression ≤ 160 bar et dépassement du minimum ≤ 12 %. Le seuil calculé arrondi à 0,1 bar est accepté comme calcul, sans garantir le levage réel.',
      formula: 'S = πD²/4 ; F_utile = ηₘ × p × S ; p_min = F_charge/(ηₘ × S) ; v = ηᵥ × Q/S ; x = min(course, v × temps de mouvement). Modèle quasi statique à pression imposée.',
      hints: ['Convertis le diamètre de millimètres en mètres et la pression de bar en pascals.', 'La surface du piston est S = πD²/4.', 'Calcule la pression minimale pour lever la charge, puis choisis une valeur juste au-dessus.'],
      config: { diameterMm: 40, efficiency: 0.9, loadN: 12000, maxPressureBar: 160, allowedExcessFraction: 0.12, flowLpm: 2, volumetricEfficiency: 0.9, strokeM: 0.08, trialDurationS: 4, valveDelayS: 0.5, pressureCalculationToleranceBar: 0.05 },
      input: { label: 'Ma pression de service', unit: 'bar', min: 0, max: 200, step: 0.1, value: 80 }
    }
  ].map(x => Object.freeze(x));
  const api = Object.freeze({ targets, worlds, levels, byId: id => levels.find(l => l.id === id) || null });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SICatalog = api;
})(typeof window === 'undefined' ? globalThis : window);
