'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
test('circuit série : aucune dérivation court-circuitant la charge',()=>{
 const html=fs.readFileSync(path.join(__dirname,'../missions/electric-01.html'),'utf8');
 const valid='M65 50H170M260 50H370V70M370 110V130H65V108M65 72V50';
 const bypass='M65 50H170M260 50H370V130H65V108M65 72V50';
 assert.equal(html.split(valid).length-1,2,'fil et indicateur doivent interrompre la liaison à la charge');
 assert.equal(html.includes(bypass),false,'la dérivation électrique interdite doit être absente');
 assert.match(html,/<rect x="350" y="70" width="40" height="40"/);
});
