/* ═════════════════════════════════════════════════════════════
   ТЯНЬШАНИКА · app.js
   Горизонтальный таймлайн экспедиций в Центральную Азию XIX в.
════════════════════════════════════════════════════════════════ */

/* ── Constants ──────────────────────────────────────────────── */
const START_YEAR   = 1850;
const END_YEAR     = 1902;
const PX_PER_YEAR  = 220;
const FOCUS_RATIO  = 0.32;
const MAP_FLY_DELAY = 220;
const DUPLICATE_YEAR_STEP = 0.42;
const ACTIVE_YEAR_WINDOW = 0.46;
const WHEEL_EASE = 0.18;
const ROUTE_LIBRARY = window.ROUTE_LIBRARY || {};
const HEDIN_1893_ROUTE = ROUTE_LIBRARY.hedin1893_1897;

/* ── Expedition data ────────────────────────────────────────── */
/* lane: 'a'=near top … 'f'=near bottom; 'c'/'d' straddle the timeline */
const EXPEDITIONS = [

  {
    id: 'severtsov', name: 'Северцов', fullName: 'Николай Северцов',
    flag: '🇷🇺', country: 'RU', color: '#4A8DD9',
    year: 1857, endYear: 1868, lane: 'a',
    title: 'Сырдарья, Туркестан и Иссык-Куль',
    region: 'Оренбург → Сырдарья → Ташкент → Тянь-Шань',
    distance: '~8 000 км', duration: '11 лет',
    summary: 'Не одна поездка, а серия полевых маршрутов: от Сырдарьи и Чимкента до западного Тянь-Шаня и Иссык-Куля. Именно эти работы сделали Северцова главным зоогеографом Туркестана.',
    discoveries: [
      'Зоогеографическое описание Средней Азии',
      'Систематические сборы в западном Тянь-Шане и у Иссык-Куля',
      'Маршруты по Сырдарье, Чирчику и Семиречью',
    ],
    route: [
      [51.77,55.10],[44.85,65.50],[42.32,69.59],[41.31,69.28],
      [41.62,70.08],[42.44,70.48],[42.46,76.19],[42.49,78.38],
    ],
    keyPoints: [
      { ll:[44.85,65.50], name:'Форт Перовский', note:'Здесь Северцов попал в плен в 1857 году' },
      { ll:[41.31,69.28], name:'Ташкент', note:'Главная база его туркестанских работ' },
      { ll:[42.49,78.38], name:'Восточный Иссык-Куль', note:'Поздний тяньшанский этап 1865–1868 годов' },
    ],
    mapBounds: [[40,54],[53,80]],
  },

  {
    id: 'semyonov-1856', name: 'Семёнов-Тян-Шанский I', fullName: 'Пётр Семёнов',
    flag: '🇷🇺', country: 'RU', color: '#1B6EC8',
    year: 1856, endYear: 1856, lane: 'd',
    title: 'Первый выход к Иссык-Кулю',
    region: 'Барнаул → Семипалатинск → Верный → Иссык-Куль',
    distance: '~2 500 км', duration: '6 месяцев',
    summary: 'Первая поездка началась не в Верном, а в Барнауле. В 1856 году Семёнов вышел к западному и северному берегам Иссык-Куля, заложив маршрут для решающей экспедиции следующего года.',
    discoveries: [
      'Первый маршрут русской науки к Иссык-Кулю',
      'Наблюдения Зайлийского Алатау и долины Чу',
      'Подготовка к внутреннему проникновению в Тянь-Шань в 1857 году',
    ],
    route: [
      [53.35,83.76],[50.41,80.23],[45.01,78.37],[43.25,76.90],
      [42.84,75.30],[42.46,76.19],[42.73,77.25],[43.25,76.90],
    ],
    keyPoints: [
      { ll:[53.35,83.76], name:'Барнаул', note:'Реальная точка отправления экспедиции 1856 года' },
      { ll:[43.25,76.90], name:'Верный', note:'Опорный пункт Семиречья' },
      { ll:[42.46,76.19], name:'Западный Иссык-Куль', note:'Главный итог первой поездки; до Нарына Семёнов ещё не дошёл' },
    ],
    mapBounds: [[41.5,75],[54,85]],
  },

  {
    id: 'semyonov-1857', name: 'Семёнов-Тян-Шанский II', fullName: 'Пётр Семёнов',
    flag: '🇷🇺', country: 'RU', color: '#5AAAE8',
    year: 1857, endYear: 1857, lane: 'b',
    title: 'Внутренний Тянь-Шань и первый вид на Хан-Тенгри',
    region: 'Верный → Каракол → Терскей → Сарыджаз',
    distance: '~2 500 км', duration: '5 месяцев',
    summary: 'Во второй экспедиции Семёнов уже прошёл внутрь системы Тянь-Шаня: через Терскей-Алатау к Ак-Шыйраку и долине Сарыджаза. Отсюда он первым из европейцев увидел панораму Хан-Тенгри.',
    discoveries: [
      'Первый европейский вид на Хан-Тенгри с дальнего рубежа',
      'Ледниковый рельеф внутреннего Тянь-Шаня',
      'Решающие аргументы против вулканической теории Гумбольдта',
    ],
    route: [
      [43.25,76.90],[42.46,76.19],[42.49,78.38],[42.15,77.61],
      [41.93,78.26],[42.18,79.76],[42.18,80.18],[42.49,78.38],[42.15,77.61],[43.25,76.90],
    ],
    keyPoints: [
      { ll:[42.49,78.38], name:'Восточный Иссык-Куль', note:'Район современного Каракола; город возник позднее маршрута Семёнова' },
      { ll:[41.93,78.26], name:'Ак-Шыйрак и ледник Петрова', note:'Высокогорный ледниковый узел, достигнутый в 1857 году' },
      { ll:[42.18,80.18], name:'Панорама Хан-Тенгри', note:'Наблюдение с дальнего рубежа, а не непосредственный подход' },
    ],
    mapBounds: [[41,75.5],[44,81]],
  },

  {
    id: 'vambery', name: 'Вамбери', fullName: 'Арминий Вамбери',
    flag: '🇭🇺', country: 'HU', color: '#D09020',
    year: 1863, endYear: 1864, lane: 'e',
    title: 'Под видом дервиша: Хива, Бухара, Самарканд',
    region: 'Тегеран → Каспий → Хива → Бухара → Самарканд',
    distance: '~5 000 км', duration: '14 месяцев',
    summary: 'Венгерский ориенталист шёл как «дервиш Решид-эфенди»: из Тегерана к юго-восточному Каспию, через туркменские степи и Каракумы к Хиве, затем в Бухару и Самарканд. Обратный путь шёл через Карши, Керки, Андхой, Герат и Мешхед.',
    discoveries: [
      'Подробные описания Хивы, Бухары и Самарканда до русского завоевания',
      'Наблюдения над туркменами и городами ханств',
      'Лингвистические материалы по тюркским языкам',
    ],
    route: [
      [35.69,51.39],[36.27,50.00],[36.84,54.43],[37.07,54.08],
      [38.10,55.80],[41.37,60.36],[43.07,58.90],[42.32,59.15],
      [41.37,60.36],[39.78,64.43],[39.65,66.95],[38.86,65.80],
      [37.84,65.21],[36.95,65.12],[34.35,62.20],[36.30,59.60],[35.69,51.39],
    ],
    keyPoints: [
      { ll:[37.07,54.08], name:'Юго-восточный Каспий', note:'Выход к туркменскому караванному пути перед переходом через Каракумы' },
      { ll:[41.37,60.36], name:'Хива', note:'Первый крупный центр ханств на его пути' },
      { ll:[34.35,62.20], name:'Герат', note:'Ключевой пункт обратного пути из Бухары и Самарканда' },
    ],
    mapBounds: [[33.5,49],[44,67]],
  },

  {
    id: 'fedchenko', name: 'Фёдченко', fullName: 'Алексей Фёдченко',
    flag: '🇷🇺', country: 'RU', color: '#2A9A50',
    year: 1868, endYear: 1871, lane: 'a',
    title: 'Зеравшан, Фанские горы и Алай',
    region: 'Ташкент → Самарканд → Зеравшан → Алай',
    distance: '~3 000 км', duration: '3 сезона',
    summary: 'Фёдченко исследовал Самарканд, Пенджикент, верхний Зеравшан, Фанские горы и Алайскую долину. Прежняя версия ошибочно вела его к леднику Федченко, который был открыт только в 1878 году уже после смерти исследователя.',
    discoveries: [
      'Систематическое описание долины Зеравшана',
      'Материалы по Фанским горам и Алайской долине',
      'Коллекции флоры и фауны западного Памира у северного подножия',
    ],
    route: [
      [41.31,69.28],[39.65,66.95],[39.50,67.61],[39.39,68.54],
      [39.07,68.38],[40.53,70.94],[40.38,71.78],[40.52,72.79],
      [40.32,72.64],[39.55,72.21],[40.52,72.79],[41.31,69.28],
    ],
    keyPoints: [
      { ll:[39.50,67.61], name:'Пенджикент', note:'Выход в верхний Зеравшан' },
      { ll:[39.07,68.38], name:'Фанские горы', note:'Высокогорные исследования 1870 года' },
      { ll:[39.55,72.21], name:'Дароот-Курган', note:'Южный предел экспедиции в Алайской долине' },
    ],
    mapBounds: [[38.5,66],[42,73]],
  },

  {
    id: 'prz1', name: 'Пржевальский I', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#C83210',
    year: 1870, endYear: 1873, lane: 'f',
    title: 'Монголия, Калган, Кукунор и северный Тибет',
    region: 'Кяхта → Урга → Калган → Алашань → Кукунор',
    distance: '11 800 км', duration: '2 г. 10 мес.',
    summary: 'Первая центральноазиатская экспедиция вела не только к Кукунору: Пржевальский прошёл через Ургу и Калган у северного входа в Китай, затем через Алашань и Цайдам в северотибетские пространства.',
    discoveries: [
      'Первое русское научное описание озера Кукунор',
      '100+ новых видов птиц',
      'Коллекции из Монголии, Алашани и северного Тибета',
    ],
    route: [
      [50.38,106.45],[47.90,106.90],[40.81,114.88],[39.50,105.00],
      [36.74,100.55],[35.30,97.20],[37.37,95.30],[35.00,92.50],
      [37.37,95.30],[39.50,105.00],[47.90,106.90],[50.38,106.45],
    ],
    keyPoints: [
      { ll:[50.38,106.45], name:'Кяхта', note:'Начало всех монгольских экспедиций' },
      { ll:[40.81,114.88], name:'Калган', note:'Китайский рубеж у северного входа из Монголии' },
      { ll:[36.74,100.55], name:'Кукунор', note:'Главная научная цель экспедиции 1870–1873 годов' },
    ],
    mapBounds: [[34,92],[52,116]],
  },

  {
    id: 'forsyth', name: 'Форсайт', fullName: 'Дуглас Форсайт',
    flag: '🇬🇧', country: 'UK', color: '#8830A8',
    year: 1873, endYear: 1874, lane: 'b',
    title: 'Британская миссия в Яркенд и Кашгар',
    region: 'Симла / Лахор → Лех → Каракорумский перевал → Яркенд',
    distance: '~4 000 км', duration: '14 месяцев',
    summary: 'Миссия Форсайта шла из Лахора через Сринагар и Лех к Каракорумскому перевалу, затем в Шахидуллу, Яркенд и Кашгар. В прежней версии был верен общий замысел, но отсутствовали главные промежуточные точки маршрута.',
    discoveries: [
      'Подробное описание дороги Лех–Яркенд–Кашгар',
      'Разведка каракорумского перехода с индийской стороны',
      'Дипломатический договор с Якуб-беком в Кашгаре',
    ],
    route: [
      [31.10,77.17],[31.55,74.34],[33.60,73.05],[34.08,74.79],
      [34.15,77.58],[35.50,78.55],[36.99,78.39],[38.42,77.25],[39.48,76.00],
      [38.42,77.25],[34.15,77.58],[31.55,74.34],
    ],
    keyPoints: [
      { ll:[34.15,77.58], name:'Лех', note:'Главные ворота в Ладак и Каракорум' },
      { ll:[35.50,78.55], name:'Каракорумский перевал', note:'Ключевой переход на дороге в Яркенд' },
      { ll:[38.42,77.25], name:'Яркенд', note:'Промежуточный центр на пути к Кашгару' },
    ],
    mapBounds: [[30,73],[41,80]],
  },

  {
    id: 'mushketov', name: 'Мушкетов', fullName: 'Иван Мушкетов',
    flag: '🇷🇺', country: 'RU', color: '#B88030',
    year: 1874, endYear: 1880, lane: 'c',
    title: 'Геологическая съёмка Туркестана',
    region: 'Ташкент · Фергана · Зеравшан · Тянь-Шань · Памиро-Алай',
    distance: '~12 000 км', duration: '6 лет',
    summary: 'Мушкетов строил геологическую карту Туркестана как серию отдельных маршрутов из Ташкента. Важнее всего здесь Фергана, Зеравшан, Джунгарский Алатау, Тянь-Шань и Памиро-Алай — а не Закаспий, который прежняя версия добавляла без уверенного источника.',
    discoveries: [
      'Первая геологическая карта Туркестана',
      'Открытие Ферганского нефтяного бассейна',
      'Описание тектоники и сейсмичности Тянь-Шаня и Памиро-Алая',
    ],
    route: [
      [41.31,69.28],[40.38,71.78],[40.78,72.34],[39.65,66.95],
      [39.39,68.54],[43.25,76.90],[45.01,78.37],[42.10,75.30],[39.55,72.21],[41.31,69.28],
    ],
    keyPoints: [
      { ll:[41.31,69.28], name:'Ташкент', note:'База многолетних геологических выездов' },
      { ll:[40.78,72.34], name:'Андижан', note:'Ферганский нефтеносный район' },
      { ll:[39.55,72.21], name:'Памиро-Алай', note:'Южный сектор его геологических маршрутов' },
    ],
    mapBounds: [[39,66],[46,80]],
  },

  {
    id: 'potanin1', name: 'Потанин I', fullName: 'Григорий Потанин',
    flag: '🇷🇺', country: 'RU', color: '#3A8A20',
    year: 1876, endYear: 1877, lane: 'a',
    title: 'Кобдо, Хами и Улиастай',
    region: 'Зайсан → Кобдо → Хами → Улиастай',
    distance: '~4 000 км', duration: '18 месяцев',
    summary: 'Потанин зимовал в Кобдо, а затем вышел не в Туву, а к Хами и Улиастаю. Именно эта связка точек подтверждается источниками и лучше отражает первый западномонгольский маршрут экспедиции.',
    discoveries: [
      'Первая карта бассейна Кобдо',
      'Этнографические материалы по западной Монголии',
      'Описание путей между Алтаем, Кобдо и Хами',
    ],
    route: [
      [47.47,84.87],[48.01,91.64],[42.83,93.51],[47.74,96.85],[48.01,91.64],[47.47,84.87],
    ],
    keyPoints: [
      { ll:[47.47,84.87], name:'Зайсан', note:'Пограничный вход в западномонгольский маршрут' },
      { ll:[48.01,91.64], name:'Кобдо', note:'Главная зимовка 1876–1877 годов' },
      { ll:[47.74,96.85], name:'Улиастай', note:'Подтверждённая восточная точка экспедиции' },
    ],
    mapBounds: [[41.5,83],[49.5,98]],
  },

  {
    id: 'prz2', name: 'Пржевальский II', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#B85A18',
    year: 1876, endYear: 1877, lane: 'e',
    title: 'Экспедиция на Лоб-Нор',
    region: 'Кульджа → Турфан → Корла → Лоб-Нор → Хами',
    distance: '4 190 км', duration: '14 месяцев',
    summary: 'Во второй экспедиции Пржевальский шёл из Кульджи через Токсун и Турфан к Корле и Тариму, а обратно возвращался через Хами. Дуньхуан в старой версии был лишним смещением маршрута слишком далеко на восток.',
    discoveries: [
      'Открытие дикого верблюда (Camelus ferus)',
      'Первое научное описание Лоб-Нора',
      'Доказательство «блуждающего» характера озёрной системы',
    ],
    route: [
      [43.91,81.33],[42.79,88.65],[42.95,89.19],[41.76,86.15],
      [40.95,87.60],[40.17,90.62],[42.83,93.51],[42.95,89.19],[43.91,81.33],
    ],
    keyPoints: [
      { ll:[43.91,81.33], name:'Кульджа', note:'Выход из Или в восточный Тянь-Шань' },
      { ll:[42.95,89.19], name:'Турфан', note:'Подтверждённый узел на пути и туда, и обратно' },
      { ll:[40.17,90.62], name:'Лоб-Нор', note:'Зимовка и главное научное наблюдение 1877 года' },
    ],
    mapBounds: [[39,80],[45,95]],
  },

  {
    id: 'prz3', name: 'Пржевальский III', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#7A3080',
    year: 1879, endYear: 1880, lane: 'b',
    title: 'Первый Тибет — 250 км от Лхасы',
    region: 'Зайсан → Хами → Цайдам → Кукунор → Тибет → Хотан',
    distance: '~7 815 км', duration: '19 месяцев',
    summary: 'Третья экспедиция прошла через Хами и Цайдам к Кукунору и далее на северотибетское плато, где была остановлена примерно в 250–260 км от Лхасы. После разворота маршрут вернулся к Кукунору и ушёл западнее, к Хотану и Иссык-Кулю.',
    discoveries: [
      'Открытие лошади Пржевальского (Equus przewalskii)',
      'Первое описание Цайдамской котловины',
      'Подход к Лхасе через северный Тибет и вынужденный поворот назад',
    ],
    route: [
      [47.47,84.87],[44.03,89.52],[42.83,93.51],[37.37,95.30],
      [36.74,100.55],[34.20,97.30],[31.48,92.06],[34.20,97.30],
      [36.74,100.55],[37.37,95.30],[38.13,85.53],[37.12,79.92],
      [42.49,78.38],
    ],
    keyPoints: [
      { ll:[42.83,93.51], name:'Хами', note:'Подтверждённый вход в тибетский маршрут с севера' },
      { ll:[36.74,100.55], name:'Кукунор', note:'Главный озёрный узел перед выходом на плато' },
      { ll:[31.48,92.06], name:'Северный Тибет', note:'Здесь экспедицию развернули на подходе к Лхасе' },
    ],
    mapBounds: [[30,78],[49,101]],
  },

  {
    id: 'potanin2', name: 'Потанин II', fullName: 'Григорий Потанин',
    flag: '🇷🇺', country: 'RU', color: '#5A9A40',
    year: 1879, endYear: 1880, lane: 'f',
    title: 'Монголия — хребет Хангай',
    region: 'Бийск → Кош-Агач → Улиастай → Хангай',
    distance: '~5 000 км', duration: '16 месяцев',
    summary: 'Второй большой монгольский маршрут Потанина шёл из Западной Сибири к Улиастаю и хребту Хангай. Для этой экспедиции точнее опираться не на Кяхту, а на западносибирский вход через Алтай.',
    discoveries: [
      'Детальное описание хребта Хангай',
      'Этнографические собрания по монгольским народам',
      'Ботанические коллекции монгольской степи',
    ],
    route: [
      [52.54,85.22],[49.99,88.67],[48.01,91.64],[47.74,96.85],
      [47.30,100.70],[46.50,103.50],[47.74,96.85],[49.99,88.67],[52.54,85.22],
    ],
    keyPoints: [
      { ll:[49.99,88.67], name:'Кош-Агач', note:'Западносибирский вход в экспедиционный маршрут' },
      { ll:[47.74,96.85], name:'Улиастай', note:'Опорный пункт центральной Монголии' },
      { ll:[47.30,100.70], name:'Хангай', note:'Главная горная цель экспедиции' },
    ],
    mapBounds: [[45,84],[53,105]],
  },

  {
    id: 'prz4', name: 'Пржевальский IV', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#8B6A00',
    year: 1883, endYear: 1885, lane: 'a',
    title: 'Алашань, Хуанхэ, Хотан и Лоб-Нор',
    region: 'Кяхта → Алашань → Кукунор → Керия → Хотан → Иссык-Куль',
    distance: '~7 800 км', duration: '25 месяцев',
    summary: 'Четвёртая экспедиция шла через Алашань к верховьям Хуанхэ и Кукунору, затем через Цайдам и Керию к Лоб-Нору и Хотану и завершилась у Иссык-Куля. Прежняя версия преувеличивала «Тибет» и забывала два подтверждённых узла — Алашань и Иссык-Куль.',
    discoveries: [
      'Маршрут к верховьям Хуанхэ и Кукунору',
      'Исследование долины Керии и северного склона Куньлуня',
      'Западный возврат через Хотан к Иссык-Кулю',
    ],
    route: [
      [50.38,106.45],[47.90,106.90],[39.50,105.00],[35.30,97.20],
      [36.74,100.55],[37.37,95.30],[36.85,81.68],[40.17,90.62],
      [37.12,79.92],[42.49,78.38],
    ],
    keyPoints: [
      { ll:[39.50,105.00], name:'Алашань', note:'Подтверждённый пустынный сектор маршрута' },
      { ll:[35.30,97.20], name:'Верховья Хуанхэ', note:'Главная гидрографическая цель экспедиции' },
      { ll:[42.49,78.38], name:'Иссык-Куль', note:'Реальный западный финиш экспедиции' },
    ],
    mapBounds: [[35,78],[52,110]],
  },

  {
    id: 'potanin3', name: 'Потанин III', fullName: 'Григорий Потанин',
    flag: '🇷🇺', country: 'RU', color: '#3A8A20',
    year: 1884, endYear: 1886, lane: 'd',
    title: 'Сычуань и Ганьсу',
    region: 'Пекин → Хух-Хото → Ордос → Ланьчжоу → Сунпань',
    distance: '~6 000 км', duration: '2.5 года',
    summary: 'Третья экспедиция Потанина началась в Пекине, прошла через Хух-Хото и Ордос к Ланьчжоу, Синину, Лаврану и Сунпаню, а обратную зиму провела у монастыря Кумбум. По сравнению с прежней версией маршрут сдвинут из Кяхты на реальную китайскую ось экспедиции.',
    discoveries: [
      'Описание флоры Ганьсу и Цинхая',
      'Этнографические материалы по тибетцам и монголам Ганьсу',
      'Маршрутные карты северного края Сычуани',
    ],
    route: [
      [39.90,116.40],[38.98,113.58],[40.84,111.75],[39.61,109.78],
      [36.06,103.83],[36.62,101.78],[35.20,102.52],[32.65,103.57],
      [36.06,103.83],[36.48,101.57],[39.90,116.40],
    ],
    keyPoints: [
      { ll:[40.84,111.75], name:'Хух-Хото', note:'Выход в Ордос после пекинского старта' },
      { ll:[35.20,102.52], name:'Лавран', note:'Тибетский монастырский мир на краю плато' },
      { ll:[32.65,103.57], name:'Сунпань', note:'Южный предел экспедиции в Сычуань' },
    ],
    mapBounds: [[32,100],[41,117]],
  },

  {
    id: 'younghusband', name: 'Янгхазбенд', fullName: 'Фрэнсис Янгхазбенд',
    flag: '🇬🇧', country: 'UK', color: '#6030A0',
    year: 1887, endYear: 1887, lane: 'c',
    title: 'Пекин → Такламакан → Кашгар → перевал Мустаг',
    region: 'Пекин → Маньчжурия → Хами → Кашгар → Мустаг',
    distance: '~5 000 км', duration: '14 месяцев',
    summary: 'Главный маршрут Янгхазбенда относится к 1887 году: из Пекина с коротким маньчжурским отклонением через Хами и Турфан к Кашгару, затем через Яркенд и перевал Мустаг к Индии. В старой версии был серьёзный географический промах: речь шла не о Каракорумском перевале, а именно о перевале Мустаг.',
    discoveries: [
      'Первый европейский переход через перевал Мустаг',
      'Сопоставление британских и русских путей в Кашгарии',
      'Описание восточного входа в Синьцзян через Хами и Турфан',
    ],
    route: [
      [39.90,116.40],[42.10,128.10],[39.90,116.40],[42.83,93.51],
      [42.95,89.19],[38.80,83.50],[39.48,76.00],[38.42,77.25],
      [36.62,75.13],[35.92,74.31],[33.60,73.05],
    ],
    keyPoints: [
      { ll:[42.10,128.10], name:'Маньчжурия', note:'Короткий северо-восточный эпизод перед поворотом в Центральную Азию' },
      { ll:[39.48,76.00], name:'Кашгар', note:'Узел встречи британских и русских маршрутов' },
      { ll:[36.62,75.13], name:'Перевал Мустаг', note:'Знаменитый переход 1887 года — не Каракорумский перевал' },
    ],
    mapBounds: [[33,73],[44,129]],
  },

  {
    id: 'grabczewski', name: 'Громбчевский', fullName: 'Бронислав Громбчевский',
    flag: '🇷🇺', country: 'RU', color: '#C03060',
    year: 1888, endYear: 1890, lane: 'e',
    title: 'Памир, Рашкем и подножие K2',
    region: 'Маргелан → Алай → Памир → Рашкем → Хотан',
    distance: '~6 500 км', duration: '2.5 года',
    summary: 'Это не «Грум-Гржимайло», а именно Бронислав Громбчевский (польск. Grąbczewski). Его маршруты в 1888–1890 годах шли из Ферганы через Алай, Каратегин и памирские рубежи к Вахану, Канджуту, Рашкему и северной стороне Каракорума.',
    discoveries: [
      'Детальная съёмка Памира и пограничных долин «Большой игры»',
      'Маршрутные сведения о Рашкеме и северной стороне Каракорума',
      'Связь каракорумских путей с Хотаном и Каракашем',
    ],
    route: [
      [40.47,71.72],[40.52,72.79],[39.55,72.21],[38.57,68.78],
      [38.45,70.79],[37.02,72.68],[36.93,73.24],[36.32,74.65],
      [36.74,75.42],[35.90,76.51],[36.80,78.20],[37.12,79.92],
      [36.85,81.68],
    ],
    keyPoints: [
      { ll:[40.47,71.72], name:'Маргелан', note:'Ферганская отправная база Громбчевского' },
      { ll:[36.74,75.42], name:'Долина Рашкема', note:'Здесь он встретился с Янгхазбендом в 1889 году' },
      { ll:[37.12,79.92], name:'Хотан', note:'Западнокитайский узел позднего этапа 1889–1890 годов' },
    ],
    mapBounds: [[35,68],[41,82]],
  },

  {
    id: 'prz5', name: 'Пржевальский V †', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#606060',
    year: 1888, endYear: 1888, lane: 'b',
    title: 'Последняя экспедиция',
    region: 'Самарканд → Ташкент → Пишпек → Каракол',
    distance: '—', duration: 'прервана',
    summary: 'Пятая экспедиция не успела развернуться: Пржевальский шёл через Самарканд, Ташкент и Пишпек к Иссык-Кулю как к базе нового выхода в Тибет, но 20 октября / 1 ноября 1888 года умер от тифа в Караколе.',
    discoveries: [
      'Скончался 20 октября / 1 ноября 1888 г. в Караколе',
      'Город переименован в Пржевальск',
      '"В экспедиционной одежде" — последнее желание',
    ],
    route: [[39.65,66.95],[41.31,69.28],[42.87,74.59],[42.49,78.38]],
    keyPoints: [
      { ll:[42.49,78.38], name:'Каракол (Пржевальск)', note:'Место гибели, 1 нояб. 1888' },
    ],
    mapBounds: [[39,66],[43.5,80.5]],
    isDeath: true,
  },

  {
    id: 'pevtsov', name: 'Певцов', fullName: 'Михаил Певцов',
    flag: '🇷🇺', country: 'RU', color: '#208090',
    year: 1889, endYear: 1891, lane: 'a',
    title: 'Таримский бассейн, Куньлунь и северный Тибет',
    region: 'Каракол → Бедель → Яркенд → Хотан → Лоб-Нор → Зайсан',
    distance: '~9 000 км', duration: '2 года',
    summary: 'Певцов возглавил отряд после смерти Пржевальского и работал до 1891 года вместе с Роборовским и Козловым. Маршрут шёл от Иссык-Куля через Бедель к Яркенду и Хотану, затем к Керии, Нии, северному Куньлуню, Черчену, Лоб-Нору, Корле, Карашару, Урумчи и Зайсану.',
    discoveries: [
      'Детальная карта Кашгарии и Хотанского оазиса',
      'Маршрутные наблюдения в северном Тибете',
      'Продолжение работ по Куньлуню и Лоб-Нору',
    ],
    route: [
      [42.49,78.38],[41.42,78.38],[40.50,79.05],[38.42,77.25],
      [37.12,79.92],[36.85,81.68],[37.06,82.70],[35.20,85.50],
      [38.13,85.53],[40.17,90.62],[41.76,86.15],[42.06,86.57],
      [43.82,87.62],[44.03,89.52],[47.47,84.87],
    ],
    keyPoints: [
      { ll:[41.42,78.38], name:'Перевал Бедель', note:'Переход из Иссык-Кульской базы в Кашгарию' },
      { ll:[37.12,79.92], name:'Хотан', note:'Ключевой оазис и база работ у Куньлуня' },
      { ll:[40.17,90.62], name:'Лоб-Нор', note:'Поздний восточный узел маршрута перед возвращением через Корлу и Урумчи' },
    ],
    mapBounds: [[35,76],[48,92]],
  },

  {
    id: 'roborovsky', name: 'Роборовский', fullName: 'Всеволод Роборовский',
    flag: '🇷🇺', country: 'RU', color: '#1870A0',
    year: 1893, endYear: 1895, lane: 'd',
    title: 'Восточный Тянь-Шань и Нань-Шань',
    region: 'Зайсан → Джунгарские ворота → Турфан → Хами → Нань-Шань',
    distance: '~14 000 км', duration: '2.5 года',
    summary: 'Собственная экспедиция Роборовского и Козлова продолжила линию Пржевальского: через Джунгарский вход и восточный Тянь-Шань к Турфану, Хами, пустынным районам у Нань-Шаня и Амнэ-Мачину. Возврат был ускорен болезнью Роборовского в 1895 году.',
    discoveries: [
      'Подробная карта восточного Тянь-Шаня',
      'Маршрутные съёмки Нань-Шаня и Амнэ-Мачина',
      'Богатые ботанические, зоологические и геологические коллекции',
    ],
    route: [
      [47.47,84.87],[45.20,82.50],[43.82,87.62],[42.95,89.19],
      [42.83,93.51],[39.50,97.50],[34.80,99.46],[36.62,101.78],
      [42.83,93.51],[43.82,87.62],[47.47,84.87],
    ],
    keyPoints: [
      { ll:[45.20,82.50], name:'Джунгарские ворота', note:'Ключевой проход из степей в Синьцзян' },
      { ll:[42.83,93.51], name:'Хами', note:'Подтверждённый узел восточного Тянь-Шаня' },
      { ll:[34.80,99.46], name:'Амнэ-Мачин', note:'Юго-восточный предел экспедиции, где болезнь Роборовского прервала движение' },
    ],
    mapBounds: [[34,82],[48,104]],
  },

  {
    id: 'hedin', name: 'Свен Хедин', fullName: 'Свен Хедин',
    flag: '🇸🇪', country: 'SE', color: '#2048C8',
    year: 1893, endYear: 1897, lane: 'f',
    title: 'Первая Центральноазиатская экспедиция',
    region: 'Памир → Кашгар → Такламакан → Кара-Кошун → Тибет',
    distance: '~12 000 км', duration: '4 года',
    routeSource: HEDIN_1893_ROUTE?.source || 'Реконструкция по опубликованным описаниям',
    routeSourceUrl: HEDIN_1893_ROUTE?.url,
    summary: 'Первая центральноазиатская экспедиция Хедина шла через Памир в Кашгар, затем из Меркета через Такламакан к Хотанской реке и Хотану. Позднее он обследовал Дандань-Уйлык, озеро Бостен, Кара-Кошун и северный Тибет.',
    discoveries: [
      'Съёмка путей Памира и Кашгарии',
      'Пересечение пустыни Такламакан в 1895–1896 годах',
      'Карта Кара-Кошуна и подвижной лобнорской озёрной системы',
    ],
    routeParts: HEDIN_1893_ROUTE?.routeParts,
    route: [
      [41.31,69.28],[40.52,72.79],[38.28,75.10],[39.48,76.00],
      [38.91,77.62],[38.50,83.50],[37.12,79.92],[40.54,82.63],
      [41.86,83.83],[42.11,86.84],[39.75,88.75],[35.00,88.00],
      [39.75,88.75],
    ],
    keyPoints: [
      { ll:[38.28,75.10], name:'Музтаг-Ата', note:'Памирский старт и неудачные попытки восхождения' },
      { ll:[40.54,82.63], name:'Дандань-Уйлык', note:'Руины на южной окраине Такламакана' },
      { ll:[39.75,88.75], name:'Кара-Кошун', note:'Тогдашняя лобнорская озёрная система, нанесённая на карту' },
    ],
    mapBounds: [[34,69],[43,97]],
  },
];

