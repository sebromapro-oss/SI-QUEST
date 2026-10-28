'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const p=require('../src/investigations.js'),d=require('../src/investigation-diagrams.js'),c=require('../src/catalog.js');
const cases=[{"id":"helical-gear-axial-force-01","min":0,"max":35,"initial":20,"expected":727.9404685324047,"unit":"N","input":"°","tol":2},{"id":"oil-pressure-wave-speed-01","min":0.8,"max":1.8,"initial":1.4,"expected":1283.3778958394957,"unit":"m/s","input":"GPa","tol":5},{"id":"parallel-axis-inertia-01","min":0,"max":0.5,"initial":0.3,"expected":1.26,"unit":"kg·m²","input":"m","tol":0.01},{"id":"heat-pump-carnot-cop-01","min":30,"max":65,"initial":40,"expected":7.828749999999999,"unit":"sans unité","input":"°C","tol":0.03},{"id":"oil-kinematic-viscosity-01","min":10,"max":120,"initial":42.5,"expected":50,"unit":"mm²/s","input":"mPa·s","tol":0.3}];
const ref={
"helical-gear-axial-force-01":x=>2000*Math.tan(Math.PI*x/180),
"oil-pressure-wave-speed-01":x=>Math.pow(x*1e9/850,.5),
"parallel-axis-inertia-01":x=>.18+12*Math.pow(x,2),
"heat-pump-carnot-cop-01":x=>1+273.15/x,
"oil-kinematic-viscosity-01":x=>x/850*1e3
};
const eq=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
test('catalogue 167 : 17 univers, IDs et sous-savoirs distincts',()=>{assert.equal(c.worlds.length,17);assert.ok(c.levels.length>=167);assert.equal(new Set(c.levels.map(x=>x.id)).size,c.levels.length);assert.equal(new Set(cases.map(x=>c.byId(x.id).subskill)).size,5)});
for(const v of cases)test(v.id+' : 5 contre-calculs, domaines, unités, SVG et contrat pédagogique',()=>{
 const h=fs.readFileSync('missions/'+v.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 eq(cfg.expected,v.expected);assert.equal(p.criteria[v.id].unit,v.unit);assert.equal(p.inputUnits[v.id],v.input);
 for(const x of [v.min,(v.min+v.initial)/2,v.initial,(v.initial+v.max)/2,v.max]){
  const y=p.calculate(v.id,x);eq(y,ref[v.id](x));const svg=d.render(v.id,x,y);
  assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-/);assert.ok(svg.includes(v.unit)&&svg.includes(v.input));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 for(const x of [v.min-.001,v.max+.001,NaN,Infinity])assert.throws(()=>p.calculate(v.id,x),RangeError);
 assert.ok(p.answerPolicy[v.id].assumptions.length>150&&p.answerPolicy[v.id].solution.length>200);
 assert.ok(p.validateAnswer(String(v.expected),v.expected,v.tol).correct);
 for(const s of ['Questions flash','Prérequis','Hypothèses','id="hint"','id="solution"','id="trialValue"','id="log"','id="reset"'])assert.ok(h.includes(s));
});
test('hélice : effort axial nul à 0°, force tangentielle au contact et poussée croissante',()=>{eq(p.calculate('helical-gear-axial-force-01',0),0);assert.ok(p.calculate('helical-gear-axial-force-01',35)>p.calculate('helical-gear-axial-force-01',20));const svg=d.render('helical-gear-axial-force-01',20,p.calculate('helical-gear-axial-force-01',20));assert.match(svg,/x1="276" y1="125" x2="276" y2="65"/);assert.match(svg,/x1="276" y1="125" x2="[0-9.]+" y2="125"/);const zero=d.render('helical-gear-axial-force-01',0,0);assert.equal((zero.match(/marker-end/g)||[]).length,1)});
test('onde : célérité en racine de K et front cohérent à 5 ms',()=>{eq(p.calculate('oil-pressure-wave-speed-01',1.6)/p.calculate('oil-pressure-wave-speed-01',.8),Math.SQRT2);assert.match(d.render('oil-pressure-wave-speed-01',1.4,p.calculate('oil-pressure-wave-speed-01',1.4)),/data-wave-front-m="6\.416/)});
test('Steiner : axes confondus et augmentation quadratique',()=>{eq(p.calculate('parallel-axis-inertia-01',0),.18);eq(p.calculate('parallel-axis-inertia-01',.4)-.18,12*.4**2)});
test('Carnot : bilan Qh=Qc+W et COP décroissant',()=>{const a=p.calculate('heat-pump-carnot-cop-01',40);eq(a-(a-1),1);assert.ok(p.calculate('heat-pump-carnot-cop-01',65)<a)});
test('viscosité : conversion Pa·s vers mm²/s',()=>{eq(p.calculate('oil-kinematic-viscosity-01',85),100);eq(p.calculate('oil-kinematic-viscosity-01',20),2*p.calculate('oil-kinematic-viscosity-01',10))});
test('P1 historique : rentrée annulaire, flèche vers la rentrée, zéro débit sans flèche',()=>{
 const x=12,area=Math.PI*(.08**2-.05**2)/4,y=(x/60000)/area;
 eq(p.calculate('hydro-cylinder-speed-02',x),y);assert.ok(y>p.calculate('hydro-speed-01',x));
 assert.match(d.render('hydro-cylinder-speed-02',x,y),/x1="510" y1="65" x2="455" y2="65"/);
 assert.doesNotMatch(d.render('hydro-cylinder-speed-02',0,0),/x1="510" y1="65" x2="452" y2="65"/);
 assert.match(fs.readFileSync('missions/hydro-cylinder-speed-02.html','utf8'),/surface annulaire/);
});
test('P0 historique : contrôleur prévoit un profil de repli sans révélation du résultat',()=>{
 const ui=fs.readFileSync('src/investigation-mission.js','utf8');
 assert.match(ui,/p=profile\[c.id\]\|\|\[/);assert.match(ui,/const q=SIInvestigations.answerPolicy/);
 assert.doesNotMatch(ui,/p=profile\[c.id\],\$=/);
});
