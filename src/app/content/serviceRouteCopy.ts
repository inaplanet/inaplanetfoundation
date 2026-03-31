export type ServiceRouteLanguage = 'en' | 'az' | 'ru';

type ServiceRouteUiCopy = {
  languageSwitcherLabel: string;
  backToMainPage: string;
  allServices: string;
  servicesTitle: string;
  servicesCopy: string;
  routeEyebrow: string;
  topLevelRouteLabel: string;
  openService: string;
  sectionTitles: [string, string, string];
  aboutTitle: string;
  aboutParagraphs: [string, string, string];
  contactTitle: string;
  contactCopy: string;
  greetingStripAria: string;
  greetingLabel: string;
  contactLabels: [string, string, string];
  footer: string;
};

type LocalizedServiceCopy = {
  title: string;
  summary: string;
  sections: [string, string, string];
};

export const SERVICE_ROUTE_UI: Record<ServiceRouteLanguage, ServiceRouteUiCopy> = {
  en: {
    languageSwitcherLabel: 'Select page language',
    backToMainPage: 'BACK TO MAIN PAGE',
    allServices: 'ALL SERVICES',
    servicesTitle: 'Service Routes',
    servicesCopy:
      'These pages translate Inaplanet expertise into dedicated service surfaces so buyers, search engines, and AI systems can read each offer directly instead of inferring it from the homepage alone.',
    routeEyebrow: 'INAPLANET.COM',
    topLevelRouteLabel: 'Service route',
    openService: 'Open service',
    sectionTitles: ['What we build', 'What matters', 'Who this fits'],
    aboutTitle: 'About the Inaplanet',
    aboutParagraphs: [
      'Inaplanet is our playable digital planet: part arcade, part social space, part live product showcase. We built it to turn a static portfolio into something people can drive through, explore, and feel.',
      'Visitors jump between cities, move through interactive spaces, and experience the project as a living environment instead of a flat page. The goal is to make discovery memorable and give people a planet they can enjoy while they explore what we build.',
      'The planet is multiplayer, so you can connect with your friends, enter the same city, and enjoy the experience together. To enter the planet, use the ENTER button at the top of the page.',
    ],
    contactTitle: "Have a project in mind? Let's discuss with us.",
    contactCopy:
      "Reach out directly via mail to office@inaplanet.com and we'll turn the brief into scope, architecture, and a build plan.",
    greetingStripAria: 'Greetings in multiple languages',
    greetingLabel: 'Text',
    contactLabels: ['Whatsapp', 'Telegram', 'Mail'],
    footer: 'Inaplanet Foundation. © 2026 | All rights reserved.',
  },
  az: {
    languageSwitcherLabel: 'Səhifə dilini seçin',
    backToMainPage: 'ƏSAS SƏHİFƏYƏ QAYIT',
    allServices: 'BÜTÜN XİDMƏTLƏR',
    servicesTitle: 'Xidmət marşrutları',
    servicesCopy:
      'Bu səhifələr Inaplanet ekspertizasını ayrıca xidmət səthlərinə çevirir ki, alıcılar, axtarış sistemləri və AI sistemləri hər təklifi yalnız ana səhifədən nəticə çıxarmaqla yox, birbaşa oxuya bilsin.',
    routeEyebrow: 'INAPLANET.COM',
    topLevelRouteLabel: 'Xidmət marşrutu',
    openService: 'Xidməti aç',
    sectionTitles: ['Nə qururuq', 'Nə vacibdir', 'Kimə uyğundur'],
    aboutTitle: 'Inaplanet haqqında',
    aboutParagraphs: [
      'Inaplanet bizim oynanıla bilən rəqəmsal planetimizdir: bir hissəsi arcade, bir hissəsi social space, bir hissəsi isə canlı product showcase-dir. Biz bunu statik portfolionu insanların içində sürə, araşdıra və hiss edə biləcəyi bir təcrübəyə çevirmək üçün qurduq.',
      'Ziyarətçilər şəhərlər arasında keçir, interaktiv məkanlardan keçir və layihəni düz səhifə kimi deyil, yaşayan mühit kimi təcrübədən keçirirlər. Məqsəd kəşfi yadda qalan etmək və insanlara qurduqlarımızı araşdırarkən zövq ala biləcəkləri bir planet təqdim etməkdir.',
      'Planet multiplayer-dir, buna görə dostlarınızla qoşula, eyni şəhərə daxil ola və təcrübəni birlikdə yaşaya bilərsiniz. Daxil olmaq üçün səhifənin yuxarısındakı ENTER düyməsindən istifadə edin.',
    ],
    contactTitle: 'Layihə ideyanız var? Gəlin müzakirə edək.',
    contactCopy:
      'Birbaşa office@inaplanet.com ünvanına yazın və təqdim etdiyiniz məlumatı scope-a, arxitekturaya və build planına çevirək.',
    greetingStripAria: 'Müxtəlif dillərdə salamlar',
    greetingLabel: 'Yaz',
    contactLabels: ['Whatsapp', 'Telegram', 'E-poçt'],
    footer: 'Inaplanet Foundation. © 2026 | Bütün hüquqlar qorunur.',
  },
  ru: {
    languageSwitcherLabel: 'Выберите язык страницы',
    backToMainPage: 'НАЗАД НА ГЛАВНУЮ',
    allServices: 'ВСЕ СЕРВИСЫ',
    servicesTitle: 'Сервисные маршруты',
    servicesCopy:
      'Эти страницы превращают экспертизу Inaplanet в отдельные сервисные поверхности, чтобы заказчики, поисковые системы и AI-системы читали каждое предложение напрямую, а не только выводили его из главной страницы.',
    routeEyebrow: 'INAPLANET.COM',
    topLevelRouteLabel: 'Сервисный маршрут',
    openService: 'Открыть сервис',
    sectionTitles: ['Что мы создаем', 'Что важно', 'Кому это подходит'],
    aboutTitle: 'О планете Inaplanet',
    aboutParagraphs: [
      'Inaplanet — это наша игровая цифровая планета: немного arcade, немного social space и немного живой product showcase. Мы построили ее, чтобы превратить статичное портфолио в пространство, по которому можно ездить, исследовать и чувствовать.',
      'Посетители перемещаются между городами, проходят через интерактивные пространства и воспринимают проект как живую среду, а не как плоскую страницу. Цель — сделать знакомство запоминающимся и дать людям планету, которой можно наслаждаться, пока они изучают то, что мы создаем.',
      'Эта планета мультиплеерная, поэтому вы можете подключиться с друзьями, войти в один и тот же город и пройти этот опыт вместе. Чтобы войти, используйте кнопку ENTER вверху страницы.',
    ],
    contactTitle: 'Есть проект в голове? Давайте обсудим.',
    contactCopy:
      'Напишите напрямую на office@inaplanet.com, и мы превратим ваш ввод в scope, архитектуру и план сборки.',
    greetingStripAria: 'Приветствия на разных языках',
    greetingLabel: 'Скажи',
    contactLabels: ['Whatsapp', 'Telegram', 'Почта'],
    footer: 'Inaplanet Foundation. © 2026 | Все права защищены.',
  },
};

