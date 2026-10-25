/* SI QUEST: scientific core. SI units inside all functions. No DOM dependencies. */
(function (root) {
  'use strict';
  function finitePositive(value, label) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError(label + ' must be > 0');
  }
  function gear({ n1Rpm, z1, z2, torqueNm, efficiency }) {
    [n1Rpm, z1, z2, torqueNm, efficiency].forEach((v, i) => finitePositive(v, ['n1Rpm', 'z1', 'z2', 'torqueNm', 'efficiency'][i]));
    if (!Number.isInteger(z1) || !Number.isInteger(z2)) throw new RangeError('Teeth counts must be integers');
    if (efficiency > 1) throw new RangeError('Efficiency cannot exceed 1');
    const omega1 = n1Rpm * 2 * Math.PI / 60; // rad/s
    const omega2 = -omega1 * z1 / z2; // external gears: opposite directions
    const inputPowerW = torqueNm * omega1;
    const outputPowerW = efficiency * inputPowerW;
    const outputTorqueNm = outputPowerW / Math.abs(omega2); // available torque magnitude
    return { n2Rpm: omega2 * 60 / (2 * Math.PI), omega1, omega2, ratio: z2 / z1, outputTorqueNm, inputPowerW, outputPowerW };
  }
  function rover({ massKg, rollingResistanceN, tractionN, initialSpeedMps, durationS }) {
    [massKg, durationS].forEach((v, i) => finitePositive(v, ['massKg', 'durationS'][i]));
    if (![rollingResistanceN, tractionN, initialSpeedMps].every(Number.isFinite)) throw new RangeError('Non-finite rover input');
    if (rollingResistanceN < 0 || tractionN < 0 || initialSpeedMps < 0) throw new RangeError('Negative rover input');
    // Static resistance adapts to traction up to the stated threshold. No spontaneous reverse travel.
    const stationary = initialSpeedMps === 0 && tractionN <= rollingResistanceN;
    const effectiveResistanceN = stationary ? tractionN : rollingResistanceN;
    const netForceN = tractionN - effectiveResistanceN;
    const accelerationMps2 = netForceN / massKg;
    const stopTimeS = stationary ? 0 : accelerationMps2 < 0
      ? Math.min(durationS, initialSpeedMps / -accelerationMps2) : durationS;
    const distanceM = initialSpeedMps * stopTimeS + 0.5 * accelerationMps2 * stopTimeS * stopTimeS;
    const finalSpeedMps = Math.max(0, initialSpeedMps + accelerationMps2 * stopTimeS);
    return { accelerationMps2, finalSpeedMps, distanceM, stopTimeS, netForceN,
      effectiveResistanceN, stationary, stoppedBeforeEnd: !stationary && stopTimeS < durationS };
  }
  function moments({ loadN, leftArmM, counterweightN, rightArmM }) {
    [loadN, leftArmM, counterweightN, rightArmM].forEach((v, i) => finitePositive(v, ['loadN', 'leftArmM', 'counterweightN', 'rightArmM'][i]));
    const counterclockwiseNm = loadN * leftArmM;
    const clockwiseNm = counterweightN * rightArmM;
    return { counterclockwiseNm, clockwiseNm, netMomentNm: counterclockwiseNm - clockwiseNm, supportReactionN: loadN + counterweightN };
  }
  function hydraulic({ diameterMm, pressureBar, efficiency, loadN }) {
    [diameterMm, efficiency, loadN].forEach((v, i) => finitePositive(v, ['diameterMm', 'efficiency', 'loadN'][i]));
    if (!Number.isFinite(pressureBar) || pressureBar < 0) throw new RangeError('Pressure must be nonnegative');
    if (efficiency > 1) throw new RangeError('Efficiency cannot exceed 1');
    const diameterM = diameterMm / 1000;
    const areaM2 = Math.PI * diameterM * diameterM / 4;
    const pressurePa = pressureBar * 100000;
    const idealForceN = pressurePa * areaM2;
    const availableForceN = efficiency * idealForceN;
    const requiredPressureBar = loadN / (efficiency * areaM2) / 100000;
    return { areaM2, pressurePa, idealForceN, availableForceN, requiredPressureBar, forceMarginN: availableForceN - loadN };
  }
  // Quasi-static cylinder model: constant commanded pressure and constant flow after valve opens.
  // Does not model pressure transients, oil compressibility, leakage or load inertia.
  function hydraulicTrial({ diameterMm, pressureBar, efficiency, loadN, flowLpm,
    volumetricEfficiency, strokeM, durationS, valveDelayS = 0, maxPressureBar, timeS }) {
    const h = hydraulic({ diameterMm, pressureBar, efficiency, loadN });
    [flowLpm, volumetricEfficiency, strokeM, durationS, maxPressureBar].forEach((v, i) =>
      finitePositive(v, ['flowLpm','volumetricEfficiency','strokeM','durationS','maxPressureBar'][i]));
    if (volumetricEfficiency > 1 || !Number.isFinite(valveDelayS) || valveDelayS < 0 ||
        !Number.isFinite(timeS) || timeS < 0 || timeS > durationS) throw new RangeError('Invalid trial parameters');
    const safetyLocked = pressureBar > maxPressureBar;
    const canLift = h.availableForceN >= loadN && !safetyLocked;
    const speedMps = canLift ? flowLpm / 60000 * volumetricEfficiency / h.areaM2 : 0;
    const movingTimeS = Math.max(0, Math.min(timeS, durationS) - valveDelayS);
    const displacementM = Math.min(strokeM, speedMps * movingTimeS);
    return { ...h, safetyLocked, canLift, speedMps, displacementM,
      completedStroke: displacementM >= strokeM - 1e-10 };
  }
  // Constant-inertia illustrative beam dynamics with angle-dependent gravity moment.
  // Rigid beam, fixed pivot, no damping, stops limited to ±15°; not a structural model.
  function beamTrial({ loadN, leftArmM, counterweightN, rightArmM, inertiaKgM2,
    durationS, timeS }) {
    const statics = moments({ loadN, leftArmM, counterweightN, rightArmM });
    [inertiaKgM2, durationS].forEach((v,i)=>finitePositive(v,['inertiaKgM2','durationS'][i]));
    if (!Number.isFinite(timeS) || timeS < 0 || timeS > durationS) throw new RangeError('Invalid time');
    const maxAngleRad = Math.PI / 12;
    const dt = timeS / 240;
    let theta = 0, omega = 0;
    for (let i = 0; i < 240; i++) {
      const a0 = statics.netMomentNm * Math.cos(theta) / inertiaKgM2;
      const midOmega = omega + a0 * dt / 2;
      const midTheta = theta + omega * dt / 2;
      const aMid = statics.netMomentNm * Math.cos(midTheta) / inertiaKgM2;
      theta += midOmega * dt;
      omega += aMid * dt;
      if (Math.abs(theta) >= maxAngleRad) {
        theta = Math.sign(theta) * maxAngleRad; omega = 0; break;
      }
    }
    return { ...statics, angleRad: theta, angularSpeedRadS: omega, stopReached: Math.abs(theta) >= maxAngleRad - 1e-10 };
  }
  // Low-voltage starter supply, constant current for a 4 s diagnostic test.
  // L is total electrical copper path (outbound + return), not one-way length.
  // rho is copper resistivity at 20 °C in ohm·mm²/m; no temperature rise,
  // battery internal resistance or starter current/torque characteristic.
  function starterCable({ batteryVoltageV, currentA, totalCopperLengthM,
    crossSectionMm2, copperResistivityOhmMm2PerM, contactResistanceOhm,
    copperDensityKgM3, minimumStarterVoltageV }) {
    [batteryVoltageV, currentA, totalCopperLengthM, crossSectionMm2,
      copperResistivityOhmMm2PerM, copperDensityKgM3, minimumStarterVoltageV]
      .forEach((v, i) => finitePositive(v, ['batteryVoltageV','currentA','totalCopperLengthM',
        'crossSectionMm2','copperResistivityOhmMm2PerM','copperDensityKgM3',
        'minimumStarterVoltageV'][i]));
    if (!Number.isFinite(contactResistanceOhm) || contactResistanceOhm < 0 ||
        minimumStarterVoltageV > batteryVoltageV) throw new RangeError('Invalid starter parameters');
    const copperResistanceOhm = copperResistivityOhmMm2PerM * totalCopperLengthM / crossSectionMm2;
    const totalResistanceOhm = copperResistanceOhm + contactResistanceOhm;
    const voltageDropV = currentA * totalResistanceOhm;
    const starterVoltageV = batteryVoltageV - voltageDropV;
    const copperLossW = currentA ** 2 * copperResistanceOhm;
    const contactLossW = currentA ** 2 * contactResistanceOhm;
    const totalLossW = copperLossW + contactLossW;
    const copperMassKg = copperDensityKgM3 * totalCopperLengthM * crossSectionMm2 * 1e-6;
    return { copperResistanceOhm, totalResistanceOhm, voltageDropV, starterVoltageV,
      copperLossW, contactLossW, totalLossW, copperMassKg,
      canCrank: starterVoltageV >= minimumStarterVoltageV };
  }
  // Linear axial spring in quasi-static compression against a rigid mechanical stop.
  // F = k*x, with 1 N/mm = 1000 N/m; at the stop the remaining load is borne by the stop.
  // No damping, spring mass, buckling, preload, fatigue or impact dynamics.
  function springStop({ loadN, stiffnessNPerMm, maxStrokeMm }) {
    finitePositive(stiffnessNPerMm, 'stiffnessNPerMm');
    finitePositive(maxStrokeMm, 'maxStrokeMm');
    if (!Number.isFinite(loadN) || loadN < 0) throw new RangeError('loadN must be >= 0');
    const stiffnessNPerM = stiffnessNPerMm * 1000;
    const maxStrokeM = maxStrokeMm / 1000;
    const freeCompressionM = loadN / stiffnessNPerM;
    const compressionM = Math.min(freeCompressionM, maxStrokeM);
    const springForceN = stiffnessNPerM * compressionM;
    const stopReactionN = Math.max(0, loadN - springForceN);
    const elasticEnergyJ = 0.5 * stiffnessNPerM * compressionM ** 2;
    return { stiffnessNPerM, maxStrokeM, freeCompressionM, compressionM, springForceN,
      stopReactionN, elasticEnergyJ, stopEngaged: stopReactionN > 1e-9 };
  }
  // Simplified longitudinal braking of a vehicle on level ground, with no ABS.
  // During driver reaction, the engine is assumed to balance rolling resistance,
  // so speed remains constant. During braking, rolling resistance adds to braking.
  // Exceeding static tire-road adhesion locks the wheels: kinetic/sliding friction
  // replaces the commanded brake force. Constant coefficients, no load transfer,
  // tire relaxation, slope, aerodynamic drag, or brake thermal dynamics.
  function braking({ massKg, initialSpeedMps, reactionTimeS, rollingResistanceN,
    commandedBrakeN, staticFrictionCoefficient, slidingFrictionCoefficient, gravityMps2 }) {
    finitePositive(massKg, 'massKg'); finitePositive(initialSpeedMps, 'initialSpeedMps');
    finitePositive(gravityMps2, 'gravityMps2');
    for (const [v, label] of [[reactionTimeS, 'reactionTimeS'], [rollingResistanceN, 'rollingResistanceN'],
      [commandedBrakeN, 'commandedBrakeN'], [staticFrictionCoefficient, 'staticFrictionCoefficient'],
      [slidingFrictionCoefficient, 'slidingFrictionCoefficient']]) {
      if (!Number.isFinite(v) || v < 0) throw new RangeError(label + ' must be >= 0');
    }
    if (slidingFrictionCoefficient > staticFrictionCoefficient || staticFrictionCoefficient > 1)
      throw new RangeError('Invalid tire-road friction coefficients');
    const maximumAdhesionN = staticFrictionCoefficient * massKg * gravityMps2;
    const wheelsLocked = commandedBrakeN > maximumAdhesionN + 1e-9;
    const effectiveBrakeN = wheelsLocked ? slidingFrictionCoefficient * massKg * gravityMps2 : commandedBrakeN;
    const totalRetardingForceN = effectiveBrakeN + rollingResistanceN;
    if (totalRetardingForceN <= 0) throw new RangeError('No retarding force: no finite stopping distance');
    const decelerationMps2 = totalRetardingForceN / massKg;
    const reactionDistanceM = initialSpeedMps * reactionTimeS;
    const brakingTimeS = initialSpeedMps / decelerationMps2;
    const brakingDistanceM = initialSpeedMps ** 2 / (2 * decelerationMps2);
    const stoppingDistanceM = reactionDistanceM + brakingDistanceM;
    return { maximumAdhesionN, wheelsLocked, effectiveBrakeN, totalRetardingForceN,
      decelerationMps2, reactionDistanceM, brakingTimeS, brakingDistanceM,
      stoppingDistanceM, totalTimeS: reactionTimeS + brakingTimeS };
  }
  // Analytic position/speed: no numerical integration drift, no reverse motion.
  function brakingAtTime(config) {
    const { timeS, ...params } = config;
    if (!Number.isFinite(timeS) || timeS < 0) throw new RangeError('Invalid braking time');
    const r = braking(params);
    if (timeS <= params.reactionTimeS) return { ...r, distanceM: params.initialSpeedMps * timeS,
      speedMps: params.initialSpeedMps, phase: 'reaction' };
    const u = Math.min(timeS - params.reactionTimeS, r.brakingTimeS);
    return { ...r, distanceM: r.reactionDistanceM + params.initialSpeedMps * u -
      0.5 * r.decelerationMps2 * u ** 2,
      speedMps: Math.max(0, params.initialSpeedMps - r.decelerationMps2 * u),
      phase: timeS >= r.totalTimeS ? 'stopped' : r.wheelsLocked ? 'sliding' : 'braking' };
  }

  // Single-acting pneumatic cylinder, quasistatic pressure/force balance.
  // A constant-pressure source and constant volumetric flow are assumed; no
  // compressibility, pressure dynamics, seal stiction or impact is modeled.
  function pneumaticCylinder({ diameterMm, pressureBar, efficiency, loadN, preloadN,
    stiffnessNPerM, strokeM, flowLpm, maxPressureBar, timeS = Infinity }) {
    for (const [v, name] of [[diameterMm,'diameterMm'],[efficiency,'efficiency'],
      [stiffnessNPerM,'stiffnessNPerM'],[strokeM,'strokeM'],[flowLpm,'flowLpm'],
      [maxPressureBar,'maxPressureBar']]) finitePositive(v,name);
    for (const [v, name] of [[pressureBar,'pressureBar'],[loadN,'loadN'],[preloadN,'preloadN']])
      if (!Number.isFinite(v) || v < 0) throw new RangeError(name + ' must be >= 0');
    if (efficiency > 1 || !(timeS >= 0)) throw new RangeError('Invalid pneumatic configuration');
    const areaM2 = Math.PI * (diameterMm / 1000) ** 2 / 4;
    const availableForceN = efficiency * pressureBar * 1e5 * areaM2;
    const requiredPressureBar = (loadN + preloadN + stiffnessNPerM * strokeM) / (efficiency * areaM2 * 1e5);
    const safetyLocked = pressureBar > maxPressureBar;
    const equilibriumM = safetyLocked ? 0 : Math.min(strokeM, Math.max(0,
      (availableForceN - loadN - preloadN) / stiffnessNPerM));
    const speedMps = flowLpm / 60000 / areaM2;
    const displacementM = Math.min(equilibriumM, speedMps * timeS);
    const springForceN = preloadN + stiffnessNPerM * displacementM;
    const forceMarginAtEndN = availableForceN - loadN - preloadN - stiffnessNPerM * strokeM;
    return { areaM2, availableForceN, requiredPressureBar, safetyLocked, equilibriumM,
      speedMps, displacementM, springForceN, forceMarginAtEndN,
      fullStroke: equilibriumM >= strokeM - 1e-10 };
  }
  // Steady-state heat balance across the coolant circuit, plus an explicitly
  // illustrative first-order outlet temperature transient at fixed flow.
  // No thermostat, phase change, engine map or radiator UA is modeled.
  function coolingLoop({ heatInputW, flowLpm, densityKgM3, heatCapacityJPerKgK,
    inletTemperatureC, pressureDropPa, pumpEfficiency, timeConstantS, timeS = Infinity }) {
    for (const [v, name] of [[heatInputW,'heatInputW'],[flowLpm,'flowLpm'],
      [densityKgM3,'densityKgM3'],[heatCapacityJPerKgK,'heatCapacityJPerKgK'],
      [pressureDropPa,'pressureDropPa'],[pumpEfficiency,'pumpEfficiency'],
      [timeConstantS,'timeConstantS']]) finitePositive(v,name);
    if (pumpEfficiency > 1 || !Number.isFinite(inletTemperatureC) || !(timeS >= 0))
      throw new RangeError('Invalid cooling configuration');
    const flowM3PerS = flowLpm / 60000;
    const massFlowKgPerS = densityKgM3 * flowM3PerS;
    const temperatureRiseK = heatInputW / (massFlowKgPerS * heatCapacityJPerKgK);
    const outletSteadyC = inletTemperatureC + temperatureRiseK;
    const pumpPowerW = pressureDropPa * flowM3PerS / pumpEfficiency;
    const outletAtTimeC = inletTemperatureC + temperatureRiseK * (1 - Math.exp(-timeS / timeConstantS));
    return { flowM3PerS, massFlowKgPerS, temperatureRiseK, outletSteadyC,
      pumpPowerW, outletAtTimeC };
  }
  // Simplified GUM type-B rectangular resolution component plus a known
  // independent type-A repeatability standard deviation. Coverage factor k=2
  // is a declared pedagogical approximation, not a guarantee of 95% coverage.
  function guardedMeasurement({ measuredMm, lowerLimitMm, upperLimitMm,
    resolutionMm, repeatabilityStdMm, coverageFactor = 2 }) {
    for (const [v,name] of [[resolutionMm,'resolutionMm'],[coverageFactor,'coverageFactor']]) finitePositive(v,name);
    for (const [v,name] of [[measuredMm,'measuredMm'],[lowerLimitMm,'lowerLimitMm'],
      [upperLimitMm,'upperLimitMm'],[repeatabilityStdMm,'repeatabilityStdMm']])
      if (!Number.isFinite(v) || (name === 'repeatabilityStdMm' && v < 0)) throw new RangeError('Invalid ' + name);
    if (upperLimitMm <= lowerLimitMm) throw new RangeError('Tolerance limits inverted');
    const resolutionStdMm = resolutionMm / Math.sqrt(12);
    const combinedStdMm = Math.hypot(repeatabilityStdMm, resolutionStdMm);
    const expandedUncertaintyMm = coverageFactor * combinedStdMm;
    const intervalLowerMm = measuredMm - expandedUncertaintyMm;
    const intervalUpperMm = measuredMm + expandedUncertaintyMm;
    const accepted = intervalLowerMm >= lowerLimitMm - 1e-12 &&
      intervalUpperMm <= upperLimitMm + 1e-12;
    return { resolutionStdMm, combinedStdMm, expandedUncertaintyMm,
      intervalLowerMm, intervalUpperMm, accepted };
  }
  // Steady single-phase Darcy–Weisbach model. The transition interpolation is
  // an educational approximation, not a guarantee of friction factor accuracy.
  function hoseLoss({ flowLpm, diameterMm, lengthM, densityKgM3, dynamicViscosityPaS,
    roughnessMm, minorLossCoefficient }) {
    const named = { flowLpm, diameterMm, lengthM, densityKgM3, dynamicViscosityPaS };
    for (const [key, value] of Object.entries(named)) finitePositive(value, key);
    if (!Number.isFinite(roughnessMm) || roughnessMm < 0 ||
      !Number.isFinite(minorLossCoefficient) || minorLossCoefficient < 0)
      throw new RangeError('Invalid hose parameters');
    const diameterM = diameterMm / 1000, areaM2 = Math.PI * diameterM ** 2 / 4;
    const flowM3PerS = flowLpm / 60000, velocityMps = flowM3PerS / areaM2;
    const reynolds = densityKgM3 * velocityMps * diameterM / dynamicViscosityPaS;
    const laminar = 64 / reynolds;
    const turbulent = 0.25 / Math.log10(roughnessMm / 1000 / (3.7 * diameterM) + 5.74 / reynolds ** 0.9) ** 2;
    const frictionFactor = reynolds <= 2300 ? laminar : reynolds >= 4000 ? turbulent :
      laminar * (4000 - reynolds) / 1700 + turbulent * (reynolds - 2300) / 1700;
    const distributedLossPa = frictionFactor * lengthM / diameterM * densityKgM3 * velocityMps ** 2 / 2;
    const minorLossPa = minorLossCoefficient * densityKgM3 * velocityMps ** 2 / 2;
    const totalPressureDropPa = distributedLossPa + minorLossPa;
    return { diameterM, areaM2, flowM3PerS, velocityMps, reynolds, frictionFactor,
      distributedLossPa, minorLossPa, totalPressureDropPa,
      pressureDropBar: totalPressureDropPa / 100000, dissipatedPowerW: totalPressureDropPa * flowM3PerS };
  }
  // Saint-Venant torsion for an isotropic solid circular shaft, elastic regime.
  function solidShaftTorsion({ torqueNm, diameterMm, lengthM, shearModulusPa, densityKgM3 }) {
    const named = { torqueNm, diameterMm, lengthM, shearModulusPa, densityKgM3 };
    for (const [key, value] of Object.entries(named)) finitePositive(value, key);
    const diameterM = diameterMm / 1000;
    const polarSecondMomentM4 = Math.PI * diameterM ** 4 / 32;
    const maxShearStressPa = torqueNm * diameterM / (2 * polarSecondMomentM4);
    const twistRad = torqueNm * lengthM / (shearModulusPa * polarSecondMomentM4);
    const massKg = densityKgM3 * Math.PI * diameterM ** 2 / 4 * lengthM;
    return { diameterM, polarSecondMomentM4, maxShearStressPa, maxShearStressMPa: maxShearStressPa / 1e6,
      twistRad, twistDeg: twistRad * 180 / Math.PI, massKg };
  }
  const api = Object.freeze({ gear, rover, moments, hydraulic, hydraulicTrial, beamTrial, starterCable, springStop, braking, brakingAtTime, pneumaticCylinder, coolingLoop, guardedMeasurement, hoseLoss, solidShaftTorsion });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SIPhysics = api;
})(typeof window === 'undefined' ? globalThis : window);
