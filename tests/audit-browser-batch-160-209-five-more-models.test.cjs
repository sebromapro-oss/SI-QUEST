'use strict';
/** Cinq contre-calculs complémentaires du lot 160–209.
 * Les références ne réutilisent pas les fonctions du moteur de production.
 * Contrôle des unités, quatre valeurs par domaine et valeur nominale HTML.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const physics=require('../src/batch448-452.js').physics;
const cases=[
 // Pression en bar -> Pa ; cylindrée en m3/tr ; couple puis réduction et roue.
 ['hydrostatic-wheel-traction-01',p=>(p*1e5*80e-6*.85/(2*Math.PI))*15*.9/.45,'N'],
 // Vidange par orifice circulaire, cuve de section constante.
 ['tank-gravity-drain-01',h=>2*.5*(Math.sqrt(h)-Math.sqrt(.2))/(.62*(Math.PI*.012**2/4)*Math.sqrt(2*9.81)),'s'],
 // Résistances en série : résistance fixe de 8 ohms.
 ['resistance-02',r=>8+r,'Ω'],
 // Résistance thermique d'une paroi plane, e=0,12 m, S=2 m2.
 ['thermal-resistance-01',lambda=>.12/(lambda*2),'K/W'],
 // Courbure en flexion pure ; EI exprimé en N.m2.
 ['beam-curvature-01',M=>M/(210e9*8e-6),'m⁻¹']
];
function near(actual,expected,label){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),label+' : non fini');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),label+' : '+actual+' != '+expected);
}
for(const [id,reference,unit] of cases){
 test('contre-calcul physique complémentaire — '+id,()=>{
  const item=catalog.byId(id);
  assert.ok(item,id+' absent du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',item.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit);
  assert.equal(physics.criteria[id].unit,unit);
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : valeur nominale HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max])
   near(physics.calculate(id,x),reference(x),id+' : x='+x+' '+cfg.inputUnit);
  for(const invalid of [NaN,Infinity,-Infinity])
   assert.throws(()=>physics.calculate(id,invalid),RangeError,id+' : entrée non finie');
 });
}
test('cinq références complémentaires distinctes et inventaire inchangé',()=>{
 assert.equal(cases.length,5);
 assert.equal(new Set(cases.map(c=>c[0])).size,5);
 assert.equal(catalog.levels.length,597);
});
