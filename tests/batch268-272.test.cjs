'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D}=require('../src/batch268-272.js'),C=require('../src/catalog.js');
const cases=[{"id":"thinwall-bredt-shear-01","x":2.5,"min":1,"max":4,"expected":10,"iu":"mm","u":"MPa","w":"SI-04","tol":0.2},{"id":"threephase-power-factor-pq-01","x":6,"min":0,"max":20,"expected":0.8944271909999159,"iu":"kvar","u":"sans unité","w":"SI-08","tol":0.01},{"id":"battery-internal-joule-heat-01","x":80,"min":0,"max":150,"expected":320,"iu":"A","u":"W","w":"SI-10","tol":5},{"id":"sensor-two-point-sensitivity-01","x":4.5,"min":2,"max":5,"expected":40,"iu":"V","u":"mV/bar","w":"SI-13","tol":0.5},{"id":"cylinder-critical-insulation-radius-01","x":10,"min":5,"max":30,"expected":4,"iu":"W/(m²·K)","u":"mm","w":"SI-12","tol":0.1}];
const independent=[
 x=>200/(2*.004*(x/1000))/1e6,
 x=>12000/Math.sqrt(12000**2+(x*1000)**2),
 x=>x*x*.05,
 x=>(x-.5)*1000/100,
 x=>.04/x*1000
];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const [i,q] of cases.entries())test(q.id+' : contre-calcul, cinq états, SVG et invalides',()=>{
 const h=fs.readFileSync('missions/'+q.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(C.byId(q.id).world,q.w);assert.equal(M.criteria[q.id].unit,q.u);assert.equal(M.inputUnits[q.id],q.iu);near(c.expected,q.expected);
 for(const x of [q.min,(q.min+q.x)/2,q.x,(q.x+q.max)/2,q.max]){
 const y=M.calculate(q.id,x),svg=D.render(q.id,x,y);near(y,independent[i](x));
 assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-parameter=/);
 assert.ok(svg.includes(q.u));assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 for(const x of [q.min-.001,q.max+.001,NaN,Infinity])assert.throws(()=>M.calculate(q.id,x),RangeError);
 assert.ok(M.answerPolicy[q.id].solution.length>300);
 assert.equal(M.validateAnswer(String(q.expected).replace('.',','),q.expected,q.tol).correct,true);
 assert.match(h,/Questions flash/);assert.equal((h.match(/<li>/g)||[]).length,3);
 assert.match(h,/aucune animation temporelle artificielle/);
 assert.throws(()=>D.render(q.id,q.x,q.expected+100),RangeError);
});
test('propriétés physiques indépendantes',()=>{
 near(M.calculate(cases[0].id,4),M.calculate(cases[0].id,2)/2);
 near(M.calculate(cases[1].id,0),1);
 near(M.calculate(cases[2].id,100),4*M.calculate(cases[2].id,50));
 near(M.calculate(cases[3].id,4.5)-M.calculate(cases[3].id,3.5),10);
 near(M.calculate(cases[4].id,20),M.calculate(cases[4].id,10)/2);
 for(const q of cases.slice(0,4))assert.equal(M.assess(q.id,q.x).acceptable,true);
 assert.equal(M.assess(cases[4].id,cases[4].x).acceptable,false); // Rayon critique supérieur au rayon nu : cas volontairement défavorable. 
 assert.equal(M.assess(cases[0].id,1).acceptable,false);
 assert.equal(M.assess(cases[1].id,20).acceptable,false);
 assert.equal(M.assess(cases[2].id,150).acceptable,false);
 assert.equal(M.assess(cases[3].id,2).acceptable,false);
 assert.equal(M.assess(cases[4].id,5).acceptable,false);
});
test('étalonnage : tension croissante vers le haut du graphique',()=>{
 const id='sensor-two-point-sensitivity-01';
 const a=D.render(id,2,M.calculate(id,2)),b=D.render(id,5,M.calculate(id,5));
 const y=s=>Number(s.match(/data-v2-ord-px="([0-9.]+)"/)[1]);
 assert.ok(y(b)<y(a));assert.ok(y(a)<188); // V₂ > V₁, donc ordonnée visuelle au-dessus du point initial.
 assert.ok(Math.abs((188-y(a))/1.5-(188-y(b))/4.5)<1e-8); // même échelle verticale en V.
});
test('rayon critique et courant : échelles et états nuls cohérents',()=>{
 const a='cylinder-critical-insulation-radius-01',b='battery-internal-joule-heat-01';
 const r=40/3,svg=D.render(a,r,M.calculate(a,r));
 const v=Number(svg.match(/data-rayon-critique-px="([0-9.]+)"/)[1]);
 assert.ok(Math.abs(v-32)<.001); // rcrit = rnu = 3 mm
 assert.doesNotMatch(D.render(b,0,M.calculate(b,0)),/data-courant-longueur-px=/);
 for(const x of [30,60,120]){const s=D.render(b,x,M.calculate(b,x));
 const l=Number(s.match(/data-courant-longueur-px="([0-9.]+)"/)[1]);
 assert.ok(Math.abs(l-130*x/150)<.001);}
});
test('historique 40–75 : rendement de chaîne avec étages et résultat identifiés',()=>{
 const B=require('../src/investigations.js'),G=require('../src/investigation-diagrams.js');
 for(const eta2 of [.5,.9,1]){
 const y=B.calculate('efficiency-chain-01',eta2),svg=G.render('efficiency-chain-01',eta2,y);
 near(y,.92*eta2);assert.match(svg,/η₁ = 0,92/);assert.ok(svg.includes('η₂ = '));assert.ok(svg.includes('η global = '));}
});
test('catalogue extensible, 17 univers et unicité',()=>{
 assert.ok(C.levels.length>=272);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
 assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
 assert.equal(new Set(cases.map(q=>C.byId(q.id).subskill)).size,5);
});
