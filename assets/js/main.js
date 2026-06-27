const CHAT_WORKER_URL='https://chatdisci.valdivino1604.workers.dev/';
const HOTMART_URL='https://hotmart.com/pt-br/club/disciplinatotal';
const WHATSAPP_URL='https://wa.me/5564981616434?text=Tenho%20interesse%20no%20livro%20Disciplina%20em%2030%20Dias';
const YOUTUBE_EMBED_URL='https://www.youtube.com/embed/fDb03TG9csc';

const oldHotmartLinks=['https://go.hotmart.com/C106276938L','https://go.hotmart.com/B106269096A','https://app.hotmart.com/'];
document.querySelectorAll('a[href]').forEach(link=>{
  const href=link.getAttribute('href')||'';
  if(oldHotmartLinks.includes(link.href)||oldHotmartLinks.includes(href)||href.includes('go.hotmart.com')||href.includes('app.hotmart.com')){
    link.href=HOTMART_URL;
    link.target='_blank';
    link.rel='noopener';
  }
});

function ensureFloatingButtons(){
  let floatBuy=document.querySelector('.float-buy');
  if(!floatBuy){
    floatBuy=document.createElement('a');
    floatBuy.className='float-buy btn pulse-buy';
    document.body.appendChild(floatBuy);
  }
  floatBuy.href=HOTMART_URL;
  floatBuy.target='_blank';
  floatBuy.rel='noopener';
  floatBuy.setAttribute('aria-label','Comprar na Hotmart');
  floatBuy.textContent='Comprar agora';

  let floatWhats=document.querySelector('.float-whatsapp');
  if(!floatWhats){
    floatWhats=document.createElement('a');
    floatWhats.className='float-whatsapp';
    floatWhats.innerHTML='☎';
    document.body.appendChild(floatWhats);
  }
  floatWhats.href=WHATSAPP_URL;
  floatWhats.target='_blank';
  floatWhats.rel='noopener';
  floatWhats.setAttribute('aria-label','Falar no WhatsApp');
}

function injectPremiumSections(){
  const main=document.querySelector('main');
  const comprar=document.querySelector('#comprar');
  if(!main||document.querySelector('#capitulos-premium'))return;

  const chapters=`
  <section id="capitulos-premium" class="premium-block dark"><div class="container">
    <div class="head reveal"><p class="gold">Por dentro do livro</p><h2>12 capítulos para sair do caos e construir constância.</h2><p>Uma jornada prática que passa por procrastinação, foco, rotina, hábitos, biologia, identidade e metas de longo prazo.</p></div>
    <div class="chapter-grid">
      ${[
        ['01','O Espelho da Procrastinação','Entenda gatilhos, culpa, autossabotagem e o ciclo do adiamento.'],
        ['02','Três Prioridades Não-Negociáveis','Escolha o essencial e pare de dividir energia com tudo.'],
        ['03','Rotina Matinal como Fundação','Comece o dia com clareza antes do celular e do caos.'],
        ['04','Blocos de Foco de 90 Minutos','Trabalhe com profundidade, checklist e pausas inteligentes.'],
        ['05','Fim da Escravidão Digital','Recupere atenção das notificações e redes sociais.'],
        ['06','Movimento Progressivo','Construa hábito físico sem exagero e sem desistir.'],
        ['07','Sono, Alimentação e Ansiedade','Organize os pilares biológicos da disciplina.'],
        ['08','Reescrever sua Narrativa','Troque crenças limitantes por identidade disciplinada.'],
        ['09','Diário, Mapa e Métricas','Meça o invisível e acompanhe o progresso real.'],
        ['10','Aumentar sem Queimar','Evolua em desafios progressivos sem se sobrecarregar.'],
        ['11','Metas de 90 Dias','Leve a disciplina além dos primeiros 30 dias.'],
        ['12','Manifesto Pessoal','Feche a jornada com uma declaração de identidade.']
      ].map(c=>`<article class="chapter-card reveal"><span>${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p></article>`).join('')}
    </div>
  </div></section>`;

  const video=`
  <section id="video" class="premium-block"><div class="container video-wrap reveal">
    <div><p class="gold">Apresentação</p><h2>Assista antes de começar.</h2><p class="lead">Conheça a proposta do livro Disciplina em 30 Dias e entenda como o método ajuda a vencer a procrastinação, organizar a rotina e construir constância.</p><div class="actions"><a class="btn" href="${HOTMART_URL}" target="_blank" rel="noopener">Comprar na Hotmart</a><a class="btn alt" href="#ia">Perguntar para a IA</a></div></div>
    <div class="video-box youtube-frame"><iframe width="100%" height="420" src="${YOUTUBE_EMBED_URL}" title="Disciplina em 30 Dias" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  </div></section>`;

  const premium=`
  <section id="premium" class="premium-block dark"><div class="container">
    <div class="head reveal"><p class="gold">Experiência premium</p><h2>Mais do que um livro: um ponto de virada.</h2></div>
    <div class="premium-grid">
      <article class="premium-card reveal"><b data-count="30">0</b><span>dias de jornada prática</span></article>
      <article class="premium-card reveal"><b data-count="12">0</b><span>capítulos estruturados</span></article>
      <article class="premium-card reveal"><b data-count="90">0</b><span>dias para continuar evoluindo</span></article>
      <article class="premium-card reveal"><b data-count="100">0</b><span>% foco em aplicação real</span></article>
    </div>
  </div></section>`;

  const carousel=`
  <section id="carrossel-depoimentos" class="premium-block"><div class="container">
    <div class="head reveal"><p class="gold">Depoimentos</p><h2>O que o método desperta no leitor.</h2></div>
    <div class="premium-carousel reveal" data-carousel>
      <button class="car-btn" data-prev type="button">‹</button>
      <div class="car-track">
        <article class="car-item active"><p>“O livro me ajudou a perceber que disciplina não é rigidez, é direção.”</p><small>Leitor Disciplina Total</small></article>
        <article class="car-item"><p>“Comecei pequeno, mas parei de esperar motivação para agir.”</p><small>Rotina e constância</small></article>
        <article class="car-item"><p>“A parte dos blocos de foco mudou minha forma de trabalhar.”</p><small>Foco profundo</small></article>
      </div>
      <button class="car-btn" data-next type="button">›</button>
    </div>
  </div></section>`;

  const club=`
  <section id="hotmart-club" class="premium-block dark"><div class="container club-box reveal">
    <div><p class="gold">Área de membros</p><h2>Acesse pelo Hotmart Club.</h2><p class="lead">Após a compra, o acesso é liberado conforme confirmação da Hotmart. Entre pelo clube oficial do Disciplina Total.</p></div>
    <a class="btn" href="${HOTMART_URL}" target="_blank" rel="noopener">Acessar Hotmart Club</a>
  </div></section>`;

  const smartFaq=`
  <section id="faq-inteligente" class="premium-block"><div class="container smart-faq reveal">
    <div><p class="gold">FAQ inteligente</p><h2>Não achou sua dúvida?</h2><p>Use o chat da página. A IA responde com base no conteúdo do livro e ajuda você a entender qual capítulo se conecta com sua dificuldade.</p></div>
    <div class="faq-actions"><button class="btn alt" data-ask="Esse livro serve para quem procrastina muito?" type="button">Procrastinação</button><button class="btn alt" data-ask="Como o livro ajuda com foco e celular?" type="button">Foco e celular</button><button class="btn alt" data-ask="O que eu faço se não consigo manter rotina?" type="button">Rotina</button></div>
  </div></section>`;

  comprar.insertAdjacentHTML('beforebegin',premium+chapters+video+carousel+club+smartFaq);
}

function initCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=parseInt(el.dataset.count,10)||0;
    let current=0;
    const step=Math.max(1,Math.ceil(target/40));
    const timer=setInterval(()=>{
      current+=step;
      if(current>=target){current=target;clearInterval(timer)}
      el.textContent=current;
    },28);
  });
}

