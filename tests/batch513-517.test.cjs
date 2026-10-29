'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch513-517.js'),C=require('../src/catalog.js');
const refs=[x=>Math.SQRT2*(2*Math.PI*x*.015*Math.SQRT2),x=>x*(.01/.005)*.002,x=>Math.sqrt(x/(.15*.06))/(Math.PI/30),x=>5*Math.sqrt(x*x+9),x=>x*(Math.PI*.04**2/4)/(Math.PI*.025**2/4)];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : calcul contradictoire, domaine, SVG et contrat pédagogique',()=>{
 const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
 assert.match(h,/<html lang="fr">/);assert.match(h,/href="#main"/);assert.match(h,/for="answer"/);assert.match(h,/id="feedback" role="status"/);
 assert.equal((h.match(/<script src=/g)||[]).length,4);
 const step=Number(h.match(/id="trialValue"[^>]*step="([^"]+)"/)[1]);near((m.initial-m.min)/step,Math.round((m.initial-m.min)/step));
 assert.equal(m.solution.split('\n').length,5);near(cfg.expected,refs[i](m.initial));
 const ys=[];
 for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);ys.push(y);near(y,refs[i](x));
 assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-chart-x/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 const px=Number(svg.match(/data-chart-x="([^"]+)"/)[1]),py=Number(svg.match(/data-chart-y="([^"]+)"/)[1]);assert.ok(px>=95&&px<=655&&py>=388&&py<=470);
 assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError);}
 assert.ok(ys[0]<ys[1]&&ys[1]<ys[2]);
 for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
 for(const part of h.split('<script src="').slice(1)){const p=part.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',p)),p);}
});
test('catalogue unique et correction historique',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=517);assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
const id='measurement-uncertainty-01',sub='Conversion d’une incertitude absolue en incertitude relative';
assert.equal(C.byId(id).subskill,sub);const h=fs.readFileSync('missions/'+id+'.html','utf8');assert.ok(h.includes(sub));assert.match(h,/"subskill":/);
});