function assignTimelineYears() {
  const groups = new Map();
  EXPEDITIONS.forEach(exp => {
    if (!groups.has(exp.year)) groups.set(exp.year, []);
    groups.get(exp.year).push(exp);
  });

  groups.forEach(group => {
    const mid = (group.length - 1) / 2;
    group.forEach((exp, index) => {
      exp.timelineYear = exp.year + (index - mid) * DUPLICATE_YEAR_STEP;
    });
  });
}

function applyRouteLibrary() {
  EXPEDITIONS.forEach(exp => {
    const entry = ROUTE_LIBRARY[exp.id] || (exp.id === 'hedin' ? HEDIN_1893_ROUTE : null);
    if (!entry) {
      exp.routeAccuracy = 'Схема';
      exp.routeSource ||= 'Схематическая реконструкция по ключевым пунктам';
      return;
    }

    exp.routeAccuracy = entry.accuracy || exp.routeAccuracy || 'Историческая реконструкция';
    exp.routeSource = entry.source || exp.routeSource;
    exp.routeSourceUrl = entry.url || exp.routeSourceUrl;

    if (Array.isArray(entry.routeParts) && entry.routeParts.length) {
      exp.routeParts = entry.routeParts;
    }
  });
}

applyRouteLibrary();
assignTimelineYears();

