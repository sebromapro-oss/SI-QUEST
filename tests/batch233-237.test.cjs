'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch233-237.js'),C=require('../src/catalog.js');
const cases=[{"id":"shaft-key-shear-stress-01","x":180,"min":0,"max":400,"expected":18.749999999999996,"iu":"N·m","u":"MPa","w":"SI-04","tol":0.08},{"id":"transformer-winding-copper-loss-01","x":20,"min":0,"max":40,"expected":300,"iu":"A","u":"W","w":"SI-08","tol":2},{"id":"straight-fin-efficiency-01","x":30,"min":10,"max":100,"expected":0.7602307509024974,"iu":"W/(m²·K)","u":"sans unité","w":"SI-12","tol":0.01},{"id":"brake-pad-sector-pressure-01","x":1000,"min":500,"max":2000,"expected":0.12242687930145797,"iu":"N","u":"MPa","w":"SI-11","tol":0.002},{"id":"hydrostatic-wheel-traction-01","x":120,"min":0,"max":200,"expected":3896.1130068895977,"iu":"bar","u":"N","w":"SI-17","tol":20}];
const refs={"shaft-key-shear-stress-01":x=>(x/.02)/(.012*.04)/1e6,"transformer-winding-copper-loss-01":x=>.75*x**2,"straight-fin-efficiency-01":x=>{const A=8e-5,P=.084,k=200,L=.08;let m=Math.sqrt(P*x/(k*A));return (Math.exp(2*m*L)-1)/(Math.exp(2*m*L)+1)/(m*L)},"brake-pad-sector-pressure-01":x=>x*6/(Math.PI*(.0256-.01))*1e-6,"hydrostatic-wheel-traction-01":x=>x*1e5*(.00008/(2*Math.PI))*(.85*.9)*(15/.45)};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const q of cases)test(q.id+' : contre-calcul indépendant, bornes, unités, SVG et contrat',()=>{
const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){
const y=M.calculate(q.id,x),svg=D.render(q.id,x,y);near(y,refs[q.id](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-parameter=/);assert.ok(svg.includes(q.iu)&&svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/)}
for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
assert.ok(M.answerPolicy[q.id].solution.length>300);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/sans animation temporelle artificielle/);
assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('invariants et seuils pédagogiques indépendants',()=>{
near(M.calculate(cases[0].id,0),0);near(M.calculate(cases[0].id,360),2*M.calculate(cases[0].id,180));
near(M.calculate(cases[1].id,40),4*M.calculate(cases[1].id,20));
assert.ok(M.calculate(cases[2].id,100)<M.calculate(cases[2].id,10));
near(M.calculate(cases[3].id,2000),2*M.calculate(cases[3].id,1000));
near(M.calculate(cases[4].id,200),2*M.calculate(cases[4].id,100));
assert.equal(M.assess(cases[0].id,400).acceptable,false);
assert.equal(M.assess(cases[1].id,40).acceptable,false);
assert.equal(M.assess(cases[2].id,100).acceptable,false);
assert.equal(M.assess(cases[3].id,2000).acceptable,false);
assert.equal(M.assess(cases[4].id,120).acceptable,false);
assert.equal(M.assess(cases[4].id,180).acceptable,true);
assert.doesNotMatch(D.render(cases[0].id,0,0),/marker-end=/);
assert.doesNotMatch(D.render(cases[1].id,0,0),/marker-end=/);
assert.doesNotMatch(D.render(cases[4].id,0,0),/marker-end=/);
});
test('corrigé ailette : arrondi conforme au contre-calcul',()=>{const q=cases[2],y=refs[q.id](q.x);assert.ok(Math.abs(y-0.760)<0.0005);assert.match(M.answerPolicy[q.id].solution,/≈0,760/);});
test('catalogue extensible et 17 univers, sous-savoirs distincts',()=>{assert.ok(C.levels.length>=237);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);assert.equal(new Set(cases.map(q=>C.byId(q.id).subskill)).size,5)});
test('pneumatique historique 40–75 : pression avec unité bar',()=>{const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');const x=4;const svg=G.render('pneumatic-force-01',x,B.calculate('pneumatic-force-01',x));assert.match(svg,/p = 4 bar/);});
test('profil pédagogique individualisé pour les nouveaux identifiants',()=>{const ui=fs.readFileSync('src/investigation-mission.js','utf8');assert.match(ui,/c\.prerequisites\|\|/);assert.match(ui,/c\.objective\|\|/);assert.match(ui,/c\.decision\|\|/);assert.match(ui,/c\.error\|\|/);for(const q of cases){const h=fs.readFileSync('missions/'+q.id+'.html','utf8');const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);for(const k of ['prerequisites','objective','decision','error'])assert.ok(c[k].length>40)}});
