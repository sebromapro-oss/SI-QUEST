(function(root){
'use strict';
/* Géométrie spatiale schématique : projection orthographique calculée, sans CAO ni denture involute. */
const allowed=new Set(['circular-02','angular-accel-01','brake-torque-01','torsion-01','gear-mesh-01','belt-speed-01','rolling-load-01']);
const animated=new Set(['circular-02','angular-accel-01','gear-mesh-01','belt-speed-01']);
const finite=v=>typeof v==='number'&&Number.isFinite(v);
function describe(id,x){
 if(!allowed.has(id)||!finite(x)||x<0)throw new RangeError('Paramètre 3D invalide');
 switch(id){
 case 'circular-02':return Object.freeze({radius:0.5,angularSpeed:x/0.5,acceleration:x*x/0.5,animated:true});
 case 'angular-accel-01':if(x<=0)throw new RangeError('Durée strictement positive');return Object.freeze({duration:x,alpha:120/x,deltaOmega:120,animated:true});
 case 'brake-torque-01':return Object.freeze({inertia:8,alpha:x,torque:8*x,animated:false});
 case 'torsion-01':return Object.freeze({diameter:30,torque:x,stress:16*x*1000/(Math.PI*30**3),animated:false});
 case 'gear-mesh-01':if(!Number.isInteger(x)||x<=0)throw new RangeError('Nombre de dents entier strictement positif');return Object.freeze({module:3,z1:20,z2:x,r1:30,r2:1.5*x,centerDistance:30+1.5*x,angularRatio:-20/x,animated:true});
 case 'belt-speed-01':return Object.freeze({diameter:0.2,radius:0.1,angularSpeed:2*Math.PI*x/60,beltSpeed:Math.PI*0.2*x/60,animated:true});
 case 'rolling-load-01':return Object.freeze({normal:8000,coefficient:x,resistance:8000*x,animated:false});
 default:throw new RangeError('Mission sans scène spatiale');
 }
}
function render(id,yaw,pitch,x,options={}){
 const d=describe(id,x),time=options.time??0,zoom=options.zoom??1;
 if(![yaw,pitch,time,zoom].every(finite)||zoom<0.5||zoom>2||time<0)throw new RangeError('Caméra ou temps invalide');
 const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch),scale=1.6*zoom;
 const P=p=>{const X=p[0]*cy-p[2]*sy,Z=p[0]*sy+p[2]*cy;return [300+X*scale,150-(p[1]*cp-Z*sp)*scale]};
 const coord=p=>{const a=P(p);return a[0].toFixed(2)+' '+a[1].toFixed(2)};
 const path=(points,closed=false)=>points.map((p,i)=>(i?'L':'M')+coord(p)).join(' ')+(closed?' Z':'');
 const segments=[],notes=[];
 const line=(a,b,color='#9bc9e5',width=2,dash='')=>segments.push('<path d="'+path([a,b])+'" fill="none" stroke="'+color+'" stroke-width="'+width+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>');
 const arrow=(a,b,color='#ffca7d',width=3)=>segments.push('<path d="'+path([a,b])+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" marker-end="url(#sq-arrow)"/>');
 const poly=(points,color='#8ddcff',width=3,fill='none')=>segments.push('<path d="'+path(points,true)+'" fill="'+fill+'" stroke="'+color+'" stroke-width="'+width+'"/>');
 const ring=(cx,cy,cz,r,plane='xy',phase=0)=>Array.from({length:65},(_,i)=>{const a=i*2*Math.PI/64+phase;return plane==='yz'?[cx,cy+r*Math.cos(a),cz+r*Math.sin(a)]:[cx+r*Math.cos(a),cy+r*Math.sin(a),cz]});
 const cylinder=(cx,cy,r,phase=0,depth=24)=>{poly(ring(cx,cy,-depth/2,r));poly(ring(cx,cy,depth/2,r),'#7ce8ae');for(let i=0;i<8;i++){const a=phase+i*Math.PI/4;line([cx,cy,depth/2],[cx+r*Math.cos(a),cy+r*Math.sin(a),depth/2],'#547e98',2)}line([cx,cy,depth/2],[cx+r*Math.cos(phase),cy+r*Math.sin(phase),depth/2],'#ffca7d',4)};
 const shaft=(phase=0)=>{poly(ring(-80,0,0,42,'yz'),'#8ddcff');poly(ring(80,0,0,42,'yz'),'#7ce8ae');for(let i=0;i<10;i++){const a=phase+i*Math.PI/5;line([-80,42*Math.cos(a),42*Math.sin(a)],[80,42*Math.cos(a),42*Math.sin(a)],'#668ca7',2)}line([-80,42*Math.cos(phase),42*Math.sin(phase)],[80,42*Math.cos(phase),42*Math.sin(phase)],'#ffca7d',4)};
 const point=(p,color='#ffd17d')=>{const [px,py]=P(p);segments.push('<circle cx="'+px.toFixed(2)+'" cy="'+py.toFixed(2)+'" r="5" fill="'+color+'"/>')};
 switch(id){
 case 'circular-02':{
  const phase=d.angularSpeed*time,r=65,a=[r*Math.cos(phase),r*Math.sin(phase),12];
  cylinder(0,0,r,phase);
  arrow(a,[a[0]*.35,a[1]*.35,12],'#ffca7d',4);
  arrow(a,[a[0]-42*Math.sin(phase),a[1]+42*Math.cos(phase),12],'#7ce8ae',4);
  point(a);notes.push('aₙ = '+d.acceleration.toFixed(2)+' m/s² ; vers le centre','v = '+x.toFixed(2)+' m/s ; tangentielle');break;
 }
 case 'angular-accel-01':{
  const t=Math.min(time,d.duration),phase=.5*d.alpha*t*t;
  shaft(phase);arrow([105,0,0],[105,35,0],'#ffca7d');
  notes.push('α = '+d.alpha.toFixed(2)+' rad/s² ; ω(t) = αt','Temps physique simulé : '+t.toFixed(2)+' s / '+d.duration.toFixed(2)+' s');break;
 }
 case 'brake-torque-01':{
  shaft(0);arrow([80,45,0],[80,15,35],'#ffca7d');notes.push('J = 8 kg·m² ; |C| = '+d.torque.toFixed(2)+' N·m','Couple résistant ; pas de mouvement sans vitesse initiale');break;
 }
 case 'torsion-01':{
  shaft(0);arrow([80,42,0],[80,0,42],'#ffca7d');notes.push('Ø = 30 mm ; τmax = '+d.stress.toFixed(2)+' MPa','Torsion statique ; angle de torsion non calculable sans G et L');break;
 }
 case 'gear-mesh-01':{
  const factor=1.0,r1=d.r1*factor,r2=d.r2*factor,a=d.centerDistance*factor;
  const x1=-a/2,x2=a/2,phase1=time,phase2=-time*20/x;
  cylinder(x1,0,r1,phase1,18);cylinder(x2,0,r2,phase2,18);
  line([x1,0,0],[x2,0,0],'#ffca7d',2,'5 5');
  point([x1+r1,0,0],'#ff9999');
  notes.push('r₁ = '+d.r1.toFixed(1)+' mm ; r₂ = '+d.r2.toFixed(1)+' mm ; a = '+d.centerDistance.toFixed(1)+' mm','ω₂/ω₁ = −20/'+x+' = '+d.angularRatio.toFixed(3)+' ; cercles primitifs, sans profil de denture');break;
 }
 case 'belt-speed-01':{
  const phase=d.angularSpeed*time,rad=48,c1=-90,c2=90;
  cylinder(c1,0,rad,phase);cylinder(c2,0,rad,phase);
  line([c1,rad,0],[c2,rad,0],'#d5e8f4',5);line([c1,-rad,0],[c2,-rad,0],'#d5e8f4',5);
  const marker=c1+((rad*phase%180)+180)%180;point([marker,rad,0],'#7ce8ae');
  notes.push('n = '+x.toFixed(0)+' tr/min ; v = '+d.beltSpeed.toFixed(3)+' m/s','Sans glissement ; deuxième poulie de même diamètre (illustration)');break;
 }
 case 'rolling-load-01':{
  const r=60;cylinder(0,0,r,0);line([-140,-r,0],[140,-r,0],'#9bc9e5',4);
  arrow([0,0,0],[0,-70,0],'#ffca7d');arrow([0,-r,0],[0,12,0],'#7ce8ae');
  arrow([0,-r,0],[-Math.min(100,20+d.resistance/4),-r,0],'#ff9999');
  arrow([0,0,0],[95,0,0],'#8ddcff');
  notes.push('N = 8 000 N ; Fᵣ = '+d.resistance.toFixed(1)+' N','Résistance opposée au déplacement ; longueur des vecteurs indicative');break;
 }
 }
 line([-130,-115,0],[-90,-115,0],'#ffca7d');line([-130,-115,0],[-130,-75,0],'#7ce8ae');line([-130,-115,0],[-130,-115,40],'#cdaaff');
 const description=notes.join(' ; ');
 const escape=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="scene3-title scene3-desc" style="width:100%;max-width:100%;background:#092236;border-radius:12px"><title id="scene3-title">Scène géométrique spatiale interactive</title><desc id="scene3-desc">'+escape(description)+'. Projection orthographique d’une géométrie 3D schématique ; ce n’est pas une CAO.</desc><defs><marker id="sq-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#ffca7d" stroke-width="1.5"/></marker></defs>'+segments.join('')+'<text x="14" y="278" fill="#fff" font-size="14">'+escape(notes[0]||'')+'</text><text x="14" y="294" fill="#fff" font-size="12">'+escape(notes[1]||'')+'</text></svg>';
}
const api=Object.freeze({allowed,animated,describe,render});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.SIScene3D=api;
})(typeof window==='undefined'?globalThis:window);
