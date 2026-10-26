'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const m=require('../src/investigations.js'),d=require('../src/investigation-diagrams.js'),cat=require('../src/catalog.js');
const cases=[{"id":"accumulator-polytropic-delivery-01","min":110,"max":170,"initial":120,"expected":2.207468204229576,"unit":"L","inputUnit":"bar abs","tol":0.01,"sub":"Volume d’huile utile en détente polytropique"},{"id":"three-phase-capacitor-sizing-01","min":0.8,"max":0.99,"initial":0.95,"expected":55.03110399644478,"unit":"µF","inputUnit":"sans unité","tol":0.2,"sub":"Capacité par branche pour corriger le facteur de puissance"},{"id":"pump-affinity-power-01","min":600,"max":1600,"initial":1500,"expected":15.625,"unit":"kW","inputUnit":"tr/min","tol":0.05,"sub":"Loi cubique de puissance en similitude hydraulique"},{"id":"spring-stored-energy-01","min":0,"max":80,"initial":50,"expected":22.5,"unit":"J","inputUnit":"mm","tol":0.1,"sub":"Énergie stockée dans un ressort linéaire"},{"id":"goodman-fatigue-factor-01","min":0,"max":180,"initial":60,"expected":1.836734693877551,"unit":"sans unité","inputUnit":"MPa","tol":0.01,"sub":"Facteur de sécurité simplifié en fatigue selon Goodman"}];
const independent={
'accumulator-polytropic-delivery-01':x=>10*(Math.exp(Math.log(100/x)/1.4)-Math.exp(Math.log(100/180)/1.4)),
'three-phase-capacitor-sizing-01':x=>15000*(Math.tan(Math.acos(.75))-Math.tan(Math.acos(x)))/(6*Math.PI*50*400**2)*1e6,
'pump-affinity-power-01':x=>8*(x/1200)*(x/1200)*(x/1200),
'spring-stored-energy-01':x=>9*x*x/1000,
'goodman-fatigue-factor-01':x=>108000/(48000+180*x)};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
test('133–137 : catalogue et accueil',()=>{assert.ok(cat.levels.length>=137);assert.equal(new Set(cat.levels.map(x=>x.id)).size,cat.levels.length);assert.equal(new Set(cases.map(c=>cat.byId(c.id).subskill)).size,5);assert.match(fs.readFileSync('index.html','utf8'),/id="island-map"/)});
for(const c of cases)test(c.id+' : modèle, bornes, SVG, pédagogie',()=>{
 const h=fs.readFileSync('missions/'+c.id+'.html','utf8'),cfg=JSON.parse(h.match(/window\.SI_MISSION=(\{.*?\})<\/script>/)[1]);
 assert.equal(cfg.unit,m.criteria[c.id].unit);assert.equal(cfg.inputUnit,m.inputUnits[c.id]);near(cfg.expected,c.expected);
 for(const x of [c.min,c.initial,(c.min+c.max)/2,c.max]){const y=m.calculate(c.id,x);near(y,independent[c.id](x));const svg=d.render(c.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-/);assert.ok(svg.includes(c.unit)&&svg.includes(c.inputUnit));assert.doesNotMatch(svg,/NaN|Infinity|undefined/)}
 for(const x of [c.min-1,c.max+1,NaN,Infinity])assert.throws(()=>m.calculate(c.id,x),RangeError);
 assert.ok(m.answerPolicy[c.id].assumptions.length>160&&m.answerPolicy[c.id].solution.includes('Contrôle'));
 assert.ok(m.validateAnswer(String(c.expected),c.expected,c.tol).correct);assert.ok(!m.validateAnswer(String(c.expected+2*c.tol),c.expected,c.tol).correct);
 for(const word of ['Questions flash','Prérequis','Hypothèses','id="hint"','id="solution"','id="trialValue"','id="log"','id="reset"','investigation-mission.js'])assert.ok(h.includes(word),word);
 assert.match(h,/id="solution"[^>]*disabled/);assert.match(h,/id="trialValue"[^>]*disabled/);
});
test('invariants et critères fictifs',()=>{const f=(id,x)=>m.calculate(id,x);assert.ok(f(cases[0].id,110)>f(cases[0].id,170));assert.ok(f(cases[1].id,.95)>f(cases[1].id,.8));near(f(cases[2].id,1200),8);near(f(cases[3].id,80),4*f(cases[3].id,40));assert.ok(f(cases[4].id,180)<f(cases[4].id,0));assert.equal(m.assess(cases[4].id,180).acceptable,false)});
test('audit 40–75 : tige rigide, résistance thermique',()=>{
 for(const x of [50,100,200,300,400]){const s=d.render('pneumatic-consumption-01',x,m.calculate('pneumatic-consumption-01',x));assert.match(s,/data-rod-length-px="255"/);const end=Number(s.match(/data-rod-end-x="([0-9.]+)"/)[1]),p=Number(s.match(/data-piston-x="([0-9.]+)"/g).at(-1).match(/"([0-9.]+)"/)[1]);near(end-p,267);assert.ok(end>405&&end<600)}
 for(const x of [.2,.8,2]){const s=d.render('thermal-resistance-01',x,m.calculate('thermal-resistance-01',x));assert.match(s,/data-wall-thickness-m="0.12"/);assert.match(s,/Chaud/);assert.match(s,/Froid/);near(m.calculate('thermal-resistance-01',x),.12/(2*x))}
 for(const id of ['pneumatic-consumption-01','thermal-resistance-01'])assert.match(fs.readFileSync('missions/'+id+'.html','utf8'),/Questions flash/);
});