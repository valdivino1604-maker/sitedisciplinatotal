const items=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}})},{threshold:.14});
items.forEach(item=>io.observe(item));
const header=document.querySelector('.topbar');
window.addEventListener('scroll',()=>{header.style.background=window.scrollY>40?'linear-gradient(180deg,rgba(5,5,5,.98),rgba(5,5,5,.78))':'linear-gradient(180deg,rgba(5,5,5,.94),rgba(5,5,5,.58))'});