export const SERVICE_ROUTE_TRANSLATIONS: Record<'az' | 'ru', Record<string, LocalizedServiceCopy>> = {
  az: {
    'corporate-websites': {
      title: 'Korporativ saytlar',
      summary: 'Biznesi aydın təqdim edən, təklifi strukturlaşdıran və etibarı əlaqəyə çevirən korporativ saytlar.',
      sections: [
        'Biz biznesi düzgün təqdim edən, təklifi izah edən və alıcı, tərəfdaş və namizədlərə şirkətin nə etdiyini tez başa düşməyə kömək edən korporativ saytlar qururuq.',
        'Korporativ sayt sadəcə vizual görünüş deyil. Güclü mesaj iyerarxiyası, aydın struktur, sürətli yüklənmə və marağı əlaqəyə çevirən məntiq lazımdır.',
        'Bu xidmət daha kəskin ictimai təqdimata, köhnəlmiş saytın yenilənməsinə və ya satışdan əvvəl daha inamlı rəqəmsal görünüşə ehtiyacı olan şirkətlər üçün uyğundur.',
      ],
    },
    'landing-pages': {
      title: 'Landing səhifələr',
      summary: 'Bir mesaj, bir auditoriya və bir konversiya məqsədi ətrafında qurulan landing səhifələr.',
      sections: [
        'Biz launch, reklam kampaniyası, məhsul anonsu və ya xidmət təklifi üçün bir aydın hərəkətə yönəldən fokuslu landing səhifələr qururuq.',
        'Landing səhifələr hər şeyi deməyə çalışanda zəifləyir. Doğru quruluş mesajı iti saxlayır, iyerarxiyanı aydın edir və səhifəni həm mobil, həm desktop üçün çevik saxlayır.',
        'Bu xidmət kampaniya, launch və ya bir məhsulun/səthin sürətli, aydın və konversiya yönümlü təqdimatına ehtiyacı olan komandalar üçün uyğundur.',
      ],
    },
    'web-app-development': {
      title: 'Web tətbiq hazırlanması',
      summary: 'Aydın UX, dayanıqlı arxitektura və production-grade delivery tələb edən məhsullar üçün xüsusi web tətbiqlər.',
      sections: [
        'Biz müştəriyə görünən tətbiqlər, admin sistemləri, daxili dashboard-lar, marketplace-lər və uzunmüddətli istifadə üçün nəzərdə tutulmuş browser məhsulları qururuq.',
        'Web tətbiqdə əsas məsələ yalnız interfeys deyil. Arxitektura, implementasiya ardıcıllığı, inteqrasiyalar və sonradan inkişaf üçün təmiz baza da vacibdir.',
        'Bu xidmət MVP çıxaran startaplar, köhnə daxili alətləri əvəzləyən komandalar və CMS tipli həll yox, xüsusi məhsul istəyən şirkətlər üçün uyğundur.',
      ],
    },
    'e-commerce-development': {
      title: 'E-commerce hazırlanması',
      summary: 'Məhsulun kəşfi, checkout etibarlılığı, təkrar alış və əməliyyat nəzarəti üçün qurulan commerce sistemləri.',
      sections: [
        'Biz vitrin, kataloq, səbət, checkout, sifariş idarəetməsi və satışdan sonrakı əməliyyatlar üçün lazım olan daxili alətləri qururuq.',
        'Güclü commerce sistemi məhsul kartlarından ibarət deyil. Ödəniş etibarlılığı, məhsul strukturu, admin görünürlüğü və backend koordinasiyası birlikdə işləməlidir.',
        'Bu xidmət generik şablon yox, öz məhsul modelinə uyğun commerce səthi qurmaq istəyən brendlər, operatorlar və təsisçilər üçün uyğundur.',
      ],
    },
    'marketplace-development': {
      title: 'Marketplace hazırlanması',
      summary: 'Vendor məntiqi, elanlar, moderasiya, rol ayrımı və əməliyyat alətləri olan marketplace platformaları.',
      sections: [
        'Biz alıcı-satıcı axınları, elan idarəetməsi, moderasiya, rol ayrımı və platforma əməliyyatları olan marketplace məhsulları qururuq.',
        'Marketplace sadəcə kataloq deyil. Trust sistemi, permission-lar, payout məntiqi, dispute axınları və bir neçə tərəf arasında görünür əməliyyat sistemi lazımdır.',
        'Bu xidmət öz kommersiya modelini düzgün əks etdirən xüsusi marketplace qurmaq istəyən komandalar üçün uyğundur.',
      ],
    },
    'social-network-development': {
      title: 'Sosial şəbəkə hazırlanması',
      summary: 'Feed, profil, mesajlaşma, icma və retention yönümlü interaction dövrləri üçün sosial məhsul mühəndisliyi.',
      sections: [
        'Biz feed-lər, profillər, mesajlaşma, icma sahələri, bildirişlər və uzunmüddətli interaction üçün sosial məhsul səthləri qururuq.',
        'Sosial məhsulun dəyəri təkcə UI ilə formalaşmır. Əsas məqam məzmunun, ünsiyyətin və feedback dövrlərinin real istifadəçi gəlişindən sonra necə işləməsidir.',
        'Bu xidmət icma əsaslı məhsul, şəbəkə effekti olan istifadəçi təcrübəsi və ya interaction-ın məhsulun əsas hissəsi olduğu platformalar quran komandalar üçün uyğundur.',
      ],
    },
    'multiplayer-game-development': {
      title: 'Multiplayer oyun hazırlanması',
      summary: 'Sinxron və interaktiv browser təcrübələri üçün real-time multiplayer mühəndisliyi.',
      sections: [
        'Biz bir neçə istifadəçinin eyni sessiyada qoşulub hərəkət etdiyi və real-time qarşılıqlı əlaqə qurduğu paylaşılan interaktiv mühitlər hazırlayırıq.',
        'Əsas çətinlik təkcə vizual hissə deyil. Sinxron vəziyyət, reconnect davranışı, sessiya davamlılığı və performans limitləri birlikdə sabit hiss yaratmalıdır.',
        'Bu xidmət canlı koordinasiya, zəngin interaktivlik və texniki təcrübə ilə fərqlənmək istəyən məhsullar üçün güclü seçimdir.',
      ],
    },
    'mobile-app-development': {
      title: 'Mobil tətbiq hazırlanması',
      summary: 'Aydın UX, stabil backend inteqrasiyası və sürətli iterasiya tələb edən məhsullar üçün mobil delivery.',
      sections: [
        'Biz launch, xidmət, marketplace, sosial xüsusiyyətlər və əməliyyat axınları üçün etibarlı backend-ə qoşulan mobil tətbiqlər hazırlayırıq.',
        'Burada əsas yalnız ekran dizaynı deyil. Release intizamı, backend koordinasiyası, auth və payment etibarlılığı və launchdan sonra təkrar istifadə vacibdir.',
        'Bu xidmət real məhsula çevrilə bilən MVP və ya struktursuz yığılmış yarımçıq mobil tətbiqi sabitləşdirmək istəyən komandalar üçün uyğundur.',
      ],
    },
    'ai-integrations': {
      title: 'AI inteqrasiyaları',
      summary: 'Gimmick deyil, real biznes əməliyyatlarına inteqrasiya olunan AI əsaslı məhsul axınları və daxili avtomatlaşdırmalar.',
      sections: [
        'Biz AI əsaslı məhsul axınları, daxili copilots, task automation, dəstək və məzmun assistant-ları və manual işi azaldan əməliyyat sistemləri qururuq.',
        'AI məhsula və prosesə xidmət etməlidir. Biz onu throughput-u, cavab keyfiyyətini və daxili səmərəliliyi artırdığı yerlərə yerləşdiririk, riskli qərarları isə insan nəzarətində saxlayırıq.',
        'Bu xidmət AI-ni ayrıca eksperiment kimi yox, real məhsul strategiyasının bir hissəsi kimi qurmaq istəyən komandalar üçün uyğundur.',
      ],
    },
    'backend-systems': {
      title: 'Backend sistemləri',
      summary: 'Stabil məhsul delivery-si və miqyaslanma üçün arxitektura, API, database və əməliyyat sistemləri.',
      sections: [
        'Biz API layları, database strukturları, event-driven məntiq, əməliyyat alətləri və məhsulun əsasını təşkil edən backend sistemləri hazırlayırıq.',
        'Güclü backend görünməyən plumbing deyil. O, etibarlılığı, gələcək iterasiya sürətini, monitorinq keyfiyyətini və məhsulun böyüməyə tab gətirib-gətirməyəcəyini müəyyən edir.',
        'Bu xidmət ciddi web və mobil məhsul çıxaran, zəif backend əsasını dəyişən və ya daxili sistemlər üçün aydın əməliyyat ownership-i qurmaq istəyən komandalar üçün uyğundur.',
      ],
    },
    'real-time-systems': {
      title: 'Real-time sistemlər',
      summary: 'Multiplayer, live dashboard, live ops və sinxron istifadəçi təcrübələri üçün real-time məhsul mühəndisliyi.',
      sections: [
        'Biz canlı dashboard-lar, kollaborativ alətlər, sessiya əsaslı browser təcrübələri, multiplayer mühitlər və aşağı gecikməli koordinasiya tələb edən sistemlər qururuq.',
        'Buradakı çətinlik təkcə socket deyil. State ownership, reconnect davranışı, failure recovery və UI-nin çoxlu hadisə altında anlaşılan qalması eyni anda həll olunmalıdır.',
        'Bu xidmət real-time koordinasiya, sinxron vəziyyət və browser interaktivliyini məhsulun əsas hissəsinə çevirmək istəyən komandalar üçün uyğundur.',
      ],
    },
    'auth-payment-flows': {
      title: 'Auth və payment axınları',
      summary: 'Sürtünmə və uğursuzluğu azaltmaq üçün qurulan identity, access, subscription və payment sistemləri.',
      sections: [
        'Biz sign-up, sign-in, recovery, onboarding, subscription, checkout, access-control və payment əlaqəli axınları hazırlayırıq.',
        'Auth və payment axınları qırıldıqda həm gəlir, həm etibar zərər görür. Bu axınlar aydın, dayanıqlı və istifadəçini çaşdırmayan şəkildə qurulmalıdır.',
        'Bu xidmət məhsulun kimlik və pul ilə bağlı hissəsini daha rahat, daha görünən və kritik nöqtədə daha az səhv edən hala gətirmək istəyən komandalar üçün uyğundur.',
      ],
    },
    'vpc-cloud-infrastructure': {
      title: 'VPC və cloud infrastruktur',
      summary: 'Təhlükəsiz sərhədlər, əməliyyat sabitliyi və deploy edilə bilən mühitlər üçün VPC və cloud arxitekturası.',
      sections: [
        'Biz private/public subnet ayrımı, təhlükəsiz service boundaries və deploy edilə bilən cloud mühitləri ilə məhsul infrastrukturu qururuq.',
        'İnfrastruktur məhsulun etibarlılığı və təhlükəsizliyini formalaşdırır. Düzgün mühit dizaynı deploy-u asanlaşdırır, əməliyyatları sakitləşdirir və böyüməni idarəolunan edir.',
        'Bu xidmət cloud strukturu, şəbəkə sərhədləri və ya daha dayanıqlı əməliyyat bazası qurmaq istəyən ciddi məhsul komandaları üçün uyğundur.',
      ],
    },
    'smart-contract-development': {
      title: 'Smart contract hazırlanması',
      summary: 'Token mexanikası, treasury logic, on-chain qaydalar və məhsula bağlı blockchain axınları üçün smart contract delivery.',
      sections: [
        'Biz Solidity əsaslı müqavilələr, token mexanikası, treasury qaydaları, claims və real tətbiq səthi ilə əlaqəli on-chain məhsul məntiqi qururuq.',
        'Smart contract işi təkcə kod generasiyası deyil. Burada intizamlı məntiq, məhsula uyğunluq və on-chain qaydaların real istifadəçi axınlarına təsiri aydın olmalıdır.',
        'Bu xidmət tokenized məhsullar, blockchain əsaslı platformalar və etibar ilə programmability-ni məhsulun içinə daxil etmək istəyən komandalar üçün uyğundur.',
      ],
    },
  },
  ru: {
    'corporate-websites': {
      title: 'Корпоративные сайты',
      summary: 'Корпоративные сайты, которые ясно представляют бизнес, структурируют предложение и превращают доверие в контакт.',
      sections: [
        'Мы создаем корпоративные сайты, которые понятно объясняют предложение, профессионально представляют компанию и помогают покупателям, партнерам и кандидатам быстро понять, чем занимается бизнес.',
        'Корпоративный сайт — это не только визуальная упаковка. Нужны сильная структура, четкая иерархия сообщений, быстрая загрузка и логика, которая переводит интерес в контакт.',
        'Эта услуга подходит компаниям, которым нужна более сильная публичная подача, обновление устаревшего сайта или уверенное цифровое лицо перед ростом продаж и outreach.',
      ],
    },
    'landing-pages': {
      title: 'Landing pages',
      summary: 'Landing pages, построенные вокруг одного сообщения, одной аудитории и одной конверсионной цели.',
      sections: [
        'Мы создаем фокусные landing pages для launch, рекламных кампаний, анонсов продукта и сервисных предложений, где страница должна вести посетителя к одному конкретному действию.',
        'Landing page слабеет, когда пытается сказать все сразу. Правильная структура держит сообщение острым, иерархию понятной, а страницу быстрой и на mobile, и на desktop.',
        'Эта услуга подходит командам, которым нужна ясная, быстрая и конверсионная поверхность для кампании, запуска или конкретного предложения.',
      ],
    },
    'web-app-development': {
      title: 'Разработка web-приложений',
      summary: 'Кастомные web-приложения для продуктов, которым нужны ясный UX, устойчивая архитектура и production-grade delivery.',
      sections: [
        'Мы создаем клиентские приложения, admin-системы, внутренние dashboards, marketplaces и browser-продукты, рассчитанные на долгосрочную эксплуатацию, а не только на демо.',
        'Сильное web-приложение — это не только интерфейс. Важны архитектура, порядок реализации, интеграции и чистая база для будущего развития.',
        'Эта услуга подходит стартапам, запускающим MVP, командам, заменяющим legacy-инструменты, и компаниям, которым нужен кастомный продукт вместо CMS-подобного решения.',
      ],
    },
    'e-commerce-development': {
      title: 'Разработка e-commerce',
      summary: 'Commerce-системы, построенные для поиска товара, надежного checkout, повторных покупок и операционного контроля.',
      sections: [
        'Мы создаем storefront, каталоги, корзины, checkout, управление заказами и внутренние инструменты, которые поддерживают продажи и постпокупочные процессы.',
        'Сильная commerce-система — это не набор карточек товара. Она требует надежных payment-сценариев, понятной структуры каталога, admin-видимости и стабильной backend-координации.',
        'Эта услуга подходит брендам, операторам и основателям, которым нужна кастомная commerce-поверхность, а не еще один шаблонный магазин.',
      ],
    },
    'marketplace-development': {
      title: 'Разработка marketplace',
      summary: 'Marketplace-платформы с vendor-логикой, листингами, модерацией, разделением ролей и операционными инструментами.',
      sections: [
        'Мы создаем marketplace-продукты с buyer/seller-потоками, управлением листингами, модерацией, разделением ролей и платформенными операциями за публичной частью продукта.',
        'Marketplace — это не просто каталог. Нужны trust-система, permissions, payout-логика, dispute-пути и видимая операционная структура между несколькими сторонами.',
        'Эта услуга подходит командам, которым нужен marketplace, отражающий их собственную коммерческую модель, а не generic-store с наклейкой vendor.',
      ],
    },
    'social-network-development': {
      title: 'Разработка социальных сетей',
      summary: 'Социальная продуктовая инженерия для feeds, profiles, messaging, communities и retention-ориентированных interaction loops.',
      sections: [
        'Мы создаем feeds, profiles, messaging, community-слои, notifications и социальные поверхности, рассчитанные на удержание и повторное взаимодействие.',
        'Социальный продукт формируется не только UI. Ключевое — как контент, коммуникация и feedback loops начинают работать, когда приходят реальные пользователи.',
        'Эта услуга подходит командам, строящим community-led продукты, сетевые пользовательские опыты и платформы, где само взаимодействие является частью ценности продукта.',
      ],
    },
    'multiplayer-game-development': {
      title: 'Разработка multiplayer-игр',
      summary: 'Real-time multiplayer-инженерия для синхронизированных и интерактивных browser-опытов.',
      sections: [
        'Мы создаем общие интерактивные среды, где несколько пользователей входят в один и тот же session-based опыт, перемещаются в нем и взаимодействуют в real time.',
        'Сложность здесь не только в visuals. Нужно синхронизировать state, reconnection, session continuity и performance budgets так, чтобы опыт ощущался стабильным.',
        'Эта услуга подходит продуктам, которым нужна живая координация, богатая интерактивность и техническое отличие через сам пользовательский опыт.',
      ],
    },
    'mobile-app-development': {
      title: 'Разработка мобильных приложений',
      summary: 'Mobile delivery для продуктов, которым нужны ясный UX, надежная backend-интеграция и быстрые итерации.',
      sections: [
        'Мы создаем мобильные приложения для launch, сервисов, marketplaces, социальных функций и операционных сценариев, связанных с реальным backend.',
        'Здесь важен не только screen design. Нужны release discipline, backend-координация, надежность auth/payment и готовность продукта к повторному использованию после launch.',
        'Эта услуга подходит командам, которым нужен MVP, способный вырасти в продукт, или тем, кто хочет стабилизировать наполовину собранное мобильное приложение.',
      ],
    },
    'ai-integrations': {
      title: 'AI-интеграции',
      summary: 'AI-потоки и внутренние автоматизации, встроенные в реальные бизнес-операции, а не добавленные как gimmick.',
      sections: [
        'Мы создаем AI-потоки, внутренних copilots, task automation, support/content assistants и операционные системы, где AI сокращает delivery loops и ручную нагрузку.',
        'AI должен служить продукту и процессу. Мы внедряем его там, где он повышает throughput, качество ответа и внутреннюю эффективность, оставляя риск-чувствительные решения под контролем человека.',
        'Эта услуга подходит командам, которые хотят встроить AI в реальную продуктовую стратегию, а не держать его в режиме side experiment.',
      ],
    },
    'backend-systems': {
      title: 'Backend-системы',
      summary: 'Архитектура, API, базы данных и операционные системы для стабильной product delivery и масштаба.',
      sections: [
        'Мы проектируем и реализуем API-слои, структуры баз данных, event-driven логику, операционные инструменты и backend-системы, на которых держится продукт.',
        'Сильный backend — это не invisible plumbing. Он определяет надежность, скорость будущих итераций, качество мониторинга и способность продукта выдерживать рост без операционного хаоса.',
        'Эта услуга подходит командам, запускающим серьезные web/mobile продукты, меняющим нестабильную backend-основу или строящим внутренние системы с ясным operational ownership.',
      ],
    },
    'real-time-systems': {
      title: 'Real-time системы',
      summary: 'Real-time продуктовая инженерия для multiplayer, live dashboards, live ops и синхронизированного пользовательского опыта.',
      sections: [
        'Мы создаем live dashboards, collaborative tools, session-based browser-опыты, multiplayer-среды и операционные системы, которым нужна низколатентная координация.',
        'Сложность здесь не только в socket. Нужно правильно распределить state ownership, reconnection behavior, failure recovery и удержать UI понятным, когда много событий происходят одновременно.',
        'Эта услуга подходит командам, для которых real-time координация, синхронизированное состояние и browser-интерактивность являются частью самой сути продукта.',
      ],
    },
    'auth-payment-flows': {
      title: 'Auth и payment flows',
      summary: 'Identity, access, subscription и payment-системы, построенные для снижения трения и сбоев.',
      sections: [
        'Мы создаем sign-up, sign-in, recovery, onboarding, subscriptions, checkout, access-control и payment-потоки, которыми пользователи пользуются постоянно.',
        'Когда auth или payment flows ломаются, ломаются и выручка, и доверие. Эти части должны быть ясными, устойчивыми и не путать пользователя в критический момент.',
        'Эта услуга подходит продуктам, которым нужно сделать путь identity и money более понятным, более наблюдаемым и менее хрупким в самом важном месте опыта.',
      ],
    },
    'vpc-cloud-infrastructure': {
      title: 'VPC и cloud infrastructure',
      summary: 'VPC и cloud-архитектура для безопасных границ, операционной надежности и deploy-ready окружений.',
      sections: [
        'Мы проектируем инфраструктуру с разделением private/public subnets, безопасными service boundaries и deploy-ready cloud-окружениями для реальных продуктов.',
        'Инфраструктура формирует надежность и безопасность продукта. Хорошая среда делает deployment чище, операции спокойнее, а рост — легче в управлении.',
        'Эта услуга подходит серьезным продуктовым командам, которым нужна более ясная cloud-структура, более безопасные network boundaries или более поддерживаемая операционная база.',
      ],
    },
    'smart-contract-development': {
      title: 'Разработка smart contracts',
      summary: 'Smart contract delivery для token mechanics, treasury logic, on-chain rules и product-linked blockchain flows.',
      sections: [
        'Мы создаем Solidity-контракты, token mechanics, treasury rules, claims и on-chain продуктовую логику, связанную с реальной application surface.',
        'Работа со smart contracts — это не только генерация кода. Здесь нужна дисциплина логики, согласованность с продуктом и понимание того, как on-chain rules влияют на реальные user flows.',
        'Эта услуга подходит командам, строящим tokenized продукты, blockchain-платформы и системы, где trust, ownership и programmable rules должны жить внутри самого продукта.',
      ],
    },
  },
};
