(function(){
'use strict';
const catalog=window.SICatalog, container=document.getElementById('universes');
const search=document.getElementById('world-search');
const buttons=[...document.querySelectorAll('[data-filter]')];
const symbols=['↗','F','Σ','I','⚙','⇅','◉','ϟ','∿','P','μ','℃','⌁','◇','⚒','⛨','⬡'];
const missionsByWorld=new Map(catalog.worlds.map(w=>[w.id,catalog.levels.filter(m=>m.world===w.id)]));
const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
document.getElementById('level-count').textContent=String(catalog.levels.length);
document.getElementById('world-count').textContent=String(catalog.worlds.length);
document.getElementById('active-count').textContent=String([...missionsByWorld.values()].filter(items=>items.length).length);
document.getElementById('status').textContent='Catalogue chargé : '+catalog.levels.length+' missions répertoriées. Présence dans le catalogue ≠ validation scientifique, fonctionnelle ou matérielle.';
const cards=[];
catalog.worlds.forEach((world,i)=>{
 const missions=missionsByWorld.get(world.id),card=make('article','world'+(missions.length?' has-levels':'')); 
 const top=make('div','world-top'),icon=make('span','world-icon',symbols[i]||'◈');
 icon.setAttribute('aria-hidden','true');top.append(icon,make('span','world-index',world.id));card.append(top);
 card.append(make('h3','',world.title));
 card.append(make('p','world-state',missions.length?missions.length+' mission'+(missions.length>1?'s':'')+' répertoriée'+(missions.length>1?'s':''):'Univers en préparation'));
 if(missions.length){const ul=document.createElement('ul');missions.forEach(m=>{const li=document.createElement('li'),a=document.createElement('a');a.href=m.url;a.textContent=m.title;li.append(a);ul.append(li)});card.append(ul)}
 else card.append(make('p','world-empty','Aucune mission répertoriée pour cet univers.'));
 container.append(card);cards.push({card,world,missions});
});
const quick=document.getElementById('mission-links');
catalog.levels.slice(0,6).forEach((mission,i)=>{
 const a=make('a','mission-tile'),glyph=make('span','mission-glyph',symbols[catalog.worlds.findIndex(w=>w.id===mission.world)]||'◈');
 glyph.setAttribute('aria-hidden','true');a.href=mission.url;
 const detail=make('span',''),title=make('strong','',mission.title),small=make('small','',catalog.worlds.find(w=>w.id===mission.world)?.title||mission.world);
 detail.append(title,small);a.append(glyph,detail);quick.append(a);
});
let filter='all';
function update(){
 const term=search.value.trim().toLocaleLowerCase('fr');
 let visible=0;
 cards.forEach(({card,world,missions})=>{
 const matches=!term||(world.title+' '+world.id+' '+missions.map(m=>m.title).join(' ')).toLocaleLowerCase('fr').includes(term);
 const category=filter==='all'||(filter==='with'?missions.length>0:missions.length===0);
 card.hidden=!(matches&&category);if(!card.hidden)visible++;
 });
 document.getElementById('filter-status').textContent=visible+' univers affiché'+(visible>1?'s':'')+'.';
}
search.addEventListener('input',update);
buttons.forEach(button=>button.addEventListener('click',()=>{
 filter=button.dataset.filter;buttons.forEach(b=>{const selected=b===button;b.classList.toggle('is-active',selected);b.setAttribute('aria-pressed',String(selected))});update();
}));
update();
})();