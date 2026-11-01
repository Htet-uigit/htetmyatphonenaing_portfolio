// hero.js — 3D Parallax tilt & Mascot interaction
export function initHeroMascot() {
  const mascotContainer = document.getElementById('mascotContainer');
  const mascotInteractive = document.getElementById('mascotInteractive');
  const heroSection = document.getElementById('home');

  if (!mascotContainer || !heroSection) return;

  // 1. Mouse Parallax Tilt on mascot container
  heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const offsetX = (clientX / innerWidth - 0.5) * 2;
    const offsetY = (clientY / innerHeight - 0.5) * 2;

    const tiltX = -offsetY * 8;
    const tiltY = offsetX * 8;
    const moveX = offsetX * 6;
    const moveY = offsetY * 6;

    mascotContainer.style.transform = `
      translate3d(${moveX}px, ${moveY}px, 0)
      rotateX(${tiltX}deg) 
      rotateY(${tiltY}deg)
    `;
  });

  // Reset positioning when leaving hero section
  heroSection.addEventListener('mouseleave', () => {
    mascotContainer.style.transform = `
      translate3d(0, 0, 0)
      rotateX(0deg) 
      rotateY(0deg)
    `;
  });

  // 2. Click on mascot to trigger a subtle scale pulse
  if (mascotInteractive) {
    mascotInteractive.addEventListener('click', () => {
      mascotInteractive.style.transform = 'scale(0.95)';
      setTimeout(() => {
        mascotInteractive.style.transform = 'scale(1)';
      }, 200);
    });
  }
}

export function initHeroNetwork(canvasId) {
  // Canvas network background — placeholder for future particle network
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
}
