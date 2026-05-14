const LOGO="https://static.wixstatic.com/media/2801d6_86238b8a055743888ff8744e0423a39a~mv2.png";

(function(){
const cv=document.getElementById('bgc'),cx=cv.getContext('2d');
let pts=[];
function r(){cv.width=innerWidth;cv.height=innerHeight}
function i(){
pts=[];
const n=Math.min(40,Math.floor(cv.width*cv.height/15000));
for(let x=0;x<n;x++)pts.push({
x:Math.random()*cv.width,
y:Math.random()*cv.height,
vx:(Math.random()-.5)*.15,
vy:(Math.random()-.5)*.15,
r:Math.random()*1.2+.4,
p:Math.random()*Math.PI*2
});
}
let t=0;
function f(ts){
t=ts*.001;
cx.clearRect(0,0,cv.width,cv.height);

pts.forEach((a,k)=>{
pts.slice(k+1).forEach(b=>{
const d=Math.hypot(a.x-b.x,a.y-b.y);
if(d<110){
cx.beginPath();
cx.strokeStyle=`rgba(44,105,87,${(1-d/110)*.1})`;
cx.lineWidth=.4;
cx.moveTo(a.x,a.y);
cx.lineTo(b.x,b.y);
cx.stroke();
}
});
});

pts.forEach(p=>{
const pl=.5+.5*Math.sin(t*1.2+p.p);
cx.beginPath();
cx.arc(p.x,p.y,p.r*(1+pl*.25),0,Math.PI*2);
cx.fillStyle=`rgba(44,105,87,${.12+pl*.12})`;
cx.fill();
p.x+=p.vx;
p.y+=p.vy;
if(p.x<0)p.x=cv.width;
if(p.x>cv.width)p.x=0;
if(p.y<0)p.y=cv.height;
if(p.y>cv.height)p.y=0;
});

requestAnimationFrame(f);
}
r();
i();
requestAnimationFrame(f);
addEventListener('resize',()=>{r();i()});
})();

const CFG={
whatsapp:{
comercial:'https://wa.me/573000000001',
gestionhumana:'https://wa.me/573000000002',
hseq:'https://wa.me/573000000003',
gerenciatecnica:'https://wa.me/573000000004',
general:'https://wa.me/573001234567'
},
pages:{
servicios:'https://www.eiatec.com.co/servicios',
proyectos:'https://www.eiatec.com.co/proyectos',
nosotros:'https://www.eiatec.com.co/nosotros',
contacto:'https://www.eiatec.com.co/contacto',
blog:'https://www.eiatec.com.co/blog'
},
emails:{
comercial:'comercial@eiatec.com',
gestionhumana:'gestionhumana@eiatec.com',
hseq:'hseq@eiatec.com',
gerenciatecnica:'gerenciatecnica@eiatec.com'
}
};

const FLOWS={
inicio:{
msg:'¡Hola! 👋 Soy el asistente virtual de <b>EIATEC</b>.<br>¿En qué puedo ayudarte hoy?',
opts:[
{label:'📋 Servicios',next:'servicios'},
{label:'🗂️ Proyectos',next:'proyectos'},
{label:'🕐 Horarios',next:'horarios'},
{label:'📩 Asesor',next:'asesor'},
{label:'🌐 Web',next:'web'}
]
},
servicios:{
msg:'Ofrecemos servicios ambientales, EIA, biodiversidad, energía renovable y sostenibilidad.',
opts:[
{label:'🔗 Ver servicios',action:()=>open(CFG.pages.servicios,'_top')},
{label:'📩 Consultar',next:'asesor'},
{label:'🏠 Inicio',next:'inicio'}
]
},
proyectos:{
msg:'Hemos realizado múltiples proyectos ambientales en Colombia.',
opts:[
{label:'🔗 Ver proyectos',action:()=>open(CFG.pages.proyectos,'_top')},
{label:'🏠 Inicio',next:'inicio'}
]
},
horarios:{
msg:'📅 Lunes a Viernes<br>⏰ 8:00am – 6:00pm<br><br>📞 (1) 7042362',
opts:[
{label:'💬 WhatsApp',action:()=>open(CFG.whatsapp.general,'_blank')},
{label:'🏠 Inicio',next:'inicio'}
]
},
asesor:{
msg:'¿Qué área necesitas?',
opts:[
{label:'💼 Comercial',next:'cc'},
{label:'🛡️ HSEQ',next:'ch'},
{label:'🔧 Técnica',next:'ct'},
{label:'👥 RRHH',next:'cr'}
]
},
cc:{
msg:'Área Comercial',
opts:[
{label:'💬 WhatsApp',action:()=>open(CFG.whatsapp.comercial,'_blank')},
{label:'✉️ Email',action:()=>open(`mailto:${CFG.emails.comercial}`)},
{label:'🏠 Inicio',next:'inicio'}
]
},
ch:{
msg:'Área HSEQ',
opts:[
{label:'💬 WhatsApp',action:()=>open(CFG.whatsapp.hseq,'_blank')},
{label:'✉️ Email',action:()=>open(`mailto:${CFG.emails.hseq}`)},
{label:'🏠 Inicio',next:'inicio'}
]
},
ct:{
msg:'Gerencia Técnica',
opts:[
{label:'💬 WhatsApp',action:()=>open(CFG.whatsapp.gerenciatecnica,'_blank')},
{label:'✉️ Email',action:()=>open(`mailto:${CFG.emails.gerenciatecnica}`)},
{label:'🏠 Inicio',next:'inicio'}
]
},
cr:{
msg:'Gestión Humana',
opts:[
{label:'💬 WhatsApp',action:()=>open(CFG.whatsapp.gestionhumana,'_blank')},
{label:'✉️ Email',action:()=>open(`mailto:${CFG.emails.gestionhumana}`)},
{label:'🏠 Inicio',next:'inicio'}
]
},
web:{
msg:'¿Qué sección deseas visitar?',
opts:[
{label:'⚙️ Servicios',action:()=>open(CFG.pages.servicios,'_top')},
{label:'📁 Proyectos',action:()=>open(CFG.pages.proyectos,'_top')},
{label:'🏢 Nosotros',action:()=>open(CFG.pages.nosotros,'_top')},
{label:'✉️ Contacto',action:()=>open(CFG.pages.contacto,'_top')},
{label:'📰 Blog',action:()=>open(CFG.pages.blog,'_top')},
{label:'🏠 Inicio',next:'inicio'}
]
}
};

