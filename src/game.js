(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const level = window.SICatalog.byId(new URLSearchParams(location.search).get('level')) || window.SICatalog.byId('gear-01');
  const P = window.SIPhysics;
  const Coach = window.SICoaching;
  let activeConfig = level.config, variantActive = false, solutionViewed = false;
  const fr = (n, digits = 1) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(n);
  const canvas = $('simulation');
  const ctx = canvas.getContext('2d');
  let reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const TRIAL_DURATION_MS = 4000;
  const parseInput = el => Number(el.value.trim().replace(',', '.'));
  let attempts = 0, hints = 0, sessionAttempts = 0, sessionHints = 0, solved = false, animationStart = 0, gearAngle = 0, testAnimating = false, activeTrial = null, rafId = null;
  const input = $('game-value'), slider = $('game-slider');
    document.title = 'SI QUEST — ' + level.title + ' : ' + level.subtitle;
  $('game-universe').textContent = level.world + ' · NIVEAU JOUABLE';
  $('game-skill').textContent = level.skill.toUpperCase();
  $('game-title').textContent = level.icon + ' ' + level.title + ' — ' + level.subtitle;
  $('game-context').textContent = level.context;
  $('game-goal').textContent = level.goal;
  $('input-label').textContent = level.input.label;
  $('game-unit').textContent = level.input.unit;
  $('formula-text').textContent = level.formula;
  $('scene-label').textContent = level.title.toUpperCase() + ' · ' + level.skill;
  const missionText = {
    gear: ['Calcule le nombre de dents Z₂. Saisis un entier puis lance la transmission. Vérifie la vitesse et le couple obtenus.', 'Nombre de dents de la roue menée Z₂', 'Seuls les nombres entiers de dents sont possibles. Une erreur de calcul n’empêche pas l’essai.'],
    moment: ['Calcule la distance d du contrepoids au pivot. Saisis-la puis observe si le bras reste équilibré ou bascule.', 'Distance d du contrepoids', 'Le moment résultant est acceptable entre −' + activeConfig.toleranceNm + ' et +' + activeConfig.toleranceNm + ' N·m. L’essai reste possible en cas d’erreur.'],
    rover: ['Calcule successivement l’accélération, la résultante des forces et la traction. Les trois valeurs seront vérifiées séparément. La traction saisie commande le rover.', 'Force motrice à appliquer', 'Chaque calcul dispose de sa tolérance propre. Même avec une erreur, tu peux lancer le rover pour observer le résultat.'],
    electric: ['Calcule R, ΔU, U_d, P_pertes et la masse de cuivre. Choisis une section normalisée, puis observe le démarreur et les pertes lors de l’essai.', 'Section de câble en cuivre', 'Sections normalisées : 6, 10, 16, 25, 35 ou 50 mm². L’essai est possible avec une autre valeur, mais la mise en service n’est pas conforme.'],
    brake: ['Calcule la distance de réaction et la distance de freinage. Choisis la force commandée, saisis ta distance d’arrêt calculée, puis observe la trajectoire et le blocage éventuel des roues.', 'Force de freinage commandée', 'Force entre 8 et 24 kN. La tolérance ± 0,10 m concerne ton calcul de distance, pas la ligne de sécurité à 7,0 m.'],
    spring: ['Calcule la compression libre avec F/k, puis choisis la raideur. Observe le ressort, la butée et l’énergie élastique.', 'Raideur k du ressort', 'Choisis une raideur entre 20 et 70 N/mm. Une raideur non normalisée peut être essayée mais ne valide pas la mission.'],
    pneumatic: ['Calcule la pression de fin de course en tenant compte de la charge et du ressort. Règle le détendeur et lance le vérin.', 'Pression du détendeur', 'La pression doit assurer 80 mm de course sans dépasser 4,0 bar en service.'],
    thermal: ['Établis le bilan thermique et le bilan de puissance de pompe. Règle le débit puis lance le banc.', 'Débit du liquide de refroidissement', 'Le régime permanent impose ΔT ≤ 8 K et P_pompe ≤ 230 W.'],
    metrology: ['Combine la répétabilité et la résolution. Choisis un instrument proposé puis décide de la conformité.', 'Résolution de l’instrument', 'Résolutions disponibles : 0,01 ; 0,02 ; 0,05 ; 0,10 mm. Vérifie aussi le budget de 350 €.'],
    hose: ['Calcule le nombre de Reynolds, le facteur de frottement et la perte de charge du flexible. Choisis son diamètre puis vérifie le coût.', 'Diamètre intérieur du flexible', 'Les diamètres proposés sont 8, 10, 12, 16, 20, 25 mm ; les autres sont essayables mais non validés.'],
    torsion: ['Calcule le moment polaire J, la contrainte et l’angle de torsion ; sélectionne un diamètre normalisé.', 'Diamètre de l’arbre', 'Les diamètres proposés sont 20, 25, 30, 35, 40, 45 mm ; un diamètre intermédiaire peut être essayé sans être accepté.'],
    hydro: ['Calcule d’abord la surface du piston et la pression minimale. Choisis ensuite une pression de service en bar et lance le vérin. Le débit détermine la vitesse de sortie de tige.', 'Pression de service à appliquer', 'Le calcul de p_min est accepté à ±' + fr(activeConfig.pressureCalculationToleranceBar, 2) + ' bar. La pression de service doit néanmoins être suffisante et respecter les limites de sécurité.']
  }[level.type];
  $('calculation-intro').textContent = missionText[0];
  $('prediction-label').textContent = missionText[1];
  $('prediction-help').textContent = missionText[2];

  const setBest = () => { const n = window.SIStorage.summary().levels[level.id]?.bestStars || 0; $('game-best').textContent = 'Record : ' + n + ' / 3 ★'; };
  setBest();
  const configs = {
    gear: [['Moteur', '900 tr/min'], ['Roue motrice', '20 dents'], ['Couple moteur', '9 N·m'], ['Rendement', '90 %']],
    moment: [['Charge gauche', '450 N'], ['Bras gauche', '2 m'], ['Contrepoids', '300 N'], ['Tolérance', '± 15 N·m']],
    rover: [['Masse du rover', '400 kg'], ['Résistance au roulement', '120 N'], ['Temps de trajet', '8 s'], ['Vitesse limite', '12,5 m/s']],
    electric: [['Batterie (à vide, modèle)', '12,6 V'], ['Courant imposé', '180 A'], ['Cuivre aller + retour', '4,0 m'], ['Résistance des contacts', '0,5 mΩ'], ['ρ du cuivre à 20 °C', '0,0175 Ω·mm²/m'], ['Tension mini démarreur', '10,5 V'], ['Pertes maximales', '200 W'], ['Masse maximale', '0,70 kg']],
    brake: [['Masse de l’engin', '6 000 kg'], ['Vitesse initiale', '4,0 m/s'], ['Temps de réaction', '0,80 s'], ['Résistance au roulement', '300 N'], ['Adhérence statique μₛ', '0,35'], ['Glissement μg', '0,23'], ['Pesanteur', '9,81 m/s²'], ['Ligne de sécurité', '7,0 m'], ['Tolérance de calcul', '± 0,10 m']],
    spring: [['Charge verticale', '1 200 N'], ['Course de butée', '32 mm'], ['Compression utile', '26 à 31 mm'], ['Énergie maximale', '17 J'], ['Raideurs proposées', '25, 30, 35, 40, 45, 50, 60 N/mm']],
    pneumatic: [['Piston', '50 mm'], ['Charge', '300 N'], ['Ressort initial', '80 N'], ['Raideur', '2 000 N/m'], ['Course', '80 mm'], ['Rendement', '85 %'], ['Débit', '15 L/min'], ['Pression de service max', '4,0 bar']],
    thermal: [['Puissance à évacuer', '25 kW'], ['Température d’entrée', '75 °C'], ['ρ', '1 000 kg/m³'], ['cₚ', '4 180 J/(kg·K)'], ['Perte de charge', '1,5 bar'], ['Rendement pompe', '60 %'], ['ΔT max', '8 K'], ['Puissance pompe max', '230 W']],
    metrology: [['Mesure', '49,94 mm'], ['Tolérance', '49,90 à 50,10 mm'], ['Écart-type répétabilité', '0,008 mm'], ['Facteur k', '2'], ['Budget', '350 €'], ['Coûts 0,01 / 0,02 / 0,05 / 0,10 mm', '620 / 290 / 140 / 50 €']],
    hose: [['Débit d’huile', '35 L/min'], ['Longueur de flexible', '8 m'], ['Masse volumique', '860 kg/m³'], ['Viscosité dynamique', '0,030 Pa·s'], ['Rugosité', '0,05 mm'], ['Coefficient K raccords', '4'], ['Vitesse max', '5 m/s'], ['Δp max', '6 bar'], ['Budget', '180 €']],
    torsion: [['Couple', '350 N·m'], ['Longueur', '1,0 m'], ['Module G', '80 GPa'], ['Masse volumique', '7 850 kg/m³'], ['Contrainte max', '70 MPa'], ['Torsion max', '2°'], ['Masse max', '10 kg']],
    hydro: [['Diamètre du piston' , '40 mm'], ['Charge', '12 000 N'], ['Rendement mécanique', '90 %'], ['Débit pompe', '2 L/min'], ['Rendement volumétrique', '90 %'], ['Course du vérin', '80 mm'], ['Pression maximale', '160 bar']]
  };
  function fillMetrics(el, values) {
    el.replaceChildren();
    for (const [label, value] of values) {
      const div = document.createElement('div'); div.className = 'metric';
      const small = document.createElement('small'); small.textContent = label;
      const strong = document.createElement('strong'); strong.textContent = value;
      div.append(small, strong); el.append(div);
    }
  }
  fillMetrics($('given-data'), configs[level.type]);
  for (const field of [input, slider]) { field.min = level.input.min; field.max = level.input.max; field.step = level.input.step; field.value = level.input.value; }
  $('input-help').textContent = 'Plage autorisée : ' + fr(level.input.min) + ' à ' + fr(level.input.max) + ' ' + level.input.unit + '. Utilise les flèches du clavier pour ajuster.';
  function currentValue() { return parseInput(input); }
  let predictionValidated = false;
  $('prediction-unit').textContent = level.input.unit;
  const reveal = () => attempts > 0;
  if (level.type !== 'rover') {
    $('input-label').hidden = true; $('input-label').nextElementSibling.hidden = true;
    $('input-help').hidden = true;
    $('prediction').value = '';
  }
  const hasModelArithmetic = ['pneumatic','thermal','metrology','hose','torsion'].includes(level.type);
  if (hasModelArithmetic) {
    const cfg = {
      pneumatic: ['Pression minimale calculée p_min (bar)', 'Tolérance de calcul : ± 0,05 bar. Calcule à partir des forces en fin de course.'],
      thermal: ['Élévation de température ΔT calculée (K)', 'Tolérance de calcul : ± 0,15 K. Recalcule avec le débit que tu as choisi.'],
      metrology: ['Incertitude élargie U calculée (mm)', 'Tolérance de calcul : ± 0,002 mm. Recalcule avec la résolution choisie.'],
      hose: ['Perte de charge totale Δp calculée (bar)', 'Tolérance de calcul : ± 0,05 bar. Recalcule pour le diamètre choisi.'],
      torsion: ['Angle de torsion θ calculé (°)', 'Tolérance de calcul : ± 0,05°. Recalcule pour le diamètre choisi.']
    }[level.type];
    $('model-calculations').hidden = false;
    $('model-answer-label').textContent = cfg[0];
    $('model-answer-help').textContent = cfg[1];
    $('prediction').closest('.input-row').after($('model-calculations'));
    $('model-calculations').append($('check-prediction'));
  }
  if (level.type === 'brake') {
    $('brake-calculations').hidden = false;
    // Brake controls in the cognitive order: set force → estimate stopping distance → verify.
    $('prediction').closest('.input-row').after($('brake-calculations'));
    $('brake-calculations').append($('check-prediction'));
  }
  if (level.type === 'rover') {
    $('rover-calculations').hidden = false;
    $('input-label').classList.add('rover-control-lock');
    $('input-label').hidden = true; $('input-label').nextElementSibling.hidden = true;
    $('input-help').hidden = true;
    $('game-slider').disabled = true; $('game-value').disabled = true;
    $('game-slider').value = 400; $('game-value').value = 400;
    $('prediction').closest('.input-row').hidden = true;
  }
  function conceal() { $('live-data').replaceChildren(); $('results-text').textContent = 'Les résultats seront disponibles après ton premier essai.'; $('rover-charts').classList.add('hidden'); $('scene-banner').textContent = 'Prépare ton calcul, puis réalise un essai.'; }
  conceal();
  function roverArithmeticStatus() {
    const c = activeConfig;
    const expectedA = 2 * c.targetDistanceM / c.durationS ** 2;
    const expectedNet = c.massKg * expectedA;
    const expectedForce = expectedNet + c.rollingResistanceN;
    const a = parseInput($('calc-a')), net = parseInput($('calc-net')), force = parseInput($('calc-force'));
    const checks = [Math.abs(a - expectedA) <= 0.075 + 1e-9,
      Math.abs(net - expectedNet) <= 18 + 1e-9,
      Math.abs(force - expectedForce) <= 22 + 1e-9];
    return { checks, passed: checks.every(Boolean) };
  }
  function modelArithmeticStatus(result) {
    const field = $('model-answer');
    const proposed = field.value.trim() ? parseInput(field) : NaN;
    const spec = level.type === 'pneumatic' ? { expected: result.requiredPressureBar, tolerance: 0.05, unit: 'bar' } :
      level.type === 'thermal' ? { expected: result.temperatureRiseK, tolerance: 0.15, unit: 'K' } :
      level.type === 'hose' ? { expected: result.pressureDropBar, tolerance: 0.05, unit: 'bar' } :
      level.type === 'torsion' ? { expected: result.twistDeg, tolerance: 0.05, unit: '°' } :
      { expected: result.expandedUncertaintyMm, tolerance: 0.002, unit: 'mm' };
    return { ...spec, proposed, passed: Number.isFinite(proposed) &&
      Math.abs(proposed - spec.expected) <= spec.tolerance + 1e-10 };
  }
  function brakeArithmeticStatus(result) {
    const field = $('brake-distance');
    const raw = field.value.trim();
    const proposed = raw ? parseInput(field) : NaN;
    const toleranceM = activeConfig.calculationToleranceM;
    return { passed: Number.isFinite(proposed) && Math.abs(proposed - result.stoppingDistanceM) <= toleranceM + 1e-9,
      proposed, toleranceM };
  }
  // Separate arithmetic verification from mission constraints.
  $('check-prediction').addEventListener('click', () => {
    if (level.type === 'rover') {
      const fields = ['calc-a', 'calc-net', 'calc-force'];
      if (!fields.every(id => $(id).value.trim() !== '' && Number.isFinite(parseInput($(id))))) {
        $('prediction-feedback').textContent = 'Renseigne les trois résultats numériques avant la vérification.';
        return;
      }
      const tests = roverArithmeticStatus().checks;
      predictionValidated = tests.every(Boolean);
      $('prediction-feedback').textContent = tests.map((ok, i) =>
        ['Accélération', 'Résultante des forces', 'Force motrice'][i] + ' : ' +
        (ok ? 'calcul accepté' : 'à revoir')).join(' · ') +
        '. Tu peux lancer l’essai dans tous les cas.';
      $('launch').disabled = !roverFieldsValid();
      return;
    }
    if (level.type === 'brake') {
      const rawBrake = $('prediction').value.trim();
      if (!rawBrake || !validValue(parseInput($('prediction')))) {
        $('prediction-feedback').textContent = 'Saisis une force de freinage entre 8 et 24 kN.';
        return;
      }
      const r = compute(parseInput($('prediction')));
      const arithmetic = brakeArithmeticStatus(r);
      predictionValidated = arithmetic.passed;
      $('prediction-feedback').textContent = (arithmetic.passed ?
        'Distance calculée acceptée (tolérance ± 0,10 m). ' :
        'Distance calculée manquante ou hors tolérance (± 0,10 m). ') +
        (r.physicalPassed ? 'Arrêt physiquement conforme.' :
          r.wheelsLocked ? 'Roues bloquées : essai non conforme.' : 'Arrêt au-delà de la ligne de sécurité.') +
        ' Tu peux essayer dans tous les cas.';
      $('launch').disabled = !genericFieldsValid();
      return;
    }
    const raw = $('prediction').value.trim();
    if (!raw || !Number.isFinite(parseInput($('prediction')))) {
      $('prediction-feedback').textContent = 'Saisis une valeur numérique.';
      return;
    }
    const proposed = parseInput($('prediction'));
    if (!validValue(proposed)) {
      $('prediction-feedback').textContent = 'Valeur hors plage de réglage ou format invalide. Vérifie l’unité et les limites de la machine.';
      return;
    }
    const result = compute(proposed);
    if (hasModelArithmetic) {
      const arithmetic = modelArithmeticStatus(result);
      predictionValidated = arithmetic.passed;
      $('prediction-feedback').textContent = (arithmetic.passed ?
        'Calcul accepté (tolérance ± ' + fr(arithmetic.tolerance, 3) + ' ' + arithmetic.unit + '). ' :
        'Calcul manquant ou hors tolérance (± ' + fr(arithmetic.tolerance, 3) + ' ' + arithmetic.unit + '). ') +
        (result.passed ? 'Le réglage physique est conforme.' : 'Le réglage physique ne respecte pas toutes les contraintes.') +
        ' Tu peux lancer l’essai dans tous les cas.';
      $('launch').disabled = !genericFieldsValid();
      return;
    }
    const nearThreshold = level.type === 'hydro' &&
      Math.abs(proposed - result.requiredPressureBar) <= activeConfig.pressureCalculationToleranceBar + 1e-9;
    predictionValidated = result.passed || nearThreshold;
    if (result.passed) {
      $('prediction-feedback').textContent = 'Réglage de service conforme. Tu peux lancer l’essai.';
    } else if (nearThreshold) {
      $('prediction-feedback').textContent = 'Calcul de pression minimale accepté (arrondi à 0,1 bar). Le réglage réel est encore insuffisant de ' + fr(Math.abs(result.forceMarginN), 2) + ' N : essaie une pression légèrement supérieure.';
    } else {
      $('prediction-feedback').textContent = 'Réglage non conforme : ce verdict ne juge pas la justesse de tes étapes de calcul. Lance un essai pour comprendre.';
    }
    $('launch').disabled = !genericFieldsValid();
  });
  $('prediction').addEventListener('input', () => { predictionValidated = false; if (level.type !== 'rover') { $('launch').disabled = !genericFieldsValid(); update(); } });
  if (level.type === 'brake') $('brake-distance').addEventListener('input', () => { predictionValidated = false; });
  if (hasModelArithmetic) $('model-answer').addEventListener('input', () => { predictionValidated = false; });
  if (level.type === 'rover') {
    for (const id of ['calc-a','calc-net','calc-force']) $(id).addEventListener('input', () => { predictionValidated = false; $('launch').disabled = !roverFieldsValid(); $('prediction').value = $('calc-force').value; });
    
  }

  function genericFieldsValid() {
    return $('prediction').value.trim() !== '' && validValue(parseInput($('prediction')));
  }
  function roverFieldsValid() {
    return ['calc-a','calc-net','calc-force'].every(id => $(id).value.trim() !== '' && Number.isFinite(parseInput($(id)))) && parseInput($('calc-force')) >= 0 && parseInput($('calc-force')) <= level.input.max;
  }
  function validValue(value) {
    if (!Number.isFinite(value) || value < level.input.min || value > level.input.max) return false;
    return level.type !== 'gear' || (Number.isInteger(value) && value > 0); // Nombre de dents entier.
  }
  function compute(value) {
    const c = activeConfig;
    if (level.type === 'hose') {
      const r = P.hoseLoss({ ...c, diameterMm: value });
      const option = c.options.find(o => o.diameterMm === value);
      const velocityOK = r.velocityMps <= c.maxVelocityMps + 1e-9;
      const lossOK = r.pressureDropBar <= c.maxPressureDropBar + 1e-9;
      const budgetOK = !!option && option.costEuro <= c.maxBudgetEuro;
      return { ...r, option, velocityOK, lossOK, budgetOK, passed: velocityOK && lossOK && budgetOK,
        values: [['Vitesse moyenne', fr(r.velocityMps, 3) + ' m/s'], ['Nombre de Reynolds', fr(r.reynolds, 0)],
          ['Facteur Darcy', fr(r.frictionFactor, 5)], ['Perte répartie', fr(r.distributedLossPa / 1e5, 3) + ' bar'],
          ['Perte singulière', fr(r.minorLossPa / 1e5, 3) + ' bar'], ['Perte totale', fr(r.pressureDropBar, 3) + ' bar'],
          ['Puissance dissipée', fr(r.dissipatedPowerW, 1) + ' W'], ['Coût', option ? option.costEuro + ' €' : 'hors catalogue']],
        explain: 'S = π(' + fr(value / 1000, 4) + ' m)²/4 = ' + fr(r.areaM2, 7) + ' m² ; Q = ' + fr(r.flowM3PerS, 7) +
          ' m³/s ; v = Q/S = ' + fr(r.velocityMps, 3) + ' m/s ; Re = ' + fr(r.reynolds, 0) +
          ' ; f = ' + fr(r.frictionFactor, 5) + ' ; Δp = (fL/D + K)ρv²/2 = ' + fr(r.pressureDropBar, 3) +
          ' bar ; P_perdue = ΔpQ = ' + fr(r.dissipatedPowerW, 2) + ' W. ' +
          (!velocityOK ? 'Vitesse excessive : risque de pertes et de nuisances.' : !lossOK ? 'Perte de charge excessive.' :
            !budgetOK ? 'Coût ou diamètre non conforme au catalogue.' : 'Choix compatible avec les trois critères.') };
    }
    if (level.type === 'torsion') {
      const r = P.solidShaftTorsion({ ...c, diameterMm: value });
      const standard = c.standardDiametersMm.includes(value);
      const stressOK = r.maxShearStressMPa <= c.maxStressMPa + 1e-9;
      const twistOK = r.twistDeg <= c.maxTwistDeg + 1e-9;
      const massOK = r.massKg <= c.maxMassKg + 1e-9;
      return { ...r, standard, stressOK, twistOK, massOK, passed: standard && stressOK && twistOK && massOK,
        values: [['Moment polaire J', fr(r.polarSecondMomentM4 * 1e8, 4) + ' × 10⁻⁸ m⁴'],
          ['Contrainte tangentielle max', fr(r.maxShearStressMPa, 3) + ' MPa'],
          ['Angle de torsion', fr(r.twistDeg, 3) + ' °'], ['Masse de l’arbre', fr(r.massKg, 3) + ' kg'],
          ['Diamètre normalisé', standard ? 'oui' : 'non']],
        explain: 'J = π(' + fr(value / 1000, 4) + ' m)⁴/32 = ' + fr(r.polarSecondMomentM4 * 1e8, 4) +
          ' × 10⁻⁸ m⁴ ; τ = Td/(2J) = ' + fr(r.maxShearStressMPa, 3) +
          ' MPa ; θ = TL/(GJ) = ' + fr(r.twistDeg, 3) + '° ; masse = ' + fr(r.massKg, 3) +
          ' kg. ' + (!stressOK ? 'Contrainte excessive.' : !twistOK ? 'Rotation relative excessive.' :
            !massOK ? 'Masse excessive.' : !standard ? 'Diamètre non normalisé.' : 'Arbre conforme aux trois critères.') };
    }
    if (level.type === 'pneumatic') {
      const r = P.pneumaticCylinder({ ...c, pressureBar: value, timeS: c.trialDurationS });
      const passed = r.fullStroke && !r.safetyLocked && value <= c.maxOperatingPressureBar;
      return { ...r, passed,
        values: [['Surface piston', fr(r.areaM2 * 1e4, 3) + ' cm²'],
          ['Force de poussée', fr(r.availableForceN, 1) + ' N'],
          ['Pression minimale', fr(r.requiredPressureBar, 3) + ' bar'],
          ['Course atteignable', fr(r.equilibriumM * 1000, 2) + ' mm'],
          ['Force ressort à la position', fr(r.springForceN, 1) + ' N'],
          ['Marge en fin de course', fr(r.forceMarginAtEndN, 1) + ' N']],
        explain: 'S = π × (0,050 m)² / 4 = ' + fr(r.areaM2, 8) + ' m². F_p = ηpS = 0,85 × ' + fr(value * 1e5, 0) + ' Pa × S = ' + fr(r.availableForceN, 2) + ' N. En fin de course F_r = 80 + 2 000 × 0,080 = 240 N ; charge totale = 540 N. p_min = ' + fr(r.requiredPressureBar, 3) + ' bar. Course d’équilibre = ' + fr(r.equilibriumM * 1000, 2) + ' mm. ' + (r.safetyLocked ? 'Protection amont activée : vérin bloqué.' : !r.fullStroke ? 'Le verrou reste partiellement déployé.' : value > c.maxOperatingPressureBar ? 'Course complète mais pression de service excessive.' : 'Course complète et pression de service conforme.') };
    }
    if (level.type === 'thermal') {
      const r = P.coolingLoop({ ...c, flowLpm: value, timeS: c.trialDurationS });
      const temperatureOK = r.temperatureRiseK <= c.maxTemperatureRiseK + 1e-9;
      const powerOK = r.pumpPowerW <= c.maxPumpPowerW + 1e-9;
      return { ...r, temperatureOK, powerOK, passed: temperatureOK && powerOK,
        values: [['Débit massique', fr(r.massFlowKgPerS, 3) + ' kg/s'],
          ['Élévation thermique en régime établi', fr(r.temperatureRiseK, 3) + ' K'],
          ['Température sortie établie', fr(r.outletSteadyC, 2) + ' °C'],
          ['Puissance de pompe', fr(r.pumpPowerW, 2) + ' W'],
          ['Sortie à 60 s (modèle transitoire)', fr(r.outletAtTimeC, 2) + ' °C']],
        explain: 'Q = ' + fr(value, 1) + '/60 000 = ' + fr(r.flowM3PerS, 7) + ' m³/s ; ṁ = 1 000 × Q = ' + fr(r.massFlowKgPerS, 3) + ' kg/s. ΔT = 25 000/(ṁ × 4 180) = ' + fr(r.temperatureRiseK, 3) + ' K ; T_sortie,établi = ' + fr(r.outletSteadyC, 3) + ' °C. P_pompe = 150 000 × Q / 0,6 = ' + fr(r.pumpPowerW, 2) + ' W. ' + (!temperatureOK ? 'Élévation thermique excessive.' : !powerOK ? 'Pompe trop énergivore.' : 'Refroidissement et puissance conformes.') };
    }
    if (level.type === 'metrology') {
      const r = P.guardedMeasurement({ ...c, resolutionMm: value });
      const option = c.instrumentOptions.find(o => Math.abs(o.resolutionMm - value) < 1e-8);
      const budgetOK = !!option && option.costEuro <= c.maxBudgetEuro;
      return { ...r, option, budgetOK, passed: r.accepted && budgetOK,
        values: [['Résolution choisie', fr(value, 3) + ' mm' + (option ? '' : ' · hors catalogue')],
          ['Incertitude-type de résolution', fr(r.resolutionStdMm, 5) + ' mm'],
          ['Incertitude-type composée', fr(r.combinedStdMm, 5) + ' mm'],
          ['Incertitude élargie U', fr(r.expandedUncertaintyMm, 5) + ' mm'],
          ['Intervalle bas', fr(r.intervalLowerMm, 4) + ' mm'],
          ['Intervalle haut', fr(r.intervalUpperMm, 4) + ' mm'],
          ['Prix', option ? option.costEuro + ' €' : 'Instrument non proposé']],
        explain: 'u_r = ' + fr(value, 3) + '/√12 = ' + fr(r.resolutionStdMm, 5) + ' mm ; u_c = √(u_r² + 0,008²) = ' + fr(r.combinedStdMm, 5) + ' mm ; U = 2u_c = ' + fr(r.expandedUncertaintyMm, 5) + ' mm. Intervalle = [' + fr(r.intervalLowerMm, 4) + ' ; ' + fr(r.intervalUpperMm, 4) + '] mm, limites [49,90 ; 50,10] mm. ' + (!r.accepted ? 'Conformité non démontrée : intervalle hors tolérance.' : !option ? 'Instrument non proposé.' : !budgetOK ? 'Budget dépassé.' : 'Conformité démontrée avec budget respecté.') };
    }
    if (level.type === 'gear') {
      const r = P.gear({ n1Rpm: c.n1Rpm, z1: c.z1, z2: value, torqueNm: c.torqueNm, efficiency: c.efficiency });
      return { ...r, passed: Math.abs(Math.abs(r.n2Rpm) - c.targetRpm) <= c.toleranceRpm && r.outputTorqueNm >= c.minimumTorqueNm,
        values: [['Vitesse de sortie', fr(Math.abs(r.n2Rpm), 2) + ' tr/min · sens inverse'], ['Couple disponible', fr(r.outputTorqueNm, 2) + ' N·m'], ['Puissance utile', fr(r.outputPowerW / 1000, 3) + ' kW'], ['Rapport i = Z₂/Z₁', fr(r.ratio, 2)]],
        explain: 'n₂ (algébrique) = −' + c.n1Rpm + ' × ' + c.z1 + '/' + value + ' = ' + fr(r.n2Rpm, 2) + ' tr/min. |C₂| = ' + fr(c.efficiency, 2) + ' × ' + c.torqueNm + ' × ' + value + '/' + c.z1 + ' = ' + fr(r.outputTorqueNm, 2) + ' N·m. P₂ = η × C₁ × 2πn₁/60 = ' + fr(r.outputPowerW, 1) + ' W.' };
    }
    if (level.type === 'moment') {
      const r = P.moments({ loadN: c.loadN, leftArmM: c.leftArmM, counterweightN: c.counterweightN, rightArmM: value });
      return { ...r, passed: Math.abs(r.netMomentNm) <= c.toleranceNm,
        values: [['Moment gauche (+)', fr(r.counterclockwiseNm, 1) + ' N·m'], ['Moment droit (−)', fr(-r.clockwiseNm, 1) + ' N·m'], ['Moment résultant', fr(r.netMomentNm, 1) + ' N·m'], ['Réaction à l’équilibre seulement', fr(r.supportReactionN, 1) + ' N']],
        explain: 'ΣM_O = ' + c.loadN + ' × ' + c.leftArmM + ' − ' + c.counterweightN + ' × ' + fr(value, 1) + ' = ' + fr(r.netMomentNm, 1) + ' N·m. Réaction verticale à l’équilibre : R_O = ' + c.loadN + ' + ' + c.counterweightN + ' = ' + fr(r.supportReactionN, 0) + ' N. Rotation de l’essai : modèle simplifié avec inertie, sans amortissement.' };
    }
    if (level.type === 'rover') {
      const r = P.rover({ massKg: c.massKg, rollingResistanceN: c.rollingResistanceN, tractionN: value, initialSpeedMps: c.initialSpeedMps, durationS: c.durationS });
      return { ...r, passed: Math.abs(r.distanceM - c.targetDistanceM) <= c.distanceToleranceM && r.finalSpeedMps <= c.speedLimitMps,
        values: [['Accélération pendant le mouvement', fr(r.accelerationMps2, 2) + ' m/s²'], ['Distance à ' + c.durationS + ' s', fr(r.distanceM, 2) + ' m'], ['Vitesse à ' + c.durationS + ' s', fr(r.finalSpeedMps, 2) + ' m/s'], ['Résultante effective', fr(r.netForceN, 0) + ' N']],
        explain: (r.stationary ? 'Le rover reste au repos : la résistance statique équilibre la traction (' + value + ' N), donc ΣF = 0 N et a = 0 m/s². ' : 'Pendant le mouvement : ΣF = ' + value + ' − ' + c.rollingResistanceN + ' = ' + fr(r.netForceN, 0) + ' N et a = ' + fr(r.accelerationMps2, 2) + ' m/s². ') + 'Distance sur ' + c.durationS + ' s (sans marche arrière) : ' + fr(r.distanceM, 2) + ' m. Vitesse finale : ' + fr(r.finalSpeedMps, 2) + ' m/s.' };
    }
    if (level.type === 'electric') {
      const r = P.starterCable({ ...c, crossSectionMm2: value });
      const standard = c.standardSectionsMm2.includes(value);
      const lossesOK = r.totalLossW <= c.maxLossW + 1e-9;
      const massOK = r.copperMassKg <= c.maxCopperMassKg + 1e-9;
      return { ...r, standard, lossesOK, massOK,
        passed: standard && r.canCrank && lossesOK && massOK,
        values: [['Section choisie', fr(value, 0) + ' mm²' + (standard ? ' · normalisée' : ' · non normalisée')],
          ['Résistance du cuivre', fr(r.copperResistanceOhm * 1000, 3) + ' mΩ'],
          ['Résistance totale', fr(r.totalResistanceOhm * 1000, 3) + ' mΩ'],
          ['Chute de tension', fr(r.voltageDropV, 3) + ' V'],
          ['Tension au démarreur', fr(r.starterVoltageV, 3) + ' V'],
          ['Pertes cuivre + contacts', fr(r.totalLossW, 2) + ' W'],
          ['Masse de cuivre', fr(r.copperMassKg, 3) + ' kg']],
        explain: 'R_Cu = 0,0175 × 4/' + fr(value, 0) + ' = ' + fr(r.copperResistanceOhm, 6) +
          ' Ω ; R_tot = ' + fr(r.totalResistanceOhm, 6) + ' Ω ; ΔU = 180 × R_tot = ' +
          fr(r.voltageDropV, 3) + ' V ; U_d = 12,6 − ΔU = ' + fr(r.starterVoltageV, 3) +
          ' V ; P_pertes = 180² × R_tot = ' + fr(r.totalLossW, 2) + ' W ; m = 8960 × 4 × ' +
          fr(value, 0) + ' × 10⁻⁶ = ' + fr(r.copperMassKg, 3) + ' kg. ' +
          (r.canCrank ? 'Le démarreur peut tourner selon le critère de tension.' : 'Le démarreur reste bloqué : tension insuffisante.') +
          (!lossesOK ? ' Risque thermique : pertes supérieures à 200 W.' : '') +
          (!massOK ? ' Surmasse : limite de 0,70 kg dépassée.' : '') +
          (!standard ? ' Section non normalisée : choix non conforme.' : '') };
    }
    if (level.type === 'brake') {
      const r = P.braking({ ...c, commandedBrakeN: value * 1000 });
      const physicalPassed = !r.wheelsLocked && r.stoppingDistanceM <= c.safetyLineM + 1e-9;
      return { ...r, physicalPassed, passed: physicalPassed,
        values: [['Freinage commandé', fr(value, 2) + ' kN'],
          ['Adhérence maximale', fr(r.maximumAdhesionN / 1000, 3) + ' kN'],
          ['Freinage effectif', fr(r.effectiveBrakeN / 1000, 3) + ' kN'],
          ['Décélération (valeur absolue)', fr(r.decelerationMps2, 3) + ' m/s²'],
          ['Distance de réaction', fr(r.reactionDistanceM, 3) + ' m'],
          ['Distance de freinage', fr(r.brakingDistanceM, 3) + ' m'],
          ['Distance d’arrêt totale', fr(r.stoppingDistanceM, 3) + ' m'],
          ['Temps total', fr(r.totalTimeS, 3) + ' s']],
        explain: 'F_adh,max = ' + fr(c.staticFrictionCoefficient, 2) + ' × ' + c.massKg + ' × ' +
          fr(c.gravityMps2, 2) + ' = ' + fr(r.maximumAdhesionN, 2) + ' N. ' +
          (r.wheelsLocked ? 'Commande ' + fr(value * 1000, 0) +
            ' N > adhérence : roues bloquées, F_f,eff = μ_glisse × m × g = ' +
            fr(r.effectiveBrakeN, 2) + ' N. ' : 'Roues non bloquées : F_f,eff = ' +
            fr(r.effectiveBrakeN, 2) + ' N. ') +
          '|a| = (F_f,eff + 300)/6 000 = ' + fr(r.decelerationMps2, 4) +
          ' m/s² ; d_r = 4 × 0,8 = ' + fr(r.reactionDistanceM, 3) +
          ' m ; d_f = 4²/(2 × |a|) = ' + fr(r.brakingDistanceM, 3) +
          ' m ; d_arrêt = ' + fr(r.stoppingDistanceM, 3) + ' m. ' +
          (physicalPassed ? 'Arrêt avant la ligne sans glissade.' :
            r.wheelsLocked ? 'Arrêt non autorisé : roues bloquées.' : 'Distance de sécurité dépassée.') };
    }
    if (level.type === 'spring') {
      const r = P.springStop({ loadN: c.loadN, stiffnessNPerMm: value, maxStrokeMm: c.maxStrokeMm });
      const normalized = c.standardStiffnessNPerMm.includes(value);
      const compressionMm = r.compressionM * 1000;
      const compressionOK = compressionMm >= c.minimumUsefulStrokeMm - 1e-9 &&
        compressionMm <= c.maximumUsefulStrokeMm + 1e-9;
      const stopOK = !r.stopEngaged;
      const energyOK = r.elasticEnergyJ <= c.maximumEnergyJ + 1e-9;
      return { ...r, normalized, compressionOK, stopOK, energyOK,
        passed: normalized && compressionOK && stopOK && energyOK,
        values: [['Raideur choisie', fr(value, 2) + ' N/mm' + (normalized ? ' · proposée' : ' · non proposée')],
          ['Compression libre', fr(r.freeCompressionM * 1000, 3) + ' mm'],
          ['Compression réelle', fr(compressionMm, 3) + ' mm'],
          ['Force dans le ressort', fr(r.springForceN, 2) + ' N'],
          ['Réaction de la butée', fr(r.stopReactionN, 2) + ' N'],
          ['Énergie élastique', fr(r.elasticEnergyJ, 3) + ' J']],
        explain: 'k = ' + fr(value, 2) + ' N/mm = ' + fr(r.stiffnessNPerM, 0) +
          ' N/m ; x_libre = ' + c.loadN + '/' + fr(r.stiffnessNPerM, 0) + ' = ' +
          fr(r.freeCompressionM * 1000, 3) + ' mm ; x_réel = min(x_libre, ' + c.maxStrokeMm +
          ' mm) = ' + fr(compressionMm, 3) + ' mm ; F_ressort = k × x_réel = ' +
          fr(r.springForceN, 2) + ' N ; F_butée = max(0, F − F_ressort) = ' +
          fr(r.stopReactionN, 2) + ' N ; E = ½ × k × x_réel² = ' +
          fr(r.elasticEnergyJ, 3) + ' J. ' +
          (r.stopEngaged ? 'La butée reprend une partie de la charge : risque d’effort parasite.' :
            compressionMm < c.minimumUsefulStrokeMm ? 'Compression insuffisante pour la fonction attendue.' :
            'La butée ne reprend aucun effort.') +
          (!normalized ? ' Raideur non proposée dans le catalogue du scénario.' : '') };
    }
    const r = P.hydraulic({ diameterMm: c.diameterMm, pressureBar: value, efficiency: c.efficiency, loadN: c.loadN });
    const excessLimit = r.requiredPressureBar * (1 + c.allowedExcessFraction);
    // Une marge négative, même infime, reste physiquement insuffisante.
    // La tolérance de correction (0,05 bar) est distincte du critère de levage.
    const trial = P.hydraulicTrial({ ...c, durationS: c.trialDurationS, pressureBar: value, timeS: c.trialDurationS });
    return { ...trial, passed: trial.canLift && value <= excessLimit + 1e-9,
      values: [['Surface du piston', fr(trial.areaM2 * 1e4, 3) + ' cm²'], ['Effort disponible', fr(trial.availableForceN, 2) + ' N'], ['Pression minimale', fr(trial.requiredPressureBar, 3) + ' bar'], ['Marge de force', fr(trial.forceMarginN, 2) + ' N'], ['Vitesse de tige', fr(trial.speedMps * 1000, 2) + ' mm/s'], ['Course après ' + c.trialDurationS + ' s', fr(trial.displacementM * 1000, 1) + ' mm']],
      explain: 'S = π × (' + fr(c.diameterMm / 1000, 3) + ' m)²/4 = ' + fr(trial.areaM2, 8) + ' m². p = ' + value + ' × 100 000 = ' + fr(trial.pressurePa, 0) + ' Pa. F = ' + fr(c.efficiency, 2) + ' × p × S = ' + fr(trial.availableForceN, 2) + ' N. p_min = ' + fr(trial.requiredPressureBar, 3) + ' bar. ' + (trial.safetyLocked ? 'Surpression : sécurité verrouillée, aucun mouvement.' : trial.canLift ? 'Débit utile = ' + fr(c.flowLpm * c.volumetricEfficiency, 2) + ' L/min ; vitesse = ' + fr(trial.speedMps * 1000, 2) + ' mm/s.' : 'Effort insuffisant : la tige reste immobile.') };
  }
  function update() {
    const value = level.type === 'rover' ? (roverFieldsValid() ? parseInput($('calc-force')) : level.input.value) : (genericFieldsValid() ? parseInput($('prediction')) : level.input.value);
    if (!(level.type === 'rover' ? Number.isFinite(value) && value >= 0 && value <= level.input.max : validValue(value))) {
      fillMetrics($('live-data'), [['Réglage', 'Valeur invalide']]);
      $('launch').disabled = true; $('results-text').textContent = 'Complète les champs avec des nombres. Pour le rover, la traction peut être comprise entre 0 et ' + level.input.max + ' N.'; return;
    }
    $('launch').disabled = level.type === 'rover' ? !roverFieldsValid() : !genericFieldsValid();
    const r = compute(value);
    if (reveal()) {
      fillMetrics($('live-data'), r.values);
      $('results-text').textContent = r.explain;
      if (level.type === 'rover') { $('rover-charts').classList.remove('hidden'); drawRoverPlot(r); }
    } else conceal();
    if (!testAnimating) draw(0, value, r);
  }
  function setValue(value) { input.value = value; slider.value = value; update(); }
  slider.addEventListener('input', () => setValue(slider.value));
  input.addEventListener('input', () => { slider.value = input.value; update(); });
  input.addEventListener('change', () => { if (validValue(currentValue())) setValue(currentValue()); });
  if (level.type === 'rover') $('launch').disabled = true;
  function feedback(text, cls) { $('feedback').textContent = text; $('feedback').className = 'feedback' + (cls ? ' ' + cls : ''); }

  function updateSolutionGate() {
    const unlocked = Coach.ready(attempts, hints);
    $('solution-button').hidden = !unlocked;
    $('solution-progress').textContent = unlocked ?
      'Les 3 indices et les 3 essais ont été effectués : tu peux consulter la solution expliquée.' :
      'Solution expliquée après 3 indices ET 3 essais : ' + Math.min(3, hints) + '/3 indices · ' + Math.min(3, attempts) + '/3 essais.';
  }
  function renderJournal() {
    const j = window.SIStorage.journal(level.id);
    $('journal-summary').textContent = j.totalTrials + ' essais enregistrés · ' + j.hintsUsed +
      ' indices consultés · ' + j.solutionsViewed + ' solutions consultées · ' +
      j.wins + ' réussite(s) du niveau · ' + j.masteryWins + ' défi(s) de maîtrise réussis.';
    const list = $('journal-trials'); list.replaceChildren();
    for (const t of j.trials.slice(-12).reverse()) {
      const li = document.createElement('li');
      li.textContent = (t.variant ? 'Variante · ' : 'Mission · ') + fr(t.value, 3) + ' ' + t.unit +
        ' · ' + (t.passed ? 'mission conforme' : 'mission non conforme') +
        ' · physique : ' + (t.physicalPassed ? 'conforme' : 'non conforme') +
        ' · calcul : ' + (t.calculationPassed ? 'validé' : 'à revoir') +
        ' · ' + t.attempt + 'ᵉ essai · ' + t.hints + ' indice(s)' +
        (t.solutionViewed ? ' · solution consultée' : '') +
        (t.stars ? ' · ' + t.stars + ' étoile(s)' : '') +
        ' — ' + t.summary;
      list.append(li);
    }
    if (!j.trials.length) { const li = document.createElement('li'); li.textContent = 'Aucun essai enregistré pour ce niveau.'; list.append(li); }
  }
  function showCelebration(stars) {
    $('celebration').hidden = false;
    $('celebration').classList.remove('celebration-play');
    void $('celebration').offsetWidth;
    $('celebration').classList.add('celebration-play');
    $('celebration-title').textContent = variantActive ? 'Défi de maîtrise réussi !' : 'Mission réussie !';
    $('celebration-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    $('celebration-stars').setAttribute('aria-label', stars + (stars === 1 ? ' étoile sur 3' : ' étoiles sur 3'));
    $('celebration-detail').textContent = solutionViewed ? 'Réussite accompagnée : solution consultée.' :
      stars === 3 ? 'Bravo ! Réussite autonome au premier essai.' :
      stars === 2 ? 'Bravo ! Tu as corrigé ton raisonnement.' : 'Bravo ! Tu as persévéré avec les aides.';
  }
  function showReview() {
    if (!activeTrial || activeTrial.result.passed) return;
    const r = activeTrial.result;
    $('error-review').hidden = false;
    $('error-review-text').textContent = 'Essai à ' + fr(activeTrial.value, 3) + ' ' + level.input.unit + ' : ' + failMessage(r);
    $('error-review-physics').textContent = r.explain;
    $('error-review-title').focus();
  }
  $('review-error').addEventListener('click', showReview);
  $('solution-button').addEventListener('click', () => {
    if (!Coach.ready(attempts, hints)) return;
    const solution = Coach.solve({ ...level, config: activeConfig }, P);
    const list = $('solution-steps'); list.replaceChildren();
    for (const step of solution.steps) { const li = document.createElement('li'); li.textContent = step; list.append(li); }
    $('solution-decision').textContent = 'Réglage de référence : ' + fr(solution.value, 3) + ' ' + solution.unit + '. Décision : ' + solution.decision;
    $('solution-panel').hidden = false;
    if (!solutionViewed) window.SIStorage.recordHelp(level.id, 'solution');
    solutionViewed = true;
    renderJournal();
    $('solution-title').focus();
  });
  function resetAttempt({ keepSolution = true } = {}) {
    if (rafId !== null) cancelAnimationFrame(rafId); rafId = null;
    attempts = 0; hints = 0; solved = false; testAnimating = false; activeTrial = null;
    if (!keepSolution) { solutionViewed = false; sessionAttempts = 0; sessionHints = 0; }
    $('hints').replaceChildren(); $('hint').disabled = false; $('hint').textContent = '💡 Indice (0/3)';
    $('attempt-count').textContent = 'Essais : 0 · Indices : 0';
    $('scene-banner').textContent = 'Réglage en attente.'; $('scene-banner').className = 'scene-banner';
    $('simulation-status').textContent = 'Aucun essai effectué.'; gearAngle = 0;
    $('review-error').hidden = true; $('error-review').hidden = true;
    $('celebration').hidden = true; $('mastery-button').hidden = true;
    $('solution-panel').hidden = true;
    predictionValidated = false; $('prediction').value = ''; $('prediction-feedback').textContent = '';
    if (level.type === 'brake') $('brake-distance').value = '';
    if (hasModelArithmetic) $('model-answer').value = '';
    if (level.type === 'rover') { for (const id of ['calc-a','calc-net','calc-force']) $(id).value = ''; $('game-slider').disabled = true; $('game-value').disabled = true; }
    setValue(level.input.value); $('launch').disabled = true;
    updateSolutionGate();
  }
  $('mastery-button').addEventListener('click', () => {
    if (!solved || variantActive || !Coach.mastery[level.id]) return;
    variantActive = true; activeConfig = { ...level.config, ...Coach.mastery[level.id] };
    resetAttempt({ keepSolution: false });
    $('game-skill').textContent = level.skill.toUpperCase() + ' · DÉFI DE MAÎTRISE';
    if (level.type === 'gear') {
      $('game-context').textContent = 'Nouveau convoyeur : moteur à ' + activeConfig.n1Rpm + ' tr/min, roue motrice ' + activeConfig.z1 + ' dents, couple moteur ' + activeConfig.torqueNm + ' N·m, rendement ' + fr(activeConfig.efficiency, 2) + '.';
      $('game-goal').textContent = 'Atteindre ' + activeConfig.targetRpm + ' tr/min en sortie (sens inverse), avec un couple ≥ ' + activeConfig.minimumTorqueNm + ' N·m. Recalcule Z₂ : les anciennes données ne conviennent plus.';
      fillMetrics($('given-data'), [['Moteur', activeConfig.n1Rpm + ' tr/min'], ['Roue motrice', activeConfig.z1 + ' dents'], ['Couple moteur', activeConfig.torqueNm + ' N·m'], ['Rendement', fr(activeConfig.efficiency * 100, 0) + ' %']]);
    } else {
      $('game-context').textContent = 'Nouvelle charge : ' + activeConfig.loadN + ' N à ' + fr(activeConfig.leftArmM, 1) + ' m du pivot, contrepoids de ' + activeConfig.counterweightN + ' N.';
      $('game-goal').textContent = 'Équilibre le bras avec un moment résultant de valeur absolue ≤ ' + activeConfig.toleranceNm + ' N·m. Recalcule la distance du contrepoids.';
      fillMetrics($('given-data'), [['Charge gauche', activeConfig.loadN + ' N'], ['Bras gauche', fr(activeConfig.leftArmM, 1) + ' m'], ['Contrepoids', activeConfig.counterweightN + ' N'], ['Tolérance', '± ' + activeConfig.toleranceNm + ' N·m']]);
      $('prediction-help').textContent = 'Tolérance de moment : ±' + activeConfig.toleranceNm + ' N·m. Le calcul et le réglage doivent correspondre aux nouvelles données.';
    }
    feedback('Défi de maîtrise lancé : nouvelles données, nouvelle décision technique. Aucun point fictif n’est attribué.');
  });
  const ACCESS_KEY = 'siquest_access_v1';
  let access = {};
  try { access = JSON.parse(localStorage.getItem(ACCESS_KEY) || '{}') || {}; } catch (_) {}
  function applyAccess() {
    document.body.classList.toggle('access-large', !!access.large);
    document.body.classList.toggle('access-contrast', !!access.contrast);
    document.body.classList.toggle('access-quiet', !!access.quiet);
    reduceMotion = !!access.quiet || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduceMotion && testAnimating && activeTrial) {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null; testAnimating = false;
      draw(1, activeTrial.value, activeTrial.result);
    }
    for (const [id,key] of [['toggle-large','large'],['toggle-contrast','contrast'],['toggle-motion','quiet']]) {
      $(id).setAttribute('aria-pressed', String(!!access[key]));
      $(id).textContent = (access[key] ? '✓ ' : '') + ({large:'Texte agrandi',contrast:'Contraste renforcé',quiet:'Limiter les animations'}[key]);
    }
  }
  for (const [id,key] of [['toggle-large','large'],['toggle-contrast','contrast'],['toggle-motion','quiet']]) {
    $(id).addEventListener('click', () => { access[key] = !access[key]; applyAccess(); try { localStorage.setItem(ACCESS_KEY, JSON.stringify(access)); } catch (_) {} });
  }
  applyAccess(); renderJournal(); updateSolutionGate();
  function launch() {
    if (level.type === 'rover' && !roverFieldsValid()) return;
    const value = level.type === 'rover' ? parseInput($('calc-force')) : parseInput($('prediction'));
    if (!(level.type === 'rover' ? roverFieldsValid() : genericFieldsValid())) return;
    const r = compute(value);
    if (level.type === 'rover') {
      r.physicalPassed = r.passed;
      r.arithmetic = roverArithmeticStatus();
      r.passed = r.physicalPassed && r.arithmetic.passed;
    }
    if (hasModelArithmetic) {
      r.physicalPassed = r.passed;
      r.arithmetic = modelArithmeticStatus(r);
      r.passed = r.physicalPassed && r.arithmetic.passed;
    }
    if (level.type === 'brake') {
      r.arithmetic = brakeArithmeticStatus(r);
      r.passed = r.physicalPassed && r.arithmetic.passed;
    }
    attempts++; sessionAttempts++; activeTrial = { value, result: r };
    const isFirstSuccess = r.passed && !solved;
    const stars = isFirstSuccess ? Coach.stars({ attempts: sessionAttempts, hints: sessionHints, solutionViewed }) : 0;
    window.SIStorage.recordTrial(level.id, {
      value, passed: r.passed, physicalPassed: r.physicalPassed === undefined ? r.passed : r.physicalPassed,
      calculationPassed: !r.arithmetic || r.arithmetic.passed,
      attempt: attempts, hints, solutionViewed, variant: variantActive, stars,
      summary: r.passed ? successMessage(r) : failMessage(r)
    });
    fillMetrics($('live-data'), r.values); $('results-text').textContent = r.explain;
    if (level.type === 'rover') { $('rover-charts').classList.remove('hidden'); drawRoverPlot(r); }
    $('attempt-count').textContent = 'Essais : ' + attempts + ' · Indices : ' + hints;
    updateSolutionGate(); renderJournal();
    if (rafId !== null) cancelAnimationFrame(rafId);
    testAnimating = true; animationStart = performance.now(); gearAngle = 0;
    if (r.passed) {
      $('review-error').hidden = true; $('error-review').hidden = true;
      if (isFirstSuccess) {
        solved = true;
        if (variantActive) window.SIStorage.saveMastery(level.id, stars);
        else window.SIStorage.saveWin(level.id, stars);
        setBest(); renderJournal(); showCelebration(stars);
        $('mastery-button').hidden = variantActive || !Coach.mastery[level.id];
        feedback('✓ Mission réussie ! ' + stars + ' étoile(s) gagnée(s). ' + successMessage(r), 'success');
      } else feedback('✓ Mission déjà réussie. Tu peux tester d’autres réglages ou recommencer.', 'success');
      $('scene-banner').textContent = '✓ OBJECTIF ATTEINT · Modèle vérifié'; $('scene-banner').className = 'scene-banner success';
    } else {
      $('celebration').hidden = true;
      $('review-error').hidden = false; $('error-review').hidden = true;
      feedback('Essai ' + attempts + ' : ' + failMessage(r) + ' Modifie ton réglage et réessaie.', 'error');
      $('scene-banner').textContent = '✕ CONTRAINTES NON RESPECTÉES · Ajuste le réglage'; $('scene-banner').className = 'scene-banner';
    }
    if (reduceMotion) { testAnimating = false; draw(1, value, r); }
    else rafId = requestAnimationFrame(frame);
    $('simulation-status').textContent = level.type === 'hose' ?
      'Flexible : v = ' + fr(r.velocityMps, 2) + ' m/s ; Δp = ' + fr(r.pressureDropBar, 3) + ' bar ; pertes ' + fr(r.dissipatedPowerW, 1) + ' W. ' + (r.passed ? 'Flexible accepté.' : 'Choix non conforme.') :
      level.type === 'torsion' ? 'Arbre : τ = ' + fr(r.maxShearStressMPa, 2) + ' MPa ; θ = ' + fr(r.twistDeg, 3) + '° ; masse ' + fr(r.massKg, 2) + ' kg. ' + (r.passed ? 'Arbre validé.' : 'Choix non conforme.') :
      level.type === 'pneumatic' ?
      'Vérin : ' + fr(r.equilibriumM * 1000, 2) + ' mm sur 80 mm. Pression : ' + fr(value, 2) + ' bar. ' + (r.passed ? 'Verrou engagé, mise en service autorisée.' : r.physicalPassed ? 'Course conforme, calcul à revoir.' : 'Mise en service refusée.') :
      level.type === 'thermal' ? 'Bilan thermique établi : ΔT = ' + fr(r.temperatureRiseK, 3) + ' K ; P_pompe = ' + fr(r.pumpPowerW, 2) + ' W. ' + (r.passed ? 'Essai prolongé autorisé.' : r.physicalPassed ? 'Bilan physique conforme, calcul à revoir.' : 'Essai prolongé refusé.') :
      level.type === 'metrology' ? 'Intervalle mesuré élargi : [' + fr(r.intervalLowerMm, 4) + ' ; ' + fr(r.intervalUpperMm, 4) + '] mm. ' + (r.passed ? 'Axe accepté pour remontage.' : r.physicalPassed ? 'Intervalle conforme, calcul à revoir.' : 'Axe non libéré pour remontage.') :
      level.type === 'hydro' ?
      (r.safetyLocked ? 'Sécurité : surpression, vérin verrouillé.' : r.canLift ? 'Charge levée de ' + fr(r.displacementM * 1000, 1) + ' mm en ' + activeConfig.trialDurationS + ' s.' : 'Pression insuffisante : la charge reste immobile.') :
      level.type === 'moment' ? 'Moment résultant : ' + fr(r.netMomentNm, 1) + ' N·m. ' + (r.passed ? 'Équilibre acceptable.' : 'Le bras bascule pendant l’essai.') :
      level.type === 'electric' ? 'Essai à 180 A : ' + (r.canCrank ? 'démarreur en rotation' : 'démarreur immobile') + '. Tension ' + fr(r.starterVoltageV, 2) + ' V, pertes ' + fr(r.totalLossW, 1) + ' W, masse ' + fr(r.copperMassKg, 3) + ' kg. ' + (r.passed ? 'Mise en service autorisée.' : 'Mise en service refusée : vérifie les contraintes.') :
      level.type === 'brake' ? 'Arrêt : ' + fr(r.stoppingDistanceM, 3) +
        ' m pour une ligne à ' + fr(activeConfig.safetyLineM, 1) + ' m. ' +
        (r.wheelsLocked ? 'Roues bloquées, glissade simulée. ' : 'Roues en adhérence. ') +
        (r.physicalPassed ? 'Distance de sécurité respectée. ' : 'Essai non conforme. ') +
        (r.arithmetic.passed ? 'Calcul de distance accepté.' : 'Calcul de distance à revoir, sans empêcher l’essai.') :
      level.type === 'spring' ? 'Compression réelle : ' + fr(r.compressionM * 1000, 2) + ' mm ; réaction butée : ' + fr(r.stopReactionN, 2) + ' N ; énergie : ' + fr(r.elasticEnergyJ, 2) + ' J. ' + (r.passed ? 'Support conforme.' : 'Support non conforme.') :
      level.type === 'rover' ? 'Distance : ' + fr(r.distanceM, 2) + ' m. Vitesse finale : ' + fr(r.finalSpeedMps, 2) + ' m/s. ' + (r.physicalPassed && !r.arithmetic.passed ? 'Trajectoire conforme, mais calculs non validés.' : '') :
      'Roue menée : ' + fr(Math.abs(r.n2Rpm), 2) + ' tr/min, sens inverse. Couple : ' + fr(r.outputTorqueNm, 2) + ' N·m.';
  }
  function successMessage(r) {
    if (level.type === 'hose') return 'Flexible de ' + fr(activeTrial.value, 0) + ' mm : Δp = ' + fr(r.pressureDropBar, 3) + ' bar, v = ' + fr(r.velocityMps, 3) + ' m/s. Circuit autorisé.';
    if (level.type === 'torsion') return 'Arbre de ' + fr(activeTrial.value, 0) + ' mm : τ = ' + fr(r.maxShearStressMPa, 2) + ' MPa, θ = ' + fr(r.twistDeg, 3) + '°. Montage validé.';
    if (level.type === 'pneumatic') return 'Course : '  + fr(r.equilibriumM * 1000, 2) + ' mm ; pression : ' + fr(activeTrial.value, 2) + ' bar. Verrou déployé.';
    if (level.type === 'thermal') return 'ΔT = ' + fr(r.temperatureRiseK, 2) + ' K ; P_pompe = ' + fr(r.pumpPowerW, 1) + ' W. Banc autorisé.';
    if (level.type === 'metrology') return 'U = ' + fr(r.expandedUncertaintyMm, 4) + ' mm ; intervalle dans la tolérance, instrument dans le budget.';
    if (level.type === 'gear') return 'Vitesse : ' + fr(Math.abs(r.n2Rpm), 0) + ' tr/min (sens inverse) ; couple : ' + fr(r.outputTorqueNm, 2) + ' N·m.';
    if (level.type === 'moment') return 'Moment résultant : ' + fr(r.netMomentNm, 1) + ' N·m.';
    if (level.type === 'rover') return 'Distance : ' + fr(r.distanceM, 1) + ' m ; vitesse : ' + fr(r.finalSpeedMps, 1) + ' m/s.';
    if (level.type === 'brake') return 'Arrêt à ' + fr(r.stoppingDistanceM, 3) + ' m ; roues en adhérence ; calcul de distance validé. Autorisation de mise en service.';
    if (level.type === 'spring') return 'Compression ' + fr(r.compressionM * 1000, 2) + ' mm ; butée sans effort ; énergie ' + fr(r.elasticEnergyJ, 2) + ' J. Support conforme.';
    if (level.type === 'electric') return 'Démarreur alimenté à ' + fr(r.starterVoltageV, 2) + ' V ; pertes ' + fr(r.totalLossW, 1) + ' W ; masse ' + fr(r.copperMassKg, 3) + ' kg. Autorisation de mise en service.';
    return 'Effort : ' + fr(r.availableForceN, 2) + ' N ; pression : ' + fr(activeTrial ? activeTrial.value : currentValue(), 1) + ' bar.';
  }
  function failMessage(r) {
    if (hasModelArithmetic && r.physicalPassed && r.arithmetic && !r.arithmetic.passed)
      return 'réglage physiquement conforme, mais calcul intermédiaire manquant ou hors tolérance ±' +
        fr(r.arithmetic.tolerance, 3) + ' ' + r.arithmetic.unit + '. Aucun badge avant validation du calcul.';
    if (level.type === 'hose') return 'v = ' + fr(r.velocityMps, 2) + ' m/s ; Δp = ' + fr(r.pressureDropBar, 3) + ' bar ; coût ' + (r.option ? r.option.costEuro + ' €' : 'hors catalogue') + '. ' + (!r.velocityOK ? 'Vitesse excessive.' : !r.lossOK ? 'Pertes excessives.' : 'Budget ou catalogue non respecté.');
    if (level.type === 'torsion') return 'τ = ' + fr(r.maxShearStressMPa, 2) + ' MPa ; θ = ' + fr(r.twistDeg, 3) + '° ; masse = ' + fr(r.massKg, 2) + ' kg. ' + (!r.stressOK ? 'Contrainte excessive.' : !r.twistOK ? 'Torsion excessive.' : !r.massOK ? 'Masse excessive.' : 'Diamètre non normalisé.');
    if (level.type === 'pneumatic') return 'course '  + fr(r.equilibriumM * 1000, 2) + ' mm ; p_min ' + fr(r.requiredPressureBar, 3) + ' bar. ' + (r.safetyLocked ? 'Sécurité amont verrouillée.' : !r.fullStroke ? 'Verrou non engagé.' : 'Pression de service supérieure à 4 bar.');
    if (level.type === 'thermal') return 'ΔT = ' + fr(r.temperatureRiseK, 2) + ' K (max 8 K) ; pompe = ' + fr(r.pumpPowerW, 1) + ' W (max 230 W). ' + (!r.temperatureOK ? 'Refroidissement insuffisant.' : 'Puissance de pompe excessive.');
    if (level.type === 'metrology') return 'intervalle [' + fr(r.intervalLowerMm, 4) + ' ; ' + fr(r.intervalUpperMm, 4) + '] mm. ' + (!r.accepted ? 'Conformité non démontrée.' : !r.option ? 'Instrument non proposé.' : 'Coût supérieur au budget.');
    if (level.type === 'gear') return 'la vitesse vaut ' + fr(Math.abs(r.n2Rpm), 1) + ' tr/min (sens inverse) et le couple ' + fr(r.outputTorqueNm, 1) + ' N·m.';
    if (level.type === 'moment') return 'le moment résultant est de ' + fr(r.netMomentNm, 1) + ' N·m (objectif : ±' + activeConfig.toleranceNm + ' N·m).';
    if (level.type === 'rover' && r.physicalPassed && r.arithmetic && !r.arithmetic.passed) return 'la trajectoire est physiquement conforme, mais les calculs ' + r.arithmetic.checks.map((ok, i) => !ok ? ['d’accélération', 'de résultante', 'de force motrice'][i] : '').filter(Boolean).join(', ') + ' sont à revoir. Aucun badge tant que les trois calculs ne sont pas validés.';
    if (level.type === 'rover') return (r.distanceM < activeConfig.targetDistanceM - activeConfig.distanceToleranceM ? 'trop court : ' : r.distanceM > activeConfig.targetDistanceM + activeConfig.distanceToleranceM ? 'trop loin : ' : 'distance atteinte, vérifier la vitesse : ') + fr(r.distanceM, 1) + ' m parcourus ; vitesse finale ' + fr(r.finalSpeedMps, 1) + ' m/s.';
    if (level.type === 'brake') return 'distance d’arrêt ' + fr(r.stoppingDistanceM, 3) +
      ' m pour une limite à ' + fr(activeConfig.safetyLineM, 1) + ' m. ' +
      (r.wheelsLocked ? 'Roues bloquées : glissade, essai dangereux. ' :
        !r.physicalPassed ? 'La ligne de sécurité est dépassée. ' : 'Arrêt physique conforme. ') +
      (!r.arithmetic.passed ? 'Calcul de distance manquant ou hors tolérance ± 0,10 m : aucun badge pour cet essai. ' : 'Calcul de distance accepté. ');
    if (level.type === 'spring') return 'compression ' + fr(r.compressionM * 1000, 2) + ' mm ; butée ' + fr(r.stopReactionN, 2) + ' N ; énergie ' + fr(r.elasticEnergyJ, 2) + ' J. ' + (r.stopEngaged ? 'Butée en charge. ' : '') + (!r.compressionOK ? 'Course hors de la plage fonctionnelle. ' : '') + (!r.energyOK ? 'Énergie excessive : retour élastique trop important. ' : '') + (!r.normalized ? 'Raideur non proposée. ' : '');
    if (level.type === 'electric') return 'U_d = ' + fr(r.starterVoltageV, 2) + ' V, P_pertes = ' + fr(r.totalLossW, 1) + ' W, m_Cu = ' + fr(r.copperMassKg, 3) + ' kg. ' + (!r.standard ? 'Section non normalisée. ' : '') + (!r.canCrank ? 'Tension insuffisante pour lancer le démarreur. ' : '') + (!r.lossesOK ? 'Pertes Joule excessives. ' : '') + (!r.massOK ? 'Masse de cuivre excessive. ' : '');
    return 'effort calculé ' + fr(r.availableForceN, 2) + ' N pour ' + activeConfig.loadN + ' N requis (écart ' + fr(r.forceMarginN, 2) + ' N). ' + (r.safetyLocked ? 'Surpression : sécurité verrouillée, la charge ne monte pas.' : r.forceMarginN < 0 ? 'La charge ne monte pas : augmente légèrement la pression.' : 'Levage physiquement possible, mais la marge de pression dépasse 12 % du minimum autorisé.') + ' Le calcul arrondi et le réglage physique sont évalués séparément.';
  }
  $('launch').addEventListener('click', launch);
  $('hint').addEventListener('click', () => {
    if (hints >= level.hints.length) return;
    const hintText = variantActive && level.type === 'moment' ? [
      'Repère les deux forces et leurs distances respectives au pivot.',
      'À l’équilibre, les moments des deux forces se compensent : F_g × d_g = F_d × d.',
      activeConfig.loadN + ' N × ' + fr(activeConfig.leftArmM, 1) + ' m = ' + activeConfig.counterweightN + ' N × d. Calcule d en mètres.'
    ][hints] : level.hints[hints];
    const p = document.createElement('p'); p.className = 'hint-box'; p.textContent = 'Indice ' + (hints + 1) + ' : ' + hintText;
    $('hints').append(p); hints++; sessionHints++; window.SIStorage.recordHelp(level.id, 'hint');
    $('hint').textContent = '💡 Indice (' + hints + '/3)';
    $('attempt-count').textContent = 'Essais : ' + attempts + ' · Indices : ' + hints;
    if (hints === 3) $('hint').disabled = true;
    updateSolutionGate(); renderJournal();
  });
  $('reset').addEventListener('click', () => {
    resetAttempt();
    feedback('Nouveau départ. Le record reste enregistré. Une solution consultée dans cette série reste comptabilisée comme aide.');
  });
  // Scientific illustrations are schematic; all numeric data comes from the physics core.
  function background() {
    const grad = ctx.createLinearGradient(0, 0, 0, 540); grad.addColorStop(0, '#174976'); grad.addColorStop(.55, '#0c2d4c'); grad.addColorStop(1, '#051624');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 900, 540);
    ctx.strokeStyle = '#3d8aac25'; ctx.lineWidth = 1;
    for (let x = 0; x <= 900; x += 45) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 540); ctx.stroke(); }
    for (let y = 0; y <= 540; y += 45) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(900, y); ctx.stroke(); }
  }
  function label(text, x, y, color = '#e6f7ff', size = 21) { ctx.fillStyle = color; ctx.font = '700 ' + size + 'px system-ui'; ctx.fillText(text, x, y); }
  function arrow(x1, y1, x2, y2, color, width = 6) {
    const a = Math.atan2(y2 - y1, x2 - x1); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 16 * Math.cos(a - .5), y2 - 16 * Math.sin(a - .5)); ctx.lineTo(x2 - 16 * Math.cos(a + .5), y2 - 16 * Math.sin(a + .5)); ctx.closePath(); ctx.fill();
  }
  function gearShape(x, y, radius, teeth, rotation, color) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rotation); const toothHeight = Math.min(7, radius * .12);
    ctx.beginPath();
    for (let i = 0; i < teeth * 4; i++) {
      const a = (i / (teeth * 4)) * 2 * Math.PI;
      const rr = i % 4 === 1 || i % 4 === 2 ? radius + toothHeight : radius - toothHeight * .5;
      const xx = Math.cos(a) * rr, yy = Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    ctx.closePath(); const grad = ctx.createRadialGradient(-radius * .3, -radius * .3, 0, 0, 0, radius + toothHeight);
    grad.addColorStop(0, '#e9f7ff'); grad.addColorStop(.42, color); grad.addColorStop(1, '#11283e');
    ctx.fillStyle = grad; ctx.fill(); ctx.strokeStyle = '#c0eaff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, Math.max(9, radius * .18), 0, 2 * Math.PI); ctx.fillStyle = '#061523'; ctx.fill(); ctx.strokeStyle = '#a8cee0'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
  }
  function drawGear(value, r) {
    const z1 = activeConfig.z1, sum = z1 + value, r1 = 250 * z1 / sum, r2 = 250 * value / sum;
    const x1 = 260, x2 = 510, y = 275;
    ctx.strokeStyle = '#397d9f'; ctx.lineWidth = 14; ctx.strokeRect(65, 95, 765, 355);
    gearShape(x1, y, r1, z1, gearAngle, '#ffa932');
    gearShape(x2, y, r2, value, -gearAngle * z1 / value + Math.PI / value, '#4dbfe3');
    label('ROUE MOTRICE', 96, 75, '#ffc36d', 21); label('ROUE MENÉE', 500, 75, '#9cecff', 21);
    label('Z₁ = ' + z1, 120, 475); label('Z₂ = ' + value, 515, 475);
    label('n₁ = ' + activeConfig.n1Rpm + ' tr/min', 85, 510, '#ffc56e', 19); label('|n₂| = ' + fr(Math.abs(r.n2Rpm), 1) + ' tr/min · inverse', 470, 510, '#83e6ff', 19);
    arrow(680, 340, 770, 340, '#ffcc63'); label('P₂ = ' + fr(r.outputPowerW / 1000, 2) + ' kW', 645, 383, '#d6efff', 19);
  }
  function drawMoment(value, r, progress) {
    const c = activeConfig, pivotX = 440, beamY = 240, scale = 72;
    const trial = P.beamTrial({ loadN: c.loadN, leftArmM: c.leftArmM,
      counterweightN: c.counterweightN, rightArmM: value,
      inertiaKgM2: c.inertiaKgM2, durationS: c.trialDurationS,
      timeS: progress * c.trialDurationS });
    // Canvas y grows downwards: positive mathematical angle is counterclockwise.
    const theta = -trial.angleRad;
    const leftX = pivotX - c.leftArmM * scale * Math.cos(theta);
    const leftY = beamY - c.leftArmM * scale * Math.sin(theta);
    const rightX = pivotX + value * scale * Math.cos(theta);
    const rightY = beamY + value * scale * Math.sin(theta);
    ctx.save(); ctx.translate(pivotX, beamY); ctx.rotate(theta);
    ctx.fillStyle = '#c2dbe8'; ctx.fillRect(-c.leftArmM * scale - 35, -12, (c.leftArmM + value) * scale + 70, 24);
    ctx.restore();
    ctx.fillStyle = '#edaa4d'; ctx.beginPath(); ctx.moveTo(pivotX, beamY + 8); ctx.lineTo(pivotX - 40, beamY + 80); ctx.lineTo(pivotX + 40, beamY + 80); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#214762'; ctx.fillRect(pivotX - 80, beamY + 80, 160, 18);
    arrow(leftX, leftY - 85, leftX, leftY - 10, '#ffba57');
    arrow(rightX, rightY - 85, rightX, rightY - 10, '#6ce7ff');
    label('450 N ↓', leftX - 45, leftY - 99, '#ffca72', 21);
    label('300 N ↓', rightX - 45, rightY - 99, '#96ecff', 21);
    label('2,0 m', 200, 390, '#ffdc9b', 19);
    label(fr(value, 1) + ' m', 570, 390, '#a9efff', 19);
    label('ΣM_O (horizontal) = ' + fr(r.netMomentNm, 1) + ' N·m', 90, 438,
      Math.abs(r.netMomentNm) <= c.toleranceNm ? '#a1ffd5' : '#ffd59a', 26);
    label('Inclinaison : ' + fr(Math.abs(trial.angleRad) * 180 / Math.PI, 1) + '°', 205, 482, '#c4dfee', 20);
    label('Rotation sous inertie · butées ±15°', 205, 515, '#c4dfee', 17);
  }
  function drawRover(value, r, progress) {
    const roadY = 360, tNow = progress * activeConfig.durationS, movingNow = Math.min(tNow, r.stopTimeS), x = activeConfig.initialSpeedMps * movingNow + .5 * r.accelerationMps2 * movingNow * movingNow, xPx = 75 + x * 9.8, targetX = 75 + activeConfig.targetDistanceM * 9.8;
    ctx.fillStyle = '#193c50'; ctx.fillRect(0, roadY, 900, 100); ctx.fillStyle = '#4b8199'; ctx.fillRect(0, roadY, 900, 7);
    ctx.strokeStyle = '#ffdc84'; ctx.lineWidth = 4; ctx.setLineDash([22, 18]); ctx.beginPath(); ctx.moveTo(0, roadY + 56); ctx.lineTo(900, roadY + 56); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#2b8b6b'; ctx.fillRect(targetX - 14, roadY - 70, 28, 70); ctx.fillStyle = '#95ffd3'; ctx.fillRect(targetX - 28, roadY - 105, 56, 35);
    label('STATION 48 m', targetX - 87, roadY - 119, '#b7ffdc', 19);
    ctx.fillStyle = '#ffb347'; ctx.fillRect(xPx - 40, roadY - 44, 82, 34); ctx.fillStyle = '#dce9f3'; ctx.fillRect(xPx - 10, roadY - 62, 38, 22);
    for (const dx of [-25, 27]) { ctx.fillStyle = '#0a1422'; ctx.beginPath(); ctx.arc(xPx + dx, roadY - 5, 13, 0, 7); ctx.fill(); ctx.strokeStyle = '#a3d2e6'; ctx.lineWidth = 3; ctx.stroke(); }
    arrow(Math.max(50, xPx - 25), roadY - 80, Math.max(50, xPx - 25) + 90, roadY - 80, '#ffd47e');
    arrow(Math.max(60, xPx + 15), roadY - 110, Math.max(60, xPx + 15) - 70, roadY - 110, '#7bdffb');
    if (!reveal()) { label('Prépare les calculs avant l’essai', 55, 85, '#ffd68a', 24); label('Station à 48 m · départ au repos', 55, 125, '#cceeff', 20); return; }
    label('F_m = ' + value + ' N', 55, 85, '#ffd68a', 24); label('F_r = 120 N (opposée)', 55, 120, '#a8e8f8', 20);
    const t = activeConfig.durationS * progress;
    const movingT = Math.min(t, r.stopTimeS);
    const xt = activeConfig.initialSpeedMps * movingT + 0.5 * r.accelerationMps2 * movingT * movingT;
    const vt = Math.max(0, activeConfig.initialSpeedMps + r.accelerationMps2 * movingT);
    label('t = ' + fr(t, 1) + ' s', 55, 170, '#fff', 23);
    label('x(t) = ' + fr(xt, 1) + ' m', 55, 205, '#fff', 23);
    label('v(t) = ' + fr(vt, 1) + ' m/s', 55, 240, '#fff', 23);
    label('a = ' + fr(r.accelerationMps2, 2) + ' m/s²', 55, 485, '#9aefff', 23);
    label('Animation accélérée ×3', 580, 505, '#bad9e7', 16);
  }
  function drawHydro(value, r, progress) {
    const c = activeConfig;
    const t = progress * c.trialDurationS;
    const state = P.hydraulicTrial({ ...c, durationS: c.trialDurationS, pressureBar: value, timeS: t });
    const ext = 120 * state.displacementM / c.strokeM;
    const center = 465;
    ctx.fillStyle = '#1c4d6c'; ctx.fillRect(center - 96, 256, 192, 195);
    ctx.strokeStyle = '#88d7f7'; ctx.lineWidth = 5; ctx.strokeRect(center - 96, 256, 192, 195);
    ctx.fillStyle = '#d8eaf2'; ctx.fillRect(center - 84, 305 - ext, 168, 24);
    ctx.fillStyle = '#c2dce9'; ctx.fillRect(center - 22, 185 - ext, 44, 120);
    ctx.fillStyle = '#b7d6e7'; ctx.fillRect(center - 148, 174 - ext, 296, 18);
    ctx.fillStyle = '#f4b653'; ctx.fillRect(center - 78, 95 - ext, 156, 78);
    ctx.strokeStyle = '#ffe1a1'; ctx.lineWidth = 4; ctx.strokeRect(center - 78, 95 - ext, 156, 78);
    ctx.fillStyle = '#09273b'; ctx.fillRect(center - 130, 451, 260, 18);
    arrow(265, 405, 265, 320, '#75c7ff'); arrow(690, 145, 690, 245, '#ffe08a');
    label('Consigne p = ' + fr(value, 1) + ' bar', 65, 75, '#9cdeff', 25);
    label('D = ' + c.diameterMm + ' mm', 65, 115, '#d1f0ff', 21);
    label('F_utile = ' + fr(r.availableForceN, 2) + ' N', 65, 160, '#ffe0a0', 21);
    label('F_charge = ' + fr(c.loadN, 0) + ' N', 600, 110, '#f9d7a4', 19);
    label('S = ' + fr(r.areaM2 * 10000, 2) + ' cm²', 65, 495, '#d1edfa', 21);
    label('Course : ' + fr(state.displacementM * 1000, 1) + ' / ' + fr(c.strokeM * 1000, 0) + ' mm', 530, 495, '#d1edfa', 18);
    label(state.safetyLocked ? 'SURPRESSION · sécurité verrouillée' : state.canLift ? 'Levage en cours · débit constant' : 'Charge immobile · effort insuffisant', 380, 528,
      state.canLift ? '#9df7b7' : '#ffd59a', 18);
    ctx.fillStyle = '#09273b'; ctx.fillRect(65, 205, 180, 15);
    ctx.fillStyle = state.safetyLocked ? '#f5a173' : '#6bd8ff';
    ctx.fillRect(65, 205, 180 * Math.min(1, state.displacementM / c.strokeM), 15);
    label('v = ' + fr(state.speedMps * 1000, 2) + ' mm/s', 65, 245, '#cceeff', 18);
    label('t = ' + fr(t, 1) + ' s', 65, 277, '#cceeff', 18);
  }
  function drawElectric(value, r, progress) {
    const left = 100, right = 665, top = 245, bottom = 405;
    const tried = reveal();
    // Cable width varies with cross-section; current pulses move during the test.
    const wireWidth = 4 + value * .23;
    ctx.strokeStyle = '#f6ba5e'; ctx.lineWidth = wireWidth;
    ctx.beginPath(); ctx.moveTo(left + 125, top); ctx.lineTo(right - 55, top); ctx.stroke();
    ctx.strokeStyle = '#7edcff'; ctx.lineWidth = wireWidth;
    ctx.beginPath(); ctx.moveTo(right - 55, bottom); ctx.lineTo(left + 125, bottom); ctx.stroke();
    ctx.fillStyle = '#183a50'; ctx.fillRect(left, 190, 130, 260);
    ctx.strokeStyle = '#c4e5f3'; ctx.lineWidth = 4; ctx.strokeRect(left, 190, 130, 260);
    ctx.fillStyle = '#fff0c4'; ctx.fillRect(left + 30, 240, 70, 28);
    label('12,6 V', left + 12, 228, '#ffe7a8', 22);
    label('+', left + 140, top - 16, '#ffcf79', 26);
    label('−', left + 140, bottom + 15, '#a2edff', 26);
    ctx.fillStyle = '#163d58'; ctx.beginPath(); ctx.arc(right, 325, 96, 0, 2 * Math.PI); ctx.fill();
    ctx.strokeStyle = !tried ? '#8db3cc' : r.canCrank ? '#8af4bf' : '#f0a578'; ctx.lineWidth = 7; ctx.stroke();
    ctx.save(); ctx.translate(right, 325); ctx.rotate(tried && r.canCrank ? progress * Math.PI * 14 : 0);
    ctx.fillStyle = !tried ? '#c1dce7' : r.canCrank ? '#a7f3ff' : '#d2a5a0';
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3); ctx.fillRect(-12, 13, 24, 61);
    }
    ctx.restore();
    ctx.fillStyle = '#14283a'; ctx.beginPath(); ctx.arc(right, 325, 17, 0, 2 * Math.PI); ctx.fill();
    for (let k = 0; k < 5 && tried; k++) {
      const p = (progress * 1.2 + k / 5) % 1;
      ctx.fillStyle = '#fff4b3'; ctx.beginPath(); ctx.arc(left + 125 + p * (right - left - 180), top, 7, 0, 2 * Math.PI); ctx.fill();
    }
    label('Batterie', 105, 477, '#d5f0ff', 22);
    label('Démarreur', 603, 477, '#d5f0ff', 22);
    label('Section ' + fr(value, 0) + ' mm²', 320, 208, '#ffdd9b', 22);
    label('I = 180 A (essai imposé)', 320, 289, '#fce5b7', 19);
    label('ΔU = ' + fr(r.voltageDropV, 2) + ' V', 320, 338, '#bceaff', 22);
    label('U_d = ' + fr(r.starterVoltageV, 2) + ' V', 320, 375,
      r.canCrank ? '#9cf7c5' : '#ffb49c', 22);
    label('Pertes = ' + fr(r.totalLossW, 1) + ' W', 55, 80,
      r.lossesOK ? '#a5ffd0' : '#ffb59d', 26);
    label('Masse Cu = ' + fr(r.copperMassKg, 3) + ' kg', 55, 125,
      r.massOK ? '#a5ffd0' : '#ffb59d', 22);
    label(!tried ? 'DÉMARREUR À TESTER' : r.canCrank ? 'DÉMARREUR EN ROTATION' : 'DÉMARREUR IMMOBILE', 460, 80,
      !tried ? '#d1edfa' : r.canCrank ? '#a5ffd0' : '#ffb59d', 20);
    label(!tried ? 'ESSAI NON LANCÉ' : r.passed ? 'MISE EN SERVICE AUTORISÉE' : 'MISE EN SERVICE REFUSÉE', 250, 522,
      !tried ? '#d1edfa' : r.passed ? '#a5ffd0' : '#ffd59a', 22);
  }
  function drawBrake(value, r, progress) {
    const c = activeConfig, t = progress * c.trialDurationS;
    const state = P.brakingAtTime({ ...c, commandedBrakeN: value * 1000, timeS: t });
    const baseline = 395, origin = 160, scale = 65, lineX = origin + c.safetyLineM * scale;
    // x represents the vehicle FRONT, not its centre. The red line is 7 m ahead
    // of the initial front; passing it is visibly different from a safe stop.
    const frontX = origin + state.distanceM * scale;
    ctx.fillStyle = '#2a5360'; ctx.fillRect(40, baseline + 34, 820, 78);
    ctx.strokeStyle = '#9ab5bd'; ctx.lineWidth = 3;
    for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(40 + i * 74, baseline + 75); ctx.lineTo(75 + i * 74, baseline + 75); ctx.stroke(); }
    ctx.strokeStyle = '#ff9c83'; ctx.lineWidth = 6; ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.moveTo(lineX, 155); ctx.lineTo(lineX, baseline + 34); ctx.stroke(); ctx.setLineDash([]);
    label('LIGNE 7,0 m', lineX - 100, 139, '#ffd6bc', 21);
    const wheelAngle = state.wheelsLocked && t > c.reactionTimeS ?
      c.initialSpeedMps * c.reactionTimeS / c.wheelRadiusM : state.distanceM / c.wheelRadiusM;
    if (window.__SIQUEST_TEST__) window.__si_brake_frame = { timeS: t, distanceM: state.distanceM, speedMps: state.speedMps, phase: state.phase, wheelsLocked: state.wheelsLocked, wheelAngleRad: wheelAngle, frontX, lineX };
    ctx.save(); ctx.translate(frontX - 127, baseline);
    ctx.fillStyle = '#ffc468'; ctx.fillRect(-36, -128, 146, 93);
    ctx.fillStyle = '#9de7ff'; ctx.fillRect(12, -117, 72, 47);
    ctx.fillStyle = '#162d42'; ctx.fillRect(-56, -43, 183, 28);
    ctx.strokeStyle = '#ffe7ad'; ctx.lineWidth = 3; ctx.strokeRect(-36, -128, 146, 93);
    for (const wx of [-10, 90]) {
      ctx.save(); ctx.translate(wx, 0); ctx.fillStyle = '#0a1d2b';
      ctx.beginPath(); ctx.arc(0, 0, 29, 0, 2 * Math.PI); ctx.fill();
      ctx.strokeStyle = state.wheelsLocked && t > c.reactionTimeS ? '#ffab8e' : '#a3eaff';
      ctx.lineWidth = 4; ctx.stroke(); ctx.rotate(wheelAngle);
      for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.lineTo(20 * Math.cos(j * Math.PI / 2), 20 * Math.sin(j * Math.PI / 2)); ctx.stroke(); }
      ctx.restore();
    }
    ctx.restore();
    arrow(60, 360, 145, 360, '#86edca', 4);
    label('4,0 m/s au départ', 40, 350, '#a7f4df', 18);
    label('Force commandée : ' + fr(value, 2) + ' kN', 40, 58, '#ffdb9d', 24);
    label('Distance : ' + fr(state.distanceM, 2) + ' m', 40, 104, '#d3f3ff', 23);
    label('Vitesse : ' + fr(state.speedMps, 2) + ' m/s', 40, 150, '#d3f3ff', 23);
    label('Temps : ' + fr(t, 2) + ' s', 40, 196, '#d3f3ff', 22);
    label('Adhérence max : ' + fr(r.maximumAdhesionN / 1000, 2) + ' kN', 40, 240, '#d3f3ff', 19);
    label(state.phase === 'reaction' ? 'RÉACTION · vitesse constante' :
      state.phase === 'sliding' ? 'GLISSADE · roues bloquées' :
      state.phase === 'braking' ? 'FREINAGE · roues en rotation' :
      r.wheelsLocked ? 'ARRÊT · roues bloquées pendant le freinage' : 'ARRÊT · roues en adhérence',
      40, 286, state.phase === 'sliding' ? '#ffab8e' : '#a3f4d6', 20);
    label('d_r = ' + fr(r.reactionDistanceM, 2) + ' m', 40, 502, '#cbe9ff', 19);
    label('d_f = ' + fr(r.brakingDistanceM, 2) + ' m', 270, 502, '#cbe9ff', 19);
    label('d_arrêt = ' + fr(r.stoppingDistanceM, 2) + ' m', 490, 502,
      r.physicalPassed ? '#a8f5d2' : '#ffc09d', 19);
  }
  function drawSpring(value, r, progress) {
    const c = activeConfig;
    // Quasi-static loading ramp: at each frame applied load is 1200 N × progress.
    // The spring and rigid stop reactions are recalculated from this instantaneous load.
    const s = P.springStop({ loadN: c.loadN * progress, stiffnessNPerMm: value, maxStrokeMm: c.maxStrokeMm });
    const x = 445, top = 145 + 150 * s.compressionM / s.maxStrokeM;
    const stopY = 145 + 150;
    ctx.fillStyle = '#17445b'; ctx.fillRect(200, 445, 500, 32);
    ctx.fillStyle = '#9bc9d8'; ctx.fillRect(x - 165, top - 14, 330, 24);
    ctx.strokeStyle = '#d2f5ff'; ctx.lineWidth = 3; ctx.strokeRect(x - 165, top - 14, 330, 24);
    // Spring coil: length and pitch follow the actual compression.
    const coilTop = top + 18, coilBottom = 445, n = 9;
    ctx.beginPath(); ctx.moveTo(x, coilTop);
    for (let i = 0; i <= n * 16; i++) {
      const u = i / (n * 16);
      const y = coilTop + u * (coilBottom - coilTop);
      const xx = x + 70 * Math.sin(u * n * 2 * Math.PI);
      ctx.lineTo(xx, y);
    }
    ctx.strokeStyle = '#ffd078'; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.strokeStyle = '#ffd7a0'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#f1b96d'; ctx.fillRect(x - 115, 65 + 150 * s.compressionM / s.maxStrokeM, 230, 65);
    ctx.strokeStyle = '#ffe4a8'; ctx.lineWidth = 3; ctx.strokeRect(x - 115, 65 + 150 * s.compressionM / s.maxStrokeM, 230, 65);
    // Rigid stops: at full compression the platform touches these pads.
    ctx.fillStyle = s.stopEngaged ? '#ff967e' : '#86c9e4';
    ctx.fillRect(280, stopY + 10, 48, 145); ctx.fillRect(562, stopY + 10, 48, 145);
    arrow(445, 30, 445, 70 + 150 * s.compressionM / s.maxStrokeM, '#ffc778', 6);
    arrow(740, 420, 740, 345, '#8de4ff', 5);
    label('Charge appliquée : ' + fr(c.loadN * progress, 0) + ' N', 40, 55, '#ffda9c', 23);
    label('k = ' + fr(value, 1) + ' N/mm', 40, 105, '#d9f4ff', 23);
    label('x = ' + fr(s.compressionM * 1000, 2) + ' mm', 40, 150, '#e5f6ff', 23);
    label('F ressort = ' + fr(s.springForceN, 1) + ' N', 40, 200, '#ffdfac', 20);
    label('F butée = ' + fr(s.stopReactionN, 1) + ' N', 40, 245,
      s.stopEngaged ? '#ffb59b' : '#a8f2ce', 20);
    label('E = ' + fr(s.elasticEnergyJ, 2) + ' J', 40, 290, '#d2efff', 22);
    label('Butée 32 mm', 635, 310, '#b9eaff', 20);
    label('Compression utile : 26 à 31 mm', 35, 512, '#cdeaf9', 19);
    label(s.stopEngaged ? 'BUTÉE EN CHARGE' : s.compressionM * 1000 < c.minimumUsefulStrokeMm && progress === 1 ? 'COURSE INSUFFISANTE' : 'BUTÉE SANS EFFORT', 565, 510,
      s.stopEngaged ? '#ffb59b' : '#a8f2ce', 19);
  }
  function drawRoverPlot(r) {
    const p = $('rover-plot'), g = p.getContext('2d');
    g.fillStyle = '#06192a'; g.fillRect(0, 0, 900, 270);
    const T = activeConfig.durationS;
    const series = [
      { x0: 50, y0: 30, w: 360, h: 170, title: 'Position x(t) [m]', color: '#ffc976', f: t => { const u = Math.min(t, r.stopTimeS); return activeConfig.initialSpeedMps * u + .5 * r.accelerationMps2 * u * u; } },
      { x0: 495, y0: 30, w: 360, h: 170, title: 'Vitesse v(t) [m/s]', color: '#7bdffb', f: t => Math.max(0, activeConfig.initialSpeedMps + r.accelerationMps2 * Math.min(t, r.stopTimeS)) }
    ];
    for (const s of series) {
      const max = Math.max(.01, ...Array.from({length:81}, (_,i) => s.f(T*i/80)*1.15));
      g.strokeStyle = '#84afc8'; g.lineWidth = 2; g.beginPath();
      g.moveTo(s.x0, s.y0); g.lineTo(s.x0, s.y0 + s.h); g.lineTo(s.x0 + s.w, s.y0 + s.h); g.stroke();
      g.fillStyle = '#d4e9f6'; g.font = 'bold 17px system-ui'; g.fillText(s.title, s.x0, 22);
      g.font = '14px system-ui'; g.fillText('0', s.x0 - 15, s.y0 + s.h + 17); g.fillText('8 s', s.x0 + s.w - 24, s.y0 + s.h + 20);
      g.fillText(fr(max, 1), s.x0 + 5, s.y0 + 17);
      g.strokeStyle = s.color; g.lineWidth = 4; g.beginPath();
      for (let i = 0; i <= 80; i++) {
        const t = T * i / 80, px = s.x0 + s.w * i / 80;
        const py = s.y0 + s.h - (s.f(t) / max) * s.h;
        if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
      }
      g.stroke();
    }
    $('rover-plot-alt').textContent = 'Données du graphe : t = 0 s, x = 0 m, v = 0 m/s ; t = 4 s, x = ' + fr((() => {const u=Math.min(4,r.stopTimeS);return activeConfig.initialSpeedMps*u+.5*r.accelerationMps2*u*u})(), 2) + ' m, v = ' + fr(Math.max(0,activeConfig.initialSpeedMps+r.accelerationMps2*Math.min(4,r.stopTimeS)), 2) + ' m/s ; t = 8 s, x = ' + fr(r.distanceM, 2) + ' m, v = ' + fr(r.finalSpeedMps, 2) + ' m/s.';
  }
  function drawPneumatic(value, r, progress) {
    const c = activeConfig, s = P.pneumaticCylinder({ ...c, pressureBar: value, timeS: progress * c.trialDurationS });
    const x0 = 300, x1 = 570, centerY = 290;
    ctx.fillStyle = '#a2d7e9'; ctx.fillRect(x0, centerY - 70, x1 - x0, 140);
    ctx.fillStyle = '#173c5a'; ctx.fillRect(x0 + 12, centerY - 58, x1 - x0 - 24, 116);
    ctx.strokeStyle = '#e6f9ff'; ctx.lineWidth = 5; ctx.strokeRect(x0, centerY - 70, x1 - x0, 140);
    const pistonX = x0 + 20 + 210 * s.displacementM / c.strokeM;
    ctx.fillStyle = '#ffc76f'; ctx.fillRect(pistonX, centerY - 54, 23, 108);
    ctx.fillStyle = '#b7f2ff'; ctx.fillRect(pistonX + 23, centerY - 12, 155, 24);
    ctx.fillStyle = '#ffc76f'; ctx.fillRect(pistonX + 155, centerY - 35, 40, 70);
    arrow(80, 290, 275, 290, '#88e3ff', 7);
    arrow(775, 290, 650, 290, '#ffbd82', 6);
    label('AIR COMPRIMÉ', 55, 253, '#a3eaff', 19);
    label('Charge + ressort', 655, 250, '#ffd6a4', 19);
    label('p = ' + fr(value, 2) + ' bar', 48, 75, '#e5faff', 28);
    label('Force utile = ' + fr(r.availableForceN, 1) + ' N', 48, 125, '#e5faff', 22);
    label('Course = ' + fr(s.displacementM * 1000, 1) + ' / 80 mm', 48, 175, '#ffdb9a', 24);
    label('p minimale = ' + fr(r.requiredPressureBar, 3) + ' bar', 48, 225, '#c8edff', 20);
    label(r.safetyLocked ? 'SÉCURITÉ AMONT ACTIVÉE' : r.fullStroke ? 'COURSE FINALE POSSIBLE' : 'COURSE FINALE INSUFFISANTE',
      260, 455, r.safetyLocked || !r.fullStroke ? '#ffad91' : '#a1f3cf', 24);
    label('Schéma quasi statique · position calculée au temps de simulation', 45, 510, '#d1ecff', 17);
    if (window.__SIQUEST_TEST__) window.__si_pneumatic_frame = { displacementM: s.displacementM, pressureBar: value };
  }
  function drawThermal(value, r, progress) {
    const c = activeConfig, s = P.coolingLoop({ ...c, flowLpm: value, timeS: progress * c.trialDurationS });
    ctx.fillStyle = '#294e68'; ctx.fillRect(290, 160, 340, 230);
    ctx.fillStyle = '#102b42'; ctx.fillRect(305, 177, 310, 196);
    ctx.strokeStyle = '#8ce3ff'; ctx.lineWidth = 7;
    for (let i = 0; i < 7; i++) { const x = 325 + i * 42; ctx.beginPath();ctx.moveTo(x, 190);ctx.lineTo(x, 360);ctx.stroke(); }
    arrow(105, 220, 285, 220, '#8ae8ff', 8);
    arrow(635, 300, 805, 300, '#ffc278', 8);
    label('Entrée 75 °C', 60, 200, '#b6edff', 20);
    label('Sortie ' + fr(s.outletAtTimeC, 2) + ' °C', 620, 275, '#ffe1a7', 19);
    label('CIRCUIT DE REFROIDISSEMENT', 225, 125, '#e2f8ff', 23);
    label('Débit = ' + fr(value, 1) + ' L/min', 45, 60, '#e4f9ff', 26);
    label('ΔT établi = ' + fr(r.temperatureRiseK, 2) + ' K', 45, 435, '#ffdfaa', 23);
    label('P pompe = ' + fr(r.pumpPowerW, 1) + ' W', 45, 475, '#d4f2ff', 22);
    label('t = ' + fr(progress * c.trialDurationS, 1) + ' s', 660, 475, '#d4f2ff', 22);
    label(r.passed ? 'ESSAI PROLONGÉ AUTORISÉ' : 'ESSAI PROLONGÉ REFUSÉ', 460, 515,
      r.passed ? '#a6f5cd' : '#ffaf95', 18);
    if (window.__SIQUEST_TEST__) window.__si_thermal_frame = { outletAtTimeC: s.outletAtTimeC, flowLpm: value };
  }
  function drawMetrology(value, r, progress) {
    const c = activeConfig, scale = 2200, zero = 450, center = 50;
    const x = mm => zero + (mm - center) * scale;
    ctx.fillStyle = '#21435c'; ctx.fillRect(60, 245, 780, 90);
    ctx.fillStyle = '#4c9c89'; ctx.fillRect(x(c.lowerLimitMm), 245, x(c.upperLimitMm) - x(c.lowerLimitMm), 90);
    for (const [mm, name] of [[c.lowerLimitMm, 'MIN 49,90'],[c.upperLimitMm, 'MAX 50,10']]) {
      ctx.strokeStyle = '#fff0a3'; ctx.lineWidth = 4;ctx.beginPath();ctx.moveTo(x(mm),210);ctx.lineTo(x(mm),370);ctx.stroke();
      label(name, x(mm)-50, 190, '#ffe7a6', 18);
    }
    const lo = x(c.measuredMm - r.expandedUncertaintyMm), hi = x(c.measuredMm + r.expandedUncertaintyMm);
    ctx.strokeStyle = r.accepted ? '#b3f8d4' : '#ff9f8d';ctx.lineWidth = 10;
    ctx.beginPath();ctx.moveTo(lo,285);ctx.lineTo(lo + (hi-lo)*progress,285);ctx.stroke();
    for (const xx of [lo,hi]) {ctx.beginPath();ctx.moveTo(xx,270);ctx.lineTo(xx,300);ctx.stroke();}
    ctx.fillStyle = '#d7f3ff';ctx.beginPath();ctx.arc(x(c.measuredMm),285,10,0,Math.PI*2);ctx.fill();
    label('MESURE : 49,940 mm', 48, 68, '#e9f9ff', 27);
    label('Résolution = ' + fr(value, 3) + ' mm', 48, 117, '#d5f3ff', 22);
    label('U = ±' + fr(r.expandedUncertaintyMm, 4) + ' mm', 48, 165, '#ffdca5', 23);
    label('Intervalle : [' + fr(r.intervalLowerMm, 4) + ' ; ' + fr(r.intervalUpperMm, 4) + '] mm', 70, 410, '#e3f8ff', 22);
    label('Coût : ' + (r.option ? r.option.costEuro + ' €' : 'hors catalogue'), 70, 455, '#e3f8ff', 22);
    label(r.passed ? 'CONFORMITÉ DÉMONTRÉE · BUDGET OK' : 'REMONTAGE NON AUTORISÉ', 70, 510,
      r.passed ? '#b4f8d4' : '#ffb49b', 21);
    if (window.__SIQUEST_TEST__) window.__si_metrology_frame = { lowerMm: r.intervalLowerMm, upperMm: r.intervalUpperMm, accepted: r.accepted };
  }
  function drawHose(value, r, progress) {
    const radius = 10 + value * 1.7;
    label('FLEXIBLE HYDRAULIQUE · COUPE SCHÉMATIQUE', 60, 70, '#e7f8ff', 25);
    ctx.fillStyle = '#173d58'; ctx.fillRect(110, 210-radius, 680, radius*2);
    ctx.strokeStyle = '#b9d6e7'; ctx.lineWidth = 12; ctx.strokeRect(110, 210-radius, 680, radius*2);
    ctx.save();ctx.beginPath();ctx.rect(115,210-radius+5,670,radius*2-10);ctx.clip();
    const dots = Math.round(4 + r.velocityMps*2);
    for(let i=0;i<dots;i++) {
      const xx = 115 + ((i/dots + progress*r.velocityMps/12) % 1)*670;
      ctx.fillStyle = '#67d8f5';ctx.beginPath();ctx.arc(xx,210 + Math.sin(i*3)*radius*.5,4.5,0,Math.PI*2);ctx.fill();
    }ctx.restore();
    arrow(135,320,690,320,'#a4e9ff',5);
    label('Q = 35 L/min', 85, 120, '#a8f3ff', 24);
    label('D = '+fr(value,0)+' mm   ·   v = '+fr(r.velocityMps,2)+' m/s', 85, 370, '#f3faff', 24);
    label('Re = '+fr(r.reynolds,0)+'   ·   f = '+fr(r.frictionFactor,4), 85, 408, '#f3faff', 21);
    label('Δp = '+fr(r.pressureDropBar,3)+' bar   ·   P_perdue = '+fr(r.dissipatedPowerW,1)+' W', 85, 449, '#ffd6a3', 21);
    label(r.passed ? 'FLEXIBLE ACCEPTÉ' : 'CHOIX NON CONFORME', 85, 505, r.passed ? '#a8ffd4' : '#ffb49b', 23);
    if(window.__SIQUEST_TEST__)window.__si_hose_frame={diameterMm:value,velocityMps:r.velocityMps,pressureDropBar:r.pressureDropBar,progress};
  }
  function drawTorsion(value, r, progress) {
    label('ARBRE PLEIN · TORSION ÉLASTIQUE', 62, 70, '#e9f7ff', 25);
    const y=255, x0=130, x1=760, h=16+value*1.2;
    ctx.fillStyle='#1d607e';ctx.fillRect(x0,y-h/2,x1-x0,h);
    ctx.strokeStyle='#b2dcef';ctx.lineWidth=5;ctx.strokeRect(x0,y-h/2,x1-x0,h);
    const angle=Math.min(r.twistRad*progress*4,1.5); // Déformation angulaire volontairement amplifiée ×4.
    for(let i=0;i<=12;i++){
      const x=x0+(x1-x0)*i/12;
      const phase=angle*i/12;
      const yy=y+Math.sin(phase)*h*.38;
      ctx.strokeStyle='#ffc878';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(x,yy-9);ctx.lineTo(x,yy+9);ctx.stroke();
    }
    ctx.fillStyle='#7da2b9';ctx.fillRect(x0-20,y-h/2-18,20,h+36);
    arrow(x1-25,y-110,x1+5,y-80,'#ffca71',5);
    label('T = '+fr(activeConfig.torqueNm,0)+' N·m', 75, 135, '#ffd7a6', 25);
    label('D = '+fr(value,0)+' mm   ·   J = '+fr(r.polarSecondMomentM4*1e8,3)+' × 10⁻⁸ m⁴', 65, 360, '#e3f8ff', 22);
    label('τ_max = '+fr(r.maxShearStressMPa,2)+' MPa', 65, 408, '#e3f8ff', 22);
    label('θ = '+fr(r.twistDeg,3)+'°   ·   m = '+fr(r.massKg,2)+' kg', 65, 452, '#ffd6a3', 22);
    label(r.passed ? 'ARBRE VALIDÉ' : 'CHOIX NON CONFORME', 65, 506, r.passed ? '#b5f9d4' : '#ffb49b', 23);
    if(window.__SIQUEST_TEST__)window.__si_torsion_frame={diameterMm:value,twistDeg:r.twistDeg,visualAmplification:4,progress};
  }
  function draw(progress, value, r) {
    if (!ctx) return; background();
    if (level.type === 'hose') drawHose(value, r, progress);
    else if (level.type === 'torsion') drawTorsion(value, r, progress);
    else if (level.type === 'pneumatic') drawPneumatic(value, r, progress);
    else if (level.type === 'thermal') drawThermal(value, r, progress);
    else if (level.type === 'metrology') drawMetrology(value, r, progress);
    else if (level.type === 'gear') drawGear(value, r);
    else if (level.type === 'moment') drawMoment(value, r, progress);
    else if (level.type === 'rover') drawRover(value, r, progress);
    else if (level.type === 'electric') drawElectric(value, r, progress);
    else if (level.type === 'brake') drawBrake(value, r, progress);
    else if (level.type === 'spring') drawSpring(value, r, progress);
    else drawHydro(value, r, progress);
  }
  function frame(now) { if (window.__SIQUEST_TEST__) window.__si_frames = (window.__si_frames || 0) + 1;
    // Freeze the actual trial inputs while the animation is running.
    const value = testAnimating && activeTrial ? activeTrial.value :
      (level.type === 'rover' ? (roverFieldsValid() ? parseInput($('calc-force')) : level.input.value) :
      (genericFieldsValid() ? parseInput($('prediction')) : level.input.value));
    if (level.type === 'rover' ? Number.isFinite(value) && value >= 0 && value <= level.input.max : validValue(value)) {
      const r = testAnimating && activeTrial ? activeTrial.result : compute(value);
      if (testAnimating) {
        const p = Math.max(0, Math.min(1, (now - animationStart) / TRIAL_DURATION_MS));
        if (level.type === 'gear') gearAngle = 2 * Math.PI * activeConfig.n1Rpm / 60 *
          (Math.max(0, now - animationStart) / 1000) / 12; // Slow motion ×12; signed ratio in drawGear.
        draw(p, value, r);
        if (p >= 1) { testAnimating = false; draw(1, value, r); }
      } else {
        // Keep the final frame visible after each trial, even when it fails.
        draw(activeTrial && attempts > 0 ? 1 : 0, value, r);
      }
    }
    if (testAnimating && !reduceMotion) rafId = requestAnimationFrame(frame);
    else rafId = null;
  }
  setValue(level.input.value);
  draw(0, level.input.value, compute(level.input.value));
})();
