'use strict';
/** Huit contre-calculs supplémentaires du lot 460–509, distincts du moteur
 * et du fichier des huit premiers modèles. Vérification SI sur quatre points.
 * Ne constitue pas une recette de fidélité des animations ni une validation RGAA. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const {physics,diagrams}=require('../src/batch213-217.js');
const cases=[
 ['dc-bus-discharge-time-01',R=>R*1000*470e-6*Math.log(600/60),'s','kΩ'],
 ['inductor-reactance-frequency-01',f=>2*Math.PI*f*.080,'Ω','Hz'],
 ['coolant-thermal-power-01',Q=>998*(Q/60000)*4180*6/1000,'kW','L/min'],
 ['rotor-centripetal-acceleration-01',n=>.18*Math.pow(2*Math.PI*n/60,2),'m/s²','tr/min'],
 ['water-mixing-temperature-01',mc=>(8*70+mc*20)/(8+mc),'°C','kg'],
 ['pump-volumetric-efficiency-01',Q=>100*Q/(.025*1500),'%','L/min'],
 ['braking-distance-friction-01',v=>Math.pow(v/3.6,2)/(2*.60*9.81),'m','km/h'],
 ['hydraulic-local-loss-01',zeta=>zeta*998*Math.pow((30/60000)/(Math.PI*.020**2/4),2)/(2*1e5),'bar','sans unité']
];
function near(actual,expected,id){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),id+' : valeur non finie');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
  id+' : moteur '+actual+' ; référence '+expected);
}
for(const [id,reference,unit,inputUnit] of cases){
 test('contre-calcul indépendant complémentaire 460–509 : '+id,()=>{
  const m=catalog.byId(id);assert.ok(m,id+' absent');
  const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);assert.equal(cfg.unit,unit);assert.equal(cfg.inputUnit,inputUnit);
  assert.equal(physics.criteria[id].unit,unit);assert.equal(physics.inputUnits[id],inputUnit);
  near(cfg.expected,reference(cfg.initial),id+' nominal HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   const result=physics.calculate(id,x);
   near(result,reference(x),id+' '+x+' '+inputUnit);
   const svg=diagrams.render(id,x,result);
   assert.match(svg,/<svg\b/,id+' : SVG absent');
   assert.match(svg,/<title\b/,id+' : titre absent');
   assert.match(svg,/<desc\b/,id+' : description absente');
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/,id+' : SVG non fini');
  }
  for(const invalid of [NaN,Infinity,-Infinity,null,'1',cfg.min-1,cfg.max+1])
   assert.throws(()=>physics.calculate(id,invalid),RangeError,id+' : hors domaine');
 });
}
test('invariants des huit modèles complémentaires',()=>{
 assert.equal(cases.length,8);assert.equal(new Set(cases.map(x=>x[0])).size,8);
 assert.ok(catalog.levels.length>=597);
 assert.equal(physics.calculate('inductor-reactance-frequency-01',0),0);
 assert.equal(physics.calculate('rotor-centripetal-acceleration-01',0),0);
 assert.equal(physics.calculate('braking-distance-friction-01',0),0);
 assert.ok(physics.calculate('dc-bus-discharge-time-01',100)>
  physics.calculate('dc-bus-discharge-time-01',10));
 assert.ok(physics.calculate('water-mixing-temperature-01',20)<
  physics.calculate('water-mixing-temperature-01',5));
});
