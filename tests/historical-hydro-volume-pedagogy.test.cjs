'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const M=require('../src/investigations.js');
test('mission historique hydro-volume-01 : réactivation et conversion dimensionnelle',()=>{
const h=fs.readFileSync('missions/hydro-volume-01.html','utf8');
assert.match(h,/Objectifs, prérequis et réactivation/);
assert.match(h,/Critères de réussite/);
assert.equal((h.match(/<li>/g)||[]).length,3);
assert.match(h,/section perpendiculaire à l'axe/);
const c=JSON.parse(h.split('window.SI_MISSION=')[1].split('</script>')[0]);
assert.equal(c.id,'hydro-volume-01');
for(const l of [0,300,600]){const v=M.calculate(c.id,l),expected=50e-4*l*1e-3*1000;assert.ok(Math.abs(v-expected)<1e-9);}
});
