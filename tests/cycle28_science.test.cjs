'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../src/physics.js');
const C = require('../src/catalog.js');
const Coach = require('../src/coaching.js');
const near = (a,b,t=1e-8) => assert.ok(Math.abs(a-b)<=t, String(a)+' differs from '+String(b));

test('12 independent authored levels, 17 universes, no fake levels', () => {
  assert.equal(C.levels.length,12);
  assert.equal(C.worlds.length,17);
  assert.equal(C.targets.levels,996);
  assert.equal(C.targets.subskills,249);
  assert.equal(new Set(C.levels.map(x=>x.id)).size,12);
  assert.equal(new Set(C.levels.map(x=>x.type)).size,12);
  assert.equal(new Set(C.levels.map(x=>x.world)).size,10);
});

test('Hydraulic hose: SI units, laminar Reynolds and Darcy factor', () => {
  const c=C.byId('hose-01').config;
  const r=P.hoseLoss({...c,diameterMm:16});
  const d=.016,Q=35/60000,v=4*Q/(Math.PI*d*d);
  near(r.velocityMps,v);
  near(r.reynolds,c.densityKgM3*v*d/c.dynamicViscosityPaS);
  assert.ok(r.reynolds<2300);
  near(r.frictionFactor,64/r.reynolds);
  near(r.distributedLossPa,128*c.dynamicViscosityPaS*c.lengthM*Q/(Math.PI*d**4),1e-6);
  near(r.totalPressureDropPa,r.distributedLossPa+r.minorLossPa);
  near(r.dissipatedPowerW,r.totalPressureDropPa*Q);
});

test('Hydraulic hose: failed options, feasible option and invalid inputs', () => {
  const c=C.byId('hose-01').config;
  const run=d=>P.hoseLoss({...c,diameterMm:d});
  assert.ok(run(12).velocityMps>c.maxVelocityMps);
  assert.ok(run(8).pressureDropBar>c.maxPressureDropBar);
  assert.ok(run(16).velocityMps<c.maxVelocityMps&&run(16).pressureDropBar<c.maxPressureDropBar);
  assert.ok(c.options.find(x=>x.diameterMm===16).costEuro<=c.maxBudgetEuro);
  assert.ok(c.options.find(x=>x.diameterMm===20).costEuro>c.maxBudgetEuro);
  assert.throws(()=>run(0),RangeError);
  assert.throws(()=>P.hoseLoss({...c,diameterMm:16,dynamicViscosityPaS:0}),RangeError);
});

test('Hydraulic hose: friction factor finite in transition and turbulence', () => {
  const c=C.byId('hose-01').config;
  for(const mu of [.03,.01,.005,.001]) {
    const r=P.hoseLoss({...c,diameterMm:12,dynamicViscosityPaS:mu});
    assert.ok(Number.isFinite(r.frictionFactor)&&r.frictionFactor>0);
    assert.ok(Number.isFinite(r.pressureDropBar)&&r.pressureDropBar>0);
  }
});

test('Solid shaft: polar second moment, shear stress, twist and mass', () => {
  const c=C.byId('torsion-01').config;
  const r=P.solidShaftTorsion({...c,diameterMm:35});
  const d=.035;
  near(r.polarSecondMomentM4,Math.PI*d**4/32,1e-18);
  near(r.maxShearStressPa,16*c.torqueNm/(Math.PI*d**3),1e-6);
  near(r.twistRad,c.torqueNm*c.lengthM/(c.shearModulusPa*r.polarSecondMomentM4));
  near(r.massKg,c.densityKgM3*Math.PI*d*d*c.lengthM/4);
  assert.ok(r.maxShearStressMPa<70&&r.twistDeg<2&&r.massKg<10);
});

test('Solid shaft: rigidities scale with d^4 and mass with d^2', () => {
  const c=C.byId('torsion-01').config;
  const run=d=>P.solidShaftTorsion({...c,diameterMm:d});
  near(run(40).twistRad/run(35).twistRad,(35/40)**4);
  near(run(40).massKg/run(35).massKg,(40/35)**2);
  assert.ok(run(30).twistDeg>2);
  assert.ok(run(45).massKg>10);
  assert.throws(()=>run(-1),RangeError);
});

for(const id of ['hose-01','torsion-01']) {
  test('Guided solution uses physical engine: '+id, () => {
    const l=C.byId(id),s=Coach.solve(l,P);
    assert.ok(s.steps.length>=4);
    assert.ok(s.decision.length>25);
    assert.equal(s.value,id==='hose-01'?16:35);
  });
}
