const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const appPath = path.join(root, 'app.js');
const routeDataPath = path.join(root, 'route-data.js');
const geojsonPath = path.join(root, 'routes.geojson');
const hedinKmlPath = '/tmp/hedin_routes.kml';

const SOURCE_BY_ID = {
  severtsov: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по опубликованным биографическим описаниям маршрутов Северцова; не GPS',
  },
  'semyonov-1856': {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по карте Murray 1861 / Geographicus и описаниям первой поездки Семенова; не GPS',
    url: 'https://www.geographicus.com/P/AntiqueMap/russianchinesefrontier-murray-1861',
  },
  'semyonov-1857': {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по карте Murray 1861 / Geographicus и описаниям тяньшанской поездки Семенова; не GPS',
    url: 'https://www.geographicus.com/P/AntiqueMap/russianchinesefrontier-murray-1861',
  },
  vambery: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по книге Arminius Vambery, Travels in Central Asia, 1864; не GPS',
    url: 'https://rusneb.ru/catalog/000199_000009_004460808/',
  },
  fedchenko: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям маршрутов Федченко через Самарканд, Зеравшан, Фаны и Алай; не GPS',
  },
  prz1: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по Britannica и опубликованному маршруту первой центральноазиатской экспедиции Пржевальского; не GPS',
    url: 'https://www.britannica.com/biography/Nikolay-Przhevalsky',
  },
  forsyth: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по Report of a Mission to Yarkund и классической дороге Leh-Yarkand; не GPS',
  },
  mushketov: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по опубликованным геологическим маршрутам Туркестана; не GPS',
  },
  potanin1: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям первой монгольской экспедиции Потанина: Кобдо, Хами, Улиастай; не GPS',
  },
  prz2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по книге From Kulja, across the Tian Shan to Lob-Nor, 1879; не GPS',
    url: 'https://en.wikisource.org/wiki/From_Kulja%2C_across_the_Tian_Shan_to_Lob-Nor',
  },
  prz3: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по Nature/Britannica и описаниям третьей экспедиции Пржевальского; не GPS',
    url: 'https://www.nature.com/articles/029593b0',
  },
  potanin2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям второй монгольской экспедиции Потанина через Алтай, Улиастай и Хангай; не GPS',
  },
  prz4: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по опубликованным описаниям четвертой экспедиции Пржевальского; не GPS',
    url: 'https://www.britannica.com/biography/Nikolay-Przhevalsky',
  },
  potanin3: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям третьей экспедиции Потанина в Ганьсу, Цинхай и Сычуань; не GPS',
  },
  younghusband: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям маршрута Younghusband 1887: Пекин, Хами, Кашгар, Мустаг; не GPS',
  },
  grabczewski: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по памирским маршрутам Громбчевского и Рашкемскому эпизоду; не GPS',
  },
  prz5: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция незавершенного перехода к Караколу по биографическим данным Пржевальского; не GPS',
    url: 'https://www.britannica.com/biography/Nikolay-Przhevalsky',
  },
  pevtsov: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту Тибетской экспедиции Певцова, Роборовского и Козлова 1889-1891; не GPS',
  },
  roborovsky: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по отчетам экспедиции Роборовского и Козлова 1893-1895; не GPS',
  },
  dutreuil: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по материалам миссии Дютрёя де Рена и Гренара 1891-1894; не GPS',
    url: 'https://heritage.bnf.fr/france-chine/mission-dutreuil-rhins-grenard-1890-1895',
  },
  littledale: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по опубликованным описаниям путешествий Литтлдейла через Центральную Азию и Тибет; не GPS',
    url: 'https://www.nature.com/articles/049567a0',
  },
  wellby: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту Wellby and Malcolm: Leh-Peking across northern Tibet; не GPS',
    url: 'https://www.gutenberg.org/ebooks/57646',
  },
  deasy: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по путешествию H. H. P. Deasy в Тибете и Китайском Туркестане 1897-1899; не GPS',
    url: 'https://www.alteagallery.com/product/deasy-tibet-15159/',
  },
  futterer: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по Karl Futterer, Durch Asien, и геологическим маршрутам 1897-1898; не GPS',
    url: 'https://china-bibliographie.univie.ac.at/2011/07/08/futterer-durch-asien/',
  },
  klementz: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по первой русской археологической разведке Турфана Д. А. Клеменца 1898 года; не GPS',
    url: 'https://idp.bl.uk/blog/idp-collections-in-russia/',
  },
  grum: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям экспедиции Г. Е. Грум-Гржимайло в Восточный Тянь-Шань, Турфан и Хами; не GPS',
  },
  kozlov1: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям Монголо-Камской экспедиции П. К. Козлова 1899-1901; не GPS',
  },
  hedin2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по ключевым пунктам экспедиции Свена Хедина 1899-1902; не GPS',
    url: 'https://svenhedinfoundation.org/expeditions/',
  },
  stein1: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту первой Центральноазиатской экспедиции Ауреля Стейна 1900-1901; не GPS',
  },
  otani1: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям первой экспедиции Отани в Восточный Туркестан; не GPS',
  },
  turfan1: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по материалам первой немецкой Турфанской экспедиции 1902-1903; не GPS',
    url: 'https://themen.crossasia.org/deutsche-turfanexpeditionen/?lang=en',
  },
  filchner: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по научной экспедиции В. Фильхнера в Китай и Тибет 1903-1905; не GPS',
    url: 'https://ci.nii.ac.jp/ncid/BA03536554',
  },
  turfan2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по материалам второй немецкой Турфанской экспедиции 1904-1905; не GPS',
    url: 'https://www.iranicaonline.org/articles/turfan-expeditions-2/',
  },
  turfan3: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту третьей немецкой Турфанской экспедиции 1905-1907; не GPS',
    url: 'https://themen.crossasia.org/deutsche-turfanexpeditionen/?lang=en',
  },
  pelliot: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту экспедиции Поля Пеллио 1906-1908; не GPS',
  },
  stein2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту второй Центральноазиатской экспедиции Ауреля Стейна 1906-1908; не GPS',
  },
  mannerheim: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту азиатского путешествия К. Г. Маннергейма 1906-1908; не GPS',
  },
  hedin3: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по ключевым пунктам экспедиции Свена Хедина 1906-1908; не GPS',
    url: 'https://svenhedinfoundation.org/expeditions/',
  },
  kozlov2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям Монголо-Сычуаньской экспедиции П. К. Козлова 1907-1909 и Хара-Хото; не GPS',
  },
  oldenburg1: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту первой Русской Туркестанской экспедиции С. Ф. Ольденбурга 1909-1910; не GPS',
  },
  otani2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям второй экспедиции Отани в Синьцзян; не GPS',
  },
  otani3: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по описаниям третьей экспедиции Отани в Восточный Туркестан и Ганьсу; не GPS',
  },
  carruthers: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по экспедиции Дугласа Каррутерса в Северо-Западную Монголию и Джунгарию 1910-1911; не GPS',
    url: 'https://rsaa.org.uk/blog/douglas-carruthers-and-the-outer-mongolia-expedition-of-1910-1911/',
  },
  turfan4: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту четвертой немецкой Турфанской экспедиции 1913-1914; не GPS',
    url: 'https://themen.crossasia.org/deutsche-turfanexpeditionen/?lang=en',
  },
  stein3: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту третьей Центральноазиатской экспедиции Ауреля Стейна 1913-1916; не GPS',
  },
  oldenburg2: {
    accuracy: 'Историческая реконструкция',
    source: 'Реконструкция по маршруту второй Русской Туркестанской экспедиции С. Ф. Ольденбурга 1914-1915; не GPS',
  },
};

