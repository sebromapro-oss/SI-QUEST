'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch453-457.js'),C=require('../src/catalog.js');
const reference=[
x=>{const p=x/100;return 100*p*.95/(p*.95+(1-p)*.02)},
x=>1/Math.sqrt(1+(Math.sqrt(3)*(3-x)/(3+x))**2),
x=>{const nu=x/1e6,v=2300*nu/.012;return v*Math.PI*.012**2/4*60000},
x=>{const t=x*Math.PI/180;return (1200*9.81*Math.sin(t)+.12*1200*9.81*Math.cos(t))/1000},
x=>Math.sqrt(.2**2+.3**2+2*x*.2*.3)];
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8*Math.max(1,Math.abs(b)),a+' != '+b);
for(const [i,v] of meta.entries())test(v.id+' : science, SVG, invalides, HTML',()=>{
const h=fs.readFileSync('missions/'+v.id+'.html','utf8');
const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(c.id,v.id);assert.equal(C.byId(v.id).subskill,v.subskill);
assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/batch453-457\.js/);
for(const x of [v.min,v.initial,v.max]){const y=M.calculate(v.id,x),s=D.render(v.id,x,y);
near(y,reference[i](x));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);
near(Number(s.match(/data-geom-px="([^"]+)"/)[1]),v.scale*y);
assert.throws(()=>D.render(v.id,x,y+1),RangeError);}
for(const x of [NaN,Infinity,v.min-1,v.max+1])assert.throws(()=>M.calculate(v.id,x),RangeError);
near(c.expected,reference[i](v.initial));assert.equal(M.answerPolicy[v.id].solution.split('\n').length,5);
});
test('invariants et géométries physiques',()=>{
const [a,b,c,d,e]=meta;
assert.ok(M.calculate(a.id,1)<M.calculate(a.id,10));
near(M.calculate(b.id,3),1);
near(M.calculate(c.id,50)/M.calculate(c.id,10),5);
assert.ok(M.calculate(d.id,20)>M.calculate(d.id,0));
near(M.calculate(e.id,0),Math.sqrt(.13));
assert.match(D.render(a.id,5,M.calculate(a.id,5)),/data-true-positive-px=/);
assert.match(D.render(b.id,1.5,M.calculate(b.id,1.5)),/data-reactive-px=/);
assert.match(D.render(c.id,30,M.calculate(c.id,30)),/data-reynolds="2300"/);
assert.match(D.render(d.id,10,M.calculate(d.id,10)),/data-weight-x=/);
assert.match(D.render(e.id,-.8,M.calculate(e.id,-.8)),/data-covariance-px="-/);
});
test('catalogue, pages et corrections historiques',()=>{
assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=457);
assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
for(const v of meta)assert.ok(fs.existsSync('missions/'+v.id+'.html'));
const h=fs.readFileSync('missions/thermal-radiation-01.html','utf8');
assert.equal((h.match(/<li>/g)||[]).length,3);assert.doesNotMatch(h,/Réactivation mémoire — questions flash/);
const e=fs.readFileSync('missions/euler-buckling-01.html','utf8');
assert.match(e,/Pcr\/A/);assert.match(e,/Aucune charge admissible/);
});

test('audit de non-régression 40–75 : calculs, SVG, synchronisation, réactivation',()=>{
 const base=require('../src/investigations.js');
 const diagrams=require('../src/investigation-diagrams.js');
 const historic=require('./fixtures/historic-40-75.cjs').map(id=>C.byId(id));
 assert.equal(historic.length,36);
 for(const v of historic){
  const h=fs.readFileSync(v.url,'utf8');
  assert.ok((h.match(/<li>/g)||[]).length>=3,v.id+' : trois questions flash manquantes');
  const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
  for(const x of [c.min,c.initial,c.max]){
   const y=base.calculate(v.id,x);
   assert.ok(Number.isFinite(y),v.id+' : résultat non fini');
   const svg=diagrams.render(v.id,x,y);
   assert.match(svg,/<svg/);
   assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
   assert.throws(()=>diagrams.render(v.id,x,y+Math.max(1,Math.abs(y)*.1)),RangeError);
  }
 }
});
