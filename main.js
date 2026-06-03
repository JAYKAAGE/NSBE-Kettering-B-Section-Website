/* ══════════════════════════════════════════════════
   NSBE B-Section · Kettering University
   main.js — shared across all pages
══════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .nl-card, .res-card, .officer-tile, .home-link-card, .cal-day:not(.empty)').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '18px'; cur.style.height = '18px';
    ring.style.width = '52px'; ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '10px'; cur.style.height = '10px';
    ring.style.width = '36px'; ring.style.height = '36px';
  });
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.stat-item, .officer-tile, .nl-card, .res-card, .home-link-card').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

/* ── ACTIVE NAV LINK ── */
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
