// scrollProgress.js — fills the fixed top bar as the person scrolls down the page

export function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

    bar.style.width = `${percent}%`;
    bar.setAttribute('aria-valuenow', String(Math.round(percent)));
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