/* ── Layout helpers ─────────────────────────────────────── */
const dom = {};
const expeditionEls = new Map();
const layers = {};
let map = null;
let activeId = null;
let mapFocusTimer = null;
let raf = null;
let isDragging = false;
let dragStartX = 0;
let dragScrollStart = 0;
let didDrag = false;
let suppressClickUntil = 0;
let scrollbarTimer = null;
let wheelTarget = 0;
let wheelScrollRaf = null;

function cssPxVar(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function canvasH() {
  return dom.scrollWrap?.clientHeight || window.innerHeight - cssPxVar('--header-h', 64) - cssPxVar('--strip-h', 58);
}

function tlY() {
  return canvasH() * 0.5;
}

function yearToX(y) {
  return (y - START_YEAR) * PX_PER_YEAR;
}

function expToX(exp) {
  return yearToX(exp.timelineYear ?? exp.year);
}

function xToYear(x) {
  return START_YEAR + x / PX_PER_YEAR;
}

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function getFocusRatio() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--focus-pct').trim();
  if (raw.endsWith('%')) {
    const percent = Number.parseFloat(raw);
    if (!Number.isNaN(percent)) return percent / 100;
  }
  return FOCUS_RATIO;
}

function focusOffset() {
  return dom.scrollWrap.clientWidth * getFocusRatio();
}

