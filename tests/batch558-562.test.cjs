'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch558-562.js'),C=require('../src/catalog.js');
const refs=[
x=>Math.pow(7850/(x*1e9),-0.5),
x=>x*.08*.8+x*.15*.6,
x=>x*1000*(.04*.1*.1/8)/(.04*.1**3/12)/1000,
x=>2*(.64+x*x),
x=>(2*x+4*x)/5
];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const [i,m] of meta.entries())test(m.id+' : 3 références indépendantes, SVG, domaines et page',()=>{
 const h=fs.readFileSync('missions/'+m.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
 assert.equal((h.match(/<script src=/g)||[]).length,4);assert.equal(m.solution.split('\n').length,5);
 near(cfg.expected,refs[i](m.initial));
 for(const x of [m.min,m.initial,m.max]){const y=P.calculate(m.id,x),s=D.render(m.id,x,y);near(y,refs[i](x));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);const px=+s.match(/data-chart-x="([^"]+)"/)[1],py=+s.match(/data-chart-y="([^"]+)"/)[1];assert.ok(px>=95&&px<=655&&py>=388&&py<=470);assert.throws(()=>D.render(m.id,x,y+Math.max(1,Math.abs(y)*.1)),RangeError)}
 for(const bad of [NaN,Infinity,null,'5',m.min-1,m.max+1])assert.throws(()=>P.calculate(m.id,bad),RangeError);
});
test('Invariants et dimensions',()=>{
 near(P.calculate(meta[0].id,200)**2*7850,200e9);
 near(P.calculate(meta[1].id,40)/40,.154);
 near(P.calculate(meta[2].id,2),30);
 near(P.calculate(meta[3].id,.6),2);
 near(P.calculate(meta[4].id,3),3.6);
 assert.equal(C.worlds.length,17);assert.equal(C.levels.length,562);assert.equal(new Set(C.levels.map(x=>x.id)).size,562);
});

test('Rugosité : les cinq points restent dans la zone du schéma pour les bornes',()=>{
 const id='profile-discrete-roughness-ra-01';
 for(const x of [1,3,5]){const s=D.render(id,x,P.calculate(id,x));const p=s.match(/<polyline points="([^"]+)"/);assert.ok(p,'Profil SVG manquant');const pts=p[1].split(' ').map(t=>t.split(',').map(Number));assert.equal(pts.length,5);for(const [px,py] of pts){assert.ok(px>=150&&px<=590);assert.ok(py>=100&&py<=310,'Point hors zone technique : '+py)}}
});
