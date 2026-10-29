'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch413-417.js'),C=require('../src/catalog.js');
const near=(a,b,rel=1e-8)=>assert.ok(Math.abs(a-b)<=rel*Math.max(1,Math.abs(b)),a+' ≠ '+b);
const ids=meta.map(a=>a.id);
function reference(id,x){
 if(id==='gate-pressure-center-depth-01'){const h=x,a=1.2;return (2/3)*((h+a)**3-h**3)/((h+a)**2-h**2);}
 if(id==='nozzle-exit-mach-subsonic-01'){let lo=0,hi=1;for(let i=0;i<100;i++){const mid=(lo+hi)/2,beta=(1+.2*mid*mid)**(-3.5);if(beta>x)lo=mid;else hi=mid;}return (lo+hi)/2;}
 if(id==='bredt-closed-tube-torque-limit-01')return x*57.6;
 if(id==='thermal-exergy-destruction-01'){const hot=x+273.15,cold=293.15,Q=10000;return cold*(Q/cold-Q/hot);}
 if(id==='threephase-copper-loss-temperature-01')return 540+2.1222*(x-20);
 throw Error('référence absente');
}
for(const a of meta)test(a.id+' : contre-calculs, domaine, SVG, unités et HTML',()=>{
 const h=fs.readFileSync('missions/'+a.id+'.html','utf8');
 const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(c.id,a.id);assert.equal(C.byId(a.id).subskill,a.subskill);
 assert.equal((h.match(/<li>/g)||[]).length,3);
 assert.match(h,/lang="fr"/);assert.match(h,/Corrigé après trois essais/);
 assert.match(h,/src\/batch413-417\.js/);assert.match(h,/src\/investigation-mission\.js/);
 assert.match(h,/Objectifs, prérequis et réactivation/);assert.match(h,/Hypothèses et domaine/);
 for(const x of [a.min,a.initial,a.max]){
  const y=M.calculate(a.id,x),s=D.render(a.id,x,y);
  near(y,reference(a.id,x));assert.match(s,/<svg/);assert.match(s,/<title/);assert.match(s,/<desc/);
  assert.doesNotMatch(s,/NaN|Infinity|undefined/);
  near(+s.match(/data-geom-px="([^"]+)"/)[1],a.scale*y);
  assert.equal(M.assess(a.id,x).acceptable,y>=a.lo&&y<=a.hi);
 }
 for(const x of [a.min-.01,a.max+.01,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
 assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
 near(c.expected,reference(a.id,a.initial));assert.ok(M.answerPolicy[a.id].solution.includes('\n'));
});
test('invariants physiques et géométrie des schémas',()=>{
 for(const h of [.2,.8,2]){const cp=M.calculate(ids[0],h);assert.ok(cp>h+.6&&cp<h+1.2);const s=D.render(ids[0],h,cp);assert.match(s,/x2="460"/);assert.match(s,/M460 /);assert.match(s,/width="48" height="72"/);near(+s.match(/x2="460" y2="([^"]+)"/)[1],90+60*cp);}
 const betaCrit=(2/2.4)**3.5;assert.ok(.6>betaCrit);
 for(const beta of [.6,.8,.95]){const mach=M.calculate(ids[1],beta);assert.ok(mach>0&&mach<1);near((1+.2*mach*mach)**(-3.5),beta);}
 for(const stress of [15,35,60]){const y=M.calculate(ids[2],stress);near(y/(2*.12*.08*.003),stress*1e6);assert.match(D.render(ids[2],stress,y),/width="240" height="160"/);}
 for(const temp of [50,90,150])assert.ok(M.calculate(ids[3],temp)>0);
 for(const temp of [20,80,120]){const p=M.calculate(ids[4],temp);near(p/(3*15**2),.8*(1+.00393*(temp-20)));}
});
test('catalogue extensible, identifiants uniques et sous-savoirs existants',()=>{
 assert.ok(C.levels.length>=417);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
 assert.equal(C.targets.subskills,249);assert.ok(new Set(C.levels.map(x=>x.subskill).filter(Boolean)).size>=249);
 assert.equal(new Set(meta.map(x=>x.subskill)).size,5);
 assert.equal(C.worlds.length,17);
});
