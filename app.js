/* ═══════════════════════════════════════════════════════════════
   TIANSCHANICA · app.js
   Interactive visualizations & animations
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Chart.js Global Defaults ──────────────────────────────────
Chart.defaults.font.family = "'Space Mono', monospace";
Chart.defaults.font.size   = 11;
Chart.defaults.color       = '#888';

// ── Helpers ───────────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ── NAV scroll state ──────────────────────────────────────────
function initNav() {
  const nav = $('#nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Counter animation ─────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOut(progress) * target);
    el.textContent = prefix + value.toLocaleString('en-US');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Intersection Observer (scroll reveal + counters) ──────────
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  $$('.fade-in').forEach(el => io.observe(el));

  // Counter observer
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      $$('[data-target]', entry.target.closest('.hero-stats-bar, .stats-grid, .hero')).forEach(el => {
        if (!el.dataset.counted) {
          el.dataset.counted = '1';
          animateCounter(el);
        }
      });
      counterIO.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  const counterTriggers = $$('.hero-stats-bar, .stats-grid');
  counterTriggers.forEach(el => counterIO.observe(el));
}

// ── Peaks Chart ───────────────────────────────────────────────
function initPeaksChart() {
  const ctx = $('#peaksChart');
  if (!ctx) return;

  const peaks = [
    { name: 'Jengish Chokusu\n(Pik Pobedy)', elev: 7439, country: 'KG/CN' },
    { name: 'Khan Tengri',                   elev: 7010, country: 'KZ/KG/CN' },
    { name: 'Dankova',                        elev: 5982, country: 'KG' },
    { name: 'Semyonova-Tian-Shanskogo',       elev: 4895, country: 'KG' },
    { name: 'Zailiysky Alatau',               elev: 4973, country: 'KZ' },
    { name: 'Terskey Ala-Too',                elev: 4764, country: 'KG' },
    { name: 'Pobeda Ice Cap',                 elev: 7439, country: 'CN' },
    { name: 'Pik Bayankol',                   elev: 4700, country: 'KZ' },
  ];

  // Sort descending
  peaks.sort((a, b) => b.elev - a.elev);

  const colors = peaks.map((p, i) => {
    if (p.elev >= 7000) return 'rgba(230, 51, 41, 0.85)';
    if (p.elev >= 5500) return 'rgba(27, 71, 133, 0.75)';
    return `rgba(27, 71, 133, ${0.5 - i * 0.04})`;
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: peaks.map(p => p.name),
      datasets: [{
        label: 'Elevation (m)',
        data: peaks.map(p => p.elev),
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace(/[\d.]+\)$/, '1)')),
        borderWidth: 1,
        borderRadius: 0,
        borderSkipped: 'start',
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,10,0.92)',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.65)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: ctx => ` ${ctx.raw.toLocaleString()} m`,
          }
        }
      },
      scales: {
        x: {
          min: 3000,
          grid: { color: 'rgba(0,0,0,0.05)', drawTicks: false },
          border: { display: false },
          ticks: {
            callback: v => v.toLocaleString() + ' m',
            color: '#aaa',
            font: { size: 10 },
          }
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#555',
            font: { size: 10 },
            padding: 6,
          }
        }
      }
    }
  });
}

// ── Terrain Donut ─────────────────────────────────────────────
function initTerrainChart() {
  const ctx = $('#terrainChart');
  const legendEl = $('#terrainLegend');
  if (!ctx) return;

  const data = [
    { label: 'Glaciers & ice fields', value: 35, color: '#B4CEDF' },
    { label: 'Rocky / scree terrain', value: 28, color: '#7A8E9A' },
    { label: 'Alpine meadow',         value: 22, color: '#4A7C59' },
    { label: 'Permanent snowfield',   value: 15, color: '#E8EEF8' },
  ];

  if (legendEl) {
    legendEl.innerHTML = data.map(d =>
      `<div class="donut-legend-item">
        <div class="donut-legend-swatch" style="background:${d.color}"></div>
        <span>${d.label} — ${d.value}%</span>
      </div>`
    ).join('');
  }

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderColor: '#F8F7F4',
        borderWidth: 3,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      animation: { animateRotate: true, duration: 1200, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,10,0.92)',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.65)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: ctx => ` ${ctx.raw}% of terrain`,
          }
        }
      }
    }
  });
}

// ── Elevation Profile ─────────────────────────────────────────
function initElevationChart() {
  const ctx = $('#elevChart');
  if (!ctx) return;

  const days = [
    'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7',
    'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14',
    'Day 15', 'Day 16', 'Day 17', 'Day 18 ▲', 'Day 19', 'Day 20', 'Day 21'
  ];
  const elevations = [
    3200, 3800, 4200, 4600, 4200, 3800, 4100, 4400,
    4800, 5100, 5400, 5100, 5600, 5800, 5400, 5800,
    6200, 7010, 6000, 4400, 3200
  ];

  // Gradient fill
  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0.0,  'rgba(27, 71, 133, 0.55)');
  gradient.addColorStop(0.45, 'rgba(27, 71, 133, 0.25)');
  gradient.addColorStop(0.85, 'rgba(27, 71, 133, 0.05)');
  gradient.addColorStop(1.0,  'rgba(27, 71, 133, 0.0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: 'Elevation (m)',
        data: elevations,
        borderColor: '#1B4785',
        borderWidth: 2.5,
        backgroundColor: gradient,
        pointBackgroundColor: elevations.map((e, i) =>
          i === 17 ? '#E63329' : (e >= 6000 ? '#1B4785' : 'rgba(27,71,133,0.5)')
        ),
        pointRadius: elevations.map((e, i) =>
          i === 17 ? 7 : (e >= 6000 ? 4 : 3)
        ),
        pointHoverRadius: 7,
        pointBorderColor: '#fff',
        pointBorderWidth: elevations.map((e, i) => i === 17 ? 2.5 : 1.5),
        tension: 0.38,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1500, easing: 'easeInOutQuart' },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,10,0.92)',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.65)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: ctx => ` ${ctx.raw.toLocaleString()} m a.s.l.`,
          }
        },
        annotation: { /* optional future use */ }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#aaa', font: { size: 9 }, maxRotation: 45 }
        },
        y: {
          min: 2500,
          max: 7500,
          grid: {
            color: ctx => {
              if (ctx.tick.value === 7010) return 'rgba(230,51,41,0.2)';
              return 'rgba(0,0,0,0.06)';
            },
            drawTicks: false,
          },
          border: { display: false },
          ticks: {
            color: '#aaa',
            font: { size: 10 },
            callback: v => v.toLocaleString() + ' m',
            stepSize: 1000,
          }
        }
      }
    }
  });
}

