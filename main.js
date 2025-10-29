/* ========= Défilement fluide sur les liens d’ancre ========= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  });
});

/* ========= Surbrillance du lien actif dans la nav ========= */
(() => {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const links = new Map(
    Array.from(document.querySelectorAll('.navbar-link'))
         .map(l => [l.getAttribute('href'), l])
  );

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const href = `#${entry.target.id}`;
      const link = links.get(href);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.navbar-link.active').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  sections.forEach(s => obs.observe(s));
})();

/* ========= Apparition douce des éléments (reveal-on-scroll) ========= */
(() => {
  const revealables = document.querySelectorAll('.reveal, [data-reveal]');
  if (!revealables.length) return;

  const io = new IntersectionObserver((entries, ob) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        ob.unobserve(e.target); // une seule fois
      }
    });
  }, { threshold: 0.12 });

  revealables.forEach(el => io.observe(el));
})();

/* ========= Bouton “retour en haut” ========= */
(() => {
  let btn = document.getElementById('toTop');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'toTop';
    btn.className = 'to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.textContent = '↑';
    document.body.appendChild(btn);
  }
  const toggle = () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ========= (Option) Tilt léger sur les cartes ========= */
(() => {
  const tiltEls = document.querySelectorAll('.project, .flip'); // ajuste si besoin
  const max = 6; // degrés max

  function handleMove(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * max * 2;
    const ry = (x - 0.5) * max * 2;
    this.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function reset() { this.style.transform = ''; }

  tiltEls.forEach(el => {
    el.style.transition = 'transform .15s ease';
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', reset);
  });
})();

// Formspree async submit + feedback
(() => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        status.textContent = '✅ Message sent successfully!';
      } else {
        status.textContent = '⚠️ Error sending the message. Please try again.';
      }
    } catch (err) {
      status.textContent = '🚫 Network error. Please try later.';
    }
  });
})();
