/* app.js — Tianschanica expedition maps & charts */

/* ══════════════════════════════════════════════════════
   NAV SCROLL EFFECT
══════════════════════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ══════════════════════════════════════════════════════
   SCROLL FADE-IN OBSERVER
══════════════════════════════════════════════════════ */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


/* ══════════════════════════════════════════════════════
   PRZHEVALSKY EXPEDITION TABS
══════════════════════════════════════════════════════ */
document.querySelectorAll('.exp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('exp-tab--active'));
    document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('exp-panel--active'));
    tab.classList.add('exp-tab--active');
    document.getElementById(tab.dataset.tab).classList.add('exp-panel--active');
  });
});


/* ══════════════════════════════════════════════════════
   TILE LAYER (CartoDB Positron — light, museum-quality)
══════════════════════════════════════════════════════ */
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


/* ══════════════════════════════════════════════════════
   ① SEMYONOV MAP
   Centered on Tian Shan / Issyk-Kul region
══════════════════════════════════════════════════════ */
const semMap = L.map('semyonov-map', {
  center: [42.6, 77.0],
  zoom: 6,
  zoomControl: true,
  scrollWheelZoom: false,
});
L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 14 }).addTo(semMap);
semMap.on('focus', () => semMap.scrollWheelZoom.enable());
semMap.on('blur',  () => semMap.scrollWheelZoom.disable());

/* ── Semyonov Route 1 (1856) ─────────────────────────────
   Verny (Almaty) → Zailiysky Alatau crossing → Chu River → Issyk-Kul west → Terskey Alatau → Naryn basin → return
*/
const sem1856 = [
  [43.25, 76.90],  // Verny (Almaty)
  [43.00, 76.80],  // Zailiysky Alatau foothills
  [42.80, 76.50],  // Chu River valley
  [42.65, 76.35],  // Kordai pass area
  [42.50, 76.10],  // Western Issyk-Kul shore approach
  [42.48, 76.35],  // Ysyk-Ata valley
  [42.45, 76.72],  // Near Balykchy (Rybachye), western Issyk-Kul
  [42.40, 77.00],  // Southern shore of Issyk-Kul
  [42.22, 77.30],  // Terskey Alatau crossing
  [41.80, 76.80],  // Naryn River headwaters area
  [41.70, 75.90],  // Upper Naryn basin
  [42.00, 76.00],  // Return route north
  [42.80, 76.50],  // Back to Chu valley
  [43.25, 76.90],  // Verny
];
L.polyline(sem1856, { color: '#1B4785', weight: 3, opacity: 0.85, dashArray: null }).addTo(semMap);

/* ── Semyonov Route 2 (1857) ─────────────────────────────
   Verny → eastern Issyk-Kul → Karakol → Terskey pass → Saryjaz valley → Petrov Glacier
*/
const sem1857 = [
  [43.25, 76.90],  // Verny (Almaty)
  [42.65, 77.50],  // Eastern Zailiysky via Kebin valley
  [42.50, 77.80],  // Karkara valley
  [42.50, 78.40],  // Eastern Issyk-Kul
  [42.49, 78.38],  // Karakol (Przhevalsk)
  [42.20, 78.55],  // Terskey Alatau pass (Jukuchak)
  [41.95, 78.75],  // Saryjaz valley upper reaches
  [41.80, 79.00],  // Inylchek valley approach
  [41.85, 79.80],  // Near Petrov Glacier / Semenov Glacier area
  [41.80, 80.00],  // Furthest point — Khan Tengri massif view
  [41.85, 79.80],  // Return
  [41.95, 78.75],  // Saryjaz valley
  [42.20, 78.55],  // Terskey pass
  [42.49, 78.38],  // Karakol
  [42.50, 78.40],  // Eastern Issyk-Kul
  [42.50, 77.80],  // Karkara valley
  [43.25, 76.90],  // Verny
];
L.polyline(sem1857, { color: '#5AAAE8', weight: 3, opacity: 0.85 }).addTo(semMap);

