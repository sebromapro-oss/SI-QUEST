'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch353-357.js'),C=require('../src/catalog.js');
const refs={
'hydraulic-pump-shaft-torque-01':x=>(x*100000*25e-6)/(2*Math.PI*.9),
'hollow-shaft-elastic-twist-01':x=>x*1.2/(80e9*(Math.PI/32*(.06**4-.04**4)))*180/Math.PI,
'hydraulic-filter-bypass-capture-01':x=>.99*(100-x),
'threephase-compensated-line-current-01':x=>Math.sqrt(25+(4-x)**2)*1000/(400*Math.sqrt(3)),
'acoustic-energy-reflectance-01':x=>100*(1-4*1.5*x/(1.5+x)**2)};
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-8*Math.max(1,Math.abs(y)),x+' != '+y);
for(const a of meta)test(a.id+' : cas nominaux, limites, unités, SVG et invalides',()=>{
const html=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((html.match(/<li>/g)||[]).length,3);assert.equal((html.match(/batch353-357\\.js/g)||[]).length,1);
assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.inputUnits[a.id],a.iu);assert.equal(M.criteria[a.id].unit,a.u);
for(const x of [a.min,a.initial,a.max]){const y=M.calculate(a.id,x);near(y,refs[a.id](x));const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-geom-px/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
near(cfg.expected,M.calculate(a.id,a.initial));
assert.equal(M.validateAnswer(String(cfg.expected).replace('.',','),cfg.expected,a.tol).correct,true);
assert.equal(M.validateAnswer(String(cfg.expected+2*a.tol),cfg.expected,a.tol).correct,false);
});
test('invariants de conservation et catalogue sans seuil figé',()=>{
near(M.calculate('acoustic-energy-reflectance-01',1.5),0);
for(const z of [.5,1.5,3,4.5]){const r=(z-1.5)/(z+1.5),R=M.calculate('acoustic-energy-reflectance-01',z)/100,T=4*z*1.5/(z+1.5)**2;near(R+T,1);near(R,r*r);}
for(const b of [0,8,25]){const kept=M.calculate('hydraulic-filter-bypass-capture-01',b);near(kept+((100-b)/100)+(b),100);}
for(const q of [0,3,4,5]){const i=M.calculate('threephase-compensated-line-current-01',q);near(3*(400/Math.sqrt(3))*i*i,5000**2/1000+((4-q)*1000)**2/1000);}
assert.ok(C.levels.length>=357);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
});
