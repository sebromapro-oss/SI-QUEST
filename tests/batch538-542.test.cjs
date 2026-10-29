'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics:P,diagrams:D,meta}=require('../src/batch538-542.js'),C=require('../src/catalog.js');
const refs=[x=>x*632.8e-6/2,x=>Math.sqrt(2*1.602176634e-19*x*1e-3*1e4)*1e9,x=>Math.PI*2.5*Math.cos(x*Math.PI/180),x=>x*1e5*.03/(2*.0015*210e9)*1e6,x=>300-.004*300*(x-25)];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : science, unités, bornes, SVG, pédagogie',()=>{
const h=fs.readFileSync('missions/'+m.id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);assert.equal((h.match(/<script src=/g)||[]).length,4);
assert.match(h,/lang="fr"/);assert.match(h,/id="feedback" role="status"/);assert.equal(m.solution.split('\n').length,5);
near(cfg.expected,refs[i](m.initial));near((m.initial-m.min)/m.step,Math.round((m.initial-m.min)/m.step));
for(const x of [m.min,m.initial,m.max]){const y=P.calculate(m.id,x),s=D.render(m.id,x,y);near(y,refs[i](x));assert.match(s,/<title/);assert.match(s,/<desc/);assert.doesNotMatch(s,/NaN|Infinity|undefined/);
const px=+s.match(/data-chart-x="([^"]+)"/)[1],py=+s.match(/data-chart-y="([^"]+)"/)[1];assert.ok(px>=95&&px<=655&&py>=388&&py<=470);assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError)}
for(const x of [NaN,Infinity,null,'1',m.min-1,m.max+1])assert.throws(()=>P.calculate(m.id,x),RangeError);
});
test('interféromètre : le nombre de franges doit être entier',()=>assert.throws(()=>P.calculate(meta[0].id,100.5),RangeError));
test('invariants physiques et catalogue',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=542);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);near(P.calculate(meta[0].id,200),2*P.calculate(meta[0].id,100));near(P.calculate(meta[1].id,2),Math.sqrt(2)*P.calculate(meta[1].id,1));assert.ok(P.calculate(meta[2].id,15)>P.calculate(meta[2].id,30));near(P.calculate(meta[3].id,80),2*P.calculate(meta[3].id,40));near(P.calculate(meta[4].id,25),300)});
test('10 configurations historiques : sous-savoir cohérent avec catalogue',()=>{for(const id of ['screw-lead-01','hydro-cylinder-speed-02','hydro-annular-force-01','pneumatic-consumption-01','electrical-series-01','moment-arm-02','kinetic-friction-01','spring-stiffness-01','beam-stress-02','gear-ratio-02']){const h=fs.readFileSync('missions/'+id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(cfg.subskill,C.byId(id).subskill)}});

test('tube : quatre vecteurs de pression orientés et marqueur SVG',()=>{const m=meta[3],s=D.render(m.id,m.initial,P.calculate(m.id,m.initial));assert.equal((s.match(/marker-end="url\(#p538\)"/g)||[]).length,4);assert.match(s,/<marker id="p538"/)});
