(function(){'use strict';
const cat=window.SICatalog;const worlds=cat.worlds;const levels=cat.levels;
const coords=[[17,22],[38,17],[58,25],[78,15],[24,42],[47,43],[70,43],[88,40],[11,65],[33,65],[56,65],[78,64],[21,85],[42,84],[62,84],[82,85],[49,7]];
const glyphs=['↗','F','Σ','I','⚙','⇅','◉','ϟ','∿','P','μ','℃','⌁','◇','⚒','⛨','⬡'];
const tones=['#1e8cc3','#cd6265','#4583a6','#ba8665','#c58d1f','#1689aa','#59afba','#7254b8','#b04d92','#3aa367','#aa8137','#d75931','#83b9d2','#477aa8','#459969','#cfb348','#bcc1db'];
const sizes=[108,100,117,105,111,121,105,107,103,115,104,117,94,108,104,99,90];

function islandArtwork(i,tone){
 const wrap=document.createElement('span');wrap.className='island-artwork';wrap.setAttribute('aria-hidden','true');
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 220 174');svg.setAttribute('preserveAspectRatio','xMidYMid meet');svg.setAttribute('focusable','false');
 const element=(tag,attrs,parent=svg)=>{const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));parent.append(n);return n};
 const definitions=element('defs',{});
 const grad=element('linearGradient',{id:'terrain'+i,x1:'0',y1:'0',x2:'0.8',y2:'1'},definitions);
 element('stop',{offset:'0','stop-color':'#b8dfba'},grad);element('stop',{offset:'.47','stop-color':tone},grad);element('stop',{offset:'1','stop-color':'#173450'},grad);
 element('ellipse',{cx:110,cy:145,rx:89,ry:16,fill:'#071a35',opacity:'.4'});
 element('path',{d:'M17 91 L55 68 L100 51 L163 61 L204 91 L180 114 L145 126 L93 118 L44 114 Z',fill:'url(#terrain'+i+')',stroke:'#9bdfe4','stroke-width':2});
 element('path',{d:'M17 91 L44 114 L93 118 L145 126 L180 114 L204 91 L181 132 L139 154 L92 166 L46 142 Z',fill:'#23435b',stroke:'#6db1bf','stroke-width':1.5});
 element('path',{d:'M44 114 L62 143 L92 166 L93 118 Z',fill:'#102b45',opacity:'.6'});
 element('path',{d:'M145 126 L139 154 L181 132 L204 91 Z',fill:'#102b45',opacity:'.55'});
 const palette=['#e6bb78','#8bdbef','#c9dcf5'];
 const line=(x1,y1,x2,y2,c='#a6f7ff',w=4)=>element('line',{x1,y1,x2,y2,stroke:c,'stroke-width':w,'stroke-linecap':'round'});
 const rect=(x,y,width,height,fill='#bfd8e7')=>element('rect',{x,y,width,height,rx:2,fill,stroke:'#28536a','stroke-width':1.5});
 const circle=(cx,cy,r,fill='#f9dc95')=>element('circle',{cx,cy,r,fill,stroke:'#244e66','stroke-width':2});
 const wheel=(x,y,r)=>{circle(x,y,r,'#e8bf70');circle(x,y,r*.5,'#234b69');for(let a=0;a<6;a++){let angle=a*Math.PI/3;line(x+Math.cos(angle)*r*.55,y+Math.sin(angle)*r*.55,x+Math.cos(angle)*r*.88,y+Math.sin(angle)*r*.88,'#fff1bf',2)}};
 const building=(x,y)=>{rect(x,y,34,29,'#abc4dd');element('path',{d:'M'+(x-5)+' '+y+' L'+(x+17)+' '+(y-17)+' L'+(x+39)+' '+y+' Z',fill:'#c78369'});rect(x+13,y+9,8,20,'#28425b')};
 switch(i){
 case 0:line(50,83,170,65,'#edc07d',6);line(50,95,170,77,'#ceeef1',3);wheel(68,90,16);wheel(162,68,12);break;
 case 1:rect(65,48,16,50);rect(125,46,16,56);line(75,50,143,74,'#ffdfaa',9);circle(144,73,10,'#d87b68');break;
 case 2:line(48,75,166,79,'#c4d6e2',7);line(58,77,95,40,'#ffbf6a',5);line(95,40,123,78,'#ffbf6a',5);circle(96,40,7);break;
 case 3:rect(64,56,95,13,'#b4c5d2');line(70,56,90,35,'#eac58d',7);line(151,56,133,35,'#eac58d',7);line(92,35,133,35,'#eee5bf',5);break;
 case 4:wheel(86,67,30);wheel(137,88,21);rect(65,40,10,20,'#a9c9d7');break;
 case 5:rect(55,55,95,17,'#84c4cf');rect(105,39,28,42,'#d1e8f1');line(62,64,105,64,'#e9f9ff',6);line(133,63,166,63,'#d5edf3',8);element('path',{d:'M173 55 Q190 83 169 119',fill:'none',stroke:'#71eaff','stroke-width':8});break;
 case 6:rect(55,65,100,15,'#99daec');rect(70,42,24,25,'#a7b6db');line(90,55,168,55,'#effaff',5);circle(154,55,9,'#93d9e9');break;
 case 7:building(60,43);building(115,35);element('path',{d:'M100 25 L89 57 L106 53 L96 83 L135 41 L114 45 L120 25 Z',fill:'#f8de79'});break;
 case 8:rect(58,53,92,25,'#aec9ed');circle(80,53,13,'#78f3ce');circle(129,52,14,'#78f3ce');line(78,76,112,95,'#fee29e',6);break;
 case 9:rect(65,46,75,40,'#b8d2c0');element('path',{d:'M108 33 L86 63 L106 62 L93 93 L138 52 L115 53 L128 33 Z',fill:'#ffe48d'});break;
 case 10:wheel(65,76,22);wheel(149,77,22);line(65,76,150,77,'#c6dfec',7);break;
 case 11:element('path',{d:'M65 99 L98 28 L115 68 L135 41 L160 99 Z',fill:'#bf5844'});element('path',{d:'M102 42 L90 76 L114 75 Z',fill:'#ffd57d'});rect(50,79,20,21,'#dad6c2');break;
 case 12:rect(58,55,97,29,'#d6e8ed');circle(92,55,19,'#e4c98b');line(92,55,92,40,'#153a5d',3);line(92,55,105,59,'#153a5d',3);break;
 case 13:element('path',{d:'M77 40 L116 31 L145 58 L133 92 L91 96 L62 67 Z',fill:'#8fc9e4',stroke:'#d8faff','stroke-width':3});element('path',{d:'M77 40 L91 96 L116 31 L133 92',fill:'none',stroke:'#367baf','stroke-width':2});break;
 case 14:building(47,55);rect(95,50,61,43,'#b9ced7');wheel(115,89,15);wheel(149,89,15);rect(104,45,33,14,'#edbc65');break;
 case 15:rect(59,47,105,35,'#f9cf75');element('path',{d:'M108 43 L88 82 L129 82 Z',fill:'#243f5b'});line(108,55,108,67,'#ffdc79',4);break;
 case 16:building(46,52);building(109,45);wheel(104,90,16);line(75,54,125,46,'#98f5fa',5);break;
 }
 element('path',{d:'M29 94 Q75 80 106 91 T184 95',fill:'none',stroke:'#eaf6ce','stroke-width':2,opacity:'.35'});
 wrap.append(svg);return wrap;
}

