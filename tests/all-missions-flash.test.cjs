'use strict';
/** Contrat pédagogique transversal : trois questions de réactivation par mission.
 * Deux sources légitimes : liste HTML statique ou injection contrôlée par JS.
 * Un test vert ne valide pas la pertinence scientifique des questions.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');
const controller=fs.readFileSync(path.join(__dirname,'../src/investigation-mission.js'),'utf8');
const early=JSON.parse(controller.split('const earlyFlash=Object.freeze(')[1].split(');\nconst legacyFlash=')[0]);
const legacy=JSON.parse(controller.split('const legacyFlash=Object.freeze(')[1].split(');\nconst main=')[0]);

test('catalogue : 597 missions avec trois questions flash statiques ou dynamiques',()=>{
 assert.ok(catalog.levels.length>=597,'inventaire du catalogue inattendu');
 const defects=[];
 for(const m of catalog.levels){
  const file=path.join(__dirname,'..',m.url);
  if(!fs.existsSync(file)){defects.push(m.id+': page absente');continue;}
  const html=fs.readFileSync(file,'utf8');
  // Les anciennes pages utilisent aussi « Réactivation — trois questions flash »
  // ou un <details><summary>Trois questions flash</summary> : ne pas les ignorer.
  const hasFlashHeading=/(?:questions\s+flash|réactivation\s+mémoire)/i.test(html);
  const staticCount=hasFlashHeading?(html.match(/<li(?:\s[^>]*)?>/gi)||[]).length:0;
  const dynamic=early[m.id]||legacy[m.id];
  const dynamicCount=Array.isArray(dynamic)?dynamic.length:0;
  if(staticCount!==3 && !(staticCount===0&&dynamicCount===3))
   defects.push(m.id+': HTML='+staticCount+', contrôleur='+dynamicCount);
  if(staticCount===3&&dynamicCount===3&&!/hasStaticFlash/.test(controller))
   defects.push(m.id+': risque de double affichage');
 }
 assert.deepEqual(defects,[],'Missions non conformes :\n'+defects.join('\n'));
});
