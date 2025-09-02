/* =======================
   Utilities
   ======================= */
// Flowboat button expand/collapse
document.addEventListener('DOMContentLoaded', function() {
  // Skills View More/Show Less
  const skillsMoreBtn = document.getElementById('skillsMoreBtn');
  const skillsMoreLabel = document.getElementById('skillsMoreLabel');
  const extraSkills = document.querySelectorAll('.extra-skill');
  let skillsExpanded = false;
  if (skillsMoreBtn && skillsMoreLabel && extraSkills.length) {
    skillsMoreBtn.addEventListener('click', function() {
      skillsExpanded = !skillsExpanded;
      extraSkills.forEach(el => {
        el.style.display = skillsExpanded ? '' : 'none';
      });
      skillsMoreLabel.textContent = skillsExpanded ? 'Show Less' : 'View More';
      skillsMoreBtn.classList.toggle('is-pressed', skillsExpanded);
    });
  }
  // Kumon button
  const kumonBtn = document.getElementById('kumonBtn');
  const kumonMsg = document.getElementById('kumonApply');
  if (kumonBtn && kumonMsg) {
    kumonBtn.addEventListener('mouseenter', function() {
      kumonBtn.style.width = 'auto';
      kumonBtn.style.paddingLeft = '12px';
      kumonBtn.style.paddingRight = '12px';
      kumonMsg.style.display = 'inline';
      kumonMsg.style.opacity = '1';
    });
    kumonBtn.addEventListener('mouseleave', function() {
      kumonBtn.style.width = '36px';
      kumonBtn.style.paddingLeft = '';
      kumonBtn.style.paddingRight = '';
      kumonMsg.style.display = 'none';
      kumonMsg.style.opacity = '0';
    });
    kumonBtn.addEventListener('click', function(e) {
      window.open('https://www.kumon.com/Kitchener-Max-Becker-Fischer-Hallman', '_blank');
    });
  }
  const btn = document.getElementById('flowboatBtn');
  const msg = document.getElementById('flowboatApply');
  if (btn && msg) {
    btn.addEventListener('mouseenter', function() {
      btn.style.width = 'auto';
      btn.style.paddingLeft = '12px';
      btn.style.paddingRight = '12px';
      msg.style.display = 'inline';
      msg.style.opacity = '1';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.width = '36px';
      btn.style.paddingLeft = '';
      btn.style.paddingRight = '';
      msg.style.display = 'none';
      msg.style.opacity = '0';
    });
    btn.addEventListener('click', function(e) {
      window.open('https://flowboat.ca', '_blank');
    });
  }

  // SkilledStack button
  const ssBtn = document.getElementById('skilledstackBtn');
  const ssMsg = document.getElementById('skilledstackApply');
  if (ssBtn && ssMsg) {
    ssBtn.addEventListener('mouseenter', function() {
      ssBtn.style.width = 'auto';
      ssBtn.style.paddingLeft = '12px';
      ssBtn.style.paddingRight = '12px';
      ssMsg.style.display = 'inline';
      ssMsg.style.opacity = '1';
    });
    ssBtn.addEventListener('mouseleave', function() {
      ssBtn.style.width = '36px';
      ssBtn.style.paddingLeft = '';
      ssBtn.style.paddingRight = '';
      ssMsg.style.display = 'none';
      ssMsg.style.opacity = '0';
    });
    ssBtn.addEventListener('click', function(e) {
  window.open('https://skilledstack.ca', '_blank');
    });
  }
});
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* =======================
   Theme Toggle (CSS variables)
   ======================= */
(function themeInit() {
  const root = document.documentElement;
  const metaTheme = $('#meta-theme-color');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    root.setAttribute('data-theme', saved);
  }
  const current = root.getAttribute('data-theme') || 'light';
  metaTheme.setAttribute('content', current === 'dark' ? '#1e1e1e' : '#e0e0e0');

  $('#themeToggle')?.addEventListener('click', () => {
    const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', now);
    localStorage.setItem('theme', now);
    metaTheme.setAttribute('content', now === 'dark' ? '#1e1e1e' : '#e0e0e0');
    // Press feedback
    $('#themeToggle').classList.add('is-pressed');
    setTimeout(() => $('#themeToggle').classList.remove('is-pressed'), 120);
  });
})();

/* =======================
   Sticky Nav Active Link
   ======================= */
(function navActiveInit() {
  const links = $$('.nav-link');
  const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = links.find(a => a.getAttribute('href') === id);
      if (!link) return;

      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  sections.forEach(sec => obs.observe(sec));
})();

/* =======================
   Role Morphing (hero)
   ======================= */
(function roleRotator() {
  const roles = ['Student', 'Future Engineer', 'Maker'];
  const el = $('#roleCurrent');
  if (!el) return;

  let i = 0;
  setInterval(() => {
    const next = roles[(i + 1) % roles.length];
    // Animate out current
    el.classList.remove('role-enter');
    el.classList.add('role-exit');
    const outEl = el;

    // Create incoming node
    const incoming = document.createElement('span');
    incoming.id = 'roleCurrent';
    incoming.className = 'role role-enter';
    incoming.textContent = next;
    el.parentElement.appendChild(incoming);

    // Remove old node after animation
    setTimeout(() => outEl.remove(), 450);

    i = (i + 1) % roles.length;
  }, 2200);
})();

/* =======================
   Scroll Reveal Animations
   ======================= */
