'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const modules=['rolling','cooling','electric','slope','spring','lever'];
for(const name of modules){
 test(name+' : validation arrêtée au troisième essai',()=>{
  const src=fs.readFileSync(path.join(__dirname,'../src/'+name+'-mission.js'),'utf8');
  const start=src.indexOf("addEventListener('submit',e=>{");
  assert.ok(start>=0,name+' : gestionnaire de formulaire');
  const body=src.slice(start,start+450);
  const guard=body.indexOf('if(attempts>=3)');
  const increment=body.indexOf('attempts=Math.min(3,attempts+1)');
  assert.ok(guard>=0&&increment>guard,name+' : garde avant incrément');
  assert.match(body.slice(guard,increment),/return\s*}/,name+' : arrêt effectif de la validation');
 });
}
