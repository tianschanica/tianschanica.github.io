/* ═════════════════════════════════════════════════════════════
   ТЯНЬШАНИКА · app.js
   Горизонтальный таймлайн экспедиций в Центральную Азию XIX в.
════════════════════════════════════════════════════════════════ */

/* ── Constants ──────────────────────────────────────────────── */
const START_YEAR   = 1850;
const END_YEAR     = 1902;
const PX_PER_YEAR  = 220;
const CARD_W       = 210;
const HEADER_H     = 58;
const STRIP_H      = 52;

/* ── Expedition data ────────────────────────────────────────── */
/* lane: 'a'=near top … 'f'=near bottom; 'c'/'d' straddle the timeline */
const EXPEDITIONS = [

  {
    id: 'severtsov', name: 'Северцов', fullName: 'Николай Северцов',
    flag: '🇷🇺', country: 'RU', color: '#4A8DD9',
    year: 1857, endYear: 1866, lane: 'a',
    title: 'Исследование Средней Азии',
    region: 'Сырдарья · Тянь-Шань · Туркестан',
    distance: '~10 000 км', duration: '9 лет',
    summary: 'Серия экспедиций в бассейне Сырдарьи и предгорьях Тянь-Шаня. Первая зоогеографическая сводка Средней Азии.',
    discoveries: [
      'Зоогеографическое описание Средней Азии',
      'Новые виды птиц и млекопитающих Туркестана',
      'Карта бассейна Сырдарьи',
    ],
    route: [
      [51.17, 58.62],[46.90, 61.50],[44.95, 65.52],[42.50, 67.00],
      [41.30, 69.25],[40.90, 72.35],[41.80, 75.00],[42.50, 77.00],
      [41.30, 69.25],
    ],
    keyPoints: [
      { ll:[51.17,58.62], name:'Оренбург', note:'Отправная точка' },
      { ll:[41.30,69.25], name:'Ташкент', note:'База операций' },
      { ll:[42.50,77.00], name:'Предгорья Тянь-Шаня', note:'Зоогеографические сборы' },
    ],
    mapBounds: [[39,57],[53,79]],
  },

  {
    id: 'semyonov-1856', name: 'Семёнов-Тян-Шанский I', fullName: 'Пётр Семёнов',
    flag: '🇷🇺', country: 'RU', color: '#1B6EC8',
    year: 1856, endYear: 1856, lane: 'd',
    title: 'Первое пересечение Терскей-Алатау',
    region: 'Верный → Иссык-Куль → Нарын',
    distance: '~2 000 км', duration: '6 месяцев',
    summary: 'Первое научное проникновение в Тянь-Шань. Семёнов пересёк Терскей-Алатау и открыл ледниковые истоки Нарына, опровергнув вулканическую теорию Гумбольдта.',
    discoveries: [
      'Тянь-Шань — горы ледникового, а не вулканического происхождения',
      'Истоки реки Нарын — главного притока Сырдарьи',
      '87 новых видов растений',
    ],
    route: [
      [43.25,76.90],[42.90,76.60],[42.65,76.35],[42.46,76.72],
      [42.22,77.30],[41.80,76.80],[41.70,75.90],[42.10,76.30],[43.25,76.90],
    ],
    keyPoints: [
      { ll:[43.25,76.90], name:'Верный (Алматы)', note:'База обеих экспедиций' },
      { ll:[42.46,76.72], name:'Западный берег Иссык-Куля', note:'Первый выход к озеру' },
      { ll:[42.22,77.30], name:'Перевал Терскей-Алатау', note:'Первый европейский научный переход' },
    ],
    mapBounds: [[40.8,74.5],[44.0,79.5]],
  },

  {
    id: 'semyonov-1857', name: 'Семёнов-Тян-Шанский II', fullName: 'Пётр Семёнов',
    flag: '🇷🇺', country: 'RU', color: '#5AAAE8',
    year: 1857, endYear: 1857, lane: 'b',
    title: 'Хан-Тенгри и Центральный Тянь-Шань',
    region: 'Верный → Каракол → Сарыджаз → Ледник Петрова',
    distance: '~2 500 км', duration: '5 месяцев',
    summary: 'Второе путешествие достигло Ледника Петрова. Впервые европейским учёным увиден массив Хан-Тенгри. Вулканическая теория окончательно опровергнута.',
    discoveries: [
      'Первый вид на Хан-Тенгри (7010 м) из Европы',
      'Ледниковый рельеф Центрального Тянь-Шаня',
      '300 видов растений, 87 — новые для науки',
    ],
    route: [
      [43.25,76.90],[43.00,77.20],[42.65,77.80],[42.50,78.40],[42.49,78.38],
      [42.20,78.55],[41.95,78.75],[41.85,79.20],[41.80,79.80],[41.78,80.05],
      [41.80,79.80],[41.95,78.75],[42.49,78.38],[42.50,78.40],[43.25,76.90],
    ],
    keyPoints: [
      { ll:[42.49,78.38], name:'Каракол', note:'Восточный берег Иссык-Куля' },
      { ll:[41.80,79.80], name:'Ледник Петрова', note:'Центральный Тянь-Шань, ≈4000 м' },
      { ll:[41.78,80.05], name:'Вид на Хан-Тенгри', note:'Первое наблюдение вершины европейцем' },
    ],
    mapBounds: [[40.8,75.5],[44.0,81.5]],
  },

  {
    id: 'vambery', name: 'Вамбери', fullName: 'Арминий Вамбери',
    flag: '🇭🇺', country: 'HU', color: '#D09020',
    year: 1863, endYear: 1864, lane: 'e',
    title: 'Путешествие под видом дервиша',
    region: 'Тегеран → Бухара → Самарканд → Хива',
    distance: '~5 000 км', duration: '14 месяцев',
    summary: 'Венгерский востоковед Арминий Вамбери переоделся дервишем и пересёк Среднюю Азию. Первый европеец, описавший Хиву, Бухару и Самарканд до российского завоевания.',
    discoveries: [
      'Подробные описания Хивы, Бухары, Самарканда',
      'Первое полное описание туркменских племён',
      'Лингвистические исследования тюркских языков',
    ],
    route: [
      [35.69,51.39],[36.30,59.60],[37.60,61.83],[39.78,64.43],
      [39.65,66.95],[41.37,60.36],[39.78,64.43],[37.60,61.83],[34.35,62.20],
    ],
    keyPoints: [
      { ll:[35.69,51.39], name:'Тегеран', note:'Начало путешествия' },
      { ll:[39.78,64.43], name:'Бухара', note:'Ханский двор — под видом паломника' },
      { ll:[41.37,60.36], name:'Хива', note:'Встреча с ханом Хивы' },
    ],
    mapBounds: [[32.5,49],[43,70]],
  },

  {
    id: 'fedchenko', name: 'Фёдченко', fullName: 'Алексей Фёдченко',
    flag: '🇷🇺', country: 'RU', color: '#2A9A50',
    year: 1868, endYear: 1871, lane: 'a',
    title: 'Открытие ледника Федченко',
    region: 'Зеравшан · Фергана · Памир',
    distance: '~3 500 км', duration: '3 года',
    summary: 'Алексей Фёдченко исследовал Зеравшанскую долину и Ферганскую котловину, поднялся в Западный Памир и открыл крупнейший горный ледник мира.',
    discoveries: [
      'Ледник Федченко (77 км) — крупнейший неполярный ледник мира',
      'Систематическое описание Ферганской долины',
      'Флора и фауна Западного Памира',
    ],
    route: [
      [41.30,69.25],[39.65,66.95],[39.48,67.62],[39.30,68.50],
      [39.10,70.50],[40.38,71.78],[39.50,73.00],[38.80,72.60],[38.00,72.20],
      [38.50,73.00],[40.38,71.78],[41.30,69.25],
    ],
    keyPoints: [
      { ll:[41.30,69.25], name:'Ташкент', note:'База экспедиции' },
      { ll:[39.48,67.62], name:'Пенджикент', note:'Долина Зеравшана' },
      { ll:[38.00,72.20], name:'Ледник Федченко', note:'Открытие 1871 — 77 км длиной' },
    ],
    mapBounds: [[36.5,65.5],[42.5,74.5]],
  },

  {
    id: 'prz1', name: 'Пржевальский I', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#C83210',
    year: 1870, endYear: 1873, lane: 'f',
    title: 'Монголия и озеро Цинхай',
    region: 'Кяхта → Монголия → Ала-Шань → оз. Цинхай',
    distance: '11 800 км', duration: '2 г. 10 мес.',
    summary: 'Первая Центральноазиатская экспедиция Пржевальского. Прошла через Монголию и Внутреннюю Монголию до озера Цинхай — крупнейшего солёного озера Китая (4500 км²).',
    discoveries: [
      'Первое научное описание озера Цинхай (Кукунор)',
      '100+ новых видов птиц',
      'Ботанические и зоологические коллекции Монголии',
    ],
    route: [
      [50.38,106.45],[47.90,106.90],[46.00,108.00],[43.60,111.00],
      [41.20,112.00],[39.50,106.60],[38.50,101.00],[37.30,100.50],[36.60,100.70],
      [37.30,101.50],[38.00,102.50],[39.50,106.60],[41.00,109.00],[47.90,106.90],[50.38,106.45],
    ],
    keyPoints: [
      { ll:[50.38,106.45], name:'Кяхта', note:'Начало всех монгольских экспедиций' },
      { ll:[47.90,106.90], name:'Урга (Улан-Батор)', note:'Главный монгольский центр' },
      { ll:[36.60,100.70], name:'Озеро Цинхай (Кукунор)', note:'Первое научное описание' },
    ],
    mapBounds: [[34.5,97],[52,115]],
  },

  {
    id: 'forsyth', name: 'Форсайт', fullName: 'Дуглас Форсайт',
    flag: '🇬🇧', country: 'UK', color: '#8830A8',
    year: 1873, endYear: 1874, lane: 'b',
    title: 'Британская миссия в Кашгар',
    region: 'Симла → Лех → Каракорум → Кашгар',
    distance: '~4 000 км', duration: '14 месяцев',
    summary: 'Вторая британская миссия к Якуб-беку в Кашгар. Первые научные описания восточного Каракорума и Каракорумского перевала (5575 м) с индийской стороны.',
    discoveries: [
      'Первая детальная съёмка Каракорумского перевала',
      'Описание пути Лех–Яркенд–Кашгар',
      'Политическая разведка Центральной Азии',
    ],
    route: [
      [31.10,77.17],[34.15,77.58],[35.50,77.84],[37.10,77.20],
      [38.42,77.25],[39.48,76.00],
      [38.42,77.25],[35.50,77.84],[34.15,77.58],[31.10,77.17],
    ],
    keyPoints: [
      { ll:[34.15,77.58], name:'Лех (Ладак)', note:'Ворота в горы' },
      { ll:[35.50,77.84], name:'Каракорумский перевал (5575 м)', note:'Главный перевал хребта' },
      { ll:[39.48,76.00], name:'Кашгар', note:'Встреча с Якуб-беком' },
    ],
    mapBounds: [[29,74],[41,80]],
  },

  {
    id: 'mushketov', name: 'Мушкетов', fullName: 'Иван Мушкетов',
    flag: '🇷🇺', country: 'RU', color: '#B88030',
    year: 1874, endYear: 1880, lane: 'c',
    title: 'Геологическая съёмка Туркестана',
    region: 'Ташкент · Тянь-Шань · Памир · Закаспий',
    distance: '~12 000 км', duration: '6 лет',
    summary: 'Мушкетов провёл масштабную геологическую съёмку горных систем Средней Азии — первую в истории. Описал тектонику Тянь-Шаня и открыл нефть в Фергане.',
    discoveries: [
      'Первая геологическая карта Туркестана',
      'Открытие Ферганского нефтяного бассейна',
      'Описание тектоники и сейсмичности Тянь-Шаня',
    ],
    route: [
      [41.30,69.25],[40.38,71.78],[39.48,67.62],[38.00,72.20],
      [42.00,75.50],[42.50,77.00],[41.30,69.25],[37.93,58.38],[38.97,65.78],[41.30,69.25],
    ],
    keyPoints: [
      { ll:[41.30,69.25], name:'Ташкент', note:'База геологических исследований' },
      { ll:[40.38,71.78], name:'Фергана', note:'Открытие нефтяных запасов' },
    ],
    mapBounds: [[36.5,57],[43.5,79]],
  },

  {
    id: 'potanin1', name: 'Потанин I', fullName: 'Григорий Потанин',
    flag: '🇷🇺', country: 'RU', color: '#3A8A20',
    year: 1876, endYear: 1877, lane: 'a',
    title: 'Монголо-Тувинская экспедиция',
    region: 'Зайсан → Зап. Монголия → Тува',
    distance: '~4 000 км', duration: '18 месяцев',
    summary: 'Первая экспедиция Потанина исследовала горы Западной Монголии и Тувы. Первые этнографические описания тюрко-монгольских народов региона.',
    discoveries: [
      'Первая карта бассейна реки Кобдо',
      'Этнографические коллекции тюрко-монгольских народов',
      'Описание Монгольского Алтая',
    ],
    route: [
      [47.50,84.00],[48.00,88.00],[48.00,91.60],[48.90,94.40],
      [50.50,94.00],[51.70,94.50],[50.38,106.45],
      [48.00,91.60],[47.50,84.00],
    ],
    keyPoints: [
      { ll:[47.50,84.00], name:'Зайсан', note:'Отправная точка' },
      { ll:[48.00,91.60], name:'Кобдо', note:'Центр Западной Монголии' },
    ],
    mapBounds: [[46,82],[53,108]],
  },

  {
    id: 'prz2', name: 'Пржевальский II', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#B85A18',
    year: 1876, endYear: 1877, lane: 'e',
    title: 'Экспедиция на Лоб-Нор',
    region: 'Кульджа → Тянь-Шань → Лоб-Нор → Дуньхуан',
    distance: '4 190 км', duration: '14 месяцев',
    summary: 'Вторая экспедиция пересекла восточный Тянь-Шань и достигла озера Лоб-Нор. Открыт дикий двугорбый верблюд. Первое европейское описание «блуждающего озера».',
    discoveries: [
      'Открытие дикого верблюда (Camelus ferus)',
      'Первое научное описание Лоб-Нора',
      'Доказательство «блуждающего» характера озера',
    ],
    route: [
      [43.90,81.35],[43.50,84.00],[43.00,86.00],[42.85,89.20],
      [42.60,93.52],[41.50,90.00],[40.80,89.50],[40.30,89.00],[40.10,90.40],[40.05,94.67],
      [40.10,90.40],[40.80,89.50],[42.60,93.52],[43.00,86.00],[43.90,81.35],
    ],
    keyPoints: [
      { ll:[43.90,81.35], name:'Кульджа (Инин)', note:'Начало 2-й экспедиции' },
      { ll:[40.10,90.40], name:'Лоб-Нор', note:'Первое европейское описание, янв. 1877' },
      { ll:[40.05,94.67], name:'Дуньхуан', note:'Крайняя восточная точка' },
    ],
    mapBounds: [[38,78],[46,97]],
  },

  {
    id: 'prz3', name: 'Пржевальский III', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#7A3080',
    year: 1879, endYear: 1880, lane: 'b',
    title: 'Первый Тибет — 250 км от Лхасы',
    region: 'Зайсан → Хами → Цайдам → Тибет',
    distance: '~7 815 км', duration: '19 месяцев',
    summary: 'Третья экспедиция достигла Тибетского плато и была остановлена в 250 км от Лхасы. Открыта лошадь Пржевальского — последняя дикая лошадь мира.',
    discoveries: [
      'Открытие лошади Пржевальского (Equus przewalskii)',
      'Первое описание Цайдамской котловины',
      'Остановка в 250 км от Лхасы — тибетцы отказали в проходе',
    ],
    route: [
      [47.50,84.00],[46.00,86.00],[44.00,90.00],[42.60,93.52],
      [41.50,92.00],[40.10,90.40],[39.00,92.00],[37.50,94.50],
      [36.00,94.00],[34.50,92.50],[32.80,91.80],
      [34.50,92.50],[37.50,94.50],[40.10,90.40],[42.60,93.52],[47.50,84.00],
    ],
    keyPoints: [
      { ll:[47.50,84.00], name:'Зайсан', note:'Начало 3-й экспедиции' },
      { ll:[37.50,94.50], name:'Цайдамская котловина', note:'Первое европейское описание' },
      { ll:[32.80,91.80], name:'250 км от Лхасы', note:'Тибетцы закрыли путь, янв. 1880' },
    ],
    mapBounds: [[30,82],[49,98]],
  },

  {
    id: 'potanin2', name: 'Потанин II', fullName: 'Григорий Потанин',
    flag: '🇷🇺', country: 'RU', color: '#5A9A40',
    year: 1879, endYear: 1880, lane: 'f',
    title: 'Монголия — хребет Хангай',
    region: 'Кяхта → Центральная Монголия → Хангай',
    distance: '~5 000 км', duration: '16 месяцев',
    summary: 'Вторая экспедиция Потанина изучила центральную Монголию и горный хребет Хангай. Богатые ботанические и этнографические коллекции.',
    discoveries: [
      'Детальное описание хребта Хангай',
      'Этнографические собрания по монгольским народам',
      'Ботанические коллекции монгольской степи',
    ],
    route: [
      [50.38,106.45],[47.90,106.90],[47.50,102.50],[46.50,99.50],
      [45.00,104.00],[47.90,106.90],[50.38,106.45],
    ],
    keyPoints: [
      { ll:[47.90,106.90], name:'Урга (Улан-Батор)', note:'Центр операций' },
      { ll:[47.50,102.50], name:'Хребет Хангай', note:'Центральный массив Монголии' },
    ],
    mapBounds: [[44,98],[52,110]],
  },

  {
    id: 'prz4', name: 'Пржевальский IV', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#8B6A00',
    year: 1883, endYear: 1885, lane: 'a',
    title: 'Второй Тибет — истоки Жёлтой реки',
    region: 'Кяхта → Монголия → Тибет → Керия → Лоб-Нор',
    distance: '~7 800 км', duration: '25 месяцев',
    summary: 'Четвёртая экспедиция достигла 34° с.ш. в Тибете. Впервые нанесены на карту истоки Жёлтой реки. Исследована долина реки Керия у подножия Куньлуня.',
    discoveries: [
      'Первая карта истоков Жёлтой реки',
      'Долина Керия и северный склон Куньлуня',
      'Подтверждение блуждающего характера Лоб-Нора',
    ],
    route: [
      [50.38,106.45],[47.90,106.90],[44.00,104.00],[41.80,101.00],
      [38.50,97.00],[36.80,95.00],[35.00,93.00],[33.00,91.80],[34.00,90.00],
      [35.00,88.00],[36.80,85.00],[36.85,81.68],[38.50,81.50],[40.10,90.40],
      [42.60,93.52],[44.00,104.00],[47.90,106.90],[50.38,106.45],
    ],
    keyPoints: [
      { ll:[33.00,91.80], name:'Тибетское плато (34° с.ш.)', note:'Максимальное проникновение' },
      { ll:[34.00,90.00], name:'Истоки Жёлтой реки', note:'Первая европейская карта' },
      { ll:[36.85,81.68], name:'Керия (Юйтянь)', note:'Исследование Куньлуня' },
    ],
    mapBounds: [[30,78],[52,110]],
  },

  {
    id: 'potanin3', name: 'Потанин III', fullName: 'Григорий Потанин',
    flag: '🇷🇺', country: 'RU', color: '#3A8A20',
    year: 1884, endYear: 1886, lane: 'd',
    title: 'Сычуань и Ганьсу',
    region: 'Кяхта → Ордос → Ланьчжоу → Чэнду',
    distance: '~6 000 км', duration: '2.5 года',
    summary: 'Третья экспедиция Потанина прошла через провинции Ганьсу и Сычуань — первые масштабные русские исследования Северо-Западного Китая.',
    discoveries: [
      'Описание флоры Ганьсу — множество новых видов',
      'Этнографические описания тибетцев и монголов Ганьсу',
      'Карты бассейна верхней Хуанхэ',
    ],
    route: [
      [50.38,106.45],[47.90,106.90],[43.60,111.00],[41.20,112.00],
      [36.00,103.83],[35.00,103.00],[31.00,104.08],
      [35.00,103.00],[36.00,103.83],[41.20,112.00],[47.90,106.90],[50.38,106.45],
    ],
    keyPoints: [
      { ll:[36.00,103.83], name:'Ланьчжоу', note:'Ворота в Ганьсу' },
      { ll:[31.00,104.08], name:'Чэнду (Сычуань)', note:'Южная точка экспедиции' },
    ],
    mapBounds: [[29,98],[52,114]],
  },

  {
    id: 'younghusband', name: 'Янгхазбенд', fullName: 'Фрэнсис Янгхазбенд',
    flag: '🇬🇧', country: 'UK', color: '#6030A0',
    year: 1886, endYear: 1887, lane: 'c',
    title: 'Пекин → Гоби → Кашгар → Каракорум → Индия',
    region: 'Пекин → Гоби → Кашгар → Каракорум',
    distance: '~5 000 км', duration: '14 месяцев',
    summary: 'Британский офицер Янгхазбенд пересёк Гоби с востока на запад, достиг Кашгара и перевалил через Каракорум в Индию. Первый сравнительный анализ русских и британских маршрутов.',
    discoveries: [
      'Первое описание пути Пекин–Кашгар через Гоби',
      'Первый переход через перевал Мустагх (Каракорум)',
      'Разведка российского присутствия в Кашгарии',
    ],
    route: [
      [39.90,116.39],[40.00,113.00],[40.50,108.00],[40.80,102.00],
      [41.00,96.00],[43.82,87.61],[42.60,87.00],[40.50,81.50],[39.48,76.00],
      [38.27,75.12],[35.80,76.80],[34.87,76.00],[35.92,74.31],[34.08,74.80],
    ],
    keyPoints: [
      { ll:[39.90,116.39], name:'Пекин', note:'Начало трансазиатского маршрута' },
      { ll:[39.48,76.00], name:'Кашгар', note:'Стык русских и британских маршрутов' },
      { ll:[35.92,74.31], name:'Гилгит', note:'Завершение каракорумского перехода' },
    ],
    mapBounds: [[32,72],[42,120]],
  },

  {
    id: 'grabczewski', name: 'Грумбчевский', fullName: 'Бронислав Грумбчевский',
    flag: '🇷🇺', country: 'RU', color: '#C03060',
    year: 1888, endYear: 1890, lane: 'e',
    title: 'Экспедиции на Памир и Каракорум',
    region: 'Ош → Памир → Кашгар → Вахан',
    distance: '~6 500 км', duration: '2.5 года',
    summary: 'Польский офицер на русской службе. Серия экспедиций по Памиру и Каракоруму в период «Большой Игры». Соперничество с британскими агентами за контроль над перевалами.',
    discoveries: [
      'Детальная карта Памирского плато',
      'Сведения о каракорумских перевалах с севера',
      'Разведывательные данные о путях к Британской Индии',
    ],
    route: [
      [40.52,72.79],[39.70,73.90],[38.00,74.00],[37.50,75.00],
      [38.27,75.12],[39.48,76.00],[38.00,74.00],[36.50,72.50],[35.60,71.00],
      [36.50,72.50],[38.00,74.00],[40.52,72.79],
    ],
    keyPoints: [
      { ll:[40.52,72.79], name:'Ош', note:'База памирских экспедиций' },
      { ll:[38.00,74.00], name:'Памирское плато', note:'Съёмка в условиях «Большой Игры»' },
      { ll:[39.48,76.00], name:'Кашгар', note:'Ключевой город Центральной Азии' },
    ],
    mapBounds: [[34,68],[42,78]],
  },

  {
    id: 'prz5', name: 'Пржевальский V †', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#606060',
    year: 1888, endYear: 1888, lane: 'b',
    title: 'Последняя экспедиция',
    region: 'Каракол · Иссык-Куль',
    distance: '—', duration: 'прервана',
    summary: 'Пятая экспедиция прервана смертью исследователя. Пржевальский скончался от тифа 1 ноября 1888 года в Карaколе на берегу Иссык-Куля. Похоронен «в экспедиционной одежде».',
    discoveries: [
      'Скончался 1 ноября 1888 г. в Карaколе',
      'Город переименован в Пржевальск',
      '"В экспедиционной одежде" — последнее желание',
    ],
    route: [[42.49,78.38]],
    keyPoints: [
      { ll:[42.49,78.38], name:'Каракол (Пржевальск)', note:'Место гибели, 1 нояб. 1888' },
    ],
    mapBounds: [[41.5,76],[44,80.5]],
    isDeath: true,
  },

  {
    id: 'pevtsov', name: 'Певцов', fullName: 'Михаил Певцов',
    flag: '🇷🇺', country: 'RU', color: '#208090',
    year: 1889, endYear: 1890, lane: 'a',
    title: 'Таримский бассейн и Куньлунь',
    region: 'Зайсан → Кашгар → Хотан → Керия → Лоб-Нор',
    distance: '~9 000 км', duration: '20 месяцев',
    summary: 'Певцов продолжил работу Пржевальского. Детальное изучение Таримского бассейна, Хотанского оазиса и горной системы Куньлунь. Первые точные карты Кашгарии.',
    discoveries: [
      'Детальная карта Кашгарии и Хотанского оазиса',
      'Геологическое описание хребта Куньлунь',
      'Пятое посещение Лоб-Нора — подтверждение блуждания',
    ],
    route: [
      [47.50,84.00],[44.20,87.61],[42.60,93.52],[42.94,89.19],
      [41.10,86.00],[39.48,76.00],[37.12,79.92],[36.85,81.68],[37.50,85.00],
      [40.10,90.40],[42.60,93.52],[47.50,84.00],
    ],
    keyPoints: [
      { ll:[47.50,84.00], name:'Зайсан', note:'Начало экспедиции' },
      { ll:[37.12,79.92], name:'Хотан', note:'Древний оазис Шёлкового пути' },
      { ll:[40.10,90.40], name:'Лоб-Нор', note:'Пятое российское посещение' },
    ],
    mapBounds: [[35,74],[49,96]],
  },

  {
    id: 'roborovsky', name: 'Роборовский', fullName: 'Всеволод Роборовский',
    flag: '🇷🇺', country: 'RU', color: '#1870A0',
    year: 1893, endYear: 1895, lane: 'd',
    title: 'Восточный Тянь-Шань и Таримский бассейн',
    region: 'Ош → Кашгар → Восточный Тянь-Шань → Таримский бассейн',
    distance: '~14 000 км', duration: '2.5 года',
    summary: 'Роборовский, участник трёх экспедиций Пржевальского, возглавил собственную. Детальная съёмка восточного Тянь-Шаня и продолжение картографирования Таримского бассейна.',
    discoveries: [
      'Подробная карта восточного Тянь-Шаня',
      'Съёмка рек Черчен и Хотан',
      'Богатые ботанические коллекции из Таримской пустыни',
    ],
    route: [
      [40.52,72.79],[39.48,76.00],[43.82,87.61],[42.60,93.52],[42.94,89.19],
      [40.50,86.00],[37.12,79.92],[36.85,81.68],[38.00,88.00],[40.05,94.67],
      [40.80,96.00],[42.60,93.52],[43.82,87.61],[40.52,72.79],
    ],
    keyPoints: [
      { ll:[40.52,72.79], name:'Ош', note:'База экспедиции Роборовского' },
      { ll:[43.82,87.61], name:'Урумчи', note:'Главный город Синьцзяна' },
      { ll:[40.05,94.67], name:'Дуньхуан', note:'Восточная точка Таримского бассейна' },
    ],
    mapBounds: [[35,70],[47,97]],
  },

  {
    id: 'hedin', name: 'Свен Хедин', fullName: 'Свен Хедин',
    flag: '🇸🇪', country: 'SE', color: '#2048C8',
    year: 1893, endYear: 1897, lane: 'f',
    title: 'Первая Центральноазиатская экспедиция',
    region: 'Памир → Такламакан → Лоб-Нор → Тибет',
    distance: '~12 000 км', duration: '4 года',
    summary: 'Первая из семи экспедиций шведского географа Хедина. Первое пересечение пустыни Такламакан (1895 — катастрофа, 1896 — успех). Новая карта Памира и открытие Лоп-Нора.',
    discoveries: [
      'Первая карта Памирского плато',
      'Пересечение пустыни Такламакан (1896)',
      'Открытие развалин древнего города Лоулань',
    ],
    route: [
      [41.30,69.25],[40.52,72.79],[39.48,76.00],[38.27,75.12],[37.80,74.50],
      [38.90,74.00],[39.48,76.00],[37.12,79.92],[37.50,83.00],[40.10,90.40],
      [38.50,90.00],[35.00,88.00],[33.00,85.00],[36.00,88.00],[40.10,90.40],
    ],
    keyPoints: [
      { ll:[39.48,76.00], name:'Кашгар', note:'Начало центральноазиатской экспедиции' },
      { ll:[37.50,83.00], name:'Такламакан', note:'Первое пересечение, 1896' },
      { ll:[40.10,90.40], name:'Лоб-Нор', note:'Открытие развалин Лоуланя' },
    ],
    mapBounds: [[30,68],[42,93]],
  },
];

