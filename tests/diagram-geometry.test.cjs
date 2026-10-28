'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),catalog=require('../src/catalog.js');
test('SVG visible labels use only mathematical symbols, quantities and units',()=>{
 for(const mission of catalog.levels){
  const page=fs.readFileSync(path.join(root,mission.url),'utf8');
  const svg=page.match(/<svg\b[\s\S]*?<\/svg>/);
  assert.ok(svg,mission.id+' missing diagram');
  const visible=[...svg[0].matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(m=>m[1]);
  for(const label of visible){const withoutUnits=label.replace(/cos\s*φ|bit|kg\/m³|tr\/min|rad\/s|N·m|L\/min|sans unité|MPa|kW|Wh|Hz|bar|mm²|mm|kg|kJ|Pa|Ω|V|A|W|K|N|s|m|L/g,'');assert.doesNotMatch(withoutUnits,/[A-Za-zÀ-ÿ]{3,}/u,mission.id+' label '+label)}
 }
});
test('incline geometry and block rotation both represent 30 degrees',()=>{
 const html=fs.readFileSync(path.join(root,'missions/slope-01.html'),'utf8');
 const m=html.match(/id="incline" d="M(\d+) (\d+) L([\d.]+) ([\d.]+)/);
 assert.ok(m,'incline geometry absent');
 const angle=Math.atan2(Number(m[2])-Number(m[4]),Number(m[3])-Number(m[1]))*180/Math.PI;
 assert.ok(Math.abs(angle-30)<.001,'geometric slope '+angle);
 assert.match(html,/rotate\(-30 217\.5 98\.65\)/);
 assert.match(html,/marker-end="url\(#arrowN\)"/);
 assert.match(html,/marker-end="url\(#arrowP\)"/);
});
test('incline traction vector stays tangent to plane and resets correctly',()=>{
 const source=fs.readFileSync(path.join(root,'src/slope-mission.js'),'utf8');
 const elements=new Map(),store=new Map();
 const get=id=>{if(!elements.has(id))elements.set(id,{id,value:'',textContent:'',hidden:false,disabled:false,attrs:{},listeners:{},addEventListener(k,fn){this.listeners[k]=fn},setAttribute(k,v){this.attrs[k]=String(v)},replaceChildren(){}});return elements.get(id)};
 const context={document:{getElementById:get,createElement:id=>({textContent:''})},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},SISlope:require('../src/slope.js')};
 vm.runInNewContext(source,context,{timeout:1000});
 get('parallel').value='4905';get('normal').value='8495,71';
 get('calc').listeners.submit({preventDefault(){}});
 assert.equal(get('trial').disabled,false);
 get('traction').value='3000';get('trial').listeners.click();
 const x=Number(get('forceBar').attrs.x2),y=Number(get('forceBar').attrs.y2);
 assert.ok(x>217.5&&y<98.65,'uphill traction vector orientation');
 assert.ok(Math.abs((98.65-y)/(x-217.5)-Math.tan(Math.PI/6))<1e-10);
 assert.doesNotMatch(get('stateText').textContent,/[A-Za-zÀ-ÿ]{3,}/u);
 get('reset').listeners.click();
 assert.equal(get('forceBar').attrs.x2,'217.5');
 assert.equal(get('forceBar').attrs.y2,'98.65');
});
