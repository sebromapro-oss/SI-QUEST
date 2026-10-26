'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const science=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[
 {id:'flywheel-angular-momentum-01',x:600,min:0,max:1500,reference:()=>8*20*Math.PI,independent:n=>8*(n/60)*(2*Math.PI),unit:'kg·m²/s'},
 {id:'rc-charge-threshold-01',x:12,min:1,max:22,reference:()=>4.7*Math.log(2),independent:u=>4.7*Math.log(24/(24-u)),unit:'s'},
 {id:'thermal-clearance-01',x:60,min:0,max:120,reference:()=>.67,independent:dT=>1-(23-12)*.000001*500*dT,unit:'mm'},
 {id:'venturi-pressure-01',x:30,min:0,max:60,reference:()=>.01187357620808646,independent:q=>{const qSI=q/60000,area=Math.PI*.04*.04/4,v=qSI/area;return (1000/2)*15*v*v/100000;},unit:'bar'},
 {id:'spring-series-01',x:10000,min:5000,max:40000,reference:()=>100/.015,independent:k2=>100/(100/20000+100/k2),unit:'N/m'}
];
test('catalogue : cinq nouvelles missions distinctes et accueil inchangé',()=>{
 assert.ok(catalog.levels.length>=122);
 assert.equal(new Set(catalog.levels.map(l=>l.id)).size,catalog.levels.length);
 for(const c of cases){const e=catalog.byId(c.id);assert.ok(e,c.id);assert.ok(e.subskill);assert.equal(e.url,'missions/'+c.id+'.html');}
 const home=fs.readFileSync('index.html','utf8');assert.match(home,/id="island-map"/);assert.match(home,/src\/home\.js/);
});
for(const c of cases){
 test(c.id+' : nominal, conversions et calcul indépendant',()=>{
  assert.ok(Math.abs(science.calculate(c.id,c.x)-c.reference())<=1e-8*Math.max(1,Math.abs(c.reference())));
  assert.equal(science.criteria[c.id].unit,c.unit);
  for(const x of [c.min,(c.min+c.max)/2,c.max,c.x]){
   const result=science.calculate(c.id,x),reference=c.independent(x);
   assert.ok(Math.abs(result-reference)<=1e-8*Math.max(1,Math.abs(reference)),c.id+' '+x+' '+result+' '+reference);
   const svg=diagrams.render(c.id,x,result);
   assert.match(svg,/<svg[^>]+viewBox/);
   assert.match(svg,/data-/);
   assert.match(svg,/<desc/);
  }
  for(const invalid of [c.min-1,c.max+1,NaN,Infinity,-Infinity])assert.throws(()=>science.calculate(c.id,invalid));
  const policy=science.answerPolicy[c.id];
  assert.ok(policy.assumptions.length>60&&policy.solution.includes('Contrôle'));
  assert.ok(science.validateAnswer(String(c.reference()),c.reference(),policy.absoluteTolerance).correct);
  assert.ok(!science.validateAnswer(String(c.reference()+policy.absoluteTolerance*1.5),c.reference(),policy.absoluteTolerance).correct);
  assert.ok(!science.validateAnswer('erreur',c.reference(),policy.absoluteTolerance).valid);
 });
 test(c.id+' : parcours pédagogique, scène et lien depuis l’archipel',()=>{
  const html=fs.readFileSync('missions/'+c.id+'.html','utf8');
  for(const term of ['Questions flash','Prérequis','Hypothèses','Critères de réussite','id="hint"','id="solution"','id="trialValue"','id="log"','investigation-mission.js','investigation-diagrams.js'])assert.ok(html.includes(term),c.id+' manque '+term);
  assert.match(html,/id="curve"/);assert.match(html,/id="point"/);
  assert.match(html,/href="\.\.\/index\.html"/);
  assert.match(html,/id="solution"[^>]+disabled/);
  assert.match(html,/id="trialValue"[^>]+disabled/);
 });
}
test('propriétés physiques et cas limites',()=>{
 const f=(id,x)=>science.calculate(id,x);
 assert.equal(f('flywheel-angular-momentum-01',0),0);
 assert.ok(Math.abs(f('flywheel-angular-momentum-01',1200)-2*f('flywheel-angular-momentum-01',600))<1e-9);
 assert.ok(f('rc-charge-threshold-01',22)>f('rc-charge-threshold-01',12));
 assert.throws(()=>f('rc-charge-threshold-01',24));
 assert.ok(f('thermal-clearance-01',120)<f('thermal-clearance-01',0));
 assert.ok(Math.abs(f('venturi-pressure-01',60)-4*f('venturi-pressure-01',30))<1e-12);
 assert.equal(f('venturi-pressure-01',0),0);
 assert.ok(f('spring-series-01',5000)<f('spring-series-01',40000));
 assert.ok(f('spring-series-01',40000)<20000);
});
test('audit 40–75 : incertitude relative et flexion ont hypothèses et réactivation',()=>{
 for(const id of ['measurement-uncertainty-01','beam-stress-02']){
  const h=fs.readFileSync('missions/'+id+'.html','utf8');
  assert.match(h,/Questions flash/);assert.match(h,/Prérequis/);assert.match(h,/Hypothèses/);
  assert.doesNotMatch(h,/Hypothèses : modèle idéal, paramètres constants/);
 }
 assert.equal(science.calculate('measurement-uncertainty-01',.1),.2);
 assert.equal(science.calculate('beam-stress-02',800),18.75);
});
