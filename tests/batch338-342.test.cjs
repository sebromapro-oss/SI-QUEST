'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch338-342.js'),C=require('../src/catalog.js');
const refs={"battery-coulomb-soc-01":[[1,82],[4,58],[8,26]],"pump-displacement-from-flow-01":[[12,8.88888888888889],[24,17.77777777777778],[36,26.666666666666668]],"peltier-ideal-heat-01":[[0.5,6],[2,24],[4,48]],"acoustic-normal-reflection-01":[[600,0.2],[1000,0.42857142857142855],[1600,0.6]],"entropy-two-reservoirs-01":[[100,0.08333333333333333],[600,0.5],[900,0.75]]};
const close=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' != '+b);
for(const a of meta)test(a.id+' : références indépendantes, domaine, unités, SVG et saisie',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.criteria[a.id].unit,a.u);
for(const [x,y] of refs[a.id]){close(M.calculate(a.id,x),y);const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-result/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+10),RangeError);
assert.equal(M.validateAnswer(String(cfg.expected).replace('.',','),cfg.expected,a.tol).correct,true);
assert.equal(M.validateAnswer(String(cfg.expected+2*a.tol),cfg.expected,a.tol).correct,false);
});
test('invariants indépendants et échelles géométriques',()=>{
for(const [t,soc] of refs['battery-coulomb-soc-01'])close((90-soc)*100*3600/100,8*t*3600);
for(const [q,vg] of refs['pump-displacement-from-flow-01'])close(vg*1500*.9/1000,q);
for(const [i,w] of refs['peltier-ideal-heat-01'])close(w/i,.04*300);
for(const [z,r] of refs['acoustic-normal-reflection-01'])close((1-r)/(1+r),400/z);
for(const [q,s] of refs['entropy-two-reservoirs-01'])close(s+q/400,q/300);
const scales=[['battery-coulomb-soc-01','data-soc-px',(x,y)=>3.5*y],['pump-displacement-from-flow-01','data-displacement-px',(x,y)=>10*y],['peltier-ideal-heat-01','data-peltier-px',(x,y)=>6*y],['acoustic-normal-reflection-01','data-reflection-px',(x,y)=>160*y],['entropy-two-reservoirs-01','data-entropy-px',(x,y)=>400*y/.8]];
assert.match(D.render('acoustic-normal-reflection-01',1000,M.calculate('acoustic-normal-reflection-01',1000)),/x1="125" y1="160" x2="285" y2="160"/);
for(const [id,attr,scale] of scales){const a=meta.find(m=>m.id===id);for(const x of [a.min,a.initial,a.max]){const y=M.calculate(id,x),svg=D.render(id,x,y),v=Number(svg.match(new RegExp(attr+'="([^"]+)"'))[1]);assert.ok(Math.abs(v-scale(x,y))<1e-5,id+': échelle');}}
assert.ok(C.levels.length>=342);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
});
