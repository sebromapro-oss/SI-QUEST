'use strict';const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch598-602.js'),C=require('../src/catalog.js');
const refs=[x=>120*Math.PI*Math.cos(x*Math.PI/180)/Math.sin(x*Math.PI/180),x=>10*Math.sin(x*Math.PI/180)/Math.PI,x=>x*.001/(1.2566370614359173e-6*.0004)/1e6,x=>1e-6*1.4e9*1e6/((1-x/100)*1e6+(x/100)*1.4e9),x=>x*200/77];
test('catalogue 602 missions et 17 univers',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=602);assert.equal(new Set(C.levels.map(a=>a.id)).size,C.levels.length);});
for(const [i,a] of meta.entries())test(a.id+' : oracles indépendants, unités, limites, SVG',()=>{
const h=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(C.byId(a.id).subskill,a.subskill);assert.equal(cfg.expected,a.expected);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/lang="fr"/);
for(const name of ['calc','hint','solution','reset','trialValue','curve','point','feedback'])assert.ok(h.includes('id="'+name+'"'));
for(const x of [a.min,a.initial,a.max]){const y=P.calculate(a.id,x),r=refs[i](x),s=D.render(a.id,x,y);assert.ok(Math.abs(y-r)<1e-9*Math.max(1,Math.abs(r)));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);assert.throws(()=>D.render(a.id,x,y+Math.max(1,Math.abs(y)*.2)),RangeError);const p=s.match(/data-chart-x="([^"]+)" data-chart-y="([^"]+)"/);assert.ok(p&&+p[1]>=110&&+p[1]<=650&&+p[2]>=399&&+p[2]<=464);}
for(const x of [NaN,Infinity,null,'3',a.min-1,a.max+1])assert.throws(()=>P.calculate(a.id,x),RangeError);
assert.match(P.answerPolicy[a.id].solution,/Substitution et calcul/);
});
test('invariants physiques',()=>{assert.ok(P.calculate(meta[0].id,10)>P.calculate(meta[0].id,35));assert.ok(P.calculate(meta[1].id,35)>P.calculate(meta[1].id,10));assert.equal(P.calculate(meta[2].id,2),2*P.calculate(meta[2].id,1));assert.equal(P.calculate(meta[3].id,0),1400);assert.ok(P.calculate(meta[3].id,1)<100);assert.equal(P.calculate(meta[4].id,0),0);});
test('contrat trois essais et trois aides',()=>{const s=fs.readFileSync('src/investigation-mission.js','utf8');assert.match(s,/tries>=3\|\|mastered/);assert.match(s,/tries<3\|\|hints<3\|\|mastered/);});

test('les 597 missions historiques sont conservées dans leur ordre',()=>{const ids=require('./legacy-597-ids.json');assert.equal(ids.length,597);assert.deepEqual(C.levels.slice(0,597).map(a=>a.id),ids);});
