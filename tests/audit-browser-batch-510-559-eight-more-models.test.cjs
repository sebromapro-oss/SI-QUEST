'use strict';
/** Huit lois complémentaires du lot 510–559 : contre-calculs indépendants
 * aux bornes, au milieu et au nominal. Pas de réception graphique. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const engine=require('../src/investigations.js');
const references=[
 ['capacitor-01',x=>4700e-6*x,'C','V'],
 ['hydro-speed-01',x=>(x/60000)/.004,'m/s','L/min'],
 ['frequency-period-01',x=>1/x,'s','Hz'],
 ['angular-accel-01',x=>120/x,'rad/s²','s'],
 ['incline-force-01',x=>600*9.81*Math.sin(x*Math.PI/180),'N','°'],
 ['joule-heat-01',x=>4*x*x,'W','A'],
 ['efficiency-chain-01',x=>.92*x,'sans unité','sans unité'],
 ['rolling-load-01',x=>8000*x,'N','sans unité']
];
for(const [id,reference,unit,inputUnit] of references){
 test('contre-calcul complémentaire 510–559 : '+id,()=>{
  const m=catalog.byId(id);assert.ok(m);
  const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.unit,unit);assert.equal(cfg.inputUnit,inputUnit);
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   const actual=engine.calculate(id,x),expected=reference(x);
   assert.ok(Number.isFinite(actual)&&Number.isFinite(expected));
   assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
    id+' : '+x+' '+inputUnit+' → '+actual+' / '+expected+' '+unit);
  }
  assert.ok(Math.abs(cfg.expected-reference(cfg.initial))<=2e-8*Math.max(1,Math.abs(cfg.expected)));
  assert.throws(()=>engine.calculate(id,NaN),RangeError);
 });
}
test('invariants physiques complémentaires 510–559',()=>{
 assert.equal(references.length,8);
 assert.equal(engine.calculate('capacitor-01',0),0);
 assert.equal(engine.calculate('hydro-speed-01',0),0);
 assert.equal(engine.calculate('incline-force-01',0),0);
 assert.equal(engine.calculate('joule-heat-01',0),0);
 assert.ok(engine.calculate('frequency-period-01',5)>engine.calculate('frequency-period-01',100));
 assert.ok(engine.calculate('angular-accel-01',1)>engine.calculate('angular-accel-01',20));
 assert.ok(engine.calculate('rolling-load-01',.05)>engine.calculate('rolling-load-01',.025));
 assert.throws(()=>engine.calculate('frequency-period-01',0),RangeError);
 assert.throws(()=>engine.calculate('angular-accel-01',0),RangeError);
});