/* ── Markers: Key Semyonov locations ─────────────────────── */
const semPoints = [
  { ll: [43.25, 76.90], title: 'Verny (Almaty)', text: 'Base of operations for both Semyonov expeditions (1856–57). At the foot of the Zailiysky Alatau.' },
  { ll: [42.45, 76.72], title: 'Issyk-Kul — Western Shore', text: 'Semyonov\'s first approach to the great alpine lake (Aug 1856). Situated at 1,607 m altitude; 182 km long.' },
  { ll: [42.22, 77.30], title: 'Terskey Alatau Crossing', text: '1856 crossing — first European to cross this range. Discovered glacial headwaters of the Naryn River, source of the Syr Darya.' },
  { ll: [42.49, 78.38], title: 'Karakol (Przhevalsk)', text: 'Eastern end of Issyk-Kul. Hub for 1857 expedition into the Saryjaz valley and Central Tian Shan. Later the site of Przhevalsky\'s death (1888).' },
  { ll: [41.80, 79.00], title: 'Inylchek Valley', text: 'Approach route to the Petrov and Semyonov Glaciers — the deepest penetration into the Central Tian Shan in 1857.' },
  { ll: [41.80, 80.00], title: 'Petrov Glacier / Khan Tengri View', text: 'Furthest point reached in 1857. First European sighting of the Khan Tengri massif. Conclusive proof: no volcanic rock anywhere in the Tian Shan.' },
];

const semDotIcon = L.divIcon({
  html: `<div style="width:10px;height:10px;border-radius:50%;background:#1B4785;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
  iconSize: [10, 10], iconAnchor: [5, 5], className: ''
});
const sem2DotIcon = L.divIcon({
  html: `<div style="width:10px;height:10px;border-radius:50%;background:#5AAAE8;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
  iconSize: [10, 10], iconAnchor: [5, 5], className: ''
});

semPoints.forEach((p, i) => {
  const icon = i < 3 ? semDotIcon : sem2DotIcon;
  L.marker(p.ll, { icon })
    .addTo(semMap)
    .bindPopup(`<div class="popup-tag">Semyonov · ${i < 3 ? '1856' : '1857'}</div><div class="popup-title">${p.title}</div><p>${p.text}</p>`);
});

// Khan Tengri label
L.marker([42.22, 80.17], {
  icon: L.divIcon({
    html: `<div style="font-family:'Space Mono',monospace;font-size:9px;color:#1B4785;white-space:nowrap;font-weight:700;text-shadow:1px 1px 0 white,-1px -1px 0 white">⛰ Khan Tengri 7,010 m</div>`,
    className: '', iconAnchor: [0, 6]
  })
}).addTo(semMap);

// Issyk-Kul label
L.marker([42.45, 77.40], {
  icon: L.divIcon({
    html: `<div style="font-family:'Space Mono',monospace;font-size:9px;color:#1B4785;opacity:0.7;white-space:nowrap;text-shadow:1px 1px 0 white">Issyk-Kul  1,607 m</div>`,
    className: '', iconAnchor: [0, 6]
  })
}).addTo(semMap);


/* ══════════════════════════════════════════════════════
   ② PRZHEVALSKY MAP
   Central Asia — Mongolia, Gobi, Tibet, Tarim
══════════════════════════════════════════════════════ */
const przMap = L.map('przhevalsky-map', {
  center: [42.0, 94.0],
  zoom: 4,
  zoomControl: true,
  scrollWheelZoom: false,
});
L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 12 }).addTo(przMap);
przMap.on('focus', () => przMap.scrollWheelZoom.enable());
przMap.on('blur',  () => przMap.scrollWheelZoom.disable());

/* ── Expedition I (1870–1873) ────────────────────────────
   Kyakhta → Urga (Ulaanbaatar) → Inner Mongolia → Qinghai Lake (Kuku Nor) → Yellow River great bend → Dolon Nor → return
*/
const przExp1 = [
  [50.38, 106.45],  // Kyakhta
  [47.90, 106.90],  // Urga (Ulaanbaatar)
  [46.00, 108.00],  // Southern Mongolia
  [43.60, 111.00],  // Dolon Nor (Inner Mongolia)
  [41.20, 112.00],  // Eastern Ordos / Yellow River great bend area
  [39.50, 106.60],  // Ala Shan (Helan Mts)
  [38.50, 101.00],  // Qilian Shan foothills
  [36.60, 100.70],  // Qinghai Lake (Kuku Nor) — furthest south
  [37.30, 101.50],  // Qinghai Lake eastern shore
  [38.00, 102.50],  // Qilian Shan approach
  [39.50, 106.60],  // Return via Ala Shan
  [41.00, 109.00],  // Inner Mongolia
  [44.00, 111.00],  // Ulan Bator region
  [47.90, 106.90],  // Urga
  [50.38, 106.45],  // Kyakhta
];
const prz1Line = L.polyline(przExp1, { color: '#C8320A', weight: 2.5, opacity: 0.85 }).addTo(przMap);

