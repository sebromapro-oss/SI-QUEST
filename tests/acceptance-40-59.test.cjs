'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const physics=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const spatial=require('../src/scene3d.js');
const cases=[
 ['circular-02',[0,3,6],x=>x*x/.5],
 ['angular-accel-01',[1,8,20],x=>120/x],
 ['brake-torque-01',[0,4,10],x=>8*x],
 ['incline-force-01',[0,15,35],x=>600*9.81*Math.sin(x*Math.PI/180)],
 ['resultant-01',[0,400,800],x=>Math.sqrt(300*300+x*x)],
 ['torsion-01',[30,120,240],x=>16*(x*1000)/(Math.PI*30*30*30)],
 ['axial-strain-01',[0,.6,1.2],x=>x/1200],
 ['gear-mesh-01',[10,40,60],x=>(3*20/2)+(3*x/2)],
 ['belt-speed-01',[100,900,1500],x=>(2*Math.PI*.1)*(x/60)],
 ['hydro-power-01',[0,150,250],x=>(x*1e5)*(24/60000)/1000],
 ['hydro-volume-01',[0,300,600],x=>(50*1e-4)*(x*1e-3)*1000],
 ['pneumatic-force-01',[0,6,10],x=>(x*1e5)*(Math.PI*.025*.025)],
 ['electric-power-02',[0,5,12],x=>24*x],
 ['joule-heat-01',[0,3,6],x=>4*x*x],
 ['rc-time-01',[100,10000,20000],x=>x*470e-6],
 ['sampling-01',[1,5,20],x=>1/(x/1000)],
 ['efficiency-chain-01',[0,.9,1],x=>.92*x],
 ['rolling-load-01',[0,.025,.05],x=>8000*x],
 ['heat-transfer-01',[0,15,40],x=>(.8*2/.1)*x],
 ['measurement-relative-01',[78,80,80.4],x=>100*Math.abs(x-80)/80]
];
test('20 politiques de réponse indépendantes',()=>assert.equal(cases.filter(([id])=>physics.answerPolicy[id]).length,20));
for(const [id,values,reference] of cases){
 test(id+' : trois références scientifiques indépendantes',()=>{
  for(const x of values){const expected=reference(x),actual=physics.calculate(id,x);assert.ok(Number.isFinite(actual));assert.ok(Math.abs(actual-expected)<1e-9*Math.max(1,Math.abs(expected)),id+' '+x+' : '+actual+' / '+expected)}
 });
 test(id+' : précision, tolérance et frontière',()=>{
  const policy=physics.answerPolicy[id],x=values[1],expected=reference(x);
  assert.ok(Number.isInteger(policy.precision)&&policy.precision>=0&&policy.precision<=8);
  assert.ok(policy.absoluteTolerance>0&&policy.relativeTolerance===0);
  assert.ok(policy.solution.includes('\n')&&policy.assumptions.length>25);
  assert.equal(physics.validateAnswer(String(expected),expected,policy.absoluteTolerance).correct,true);
  assert.equal(physics.validateAnswer(String(expected+2*policy.absoluteTolerance),expected,policy.absoluteTolerance).correct,false);
  assert.equal(physics.validateAnswer(String(expected+policy.absoluteTolerance/2),expected,policy.absoluteTolerance).correct,true);
 });
 test(id+' : page, unités, hypothèses et schéma',()=>{
  const html=fs.readFileSync('missions/'+id+'.html','utf8');
  const match=html.match(/window\.SI_MISSION=(\{[^<]+\})<\/script>/);
  assert.ok(match,id+' configuration absente');
  const c=JSON.parse(match[1]);
  assert.ok(Math.abs(physics.calculate(id,c.initial)-c.expected)<1e-8*Math.max(1,Math.abs(c.expected)));
  assert.ok([...html.matchAll(/<text x="420" y="218" fill="white">([^<]+)<\/text>/g)].some(m=>m[1].includes(c.inputUnit)),id+' unité d’axe');
  assert.ok(html.includes('Hypothèses et domaine : '));
  assert.ok(html.includes('Corrigé après trois essais'));
  assert.ok(!html.includes('Tolérance : 1 % ou 0,02 unité.'));
  const svg=diagrams.render(id,c.initial,c.expected);
  assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);
  assert.ok(!svg.includes('NaN')&&!svg.includes('Infinity'));
 });
}
test('saisie française, milliers, invalides non consommables',()=>{
 for(const [raw,expected] of [['1 234,5',1234.5],['1 234,5',1234.5],['-0,25',-.25],['.5',.5],['0,000500',.0005]])assert.equal(physics.parseAnswer(raw),expected);
 for(const raw of ['', '1e3','0x10','NaN','Infinity','12 N','1,2,3','1 23'])assert.equal(physics.validateAnswer(raw,10,.1).valid,false,raw);
});
test('domaines physiques : zéro, singularités et géométrie discrète',()=>{
 for(const [id,x] of [['angular-accel-01',0],['sampling-01',0],['gear-mesh-01',0],['gear-mesh-01',22.5],['incline-force-01',91],['efficiency-chain-01',1.01]])assert.throws(()=>physics.calculate(id,x),RangeError);
});
test('invariants des transmissions, énergie et mesure',()=>{
 for(const z2 of [10,20,40,60]){const d=spatial.describe('gear-mesh-01',z2);assert.equal(d.centerDistance,d.r1+d.r2);assert.ok(Math.abs(d.angularRatio*z2+20)<1e-12)}
 for(const n of [100,900,1500]){const d=spatial.describe('belt-speed-01',n);assert.ok(Math.abs(d.beltSpeed-d.angularSpeed*d.radius)<1e-12)}
 for(const x of [0,.5,1])assert.ok(physics.calculate('efficiency-chain-01',x)<=.92+1e-12);
 for(const x of [78,79,80,81,82])assert.equal(physics.calculate('measurement-relative-01',160-x),physics.calculate('measurement-relative-01',x));
});
for(const id of spatial.allowed){
 test(id+' : projection spatiale, caméra, zoom et cinématique justifiée',()=>{
  const html=fs.readFileSync('missions/'+id+'.html','utf8');
  assert.ok(html.includes('src/scene3d.js'));
  const c=JSON.parse(html.match(/window\.SI_MISSION=(\{[^<]+\})<\/script>/)[1]);
  const a=spatial.render(id,.3,.4,c.initial,{time:.1,zoom:1});
  const b=spatial.render(id,.9,.4,c.initial,{time:.1,zoom:1});
  const z=spatial.render(id,.3,.4,c.initial,{time:.1,zoom:1.2});
  assert.notEqual(a,b);assert.notEqual(a,z);
  assert.ok(!a.includes('NaN')&&!a.includes('Infinity'));
  const later=spatial.render(id,.3,.4,c.initial,{time:.8,zoom:1});
  if(spatial.animated.has(id))assert.notEqual(a,later);else assert.equal(a,later);
 });
}
test('aucune scène spatiale artificielle pour un modèle plan',()=>assert.throws(()=>spatial.render('heat-transfer-01',.2,.3,15),RangeError));