function loadExpeditions() {
  const code = `${fs.readFileSync(appPath, 'utf8')}\n;globalThis.EXPEDITIONS = EXPEDITIONS;`;
  const context = {
    window: { ROUTE_LIBRARY: {} },
    document: { addEventListener() {} },
    getComputedStyle() {
      return { getPropertyValue() { return ''; } };
    },
    console,
  };
  context.window.window = context.window;
  vm.createContext(context);
  vm.runInContext(code, context);
  return context.EXPEDITIONS;
}

function loadExistingHedinRoute() {
  if (!fs.existsSync(routeDataPath)) return null;

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(routeDataPath, 'utf8'), context);
  return context.window.ROUTE_LIBRARY?.hedin1893_1897 || context.window.ROUTE_LIBRARY?.hedin || null;
}

function loadKmlRoute(routeNames) {
  if (!fs.existsSync(hedinKmlPath)) return null;

  const names = new Set(routeNames);
  const xml = fs.readFileSync(hedinKmlPath, 'utf8');
  const re = /<Placemark>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>[\s\S]*?<\/Placemark>/g;
  const routeParts = [];

  for (const match of xml.matchAll(re)) {
    const name = match[1].replace(/&apos;/g, "'").trim();
    if (!names.has(name)) continue;

    const points = match[2]
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((item) => {
        const [lng, lat] = item.split(',').map(Number);
        return [round(lat), round(lng)];
      });
    routeParts.push(points);
  }

  if (!routeParts.length) return null;

  return {
    accuracy: 'Официальный KML',
    source: 'Sven Hedin Foundation KML: exp_routes_v2.kml',
    url: 'https://svenhedinfoundation.org/expeditions/',
    routeParts,
  };
}

