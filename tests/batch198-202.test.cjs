'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const model=require('../src/investigations.js'),svg=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[{"id":"rotor-centripetal-acceleration-01","x":600,"min":0,"max":1800,"expected":710.6115168784338,"tol":0.1,"u":"m/s²","iu":"tr/min","w":"SI-01"},{"id":"parallel-thermal-bridges-01","x":0.8,"min":0.1,"max":2,"expected":38.400000000000006,"tol":0.1,"u":"W","iu":"W/(m·K)","w":"SI-12"},{"id":"sampling-alias-frequency-01","x":120,"min":110,"max":240,"expected":45,"tol":0.05,"u":"Hz","iu":"Hz","w":"SI-09"},{"id":"regenerative-cylinder-speed-01","x":8,"min":2,"max":20,"expected":0.1061032953945969,"tol":0.001,"u":"m/s","iu":"L/min","w":"SI-06"},{"id":"buoyancy-immersed-volume-01","x":30,"min":0,"max":100,"expected":294.3,"tol":0.2,"u":"N","iu":"L","w":"SI-02"}];
const independent={
"rotor-centripetal-acceleration-01":x=>.18*(x*Math.PI/30)**2,
"parallel-thermal-bridges-01":x=>6.4+40*x,
"sampling-alias-frequency-01":x=>x<150?x-75:75,
"regenerative-cylinder-speed-01":x=>x/(60*Math.PI*.04**2/4*1000),
"buoyancy-immersed-volume-01":x=>9.81*x
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const c of cases)test(c.id+' : contre-calcul indépendant, domaine, unités et géométrie SVG',()=>{
 const html=fs.readFileSync('missions/'+c.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(catalog.byId(c.id).world,c.w);assert.equal(model.criteria[c.id].unit,c.u);assert.equal(model.inputUnits[c.id],c.iu);
 near(model.calculate(c.id,c.x),c.expected);near(cfg.expected,c.expected);
 for(const x of [c.min,(c.min+c.x)/2,c.x,(c.x+c.max)/2,c.max]){const y=model.calculate(c.id,x);near(y,independent[c.id](x));const d=svg.render(c.id,x,y);assert.match(d,/<title/);assert.match(d,/<desc/);assert.match(d,/data-/);assert.ok(d.includes(c.u)&&d.includes(c.iu));assert.doesNotMatch(d,/NaN|Infinity|undefined/);}
 for(const x of [c.min-.001,c.max+.001,NaN,Infinity])assert.throws(()=>model.calculate(c.id,x),RangeError);
 assert.ok(model.answerPolicy[c.id].solution.length>200);assert.ok(model.answerPolicy[c.id].assumptions.length>100);
 assert.equal(model.validateAnswer(String(c.expected).replace('.',','),c.expected,c.tol).correct,true);
 assert.match(html,/Questions flash/);assert.match(html,/Prérequis/);assert.match(html,/Hypothèses/);assert.match(html,/id="hint"/);assert.match(html,/id="solution"/);assert.match(html,/id="trialValue"/);
});
test('repliement : frontière stricte de Nyquist',()=>{for(const x of [120,149,150,151,200]){const y=model.calculate('sampling-alias-frequency-01',x);near(y,x<150?x-75:75);assert.equal(model.assess('sampling-alias-frequency-01',x).acceptable,x>150);}});
test('pente : norme du vecteur tangentiel proportionnelle à sin θ',()=>{for(const x of [0,30,60,90]){const d=svg.render('incline-force-01',x,model.calculate('incline-force-01',x));const a=Number(d.match(/data-vector-length-px="([^"]+)"/)[1]);near(a,Number((60*Math.sin(x*Math.PI/180)).toFixed(5)));assert.equal((d.match(/marker-end=/g)||[]).length,x===0?1:2);}});
test('invariants : rotor quadratique, ponts additifs, régénération linéaire, poussée linéaire',()=>{near(model.calculate('rotor-centripetal-acceleration-01',1200),4*model.calculate('rotor-centripetal-acceleration-01',600));near(model.calculate('parallel-thermal-bridges-01',.8)-model.calculate('parallel-thermal-bridges-01',.4),16);near(model.calculate('regenerative-cylinder-speed-01',16),2*model.calculate('regenerative-cylinder-speed-01',8));near(model.calculate('buoyancy-immersed-volume-01',60),2*model.calculate('buoyancy-immersed-volume-01',30));});
