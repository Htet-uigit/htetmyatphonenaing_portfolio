// main.js — entry point. Imports each feature module and wires it up.
// Loaded as <script type="module">, so this runs after the DOM has parsed.

import { initNavbar } from './navbar.js';
import { initScrollProgress } from './scrollProgress.js';
import { initScrollReveal } from './scrollReveal.js';
import { initHeroNetwork } from './heroNetwork.js';
import { renderProjects } from './projectsRender.js';
import { initProjectFilter } from './projectFilter.js';
import { initContactForm } from './contactForm.js';

async function init() {
  initNavbar();
  initScrollProgress();
  initScrollReveal();
  initHeroNetwork('heroCanvas');
  initContactForm();

  // Filtering needs cards to exist first, so it waits on the render.
  await renderProjects();
  initProjectFilter();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const tabs = document.querySelectorAll('.timeline__tab');
  const panels = document.querySelectorAll('.timeline__panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      });
      panels.forEach((panel) => panel.classList.remove('is-active'));

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('is-active');
    });
  });
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

init();
