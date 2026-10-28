'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch348-352.js'),C=require('../src/catalog.js');
const refs={"helical-gear-opposed-thrust-01":[[40,593.9658723168434],[80,459.991276101282],[160,192.0420836701593]],"hydraulic-laminar-critical-flow-01":[[10,1.0860215085054896],[20,2.1720430170109792],[30,3.258064525516468]],"thermal-contact-heat-power-01":[[100,72],[300,216],[500,360]],"process-capability-cp-01":[[0.015,2.2222222222222223],[0.025,1.3333333333333333],[0.05,0.6666666666666666]],"second-order-damping-from-overshoot-01":[[10,0.5911550337988976],[20,0.4559498107691261],[40,0.27999799333504155]]};
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const a of meta)test(a.id+' : références indépendantes, bornes, domaine et SVG',()=>{
 const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal((h.match(/batch348-352\.js/g)||[]).length,1,'chargement unique du moteur');assert.equal(c.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(C.byId(a.id).subskill,a.subskill);
 assert.equal(M.criteria[a.id].unit,a.u);assert.equal(M.inputUnits[a.id],a.iu);
 for(const [x,ref] of refs[a.id]){near(M.calculate(a.id,x),ref);const s=D.render(a.id,x,ref);assert.match(s,/<title/);assert.match(s,/<desc/);assert.match(s,/data-geom-px/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);}
 for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
 assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
 near(c.expected,M.calculate(a.id,a.initial));
 assert.equal(M.validateAnswer(String(c.expected).replace('.',','),c.expected,a.tol).correct,true);
 assert.equal(M.validateAnswer(String(c.expected+2*a.tol),c.expected,a.tol).correct,false);
});
test('contre-épreuves dimensionnelles, invariants et géométrie paramétrique',()=>{
 for(const [x,y] of refs['helical-gear-opposed-thrust-01'])near(y,2000*Math.tan(20*Math.PI/180)-(2*x/.16)*Math.tan(15*Math.PI/180));
 for(const [d,q] of refs['hydraulic-laminar-critical-flow-01']){const dm=d/1000,v=(q/60000)/(Math.PI*dm*dm/4);near(998*v*dm/.001,2300);}
 for(const [h,p] of refs['thermal-contact-heat-power-01'])near(p/(h*12),.06);
 for(const [sigma,cp] of refs['process-capability-cp-01'])near(6*sigma*cp,.2);
 for(const [mp,z] of refs['second-order-damping-from-overshoot-01'])near(100*Math.exp(-Math.PI*z/Math.sqrt(1-z*z)),mp);
 for(const a of meta)for(const [x,y] of refs[a.id]){const s=D.render(a.id,x,y),px=Number(s.match(/data-geom-px="([^"]+)"/)[1]);const expected=a.id==='helical-gear-opposed-thrust-01'?.25*y:a.id==='hydraulic-laminar-critical-flow-01'?40*y:a.id==='thermal-contact-heat-power-01'?.5*y:a.id==='process-capability-cp-01'?4800*x:.85*x;assert.ok(Math.abs(px-expected)<1e-5);}
 assert.equal(C.levels.length,352);assert.equal(new Set(C.levels.map(x=>x.id)).size,352);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);assert.equal(new Set(C.levels.filter(x=>x.subskill).map(x=>x.subskill)).size,249);
});
