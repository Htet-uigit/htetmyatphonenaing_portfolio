// hero.js — Mascot interaction
export function initHeroMascot() {
  const mascotContainer = document.getElementById('mascotContainer');
  const heroSection = document.getElementById('home');

  if (!mascotContainer || !heroSection) return;

  // Reset positioning on mouseleave
  heroSection.addEventListener('mouseleave', () => {
    mascotContainer.style.transform = `
      translate3d(0, 0, 0)
      rotateX(0deg) 
      rotateY(0deg)
    `;
  });
}

export function initHeroNetwork(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
}
