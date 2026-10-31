'use strict';
/** Audit 510–559 : HTML, domaine, calcul nominal et neuf contre-calculs
 * indépendants. Le moteur comparé à lui-même ne prouve pas sa justesse. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const engine=require('../src/investigations.js');
const inventory=[
 [
  "exchanger-effectiveness-01",
  "SI-12"
 ],
 [
  "rotation-01",
  "SI-01"
 ],
 [
  "torque-01",
  "SI-03"
 ],
 [
  "pressure-01",
  "SI-06"
 ],
 [
  "flow-01",
  "SI-06"
 ],
 [
  "ohm-01",
  "SI-08"
 ],
 [
  "energy-01",
  "SI-10"
 ],
 [
  "accuracy-01",
  "SI-13"
 ],
 [
  "impulse-01",
  "SI-02"
 ],
 [
  "gear-eff-01",
  "SI-05"
 ],
 [
  "capacitor-01",
  "SI-08"
 ],
 [
  "hydro-speed-01",
  "SI-06"
 ],
 [
  "frequency-period-01",
  "SI-09"
 ],
 [
  "circular-02",
  "SI-01"
 ],
 [
  "angular-accel-01",
  "SI-01"
 ],
 [
  "incline-force-01",
  "SI-03"
 ],
 [
  "resultant-01",
  "SI-03"
 ],
 [
  "torsion-01",
  "SI-04"
 ],
 [
  "belt-speed-01",
  "SI-05"
 ],
 [
  "hydro-power-01",
  "SI-06"
 ],
 [
  "joule-heat-01",
  "SI-08"
 ],
 [
  "sampling-01",
  "SI-09"
 ],
 [
  "efficiency-chain-01",
  "SI-10"
 ],
 [
  "rolling-load-01",
  "SI-11"
 ],
 [
  "heat-transfer-01",
  "SI-12"
 ],
 [
  "moment-arm-02",
  "SI-02"
 ],
 [
  "spring-stiffness-01",
  "SI-04"
 ],
 [
  "beam-stress-02",
  "SI-04"
 ],
 [
  "pneumatic-consumption-01",
  "SI-07"
 ],
 [
  "electrical-parallel-01",
  "SI-08"
 ],
 [
  "rolling-torque-01",
  "SI-11"
 ],
 [
  "dc-voltage-drop-01",
  "SI-08"
 ],
 [
  "wheatstone-bridge-01",
  "SI-08"
 ],
 [
  "hydro-motor-torque-01",
  "SI-06"
 ],
 [
  "rotation-energy-01",
  "SI-02"
 ],
 [
  "rectangular-tube-inertia-01",
  "SI-04"
 ],
 [
  "sensor-4-20ma-01",
  "SI-13"
 ],
 [
  "capstan-tension-01",
  "SI-11"
 ],
 [
  "convective-heat-flux-01",
  "SI-12"
 ],
 [
  "screw-efficiency-01",
  "SI-05"
 ],
 [
  "beam-center-deflection-01",
  "SI-04"
 ],
 [
  "reactive-three-phase-01",
  "SI-08"
 ],
 [
  "rl-step-current-01",
  "SI-09"
 ],
 [
  "hydraulic-reynolds-01",
  "SI-06"
 ],
 [
  "battery-autonomy-01",
  "SI-10"
 ],
 [
  "rc-charge-threshold-01",
  "SI-09"
 ],
 [
  "thermal-clearance-01",
  "SI-12"
 ],
 [
  "cylinder-stroke-time-01",
  "SI-06"
 ],
 [
  "gas-isothermal-work-01",
  "SI-07"
 ],
 [
  "symmetric-sling-tension-01",
  "SI-03"
 ]
];
test('inventaire 510–559 : 50 missions uniques et 597 au catalogue',()=>{
 assert.equal(inventory.length,50);
 assert.equal(new Set(inventory.map(([id])=>id)).size,50);
 assert.equal(catalog.levels.length,597);
});
for(const [id,world] of inventory){
 test('structure et bornes 510–559 : '+id,()=>{
  const mission=catalog.byId(id);
  assert.ok(mission,id+' absent du catalogue');
  assert.equal(mission.world,world);
  const html=fs.readFileSync(path.join(__dirname,'..',mission.url),'utf8');
  assert.match(html,/<html[^>]*lang=["']fr["']/i);
  assert.match(html,/class=["']skip["']/i);
  assert.match(html,/src\/investigation-mission\.js/);
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);assert.equal(cfg.world,world);
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  assert.ok(Number.isFinite(cfg.expected));
  for(const key of ['unit','inputUnit','formula','context'])
   assert.ok(typeof cfg[key]==='string'&&cfg[key].trim(),id+' : '+key);
  // Les anciennes pages insèrent les objectifs et prérequis par le contrôleur.
  assert.equal(cfg.unit,engine.criteria[id].unit,id+' : unité résultat');
  assert.equal(cfg.inputUnit,engine.inputUnits[id],id+' : unité paramètre');
  const actual=engine.calculate(id,cfg.initial);
  assert.ok(Number.isFinite(actual));
  assert.ok(Math.abs(actual-cfg.expected)<=1e-8*Math.max(1,Math.abs(cfg.expected)),
   id+' : moteur et valeur HTML divergent');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.max])
   assert.ok(Number.isFinite(engine.calculate(id,x)),id+' : calcul non fini '+x);
  assert.throws(()=>engine.calculate(id,NaN),RangeError);
  assert.throws(()=>engine.calculate(id,Infinity),RangeError);
 });
}
// Les coefficients de ces neuf références proviennent des énoncés physiques
// (grandeurs fixées) et non des fonctions du moteur de production.
const references=[
 ['exchanger-effectiveness-01',x=>x/(2*(80-20)),'sans unité','kW'],
 ['rotation-01',x=>2*Math.PI*x/60,'rad/s','tr/min'],
 ['torque-01',x=>.40*x,'N·m','N'],
 ['pressure-01',x=>x/(.005*100000),'bar','N'],
 ['flow-01',x=>18*60/x,'L/min','s'],
 ['ohm-01',x=>12/x,'A','Ω'],
 ['energy-01',x=>240*x,'Wh','h'],
 ['impulse-01',x=>800*x,'N·s','s'],
 ['gear-eff-01',x=>15*x,'kW','sans unité']
];
for(const [id,formula,unit,inputUnit] of references){
 test('contre-calcul indépendant 510–559 : '+id,()=>{
  const mission=catalog.byId(id);
  const html=fs.readFileSync(path.join(__dirname,'..',mission.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.unit,unit);assert.equal(cfg.inputUnit,inputUnit);
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   const expected=formula(x),actual=engine.calculate(id,x);
   assert.ok(Number.isFinite(expected)&&Number.isFinite(actual),id+' : non fini');
   assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
    id+' : '+x+' '+inputUnit+' -> '+actual+' / '+expected+' '+unit);
  }
  assert.ok(Math.abs(cfg.expected-formula(cfg.initial))<=2e-8*Math.max(1,Math.abs(cfg.expected)),
   id+' : corrigé nominal non conforme');
 });
}
test('invariants et limites de neuf lois indépendantes',()=>{
 assert.equal(references.length,9);
 assert.ok(engine.calculate('rotation-01',1200)>engine.calculate('rotation-01',600));
 assert.ok(engine.calculate('flow-01',90)<engine.calculate('flow-01',10));
 assert.ok(engine.calculate('ohm-01',24)<engine.calculate('ohm-01',2));
 assert.equal(engine.calculate('impulse-01',0),0);
 assert.equal(engine.calculate('energy-01',0),0);
 assert.throws(()=>engine.calculate('flow-01',0),RangeError);
 assert.throws(()=>engine.calculate('ohm-01',0),RangeError);
 assert.throws(()=>engine.calculate('gear-eff-01',-1),RangeError);
});
