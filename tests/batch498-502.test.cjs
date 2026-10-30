'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch498-502.js'),C=require('../src/catalog.js');
const refs=[x=>1/Math.hypot(1,1/(2*Math.PI*x*.001)),x=>1480*x/1e6,x=>x*.3,x=>{const vOut=24*x,tOn=x/20000;return (24-vOut)*tOn/.002},x=>x*(20/10000)*1000];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : modèle, graphe, HTML et catalogue',()=>{
const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8');
const cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);const step=Number(h.match(/id="trialValue"[^>]*step="([^"]+)"/)[1]);assert.ok(Math.abs((m.initial-m.min)/step-Math.round((m.initial-m.min)/step))<1e-8,'slider nominal aligné');assert.equal(m.solution.split('\n').length,5);
for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);near(y,refs[i](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-chart-x/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError);}
for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
near(cfg.expected,refs[i](m.initial));for(const chunk of h.split('<script src="').slice(1)){const p=chunk.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',p)),p);}
});
test('catalogue et historique : aucun doublon, traçabilité',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=502);assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
for(const [id,sub] of [["moment-arm-02","Moment scalaire d'une force oblique autour d'un pivot plan"],["kinetic-friction-01","Frottement cinétique d'un patin sur plan horizontal"],["spring-stiffness-01","Identification de la raideur par la loi de Hooke"],["beam-stress-02","Contrainte normale maximale en flexion simple d'une section rectangulaire"],["gear-ratio-02","Module du rapport de vitesses d'un engrenage extérieur"]]){assert.equal(C.byId(id).subskill,sub);assert.ok(fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8').includes(sub));}});

// Le courant triangulaire doit suivre l'ondulation calculée, pas une amplitude décorative constante.
test('buck : amplitude SVG proportionnelle à ΔI aux bornes et au nominal',()=>{
 const id='buck-inductor-current-ripple-01',samples=[.2,.5,.8];const heights=[];
 for(const duty of samples){const y=M.calculate(id,duty),svg=D.render(id,duty,y);
 const h=Number(svg.match(/data-ripple-height-px="([^"]+)"/)[1]);heights.push(h);
 assert.ok(Math.abs(h-85*y/.15)<1e-6,'amplitude proportionnelle à ΔI');
 const peak=svg.match(/M145 245 L([0-9.]+) ([0-9.]+) L575 245/);assert.ok(peak,'triangle présent');
 assert.ok(Math.abs(Number(peak[1])-(145+430*duty))<.001,'temps ON = D·T');
 assert.ok(Math.abs(Number(peak[2])-(245-h))<.001,'sommet synchronisé à ΔI');
 }assert.ok(heights[1]>heights[0]);assert.ok(Math.abs(heights[0]-heights[2])<1e-6);
});
