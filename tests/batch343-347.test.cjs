'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch343-347.js'),C=require('../src/catalog.js');
const refs={"hydraulic-throttle-temperature-rise-01":[[20,1.1764705882352942],[80,4.705882352941177],[120,7.0588235294117645]],"cantilever-uniform-load-tip-deflection-01":[[200,0.24685714285714286],[600,0.7405714285714284],[800,0.9874285714285714]],"faraday-flux-rate-emf-01":[[2,0.5],[6,1.5],[12,3]],"planetary-fixed-ring-reaction-torque-01":[[20,60],[60,180],[100,300]],"quarter-bridge-linearization-error-01":[[500,0.04997501249375313],[2000,0.1996007984031936],[4000,0.39840637450199207]]};
const close=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const a of meta)test(a.id+' : références indépendantes, domaine, unités et SVG',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(C.byId(a.id).subskill,a.subskill);
assert.equal(M.criteria[a.id].unit,a.u);assert.equal(M.inputUnits[a.id],a.iu);
for(const [x,y] of refs[a.id]){close(M.calculate(a.id,x),y);const s=D.render(a.id,x,y);assert.match(s,/<title/);assert.match(s,/<desc/);assert.match(s,/data-result/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
close(cfg.expected,M.calculate(a.id,a.initial));
assert.equal(M.validateAnswer(String(cfg.expected).replace('.',','),cfg.expected,a.tol).correct,true);
assert.equal(M.validateAnswer(String(cfg.expected+2*a.tol),cfg.expected,a.tol).correct,false);
});
test('invariants, dimensions et échelles géométriques',()=>{
for(const [p,dT] of refs['hydraulic-throttle-temperature-rise-01'])close(850*2000*dT,p*1e5);
for(const [q,mm] of refs['cantilever-uniform-load-tip-deflection-01'])close(8*210e9*1e-6*(mm/1000),q*1.2**4);
for(const [d,e] of refs['faraday-flux-rate-emf-01'])close(e/250,d*1e-3);
for(const [t,tr] of refs['planetary-fixed-ring-reaction-torque-01']){close(tr/t,3);close((tr+t)/4,t);}
for(const [strain,err] of refs['quarter-bridge-linearization-error-01']){const g=2*strain*1e-6,vl=5*g/4,ve=5*g/(2*(2+g));close(err,100*(vl-ve)/vl);}
const scales=[['hydraulic-throttle-temperature-rise-01','data-rise-px',(x,y)=>30*y],['cantilever-uniform-load-tip-deflection-01','data-tip-px',(x,y)=>36*y],['faraday-flux-rate-emf-01','data-emf-px',(x,y)=>65*y],['planetary-fixed-ring-reaction-torque-01','data-reaction-px',(x,y)=>.65*y],['quarter-bridge-linearization-error-01','data-error-px',(x,y)=>450*y]];
for(const [id,attr,fn] of scales){const a=meta.find(m=>m.id===id);for(const x of [a.min,a.initial,a.max]){const y=M.calculate(id,x),s=D.render(id,x,y),v=Number(s.match(new RegExp(attr+'="([^"]+)"'))[1]);assert.ok(Math.abs(v-fn(x,y))<1e-4,id+' échelle');}}
assert.ok(C.levels.length>=347);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
assert.equal(C.targets.subskills,249);assert.ok(new Set(C.levels.filter(x=>x.subskill).map(x=>x.subskill)).size>=249);
});