function focusX(scrollX = dom.scrollWrap.scrollLeft) {
  return scrollX + focusOffset();
}

function focusYear(scrollX = dom.scrollWrap.scrollLeft) {
  return xToYear(focusX(scrollX));
}

function cardFallbackWidth() {
  return cssPxVar('--card-w', 248);
}

function cardFallbackHeight() {
  return cssPxVar('--card-h', 158);
}

function getRouteParts(exp) {
  if (Array.isArray(exp.routeParts) && exp.routeParts.length) {
    return exp.routeParts.filter(part => Array.isArray(part) && part.length > 1);
  }

  if (Array.isArray(exp.route) && exp.route.length > 1) return [exp.route];
  return [];
}

function getRoutePointCount(exp) {
  const detailedCount = getRouteParts(exp).reduce((total, part) => total + part.length, 0);
  return detailedCount || exp.route?.length || 0;
}

function getRouteSourceLabel(exp) {
  if (exp.routeSource) return exp.routeSource;
  return getRoutePointCount(exp) > 60
    ? 'Детализированный маршрут'
    : 'Реконструкция по опубликованным описаниям';
}

/* Lane top positions (absolute, from top of canvas) */
function laneTop(lane) {
  const h = canvasH();
  const tl = tlY();
  const cardHeight = cardFallbackHeight();
  const gap = 18;
  const upperMin = 12;
  const upperMax = Math.max(upperMin, tl - cardHeight - gap);
  const lowerMin = Math.min(h - cardHeight - 12, tl + gap);
  const lowerMax = Math.max(lowerMin, h - cardHeight - 12);
  const upperMid = upperMin + (upperMax - upperMin) * 0.52;
  const lowerMid = lowerMin + (lowerMax - lowerMin) * 0.52;

  switch (lane) {
    case 'a': return upperMin;
    case 'b': return upperMid;
    case 'c': return upperMax;
    case 'd': return lowerMin;
    case 'e': return lowerMid;
    case 'f': return lowerMax;
    default: return upperMax;
  }
}

