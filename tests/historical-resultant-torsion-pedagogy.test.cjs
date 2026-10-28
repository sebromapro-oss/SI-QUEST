'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const ids=['resultant-01','torsion-01'];
for(const id of ids)test(id+' : réactivation, unités et cohérence du modèle',()=>{
 const html=fs.readFileSync('missions/'+id+'.html','utf8');
 assert.equal((html.match(/<li>/g)||[]).length,3);
 for(const label of ['Objectif','Prérequis','Critères de réussite','Repères et hypothèses','Questions flash'])assert.ok(html.includes(label),id+' '+label);
 assert.match(html,/SI-0[34]/);assert.match(html,/unités|en SI|en N/);
 const c=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);assert.equal(c.id,id);
 if(id==='resultant-01'){assert.equal(c.expected,500);assert.equal(Math.hypot(300,400),500);assert.equal(Math.hypot(300,0),300);}
 else {const tau=16*120/(Math.PI*(.03**3))/1e6;assert.ok(Math.abs(tau-c.expected)<1e-10);assert.ok(Math.abs(16*240/(Math.PI*.03**3)/1e6-2*tau)<1e-10);}
});
