'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const catalog=require('../src/catalog.js');

const root=path.resolve(__dirname,'..');
const pages=['index.html',...catalog.levels.map(level=>level.url)];
const attr=(tag,name)=>tag.match(new RegExp('\\b'+name+'\\s*=\\s*(["\\x27])([^"\\x27]*)\\1','i'))?.[2];
function assertLocalAsset(page,reference){
 assert.ok(reference,'Référence vide dans '+page);
 assert.doesNotMatch(reference,/^(?:[a-z][a-z\d+.-]*:|\/\/)/i,page+' : ressource distante ou schéma URI interdit');
 assert.ok(!reference.includes('?')&&!reference.includes('#'),page+' : référence de ressource non déterministe');
 const target=path.resolve(root,path.dirname(page),reference);
 const relative=path.relative(root,target);
 assert.ok(relative&&!relative.startsWith('..'+path.sep)&&relative!=='..'&&!path.isAbsolute(relative),
  page+' : ressource hors dépôt '+reference);
 assert.ok(fs.existsSync(target),page+' : ressource absente '+reference);
}
test('surface statique : 597 missions et accueil sans scripts distants ni soumission externe',()=>{
 assert.equal(catalog.levels.length,597,'Le nombre de missions doit être contrôlé séparément avant extension');
 for(const page of pages){
  const html=fs.readFileSync(path.join(root,page),'utf8');
  assert.doesNotMatch(html,/<iframe\b/i,page+' : iframe non autorisée');
  assert.doesNotMatch(html,/<[a-z][^>]*\s+on(?:click|load|error|submit|input|change|focus|blur|keydown|keyup|keypress|mouseover|pointerdown)\s*=/i,
   page+' : gestionnaire HTML inline interdit');
  assert.doesNotMatch(html,/\b(?:href|src|action)\s*=\s*["']\s*javascript\s*:/i,page+' : URL javascript interdite');
  for(const tag of html.match(/<script\b[^>]*>/gi)||[]){
   const src=attr(tag,'src');
   if(src!==undefined)assertLocalAsset(page,src);
  }
  for(const tag of html.match(/<link\b[^>]*>/gi)||[]){
   if(/\bstylesheet\b/i.test(attr(tag,'rel')||''))assertLocalAsset(page,attr(tag,'href'));
  }
  for(const tag of html.match(/<form\b[^>]*>/gi)||[]){
   assert.notEqual((attr(tag,'method')||'get').toLowerCase(),'post',page+' : formulaire POST non prévu');
   const action=attr(tag,'action');
   if(action!==undefined)assertLocalAsset(page,action);
  }
 }
});
test('feuilles CSS de production sans import ou URL réseau externe',()=>{
 for(const page of ['src/style.css','src/mission.css']){
  const css=fs.readFileSync(path.join(root,page),'utf8');
  assert.doesNotMatch(css,/@import\b/i,page+' : import CSS non autorisé');
  assert.doesNotMatch(css,/url\(\s*["']?\s*(?:[a-z][a-z\d+.-]*:|\/\/)/i,page+' : ressource réseau CSS non autorisée');
 }
});
