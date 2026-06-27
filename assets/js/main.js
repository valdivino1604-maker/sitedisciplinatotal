const CHAT_WORKER_URL='https://chatdisci.valdivino1604.workers.dev/';
const EBOOK_URL='https://go.hotmart.com/B106269096A';
const PHYSICAL_BOOK_URL='https://go.hotmart.com/C106276938L';
const WHATSAPP_URL='https://wa.me/5564981616434?text=Tenho%20interesse%20no%20livro%20Disciplina%20em%2030%20Dias';
const YOUTUBE_EMBED_URL='https://www.youtube.com/embed/fDb03TG9csc';

function injectPremiumStyles(){
  if(document.querySelector('#premium-shop-style'))return;
  const style=document.createElement('style');
  style.id='premium-shop-style';
  style.textContent=`
    .buy-options{display:grid;grid-template-columns:repeat(2,minmax(240px,1fr));gap:16px;margin-top:22px}
    .buy-option{border:1px solid var(--line);border-radius:22px;padding:24px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.025));box-shadow:0 24px 80px rgba(0,0,0,.34)}
    .buy-option strong{display:block;color:var(--gold2);font-size:1.2rem;text-transform:uppercase;margin-bottom:8px}
    .buy-option .price{font-size:2rem;font-weight:950;color:#fff;margin:8px 0 14px}
    .buy-option small{display:block;color:var(--muted);line-height:1.5;margin-bottom:14px}
    .fixed-buy-bar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:90;display:flex;gap:10px;width:min(760px,calc(100vw - 28px));padding:10px;border:1px solid var(--line);border-radius:18px;background:rgba(7,7,7,.94);box-shadow:0 24px 80px rgba(0,0,0,.78);backdrop-filter:blur(12px)}
    .fixed-buy-bar a{flex:1;min-height:50px;padding:0 12px;font-size:.82rem;text-align:center}
    .float-buy{display:none!important}
    .float-whatsapp{position:fixed!important;right:20px!important;bottom:102px!important;z-index:91!important;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:#20b15a;color:white;font-weight:950;font-size:1.4rem;box-shadow:0 18px 45px rgba(0,0,0,.55)}
    .float-insta{position:fixed!important;right:20px!important;bottom:172px!important;z-index:91!important}
    .youtube-frame iframe{border-radius:18px;box-shadow:0 30px 90px rgba(0,0,0,.55)}
    @media(max-width:760px){.buy-options{grid-template-columns:1fr}.fixed-buy-bar{left:10px;right:10px;bottom:12px;transform:none;width:auto}.fixed-buy-bar a{font-size:.72rem;min-height:48px}.float-whatsapp{right:18px!important;bottom:100px!important}.float-insta{right:18px!important;bottom:166px!important}}
  `;
  document.head.appendChild(style);
}

function button(label,url,alt=''){
  return `<a class="btn ${alt}" href="${url}" target="_blank" rel="noopener">${label}</a>`;
}

function twoBuyButtons(){
  return `${button('📘 eBook - R$ 9,99',EBOOK_URL)}${button('📚 Livro Físico - R$ 39,99',PHYSICAL_BOOK_URL,'alt')}`;
}

function replaceOldBuyLinks(){
  document.querySelectorAll('a[href]').forEach(link=>{
    const href=link.getAttribute('href')||'';
    if(href.includes('go.hotmart.com')||href.includes('hotmart.com/pt-br/club/disciplinatotal')||href.includes('app.hotmart.com')){
      if(href.includes('B106269096A')){
        link.href=EBOOK_URL;
        link.textContent='📘 eBook - R$ 9,99';
      }else if(href.includes('C106276938L')){
        link.href=PHYSICAL_BOOK_URL;
        link.textContent='📚 Livro Físico - R$ 39,99';
      }else{
        link.href=EBOOK_URL;
        link.textContent='📘 eBook - R$ 9,99';
      }
      link.target='_blank';
      link.rel='noopener';
    }
  });
}

