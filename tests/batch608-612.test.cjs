'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch608-612.js'),C=require('../src/catalog.js');
const refs=[x=>(160-80)/x,x=>80/Math.exp(x/45),x=>30+2*x,x=>(x*1e3)*(Math.PI*.08*.08/4),x=>(.5*850)*((x*1e-3/60)/(.62*(Math.PI*.004*.004/4)))**2/1e5];
test('607 missions antérieures préservées, 17 univers, aucune duplication',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=612);assert.equal(new Set(C.levels.map(a=>a.id)).size,C.levels.length);assert.deepEqual(C.levels.slice(0,597).map(a=>a.id),require('./legacy-597-ids.json'));assert.deepEqual(C.levels.slice(607,612).map(a=>a.id),meta.map(a=>a.id));});
for(const [i,a] of meta.entries())test(a.id+' : oracles, unités, limites, SVG et corrigé',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(cfg.expected,a.expected);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/lang="fr"/);
for(const name of ['calc','hint','solution','reset','trialValue','curve','point','feedback'])assert.ok(h.includes('id="'+name+'"'));
for(const x of [a.min,a.initial,a.max]){
const y=P.calculate(a.id,x),r=refs[i](x),s=D.render(a.id,x,y);
assert.ok(Math.abs(y-r)<1e-9*Math.max(1,Math.abs(r)),a.id+' '+x);
assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);
assert.throws(()=>D.render(a.id,x,y+Math.max(1,Math.abs(y)*.2)),RangeError);
const p=s.match(/data-chart-x="([^"]+)" data-chart-y="([^"]+)"/);assert.ok(p&&+p[1]>=110&&+p[1]<=650&&+p[2]>=399&&+p[2]<=464);
}
for(const x of [NaN,Infinity,null,'3',a.min-1,a.max+1])assert.throws(()=>P.calculate(a.id,x),RangeError);
assert.match(P.answerPolicy[a.id].solution,/Substitution et calcul/);
});
test('invariants de physique indépendants',()=>{assert.equal(P.calculate(meta[0].id,2),4*P.calculate(meta[0].id,8));assert.equal(P.calculate(meta[1].id,0),80);assert.ok(Math.abs(P.calculate(meta[1].id,45)-80/Math.E)<1e-10);assert.equal(P.calculate(meta[2].id,24),78);assert.equal(P.calculate(meta[3].id,40),2*P.calculate(meta[3].id,20));assert.ok(Math.abs(P.calculate(meta[4].id,20)/P.calculate(meta[4].id,10)-4)<1e-12);});
test('trois essais et trois aides préservés',()=>{const s=fs.readFileSync('src/investigation-mission.js','utf8');assert.match(s,/tries>=3\|\|mastered/);assert.match(s,/tries<3\|\|hints<3\|\|mastered/);});
