'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch543-547.js'),C=require('../src/catalog.js');
const refs=[x=>4000*(x*1e6)/(x*1e6+600e6)/1000,x=>Math.PI*(.025**2)*(2*.05)*(.025*100/.0001)*x,x=>835/(1+0.00085*(x-15)),x=>{let u=7+0.6*x;return u>10?10:u< -10?-10:u},x=>{let di=1/(1/50-1/x);return di/x}];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : contre-calcul, domaine, unités, SVG, HTML',()=>{
 const h=fs.readFileSync('missions/'+m.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal((h.match(/<script src=/g)||[]).length,4);
 assert.match(h,/lang="fr"/);assert.match(h,/id="feedback" role="status"/);assert.equal(m.solution.split('\n').length,5);
 near(cfg.expected,refs[i](m.initial));near((m.initial-m.min)/m.step,Math.round((m.initial-m.min)/m.step));
 for(const x of [m.min,m.initial,m.max]){const y=P.calculate(m.id,x),s=D.render(m.id,x,y);near(y,refs[i](x));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);const px=+s.match(/data-chart-x="([^"]+)"/)[1],py=+s.match(/data-chart-y="([^"]+)"/)[1];assert.ok(px>=95&&px<=655&&py>=388&&py<=471);assert.throws(()=>D.render(m.id,x,y+1),RangeError);}
 for(const x of [NaN,Infinity,null,'1',m.min-1,m.max+1])assert.throws(()=>P.calculate(m.id,x),RangeError);
});
test('invariants physiques et catalogue',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=547);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);near(P.calculate(meta[0].id,300),4*300/900);near(P.calculate(meta[1].id,.10)/P.calculate(meta[1].id,.02),5);near(P.calculate(meta[2].id,15),835);near(P.calculate(meta[3].id,10),10);near(P.calculate(meta[3].id,-10),1);near(P.calculate(meta[4].id,100),1);});
test('cinq configurations historiques : objectifs et prérequis traçables',()=>{for(const id of ["circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01"]){const h=fs.readFileSync('missions/'+id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.ok(cfg.objective.length>20);assert.ok(cfg.prerequisites.length>15);assert.ok(cfg.successCriteria.length>20);}});
test('graphiques de géométrie et saturation',()=>{const a=meta[3];near(P.calculate(a.id,10),10);const s=D.render(a.id,10,10);assert.match(s,/Écrêtage/);const l=meta[4];assert.match(D.render(l.id,200,P.calculate(l.id,200)),/image réelle inversée/);});

test('palier : flèche tangentielle au point supérieur de la bague',()=>{const m=meta[1],s=D.render(m.id,m.initial,P.calculate(m.id,m.initial));assert.match(s,/x1="320" y1="150" x2="382" y2="150"[^>]*marker-end="url\(#p543\)"/);});

test('Gazole : valeur arrondie du corrigé conforme au calcul indépendant',()=>{
 const m=meta.find(x=>x.id==='diesel-fuel-thermal-density-01');
 const rho=835/(1+0.00085*(35-15));
 assert.equal(rho.toFixed(3).replace('.',','),'821,042');
 assert.ok(m.detail.includes('ρ=835/1,017=821,042 kg/m³'));
 assert.ok(m.solution.includes('ρ=835/1,017=821,042 kg/m³'));
 assert.doesNotMatch(m.solution,/821,043/);
});
