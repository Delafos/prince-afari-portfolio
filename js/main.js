/* ── Theme toggle ─────────────────────────── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const themeKnob = document.getElementById('themeKnob');

// Load saved preference
const saved = localStorage.getItem('pa-theme') || 'dark';
html.setAttribute('data-theme', saved);
themeKnob.textContent = saved === 'dark' ? '☀️' : '🌙';

themeBtn.addEventListener('click', () => {
  const cur = html.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeKnob.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('pa-theme', next);
});

/* ── Mobile nav ───────────────────────────── */
function toggleMenu() {
  document.getElementById('mobNav').classList.toggle('open');
}

/* ── Scroll reveal ───────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── Skill bars ──────────────────────────── */
const skillsEl = document.getElementById('skillsLeft');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(b => b.classList.add('on'));
    }
  });
}, { threshold: 0.2 });
if (skillsEl) skillObs.observe(skillsEl);

/* ── Active nav pill on scroll ───────────── */
const secs = document.querySelectorAll('section[id]');
const pills = document.querySelectorAll('.nav-pill');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  pills.forEach(p => {
    p.classList.toggle('active', p.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

/* ── Contact form ────────────────────────── */
function handleSend(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-send');
  
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#22c55e';
    btn.style.opacity = '1';
    
    setTimeout(() => {
      e.target.submit();
    }, 1500);

  }, 1000);
}
