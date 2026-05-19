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
const FOCUS_RATIO  = 0.32;
const MAP_FLY_DELAY = 140;

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
      [42.84,75.30],[42.46,76.19],[42.49,78.38],[43.25,76.90],
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
      { ll:[42.49,78.38], name:'Каракол', note:'Восточный берег Иссык-Куля' },
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
    region: 'Тегеран → Мешхед → Хива → Бухара → Самарканд',
    distance: '~5 000 км', duration: '14 месяцев',
    summary: 'Венгерский ориенталист шёл как «дервиш Решид-эфенди»: через Мешхед и Мерв в Хиву, затем в Бухару и Самарканд, а возвращался через Герат. Главная ошибка прежней версии была в том, что Хива стояла не на своём месте.',
    discoveries: [
      'Подробные описания Хивы, Бухары и Самарканда до русского завоевания',
      'Наблюдения над туркменами и городами ханств',
      'Лингвистические материалы по тюркским языкам',
    ],
    route: [
      [35.69,51.39],[36.30,59.60],[37.60,61.83],[41.37,60.36],
      [39.78,64.43],[39.65,66.95],[38.86,65.80],[39.78,64.43],
      [37.60,61.83],[34.35,62.20],[36.30,59.60],[35.69,51.39],
    ],
    keyPoints: [
      { ll:[36.30,59.60], name:'Мешхед', note:'Переход из Ирана в караванный маршрут Средней Азии' },
      { ll:[41.37,60.36], name:'Хива', note:'Первый крупный центр ханств на его пути' },
      { ll:[34.35,62.20], name:'Герат', note:'Ключевой пункт обратного пути из Бухары и Самарканда' },
    ],
    mapBounds: [[32.5,49],[43,70]],
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
    title: 'Монголия, Пекин, Кукунор и северный Тибет',
    region: 'Кяхта → Урга → Пекин → Алашань → Кукунор',
    distance: '11 800 км', duration: '2 г. 10 мес.',
    summary: 'Первая центральноазиатская экспедиция вела не только к Кукунору: Пржевальский прошёл через Ургу и Пекин, затем через Алашань и Цайдам в северотибетские пространства. Это был полноценный прорыв из Монголии к границам Тибета.',
    discoveries: [
      'Первое русское научное описание озера Кукунор',
      '100+ новых видов птиц',
      'Коллекции из Монголии, Алашани и северного Тибета',
    ],
    route: [
      [50.38,106.45],[47.90,106.90],[40.00,116.40],[39.50,105.00],
      [36.74,100.55],[35.30,97.20],[37.37,95.30],[35.00,92.50],
      [37.37,95.30],[39.50,105.00],[47.90,106.90],[50.38,106.45],
    ],
    keyPoints: [
      { ll:[50.38,106.45], name:'Кяхта', note:'Начало всех монгольских экспедиций' },
      { ll:[40.00,116.40], name:'Пекин', note:'Ключевой, часто забываемый участок первой экспедиции' },
      { ll:[36.74,100.55], name:'Кукунор', note:'Главная научная цель экспедиции 1870–1873 годов' },
    ],
    mapBounds: [[34,92],[52,117]],
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
    region: 'Зайсан → Хами → Цайдам → Кукунор → Тибет',
    distance: '~7 815 км', duration: '19 месяцев',
    summary: 'Третья экспедиция прошла через Хами и Цайдам к Кукунору и далее на северотибетское плато, где была остановлена примерно в 250–260 км от Лхасы. Кукунор в прежней версии маршрута вообще отсутствовал, хотя был важнейшим узлом пути.',
    discoveries: [
      'Открытие лошади Пржевальского (Equus przewalskii)',
      'Первое описание Цайдамской котловины',
      'Подход к Лхасе через северный Тибет и вынужденный поворот назад',
    ],
    route: [
      [47.47,84.87],[44.03,89.52],[42.83,93.51],[42.95,89.19],
      [40.17,90.62],[37.37,95.30],[36.74,100.55],[31.48,92.06],
      [36.74,100.55],[42.83,93.51],[47.47,84.87],
    ],
    keyPoints: [
      { ll:[42.83,93.51], name:'Хами', note:'Подтверждённый вход в тибетский маршрут с севера' },
      { ll:[36.74,100.55], name:'Кукунор', note:'Главный озёрный узел перед выходом на плато' },
      { ll:[31.48,92.06], name:'Северный Тибет', note:'Здесь экспедицию развернули на подходе к Лхасе' },
    ],
    mapBounds: [[30,84],[49,101]],
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
    mapBounds: [[33,73],[43,129]],
  },

  {
    id: 'grabczewski', name: 'Громбчевский', fullName: 'Бронислав Громбчевский',
    flag: '🇷🇺', country: 'RU', color: '#C03060',
    year: 1888, endYear: 1890, lane: 'e',
    title: 'Памир, Рашкем и подножие K2',
    region: 'Маргелан → Памир → Рашкем → Хотан',
    distance: '~6 500 км', duration: '2.5 года',
    summary: 'Это не «Грум-Гржимайло», а именно Бронислав Громбчевский (польск. Grąbczewski). Его маршруты в 1888–1890 годах шли из Ферганы на Памир, к ваханским и хунзинским рубежам, затем в долину Рашкема и к северной стене Каракорума.',
    discoveries: [
      'Детальная съёмка Памира и пограничных долин «Большой игры»',
      'Маршрутные сведения о Рашкеме и северной стороне Каракорума',
      'Связь каракорумских путей с Хотаном и Каракашем',
    ],
    route: [
      [40.47,71.72],[40.52,72.79],[38.20,73.50],[36.93,73.24],
      [36.32,74.65],[36.74,75.42],[35.90,76.51],[36.80,78.20],[37.12,79.92],[36.85,81.68],
    ],
    keyPoints: [
      { ll:[40.47,71.72], name:'Маргелан', note:'Ферганская отправная база Громбчевского' },
      { ll:[36.74,75.42], name:'Долина Рашкема', note:'Здесь он встретился с Янгхазбендом в 1889 году' },
      { ll:[37.12,79.92], name:'Хотан', note:'Западнокитайский узел позднего этапа 1889–1890 годов' },
    ],
    mapBounds: [[35,71],[41,82]],
  },

  {
    id: 'prz5', name: 'Пржевальский V †', fullName: 'Николай Пржевальский',
    flag: '🇷🇺', country: 'RU', color: '#606060',
    year: 1888, endYear: 1888, lane: 'b',
    title: 'Последняя экспедиция',
    region: 'Самарканд → Ташкент → Пишпек → Каракол',
    distance: '—', duration: 'прервана',
    summary: 'Пятая экспедиция не успела развернуться: Пржевальский шёл к Иссык-Кулю как к базе нового выхода в Тибет, но 1 ноября 1888 года умер от тифа в Караколе. Это скорее точка смерти и несостоявшегося старта, чем полноценный маршрут.',
    discoveries: [
      'Скончался 1 ноября 1888 г. в Караколе',
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
    year: 1889, endYear: 1891, lane: 'a',
    title: 'Таримский бассейн, Куньлунь и северный Тибет',
    region: 'Зайсан → Турфан → Кашгар → Хотан → Лоб-Нор',
    distance: '~9 000 км', duration: '2 года',
    summary: 'Певцов возглавил отряд после смерти Пржевальского и работал до 1891 года вместе с Роборовским и Козловым. Маршрут охватывал Турфан, Аксу, Кашгар, Хотан, Керию, северный Тибет и Лоб-Нор.',
    discoveries: [
      'Детальная карта Кашгарии и Хотанского оазиса',
      'Маршрутные наблюдения в северном Тибете',
      'Продолжение работ по Куньлуню и Лоб-Нору',
    ],
    route: [
      [47.47,84.87],[44.03,89.52],[42.95,89.19],[41.17,80.26],
      [39.48,76.00],[38.42,77.25],[37.12,79.92],[36.85,81.68],
      [35.20,85.50],[40.17,90.62],[37.12,79.92],[39.48,76.00],[47.47,84.87],
    ],
    keyPoints: [
      { ll:[42.95,89.19], name:'Турфан', note:'Восточный вход в синьцзянский сектор экспедиции' },
      { ll:[37.12,79.92], name:'Хотан', note:'Ключевой оазис и база работ у Куньлуня' },
      { ll:[35.20,85.50], name:'Северный Тибет', note:'Певцов действительно выходил на тибетский рубеж' },
    ],
    mapBounds: [[35,76],[49,96]],
  },

  {
    id: 'roborovsky', name: 'Роборовский', fullName: 'Всеволод Роборовский',
    flag: '🇷🇺', country: 'RU', color: '#1870A0',
    year: 1893, endYear: 1895, lane: 'd',
    title: 'Восточный Тянь-Шань и Таримский бассейн',
    region: 'Зайсан → Джунгарские ворота → Турфан → Хами → Тарим',
    distance: '~14 000 км', duration: '2.5 года',
    summary: 'Собственная экспедиция Роборовского шла через Джунгарские ворота в Турфан и Хами, затем в восточный Тянь-Шань и Лобскую область. Так маршрут лучше соответствует его восточнотяньшанскому фокусу и раннему возвращению после инсульта в 1895 году.',
    discoveries: [
      'Подробная карта восточного Тянь-Шаня',
      'Маршрутная съёмка восточного Таримского бассейна',
      'Богатые ботанические коллекции из пустынной окраины Лопа',
    ],
    route: [
      [47.47,84.87],[45.20,82.50],[44.03,89.52],[42.95,89.19],
      [42.83,93.51],[41.76,86.15],[40.50,89.50],[39.90,88.00],
      [42.95,89.19],[44.03,89.52],[47.47,84.87],
    ],
    keyPoints: [
      { ll:[45.20,82.50], name:'Джунгарские ворота', note:'Ключевой проход из степей в Синьцзян' },
      { ll:[42.83,93.51], name:'Хами', note:'Подтверждённый узел восточного Тянь-Шаня' },
      { ll:[40.50,89.50], name:'Лобская область', note:'Восточный край Таримского бассейна' },
    ],
    mapBounds: [[39,82],[48,95]],
  },

  {
    id: 'hedin', name: 'Свен Хедин', fullName: 'Свен Хедин',
    flag: '🇸🇪', country: 'SE', color: '#2048C8',
    year: 1893, endYear: 1897, lane: 'f',
    title: 'Первая Центральноазиатская экспедиция',
    region: 'Памир → Кашгар → Такламакан → Кара-Кошун → Тибет',
    distance: '~12 000 км', duration: '4 года',
    summary: 'Первая центральноазиатская экспедиция Хедина шла из Памира в Кашгар, через смертельно опасное пересечение Такламакана к Хотану, Дандань-Уйлыку, озеру Бостен и Кара-Кошуну, а затем в северный Тибет. Для этой поездки важнее говорить о Кара-Кошуне и лобнорской системе, чем о позднейшем открытии Лоуланя.',
    discoveries: [
      'Съёмка путей Памира и Кашгарии',
      'Пересечение пустыни Такламакан в 1895–1896 годах',
      'Карта Кара-Кошуна и подвижной лобнорской озёрной системы',
    ],
    route: [
      [41.31,69.28],[40.52,72.79],[38.28,75.10],[39.48,76.00],
      [38.50,83.50],[40.54,82.63],[37.12,79.92],[42.11,86.84],[39.75,88.75],
      [35.00,88.00],[39.75,88.75],
    ],
    keyPoints: [
      { ll:[38.28,75.10], name:'Музтаг-Ата', note:'Памирский старт и неудачные попытки восхождения' },
      { ll:[40.54,82.63], name:'Дандань-Уйлык', note:'Руины на южной окраине Такламакана' },
      { ll:[39.75,88.75], name:'Кара-Кошун', note:'Тогдашняя лобнорская озёрная система, нанесённая на карту' },
    ],
    mapBounds: [[34,69],[43,90]],
  },
];

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

