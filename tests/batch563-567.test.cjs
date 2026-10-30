'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch563-567.js'),C=require('../src/catalog.js');
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
const refs=[
x=>x/80,
x=>{const A=40*80,I=40*80**3/12,c=40;return (12000/A+x*1000*c/I)},
x=>250*1000/(x+1),
x=>{const a=20*Math.PI/180,r=[24,48],b=r.map(v=>v*Math.cos(a)),add=r.map(v=>v+2*x);const approach=Math.sqrt(add[1]**2-b[1]**2)-r[1]*Math.sin(a),recess=Math.sqrt(add[0]**2-b[0]**2)-r[0]*Math.sin(a);return (approach+recess)/(2*Math.PI*Math.cos(a))},
x=>x*x*4e-4/(8*Math.PI*1e-7)
];
for(const [i,m] of meta.entries())test(m.id+' : trois états, référence indépendante, SVG, page, cas invalides',()=>{
 const html=fs.readFileSync('missions/'+m.id+'.html','utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);
 for(const key of ['objective','prerequisites','successCriteria','subskill'])assert.ok(cfg[key],key);
 assert.equal((html.match(/<li>/g)||[]).length,3);assert.equal((html.match(/<script src=/g)||[]).length,4);
 assert.equal(m.solution.split('\n').length,5);
 near(cfg.expected,refs[i](m.initial));
 for(const x of [m.min,m.initial,m.max]){
  const y=P.calculate(m.id,x),s=D.render(m.id,x,y);near(y,refs[i](x));
  assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);
  const px=Number(s.match(/data-chart-x="([^"]+)"/)[1]),py=Number(s.match(/data-chart-y="([^"]+)"/)[1]);
  assert.ok(px>=94.99&&px<=655.01&&py>=387.99&&py<=470.01);
  assert.throws(()=>D.render(m.id,x,y+Math.max(1,Math.abs(y)*.1)),RangeError);
 }
 for(const bad of [NaN,Infinity,null,'5',m.min-1,m.max+1])assert.throws(()=>P.calculate(m.id,bad),RangeError);
});
test('Invariants et dimensions : masse, contrainte, période, conduite, pression magnétique',()=>{
 near(P.calculate(meta[0].id,320)*80,320);
 near(P.calculate(meta[1].id,300),12000/(.04*.08)/1e6+300*.04/(.04*.08**3/12)/1e6);
 near(P.calculate(meta[2].id,999)*64*1000,16e6);
 near(P.calculate(meta[3].id,1),1.6747051481919764);
 near(P.calculate(meta[4].id,.3)/(4e-4),.3**2/(2*4*Math.PI*1e-7));
 assert.ok(P.calculate(meta[3].id,.8)>1);
 assert.ok(P.calculate(meta[4].id,.5)>P.calculate(meta[4].id,.3));
 assert.throws(()=>P.calculate(meta[2].id,1000),RangeError);
 assert.throws(()=>P.calculate(meta[2].id,749.5),RangeError);
 assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=567);
 assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
});
test('Compteur : pas discret respecté par le contrôleur mutualisé',()=>{
 const s=fs.readFileSync('src/investigation-mission.js','utf8');
 assert.match(s,/échantillons\|comptes/);
 const m=meta[2];const vals=Array.from({length:(m.max-m.min)/m.step+1},(_,i)=>m.min+i*m.step);
 assert.deepEqual(vals,[499,749,999,1249,1499,1749,1999]);
 for(const v of vals)assert.ok(Number.isFinite(P.calculate(m.id,v)));
});
test('Traçabilité pédagogique historique 40–75 corrigée sur cinq missions',()=>{
 for(const id of ['sampling-01','efficiency-chain-01','rolling-load-01','heat-transfer-01','measurement-relative-01']){
  const h=fs.readFileSync('missions/'+id+'.html','utf8');
  const cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
  for(const k of ['subskill','objective','prerequisites','successCriteria'])assert.ok(cfg[k],id+' : '+k);
  assert.equal((h.match(/<li>/g)||[]).length,3);
 }
});

test('Géométrie : masses d’équilibrage opposées et rayon de correction constant',()=>{
 const id=meta[0].id,s=D.render(id,320,P.calculate(id,320));
 assert.match(s,/cx="479" cy="208" r="11"/);assert.match(s,/cx="291" cy="208" r="11"/);
 assert.equal((479+291)/2,385);assert.equal(479-385,385-291);
});
test('Géométrie : cercles primitifs tangents et rayons conformes au module',()=>{
 const id=meta[3].id,s=D.render(id,1,P.calculate(id,1));
 assert.match(s,/cx="295" cy="210" r="48"/);
 assert.match(s,/cx="439" cy="210" r="96"/);
 assert.equal(439-295,48+96);
 assert.match(s,/cx="295" cy="210" r="52"/);
 assert.match(s,/cx="439" cy="210" r="100"/);
});
test('Électroaimant : trois flèches B et une attraction orientée vers le noyau',()=>{
 const id=meta[4].id,s=D.render(id,.3,P.calculate(id,.3));
 assert.equal((s.match(/marker-end="url\(#arr563\)"/g)||[]).length,4);
 assert.match(s,/x1="440" y1="316" x2="370" y2="316"/);
});
