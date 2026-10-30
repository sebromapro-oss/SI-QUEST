'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics}=require('../src/batch553-557.js');
const source=fs.readFileSync('src/investigation-mission.js','utf8');
const from=source.indexOf('const integerDomain='),to=source.indexOf('const samples=domain.map(calc);',from);
assert.ok(from>=0&&to>from,'Calcul de domaine introuvable');
const code=source.slice(from,to);
const values=c=>Function('c',code+';return domain;')(c);
test('P1 : pignon à 20 dents, seuls les nombres pairs admissibles sont échantillonnés',()=>{
 const x=values({id:'chain-polygonal-speed-ripple-01',min:12,max:40,inputStep:2,inputUnit:'dents'});
 assert.deepEqual(x,[12,14,16,18,20,22,24,26,28,30,32,34,36,38,40]);
 for(const n of x)assert.ok(Number.isFinite(physics.calculate('chain-polygonal-speed-ripple-01',n)));
});
test('Paramètre continu : ne pas convertir un couple mécanique en domaine discret',()=>{
 const x=values({id:'gear-lewis-tooth-bending-01',min:60,max:160,inputStep:20,inputUnit:'N·m'});
 assert.equal(x.length,101);assert.equal(x[0],60);assert.equal(x.at(-1),160);
});
test('Domaines historiques entiers : pas de régression',()=>{
 const x=values({id:'gear-mesh-01',min:10,max:60,inputUnit:'dents'});
 assert.equal(x.length,51);assert.equal(x[0],10);assert.equal(x.at(-1),60);
});
