// heroNetwork.js — a quiet, drifting node-and-edge network behind the hero
// headline. Kept low-contrast on purpose: it's atmosphere, not the message.

const LINE_COLOR = '17, 19, 23';     // ink, used at low alpha for edges
const NODE_COLOR = '156, 163, 175';  // slate-light
const ACCENT_COLOR = '36, 81, 255';  // signal blue
const MAX_DIST = 150;
const ACCENT_RATIO = 0.14;

export function initHeroNetwork(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, dpr;
  let nodes = [];
  let rafId = null;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildNodes();
  }

  function buildNodes() {
    const density = 16000; // px² per node — tuned for a sparse, quiet field
    const count = Math.max(24, Math.min(60, Math.floor((width * height) / density)));

    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      accent: Math.random() < ACCENT_RATIO,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // Update positions
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x <= 0 || n.x >= width) n.vx *= -1;
      if (n.y <= 0 || n.y >= height) n.vy *= -1;
      n.x = Math.max(0, Math.min(width, n.x));
      n.y = Math.max(0, Math.min(height, n.y));
    });

    // Edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.16;
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.accent ? 2.6 : 2, 0, Math.PI * 2);
      ctx.fillStyle = n.accent ? `rgba(${ACCENT_COLOR}, 0.55)` : `rgba(${NODE_COLOR}, 0.5)`;
      ctx.fill();
    });

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(step);
    }
  }

  resize();
  step();

  window.addEventListener('resize', () => {
    if (rafId) cancelAnimationFrame(rafId);
    resize();
    step();
  });

  // Pause the loop when the tab isn't visible
  document.addEventListener('visibilitychange', () => {
    if (prefersReducedMotion) return;
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && !rafId) {
      step();
    }
  });
}