/* ── Layout helpers ─────────────────────────────────────── */
function canvasH() {
  return window.innerHeight - HEADER_H - STRIP_H;
}
function tlY() {
  return canvasH() * 0.5;
}
function yearToX(y) {
  return (y - START_YEAR) * PX_PER_YEAR;
}
function xToYear(x) {
  return START_YEAR + x / PX_PER_YEAR;
}

/* Lane top positions (absolute, from top of canvas) */
function laneTop(lane) {
  const h = canvasH(), tl = tlY();
  const CARD_H = 148;
  switch (lane) {
    case 'a': return Math.max(10,  tl - 420);
    case 'b': return Math.max(10,  tl - 280);
    case 'c': return Math.max(10,  tl - 155);
    case 'd': return tl + 18;
    case 'e': return tl + 148;
    case 'f': return Math.min(h - CARD_H - 10, tl + 290);
    default:  return tl - 160;
  }
}

/* ── Build year ruler (bottom strip) ───────────────────── */
function buildRuler(totalW) {
  const ruler = document.getElementById('year-ruler');
  ruler.style.width = totalW + 'px';
  let html = '';
  for (let y = START_YEAR; y <= END_YEAR; y++) {
    const x = yearToX(y);
    const isDec  = y % 10 === 0;
    const isHalf = y % 5 === 0 && !isDec;
    const cls    = isDec ? 'dec' : isHalf ? 'half' : 'yr';
    const h      = isDec ? 18 : isHalf ? 12 : 7;
    html += `<div class="yr-tick ${cls}" style="left:${x}px;height:${h}px"></div>`;
    if (isDec) html += `<div class="yr-label" style="left:${x}px">${y}</div>`;
  }
  // expedition dots on ruler
  EXPEDITIONS.forEach(e => {
    const x = yearToX(e.year);
    html += `<div class="yr-dot" style="left:${x}px;background:${e.color}" title="${e.name}"></div>`;
  });
  ruler.innerHTML = html;
}

