// Royal Journey Travels — Interactions
(function(){
  // Loader
  window.addEventListener('load',()=>{
    const l=document.getElementById('loader');
    if(l){setTimeout(()=>l.classList.add('hide'),400)}
  });

  // Navbar scroll
  const nav=document.querySelector('.navbar');
  const onScroll=()=>{
    if(window.scrollY>40)nav&&nav.classList.add('scrolled');
    else nav&&nav.classList.remove('scrolled');
    const top=document.getElementById('toTop');
    if(top){window.scrollY>400?top.classList.add('show'):top.classList.remove('show');}
  };
  window.addEventListener('scroll',onScroll);onScroll();

  // Back to top
  const top=document.getElementById('toTop');
  if(top)top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Reveal on scroll
  const reveals=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});
  reveals.forEach(r=>io.observe(r));

  // Counters
  const counters=document.querySelectorAll('[data-counter]');
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target;const target=+el.dataset.counter;let n=0;
    const step=Math.max(1,Math.floor(target/60));
    const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t)}el.textContent=n.toLocaleString()},25);
    cio.unobserve(el);
  }),{threshold:.4});
  counters.forEach(c=>cio.observe(c));

  // Active nav link
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.navbar .nav-link').forEach(a=>{
    const href=(a.getAttribute('href')||'').toLowerCase();
    if(href===page||(page===''&&href==='index.html'))a.classList.add('active');
  });

  // Filter (destinations / packages)
  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const btns=group.querySelectorAll('.filter-btn');
    const items=document.querySelectorAll(group.dataset.target+' [data-cat]');
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');
      const f=b.dataset.filter;
      items.forEach(it=>{
        const show=f==='all'||it.dataset.cat.includes(f);
        it.style.display=show?'':'none';
      });
    }));
  });

  // Search filter
  document.querySelectorAll('[data-search]').forEach(input=>{
    input.addEventListener('input',()=>{
      const q=input.value.trim().toLowerCase();
      document.querySelectorAll(input.dataset.search+' [data-name]').forEach(el=>{
        el.style.display=el.dataset.name.toLowerCase().includes(q)?'':'none';
      });
    });
  });

  // Lightbox
  const lb=document.getElementById('lightbox');
  document.querySelectorAll('.gallery-item img').forEach(img=>{
    img.addEventListener('click',()=>{
      if(!lb)return;
      lb.querySelector('img').src=img.src;
      lb.classList.add('show');
    });
  });
  if(lb){lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('close'))lb.classList.remove('show');});}

  // Booking form
  const bf=document.getElementById('bookingForm');
  if(bf){
    const price=document.getElementById('priceEstimate');
    const calc=()=>{
      const people=+bf.people.value||0;
      const dest=bf.destination.value;
      const base={maldives:1800,dubai:1200,switzerland:2200,bali:1100,paris:1500,thailand:900,singapore:1300,goa:600}[dest]||1000;
      if(price)price.textContent='$'+(base*people).toLocaleString();
    };
    bf.addEventListener('input',calc);calc();
    bf.addEventListener('submit',e=>{
      e.preventDefault();
      if(!bf.checkValidity()){bf.classList.add('was-validated');return;}
      const t=document.getElementById('successToast');
      if(t){new bootstrap.Toast(t).show();}
      bf.reset();bf.classList.remove('was-validated');calc();
    });
  }

  // Contact form
  const cf=document.getElementById('contactForm');
  if(cf){
    cf.addEventListener('submit',e=>{
      e.preventDefault();
      if(!cf.checkValidity()){cf.classList.add('was-validated');return;}
      const t=document.getElementById('successToast');
      if(t)new bootstrap.Toast(t).show();
      cf.reset();cf.classList.remove('was-validated');
    });
  }

  // Newsletter
  document.querySelectorAll('.newsletter form, #footerNewsletter').forEach(f=>{
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const email=f.querySelector('input[type=email]').value;
      if(!email)return;
      const t=document.getElementById('successToast');
      if(t){t.querySelector('.toast-body').textContent='Subscribed: '+email;new bootstrap.Toast(t).show();}
      f.reset();
    });
  });

  // FAQ search
  const fs=document.getElementById('faqSearch');
  if(fs){
    fs.addEventListener('input',()=>{
      const q=fs.value.toLowerCase();
      document.querySelectorAll('#faqList .accordion-item').forEach(it=>{
        it.style.display=it.textContent.toLowerCase().includes(q)?'':'none';
      });
    });
  }

  // Footer year
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
