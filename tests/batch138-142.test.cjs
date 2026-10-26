'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const engine=require('../src/investigations.js'),diagram=require('../src/investigation-diagrams.js'),cat=require('../src/catalog.js');
const cases=[{"id":"hydraulic-oil-compressibility-01","min":0,"max":200,"initial":120,"expected":16,"unit":"mL","input":"bar","tol":0.1},{"id":"hollow-shaft-polar-inertia-01","min":20,"max":50,"initial":40,"expected":102.10176124166827,"unit":"cm⁴","input":"mm","tol":0.2},{"id":"wheel-braking-slip-01","min":0,"max":12.5,"initial":10,"expected":20,"unit":"%","input":"rad/s","tol":0.2},{"id":"lumped-cooling-time-constant-01","min":10,"max":80,"initial":40,"expected":172.5,"unit":"s","input":"W/(m²·K)","tol":1},{"id":"adc-voltage-step-01","min":2,"max":12,"initial":10,"expected":2.44140625,"unit":"mV","input":"V","tol":0.01}];
const independent={
"hydraulic-oil-compressibility-01":x=>2*x/15,
"hollow-shaft-polar-inertia-01":x=>Math.PI/32*(Math.pow(60,4)-Math.pow(x,4))/10000,
"wheel-braking-slip-01":x=>100-8*x,
"lumped-cooling-time-constant-01":x=>6900/x,
"adc-voltage-step-01":x=>x*125/512,
};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
test('138–142 : catalogue unique, 17 univers, accueil protégé',()=>{assert.equal(cat.levels.length,142);assert.equal(new Set(cat.levels.map(x=>x.id)).size,142);assert.equal(cat.worlds.length,17);assert.match(fs.readFileSync('index.html','utf8'),/id="island-map"/)});
for(const c of cases)test(c.id+' : calcul indépendant, bornes, graphique, consignes',()=>{
 const html=fs.readFileSync('missions/'+c.id+'.html','utf8'),cfg=JSON.parse(html.match(/window\.SI_MISSION=(\{.*?\})<\/script>/)[1]);
 assert.equal(cfg.unit,c.unit);assert.equal(cfg.inputUnit,c.input);near(cfg.expected,c.expected);
 for(const x of [c.min,c.initial,(c.min+c.max)/2,c.max]){const y=engine.calculate(c.id,x);near(y,independent[c.id](x));const svg=diagram.render(c.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-/);assert.ok(svg.includes(c.unit)&&svg.includes(c.input));assert.doesNotMatch(svg,/NaN|Infinity|undefined/)}
 for(const x of [c.min-0.01,c.max+0.01,NaN,Infinity])assert.throws(()=>engine.calculate(c.id,x),RangeError);
 assert.ok(engine.answerPolicy[c.id].assumptions.length>180);assert.match(engine.answerPolicy[c.id].solution,/Contrôle/);
 for(const marker of ['Questions flash','Prérequis','Hypothèses','id="hint"','id="solution"','id="trialValue"','id="log"','id="reset"','investigation-mission.js'])assert.ok(html.includes(marker),marker);
 assert.match(html,/id="solution"[^>]*disabled/);assert.match(html,/id="trialValue"[^>]*disabled/);
 assert.ok(engine.validateAnswer(String(c.expected),c.expected,c.tol).correct);assert.ok(!engine.validateAnswer(String(c.expected+2*c.tol),c.expected,c.tol).correct);
});
test('invariants scientifiques indépendants',()=>{
 const f=(id,x)=>engine.calculate(id,x);
 near(f('hydraulic-oil-compressibility-01',0),0);near(f('hydraulic-oil-compressibility-01',200),2*f('hydraulic-oil-compressibility-01',100));
 assert.ok(f('hollow-shaft-polar-inertia-01',20)>f('hollow-shaft-polar-inertia-01',50));
 near(f('wheel-braking-slip-01',12.5),0);near(f('wheel-braking-slip-01',0),100);
 near(f('lumped-cooling-time-constant-01',20),2*f('lumped-cooling-time-constant-01',40));
 near(f('adc-voltage-step-01',12),2*f('adc-voltage-step-01',6));
});
test('audit 40–75 : prérequis et domaine engrenage/vis',()=>{
 for(const id of ['gear-ratio-02','screw-lead-01']){const h=fs.readFileSync('missions/'+id+'.html','utf8');assert.match(h,/Questions flash/);assert.match(h,/Prérequis/);assert.match(h,/Hypothèses/)}
 for(const z of [24,54,90])near(engine.calculate('gear-ratio-02',z),18/z);
 assert.throws(()=>engine.calculate('gear-ratio-02',54.5),RangeError);
 for(const p of [1,2,4])near(engine.calculate('screw-lead-01',p),2*p);
});

test('contre-audit : la constante thermique a des légendes physiques correctes',()=>{const svg=diagram.render('lumped-cooling-time-constant-01',40,engine.calculate('lumped-cooling-time-constant-01',40));assert.match(svg,/h = 40 W\/\(m²·K\)/);assert.match(svg,/τ ≈ 172,5 s/);assert.doesNotMatch(svg,/Δp = 40/)});
