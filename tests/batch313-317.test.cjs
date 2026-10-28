'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{physics:M,diagrams:D,meta}=require('../src/batch313-317.js'),C=require('../src/catalog.js');
const refs={"rectangular-beam-max-shear-01":[[2,0.75],[10,3.75],[20,7.5]],"transformer-reflected-impedance-01":[[5,20],[18,72],[40,160]],"fourier-number-slab-01":[[20,0.05],[160,0.4],[600,1.5]],"weibull-component-reliability-01":[[200,96.07894391523232],[800,52.729242404304856],[1500,10.539922456186433]],"belt-effective-tension-01":[[3,1000],[6,500],[15,200]]};
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const a of meta)test(a.id+' : modèle, contre-calculs, unités, domaines, SVG',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,a.id);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(M.criteria[a.id].unit,a.u);assert.equal(M.inputUnits[a.id],a.iu);
for(const [x,y] of refs[a.id]){close(M.calculate(a.id,x),y);const svg=D.render(a.id,x,y);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-result=/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);}
for(const x of [a.min-1,a.max+1,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+10),RangeError);
assert.equal(M.validateAnswer(String(cfg.expected).replace('.',','),cfg.expected,a.tol).correct,true);
assert.equal(M.validateAnswer(String(cfg.expected+2*a.tol),cfg.expected,a.tol).correct,false);
});
test('invariants indépendants et catalogue',()=>{
for(const [x,y] of refs['rectangular-beam-max-shear-01'])close(y/(x*1000/4000),1.5);
for(const [x,y] of refs['transformer-reflected-impedance-01']){const i2=115/x,i1=i2/2;close(230/i1,y);close(230*i1,115*i2);}
for(const [x,y] of refs['fourier-number-slab-01'])close(y*.02**2,1e-6*x);
for(const [x,y] of refs['weibull-component-reliability-01'])close(-Math.log(y/100),Math.pow(x/1000,2));
for(const [x,y] of refs['belt-effective-tension-01'])close(x*y,3000);
assert.ok(C.levels.length>=317);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(new Set(C.levels.map(x=>x.world)).size,17);
});

test('transformateur : primaire ouvert sans court-circuit graphique',()=>{const s=D.render('transformer-reflected-impedance-01',18,72);assert.doesNotMatch(s,/x1="130" y1="90" x2="130" y2="190"/);assert.match(s,/x1="130" y1="90" x2="155" y2="90"/);assert.match(s,/x1="430" y1="155" x2="430" y2="190"/);});
