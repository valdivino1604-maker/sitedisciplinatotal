const CHAT_WORKER_URL='https://chatdisci.valdivino1604.workers.dev/';
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