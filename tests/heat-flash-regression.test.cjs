'use strict';
/** Non-régression de la réactivation thermique dynamique et du calcul SI. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../missions/heat-01.html'),'utf8');
const controller=fs.readFileSync(path.join(__dirname,'../src/investigation-mission.js'),'utf8');

test('heat-01 : trois questions flash dynamiques sans double affichage',()=>{
 const early=JSON.parse(controller.split('const earlyFlash=Object.freeze(')[1].split(');\nconst legacyFlash=')[0]);
 const questions=early['heat-01'];
 assert.ok(Array.isArray(questions));
 assert.equal(questions.length,3);
 assert.equal(new Set(questions).size,3);
 assert.ok(questions.every(q=>q.length>=25));
 assert.doesNotMatch(questions.join(' '),/23\s*kJ/i,'résultat numérique dévoilé dans les questions');
 assert.equal((html.match(/<li>/g)||[]).length,0,'questions HTML dupliquées avec la réactivation dynamique');
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
