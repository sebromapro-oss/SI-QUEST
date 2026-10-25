'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const catalog=require('../src/catalog.js');
test('toutes les missions référencées ont une page et leurs scripts',()=>{
  for(const mission of catalog.levels){
    const page=fs.readFileSync(path.join(root,mission.url),'utf8');
    assert.match(page,/<main\b/);
    assert.match(page,/role="status"/);
    assert.match(page,/<svg\b/);
    assert.match(page,/<form\b/);
    const scripts=[...page.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
    assert.ok(scripts.length>=2);
    for(const script of scripts)assert.ok(fs.existsSync(path.resolve(root,path.dirname(mission.url),script)),script);
  }
});
test('mission hydraulique : réglages, arrêt et descriptions accessibles',()=>{
  const page=fs.readFileSync(path.join(root,'missions/hydro-01.html'),'utf8');
  for(const id of ['area','pmin','vout','vin','pressure','flow','trial','stop','motion-status','decision']){
    assert.ok(page.includes('id="'+id+'"'),id);
  }
  assert.match(page,/aria-labelledby="svg-title svg-desc"/);
  assert.match(page,/prefers-reduced-motion|mission\.css/);
});
test('accueil ne promet pas 996 niveaux disponibles',()=>{
  const page=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.match(page,/niveaux visés/);
  assert.match(page,/missions disponibles/);
});

test('repli textuel du schéma et en-tête adaptable au mobile',()=>{
  const page=fs.readFileSync(path.join(root,'missions/hydro-01.html'),'utf8');
  const style=fs.readFileSync(path.join(root,'src/style.css'),'utf8');
  assert.match(page,/Lecture du schéma : chambre fond/);
  assert.match(style,/header\{[^}]*flex-wrap:wrap/);
});
