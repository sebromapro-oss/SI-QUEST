'use strict';
// Le workflow navigateur doit réagir à tout changement du moteur, des
// équations, des diagrammes et des missions. Sinon une CI Node verte peut
// masquer une régression d'interface non testée par Chromium.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
test('la recette Chromium couvre tous les fichiers de production', () => {
  const yaml = fs.readFileSync(path.join(__dirname, '../.github/workflows/accueil-browser.yml'), 'utf8');
  const line = yaml.split(/\r?\n/).find(x => /^\s*paths:\s*\[/.test(x));
  assert.ok(line, 'filtre de chemins du workflow introuvable');
  for (const pattern of ['index.html', 'src/**', 'assets/**', 'missions/**',
    'tests/accueil-browser.spec.cjs', 'tests/mission-browser.spec.cjs',
    '.github/workflows/accueil-browser.yml']) {
    assert.ok(line.includes("'" + pattern + "'"), 'chemin non surveillé : ' + pattern);
  }
  assert.match(yaml, /--fully-parallel\s+--workers=2\s+--shard=/,
    'exécution parallèle des deux shards non configurée');
});
