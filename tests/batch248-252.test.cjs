'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch248-252.js'),C=require('../src/catalog.js');
const cases=[{"id":"hydrostatic-center-pressure-01","x":1.5,"min":0,"max":5,"expected":2.3333333333333335,"iu":"m","u":"m","w":"SI-06","tol":0.02},{"id":"induction-rotor-frequency-01","x":0.04,"min":0,"max":0.12,"expected":2,"iu":"sans unité","u":"Hz","w":"SI-08","tol":0.1},{"id":"fillet-weld-double-shear-01","x":6,"min":0,"max":12,"expected":8.838834764831844,"iu":"kN","u":"MPa","w":"SI-04","tol":0.15},{"id":"parallel-plate-capacitance-01","x":1,"min":0.5,"max":5,"expected":0.531251268768,"iu":"mm","u":"nF","w":"SI-08","tol":0.01},{"id":"isotropic-volume-expansion-01","x":50,"min":-30,"max":100,"expected":6.9,"iu":"K","u":"mL","w":"SI-12","tol":0.15}];
const refs={
'hydrostatic-center-pressure-01':x=>x+.75+1.5**2/(12*(x+.75)),
'induction-rotor-frequency-01':x=>x*50,
'fillet-weld-double-shear-01':x=>1000*x*Math.SQRT2/(960),
'parallel-plate-capacitance-01':x=>(8.8541878128e-12*0.06)/(x/1000)*1e9,
'isotropic-volume-expansion-01':x=>2000*x*(69/1e6)
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const q of cases)test(q.id+' : cinq états, modèle indépendant, SVG, unités et invalides',()=>{
const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x),svg=D.render(q.id,x,y);near(y,refs[q.id](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-parameter=/);assert.ok(svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/)}
for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
assert.ok(M.answerPolicy[q.id].solution.length>300);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/aucune animation temporelle artificielle/);assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('propriétés et décisions : états limites physiquement cohérents',()=>{
near(M.calculate(cases[0].id,0),1);near(M.calculate(cases[1].id,0),0);
near(M.calculate(cases[2].id,12),2*M.calculate(cases[2].id,6));
near(M.calculate(cases[3].id,2),M.calculate(cases[3].id,1)/2);
near(M.calculate(cases[4].id,-30),-4.14);
for(const q of cases)assert.equal(M.assess(q.id,q.max).acceptable,false);
});
test('géométrie paramétrique et forces nulles',()=>{
const a=D.render(cases[0].id,0,M.calculate(cases[0].id,0));assert.match(a,/data-centre-pression-y-px=/);
const b=D.render(cases[2].id,0,0);assert.doesNotMatch(b,/data-effort-longueur-px=/);
const c=D.render(cases[3].id,5,M.calculate(cases[3].id,5));assert.match(c,/data-entrefer-px="55"/);
const d=D.render(cases[4].id,0,0);assert.match(d,/data-volume-largeur-px="145"/);
});
test('catalogue extensible : 252 identifiants uniques, 17 univers, cinq sous-savoirs',()=>{
assert.ok(C.levels.length>=252);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
assert.equal(new Set(C.levels.map(x=>x.world)).size,17);assert.equal(new Set(cases.map(q=>C.byId(q.id).subskill)).size,5);
});
test('régression historique : résistance au roulement proportionnelle à cᵣ',()=>{
const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');
for(const x of [0,.01,.025,.05]){const svg=G.render('rolling-load-01',x,B.calculate('rolling-load-01',x));
const match=svg.match(/data-roulement-longueur-px="([0-9.]+)"/);
if(x===0)assert.equal(match,null);else{assert.ok(match);near(Number(match[1]),110*x/.05)}}
const html=fs.readFileSync('missions/rolling-load-01.html','utf8');assert.match(html,/cᵣ \(sans unité\)/);
});
