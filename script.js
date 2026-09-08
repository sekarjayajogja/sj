const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const menu = $('.menu-toggle');
const navLinks = $('.nav-links');
menu?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Hero slider
const slides = $$('.slide');
const dots = $$('.dot');
let current = 0;
let timer;

function showSlide(index){
  current = (index + slides.length) % slides.length;
  slides.forEach((s,i)=>s.classList.toggle('active', i===current));
  dots.forEach((d,i)=>d.classList.toggle('active', i===current));
}
function startSlider(){
  clearInterval(timer);
  timer = setInterval(()=>showSlide(current+1), 6000);
}
$('.prev')?.addEventListener('click', ()=>{showSlide(current-1);startSlider()});
$('.next')?.addEventListener('click', ()=>{showSlide(current+1);startSlider()});
dots.forEach(d=>d.addEventListener('click',()=>{showSlide(Number(d.dataset.slide));startSlider()}));
startSlider();

// Product filter
const filters = $$('.filter');
const cards = $$('.product-card');
filters.forEach(btn => btn.addEventListener('click', ()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  cards.forEach(card=>{
    card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
  });
}));

// Active navigation based on section in view
const navItems = $$('.nav-links a[href^="#"]');
const sections = $$('main section[id]');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navItems.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#'+entry.target.id));
    }
  });
},{rootMargin:'-40% 0px -50% 0px',threshold:0});
sections.forEach(s=>observer.observe(s));

$('#year').textContent = new Date().getFullYear();