/* ── Build decade labels on timeline line ───────────────── */
function buildDecadeLabels() {
  const wrap = document.getElementById('decade-labels');
  let html = '';
  for (let y = 1860; y <= 1900; y += 10) {
    const x = yearToX(y);
    html += `<div class="decade-label" style="left:${x}px">${y}</div>`;
  }
  wrap.innerHTML = html;
}

/* ── Create expedition cards ────────────────────────────── */
function buildCards() {
  const canvas = document.getElementById('canvas');
  const tl = tlY();

  EXPEDITIONS.forEach(exp => {
    /* Card */
    const card = document.createElement('div');
    card.className = 'exp-card' + (exp.isDeath ? ' is-death' : '');
    card.id = 'card-' + exp.id;
    card.style.borderTopColor = exp.isDeath ? '#666' : exp.color;
    const cx = yearToX(exp.year) - CARD_W / 2;
    card.style.left = cx + 'px';
    card.style.top  = laneTop(exp.lane) + 'px';
    card.style.width = CARD_W + 'px';

    const yrsLabel = exp.endYear > exp.year
      ? `${exp.year} – ${exp.endYear}`
      : `${exp.year}`;

    card.innerHTML = `
      <div class="card-year" style="color:${exp.isDeath?'#888':exp.color}">${exp.year}</div>
      <div class="card-name">${exp.flag} ${exp.fullName}</div>
      <div class="card-title">${exp.title}</div>
      <div class="card-tags">
        <span class="card-tag">${exp.region.split('·')[0].trim().split('→')[0].trim()}</span>
        <span class="card-tag">${yrsLabel}</span>
      </div>
      <div class="card-dist">${exp.distance} · ${exp.duration}</div>
    `;

    card.addEventListener('click', () => scrollToExpedition(exp));
    canvas.appendChild(card);

    /* Connector line */
    const conn = document.createElement('div');
    conn.className = 'exp-connector';
    conn.id = 'conn-' + exp.id;
    const cardTop  = laneTop(exp.lane);
    const cardBot  = cardTop + 148;
    const isAbove  = cardBot < tl;
    const isBelow  = cardTop > tl;

    if (isAbove) {
      conn.style.left   = (yearToX(exp.year) + 0.5) + 'px';
      conn.style.top    = cardBot + 'px';
      conn.style.height = (tl - cardBot) + 'px';
    } else if (isBelow) {
      conn.style.left   = (yearToX(exp.year) + 0.5) + 'px';
      conn.style.top    = tl + 'px';
      conn.style.height = (cardTop - tl) + 'px';
    }
    canvas.appendChild(conn);
  });
}

