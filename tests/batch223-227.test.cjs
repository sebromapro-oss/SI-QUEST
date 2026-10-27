'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');const {physics:M,diagrams:D}=require('../src/batch223-227.js'),C=require('../src/catalog.js');
const cases=[{"id":"sinusoidal-vibration-rms-01","x":25,"min":0,"max":60,"expected":8.723580249548599,"iu":"Hz","u":"m/s²","world":"SI-09","tol":0.03},{"id":"thick-cylinder-hoop-stress-01","x":8,"min":0,"max":15,"expected":18.256410256410255,"iu":"MPa","u":"MPa","world":"SI-04","tol":0.08},{"id":"three-phase-neutral-imbalance-01","x":14,"min":0,"max":20,"expected":5.291502622129181,"iu":"A","u":"A","world":"SI-08","tol":0.03},{"id":"source-matched-load-power-01","x":0.5,"min":0.2,"max":1.2,"expected":72,"iu":"Ω","u":"W","world":"SI-10","tol":0.4},{"id":"couette-viscous-shear-01","x":1.25,"min":0,"max":2,"expected":3,"iu":"m/s","u":"N","world":"SI-11","tol":0.03}],refs={"sinusoidal-vibration-rms-01":x=>4*Math.PI**2*x*x*.0005/Math.sqrt(2),
"thick-cylinder-hoop-stress-01":x=>x*2225/975,
"three-phase-neutral-imbalance-01":x=>Math.sqrt((x-10)**2+12),
"source-matched-load-power-01":x=>36/x,
"couette-viscous-shear-01":x=>2.4*x};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const q of cases)test(q.id+' : modèle pur, contre-calcul indépendant, limites, unités et SVG',()=>{
const html=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(C.byId(q.id).world,q.world);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){const y=M.calculate(q.id,x);near(y,refs[q.id](x));const svg=D.render(q.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.ok(svg.includes(q.iu)&&svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);assert.match(svg,/data-parameter=/);}
for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
assert.ok(M.answerPolicy[q.id].solution.length>300);assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);assert.match(html,/Questions flash/);assert.equal((html.match(/<li>/g)||[]).length,3);assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('propriétés physiques, singularités et zéro vectoriel',()=>{
near(M.calculate(cases[0].id,40),4*M.calculate(cases[0].id,20));near(M.calculate(cases[1].id,12),1.5*M.calculate(cases[1].id,8));
near(M.calculate(cases[2].id,10),2*Math.sqrt(3));near(M.calculate(cases[3].id,.4),2*M.calculate(cases[3].id,.8));near(M.calculate(cases[4].id,2),2*M.calculate(cases[4].id,1));
for(const id of [cases[0].id,cases[1].id,cases[4].id])assert.doesNotMatch(D.render(id,0,0),/marker-end="url\(#pointe\)"/);
});
test('P1 historique : pente à 90 degrés et poids sans troncature verticale',()=>{
const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');
for(const x of [0,30,60,90]){const svg=G.render('incline-force-01',x,B.calculate('incline-force-01',x));const m=svg.match(/<line x1="145" y1="193" x2="([^"]+)" y2="([^"]+)"[^>]*stroke="#d4e8f2"/);assert.ok(m,'rampe absente');assert.ok(Number(m[2])>=38-1e-6,'sommet hors du SVG');const weight=svg.match(/<line x1="[^"]+" y1="[^"]+" x2="[^"]+" y2="([^"]+)"[^>]*stroke="#ffd17d"[^>]*marker-end/);assert.ok(weight);assert.ok(Number(weight[1])<=228+1e-6,'poids hors du SVG');}
});
test('catalogue : 17 univers et identifiants uniques',()=>{assert.equal(C.levels.length,227);assert.equal(new Set(C.levels.map(x=>x.id)).size,227);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);});