function initCarousel(){
  const items=[...document.querySelectorAll('.car-item')];
  if(!items.length)return;
  let i=0;
  const show=n=>{items.forEach(x=>x.classList.remove('active'));items[n].classList.add('active')};
  document.querySelector('[data-next]')?.addEventListener('click',()=>{i=(i+1)%items.length;show(i)});
  document.querySelector('[data-prev]')?.addEventListener('click',()=>{i=(i-1+items.length)%items.length;show(i)});
  setInterval(()=>{i=(i+1)%items.length;show(i)},5200);
}

function initSmartFaq(){
  document.querySelectorAll('[data-ask]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const input=document.querySelector('[data-chat-input]');
      const target=document.querySelector('#ia');
      if(input){input.value=btn.dataset.ask;target?.scrollIntoView({behavior:'smooth'});setTimeout(()=>input.focus(),500)}
    });
  });
}

ensureFloatingButtons();
injectPremiumSections();
initCounters();
initCarousel();
initSmartFaq();

const revealItems=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('on')}})},{threshold:.14});
revealItems.forEach(item=>observer.observe(item));

const chatLog=document.querySelector('[data-chat-log]');
const chatInput=document.querySelector('[data-chat-input]');
const chatBtn=document.querySelector('[data-chat-button]');
let chatHistory=[];

function addBubble(text,type){
  if(!chatLog)return;
  const div=document.createElement('div');
  div.className='bubble '+type;
  div.textContent=text;
  chatLog.appendChild(div);
  chatLog.scrollTop=chatLog.scrollHeight;
  return div;
}

async function askAI(message){
  const response=await fetch(CHAT_WORKER_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history:chatHistory.slice(-8)})});
  if(!response.ok)throw new Error('Erro no Worker');
  const data=await response.json();
  return data.reply||'Não consegui responder agora. Tente novamente.';
}

async function sendQuestion(){
  if(!chatInput)return;
  const text=chatInput.value.trim();
  if(!text)return;
  addBubble(text,'user');
  chatHistory.push({role:'user',content:text});
  chatInput.value='';
  if(chatBtn)chatBtn.disabled=true;
  const loading=addBubble('Digitando...','bot');
  try{
    const reply=await askAI(text);
    loading.textContent=reply;
    chatHistory.push({role:'assistant',content:reply});
  }catch(error){loading.textContent='Tive uma instabilidade agora. Tente novamente em alguns segundos.'}
  finally{if(chatBtn)chatBtn.disabled=false;if(chatInput)chatInput.focus()}
}

if(chatBtn)chatBtn.addEventListener('click',sendQuestion);
if(chatInput)chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')sendQuestion()});
const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();