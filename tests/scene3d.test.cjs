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

test('courroie 3D : périodicité, rayon et confinement sur le contour fermé',()=>{
 const radius=48,left=-90,right=90,span=right-left;
 const perimeter=2*span+2*Math.PI*radius;
 const phasePeriod=perimeter/radius;
 for(const phase of [-20,-3,-.1,0,.1,1,3,7,12,25]){
  const [x,y,z]=scene.beltMarkerPosition(phase,radius,left,right);
  assert.ok(Number.isFinite(x)&&Number.isFinite(y)&&z===0);
  assert.ok(x>=left-radius-1e-8&&x<=right+radius+1e-8);
  assert.ok(y>=-radius-1e-8&&y<=radius+1e-8);
  const onTop=Math.abs(y-radius)<1e-8&&x>=left-1e-8&&x<=right+1e-8;
  const onBottom=Math.abs(y+radius)<1e-8&&x>=left-1e-8&&x<=right+1e-8;
  const onLeft=Math.abs(Math.hypot(x-left,y)-radius)<1e-8&&x<=left+1e-8;
  const onRight=Math.abs(Math.hypot(x-right,y)-radius)<1e-8&&x>=right-1e-8;
  assert.ok(onTop||onBottom||onLeft||onRight,'point hors courroie : '+phase);
  const next=scene.beltMarkerPosition(phase+phasePeriod,radius,left,right);
  assert.ok(Math.hypot(x-next[0],y-next[1])<1e-8,'périodicité : '+phase);
 }
});
test('courroie 3D : rejet des géométries dégénérées',()=>{
 for(const args of [[0,0,-90,90],[0,-1,-90,90],[0,48,90,90],[0,48,91,90],[0,48,NaN,90],[Infinity,48,-90,90]])
  assert.throws(()=>scene.beltMarkerPosition(...args),RangeError);
});

test('résistance au roulement 3D : force nulle sans vecteur fictif',()=>{
 const zero=scene.render('rolling-load-01',0,0,0);
 const positive=scene.render('rolling-load-01',0,0,.025);
 assert.equal(scene.describe('rolling-load-01',0).resistance,0);
 assert.equal(scene.describe('rolling-load-01',.025).resistance,200);
 assert.doesNotMatch(zero,/<path[^>]*stroke="#ff9999"[^>]*marker-end=/,'Aucune flèche de résistance pour Fᵣ = 0 N');
 assert.match(positive,/<path[^>]*stroke="#ff9999"[^>]*marker-end="url\(#sq-arrow-ff9999\)"/,'La flèche de résistance doit apparaître pour Fᵣ > 0 N');
});

test('roulement 3D : résistance opposée au déplacement et appui orienté vers le haut',()=>{
 const svg=scene.render('rolling-load-01',0,0,.025);
 // Projection à caméra nulle : x_svg = 300+1,6x ; y_svg = 150-1,6y.
 // Résistance de 200 N : longueur indicative min(100,20+200/4)=70.
 assert.match(svg,/<path d="M300\.00 246\.00 L188\.00 246\.00"[^>]*stroke="#ff9999"/,
  'Résistance vers la gauche, opposée au déplacement vers la droite');
 assert.match(svg,/<path d="M300\.00 246\.00 L300\.00 130\.80"[^>]*stroke="#7ce8ae"/,
  'Réaction normale orientée vers le haut');
 assert.match(svg,/<path d="M300\.00 150\.00 L452\.00 150\.00"[^>]*stroke="#8ddcff"/,
  'Sens du déplacement orienté vers la droite');
});

test('mouvement circulaire 3D : accélération centripète et vitesse tangentielle',()=>{
 const svg=scene.render('circular-02',0,0,6,{time:0});
 // À phase 0, le point est à x=65 ; aₙ pointe vers le centre (x décroissant)
 // et la vitesse est orthogonale au rayon, dirigée vers +y.
 assert.match(svg,/<path d="M404\.00 150\.00 L336\.40 150\.00"[^>]*stroke="#ffca7d"/,
  'Accélération normale orientée vers le centre');
 assert.match(svg,/<path d="M404\.00 150\.00 L404\.00 82\.80"[^>]*stroke="#7ce8ae"/,
  'Vitesse tangentielle orthogonale au rayon');
 const d=scene.describe('circular-02',6);
 assert.equal(d.angularSpeed,12);
 assert.equal(d.acceleration,72);
});

test('engrenages 3D : contact des cercles primitifs et sens de rotation inverse',()=>{
 const id='gear-mesh-01',z2=40,d=scene.describe(id,z2);
 assert.equal(d.r1,30);assert.equal(d.r2,60);assert.equal(d.centerDistance,90);
 assert.equal(d.angularRatio,-.5);
 // Centre gauche x=-45, centre droit x=+45 : le contact est à x=-15.
 const svg=scene.render(id,0,0,z2,{time:0});
 assert.match(svg,/<circle cx="276\.00" cy="150\.00" r="5" fill="#ff9999"/,
  'Point de contact sur les cercles primitifs');
 for(const t of [0,.25,1,2]){
  const a=scene.render(id,0,0,z2,{time:t});
  assert.doesNotMatch(a,/NaN|Infinity|undefined/);
 }
});
test('torsion 3D : contrainte calculée en MPa et domaine du couple',()=>{
 const d=scene.describe('torsion-01',120);
 const expected=16*120*1000/(Math.PI*30**3);
 assert.ok(Math.abs(d.stress-expected)<1e-10);
 assert.match(scene.render('torsion-01',0,0,120),/τmax = /);
 assert.throws(()=>scene.describe('torsion-01',-1),RangeError);
});

test('couple nul : aucun vecteur de couple fictif dans les scènes de freinage et torsion',()=>{
 for(const id of ['brake-torque-01','torsion-01']){
  const zero=scene.render(id,0,0,0);
  const nonzero=scene.render(id,0,0,120);
  // Les rayons des arbres restent visibles ; seul le vecteur spécifique de couple est conditionnel.
  assert.doesNotMatch(zero,/marker-end="url\(#sq-arrow-ffca7d\)"/,id+' : couple nul');
  assert.match(nonzero,/marker-end="url\(#sq-arrow-ffca7d\)"/,id+' : couple non nul');
  assert.equal(scene.describe(id,0).torque,0);
 }
});
