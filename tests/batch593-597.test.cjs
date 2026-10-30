'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch593-597.js'),C=require('../src/catalog.js');
const reference=[
x=>.8*5.670374419e-8*1.2*(x*x*x*x-293**4),
x=>(x*.2)/(1.4e-7),
x=>(20*x)+50,
x=>(8*.1*2*(x/60000))/(Math.PI*0.004**4)/1000,
x=>(8.8541878128e-12*2.5*.1)/(x/1000)*1e9
];
for(const [i,a] of meta.entries())test(a.id+' : références, limites, invalides et SVG',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(cfg.expected,a.expected);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/lang="fr"/);
for(const x of [a.min,a.initial,a.max]){const y=P.calculate(a.id,x),r=reference[i](x),s=D.render(a.id,x,y);assert.ok(Math.abs(y-r)<1e-9*Math.max(1,Math.abs(r)));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);assert.throws(()=>D.render(a.id,x,y+Math.max(1,Math.abs(y)*.2)),RangeError);const p=s.match(/data-chart-x="([^"]+)" data-chart-y="([^"]+)"/);assert.ok(p&&+p[1]>=110&&+p[1]<=650&&+p[2]>=399&&+p[2]<=464);}
for(const x of [NaN,Infinity,null,'3',a.min-1,a.max+1])assert.throws(()=>P.calculate(a.id,x),RangeError);
assert.match(P.answerPolicy[a.id].solution,/Substitution|Substitution et calcul/);
});
test('invariants physiques',()=>{assert.ok(P.calculate(meta[0].id,500)>P.calculate(meta[0].id,300));assert.equal(P.calculate(meta[1].id,.02),2*P.calculate(meta[1].id,.01));assert.equal(P.calculate(meta[2].id,0),50);assert.ok(Math.abs(P.calculate(meta[3].id,.4)-2*P.calculate(meta[3].id,.2))<1e-9);assert.ok(Math.abs(P.calculate(meta[4].id,2)-P.calculate(meta[4].id,1)/2)<1e-12);});
test('contrat aides : troisième erreur ne débloque pas les aides automatiquement',()=>{const c=fs.readFileSync('src/investigation-mission.js','utf8');assert.doesNotMatch(c,/else if\(tries===3\)\{hints=3;\}/);assert.match(c,/tries<3\|\|hints<3\|\|mastered/);});
test('catalogue 17 univers et 597 missions',()=>{assert.equal(C.worlds.length,17);assert.equal(C.levels.length,597);assert.equal(new Set(C.levels.map(x=>x.id)).size,597);for(const a of meta)assert.ok(fs.existsSync('missions/'+a.id+'.html'));});
