'use strict';
/**
 * SI QUEST V2.5 — huit lois du lot 410–459 contre-calculées depuis les
 * équations physiques (pas depuis les sorties du moteur de production).
 * Hypothèses nominales extraites des énoncés des missions.
 * N'atteste pas la fidélité des animations ni une réception RGAA physique.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const {physics,diagrams}=require('../src/batch488-492.js');
const cases=[
 ['simply-supported-beam-stiffness-01',L=>48*210e9*8e-6/Math.pow(L,3)/1e6,'kN/mm','m'],
 ['pump-affinity-shaft-power-01',n=>5*Math.pow(n/1500,3),'kW','tr/min'],
 ['sampling-nyquist-rate-01',f=>2*1.25*f,'Hz','Hz'],
 ['pump-affinity-head-01',n=>20*Math.pow(n/1200,2),'m','tr/min'],
 ['adc-minimum-bits-01',eps=>Math.ceil(Math.log2(10/(2*eps*1e-3))),'bits','mV'],
 ['euler-pinned-column-load-01',L=>Math.PI**2*210e9*(Math.PI*.04**4/64)/L**2/1000,'kN','m'],
 ['process-capability-cp-01',sigma=>.2/(6*sigma),'sans unité','mm'],
 ['dc-motor-back-emf-01',I=>48-.4*I,'V','A']
];
function near(actual,expected,label){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),label+' : non fini');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
  label+' : obtenu '+actual+' ; référence '+expected);
}
for(const [id,reference,unit,inputUnit] of cases){
 test('contre-calcul SI 410–459 : '+id,()=>{
  const mission=catalog.byId(id);assert.ok(mission,id+' absent du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',mission.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit,id+' : unité sortie HTML');
  assert.equal(cfg.inputUnit,inputUnit,id+' : unité entrée HTML');
  assert.equal(physics.criteria[id].unit,unit,id+' : unité sortie moteur');
  assert.equal(physics.inputUnits[id],inputUnit,id+' : unité entrée moteur');
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : valeur nominale HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   const actual=physics.calculate(id,x);
   near(actual,reference(x),id+' : '+x+' '+inputUnit);
   const svg=diagrams.render(id,x,actual);
   assert.match(svg,/<svg\\b/,id+' : SVG absent');
   assert.match(svg,/<title\\b/,id+' : titre SVG absent');
   assert.match(svg,/<desc\\b/,id+' : description SVG absente');
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/,id+' : SVG non fini');
  }
  for(const bad of [NaN,Infinity,-Infinity,null,'1',cfg.min-1,cfg.max+1])
   assert.throws(()=>physics.calculate(id,bad),RangeError,id+' : entrée hors domaine');
 });
}
test('inventaire, invariants et contrôles limites du lot 410–459',()=>{
 assert.equal(cases.length,8);
 assert.equal(new Set(cases.map(c=>c[0])).size,8);
 assert.equal(catalog.levels.length,597);
 assert.ok(physics.calculate('simply-supported-beam-stiffness-01',2)>
  physics.calculate('simply-supported-beam-stiffness-01',5));
 assert.ok(physics.calculate('pump-affinity-shaft-power-01',1500)>
  physics.calculate('pump-affinity-shaft-power-01',900));
 assert.ok(physics.calculate('pump-affinity-head-01',1500)>
  physics.calculate('pump-affinity-head-01',900));
 assert.ok(physics.calculate('euler-pinned-column-load-01',1.5)>
  physics.calculate('euler-pinned-column-load-01',3));
 assert.ok(physics.calculate('process-capability-cp-01',.02)>
  physics.calculate('process-capability-cp-01',.05));
 assert.ok(Number.isInteger(physics.calculate('adc-minimum-bits-01',2)));
});
