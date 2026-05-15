/* =============================================
   Kay · Widget JS — EIATEC (compatible Wix)
   Debe cargarse con <script src="kay.js" defer>
============================================= */
(function () {

  /* ═══════════════════════════════════════════
     ⚙️  CONFIGURACIÓN — edita estos valores
  ═══════════════════════════════════════════ */
  const CFG = {
    // Números de WhatsApp (solo dígitos, con código de país 57)
    wa: {
      comercial:   '573000000001',  // ← reemplaza
      humana:      '573000000002',  // ← reemplaza
      hseq:        '573000000003',  // ← reemplaza
      tecnica:     '573000000004',  // ← reemplaza
      general:     '573001234567',  // ← número general EIATEC
    },
    // URLs de las secciones de tu web
    url: {
      servicios: 'https://www.eiatec.com.co/servicios',
      proyectos: 'https://www.eiatec.com.co/proyectos',
      nosotros:  'https://www.eiatec.com.co/nosotros',
      contacto:  'https://www.eiatec.com.co/contacto',
      blog:      'https://www.eiatec.com.co/blog',
    },
    // Correos por área
    mail: {
      comercial:  'comercial@eiatec.com',
      humana:     'gestionhumana@eiatec.com',
      hseq:       'hseq@eiatec.com',
      tecnica:    'gerenciatecnica@eiatec.com',
      juridica:   'gestionjuridica@eiatec.com',
      compras:    'compras@eiatec.com',
      general:    'comercial@eiatec.com',
    },
    // Avatar de Kai
    avatar: 'https://static.wixstatic.com/media/2801d6_51ce4f450a744caeb76eeee572a36286~mv2.png',
  };

  /* ═══════════════════════════════════════════
     FLUJOS DE CONVERSACIÓN (sin cambios)
  ═══════════════════════════════════════════ */
  const FLOWS = {
    inicio: {
      msg: `¡Hola! 👋 Soy <strong>Kai</strong>, el asistente virtual de <strong>EIATEC</strong>.<br>
            Estoy aquí para ayudarte. ¿Por dónde empezamos?`,
      opts: [
        { e: '📋', l: 'Nuestros servicios',   n: 'servicios' },
        { e: '🗂️', l: 'Proyectos realizados', n: 'proyectos' },
        { e: '🕐', l: 'Horarios de atención', n: 'horarios'  },
        { e: '📩', l: 'Hablar con un asesor', n: 'asesor'    },
        { e: '🌐', l: 'Ir al sitio web',      n: 'web'       },
      ],
    },
    servicios: {
      msg: `En <strong>EIATEC</strong> ofrecemos soluciones ambientales integrales:<br><br>
            🌿 Estudios de Impacto Ambiental (EIA)<br>
            🤝 Consulta Previa con comunidades<br>
            💧 Gestión de Recursos Hídricos<br>
            🦋 Flora, Fauna y Biodiversidad<br>
            ☀️ Energía Renovable<br>
            🏛️ Arqueología y Patrimonio<br>
            ♻️ Sostenibilidad Empresarial<br>
            🚚 Logística Ambiental<br><br>
            ¿Te gustaría saber más?`,
      opts: [
        { e: '🔗', l: 'Ver todos los servicios', a: () => open(CFG.url.servicios, '_top') },
        { e: '📩', l: 'Consultar un servicio',   n: 'asesor' },
        { e: '🏠', l: 'Volver al inicio',        n: 'inicio' },
      ],
    },
    proyectos: {
      msg: `Hemos realizado <strong>más de 30 proyectos</strong> exitosos en Colombia 🇨🇴<br><br>
            EIAs, consultas previas, monitoreo de fauna, energía solar,
            compensaciones forestales y mucho más.`,
      opts: [
        { e: '🔗', l: 'Ver proyectos', a: () => open(CFG.url.proyectos, '_top') },
        { e: '📩', l: 'Contactar',     n: 'asesor' },
        { e: '🏠', l: 'Inicio',        n: 'inicio' },
      ],
    },
    horarios: {
      msg: `🕐 <strong>Horarios de atención:</strong><br><br>
            📅 Lunes a Viernes<br>
            ⏰ 8:00 a.m. – 6:00 p.m.<br><br>
            📞 <strong>(1) 704 2362</strong> / <strong>(1) 245 0961</strong><br>
            📍 Bogotá D.C. · Calle 45 C Bis #23-37<br><br>
            Fuera de horario puedes escribirnos por WhatsApp o correo. 😊`,
      opts: [
        { e: '💬', l: 'WhatsApp', a: () => open(`https://wa.me/${CFG.wa.general}`, '_blank') },
        { e: '✉️', l: 'Correo',   a: () => open(`mailto:${CFG.mail.general}`) },
        { e: '🏠', l: 'Inicio',   n: 'inicio' },
      ],
    },
    asesor: {
      msg: `¡Perfecto! Dime, ¿sobre qué área necesitas ayuda?`,
      opts: [
        { e: '💼', l: 'Comercial / Proyectos', n: 'f_comercial' },
        { e: '🛡️', l: 'HSEQ',                 n: 'f_hseq'      },
        { e: '🔧', l: 'Gerencia Técnica',      n: 'f_tecnica'   },
        { e: '👥', l: 'Gestión Humana',        n: 'f_humana'    },
        { e: '⚖️', l: 'Gestión Jurídica',      n: 'f_juridica'  },
        { e: '🏠', l: 'Volver',               n: 'inicio'      },
      ],
    },
    f_comercial: { type: 'form', label: 'Comercial',        wa: 'comercial', mail: 'comercial' },
    f_hseq:      { type: 'form', label: 'HSEQ',             wa: 'hseq',      mail: 'hseq'      },
    f_tecnica:   { type: 'form', label: 'Gerencia Técnica', wa: 'tecnica',   mail: 'tecnica'   },
    f_humana:    { type: 'form', label: 'Gestión Humana',   wa: 'humana',    mail: 'humana'    },
    f_juridica:  { type: 'form', label: 'Gestión Jurídica', wa: 'general',   mail: 'juridica'  },
    web: {
      msg: `¿A qué sección quieres ir? 🌐`,
      opts: [
        { e: '⚙️', l: 'Servicios', a: () => open(CFG.url.servicios, '_top') },
        { e: '📁', l: 'Proyectos', a: () => open(CFG.url.proyectos, '_top') },
        { e: '🏢', l: 'Nosotros',  a: () => open(CFG.url.nosotros,  '_top') },
        { e: '✉️', l: 'Contacto',  a: () => open(CFG.url.contacto,  '_top') },
        { e: '📰', l: 'Blog',      a: () => open(CFG.url.blog,      '_top') },
        { e: '🏠', l: 'Volver',   n: 'inicio' },
      ],
    },
  };

  /* ═══════════════════════════════════════════
     MOTOR DEL CHAT
     (IDs y clases reales: #kayChat, .bm, .um, .kopts…)
  ═══════════════════════════════════════════ */
  let isOpen  = false;
  let started = false;
  let chatEl, dotEl, box, inp;

  // Intenta encontrar los elementos del DOM, reintenta si no existen
  function initWhenReady() {
    chatEl = document.getElementById('kayChat');
    dotEl  = document.getElementById('kayDot');
    box    = document.getElementById('kMsgs');
    inp    = document.getElementById('kInp');

    if (chatEl && dotEl && box && inp) {
      setupChat();
    } else {
      setTimeout(initWhenReady, 50);
    }
  }

  function setupChat() {
    // Abrir / cerrar
    window.toggleKay = function () {
      isOpen = !isOpen;
      chatEl.classList.toggle('open', isOpen);
      if (dotEl) dotEl.style.display = 'none';

      if (isOpen && !started) {
        started = true;
        setTimeout(() => goFlow('inicio'), 380);
      }
      if (isOpen) setTimeout(() => inp && inp.focus(), 340);
    };

    // Badge de notificación
    setTimeout(() => { if (dotEl) dotEl.style.display = 'flex'; }, 2800);

    // Escuchar Enter en el input
    if (inp) {
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleKayInput(); });
    }

    // Señal de listo para Wix
    function sendReady() { window.parent && window.parent.postMessage('READY', '*'); }
    sendReady();
    setTimeout(sendReady, 600);
  }

  /* ── Scroll al último mensaje ── */
  function scroll() { setTimeout(() => { if (box) box.scrollTop = box.scrollHeight; }, 80); }

  /* ── Burbuja del bot ── */
  function addBot(html) {
    const w = document.createElement('div');
    w.className = 'bm';
    w.innerHTML = `
      <div class="bm-av"><img src="${CFG.avatar}" alt="Kai"></div>
      <div class="bm-bub">${html}</div>`;
    box.appendChild(w);
    scroll();
  }

  /* ── Burbuja del usuario ── */
  function addUser(txt) {
    const w = document.createElement('div');
    w.className = 'um';
    w.innerHTML = `<div class="um-bub">${txt}</div>`;
    box.appendChild(w);
    scroll();
  }

  /* ── Chips de opciones ── */
  function addOpts(opts) {
    const w = document.createElement('div');
    w.className = 'kopts';
    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'kopt';
      b.innerHTML = `${o.e || ''} ${o.l}`;
      b.onclick = () => {
        w.querySelectorAll('.kopt').forEach(x => { x.disabled = true; x.style.opacity = '.42'; });
        addUser(`${o.e || ''} ${o.l}`);
        if (o.a) { setTimeout(o.a, 180); setTimeout(askAgain, 700); }
        else if (o.n) showTyping(() => goFlow(o.n));
      };
      w.appendChild(b);
    });
    box.appendChild(w);
    scroll();
  }

  /* ── Indicador de escritura ── */
  function showTyping(cb) {
    const w = document.createElement('div');
    w.className = 'ktyp';
    w.innerHTML = `
      <div class="bm-av"><img src="${CFG.avatar}" alt="Kai"></div>
      <div class="ktyp-bub">
        <div class="td"></div><div class="td"></div><div class="td"></div>
      </div>`;
    box.appendChild(w);
    scroll();
    setTimeout(() => { w.remove(); cb(); }, 820);
  }

  /* ── Separador de sistema ── */
  function addSys(txt) {
    const w = document.createElement('div');
    w.className = 'ksys';
    w.textContent = txt;
    box.appendChild(w);
    scroll();
  }

  /* ── Ir a un flujo ── */
  function goFlow(key) {
    const f = FLOWS[key];
    if (!f) return;
    if (f.type === 'form') { showForm(f); return; }
    addBot(f.msg);
    setTimeout(() => addOpts(f.opts), 220);
  }

  /* ── Formulario de contacto (clases .kform, .kfi, etc.) ── */
  function showForm(f) {
    const subj = `Consulta ${f.label} · EIATEC`;

    const el = document.createElement('div');
    el.className = 'kform';
    el.innerHTML = `
      <p class="kform-ttl"><i class="fas fa-paper-plane"></i> Cuéntanos tu consulta</p>

      <div class="kfg">
        <label>Nombre *</label>
        <div class="kfi"><i class="fas fa-user"></i>
          <input id="kfn" type="text" placeholder="Tu nombre" autocomplete="given-name">
        </div>
      </div>

      <div class="kfg">
        <label>Correo (opcional)</label>
        <div class="kfi"><i class="fas fa-envelope"></i>
          <input id="kfe" type="email" placeholder="correo@empresa.com" autocomplete="email">
        </div>
      </div>

      <div class="kfg">
        <label>Teléfono (opcional)</label>
        <div class="kfi"><i class="fas fa-phone"></i>
          <input id="kft" type="tel" placeholder="+57 300 000 0000" autocomplete="tel">
        </div>
      </div>

      <div class="kfg">
        <label>Mensaje (opcional)</label>
        <div class="kfi ta"><i class="fas fa-comment"></i>
          <textarea id="kfm" placeholder="Cuéntanos brevemente tu consulta o proyecto…"></textarea>
        </div>
      </div>

      <div class="kdiv"><span>¿Cómo prefieres continuar?</span></div>

      <div class="kform-btns">
        <button class="kbtn kbtn-wa" id="kfwa">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </button>
        <button class="kbtn kbtn-em" id="kfem">
          <i class="fas fa-envelope"></i> Correo
        </button>
      </div>
      <p class="kform-hint">Solo tu nombre es obligatorio</p>`;

    box.appendChild(el);
    scroll();

    function getData() {
      return {
        name:  (document.getElementById('kfn')?.value || '').trim(),
        email: (document.getElementById('kfe')?.value || '').trim(),
        phone: (document.getElementById('kft')?.value || '').trim(),
        msg:   (document.getElementById('kfm')?.value || '').trim(),
      };
    }

    // Botón WhatsApp
    document.getElementById('kfwa').onclick = () => {
      const d = getData();
      if (!d.name) { document.getElementById('kfn').focus(); return; }

      const phone = CFG.wa[f.wa] || CFG.wa.general;
      const text  = [
        `Hola Kai, soy ${d.name}.`,
        d.phone  ? `Tel: ${d.phone}.`   : '',
        d.email  ? `Email: ${d.email}.` : '',
        `Consulta: ${f.label}.`,
        d.msg    ? d.msg                : '',
      ].filter(Boolean).join(' ');

      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
      el.remove();
      addBot(`¡Listo! 🚀 Abrí WhatsApp con tu consulta. Solo envía el mensaje y te contactaremos pronto.`);
      askAgain();
    };

    // Botón Correo
    document.getElementById('kfem').onclick = () => {
      const d    = getData();
      if (!d.name) { document.getElementById('kfn').focus(); return; }

      const to   = CFG.mail[f.mail] || CFG.mail.general;
      const sub  = encodeURIComponent(subj);
      const body = encodeURIComponent(
        `Hola,\n\nSoy ${d.name}.` +
        (d.phone ? `\nTeléfono: ${d.phone}` : '') +
        (d.email ? `\nCorreo: ${d.email}` : '') +
        `\n\n${d.msg || 'Quisiera recibir información sobre los servicios de EIATEC.'}` +
        `\n\nSaludos.`
      );

      window.location.href = `mailto:${to}?subject=${sub}&body=${body}`;
      el.remove();
      addBot(`✉️ Perfecto. Abrí tu correo con todo pre-llenado. ¡Solo dale enviar!`);
      askAgain();
    };
  }

  /* ── Pregunta final ── */
  function askAgain() {
    setTimeout(() => {
      addSys('─────────────────');
      addBot('¿Puedo ayudarte con algo más? 😊');
      setTimeout(() => {
        addOpts([
          { e: '✅', l: 'Sí, otra consulta', n: 'inicio' },
          { e: '👋', l: 'No, gracias',        a: () => {
            addBot('¡Fue un placer! Recuerda que puedes escribirme cuando quieras. 🌿<br>¡Hasta pronto!');
            setTimeout(() => toggleKay(), 2600);
          }},
        ]);
      }, 260);
    }, 900);
  }

  /* ── Entrada libre de texto ── */
  window.handleKayInput = function () {
    const v = inp.value.trim();
    if (!v) return;
    inp.value = '';
    addUser(v);

    const l = v.toLowerCase();
    if (/servicio|eia|impacto|ambiental|hídric|forestal|fauna|flora/.test(l))
      showTyping(() => goFlow('servicios'));
    else if (/proyecto|portafolio|referencia|trabajo/.test(l))
      showTyping(() => goFlow('proyectos'));
    else if (/horario|hora|atencion|abre|cierra|oficina/.test(l))
      showTyping(() => goFlow('horarios'));
    else if (/contacto|asesor|hablar|whatsapp|correo|email/.test(l))
      showTyping(() => goFlow('asesor'));
    else if (/web|pagina|sitio|url/.test(l))
      showTyping(() => goFlow('web'));
    else
      showTyping(() => {
        addBot('Entiendo. 🤔 Déjame conectarte con el asesor indicado para tu consulta.');
        setTimeout(() => goFlow('asesor'), 200);
      });
  };

  // Arranque seguro
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

})();