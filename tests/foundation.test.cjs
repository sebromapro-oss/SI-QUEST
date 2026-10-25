'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const c=require('../src/catalog.js');
test('17 univers scientifiques uniques',()=>{
  assert.equal(c.worlds.length,17);
  assert.equal(new Set(c.worlds.map(w=>w.id)).size,17);
  assert.ok(c.worlds.every(w=>w.title.trim()));
});
test('2 missions réellement référencées, dans des univers existants',()=>{
  assert.equal(c.levels.length,2);
  assert.deepEqual(c.levels.map(l=>l.id),['gear-01','hydro-01']);
  assert.ok(c.levels.every(l=>c.worlds.some(w=>w.id===l.world)));
  assert.equal(new Set(c.levels.map(l=>l.url)).size,c.levels.length);
});
test('objectifs non confondus avec missions disponibles',()=>{
  assert.deepEqual(c.targets,{universes:17,subskills:249,levels:996});
  assert.ok(c.levels.length<c.targets.levels);
});
