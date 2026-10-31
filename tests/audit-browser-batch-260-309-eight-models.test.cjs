'use strict';
/**
 * Recette indépendante du lot navigateur 260–309.
 * Huit lois et conversions SI recalculees hors moteur de production,
 * quatre points numeriques par loi (min, milieu, nominal, max).
 * Ne prouve pas la geometrie des SVG ni l'accessibilite physique.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const physics=require('../src/investigations.js');

const cases=[
 // E = S Delta T ; S = 41 microV/K ; sortie en mV.
 ['thermocouple-seebeck-voltage-01',T=>(41e-6*(T-20))*1e3,'mV','°C'],
 // L = J omega ; J=8 kg.m2, n en tr/min, omega=2pi n/60.
 ['flywheel-angular-momentum-01',n=>8*(2*Math.PI*n/60),'kg·m²/s','tr/min'],
 // F=p A ; p en bar, D=80 mm.
 ['hydro-force-02',p=>(p*1e5)*(Math.PI*(80e-3)**2/4),'N','bar'],
 // CAN 12 bits : q=Uref/4096, V vers mV.
 ['adc-voltage-step-01',U=>(U/2**12)*1e3,'mV','V'],
 // Puissance continue : U=24 V, P=UI.
 ['electric-power-02',I=>24*I,'W','A'],
 // Cuivre : rho=0.0175 ohm.mm2/m, section 2.5 mm2.
 ['copper-cable-resistance-01',L=>(0.0175/2.5)*L,'Ω','m'],
 // Darcy-Weisbach : Q L/min -> m3/s ; D=.025m, L=20m, rho=998.
 ['darcy-pipe-loss-01',Q=>{
  const D=.025,A=Math.PI*D**2/4,v=(Q*1e-3/60)/A;
  return (.03*20/D)*(998*v*v/2)/1e5;
 },'bar','L/min'],
 // Entraxe de deux roues droites exterieures : m=3mm, z1=20.
 ['gear-mesh-01',z2=>(3*(20+z2))/2,'mm','dents']
];
function near(actual,expected,label){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),label+' : non fini');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
  label+' : obtenu '+actual+' ; attendu '+expected);
}
for(const [id,reference,unit,inputUnit] of cases){
 test('contre-calcul SI indépendant — '+id,()=>{
  const m=catalog.byId(id);assert.ok(m,id+' absent du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit);
  assert.equal(cfg.inputUnit,inputUnit);
  assert.equal(physics.criteria[id].unit,unit);
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : nominal HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max])
   near(physics.calculate(id,x),reference(x),id+' : '+x+' '+inputUnit);
  for(const invalid of [NaN,Infinity,-Infinity])
   assert.throws(()=>physics.calculate(id,invalid),RangeError,id+' : non fini');
 });
}
test('inventaire : huit lois distinctes, 597 missions et unités cohérentes',()=>{
 assert.equal(cases.length,8);
 assert.equal(new Set(cases.map(c=>c[0])).size,8);
 assert.equal(catalog.levels.length,597);
});
