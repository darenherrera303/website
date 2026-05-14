(function(){
  /* =============================================
     EIATEC · Asistente virtual (lógica completa)
     ============================================= */
  const LOGO_MASCOT = "https://static.wixstatic.com/media/2801d6_0750b926a5df4311bd99312528aa9e0b~mv2.png";
  const LOGO_CHAT   = "https://static.wixstatic.com/media/2801d6_0750b926a5df4311bd99312528aa9e0b~mv2.png";

  const CFG = {
    whatsapp: {
      comercial:       'https://wa.me/573000000001',
      gestionhumana:   'https://wa.me/573000000002',
      hseq:            'https://wa.me/573000000003',
      gerenciatecnica: 'https://wa.me/573000000004',
      general:         'https://wa.me/573001234567'
    },
    pages: {
      servicios: 'https://www.eiatec.com.co/servicios',
      proyectos: 'https://www.eiatec.com.co/proyectos',
      nosotros:  'https://www.eiatec.com.co/nosotros',
      contacto:  'https://www.eiatec.com.co/contacto',
      blog:      'https://www.eiatec.com.co/blog'
    },
    emails: {
      comercial:       'comercial@eiatec.com',
      gestionhumana:   'gestionhumana@eiatec.com',
      hseq:            'hseq@eiatec.com',
      gerenciatecnica: 'gerenciatecnica@eiatec.com'
    }
  };

  const FLOWS = {
    inicio: {
      msg: '¡Hola! 👋 Soy el asistente virtual de <b>EIATEC</b>.<br>¿En qué puedo ayudarte hoy?',
      opts: [
        {label:'📋 Servicios', next:'servicios'},
        {label:'🗂️ Proyectos', next:'proyectos'},
        {label:'🕐 Horarios',  next:'horarios'},
        {label:'📩 Asesor',    next:'asesor'},
        {label:'🌐 Web',       next:'web'}
      ]
    },
    servicios: {
      msg: 'Ofrecemos servicios en:<br>• Estudios de Impacto Ambiental<br>• Consulta Previa<br>• Gestión Hídrica<br>• Flora, Fauna y Biodiversidad<br>• Energía Renovable<br>• Arqueología<br>• Sostenibilidad Empresarial<br>• Logística Ambiental',
      opts: [
        {label:'🔗 Ver todos los servicios', action:()=>open(CFG.pages.servicios,'_top')},
        {label:'📩 Consultar sobre un servicio', next:'asesor'},
        {label:'🏠 Inicio', next:'inicio'}
      ]
    },
    proyectos: {
      msg: 'Hemos realizado más de 30 proyectos en toda Colombia: EIAs, consultas previas, monitoreo de fauna, compensaciones forestales, energía solar y más.',
      opts: [
        {label:'🔗 Ver proyectos', action:()=>open(CFG.pages.proyectos,'_top')},
        {label:'🏠 Inicio', next:'inicio'}
      ]
    },
    horarios: {
      msg: '🕐 <b>Horarios de atención:</b><br><br>📅 Lunes a Viernes<br>⏰ 8:00 am – 6:00 pm<br><br>📞 Teléfonos: (1) 704 2362 / (1) 245 0961<br>📍 Bogotá D.C. · Calle 45 C Bis #23-37<br><br>Fuera de horario puedes escribirnos por WhatsApp o correo.',
      opts: [
        {label:'💬 WhatsApp', action:()=>open(CFG.whatsapp.general,'_blank')},
        {label:'✉️ Enviar correo', action:()=>open('mailto:'+CFG.emails.comercial)},
        {label:'🏠 Inicio', next:'inicio'}
      ]
    },
    asesor: {
      msg: 'Perfecto. ¿Sobre qué área es tu consulta?',
      opts: [
        {label:'💼 Comercial / Proyectos', next:'cc'},
        {label:'🛡️ HSEQ',                  next:'ch'},
        {label:'🔧 Gerencia Técnica',       next:'ct'},
        {label:'👥 Gestión Humana',         next:'cr'}
      ]
    },
    cc: {
      msg: 'Te comunico con el área <b>Comercial</b>. ¿Cómo prefieres contactarnos?',
      opts: [
        {label:'💬 WhatsApp Comercial', action:()=>open(CFG.whatsapp.comercial,'_blank')},
        {label:'✉️ Email: '+CFG.emails.comercial, action:()=>open('mailto:'+CFG.emails.comercial)},
        {label:'🏠 Inicio', next:'inicio'}
      ]
    },
    ch: {
      msg: 'Te comunico con el área <b>HSEQ</b>. ¿Cómo prefieres contactarnos?',
      opts: [
        {label:'💬 WhatsApp HSEQ', action:()=>open(CFG.whatsapp.hseq,'_blank')},
        {label:'✉️ Email: '+CFG.emails.hseq, action:()=>open('mailto:'+CFG.emails.hseq)},
        {label:'🏠 Inicio', next:'inicio'}
      ]
    },
    ct: {
      msg: 'Te comunico con <b>Gerencia Técnica</b>. ¿Cómo prefieres contactarnos?',
      opts: [
        {label:'💬 WhatsApp Técnico', action:()=>open(CFG.whatsapp.gerenciatecnica,'_blank')},
        {label:'✉️ Email: '+CFG.emails.gerenciatecnica, action:()=>open('mailto:'+CFG.emails.gerenciatecnica)},
        {label:'🏠 Inicio', next:'inicio'}
      ]
    },
    cr: {
      msg: 'Te comunico con <b>Gestión Humana</b>. ¿Cómo prefieres contactarnos?',
      opts: [
        {label:'💬 WhatsApp RR.HH.', action:()=>open(CFG.whatsapp.gestionhumana,'_blank')},
        {label:'✉️ Email: '+CFG.emails.gestionhumana, action:()=>open('mailto:'+CFG.emails.gestionhumana)},
        {label:'🏠 Inicio', next:'inicio'}
      ]
    },
    web: {
      msg: '¿A qué sección de nuestra web quieres ir?',
      opts: [
        {label:'⚙️ Servicios', action:()=>open(CFG.pages.servicios,'_top')},
        {label:'📁 Proyectos', action:()=>open(CFG.pages.proyectos,'_top')},
        {label:'🏢 Nosotros',  action:()=>open(CFG.pages.nosotros,'_top')},
        {label:'✉️ Contacto',  action:()=>open(CFG.pages.contacto,'_top')},
        {label:'📰 Blog',      action:()=>open(CFG.pages.blog,'_top')},
        {label:'🏠 Inicio',    next:'inicio'}
      ]
    }
  };

  /* ── Elementos del DOM ── */
  const msgs = document.getElementById('eiabot-msgs');
  const inp  = document.getElementById('eiabot-inp');
  let isOpen = false,
      started = false,
      periodicTimer = null;

  /* ── Funciones auxiliares ── */
  function scroll(){ setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,80); }

  function addBot(text){
    const el = document.createElement('div');
    el.className = 'eiabot-bm';
    el.innerHTML = `<div class="eiabot-bm-bub">${text}</div>`;
    msgs.appendChild(el);
    scroll();
  }

  function addUser(text){
    const el = document.createElement('div');
    el.className = 'eiabot-um';
    el.innerHTML = `<div class="eiabot-um-bub">${text}</div>`;
    msgs.appendChild(el);
    scroll();
  }

  function addOpts(opts){
    const el = document.createElement('div');
    el.className = 'eiabot-opts';
    opts.forEach(o => {
      const btn = document.createElement('button');
      btn.className = 'eiabot-opt';
      btn.textContent = o.label;
      btn.onclick = () => {
        // Deshabilitar todas las opciones de este grupo
        el.querySelectorAll('.eiabot-opt').forEach(b => { b.disabled = true; b.style.opacity = '.45'; });
        addUser(o.label);
        if (o.action) {
          setTimeout(o.action, 200);
        } else if (o.next) {
          typing(() => goFlow(o.next));
        }
      };
      el.appendChild(btn);
    });
    msgs.appendChild(el);
    scroll();
  }

  function typing(cb){
    const el = document.createElement('div');
    el.className = 'eiabot-typing';
    el.innerHTML = '<div class="eiabot-typing-bub"><div class="eiabot-td"></div><div class="eiabot-td"></div><div class="eiabot-td"></div></div>';
    msgs.appendChild(el);
    scroll();
    setTimeout(() => { el.remove(); cb(); }, 900);
  }

  function goFlow(key){
    const flow = FLOWS[key];
    if (!flow) return;
    addBot(flow.msg);
    setTimeout(() => addOpts(flow.opts), 200);
  }

  /* ── Toggle chat ── */
  function toggleChat(){
    isOpen = !isOpen;
    document.getElementById('eiabot-chat').classList.toggle('open', isOpen);
    document.getElementById('eiabot-notif').style.display = 'none';
    if (isOpen && !started) {
      started = true;
      setTimeout(() => goFlow('inicio'), 400);
      clearPeriodic();
    }
    if (isOpen) setTimeout(() => inp.focus(), 350);
  }

  /* ── Procesar entrada del usuario ── */
  function handleInput(){
    const text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    addUser(text);
    const low = text.toLowerCase();
    if (/servicio|ambiental|eia/.test(low)) typing(() => goFlow('servicios'));
    else if (/proyecto/.test(low)) typing(() => goFlow('proyectos'));
    else if (/horario|hora/.test(low)) typing(() => goFlow('horarios'));
    else if (/asesor|contacto|correo|whatsapp/.test(low)) typing(() => goFlow('asesor'));
    else if (/web|pagina/.test(low)) typing(() => goFlow('web'));
    else {
      typing(() => {
        addBot('Te recomiendo comunicarte con uno de nuestros asesores. ¿Cómo prefieres hacerlo?');
        setTimeout(() => addOpts([
          {label:'💬 WhatsApp', action:()=>open(CFG.whatsapp.general,'_blank')},
          {label:'🏠 Menú principal', next:'inicio'}
        ]), 200);
      });
    }
  }

  /* ── Mensajes automáticos periódicos ── */
  function startPeriodic(){
    clearPeriodic();
    periodicTimer = setTimeout(() => {
      if (!isOpen) {
        addBot('¡Hola! 👋 ¿Puedo ayudarte en algo?');
        document.getElementById('eiabot-notif').style.display = 'block';
        startPeriodic();
      }
    }, 45000); // cada 45 segundos
  }

  function clearPeriodic(){
    if (periodicTimer) clearTimeout(periodicTimer);
  }

  // Primer mensaje después de 5 segundos si no se ha abierto
  setTimeout(() => {
    if (!isOpen && !started) {
      addBot('¡Hola! 👋 ¿Puedo ayudarte en algo?');
      document.getElementById('eiabot-notif').style.display = 'block';
      startPeriodic();
    }
  }, 5000);

  /* ── Eventos ── */
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(); });

  // Exponer funciones públicas
  window.eiabot = {
    toggle: toggleChat,
    handleInput: handleInput
  };

})();