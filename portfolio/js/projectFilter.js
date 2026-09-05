// projectFilter.js — toggles visibility of rendered .project-card elements
// by category. Assumes renderProjects() has already populated the grid.

export function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('projectsGrid');
  if (!buttons.length || !grid) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      grid.querySelectorAll('.project-card').forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('project-card--hidden', !matches);
      });
    });
  });
}
