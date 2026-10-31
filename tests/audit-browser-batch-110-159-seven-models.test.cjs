'use strict';
/** SI QUEST V2.5 — sept contre-calculs scientifiques du lot navigateur 110–159.
 * Les références sont établies directement à partir des lois et données
 * affichées, sans appeler le moteur pour produire la valeur de référence.
 * Quatre points par modèle ; ce test n'est ni un audit visuel ni un test RGAA.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const physics=require('../src/investigations.js');
const cases=[
 // Deux organes redondants, indépendants, lambda=0,001 h^-1 : fiabilité en %.
 ['parallel-redundancy-reliability-01',t=>100*(1-(1-Math.exp(-.001*t))**2),'%'],
 // P=X Fr+Y Fa ; Fr=12 kN, X=0,56, Y=1,60.
 ['bearing-equivalent-dynamic-load-01',fa=>.56*12+1.60*fa,'kN'],
 // Trois composants en série : somme des taux 1e-4+2e-4+1,5e-4 h^-1.
 ['series-system-reliability-01',t=>100*Math.exp(-(.0001+.0002+.00015)*t),'%'],
 // Rendement granulométrique de filtration à partir du rapport beta.
 ['filter-beta-efficiency-01',beta=>100*(1-1/beta),'%'],
 // Loi de Newton : h=P/(A DeltaT), P=250 W, A=0,50 m2.
 ['convective-surface-coefficient-01',deltaT=>250/(.5*deltaT),'W/(m²·K)'],
 // Poiseuille laminaire : Q[L/min] -> m3/s ; Pa -> bar.
 ['hose-pressure-drop-01',q=>128*.06*5*(q/60000)/(Math.PI*.012**4)/1e5,'bar'],
 // Console : F[N], L=500 mm, E=210000 N/mm2, I=80000 mm4.
 ['beam-defl-01',f=>f*500**3/(3*210000*80000),'mm']
];
function near(a,b,label){
 assert.ok(Number.isFinite(a)&&Number.isFinite(b),label+' : résultat non fini');
 assert.ok(Math.abs(a-b)<=2e-8*Math.max(1,Math.abs(b)),label+': '+a+' ≠ '+b);
}
for(const [id,reference,unit] of cases){
 test('contre-calcul indépendant — '+id,()=>{
  const item=catalog.byId(id);
  assert.ok(item,'mission absente du catalogue');
  const html=fs.readFileSync(path.join(__dirname,'..',item.url),'utf8');
  const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal(cfg.id,id);
  assert.equal(cfg.unit,unit);
  assert.equal(physics.criteria[id].unit,unit);
  assert.ok(Number.isFinite(cfg.min)&&Number.isFinite(cfg.max)&&cfg.min<cfg.max);
  assert.ok(cfg.initial>=cfg.min&&cfg.initial<=cfg.max);
  near(cfg.expected,reference(cfg.initial),id+' : valeur nominale HTML');
  for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
   near(physics.calculate(id,x),reference(x),id+' : x='+x+' '+cfg.inputUnit);
  }
  for(const bad of [NaN,Infinity,-Infinity])
   assert.throws(()=>physics.calculate(id,bad),RangeError,id+' : domaine non fini');
 });
}
test('sept modèles distincts, catalogue inchangé',()=>{
 assert.equal(cases.length,7);
 assert.equal(new Set(cases.map(c=>c[0])).size,7);
 assert.equal(catalog.levels.length,597);
});
