'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const m=require('../src/investigations.js'),d=require('../src/investigation-diagrams.js'),cat=require('../src/catalog.js');
const ids=["hydraulic-relief-setpoint-01","beam-support-reaction-01","lc-resonance-01","screw-efficiency-01","adiabatic-compressor-01"];
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
function cfg(id){const html=fs.readFileSync('missions/'+id+'.html','utf8');return JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);}
test('Lot 98–102 : catalogue, pages, politiques, schémas et navigation archipel',()=>{
 assert.equal(cat.levels.length,102);assert.equal(new Set(cat.levels.map(x=>x.id)).size,102);
 const home=fs.readFileSync('index.html','utf8');assert.match(home,/id="islands"/);
 for(const id of ids){const c=cfg(id),level=cat.byId(id);assert.ok(level);assert.equal(c.world,level.world);assert.equal(c.unit,m.criteria[id].unit);assert.equal(c.inputUnit,m.inputUnits[id]);near(c.expected,m.calculate(id,c.initial));assert.ok(m.answerPolicy[id].assumptions.length>160);assert.ok(m.answerPolicy[id].solution.length>120);for(const x of [c.min,c.initial,c.max]){const y=m.calculate(id,x),svg=d.render(id,x,y);assert.ok(Number.isFinite(y));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.ok(svg.includes(c.inputUnit));assert.ok(svg.includes(c.unit));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}}
});
test('98 soupape : équilibre F = pA, tarage nul et domaine',()=>{
 for(const x of [0,5,15,25]){const p=m.calculate(ids[0],x);near(p*1e5*100e-6,80*x);near(p,8*x);}
 near(m.calculate(ids[0],15),120);assert.equal(m.assess(ids[0],15).acceptable,true);assert.equal(m.assess(ids[0],25).acceptable,false);
 for(const x of [-.1,25.01])assert.throws(()=>m.calculate(ids[0],x),RangeError);
 const a=d.render(ids[0],0,0),b=d.render(ids[0],25,200);assert.notEqual(a,b);assert.match(b,/data-spring-end/);
});
test('99 poutre : forces et moments indépendants, cas charge sur appuis',()=>{
 for(const a of [0,.25,.75,1.5,2]){const ra=m.calculate(ids[1],a),rb=8-ra;near(ra+rb,8);near(rb*2,8*a);near(ra*2,8*(2-a));const svg=d.render(ids[1],a,ra);assert.match(svg,/data-reaction-sum-kN="8.000"/);}
 near(m.calculate(ids[1],.75),5);assert.throws(()=>m.calculate(ids[1],2.001),RangeError);
});
test('100 LC : invariants ω²LC = 1, croissance de C et domaine',()=>{
 for(const C of [10,22,47,100]){const f=m.calculate(ids[2],C);near((2*Math.PI*f)**2*.05*C*1e-6,1,1e-9);}
 near(m.calculate(ids[2],4*10),m.calculate(ids[2],10)/2);
 for(const C of [0,9.99,100.01])assert.throws(()=>m.calculate(ids[2],C),RangeError);
 assert.match(d.render(ids[2],47,m.calculate(ids[2],47)),/data-capacitance-uF="47"/);
});
test('101 vis : bilan travail utile/entrée, η(0)=1 et décroissance',()=>{
 const lambda=8*Math.PI/180;for(const mu of [0,.05,.15,.3]){const torquePerFr=Math.tan(lambda+Math.atan(mu)),eta=Math.tan(lambda)/torquePerFr;near(m.calculate(ids[3],mu),eta);}
 near(m.calculate(ids[3],0),1);assert.ok(m.calculate(ids[3],.3)<m.calculate(ids[3],.15));assert.throws(()=>m.calculate(ids[3],.301),RangeError);
 assert.match(d.render(ids[3],.15,m.calculate(ids[3],.15)),/data-helix-angle-deg="8"/);
});
test('102 compresseur : relation isentropique et volume, limite p₂=p₁',()=>{
 const gamma=1.4;for(const p of [1,2,5,8]){const T=m.calculate(ids[4],p)+273.15,Vratio=Math.pow(1/p,1/gamma);near(T/293.15,Math.pow(1/Vratio,gamma-1));const svg=d.render(ids[4],p,m.calculate(ids[4],p));assert.match(svg,/data-volume-ratio/);}
 near(m.calculate(ids[4],1),20);assert.throws(()=>m.calculate(ids[4],.99),RangeError);assert.throws(()=>m.calculate(ids[4],8.01),RangeError);
});
test('Contrôle des réponses : trois politiques de tolérance propres aux missions',()=>{
 for(const id of ids){const c=cfg(id),q=m.answerPolicy[id];assert.equal(m.validateAnswer(String(c.expected).replace('.',','),c.expected,q.absoluteTolerance,0).correct,true);assert.equal(m.validateAnswer(String(c.expected+2*q.absoluteTolerance),c.expected,q.absoluteTolerance,0).correct,false);assert.equal(m.validateAnswer('abc',c.expected,q.absoluteTolerance,0).valid,false);}
});
