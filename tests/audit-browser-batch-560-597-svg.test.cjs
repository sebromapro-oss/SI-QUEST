'use strict';
/** Vérification structurelle des schémas SVG pour le lot 560–597.
 * N'établit pas la fidélité physique ou l'accessibilité sur appareil réel. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const historicalPhysics=require('../src/investigations.js');
const historicalDiagrams=require('../src/investigation-diagrams.js');
const ids=["voltage-divider-sensor-01","wheel-braking-slip-01","laminar-darcy-factor-01","triangle-actuator-angle-01","stokes-sphere-drag-01","parallel-load-resultant-position-01","floating-cylinder-draft-01","quarter-bridge-strain-from-voltage-01","hydrostatic-rectangular-gate-force-01","flywheel-kinetic-energy-01","liquid-acoustic-impedance-01","capillary-meniscus-pressure-01","magnetic-core-reluctance-01","battery-peukert-runtime-01","zener-series-resistor-current-01","bearing-outer-race-bpfo-01","hydraulic-oil-elastic-energy-01","clutch-synchronization-heat-01","mutual-inductance-emf-01","three-phase-current-thd-01","bearing-cage-ftf-01","vibrating-string-fundamental-01","pneumatic-critical-pressure-ratio-01","thin-wall-cylinder-hoop-01","tapered-rod-axial-extension-01","pt100-self-heating-error-01","ballscrew-lifting-torque-01","elastic-pipe-pressure-wave-speed-01","transformer-load-voltage-drop-01","rectangular-plate-polar-mass-inertia-01","combined-axial-bending-stress-01","timer-pwm-fast-frequency-01","spur-gear-transverse-contact-ratio-01","magnetic-gap-maxwell-force-01","gray-code-4bit-decode-01","two-layer-wall-heat-rate-01","loop-4-20ma-burden-limit-01","vickers-indent-pressure-01"];
test('38 schémas du dernier lot : inventaire unique',()=>{
 assert.equal(ids.length,38);
 assert.equal(new Set(ids).size,38);
});
for(const id of ids){
 test('SVG accessible et fini aux bornes : '+id,()=>{
  const m=catalog.byId(id);assert.ok(m);
  const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  const batch=html.split('src="').map(s=>s.split('"')[0])
   .filter(s=>s.startsWith('../src/batch')).at(-1)?.split('/').at(-1);
  const mod=batch?require('../src/'+batch):null;
  const physics=mod?mod.physics:historicalPhysics;
  const diagrams=mod?mod.diagrams:historicalDiagrams;
  assert.ok(typeof diagrams.render==='function',id+' : moteur graphique absent');
  for(const x of [cfg.min,cfg.initial,cfg.max]){
   const y=physics.calculate(id,x),svg=diagrams.render(id,x,y);
   assert.ok(typeof svg==='string'&&svg.includes('<svg'),id+' : SVG manquant');
   assert.ok(svg.includes('role="img"'),id+' : rôle graphique absent');
   assert.ok(svg.includes('<title'),id+' : titre SVG absent');
   assert.ok(svg.includes('<desc'),id+' : description SVG absente');
   assert.ok(svg.length>250,id+' : représentation vide');
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/,id+' : géométrie non finie');
  }
 });
}
