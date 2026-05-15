/* ═══════════════════════════════════════
   EIATEC · KAI · Lógica del Asistente
   ═══════════════════════════════════════ */

(function () {
  /* ─────────── CONFIGURACIÓN ─────────── */
  const CFG = {
    // 📲 Cambia estos números por los reales de WhatsApp
    whatsapp: {
      comercial:       'https://wa.me/573000000001?text=Hola+EIATEC%2C+consulta+comercial',
      gestionhumana:   'https://wa.me/573000000002?text=Hola%2C+consulta+de+Gesti%C3%B3n+Humana',
      hseq:            'https://wa.me/573000000003?text=Hola%2C+consulta+HSEQ',
      gerenciatecnica: 'https://wa.me/573000000004?text=Hola%2C+consulta+t%C3%A9cnica',
      general:         'https://wa.me/573001234567?text=Hola+EIATEC%2C+quiero+m%C3%A1s+informaci%C3%B3n',
    },
    // 🌐 Enlaces de la web
    pages: {
      servicios: 'https://www.eiatec.com.co/servicios',
      proyectos: 'https://www.eiatec.com.co/proyectos',
      nosotros:  'https://www.eiatec.com.co/nosotros',
      contacto:  'https://www.eiatec.com.co/contacto',
      blog:      'https://www.eiatec.com.co/blog',
    },
    // ✉️ Correos por área
    emails: {
      comercial:       'comercial@eiatec.com',
      gestionhumana:   'gestionhumana@eiatec.com',
      contabilidad:    'contabilidad@eiatec.com',
      hseq:            'hseq@eiatec.com',
      gestionjuridica: 'gestionjuridica@eiatec.com',
      gerenciatecnica: 'gerenciatecnica@eiatec.com',
      compras:         'compras@eiatec.com',
    },
    // 🐾 Imagen de Kai
    mascotImg: 'https://static.wixstatic.com/media/2801d6_51ce4f450a744caeb76eeee572a36286~mv2.png',
  };

  /* ─────────── FLUJOS DE CONVERSACIÓN ─────────── */
  const FLOWS = {
    inicio: {
      msg: '¡Hola! 👋 Soy **Kai**, el asistente virtual de **EIATEC**.\n¿En qué puedo ayudarte hoy?',
      opts: [
        { label: '📋 Ver nuestros servicios', next: 'servicios' },
        { label: '🗂️ Proyectos realizados',   next: 'proyectos' },
        { label: '🕐 Horarios de atención',   next: 'horarios' },
        { label: '📩 Hablar con un asesor',   next: 'asesor' },
        { label: '🌐 Ir a nuestra web',        next: 'web' },
      ],
    },
    servicios: {
      msg: 'Ofrecemos servicios en:\n• Estudios de Impacto Ambiental (EIA)\n• Consulta Previa\n• Gestión Hídrica\n• Flora, Fauna y Biodiversidad\n• Energía Renovable\n• Arqueología\n• Sostenibilidad Empresarial\n• Logística Ambiental\n\n¿Deseas más detalle?',
      opts: [
        { label: '🔗 Ver todos los servicios', action: () => open(CFG.pages.servicios, '_top') },
        { label: '📩 Consultar sobre un servicio', next: 'asesor' },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    proyectos: {
      msg: 'Hemos realizado más de **30 proyectos** en toda Colombia: EIAs, consultas previas, monitoreo de fauna, compensaciones forestales, energía solar y más.',
      opts: [
        { label: '🔗 Ver proyectos', action: () => open(CFG.pages.proyectos, '_top') },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    horarios: {
      msg: '🕐 **Horarios de atención:**\n\n📅 Lunes a Viernes\n⏰ 8:00 am – 6:00 pm\n\n📞 Teléfonos: (1) 704 2362 / (1) 245 0961\n📍 Bogotá D.C. · Calle 45 C Bis #23-37\n\nFuera de horario puedes escribirnos por WhatsApp o correo.',
      opts: [
        { label: '💬 Escribir por WhatsApp', action: () => open(CFG.whatsapp.general, '_blank') },
        { label: '✉️ Enviar correo', action: () => open(`mailto:${CFG.emails.comercial}`) },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    asesor: {
      msg: 'Perfecto. ¿Sobre qué área es tu consulta?',
      opts: [
        { label: '💼 Comercial / Proyectos', next: 'contacto_comercial' },
        { label: '🛡️ HSEQ',                  next: 'contacto_hseq' },
        { label: '🔧 Gerencia Técnica',       next: 'contacto_tecnica' },
        { label: '👥 Gestión Humana',         next: 'contacto_rrhh' },
        { label: '📦 Otras áreas',            next: 'contacto_otras' },
      ],
    },
    contacto_comercial: {
      msg: 'Te comunico con el área **Comercial**. ¿Cómo prefieres contactarnos?',
      opts: [
        { label: '💬 WhatsApp Comercial', action: () => open(CFG.whatsapp.comercial, '_blank') },
        { label: `✉️ Email: ${CFG.emails.comercial}`, action: () => open(`mailto:${CFG.emails.comercial}`) },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    contacto_hseq: {
      msg: 'Te comunico con el área **HSEQ**. ¿Cómo prefieres contactarnos?',
      opts: [
        { label: '💬 WhatsApp HSEQ', action: () => open(CFG.whatsapp.hseq, '_blank') },
        { label: `✉️ Email: ${CFG.emails.hseq}`, action: () => open(`mailto:${CFG.emails.hseq}`) },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    contacto_tecnica: {
      msg: 'Te comunico con **Gerencia Técnica**. ¿Cómo prefieres contactarnos?',
      opts: [
        { label: '💬 WhatsApp Técnico', action: () => open(CFG.whatsapp.gerenciatecnica, '_blank') },
        { label: `✉️ Email: ${CFG.emails.gerenciatecnica}`, action: () => open(`mailto:${CFG.emails.gerenciatecnica}`) },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    contacto_rrhh: {
      msg: 'Te comunico con **Gestión Humana**. ¿Cómo prefieres contactarnos?',
      opts: [
        { label: '💬 WhatsApp RR.HH.', action: () => open(CFG.whatsapp.gestionhumana, '_blank') },
        { label: `✉️ Email: ${CFG.emails.gestionhumana}`, action: () => open(`mailto:${CFG.emails.gestionhumana}`) },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    contacto_otras: {
      msg: 'Para otras consultas puedes contactarnos por:\n📞 (1) 704 2362\n✉️ comercial@eiatec.com\n\n¿Cómo prefieres continuar?',
      opts: [
        { label: '💬 WhatsApp General', action: () => open(CFG.whatsapp.general, '_blank') },
        { label: '✉️ Enviar correo', action: () => open(`mailto:${CFG.emails.comercial}`) },
        { label: '🏠 Volver al inicio', next: 'inicio' },
      ],
    },
    web: {
      msg: '¿A qué sección de nuestra web quieres ir?',
      opts: [
        { label: '⚙️ Servicios', action: () => open(CFG.pages.servicios, '_top') },
        { label: '📁 Proyectos', action: () => open(CFG.pages.proyectos, '_top') },
        { label: '🏢 Nosotros',  action: () => open(CFG.pages.nosotros, '_top') },
        { label: '✉️ Contacto',  action: () => open(CFG.pages.contacto, '_top') },
        { label: '📰 Blog',      action: () => open(CFG.pages.blog, '_top') },
        { label: '🏠 Volver',    next: 'inicio' },
      ],
    },
  };

  /* ─────────── ESTADO ─────────── */
  let isOpen = false;
  let started = false;
  const mascotBtn = document.getElementById('kai-mascot');
  const chatEl = document.getElementById('kai-chat');
  const notifDot = document.getElementById('kai-notif');

  /* ─────────── CONSTRUIR EL CHAT ─────────── */
  function buildChat() {
    chatEl.innerHTML = `
      <div class="kai-ch-header">
        <div class="kai-ch-avatar">
          <img src="${CFG.mascotImg}" alt="Kai" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span style="display:none;width:100%;height:100%;align-items:center;justify-content:center">🌿</span>
        </div>
        <div class="kai-ch-info">
          <strong>Kai · EIATEC</strong>
          <span>En línea ahora</span>
        </div>
        <button class="kai-ch-close" id="kai-close-btn">✕</button>
      </div>
      <div class="kai-msgs" id="kai-msgs"></div>
      <div class="kai-input-row">
        <input id="kai-inp" type="text" placeholder="Escribe tu mensaje…" autocomplete="off">
        <button class="kai-send-btn" id="kai-send-btn">➤</button>
      </div>
    `;

    document.getElementById('kai-close-btn').addEventListener('click', toggleChat);
    document.getElementById('kai-send-btn').addEventListener('click', handleInput);
    const inp = document.getElementById('kai-inp');
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleInput();
    });
  }

  buildChat();

  /* ─────────── TOGGLE ─────────── */
  function toggleChat() {
    isOpen = !isOpen;
    chatEl.classList.toggle('open', isOpen);
    if (notifDot) notifDot.style.display = 'none';
    if (isOpen && !started) {
      started = true;
      setTimeout(() => goFlow('inicio'), 400);
    }
    if (isOpen) {
      setTimeout(() => {
        const inp = document.getElementById('kai-inp');
        if (inp) inp.focus();
      }, 350);
    }
  }

  if (mascotBtn) {
    mascotBtn.addEventListener('click', toggleChat);
  }

  setTimeout(() => {
    if (notifDot && !started) {
      notifDot.style.display = 'block';
      if (mascotBtn) {
        mascotBtn.style.animation = 'none';
        setTimeout(() => { mascotBtn.style.animation = ''; }, 50);
      }
    }
  }, 3000);

  /* ─────────── HELPERS ─────────── */
  function msgsEl() { return document.getElementById('kai-msgs'); }

  function scroll() {
    setTimeout(() => {
      const m = msgsEl();
      if (m) m.scrollTop = m.scrollHeight;
    }, 80);
  }

  function addBot(text) {
    const el = document.createElement('div');
    el.className = 'kai-msg-bot';
    const html = text.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    el.innerHTML = `
      <div class="kai-bot-av">
        <img src="${CFG.mascotImg}" alt="Kai" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:.6rem">🌿</span>
      </div>
      <div class="kai-bot-bub">${html}</div>
    `;
    msgsEl().appendChild(el);
    scroll();
  }

  function addUser(text) {
    const el = document.createElement('div');
    el.className = 'kai-msg-user';
    el.innerHTML = `<div class="kai-user-bub">${text}</div>`;
    msgsEl().appendChild(el);
    scroll();
  }

  function addOpts(opts) {
    const el = document.createElement('div');
    el.className = 'kai-opts';
    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'kai-opt';
      b.textContent = o.label;
      b.addEventListener('click', () => {
        el.querySelectorAll('.kai-opt').forEach(x => { x.disabled = true; x.style.opacity = '0.45'; });
        addUser(o.label);
        if (o.action) {
          setTimeout(o.action, 200);
        } else if (o.next) {
          showTyping(() => goFlow(o.next));
        }
      });
      el.appendChild(b);
    });
    msgsEl().appendChild(el);
    scroll();
  }

  function showTyping(cb) {
    const el = document.createElement('div');
    el.className = 'kai-typing';
    el.innerHTML = `
      <div class="kai-bot-av" style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#2C6957,#62B455);display:flex;align-items:center;justify-content:center;font-size:.6rem">🌿</div>
      <div class="kai-typing-bub">
        <div class="kai-dot"></div>
        <div class="kai-dot"></div>
        <div class="kai-dot"></div>
      </div>
    `;
    msgsEl().appendChild(el);
    scroll();
    setTimeout(() => { el.remove(); cb(); }, 900);
  }

  function goFlow(key) {
    const f = FLOWS[key];
    if (!f) return;
    addBot(f.msg);
    setTimeout(() => addOpts(f.opts), 200);
  }

  function handleInput() {
    const inp = document.getElementById('kai-inp');
    if (!inp) return;
    const v = inp.value.trim();
    if (!v) return;
    inp.value = '';
    addUser(v);

    const lv = v.toLowerCase();
    if (/servicio|eia|impacto|ambiental/.test(lv)) showTyping(() => goFlow('servicios'));
    else if (/proyecto|trabajo|referencia/.test(lv)) showTyping(() => goFlow('proyectos'));
    else if (/horario|hora|atencion|abre/.test(lv)) showTyping(() => goFlow('horarios'));
    else if (/whatsapp|asesor|hablar|contacto|correo|email/.test(lv)) showTyping(() => goFlow('asesor'));
    else if (/web|pagina|sitio/.test(lv)) showTyping(() => goFlow('web'));
    else {
      showTyping(() => {
        addBot('Entiendo tu consulta. Te recomiendo hablar directamente con uno de nuestros asesores. ¿Cómo prefieres contactarnos?');
        setTimeout(() => addOpts([
          { label: '💬 WhatsApp', action: () => open(CFG.whatsapp.general, '_blank') },
          { label: '✉️ Correo', action: () => open(`mailto:${CFG.emails.comercial}`) },
          { label: '🏠 Menú principal', next: 'inicio' },
        ]), 200);
      });
    }
  }

  /* ─────────── API GLOBAL ─────────── */
  window.KaiChat = {
    toggle: toggleChat,
    open: () => { if (!isOpen) toggleChat(); },
    close: () => { if (isOpen) toggleChat(); },
  };

})();