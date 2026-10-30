(function(root){'use strict';
const base=typeof module!=='undefined'&&module.exports?require('./batch248-252.js').physics:root.SIInvestigations;
const prior=typeof module!=='undefined'&&module.exports?require('./batch248-252.js').diagrams:root.SIInvestigationDiagrams;
if(!base||!prior)throw Error('Moteur scientifique absent');
const meta=[{"id":"bearing-pv-factor-01","title":"Palier lisse — Facteur PV","min":0,"max":2400,"lo":0,"hi":3,"iu":"tr/min","u":"MPa·m/s","policy":{"absoluteTolerance":0.05,"relativeTolerance":0,"precision":3,"assumptions":"Palier cylindrique idéal : F=1 500 N, d=30 mm, L=40 mm, vitesse 0 à 2 400 tr/min ; charge radiale uniforme sur aire projetée ; température, film d'huile et effets dynamiques négligés.","solution":"1. d=0,030 m ; L=0,040 m ; F=1 500 N ; n=1 200 tr/min.\n2. Aire A=dL=0,00120 m² ; p=F/A=1 250 000 Pa=1,25 MPa.\n3. Vitesse v=πdn/60=π×0,030×1 200/60=1,884956 m/s.\n4. PV=pv=1,25×1,884956=2,356194 MPa·m/s.\n5. Homogénéité : Pa×m/s=N/(m·s). À n=0, PV=0 ; si n double, PV double.\n6. Le seuil fictif de 3 MPa·m/s est respecté. Vérifier ensuite la température, les jeux et les données du fabricant."}},{"id":"three-phase-cable-voltage-drop-01","title":"Câble triphasé — Chute de tension résistive","min":0,"max":40,"lo":0,"hi":5,"iu":"A","u":"V","policy":{"absoluteTolerance":0.1,"relativeTolerance":0,"precision":3,"assumptions":"Réseau triphasé sinusoïdal équilibré ; câble cuivre à température de référence, ρ=0,0175 Ω·mm²/m, longueur aller L=50 m, section S=6 mm², cos φ=0,80 ; réactance, harmoniques et échauffement négligés.","solution":"1. ρ=0,0175 Ω·mm²/m, L=50 m, S=6 mm², I=20 A, cos φ=0,80.\n2. Résistance d'une phase : R=ρL/S=0,0175×50/6=0,145833 Ω.\n3. Relation approchée en triphasé équilibré : ΔU≈√3 I R cos φ.\n4. ΔU≈1,732051×20×0,145833×0,80=4,041452 V.\n5. Homogénéité : A×Ω=V ; à I=0, ΔU=0 ; doubler I double ΔU.\n6. Le seuil fictif de 5 V est respecté. Vérifier la réactance, l'échauffement et le régime de démarrage réel."}},{"id":"hydraulic-throttle-heat-01","title":"Étrangleur hydraulique — Puissance dissipée","min":0,"max":100,"lo":0,"hi":1.5,"iu":"bar","u":"kW","policy":{"absoluteTolerance":0.03,"relativeTolerance":0,"precision":3,"assumptions":"Écoulement incompressible stationnaire de gauche à droite ; débit Q=15 L/min constant, perte Δp entre 0 et 100 bar ; puissance mécanique perdue dissipée en chaleur, sans bilan thermique transitoire.","solution":"1. Débit Q=15 L/min=15×10⁻³/60=2,50×10⁻⁴ m³/s.\n2. Perte nominale Δp=40 bar=4,00×10⁶ Pa.\n3. Puissance perdue P=ΔpQ.\n4. P=4,00×10⁶×2,50×10⁻⁴=1 000 W=1,00 kW.\n5. Contrôle SI : Pa×m³/s=N·m/s=W. Si Δp=0, la puissance dissipée vaut 0.\n6. Le critère fictif est respecté au nominal ; le calcul ne prédit pas la température d'huile."}},{"id":"pneumatic-receiver-fill-time-01","title":"Réservoir pneumatique — Remplissage idéal","min":6,"max":10,"lo":0,"hi":120,"iu":"bar manométrique","u":"s","policy":{"absoluteTolerance":2,"relativeTolerance":0,"precision":3,"assumptions":"Réservoir rigide V=0,100 m³ ; air parfait isotherme ; p₁=6 bar manométriques, p₂ entre 6 et 10 bar manométriques ; atmosphère et débit de référence à 1 bar absolu ; Q_libre=0,0020 m³/s constant ; sans fuite.","solution":"1. V=0,100 m³ ; p₁=6 bar(g)=7 bar(abs) ; p₂=8 bar(g)=9 bar(abs).\n2. Débit d'air libre Q_ref=0,0020 m³/s à p_ref=1 bar(abs), température constante.\n3. Bilan de masse idéal : V(p₂abs−p₁abs)=p_ref Q_ref t.\n4. t=0,100×(9−7)/(1×0,0020)=100 s ; les bar se simplifient.\n5. Homogénéité : m³×Pa/(Pa×m³/s)=s ; à p₂=p₁, t=0 ; à 10 bar(g), t=200 s.\n6. Le critère fictif est respecté au nominal ; débit et température réels sont à vérifier."}},{"id":"half-power-damping-ratio-01","title":"Banc vibratoire — Amortissement par demi-puissance","min":2,"max":16,"lo":0,"hi":0.12,"iu":"Hz","u":"sans unité","policy":{"absoluteTolerance":0.005,"relativeTolerance":0,"precision":3,"assumptions":"Mode linéaire isolé à amortissement visqueux faible à modéré ; fₙ≈40 Hz ; bande Δf=f₂−f₁ de 2 à 16 Hz ; méthode approximative, surtout valable pour faible amortissement ; schéma symétrique indicatif.","solution":"1. Le pic isolé est situé près de fₙ≈40 Hz ; f₁≈36 Hz et f₂≈44 Hz.\n2. Largeur de bande Δf=f₂−f₁=44−36=8 Hz.\n3. Approximation de demi-puissance : ζ≈Δf/(2fₙ).\n4. ζ≈8/(2×40)=0,100, sans unité.\n5. Homogénéité : Hz/Hz=1 ; à Δf=2 Hz, ζ≈0,025 ; à Δf=16 Hz, ζ≈0,200.\n6. Le seuil fictif de 0,12 est respecté ; vérifier la validité du modèle modal et les incertitudes."}}];
const byId=Object.fromEntries(meta.map(m=>[m.id,m]));
const models={"bearing-pv-factor-01":x=>1500/(.03*.04)/1e6*Math.PI*.03*x/60,
"three-phase-cable-voltage-drop-01":x=>Math.sqrt(3)*x*(.0175*50/6)*.8,
"hydraulic-throttle-heat-01":x=>x*1e5*(15/60000)/1000,
"pneumatic-receiver-fill-time-01":x=>.1*(x-6)/.002,
"half-power-damping-ratio-01":x=>x/80};
const criteria=Object.freeze(Object.assign({},base.criteria,Object.fromEntries(meta.map(m=>[m.id,{min:m.lo,max:m.hi,unit:m.u}]))));
const answerPolicy=Object.freeze(Object.assign({},base.answerPolicy,Object.fromEntries(meta.map(m=>[m.id,Object.freeze(m.policy)]))));
const inputUnits=Object.freeze(Object.assign({},base.inputUnits,Object.fromEntries(meta.map(m=>[m.id,m.iu]))));
function calculate(id,x){const m=byId[id];if(!m)return base.calculate(id,x);if(!Number.isFinite(x)||x<m.min||x>m.max)throw new RangeError('Paramètre hors domaine');const y=models[id](x);if(!Number.isFinite(y))throw new RangeError('Résultat non fini');return y}
function assess(id,x){const m=byId[id];if(!m)return base.assess(id,x);const value=calculate(id,x);return Object.freeze({value,acceptable:value>=m.lo-1e-9&&value<=m.hi+1e-9,min:m.lo,max:m.hi,unit:m.u})}
const physics=Object.freeze(Object.assign({},base,{calculate,assess,criteria,answerPolicy,inputUnits}));
const titles=Object.freeze(Object.assign({},prior.titles,Object.fromEntries(meta.map(m=>[m.id,m.title]))));
const n=v=>Number(v.toPrecision(7)).toLocaleString('fr-FR',{maximumFractionDigits:7});
const line=(x1,y1,x2,y2,color='#a9d9ed',width=3,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'" '+extra+'/>';
const label=(x,y,t)=>'<text x="'+x+'" y="'+y+'" fill="#fff" font-size="16">'+t+'</text>';
function render(id,x,y){
if(!byId[id])return prior.render(id,x,y);
if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(y-calculate(id,x))>1e-8*Math.max(1,Math.abs(y)))throw new RangeError('Schéma désynchronisé');
let s='';
switch(id){
case 'bearing-pv-factor-01':{const v=Math.PI*.03*x/60,w=Number((160*x/2400).toFixed(3));
s+=line(105,123,490,123,'#b9e5ed',10)+'<rect x="230" y="86" width="140" height="76" rx="12" fill="#41647b" stroke="#ffd17d" stroke-width="3"/>';
s+=label(242,112,'PALIER')+label(100,75,'d = 30 mm ; L = 40 mm');
if(x>0)s+='<rect x="105" y="185" width="'+w+'" height="12" fill="#7ce8ae" data-vitesse-largeur-px="'+w+'"/>';
s+=label(290,190,'v = '+n(v)+' m/s')+label(25,42,'F = 1 500 N ; n = '+n(x)+' tr/min')+label(25,225,'p = 1,25 MPa ; PV = '+n(y)+' MPa·m/s');break;}
case 'three-phase-cable-voltage-drop-01':{for(let k=0;k<3;k++){const yy=90+k*43;s+=line(110,yy,245,yy)+line(287,yy,500,yy)+'<rect x="245" y="'+(yy-12)+'" width="42" height="24" fill="#32556d" stroke="#ffd17d" stroke-width="3"/>'+label(68,yy+5,'L'+(k+1));}
s+=label(25,39,'I = '+n(x)+' A ; cos φ = 0,80')+label(25,65,'L = 50 m ; S = 6 mm² ; R = 0,145833 Ω/phase')+label(25,226,'ΔU = '+n(y)+' V ; réactance négligée');break;}
case 'hydraulic-throttle-heat-01':{const w=Number((160*x/100).toFixed(3));
s+=line(75,129,245,129,'#8ddcff',10)+line(355,129,530,129,'#8ddcff',10);
s+='<path d="M245 95 L286 129 L245 163 Z M355 95 L314 129 L355 163 Z" fill="#315b75" stroke="#ffd17d" stroke-width="3" data-passage-libre-px="28"/>';
s+=line(390,105,445,105,'#7ce8ae',4,'marker-end="url(#pointe)"');
if(x>0)s+='<rect x="75" y="185" width="'+w+'" height="12" fill="#ffca7d" data-perte-largeur-px="'+w+'"/>';
s+=label(25,39,'Q = 15 L/min ; Δp = '+n(x)+' bar')+label(25,226,'Puissance dissipée = '+n(y)+' kW');break;}
case 'pneumatic-receiver-fill-time-01':{const w=Number((110*(x-6)/4).toFixed(3));
s+='<rect x="210" y="78" width="180" height="112" rx="28" fill="#294b63" stroke="#a9d9ed" stroke-width="4"/>'+line(170,135,210,135)+line(390,135,445,135);
if(x>6)s+='<rect x="240" y="125" width="'+w+'" height="19" fill="#7ce8ae" data-remplissage-largeur-px="'+w+'"/>';
s+=label(25,40,'V = 0,100 m³ ; Q libre = 0,002 m³/s')+label(25,66,'p₁ = 6 bar(g) ; p₂ = '+n(x)+' bar(g)')+label(25,226,'Temps idéal = '+n(y)+' s ; isotherme');break;}
case 'half-power-damping-ratio-01':{const f1=40-x/2,f2=40+x/2,xa=Number((300-4*x).toFixed(3)),xb=Number((300+4*x).toFixed(3));
s+=line(100,165,500,165)+line(300,110,300,198,'#7ce8ae',2,'stroke-dasharray="6 4"')+line(xa,125,xa,192,'#ffd17d',3)+line(xb,125,xb,192,'#ffd17d',3);
s+=line(xa,140,xb,140,'#ffd17d',4,'data-bande-largeur-px="'+Number((xb-xa).toFixed(3))+'"');
s+=label(65,40,'f₁ ≈ '+n(f1)+' Hz')+label(360,40,'f₂ ≈ '+n(f2)+' Hz')+label(225,104,'fₙ ≈ 40 Hz')+label(25,226,'Δf = '+n(x)+' Hz ; ζ ≈ '+n(y)+' (sans unité)');break;}
}
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 235" role="img" aria-labelledby="schema-titre schema-description" class="machine"><title id="schema-titre">'+titles[id]+'</title><desc id="schema-description">Schéma 2D paramétrique. Valeurs accessibles en texte. Barres et fréquences : repères, sans animation temporelle.</desc><defs><marker id="pointe" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#7ce8ae"/></marker></defs><rect x="1" y="1" width="598" height="232" rx="12" fill="#092236" stroke="#507895"/>'+s+'<g data-parameter="'+x.toFixed(6)+'" data-result="'+y.toFixed(6)+'"></g></svg>';
}
const diagrams=Object.freeze(Object.assign({},prior,{render,titles}));
root.SIInvestigations=physics;root.SIInvestigationDiagrams=diagrams;
if(typeof module!=='undefined'&&module.exports)module.exports={physics,diagrams};
})(typeof window==='undefined'?globalThis:window);
