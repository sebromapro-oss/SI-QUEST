const test=require('node:test');const assert=require('node:assert/strict');const scene=require('../src/scene3d.js');const fs=require('node:fs');for(const id of scene.allowed){test(id+' : coordonnées 3D et caméra',()=>{const a=scene.render(id,.2,.3,4),b=scene.render(id,1.2,.3,4);assert.match(a,/<svg/);assert.match(a,/<desc/);assert.notEqual(a,b);assert.ok(!a.includes('NaN'));assert.ok(!a.includes('Infinity'));const page=fs.readFileSync('missions/'+id+'.html','utf8');assert.ok(page.includes('scene3d.js'))})}test('pas de fausse scène 3D',()=>assert.throws(()=>scene.render('heat-transfer-01',0,0,10)));
test('exploration 3D qualitative : aucune valeur de résultat ni formule affichée',()=>{
 for(const id of scene.allowed){const x=id==='gear-mesh-01'?40:4;
  const svg=scene.render(id,.2,.3,x,{time:.2,conceptOnly:true});
  assert.match(svg,/Exploration qualitative : valeur calculée masquée/);
  assert.doesNotMatch(svg,/aₙ = |τmax = |ω₂\/ω₁|α = |Fᵣ = |v = |\|C\| = /);
  assert.notEqual(svg,scene.render(id,.2,.3,x,{time:.2}));
 }
});

test('courroie 3D : marqueur continu sur deux tangentes et deux demi-cercles',()=>{
 const r=48,span=180,perimeter=2*span+2*Math.PI*r;
 const points=[[0,90,48],[span,-90,48],[span+Math.PI*r,-90,-48],[2*span+Math.PI*r,90,-48],[perimeter,90,48]];
 for(const [distance,x,y] of points){
  const [actualX,actualY,z]=scene.beltMarkerPosition(distance/r);
  assert.ok(Math.abs(actualX-x)<1e-7,'abscisse au parcours '+distance);
  assert.ok(Math.abs(actualY-y)<1e-7,'ordonnée au parcours '+distance);
  assert.equal(z,0);
 }
 assert.ok(scene.beltMarkerPosition(.1)[0]<90,'brin supérieur vers la gauche en rotation positive');
});
test('courroie 3D : vitesse tangentielle constante et absence de saut aux raccordements',()=>{
 const r=48,delta=1e-5;
 const corners=[0,180/r,(180+Math.PI*r)/r,(360+Math.PI*r)/r,(360+2*Math.PI*r)/r];
 for(const phase of [...corners,.3,1.3,4.5,6.5,10.8]){
  const a=scene.beltMarkerPosition(phase-delta),b=scene.beltMarkerPosition(phase+delta);
  const distance=Math.hypot(a[0]-b[0],a[1]-b[1]);
  assert.ok(Math.abs(distance-2*r*delta)<1e-6,'continuité et vitesse pour phase '+phase);
 }
 for(const invalid of [NaN,Infinity])assert.throws(()=>scene.beltMarkerPosition(invalid),RangeError);
});
test('courroie 3D : SVG animé cohérent avec la position physique du marqueur',()=>{
 const time=.5,rpm=60,phase=2*Math.PI*rpm*time/60;
 const [x,y]=scene.beltMarkerPosition(phase);
 const svg=scene.render('belt-speed-01',0,0,rpm,{time});
 const cx=(300+1.6*x).toFixed(2),cy=(150-1.6*y).toFixed(2);
 assert.ok(svg.includes('<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="#7ce8ae"/>'));
 assert.doesNotMatch(svg,/NaN|Infinity/);
});