/* Lane top positions (absolute, from top of canvas) */
function laneTop(lane) {
  const h = canvasH();
  const tl = tlY();
  const cardHeight = 152;
  switch (lane) {
    case 'a': return Math.max(12, tl - 420);
    case 'b': return Math.max(12, tl - 286);
    case 'c': return Math.max(12, tl - 158);
    case 'd': return tl + 20;
    case 'e': return tl + 152;
    case 'f': return Math.min(h - cardHeight - 12, tl + 298);
    default: return tl - 160;
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
    html += `<div class="yr-dot" style="left:${yearToX(exp.year)}px;background:${exp.color}" title="${exp.name}"></div>`;
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
    const width = card.offsetWidth || CARD_W;
    const height = card.offsetHeight || 148;
    const top = laneTop(exp.lane);
    const x = yearToX(exp.year);
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
      <div class="card-name">${exp.flag} ${exp.fullName}</div>
      <div class="card-title">${exp.title}</div>
      <div class="card-tags">
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
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap · © CARTO', maxZoom: 14 }
  ).addTo(map);

  EXPEDITIONS.forEach(exp => {
    if (!exp.route || exp.route.length < 2) {
      if (exp.route && exp.route.length === 1) {
        const marker = L.circleMarker(exp.route[0], {
          radius: 7,
          color: exp.color,
          fillColor: exp.color,
          fillOpacity: 0.82,
          weight: 2,
        }).addTo(map).bindPopup(`
          <div class="popup-year">${exp.flag} ${exp.year}</div>
          <div class="popup-title">${exp.fullName}</div>
          <div class="popup-body">${exp.summary}</div>
        `);
        layers[exp.id] = { line: null, markers: [marker], exp };
      }
      return;
    }

    const line = L.polyline(exp.route, {
      renderer: lineRenderer,
      color: exp.color,
      weight: 2.2,
      opacity: 0.2,
      lineCap: 'round',
      lineJoin: 'round',
      interactive: false,
    }).addTo(map);

    const markers = exp.keyPoints.map(point =>
      L.circleMarker(point.ll, {
        radius: 4,
        color: exp.color,
        fillColor: exp.color,
        fillOpacity: 0.6,
        weight: 1.5,
        opacity: 0.38,
      }).addTo(map).bindPopup(`
        <div class="popup-year">${exp.flag} ${point.name}</div>
        <div class="popup-title">${exp.name}</div>
        <div class="popup-body">${point.note}</div>
      `)
    );

    layers[exp.id] = { line, markers, exp };
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

  dom.miTag.textContent = `${exp.flag} ${exp.country} · ${getYearsLabel(exp)}`;
  dom.miTag.style.background = `${exp.color}30`;
  dom.miTag.style.color = exp.color;
  dom.miTag.style.border = `1px solid ${exp.color}50`;

  dom.miName.textContent = exp.fullName;
  dom.miTitle.textContent = exp.title;
  dom.miMeta.textContent = `${exp.region} · ${exp.distance} · ${exp.duration}`;
  dom.miDiscoveries.innerHTML = exp.discoveries.map(item => `<li>${item}</li>`).join('');
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

    if (layer.line) {
      layer.line.setStyle({ weight: 2.2, opacity: 0.18 });
    }

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
  if (!exp || !layer) return;

  if (layer.line) {
    layer.line.setStyle({ weight: 4.6, opacity: 0.94 });
  }
  layer.markers.forEach(marker => {
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
    const dist = Math.abs(exp.year - currentFocusYear);
    if (dist < bestDist) {
      bestDist = dist;
      bestExp = exp;
    }
  });

  return bestDist <= 1.75 ? bestExp : null;
}

function updateCardStates(currentFocusYear) {
  EXPEDITIONS.forEach(exp => {
    const els = expeditionEls.get(exp.id);
    if (!els) return;

    const diff = exp.year - currentFocusYear;
    const isActive = Math.abs(diff) <= 1.5;
    const isPast = diff < -1.5;

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
    updateCardStates(currentFocusYear);

    if (activeExp) {
      dom.expNameDisplay.textContent = `— ${activeExp.name}`;
      activateExpedition(activeExp.id);
    } else {
      dom.expNameDisplay.textContent = '';
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
  dom.scrollWrap.scrollLeft = clamp(
    dom.scrollWrap.scrollLeft + horizontalDelta,
    0,
    maxScrollLeft()
  );
}

/* ── Drag-to-scroll ─────────────────────────────────────── */
function endDragging() {
  if (didDrag) {
    suppressClickUntil = performance.now() + 120;
  }
  isDragging = false;
  didDrag = false;
  dom.scrollWrap.classList.remove('show-bar');
}

function onPointerDown(event) {
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
  const targetLeft = clamp(yearToX(exp.year) - focusOffset(), 0, maxScrollLeft());
  dom.scrollWrap.scrollTo({ left: targetLeft, behavior });
}

function onKeyDown(event) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

  const currentFocusYear = focusYear();
  const sorted = [...EXPEDITIONS].sort((a, b) => a.year - b.year);
  const target = event.key === 'ArrowRight'
    ? sorted.find(exp => exp.year > currentFocusYear + 0.3)
    : [...sorted].reverse().find(exp => exp.year < currentFocusYear - 0.3);

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
    updateCanvasWidth();
    buildRuler(dom.canvas.scrollWidth);
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
  dom.mapInfoEmpty = document.getElementById('map-info-empty');
  dom.mapInfoCard = document.getElementById('map-info-card');
  dom.miTag = document.getElementById('mi-tag');
  dom.miName = document.getElementById('mi-name');
  dom.miTitle = document.getElementById('mi-title');
  dom.miMeta = document.getElementById('mi-meta');
  dom.miDiscoveries = document.getElementById('mi-discoveries');

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
    scrollToExpedition(EXPEDITIONS[1], 'auto');
    onScroll();
  });
});
