'use strict';
/**
 * SI QUEST V2.5 — audit structurel persistant des 50 missions 410–459.
 * Contrôles du catalogue, des données et de l'accessibilité HTML de base.
 * Ne vaut ni contre-calcul scientifique des 50 lois ni recette physique.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const inventory=[
 [
  "simply-supported-beam-stiffness-01",
  "SI-04"
 ],
 [
  "dc-motor-start-resistor-01",
  "SI-08"
 ],
 [
  "counterweight-limit-load-01",
  "SI-03"
 ],
 [
  "pump-affinity-shaft-power-01",
  "SI-10"
 ],
 [
  "sampling-nyquist-rate-01",
  "SI-09"
 ],
 [
  "pump-affinity-head-01",
  "SI-10"
 ],
 [
  "cylindrical-insulation-heat-flow-01",
  "SI-12"
 ],
 [
  "adc-minimum-bits-01",
  "SI-09"
 ],
 [
  "euler-pinned-column-load-01",
  "SI-04"
 ],
 [
  "hydraulic-local-loss-coefficient-01",
  "SI-06"
 ],
 [
  "metrology-welch-effective-dof-01",
  "SI-13"
 ],
 [
  "hydraulic-pump-shaft-torque-01",
  "SI-06"
 ],
 [
  "helical-gear-opposed-thrust-01",
  "SI-05"
 ],
 [
  "hydraulic-laminar-critical-flow-01",
  "SI-06"
 ],
 [
  "thermal-contact-heat-power-01",
  "SI-12"
 ],
 [
  "process-capability-cp-01",
  "SI-13"
 ],
 [
  "second-order-damping-from-overshoot-01",
  "SI-09"
 ],
 [
  "cantilever-uniform-load-tip-deflection-01",
  "SI-04"
 ],
 [
  "acoustic-normal-reflection-01",
  "SI-07"
 ],
 [
  "ntc-beta-temperature-01",
  "SI-13"
 ],
 [
  "cantilever-tip-slope-01",
  "SI-04"
 ],
 [
  "rectangular-typeb-uncertainty-01",
  "SI-13"
 ],
 [
  "semi-infinite-contact-temperature-01",
  "SI-12"
 ],
 [
  "circular-shaft-bending-stress-01",
  "SI-04"
 ],
 [
  "first-order-lowpass-gain-01",
  "SI-09"
 ],
 [
  "weibull-component-reliability-01",
  "SI-15"
 ],
 [
  "belt-effective-tension-01",
  "SI-05"
 ],
 [
  "dc-parallel-current-divider-01",
  "SI-08"
 ],
 [
  "exchanger-ntu-equal-capacity-01",
  "SI-12"
 ],
 [
  "sabine-room-reverberation-01",
  "SI-13"
 ],
 [
  "can-classic-frame-busload-01",
  "SI-17"
 ],
 [
  "maintenance-mtbf-operating-hours-01",
  "SI-15"
 ],
 [
  "rlc-series-quality-factor-01",
  "SI-08"
 ],
 [
  "exchanger-ntu-zero-capacity-ratio-01",
  "SI-12"
 ],
 [
  "slider-crank-position-01",
  "SI-01"
 ],
 [
  "acoustic-time-leq-01",
  "SI-13"
 ],
 [
  "resistor-johnson-noise-01",
  "SI-08"
 ],
 [
  "radiation-net-power-01",
  "SI-12"
 ],
 [
  "rc-series-phase-angle-01",
  "SI-08"
 ],
 [
  "welding-linear-energy-01",
  "SI-14"
 ],
 [
  "dc-motor-back-emf-01",
  "SI-08"
 ],
 [
  "repeatability-sample-std-01",
  "SI-13"
 ],
 [
  "maintenance-mttr-four-jobs-01",
  "SI-15"
 ],
 [
  "proportional-loop-static-error-01",
  "SI-09"
 ],
 [
  "thinwall-bredt-shear-01",
  "SI-04"
 ],
 [
  "threephase-power-factor-pq-01",
  "SI-08"
 ],
 [
  "cylinder-critical-insulation-radius-01",
  "SI-12"
 ],
 [
  "metrology-worstcase-stack-01",
  "SI-13"
 ],
 [
  "hydraulic-filter-captured-mass-01",
  "SI-15"
 ],
 [
  "transformer-load-voltage-01",
  "SI-08"
 ]
];
test('inventaire 410–459 : 50 identifiants uniques et catalogue stable',()=>{
 assert.equal(inventory.length,50);
 assert.equal(new Set(inventory.map(row=>row[0])).size,50);
 assert.ok(catalog.levels.length>=597);
});
for(const [id,world] of inventory){
 test('structure, domaine, SI et accès HTML : '+id,()=>{
  const mission=catalog.byId(id);
  assert.ok(mission,id+' : mission absente');
  assert.equal(mission.world,world,id+' : univers catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',mission.url),'utf8');
  assert.match(html,/<html[^>]*lang=["']fr["']/i,id+' : langue française absente');
  assert.match(html,/class=["']skip["']/i,id+' : lien évitement absent');
  const marker='window.SI_MISSION=';
  assert.ok(html.includes(marker),id+' : données de mission absentes');
  const cfg=JSON.parse(html.split(marker)[1].split('</script>')[0]);
  assert.equal(cfg.id,id,id+' : identifiant HTML');
  assert.equal(cfg.world,world,id+' : univers HTML');
  for(const key of ['expected','min','max','initial'])
   assert.ok(Number.isFinite(cfg[key]),id+' : '+key+' non fini');
  assert.ok(cfg.min<cfg.max,id+' : domaine vide');
  assert.ok(cfg.min<=cfg.initial&&cfg.initial<=cfg.max,id+' : initial hors bornes');
  for(const key of ['unit','inputUnit','formula','context','objective','prerequisites'])
   assert.ok(typeof cfg[key]==='string'&&cfg[key].trim().length>0,
    id+' : '+key+' absent');
 });
}