/* ── Leaflet map ────────────────────────────────────────── */
let map, layers = {}, activeId = null;

function initMap() {
  map = L.map('main-map', {
    center: [42, 82],
    zoom: 3,
    zoomControl: true,
    scrollWheelZoom: true,
    attributionControl: true,
  });

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap · © CARTO', maxZoom: 14 }
  ).addTo(map);

  /* Draw all routes */
  EXPEDITIONS.forEach(exp => {
    if (!exp.route || exp.route.length < 2) {
      if (exp.route && exp.route.length === 1) {
        // single point (death location)
        const m = L.circleMarker(exp.route[0], {
          radius: 7, color: exp.color, fillColor: exp.color,
          fillOpacity: 0.8, weight: 2,
        }).addTo(map).bindPopup(`
          <div class="popup-year">${exp.flag} ${exp.year}</div>
          <div class="popup-title">${exp.fullName}</div>
          <div class="popup-body">${exp.summary}</div>
        `);
        layers[exp.id] = { line: null, markers: [m], exp };
      }
      return;
    }

    const line = L.polyline(exp.route, {
      color: exp.color, weight: 2, opacity: 0.25,
    }).addTo(map);

    const markers = exp.keyPoints.map(p =>
      L.circleMarker(p.ll, {
        radius: 4, color: exp.color, fillColor: exp.color,
        fillOpacity: 0.6, weight: 1.5, opacity: 0.4,
      }).addTo(map).bindPopup(`
        <div class="popup-year">${exp.flag} ${p.name}</div>
        <div class="popup-title">${exp.name}</div>
        <div class="popup-body">${p.note}</div>
      `)
    );

    layers[exp.id] = { line, markers, exp };
  });
}

