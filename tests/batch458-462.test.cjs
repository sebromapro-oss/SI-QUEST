'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch458-462.js');
const C=require('../src/catalog.js'),old=require('../src/investigations.js'),oldDraw=require('../src/investigation-diagrams.js');
const ref=[
x=>1.5*998*((x/60000)/(Math.PI*.01**2))**2/200000,
x=>{const r=.05,R=x/1000;return (R-r)/(4*Math.PI*.04*r*R)},
x=>50+Math.sqrt(900+x*x),
x=>100000*100/(Math.sqrt(3)*400*x),
x=>5e6/(.05*.04)*(2*Math.PI*.015)*(x/1e6)**3/12*60000];
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
for(const [i,v] of meta.entries())test(v.id+' : science, SVG, HTML, domaine',()=>{
 const h=fs.readFileSync('missions/'+v.id+'.html','utf8');
 const m=h.match(/window\.SI_MISSION=(\{.*?\})<\/script>/);assert.ok(m);const c=JSON.parse(m[1]);
 assert.equal(c.id,v.id);assert.equal(C.byId(v.id).subskill,v.subskill);
 assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/batch458-462\.js/);
 assert.equal(v.solution.split('\n').length,5);
 for(const x of [v.min,v.initial,v.max]){
  const y=M.calculate(v.id,x),s=D.render(v.id,x,y);
  near(y,ref[i](x));assert.match(s,/<title/);assert.match(s,/<desc/);
  assert.doesNotMatch(s,/NaN|Infinity|undefined/);
  near(Number(s.match(/data-geom-px="([^"]+)"/)[1]),v.scale*y,1e-6);
  assert.throws(()=>D.render(v.id,x,y+Math.max(1,.1*Math.abs(y))),RangeError);
 }
 for(const x of [NaN,Infinity,v.min-1,v.max+1])assert.throws(()=>M.calculate(v.id,x),RangeError);
 near(c.expected,ref[i](v.initial));
 for(const [,s] of h.matchAll(/<script src="([^"]+)"/g))assert.ok(fs.existsSync(path.join('missions',s)),s);
});
test('propriétés scientifiques et géométriques',()=>{
 const [a,b,c,d,e]=meta;
 near(M.calculate(a.id,80)/M.calculate(a.id,40),4);
 assert.ok(M.calculate(b.id,120)>M.calculate(b.id,60));
 near(M.calculate(c.id,0),80);near(M.calculate(c.id,40),100);
 near(M.calculate(d.id,4)/M.calculate(d.id,8),2);
 near(M.calculate(e.id,80)/M.calculate(e.id,40),8);
 assert.match(D.render(b.id,80,M.calculate(b.id,80)),/data-outer-radius-px="112\.000000"/);
 assert.match(D.render(e.id,50,M.calculate(e.id,50)),/data-clearance-px=/);
});
test('P2 historique Reynolds : constantes et limites',()=>{
 const s=fs.readFileSync('src/investigations.js','utf8');
 assert.match(s,/rho=850,mu=0\.040,D=0\.008/);
 near(old.calculate('hydraulic-reynolds-01',20),4*850*(20/60000)/(Math.PI*.040*.008));
 assert.equal(old.assess('hydraulic-reynolds-01',0).acceptable,false);
 const g=oldDraw.render('hydraulic-reynolds-01',20,old.calculate('hydraulic-reynolds-01',20));
 assert.match(g,/D = 8 mm/);assert.match(g,/0,040 Pa/);
});
test('non-régression 40–75 : 108 états, SVG et flash',()=>{
 const missions=require('./fixtures/historic-40-75.cjs').map(id=>C.byId(id));assert.equal(missions.length,36);
 for(const v of missions){
  const h=fs.readFileSync(v.url,'utf8');
  assert.ok((h.match(/<li>/g)||[]).length>=3,v.id);
  const m=h.match(/window\.SI_MISSION=(\{.*?\})<\/script>/);assert.ok(m,v.id);
  const c=JSON.parse(m[1]);
  for(const x of [c.min,c.initial,c.max]){
   const y=old.calculate(v.id,x),s=oldDraw.render(v.id,x,y);
   assert.ok(Number.isFinite(y));assert.match(s,/<svg/);
   assert.doesNotMatch(s,/NaN|Infinity|undefined/);
   assert.throws(()=>oldDraw.render(v.id,x,y+Math.max(1,.1*Math.abs(y))),RangeError);
  }
 }
});
test('catalogue : 17 univers et identifiants uniques',()=>{
 assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=462);
 assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
 for(const v of meta)assert.ok(fs.existsSync('missions/'+v.id+'.html'));
 assert.ok(C.byId('straight-fin-efficiency-01'),'ancienne mission ailette préservée');
 assert.ok(C.byId('spherical-shell-thermal-resistance-01'),'nouvelle mission sphérique distincte');
});

test('459 : coque sphérique à échelle radiale homogène',()=>{
 const m=meta[1];for(const x of [m.min,m.initial,m.max]){
 const s=D.render(m.id,x,M.calculate(m.id,x));const ro=Number(s.match(/data-outer-radius-px="([^"]+)"/)[1]);near(ro/70,x/50);assert.ok(ro<=168);
 }
});
test('462 : jeu annulaire représenté proportionnellement',()=>{
 const m=meta[4];for(const x of [m.min,m.initial,m.max]){
 const s=D.render(m.id,x,M.calculate(m.id,x));const g=Number(s.match(/data-clearance-px="([^"]+)"/)[1]);near(g,x/5);assert.ok(g>0&&g<45);
 }
});
