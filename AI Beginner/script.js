const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearTarget = document.querySelector('#year');
const presentationToggle = document.querySelector('#presentation-toggle');
const themeToggle = document.querySelector('#theme-toggle');
const printBriefing = document.querySelector('#print-briefing');
const cookieBanner = document.querySelector('#cookie-banner');
const cookieAccept = document.querySelector('#cookie-accept');
const cookieReject = document.querySelector('#cookie-reject');

const PRESENTATION_KEY = 'atellica-presentation-mode';
const THEME_KEY = 'atellica-dark-stage';
const COOKIE_KEY = 'atellica-cookie-consent';

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

if (printBriefing) {
  printBriefing.addEventListener('click', () => {
    window.print();
  });
}

const initAnalyticsPlaceholder = () => {
  if (window.__atellicaAnalyticsInitialized) {
    return;
  }

  window.__atellicaAnalyticsInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.trackEvent = (eventName, payload = {}) => {
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...payload,
    });
  };

  window.trackEvent('analytics_initialized', { source: 'cookie_consent' });
};

const applyCookieConsent = (consentState) => {
  if (consentState === 'accepted') {
    initAnalyticsPlaceholder();
  }

  if (cookieBanner) {
    const shouldHide = consentState === 'accepted' || consentState === 'rejected';
    cookieBanner.classList.toggle('hidden', shouldHide);
  }
};

if (cookieBanner && cookieAccept && cookieReject) {
  const savedConsent = localStorage.getItem(COOKIE_KEY);
  applyCookieConsent(savedConsent);

  cookieAccept.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    applyCookieConsent('accepted');
  });

  cookieReject.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'rejected');
    applyCookieConsent('rejected');
  });
}
