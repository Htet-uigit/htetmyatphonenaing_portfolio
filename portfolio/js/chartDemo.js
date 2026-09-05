// chartDemo.js — a small, real Chart.js chart (not a screenshot) showing
// this project structure can hold live, swappable data. Loaded from a CDN
// in index.html; fails gracefully if that script is blocked or offline.

const SAMPLE_LABELS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const SAMPLE_DATA = [81, 85, 88, 91, 94, 96];

export function initChartDemo() {
  const canvas = document.getElementById('liveChart');
  if (!canvas) return;

  if (typeof Chart === 'undefined') {
    const fallback = document.createElement('p');
    fallback.className = 'projects__status';
    fallback.textContent = 'Live chart library didn\u2019t load — check your network settings.';
    canvas.replaceWith(fallback);
    return;
  }

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: SAMPLE_LABELS,
      datasets: [{
        label: 'Model accuracy (%)',
        data: SAMPLE_DATA,
        borderColor: '#2451FF',
        backgroundColor: 'rgba(36, 81, 255, 0.08)',
        pointBackgroundColor: '#2451FF',
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2.5,
        tension: 0.35,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111317',
          titleFont: { family: 'IBM Plex Mono' },
          bodyFont: { family: 'IBM Plex Mono' },
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          min: 70,
          max: 100,
          grid: { color: '#F0F1F3' },
          ticks: { font: { family: 'IBM Plex Mono', size: 10 }, color: '#9CA3AF' },
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'IBM Plex Mono', size: 10 }, color: '#9CA3AF' },
        },
      },
    },
  });
}
