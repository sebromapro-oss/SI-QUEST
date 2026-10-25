'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),catalog=require('../src/catalog.js');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('nine mission pages retain keyboard landmarks, labels and described diagrams',()=>{
 for(const mission of catalog.levels){
  const html=read(mission.url),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(new Set(ids).size,ids.length,mission.id+' duplicate IDs');
  assert.match(html,/<html\b[^>]*lang="fr"/,mission.id+' language');
  assert.match(html,/name="viewport"/,mission.id+' viewport');
  assert.match(html,/<a\b[^>]*href="#main"/,mission.id+' skip link');
  assert.match(html,/<main\b[^>]*id="main"/,mission.id+' main landmark');
  assert.match(html,/role="status"/,mission.id+' status region');
  const svg=html.match(/<svg\b[^>]*aria-labelledby="([^"]+)"[^>]*>[\s\S]*?<\/svg>/);
  assert.ok(svg,mission.id+' accessible diagram missing');
  for(const id of svg[1].split(/\s+/))assert.ok(ids.includes(id),mission.id+' SVG ref #'+id);
  for(const m of html.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)){
   const input=m[0],id=input.match(/\bid="([^"]+)"/)?.[1];
   assert.ok(id,mission.id+' input without id: '+input);
   assert.ok(html.includes('for="'+id+'"'),mission.id+' input without associated label: '+id);
  }
 }
});
test('mission scripts do not reference missing DOM IDs',()=>{
 for(const mission of catalog.levels){
  const html=read(mission.url),ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>path.normalize(path.join(path.dirname(mission.url),m[1])));
  for(const script of scripts.filter(p=>p.endsWith('-mission.js'))){
   const js=read(script);
   for(const m of js.matchAll(/\$\('([^']+)'\)/g))assert.ok(ids.has(m[1]),mission.id+' missing '+m[1]);
  }
 }
});
test('shared CSS keeps keyboard focus, reduced motion and high contrast support',()=>{
 const css=read('src/mission.css');
 assert.match(css,/:focus-visible/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/forced-colors:active/);
 assert.match(css,/input\[type="range"\]/);
});