// ── Climate Chart ─────────────────────────────────────────────
function initClimateChart() {
  const ctx = $('#climateChart');
  if (!ctx) return;

  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  const gradHigh = ctx.getContext('2d').createLinearGradient(0, 0, 0, 250);
  gradHigh.addColorStop(0, 'rgba(230,51,41,0.35)');
  gradHigh.addColorStop(1, 'rgba(230,51,41,0)');

  const gradLow = ctx.getContext('2d').createLinearGradient(0, 0, 0, 250);
  gradLow.addColorStop(0, 'rgba(27,71,133,0.3)');
  gradLow.addColorStop(1, 'rgba(27,71,133,0)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          type: 'line',
          label: 'Avg High (°C)',
          data: [-5, 2, 6, 5, -2, -12],
          borderColor: 'rgba(230,51,41,0.8)',
          backgroundColor: gradHigh,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(230,51,41,0.9)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y',
          order: 1,
        },
        {
          type: 'line',
          label: 'Avg Low (°C)',
          data: [-15, -5, -1, -2, -10, -22],
          borderColor: 'rgba(27,71,133,0.8)',
          backgroundColor: gradLow,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(27,71,133,0.9)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y',
          order: 2,
        },
        {
          type: 'bar',
          label: 'Precipitation (mm)',
          data: [25, 40, 55, 50, 35, 15],
          backgroundColor: 'rgba(100,160,200,0.32)',
          borderColor: 'rgba(100,160,200,0.6)',
          borderWidth: 1,
          yAxisID: 'y2',
          order: 3,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1100 },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 12, boxHeight: 12,
            color: '#777',
            font: { size: 10 },
            padding: 14,
          }
        },
        tooltip: {
          backgroundColor: 'rgba(10,10,10,0.92)',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.65)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          padding: 10,
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#999', font: { size: 10 } }
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(0,0,0,0.05)', drawTicks: false },
          border: { display: false, dash: [4, 4] },
          ticks: {
            color: '#aaa', font: { size: 10 },
            callback: v => v + ' °C'
          }
        },
        y2: {
          position: 'right',
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#aaa', font: { size: 10 },
            callback: v => v + ' mm'
          }
        }
      }
    }
  });
}

