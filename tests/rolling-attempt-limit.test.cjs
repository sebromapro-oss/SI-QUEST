'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const js=fs.readFileSync(path.join(__dirname,'../src/rolling-mission.js'),'utf8');
test('roulement : une quatrième validation est bloquée avant le calcul et le journal',()=>{
 const handler=js.match(/\$\('calc'\)\.addEventListener\('submit',e=>\{([\s\S]*?)\}\);\$\('hint'\)/);
 assert.ok(handler,'Gestionnaire de validation présent');
 const body=handler[1];
 const guard=body.indexOf('if(attempts>=3||passed)');
 const increment=body.indexOf('attempts=Math.min(3,attempts+1)');
 const evaluation=body.indexOf('passed=Math.abs(');
 assert.ok(guard>=0&&guard<increment&&increment<evaluation,'La limite doit précéder le calcul');
 assert.match(body.slice(guard,increment),/return\s*}/,'La quatrième validation doit sortir du gestionnaire');
});