let isOpen=false,started=false;
const msgs=document.getElementById('msgs');
const inp=document.getElementById('inp');

function toggleChat(){
isOpen=!isOpen;
document.getElementById('chat').classList.toggle('open',isOpen);
document.getElementById('notif').style.display='none';
if(isOpen&&!started){
started=true;
setTimeout(()=>goFlow('inicio'),400);
}
if(isOpen)setTimeout(()=>inp.focus(),350);
}

setTimeout(()=>{
document.getElementById('notif').style.display='block';
},3000);

function addBot(t){
const e=document.createElement('div');
e.className='bm';
e.innerHTML=`<div class="bm-av"><img src="${LOGO}"></div><div class="bm-bub">${t}</div>`;
msgs.appendChild(e);
scroll();
}

function addUser(t){
const e=document.createElement('div');
e.className='um';
e.innerHTML=`<div class="um-bub">${t}</div>`;
msgs.appendChild(e);
scroll();
}

function addOpts(o){
const e=document.createElement('div');
e.className='opts';

o.forEach(x=>{
const b=document.createElement('button');
b.className='opt';
b.textContent=x.label;

b.onclick=()=>{
e.querySelectorAll('.opt').forEach(q=>{
q.disabled=true;
q.style.opacity='.45';
});

addUser(x.label);

if(x.action)setTimeout(x.action,200);
else if(x.next)typing(()=>goFlow(x.next));
};

e.appendChild(b);
});

msgs.appendChild(e);
scroll();
}

function typing(cb){
const e=document.createElement('div');
e.className='typing';

e.innerHTML='<div class="bm-av">🌿</div><div class="typing-bub"><div class="td"></div><div class="td"></div><div class="td"></div></div>';

msgs.appendChild(e);
scroll();

setTimeout(()=>{
e.remove();
cb();
},900);
}

function goFlow(k){
const f=FLOWS[k];
if(!f)return;
addBot(f.msg);
setTimeout(()=>addOpts(f.opts),200);
}

function scroll(){
setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,80);
}

function handleInput(){
const v=inp.value.trim();
if(!v)return;

inp.value='';
addUser(v);

const l=v.toLowerCase();

if(/servicio|ambiental|eia/.test(l))typing(()=>goFlow('servicios'));
else if(/proyecto/.test(l))typing(()=>goFlow('proyectos'));
else if(/horario|hora/.test(l))typing(()=>goFlow('horarios'));
else if(/asesor|contacto|correo|whatsapp/.test(l))typing(()=>goFlow('asesor'));
else if(/web|pagina/.test(l))typing(()=>goFlow('web'));
else{
typing(()=>{
addBot('Te recomiendo comunicarte con uno de nuestros asesores.');
setTimeout(()=>addOpts([
{label:'💬 WhatsApp',action:()=>open(CFG.whatsapp.general,'_blank')},
{label:'🏠 Inicio',next:'inicio'}
]),200);
});
}
}

inp.addEventListener('keydown',e=>{
if(e.key==='Enter')handleInput();
});