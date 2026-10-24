const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const mainElement = document.querySelector('main');
const headerTitle = document.querySelector('header h2');
const headerRight = document.querySelector('.header-right');
const reloadBtn = document.querySelector('.reload-btn');
const navCloseBtn = document.querySelector('.nav-close');
const header = document.querySelector('header');

let moduleFrameOpen = false;

function updateAnimPaused() {
  document.documentElement.classList.toggle('anim-paused', document.hidden || moduleFrameOpen);
}

document.addEventListener('visibilitychange', updateAnimPaused);

const themes = {
  calmNight: "linear-gradient(45deg, hsl(240deg 100% 20%) 6%, hsl(281deg 100% 21%) 21%, hsl(304deg 100% 23%) 32%, hsl(319deg 100% 30%) 41%, hsl(329deg 100% 36%) 49%, hsl(336deg 100% 41%) 57%, hsl(346deg 83% 51%) 64%, hsl(3deg 95% 61%) 71%, hsl(17deg 100% 59%) 77%, hsl(30deg 100% 55%) 83%, hsl(40deg 100% 50%) 89%, hsl(48deg 100% 50%) 95%, hsl(55deg 100% 50%) 100%)",
  calmSunset: "linear-gradient(-110deg, #581707, #445f64, #4d7e7e)",
  darkForest: "linear-gradient(150deg, hsl(0deg 89% 50%) 0%, hsl(16deg 100% 45%) 0%, hsl(24deg 100% 42%) 2%, hsl(32deg 100% 39%) 6%, hsl(39deg 100% 36%) 13%, hsl(48deg 100% 33%) 21%, hsl(58deg 100% 29%) 32%, hsl(69deg 100% 30%) 45%, hsl(79deg 100% 31%) 59%, hsl(97deg 62% 40%) 75%, hsl(123deg 47% 46%) 89%, hsl(149deg 84% 38%) 100%)",
  mistyDawn: "linear-gradient(-25deg, #153049, #5188aa, #133c3f)",
  urbanSlate: "linear-gradient(-75deg, #1b2229, #858585, #1b2629)",
  deepStorm: "linear-gradient(-25deg, #0f3646, #4d0707, #7d868d)",
  eclipse: "linear-gradient(-9deg, #000000, #000000)"
};

const BW_THEMES = new Set(['eclipse', 'darkForest', 'deepStorm']);

const translations = {
  ru: {
    quickLinks: "Быстрые ссылки",
    localServer: "Локальный сервер",
    modules: "Модули",
    channel: "Канал",
    chat: "Чат",
    theme: "Тема оформления",
    language: "Язык",
    reload: "Перезагрузить",
    menu: "Меню",
    closeMenu: "Закрыть меню",
    noModules: "Нет модулей",
    serverUnavailable: "Недоступно"
  },
  en: {
    quickLinks: "Quick Links",
    localServer: "Local server",
    modules: "Modules",
    channel: "Channel",
    chat: "Chat",
    theme: "Theme",
    language: "Language",
    reload: "Reload",
    menu: "Menu",
    closeMenu: "Close menu",
    noModules: "No modules",
    serverUnavailable: "Unavailable"
  }
};

function detectDefaultLang() {
  const serverHint = document.querySelector('meta[name="webroot-default-lang"]')?.content;
  if (serverHint && translations[serverHint]) return serverHint;

  const nav = (navigator.language || navigator.userLanguage || 'ru').toLowerCase();
  return nav.startsWith('ru') ? 'ru' : (translations[nav.slice(0, 2)] ? nav.slice(0, 2) : 'en');
}

function applyLanguage(lang) {
  if (!translations[lang]) lang = 'ru';
  const dict = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    if (dict[key]) el.setAttribute('aria-label', dict[key]);
  });

  document.documentElement.lang = lang;
  localStorage.setItem('selectedLang', lang);
  markSelectedLang(lang);
}

function markSelectedLang(lang) {
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.lang === lang);
  });
}

function setTheme(theme) {
  if (!themes[theme]) return;
  document.documentElement.style.setProperty('--background-color', themes[theme]);
  localStorage.setItem('selectedTheme', theme);
  document.body.classList.toggle('black-and-white', BW_THEMES.has(theme));
}

function markSelectedTheme(theme) {
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.toggle('selected', option.dataset.theme === theme);
  });
}

