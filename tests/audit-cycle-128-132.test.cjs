'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const science=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[{"id":"cylinder-stroke-time-01","min":0,"max":600,"initial":400,"expected":5.026548245743669,"tol":0.02,"unit":"s","inputUnit":"mm","subskill":"Temps de parcours d'un vérin à débit imposé"},{"id":"gas-isothermal-work-01","min":1,"max":4,"initial":2,"expected":1.3862943611198906,"tol":0.01,"unit":"kJ","inputUnit":"sans unité","subskill":"Travail de compression réversible d'un gaz parfait"},{"id":"symmetric-sling-tension-01","min":20,"max":70,"initial":40,"expected":6.22289530744165,"tol":0.03,"unit":"kN","inputUnit":"°","subskill":"Équilibre d'une charge suspendue par deux brins inclinés"},{"id":"voltage-divider-sensor-01","min":0.5,"max":5,"initial":3,"expected":2.8846153846153846,"tol":0.01,"unit":"V","inputUnit":"kΩ","subskill":"Conditionnement d'un capteur résistif par diviseur de tension"},{"id":"restrained-thermal-stress-01","min":0,"max":80,"initial":50,"expected":-126,"tol":0.5,"unit":"MPa","inputUnit":"K","subskill":"Contrainte de compression par dilatation empêchée"}];
const independent={
'cylinder-stroke-time-01':x=>Math.PI*.08*.08*x/(4*1000*.0004),
'gas-isothermal-work-01':x=>2*Math.log(x),
'symmetric-sling-tension-01':x=>4/Math.sin(x*Math.PI/180),
'voltage-divider-sensor-01':x=>5/(1+2.2/x),
'restrained-thermal-stress-01':x=>-2.52*x
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
test('128–132 : cinq sous-savoirs distincts et navigation protégée',()=>{
 assert.ok(catalog.levels.length>=132);assert.equal(new Set(catalog.levels.map(x=>x.id)).size,catalog.levels.length);
 assert.equal(new Set(cases.map(c=>catalog.byId(c.id).subskill)).size,5);
 const home=fs.readFileSync('index.html','utf8');assert.match(home,/id="island-map"/);assert.match(home,/src\/home\.js/);
});
for(const c of cases){
 test(c.id+' : modèles indépendants, cas limites et SVG paramétrique',()=>{
  assert.equal(science.criteria[c.id].unit,c.unit);assert.equal(science.inputUnits[c.id],c.inputUnit);
  for(const x of [c.min,c.initial,(c.min+c.max)/2,c.max]){
   const v=science.calculate(c.id,x);near(v,independent[c.id](x));
   const svg=diagrams.render(c.id,x,v);
   assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-/);
   assert.ok(svg.includes(c.unit)&&svg.includes(c.inputUnit));
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
  }
  for(const x of [c.min-1,c.max+1,NaN,Infinity,-Infinity])assert.throws(()=>science.calculate(c.id,x),RangeError);
  near(science.calculate(c.id,c.initial),c.expected);
  assert.ok(science.answerPolicy[c.id].assumptions.length>160);
  assert.ok(science.answerPolicy[c.id].solution.includes('Contrôle'));
  assert.ok(science.validateAnswer(String(c.expected).replace('.',','),c.expected,c.tol).correct);
  assert.ok(!science.validateAnswer(String(c.expected+2*c.tol),c.expected,c.tol).correct);
  assert.ok(!science.validateAnswer('invalide',c.expected,c.tol).valid);
 });
 test(c.id+' : parcours, aide, sauvegarde, corrigé masqué',()=>{
  const html=fs.readFileSync('missions/'+c.id+'.html','utf8');
  for(const label of ['Questions flash','Prérequis','Hypothèses','Critères de réussite','id="hint"','id="solution"','id="trialValue"','id="log"','id="reset"','investigation-mission.js','investigation-diagrams.js'])assert.ok(html.includes(label),c.id+' : '+label);
  assert.match(html,/id="solution"[^>]*disabled/);assert.match(html,/id="trialValue"[^>]*disabled/);
  assert.match(html,/href="\.\.\/index\.html"/);
  assert.equal(catalog.byId(c.id).subskill,c.subskill);
 });
}
test('128–132 : invariants et signes des cinq phénomènes',()=>{
 const f=(id,x)=>science.calculate(id,x);
 near(f('cylinder-stroke-time-01',600),1.5*f('cylinder-stroke-time-01',400));
 near(f('cylinder-stroke-time-01',0),0);
 near(f('gas-isothermal-work-01',1),0);near(f('gas-isothermal-work-01',4),2*f('gas-isothermal-work-01',2));
 assert.ok(f('symmetric-sling-tension-01',20)>f('symmetric-sling-tension-01',70));
 assert.ok(f('voltage-divider-sensor-01',5)<5&&f('voltage-divider-sensor-01',.5)>0);
 near(f('restrained-thermal-stress-01',0),0);assert.ok(f('restrained-thermal-stress-01',50)<0);
 assert.equal(science.assess('restrained-thermal-stress-01',80).acceptable,false);
});
test('Audit historique : vitesse du vérin, tolérance réellement appliquée',()=>{
 const q=science.answerPolicy['hydro-speed-01'];assert.equal(q.absoluteTolerance,.0002);
 assert.equal(science.calculate('hydro-speed-01',12),.05);
 assert.equal(science.validateAnswer('0,0501',.05,q.absoluteTolerance).correct,true);
 assert.equal(science.validateAnswer('0,06',.05,q.absoluteTolerance).correct,false);
 const html=fs.readFileSync('missions/hydro-speed-01.html','utf8');assert.match(html,/Ta réponse \(m\/s\)/);assert.match(html,/Questions flash/);
});
test('Audit historique : unités réelles des 36 missions 40–75',()=>{
 const ids=JSON.parse(fs.readFileSync('tests/historical-40-75-exact.test.cjs','utf8').split('const ids=')[1].split(';')[0]);const selected=ids.map(id=>catalog.byId(id));
 assert.equal(selected.length,36);
 for(const c of selected){const h=fs.readFileSync(c.url,'utf8'),m=h.match(/window\.SI_MISSION=(\{.*?\})<\/script>/);assert.ok(m,c.id);const cfg=JSON.parse(m[1]);assert.equal(science.inputUnits[c.id],cfg.inputUnit,c.id);assert.equal(science.criteria[c.id].unit,cfg.unit,c.id);}
});