const byWorld=new Map(worlds.map(w=>[w.id,levels.filter(l=>l.world===w.id)]));
const get=id=>document.getElementById(id);
let previous=null,activeDialog=null;
function text(tag,content,cls){const el=document.createElement(tag);if(cls)el.className=cls;if(content!==undefined)el.textContent=content;return el}
function close(dialog){dialog.hidden=true;activeDialog=null;document.body.classList.remove('dialog-open');if(previous&&previous.isConnected)previous.focus()}
function open(dialog){if(activeDialog){activeDialog.hidden=true;}else{previous=document.activeElement;}dialog.hidden=false;activeDialog=dialog;document.body.classList.add('dialog-open');dialog.querySelector('.close').focus()}
function showWorld(world){const missions=byWorld.get(world.id)||[];get('dialog-kicker').textContent=world.id+' · ARCHIPEL SCIENTIFIQUE';get('dialog-title').textContent=world.title.toUpperCase();get('dialog-note').textContent=missions.length?missions.length+' mission'+(missions.length>1?'s':'')+' répertoriée'+(missions.length>1?'s':'')+'. Choisis ton aventure.':'Univers en préparation : aucune mission répertoriée.';const list=get('dialog-missions');list.replaceChildren();missions.forEach(m=>{const a=text('a',m.title);a.href=m.url;list.append(a)});open(get('world-dialog'))}
get('world-total').textContent=worlds.length;
worlds.forEach((w,i)=>{const missions=byWorld.get(w.id),p=coords[i]||[50,50],button=text('button',undefined,'island'+(missions.length?'':' empty'));button.type='button';button.style.setProperty('--x',p[0]+'%');button.style.setProperty('--y',p[1]+'%');button.style.setProperty('--w',(sizes[i]*1.2)+'px');button.style.setProperty('--h',Math.round(sizes[i]*1.02)+'px');button.style.setProperty('--tone',tones[i]);button.style.setProperty('--glow',tones[i]+'aa');button.setAttribute('aria-label',w.title+' : '+missions.length+' mission'+(missions.length>1?'s':'')+' répertoriée'+(missions.length>1?'s':''));const scene=text('span',undefined,'island-scene');scene.setAttribute('aria-hidden','true');const glyph=text('span',glyphs[i],'island-glyph');glyph.setAttribute('aria-hidden','true');button.append(scene,islandArtwork(i,tones[i]),text('span',w.title,'island-name'));if(missions.length)button.append(text('span',String(missions.length),'island-count'));button.addEventListener('click',()=>showWorld(w));get('islands').append(button);
const item=text('button',undefined);item.type='button';const symbol=text('span',glyphs[i]);symbol.setAttribute('aria-hidden','true');item.append(symbol,text('strong',w.title+(missions.length?' · '+missions.length:'')));item.addEventListener('click',()=>showWorld(w));get('world-list').append(item)});
levels.slice(0,4).forEach((m,i)=>{const a=text('a',undefined,'feature');a.href=m.url;const w=worlds.find(w=>w.id===m.world),ix=worlds.indexOf(w),art=text('div',glyphs[ix]||'✦','feature-art');art.style.setProperty('--tone',tones[ix]||'#387fa0');art.setAttribute('aria-hidden','true');const cap=text('div',undefined,'feature-caption');cap.append(text('strong',m.title),text('small',w?w.title:m.world));a.append(art,cap);get('featured-cards').append(a)});
get('play-btn').addEventListener('click',event=>{event.preventDefault();const first=worlds.find(w=>(byWorld.get(w.id)||[]).length>0);if(first)showWorld(first);else get('world-list').scrollIntoView();});
get('all-worlds').addEventListener('click',()=>{get('world-list').scrollIntoView({behavior:document.body.classList.contains('reduced-motion')?'auto':'smooth'});get('world-list').querySelector('button')?.focus({preventScroll:true})});
get('progress-open').addEventListener('click',()=>{get('dialog-kicker').textContent='PARCOURS EXPLORATEUR';get('dialog-title').textContent='MA PROGRESSION';get('dialog-note').textContent='Aucune progression consolidée n’est actuellement disponible dans cet accueil. Les étoiles et badges ne sont pas estimés.';get('dialog-missions').replaceChildren();open(get('world-dialog'))});
get('settings-open').addEventListener('click',()=>open(get('settings-dialog')));
get('dialog-close').addEventListener('click',()=>close(get('world-dialog')));
get('settings-close').addEventListener('click',()=>close(get('settings-dialog')));
document.querySelectorAll('.overlay').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)close(d)}));
document.addEventListener('keydown',e=>{if(!activeDialog)return;if(e.key==='Escape'){close(activeDialog);return}if(e.key==='Tab'){const controls=[...activeDialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')];if(!controls.length)return;if(!activeDialog.contains(document.activeElement)){e.preventDefault();controls[0].focus();return;}const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
const reduced=get('reduce-motion');reduced.checked=window.matchMedia('(prefers-reduced-motion: reduce)').matches;reduced.addEventListener('change',()=>document.body.classList.toggle('reduced-motion',reduced.checked));document.body.classList.toggle('reduced-motion',reduced.checked);
get('runtime-status').textContent=levels.length+' entrées au catalogue ; disponibilité technique et recette individuelle non garanties. Les étoiles non vérifiables ne sont pas affichées.';
get('stars').textContent='—';
})();