function activateExpedition(id) {
  if (id === activeId) return;
  activeId = id;

  /* Reset all */
  EXPEDITIONS.forEach(e => {
    const L_ = layers[e.id];
    if (!L_) return;
    if (L_.line) L_.line.setStyle({ weight: 2, opacity: 0.18 });
    L_.markers.forEach(m => {
      if (m.setStyle) m.setStyle({ opacity: 0.3, fillOpacity: 0.3 });
    });
  });

  if (!id) return;
  const exp = EXPEDITIONS.find(e => e.id === id);
  if (!exp) return;

  const L_ = layers[id];
  if (L_) {
    if (L_.line) L_.line.setStyle({ weight: 4.5, opacity: 0.92 });
    L_.markers.forEach(m => {
      if (m.setStyle) m.setStyle({ opacity: 1, fillOpacity: 0.9 });
    });
    if (exp.mapBounds) {
      map.flyToBounds(exp.mapBounds, { padding: [30, 30], maxZoom: 7, duration: 1.2 });
    }
  }

  /* Update map info panel */
  updateMapInfo(exp);
}

function updateMapInfo(exp) {
  const empty = document.getElementById('map-info-empty');
  const card  = document.getElementById('map-info-card');
  if (empty) empty.style.display = 'none';
  if (card) card.style.display = 'block';

  const tagEl = document.getElementById('mi-tag');
  tagEl.textContent = `${exp.flag} ${exp.country} · ${exp.year}`;
  tagEl.style.background = exp.color + '30';
  tagEl.style.color = exp.color;
  tagEl.style.border = `1px solid ${exp.color}50`;

  document.getElementById('mi-name').textContent  = exp.fullName;
  document.getElementById('mi-title').textContent = exp.title;
  document.getElementById('mi-meta').textContent  =
    `${exp.region} · ${exp.distance} · ${exp.duration}`;

  const discEl = document.getElementById('mi-discoveries');
  discEl.innerHTML = exp.discoveries
    .map(d => `<li>${d}</li>`).join('');
}

