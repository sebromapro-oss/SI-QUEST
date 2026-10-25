/* SI QUEST cycle 26: deterministic, independently testable pedagogical coaching.
   All computations delegate to the scientific engine; never infer a correct answer
   from a decorative animation or from a previously displayed value. */
(function (root) {
  'use strict';
  const ready = (attempts, hints) => Number.isInteger(attempts) && Number.isInteger(hints) && attempts >= 3 && hints >= 3;
  function stars({ attempts, hints, solutionViewed }) {
    if (solutionViewed) return 1;
    if (attempts === 1 && hints === 0) return 3;
    if (attempts <= 2 && hints <= 1) return 2;
    return 1;
  }
  const n = (value, digits = 3) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits }).format(value);
  function solve(level, P) {
    const c = level.config;
    let value, steps, decision;
    switch (level.type) {
      case 'hose': {
        const choices = c.options.map(o => ({ ...o, r: P.hoseLoss({ ...c, diameterMm: o.diameterMm }) }));
        const valid = choices.filter(o => o.r.velocityMps <= c.maxVelocityMps &&
          o.r.pressureDropBar <= c.maxPressureDropBar && o.costEuro <= c.maxBudgetEuro);
        if (!valid.length) throw new Error('Aucun flexible conforme');
        valid.sort((a,b) => a.costEuro-b.costEuro);
        const chosen=valid[0],r=chosen.r;value=chosen.diameterMm;
        steps=[`Q = ${n(c.flowLpm)} L/min = ${n(r.flowM3PerS,7)} m³/s ; D = ${n(value)} mm = ${n(r.diameterM,4)} m.`,
          `S = πD²/4 = ${n(r.areaM2,7)} m² ; v = Q/S = ${n(r.velocityMps)} m/s.`,
          `Re = ρvD/μ = ${n(r.reynolds)} ; facteur de Darcy f = ${n(r.frictionFactor,5)}.`,
          `Δp = (fL/D + K)ρv²/2 = ${n(r.pressureDropBar)} bar ; P_perdue = ΔpQ = ${n(r.dissipatedPowerW)} W.`,
          `Coût = ${n(chosen.costEuro)} € ; limites : v ≤ ${n(c.maxVelocityMps)} m/s, Δp ≤ ${n(c.maxPressureDropBar)} bar, budget ≤ ${n(c.maxBudgetEuro)} €.`];
        decision='Flexible retenu : vitesse, pertes de charge et budget conformes dans le modèle.';
        break;
      }
      case 'torsion': {
        const choices=c.standardDiametersMm.map(d => ({d,r:P.solidShaftTorsion({...c,diameterMm:d})}));
        const valid=choices.filter(o=>o.r.maxShearStressMPa<=c.maxStressMPa && o.r.twistDeg<=c.maxTwistDeg && o.r.massKg<=c.maxMassKg);
        if(!valid.length)throw new Error('Aucun diamètre conforme');
        const chosen=valid[0],r=chosen.r;value=chosen.d;
        steps=[`D = ${n(value)} mm = ${n(r.diameterM,4)} m ; J = πD⁴/32 = ${n(r.polarSecondMomentM4,10)} m⁴.`,
          `τ_max = TD/(2J) = ${n(r.maxShearStressMPa)} MPa ≤ ${n(c.maxStressMPa)} MPa : vérification de résistance.`,
          `θ = TL/(GJ) = ${n(r.twistRad,5)} rad = ${n(r.twistDeg)}° ≤ ${n(c.maxTwistDeg)}° : rigidité angulaire.`,
          `m = ρπD²L/4 = ${n(r.massKg)} kg ≤ ${n(c.maxMassKg)} kg : contrainte de masse.`];
        decision='Diamètre normalisé de masse minimale satisfaisant contrainte, rigidité et masse.';
        break;
      }
      case 'pneumatic': {
        const areaM2 = Math.PI * (c.diameterMm / 1000) ** 2 / 4;
        const threshold = (c.loadN + c.preloadN + c.stiffnessNPerM * c.strokeM) / (c.efficiency * areaM2 * 1e5);
        value = Math.ceil((threshold + 1e-9) * 10) / 10;
        const r = P.pneumaticCylinder({ ...c, pressureBar: value, timeS: c.trialDurationS });
        steps = [`S = πD²/4 = π × (${n(c.diameterMm / 1000)} m)²/4 = ${n(areaM2, 8)} m².`,
          `F_r(fin) = F₀ + k × x = ${n(c.preloadN)} N + ${n(c.stiffnessNPerM)} N/m × ${n(c.strokeM)} m = ${n(c.preloadN + c.stiffnessNPerM * c.strokeM)} N.`,
          `p_min = (F_charge + F_r)/(ηS) = ${n(threshold, 4)} bar. Choix au dixième supérieur : ${n(value)} bar.`,
          `Course atteignable : ${n(r.equilibriumM * 1000)} mm ; marge en fin de course : ${n(r.forceMarginAtEndN)} N.`];
        decision = r.fullStroke && value <= c.maxOperatingPressureBar ? 'Verrou engagé ; pression de service respectée.' : 'Aucune pression conforme sur cette grille.';
        break;
      }
      case 'thermal': {
        const candidates = [];
        for (let f = level.input.min; f <= level.input.max; f += level.input.step) {
          const r = P.coolingLoop({ ...c, flowLpm: f, timeS: c.trialDurationS });
          if (r.temperatureRiseK <= c.maxTemperatureRiseK && r.pumpPowerW <= c.maxPumpPowerW) candidates.push({ f, r });
        }
        if (!candidates.length) throw new Error('Aucun débit conforme');
        value = candidates[0].f; const r = candidates[0].r;
        steps = [`Q = ${n(value)} L/min = ${n(r.flowM3PerS, 7)} m³/s.`,
          `ṁ = ρQ = ${n(c.densityKgM3)} kg/m³ × ${n(r.flowM3PerS, 7)} m³/s = ${n(r.massFlowKgPerS)} kg/s.`,
          `ΔT = Φ/(ṁcₚ) = ${n(c.heatInputW)} W / (${n(r.massFlowKgPerS)} kg/s × ${n(c.heatCapacityJPerKgK)} J/(kg·K)) = ${n(r.temperatureRiseK)} K.`,
          `P_pompe = ΔpQ/η = ${n(c.pressureDropPa)} Pa × ${n(r.flowM3PerS, 7)} m³/s / ${n(c.pumpEfficiency)} = ${n(r.pumpPowerW)} W.`];
        decision = 'ΔT et puissance de pompe sous les seuils : essai prolongé autorisé dans le modèle.';
        break;
      }
      case 'metrology': {
        const candidates = c.instrumentOptions.map(o => ({ o, r: P.guardedMeasurement({ ...c, resolutionMm: o.resolutionMm }) }));
        const valid = candidates.filter(x => x.r.accepted && x.o.costEuro <= c.maxBudgetEuro);
        if (!valid.length) throw new Error('Aucun instrument conforme');
        valid.sort((a,b)=>a.o.costEuro-b.o.costEuro);
        value = valid[0].o.resolutionMm; const r = valid[0].r;
        steps = [`u_r = r/√12 = ${n(value, 3)} mm / √12 = ${n(r.resolutionStdMm, 5)} mm.`,
          `u_c = √(u_r² + u_rép²) = √(${n(r.resolutionStdMm, 5)}² + ${n(c.repeatabilityStdMm, 5)}²) = ${n(r.combinedStdMm, 5)} mm.`,
          `U = 2u_c = ${n(r.expandedUncertaintyMm, 5)} mm ; intervalle = [${n(r.intervalLowerMm, 4)} ; ${n(r.intervalUpperMm, 4)}] mm.`,
          `Tolérance = [${n(c.lowerLimitMm, 2)} ; ${n(c.upperLimitMm, 2)}] mm ; coût instrument = ${n(valid[0].o.costEuro)} € ≤ ${n(c.maxBudgetEuro)} €.`];
        decision = 'Intervalle entièrement dans la tolérance, coût accepté : axe libéré pour remontage.';
        break;
      }
      case 'gear': {
        value = c.n1Rpm * c.z1 / c.targetRpm;
        const r = P.gear({ n1Rpm: c.n1Rpm, z1: c.z1, z2: value, torqueNm: c.torqueNm, efficiency: c.efficiency });
        steps = [`|n₂| = n₁ × Z₁ / Z₂, donc Z₂ = n₁ × Z₁ / |n₂|.`, `Z₂ = ${n(c.n1Rpm)} tr/min × ${n(c.z1)} dents / ${n(c.targetRpm)} tr/min = ${n(value)} dents.`, `|C₂| = η × C₁ × Z₂ / Z₁ = ${n(c.efficiency)} × ${n(c.torqueNm)} N·m × ${n(value)} / ${n(c.z1)} = ${n(r.outputTorqueNm)} N·m.`, `n₂ = ${n(r.n2Rpm)} tr/min (sens inverse).`];
        decision = Number.isInteger(value) && r.outputTorqueNm >= c.minimumTorqueNm ? 'Roue entière et couple suffisant : transmission conforme.' : 'Aucune solution exacte dans ces données : comparer des alternatives.';
        break;
      }
      case 'moment': {
        value = c.loadN * c.leftArmM / c.counterweightN;
        const r = P.moments({ loadN: c.loadN, leftArmM: c.leftArmM, counterweightN: c.counterweightN, rightArmM: value });
        steps = [`À l’équilibre : ΣM_O = F_g × d_g − F_d × d = 0 N·m.`, `d = F_g × d_g / F_d = ${n(c.loadN)} N × ${n(c.leftArmM)} m / ${n(c.counterweightN)} N = ${n(value)} m.`, `ΣM_O = ${n(r.netMomentNm)} N·m ; tolérance : ±${n(c.toleranceNm)} N·m.`];
        decision = 'Moments équilibrés dans le modèle statique : position conforme.';
        break;
      }
      case 'rover': {
        const a = 2 * c.targetDistanceM / (c.durationS ** 2);
        const net = c.massKg * a;
        value = net + c.rollingResistanceN;
        const r = P.rover({ massKg: c.massKg, rollingResistanceN: c.rollingResistanceN, tractionN: value, initialSpeedMps: c.initialSpeedMps, durationS: c.durationS });
        steps = [`Depuis le repos : x = ½at², donc a = 2x/t² = 2 × ${n(c.targetDistanceM)} m / (${n(c.durationS)} s)² = ${n(a)} m/s².`, `ΣF = m × a = ${n(c.massKg)} kg × ${n(a)} m/s² = ${n(net)} N.`, `F_m = ΣF + F_r = ${n(net)} N + ${n(c.rollingResistanceN)} N = ${n(value)} N.`, `Essai : x = ${n(r.distanceM)} m ; v = ${n(r.finalSpeedMps)} m/s.`];
        decision = r.finalSpeedMps <= c.speedLimitMps && Math.abs(r.distanceM - c.targetDistanceM) <= c.distanceToleranceM ? 'Trajectoire et vitesse conformes.' : 'Vérifier la vitesse limite et la distance : modèle à reprendre.';
        break;
      }
      case 'electric': {
        const candidates = c.standardSectionsMm2.map(s => ({ s, r: P.starterCable({ ...c, crossSectionMm2: s }) }));
        const valid = candidates.filter(x => x.r.canCrank && x.r.totalLossW <= c.maxLossW && x.r.copperMassKg <= c.maxCopperMassKg);
        if (!valid.length) throw new Error('Aucune section normalisée conforme : étude à revoir');
        const chosen = valid[0]; value = chosen.s;
        const r = chosen.r;
        steps = [`R_Cu = ρL/S = ${n(c.copperResistivityOhmMm2PerM, 5)} Ω·mm²/m × ${n(c.totalCopperLengthM)} m / ${n(value)} mm² = ${n(r.copperResistanceOhm, 6)} Ω.`, `R_tot = R_Cu + R_contacts = ${n(r.totalResistanceOhm, 6)} Ω.`, `ΔU = I × R_tot = ${n(c.currentA)} A × ${n(r.totalResistanceOhm, 6)} Ω = ${n(r.voltageDropV)} V ; U_d = ${n(r.starterVoltageV)} V.`, `P_pertes = I²R_tot = ${n(r.totalLossW)} W ; m_Cu = ${n(r.copperMassKg)} kg.`];
        decision = `Section ${n(value)} mm² conforme aux seuils de tension, pertes et masse, dans le modèle à courant constant.`;
        break;
      }
      case 'spring': {
        const candidates = c.standardStiffnessNPerMm.map(k => ({ k, r: P.springStop({ loadN: c.loadN, stiffnessNPerMm: k, maxStrokeMm: c.maxStrokeMm }) }));
        const valid = candidates.filter(x => x.r.compressionM * 1000 >= c.minimumUsefulStrokeMm - 1e-9 && x.r.compressionM * 1000 <= c.maximumUsefulStrokeMm + 1e-9 && !x.r.stopEngaged && x.r.elasticEnergyJ <= c.maximumEnergyJ + 1e-9);
        if (!valid.length) throw new Error('Aucun ressort proposé conforme');
        const chosen = valid[0]; value = chosen.k; const r = chosen.r;
        steps = [`k = ${n(value)} N/mm = ${n(value * 1000)} N/m.`, `x_libre = F/k = ${n(c.loadN)} N / ${n(value * 1000)} N/m = ${n(r.freeCompressionM * 1000)} mm.`, `x_réel = min(x_libre, ${n(c.maxStrokeMm)} mm) = ${n(r.compressionM * 1000)} mm ; F_butée = ${n(r.stopReactionN)} N.`, `E = ½kx² = ${n(r.elasticEnergyJ)} J ≤ ${n(c.maximumEnergyJ)} J.`];
        decision = 'Course, butée et énergie conformes : support accepté.';
        break;
      }
      case 'brake': {
        // Use the lowest force from the defined 0.5 kN input grid that meets all constraints.
        const feasible = [];
        for (let f = level.input.min; f <= level.input.max + 1e-9; f += level.input.step) {
          const r = P.braking({ ...c, commandedBrakeN: f * 1000 });
          if (!r.wheelsLocked && r.stoppingDistanceM <= c.safetyLineM + 1e-9) feasible.push({ f, r });
        }
        if (!feasible.length) throw new Error('Aucun freinage sûr sur la grille de réglage');
        const chosen = feasible[0]; value = chosen.f; const r = chosen.r;
        steps = [`F_adh,max = μₛmg = ${n(c.staticFrictionCoefficient)} × ${n(c.massKg)} kg × ${n(c.gravityMps2)} m/s² = ${n(r.maximumAdhesionN)} N.`, `À ${n(value)} kN : |a| = (F_f + F_r)/m = (${n(value * 1000)} + ${n(c.rollingResistanceN)}) N / ${n(c.massKg)} kg = ${n(r.decelerationMps2)} m/s².`, `d_r = v₀t_r = ${n(c.initialSpeedMps)} m/s × ${n(c.reactionTimeS)} s = ${n(r.reactionDistanceM)} m.`, `d_f = v₀²/(2|a|) = ${n(r.brakingDistanceM)} m ; d_arrêt = ${n(r.stoppingDistanceM)} m.`];
        decision = `À ${n(value)} kN : arrêt avant ${n(c.safetyLineM)} m, roues non bloquées. Une force plus élevée n'est pas nécessairement meilleure.`;
        break;
      }
      case 'hydro': {
        const min = P.hydraulic({ diameterMm: c.diameterMm, pressureBar: 0, efficiency: c.efficiency, loadN: c.loadN }).requiredPressureBar;
        // Next tenth strictly above the theoretical minimum: rounding alone is NOT lifting.
        value = (Math.floor(min * 10 + 1e-9) + 1) / 10;
        const r = P.hydraulicTrial({ ...c, pressureBar: value, durationS: c.trialDurationS, timeS: c.trialDurationS });
        steps = [`S = πD²/4 = π × (${n(c.diameterMm / 1000)} m)²/4 = ${n(r.areaM2, 8)} m².`, `p_min = F/(ηS) = ${n(c.loadN)} N / (${n(c.efficiency)} × ${n(r.areaM2, 8)} m²) = ${n(min, 4)} bar.`, `Réglage supérieur au minimum : ${n(value)} bar → F_utile = ${n(r.availableForceN)} N (charge ${n(c.loadN)} N).`, `Débit utile = ${n(c.flowLpm * c.volumetricEfficiency)} L/min ; vitesse = ${n(r.speedMps * 1000)} mm/s.`];
        decision = r.canLift && value <= min * (1 + c.allowedExcessFraction) ? 'Levage possible sans surpression et sans marge excessive.' : 'Réglage non conforme : revoir les limites physiques.';
        break;
      }
      default: throw new Error('Type de niveau inconnu');
    }
    return { value, unit: level.input.unit, steps, decision };
  }
  const mastery = Object.freeze({
    'gear-01': Object.freeze({ n1Rpm: 840, z1: 24, torqueNm: 8, efficiency: 0.9, targetRpm: 280, minimumTorqueNm: 21, toleranceRpm: 0.000001 }),
    'moment-01': Object.freeze({ loadN: 360, leftArmM: 1.5, counterweightN: 300, toleranceNm: 12, inertiaKgM2: 1500, trialDurationS: 4 })
  });
  const api = Object.freeze({ ready, stars, solve, mastery });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SICoaching = api;
})(typeof window === 'undefined' ? globalThis : window);
