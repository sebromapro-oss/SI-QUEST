'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:M,diagrams:D,meta}=require('../src/batch418-422.js'),C=require('../src/catalog.js');
const near=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),a+' ≠ '+b);
function independent(id,x){
switch(id){
case 'parallel-pumps-operating-flow-01':{let lo=0,hi=100;for(let k=0;k<100;k++){let q=(lo+hi)/2;if(40-.020*(q/2)**2-x*q*q>0)lo=q;else hi=q;}return (lo+hi)/2;}
case 'star-delta-starting-torque-01':return 180*(x/Math.sqrt(3))**2/400**2;
case 'carnot-engine-efficiency-01':return 100*(x-20)/(x+273.15);
case 'sensor-thermal-offset-01':return .4+(x-20)*.060;
case 'pontoon-metacentric-height-01':{const I=4*2**3/12,V=4*2*.5;return .25+I/V-x;}
default:throw Error('Référence manquante');}}
for(const a of meta)test(a.id+' : trois états, domaine, SVG, unité et HTML',()=>{
const html=fs.readFileSync('missions/'+a.id+'.html','utf8'),c=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(c.id,a.id);assert.equal(C.byId(a.id).subskill,a.subskill);
assert.equal((html.match(/<li>/g)||[]).length,3);assert.match(html,/lang="fr"/);assert.match(html,/Corrigé après trois essais/);
assert.match(html,/batch418-422\.js/);assert.match(html,/Objectifs, prérequis et réactivation/);
for(const x of [a.min,a.initial,a.max]){const y=M.calculate(a.id,x),svg=D.render(a.id,x,y);near(y,independent(a.id,x));assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);near(+svg.match(/data-geom-px="([^"]+)"/)[1],a.scale*y);assert.equal(M.assess(a.id,x).acceptable,y>=a.lo&&y<=a.hi);}
for(const x of [a.min-.01,a.max+.01,NaN,Infinity])assert.throws(()=>M.calculate(a.id,x),RangeError);
assert.throws(()=>D.render(a.id,a.initial,M.calculate(a.id,a.initial)+1),RangeError);
near(c.expected,independent(a.id,a.initial));assert.ok(M.answerPolicy[a.id].solution.includes('\n'));
});
test('invariants scientifiques et géométrie',()=>{
for(const k of [.006,.01,.016]){const q=M.calculate(meta[0].id,k);near(40-.020*(q/2)**2,k*q*q);assert.ok(q>0);}
for(const u of [360,400,440])near(M.calculate(meta[1].id,u)/180,(u/400)**2/3);
for(const t of [80,180,300]){const e=M.calculate(meta[2].id,t);assert.ok(e>0&&e<100);}
for(const t of [20,60,100])near(M.calculate(meta[3].id,t)-.4,.06*(t-20));
for(const kg of [.3,.5,.8]){const gm=M.calculate(meta[4].id,kg);assert.ok(gm>0);assert.match(D.render(meta[4].id,kg,gm),/Flottaison/);}
});
test('catalogue et audit historique corrigé',()=>{
assert.ok(C.levels.length>=422);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);assert.equal(C.worlds.length,17);
const gear=fs.readFileSync('missions/gear-ratio-02.html','utf8'),rolling=fs.readFileSync('missions/rolling-torque-01.html','utf8');
assert.match(gear,/>dents<\/text>/);assert.match(gear,/vitesse de sortie/);
assert.match(rolling,/couple équivalent à l'axe/);assert.match(rolling,/répartition des pressions au contact/);
});