/* ── Expedition II (1876–1877) ───────────────────────────
   Kuldzha (Yining/Ili) → eastern Tian Shan → Hami → Lop Nor → Dunhuang → return
*/
const przExp2 = [
  [43.90, 81.35],   // Kuldzha (Yining)
  [43.50, 84.00],   // Eastern Ili Valley
  [43.00, 86.00],   // Eastern Tian Shan descent
  [42.85, 89.20],   // Turpan Depression
  [42.60, 93.50],   // Hami (Kumul)
  [41.50, 90.00],   // Southern Tian Shan, descending to Tarim
  [40.80, 89.50],   // Tarim Basin northwest
  [40.30, 89.00],   // Lop Nor basin approach
  [40.10, 90.40],   // Lop Nor (salt lake, since dried up) — KEY DISCOVERY
  [40.05, 94.90],   // Dunhuang (Sha Zhou) — easternmost point
  [40.10, 90.40],   // Return to Lop Nor
  [40.80, 89.50],   // Tarim Basin
  [42.60, 93.50],   // Hami
  [43.00, 86.00],   // Eastern Tian Shan
  [43.90, 81.35],   // Kuldzha
];
const prz2Line = L.polyline(przExp2, { color: '#B85A18', weight: 2.5, opacity: 0.85 }).addTo(przMap);

/* ── Expedition III (1879–1880) ──────────────────────────
   Zaisan (E Kazakhstan) → Hami → Lop Nor → Qaidam → Tibet (blocked 250km from Lhasa) → return
*/
const przExp3 = [
  [47.50, 84.00],   // Zaisan (E. Kazakhstan)
  [46.00, 86.00],   // Altai foothills
  [44.00, 90.00],   // Western Mongolia → Hami area
  [42.60, 93.50],   // Hami
  [41.50, 92.00],   // Southern Hami / Tarim Basin descent
  [40.10, 90.40],   // Lop Nor revisit
  [39.00, 92.00],   // Northern Qaidam Basin approach
  [37.50, 94.50],   // Qaidam (Tsaidam) Basin centre
  [36.00, 94.00],   // Southern Qaidam / Qilian Shan south
  [34.50, 92.50],   // Northern Tibet plateau
  [32.80, 91.80],   // Closest point to Lhasa — blocked at Nagchu area (250 km north of Lhasa)
  [34.50, 92.50],   // Turned back north
  [36.00, 94.00],   // Qaidam
  [37.50, 94.50],   // Return through Qaidam
  [39.00, 92.00],   // Northern Qaidam
  [40.10, 90.40],   // Lop Nor
  [42.60, 93.50],   // Hami
  [47.50, 84.00],   // Zaisan
];
const prz3Line = L.polyline(przExp3, { color: '#7A3880', weight: 2.5, opacity: 0.85 }).addTo(przMap);

/* ── Expedition IV (1883–1885) ───────────────────────────
   Kyakhta → Mongolia → Tsaidam → Tibet (deeper) → Keriya → Lop Nor → return
*/
const przExp4 = [
  [50.38, 106.45],  // Kyakhta
  [47.90, 106.90],  // Urga (Ulaanbaatar)
  [44.00, 104.00],  // Western Mongolia → Gobi
  [41.80, 101.00],  // Ala Shan west
  [38.50, 97.00],   // Qaidam approach (different route, more western)
  [36.80, 95.00],   // Tsaidam/Qaidam centre
  [35.00, 93.00],   // Northern Tibet — further south than Exp. III
  [33.00, 91.80],   // Tibetan plateau — Yellow River headwaters area (33°N)
  [34.00, 90.00],   // Yellow River source region
  [35.00, 88.00],   // Return, heading northwest
  [36.80, 85.00],   // Keriya (Yutian) / Kunlun Shan north face
  [38.50, 81.50],   // Keriya Darya valley / Tarim Basin approach
  [39.00, 82.50],   // Khotan area
  [40.00, 85.00],   // Tarim basin south
  [40.10, 90.40],   // Lop Nor — revisited again
  [42.60, 93.50],   // Hami
  [44.00, 104.00],  // Mongolia
  [47.90, 106.90],  // Urga
  [50.38, 106.45],  // Kyakhta
];
const prz4Line = L.polyline(przExp4, { color: '#8B7200', weight: 2.5, opacity: 0.85 }).addTo(przMap);

