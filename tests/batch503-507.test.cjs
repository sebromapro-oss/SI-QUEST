'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch503-507.js'),C=require('../src/catalog.js');
const refs=[x=>2*.072/(x*.001),x=>x/(1.2566370614359173e-6*1800*.0004)/1000,x=>1000*(x-5.1)/330,x=>x/3.78,x=>20*Math.exp(1.15*Math.log(5/x))];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : calcul indépendant, domaine, SVG, pédagogie et page',()=>{
const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8');
const cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
assert.match(h,/<html lang="fr">/);assert.match(h,/href="#main"/);assert.match(h,/for="answer"/);assert.match(h,/id="feedback" role="status"/);
assert.equal((h.match(/<script src=/g)||[]).length,4,'pas de chaîne de 52 scripts');
const step=Number(h.match(/id="trialValue"[^>]*step="([^"]+)"/)[1]);assert.ok(Math.abs((m.initial-m.min)/step-Math.round((m.initial-m.min)/step))<1e-8);
assert.equal(m.solution.split('\n').length,5);near(cfg.expected,refs[i](m.initial));
for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);near(y,refs[i](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-chart-x/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);if(m.id==='zener-series-resistor-current-01'){assert.match(svg,/<circle cx="130" cy="260"/);assert.match(svg,/M452 234 L452 240 L508 240 L508 246/);}assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError);}
for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
for(const part of h.split('<script src="').slice(1)){const p=part.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',p)),p);}
});
test('catalogue et corrections historiques, sans perte',()=>{assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=507);assert.equal(new Set(C.levels.map(v=>v.id)).size,C.levels.length);
for(const [id,sub] of Object.entries({"screw-lead-01":"Avance axiale par tour d'une vis à plusieurs filets","hydro-cylinder-speed-02":"Vitesse de rentrée d'un vérin par la section annulaire","hydro-annular-force-01":"Effort de rentrée d'un vérin hydraulique à section annulaire","pneumatic-consumption-01":"Volume géométrique balayé par un piston pneumatique","electrical-series-01":"Résistance équivalente de deux résistances en série"})){assert.equal(C.byId(id).subskill,sub);assert.ok(fs.readFileSync(path.join(__dirname,'../missions',id+'.html'),'utf8').includes(sub));}
assert.equal(C.byId('hydro-cylinder-speed-02').title,'Vérin double effet — Vitesse de rentrée');
});

// θ=0° impose une tangente verticale à la paroi et un rayon de courbure égal au rayon du tube.
test('ménisque : rayon proportionnel et tangentes verticales au mouillage parfait',()=>{
 const id='capillary-meniscus-pressure-01';
 for(const x of [.3,.6,1.5]){const svg=D.render(id,x,M.calculate(id,x));
 const w=Number(svg.match(/data-meniscus-radius-px="([^"]+)"/)[1]);assert.ok(Math.abs(w-45*x)<1e-6);
 const a=350-w,b=350+w;assert.ok(svg.includes('M'+a+' 238 C'+a+' '),'tangente gauche verticale');
 assert.ok(svg.includes(' '+b+' 238 L'+b+' 315'),'arrivée droite');assert.ok(238+w<315,'ménisque dans le tube');
 assert.doesNotMatch(svg,/ Q350 276 /,'ancienne parabole non conforme supprimée');
 }
});
