'use strict';
/** SI QUEST : audit 460–509. Contrôle HTML + cohérence moteur, pas réception scientifique indépendante. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const inventory=[
 [
  "pneumatic-receiver-fill-time-01",
  "SI-07"
 ],
 [
  "half-power-damping-ratio-01",
  "SI-09"
 ],
 [
  "fillet-weld-double-shear-01",
  "SI-04"
 ],
 [
  "parallel-plate-capacitance-01",
  "SI-08"
 ],
 [
  "isotropic-volume-expansion-01",
  "SI-12"
 ],
 [
  "sensor-temperature-drift-01",
  "SI-13"
 ],
 [
  "belt-centrifugal-tension-01",
  "SI-05"
 ],
 [
  "shaft-key-bearing-pressure-01",
  "SI-04"
 ],
 [
  "square-screw-lead-angle-01",
  "SI-05"
 ],
 [
  "straight-fin-efficiency-01",
  "SI-12"
 ],
 [
  "brake-pad-sector-pressure-01",
  "SI-11"
 ],
 [
  "three-phase-voltage-unbalance-01",
  "SI-08"
 ],
 [
  "vibration-base-transmissibility-01",
  "SI-09"
 ],
 [
  "thick-cylinder-hoop-stress-01",
  "SI-04"
 ],
 [
  "dc-bus-discharge-time-01",
  "SI-16"
 ],
 [
  "regenerative-braking-energy-01",
  "SI-17"
 ],
 [
  "hydraulic-local-loss-01",
  "SI-06"
 ],
 [
  "shaft-torsional-shear-stress-01",
  "SI-04"
 ],
 [
  "dry-air-ideal-density-01",
  "SI-07"
 ],
 [
  "beam-uniform-load-deflection-01",
  "SI-04"
 ],
 [
  "hydraulic-fluid-stiffness-01",
  "SI-06"
 ],
 [
  "biot-number-plate-01",
  "SI-12"
 ],
 [
  "rotor-centripetal-acceleration-01",
  "SI-01"
 ],
 [
  "parallel-thermal-bridges-01",
  "SI-12"
 ],
 [
  "sampling-alias-frequency-01",
  "SI-09"
 ],
 [
  "safety-proof-test-pfd-01",
  "SI-16"
 ],
 [
  "inductor-reactance-frequency-01",
  "SI-08"
 ],
 [
  "coolant-thermal-power-01",
  "SI-12"
 ],
 [
  "brake-disc-adiabatic-rise-01",
  "SI-10"
 ],
 [
  "water-mixing-temperature-01",
  "SI-12"
 ],
 [
  "pump-volumetric-efficiency-01",
  "SI-06"
 ],
 [
  "braking-distance-friction-01",
  "SI-02"
 ],
 [
  "heat-exchanger-lmtd-01",
  "SI-12"
 ],
 [
  "acoustic-distance-loss-01",
  "SI-13"
 ],
 [
  "water-hammer-joukowsky-01",
  "SI-06"
 ],
 [
  "thermal-contact-resistance-01",
  "SI-12"
 ],
 [
  "noise-level-addition-01",
  "SI-13"
 ],
 [
  "poiseuille-microtube-flow-01",
  "SI-06"
 ],
 [
  "fracture-critical-crack-01",
  "SI-14"
 ],
 [
  "helical-gear-axial-force-01",
  "SI-05"
 ],
 [
  "oil-kinematic-viscosity-01",
  "SI-14"
 ],
 [
  "miner-fatigue-damage-01",
  "SI-14"
 ],
 [
  "rc-lowpass-cutoff-01",
  "SI-09"
 ],
 [
  "cantilever-strain-energy-01",
  "SI-04"
 ],
 [
  "gas-polytropic-temperature-01",
  "SI-07"
 ],
 [
  "hydraulic-cavitation-number-01",
  "SI-06"
 ],
 [
  "bolt-preload-torque-01",
  "SI-15"
 ],
 [
  "rectangular-beam-shear-01",
  "SI-04"
 ],
 [
  "goodman-fatigue-factor-01",
  "SI-14"
 ],
 [
  "log-decrement-01",
  "SI-09"
 ]
];
test('inventaire 460–509 : 50 identifiants uniques, 597 missions',()=>{
 assert.equal(inventory.length,50);
 assert.equal(new Set(inventory.map(x=>x[0])).size,50);
 assert.equal(catalog.levels.length,597);
});
for(const [id,world] of inventory){
 test('structure, domaine et cohérence moteur : '+id,()=>{
  const m=catalog.byId(id);
  assert.ok(m,id+' : catalogue');
  assert.equal(m.world,world);
  const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
  assert.match(html,/<html[^>]*lang=["']fr["']/i);
  assert.match(html,/class=["']skip["']/i);
  const marker='window.SI_MISSION=';
  assert.ok(html.includes(marker),id+' : configuration absente');
  const cfg=JSON.parse(html.split(marker)[1].split('</script>')[0]);
  assert.equal(cfg.id,id);assert.equal(cfg.world,world);
  for(const key of ['expected','min','max','initial'])
   assert.ok(Number.isFinite(cfg[key]),id+' : '+key);
  assert.ok(cfg.min<cfg.max&&cfg.initial>=cfg.min&&cfg.initial<=cfg.max,id+' : domaine');
  for(const key of ['unit','inputUnit','formula','context','objective','prerequisites'])
   assert.ok(typeof cfg[key]==='string'&&cfg[key].trim(),id+' : '+key);
  const scripts=[...html.matchAll(/<script[^>]+src=["']\.\.\/src\/(batch[0-9-]+\.js)["']/g)];
  assert.ok(scripts.length,id+' : moteur de lot introuvable');
  const engine=require(path.join(__dirname,'..','src',scripts.at(-1)[1])).physics;
  assert.ok(engine&&typeof engine.calculate==='function',id+' : moteur absent');
  const nominal=engine.calculate(id,cfg.initial);
  assert.ok(Number.isFinite(nominal),id+' : résultat non fini');
  assert.ok(Math.abs(nominal-cfg.expected)<=1e-8*Math.max(1,Math.abs(cfg.expected)),
   id+' : HTML/moteur divergent ('+cfg.expected+' / '+nominal+')');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.max])
   assert.ok(Number.isFinite(engine.calculate(id,x)),id+' : domaine non fini '+x);
 });
}