/* ── Key Markers ─────────────────────────────────────────── */
const przPoints = [
  { ll: [50.38, 106.45], color: '#888',    exp: 'Start/End',  title: 'Kyakhta',                    text: 'Border town on the Russia–Mongolia frontier. Departure point for Expeditions I (1870) and IV (1883).' },
  { ll: [47.90, 106.90], color: '#C8320A', exp: 'Exp. I',     title: 'Urga (Ulaanbaatar)',          text: 'Capital of Outer Mongolia. Main hub and supply point for the first expedition (1871).' },
  { ll: [36.60, 100.70], color: '#C8320A', exp: 'Exp. I',     title: 'Qinghai Lake (Kuku Nor)',     text: 'First scientific survey of Qinghai Lake — at 4,500 km² the largest saltwater lake in China. Described 1872.' },
  { ll: [43.90, 81.35],  color: '#B85A18', exp: 'Exp. II',    title: 'Kuldzha (Yining)',            text: 'Start of 2nd expedition (Aug 1876). In the Ili Valley, now Xinjiang, China. Gateway to eastern Tian Shan.' },
  { ll: [40.10, 90.40],  color: '#B85A18', exp: 'Exp. II',    title: 'Lop Nor',                    text: 'First European scientific survey of Lop Nor (Jan 1877). The wandering salt lake of the Tarim Basin. Dried up by 1972. Wild Bactrian camels first described here.' },
  { ll: [40.05, 94.90],  color: '#B85A18', exp: 'Exp. II',    title: 'Dunhuang',                   text: 'Easternmost point of 2nd expedition. Near the Mogao Cave complex; Przhevalsky noted the desert oasis.' },
  { ll: [47.50, 84.00],  color: '#7A3880', exp: 'Exp. III',   title: 'Zaisan',                     text: 'Departure point for 3rd expedition (Mar 1879) in eastern Kazakhstan.' },
  { ll: [37.50, 94.50],  color: '#7A3880', exp: 'Exp. III',   title: 'Qaidam (Tsaidam) Basin',     text: 'First European scientific survey of this high-altitude depression at 2,700 m. Salt marshes and unique fauna.' },
  { ll: [32.80, 91.80],  color: '#7A3880', exp: 'Exp. III',   title: 'Closest Approach to Lhasa',  text: 'Expedition III halted here in Jan 1880 — approximately 250 km north of Lhasa. Tibetan authorities refused passage.' },
  { ll: [33.00, 91.80],  color: '#8B7200', exp: 'Exp. IV',    title: 'Yellow River Headwaters',    text: 'Expedition IV (1884) — first European survey of the Yellow River source region on the Tibetan Plateau at ~33°N.' },
  { ll: [36.80, 85.00],  color: '#8B7200', exp: 'Exp. IV',    title: 'Keriya (Yutian)',            text: 'Exploration of the Keriya Darya valley and the northern Kunlun Shan range during Expedition IV (1884).' },
  { ll: [42.49, 78.38],  color: '#888',    exp: '†  1888',    title: 'Karakol — Przhevalsky\'s Grave', text: 'Przhevalsky died here on November 1, 1888, at the outset of his 5th expedition. Buried on a promontory above Issyk-Kul. Town renamed Przhevalsk by Imperial decree.' },
];

