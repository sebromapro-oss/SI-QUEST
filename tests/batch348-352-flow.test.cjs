'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {physics,diagrams,meta}=require('../src/batch348-352.js');
const ui=fs.readFileSync('src/investigation-mission.js','utf8');
function mockPage(c){
 function el(tag=''){return {tag,style:{},attrs:{},events:{},children:[],classList:{toggle(){}},value:'',textContent:'',hidden:false,disabled:false,setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},append(...xs){this.children.push(...xs)},replaceChildren(...xs){this.children=xs},insertBefore(){},insertAdjacentElement(){},addEventListener(name,fn){this.events[name]=fn},querySelectorAll(){return []},querySelector(){return el()}}}
 const ids=['main','curve','point','graphic','trialLabel','trialValue','trial','solution','log','calc','answer','feedback','hint','hintText','solutionText','reset'];
 const nodes=Object.fromEntries(ids.map(id=>[id,el(id)]));const graph=el('graph'),model=el('model');graph.querySelectorAll=()=>[el('text'),el('text')];
 nodes.calc.previousElementSibling=el('p');nodes.curve.closest=sel=>sel==='svg'?graph:model;nodes.main.querySelector=()=>el('section');nodes.trialValue.value=String(c.initial);
 const document={head:el('head'),getElementById:id=>nodes[id],createElement:tag=>el(tag),createElementNS:(ns,tag)=>el(tag),createTextNode:s=>({textContent:s})};
 const store={},localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
 const window={SI_MISSION:c,SIInvestigations:physics,SIInvestigationDiagrams:diagrams};
 new Function('window','document','localStorage','SIInvestigations','SIInvestigationDiagrams',ui)(window,document,localStorage,physics,diagrams);
 return {nodes,graph,store};}
for(const a of meta)test(a.id+' : essais, aides, corrigé, étoiles et sauvegarde (DOM simulé)',()=>{
 const html=fs.readFileSync('missions/'+a.id+'.html','utf8'),cfg=JSON.parse(html.split('window.SI_MISSION=')[1].split('</script>')[0]);
 const p=mockPage(cfg),n=p.nodes;assert.equal(p.graph.style.display,'none');assert.equal(n.trial.disabled,true);assert.equal(n.solution.disabled,true);
 n.answer.value='texte';n.calc.events.submit({preventDefault(){}});assert.match(n.feedback.textContent,/Saisie invalide/);assert.equal(n.solution.disabled,true);
 n.answer.value='999999';for(let i=0;i<3;i++)n.calc.events.submit({preventDefault(){}});
 assert.equal(n.solution.disabled,true);for(let i=0;i<3;i++)n.hint.events.click();assert.equal(n.solution.disabled,false);assert.equal(p.graph.style.display,'none');assert.match(n.hintText.textContent,/3\. /);
 n.solution.events.click();assert.equal(p.graph.style.display,'block');assert.match(n.feedback.textContent,/calcul non validé/i);
 const s=mockPage(cfg),m=s.nodes;m.answer.value=String(cfg.expected).replace('.',',');m.calc.events.submit({preventDefault(){}});
 assert.equal(s.graph.style.display,'block');assert.equal(m.trial.disabled,false);assert.equal(m.solution.disabled,true);
 const saved=JSON.parse(Object.values(s.store)[0]);assert.equal(saved.mastered,true);assert.equal(saved.stars,3);assert.equal(saved.tries,1);
});