/* ── Scroll logic ───────────────────────────────────────── */
const scrollWrap = document.getElementById('scroll-wrap');
let raf = null;

function getActiveExpedition(scrollX) {
  const currentYear = xToYear(scrollX);
  let best = null, bestDist = Infinity;
  EXPEDITIONS.forEach(exp => {
    const dist = Math.abs(exp.year - currentYear);
    if (dist < bestDist) { bestDist = dist; best = exp; }
  });
  return bestDist < 3 ? best : null;
}

function onScroll() {
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const sx = scrollWrap.scrollLeft;
    const currentYear = Math.round(xToYear(sx));

    /* Header year */
    document.getElementById('current-year-num').textContent = currentYear;

    /* Sync year ruler */
    document.getElementById('year-ruler').style.transform = `translateX(${-sx}px)`;

    /* Card states */
    EXPEDITIONS.forEach(exp => {
      const card = document.getElementById('card-' + exp.id);
      const conn = document.getElementById('conn-' + exp.id);
      if (!card) return;
      const diff = exp.year - currentYear;
      if (diff > 2) {
        card.classList.remove('is-active', 'is-past');
        if (conn) conn.classList.remove('is-active', 'is-past');
      } else if (diff >= -1 && diff <= 2) {
        card.classList.add('is-active');
        card.classList.remove('is-past');
        if (conn) { conn.classList.add('is-active'); conn.classList.remove('is-past'); }
      } else {
        card.classList.remove('is-active');
        card.classList.add('is-past');
        if (conn) { conn.classList.remove('is-active'); conn.classList.add('is-past'); }
      }
    });

    /* Find closest expedition within ±1.5 years */
    let bestExp = null, bestDist = Infinity;
    EXPEDITIONS.forEach(exp => {
      const d = Math.abs(exp.year - currentYear);
      if (d < bestDist) { bestDist = d; bestExp = exp; }
    });
    const activeExp = bestDist <= 1.8 ? bestExp : null;

    if (activeExp) {
      document.getElementById('exp-name-display').textContent = `— ${activeExp.name}`;
      activateExpedition(activeExp.id);
    } else {
      document.getElementById('exp-name-display').textContent = '';
      /* keep last active route visible */
    }
  });
}

