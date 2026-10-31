'use strict';
/** SI QUEST V2.5 : dernier lot 560–597, 38 missions, contrôles structurels
 * et douze contre-calculs physiques indépendants. La recette navigateur
 * et les essais physiques restent des preuves distinctes. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const historic=require('../src/investigations.js');
const inventory=[["voltage-divider-sensor-01","SI-08"],["wheel-braking-slip-01","SI-01"],["laminar-darcy-factor-01","SI-06"],["triangle-actuator-angle-01","SI-01"],["stokes-sphere-drag-01","SI-11"],["parallel-load-resultant-position-01","SI-03"],["floating-cylinder-draft-01","SI-02"],["quarter-bridge-strain-from-voltage-01","SI-13"],["hydrostatic-rectangular-gate-force-01","SI-06"],["flywheel-kinetic-energy-01","SI-02"],["liquid-acoustic-impedance-01","SI-13"],["capillary-meniscus-pressure-01","SI-06"],["magnetic-core-reluctance-01","SI-08"],["battery-peukert-runtime-01","SI-15"],["zener-series-resistor-current-01","SI-08"],["bearing-outer-race-bpfo-01","SI-15"],["hydraulic-oil-elastic-energy-01","SI-06"],["clutch-synchronization-heat-01","SI-05"],["mutual-inductance-emf-01","SI-08"],["three-phase-current-thd-01","SI-08"],["bearing-cage-ftf-01","SI-15"],["vibrating-string-fundamental-01","SI-02"],["pneumatic-critical-pressure-ratio-01","SI-07"],["thin-wall-cylinder-hoop-01","SI-04"],["tapered-rod-axial-extension-01","SI-04"],["pt100-self-heating-error-01","SI-13"],["ballscrew-lifting-torque-01","SI-05"],["elastic-pipe-pressure-wave-speed-01","SI-06"],["transformer-load-voltage-drop-01","SI-08"],["rectangular-plate-polar-mass-inertia-01","SI-02"],["combined-axial-bending-stress-01","SI-04"],["timer-pwm-fast-frequency-01","SI-09"],["spur-gear-transverse-contact-ratio-01","SI-05"],["magnetic-gap-maxwell-force-01","SI-08"],["gray-code-4bit-decode-01","SI-09"],["two-layer-wall-heat-rate-01","SI-12"],["loop-4-20ma-burden-limit-01","SI-08"],["vickers-indent-pressure-01","SI-14"]];
const references=[
 ["voltage-divider-sensor-01",x=>5*x/(2.2+x),"V","kΩ"],
 ["wheel-braking-slip-01",x=>(5-0.4*x)/5*100,"%","rad/s"],
 ["stokes-sphere-drag-01",x=>6*Math.PI*1*0.002*(x/1000)*1000,"mN","mm/s"],
 ["flywheel-kinetic-energy-01",x=>(2*Math.PI*x/60)**2/1000,"kJ","tr/min"],
 ["magnetic-core-reluctance-01",x=>x/(4*Math.PI*1e-7*1800*4e-4)/1000,"kA/Wb","m"],
 ["zener-series-resistor-current-01",x=>(x-5.1)/330*1000,"mA","V"],
 ["hydraulic-oil-elastic-energy-01",x=>0.002*(x*1e5)**2/(2*1.5e9),"J","bar"],
 ["thin-wall-cylinder-hoop-01",x=>x*100/(2*2),"MPa","MPa"],
 ["timer-pwm-fast-frequency-01",x=>16e6/(64*(x+1)),"Hz","comptes"],
 ["gray-code-4bit-decode-01",x=>{let b=0;for(let g=x;g;g>>=1)b^=g;return b},"comptes","comptes"],
 ["two-layer-wall-heat-rate-01",x=>30/(0.12/(0.8*2)+(x/1000)/(0.04*2)),"W","mm"],
 ["vickers-indent-pressure-01",x=>2*196.2*Math.sin(68*Math.PI/180)/(x*x),"MPa","mm"]
];
function load(id){
 const m=catalog.byId(id);
 assert.ok(m,id+' : absent du catalogue');
 const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
 const marker='window.SI_MISSION=';
 assert.ok(html.includes(marker),id+' : configuration manquante');
 const cfg=JSON.parse(html.split(marker)[1].split('</script>')[0]);
 const scripts=html.split('src="').map(s=>s.split('"')[0]);
 const batch=scripts.filter(s=>s.startsWith('../src/batch')).at(-1)?.split('/').at(-1);
 const engine=batch?require('../src/'+batch).physics:historic;
 assert.ok(engine&&typeof engine.calculate==='function',id+' : moteur absent');
 return {m,html,cfg,engine};
}
test('inventaire du dernier lot : 38 missions uniques sur 597 et 17 univers',()=>{
 assert.equal(catalog.levels.length,597);
 assert.equal(catalog.worlds.length,17);
 assert.equal(inventory.length,38);
 assert.equal(new Set(inventory.map(([id])=>id)).size,38);
 assert.equal(new Set(catalog.levels.map(m=>m.id)).size,597);
});
for(const [id,world] of inventory){
 test('structure, unités, bornes et nominal : '+id,()=>{
  const {m,html,cfg,engine}=load(id);
  assert.equal(m.world,world);assert.equal(cfg.world,world);assert.equal(cfg.id,id);
  assert.match(html,/<html[^>]*lang=["']fr["']/i);
  assert.match(html,/class=["']skip["']/i);
  assert.match(html,/<strong>Objectif[^<]*:/i);
  assert.match(html,/<strong>Prérequis[^<]*:/i);
  for(const k of ['unit','inputUnit','formula','context'])
   assert.ok(typeof cfg[k]==='string'&&cfg[k].trim(),id+' : '+k);
  for(const k of ['min','max','initial','expected'])
   assert.ok(Number.isFinite(cfg[k]),id+' : '+k+' non fini');
  assert.ok(cfg.min<cfg.max&&cfg.initial>=cfg.min&&cfg.initial<=cfg.max,id+' : domaine');
  const nominal=engine.calculate(id,cfg.initial);
  assert.ok(Number.isFinite(nominal),id+' : calcul nominal non fini');
  assert.ok(Math.abs(nominal-cfg.expected)<=2e-8*Math.max(1,Math.abs(cfg.expected)),id+' : divergence HTML/moteur');
  const samples=[cfg.min,cfg.initial,cfg.max];
  if(Number.isFinite(cfg.inputStep)&&cfg.inputStep>0&&cfg.min+cfg.inputStep<cfg.max)
   samples.push(cfg.min+cfg.inputStep);
  for(const x of samples)assert.ok(Number.isFinite(engine.calculate(id,x)),id+' : borne invalide '+x);
  assert.throws(()=>engine.calculate(id,NaN),RangeError,id+' : NaN accepté');
  assert.throws(()=>engine.calculate(id,Infinity),RangeError,id+' : infini accepté');
 });
}
for(const [id,reference,unit,inputUnit] of references){
 test('contre-calcul indépendant et contrôle dimensionnel : '+id,()=>{
  const {cfg,engine}=load(id);
  assert.equal(cfg.unit,unit);assert.equal(cfg.inputUnit,inputUnit);
  const samples=[cfg.min,cfg.initial,cfg.max];
  if(Number.isFinite(cfg.inputStep)&&cfg.inputStep>0&&cfg.min+cfg.inputStep<cfg.max)
   samples.push(cfg.min+cfg.inputStep);
  else if(!Number.isFinite(cfg.inputStep))samples.push((cfg.min+cfg.max)/2);
  for(const x of samples){
   const ref=reference(x),actual=engine.calculate(id,x);
   assert.ok(Number.isFinite(ref)&&Number.isFinite(actual),id+' : valeur non finie');
   assert.ok(Math.abs(actual-ref)<=2e-8*Math.max(1,Math.abs(ref)),
    id+' : '+x+' '+inputUnit+' -> moteur='+actual+', référence='+ref+' '+unit);
  }
  assert.ok(Math.abs(cfg.expected-reference(cfg.initial))<=2e-8*Math.max(1,Math.abs(cfg.expected)),id+' : nominal indépendant');
 });
}