function maxScrollLeft() {
  return Math.max(0, dom.canvas.scrollWidth - dom.scrollWrap.clientWidth);
}

function updateCanvasWidth() {
  const totalWidth = yearToX(END_YEAR + 1) + dom.scrollWrap.clientWidth;
  dom.canvas.style.width = `${totalWidth}px`;
  return totalWidth;
}

function showScrollbarTemporarily() {
  dom.scrollWrap.classList.add('show-bar');
  window.clearTimeout(scrollbarTimer);
  scrollbarTimer = window.setTimeout(() => {
    dom.scrollWrap.classList.remove('show-bar');
  }, 700);
}

function stopWheelAnimation() {
  if (wheelScrollRaf) cancelAnimationFrame(wheelScrollRaf);
  wheelScrollRaf = null;
  wheelTarget = dom.scrollWrap?.scrollLeft || 0;
}

function animateWheelScroll() {
  const current = dom.scrollWrap.scrollLeft;
  const next = current + (wheelTarget - current) * WHEEL_EASE;

  if (Math.abs(wheelTarget - next) < 0.45) {
    dom.scrollWrap.scrollLeft = wheelTarget;
    wheelScrollRaf = null;
    return;
  }

  dom.scrollWrap.scrollLeft = next;
  wheelScrollRaf = requestAnimationFrame(animateWheelScroll);
}