przPoints.forEach(p => {
  const ic = L.divIcon({
    html: `<div style="width:9px;height:9px;border-radius:50%;background:${p.color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
    iconSize: [9, 9], iconAnchor: [5, 5], className: ''
  });
  L.marker(p.ll, { icon: ic })
    .addTo(przMap)
    .bindPopup(`<div class="popup-tag">${p.exp}</div><div class="popup-title">${p.title}</div><p>${p.text}</p>`);
});

// Key geographic labels
[
  { ll: [40.10, 90.40], label: 'Lop Nor', color: '#B85A18' },
  { ll: [36.60, 100.70], label: 'Qinghai Lake', color: '#C8320A' },
  { ll: [36.00, 90.00], label: 'Tibetan Plateau', color: '#7A3880' },
  { ll: [43.00, 104.00], label: 'Gobi Desert', color: '#888' },
].forEach(lb => {
  L.marker(lb.ll, {
    icon: L.divIcon({
      html: `<div style="font-family:'Space Mono',monospace;font-size:8px;color:${lb.color};white-space:nowrap;text-shadow:1px 1px 0 white,-1px -1px 0 white,-1px 1px 0 white,1px -1px 0 white">${lb.label}</div>`,
      className: '', iconAnchor: [0, 6]
    })
  }).addTo(przMap);
});


/* ── Toggle routes via legend ────────────────────────────── */
const pLines = [null, prz1Line, prz2Line, prz3Line, prz4Line];
document.querySelectorAll('.map-legend-toggle').forEach(el => {
  el.addEventListener('click', () => {
    const idx = +el.dataset.exp;
    el.classList.toggle('active');
    if (el.classList.contains('active')) {
      pLines[idx].addTo(przMap);
    } else {
      przMap.removeLayer(pLines[idx]);
    }
  });
});


/* ══════════════════════════════════════════════════════
   CHART.JS — Comparison Charts
══════════════════════════════════════════════════════ */
const CHART_FONT = "'Space Mono', monospace";
const gridColor = 'rgba(255,255,255,0.06)';
const textColor = '#A8987A';

Chart.defaults.color = textColor;
Chart.defaults.font.family = CHART_FONT;
Chart.defaults.font.size = 10;

/* ── Distance chart ─────────────────────────────────────── */
new Chart(document.getElementById('distanceChart'), {
  type: 'bar',
  data: {
    labels: ['Sem. 1856', 'Sem. 1857', 'Prz. I\n1870–73', 'Prz. II\n1876–77', 'Prz. III\n1879–80', 'Prz. IV\n1883–85'],
    datasets: [{
      label: 'km',
      data: [2000, 2500, 11800, 4190, 7815, 7815],
      backgroundColor: [
        'rgba(27,71,133,0.7)',
        'rgba(90,170,232,0.7)',
        'rgba(200,50,10,0.75)',
        'rgba(184,90,24,0.75)',
        'rgba(122,56,128,0.75)',
        'rgba(139,114,0,0.75)',
      ],
      borderColor: [
        '#1B4785','#5AAAE8','#C8320A','#B85A18','#7A3880','#8B7200'
      ],
      borderWidth: 1,
      borderRadius: 2,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => ` ${ctx.parsed.y.toLocaleString()} km` }
      }
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: textColor } },
      y: {
        grid: { color: gridColor }, ticks: { color: textColor },
        beginAtZero: true,
        ticks: { callback: v => v.toLocaleString() + ' km' }
      }
    }
  }
});

/* ── Duration chart ─────────────────────────────────────── */
new Chart(document.getElementById('durationChart'), {
  type: 'bar',
  data: {
    labels: ['Sem. 1856', 'Sem. 1857', 'Prz. I', 'Prz. II', 'Prz. III', 'Prz. IV'],
    datasets: [{
      label: 'months',
      data: [5, 5, 34, 14, 19, 25],
      backgroundColor: [
        'rgba(27,71,133,0.7)',
        'rgba(90,170,232,0.7)',
        'rgba(200,50,10,0.75)',
        'rgba(184,90,24,0.75)',
        'rgba(122,56,128,0.75)',
        'rgba(139,114,0,0.75)',
      ],
      borderColor: [
        '#1B4785','#5AAAE8','#C8320A','#B85A18','#7A3880','#8B7200'
      ],
      borderWidth: 1,
      borderRadius: 2,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => ` ${ctx.parsed.y} months` }
      }
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: textColor } },
      y: {
        grid: { color: gridColor }, ticks: { color: textColor },
        beginAtZero: true,
        ticks: { callback: v => v + ' mo' }
      }
    }
  }
});
