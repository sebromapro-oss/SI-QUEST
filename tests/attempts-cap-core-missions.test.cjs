'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const modules=['rolling','cooling','electric','slope','spring','lever','braking'];
for(const name of modules){
 test(name+' : validation arrêtée au troisième essai',()=>{
  const src=fs.readFileSync(path.join(__dirname,'../src/'+name+'-mission.js'),'utf8');
  const start=src.indexOf("addEventListener('submit'");
  assert.ok(start>=0,name+' : gestionnaire de formulaire');
  const body=src.slice(start,start+450);
  const guard=body.indexOf('if(attempts>=3||passed)');
  const increment=body.indexOf('attempts=Math.min(3,attempts+1)');
  assert.ok(guard>=0&&increment>guard,name+' : garde avant incrément');
  assert.match(body.slice(guard,increment),/return;?\s*}/,name+' : arrêt effectif de la validation');
 });
}

for(const [name,form,counter,success] of [
 ['hydro','calculations','state.attempts','state.calculationPassed'],
 ['gear','task','state.calculationAttempts','state.calculationPassed']
]){
 test(name+' : verrouillage de la quatrième soumission et persistance bornée',()=>{
  const src=fs.readFileSync(path.join(__dirname,'../src/'+name+'-mission.js'),'utf8');
  const start=src.indexOf("$('"+form+"').addEventListener('submit'");
  assert.ok(start>=0,'gestionnaire présent');
  const body=src.slice(start,start+1100);
  const guard=body.indexOf('if('+counter+'>=3||'+success+')');
  const increment=body.indexOf(counter+'++');
  assert.ok(guard>=0&&increment>guard,'garde avant incrément');
  assert.match(body.slice(guard,increment),/return;/,'arrêt effectif');
  assert.ok(src.includes('Math.min(saved.'+(name==='gear'?'calculationAttempts':'attempts')+',3)'),'borne de restauration');
  assert.ok(src.includes(`querySelector('button[type="submit"]').disabled=`+counter+'>=3||'+success),'bouton verrouillé');
 });
}
