'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const model=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[{"id":"bearing-projected-pressure-01","initial":18,"min":0,"max":30,"expected":13.333333333333334,"tol":0.02,"unit":"MPa","inputUnit":"kN"},{"id":"inductor-reactance-frequency-01","initial":50,"min":0,"max":400,"expected":25.132741228718345,"tol":0.05,"unit":"Ω","inputUnit":"Hz"},{"id":"coolant-thermal-power-01","initial":8,"min":0,"max":20,"expected":3.337312,"tol":0.02,"unit":"kW","inputUnit":"L/min"},{"id":"brake-disc-adiabatic-rise-01","initial":36,"min":0,"max":72,"expected":4.076086956521739,"tol":0.02,"unit":"K","inputUnit":"km/h"},{"id":"encoder-linear-resolution-01","initial":120,"min":20,"max":300,"expected":0.09203884727313846,"tol":0.0005,"unit":"mm/compte","inputUnit":"mm"}];
const independent={
'bearing-projected-pressure-01':x=>x/1.35,
'inductor-reactance-frequency-01':x=>x*0.5026548245743669,
'coolant-thermal-power-01':x=>x*0.417164,
'brake-disc-adiabatic-rise-01':x=>x*x*(1200/(3.6*3.6))/(2*14720),
'encoder-linear-resolution-01':x=>x*0.0007669903939428206
};
function near(a,b){assert.ok(Math.abs(a-b)<1e-7*Math.max(1,Math.abs(b)),a+' ≠ '+b)}
for(const c of cases)test(c.id+' : contre-calcul, bornes, unités, SVG, propriétés',()=>{
 const h=fs.readFileSync('missions/'+c.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,c.id);assert.equal(catalog.byId(c.id).subskill.length>20,true);assert.equal(model.criteria[c.id].unit,c.unit);assert.equal(model.inputUnits[c.id],c.inputUnit);
 near(model.calculate(c.id,c.initial),c.expected);
 for(const x of [c.min,(c.min+c.initial)/2,c.initial,(c.initial+c.max)/2,c.max]){
  const y=model.calculate(c.id,x);near(y,independent[c.id](x));const svg=diagrams.render(c.id,x,y);
  assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-/);assert.ok(svg.includes(c.unit)&&svg.includes(c.inputUnit));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 for(const x of [c.min-.01,c.max+.01,NaN,Infinity])assert.throws(()=>model.calculate(c.id,x),RangeError);
 assert.ok(model.answerPolicy[c.id].solution.length>200);assert.ok(model.answerPolicy[c.id].assumptions.length>100);
 assert.equal(model.validateAnswer(String(c.expected).replace('.',','),c.expected,c.tol).correct,true);
 assert.match(h,/Questions flash/);assert.match(h,/Prérequis/);assert.match(h,/Hypothèses/);assert.match(h,/id="hint"/);assert.match(h,/id="solution"/);assert.match(h,/id="trialValue"/);assert.match(h,/id="log"/);
});
test('vecteurs nuls sur nouveaux modèles',()=>{for(const id of ['bearing-projected-pressure-01','coolant-thermal-power-01','brake-disc-adiabatic-rise-01']){assert.doesNotMatch(diagrams.render(id,0,model.calculate(id,0)),/marker-end=/);assert.match(diagrams.render(id,1,model.calculate(id,1)),/marker-end=/)}});
test('roulement historique : pas de force motrice fictive',()=>{for(const x of [0,.2,.6]){const svg=diagrams.render('rolling-load-01',x,model.calculate('rolling-load-01',x));assert.doesNotMatch(svg,/x1="350" y1="130" x2="445"/);assert.ok(svg.includes('Fᵣ'))}assert.doesNotMatch(diagrams.render('rolling-load-01',0,0),/x1="275" y1="190" x2="165"/);assert.match(diagrams.render('rolling-load-01',.2,1600),/data-roulement-application="axe"/)});
test('invariants indépendants : doublement et énergie',()=>{near(model.calculate('bearing-projected-pressure-01',20),2*model.calculate('bearing-projected-pressure-01',10));near(model.calculate('inductor-reactance-frequency-01',100),2*model.calculate('inductor-reactance-frequency-01',50));near(model.calculate('coolant-thermal-power-01',16),2*model.calculate('coolant-thermal-power-01',8));near(model.calculate('brake-disc-adiabatic-rise-01',72),4*model.calculate('brake-disc-adiabatic-rise-01',36));near(model.calculate('encoder-linear-resolution-01',240),2*model.calculate('encoder-linear-resolution-01',120))});
