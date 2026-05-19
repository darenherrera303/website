(function(){
  /* =============================================
     Kay · Asistente Virtual de EIATEC
     ============================================= */
  const KAi_AVATAR = "https://static.wixstatic.com/media/2801d6_c8449c3cafcf4a06941af5aa73607488~mv2.png";

  // Endpoints de Formspree por área (reemplaza con tus IDs reales)
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

  const FLOWS = {
    inicio: {
      msg: '¡Hola! 👋 Soy <strong>Kai</strong>, tu asistente virtual de eiatec.<br>¿En qué puedo ayudarte hoy?',
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
        {label:'🔗 Ver servicios', action:()=>open(CFG.pages.servicios,'_top')},
        {label:'📩 Consultar', next:'asesor'},
        {label:'🏠 Inicio', next:'inicio'},
      ]
    },
    proyectos: {
      msg:'Hemos realizado más de 30 proyectos en Colombia.',
      opts:[
        {label:'🔗 Ver proyectos', action:()=>open(CFG.pages.proyectos,'_top')},
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
        {label:'⚙️ Servicios', action:()=>open(CFG.pages.servicios,'_top')},
        {label:'📁 Proyectos', action:()=>open(CFG.pages.proyectos,'_top')},
        {label:'🏢 Nosotros',  action:()=>open(CFG.pages.nosotros,'_top')},
        {label:'✉️ Contacto',  action:()=>open(CFG.pages.contacto,'_top')},
        {label:'📰 Blog',      action:()=>open(CFG.pages.blog,'_top')},
        {label:'🏠 Inicio',    next:'inicio'},
      ]
    },
  };

  const chat   = document.getElementById('eiabot-chat');
  const minBtn = document.getElementById('eiabot-min');
  const msgs   = document.getElementById('eiabot-msgs');
  const inp    = document.getElementById('eiabot-inp');
  let started  = false;
  let currentFlow = 'inicio';

  function scroll(){ setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,80); }

  function addBot(text){
    const el = document.createElement('div');
    el.className = 'eiabot-bm';
    const html = text.replace(/\n/g,'<br>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    el.innerHTML = `<div class="eiabot-bm-av"><img src="${KAY_AVATAR}" alt="Kay"></div><div class="eiabot-bm-bub">${html}</div>`;
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

  function showTyping(cb){
    const el = document.createElement('div');
    el.className = 'eiabot-typing';
    el.innerHTML = `<div class="eiabot-bm-av"><img src="${KAY_AVATAR}" alt="Kay"></div><div class="eiabot-typing-bub"><div class="eiabot-td"></div><div class="eiabot-td"></div><div class="eiabot-td"></div></div>`;
    msgs.appendChild(el); scroll();
    setTimeout(() => { el.remove(); cb(); }, 900);
  }

  function goFlow(key){
    const f = FLOWS[key];
    if(!f) return;
    if(f.type === 'form'){
      showForm(f.area);
    } else {
      addBot(f.msg);
      setTimeout(() => addOpts(f.opts), 200);
    }
    currentFlow = key;
  }

  /* ── FORMULARIO MEJORADO CON ENVÍO DIRECTO ── */
  function showForm(area){
    const formEl = document.createElement('div');
    formEl.className = 'eiabot-form';
    const defaultSubject = getDefaultSubject(area);
    formEl.innerHTML = `
      <label for="eiabot-fname">Tu nombre *</label>
      <div class="input-icon">
        <i class="fas fa-user"></i>
        <input type="text" id="eiabot-fname" placeholder="Ej. María Pérez" required>
      </div>
      <label for="eiabot-femail">Correo electrónico</label>
      <div class="input-icon">
        <i class="fas fa-envelope"></i>
        <input type="email" id="eiabot-femail" placeholder="maria@correo.com">
      </div>
      <label for="eiabot-fsubject">Asunto</label>
      <div class="input-icon">
        <i class="fas fa-tag"></i>
        <input type="text" id="eiabot-fsubject" value="${defaultSubject}">
      </div>
      <label for="eiabot-fmsg">Mensaje (opcional)</label>
      <div class="input-icon">
        <i class="fas fa-comment"></i>
        <textarea id="eiabot-fmsg" placeholder="Cuéntanos tu consulta..."></textarea>
      </div>
      <div class="btn-row">
        <button class="btn-email" id="eiabot-fsend"><i class="fas fa-paper-plane"></i> Enviar mensaje</button>
        <button class="btn-wa" id="eiabot-fwa"><i class="fab fa-whatsapp"></i> WhatsApp</button>
      </div>
    `;
    msgs.appendChild(formEl);
    scroll();

    // Enviar por correo (Formspree)
    document.getElementById('eiabot-fsend').onclick = async () => {
      const name    = document.getElementById('eiabot-fname').value.trim();
      const email   = document.getElementById('eiabot-femail').value.trim();
      const subject = document.getElementById('eiabot-fsubject').value.trim();
      const msg     = document.getElementById('eiabot-fmsg').value.trim();

      if(!name){
        alert('Por favor ingresa tu nombre.');
        return;
      }

      const btn = document.getElementById('eiabot-fsend');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      try {
        const endpoint = FORMSPREE[area] || FORMSPREE.general;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: name,
            email: email,
            asunto: subject,
            mensaje: msg,
            area: area,
            _subject: `Nueva consulta Kay: ${subject}`
          })
        });

        if(response.ok){
          formEl.remove();
          addBot('✅ ¡Mensaje enviado con éxito! Te responderemos pronto.');
        } else {
          throw new Error('Error en el envío');
        }
      } catch(error){
        addBot('❌ Hubo un problema al enviar. Por favor intenta de nuevo o usa WhatsApp.');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
      }

      askAgain();
    };

    // Enviar por WhatsApp (alternativa)
    document.getElementById('eiabot-fwa').onclick = () => {
      const name    = document.getElementById('eiabot-fname').value.trim();
      const email   = document.getElementById('eiabot-femail').value.trim();
      const subject = document.getElementById('eiabot-fsubject').value.trim();
      const msg     = document.getElementById('eiabot-fmsg').value.trim();

      if(!name){
        alert('Por favor ingresa tu nombre.');
        return;
      }
      const phone = CFG.whatsapp[area] || CFG.whatsapp.general;
      const body = `Hola Kay, soy ${name}.${email ? ' Email: '+email+'.' : ''} Asunto: ${subject}.${msg ? ' Mensaje: '+msg : ''}`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(body)}`;
      open(url, '_blank');
      formEl.remove();
      addBot('📱 He abierto WhatsApp con tu consulta. Si no se abrió, puedes intentar de nuevo.');
      askAgain();
    };
  }

  function getDefaultSubject(area){
    const subjects = {
      comercial: 'Consulta Comercial',
      gestionhumana: 'Consulta Gestión Humana',
      hseq: 'Consulta HSEQ',
      gerenciatecnica: 'Consulta Técnica',
      general: 'Consulta General'
    };
    return subjects[area] || 'Consulta';
  }

  /* ── PREGUNTA FINAL ── */
  function askAgain(){
    setTimeout(() => {
      addBot('¿Necesitas ayuda con algo más?');
      setTimeout(() => {
        addOpts([
          {label:'✅ Sí, tengo otra consulta', next:'inicio'},
          {label:'👋 No, gracias', action:() => {
            addBot('¡Fue un placer ayudarte! Recuerda que puedes escribirme cuando quieras. 😊');
            setTimeout(() => minimize(), 3000);
          }}
        ]);
      }, 300);
    }, 800);
  }

  /* ── ENTRADA DE TEXTO ── */
  function handleInput(){
    const v = inp.value.trim();
    if(!v) return;
    inp.value = '';
    addUser(v);
    const lv = v.toLowerCase();
    if(/servicio|eia|impacto|ambiental/.test(lv)) showTyping(()=>goFlow('servicios'));
    else if(/proyecto|trabajo|referencia/.test(lv)) showTyping(()=>goFlow('proyectos'));
    else if(/horario|hora/.test(lv)) showTyping(()=>goFlow('horarios'));
    else if(/contacto|asesor|hablar/.test(lv)) showTyping(()=>goFlow('asesor'));
    else if(/web|pagina|sitio/.test(lv)) showTyping(()=>goFlow('web'));
    else {
      showTyping(()=>{
        addBot('No entendí tu solicitud. ¿Te gustaría que te comunique con un asesor?');
        setTimeout(()=>addOpts([
          {label:'📩 Contactar asesor', next:'asesor'},
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

  if(!started){
    started = true;
    setTimeout(() => goFlow('inicio'), 500);
  }

  inp.addEventListener('keydown', e => { if(e.key === 'Enter') handleInput(); });

  window.eiabot = {
    minimize,
    expand,
    handleInput
  };
})();
