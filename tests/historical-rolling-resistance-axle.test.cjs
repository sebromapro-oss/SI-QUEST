'use strict';const test=require('node:test'),assert=require('node:assert/strict'),M=require('../src/investigations.js'),D=require('../src/investigation-diagrams.js');
test('résistance au roulement : force équivalente à l’axe, amplitude synchronisée',()=>{
 let prev=-1;
 for(const c of [.005,.025,.05]){
  const svg=D.render('rolling-load-01',c,M.calculate('rolling-load-01',c));
  const match=svg.match(/<line x1="275" y1="130" x2="([0-9.]+)" y2="130"[^>]*data-roulement-application="axe"[^>]*data-roulement-longueur-px="([0-9.]+)"/);
  assert.ok(match,'Force de résistance équivalente absente à l’axe');
  const len=Number(match[2]);assert.ok(len>prev);assert.ok(Math.abs(275-Number(match[1])-len)<1e-6);prev=len;
 }
});
