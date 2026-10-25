(function (root) {
  'use strict';
  const KEY = 'siquest_progress_v1';
  const EMPTY = () => ({ version: 1, levels: {} });
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (saved && saved.version === 1 && saved.levels && typeof saved.levels === 'object' && !Array.isArray(saved.levels)) return saved;
    } catch (_) { /* private browsing / blocked storage */ }
    const fresh = EMPTY();
    // Compatibility with the original Gear Forge pilot: stars represent a real prior win.
    try {
      const legacy = Number(localStorage.getItem('siquest_gear_pilot_stars'));
      if (Number.isInteger(legacy) && legacy >= 1 && legacy <= 3) fresh.levels['gear-01'] = { bestStars: legacy, wins: 1 };
    } catch (_) {}
    return fresh;
  }
  function saveWin(id, stars) {
    if (!root.SICatalog.byId(id)) throw new Error('Unknown level');
    if (!Number.isInteger(stars) || stars < 1 || stars > 3) throw new Error('Invalid star count');
    const state = load();
    const old = state.levels[id] || { bestStars: 0, wins: 0 };
    state.levels[id] = { ...old, bestStars: Math.max(old.bestStars || 0, stars), wins: (old.wins || 0) + 1 };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { /* play remains possible */ }
    return state;
  }
  // Private local learning journal. No learner names, identifiers, or fictitious records.
  // Import intentionally does not trust external event histories.
  function recordTrial(id, trial) {
    if (!root.SICatalog.byId(id)) throw new Error('Unknown level');
    if (!trial || !Number.isFinite(trial.value) || !Number.isInteger(trial.attempt) || trial.attempt < 1) throw new Error('Invalid trial');
    const state = load();
    const old = state.levels[id] || { bestStars: 0, wins: 0 };
    const entry = {
      time: new Date().toISOString(), value: trial.value,
      unit: root.SICatalog.byId(id).input.unit,
      passed: trial.passed === true, physicalPassed: trial.physicalPassed === true,
      calculationPassed: trial.calculationPassed === true,
      attempt: trial.attempt, hints: Math.max(0, Math.min(3, Number(trial.hints) || 0)),
      solutionViewed: trial.solutionViewed === true, variant: trial.variant === true,
      stars: Number.isInteger(trial.stars) && trial.stars >= 1 && trial.stars <= 3 ? trial.stars : 0,
      summary: String(trial.summary || '').slice(0, 380)
    };
    state.levels[id] = { ...old, trials: (Array.isArray(old.trials) ? old.trials : []).slice(-39).concat(entry),
      totalTrials: (Number(old.totalTrials) || 0) + 1 };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    return entry;
  }
  function recordHelp(id, kind) {
    if (!root.SICatalog.byId(id) || !['hint', 'solution'].includes(kind)) throw new Error('Invalid help');
    const state = load(); const old = state.levels[id] || { bestStars: 0, wins: 0 };
    const key = kind === 'hint' ? 'hintsUsed' : 'solutionsViewed';
    state.levels[id] = { ...old, [key]: (Number(old[key]) || 0) + 1 };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
  }
  function saveMastery(id, stars) {
    if (!root.SICatalog.byId(id) || !Number.isInteger(stars) || stars < 1 || stars > 3) throw new Error('Invalid mastery');
    const state = load(); const old = state.levels[id] || { bestStars: 0, wins: 0 };
    state.levels[id] = { ...old, masteryWins: (Number(old.masteryWins) || 0) + 1,
      masteryBestStars: Math.max(Number(old.masteryBestStars) || 0, stars) };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
  }
  function journal(id) {
    if (!root.SICatalog.byId(id)) throw new Error('Unknown level');
    const row = load().levels[id] || {};
    return { bestStars: row.bestStars || 0, wins: row.wins || 0,
      totalTrials: row.totalTrials || 0, hintsUsed: row.hintsUsed || 0,
      solutionsViewed: row.solutionsViewed || 0, masteryWins: row.masteryWins || 0,
      masteryBestStars: row.masteryBestStars || 0,
      trials: Array.isArray(row.trials) ? row.trials.slice() : [] };
  }
  function importData(payload) {
    if (!payload || payload.version !== 1 || !payload.levels || typeof payload.levels !== 'object' || Array.isArray(payload.levels)) throw new Error('Format de sauvegarde invalide');
    const state = load(); let imported = 0;
    for (const level of root.SICatalog.levels) {
      const raw = payload.levels[level.id];
      if (!raw) continue;
      const stars = Number(raw.bestStars);
      const wins = Number(raw.wins);
      if (!Number.isInteger(stars) || stars < 1 || stars > 3 || !Number.isInteger(wins) || wins < 1 || wins > 1000000) continue;
      const old = state.levels[level.id] || { bestStars: 0, wins: 0 };
      state.levels[level.id] = { ...old, bestStars: Math.max(old.bestStars || 0, stars), wins: Math.max(old.wins || 0, wins) };
      imported++;
    }
    if (imported === 0) throw new Error('Aucun record valide à importer');
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { throw new Error('Enregistrement local impossible'); }
    return imported;
  }
  function summary() {
    const state = load();
    const active = root.SICatalog.levels;
    const won = active.filter(l => state.levels[l.id] && state.levels[l.id].bestStars >= 1);
    const stars = active.reduce((n, l) => n + Math.min(3, Math.max(0, Number(state.levels[l.id]?.bestStars) || 0)), 0);
    const worldCount = new Set(won.map(l => l.world)).size;
    const badges = [
      { id: 'explorer', name: 'Explorateur', earned: won.length >= 1, rule: 'Réussir un niveau' },
      { id: 'precision', name: 'Précision', earned: stars >= 3, rule: 'Obtenir 3 étoiles sur un niveau' },
      { id: 'polyvalent', name: 'Polyvalent', earned: worldCount >= 3, rule: 'Réussir des niveaux dans 3 univers' },
      { id: 'pioneer', name: 'Pionnier SI', earned: ['gear-01', 'moment-01', 'gravity-01', 'hydro-01'].every(id => won.some(l => l.id === id)), rule: 'Réussir les 4 niveaux pilotes' }
    ];
    return { wonCount: won.length, starCount: stars, worldCount, xp: stars * 100, badges, levels: state.levels };
  }
  const api = Object.freeze({ load, saveWin, recordTrial, recordHelp, saveMastery, journal, importData, summary });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SIStorage = api;
})(typeof window === 'undefined' ? globalThis : window);