scrollWrap.addEventListener('scroll', onScroll, { passive: true });

/* ── Drag-to-scroll ─────────────────────────────────────── */
let isDragging = false, dragStartX = 0, dragScrollStart = 0;

scrollWrap.addEventListener('pointerdown', e => {
  isDragging = true;
  dragStartX = e.clientX;
  dragScrollStart = scrollWrap.scrollLeft;
  scrollWrap.setPointerCapture(e.pointerId);
});
scrollWrap.addEventListener('pointermove', e => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  scrollWrap.scrollLeft = dragScrollStart - dx;
});
scrollWrap.addEventListener('pointerup', () => { isDragging = false; });

/* ── Keyboard navigation ────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  const currentYear = Math.round(xToYear(scrollWrap.scrollLeft));
  const sorted = [...EXPEDITIONS].sort((a, b) => a.year - b.year);
  let target;
  if (e.key === 'ArrowRight') {
    target = sorted.find(ex => ex.year > currentYear + 0.5);
  } else {
    target = [...sorted].reverse().find(ex => ex.year < currentYear - 0.5);
  }
  if (target) scrollToExpedition(target);
});

function scrollToExpedition(exp) {
  const x = yearToX(exp.year) - (scrollWrap.offsetWidth * 0.3);
  scrollWrap.scrollTo({ left: Math.max(0, x), behavior: 'smooth' });
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_W = yearToX(END_YEAR + 1) + window.innerWidth * 0.62;
  const canvas  = document.getElementById('canvas');
  canvas.style.width = TOTAL_W + 'px';

  buildRuler(TOTAL_W);
  buildDecadeLabels();
  buildCards();
  initMap();

  /* Scroll to first expedition */
  setTimeout(() => {
    scrollWrap.scrollTo({ left: Math.max(0, yearToX(1856) - 300), behavior: 'smooth' });
  }, 600);

  /* Initial year display */
  onScroll();
});

/* Recalculate on resize */
window.addEventListener('resize', () => {
  const TOTAL_W = yearToX(END_YEAR + 1) + window.innerWidth * 0.62;
  document.getElementById('canvas').style.width = TOTAL_W + 'px';
  buildRuler(TOTAL_W);
  buildDecadeLabels();
  /* Reposition cards */
  EXPEDITIONS.forEach(exp => {
    const card = document.getElementById('card-' + exp.id);
    const conn = document.getElementById('conn-' + exp.id);
    if (card) card.style.top = laneTop(exp.lane) + 'px';
    if (conn) {
      const tl = tlY();
      const cardTop = laneTop(exp.lane);
      const cardBot = cardTop + 148;
      const isAbove = cardBot < tl;
      const isBelow = cardTop > tl;
      if (isAbove) { conn.style.top = cardBot + 'px'; conn.style.height = (tl - cardBot) + 'px'; }
      else if (isBelow) { conn.style.top = tl + 'px'; conn.style.height = (cardTop - tl) + 'px'; }
    }
  });
});
