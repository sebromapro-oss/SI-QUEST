const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('missions/braking-01.html','utf8');
const js=fs.readFileSync('src/braking-mission.js','utf8');
const catalog=fs.readFileSync('src/catalog.js','utf8');
test('all mission JS element references resolve to actual HTML IDs',()=>{
 const ids=[...js.matchAll(/\$\('([^']+)'\)/g)].map(match=>match[1]);
 assert.ok(ids.length>=15);
 for(const id of new Set(ids))assert.ok(html.includes('id="'+id+'"'),'missing #'+id);
});
test('every form control has an accessible label',()=>{
 for(const id of ['reaction','braking','total','obstacle','time'])
 assert.ok(html.includes('for="'+id+'"'),'missing label for '+id);
});
test('simulation supports keyboard time slider and reduced motion',()=>{
 assert.ok(html.includes('type="range"'));
 assert.ok(js.includes('prefers-reduced-motion: reduce'));
 assert.ok(js.includes("addEventListener('input'"));
 assert.ok(html.includes('id="frameText"'));
});
test('registered in catalog with correct scientific universe and path',()=>{
 assert.ok(catalog.includes("id:'braking-01',world:'SI-01'"));
 assert.ok(catalog.includes("url:'missions/braking-01.html'"));
});