function setMenuOpen(open) {
  mainNav.classList.toggle('show', open);
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  reloadBtn.classList.toggle('hidden', open);
  header.classList.toggle('hidden', open);
  if (mainElement) mainElement.classList.toggle('active', open);
  if (headerTitle) headerTitle.classList.toggle('hidden', open);
  headerRight.classList.toggle('align-right', open);
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const willOpen = !mainNav.classList.contains('show');
    setMenuOpen(willOpen);
  });
}

if (navCloseBtn) {
  navCloseBtn.addEventListener('click', () => setMenuOpen(false));
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme && themes[savedTheme]) {
    setTheme(savedTheme);
    markSelectedTheme(savedTheme);
  }

  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      const selected = option.dataset.theme;
      setTheme(selected);
      markSelectedTheme(selected);
    });
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        option.click();
      }
    });
  });

  const savedLang = localStorage.getItem('selectedLang') || detectDefaultLang();
  applyLanguage(savedLang);

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
});

if (reloadBtn) {
  reloadBtn.addEventListener('click', () => {
    reloadBtn.classList.add('active');
    fetch('reload.sh', { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch(error => {
        console.error('Error:', error.message);
        reloadBtn.classList.remove('active');
      });
  });
}

const WEBROOT_TOKEN = document.querySelector('meta[name="webroot-token"]')?.content || "";

window.runShellFromIframe = function (cmd) {
  return fetch('/api/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth': WEBROOT_TOKEN
    },
    body: 'cmd=' + encodeURIComponent(cmd)
  })
    .then(res => res.json())
    .then(data => {
      if (data.code !== 0) {
        throw new Error(data.stderr || data.stdout || 'exec failed');
      }
      return data.stdout || "";
    });
};

function isModuleUrl(url) {
  try {
    const u = new URL(url, window.location.href);
    return u.host === window.location.host && u.pathname.includes('/webroot/');
  } catch (e) {
    return false;
  }
}

let lastBubblePos = null;

const DRAG_THRESHOLD = 6;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function makeDraggable(el, container) {
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;

    dragging = true;
    moved = false;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    startX = e.clientX;
    startY = e.clientY;
    startLeft = elRect.left - containerRect.left;
    startTop = elRect.top - containerRect.top;

    try { el.setPointerCapture(e.pointerId); } catch (err) {}
    el.classList.add('dragging');
  }

  function onPointerMove(e) {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      moved = true;
    }
    if (!moved) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const maxLeft = containerRect.width - elRect.width;
    const maxTop = containerRect.height - elRect.height;

    const newLeft = clamp(startLeft + dx, 0, Math.max(0, maxLeft));
    const newTop = clamp(startTop + dy, 0, Math.max(0, maxTop));

    el.style.left = newLeft + 'px';
    el.style.top = newTop + 'px';
    el.style.right = 'auto';

    lastBubblePos = { left: newLeft, top: newTop };
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('dragging');
    try { el.releasePointerCapture(e.pointerId); } catch (err) {}

    if (moved) {
      el.dataset.suppressClick = '1';
    }
  }

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointercancel', onPointerUp);
}

function openModuleFrame(url) {
  moduleFrameOpen = true;
  updateAnimPaused();

  const overlay = document.createElement('div');
  overlay.className = 'module-frame-overlay';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'frame-close';
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => {
    if (closeBtn.dataset.suppressClick === '1') {
      closeBtn.dataset.suppressClick = '';
      return;
    }
    overlay.remove();
    moduleFrameOpen = false;
    updateAnimPaused();
  });

  const frame = document.createElement('iframe');
  frame.className = 'module-frame';
  frame.src = url;

  overlay.appendChild(closeBtn);
  overlay.appendChild(frame);
  document.body.appendChild(overlay);

  makeDraggable(closeBtn, overlay);

  if (lastBubblePos) {
    const containerRect = overlay.getBoundingClientRect();
    const elRect = closeBtn.getBoundingClientRect();
    const maxLeft = containerRect.width - elRect.width;
    const maxTop = containerRect.height - elRect.height;
    closeBtn.style.left = clamp(lastBubblePos.left, 0, Math.max(0, maxLeft)) + 'px';
    closeBtn.style.top = clamp(lastBubblePos.top, 0, Math.max(0, maxTop)) + 'px';
    closeBtn.style.right = 'auto';
  }
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const url = card.getAttribute('data-url');

    if (!url || url === '#') return;

    if (isModuleUrl(url)) {
      openModuleFrame(url);
      return;
    }

    if (/^https?:\/\//.test(url)) {
      const sameHost = new URL(url).host === window.location.host;
      if (sameHost) {
        window.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener');
      }
      return;
    }

    window.location.href = url;
  });
});