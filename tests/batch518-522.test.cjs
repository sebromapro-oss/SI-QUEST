'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch518-522.js'),C=require('../src/catalog.js');
const refs=[x=>(x/60)*.5*(1-8/40),x=>(500/.25)*(4*Math.PI*1e-7)*x*1000,x=>Math.sqrt(x/.02)/3,x=>Math.exp(Math.log(2/(x+1))*x/(x-1)),x=>Math.sqrt((x*1e9)/7850)];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : calcul contradictoire, bornes, SVG, pédagogie et accessibilité structurelle',()=>{const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);assert.match(h,/<html lang="fr">/);assert.match(h,/href="#main"/);assert.match(h,/id="feedback" role="status"/);assert.match(h,/id="answer" inputmode="decimal"/);assert.equal((h.match(/<script src=/g)||[]).length,4);near((m.initial-m.min)/m.step,Math.round((m.initial-m.min)/m.step));assert.equal(m.solution.split('\n').length,5);near(cfg.expected,refs[i](m.initial));for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);near(y,refs[i](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-chart-x/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);const px=Number(svg.match(/data-chart-x="([^"]+)"/)[1]),py=Number(svg.match(/data-chart-y="([^"]+)"/)[1]);assert.ok(px>=95&&px<=655&&py>=388&&py<=470);assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError)}for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);for(const part of h.split('<script src="').slice(1)){const p=part.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',p)),p)}});
test('catalogue et sous-savoirs historiques explicites dans la configuration',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=522);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);for(const id of ["circular-02","angular-accel-01","brake-torque-01","incline-force-01","resultant-01"]){const h=fs.readFileSync('missions/'+id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(cfg.subskill,C.byId(id).subskill)}});

test('roulement FTF : proportions d/D et contacts de roulement géométriquement cohérents',()=>{
 const m=meta[0],svg=D.render(m.id,m.initial,M.calculate(m.id,m.initial));
 const rings=[...svg.matchAll(/<circle cx="374" cy="239" r="([0-9.]+)"/g)].map(x=>Number(x[1]));
 const ball=svg.match(/<circle cx="449(?:\.000)?" cy="239(?:\.000)?" r="([0-9.]+)"/);
 assert.equal(rings.length,2);assert.ok(ball,'Bille au point de droite absente');
 const [outer,inner]=rings,rBall=Number(ball[1]),pitch=449-374;
 near(rBall/pitch,8/40);near(inner+rBall,pitch);near(outer-rBall,pitch);
 assert.equal((svg.match(/r="15" fill="#e1e9ee"/g)||[]).length,8);
});
