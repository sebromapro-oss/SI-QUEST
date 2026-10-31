'use strict';
/** Non-régression de la réactivation thermique historique et de son résultat SI. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../missions/heat-01.html'),'utf8');

test('heat-01 : objectifs et trois questions flash sans divulgation du résultat',()=>{
 const section=html.match(/<h2>Objectifs, prérequis et réactivation<\/h2>[\s\S]*?<\/section>/);
 assert.ok(section,'section de réactivation absente');
 assert.equal((section[0].match(/<li>/g)||[]).length,3);
 for(const heading of ['Situation professionnelle','Objectif','Prérequis','Critères de réussite'])
  assert.ok(section[0].includes(heading),heading+' manquant');
 assert.doesNotMatch(section[0],/23\s*kJ/i,'résultat numérique dévoilé dans les questions');
});

test('heat-01 : valeur nominale, conversions et domaine cohérents',()=>{
 const config=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 assert.equal(config.id,'heat-01');
 assert.equal(config.inputUnit,'K');
 assert.equal(config.unit,'kJ');
 assert.ok(config.min<=config.initial&&config.initial<=config.max);
 const qJ=2*460*25;
 assert.equal(qJ,23000);
 assert.equal(config.expected,qJ/1000);
});