function ensureHeroTwoOptions(){
  const heroActions=document.querySelector('.hero .actions');
  if(heroActions&&!heroActions.dataset.twoOptions){
    heroActions.innerHTML=twoBuyButtons()+`<a class="btn alt" href="https://www.instagram.com/eng.valdivinojr" target="_blank" rel="noopener">Seguir @eng.valdivinojr</a>`;
    heroActions.dataset.twoOptions='true';
  }

  const buySection=document.querySelector('#comprar .actions');
  if(buySection&&!buySection.dataset.twoOptions){
    buySection.innerHTML=twoBuyButtons();
    buySection.dataset.twoOptions='true';
  }

  document.querySelectorAll('#ia .actions, #instagram .actions').forEach(area=>{
    if(!area.dataset.twoOptions){
      area.innerHTML=twoBuyButtons();
      area.dataset.twoOptions='true';
    }
  });
}

function ensureFloatingButtons(){
  document.querySelectorAll('.float-buy,.float-products').forEach(el=>el.remove());

  let bar=document.querySelector('.fixed-buy-bar');
  if(!bar){
    bar=document.createElement('div');
    bar.className='fixed-buy-bar';
    document.body.appendChild(bar);
  }
  bar.innerHTML=twoBuyButtons();

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

  const shop=`
  <section id="versoes" class="premium-block dark"><div class="container">
    <div class="head reveal"><p class="gold">Escolha sua versão</p><h2>Comece pelo eBook ou tenha o livro físico.</h2><p>Você decide como quer iniciar sua jornada de disciplina.</p></div>
    <div class="buy-options reveal">
      <article class="buy-option"><strong>📘 eBook</strong><div class="price">R$ 9,99</div><small>Acesso digital rápido para começar hoje mesmo.</small><a class="btn" href="${EBOOK_URL}" target="_blank" rel="noopener">Comprar eBook</a></article>
      <article class="buy-option"><strong>📚 Livro Físico</strong><div class="price">R$ 39,99</div><small>Experiência completa para ler, marcar e manter por perto.</small><a class="btn alt" href="${PHYSICAL_BOOK_URL}" target="_blank" rel="noopener">Comprar Livro Físico</a></article>
    </div>
  </div></section>`;

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
    <div><p class="gold">Apresentação</p><h2>Assista antes de começar.</h2><p class="lead">Conheça a proposta do livro Disciplina em 30 Dias e entenda como o método ajuda a vencer a procrastinação, organizar a rotina e construir constância.</p><div class="actions">${twoBuyButtons()}</div></div>
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

  const club=`
  <section id="hotmart-club" class="premium-block dark"><div class="container club-box reveal">
    <div><p class="gold">Área de membros</p><h2>Acesse pela Hotmart.</h2><p class="lead">Escolha entre eBook e livro físico. A liberação acontece conforme confirmação da Hotmart.</p></div>
    <div class="actions">${twoBuyButtons()}</div>
  </div></section>`;

  const smartFaq=`
  <section id="faq-inteligente" class="premium-block"><div class="container smart-faq reveal">
    <div><p class="gold">FAQ inteligente</p><h2>Não achou sua dúvida?</h2><p>Use o chat da página. A IA responde com base no conteúdo do livro e ajuda você a escolher entre eBook e livro físico.</p></div>
    <div class="faq-actions"><button class="btn alt" data-ask="Qual a diferença entre o eBook e o livro físico?" type="button">Versões</button><button class="btn alt" data-ask="Esse livro serve para quem procrastina muito?" type="button">Procrastinação</button><button class="btn alt" data-ask="Como o livro ajuda com foco e celular?" type="button">Foco e celular</button></div>
  </div></section>`;

  comprar.insertAdjacentHTML('beforebegin',premium+shop+chapters+video+club+smartFaq);
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

function initSmartFaq(){
  document.querySelectorAll('[data-ask]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const input=document.querySelector('[data-chat-input]');
      const target=document.querySelector('#ia');
      if(input){input.value=btn.dataset.ask;target?.scrollIntoView({behavior:'smooth'});setTimeout(()=>input.focus(),500)}
    });
  });
}

injectPremiumStyles();
replaceOldBuyLinks();
ensureHeroTwoOptions();
ensureFloatingButtons();
injectPremiumSections();
initCounters();
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