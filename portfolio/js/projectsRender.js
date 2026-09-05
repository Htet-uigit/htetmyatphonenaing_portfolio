// projectsRender.js — loads data/projects.json and renders project cards.
// Kept separate from projectFilter.js: this owns *what's on the page*,
// filtering owns *what's currently shown*.

function assetUrl(path) {
  if (!path || /^https?:\/\//i.test(path)) return path;
  return encodeURI(decodeURI(path));
}

function cardTemplate(project) {
  const tags = project.tags.map((t) => `<li>${t}</li>`).join('');
  const images = project.images?.length ? project.images : [project.image];
  const gallery = images.length > 1
    ? `<div class="project-card__gallery" aria-label="${project.title} images">
        ${images.map((image, index) => `<img class="${index === 0 ? 'project-card__gallery-main' : ''}" src="${image}" alt="${project.title} image ${index + 1}" loading="lazy" width="400" height="250">`).join('')}
      </div>`
    : `<div class="project-card__thumb">
        <img src="${images[0]}" alt="${project.title} preview chart" loading="lazy" width="400" height="250">
      </div>`;

    const links = [
    project.github ? `<a class="btn btn--sm btn--muted" href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="View source code">Code
      <svg class="icon icon--sm" aria-hidden="true"><use href="assets/icons/sprite.svg#icon-code"></use></svg></a>` : '',
    project.demo ? `<a class="btn btn--secondary btn--sm" href="${assetUrl(project.demo)}" target="_blank" rel="noopener noreferrer" aria-label="Open live demo">Live demo
      <svg class="icon icon--sm" aria-hidden="true"><use href="assets/icons/sprite.svg#icon-external"></use></svg></a>` : '',
    project.report ? `<a class="btn btn--secondary btn--sm" href="${assetUrl(project.report)}" target="_blank" rel="noopener noreferrer" aria-label="Open project report paper">Report Paper
      <svg class="icon icon--sm" aria-hidden="true"><use href="assets/icons/sprite.svg#icon-external"></use></svg></a>` : '',
    project.caseStudy ? `<a class="btn btn--secondary btn--sm" href="${project.caseStudy}" target="_blank" rel="noopener noreferrer" aria-label="Read case study">Write-up
      <svg class="icon icon--sm" aria-hidden="true"><use href="assets/icons/sprite.svg#icon-external"></use></svg></a>` : '',
    ].filter(Boolean).join('');

  return `
    <article class="project-card" data-category="${project.category}">
      ${gallery}
      <div class="project-card__body">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__summary">${project.summary}</p>
        <ul class="project-card__tags">${tags}</ul>
        <div class="project-card__links">${links}</div>
      </div>
    </article>
  `;
}

export async function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const status = document.getElementById('projectsStatus');
  if (!grid) return [];

  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const projects = await res.json();

    status?.remove();
    grid.innerHTML = projects.map(cardTemplate).join('');
    return projects;
  } catch (err) {
    // Most common cause: the page was opened directly as a file:// URL, where
    // fetch() is blocked by the browser. See README for how to run a local server.
    console.error('Could not load projects.json:', err);
    if (status) {
      status.textContent = 'Couldn\u2019t load projects — if you opened this file directly, run a local server instead (see README).';
    }
    return [];
  }
}
