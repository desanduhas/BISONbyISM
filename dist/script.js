const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const dialog = document.querySelector('#product-dialog');
const splash = document.querySelector('.intro-splash');
const heroArt = document.querySelector('.hero-art');

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
document.body.classList.add('intro-active');

let introFinished = false;
const finishIntro = () => {
  if (introFinished) return;
  introFinished = true;
  splash?.classList.add('is-leaving');
  document.body.classList.remove('intro-active');
  document.documentElement.classList.add('motion-ready');
  window.scrollTo(0, 0);
  setTimeout(() => splash?.remove(), 650);
};

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  finishIntro();
} else {
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    setTimeout(finishIntro, 2050);
  }, { once: true });
  setTimeout(finishIntro, 3600);
}

const products = {
  hollow: {
    title: 'BISON Hollow Block',
    description: 'A practical masonry solution designed to support efficient, quality wall construction.',
    features: ['Low water absorption', 'Uniform shape & smooth finish', 'Thermal & acoustic insulation', 'All-weather resistance', 'Easy handling', 'Cost effective']
  },
  solid: {
    title: 'BISON Solid Block',
    description: 'A dependable masonry solution for residential, commercial, industrial and general construction applications.',
    features: ['Low water absorption', 'Uniform shape & smooth finish', 'Consistent quality', 'Reliable performance', 'Versatile application', 'Cost effective']
  },
  fixer: {
    title: 'BISON Fixer Mortar',
    description: 'A construction-material solution developed for masonry and block-laying applications.',
    features: ['Strong bonding', 'Easy application', 'Consistent workability', 'Efficient construction', 'Reliable quality', 'Interior & exterior use']
  },
  tile: {
    title: 'BISON Tile Mortar',
    description: 'A practical and consistent bonding solution for modern flooring and wall-finishing work.',
    features: ['Strong adhesion', 'Easy application', 'Consistent performance', 'Smooth finish', 'Interior & exterior use', 'Wall & floor tiles']
  }
};

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 90);
  if (heroArt && window.innerWidth > 820) {
    heroArt.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.09, 36)}px`);
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-scroll-top]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
    history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelectorAll('.product-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const product = products[button.dataset.product];
    document.querySelector('#dialog-title').textContent = product.title;
    document.querySelector('#dialog-description').textContent = product.description;
    document.querySelector('#dialog-features').innerHTML = product.features.map(feature => `<span>${feature}</span>`).join('');
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.querySelector('a').addEventListener('click', () => dialog.close());

document.querySelector('#year').textContent = new Date().getFullYear();
