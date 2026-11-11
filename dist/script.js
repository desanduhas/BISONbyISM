const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const dialog = document.querySelector('#product-dialog');

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
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

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
