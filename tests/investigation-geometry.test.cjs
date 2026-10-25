'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const diagrams=require('../src/investigation-diagrams.js');
const physics=require('../src/investigations.js');
const render=(id,x)=>diagrams.render(id,x,physics.calculate(id,x));
const ids=['motion-01','accel-01','rotation-01','torque-01','pressure-01','flow-01','power-01','ohm-01','energy-01','heat-01','stress-01','strain-01','density-01','accuracy-01','frequency-01'];
for(const id of ids)test(id+' : schéma sans prose visible',()=>{
 const svg=render(id,12);
 const labels=[...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(m=>m[1]);
 assert.ok(labels.length>=1);
 for(const label of labels){
  const bare=label.replace(/kg\/m³|tr\/min|rad\/s|N·m|L\/min|MPa|kW|Wh|Hz|bar|mm²|mm|kg|kJ|Pa|Ω|V|A|W|K|N|s|m|L/g,'');
  assert.doesNotMatch(bare,/[A-Za-zÀ-ÿ]{3,}/u,id+': '+label);
 }
});
test('translation : position proportionnelle au temps',()=>{
 assert.match(render('motion-01',0),/<rect x="65" y="115" width="70"/);
 assert.match(render('motion-01',30),/<rect x="495" y="115" width="70"/);
});
test('démarrage : position quadratique',()=>{
 assert.match(render('accel-01',10),/<rect x="172.5" y="115" width="70"/);
 assert.match(render('accel-01',20),/<rect x="495" y="115" width="70"/);
});
test('levier : effort dirigé vers le bas',()=>{
 assert.match(render('torque-01',0),/x1="440" y1="95" x2="440" y2="104"/);
 assert.match(render('torque-01',300),/x1="440" y1="35" x2="440" y2="104"/);
});
test('vérin : piston fixe quand seul effort change',()=>{
 assert.match(render('pressure-01',0),/<rect x="278" y="70" width="15"/);
 assert.match(render('pressure-01',30000),/<rect x="278" y="70" width="15"/);
});
test('débit : longueur de flèche liée au débit',()=>{
 assert.match(render('flow-01',10),/x1="300" y1="110" x2="470" y2="110"/);
});
test('énergie : jauge de consommation cumulée',()=>{
 assert.match(render('energy-01',8),/<rect x="70" y="185" width="460" height="12" rx="5" fill="#ffd17d"/);
});
test('thermique : colonne liée à la variation de température',()=>{
 assert.match(render('heat-01',80),/<rect x="512" y="75" width="14" height="100"/);
});
test('traction : forces opposées et section constante',()=>{
 assert.match(render('stress-01',24000),/x1="170" y1="124" x2="75" y2="124"/);
 assert.match(render('stress-01',24000),/x1="430" y1="124" x2="525" y2="124"/);
});
test('déformation : longueur amplifiée et annoncée en description',()=>{
 assert.match(render('strain-01',20000),/<rect x="130" y="90" width="350" height="60"/);
 assert.match(render('strain-01',20000),/non à l’échelle/);
});
test('métrologie : référence distincte du curseur',()=>{
 assert.match(render('accuracy-01',49),/x1="100" y1="76" x2="100" y2="155"/);
 assert.match(render('accuracy-01',51),/x1="520" y1="76" x2="520" y2="155"/);
 assert.match(render('accuracy-01',50),/x1="310" y1="98" x2="310" y2="165"/);
});
test('rotation : repère radial au temps nul',()=>{
 assert.match(render('rotation-01',0),/x1="300" y1="113" x2="362" y2="113"/);
 assert.match(render('frequency-01',0),/x1="260" y1="119" x2="322" y2="119"/);
});
