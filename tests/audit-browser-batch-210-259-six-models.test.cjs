'use strict';
/**
 * Recette scientifique indépendante du lot navigateur 210–259.
 * Six modèles distincts ; quatre valeurs chacun ; unités, bornes, données
 * nominales HTML, rejets non finis. Ne constitue pas une recette SVG/RGAA.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const base=require('../src/investigations.js');
const hydraulic=require('../src/batch343-347.js').physics;
const cases=[
 // Deux ressorts parallèles : k_eq = k_1 + k_2 ; k_1=40 N/mm.
 ['parallel-spring-stiffness-01',x=>40+x,'N/mm',base],
 // Transformateur idéal : U2/U1=N2/N1 ; U1=230 V, N1=1000.
 ['transformer-turns-ratio-01',n=>230*n/1000,'V',base],
 // Diffusivité : lambda/(rho cp), rho=7800 kg/m3, cp=500 J/(kg.K).
 // Conversion m2/s -> mm2/s par 10^6.
 ['material-thermal-diffusivity-01',lambda=>lambda/(7800*500)*1e6,'mm²/s',base],
 // Euler bi-articulé : Pcr=pi² E I/L² ; E=210 GPa, d=20 mm.
 // I=pi d^4/64 ; conversion N -> kN.
 ['euler-buckling-01',L=>Math.PI**2*210e9*(Math.PI*.02**4/64)/(L*L)/1000,'kN',base],
 // Puissance mécanique : P=C omega ; C=120 N.m, n en tr/min.
 ['power-01',n=>120*(2*Math.PI*n/60)/1000,'kW',base],
 // Étranglement adiabatique : delta T=delta p/(rho cp),
 // rho=850 kg/m3, cp=2000 J/(kg.K), delta p en bar.
 ['hydraulic-throttle-temperature-rise-01',p=>p*100000/(850*2000),'K',hydraulic]
];
function near(actual,expected,label){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),label+' : valeur non finie');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
  label+' : '+actual+' != '+expected);
}
for(const [id,reference,unit,engine] of cases){
 test('contre-calcul indépendant SI — '+id,()=>{
  const mission=catalog.byId(id);
  assert.ok(mission,id+' absent du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',mission.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit);
  assert.equal(engine.criteria[id].unit,unit);
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : référence nominale HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max])
   near(engine.calculate(id,x),reference(x),id+' : '+x+' '+cfg.inputUnit);
  for(const invalid of [NaN,Infinity,-Infinity])
   assert.throws(()=>engine.calculate(id,invalid),RangeError,id+' : entrée non finie');
 });
}
test('inventaire et six modèles indépendants distincts',()=>{
 assert.equal(cases.length,6);
 assert.equal(new Set(cases.map(c=>c[0])).size,6);
 assert.equal(catalog.levels.length,597);
});
