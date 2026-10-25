(function () {
  'use strict';
  const { levels, worlds } = window.SICatalog;
  const state = window.SIStorage.summary();
  const $ = id => document.getElementById(id);
  const number = (id, value) => { const el = $(id); if (el) el.textContent = value; };
  number('release-count', 'PILOTE · ' + levels.length + ' NIVEAUX');
  number('future-world-count', (worlds.length - new Set(levels.map(l => l.world)).size) + ' univers');
  number('hero-progress', state.wonCount + ' / ' + levels.length);
  $('hero-progressbar').style.width = (state.wonCount / levels.length * 100) + '%';
  number('hero-stars', state.starCount + ' / ' + (levels.length * 3) + ' étoiles gagnées');
  number('map-xp', state.xp + ' XP gagnés');
  number('map-count', state.wonCount + ' / ' + levels.length + ' missions');
  number('stat-levels', state.wonCount + ' / ' + levels.length);
  number('stat-stars', state.starCount + ' / ' + (levels.length * 3));
  number('stat-xp', state.xp + ' XP');
  number('stat-universes', state.worldCount + ' / ' + worlds.length);
  // Keep the original four interactive islands; make their own star labels and
  // accessible names reflect actual saved wins (the old map-* IDs are absent
  // from the HTML and silently prevented the update).
  for (const id of ['gravity-01', 'gear-01', 'moment-01', 'hydro-01']) {
    const stars = state.levels[id]?.bestStars || 0;
    const progress = document.querySelector('.land-progress[data-level="' + id + '"]');
    if (!progress) continue;
    progress.textContent = '★ ' + stars + ' / 3';
    const island = progress.closest('a.land');
    const mission = levels.find(l => l.id === id);
    if (island && mission) island.setAttribute('aria-label', mission.title + ' — ' + mission.subtitle + '. ' +
      (stars ? 'Mission réussie, record ' + stars + ' étoiles sur 3. Rejouer.' :
        'Mission non encore réussie. Jouer.'));
  }
  const grid = $('mission-grid');
  for (const level of levels) {
    const stars = state.levels[level.id]?.bestStars || 0;
    const card = document.createElement('article');
    card.className = 'mission-card ' + level.color;
    card.innerHTML = '<div class="mission-top"><span class="mission-icon" aria-hidden="true"></span><span class="mission-status"></span></div><h3></h3><p class="mission-subtitle"></p><p class="mission-mechanic"></p><div class="mission-bottom"><span class="mission-stars"></span><a class="button button-primary mission-link"></a></div>';
    card.querySelector('.mission-icon').textContent = level.icon;
    card.querySelector('.mission-status').textContent = stars ? '✓ Réussi' : '● À découvrir';
    card.querySelector('h3').textContent = level.title;
    card.querySelector('.mission-subtitle').textContent = level.subtitle;
    card.querySelector('.mission-mechanic').textContent = level.mechanic;
    card.querySelector('.mission-stars').textContent = '★ ' + stars + ' / 3';
    const a = card.querySelector('a'); a.href = 'play.html?level=' + encodeURIComponent(level.id); a.textContent = stars ? 'Rejouer →' : 'Jouer →';
    grid.append(card);
  }
  const badgeList = $('badge-list');
  for (const badge of state.badges) {
    const el = document.createElement('div');
    el.className = 'badge ' + (badge.earned ? 'earned' : 'locked');
    el.innerHTML = '<span class="badge-icon" aria-hidden="true"></span><div><strong></strong><small></small></div>';
    el.querySelector('.badge-icon').textContent = badge.earned ? '🏅' : '◇';
    el.querySelector('strong').textContent = badge.name + (badge.earned ? ' · obtenu' : ' · verrouillé');
    el.querySelector('small').textContent = badge.rule;
    badgeList.append(el);
  }
  const universeList = $('universe-list');
  for (const world of worlds) {
    const active = levels.filter(l => l.world === world.id);
    const row = document.createElement('div'); row.className = 'universe-row';
    const left = document.createElement('span'); left.textContent = world.id + ' — ' + world.title;
    const right = document.createElement('span');
    if (active.length) {
      const link = document.createElement('a'); link.href = 'play.html?level=' + active[0].id;
      link.textContent = active.length + (active.length > 1 ? ' niveaux jouables →' : ' niveau jouable →'); right.append(link);
      for (const other of active.slice(1)) { const more = document.createElement('a'); more.href = 'play.html?level=' + encodeURIComponent(other.id); more.textContent = ' · ' + other.title + ' →'; right.append(more); }
    } else { right.textContent = 'À développer'; right.className = 'unavailable'; }
    row.append(left, right); universeList.append(row);
  }
  $('import-file').addEventListener('change', async event => {
    const file = event.target.files?.[0]; if (!file) return;
    try {
      if (file.size > 200000) throw new Error('Fichier trop volumineux');
      const payload = JSON.parse(await file.text());
      const count = window.SIStorage.importData(payload);
      $('import-status').textContent = count + ' record(s) importé(s). Actualisation du passeport…';
      location.reload();
    } catch (err) { $('import-status').textContent = 'Import impossible : ' + err.message; }
    event.target.value = '';
  });
  $('export').addEventListener('click', () => {
    const payload = { application: 'SI QUEST', exportedAt: new Date().toISOString(), ...window.SIStorage.load() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); const url = URL.createObjectURL(blob);
    a.href = url; a.download = 'si-quest-progression.json'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
