'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch583-587.js'),C=require('../src/catalog.js');
const independent=[
x=>Math.PI*(20/1000)*(x/60),
x=>x/(1500*4),
x=>(9.81*x)/4,
x=>(2*Math.PI*8.8541878128e-12*(2.5-1)*x/Math.log(5/2))/1e-12,
x=>(.8*.5*5.670374419e-8)*((x+273.15)**4-(20+273.15)**4)
];
for(const [i,a] of meta.entries())test(a.id+' : trois états, graphe et domaine',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(c.expected,a.expected);assert.equal((h.match(/<li>/g)||[]).length,3);
for(const x of [a.min,a.initial,a.max]){const y=P.calculate(a.id,x),z=independent[i](x),s=D.render(a.id,x,y);assert.ok(Math.abs(y-z)<=1e-10*Math.max(1,Math.abs(z)));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);assert.throws(()=>D.render(a.id,x,y+Math.max(1,Math.abs(y)*.2)),RangeError);const p=s.match(/data-chart-x="([^"]+)" data-chart-y="([^"]+)"/);assert.ok(p&&+p[1]>=100&&+p[1]<=650&&+p[2]>=399&&+p[2]<=465)}
for(const bad of [NaN,Infinity,null,'3',a.min-1,a.max+1])assert.throws(()=>P.calculate(a.id,bad),RangeError);
const q=P.answerPolicy[a.id];assert.ok(q.solution.includes('Substitution')&&q.solution.includes('Décision')&&q.absoluteTolerance>0);
});
test('invariants et critères de décision',()=>{assert.ok(P.calculate(meta[0].id,3000)>P.calculate(meta[0].id,1000));assert.ok(Math.abs(P.calculate(meta[1].id,600)-.1)<1e-12);assert.equal(P.calculate(meta[2].id,400),981);assert.ok(P.calculate(meta[3].id,.5)>P.calculate(meta[3].id,.1));assert.ok(P.calculate(meta[4].id,150)>P.calculate(meta[4].id,50))});
test('catalogue et pages intégrées',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=587);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);for(const a of meta)assert.ok(fs.existsSync('missions/'+a.id+'.html'))});
test('palan : quatre flèches de tension vers le haut et poids vers le bas',()=>{const a=meta[2],s=D.render(a.id,a.initial,P.calculate(a.id,a.initial));assert.equal((s.match(/>T<\/text>/g)||[]).length,4);assert.match(s,/P = mg/)});

test('mouflage 4:1 : continuité du câble, quatre brins et poulies fixes/mobiles',()=>{
 const a=meta[2];
 for(const mass of [a.min,a.initial,a.max]){
  const svg=D.render(a.id,mass,P.calculate(a.id,mass));
  assert.equal((svg.match(/data-sheave="fixed"/g)||[]).length,2);
  assert.equal((svg.match(/data-sheave="moving"/g)||[]).length,2);
  assert.equal((svg.match(/data-support-force="T"/g)||[]).length,4);
  assert.match(svg,/data-reeving="four-supporting-strands"/);
  assert.match(svg,/M190 105 V275 A20 20 0 0 0 230 275 V145 A20 20 0 0 1 270 145 V275 A20 20 0 0 0 310 275 V145 A20 20 0 0 1 350 145 V355/);
  assert.match(svg,/4T = mg \(idéal\)/);
  assert.ok(Math.abs(4*P.calculate(a.id,mass)-mass*9.81)<1e-9);
 }
});

test('Sonde coaxiale : a et b sont des rayons mesurés depuis le centre, rapport 2/5',()=>{
 const m=meta[3],svg=D.render(m.id,m.initial,P.calculate(m.id,m.initial));
 const outer=svg.match(/<circle cx="336" cy="218" r="([^"]+)" fill="#284c60"/);
 const inner=svg.match(/<circle cx="336" cy="218" r="([^"]+)" fill="#092236"/);
 assert.ok(outer&&inner);
 assert.equal(Number(inner[1])/Number(outer[1]),2/5);
 assert.match(svg,/x1="336" y1="218" x2="376" y2="218"/);
 assert.match(svg,/x1="336" y1="218" x2="336" y2="118"/);
});
