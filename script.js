/* =========================================================
   COUPLE REWIND — Jesaias & Luana
   ========================================================= */
const DATA = {
  nome1: "Jesaias",
  nome2: "Luana",
  dataInicio: "2026-06-06",       // início do namoro
  cidade: "Nosso lugar",
  primeiroEncontro: "O dia em que tudo ficou real. Olhares, sorrisos e a certeza de que algo especial estava começando.",
  apelidos: ["Meu amor", "Minha vida", "Coração"],
  musicas: [
    { titulo: "Nossa música", artista: "A trilha sonora de nós" },
  ],
  timeline: [
    { data: "2026-02-17", texto: "Primeira troca de mensagens", emoji: "💬" },
    { data: "2026-04-22", texto: "Primeiro encontro", emoji: "☕" },
    { data: "2026-05-02", texto: "Primeiro beijo", emoji: "💋" },
    { data: "2026-06-06", texto: "Começo do namoro", emoji: "💜" },
    { data: "2026-06-13", texto: "Primeiro de muitos", emoji: "✨" },
  ],
  momentos: [
    { texto: "Primeira troca de mensagens", sub: "16 de fevereiro de 2026" },
    { texto: "Primeiro encontro", sub: "21 de abril de 2026" },
    { texto: "Primeiro beijo", sub: "1 de maio de 2026" },
  ],
  fotos: [],
  mensagemFinal: "Amor, você chegou e mudou tudo. Cada mensagem, cada encontro, cada beijo me lembra o quanto sou sortudo por te ter. Te amo.",
  emoji: "💜",
};

/* ========================================================= */
function daysBetween(iso, ref = new Date()) {
  const start = new Date(iso);
  return Math.max(0, Math.floor((ref - start) / 86400000));
}
function daysTogether() { return daysBetween(DATA.dataInicio); }
function fmtDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
}
function fmtShort(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'});
}

const SLIDES = [
  {
    duration: 5000,
    render: () => `
      <div class="slide-inner">
        <div class="kicker">Era uma vez</div>
        <h2 class="title">Dois corações<br/>que se encontraram</h2>
        <div class="pill">💜 ${DATA.nome1} & ${DATA.nome2}</div>
      </div>`
  },
  {
    duration: 6000,
    render: () => `
      <div class="slide-inner">
        <div class="kicker">Tudo começou em</div>
        <h2 class="title grad">16 de fevereiro</h2>
        <p class="body">Uma simples mensagem. Quem diria que ali nascia a nossa história?</p>
      </div>`
  },
  {
    duration: 7000,
    render: () => `
      <div class="slide-inner">
        <div class="kicker">Nossa linha do tempo</div>
        <h2 class="title">Os primeiros<br/>de tudo</h2>
        <div class="list">
          ${DATA.timeline.map(t=>`
            <div class="list-item">
              <div class="list-rank">${t.emoji}</div>
              <div><div class="list-text">${t.texto}</div><div class="list-sub">${fmtShort(t.data)}</div></div>
            </div>`).join('')}
        </div>
      </div>`
  },
  {
    duration: 5500,
    render: () => `
      <div class="slide-inner">
        <div class="kicker">21 de abril de 2026</div>
        <h2 class="title grad">Primeiro encontro</h2>
        <p class="body">O dia em que te vi de pertinho. O coração não parava.</p>
      </div>`
  },
  {
    duration: 5500,
    render: () => `
      <div class="slide-inner">
        <div class="heart">💋</div>
        <div class="kicker">1 de maio de 2026</div>
        <h2 class="title grad-warm">Primeiro beijo</h2>
        <p class="body">O mundo parou. E foi melhor do que em qualquer filme.</p>
      </div>`
  },
  {
    duration: 6000,
    render: () => `
      <div class="slide-inner">
        <div class="kicker">6 de junho de 2026</div>
        <h2 class="title grad">O sim que mudou tudo</h2>
        <p class="body">O dia em que viramos <strong>nós</strong>. Oficialmente apaixonados.</p>
      </div>`
  },
  {
    duration: 5000,
    render: () => {
      const d = daysTogether();
      return `
      <div class="slide-inner">
        <div class="kicker">Desde então</div>
        <div class="big-number">${d}</div>
        <div class="big-number-label">${d === 1 ? 'dia' : 'dias'} de namoro</div>
      </div>`;
    }
  },
  {
    duration: 5500,
    render: () => {
      const d = daysTogether();
      const desdeMensagem = daysBetween("2026-02-16");
      return `
      <div class="slide-inner">
        <div class="heart">💖</div>
        <h2 class="title">Em números</h2>
        <div class="stats">
          <div class="stat"><div class="stat-num">${d}</div><div class="stat-label">Dias namorando</div></div>
          <div class="stat"><div class="stat-num">${desdeMensagem}</div><div class="stat-label">Dias desde "oi"</div></div>
        </div>
      </div>`;
    }
  },
  {
    duration: 7000,
    render: () => `
      <div class="slide-inner">
        <div class="kicker">No fundo é simples</div>
        <p class="quote">${DATA.mensagemFinal}</p>
      </div>`
  },
  {
    duration: 12000,
    isFinal: true,
    render: () => `
      <div class="slide-inner">
        <div class="heart">${DATA.emoji}</div>
        <h2 class="title-xl grad">${DATA.nome1}<br/>&amp;<br/>${DATA.nome2}</h2>
        <p class="subtitle">e tudo o que ainda vem</p>
        <button class="pill" onclick="restart()" style="margin-top:20px;cursor:pointer">↻ Ver de novo</button>
      </div>`
  },
];

