'use strict';
// SI QUEST — Cycle 28: independent engineering invariants.
// Run: node --test tests/cycle28_engineering_invariants.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const { hoseLoss, solidShaftTorsion } = require('../src/physics.js');
const close = (actual, expected, tolerance = 1e-10) =>
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)),
    `expected ${actual} ≈ ${expected}`);

const hose = {
  flowLpm: 40, diameterMm: 12, lengthM: 5, densityKgM3: 870,
  dynamicViscosityPaS: 0.035, roughnessMm: 0.02, minorLossCoefficient: 2
};
const shaft = {
  torqueNm: 500, diameterMm: 40, lengthM: 1.2,
  shearModulusPa: 80e9, densityKgM3: 7850
};

test('hydraulic hose: Q = vA and pressure loss power = Δp Q', () => {
  const x = hoseLoss(hose);
  close(x.velocityMps * x.areaM2, x.flowM3PerS);
  close(x.totalPressureDropPa, x.distributedLossPa + x.minorLossPa);
  close(x.dissipatedPowerW, x.totalPressureDropPa * x.flowM3PerS);
  close(x.pressureDropBar * 1e5, x.totalPressureDropPa);
});
test('hydraulic hose: doubling length doubles distributed loss only', () => {
  const a = hoseLoss(hose), b = hoseLoss({ ...hose, lengthM: 2 * hose.lengthM });
  close(b.distributedLossPa, 2 * a.distributedLossPa);
  close(b.minorLossPa, a.minorLossPa);
});
test('hydraulic hose: increasing singular loss increases total pressure drop', () => {
  const a = hoseLoss(hose);
  const b = hoseLoss({ ...hose, minorLossCoefficient: hose.minorLossCoefficient + 3 });
  assert.ok(b.totalPressureDropPa > a.totalPressureDropPa);
  close(b.distributedLossPa, a.distributedLossPa);
});
test('hydraulic hose: invalid diameters and viscosity rejected', () => {
  assert.throws(() => hoseLoss({ ...hose, diameterMm: 0 }), RangeError);
  assert.throws(() => hoseLoss({ ...hose, dynamicViscosityPaS: 0 }), RangeError);
  assert.throws(() => hoseLoss({ ...hose, roughnessMm: -1 }), RangeError);
});
test('torsion: polar second moment J = πd⁴/32 and mass = ρAL', () => {
  const x = solidShaftTorsion(shaft), d = shaft.diameterMm / 1000;
  close(x.polarSecondMomentM4, Math.PI * d ** 4 / 32);
  close(x.massKg, shaft.densityKgM3 * Math.PI * d ** 2 / 4 * shaft.lengthM);
  close(x.maxShearStressMPa * 1e6, x.maxShearStressPa);
  close(x.twistDeg * Math.PI / 180, x.twistRad);
});
test('torsion: double torque doubles shear stress and twist, not mass', () => {
  const a = solidShaftTorsion(shaft), b = solidShaftTorsion({ ...shaft, torqueNm: 2 * shaft.torqueNm });
  close(b.maxShearStressPa, 2 * a.maxShearStressPa);
  close(b.twistRad, 2 * a.twistRad);
  close(b.massKg, a.massKg);
});
test('torsion: doubling diameter reduces stress 8x, twist 16x and increases mass 4x', () => {
  const a = solidShaftTorsion(shaft), b = solidShaftTorsion({ ...shaft, diameterMm: 2 * shaft.diameterMm });
  close(b.maxShearStressPa, a.maxShearStressPa / 8);
  close(b.twistRad, a.twistRad / 16);
  close(b.massKg, a.massKg * 4);
});
test('torsion: doubling length doubles twist and mass, not stress', () => {
  const a = solidShaftTorsion(shaft), b = solidShaftTorsion({ ...shaft, lengthM: 2 * shaft.lengthM });
  close(b.twistRad, 2 * a.twistRad);
  close(b.massKg, 2 * a.massKg);
  close(b.maxShearStressPa, a.maxShearStressPa);
});
test('torsion: invalid input is rejected', () => {
  assert.throws(() => solidShaftTorsion({ ...shaft, shearModulusPa: 0 }), RangeError);
  assert.throws(() => solidShaftTorsion({ ...shaft, diameterMm: -1 }), RangeError);
});
