/* ============================================
   ATELLICA SOLUTION – Main JavaScript
   Interactivity, Animations & Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initFAQ();
  initPricingToggle();
  initContactForm();
  initCounterAnimation();
  initSmoothScroll();
});

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Set active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      // Open clicked if not already active
      if (!isActive) {
        item.classList.add('active');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });
}

/* ---------- Pricing Toggle ---------- */
function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle__switch');
  if (!toggle) return;

  const monthlyLabel = document.querySelector('[data-label="monthly"]');
  const annualLabel = document.querySelector('[data-label="annual"]');
  const prices = document.querySelectorAll('[data-monthly]');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const isAnnual = toggle.classList.contains('active');

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    prices.forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const inputs = form.querySelectorAll('[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--color-error)';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = 'var(--color-success)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });

  // Clear error on input
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
}

/* ---------- Counter Animation ---------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
          const current = Math.floor(eased * target);
          el.textContent = prefix + current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}
