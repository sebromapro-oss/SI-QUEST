'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const engine=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const catalogue=require('../src/catalog.js');
const cases=[
{id:'thin-wall-hoop-stress-01',min:0,nom:24,max:36,unit:'MPa',input:'bar',tol:.2,ref:p=>p*25/6},
{id:'thermal-fourier-number-01',min:0,nom:20,max:60,unit:'sans unité',input:'s',tol:.005,ref:t=>.03*t},
{id:'gear-mesh-frequency-01',min:600,nom:1200,max:1800,unit:'Hz',input:'tr/min',tol:1,ref:n=>54*(n*36/54)/60},
{id:'jet-impact-force-01',min:0,nom:24,max:40,unit:'N',input:'L/min',tol:.02,ref:q=>{const flow=q/60000;const speed=flow/(Math.PI*.01*.01/4);return 1000*flow*speed}},
{id:'rectangular-beam-shear-01',min:0,nom:8,max:12,unit:'MPa',input:'kN',tol:.03,ref:v=>1.5*(v*1000)/(.04*.08)/1e6}
];
function near(actual,expected){assert.ok(Math.abs(actual-expected)<1e-8*Math.max(1,Math.abs(expected)),actual+' != '+expected)}
test('lot 148–152 : catalogue et sous-savoirs indépendants',()=>{
 assert.ok(catalogue.levels.length>=152);
 assert.equal(new Set(catalogue.levels.map(v=>v.id)).size,catalogue.levels.length);
 assert.equal(catalogue.worlds.length,17);
 assert.equal(new Set(cases.map(c=>catalogue.byId(c.id).subskill)).size,5);
});
for(const c of cases)test(c.id+' : contre-calcul, domaine, SVG, aides et tolérances',()=>{
 const html=fs.readFileSync('missions/'+c.id+'.html','utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.unit,c.unit);assert.equal(cfg.inputUnit,c.input);
 near(cfg.expected,c.ref(c.nom));
 assert.equal(engine.inputUnits[c.id],c.input);
 assert.equal(engine.criteria[c.id].unit,c.unit);
 for(const x of [c.min,(c.min+c.nom)/2,c.nom,(c.nom+c.max)/2,c.max]){
  const y=engine.calculate(c.id,x);near(y,c.ref(x));
  const svg=diagrams.render(c.id,x,y);
  assert.match(svg,/<title/);assert.match(svg,/<desc/);
  assert.match(svg,/data-/);assert.ok(svg.includes(c.unit)&&svg.includes(c.input));
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 for(const x of [c.min-.01,c.max+.01,NaN,Infinity])
  assert.throws(()=>engine.calculate(c.id,x),RangeError);
 const policy=engine.answerPolicy[c.id];
 assert.ok(policy.assumptions.length>150&&policy.solution.length>180);
 assert.ok(engine.validateAnswer(String(cfg.expected),cfg.expected,c.tol).correct);
 assert.ok(!engine.validateAnswer(String(cfg.expected+2*c.tol),cfg.expected,c.tol).correct);
 for(const marker of ['Questions flash','Prérequis','Hypothèses','id="hint"','id="solution"','id="trialValue"','id="log"','id="reset"','investigation-mission.js'])
  assert.ok(html.includes(marker),marker);
});
test('invariants physiques et géométriques du lot',()=>{
 near(engine.calculate('thin-wall-hoop-stress-01',0),0);
 near(engine.calculate('thin-wall-hoop-stress-01',36),1.5*engine.calculate('thin-wall-hoop-stress-01',24));
 near(engine.calculate('thermal-fourier-number-01',40),2*engine.calculate('thermal-fourier-number-01',20));
 near(engine.calculate('gear-mesh-frequency-01',1200),54*800/60);
 near(engine.calculate('jet-impact-force-01',40),4*engine.calculate('jet-impact-force-01',20));
 near(engine.calculate('rectangular-beam-shear-01',0),0);
 const gear=diagrams.render('gear-mesh-frequency-01',1200,720);
 assert.match(gear,/data-gear1-radius="50" data-gear2-radius="75"/);
 const zeroJet=diagrams.render('jet-impact-force-01',0,0);
 assert.doesNotMatch(zeroJet,/stroke-width="13"/);
 const shear=diagrams.render('rectangular-beam-shear-01',8,3.75);
 assert.match(shear,/data-parabolic-profile="true"/);
 const old=diagrams.render('rolling-torque-01',200,70);
 assert.match(old,/data-moment-sense="antihoraire"/);
 assert.doesNotMatch(old,/x2="170" y2="190"/);
});