/* ── Build year ruler (bottom strip) ───────────────────── */
function buildRuler(totalWidth) {
  dom.yearRuler.style.width = `${totalWidth}px`;
  let html = '';
  for (let y = START_YEAR; y <= END_YEAR; y += 1) {
    const x = yearToX(y);
    const isDecade = y % 10 === 0;
    const isHalf = y % 5 === 0 && !isDecade;
    const cls = isDecade ? 'dec' : isHalf ? 'half' : 'yr';
    const height = isDecade ? 18 : isHalf ? 12 : 7;
    html += `<div class="yr-tick ${cls}" style="left:${x}px;height:${height}px"></div>`;
    if (isDecade) {
      html += `<div class="yr-label" style="left:${x}px">${y}</div>`;
    }
  }
  EXPEDITIONS.forEach(exp => {
    html += `<div class="yr-dot" style="left:${expToX(exp)}px;background:${exp.color}" title="${exp.name}"></div>`;
  });
  dom.yearRuler.innerHTML = html;
}

/* ── Build decade labels on timeline line ───────────────── */
function buildDecadeLabels() {
  let html = '';
  for (let y = 1860; y <= 1900; y += 10) {
    html += `<div class="decade-label" style="left:${yearToX(y)}px">${y}</div>`;
  }
  dom.decadeLabels.innerHTML = html;
}

function getYearsLabel(exp) {
  return exp.endYear > exp.year ? `${exp.year} – ${exp.endYear}` : `${exp.year}`;
}

