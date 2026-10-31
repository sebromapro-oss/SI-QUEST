'use strict';
/** Contrat pédagogique transversal : 597 missions, trois questions de réactivation.
 * Un test vert ne valide pas la justesse scientifique des questions.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');

test('catalogue : chaque mission possède exactement trois questions flash',()=>{
 assert.equal(catalog.levels.length,597,'inventaire du catalogue inattendu');
 const defects=[];
 for(const m of catalog.levels){
  const file=path.join(__dirname,'..',m.url);
  if(!fs.existsSync(file)){defects.push(m.id+': page absente');continue;}
  const html=fs.readFileSync(file,'utf8');
  const flash=html.match(/<h3[^>]*>\s*Questions flash\s*<\/h3>\s*<ol[^>]*>([\s\S]*?)<\/ol>/i);
  const n=flash?(flash[1].match(/<li(?:\s[^>]*)?>/gi)||[]).length:0;
  if(n!==3)defects.push(m.id+': '+n+' question(s) flash');
 }
 assert.deepEqual(defects,[],'Missions non conformes :\n'+defects.join('\n'));
});
