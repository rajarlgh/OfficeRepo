const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearTarget = document.querySelector('#year');
const presentationToggle = document.querySelector('#presentation-toggle');
const themeToggle = document.querySelector('#theme-toggle');

const PRESENTATION_KEY = 'atellica-presentation-mode';
const THEME_KEY = 'atellica-dark-stage';

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (presentationToggle) {
  const applyPresentationState = (isEnabled) => {
    document.body.classList.toggle('presentation-mode', isEnabled);
    presentationToggle.setAttribute('aria-pressed', String(isEnabled));
  };

  const isSavedEnabled = localStorage.getItem(PRESENTATION_KEY) === 'true';
  applyPresentationState(isSavedEnabled);

  presentationToggle.addEventListener('click', () => {
    const nextState = !document.body.classList.contains('presentation-mode');
    applyPresentationState(nextState);
    localStorage.setItem(PRESENTATION_KEY, String(nextState));
  });
}

if (themeToggle) {
  const applyThemeState = (isEnabled) => {
    document.body.classList.toggle('dark-stage', isEnabled);
    themeToggle.setAttribute('aria-pressed', String(isEnabled));
  };

  const isThemeEnabled = localStorage.getItem(THEME_KEY) === 'true';
  applyThemeState(isThemeEnabled);

  themeToggle.addEventListener('click', () => {
    const nextState = !document.body.classList.contains('dark-stage');
    applyThemeState(nextState);
    localStorage.setItem(THEME_KEY, String(nextState));
  });
}
