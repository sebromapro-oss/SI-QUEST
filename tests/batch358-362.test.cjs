'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch358-362.js'),C=require('../src/catalog.js');
const refs={'hydraulic-local-loss-coefficient-01':x=>2*x*1e5/(850*16),'straight-fin-heat-rate-01':x=>{let z=.08*Math.sqrt(x*.064/(200*.00006));return Math.sinh(z)/Math.cosh(z)/z*x*.064*.08*60},'metrology-welch-effective-dof-01':x=>(.04**2+.03**2)**2/(.04**4/x),'encoder-measured-travel-01':x=>Math.PI*.2*x/(4*1024)*1000,'hydraulic-pump-loss-power-01':x=>5*(1-x/100)/(x/100)};
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-8*Math.max(1,Math.abs(y)),x+' != '+y);
for(const a of meta)test(a.id+' : modèle, unités, SVG, bornes',()=>{
const html=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((html.match(/<li>/g)||[]).length,3);assert.equal(html.split('batch358-362.js').length,2);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.inputUnits[a.id],a.iu);
for(const x of [a.min,a.initial,a.max]){const y=M.calculate(a.id,x);near(y,refs[a.id](x));const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-geom-px/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);near(Number(svg.match(/data-geom-px="([^"]+)/)[1]),a.scale*y);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
if(a.step===1)assert.throws(()=>M.calculate(a.id,a.initial+.5),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);near(cfg.expected,M.calculate(a.id,a.initial));
});
test('invariants et signe capacitif',()=>{
for(const x of [.1,.34,.8])near(M.calculate('hydraulic-local-loss-coefficient-01',x)*850*16/2,x*1e5);
for(const x of [10,30,50])assert.ok(M.calculate('straight-fin-heat-rate-01',x)<=x*.064*.08*60);
for(const x of [4,8,20])assert.ok(M.calculate('metrology-welch-effective-dof-01',x)>=x);
for(const x of [512,4096,8192])near(M.calculate('encoder-measured-travel-01',x)/x,200*Math.PI/4096);
for(const x of [65,80,95])near(5+M.calculate('hydraulic-pump-loss-power-01',x),5/(x/100));
const plus=D.render('threephase-compensated-line-current-01',0,M.calculate('threephase-compensated-line-current-01',0));
const minus=D.render('threephase-compensated-line-current-01',5,M.calculate('threephase-compensated-line-current-01',5));
assert.match(plus,/x1="295" y1="210" x2="295" y2="138"/);assert.match(minus,/x1="295" y1="210" x2="295" y2="228"/);
assert.equal(C.levels.length,362);assert.equal(new Set(C.levels.map(x=>x.id)).size,362);
});
test('hose-pressure-drop-01 : réactivation et domaine laminaire',()=>{const h=fs.readFileSync('missions/hose-pressure-drop-01.html','utf8');assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/Re = 4ρQ/);const q=2e-3/60,mu=.060,d=.012,rho=850;const re=4*rho*q/(Math.PI*mu*d);assert.ok(re<2300);near(M.calculate('hose-pressure-drop-01',2),128*mu*5*q/(Math.PI*d**4)/1e5);});
