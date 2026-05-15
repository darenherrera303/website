/* ═══════════════════════════════════════
   Kay · Asistente EIATEC (v3 – Mejora natural)
═══════════════════════════════════════ */
const CFG={
  wa:{
    comercial:      '573000000001',
    gestionhumana:  '573000000002',
    hseq:           '573000000003',
    tecnica:        '573000000004',
    general:        '573001234567',
  },
  url:{
    servicios: 'https://www.eiatec.com/servicios',
    proyectos: 'https://www.eiatec.com/proyectos',
    nosotros:  'https://www.eiatec.com/nosotros',
    contacto:  'https://www.eiatec.com/contacto',
    blog:      'https://www.eiatec.com/blog',
  },
  mail:{
    comercial:  'comercial@eiatec.com',
    humana:     'gestionhumana@eiatec.com',
    hseq:       'hseq@eiatec.com',
    tecnica:    'gerenciatecnica@eiatec.com',
    juridica:   'gestionjuridica@eiatec.com',
    compras:    'compras@eiatec.com',
    general:    'comercial@eiatec.com',
  }
};

const KAY_AV='https://static.wixstatic.com/media/2801d6_c8449c3cafcf4a06941af5aa73607488~mv2.png';

const FLOWS={
  inicio:{
    msg:`¡Hola! 👋 Soy <strong>Kai</strong>, el asistente virtual de <strong>eiatec</strong>.<br>Estoy aquí para ayudarte con todo lo que necesites. ¿Por dónde empezamos?`,
    opts:[
      {e:'📋',l:'Nuestros servicios',  n:'servicios'},
      {e:'🗂️',l:'Proyectos realizados', n:'proyectos'},
      {e:'🕐',l:'Horarios de atención', n:'horarios'},
      {e:'📩',l:'Hablar con un asesor', n:'asesor'},
      {e:'🌐',l:'Ir al sitio web',      n:'web'},
    ]
  },
  servicios:{
    msg:`En <strong>eiatec</strong> ofrecemos soluciones ambientales integrales:<br><br>🌿 Estudios de Impacto Ambiental (EIA)<br>🤝 Consulta Previa con comunidades<br>💧 Gestión de Recursos Hídricos<br>🦋 Flora, Fauna y Biodiversidad<br>☀️ Energía Renovable<br>🏛️ Arqueología y Patrimonio<br>♻️ Sostenibilidad Empresarial<br>🚚 Logística Ambiental<br><br>¿Te gustaría saber más?`,
    opts:[
      {e:'🔗',l:'Ver todos los servicios', a:()=>open(CFG.url.servicios,'_top')},
      {e:'📩',l:'Consultar un servicio',   n:'asesor'},
      {e:'🏠',l:'Volver al inicio',        n:'inicio'},
    ]
  },
  proyectos:{
    msg:`Hemos realizado <strong>más de 30 proyectos</strong> exitosos a lo largo y ancho de Colombia. 🇨🇴<br><br>EIAs, consultas previas, monitoreo de fauna, energía solar, compensaciones forestales y mucho más.`,
    opts:[
      {e:'🔗',l:'Ver proyectos',  a:()=>open(CFG.url.proyectos,'_top')},
      {e:'📩',l:'Contactar',      n:'asesor'},
      {e:'🏠',l:'Inicio',         n:'inicio'},
    ]
  },
  horarios:{
    msg:`🕐 <strong>Horarios de atención:</strong><br><br>📅 Lunes a Viernes<br>⏰ 8:00 a.m. – 6:00 p.m.<br><br>📞 <strong>(1) 704 2362</strong> / <strong>(1) 245 0961</strong><br>📍 Bogotá D.C. · Calle 45 C Bis #23-37<br><br>Fuera del horario, puedes escribirnos por WhatsApp o correo. Te respondemos lo antes posible. 😊`,
    opts:[
      {e:'💬',l:'Escribir por WhatsApp', a:()=>open(`https://wa.me/${CFG.wa.general}`,'_blank')},
      {e:'✉️',l:'Enviar correo',         a:()=>open(`mailto:${CFG.mail.general}`)},
      {e:'🏠',l:'Inicio',                n:'inicio'},
    ]
  },
  asesor:{
    msg:`¡Perfecto! Conectemos con el área indicada. ¿Sobre qué necesitas ayuda?`,
    opts:[
      {e:'💼',l:'Comercial / Proyectos', n:'f_comercial'},
      {e:'🛡️',l:'HSEQ',                 n:'f_hseq'},
      {e:'🔧',l:'Gerencia Técnica',      n:'f_tecnica'},
      {e:'👥',l:'Gestión Humana',        n:'f_humana'},
      {e:'⚖️',l:'Gestión Jurídica',      n:'f_juridica'},
      {e:'🏠',l:'Volver',               n:'inicio'},
    ]
  },
  f_comercial:{ type:'form', area:'comercial', label:'Comercial',        wa:CFG.wa.comercial,     mail:'comercial' },
  f_hseq:     { type:'form', area:'hseq',      label:'HSEQ',             wa:CFG.wa.hseq,          mail:'hseq'      },
  f_tecnica:  { type:'form', area:'tecnica',   label:'Gerencia Técnica', wa:CFG.wa.tecnica,       mail:'tecnica'   },
  f_humana:   { type:'form', area:'humana',    label:'Gestión Humana',   wa:CFG.wa.gestionhumana, mail:'humana'    },
  f_juridica: { type:'form', area:'juridica',  label:'Gestión Jurídica', wa:CFG.wa.general,       mail:'juridica'  },
  web:{
    msg:`¿A qué sección quieres ir? 🌐`,
    opts:[
      {e:'⚙️',l:'Servicios', a:()=>open(CFG.url.servicios,'_top')},
      {e:'📁',l:'Proyectos', a:()=>open(CFG.url.proyectos,'_top')},
      {e:'🏢',l:'Nosotros',  a:()=>open(CFG.url.nosotros,'_top')},
      {e:'✉️',l:'Contacto',  a:()=>open(CFG.url.contacto,'_top')},
      {e:'📰',l:'Blog',      a:()=>open(CFG.url.blog,'_top')},
      {e:'🏠',l:'Volver',   n:'inicio'},
    ]
  },
};

