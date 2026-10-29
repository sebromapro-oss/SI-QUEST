'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch528-532.js'),C=require('../src/catalog.js');
const ref=[x=>12*(1+x/(1-x)),x=>Math.sqrt(6300/x)*Math.SQRT2/Math.PI,x=>9600/(Math.PI*3150*x),x=>55*x*x/1000,x=>Math.exp(.3*150*Math.PI/180/Math.sin(x*Math.PI/360))];
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : calcul contradictoire, bornes, SVG, pédagogie',()=>{
const h=fs.readFileSync('missions/'+m.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(c.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal((h.match(/<script src=/g)||[]).length,4);
assert.match(h,/lang="fr"/);assert.match(h,/id="feedback" role="status"/);assert.equal(m.solution.split('\n').length,5);
near(c.expected,ref[i](m.initial));near((m.initial-m.min)/m.step,Math.round((m.initial-m.min)/m.step));
for(const x of [m.min,m.initial,m.max]){const y=P.calculate(m.id,x),s=D.render(m.id,x,y);near(y,ref[i](x));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);const px=Number(s.match(/data-chart-x="([^"]+)"/)[1]),py=Number(s.match(/data-chart-y="([^"]+)"/)[1]);assert.ok(px>=95&&px<=655&&py>=388&&py<=470);assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError);}
for(const x of [NaN,Infinity,null,'1',m.min-1,m.max+1])assert.throws(()=>P.calculate(m.id,x),RangeError);
});
test('catalogue, invariants et cinq corrections historiques',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=532);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
for(const id of ['hydro-volume-01','pneumatic-force-01','electric-power-02','joule-heat-01','rc-time-01']){const h=fs.readFileSync('missions/'+id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(c.subskill,C.byId(id).subskill);}
near(P.calculate(meta[3].id,4),4*P.calculate(meta[3].id,2));near(P.calculate(meta[2].id,10),2*P.calculate(meta[2].id,20));assert.ok(P.calculate(meta[4].id,30)>P.calculate(meta[4].id,50));});
