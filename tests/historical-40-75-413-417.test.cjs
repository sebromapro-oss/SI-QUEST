'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const M=require('../src/investigations.js'),D=require('../src/investigation-diagrams.js'),C=require('../src/catalog.js');
test('missions historiques 40–75 : calculs, SVG, non-finis et réactivation',()=>{
 const first=C.levels.findIndex(x=>x.id==='work-01'),last=C.levels.findIndex(x=>x.id==='inductor-energy-01');
 assert.equal(last-first+1,36);
 for(const a of C.levels.slice(first,last+1)){
  const h=fs.readFileSync(a.url,'utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
  assert.equal((h.match(/<li>/g)||[]).length,3,a.id+' : trois questions flash');
  for(const x of [c.min,c.initial,c.max]){const y=M.calculate(a.id,x);assert.ok(Number.isFinite(y),a.id);const s=D.render(a.id,x,y);assert.match(s,/<svg/);assert.doesNotMatch(s,/NaN|Infinity/);}
  for(const x of [NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
 }
});
test('P2 : force hydraulique, flèche de console et volume pneumatique',()=>{
 const hydro=fs.readFileSync('missions/hydro-force-02.html','utf8');
 const beam=fs.readFileSync('missions/beam-defl-01.html','utf8');
 const pneu=fs.readFileSync('missions/pneumatic-consumption-01.html','utf8');
 assert.match(hydro,/15 000 N/);assert.match(beam,/0,50 mm/);
 assert.match(pneu,/Volume géométrique balayé/);
 assert.match(pneu,/pressions absolues/);
 assert.equal(M.answerPolicy['hydro-force-02'].absoluteTolerance,100);
 assert.equal(M.answerPolicy['beam-defl-01'].absoluteTolerance,.005);
 assert.ok(Math.abs(M.calculate('hydro-force-02',20)-2e6*Math.PI*.08**2/4)<1e-8);
 assert.ok(Math.abs(M.calculate('beam-defl-01',100)-100*500**3/(3*210000*80000))<1e-10);
});