(function revealInit() {
  const toReveal = $$('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  toReveal.forEach(el => obs.observe(el));
})();

/* =======================
   Tilt / Depth on Project Cards
   ======================= */
(function tiltInit() {
  const cards = $$('.tilt');
  const MAX_ROT = 6; // degrees
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rx = (-dy * MAX_ROT).toFixed(2);
      const ry = (dx * MAX_ROT).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* =======================
   Press Feedback Helper
   ======================= */
(function pressInit() {
  $$( '[data-press]' ).forEach(el => {
    el.addEventListener('mousedown', () => el.classList.add('is-pressed'));
    ['mouseup','mouseleave','blur'].forEach(evt => el.addEventListener(evt, () => el.classList.remove('is-pressed')));
    el.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') el.classList.add('is-pressed');
    });
    el.addEventListener('keyup', () => el.classList.remove('is-pressed'));
  });
})();

/* =======================
   Contact Form (demo)
   ======================= */
(function contactForm() {
  const form = $('#contactForm');
  const status = $('#formStatus');
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name')?.toString().trim();
    const email = fd.get('email')?.toString().trim();
    const msg = fd.get('message')?.toString().trim();

    if (!name || !email || !msg) {
      status.textContent = 'Please fill in all fields.';
      return;
    }
    // Replace with your backend; this is a demo ack.
    status.textContent = 'Thanks! Your message has been noted (demo).';
    form.reset();
  });
})();


/* =======================
   Resume download progress
   ======================= */
(function resumeDownloadInit() {
  const btn = document.querySelector('.resume-download');
  if (!btn) return;

  const href = btn.getAttribute('href');
  const shouldDownload = btn.hasAttribute('download');

  btn.addEventListener('click', (e) => {
    // If no file yet, just play the animation without navigation
    e.preventDefault();

    // Respect reduced motion: no animation, just download/view
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      if (href) {
        if (shouldDownload) {
          const a = document.createElement('a');
          a.href = href;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          window.open(href, '_blank', 'noopener');
        }
      }
      return;
    }

    // Already ran? (prevent double-click spam)
    if (btn.classList.contains('is-loading')) return;

    btn.classList.add('is-loading'); // start progress fill

    // Simulate a short “download”
    const DURATION = 1200; // ms
    setTimeout(() => {
      btn.classList.remove('is-loading');
      btn.classList.add('is-done');

      // Trigger the real thing
      if (href) {
        if (shouldDownload) {
          const a = document.createElement('a');
          a.href = href;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          window.open(href, '_blank', 'noopener');
        }
      }

      // Reset back to normal after a moment
      setTimeout(() => {
        btn.classList.remove('is-done');
      }, 1400);
    }, DURATION);
  });
})();

/* =======================
   "Right now I am probably…" rotator
   ======================= */
(function statusRotatorInit() {
  const rotator = document.querySelector('#status .status-rotator');
  const filterWrap = document.querySelector('#status .status-filter');
  if (!rotator || !filterWrap) return;

  // Phrase sets
  const phrases = {
    pro: [
      'debugging code',
      'building my next project',
      'learning something new',
      'thinking about software engineering',
      'tinkering with AI ideas',
    ],
    student: [
      'studying for exams',
      'helping a friend with math',
      'procrastinating (but productively)',
      'dreaming about Waterloo Engineering',
      'fixing my sleep schedule (again)',
    ],
    humor: [
      'breaking my own code',
      'Googling Stack Overflow solutions',
      'on my 3rd cup of coffee',
      'making my website look 1% cooler',
      'trying to convince my dad MacBooks are worth it',
    ],
    techfun: [
      'hacking on a side project',
      'designing futuristic UIs',
      'optimizing for 0.01s faster load time',
      'battling merge conflicts',
      'dreaming in JavaScript',
    ],
  };

  const all = [...phrases.pro, ...phrases.student, ...phrases.humor, ...phrases.techfun];

  let pool = shuffle(all.slice());
  let idx = 0;
  let timer = null;
  const INTERVAL = 2000; // ms between swaps
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function setPhrase(nextText, animate = true) {
    const current = rotator.querySelector('.status-phrase');
    const next = document.createElement('span');
    next.className = 'status-phrase role' + (animate && !reduced ? ' role-enter' : '');
    next.textContent = nextText;

    if (current && animate && !reduced) {
      current.classList.remove('role-enter');
      current.classList.add('role-exit');
      // Remove exiting node after animation
      current.addEventListener('animationend', () => current.remove(), { once: true });
    } else if (current) {
      current.remove();
    }

    rotator.appendChild(next);
  }

  function nextPhrase(animate = true) {
    if (!pool.length) pool = shuffle(all.slice());
    const phrase = pool[idx % pool.length];
    idx++;
    setPhrase(phrase, animate);
  }

  function start() {
    stop();
    // Show immediately, then rotate
    nextPhrase(false);
    if (!reduced) {
      timer = setInterval(nextPhrase, INTERVAL);
    }
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Filter handling
  filterWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;

    // active state
    filterWrap.querySelectorAll('.seg-btn').forEach(b => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    });

    // pick pool
    const cat = btn.dataset.category;
    switch (cat) {
      case 'pro': pool = shuffle(phrases.pro.slice()); break;
      case 'student': pool = shuffle(phrases.student.slice()); break;
      case 'humor': pool = shuffle(phrases.humor.slice()); break;
      case 'techfun': pool = shuffle(phrases.techfun.slice()); break;
      default: pool = shuffle(all.slice()); break;
    }
    idx = 0;
    nextPhrase(false); // swap immediately
  });

  // Lifecycle
  start();
  // Optional: pause on tab hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
})();

// keep the CSS ellipsis bounce in sync with the phrase interval
document.documentElement.style.setProperty('--status-interval', INTERVAL + 'ms');
