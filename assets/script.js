document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalImages = document.getElementById('modalImages');
  const modalImgs = modalImages.querySelectorAll('img');
  const close = document.getElementById('closeModal');

  document.querySelectorAll('.project-card button').forEach(btn => {
    btn.addEventListener('click', () => {
      modalTitle.textContent = btn.dataset.title || 'Project';
      modalDesc.textContent = btn.dataset.desc || '';

      let hasImages = false;

      modalImgs.forEach((img, i) => {
        const key = `img${i + 1}`;
        if (btn.dataset[key]) {
          img.src = btn.dataset[key];
          img.style.display = 'block';
          hasImages = true;
        } else {
          img.src = '';
          img.style.display = 'none';
        }
      });

      modalImages.style.display = hasImages ? 'grid' : 'none';
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // Close button
  close.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  // Click outside modal-content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // ESC key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      modal.setAttribute('aria-hidden', 'true');
    }
  });



  // Certificate modal
  const certModal = document.getElementById('certModal');
  const certImage = document.getElementById('certImage');
  const closeCertModal = document.getElementById('closeCertModal');
  document.querySelectorAll('.cert-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const certSrc = card.dataset.cert;
      certImage.src = certSrc;
      certModal.setAttribute('aria-hidden','false');
    })
  })
  closeCertModal.addEventListener('click', ()=> certModal.setAttribute('aria-hidden','true'));
  certModal.addEventListener('click', (e)=>{ if(e.target===certModal) certModal.setAttribute('aria-hidden','true'); })

  // Theme toggle (persisted)
  const themeToggleHero = document.getElementById('themeToggle');
  const themeToggleNav = document.getElementById('themeToggleNav');
  const doc = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const defaultTheme = savedTheme || 'dark';
  doc.setAttribute('data-theme', defaultTheme);
  if(themeToggleHero) themeToggleHero.setAttribute('aria-pressed', defaultTheme === 'dark');
  if(themeToggleNav) themeToggleNav.setAttribute('aria-pressed', defaultTheme === 'dark');

  function setTheme(theme){
    doc.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if(themeToggleHero) themeToggleHero.setAttribute('aria-pressed', theme === 'dark');
    if(themeToggleNav) themeToggleNav.setAttribute('aria-pressed', theme === 'dark');
  }

  const toggleTheme = ()=>{
    const current = doc.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  };

  if(themeToggleHero) themeToggleHero.addEventListener('click', toggleTheme);
  if(themeToggleNav) themeToggleNav.addEventListener('click', toggleTheme);

  // Navigation toggle (mobile)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.classList.toggle('open', open);
    })
    // close on link click
    navLinks.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{ navLinks.classList.remove('open'); navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }));
  }

  // Active link on scroll
  const sectionEls = Array.from(document.querySelectorAll('header, section'));
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
  const sectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const id = e.target.id || 'hero';
        navAnchors.forEach(a=>{
          const href = a.getAttribute('href')||'';
          if(href.includes('#') && href.replace('#','') === id) a.classList.add('active'); else a.classList.remove('active');
        })
      }
    })
  }, {threshold:0.35});
  sectionEls.forEach(s=> sectionObserver.observe(s));

  // Reveal on scroll - alternating directions (observe titles)
  const sections = Array.from(document.querySelectorAll('header, section'));
  const titles = Array.from(document.querySelectorAll('header, section h2'));
  
  sections.forEach((el, idx)=> {
    if(idx % 2 === 0) el.classList.add('reveal');
    if(idx % 2 === 1) el.classList.add('reveal-l');
    else el.classList.add('reveal-r');
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const parent = entry.target.closest('header, section');
        if(parent){
          parent.classList.add('active');
          io.unobserve(entry.target);
        }
      }
    })
  }, {rootMargin: '0px 0px -80px 0px'});

  titles.forEach(el=> io.observe(el));
});
