'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const science=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[{"id":"stepped-bar-extension-01","min":0,"max":35,"initial":20,"tol":0.005,"unit":"mm"},{"id":"motor-slip-01","min":48,"max":60,"initial":50,"tol":0.1,"unit":"%"},{"id":"log-decrement-01","min":5,"max":19,"initial":12,"tol":0.003,"unit":"sans unité"},{"id":"exchanger-effectiveness-01","min":0,"max":110,"initial":72,"tol":0.005,"unit":"sans unité"},{"id":"darcy-pipe-loss-01","min":20,"max":60,"initial":30,"tol":0.002,"unit":"bar"}];
const refs={
 'stepped-bar-extension-01':x=>x*1000/210000*(800/400+600/250),
 'motor-slip-01':x=>100*(1-48/x),
 'log-decrement-01':x=>(Math.log(20)-Math.log(x))/3,
 'exchanger-effectiveness-01':x=>x/(2*60),
 'darcy-pipe-loss-01':x=>.03*800*998/2*Math.pow(4*(x/60000)/(Math.PI*.025*.025),2)/100000
};
test('Catalogue 127 identifiants uniques et accueil intact',()=>{
 assert.ok(catalog.levels.length>=127);assert.equal(new Set(catalog.levels.map(l=>l.id)).size,catalog.levels.length);
 const home=fs.readFileSync('index.html','utf8');assert.match(home,/id="island-map"/);assert.match(home,/src\/home\.js/);
});
for(const c of cases){
 test(c.id+' modèle, référence indépendante, bornes et cas invalides',()=>{
  assert.equal(science.criteria[c.id].unit,c.unit);
  for(const x of [c.min,c.initial,(c.min+c.max)/2,c.max]){
   const got=science.calculate(c.id,x),want=refs[c.id](x);
   assert.ok(Math.abs(got-want)<1e-9*Math.max(1,Math.abs(want)),c.id+' '+x+' '+got+' '+want);
   const svg=diagrams.render(c.id,x,got);
   assert.match(svg,/<svg[^>]*viewBox/);assert.match(svg,/<desc/);assert.match(svg,/data-/);
   assert.doesNotMatch(svg,/NaN|Infinity/);
  }
  for(const x of [c.min-1,c.max+1,NaN,Infinity,-Infinity])assert.throws(()=>science.calculate(c.id,x));
  const policy=science.answerPolicy[c.id];
  assert.ok(policy.solution.includes('Contrôle')&&policy.assumptions.length>80);
  assert.ok(science.validateAnswer(String(refs[c.id](c.initial)),refs[c.id](c.initial),c.tol).correct);
  assert.ok(!science.validateAnswer(String(refs[c.id](c.initial)+c.tol*2),refs[c.id](c.initial),c.tol).correct);
  assert.ok(!science.validateAnswer('invalide',refs[c.id](c.initial),c.tol).valid);
 });
 test(c.id+' parcours pédagogique et confidentialité de la réponse avant validation',()=>{
  const h=fs.readFileSync('missions/'+c.id+'.html','utf8');
  for(const term of ['Questions flash','Prérequis','Hypothèses','Critères de réussite','id="hint"','id="solution"','id="trialValue"','id="log"','investigation-mission.js','investigation-diagrams.js'])assert.ok(h.includes(term),c.id+' manque '+term);
  assert.match(h,/id="solution"[^>]*disabled/);assert.match(h,/id="trialValue"[^>]*disabled/);
  assert.match(h,/href="\.\.\/index\.html"/);
  assert.ok(catalog.byId(c.id)?.subskill);
 });
}
test('Propriétés physiques et cohérence des bilans',()=>{
 const f=(id,x)=>science.calculate(id,x);
 assert.equal(f('stepped-bar-extension-01',0),0);
 assert.ok(Math.abs(f('stepped-bar-extension-01',30)/f('stepped-bar-extension-01',15)-2)<1e-10);
 assert.equal(f('motor-slip-01',48),0);assert.ok(f('motor-slip-01',60)>f('motor-slip-01',50));
 assert.ok(f('log-decrement-01',5)>f('log-decrement-01',19));
 assert.ok(f('exchanger-effectiveness-01',110)<1);
 assert.ok(Math.abs((80-72/2)-(20+72/3))<1e-12);
 assert.ok(Math.abs(f('darcy-pipe-loss-01',60)/f('darcy-pipe-loss-01',30)-4)<1e-10);
});
test('Audit des missions historiques : prérequis, hypothèses et réactivation',()=>{
 for(const id of ['hydro-annular-force-01','electrical-parallel-01']){
  const h=fs.readFileSync('missions/'+id+'.html','utf8');
  for(const term of ['Questions flash','Prérequis','Hypothèses','Critères de réussite'])assert.ok(h.includes(term));
  assert.doesNotMatch(h,/Hypothèses : modèle idéal, paramètres constants/);
 }
 assert.ok(Math.abs(science.calculate('hydro-annular-force-01',120)-120*1e5*Math.PI*(.08**2-.04**2)/4)<1e-8);
 assert.ok(Math.abs(science.calculate('electrical-parallel-01',12)-6)<1e-10);
});
