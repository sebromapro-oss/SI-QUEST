'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch508-512.js'),C=require('../src/catalog.js');
const refs=[x=>x*0.8*4/60,x=>x*x/150,x=>{const charge=x*1800,moles=.9*charge/(2*96485),mass=moles*.063546;return mass/(8960*.02)*1e6},x=>{const wf=.6*120+.4*x;return .5*.6*120**2+.5*.4*x*x-.5*wf*wf},x=>Math.pow(x*x/(9.81*1.44),1/3)];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : contre-calcul, domaine, graphique, page et modèle',()=>{
 const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
 assert.match(h,/<html lang="fr">/);assert.match(h,/href="#main"/);assert.match(h,/for="answer"/);assert.match(h,/id="feedback" role="status"/);
 assert.equal((h.match(/<script src=/g)||[]).length,4);
 const step=Number(h.match(/id="trialValue"[^>]*step="([^"]+)"/)[1]);near((m.initial-m.min)/step,Math.round((m.initial-m.min)/step));
 assert.equal(m.solution.split('\n').length,5);near(cfg.expected,refs[i](m.initial));
 let values=[];
 for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);values.push(y);near(y,refs[i](x));
 assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-chart-x/);if(m.id==='bearing-outer-race-bpfo-01'){assert.match(svg,/r="85\.2"/);assert.match(svg,/r="56\.8"/);assert.equal((svg.match(/r="14\.2"/g)||[]).length,8,'huit billes tangentes aux pistes');}assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 const px=Number(svg.match(/data-chart-x="([^"]+)"/)[1]),py=Number(svg.match(/data-chart-y="([^"]+)"/)[1]);assert.ok(px>=95&&px<=655&&py>=388&&py<=470);
 assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError);}
 assert.ok(i===3?values[0]>values[1]&&values[1]>values[2]:values[0]<values[1]&&values[1]<values[2]);
 for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
 for(const part of h.split('<script src="').slice(1)){const p=part.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',p)),p);}
});
test('catalogue, unicité et traçabilité historique 40–75',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=512);assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
for(const [id,sub] of Object.entries({"electrical-parallel-01":"Résistance équivalente de deux résistances en parallèle","inductor-energy-01":"Énergie magnétique stockée dans une inductance linéaire","mechanical-efficiency-02":"Puissance utile d'une transmission à rendement donné","rolling-torque-01":"Couple résistant équivalent à l'axe d'une roue en roulement","thermal-resistance-01":"Résistance thermique d'une paroi plane par conduction stationnaire"})){assert.equal(C.byId(id).subskill,sub);assert.ok(fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8').includes(sub));}
});