/* =========================================================
   ENGINE
   ========================================================= */
const slidesEl = document.getElementById('slides');
const introEl = document.querySelector('.intro');
const progressEl = document.getElementById('progress');
const introNames = document.getElementById('introNames');
introNames.textContent = `${DATA.nome1} & ${DATA.nome2}`;
document.title = `${DATA.nome1} & ${DATA.nome2} — Couple Rewind`;

SLIDES.forEach((s, i) => {
  const el = document.createElement('section');
  el.className = 'slide';
  el.dataset.idx = i;
  el.innerHTML = s.render();
  slidesEl.appendChild(el);
});

SLIDES.forEach(() => {
  const seg = document.createElement('div');
  seg.className = 'progress-seg';
  progressEl.appendChild(seg);
});

let current = -1;
let timer = null;
let started = false;

function showSlide(i){
  clearTimeout(timer);
  if (i < 0){
    introEl.classList.add('active');
    document.querySelectorAll('#slides .slide').forEach(s=>s.classList.remove('active'));
    progressEl.style.display = 'none';
    return;
  }
  progressEl.style.display = 'flex';
  introEl.classList.remove('active');
  const slides = document.querySelectorAll('#slides .slide');
  slides.forEach((s,idx)=>s.classList.toggle('active', idx===i));
  slides[i].innerHTML = SLIDES[i].render();

  const segs = progressEl.querySelectorAll('.progress-seg');
  segs.forEach((seg, idx)=>{
    seg.className = 'progress-seg' + (idx<i?' done':idx===i?' current':'');
    if (idx===i){
      seg.style.setProperty('--dur', (SLIDES[i].duration/1000)+'s');
    }
  });

  current = i;
  if (!SLIDES[i].isFinal){
    timer = setTimeout(()=>next(), SLIDES[i].duration);
  } else {
    spawnConfetti();
  }
}

function next(){ if (current < SLIDES.length - 1) showSlide(current+1); }
function prev(){
  if (current > 0) showSlide(current-1);
  else if (current === 0) { current = -1; showSlide(-1); started = false; }
}
function start(){
  if (started) return;
  started = true;
  showSlide(0);
  tryPlayAudio();
}
function restart(){
  current = -1; started = false;
  document.querySelectorAll('.confetti').forEach(c=>c.remove());
  showSlide(-1);
}
window.restart = restart;

document.getElementById('nextBtn').onclick = (e)=>{e.stopPropagation(); started?next():start();};
document.getElementById('prevBtn').onclick = (e)=>{e.stopPropagation(); prev();};
document.addEventListener('click', (e)=>{
  if (e.target.closest('.nav-btn,.audio-btn,button,a')) return;
  if (!started) start(); else next();
});
document.addEventListener('keydown',(e)=>{
  if (e.key==='ArrowRight'||e.key===' ') { e.preventDefault(); started?next():start(); }
  if (e.key==='ArrowLeft') prev();
});

let touchX = null;
document.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX},{passive:true});
document.addEventListener('touchend',e=>{
  if(touchX===null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50){ dx<0 ? (started?next():start()) : prev(); }
  touchX = null;
},{passive:true});

/* Stars */
const starsEl = document.getElementById('stars');
for (let i=0;i<80;i++){
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random()*2.5+0.8;
  s.style.width = s.style.height = size+'px';
  s.style.left = Math.random()*100+'%';
  s.style.top = Math.random()*100+'%';
  s.style.animationDuration = (2+Math.random()*4)+'s';
  s.style.animationDelay = (Math.random()*3)+'s';
  starsEl.appendChild(s);
}

function spawnHearts(){
  const colors = ['💜','💖','💕','✨','💫'];
  setInterval(()=>{
    if (current !== -1 && !SLIDES[current]?.isFinal) return;
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = colors[Math.floor(Math.random()*colors.length)];
    h.style.left = Math.random()*100+'%';
    h.style.animationDuration = (5+Math.random()*4)+'s';
    document.getElementById('app').appendChild(h);
    setTimeout(()=>h.remove(), 10000);
  }, 600);
}
spawnHearts();

function spawnConfetti(){
  const colors = ['#f472b6','#a855f7','#fbbf24','#ec4899','#6366f1','#fff'];
  for (let i=0;i<80;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100+'%';
    c.style.background = colors[i%colors.length];
    c.style.animationDelay = (Math.random()*2)+'s';
    c.style.animationDuration = (3+Math.random()*3)+'s';
    document.getElementById('app').appendChild(c);
  }
}

/* ========= Audio: música de fundo (mp3 local) ========= */
const audioBtn = document.getElementById('audioBtn');
const bgAudio = new Audio('music.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.45;
let audioOn = false;

bgAudio.addEventListener('play',  () => { audioOn = true;  audioBtn.classList.add('playing'); });
bgAudio.addEventListener('pause', () => { audioOn = false; audioBtn.classList.remove('playing'); });

function tryPlayAudio(){
  bgAudio.play().catch(()=>{});
}
audioBtn.onclick = (e)=>{
  e.stopPropagation();
  if (audioOn) bgAudio.pause();
  else tryPlayAudio();
};

showSlide(-1);
