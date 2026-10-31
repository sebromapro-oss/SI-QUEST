'use strict';
/** SI QUEST V2.5 — audit scientifique indépendant des missions historiques 18 à 42.
 * 25 modèles × 4 points. Le test de structure SVG ne constitue pas une recette visuelle.
 * Les questions flash sont vérifiées en HTML (35–42) ou dans le contrôleur (18–34).
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const physics=require('../src/investigations.js');
const diagrams=require('../src/investigation-diagrams.js');
const catalog=require('../src/catalog.js');
const ids=["energy-01","heat-01","stress-01","strain-01","density-01","accuracy-01","frequency-01","kinetic-01","potential-01","impulse-01","friction-02","buoyancy-01","gear-eff-01","pulley-01","capacitor-01","resistance-02","thermal-exp-01","hydro-speed-01","work-01","frequency-period-01","hydro-force-02","beam-defl-01","circular-02","angular-accel-01","brake-torque-01"];
const references=[x=>240*x,
x=>2*460*x/1000,
x=>x/120,
x=>x*1000/(200000*100),
x=>x/.001,
x=>Math.abs(x-50),
x=>x/60,
x=>.5*1200*x*x/1000,
x=>250*9.81*x/1000,
x=>800*x,
x=>1200*x,
x=>1000*9.81*x,
x=>15*x,
x=>900*120/x,
x=>.0047*x,
x=>8+x,
x=>.024*x,
x=>(x/60000)/.004,
x=>400*x,
x=>1/x,
x=>(x*100000)*(Math.PI*.08**2/4),
x=>x*500**3/(3*210000*80000),
x=>x*x/.5,
x=>120/x,
x=>8*x];
const controller=fs.readFileSync('src/investigation-mission.js','utf8');
const earlyFlash=JSON.parse(controller.split('const earlyFlash=Object.freeze(')[1].split(');\nconst legacyFlash=')[0]);
const near=(actual,expected,label)=>assert.ok(Number.isFinite(actual)&&Number.isFinite(expected)&&Math.abs(actual-expected)<=2e-8*Math.max(1,Math.abs(expected)),label+': '+actual+' ≠ '+expected);
for(let i=0;i<ids.length;i++)test('audit indépendant mission '+(i+18)+' : '+ids[i],()=>{
 const id=ids[i],item=catalog.byId(id);
 assert.ok(item,'mission absente du catalogue');
 const html=fs.readFileSync(item.url,'utf8');
 const cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,id);
 assert.match(html,/<html lang="fr"/);
 assert.equal(physics.criteria[id].unit,cfg.unit);
 assert.equal(physics.inputUnits[id],cfg.inputUnit);
 near(cfg.expected,references[i](cfg.initial),id+' configuration initiale');
 for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
  const actual=physics.calculate(id,x),expected=references[i](x);
  near(actual,expected,id+' paramètre '+x+' '+cfg.inputUnit);
  const svg=diagrams.render(id,x,actual);
  assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 for(const bad of [NaN,Infinity,-Infinity])assert.throws(()=>physics.calculate(id,bad),RangeError);
 const staticFlash=(html.match(/<li>/g)||[]).length;
 if(i<17){
  assert.equal(staticFlash,0,'pas de double affichage de questions');
  assert.ok(Array.isArray(earlyFlash[id]),'questions de réactivation absentes');
  assert.equal(earlyFlash[id].length,3);
  assert.equal(new Set(earlyFlash[id]).size,3);
  assert.ok(earlyFlash[id].every(q=>q.length>=25&&!/\d{3,}/.test(q)),'questions non pédagogiques ou réponse numérique révélée');
 }else assert.equal(staticFlash,3,'trois questions flash dans la page');
});
test('lot 18–42 : 25 missions uniques, 17 jeux flash ajoutés, catalogue inchangé',()=>{
 assert.equal(ids.length,25);
 assert.equal(new Set(ids).size,25);
 assert.equal(Object.keys(earlyFlash).length,25);
 assert.ok(catalog.levels.length>=597);
 assert.match(controller,/const flashQuestions=earlyFlash\[c\.id\]\|\|legacyFlash\[c\.id\]/);
});