function refreshExpeditionLayout() {
  const tl = tlY();

  EXPEDITIONS.forEach(exp => {
    const els = expeditionEls.get(exp.id);
    if (!els) return;

    const { card, connector } = els;
    const width = card.offsetWidth || cardFallbackWidth();
    const height = card.offsetHeight || cardFallbackHeight();
    const top = laneTop(exp.lane);
    const x = expToX(exp);
    const bottom = top + height;

    card.style.left = `${x - width / 2}px`;
    card.style.top = `${top}px`;
    connector.style.left = `${x + 0.5}px`;

    if (bottom < tl) {
      connector.style.display = 'block';
      connector.style.top = `${bottom}px`;
      connector.style.height = `${Math.max(0, tl - bottom)}px`;
    } else if (top > tl) {
      connector.style.display = 'block';
      connector.style.top = `${tl}px`;
      connector.style.height = `${Math.max(0, top - tl)}px`;
    } else {
      connector.style.display = 'none';
    }
  });
}

/* ── Create expedition cards ────────────────────────────── */
function buildCards() {
  const fragment = document.createDocumentFragment();

  EXPEDITIONS.forEach(exp => {
    const card = document.createElement('div');
    card.className = `exp-card${exp.isDeath ? ' is-death' : ''}`;
    card.id = `card-${exp.id}`;
    card.style.borderTopColor = exp.isDeath ? '#666' : exp.color;
    card.innerHTML = `
      <div class="card-year" style="color:${exp.isDeath ? '#888' : exp.color}">${exp.year}</div>
      <div class="card-name">${exp.fullName}</div>
      <div class="card-title">${exp.title}</div>
      <div class="card-tags">
        <span class="card-tag">${exp.country}</span>
        <span class="card-tag">${exp.region.split('·')[0].trim().split('→')[0].trim()}</span>
        <span class="card-tag">${getYearsLabel(exp)}</span>
      </div>
      <div class="card-dist">${exp.distance} · ${exp.duration}</div>
    `;
    card.addEventListener('click', () => {
      if (performance.now() < suppressClickUntil) return;
      scrollToExpedition(exp);
    });

    const connector = document.createElement('div');
    connector.className = 'exp-connector';
    connector.id = `conn-${exp.id}`;

    expeditionEls.set(exp.id, { card, connector });
    fragment.append(card, connector);
  });

  dom.canvas.appendChild(fragment);
  refreshExpeditionLayout();
}

/* ── Leaflet map ────────────────────────────────────────── */
function initMap() {
  if (!window.L) {
    document.getElementById('main-map').innerHTML = '<div class="map-fallback">Карта временно недоступна</div>';
    return;
  }

  const lineRenderer = L.canvas({ padding: 0.4 });

  map = L.map('main-map', {
    center: [42, 82],
    zoom: 3,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true,
    preferCanvas: true,
    zoomSnap: 0.25,
  });

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap · © CARTO', maxZoom: 14 }
  ).addTo(map);

  EXPEDITIONS.forEach(exp => {
    const routeParts = getRouteParts(exp);

    if (!routeParts.length) {
      if (exp.route && exp.route.length === 1) {
        const marker = L.circleMarker(exp.route[0], {
          radius: 7,
          color: exp.color,
          fillColor: exp.color,
          fillOpacity: 0.82,
          weight: 2,
        }).addTo(map).bindPopup(`
          <div class="popup-year">${exp.country} ${exp.year}</div>
          <div class="popup-title">${exp.fullName}</div>
          <div class="popup-body">${exp.summary}</div>
        `);
        layers[exp.id] = { lines: [], markers: [marker], exp };
      }
      return;
    }

    const lines = routeParts.map(routePart =>
      L.polyline(routePart, {
        renderer: lineRenderer,
        color: exp.color,
        weight: 2.4,
        opacity: 0.24,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false,
      }).addTo(map)
    );

    const markers = exp.keyPoints.map(point =>
      L.circleMarker(point.ll, {
        radius: 4,
        color: exp.color,
        fillColor: exp.color,
        fillOpacity: 0.6,
        weight: 1.5,
        opacity: 0.38,
      }).addTo(map).bindPopup(`
        <div class="popup-year">${exp.country} ${point.name}</div>
        <div class="popup-title">${exp.name}</div>
        <div class="popup-body">${point.note}</div>
      `)
    );

    layers[exp.id] = { lines, markers, exp };
  });
}

function invalidateMapSize() {
  if (!map) return;
  map.invalidateSize({ pan: false, animate: false });
}

function showWelcomeMapInfo() {
  dom.mapInfoEmpty.style.display = 'block';
  dom.mapInfoCard.style.display = 'none';
}

