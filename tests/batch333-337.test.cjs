'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch333-337.js'),C=require('../src/catalog.js');
const refs={
"parallel-reliability-01":[[.7,97.9],[.85,98.95],[.99,99.93]],
"induction-rotor-copper-loss-01":[[1,.15],[4,.6],[8,1.2]],
"ntc-beta-temperature-01":[[5,41.4602347981853],[8,30.10780185277025],[20,10.17651238703911]],
"cantilever-tip-slope-01":[[100,.26785714285714285],[300,.8035714285714286],[500,1.3392857142857142]],
"ideal-gas-sound-speed-01":[[260,323.21509865722544],[300,347.18870949384285],[340,369.61060590843437]]
};
const close=(a,b)=>assert.ok(Math.abs(a-b)<=1e-8*Math.max(1,Math.abs(b)),a+' != '+b);
for(const a of meta)test(a.id+' : modèle, unités, cas limites, SVG, saisie',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.criteria[a.id].unit,a.u);
for(const [x,y] of refs[a.id]){close(M.calculate(a.id,x),y);const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-result/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+10),RangeError);
assert.equal(M.validateAnswer(String(cfg.expected).replace('.',','),cfg.expected,a.tol).correct,true);
assert.equal(M.validateAnswer(String(cfg.expected+2*a.tol),cfg.expected,a.tol).correct,false);
});
test('invariants physiques indépendants, géométrie et unicité',()=>{
for(const [r,v] of refs['parallel-reliability-01'])close((100-v)/100,(1-.93)*(1-r));
for(const [s,v] of refs['induction-rotor-copper-loss-01'])close(v+(1-s/100)*15,15);
for(const [r,t] of refs['ntc-beta-temperature-01'])close(1/(t+273.15)-1/298.15,Math.log(r/10)/3950);
for(const [f,t] of refs['cantilever-tip-slope-01'])close((t/1000)*2*210e9*2e-6,f*1.5**2);
for(const [t,v] of refs['ideal-gas-sound-speed-01'])close(v*v/t,1.4*287);
for(const a of meta)assert.notEqual(D.render(a.id,a.min,M.calculate(a.id,a.min)),D.render(a.id,a.max,M.calculate(a.id,a.max)));
for(const [id,field,scale] of [['parallel-reliability-01','data-reliability-px',v=>340*v/100],['induction-rotor-copper-loss-01','data-loss-px',v=>350*v/100],['ntc-beta-temperature-01','data-temperature-px',v=>4*v],['cantilever-tip-slope-01','data-tip-deflection-px',v=>45*v/500],['ideal-gas-sound-speed-01','data-wave-spacing-px',v=>.25*v]]){
const a=meta.find(m=>m.id===id);for(const x of [a.min,a.initial,a.max]){const s=D.render(id,x,M.calculate(id,x));const px=Number(s.match(new RegExp(field+'="([^"]+)"'))[1]);const expected=scale(id==='parallel-reliability-01'||id==='ntc-beta-temperature-01'||id==='ideal-gas-sound-speed-01'?M.calculate(id,x):x);assert.ok(Math.abs(px-expected)<=0.00001,'SVG quantification géométrique');}
}
assert.ok(C.levels.length>=337);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
});
