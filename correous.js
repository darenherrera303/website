(function(){
  /* =============================================
     Kay · Asistente Virtual de EIATEC (correous)
     ============================================= */
  const KAY_AVATAR = "https://static.wixstatic.com/media/2801d6_c8449c3cafcf4a06941af5aa73607488~mv2.png";

  const CFG = {
    whatsapp: {
      comercial:       '573000000001',
      gestionhumana:   '573000000002',
      hseq:            '573000000003',
      gerenciatecnica: '573000000004',
      general:         '573001234567',
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
      general:         'comercial@eiatec.com',
    }
  };

  const FLOWS = {
    inicio: {
      msg: '¡Hola! 👋 Soy <strong>Kay</strong>, tu asistente virtual de EIATEC.<br>¿En qué puedo ayudarte hoy?',
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
  }

  /* ── FORMULARIO COMPLETO ── */
  function showForm(area){
    const formEl = document.createElement('div');
    formEl.className = 'eiabot-form-full';

    const emailTo = CFG.emails[area] || CFG.emails.general;
    const areaName = area === 'gestionhumana' ? 'Gestión Humana' :
                     area === 'gerenciatecnica' ? 'Gerencia Técnica' :
                     area.charAt(0).toUpperCase()+area.slice(1);

    formEl.innerHTML = `
      <div class="area-prev">
        <i class="fas fa-circle-check"></i>
        <span>${areaName} · ${emailTo}</span>
      </div>
      <div class="eiabot-frow">
        <div class="eiabot-fg">
          <label>Nombre *</label>
          <input id="eiabot-fname" type="text" placeholder="Tu nombre" autocomplete="given-name">
        </div>
        <div class="eiabot-fg">
          <label>Apellido</label>
          <input id="eiabot-flast" type="text" placeholder="Tu apellido" autocomplete="family-name">
        </div>
      </div>
      <div class="eiabot-frow">
        <div class="eiabot-fg">
          <label>Correo *</label>
          <input id="eiabot-femail" type="email" placeholder="correo@empresa.com" autocomplete="email">
        </div>
        <div class="eiabot-fg">
          <label>Teléfono</label>
          <input id="eiabot-fphone" type="tel" placeholder="+57 300 000 0000" autocomplete="tel">
        </div>
      </div>
      <div class="eiabot-fg full">
        <label>Empresa u organización</label>
        <input id="eiabot-fcompany" type="text" placeholder="Nombre de la empresa" autocomplete="organization">
      </div>
      <div class="eiabot-fg full">
        <label>Tipo de proyecto</label>
        <select id="eiabot-ftype">
          <option value="">¿Cuál es tu tipo de proyecto?</option>
          <option>Licencia ambiental</option>
          <option>Estudio de impacto ambiental (EIA)</option>
          <option>Consulta previa con comunidades étnicas</option>
          <option>Gestión de recursos hídricos</option>
          <option>Flora, fauna y biodiversidad</option>
          <option>Proyectos de energía renovable</option>
          <option>Gestión social y comunitaria</option>
          <option>Arqueología y patrimonio</option>
          <option>Restauración y compensación ecológica</option>
          <option>Sostenibilidad empresarial</option>
          <option>Otro</option>
        </select>
      </div>
      <div class="eiabot-fg full">
        <label>Tu consulta o mensaje *</label>
        <textarea id="eiabot-fmsg" maxlength="1200" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
        <div class="eiabot-char-count"><span id="eiabot-fcount">0</span> / 1200</div>
      </div>
      <div class="eiabot-btn-row">
        <button class="eiabot-btn-email" id="eiabot-fsendmail"><i class="fas fa-envelope"></i> Enviar por correo</button>
        <button class="eiabot-btn-wa" id="eiabot-fsendwa"><i class="fab fa-whatsapp"></i> WhatsApp</button>
      </div>
    `;
    msgs.appendChild(formEl);
    scroll();

    const ta = document.getElementById('eiabot-fmsg');
    const counter = document.getElementById('eiabot-fcount');
    ta.addEventListener('input', () => counter.textContent = ta.value.length);

    document.getElementById('eiabot-fsendmail').onclick = () => {
      const name = document.getElementById('eiabot-fname').value.trim();
      const email = document.getElementById('eiabot-femail').value.trim();
      const msg = ta.value.trim();
      if(!name) { alert('Por favor ingresa tu nombre.'); return; }
      if(!email || !/\S+@\S+\.\S+/.test(email)) { alert('Por favor ingresa un correo válido.'); return; }
      if(!msg) { alert('Por favor escribe tu consulta.'); return; }

      const last = document.getElementById('eiabot-flast').value.trim();
      const phone = document.getElementById('eiabot-fphone').value.trim();
      const company = document.getElementById('eiabot-fcompany').value.trim();
      const type = document.getElementById('eiabot-ftype').value;

      const subject = `Consulta EIATEC · ${type || 'General'} · ${name}${last ? ' '+last : ''}`;
      const lines = [
        `Nombre: ${name}${last ? ' '+last : ''}`,
        `Correo: ${email}`,
        phone && `Teléfono: ${phone}`,
        company && `Empresa: ${company}`,
        type && `Tipo de proyecto: ${type}`,
        '',
        '─────────────────────────────',
        'Mensaje:',
        msg,
        '',
        '─────────────────────────────',
        `Área destino: ${areaName} (${emailTo})`,
        `Enviado desde: Asistente Virtual Kay · EIATEC`
      ].filter(Boolean).join('\n');

      window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
      formEl.remove();
      addBot('✅ ¡Correo preparado! Solo revisa y haz clic en <strong>Enviar</strong> desde tu aplicación de correo.');
      askAgain();
    };

    document.getElementById('eiabot-fsendwa').onclick = () => {
      const name = document.getElementById('eiabot-fname').value.trim();
      const email = document.getElementById('eiabot-femail').value.trim();
      const msg = ta.value.trim();
      if(!name) { alert('Por favor ingresa tu nombre.'); return; }
      if(!msg) { alert('Por favor escribe tu consulta.'); return; }

      const last = document.getElementById('eiabot-flast').value.trim();
      const phoneField = document.getElementById('eiabot-fphone').value.trim();
      const company = document.getElementById('eiabot-fcompany').value.trim();
      const type = document.getElementById('eiabot-ftype').value;
      const phone = CFG.whatsapp[area] || CFG.whatsapp.general;

      const body = `Hola Kay, soy ${name}${last ? ' '+last : ''}.` +
        `${email ? ' Correo: '+email+'.' : ''}` +
        `${phoneField ? ' Tel: '+phoneField+'.' : ''}` +
        `${company ? ' Empresa: '+company+'.' : ''}` +
        `${type ? ' Tipo: '+type+'.' : ''}` +
        ` Mensaje: ${msg}`;

      open(`https://wa.me/${phone}?text=${encodeURIComponent(body)}`, '_blank');
      formEl.remove();
      addBot('📱 He abierto WhatsApp con tu consulta. Si no se abrió, puedes intentar de nuevo.');
      askAgain();
    };
  }

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

  window.eiabot = { minimize, expand, handleInput };
})();