// ── Wind Chart ────────────────────────────────────────────────
function initWindChart() {
  const ctx = $('#windChart');
  if (!ctx) return;

  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Avg Wind (km/h)',
          data: [35, 25, 20, 22, 30, 45],
          backgroundColor: 'rgba(27,71,133,0.55)',
          borderColor: 'rgba(27,71,133,0.9)',
          borderWidth: 1,
          borderRadius: 2,
          order: 2,
        },
        {
          type: 'line',
          label: 'Max Gust (km/h)',
          data: [90, 65, 55, 58, 80, 110],
          borderColor: 'rgba(230,51,41,0.75)',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 4],
          pointRadius: 4,
          pointBackgroundColor: 'rgba(230,51,41,0.8)',
          tension: 0.35,
          order: 1,
        },
        {
          type: 'line',
          label: 'Visibility (km)',
          data: [22, 35, 42, 40, 28, 18],
          borderColor: 'rgba(100,180,160,0.75)',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(100,180,160,0.85)',
          tension: 0.35,
          yAxisID: 'y2',
          order: 1,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1100 },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 12, boxHeight: 12,
            color: '#777', font: { size: 10 }, padding: 14,
          }
        },
        tooltip: {
          backgroundColor: 'rgba(10,10,10,0.92)',
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.65)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          padding: 10,
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#999', font: { size: 10 } }
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(0,0,0,0.05)', drawTicks: false },
          border: { display: false, dash: [4, 4] },
          ticks: { color: '#aaa', font: { size: 10 }, callback: v => v + ' km/h' }
        },
        y2: {
          position: 'right',
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#aaa', font: { size: 10 }, callback: v => v + ' km' }
        }
      }
    }
  });
}

// ── Deferred chart init (IntersectionObserver) ────────────────
function initChartsLazily() {
  const chartSections = [
    { el: '#peaks',     init: () => { initPeaksChart(); initTerrainChart(); } },
    { el: '#elevation', init: initElevationChart },
    { el: '#climate',   init: () => { initClimateChart(); initWindChart(); } },
  ];

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const found = chartSections.find(c => entry.target.matches(c.el));
      if (found && !found.done) { found.done = true; found.init(); }
      io.unobserve(entry.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });

  chartSections.forEach(c => {
    const el = $(c.el);
    if (el) io.observe(el);
  });
}

// ── Smooth active nav link ────────────────────────────────────
function initActiveNav() {
  const sections = $$('section[id], footer[id]');
  const links = $$('.nav-links a');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'rgba(255,255,255,0.9)'
          : '';
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => io.observe(s));
}

// ── Map route animation restart on re-entry ───────────────────
function initMapAnimation() {
  const routePath = $('.route-path');
  if (!routePath) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        routePath.style.animation = 'none';
        routePath.getBoundingClientRect(); // reflow
        routePath.style.animation = '';
      }
    });
  }, { threshold: 0.3 });

  const mapSection = $('#geography');
  if (mapSection) io.observe(mapSection);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initChartsLazily();
  initActiveNav();
  initMapAnimation();
});
