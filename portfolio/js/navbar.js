// navbar.js — sticky scroll shadow, mobile menu, active-section highlighting

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const toggleIcon = toggle?.querySelector('use');

  if (!navbar || !toggle || !links) return;

  // Sticky shadow once the page has scrolled a little
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu open/close
  const closeMenu = () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (toggleIcon) toggleIcon.setAttribute('href', 'assets/icons/sprite.svg#icon-menu');
  };

  const openMenu = () => {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (toggleIcon) toggleIcon.setAttribute('href', 'assets/icons/sprite.svg#icon-close');
  };

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close mobile menu after choosing a link
  links.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('use');

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('data-state', theme);
    }
    if (themeIcon) {
      themeIcon.setAttribute('href', theme === 'dark' ? 'assets/icons/sprite.svg#icon-sun' : 'assets/icons/sprite.svg#icon-moon');
    }
  };

  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme || 'dark';
  setTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', currentTheme);
    setTheme(currentTheme);
  });

  // Collapse mobile menu if the viewport grows back to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMenu();
  });

  // Active-section highlighting
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinkFor = (id) => links.querySelector(`.navbar__link[href="#${id}"]`);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinkFor(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            links.querySelectorAll('.navbar__link').forEach((l) => l.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
