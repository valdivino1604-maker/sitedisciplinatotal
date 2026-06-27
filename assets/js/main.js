const CHAT_WORKER_URL='https://chatdisci.valdivino1604.workers.dev/';
const HOTMART_URL='https://hotmart.com/pt-br/club/disciplinatotal';

// Reaplicado no repositório valdivino1604-maker/sitedisciplinatotal
// Atualiza todos os links antigos da Hotmart para o novo clube Disciplina Total
const oldHotmartLinks=['https://go.hotmart.com/C106276938L','https://go.hotmart.com/B106269096A','https://app.hotmart.com/'];
document.querySelectorAll('a[href]').forEach(link=>{
  const href=link.getAttribute('href')||'';
  if(oldHotmartLinks.includes(link.href)||oldHotmartLinks.includes(href)||href.includes('go.hotmart.com')||href.includes('app.hotmart.com')){
    link.href=HOTMART_URL;
    link.target='_blank';
    link.rel='noopener';
  }
});

// Garante o botão flutuante de compra, mesmo que o HTML antigo não carregue corretamente
let floatBuy=document.querySelector('.float-buy');
if(!floatBuy){
  floatBuy=document.createElement('a');
  floatBuy.className='float-buy btn';
  document.body.appendChild(floatBuy);
}
floatBuy.href=HOTMART_URL;
floatBuy.target='_blank';
floatBuy.rel='noopener';
floatBuy.setAttribute('aria-label','Comprar na Hotmart');
floatBuy.textContent='Comprar agora';

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
  const response=await fetch(CHAT_WORKER_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({message,history:chatHistory.slice(-8)})
  });
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
  }catch(error){
    loading.textContent='Tive uma instabilidade agora. Tente novamente em alguns segundos.';
  }finally{
    if(chatBtn)chatBtn.disabled=false;
    if(chatInput)chatInput.focus();
  }
}

if(chatBtn)chatBtn.addEventListener('click',sendQuestion);
if(chatInput)chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')sendQuestion()});
const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();