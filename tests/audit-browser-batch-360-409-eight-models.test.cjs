'use strict';
/**
 * SI QUEST V2.5 — huit contre-calculs SI indépendants sur le lot navigateur
 * 360–409. Les références sont construites à partir des lois physiques et
 * des hypothèses nominales, sans appeler le moteur pour le résultat attendu.
 * Ne constitue pas une validation graphique ni RGAA sur appareil physique.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const {physics,diagrams}=require('../src/batch488-492.js');
const cases=[
 ['absolute-encoder-angular-step-01',N=>360/Math.pow(2,N),'°','bits'],
 ['pwm-ideal-average-voltage-01',D=>48*D,'V','sans unité'],
 ['series-capacitors-voltage-division-01',C2=>60*C2/(10+C2),'V','µF'],
 ['annular-rotor-polar-inertia-01',R=>{
  const rho=7800,e=.010,r=.050;
  const mass=rho*Math.PI*e*(R*R-r*r);
  return mass*(R*R+r*r)/2;
 },'kg·m²','m'],
 ['battery-loaded-terminal-voltage-01',I=>6*(12.6-.08*I),'V','A'],
 ['hydraulic-critical-reynolds-flow-01',nu=>{
  const Re=2300,D=.012,nuSI=nu*1e-6;
  return Re*Math.PI*D*nuSI/4*60000;
 },'L/min','mm²/s'],
 ['lumped-cooling-temperature-01',t=>{
  const Tair=20,Tinitial=100,m=4,cp=500,h=20,A=.4;
  return Tair+(Tinitial-Tair)*Math.exp(-h*A*t/(m*cp));
 },'°C','s'],
 ['parallel-key-bearing-pressure-01',T=>{
  const d=.040,l=.050,he=.004;
  return (2*T/d)/(l*he)/1e6;
 },'MPa','N·m']
];
function near(actual,expected,label){
 assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),label+' : résultat non fini');
 assert.ok(Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),
  label+' : obtenu '+actual+' ; référence '+expected);
}
for(const [id,reference,unit,inputUnit] of cases){
 test('contre-calcul indépendant 360–409 : '+id,()=>{
  const mission=catalog.byId(id);assert.ok(mission,id+' absent du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',mission.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit,id+' : unité résultat');
  assert.equal(cfg.inputUnit,inputUnit,id+' : unité entrée');
  assert.equal(physics.criteria[id].unit,unit,id+' : unité moteur');
  assert.equal(physics.inputUnits[id],inputUnit,id+' : unité entrée moteur');
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : valeur nominale HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   // Le codeur n'accepte que des valeurs entières de bits.
   if(id==='absolute-encoder-angular-step-01'&&!Number.isInteger(x))continue;
   const actual=physics.calculate(id,x);
   near(actual,reference(x),id+' : '+x+' '+inputUnit);
   const svg=diagrams.render(id,x,actual);
   assert.match(svg,/<svg\b/,id+' : dessin SVG');
   assert.match(svg,/<title\b/,id+' : titre accessible');
   assert.match(svg,/<desc\b/,id+' : description accessible');
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/,id+' : valeur non finie SVG');
  }
  for(const bad of [NaN,Infinity,-Infinity,null,'1',cfg.min-1,cfg.max+1])
   assert.throws(()=>physics.calculate(id,bad),RangeError,id+' : domaine');
 });
}
test('invariants et inventaire scientifique du lot 360–409',()=>{
 assert.equal(cases.length,8);
 assert.equal(new Set(cases.map(c=>c[0])).size,8);
 assert.ok(catalog.levels.length>=597);
 assert.ok(physics.calculate('absolute-encoder-angular-step-01',12)<
  physics.calculate('absolute-encoder-angular-step-01',10));
 assert.ok(physics.calculate('pwm-ideal-average-voltage-01',.6)>
  physics.calculate('pwm-ideal-average-voltage-01',.3));
 assert.ok(physics.calculate('lumped-cooling-temperature-01',500)<
  physics.calculate('lumped-cooling-temperature-01',100));
 assert.ok(physics.calculate('battery-loaded-terminal-voltage-01',80)<
  physics.calculate('battery-loaded-terminal-voltage-01',20));
 assert.throws(()=>physics.calculate('absolute-encoder-angular-step-01',10.5),RangeError);
});
