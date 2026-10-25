'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const engine=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[
 ['hose-pressure-drop-01',2,128*.06*5*(2/60000)/(Math.PI*.012**4)/1e5,.5,6,'bar','L/min'],
 ['dc-voltage-drop-01',15,2*.0175*8*15/2.5,1,25,'V','A']
];
for(const [id,x,reference,min,max,unit,inputUnit] of cases){
 test(id+' : contre-calcul indépendant, unités, domaine et SVG',()=>{
  assert.ok(catalog.byId(id),'mission au catalogue');
  const html=fs.readFileSync(path.resolve(__dirname,'../missions',id+'.html'),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.unit,unit);assert.equal(cfg.inputUnit,inputUnit);
  assert.ok(Math.abs(engine.calculate(id,x)-reference)<1e-10);
  assert.ok(Math.abs(engine.calculate(id,min)-reference*min/x)<1e-9);
  assert.ok(Math.abs(engine.calculate(id,max)-reference*max/x)<1e-9);
  for(const v of [min,x,max]){const svg=diagrams.render(id,v,engine.calculate(id,v));assert.match(svg,/<svg/);assert.ok(svg.includes(unit));assert.ok(svg.includes(inputUnit));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
  assert.throws(()=>engine.calculate(id,-1),RangeError);
  assert.equal(engine.criteria[id].unit,unit);
  assert.ok(engine.answerPolicy[id].solution.length>100);
 });
}
test('perte de charge : Reynolds laminaire sur le domaine',()=>{
 for(const Q of [.5,2,6]){const Re=4*850*(Q/60000)/(Math.PI*.06*.012);assert.ok(Re<2300);}
});
test('faisceau : bilan des tensions et résistance aller-retour',()=>{
 const R=2*.0175*8/2.5;assert.ok(Math.abs(R-.112)<1e-12);
 const dU=engine.calculate('dc-voltage-drop-01',15);
 assert.ok(Math.abs(12-dU-10.32)<1e-12);
});
test('catalogue : 77 missions distinctes',()=>{
 assert.equal(catalog.levels.length,77);
 assert.equal(new Set(catalog.levels.map(x=>x.id)).size,77);
});
