(function(){
  /* =============================================
     EIATEC · Asistente virtual (minimizable)
     ============================================= */
  const MASCOT_URL = "https://static.wixstatic.com/media/2801d6_0750b926a5df4311bd99312528aa9e0b~mv2.png";

  const CFG = {
    whatsapp: {
      comercial:       'https://wa.me/573000000001?text=Hola+EIATEC%2C+consulta+comercial',
      gestionhumana:   'https://wa.me/573000000002?text=Hola%2C+consulta+de+Gesti%C3%B3n+Humana',
      hseq:            'https://wa.me/573000000003?text=Hola%2C+consulta+HSEQ',
      gerenciatecnica: 'https://wa.me/573000000004?text=Hola%2C+consulta+t%C3%A9cnica',
      general:         'https://wa.me/573001234567?text=Hola+EIATEC%2C+quiero+m%C3%A1s+informaci%C3%B3n',
    },
    pages: {
      servicios: 'https://www.eiatec.com.co/servicios',
      proyectos: 'https://www.eiatec.com.co/proyectos',
      nosotros:  'https://www.eiatec.com.co/nosotros',
      contacto:  'https://www.eiatec.com.co/contacto',
      blog:      'https://www.eiatec.com.co/blog',
    },
    emails: {
      comercial:       'comercial@eiatec.com',
      gestionhumana:   'gestionhumana@eiatec.com',
      hseq:            'hseq@eiatec.com',
      gerenciatecnica: 'gerenciatecnica@eiatec.com',
      compras:         'compras@eiatec.com'
    }
  };

  const FLOWS = {
    inicio: {
      msg: '¡Hola! 👋 Soy el asistente virtual de <strong>EIATEC</strong>.<br>¿En qué puedo ayudarte hoy?',
      opts: [
        {label:'📋 Ver nuestros servicios', next:'servicios'},
        {label:'🗂️ Proyectos realizados',  next:'proyectos'},
        {label:'🕐 Horarios de atención',  next:'horarios'},
        {label:'📩 Hablar con un asesor',  next:'asesor'},
        {label:'🌐 Ir a nuestra web',       next:'web'},
      ]
    },
    servicios: {
      msg:'Ofrecemos servicios en:<br>• Estudios de Impacto Ambiental (EIA)<br>• Consulta Previa<br>• Gestión Hídrica<br>• Flora, Fauna y Biodiversidad<br>• Energía Renovable<br>• Arqueología<br>• Sostenibilidad Empresarial<br>• Logística Ambiental<br>¿Deseas más detalle?',
      opts:[
        {label:'🔗 Ver todos los servicios', action:()=>open(CFG.pages.servicios,'_top')},
        {label:'📩 Consultar sobre un servicio', next:'asesor'},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    proyectos: {
      msg:'Hemos realizado más de 30 proyectos en toda Colombia: EIAs, consultas previas, monitoreo de fauna, compensaciones forestales, energía solar y más.',
      opts:[
        {label:'🔗 Ver proyectos', action:()=>open(CFG.pages.proyectos,'_top')},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    horarios: {
      msg:'🕐 <strong>Horarios de atención:</strong><br><br>📅 Lunes a Viernes<br>⏰ 8:00 am – 6:00 pm<br><br>📞 Teléfonos: (1) 704 2362 / (1) 245 0961<br>📍 Bogotá D.C. · Calle 45 C Bis #23-37<br><br>Fuera de horario puedes escribirnos por WhatsApp o correo.',
      opts:[
        {label:'💬 Escribir por WhatsApp', action:()=>open(CFG.whatsapp.general,'_blank')},
        {label:'✉️ Enviar correo', action:()=>open('mailto:'+CFG.emails.comercial)},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    asesor: {
      msg:'Perfecto. ¿Sobre qué área es tu consulta?',
      opts:[
        {label:'💼 Comercial / Proyectos',  next:'contacto_comercial'},
        {label:'🛡️ HSEQ',                   next:'contacto_hseq'},
        {label:'🔧 Gerencia Técnica',        next:'contacto_tecnica'},
        {label:'👥 Gestión Humana',          next:'contacto_rrhh'},
        {label:'📦 Otras áreas',             next:'contacto_otras'},
      ]
    },
    contacto_comercial: {
      msg:'Te comunico con el área <strong>Comercial</strong>. ¿Cómo prefieres contactarnos?',
      opts:[
        {label:'💬 WhatsApp Comercial', action:()=>open(CFG.whatsapp.comercial,'_blank')},
        {label:'✉️ Email: '+CFG.emails.comercial, action:()=>open('mailto:'+CFG.emails.comercial)},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    contacto_hseq: {
      msg:'Te comunico con el área <strong>HSEQ</strong>. ¿Cómo prefieres contactarnos?',
      opts:[
        {label:'💬 WhatsApp HSEQ', action:()=>open(CFG.whatsapp.hseq,'_blank')},
        {label:'✉️ Email: '+CFG.emails.hseq, action:()=>open('mailto:'+CFG.emails.hseq)},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    contacto_tecnica: {
      msg:'Te comunico con <strong>Gerencia Técnica</strong>. ¿Cómo prefieres contactarnos?',
      opts:[
        {label:'💬 WhatsApp Técnico', action:()=>open(CFG.whatsapp.gerenciatecnica,'_blank')},
        {label:'✉️ Email: '+CFG.emails.gerenciatecnica, action:()=>open('mailto:'+CFG.emails.gerenciatecnica)},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    contacto_rrhh: {
      msg:'Te comunico con <strong>Gestión Humana</strong>. ¿Cómo prefieres contactarnos?',
      opts:[
        {label:'💬 WhatsApp RR.HH.', action:()=>open(CFG.whatsapp.gestionhumana,'_blank')},
        {label:'✉️ Email: '+CFG.emails.gestionhumana, action:()=>open('mailto:'+CFG.emails.gestionhumana)},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    contacto_otras: {
      msg:'Para otras consultas puedes contactarnos por:<br>📞 (1) 704 2362<br>✉️ comercial@eiatec.com<br><br>¿Cómo prefieres continuar?',
      opts:[
        {label:'💬 WhatsApp General', action:()=>open(CFG.whatsapp.general,'_blank')},
        {label:'✉️ Enviar correo', action:()=>open('mailto:'+CFG.emails.comercial)},
        {label:'🏠 Volver al inicio', next:'inicio'},
      ]
    },
    web: {
      msg:'¿A qué sección de nuestra web quieres ir?',
      opts:[
        {label:'⚙️ Servicios', action:()=>open(CFG.pages.servicios,'_top')},
        {label:'📁 Proyectos', action:()=>open(CFG.pages.proyectos,'_top')},
        {label:'🏢 Nosotros',  action:()=>open(CFG.pages.nosotros,'_top')},
        {label:'✉️ Contacto',  action:()=>open(CFG.pages.contacto,'_top')},
        {label:'📰 Blog',      action:()=>open(CFG.pages.blog,'_top')},
        {label:'🏠 Volver',    next:'inicio'},
      ]
    },
  };

  const chat   = document.getElementById('eiabot-chat');
  const minBtn = document.getElementById('eiabot-min');
  const msgs   = document.getElementById('eiabot-msgs');
  const inp    = document.getElementById('eiabot-inp');
  let started  = false;

  function scroll(){ setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,80); }

  function addBot(text){
    const el = document.createElement('div');
    el.className = 'eiabot-bm';
    const html = text.replace(/\n/g,'<br>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    el.innerHTML = `<div class="eiabot-bm-av"><img src="${MASCOT_URL}" alt="EIATEC"></div><div class="eiabot-bm-bub">${html}</div>`;
    msgs.appendChild(el); scroll();
  }

  function addUser(text){
    const el = document.createElement('div');
    el.className = 'eiabot-um';
    el.innerHTML = `<div class="eiabot-um-bub">${text}</div>`;
    msgs.appendChild(el); scroll();
  }

  function addOpts(opts){
    const el = document.createElement('div');
    el.className = 'eiabot-opts';
    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'eiabot-opt';
      b.textContent = o.label;
      b.onclick = () => {
        el.querySelectorAll('.eiabot-opt').forEach(x => { x.disabled = true; x.style.opacity = '.45'; });
        addUser(o.label);
        if(o.action) setTimeout(o.action, 200);
        else if(o.next) showTyping(() => goFlow(o.next));
      };
      el.appendChild(b);
    });
    msgs.appendChild(el); scroll();
  }

  function showTyping(cb){
    const el = document.createElement('div');
    el.className = 'eiabot-typing';
    el.innerHTML = `<div class="eiabot-bm-av"><img src="${MASCOT_URL}" alt="EIATEC"></div><div class="eiabot-typing-bub"><div class="eiabot-td"></div><div class="eiabot-td"></div><div class="eiabot-td"></div></div>`;
    msgs.appendChild(el); scroll();
    setTimeout(() => { el.remove(); cb(); }, 900);
  }

  function goFlow(key){
    const f = FLOWS[key];
    if(!f) return;
    addBot(f.msg);
    setTimeout(() => addOpts(f.opts), 200);
  }

  function handleInput(){
    const v = inp.value.trim();
    if(!v) return;
    inp.value = '';
    addUser(v);
    const lv = v.toLowerCase();
    if(/servicio|eia|impacto|ambiental/.test(lv)) showTyping(()=>goFlow('servicios'));
    else if(/proyecto|trabajo|referencia/.test(lv)) showTyping(()=>goFlow('proyectos'));
    else if(/horario|hora|atencion|abre/.test(lv)) showTyping(()=>goFlow('horarios'));
    else if(/whatsapp|asesor|hablar|contacto|correo|email/.test(lv)) showTyping(()=>goFlow('asesor'));
    else if(/web|pagina|sitio/.test(lv)) showTyping(()=>goFlow('web'));
    else {
      showTyping(()=>{
        addBot('Entiendo tu consulta. Te recomiendo hablar directamente con uno de nuestros asesores. ¿Cómo prefieres contactarnos?');
        setTimeout(()=>addOpts([
          {label:'💬 WhatsApp', action:()=>open(CFG.whatsapp.general,'_blank')},
          {label:'✉️ Correo',   action:()=>open('mailto:'+CFG.emails.comercial)},
          {label:'🏠 Menú principal', next:'inicio'},
        ]), 200);
      });
    }
  }

  function minimize(){
    chat.classList.add('minimized');
    minBtn.style.display = 'flex';
  }

  function expand(){
    chat.classList.remove('minimized');
    minBtn.style.display = 'none';
    if(!started){
      started = true;
      setTimeout(() => goFlow('inicio'), 400);
    }
    inp.focus();
  }

  // Iniciar abierto
  if(!started){
    started = true;
    setTimeout(() => goFlow('inicio'), 500);
  }

  // Eventos
  inp.addEventListener('keydown', e => { if(e.key === 'Enter') handleInput(); });

  // API global
  window.eiabot = {
    minimize,
    expand,
    handleInput
  };
})();