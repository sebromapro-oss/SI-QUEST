'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {physics:M,diagrams:D,meta}=require('../src/batch523-527.js'),C=require('../src/catalog.js');
const refs=[x=>25*x,x=>12000/x,x=>Math.atan2((5900/1480)*Math.sin(x*Math.PI/180),Math.sqrt(1-Math.pow((5900/1480)*Math.sin(x*Math.PI/180),2)))*180/Math.PI,x=>Math.sqrt((x-1.45)*(x+1.45)),x=>Math.exp(1.4*Math.log(x))];
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),a+' ≠ '+b);
for(const [i,m] of meta.entries())test(m.id+' : calcul contradictoire, bornes, SVG et pédagogie',()=>{
 const h=fs.readFileSync(path.join(__dirname,'../missions',m.id+'.html'),'utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,m.id);assert.equal(C.byId(m.id).subskill,m.subskill);assert.equal((h.match(/<li>/g)||[]).length,3);
 assert.match(h,/<html lang="fr">/);assert.match(h,/href="#main"/);assert.match(h,/id="feedback" role="status"/);assert.match(h,/id="answer" inputmode="decimal"/);
 assert.equal((h.match(/<script src=/g)||[]).length,4);near((m.initial-m.min)/m.step,Math.round((m.initial-m.min)/m.step));assert.equal(m.solution.split('\n').length,5);near(cfg.expected,refs[i](m.initial));
 for(const x of [m.min,m.initial,m.max]){const y=M.calculate(m.id,x),svg=D.render(m.id,x,y);near(y,refs[i](x));assert.match(svg,/<title/);assert.match(svg,/<desc/);assert.match(svg,/data-chart-x/);assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 const px=Number(svg.match(/data-chart-x="([^"]+)"/)[1]),py=Number(svg.match(/data-chart-y="([^"]+)"/)[1]);assert.ok(px>=95&&px<=655&&py>=388&&py<=470);assert.throws(()=>D.render(m.id,x,y+Math.max(.1,Math.abs(y)*.1)),RangeError)}
 for(const x of [NaN,Infinity,m.min-1,m.max+1])assert.throws(()=>M.calculate(m.id,x),RangeError);
 for(const part of h.split('<script src="').slice(1)){const p=part.split('"')[0];assert.ok(fs.existsSync(path.resolve(__dirname,'../missions',p)),p)}
});
test('catalogue et traçabilité des cinq missions historiques corrigées',()=>{
 assert.equal(C.worlds.length,17);assert.ok(C.levels.length>=527);assert.equal(new Set(C.levels.map(x=>x.id)).size,C.levels.length);
 for(const id of ['torsion-01','axial-strain-01','gear-mesh-01','belt-speed-01','hydro-power-01']){const h=fs.readFileSync('missions/'+id+'.html','utf8'),cfg=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(cfg.subskill,C.byId(id).subskill)}
 assert.match(meta[2].detail,/0,554812/);const angle=8*Math.PI/180,angle2=M.calculate('ultrasonic-snell-refraction-01',8)*Math.PI/180;near(Math.sin(angle2)/Math.sin(angle),5900/1480);
 const na=M.calculate('fiber-numerical-aperture-01',1.48);near(na*na+1.45*1.45,1.48*1.48);
});

test('Snell : normale pointillée et flèches des rayons incident et transmis',()=>{
 const m=meta[2],svg=D.render(m.id,m.initial,M.calculate(m.id,m.initial));
 assert.match(svg,/x1="374" y1="127" x2="374" y2="371"[^>]*stroke-dasharray="7 6"/);
 assert.match(svg,/marker-end="url\(#raygreen\)"/);
 assert.match(svg,/marker-end="url\(#rayorange\)"/);
 assert.equal((svg.match(/marker-end="url\(#ray(?:green|orange)\)"/g)||[]).length,2);
});
