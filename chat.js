(function(){
  /* =============================================
     Kai · Asistente Virtual de EIATEC (v5 · Motor robusto)
     ============================================= */
  const KAI_AVATAR = "https://static.wixstatic.com/media/2801d6_c8449c3cafcf4a06941af5aa73607488~mv2.png";

  // ── Configuración de servicios externos ──
  const FORMSPREE = {
    comercial:       'https://formspree.io/f/form2',
    gestionhumana:   'https://formspree.io/f/form2',
    hseq:            'https://formspree.io/f/form2',
    gerenciatecnica: 'https://formspree.io/f/form2',
    general:         'https://formspree.io/f/form2',
  };

  const CFG = {
    whatsapp: {
      comercial:       '573000000001',
      gestionhumana:   '573000000002',
      hseq:            '573000000003',
      gerenciatecnica: '573000000004',
      general:         '573001234567',
    },
    pages: {
      servicios: 'https://www.eiatec.com/servicios',
      proyectos: 'https://www.eiatec.com/proyectos',
      nosotros:  'https://www.eiatec.com/nosotros',
      contacto:  'https://www.eiatec.com/contacto',
      blog:      'https://www.eiatec.com/blog',
    },
    emails: {
      comercial:       'comercial@eiatec.com',
      gestionhumana:   'gestionhumana@eiatec.com',
      hseq:            'hseq@eiatec.com',
      gerenciatecnica: 'gerenciatecnica@eiatec.com',
    }
  };

  // ── Flujos de conversación ──
  const FLOWS = {
    inicio: {
      msg: '¡Hola! 👋 Soy <strong>Kai</strong>, tu asistente virtual de EIATEC.<br>¿En qué puedo ayudarte hoy?',
      opts: [
        {label:'📋 Servicios', next:'servicios'},
        {label:'🗂️ Proyectos', next:'proyectos'},
        {label:'🕐 Horarios',  next:'horarios'},
        {label:'📩 Contactar', next:'asesor'},
        {label:'🌐 Web',      next:'web'},
      ]
    },
    servicios: {
      msg:'Ofrecemos servicios en:<br>• Estudios de Impacto Ambiental (EIA)<br>• Consulta Previa<br>• Gestión Hídrica<br>• Flora, Fauna y Biodiversidad<br>• Energía Renovable<br>• Arqueología<br>• Sostenibilidad Empresarial<br>• Logística Ambiental<br>¿Deseas más detalle?',
      opts:[
        {label:'🔗 Ver servicios', action:()=>window.open(CFG.pages.servicios,'_top')},
        {label:'📩 Consultar', next:'asesor'},
        {label:'🏠 Inicio', next:'inicio'},
      ]
    },
    proyectos: {
      msg:'Hemos realizado más de 30 proyectos en Colombia.',
      opts:[
        {label:'🔗 Ver proyectos', action:()=>window.open(CFG.pages.proyectos,'_top')},
        {label:'🏠 Inicio', next:'inicio'},
      ]
    },
    horarios: {
      msg:'🕐 <strong>Horarios de atención:</strong><br><br>📅 Lunes a Viernes<br>⏰ 8:00 am – 6:00 pm<br><br>📞 Teléfonos: (1) 704 2362 / (1) 245 0961<br>📍 Bogotá D.C.',
      opts:[
        {label:'📩 Contactar', next:'asesor'},
        {label:'🏠 Inicio', next:'inicio'},
      ]
    },
    asesor: {
      msg:'¿Con qué área deseas comunicarte?',
      opts:[
        {label:'💼 Comercial', next:'form_comercial'},
        {label:'🛡️ HSEQ',      next:'form_hseq'},
        {label:'🔧 Técnica',   next:'form_tecnica'},
        {label:'👥 RR.HH.',    next:'form_rrhh'},
        {label:'📦 Otra',      next:'form_otra'},
      ]
    },
    form_comercial:  { type:'form', area:'comercial' },
    form_hseq:       { type:'form', area:'hseq' },
    form_tecnica:    { type:'form', area:'gerenciatecnica' },
    form_rrhh:       { type:'form', area:'gestionhumana' },
    form_otra:       { type:'form', area:'general' },
    web: {
      msg:'¿A qué sección deseas ir?',
      opts:[
        {label:'⚙️ Servicios', action:()=>window.open(CFG.pages.servicios,'_top')},
        {label:'📁 Proyectos', action:()=>window.open(CFG.pages.proyectos,'_top')},
        {label:'🏢 Nosotros',  action:()=>window.open(CFG.pages.nosotros,'_top')},
        {label:'✉️ Contacto',  action:()=>window.open(CFG.pages.contacto,'_top')},
        {label:'📰 Blog',      action:()=>window.open(CFG.pages.blog,'_top')},
        {label:'🏠 Inicio',    next:'inicio'},
      ]
    },
    empleo: {
      msg: 'Si deseas trabajar con nosotros, visita nuestra sección de <strong>Talento Humano</strong> en la página web o envía tu hoja de vida a:<br><br>✉️ gestionhumana@eiatec.com<br><br>¿Te gustaría contactar directamente con esa área?',
      opts:[
        {label:'📩 Contactar RR.HH.', next:'form_rrhh'},
        {label:'🌐 Ir a la web', action:()=>window.open(CFG.pages.nosotros,'_top')},
        {label:'🏠 Inicio', next:'inicio'},
      ]
    },
    sobre_nosotros: {
      msg:'EIATEC es una empresa líder en consultoría ambiental, con más de 22 años de experiencia y presencia en toda Colombia. Especialistas en licenciamiento, biodiversidad, sostenibilidad y mucho más.',
      opts:[
        {label:'🌐 Ir a Nosotros', action:()=>window.open(CFG.pages.nosotros,'_top')},
        {label:'🏠 Inicio', next:'inicio'},
      ]
    },
    default: {
      msg: 'No estoy seguro de haber entendido bien. ¿Puedes elegir una de estas opciones?',
      opts:[
        {label:'📋 Servicios', next:'servicios'},
        {label:'🗂️ Proyectos', next:'proyectos'},
        {label:'📩 Contactar', next:'asesor'},
        {label:'🏠 Menú principal', next:'inicio'},
      ]
    }
  };

  // ── Motor de intenciones (reglas ordenadas) ──
  const INTENTS = [
    // [prioridad implícita: se evalúan en este orden]
    { pattern: /\b(servicio|eia|impacto|ambiental|consultoría)\b/i,   flow: 'servicios' },
    { pattern: /\b(proyecto|portafolio|experiencia|cliente)\b/i,       flow: 'proyectos' },
    { pattern: /\b(horario|hora|atencion|abierto|cuándo)\b/i,          flow: 'horarios' },
    { pattern: /\b(contacto|asesor|hablar|ayuda|comunicar|correo|whatsapp)\b/i, flow: 'asesor' },
    { pattern: /\b(web|página|sitio|internet|online)\b/i,              flow: 'web' },
    { pattern: /\b(empleo|trabajo|vacante|hoja de vida|cargo)\b/i,    flow: 'empleo' },
    { pattern: /\b(nosotros|empresa|historia|quién|misión|visión)\b/i, flow: 'sobre_nosotros' },
    { pattern: /\b(hola|buenos días|buenas tardes|saludos|hey|hello)\b/i, flow: 'inicio' },
  ];

  // ── Función principal al cargar el DOM ──
  function onReady(){
    const chat   = document.getElementById('eiabot-chat');
    const minBtn = document.getElementById('eiabot-min');
    const notif  = document.getElementById('eiabot-notif');
    const msgs   = document.getElementById('eiabot-msgs');
    const inp    = document.getElementById('eiabot-inp');
    if (!chat || !minBtn) return;

    let started = false;
    // Estado inicial: minimizado
    chat.classList.add('minimized');
    minBtn.style.display = 'flex';
    if (notif) notif.style.display = 'none';

    // Notificación después de 4 segundos
    setTimeout(() => {
      if (!started && notif) notif.style.display = 'block';
    }, 4000);

    // ── Helper para scroll ──
    function scroll(){ setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,80); }

    // ── Añadir mensaje del bot ──
    function addBot(text){
      const el = document.createElement('div');
      el.className = 'eiabot-bm';
      const html = text.replace(/\n/g,'<br>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
      el.innerHTML = `<div class="eiabot-bm-av"><img src="${KAI_AVATAR}" alt="Kai"></div><div class="eiabot-bm-bub">${html}</div>`;
      msgs.appendChild(el); scroll();
    }

    // ── Añadir mensaje del usuario ──
    function addUser(text){
      const el = document.createElement('div');
      el.className = 'eiabot-um';
      el.innerHTML = `<div class="eiabot-um-bub">${text}</div>`;
      msgs.appendChild(el); scroll();
    }

    // ── Mostrar opciones clicables ──
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
          if(o.action) {
            setTimeout(o.action, 200);
            askAgain();
          } else if(o.next) {
            showTyping(() => goFlow(o.next));
          }
        };
        el.appendChild(b);
      });
      msgs.appendChild(el); scroll();
    }

    // ── Indicador de "escribiendo..." ──
    function showTyping(cb){
      const el = document.createElement('div');
      el.className = 'eiabot-typing';
      el.innerHTML = `<div class="eiabot-bm-av"><img src="${KAI_AVATAR}" alt="Kai"></div><div class="eiabot-typing-bub"><div class="eiabot-td"></div><div class="eiabot-td"></div><div class="eiabot-td"></div></div>`;
      msgs.appendChild(el); scroll();
      setTimeout(() => { el.remove(); cb(); }, 900);
    }

    // ── Navegar a un flujo ──
    function goFlow(key){
      const f = FLOWS[key] || FLOWS.default;
      if(f.type === 'form'){
        showForm(f.area);
      } else {
        addBot(f.msg);
        setTimeout(() => addOpts(f.opts), 200);
      }
    }

    // ── Formulario de contacto ──
    function showForm(area){
      const formEl = document.createElement('div');
      formEl.className = 'eiabot-form';
      const defaultSubject = getDefaultSubject(area);
      formEl.innerHTML = `
        <label for="eiabot-fname">Tu nombre *</label>
        <div class="input-icon"><i class="fas fa-user"></i><input type="text" id="eiabot-fname" placeholder="Ej. María Pérez" required></div>
        <label for="eiabot-femail">Correo electrónico</label>
        <div class="input-icon"><i class="fas fa-envelope"></i><input type="email" id="eiabot-femail" placeholder="maria@correo.com"></div>
        <label for="eiabot-fsubject">Asunto</label>
        <div class="input-icon"><i class="fas fa-tag"></i><input type="text" id="eiabot-fsubject" value="${defaultSubject}"></div>
        <label for="eiabot-fmsg">Mensaje (opcional)</label>
        <div class="input-icon"><i class="fas fa-comment"></i><textarea id="eiabot-fmsg" placeholder="Cuéntanos tu consulta..."></textarea></div>
        <div class="btn-row">
          <button class="btn-email" id="eiabot-fsend"><i class="fas fa-paper-plane"></i> Enviar mensaje</button>
          <button class="btn-wa" id="eiabot-fwa"><i class="fab fa-whatsapp"></i> WhatsApp</button>
        </div>`;
      msgs.appendChild(formEl); scroll();

      document.getElementById('eiabot-fsend').onclick = async () => {
        const name = document.getElementById('eiabot-fname').value.trim();
        if(!name){ alert('Por favor ingresa tu nombre.'); return; }
        const email = document.getElementById('eiabot-femail').value.trim();
        const subject = document.getElementById('eiabot-fsubject').value.trim();
        const msg = document.getElementById('eiabot-fmsg').value.trim();
        const btn = document.getElementById('eiabot-fsend');
        btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        try {
          const endpoint = FORMSPREE[area] || FORMSPREE.general;
          const response = await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nombre:name,email,asunto:subject,mensaje:msg,area,_subject:`Nueva consulta Kai: ${subject}`})});
          if(response.ok){ formEl.remove(); addBot('✅ ¡Mensaje enviado con éxito! Te responderemos pronto.'); }
          else throw new Error('Error en el envío');
        } catch(error){
          addBot('❌ Hubo un problema al enviar. Por favor intenta de nuevo o usa WhatsApp.');
          btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
        }
        askAgain();
      };

      document.getElementById('eiabot-fwa').onclick = () => {
        const name = document.getElementById('eiabot-fname').value.trim();
        if(!name){ alert('Por favor ingresa tu nombre.'); return; }
        const email = document.getElementById('eiabot-femail').value.trim();
        const subject = document.getElementById('eiabot-fsubject').value.trim();
        const msg = document.getElementById('eiabot-fmsg').value.trim();
        const phone = CFG.whatsapp[area] || CFG.whatsapp.general;
        const body = `Hola Kai, soy ${name}.${email ? ' Email: '+email+'.' : ''} Asunto: ${subject}.${msg ? ' Mensaje: '+msg : ''}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(body)}`, '_blank');
        formEl.remove(); addBot('📱 He abierto WhatsApp con tu consulta.');
        askAgain();
      };
    }

    function getDefaultSubject(area){
      const subjects = { comercial:'Consulta Comercial', gestionhumana:'Consulta Gestión Humana', hseq:'Consulta HSEQ', gerenciatecnica:'Consulta Técnica', general:'Consulta General' };
      return subjects[area] || 'Consulta';
    }

    // ── Preguntar si necesita algo más ──
    function askAgain(){
      setTimeout(()=>{ addBot('¿Necesitas ayuda con algo más?'); setTimeout(()=>addOpts([{label:'✅ Sí, tengo otra consulta',next:'inicio'},{label:'👋 No, gracias',action:()=>{addBot('¡Fue un placer ayudarte! 😊');setTimeout(()=>minimize(),3000)}}]),300); },800);
    }

    // ── Procesar entrada de texto ──
    function handleInput(){
      const v=inp.value.trim(); if(!v)return;
      inp.value=''; addUser(v);
      const lv=v.toLowerCase();

      // Buscar la primera intención que coincida
      const matched = INTENTS.find(item => item.pattern.test(lv));
      if (matched) {
        showTyping(() => goFlow(matched.flow));
      } else {
        showTyping(() => goFlow('default'));
      }
    }

    // ── Minimizar / Expandir ──
    function minimize(){
      chat.classList.add('minimized');
      minBtn.style.display = 'flex';
      if(notif) notif.style.display = 'none';
    }
    function expand(){
      chat.classList.remove('minimized');
      minBtn.style.display = 'none';
      if(notif) notif.style.display = 'none';
      if(!started){
        started = true;
        setTimeout(() => goFlow('inicio'), 400);
      }
      inp.focus();
    }

    // ── Exponer API y eventos ──
    window.eiabot = { minimize, expand, handleInput };
    minBtn.addEventListener('click', expand);
    inp.addEventListener('keydown', e => { if(e.key === 'Enter') handleInput(); });
  }

  // ── Arranque seguro ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();