/* ═══════════════════════════════════════
   ENGINE
═══════════════════════════════════════ */
let isOpen=false,started=false;
const box=document.getElementById('kMsgs');
const inp=document.getElementById('kInp');

function toggleKay(){
  isOpen=!isOpen;
  document.getElementById('kayChat').classList.toggle('open',isOpen);
  document.getElementById('kayDot').style.display='none';
  if(isOpen&&!started){started=true;setTimeout(()=>goFlow('inicio'),380)}
  if(isOpen)setTimeout(()=>inp.focus(),340);
}
setTimeout(()=>{document.getElementById('kayDot').style.display='flex'},2800);

function addBot(html){
  const w=document.createElement('div');w.className='bm';
  w.innerHTML=`<div class="bm-av"><img src="${KAY_AV}" alt="Kai"></div><div class="bm-bub">${html}</div>`;
  box.appendChild(w);scroll();
}
function addUser(txt){
  const w=document.createElement('div');w.className='um';
  w.innerHTML=`<div class="um-bub">${txt}</div>`;
  box.appendChild(w);scroll();
}
function addOpts(opts){
  const w=document.createElement('div');w.className='kopts';
  opts.forEach(o=>{
    const b=document.createElement('button');b.className='kopt';
    b.innerHTML=`<span>${o.e||''}</span> ${o.l}`;
    b.onclick=()=>{
      w.querySelectorAll('.kopt').forEach(x=>{x.disabled=true;x.style.opacity='.4'});
      addUser(`${o.e||''} ${o.l}`);
      if(o.a){setTimeout(o.a,180);setTimeout(askAgain,600)}
      else if(o.n)showTyping(()=>goFlow(o.n));
    };
    w.appendChild(b);
  });
  box.appendChild(w);scroll();
}
function showTyping(cb){
  const w=document.createElement('div');w.className='ktyp';
  w.innerHTML=`<div class="bm-av"><img src="${KAY_AV}" alt="Kai"></div><div class="ktyp-bub"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
  box.appendChild(w);scroll();
  setTimeout(()=>{w.remove();cb()},820);
}
function addSys(txt){
  const w=document.createElement('div');w.className='ksys';w.textContent=txt;
  box.appendChild(w);scroll();
}
function scroll(){setTimeout(()=>box.scrollTop=box.scrollHeight,80)}

function goFlow(key){
  const f=FLOWS[key];if(!f)return;
  if(f.type==='form'){showForm(f);return}
  addBot(f.msg);
  setTimeout(()=>addOpts(f.opts),220);
}

/* ── FORM ── */
function showForm(f){
  const subj=`Consulta ${f.label} · EIATEC`;
  const el=document.createElement('div');el.className='kform';
  el.innerHTML=`
    <p class="kform-ttl"><i class="fas fa-paper-plane"></i>Cuéntanos tu consulta</p>
    <div class="kfg">
      <label>Nombre *</label>
      <div class="kfi-wrap"><i class="fas fa-user"></i>
        <input id="kfn" type="text" placeholder="Tu nombre" autocomplete="given-name">
      </div>
    </div>
    <div class="kfg">
      <label>Correo (opcional)</label>
      <div class="kfi-wrap"><i class="fas fa-envelope"></i>
        <input id="kfe" type="email" placeholder="correo@empresa.com" autocomplete="email">
      </div>
    </div>
    <div class="kfg">
      <label>Teléfono (opcional)</label>
      <div class="kfi-wrap"><i class="fas fa-phone"></i>
        <input id="kft" type="tel" placeholder="+57 300 000 0000" autocomplete="tel">
      </div>
    </div>
    <div class="kfg">
      <label>Mensaje (opcional)</label>
      <div class="kfi-wrap ta-wrap"><i class="fas fa-comment"></i>
        <textarea id="kfm" placeholder="Cuéntanos brevemente tu consulta o proyecto…"></textarea>
      </div>
    </div>
    <div class="kdiv"><span>¿Cómo prefieres continuar?</span></div>
    <div class="kform-btns">
      <button class="kbtn kbtn-wa" id="kfwa"><i class="fab fa-whatsapp"></i>WhatsApp</button>
      <button class="kbtn kbtn-em" id="kfem"><i class="fas fa-envelope"></i>Correo</button>
    </div>
    <p class="kform-hint">Solo tu nombre es obligatorio</p>`;
  box.appendChild(el);scroll();

  function getData(){
    return{
      name:(document.getElementById('kfn')?.value||'').trim(),
      email:(document.getElementById('kfe')?.value||'').trim(),
      phone:(document.getElementById('kft')?.value||'').trim(),
      msg:(document.getElementById('kfm')?.value||'').trim(),
    };
  }
  document.getElementById('kfwa').onclick=()=>{
    const d=getData();
    if(!d.name){document.getElementById('kfn').focus();return}
    const body=`Hola Kay, soy ${d.name}.${d.phone?' Tel: '+d.phone+'.':''}${d.email?' Email: '+d.email+'.':''} Consulta ${f.label}.${d.msg?' '+d.msg:''}`;
    open(`https://wa.me/${f.wa}?text=${encodeURIComponent(body)}`,'_blank');
    el.remove();addBot('¡Listo! <span class="kreact">🚀</span> Abrí WhatsApp con tu consulta. Solo envía el mensaje y nuestro equipo te contactará pronto.');
    askAgain();
  };
  document.getElementById('kfem').onclick=()=>{
    const d=getData();
    if(!d.name){document.getElementById('kfn').focus();return}
    const to=CFG.mail[f.mail]||CFG.mail.general;
    const sub=encodeURIComponent(subj);
    const bd=encodeURIComponent(`Hola,\n\nSoy ${d.name}.${d.phone?'\nTeléfono: '+d.phone:''}${d.email?'\nCorreo: '+d.email:''}\n\n${d.msg||'Quisiera recibir información sobre los servicios de EIATEC.'}\n\nSaludos.`);
    window.location.href=`mailto:${to}?subject=${sub}&body=${bd}`;
    el.remove();addBot('¡Perfecto! <span class="kreact">✉️</span> Abrí tu cliente de correo con todo pre-llenado. Solo dale clic en Enviar.');
    askAgain();
  };
}

