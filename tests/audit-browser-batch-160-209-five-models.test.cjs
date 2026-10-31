'use strict';
/** Contre-calculs indépendants sur cinq modèles du lot navigateur 160–209.
 * Références physiques définies ici, sans appeler le moteur pour les produire.
 * 4 points du domaine + cohérence HTML par modèle. Ne valide pas les SVG.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const physics=require('../src/batch448-452.js').physics;
const cases=[
 // Kt=2,2 ; section nette 20x4 mm² ; F en kN -> contrainte en MPa.
 ['notch-elastic-stress-factor-01',f=>2.2*(f*1000)/(20*4),'MPa'],
 // R=10 kΩ ; C=220 µF ; U=24 V ; E en mJ.
 ['rc-charge-stored-energy-01',t=>0.5*220e-6*(24*(1-Math.exp(-t/(10000*220e-6))))**2*1000,'mJ'],
 // Torsion Saint-Venant : Jp en m4 ; G=80 GPa ; L=1,2 m ; angle en degrés.
 ['hollow-shaft-elastic-twist-01',T=>T*1.2/(80e9*(Math.PI*(0.060**4-0.040**4)/32))*180/Math.PI,'°'],
 // Nombre de Fourier, alpha en m²/s et longueur caractéristique en m.
 ['fourier-number-slab-01',t=>1e-6*t/(0.020**2),'sans unité'],
 // Fusion isotherme de glace à 0 °C ; chaleur latente 334 kJ/kg.
 ['ice-latent-fusion-energy-01',m=>334*m,'kJ']
];
function near(actual,expected,label){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),label+' : non fini');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),label+' : '+actual+' != '+expected);
}
for(const [id,reference,unit] of cases){
 test('référence scientifique indépendante — '+id,()=>{
  const mission=catalog.byId(id);
  assert.ok(mission,id+' : absent du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',mission.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit);
  assert.equal(physics.criteria[id].unit,unit);
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : valeur nominale HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   near(physics.calculate(id,x),reference(x),id+' : '+x+' '+cfg.inputUnit);
  }
  for(const invalid of [NaN,Infinity,-Infinity])
   assert.throws(()=>physics.calculate(id,invalid),RangeError,id+' : entrée non finie');
 });
}
test('cinq modèles distincts, inventaire de 597 conservé',()=>{
 assert.equal(cases.length,5);
 assert.equal(new Set(cases.map(c=>c[0])).size,5);
 assert.equal(catalog.levels.length,597);
});
