'use strict';
/** Huit contre-calculs indépendants 460–509. Hypothèses issues des énoncés.
 * Ne démontre pas la justesse des 42 autres lois ni la fidélité des animations. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const {physics,diagrams}=require('../src/batch253-257.js');
const cases=[
 ['pneumatic-receiver-fill-time-01',p=>.100*((p+1)-(6+1))/(1*.0020),'s','bar manométrique'],
 ['half-power-damping-ratio-01',df=>df/(2*40),'sans unité','Hz'],
 ['fillet-weld-double-shear-01',f=>f*1000/(2*80*(6/Math.sqrt(2))),'MPa','kN'],
 ['parallel-plate-capacitance-01',d=>8.8541878128e-12*3*.020/(d*1e-3)*1e9,'nF','mm'],
 ['isotropic-volume-expansion-01',dt=>3*23e-6*2000*dt,'mL','K'],
 ['sensor-temperature-drift-01',dt=>12*120e-6*dt*1000,'mV','K'],
 ['belt-centrifugal-tension-01',v=>.50*v*v,'N','m/s'],
 ['shaft-key-bearing-pressure-01',T=>(2*T/.040)/((.008/2)*.040)/1e6,'MPa','N·m']
];
function near(a,b,label){
 assert.ok(Number.isFinite(a)&&Number.isFinite(b),label+' : non fini');
 assert.ok(Math.abs(a-b)<=2e-8*Math.max(1,Math.abs(b)),label+' : '+a+' / '+b);
}
for(const [id,reference,unit,inputUnit] of cases){
 test('référence indépendante 460–509 : '+id,()=>{
  const m=catalog.byId(id);assert.ok(m,id+' absent');
  const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);assert.equal(cfg.unit,unit);assert.equal(cfg.inputUnit,inputUnit);
  assert.equal(physics.criteria[id].unit,unit);assert.equal(physics.inputUnits[id],inputUnit);
  near(cfg.expected,reference(cfg.initial),id+' : nominal HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   const y=physics.calculate(id,x);
   near(y,reference(x),id+' : '+x+' '+inputUnit);
   const svg=diagrams.render(id,x,y);
   assert.match(svg,/<svg\b/);assert.match(svg,/<title\b/);assert.match(svg,/<desc\b/);
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/,id+' : SVG non fini');
  }
  for(const bad of [NaN,Infinity,-Infinity,null,'1',cfg.min-1,cfg.max+1])
   assert.throws(()=>physics.calculate(id,bad),RangeError,id+' : entrée interdite');
 });
}
test('inventaire des huit références, limites et invariants',()=>{
 assert.equal(cases.length,8);assert.equal(new Set(cases.map(c=>c[0])).size,8);
 assert.equal(catalog.levels.length,597);
 assert.equal(physics.calculate('pneumatic-receiver-fill-time-01',6),0);
 assert.equal(physics.calculate('belt-centrifugal-tension-01',0),0);
 assert.ok(physics.calculate('parallel-plate-capacitance-01',.5)>
  physics.calculate('parallel-plate-capacitance-01',5));
 assert.ok(physics.calculate('shaft-key-bearing-pressure-01',320)>
  physics.calculate('shaft-key-bearing-pressure-01',160));
});
