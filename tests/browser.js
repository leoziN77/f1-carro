import { PARTS, LAYERS } from '../src/data/parts.js';

// Testes de integração no aplicativo real. Disponíveis apenas no Vite dev.
export async function runBrowserChecks(app, { aero, M, dims }) {
  const { state, reg, camera, controls, renderer, advance, THREE } = app;
  const results = [];
  const jobs = [];
  const assert = (ok, message) => { if (!ok) throw Error(message); };
  const click = (selector) => document.querySelector(selector).click();
  const test = (name, fn) => {
    jobs.push({name,fn});
  };
  const parts = [...reg.parts.values()];
  const baseline = parts.map(p=>p.position.clone());
  test('74 peças, 43 cartões e 8 camadas com vínculos válidos', () => {
    assert(parts.length===74 && Object.keys(PARTS).length===43 && LAYERS.length===8,'Contagem divergente');
    parts.forEach(p=>assert(PARTS[p.userData.infoId] && state.layers[p.userData.layer]!==undefined,'Vínculo inválido'));
  });
  test('Documento, metadados e todos os cartões em pt-BR', () => {
    assert(document.documentElement.lang==='pt-BR','Idioma');
    assert(document.title.includes('peças'),'Título');
    assert(!/\b(the|must|supplier|driver|wheel|rear|front)\b/i.test(JSON.stringify(Object.values(PARTS))),'Texto em inglês');
  });
  test('Explosão gradual em 50%, total em 100% e retorno exato', () => {
    const ex=document.querySelector('#explode'); ex.value='.5';ex.dispatchEvent(new Event('input',{bubbles:true}));
    advance(.15); assert(state.explode>0 && state.explode<.5,'Transição não gradual');
    advance(4); const half=parts.map(p=>p.position.clone());
    click('[data-p=exploded]');advance(4);
    assert(state.explode===1,'Explosão incompleta');
    parts.forEach((p,i)=>{assert(p.position.distanceTo(p.userData.explode)<1e-6,`Deslocamento ${p.name}`);assert(half[i].length()<=p.position.length()+1e-6,'Explosão intermediária');});
    click('[data-p=assembled]');advance(4);
    parts.forEach((p,i)=>assert(p.position.distanceTo(baseline[i])<1e-6,`Retorno ${p.name}`));
  });
  test('Preset sem carroceria e restauração das camadas', () => {
    click('[data-p=shell]');advance(2);
    assert(state.frame && !state.layers.body,'Preset');
    assert(parts.filter(p=>p.userData.layer==='body').every(p=>!p.visible),'Carroceria visível');
    click('[data-p=assembled]');advance(2); assert(parts.every(p=>p.visible),'Restauração');
  });
  LAYERS.forEach((l,i)=>test(`Camada: ${l.label}`,()=>{
    const b=document.querySelectorAll('#layers button')[i];b.click();advance(2);
    assert(parts.filter(p=>p.userData.layer===l.id).every(p=>!p.visible),'Não ocultou');
    assert(b.getAttribute('aria-pressed')==='false','Estado acessível');
    b.click();advance(2);assert(parts.filter(p=>p.userData.layer===l.id).every(p=>p.visible),'Não restaurou');
  }));
  test('Menus, pesquisa sem acentos e estado vazio',()=>{
    click('[data-menu=parts-menu]');assert(!document.querySelector('#parts-menu').hidden,'Menu');
    const search=document.querySelector('#search');
    search.value='suspensao';search.dispatchEvent(new Event('input',{bubbles:true}));
    assert([...document.querySelectorAll('.part-item')].some(b=>!b.hidden&&b.textContent.includes('Suspensão')),'Acentos');
    search.value='xyz-inexistente';search.dispatchEvent(new Event('input',{bubbles:true}));assert(!document.querySelector('#search-empty').hidden,'Vazio');
    search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(document.querySelector('#parts-menu').hidden,'Escape');
  });
  test('Todos os 43 cartões: seleção, conteúdo, foco da câmera e fechamento',()=>{
    [...document.querySelectorAll('.part-item')].forEach((b,i)=>{
      b.click();advance(1.2);
      const p=Object.values(PARTS)[i];
      assert(document.querySelector('#part-title').textContent===p.name,'Título');
      assert(document.querySelector('#card').textContent.includes(p.summary),'Resumo');
      assert(state.pinned===Object.keys(PARTS)[i],'Seleção');
      assert(camera.position.toArray().every(Number.isFinite),'Câmera');
      click('#card .close');assert(state.pinned===null,'Fechamento');
    });
  });
  test('Seleção reativa uma camada oculta',()=>{
    document.querySelectorAll('#layers button')[2].click();advance(2);
    [...document.querySelectorAll('.part-item')].find(b=>b.title==='Pneus').click();advance(2);
    assert(state.layers.wheels && parts.filter(p=>p.userData.layer==='wheels').every(p=>p.visible),'Camada');
    click('#card .close');
  });
  for(const name of ['hero','side','top','front','rear','under']) test(`Vista de câmera: ${name}`,()=>{
    click(`[data-cam=${name}]`);advance(1.5);
    assert(camera.position.toArray().every(Number.isFinite),'Posição');
    if(name==='under')assert(camera.position.y<0 && controls.maxPolarAngle===Math.PI,'Vista inferior');
    if(name==='top')assert(camera.position.y>6,'Vista superior');
  });
  test('Cores por categoria e raio X restauram materiais',()=>{
    click('[data-cam=hero]');advance(1.5);
    const mesh=parts.find(p=>p.userData.xray).children.find(o=>o.isMesh);
    const original=mesh.material;
    click('#view-mode');assert(state.view==='category' && mesh.material!==original,'Cores');
    click('#view-mode');click('#xray');assert(mesh.material.transparent && mesh.material.opacity<.1,'Raio X');
    click('#xray');assert(mesh.material===original,'Material original');
  });
  test('Dimensões remontam o carro explodido e exibem medidas traduzidas',()=>{
    click('[data-p=exploded]');advance(4);click('#dims');advance(4);
    assert(dims.group.visible && state.explode===0,'Dimensões / montagem');
    assert(document.querySelector('#labels').textContent.includes('Entre-eixos máximo'),'Rótulos');click('#dims');
  });
  test('Aerodinâmica ativa: todos os pivôs abrem e fecham',()=>{
    click('#aero-mode');advance(3);
    Object.values(aero).forEach(w=>w.flapPivots.forEach((p,i)=>assert(Math.abs(p.rotation.z-w.flapAngles[i])<1e-6,'Abertura')));
    click('#aero-mode');advance(3);Object.values(aero).forEach(w=>w.flapPivots.forEach(p=>assert(Math.abs(p.rotation.z)<1e-6,'Fechamento')));
  });
  test('Cinco compostos e cinco pinturas completam o ciclo',()=>{
    const colors=new Set(),names=new Set();
    for(let i=0;i<5;i++){click('#compound');colors.add(M.compound.color.getHex());click('#paint');names.add(document.querySelector('#paint').getAttribute('aria-label'));}
    assert(colors.size===5&&names.size===5,'Ciclo incompleto');
    assert(document.querySelector('#paint').getAttribute('aria-label').includes('Vermelho'),'Pintura inicial');
  });
  test('Rotação automática move a câmera e pode ser desligada',()=>{
    const p=camera.position.clone();click('#spin');advance(1);assert(camera.position.distanceTo(p)>.01,'Sem giro');click('#spin');assert(!controls.autoRotate,'Giro não desliga');
  });
  test('Roda do mouse aproxima e afasta dentro dos limites',()=>{
    const canvas=renderer.domElement,d=()=>camera.position.distanceTo(controls.target),start=d();
    canvas.dispatchEvent(new WheelEvent('wheel',{deltaY:-200,cancelable:true}));advance(.5);assert(d()<start,'Zoom para dentro');
    canvas.dispatchEvent(new WheelEvent('wheel',{deltaY:400,cancelable:true}));advance(.5);assert(d()>start,'Zoom para fora');
    assert(d()>=controls.minDistance&&d()<=controls.maxDistance,'Limites');
  });
  test('Gestos sintetizados: arrasto de mouse, toque e pinça',()=>{
    const c=renderer.domElement;
    // Eventos sintéticos não têm ponteiro nativo capturável; só a captura é simulada.
    const set=c.setPointerCapture,release=c.releasePointerCapture;
    c.setPointerCapture=()=>{};c.releasePointerCapture=()=>{};
    const event=(type,id,x,y,pointerType)=>c.dispatchEvent(new PointerEvent(type,{pointerId:id,clientX:x,clientY:y,pointerType,button:0,buttons:type==='pointerup'?0:1,bubbles:true}));
    try {
      for(const type of ['mouse','touch']){
        const p=camera.position.clone();event('pointerdown',1,100,250,type);event('pointermove',1,250,270,type);event('pointerup',1,250,270,type);advance(.5);assert(camera.position.distanceTo(p)>.1,`Órbita ${type}`);
      }
      const d=camera.position.distanceTo(controls.target);
      event('pointerdown',1,100,250,'touch');event('pointerdown',2,200,250,'touch');event('pointermove',2,300,250,'touch');event('pointerup',1,100,250,'touch');event('pointerup',2,300,250,'touch');advance(.5);
      assert(camera.position.distanceTo(controls.target)<d,'Pinça');
    } finally {c.setPointerCapture=set;c.releasePointerCapture=release;}
  });
  click('[data-p=assembled]');click('[data-cam=hero]');advance(4);
  test('Raycasting: destaque ao passar o cursor e seleção por clique/toque',()=>{
    click('[data-p=assembled]');click('[data-cam=hero]');advance(4);
    const c=renderer.domElement;
    let hit=null;
    for(let y=.35;y<.8&&!hit;y+=.08)for(let x=.2;x<.85&&!hit;x+=.08){
      const px=x*innerWidth,py=y*innerHeight;
      c.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientX:px,clientY:py}));advance(.05);
      if(state.hover)hit={px,py,id:state.hover.userData.infoId};
    }
    assert(hit && !document.querySelector('#card').hidden,'Destaque e cartão');
    for(const pointerType of ['mouse','touch']){
      // O tap é testado diretamente nos listeners de seleção, sem gesto de órbita.
      const down=new PointerEvent('pointerdown',{pointerType,clientX:hit.px,clientY:hit.py,pointerId:7});
      const up=new PointerEvent('pointerup',{pointerType,clientX:hit.px,clientY:hit.py,pointerId:7});
      const enabled=controls.enabled;controls.enabled=false;
      try{c.dispatchEvent(down);c.dispatchEvent(up);}finally{controls.enabled=enabled;}
      assert(state.pinned===hit.id,`Seleção ${pointerType}`);click('#card .close');
    }
    c.dispatchEvent(new PointerEvent('pointerleave',{pointerType:'mouse'}));advance(.1);
  });
  for (const {name,fn} of jobs) {
    await new Promise(resolve => setTimeout(resolve, 30));
    try { fn(); results.push({name,ok:true}); }
    catch(e) { results.push({name,ok:false,error:e.message}); }
  }
  const report=document.createElement('section');report.id='test-report';
  Object.assign(report.style,{position:'fixed',inset:'100px 16px 140px',overflow:'auto',background:'#131212',color:'#eeece9',zIndex:100,padding:'24px',font:'14px system-ui'});
  const heading=document.createElement('h1');heading.textContent=`Testes: ${results.filter(r=>r.ok).length}/${results.length} aprovados`;
  const pre=document.createElement('pre');pre.style.whiteSpace='pre-wrap';pre.textContent=JSON.stringify(results,null,2);report.append(heading,pre);document.body.append(report);
}
