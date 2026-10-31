'use strict';
/** SI QUEST V2.5 : contre-calculs indépendants des missions 10–17.
 * Quatre points par mission, 32 comparaisons numériques, unités et questions flash.
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const physics=require('../src/investigations.js'),diagrams=require('../src/investigation-diagrams.js'),catalog=require('../src/catalog.js');
const ids=["motion-01","accel-01","rotation-01","torque-01","pressure-01","flow-01","power-01","ohm-01"];
const refs=[x=>1.8*x,
x=>.8*x,
x=>2*Math.PI*x/60,
x=>.4*x,
x=>x/.005/100000,
x=>60*18/x,
x=>120*(2*Math.PI*x/60)/1000,
x=>12/x];
const source=fs.readFileSync('src/investigation-mission.js','utf8');
const flash=JSON.parse(source.split('const earlyFlash=Object.freeze(')[1].split(');\nconst legacyFlash=')[0]);
const near=(a,b,label)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=2e-8*Math.max(1,Math.abs(b)),label+': '+a+' ≠ '+b);
for(let i=0;i<ids.length;i++)test('audit indépendant mission '+(i+10)+' '+ids[i],()=>{
 const id=ids[i],item=catalog.byId(id);assert.ok(item,'catalogue absent');
 const html=fs.readFileSync(item.url,'utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(cfg.id,id);assert.match(html,/<html lang="fr"/);
 assert.equal(physics.criteria[id].unit,cfg.unit);assert.equal(physics.inputUnits[id],cfg.inputUnit);
 near(cfg.expected,refs[i](cfg.initial),id+' valeur nominale');
 for(const x of [cfg.min,(cfg.min+cfg.max)/2,cfg.initial,cfg.max]){
  const y=physics.calculate(id,x);near(y,refs[i](x),id+' '+x);
  const svg=diagrams.render(id,x,y);
  assert.match(svg,/<svg/);assert.match(svg,/<title/);assert.match(svg,/<desc/);
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 for(const bad of [NaN,Infinity,-Infinity])assert.throws(()=>physics.calculate(id,bad),RangeError);
 assert.equal((html.match(/<li>/g)||[]).length,0,'éviter les doubles questions flash');
 assert.equal(flash[id]?.length,3,'trois questions flash injectées');
 assert.equal(new Set(flash[id]).size,3);
 assert.ok(flash[id].every(q=>q.length>=25),'questions spécifiques');
});
test('10–34 : 25 jeux flash et 597 missions conservées',()=>{
 assert.equal(Object.keys(flash).length,25);
 assert.equal(new Set(ids).size,8);
 assert.ok(catalog.levels.length>=597);
});