function loadHedinFromKml() {
  return loadKmlRoute([
    'Hedin 1893-1897 - Taklamakan',
    'Hedin 1893-1897 - Pamir',
    'Hedin 1893-1897 - Muztagh-ata',
    'Hedin 1893-1897 - Mus-tag-ata detalj',
    'Hedin 1893-1897 - Chang Tang',
  ]);
}

function loadHedinSecondFromKml() {
  return loadKmlRoute([
    'Hedin 1899-1902 1',
    'Hedin nr 2',
  ]);
}

function loadHedinThirdFromKml() {
  return loadKmlRoute([
    'Hedin 1906. Persien',
    'Hedin 1906. Beluchistan',
    'Hedin 1906-1907',
    'Hedin 1907-1908',
  ]);
}

function round(value) {
  return Number(value.toFixed(5));
}

function haversineKm(a, b) {
  const r = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(h));
}

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    0.5 *
      (2 * p1[0] +
        (-p0[0] + p2[0]) * t +
        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
    0.5 *
      (2 * p1[1] +
        (-p0[1] + p2[1]) * t +
        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
  ];
}

function smoothRoute(points) {
  if (!Array.isArray(points) || points.length < 2) return points || [];
  const output = [];

  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[Math.max(0, index - 1)];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[Math.min(points.length - 1, index + 2)];
    const distance = haversineKm(p1, p2);
    const steps = Math.max(5, Math.min(34, Math.ceil(distance / 55)));

    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      const [lat, lng] = catmullRom(p0, p1, p2, p3, t);
      output.push([round(lat), round(lng)]);
    }
  }

  output.push(points[points.length - 1].map(round));
  return dedupe(output);
}

function dedupe(points) {
  const output = [];
  for (const point of points) {
    const prev = output[output.length - 1];
    if (!prev || prev[0] !== point[0] || prev[1] !== point[1]) output.push(point);
  }
  return output;
}

function toGeoJsonFeature(exp, entry) {
  const coordinates = entry.routeParts.map((part) =>
    part.map(([lat, lng]) => [lng, lat])
  );

  return {
    type: 'Feature',
    properties: {
      id: exp.id,
      name: exp.fullName,
      title: exp.title,
      years: exp.endYear > exp.year ? `${exp.year}-${exp.endYear}` : `${exp.year}`,
      country: exp.country,
      accuracy: entry.accuracy,
      source: entry.source,
      url: entry.url || null,
      pointCount: entry.routeParts.reduce((sum, part) => sum + part.length, 0),
    },
    geometry: {
      type: coordinates.length === 1 ? 'LineString' : 'MultiLineString',
      coordinates: coordinates.length === 1 ? coordinates[0] : coordinates,
    },
  };
}

function build() {
  const expeditions = loadExpeditions();
  const hedin = loadHedinFromKml() || loadExistingHedinRoute();
  if (!hedin) throw new Error('Missing Hedin KML route data');
  const hedin2 = loadHedinSecondFromKml();
  const hedin3 = loadHedinThirdFromKml();

  const library = {
    hedin1893_1897: hedin,
    hedin,
  };
  if (hedin2) library.hedin2 = hedin2;
  if (hedin3) library.hedin3 = hedin3;

  for (const exp of expeditions) {
    if (library[exp.id]) continue;
    if (!Array.isArray(exp.route) || exp.route.length < 2) continue;

    const source = SOURCE_BY_ID[exp.id] || {
      accuracy: 'Историческая реконструкция',
      source: 'Реконструкция по опубликованным описаниям маршрута; не GPS',
    };

    library[exp.id] = {
      accuracy: source.accuracy,
      source: source.source,
      url: source.url,
      routeParts: [smoothRoute(exp.route)],
    };
  }

  const generatedEntries = Object.entries(library)
    .filter(([key]) => key !== 'hedin1893_1897' && key !== 'hedin')
    .map(([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`)
    .join(',\n');

  const js = `// Generated by tools/build-route-data.js. Do not edit manually.\nconst hedin1893_1897 = ${JSON.stringify(
    hedin
  )};\n\nwindow.ROUTE_LIBRARY = {\n  hedin1893_1897,\n  hedin: hedin1893_1897,\n${generatedEntries}\n};\n`;

  fs.writeFileSync(routeDataPath, js);

  const features = expeditions
    .map((exp) => {
      const entry = library[exp.id];
      return entry ? toGeoJsonFeature(exp, entry) : null;
    })
    .filter(Boolean);

  fs.writeFileSync(
    geojsonPath,
    `${JSON.stringify({ type: 'FeatureCollection', features }, null, 2)}\n`
  );

  const totalPoints = features.reduce((sum, feature) => sum + feature.properties.pointCount, 0);
  console.log(`Generated ${features.length} route features with ${totalPoints} points`);
}

build();
