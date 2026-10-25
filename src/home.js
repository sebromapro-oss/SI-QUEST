(function(){
  'use strict';
  const catalog=window.SICatalog;
  const container=document.getElementById('universes');
  document.getElementById('level-count').textContent=String(catalog.levels.length);
  const status=document.getElementById('status');
  status.textContent=catalog.levels.length+' missions disponibles ; validation matérielle et accessibilité complète encore à démontrer.';
  for(const world of catalog.worlds){
    const card=document.createElement('article');
    card.className='world';
    const title=document.createElement('h3');
    title.textContent=world.id+' · '+world.title;
    card.append(title);
    const missions=catalog.levels.filter(level=>level.world===world.id);
    if(missions.length){
      const list=document.createElement('ul');
      for(const mission of missions){
        const item=document.createElement('li');
        const link=document.createElement('a');
        link.href=mission.url;link.textContent=mission.title;
        item.append(link);list.append(item);
      }
      card.append(list);
    }else{
      const note=document.createElement('p');
      note.textContent='En préparation · aucun niveau jouable';
      card.append(note);
    }
    container.append(card);
  }
})();
