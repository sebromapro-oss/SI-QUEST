'use strict';
/**
 * Lot navigateur 310–359 : 11 contre-calculs SI indépendants.
 * Quatre points par modèle (min, milieu, initial, max).
 * Les références sont calculées hors moteur de production.
 * Aucune assertion ne prouve à elle seule la fidélité SVG ou le RGAA.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const physics=require('../src/investigations.js');

const cases=[
 // Deux paires de pôles : n_s=60 f / p.
 ['motor-synchronous-speed-01',f=>60*f/2,'tr/min','Hz'],
 // Energie cinétique : m=1200 kg, v en m/s, résultat en kJ.
 ['kinetic-01',v=>(1200*v*v/2)/1000,'kJ','m/s'],
 // Vérin : D=80 mm, d=40 mm, p_A=120 bar, p_B variable.
 ['hydro-backpressure-01',pB=>{
  const A=Math.PI*(.080**2)/4,ann=Math.PI*(.080**2-.040**2)/4;
  return (120*1e5*A-pB*1e5*ann)/1000;
 },'kN','bar'],
 // Hydrostatique : Delta p = rho g h ; huile rho=850 kg/m3.
 ['hydrostatic-column-01',h=>(850*9.81*h)/1e5,'bar','m'],
 // Masse volumique : volume fixe de 0,001 m3.
 ['density-01',m=>m/(1e-3),'kg/m³','kg'],
 // Résonance LC : L=0,050 H, capacité en microfarads.
 ['lc-resonance-01',C=>1/(2*Math.PI*Math.sqrt(.050*C*1e-6)),'Hz','µF'],
 // Train couronne fixe : z_s=24, z_r=72, rapport 24/(24+72).
 ['planetary-fixed-ring-01',n=>n*24/(24+72),'tr/min','tr/min'],
 // Energie d'un ressort : k=18 000 N/m ; compression mm -> m.
 ['spring-stored-energy-01',x=>.5*18000*(x/1000)**2,'J','mm'],
 // Transmission : puissance absorbée 12 kW, rendement sans unité.
 ['mechanical-efficiency-02',eta=>12*eta,'kW','sans unité'],
 // Vérin : section 50 cm2, course en mm, conversion cm2.mm -> litre.
 ['hydro-volume-01',x=>(50*1e-4)*(x*1e-3)*1000,'L','mm'],
 // Freinage : t=m v / F, v en km/h, m=1200 kg, F=3000 N.
 ['braking-stop-time-01',v=>(1200*(v/3.6))/3000,'s','km/h']
];
function near(actual,expected,label){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),label+' : non fini');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
  label+' : obtenu '+actual+' ; attendu '+expected);
}
for(const [id,reference,unit,inputUnit] of cases){
 test('contre-calcul SI indépendant 310–359 — '+id,()=>{
  const m=catalog.byId(id);assert.ok(m,id+' absent du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',m.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit,id+' : unité résultat');
  assert.equal(cfg.inputUnit,inputUnit,id+' : unité entrée');
  assert.equal(physics.criteria[id].unit,unit,id+' : unité du modèle');
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : nominal HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max])
   near(physics.calculate(id,x),reference(x),id+' : '+x+' '+inputUnit);
  for(const invalid of [NaN,Infinity,-Infinity])
   assert.throws(()=>physics.calculate(id,invalid),RangeError,id+' : entrée non finie');
 });
}
test('inventaire scientifique 310–359 : 11 lois distinctes, 597 missions',()=>{
 assert.equal(cases.length,11);
 assert.equal(new Set(cases.map(c=>c[0])).size,11);
 assert.equal(catalog.levels.length,597);
});
