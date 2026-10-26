'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const engine=require('../src/investigations.js'),diagram=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const cases=[{"id":"combined-stress-von-mises-01","x":40,"min":0,"max":100,"expected":138.5640646055102,"input":"MPa","unit":"MPa","tol":0.25},{"id":"pt100-linear-response-01","x":80,"min":0,"max":150,"expected":130.8,"input":"°C","unit":"Ω","tol":0.2},{"id":"torsional-eigenfrequency-01","x":1250,"min":500,"max":2000,"expected":1.9894367886486917,"input":"N·m/rad","unit":"Hz","tol":0.02},{"id":"laminar-darcy-factor-01","x":1000,"min":400,"max":2000,"expected":0.064,"input":"sans unité","unit":"sans unité","tol":0.0005},{"id":"triangle-actuator-angle-01","x":0.7,"min":0.25,"max":1.05,"expected":76.65763620291176,"input":"m","unit":"°","tol":0.15}];
const independent={
'combined-stress-von-mises-01':x=>Math.sqrt(14400+3*x*x),
'pt100-linear-response-01':x=>100+.385*x,
'torsional-eigenfrequency-01':x=>Math.sqrt(x/8)/(2*Math.PI),
'laminar-darcy-factor-01':x=>64/x,
'triangle-actuator-angle-01':x=>Math.atan2(Math.sqrt(1-((.625-x*x)/.585)**2),(.625-x*x)/.585)*180/Math.PI
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8*Math.max(1,Math.abs(b)),a+' != '+b);
test('143-147 : catalogue unique, sous-savoirs distincts',()=>{assert.ok(catalog.levels.length>=147);assert.equal(new Set(catalog.levels.map(x=>x.id)).size,catalog.levels.length);assert.equal(new Set(cases.map(c=>catalog.byId(c.id).subskill)).size,5);assert.equal(catalog.worlds.length,17)});
for(const c of cases)test(c.id+' : calcul, domaine, SVG, pédagogie',()=>{
 const h=fs.readFileSync('missions/'+c.id+'.html','utf8');
 const cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.unit,c.unit);assert.equal(cfg.inputUnit,c.input);near(cfg.expected,c.expected);
 for(const x of [c.min,c.x,(c.min+c.max)/2,c.max]){const y=engine.calculate(c.id,x);near(y,independent[c.id](x));const svg=diagram.render(c.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-/);assert.ok(svg.includes(c.unit)&&svg.includes(c.input));assert.doesNotMatch(svg,/NaN|Infinity|undefined/)}
 for(const x of [c.min-.001,c.max+.001,NaN,Infinity])assert.throws(()=>engine.calculate(c.id,x),RangeError);
 assert.ok(engine.answerPolicy[c.id].assumptions.length>150);
 for(const marker of ['Questions flash','Prérequis','Hypothèses','id="hint"','id="solution"','id="trialValue"','id="log"','id="reset"','investigation-mission.js'])assert.ok(h.includes(marker),marker);
 assert.ok(engine.validateAnswer(String(c.expected),c.expected,c.tol).correct);assert.ok(!engine.validateAnswer(String(c.expected+2*c.tol),c.expected,c.tol).correct);
});
test('invariants et correction de volume hydraulique',()=>{
 const f=(id,x)=>engine.calculate(id,x);
 near(f('combined-stress-von-mises-01',0),120);near(f('pt100-linear-response-01',0),100);
 near(f('torsional-eigenfrequency-01',2000),2*f('torsional-eigenfrequency-01',500));
 near(f('laminar-darcy-factor-01',1000),2*f('laminar-darcy-factor-01',2000));
 assert.ok(f('triangle-actuator-angle-01',.25)<f('triangle-actuator-angle-01',1.05));
 const width=x=>Number(diagram.render('hydraulic-oil-compressibility-01',x,f('hydraulic-oil-compressibility-01',x)).split('data-fluid-length-px="')[1].split('"')[0]);
 near(width(0),305);assert.ok(Math.abs((width(0)-width(200))/305-f('hydraulic-oil-compressibility-01',200)/2000)<1e-5);
});
