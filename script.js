// Lightweight scroll animation using IntersectionObserver
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('in-view');
  })
},{threshold:0.15});
document.querySelectorAll('.anim').forEach(n=>io.observe(n));

// Simple page transition effect for internal navigation
const overlay = document.getElementById('page-transition');
document.querySelectorAll('a.nav-link, a.btn').forEach(a=>{
  a.addEventListener('click',(ev)=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      ev.preventDefault();
      overlay.classList.add('active');
      setTimeout(()=>{
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        overlay.classList.remove('active');
      },300);
    } else if(a.target === '_blank'){
      // Let external open normally
    } else {
      // For links to other pages (if any) add a small delay so the overlay is visible
      overlay.classList.add('active');
      // Default behavior will navigate away; keep overlay for 350ms
      setTimeout(()=>{},350);
    }
  })
});

// Simple progressive enhancement: keyboard focus ring
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Tab') document.body.classList.add('show-focus');
});

// Project modal behavior
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalGallery = document.getElementById('modal-gallery');
const modalClose = modal.querySelector('.modal-close');

const projects = {
  wesign:{title:'WeSign', desc:'Capstone project — I served as Document Lead & Front-end developer. Built document UI and signature flows.', images:[]},
  drawing:{title:'Digital Drawings', desc:'Personal drawings collection — work in progress. Will show sketches and finished pieces here.', images:[
    'assets/drawing-01.svg',
    'assets/drawing-02.svg',
    'assets/drawing-03.svg',
    'assets/drawing-04.svg',
    'assets/drawing-05.svg',
    'assets/drawing-06.svg',
    'assets/drawing-07.svg'
  ]}
};

document.querySelectorAll('[data-project]').forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const key = btn.dataset.project;
    const p = projects[key];
    if(!p) return;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalGallery.innerHTML = p.images.map(src=>`<img src="${src}" alt="${p.title} image" />`).join('');
    modal.setAttribute('aria-hidden','false');
  });
});

modalClose.addEventListener('click',()=>modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click',(e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true') });

document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') modal.setAttribute('aria-hidden','true') });