function updateMapInfo(exp) {
  dom.mapInfoEmpty.style.display = 'none';
  dom.mapInfoCard.style.display = 'block';

  dom.miTag.textContent = `${exp.country} · ${getYearsLabel(exp)}`;
  dom.miTag.style.background = `${exp.color}30`;
  dom.miTag.style.color = exp.color;
  dom.miTag.style.border = `1px solid ${exp.color}50`;

  dom.miName.textContent = exp.fullName;
  dom.miTitle.textContent = exp.title;
  dom.miMeta.textContent = `${exp.region} · ${exp.distance} · ${exp.duration}`;
  dom.miSource.textContent = `${exp.routeAccuracy || 'Маршрут'} · ${getRoutePointCount(exp)} точек`;
  dom.miSource.title = exp.routeSourceUrl
    ? `${getRouteSourceLabel(exp)} — ${exp.routeSourceUrl}`
    : getRouteSourceLabel(exp);
  dom.miDiscoveries.innerHTML = `<ul>${exp.discoveries.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function scheduleMapFocus(exp, immediate = false) {
  if (!map || !exp?.mapBounds) return;
  window.clearTimeout(mapFocusTimer);

  const run = () => {
    map.stop();
    map.flyToBounds(exp.mapBounds, {
      paddingTopLeft: [28, 28],
      paddingBottomRight: [28, 28],
      maxZoom: 7,
      duration: 0.85,
      easeLinearity: 0.2,
      noMoveStart: true,
    });
  };

  if (immediate) {
    run();
  } else {
    mapFocusTimer = window.setTimeout(run, MAP_FLY_DELAY);
  }
}

function resetLayerState() {
  EXPEDITIONS.forEach(exp => {
    const layer = layers[exp.id];
    if (!layer) return;

    layer.lines.forEach(line => {
      line.setStyle({ weight: 2.4, opacity: 0.2 });
    });

    layer.markers.forEach(marker => {
      if (marker.setStyle) {
        marker.setStyle({ opacity: 0.34, fillOpacity: 0.34 });
      }
    });
  });
}

function activateExpedition(id, options = {}) {
  const { immediateMap = false } = options;
  if (!id) {
    activeId = null;
    showWelcomeMapInfo();
    return;
  }
  if (id === activeId && !immediateMap) return;

  activeId = id;
  resetLayerState();

  const exp = EXPEDITIONS.find(item => item.id === id);
  const layer = layers[id];
  if (!exp) return;

  layer?.lines.forEach(line => {
    line.setStyle({ weight: 4.8, opacity: 0.94 });
  });
  layer?.markers.forEach(marker => {
    if (marker.setStyle) {
      marker.setStyle({ opacity: 1, fillOpacity: 0.92 });
    }
  });

  updateMapInfo(exp);
  scheduleMapFocus(exp, immediateMap);
}

/* ── Scroll logic ───────────────────────────────────────── */
function findActiveExpedition(currentFocusYear) {
  let bestExp = null;
  let bestDist = Infinity;

  EXPEDITIONS.forEach(exp => {
    const dist = Math.abs((exp.timelineYear ?? exp.year) - currentFocusYear);
    if (dist < bestDist) {
      bestDist = dist;
      bestExp = exp;
    }
  });

  return bestDist <= ACTIVE_YEAR_WINDOW ? bestExp : null;
}

function updateCardStates(currentFocusYear, activeExpId) {
  EXPEDITIONS.forEach(exp => {
    const els = expeditionEls.get(exp.id);
    if (!els) return;

    const timelineYear = exp.timelineYear ?? exp.year;
    const diff = timelineYear - currentFocusYear;
    const isActive = exp.id === activeExpId;
    const isPast = diff < -ACTIVE_YEAR_WINDOW;

    els.card.classList.toggle('is-active', isActive);
    els.card.classList.toggle('is-past', isPast);
    els.connector.classList.toggle('is-active', isActive);
    els.connector.classList.toggle('is-past', isPast);
  });
}

function onScroll() {
  showScrollbarTemporarily();
  if (raf) cancelAnimationFrame(raf);

  raf = requestAnimationFrame(() => {
    raf = null;

    const sx = dom.scrollWrap.scrollLeft;
    const currentFocusYear = focusYear(sx);
    const displayYear = Math.round(clamp(currentFocusYear, START_YEAR, END_YEAR));
    const activeExp = findActiveExpedition(currentFocusYear);

    dom.currentYearNum.textContent = displayYear;
    dom.yearRuler.style.transform = `translateX(${-sx}px)`;
    updateCardStates(currentFocusYear, activeExp?.id);

    if (activeExp) {
      dom.expNameDisplay.textContent = `— ${activeExp.name}`;
      activateExpedition(activeExp.id);
    } else {
      dom.expNameDisplay.textContent = '';
      if (activeId) {
        activeId = null;
        resetLayerState();
        showWelcomeMapInfo();
      }
    }
  });
}

function onWheel(event) {
  if (event.ctrlKey) return;

  const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
    ? event.deltaX
    : event.deltaY;

  if (!horizontalDelta) return;

  event.preventDefault();
  showScrollbarTemporarily();
  if (!wheelScrollRaf) wheelTarget = dom.scrollWrap.scrollLeft;
  wheelTarget = clamp(wheelTarget + horizontalDelta * 1.12, 0, maxScrollLeft());
  if (!wheelScrollRaf) wheelScrollRaf = requestAnimationFrame(animateWheelScroll);
}

/* ── Drag-to-scroll ─────────────────────────────────────── */
function endDragging() {
  if (didDrag) {
    suppressClickUntil = performance.now() + 120;
  }
  isDragging = false;
  didDrag = false;
  wheelTarget = dom.scrollWrap.scrollLeft;
  dom.scrollWrap.classList.remove('show-bar');
}

function onPointerDown(event) {
  stopWheelAnimation();
  isDragging = true;
  didDrag = false;
  dragStartX = event.clientX;
  dragScrollStart = dom.scrollWrap.scrollLeft;
  dom.scrollWrap.setPointerCapture(event.pointerId);
  showScrollbarTemporarily();
}

function onPointerMove(event) {
  if (!isDragging) return;

  const dx = event.clientX - dragStartX;
  if (Math.abs(dx) > 4) didDrag = true;
  dom.scrollWrap.scrollLeft = clamp(dragScrollStart - dx, 0, maxScrollLeft());
}

/* ── Keyboard navigation ────────────────────────────────── */
function scrollToExpedition(exp, behavior = 'smooth') {
  stopWheelAnimation();
  const targetLeft = clamp(expToX(exp) - focusOffset(), 0, maxScrollLeft());
  dom.scrollWrap.scrollTo({ left: targetLeft, behavior });
}

function onKeyDown(event) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

  const currentFocusYear = focusYear();
  const sorted = [...EXPEDITIONS].sort((a, b) => (a.timelineYear ?? a.year) - (b.timelineYear ?? b.year));
  const target = event.key === 'ArrowRight'
    ? sorted.find(exp => (exp.timelineYear ?? exp.year) > currentFocusYear + 0.05)
    : [...sorted].reverse().find(exp => (exp.timelineYear ?? exp.year) < currentFocusYear - 0.05);

  if (!target) return;
  event.preventDefault();
  scrollToExpedition(target);
}

function bindEvents() {
  dom.scrollWrap.addEventListener('scroll', onScroll, { passive: true });
  dom.scrollWrap.addEventListener('wheel', onWheel, { passive: false });
  dom.scrollWrap.addEventListener('pointerdown', onPointerDown);
  dom.scrollWrap.addEventListener('pointermove', onPointerMove);
  dom.scrollWrap.addEventListener('pointerup', endDragging);
  dom.scrollWrap.addEventListener('pointercancel', endDragging);
  dom.scrollWrap.addEventListener('lostpointercapture', endDragging);
  document.addEventListener('keydown', onKeyDown);

  window.addEventListener('resize', () => {
    const totalWidth = updateCanvasWidth();
    buildRuler(totalWidth);
    buildDecadeLabels();
    refreshExpeditionLayout();
    invalidateMapSize();
    onScroll();
  });
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  dom.canvas = document.getElementById('canvas');
  dom.scrollWrap = document.getElementById('scroll-wrap');
  dom.yearRuler = document.getElementById('year-ruler');
  dom.decadeLabels = document.getElementById('decade-labels');
  dom.currentYearNum = document.getElementById('current-year-num');
  dom.expNameDisplay = document.getElementById('exp-name-display');
  dom.hdrCount = document.getElementById('hdr-count');
  dom.mapInfoEmpty = document.getElementById('map-info-empty');
  dom.mapInfoCard = document.getElementById('map-info-card');
  dom.miTag = document.getElementById('mi-tag');
  dom.miName = document.getElementById('mi-name');
  dom.miTitle = document.getElementById('mi-title');
  dom.miMeta = document.getElementById('mi-meta');
  dom.miSource = document.getElementById('mi-source');
  dom.miDiscoveries = document.getElementById('mi-discoveries');
  dom.hdrCount.textContent = `${EXPEDITIONS.length} маршрутов`;

  const totalWidth = updateCanvasWidth();
  buildRuler(totalWidth);
  buildDecadeLabels();
  buildCards();
  initMap();
  bindEvents();
  showWelcomeMapInfo();

  requestAnimationFrame(() => {
    refreshExpeditionLayout();
    invalidateMapSize();
    window.setTimeout(invalidateMapSize, 280);
    const firstExpedition = [...EXPEDITIONS].sort((a, b) => (a.timelineYear ?? a.year) - (b.timelineYear ?? b.year))[0];
    scrollToExpedition(firstExpedition, 'auto');
    onScroll();
  });
});
