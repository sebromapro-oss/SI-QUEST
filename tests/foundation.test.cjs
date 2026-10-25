'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const c=require('../src/catalog.js');
test('17 univers scientifiques uniques',()=>{
  assert.equal(c.worlds.length,17);
  assert.equal(new Set(c.worlds.map(w=>w.id)).size,17);
  assert.ok(c.worlds.every(w=>w.title.trim()));
});
test('catalogue synchronisé avec les fichiers des missions, sans compteur fictif',()=>{
  const actual=fs.readdirSync(path.join(__dirname,'../missions'))
    .filter(n=>n.endsWith('.html')).map(n=>'missions/'+n).sort();
  const registered=c.levels.map(l=>l.url).sort();
  assert.deepEqual(registered,actual);
  assert.ok(c.levels.length>0);
  assert.equal(new Set(c.levels.map(l=>l.id)).size,c.levels.length);
  assert.ok(c.levels.every(l=>c.worlds.some(w=>w.id===l.world)));
  assert.equal(new Set(registered).size,c.levels.length);
  assert.ok(c.levels.every(l=>c.byId(l.id)===l));
});
test('objectifs non confondus avec missions disponibles',()=>{
  assert.deepEqual(c.targets,{universes:17,subskills:249,levels:996});
  assert.ok(c.levels.length<c.targets.levels);
});
