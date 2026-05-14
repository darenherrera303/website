(function(){
  /* ── Light particle bg ── */
  const cv=document.getElementById('bgc'),cx=cv.getContext('2d');
  let pts=[],W,H;
  const PAL=[[44,105,87],[98,180,85],[234,173,38],[27,129,195]];
  function rsz(){W=cv.width=innerWidth;H=cv.height=innerHeight}
  function init(){
    pts=[];
    const n=Math.min(45,Math.floor(W*H/18000));
    for(let i=0;i<n;i++)pts.push({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,
      r:Math.random()*1.3+.4,p:Math.random()*Math.PI*2,
      c:PAL[~~(Math.random()*PAL.length)]
    });
  }
  let t=0;
  function frame(ts){
    t=ts*.001;
    cx.clearRect(0,0,W,H);
    pts.forEach((a,i)=>{
      pts.slice(i+1).forEach(b=>{
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<110){cx.beginPath();
          cx.strokeStyle=`rgba(44,105,87,${(1-d/110)*.1})`;
          cx.lineWidth=.4;cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}
      });
    });
    pts.forEach(p=>{
      const pl=.5+.5*Math.sin(t*1.2+p.p);
      cx.beginPath();cx.arc(p.x,p.y,p.r*(1+pl*.25),0,Math.PI*2);
      cx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${.15+pl*.14})`;cx.fill();
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    });
    requestAnimationFrame(frame);
  }
  rsz();init();requestAnimationFrame(frame);
  window.addEventListener('resize',()=>{rsz();init()});

  /* ── Area pills ── */
  let selEmail='',selName='';
  document.querySelectorAll('.apill').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.apill').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel');
      selEmail=b.dataset.email;selName=b.dataset.name;
      const prev=document.getElementById('aprev');
      document.getElementById('aprev-txt').textContent=`${selName} · ${selEmail}`;
      prev.classList.add('vis');
    });
  });

  /* ── Char counter ── */
  const ta=document.getElementById('fmensaje');
  ta.addEventListener('input',()=>document.getElementById('fcc').textContent=ta.value.length);

  /* ── Submit ── */
  document.getElementById('sbtn').addEventListener('click',()=>{
    const nombre=document.getElementById('fnombre').value.trim();
    const email=document.getElementById('femail').value.trim();
    const mensaje=ta.value.trim();
    if(!nombre){alert('Por favor ingresa tu nombre.');document.getElementById('fnombre').focus();return}
    if(!email||!/\S+@\S+\.\S+/.test(email)){alert('Por favor ingresa un correo válido.');document.getElementById('femail').focus();return}
    if(!selEmail){alert('Por favor selecciona el área de destino en el panel izquierdo.');return}
    if(!mensaje){alert('Por favor escribe tu consulta o mensaje.');ta.focus();return}

    const apellido=document.getElementById('fapellido').value.trim();
    const tel=document.getElementById('ftel').value.trim();
    const empresa=document.getElementById('fempresa').value.trim();
    const tipo=document.getElementById('ftipo').value;

    const subject=`Consulta EIATEC · ${tipo||'General'} · ${nombre}${apellido?' '+apellido:''}`;
    const lines=[
      `Nombre: ${nombre}${apellido?' '+apellido:''}`,
      `Correo: ${email}`,
      tel&&`Teléfono: ${tel}`,
      empresa&&`Empresa: ${empresa}`,
      tipo&&`Tipo de proyecto: ${tipo}`,
      '',
      '─────────────────────────────',
      'Mensaje:',
      mensaje,
      '',
      '─────────────────────────────',
      `Área destino: ${selName} (${selEmail})`,
      `Enviado desde: Formulario Web EIATEC`,
    ].filter(Boolean).join('\n');

    window.location.href=`mailto:${selEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;

    setTimeout(()=>{
      document.querySelectorAll('#formpanel .fc-ttl,#formpanel .aprev,#formpanel .frow,#formpanel .fg,#formpanel .sbtn')
        .forEach(el=>el.style.display='none');
      document.getElementById('sbadge-txt').textContent=`${selName} · ${selEmail}`;
      document.getElementById('succ').classList.add('vis');
    },450);
  });

  /* ── Reset ── */
  document.getElementById('sreset').addEventListener('click',()=>{
    ['fnombre','fapellido','femail','ftel','fempresa','fmensaje'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('ftipo').value='';
    document.getElementById('fcc').textContent='0';
    document.querySelectorAll('.apill').forEach(x=>x.classList.remove('sel'));
    selEmail='';selName='';
    document.getElementById('aprev').classList.remove('vis');
    document.getElementById('succ').classList.remove('vis');
    document.querySelectorAll('#formpanel .fc-ttl,#formpanel .aprev,#formpanel .frow,#formpanel .fg,#formpanel .sbtn')
      .forEach(el=>el.style.display='');
  });

  function sendReady(){window.parent.postMessage('READY','*')}
  window.addEventListener('load',()=>{sendReady();setTimeout(sendReady,600)});
})();