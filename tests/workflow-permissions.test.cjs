'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

// Une CI publique ne doit jamais disposer implicitement d'un jeton en écriture.
// Ce test est une vérification structurelle ; il ne remplace pas l'audit des
// permissions effectives de l'installation GitHub ou des actions tierces.
const workflows=[
 'accueil-browser.yml',
 'recette-node.yml',
 'scientific-quality.yml',
 'si-quest-quality.yml'
];
for(const name of workflows){
 test('jeton Actions en lecture seule : '+name,()=>{
  const yaml=fs.readFileSync(path.join(__dirname,'../.github/workflows',name),'utf8');
  assert.match(yaml,/^permissions:\s*\r?\n\s+contents:\s*read\s*$/m,
   name+' doit définir explicitement permissions: contents: read');
  assert.doesNotMatch(yaml,/^\s+(?:actions|contents|deployments|id-token|packages|pull-requests|issues|checks|statuses):\s*write\s*$/m,
   name+' ne doit pas demander de permission GitHub en écriture');
 });
}
