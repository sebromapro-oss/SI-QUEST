'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const model=require('../src/investigations.js'),svg=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[{"id":"safety-stop-separation-01","x":1.4,"min":0,"max":2,"expected":0.7499999999999999,"tol":0.005,"u":"m","iu":"m/s","w":"SI-16"},{"id":"safety-proof-test-pfd-01","x":4380,"min":0,"max":8760,"expected":0.438,"tol":0.005,"u":"%","iu":"h","w":"SI-16"},{"id":"production-bottleneck-01","x":55,"min":10,"max":100,"expected":55,"tol":0.1,"u":"pièces/h","iu":"pièces/h","w":"SI-17"},{"id":"electrohydraulic-drive-current-01","x":100,"min":0,"max":200,"expected":52.083333333333336,"tol":0.1,"u":"A","iu":"bar","w":"SI-17"},{"id":"material-thermal-diffusivity-01","x":45,"min":5,"max":100,"expected":11.538461538461538,"tol":0.05,"u":"mm²/s","iu":"W/(m·K)","w":"SI-14"}];
const independent={"safety-stop-separation-01":x=>x*45/100+12/100,"safety-proof-test-pfd-01":x=>x/10000,"production-bottleneck-01":x=>x<60?x:60,"electrohydraulic-drive-current-01":x=>x*25/48,"material-thermal-diffusivity-01":x=>x/3.9};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const c of cases)test(c.id+' : contre-calcul, bornes, unités et SVG',()=>{
 const html=fs.readFileSync('missions/'+c.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(catalog.byId(c.id).world,c.w);assert.equal(model.criteria[c.id].unit,c.u);assert.equal(model.inputUnits[c.id],c.iu);
 near(model.calculate(c.id,c.x),c.expected);near(cfg.expected,c.expected);
 for(const x of [c.min,(c.min+c.x)/2,c.x,(c.x+c.max)/2,c.max]){const y=model.calculate(c.id,x);near(y,independent[c.id](x));const d=svg.render(c.id,x,y);assert.match(d,/<title/);assert.match(d,/<desc/);assert.match(d,/data-/);assert.ok(d.includes(c.u)&&d.includes(c.iu));assert.doesNotMatch(d,/NaN|Infinity|undefined/)}
 for(const x of [c.min-.001,c.max+.001,NaN,Infinity])assert.throws(()=>model.calculate(c.id,x),RangeError);
 assert.ok(model.answerPolicy[c.id].solution.length>200);assert.ok(model.answerPolicy[c.id].assumptions.length>100);
 assert.equal(model.validateAnswer(String(c.expected).replace('.',','),c.expected,c.tol).correct,true);
 assert.match(html,/Questions flash/);assert.match(html,/Prérequis/);assert.match(html,/Hypothèses/);assert.match(html,/id="hint"/);assert.match(html,/id="solution"/);assert.match(html,/id="trialValue"/);
});
test('invariants indépendants',()=>{near(model.calculate('production-bottleneck-01',80),60);near(model.calculate('production-bottleneck-01',100),60);near(model.calculate('electrohydraulic-drive-current-01',200),2*model.calculate('electrohydraulic-drive-current-01',100));near(model.calculate('material-thermal-diffusivity-01',90),2*model.calculate('material-thermal-diffusivity-01',45));near(model.calculate('safety-proof-test-pfd-01',8760),2*model.calculate('safety-proof-test-pfd-01',4380))});
test('mission 40–75 : vecteurs de résultante à échelle commune et Fy nul',()=>{for(const fy of [0,100,400,800]){const R=Math.hypot(300,fy),d=svg.render('resultant-01',fy,model.calculate('resultant-01',fy));assert.ok(d.includes('data-fx-n="300"'));assert.ok(d.includes('data-fy-n="'+fy.toFixed(5)+'"'));assert.ok(d.includes('data-resultant-n="'+R.toFixed(7)+'"'));assert.equal((d.match(/marker-end=/g)||[]).length,fy===0?1:3)}assert.match(fs.readFileSync('missions/resultant-01.html','utf8'),/Fᵧ variable de 0 à 800 N/)});