function askAgain(){
  setTimeout(()=>{
    addSys('─────────────────');
    addBot('¿Puedo ayudarte con algo más? 😊');
    setTimeout(()=>addOpts([
      {e:'✅',l:'Sí, tengo otra consulta', n:'inicio'},
      {e:'👋',l:'No, gracias',             a:()=>{
        addBot('¡Fue un placer! Recuerda que puedes escribirme cuando quieras. 🌿<br>¡Hasta pronto!');
        setTimeout(()=>toggleKay(),2800);
      }}
    ]),250);
  },900);
}

/* ── Entrada de texto natural (mejorada) ── */
function handleKayInput(){
  const v=inp.value.trim();if(!v)return;
  inp.value='';addUser(v);
  const l=v.toLowerCase();

  // Saludos
  if(/^(hola|buenos días|buenas tardes|hey|saludos|buenas)/i.test(l)){
    addBot('¡Hola! 😊 ¿En qué puedo ayudarte?');
    goFlow('inicio');
    return;
  }
  // Despedidas / agradecimientos
  if(/^(adiós|chao|bye|gracias|muchas gracias|nos vemos)/i.test(l)){
    addBot('¡Gracias a ti! 🤗 Estoy aquí cuando me necesites.');
    setTimeout(()=>toggleKay(),2500);
    return;
  }

  // Derivación por palabras clave
  if(/servicio|eia|impacto|ambiental|hídric|forestal|fauna|flora/.test(l)) showTyping(()=>goFlow('servicios'));
  else if(/proyecto|trabajo|referencia|portafolio/.test(l)) showTyping(()=>goFlow('proyectos'));
  else if(/horario|hora|atencion|abre|cierra|oficina/.test(l)) showTyping(()=>goFlow('horarios'));
  else if(/contacto|asesor|hablar|whatsapp|correo|email/.test(l)) showTyping(()=>goFlow('asesor'));
  else if(/web|pagina|sitio|url/.test(l)) showTyping(()=>goFlow('web'));
  else showTyping(()=>{
    addBot('Entiendo tu consulta. 🤔 Te conecto con un asesor que podrá ayudarte mejor.');
    setTimeout(()=>goFlow('asesor'),200);
  });
}
inp.addEventListener('keydown',e=>{if(e.key==='Enter')handleKayInput()});

/* CMS bridge */
function sendReady(){window.parent.postMessage('READY','*')}
window.addEventListener('load',()=>{sendReady();setTimeout(sendReady,600)});