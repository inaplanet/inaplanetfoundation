'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { addSignalEffect, removeSignalEffect } from './globe'; // Adjust path as necessary
import {
  FaAws,
  FaBriefcase,
  FaBroadcastTower,
  FaCube,
  FaDatabase,
  FaGamepad,
  FaNodeJs,
  FaReact,
  FaRedo,
  FaRobot,
  FaServer,
  FaStore,
  FaTelegramPlane,
  FaUserShield,
  FaUsers,
  FaWhatsapp,
  FaWindowMaximize,
} from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { BiLogoTypescript } from 'react-icons/bi';
import { MdLocalMall, MdMailOutline } from 'react-icons/md';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { SiCss3, SiDigitalocean, SiDocker, SiExpress, SiExpo, SiFlutter, SiJavascript, SiMongodb, SiNetlify, SiPostgresql, SiPython, SiRedis, SiSolidity, SiThreedotjs, SiVercel, SiWebrtc } from 'react-icons/si';
import { TbBrandReactNative, TbBrandSocketIo } from 'react-icons/tb';
import { getOrCreatePlayerIdentity } from './javascript/Utils/playerIdentity.js';
import { createRandomStarterLoadout } from './javascript/Utils/playerLoadout.js';
import CoreStackCluster from './CoreStackCluster';
import CoreStackTicker from './CoreStackTicker';
import PlanetFooterSection from './PlanetFooterSection';
import SignatureComponent from './SignatureComponent';
import { SITE_EMAIL } from './content/site';
import { getLocalePath, type SiteLocale } from './i18n';
import { useDeferredLanguageFont } from './useDeferredLanguageFont';

// Dynamically import the Application component and disable SSR
const Application = dynamic(() => import('./javascript/Application'), {
  ssr: false,
  loading: () => null,
});

const CORE_STACK_VARIANT: 'ticker' | 'cluster' = 'cluster';

const LANGUAGE_OPTIONS = [
  { code: 'az', label: 'AZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'ENG' },
] as const;

const MODAL_COPY = {
  en: {
    languageSwitcherLabel: 'Select modal language',
    enterButton: 'ENTER THE PLANET',
    heroTitle: 'Designs & ships digital products for real business use.',
    heroCopy: 'Web and mobile apps, backend systems, payment flows, and product infrastructure built to launch cleanly, run reliably, and scale with demand.',
    chips: {
      web: 'Web Apps',
      mobile: 'Mobile Apps',
      backendDesktop: 'Backend Systems',
      backendMobile: 'Backend',
    },
    heroKicker: 'Operational Focus',
    heroMetrics: [
      'Strategy to architecture',
      'Execution across the stack',
      'Launch-ready product delivery',
    ],
    heroNote: "It's no longer the big beating the small, but the fast beating the slow.",
    highlights: [
      { title: 'Scope', copy: 'We turn rough briefs into a clear build plan.' },
      { title: 'Execution', copy: 'Frontend, backend, integrations, and tooling move as one system.' },
      { title: 'Launch', copy: 'Production readiness matters more than demo polish.' },
    ],
    professionalServicesEyebrow: 'Professional Services',
    professionalServicesTitle: 'How we deliver a high-quality product',
    professionalServicesCopy: 'High-quality products do not come from random implementation. We turn rough briefs, half-built systems, technical debt, and ambitious ideas into a delivery structure that protects quality from scope through launch.',
    workMechanismTitle: 'How we work',
    workMechanismItems: [
      {
        question: 'How do you start a project?',
        answer: 'We translate the brief into a technical task, delivery phases, priorities, and a realistic launch path instead of starting with blind implementation.',
      },
      {
        question: 'How is AI applied in delivery?',
        answer: 'AI is used to accelerate research, implementation drafts, QA thinking, and documentation, while architecture, security-sensitive flows, and review discipline stay under human ownership.',
      },
      {
        question: 'Why is AI important for strong products?',
        answer: 'It shortens iteration cycles, increases execution bandwidth, and helps teams test more product ideas before slower competitors can react.',
      },
      {
        question: 'What does the client actually get?',
        answer: 'A working delivery system: product architecture, implementation, integrations, deployment structure, and a path to scale after launch.',
      },
    ],
    coreStackTitle: 'Core Stack',
    clientsTitle: 'What Clients Usually Bring',
    clientsEyebrow: 'TECHNICAL TASK',
    clientsCopy: 'A rough brief, a technical task, a Figma file, a half-built product, or an operational bottleneck. We translate that into architecture, implementation, deadline planning, delivery structure, deployment, and iteration.',
    clientFaqItems: [
      {
        question: 'What if the brief is still unclear?',
        answer: 'That is normal. We help turn rough intent into scope, priorities, and a realistic implementation path before the build starts drifting.',
      },
      {
        question: 'What if there is already a half-built product?',
        answer: 'We review what is reusable, what is blocking progress, and what should be rebuilt so the next phase is cleaner instead of more expensive.',
      },
      {
        question: 'What if the problem is operational, not visual?',
        answer: 'Then we focus on the underlying system: flows, backend logic, admin visibility, and the parts of the product that are creating friction in day-to-day use.',
      },
      {
        question: 'What do clients usually need first?',
        answer: 'Usually they need clarity on priorities, launch order, and what should be shipped now versus later so the product moves forward without wasting time.',
      },
    ],
    deliveryTitle: 'Delivery Model',
    deliverySteps: [
      { title: '1. Discovery', copy: 'Clarify goals, constraints, and scope.' },
      { title: '2. Build', copy: 'Implement product, infrastructure, and integrations.' },
      { title: '3. Launch', copy: 'Ship with monitoring, polish, and a path to scale.' },
    ],
    expertiseTitle: 'Our Expertise',
    expertiseIntro: 'Product work usually spans multiple layers. We build the business-facing surface, the operational system behind it, and the infrastructure needed to run it. The focus stays on writing native code for both frontend and backend to bring high-quality products to life.',
    expertiseItems: [
      {
        title: 'Corporate website',
        description: 'Clear corporate websites that present the business well, explain the offer, and convert interest into contact.',
      },
      {
        title: 'Landing page',
        description: 'Focused campaign pages built around one conversion goal, fast load time, and strong message hierarchy.',
      },
      {
        title: 'E-commerce',
        description: 'Storefronts, catalog systems, carts, checkout, and admin flows built for sales and repeat use.',
      },
      {
        title: 'Marketplace',
        description: 'Multi-vendor platforms with listings, role separation, moderation, payout logic, and operational tooling.',
      },
      {
        title: 'Social networks',
        description: 'Profiles, feeds, messaging, communities, and social loops designed for retention and interaction.',
      },
      {
        title: 'Multiplayer games',
        description: 'Shared interactive environments with synchronized state, session logic, and real-time player experience.',
      },
      {
        title: 'Backend systems',
        description: 'APIs, databases, queues, admin tooling, and service orchestration designed for stable product operations.',
      },
      {
        title: 'Real-time operations',
        description: 'Live dashboards, socket-driven updates, presence, notifications, and coordination systems that react instantly.',
      },
      {
        title: 'Auth / Payment flow',
        description: 'Identity, access control, subscriptions, payments, and recovery flows built to reduce friction and failure.',
      },
      {
        title: 'VPC servers',
        subtitle: 'private/public subnets',
        description: 'Infrastructure layouts with secure network boundaries, isolated services, and deployable cloud environments.',
      },
      {
        title: 'Smart contracts',
        subtitle: 'Tokenomics',
        description: 'Solidity-based token mechanics, treasury logic, claims, and onchain product rules tied to real user flows.',
      },
      {
        title: 'AI workflows',
        description: 'Task automation, assistants, internal copilots, and AI-powered flows integrated into real product operations.',
      },
    ],
    worldTitle: 'About the Inaplanet',
    worldParagraphs: [
      'Inaplanet is our playable digital planet: part arcade, part social space, part live product showcase. We built it to turn a static portfolio into something people can drive through, explore, and feel.',
      'Visitors jump between cities, move through interactive spaces, and experience the project as a living environment instead of a flat page. The goal is to make discovery memorable and give people a planet they can enjoy while they explore what we build.',
      'The planet is multiplayer, so you can connect with your friends, enter the same city, and enjoy the experience together. To enter the planet, use the ENTER button at the top of the page.',
    ],
    contactTitle: "Have a project in mind?",
    contactCopy: "Reach out directly via mail to office@inaplanet.com and we'll turn the brief into scope, architecture, and a build plan.",
    greetingStripAria: 'Greetings in multiple languages',
    greetingLabel: 'Text',
    contactLabels: ['Whatsapp', 'Telegram', 'Mail'],
    footer: 'Inaplanet Foundation. © 2026 | All rights reserved.',
  },
  az: {
    languageSwitcherLabel: 'Modal dilini seçin',
    enterButton: 'PLANETƏ DAXİL OL',
    heroTitle: 'Real biznes istifadəsi üçün rəqəmsal məhsulları dizayn edir və təhvil verir.',
    heroCopy: 'Saytlar, tətbiqlər, backend sistemləri, ödəniş axınları və məhsul infrastrukturu launch üçün hazır, sabit işləyən və artan tələblə birlikdə böyüyən şəkildə qurulur.',
    chips: {
      web: 'Web tətbiqlər',
      mobile: 'Mobil tətbiqlər',
      backendDesktop: 'Backend sistemləri',
      backendMobile: 'Backend',
    },
    heroKicker: 'Əməliyyat fokusu',
    heroMetrics: [
      'Strategiyadan arxitekturaya',
      'Bütün stack üzrə icra',
      'Buraxılışa hazır məhsul təhvili',
    ],
    heroNote: 'Artıq böyük olan kiçik olanı deyil, sürətli olan yavaş olanı geridə qoyur.',
    highlights: [
      { title: 'Əhatə dairəsi', copy: 'Qeyri-müəyyən briefi aydın build planına çeviririk.' },
      { title: 'İcra', copy: 'Frontend, backend, inteqrasiyalar və alətlər bir sistem kimi işləyir.' },
      { title: 'Buraxılış', copy: 'Demo görünüşündən çox production hazırlığı vacibdir.' },
    ],
    professionalServicesEyebrow: 'Professional Services',
    professionalServicesTitle: 'Yüksək keyfiyyətli məhsulu necə çatdırırıq',
    professionalServicesCopy: 'Yüksək keyfiyyətli məhsul təsadüfi implementasiyadan yaranmır. Biz qeyri-dəqiq briefi, yarımçıq sistemi, texniki borcu və iddialı ideyanı scope-dan launch-a qədər keyfiyyəti qoruyan delivery strukturuna çeviririk.',
    workMechanismTitle: 'İş mexanizmimiz',
    workMechanismItems: [
      {
        question: 'Layihəyə necə başlayırıq?',
        answer: 'Blind implementasiya ilə başlamırıq. Briefi texniki tapşırığa, mərhələli delivery-yə, prioritetlərə və real launch yoluna çeviririk.',
      },
      {
        question: 'AI delivery-də necə tətbiq olunur?',
        answer: 'AI research-i, ilkin implementasiya draft-larını, QA düşüncəsini və dokumentasiyanı sürətləndirir, amma arxitektura, security-sensitive axınlar və review intizamı insan ownership-də qalır.',
      },
      {
        question: 'AI niyə güclü məhsul üçün vacibdir?',
        answer: 'O, iterasiya dövrünü qısaldır, icra tutumunu artırır və komandaya daha yavaş rəqiblər reaksiya vermədən əvvəl daha çox məhsul ideyasını yoxlamağa imkan verir.',
      },
      {
        question: 'Müştəri sonda nə əldə edir?',
        answer: 'İşləyən delivery sistemi: məhsul arxitekturası, implementasiya, inteqrasiyalar, deploy strukturu və launchdan sonrakı miqyaslanma yolu.',
      },
    ],
    coreStackTitle: 'Əsas texnologiyalar',
    clientsTitle: 'Müştərilər adətən nə ilə gəlir',
    clientsEyebrow: 'TEXNİKİ TAPŞIRIQ',
    clientsCopy: 'Qeyri-dəqiq brief, texniki tapşırıq, Figma faylı, yarımçıq məhsul və ya əməliyyat bottleneck-i ilə. Biz bunu arxitektura, implementasiya, deadline planlaması, təhvil strukturu, deploy və iterasiyaya çeviririk. Bu da adətən prioritetləri aydınlaşdırmaq, əvvəl nəyin çatdırılacağını müəyyən etmək və qeyri-müəyyən başlanğıcı praktik launch yoluna çevirmək deməkdir.',
    clientFaqItems: [
      {
        question: 'Brief hələ dəqiq deyilsə necə?',
        answer: 'Bu normaldır. Build istiqamətsiz getməzdən əvvəl qeyri-dəqiq niyyəti scope-a, prioritetlərə və real implementasiya yoluna çeviririk.',
      },
      {
        question: 'Əgər artıq yarımçıq məhsul varsa?',
        answer: 'Nəyin istifadə oluna biləcəyini, nəyin prosesi blokladığını və növbəti mərhələnin daha təmiz getməsi üçün nəyin yenidən qurulmalı olduğunu müəyyən edirik.',
      },
      {
        question: 'Problem vizual yox, əməliyyatdırsa?',
        answer: 'Onda əsas diqqəti sistemin özünə yönəldirik: axınlar, backend məntiqi, admin görünürlüğü və gündəlik istifadədə sürtünmə yaradan hissələr.',
      },
      {
        question: 'Müştərinin ilk ehtiyacı adətən nə olur?',
        answer: 'Əksər hallarda prioritetlərin, launch sırasının və indi nəyi, sonra nəyi çatdırmağın aydın olması lazımdır ki, məhsul vaxt itirmədən irəliləsin.',
      },
    ],
    deliveryTitle: 'Təhvil modeli',
    deliverySteps: [
      { title: '1. Kəşf', copy: 'Məqsədləri, məhdudiyyətləri və scope-u dəqiqləşdiririk.' },
      { title: '2. Quruluş', copy: 'Məhsulu, infrastrukturu və inteqrasiyaları həyata keçiririk.' },
      { title: '3. Buraxılış', copy: 'Monitorinq, son cilalar və miqyaslanma yolu ilə məhsulu təqdim edirik.' },
    ],
    expertiseTitle: 'Ekspertizamız',
    expertiseIntro: 'Məhsul işi adətən bir neçə təbəqədən ibarət olur. Biz biznesə görünən səthi, arxadakı əməliyyat sistemini və onu işlədən infrastrukturu qururuq. Əsas fokusumuz yüksək keyfiyyətli məhsulları həyata keçirmək üçün həm frontend, həm də backend üçün native code yazmaqdır.',
    expertiseItems: [
      {
        title: 'Şirkət saytı',
        description: 'Biznesi düzgün təqdim edən, təklifi izah edən və marağı əlaqəyə çevirən korporativ saytlar.',
      },
      {
        title: 'Landing page',
        description: 'Bir konversiya məqsədi ətrafında qurulan, sürətli yüklənən və güclü mesaj iyerarxiyası olan səhifələr.',
      },
      {
        title: 'E-commerce',
        description: 'Satış və təkrar istifadə üçün qurulan vitrinlər, kataloq sistemləri, səbət, checkout və admin axınları.',
      },
      {
        title: 'Marketplace',
        description: 'Elanlar, rol ayrımı, moderasiya, payout məntiqi və əməliyyat alətləri olan multi-vendor platformalar.',
      },
      {
        title: 'Sosial şəbəkələr',
        description: 'Retention və interaction üçün qurulan profillər, feed-lər, mesajlaşma, icmalar və sosial dövrlər.',
      },
      {
        title: 'Multiplayer oyunlar',
        description: 'Sinxron vəziyyət, sessiya məntiqi və real-time oyunçu təcrübəsi olan paylaşılmış interaktiv mühitlər.',
      },
      {
        title: 'Backend sistemləri',
        description: 'Stabil məhsul əməliyyatları üçün qurulan API-lər, databazalar, queue-lar, admin alətləri və servis orkestrasyonu.',
      },
      {
        title: 'Real-time əməliyyatlar',
        description: 'Ani reaksiya verən canlı dashboard-lar, socket əsaslı yenilənmələr, presence, bildirişlər və koordinasiya sistemləri.',
      },
      {
        title: 'Auth / Ödəniş axını',
        description: 'Sürtünmə və uğursuzluqları azaltmaq üçün qurulan identity, access control, subscription, payment və recovery axınları.',
      },
      {
        title: 'VPC serverlər',
        subtitle: 'private/public subnetlər',
        description: 'Təhlükəsiz şəbəkə sərhədləri, izolə olunmuş servislər və deploy edilə bilən cloud mühitləri ilə infrastruktur quruluşu.',
      },
      {
        title: 'Ağıllı müqavilələr',
        subtitle: 'Tokenomics',
        description: 'Real istifadəçi axınlarına bağlı token mexanikası, treasury məntiqi, claim-lər və onchain məhsul qaydaları.',
      },
      {
        title: 'AI iş axınları',
        description: 'Real məhsul əməliyyatlarına inteqrasiya olunan task automation, assistant-lar, daxili copilots və AI əsaslı axınlar.',
      },
    ],
    worldTitle: 'Inaplanet Haqqında',
    worldParagraphs: [
      'Inaplanet bizim oynanıla bilən rəqəmsal planetimizdir: bir hissəsi arcade, bir hissəsi social space, bir hissəsi isə canlı product showcase-dir. Biz bunu statik portfolionu insanların içində sürə, araşdıra və hiss edə biləcəyi bir təcrübəyə çevirmək üçün qurduq.',
      'Ziyarətçilər şəhərlər arasında keçir, interaktiv məkanlardan keçir və layihəni düz səhifə kimi deyil, yaşayan mühit kimi təcrübədən keçirirlər. Məqsəd kəşfi yadda qalan etmək və insanlara qurduqlarımızı araşdırarkən zövq ala biləcəkləri bir planet təqdim etməkdir.',
      'Planet multiplayer-dir, buna görə dostlarınızla qoşula, eyni şəhərə daxil ola və təcrübəni birlikdə yaşaya bilərsiniz. Daxil olmaq üçün səhifənin yuxarısındakı ENTER düyməsindən istifadə edin.',
    ],
    contactTitle: 'Layihə ideyanız var? Gəlin müzakirə edək.',
    contactCopy: 'Birbaşa office@inaplanet.com ünvanına e-poçt vasitəsilə müraciət edin — təqdim etdiyiniz məlumat əsasında layihənin əhatə dairəsini, arxitekturasını və icra planını hazırlayaq.',
    greetingStripAria: 'Müxtəlif dillərdə salamlar',
    greetingLabel: 'Yaz',
    contactLabels: ['Whatsapp', 'Telegram', 'E-poçt'],
    footer: 'Inaplanet Foundation. © 2026 | Bütün hüquqlar qorunur.',
  },
  ru: {
    languageSwitcherLabel: 'Выберите язык модального окна',
    enterButton: 'ВОЙТИ В ПЛАНЕТУ',
    heroTitle: 'Проектирует и запускает цифровые продукты для реального бизнеса.',
    heroCopy: 'Сайты, приложения, бэкенд-системы, платежные сценарии и продуктовая инфраструктура, рассчитанные на чистый запуск, стабильную работу и рост вместе с нагрузкой.',
    chips: {
      web: 'Веб-приложения',
      mobile: 'Мобильные приложения',
      backendDesktop: 'Бэкенд-системы',
      backendMobile: 'Бэкенд',
    },
    heroKicker: 'Операционный фокус',
    heroMetrics: [
      'От стратегии к архитектуре',
      'Исполнение по всему стеку',
      'Поставка продукта, готового к запуску',
    ],
    heroNote: 'Теперь побеждает не большой против малого, а быстрый против медленного.',
    highlights: [
      { title: 'Объем', copy: 'Мы превращаем сырой бриф в понятный план сборки.' },
      { title: 'Исполнение', copy: 'Frontend, backend, интеграции и инструменты движутся как одна система.' },
      { title: 'Запуск', copy: 'Готовность к production важнее, чем просто эффектный демо-вид.' },
    ],
    professionalServicesEyebrow: 'Professional Services',
    professionalServicesTitle: 'Как мы поставляем продукт высокого качества',
    professionalServicesCopy: 'Продукт высокого качества не появляется из случайной реализации. Мы превращаем сырой бриф, полуготовую систему, технический долг и амбициозную идею в delivery-структуру, которая защищает качество от scope до launch.',
    workMechanismTitle: 'Как мы работаем',
    workMechanismItems: [
      {
        question: 'Как вы стартуете проект?',
        answer: 'Мы не начинаем с blind implementation. Мы переводим бриф в technical task, delivery phases, priorities и реалистичный путь к launch.',
      },
      {
        question: 'Как AI применяется в delivery?',
        answer: 'AI ускоряет research, первые implementation drafts, QA thinking и documentation, но архитектура, security-sensitive потоки и review discipline остаются под человеческим ownership.',
      },
      {
        question: 'Почему AI важен для сильного продукта?',
        answer: 'Он сокращает iteration cycles, увеличивает execution bandwidth и помогает команде проверять больше продуктовых идей раньше, чем медленные конкуренты успевают отреагировать.',
      },
      {
        question: 'Что клиент получает на выходе?',
        answer: 'Рабочую delivery-систему: продуктовую архитектуру, implementation, integrations, deploy-структуру и путь к scale после launch.',
      },
    ],
    coreStackTitle: 'Основной стек',
    clientsTitle: 'С чем обычно приходят клиенты',
    clientsEyebrow: 'ТЕХНИЧЕСКОЕ ЗАДАНИЕ',
    clientsCopy: 'С сырым брифом, техническим заданием, файлом Figma, наполовину собранным продуктом или операционным bottleneck. Мы переводим это в архитектуру, реализацию, планирование сроков, структуру поставки, деплой и итерации. Обычно это означает прояснить приоритеты, определить, что нужно выпустить в первую очередь, и превратить неясную стартовую точку в практический путь к запуску.',
    clientFaqItems: [
      {
        question: 'Что если бриф еще не до конца понятен?',
        answer: 'Это нормально. Мы помогаем превратить сырой замысел в scope, приоритеты и реалистичный путь реализации до того, как сборка начнет расползаться.',
      },
      {
        question: 'Что если продукт уже наполовину собран?',
        answer: 'Мы разбираем, что можно сохранить, что тормозит движение и что лучше пересобрать, чтобы следующая фаза была чище, а не дороже.',
      },
      {
        question: 'Что если проблема не визуальная, а операционная?',
        answer: 'Тогда мы идем в основу системы: пользовательские потоки, backend-логику, admin-видимость и те части продукта, которые создают трение в ежедневной работе.',
      },
      {
        question: 'Что клиенту обычно нужно в первую очередь?',
        answer: 'Обычно нужна ясность по приоритетам, порядку запуска и тому, что выпускать сейчас, а что позже, чтобы продукт двигался вперед без лишней траты времени.',
      },
    ],
    deliveryTitle: 'Модель поставки',
    deliverySteps: [
      { title: '1. Discovery', copy: 'Уточняем цели, ограничения и scope.' },
      { title: '2. Build', copy: 'Реализуем продукт, инфраструктуру и интеграции.' },
      { title: '3. Launch', copy: 'Выпускаем продукт с мониторингом, полировкой и путем к масштабированию.' },
    ],
    expertiseTitle: 'Наша экспертиза',
    expertiseIntro: 'Работа над продуктом обычно охватывает несколько слоев. Мы строим пользовательскую поверхность, операционную систему за ней и инфраструктуру, которая все это поддерживает. Наш основной фокус — писать native code и для frontend, и для backend, чтобы запускать продукты максимального качества.',
    expertiseItems: [
      {
        title: 'Сайт компании',
        description: 'Понятные корпоративные сайты, которые хорошо представляют бизнес, объясняют предложение и превращают интерес в контакт.',
      },
      {
        title: 'Landing page',
        description: 'Фокусные страницы под одну конверсионную цель, с быстрой загрузкой и сильной иерархией сообщений.',
      },
      {
        title: 'E-commerce',
        description: 'Витрины, каталоги, корзины, checkout и admin-потоки, построенные для продаж и повторного использования.',
      },
      {
        title: 'Marketplace',
        description: 'Multi-vendor платформы с листингами, разделением ролей, модерацией, payout-логикой и операционными инструментами.',
      },
      {
        title: 'Социальные сети',
        description: 'Профили, ленты, сообщения, сообщества и социальные циклы, спроектированные для retention и interaction.',
      },
      {
        title: 'Мультиплеерные игры',
        description: 'Общие интерактивные среды с синхронизацией состояния, логикой сессий и real-time опытом игроков.',
      },
      {
        title: 'Бэкенд-системы',
        description: 'API, базы данных, очереди, admin-инструменты и оркестрация сервисов для стабильной работы продукта.',
      },
      {
        title: 'Real-time операции',
        description: 'Живые dashboards, обновления через socket, presence, уведомления и системы координации, которые реагируют мгновенно.',
      },
      {
        title: 'Auth / Payment flow',
        description: 'Identity, access control, подписки, платежи и recovery-потоки, построенные так, чтобы снижать трение и сбои.',
      },
      {
        title: 'VPC серверы',
        subtitle: 'private/public subnets',
        description: 'Инфраструктурные схемы с безопасными сетевыми границами, изолированными сервисами и разворачиваемыми cloud-окружениями.',
      },
      {
        title: 'Смарт-контракты',
        subtitle: 'Tokenomics',
        description: 'Solidity-механика токенов, treasury-логика, claims и onchain-правила продукта, связанные с реальными пользовательскими сценариями.',
      },
      {
        title: 'AI workflows',
        description: 'Автоматизация задач, ассистенты, внутренние copilots и AI-потоки, встроенные в реальные продуктовые операции.',
      },
    ],
    worldTitle: 'О планете Inaplanet',
    worldParagraphs: [
      'Inaplanet — это наша игровая цифровая планета: немного arcade, немного social space и немного живой product showcase. Мы построили ее, чтобы превратить статичное портфолио в пространство, по которому можно ездить, исследовать и чувствовать.',
      'Посетители перемещаются между городами, проходят через интерактивные пространства и воспринимают проект как живую среду, а не как плоскую страницу. Цель — сделать знакомство запоминающимся и дать людям планету, которой можно наслаждаться, пока они изучают то, что мы создаем.',
      'Эта планета мультиплеерная, поэтому вы можете подключиться с друзьями, войти в один и тот же город и пройти этот опыт вместе. Чтобы войти, используйте кнопку ENTER вверху страницы.',
    ],
    contactTitle: 'Есть проект в голове? Давайте обсудим.',
    contactCopy: 'Свяжитесь с нами напрямую по электронной почте office@inaplanet.com, и мы превратим бриф в объём работ, архитектуру и план разработки.',
    greetingStripAria: 'Приветствия на разных языках',
    greetingLabel: 'Скажи',
    contactLabels: ['Whatsapp', 'Telegram', 'Почта'],
    footer: 'Inaplanet Foundation. © 2026 | Все права защищены.',
  },
} as const;

type ModalLanguage = keyof typeof MODAL_COPY;

type HomeClientProps = {
  initialLanguage?: SiteLocale;
};

export default function HomeClient({ initialLanguage = 'en' }: HomeClientProps) {
  const router = useRouter();
  const MAX_PLAYERS_PER_WORLD = 10;
  const wsRef = useRef<WebSocket | null>(null);
  const landingShowcaseRef = useRef<HTMLDivElement | null>(null);
  const worldPlayerCountsRef = useRef(new Map<string, number>());
  const currentCountsRef = useRef<Record<string, number>>({});
  const searchQueryRef = useRef('');
  const pendingPlayerCountRef = useRef<number | null>(null);
  const playerCountFrameRef = useRef<number | null>(null);
  const pendingWorldCountsRef = useRef<Record<string, number> | null>(null);
  const worldCountsFrameRef = useRef<number | null>(null);
  const coreStackItems = [
    { id: 'javascript', label: 'Javascript', icon: <SiJavascript aria-hidden="true" /> },
    { id: 'typescript', label: 'Typescript', icon: <BiLogoTypescript aria-hidden="true" /> },
    { id: 'node', label: 'Node', icon: <FaNodeJs aria-hidden="true" /> },
    { id: 'express', label: 'Express', icon: <SiExpress aria-hidden="true" /> },
    { id: 'websocket', label: 'Websocket', icon: <TbBrandSocketIo aria-hidden="true" /> },
    { id: 'webrtc', label: 'WebRTC', icon: <SiWebrtc aria-hidden="true" /> },
    { id: 'threejs', label: 'Three.js', icon: <SiThreedotjs aria-hidden="true" /> },
    { id: 'css', label: 'CSS', icon: <SiCss3 aria-hidden="true" /> },
    { id: 'tailwind', label: 'Tailwind', icon: <RiTailwindCssFill aria-hidden="true" /> },
    { id: 'react', label: 'React', icon: <FaReact aria-hidden="true" /> },
    { id: 'native', label: 'Native', icon: <TbBrandReactNative aria-hidden="true" /> },
    { id: 'expo', label: 'Expo', icon: <SiExpo aria-hidden="true" /> },
    { id: 'flutter', label: 'Flutter', icon: <SiFlutter aria-hidden="true" /> },
    { id: 'python', label: 'Python', icon: <SiPython aria-hidden="true" /> },
    { id: 'netlify', label: 'Netlify', icon: <SiNetlify aria-hidden="true" /> },
    { id: 'docker', label: 'Docker', icon: <SiDocker aria-hidden="true" /> },
    { id: 'mongodb', label: 'MongoDB', icon: <SiMongodb aria-hidden="true" /> },
    { id: 'postgresql', label: 'PostgreSQL', icon: <SiPostgresql aria-hidden="true" /> },
    { id: 'redis', label: 'Redis', icon: <SiRedis aria-hidden="true" /> },
    { id: 'aws', label: 'AWS', icon: <FaAws aria-hidden="true" /> },
    { id: 'digital-ocean', label: 'DigitalOcean', icon: <SiDigitalocean aria-hidden="true" /> },
    { id: 'vercel', label: 'Vercel', icon: <SiVercel aria-hidden="true" /> },
    { id: 'nextjs', label: 'Next.js', icon: <RiNextjsFill aria-hidden="true" /> },
    { id: 'web3', label: 'Web3', icon: <FaCube aria-hidden="true" /> },
    { id: 'solidity', label: 'Solidity', icon: <SiSolidity aria-hidden="true" /> },
    { id: 'nft', label: 'NFT', icon: <FaCube aria-hidden="true" /> },
    { id: 'real-time', label: 'Real Time', icon: <FaBroadcastTower aria-hidden="true" /> },
  ];
  const expertiseItems = [
    {
      slug: 'corporate-websites',
      title: 'Corporate website',
      icon: <FaBriefcase aria-hidden="true" />,
      description: 'Clear corporate websites that present the business well, explain the offer, and convert interest into contact.',
    },
    {
      slug: 'landing-pages',
      title: 'Landing page',
      icon: <FaWindowMaximize aria-hidden="true" />,
      description: 'Focused campaign pages built around one conversion goal, fast load time, and strong message hierarchy.',
    },
    {
      slug: 'e-commerce-development',
      title: 'E-commerce',
      icon: <MdLocalMall aria-hidden="true" />,
      description: 'Storefronts, catalog systems, carts, checkout, and admin flows built for sales and repeat use.',
    },
    {
      slug: 'marketplace-development',
      title: 'Marketplace',
      icon: <FaStore aria-hidden="true" />,
      description: 'Multi-vendor platforms with listings, role separation, moderation, payout logic, and operational tooling.',
    },
    {
      slug: 'social-network-development',
      title: 'Social networks',
      icon: <FaUsers aria-hidden="true" />,
      description: 'Profiles, feeds, messaging, communities, and social loops designed for retention and interaction.',
    },
    {
      slug: 'multiplayer-game-development',
      title: 'Multiplayer games',
      icon: <FaGamepad aria-hidden="true" />,
      description: 'Shared interactive environments with synchronized state, session logic, and real-time player experience.',
    },
    {
      slug: 'backend-systems',
      title: 'Backend systems',
      icon: <FaDatabase aria-hidden="true" />,
      description: 'APIs, databases, queues, admin tooling, and service orchestration designed for stable product operations.',
    },
    {
      slug: 'real-time-systems',
      title: 'Real-time operations',
      icon: <FaBroadcastTower aria-hidden="true" />,
      description: 'Live dashboards, socket-driven updates, presence, notifications, and coordination systems that react instantly.',
    },
    {
      slug: 'auth-payment-flows',
      title: 'Auth / Payment flow',
      icon: <FaUserShield aria-hidden="true" />,
      description: 'Identity, access control, subscriptions, payments, and recovery flows built to reduce friction and failure.',
    },
    {
      slug: 'vpc-cloud-infrastructure',
      title: 'VPC servers',
      subtitle: 'private/public subnets',
      icon: <FaServer aria-hidden="true" />,
      description: 'Infrastructure layouts with secure network boundaries, isolated services, and deployable cloud environments.',
    },
    {
      slug: 'smart-contract-development',
      title: 'Smart contracts',
      subtitle: 'Tokenomics',
      icon: <FaCube aria-hidden="true" />,
      description: 'Solidity-based token mechanics, treasury logic, claims, and onchain product rules tied to real user flows.',
    },
    {
      slug: 'ai-integrations',
      title: 'AI workflows',
      icon: <FaRobot aria-hidden="true" />,
      description: 'Task automation, assistants, internal copilots, and AI-powered flows integrated into real product operations.',
    },
  ];
  const contactItems = [
    {
      label: 'Whatsapp',
      href: 'https://wa.me/393515018252',
      icon: <FaWhatsapp aria-hidden="true" />,
    },
    {
      label: 'Telegram',
      href: 'https://t.me/lvnmmdv',
      icon: <FaTelegramPlane aria-hidden="true" />,
    },
    {
      label: 'Mail',
      href: `mailto:${SITE_EMAIL}`,
      icon: <MdMailOutline aria-hidden="true" />,
    },
  ];
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isCanvasInitialized, setIsCanvasInitialized] = useState(false); // State for canvas initialization
  const [hasAppInitialized, setHasAppInitialized] = useState(false); // Ensure Application is only initialized once
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(null); // New state for selected world ID
  const [token, setToken] = useState<string | null>(null); // State to store the token
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showLandingPageShell, setShowLandingPageShell] = useState(true);
  const [hasEnteredPlanetView, setHasEnteredPlanetView] = useState(false);
  const {
    language,
    renderedLanguage,
    renderedFontLanguage,
    isLanguageReady: isModalLanguageReady,
  } = useDeferredLanguageFont<ModalLanguage>(initialLanguage);
  const [openClientFaqIndex, setOpenClientFaqIndex] = useState<number | null>(null);
  const [openWorkMechanismIndex, setOpenWorkMechanismIndex] = useState<number | null>(null);
  const landingOpenTimerRef = useRef<number | undefined>(undefined);
  const landingCloseTimerRef = useRef<number | undefined>(undefined);
  const [carName, setCarName] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('selectedCarName');
  });
  // Websocket
  const [matcaps, setMatcaps] = useState({});

  const modalLanguage = renderedLanguage;
  const modalCopy = MODAL_COPY[modalLanguage];
  const localeAwareServicesPath = (slug: string) => getLocalePath(initialLanguage, `/services/${slug}`);
  const storyCtaLabel = 'ENTER';
  const localizedExpertiseItems = modalCopy.expertiseItems.map((item, index) => ({
    slug: expertiseItems[index].slug,
    icon: expertiseItems[index].icon,
    title: item.title,
    subtitle: 'subtitle' in item ? item.subtitle : undefined,
    description: item.description,
  }));
  const localizedContactItems = contactItems.map((item, index) => ({
    ...item,
    label: modalCopy.contactLabels[index],
  }));
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8080';

  const applyStarterLoadout = useCallback((playerId: string) => {
    const starterLoadout = createRandomStarterLoadout();

    setCarName(starterLoadout.carName);
    setMatcaps(starterLoadout.matcaps);
    localStorage.setItem('selectedCarName', starterLoadout.carName);
    localStorage.setItem('matcaps', JSON.stringify(starterLoadout.matcaps));

    wsRef.current?.send(
      JSON.stringify({
        type: 'setSelectedCar',
        playerId,
        carName: starterLoadout.carName,
        matcaps: starterLoadout.matcaps,
      })
    );
  }, []);

  const handleReload = () => {
    window.location.reload(); // Reload the page
  };

  const handleApplicationReady = useCallback(() => {
    setIsCanvasInitialized(true);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof landingOpenTimerRef.current === 'number') {
        window.clearTimeout(landingOpenTimerRef.current);
      }

      if (typeof landingCloseTimerRef.current === 'number') {
        window.clearTimeout(landingCloseTimerRef.current);
      }

      if (typeof playerCountFrameRef.current === 'number') {
        window.cancelAnimationFrame(playerCountFrameRef.current);
      }

      if (typeof worldCountsFrameRef.current === 'number') {
        window.cancelAnimationFrame(worldCountsFrameRef.current);
      }
    };
  }, []);

  const openLandingPage = useCallback(() => {
    if (typeof landingCloseTimerRef.current === 'number') {
      window.clearTimeout(landingCloseTimerRef.current);
      landingCloseTimerRef.current = undefined;
    }

    setHasEnteredPlanetView(false);
    setShowLandingPage(true);
    setShowLandingPageShell(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        landingOpenTimerRef.current = window.setTimeout(() => {
          setShowLandingPageShell(true);
          landingOpenTimerRef.current = undefined;
        }, 120);
      });
    });
  }, []);

  const closeLandingPage = useCallback(() => {
    if (typeof landingOpenTimerRef.current === 'number') {
      window.clearTimeout(landingOpenTimerRef.current);
      landingOpenTimerRef.current = undefined;
    }

    landingShowcaseRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    setShowLandingPageShell(false);
    landingCloseTimerRef.current = window.setTimeout(() => {
      setShowLandingPage(false);
      setHasEnteredPlanetView(true);
      landingCloseTimerRef.current = undefined;
    }, 220);
  }, []);

  const predefinedWorldIds = [
    'Baku', 'New York', 'Tokyo', 'Rome', 'Tel Aviv',
    'New Delhi', 'Munich', 'Florence', 'Beijing', 'Hong Kong',
    'Seoul', 'Los Angeles', 'Paris', 'Las Vegas', 'Istanbul',
    'Reykjavik', 'Doha', 'Moscow', 'Singapore', 'Jakarta',
    'Mexico', 'Madrid', 'Prague', 'Oslo', 'Buenos Aires',
    'Budapest', 'Rio', 'Copenhagen', 'London', 'Dubai',
    'Sydney', 'Accra', 'Hellsinki', 'Dublin', 'Lisbon',
    'Zurich', 'Bogota', 'Melbourne', 'Nairobi', 'Stockholm',
    'Vienna', 'Brussels', 'San Francisco', 'Geneva', 'Cannes',
    'Berlin', 'Havana', 'Montreal', 'Antananarivo', 'Cape Town',
    'Boston', 'Milan', 'Bangkok', 'Mumbai', 'Barcelona',
    'Amsterdam', 'Athens', 'Monaco', 'Venice', 'Peru',
  ];

  // Mapping cities to their corresponding countries
  const cityToFlagMapping: Record<string, string> = {
    'Baku': 'az.svg',
    'New York': 'us.svg',
    'Tokyo': 'jp.svg',
    'Rome': 'it.svg',
    'Tel Aviv': 'il.svg',
    'New Delhi': 'in.svg',
    'Munich': 'de.svg',
    'Florence': 'it.svg',
    'Beijing': 'cn.svg',
    'Hong Kong': 'cn.svg',
    'Seoul': 'kr.svg',
    'Los Angeles': 'us.svg',
    'Paris': 'fr.svg',
    'Las Vegas': 'us.svg',
    'Istanbul': 'tr.svg',
    'Reykjavik': 'is.svg',
    'Doha': 'qa.svg',
    'Moscow': 'ru.svg',
    'Singapore': 'sg.svg',
    'Jakarta': 'id.svg',
    'Mexico': 'mx.svg',
    'Madrid': 'es.svg',
    'Prague': 'cz.svg',
    'Oslo': 'no.svg',
    'Buenos Aires': 'ar.svg',
    'Budapest': 'hu.svg',
    'Rio': 'br.svg',
    'Copenhagen': 'dk.svg',
    'London': 'gb.svg',
    'Dubai': 'ae.svg',
    'Sydney': 'au.svg',
    'Accra': 'gh.svg',
    'Hellsinki': 'fi.svg',
    'Dublin': 'ie.svg',
    'Lisbon': 'pt.svg',
    'Zurich': 'ch.svg',
    'Bogota': 'co.svg',
    'Melbourne': 'au.svg',
    'Nairobi': 'ke.svg',
    'Stockholm': 'se.svg',
    'Vienna': 'at.svg',
    'Brussels': 'be.svg',
    'San Francisco': 'us.svg',
    'Geneva': 'ch.svg',
    'Cannes': 'fr.svg',
    'Berlin': 'de.svg',
    'Havana': 'cu.svg',
    'Montreal': 'ca.svg',
    'Antananarivo': 'mg.svg',
    'Cape Town': 'za.svg',
    'Boston': 'us.svg',
    'Milan': 'it.svg',
    'Bangkok': 'th.svg',
    'Mumbai': 'in.svg',
    'Barcelona': 'es.svg',
    'Amsterdam': 'nl.svg',
    'Athens': 'gr.svg',
    'Monaco': 'mc.svg',
    'Venice': 'it.svg',
    'Peru': 'pe.svg',
  };

  const worldIcons = predefinedWorldIds.map(
    (worldId) => {
      // Check if the worldId exists in the mapping, if not use a default icon (e.g., 'default.svg')
      const flag = cityToFlagMapping[worldId] || 'zz.svg';
      return `/flags/${flag.toLowerCase().replace(/\s+/g, '_')}`;
    }
  );

  const worldLocations: Record<string, { lat: number; lng: number }> = {
    "Baku": { lat: 40.4093, lng: 49.8671 },
    "New York": { lat: 40.7128, lng: -74.0060 },
    "Tokyo": { lat: 35.6764, lng: 139.6500 },
    "Rome": { lat: 41.8967, lng: 12.4822 },
    "Tel Aviv": { lat: 32.0853, lng: 34.7818 },
    "New Delhi": { lat: 28.6139, lng: 77.2088 },
    "Munich": { lat: 48.1351, lng: 11.5820 },
    "Florence": { lat: 43.7700, lng: 11.2577 },
    "Beijing": { lat: 39.9042, lng: 116.4074 },
    "Hong Kong": { lat: 22.3193, lng: 114.1694 },
    "Seoul": { lat: 37.5503, lng: 126.9971 },
    "Los Angeles": { lat: 34.0549, lng: 118.2426 },
    "Paris": { lat: 48.8575, lng: 2.3514 },
    "Las Vegas": { lat: 36.1716, lng: 115.1391 },
    "Istanbul": { lat: 41.0082, lng: 28.9784 },
    "Reykjavik": { lat: 64.1470, lng: 21.9408 },
    "Doha": { lat: 25.2854, lng: 51.5310 },
    "Moscow": { lat: 55.755, lng: 37.6173 },
    "Singapore": { lat: 1.3521, lng: 103.8198 },
    "Jakarta": { lat: 6.1944, lng: 106.8229 },
    "Mexico": { lat: 23.6345, lng: 102.5528 },
    "Madrid": { lat: 40.4167, lng: 3.7033 },
    "Prague": { lat: 50.0755, lng: 14.4378 },
    "Oslo": { lat: 59.9139, lng: 10.7522 },
    "Buenos Aires": { lat: 34.6037, lng: 58.3816 },
    "Budapest": { lat: 47.4979, lng: 19.0402 },
    "Rio": { lat: 22.9068, lng: 43.1729 },
    "Copenhagen": { lat: 55.6761, lng: 12.5683 },
    "London": { lat: 51.5072, lng: 0.1276 },
    "Dubai": { lat: 25.2048, lng: 55.2708 },
    "Sydney": { lat: 33.8688, lng: 151.2093 },
    "Accra": { lat: 5.5593, lng: 0.1974 },
    "Hellsinki": { lat: 60.1699, lng: 24.9384 },
    "Dublin": { lat: 53.3498, lng: 6.2603 },
    "Lisbon": { lat: 38.7223, lng: 9.1393 },
    "Zurich": { lat: 47.3769, lng: 8.5417 },
    "Bogota": { lat: 4.7110, lng: 74.0721 },
    "Melbourne": { lat: 37.8136, lng: 144.9631 },
    "Nairobi": { lat: 1.2921, lng: 36.8219 },
    "Stockholm": { lat: 59.3327, lng: 18.0656 },
    "Vienna": { lat: 48.2081, lng: 16.3713 },
    "Brussels": { lat: 50.8260, lng: 4.3802 },
    "San Francisco": { lat: 37.7749, lng: 122.4194 },
    "Geneva": { lat: 46.2044, lng: 6.1432 },
    "Cannes": { lat: 43.5539, lng: 7.0170 },
    "Berlin": { lat: 52.5200, lng: 13.4050 },
    "Havana": { lat: 23.1339, lng: 82.3586 },
    "Montreal": { lat: 45.5019, lng: 73.5674 },
    "Antananarivo": { lat: 18.9185, lng: 47.5211 },
    "Cape Town": { lat: 33.9221, lng: 18.4231 },
    "Boston": { lat: 42.3601, lng: 71.0589 },
    "Milan": { lat: 45.4685, lng: 9.1824 },
    "Bangkok": { lat: 13.7563, lng: 100.5018 },
    "Mumbai": { lat: 19.0760, lng: 72.8777 },
    "Barcelona": { lat: 41.3874, lng: 2.1686 },
    "Amsterdam": { lat: 52.3676, lng: 4.9041 },
    "Athens": { lat: 37.9838, lng: 23.7275 },
    "Monaco": { lat: 43.7384, lng: 7.4246 },
    "Venice": { lat: 45.4404, lng: 12.3160 },
    "Peru": { lat: 9.1900, lng: 75.0152 },
};

  // Function to get token from the server
  const getToken = async (playerId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerId }),
      });

      if (!response.ok) {
        throw new Error('Failed to get token from server');
      }

      const { token } = await response.json(); // Extract token from response
      // localStorage.setItem('token', token); // Store token in localStorage
      sessionStorage.setItem('token', token); // Store token in localStorage
      setToken(token); // Set token in state

      // console.log('Token received and stored:', token);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const applyWorldCounts = useCallback((counts: Record<string, number>) => {
    updateWorldList(counts);

    Object.entries(counts).forEach(([worldId, count]) => {
      const location = worldLocations[worldId as keyof typeof worldLocations];
      const previousCount = worldPlayerCountsRef.current.get(worldId) || 0;
      const newCount = typeof count === 'number' ? count : 0;

      worldPlayerCountsRef.current.set(worldId, newCount);

      if (newCount > 0 && previousCount === 0 && location) {
        addSignalEffect(worldId, location);
      }

      if (newCount === 0 && previousCount > 0) {
        removeSignalEffect(worldId);
      }
    });
  }, []);

  const schedulePlayerCountUpdate = useCallback((count: number) => {
    pendingPlayerCountRef.current = count;

    if (playerCountFrameRef.current !== null) {
      return;
    }

    playerCountFrameRef.current = window.requestAnimationFrame(() => {
      playerCountFrameRef.current = null;

      if (typeof pendingPlayerCountRef.current === 'number') {
        updatePlayerCount(pendingPlayerCountRef.current);
        pendingPlayerCountRef.current = null;
      }
    });
  }, []);

  const scheduleWorldCountsUpdate = useCallback((counts: Record<string, number>) => {
    pendingWorldCountsRef.current = counts;

    if (worldCountsFrameRef.current !== null) {
      return;
    }

    worldCountsFrameRef.current = window.requestAnimationFrame(() => {
      worldCountsFrameRef.current = null;

      if (pendingWorldCountsRef.current) {
        applyWorldCounts(pendingWorldCountsRef.current);
        pendingWorldCountsRef.current = null;
      }
    });
  }, [applyWorldCounts]);

  // Handle disconnection and refresh the page
  // useEffect(() => {
  //   if (!isConnected && hasAppInitialized) {

  //     const userDisplay = document.getElementById('userDisplay');
  //     const batteryStatus = document.getElementById('battery-status');
  //     const scoreElement = document.getElementById('score-status');
  //     const coinMarket = document.getElementById('coin-market');
  //     const inviteButton = document.getElementById('invite-button');
  //     const tradeButton = document.getElementById('trade-button');
  //     const partyElement = document.getElementById('party-info');

  //     if (userDisplay) {
  //       userDisplay.style.display = 'none';
  //     }

  //     console.log('Wallet disconnected, refreshing the page...');
  //     // window.location.reload(); // Refresh the page when the user disconnects
  //     window.location.href = 'https://krashbox.world'
  //   }
  // }, [isConnected, hasAppInitialized]);

  const initializeWebSocket = useCallback((playerId: string) => {

    if (!playerId) {
        console.error("Cannot initialize WebSocket: playerId is missing");
        return;
    }

    if (!sessionStorage.getItem('token')) {
      console.error("Cannot initialize WebSocket: token is missing");
      return;
    }

    if (wsRef.current) {
      // Avoid reinitializing if already connected
      // console.log("WebSocket already initialized");
      return;
    }

    const token = sessionStorage.getItem('token');
    console.log("Session storage", sessionStorage);
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    
    const serverAddress = `${WS_BASE_URL}?token=${encodeURIComponent(token)}`;
    wsRef.current = new WebSocket(serverAddress);

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      updateWorldList(currentCountsRef.current);

      if (playerId) {
          applyStarterLoadout(playerId);
      } else {
          console.error('Player ID is missing or invalid');
      }
    };

    wsRef.current.onmessage = (event) => {

      let message;
        try {
            // Parse the message from the WebSocket event
            message = JSON.parse(event.data);
        } catch (error) {
            console.error("Error parsing message:", event.data);
            return;
        }
    
        // Debug log to check the full message structure
        // console.log("Received message:", message);
    
        // Check if the 'counts' property exists
        if (!message.hasOwnProperty('counts')) {
            // console.log("No 'counts' property found in message.");
        } else {
            // console.log("Counts found:", message.counts);
        }

        // Handle `selectedCar` message
        if (message.type === 'selectedCar') {
          // console.log('SelectedCar message received:', message); // Log full message
          if (message.selectedCar) {
              setCarName(message.selectedCar);
              localStorage.setItem('selectedCarName', message.selectedCar);
              // console.log('Selected car set to:', message.selectedCar);
      
              if (message.matcaps) {
                  // console.log('Matcaps before setting state:', message.matcaps); // Log matcaps
                  setMatcaps(message.matcaps);
                  localStorage.setItem('matcaps', JSON.stringify(message.matcaps));
                  // console.log('Matcaps state updated to:', message.matcaps);
              } else {
                  console.warn('No matcaps data received. Defaulting to empty object.');
                  setMatcaps({});
              }
          } else {
              console.warn('No selected car found. Applying starter loadout.');
              if (playerId) {
                applyStarterLoadout(playerId);
              }
          }
      }  

      // User count
      if (message.type === 'playerCount') {
        schedulePlayerCountUpdate(message.count);
      }
  
      // Handle the 'worldCounts' type message
      if (message.type === 'worldCounts') {
          // Validate counts property
          if (!message.hasOwnProperty('counts') || typeof message.counts !== 'object' || message.counts === null) {
              // console.log("Invalid counts in worldCounts message:", message.counts);
              return;
          }
  
          // Only update the world list if no world has been selected
          if (!selectedWorldId) {
              scheduleWorldCountsUpdate(message.counts);
          } else {
              // console.log("World has already been selected, not updating list.");
          }
  
          // Log the received world counts
          // console.log("Received world counts:", message.counts);
      } else {
          // console.log("Received message of an unexpected type:", message.type);
      }
  };
  

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error, {
        wsBaseUrl: WS_BASE_URL,
        apiBaseUrl: API_BASE_URL,
        hasToken: Boolean(token),
      });
    };

     wsRef.current.onclose = (event) => {
      console.log('WebSocket closed', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
        wsBaseUrl: WS_BASE_URL,
        apiBaseUrl: API_BASE_URL,
      });
      // if (event.code !== 1000) {
      //   console.error('WebSocket closed unexpectedly with code:', event.code);
      //   console.error('Reason:', event.reason);
      // }
      
      // setIsWebSocketReady(false);
    };
    // localStorage.removeItem('token');
    // sessionStorage.removeItem('token');
    // console.log("Session storage", sessionStorage);
  }, [applyStarterLoadout, schedulePlayerCountUpdate, scheduleWorldCountsUpdate, selectedWorldId]);

  const handleExitWorld = useCallback(() => {
    window.location.reload();
  }, []);

  const handleCameraZoom = useCallback((direction: 'in' | 'out') => {
    window.dispatchEvent(
      new CustomEvent('inaplanet-camera-zoom', {
        detail: { direction },
      })
    );
  }, []);

const filterWorlds = (event: React.FormEvent<HTMLInputElement>) => {
  const target = event.target as HTMLInputElement;
  searchQueryRef.current = target.value.toLowerCase();
  updateWorldList(currentCountsRef.current); // Reapply filtering based on the updated search query
};

const updatePlayerCount = (count: number) => {
  const playerCountElement = document.getElementById('userCountDisplay');
  if (playerCountElement) {
    playerCountElement.innerText = `${count}`;
  }

  const barThresholds = [1, 150, 300, 500];
  const signalBars = document.querySelectorAll('.signal-bars .bar');

  signalBars.forEach((bar, index) => {
    const htmlBar = bar as HTMLElement;
    if (count >= barThresholds[index]) {
      htmlBar.style.opacity = '1';
    } else {
      htmlBar.style.opacity = '0.5';
    }
  });
};

const updateWorldList = (counts: Record<string, number>) => {
  currentCountsRef.current = counts; // Store the counts for reuse
  const worldList = document.getElementById('world-list');

  if (worldList) {
    worldList.innerHTML = ''; // Clear existing list items

    predefinedWorldIds
      .filter((worldId) => worldId.toLowerCase().includes(searchQueryRef.current)) // Filter worlds by search query
      .forEach((worldId) => {
        const index = predefinedWorldIds.indexOf(worldId); // Get the index for flag lookup
        const playerCount = counts[worldId] || 0; // Default to 0 if no count available

        // Create a list item for the world
        const listItem = document.createElement('li');

        // Create a container div for player count, flag, and world ID
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        // Player count div
        const playerCountDiv = document.createElement('div');
        playerCountDiv.textContent = `${playerCount}/${MAX_PLAYERS_PER_WORLD}`;
        playerCountDiv.classList.add('player-count');

        // Flag div
        const flagDiv = document.createElement('div');
        const flagImg = document.createElement('img');

        // Use cityToFlagMapping to get the correct flag
        const flagFile = cityToFlagMapping[worldId] || 'zz.svg'; // Fallback to default.svg if not found
        flagImg.src = `/flags/${flagFile.toLowerCase().replace(/\s+/g, '_')}`; // Dynamically set the SVG path
        flagImg.alt = `${worldId} flag`;
        flagImg.classList.add('flag-icon');

        flagDiv.appendChild(flagImg);

        // World ID div
        const worldIdDiv = document.createElement('div');
        worldIdDiv.textContent = worldId;
        worldIdDiv.classList.add('world-id');

        // Append components to the content container
        contentContainer.appendChild(playerCountDiv);
        contentContainer.appendChild(flagDiv);
        contentContainer.appendChild(worldIdDiv);

        // Append the content container to the list item
        listItem.appendChild(contentContainer);

        // Apply classes based on selection status
        if (selectedWorldId && selectedWorldId !== worldId) {
          listItem.classList.add('disabled');
        }

        if (selectedWorldId === worldId) {
          listItem.classList.add('selected');
        }

        // Add click event to list item
        listItem.onclick = () => handleWorldSelection(worldId, listItem, worldList);

        // Append the list item to the world list
        worldList.appendChild(listItem);
      });
  }
};

const handleWorldSelection = (worldId: string, listItem: HTMLLIElement, worldList: HTMLElement) => {
  if (!selectedWorldId) {
    setSelectedWorldId(worldId);
    setIsCanvasInitialized(false);

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Disable all other items visually and clear their onclick events
    Array.from(worldList.children).forEach((item) => {
      const element = item as HTMLElement;
      element.classList.add('disabled');
      element.classList.remove('selected');
      element.onclick = null; // Prevent further clicks
    });

    // Apply 'selected' class to the clicked item
    listItem.classList.remove('disabled');
    listItem.classList.add('selected');
  }
};

    useEffect(() => {
      updateWorldList({});
    }, []);

    useEffect(() => {
      if (showLandingPage) {
        return;
      }

      const identity = getOrCreatePlayerIdentity();
      if (!identity?.playerId) {
        return;
      }

      setPlayerId(identity.playerId);
      if (hasAppInitialized) {
        return;
      }

      getToken(identity.playerId)
        .then(() => {
          initializeWebSocket(identity.playerId);
          setHasAppInitialized(true);
          localStorage.removeItem('playerId');
          localStorage.removeItem('worldId');
        })
        .catch((error) => {
          console.error('Error fetching token:', error);
        });
      
    }, [hasAppInitialized, initializeWebSocket, showLandingPage]);

    useEffect(() => {
      if (!showLandingPage) {
        return;
      }

      const frame = window.requestAnimationFrame(() => {
        landingShowcaseRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      });

      return () => window.cancelAnimationFrame(frame);
    }, [showLandingPage]);

    useEffect(() => {
      const globeMode = isCanvasInitialized ? 'hidden' : showLandingPage ? 'passive' : 'interactive';

      window.dispatchEvent(
        new CustomEvent('inaplanet-globe-mode', {
          detail: { mode: globeMode },
        })
      );

      return () => {
        window.dispatchEvent(
          new CustomEvent('inaplanet-globe-mode', {
            detail: { mode: 'passive' },
          })
        );
      };
    }, [isCanvasInitialized, showLandingPage]);

  return (
    <main className="overflow-hidden flex flex-col items-center" style={{ backgroundColor: '#000', fontFamily: 'var(--font-orbitron), sans-serif' }}>
      {!isCanvasInitialized && (
        <div id="loading-container">
          <div id="intro-panel-layer" className={`intro-panel-layer flex-container ${showLandingPage ? 'first-screen-hidden' : ''}`}>
            <div className="user-count-wrapper">
              <span id="userCountDisplay" className="user-count-display">0</span>
            </div>
            <button
              type="button"
              className="who-am-i-button"
              onClick={openLandingPage}
            >
              <span className="who-am-i-button__label">WHO WE ARE?</span>
            </button>
          </div>
          {/* Show pulsing message while setting up WebSocket */}
          <>
            <div id="world-layer" className={showLandingPage ? 'first-screen-hidden' : ''}>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  type="text"
                  id="search-bar"
                  placeholder="Search destination..."
                  onInput={(event) => filterWorlds(event)}
                />
                <button
                  onClick={handleReload}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'none',
                    cursor: 'pointer',
                    // paddingRight: '10px'
                  }}
                >
                  <FaRedo size={12} style={{ color: '#fff' }} />
                </button>
              </div>

              <div className="scroll-container">
                <ul id="world-list"></ul>
              </div>
            </div>
            <section
              className={`landing-showcase ${showLandingPage ? 'landing-showcase-active' : 'landing-showcase-hidden'} ${hasEnteredPlanetView ? 'landing-showcase-overlay' : 'landing-showcase-primary'}`}
            >
              <div
                className={`landing-showcase__shell ${showLandingPageShell ? 'landing-showcase__shell-active' : ''} ${renderedFontLanguage === 'en' ? 'landing-showcase__shell--orbitron' : 'landing-showcase__shell--exo'} ${isModalLanguageReady ? '' : 'landing-showcase__shell--switching'}`}
                aria-busy={!isModalLanguageReady}
              >
                <div className="landing-showcase__topbar">
                  <button
                    type="button"
                    className="landing-showcase__back-button"
                    onClick={closeLandingPage}
                  >
                    <span className="landing-showcase__back-label">{modalCopy.enterButton}</span>
                  </button>
                </div>
                <div ref={landingShowcaseRef} className="landing-showcase__content">
                <div className="landing-showcase__language-switch" role="group" aria-label={modalCopy.languageSwitcherLabel}>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      className={`landing-showcase__language-button ${language === option.code ? 'landing-showcase__language-button-active' : ''}`}
                      onClick={() => {
                        if (option.code !== initialLanguage) {
                          router.push(getLocalePath(option.code, '/'));
                        }
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div key={modalLanguage} className="landing-showcase__localized-content route-content-reveal">
                  <div className="landing-showcase__body">
                    <div className="landing-showcase__hero">
                      <div className="landing-showcase__hero-copy">
                        <p className="landing-showcase__eyebrow">INAPLANET.COM</p>
                        <h1 className="landing-showcase__title">{modalCopy.heroTitle}</h1>
                        <p className="landing-showcase__copy">{modalCopy.heroCopy}</p>
                        <div className="landing-showcase__chips">
                          <span>{modalCopy.chips.web}</span>
                          <span>{modalCopy.chips.mobile}</span>
                          <span className="landing-showcase__chip-responsive" data-desktop={modalCopy.chips.backendDesktop} data-mobile={modalCopy.chips.backendMobile}></span>
                        </div>
                      </div>
                      <aside className="landing-showcase__hero-panel">
                        <div className="landing-showcase__hero-panel-glow" aria-hidden="true"></div>
                        <span className="landing-showcase__hero-kicker">{modalCopy.heroKicker}</span>
                        <div className="landing-showcase__hero-metrics">
                          {modalCopy.heroMetrics.map((metric, index) => (
                            <div key={metric}>
                              <strong>{`0${index + 1}`}</strong>
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                        <p className="landing-showcase__hero-note">{modalCopy.heroNote}</p>
                      </aside>
                    </div>
                    <div className="landing-showcase__highlights">
                      {modalCopy.highlights.map((item) => (
                        <article key={item.title} className="landing-showcase__card">
                          <h2>{item.title}</h2>
                          <p>{item.copy}</p>
                        </article>
                      ))}
                    </div>
                    <div className="landing-showcase__divider" aria-hidden="true"></div>
                    <div className="landing-showcase__sections">
                      <section className="landing-showcase__section landing-showcase__section--wide">
                        <h2>{modalCopy.coreStackTitle}</h2>
                        {CORE_STACK_VARIANT === 'ticker' ? (
                          <CoreStackTicker items={coreStackItems} />
                        ) : (
                          <CoreStackCluster items={coreStackItems} />
                        )}
                      </section>
                    <div className="landing-showcase__divider" aria-hidden="true"></div>
                    <section className="landing-showcase__section landing-showcase__section--wide landing-showcase__section--expertise">
                      <h2>{modalCopy.expertiseTitle}</h2>
                      <p>{modalCopy.expertiseIntro}</p>
                      <div className="landing-showcase__expertise-grid">
                        {localizedExpertiseItems.map((item) => (
                          <Link key={item.slug} href={localeAwareServicesPath(item.slug)} className="landing-showcase__expertise-card landing-showcase__expertise-link">
                            <span className="landing-showcase__route-arrow" aria-hidden="true">
                              <FiArrowUpRight />
                            </span>
                            <div className="landing-showcase__expertise-head">
                              <span className="landing-showcase__expertise-icon">{item.icon}</span>
                              <div className="landing-showcase__expertise-title-group">
                                <h3>{item.title}</h3>
                                {item.subtitle ? <span>{item.subtitle}</span> : null}
                              </div>
                            </div>
                            <p>{item.description}</p>
                          </Link>
                        ))}
                      </div>
                    </section>
                    <div className="landing-showcase__divider" aria-hidden="true"></div>
                    <section className="landing-showcase__section landing-showcase__section--clients">
                      <span className="landing-showcase__section-eyebrow">{modalCopy.clientsEyebrow}</span>
                      <h2>{modalCopy.clientsTitle}</h2>
                      <p>{modalCopy.clientsCopy}</p>
                      <div className="landing-showcase__clients-faq">
                        <div className="landing-showcase__answer-grid landing-showcase__answer-grid--stacked">
                          {modalCopy.clientFaqItems.map((item, index) => {
                            const isOpen = openClientFaqIndex === index;

                            return (
                              <article key={item.question} className={`landing-showcase__answer-card ${isOpen ? 'landing-showcase__answer-card-open' : ''}`}>
                                <button
                                  type="button"
                                  className="landing-showcase__answer-toggle"
                                  onClick={() => setOpenClientFaqIndex((currentIndex) => currentIndex === index ? null : index)}
                                  aria-expanded={isOpen}
                                >
                                  <span className="landing-showcase__answer-question">{item.question}</span>
                                  <span className="landing-showcase__answer-indicator" aria-hidden="true">
                                    {isOpen ? '−' : '+'}
                                  </span>
                                </button>
                                <div className={`landing-showcase__answer-body ${isOpen ? 'landing-showcase__answer-body-open' : ''}`}>
                                  <p>{item.answer}</p>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                    <section className="landing-showcase__section landing-showcase__section--professional">
                      <div className="landing-showcase__answer-head">
                        <div className="landing-showcase__answer-intro">
                          <span className="landing-showcase__section-eyebrow">{modalCopy.professionalServicesEyebrow}</span>
                          <h2>{modalCopy.professionalServicesTitle}</h2>
                          <p>{modalCopy.professionalServicesCopy}</p>
                        </div>
                      </div>
                      <div className="landing-showcase__answer-grid landing-showcase__answer-grid--stacked">
                        {modalCopy.workMechanismItems.map((item, index) => {
                          const isOpen = openWorkMechanismIndex === index;

                          return (
                            <article key={item.question} className={`landing-showcase__answer-card ${isOpen ? 'landing-showcase__answer-card-open' : ''}`}>
                              <button
                                type="button"
                                className="landing-showcase__answer-toggle"
                                onClick={() => setOpenWorkMechanismIndex((currentIndex) => currentIndex === index ? null : index)}
                                aria-expanded={isOpen}
                              >
                                <span className="landing-showcase__answer-question">{item.question}</span>
                                <span className="landing-showcase__answer-indicator" aria-hidden="true">
                                  {isOpen ? '−' : '+'}
                                </span>
                              </button>
                              <div className={`landing-showcase__answer-body ${isOpen ? 'landing-showcase__answer-body-open' : ''}`}>
                                <p>{item.answer}</p>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  </div>
                  <div className="landing-showcase__divider" aria-hidden="true"></div>
                  <div className="landing-showcase__footer-stack">
                    <PlanetFooterSection
                      aboutTitle={modalCopy.worldTitle}
                      aboutParagraphs={modalCopy.worldParagraphs}
                      contactTitle={modalCopy.contactTitle}
                      contactCopy={modalCopy.contactCopy}
                      greetingStripAria={modalCopy.greetingStripAria}
                      greetingLabel={modalCopy.greetingLabel}
                      isAzerbaijaniLayout={modalLanguage === 'az'}
                      contactItems={localizedContactItems}
                      email={SITE_EMAIL}
                      desktopLayout="split"
                      inlineCta={{
                        label: storyCtaLabel,
                        onClick: closeLandingPage,
                        token: storyCtaLabel,
                      }}
                    />
                    <SignatureComponent text={modalCopy.footer} />
                  </div>
                  </div>
                </div>
                </div>
              </div>
            </section>
          </>
        </div>
      )}

      {playerId && selectedWorldId && token && (
        <Application
          key={`${playerId}-${selectedWorldId}`}
          playerId={playerId}
          selectedWorldId={selectedWorldId}
          token={token}
          carName={carName}
          matcaps={matcaps}
          onReady={handleApplicationReady}
        />
      )}

      {playerId && selectedWorldId && token && (
        <div className="grid bg-transparent overflow-hidden shadow-sm">
          <div className="flex justify-center items-center p-4">
            <div
              className="game-map-actions"
              id="game-map-actions"
              style={{ opacity: 0, display: 'none' }}
            >
              <div className="game-zoom-controls">
                <button
                  type="button"
                  className="game-zoom-button"
                  id="game-zoom-in-button"
                  onClick={() => handleCameraZoom('in')}
                  onTouchStart={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleCameraZoom('in');
                  }}
                  style={{ opacity: 0, display: 'none' }}
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  type="button"
                  className="game-zoom-button"
                  id="game-zoom-out-button"
                  onClick={() => handleCameraZoom('out')}
                  onTouchStart={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleCameraZoom('out');
                  }}
                  style={{ opacity: 0, display: 'none' }}
                  aria-label="Zoom out"
                >
                  -
                </button>
              </div>
              <button
                type="button"
                className="game-exit-button"
                id="game-exit-button"
                onClick={handleExitWorld}
                style={{ opacity: 0, display: 'none' }}
                aria-label="Exit game world"
              >
                EXIT
              </button>
            </div>
            <div id="userDisplay" className="cursor-pointer z-50" style={{ opacity: 0, display: 'none' }}></div>
            <div id="playerCountDisplay"></div>

            {/* Battery Status */}
            <div id="battery-status" className="battery-container">
              <div id="battery-percentage" className="battery-percentage"></div>
              <div className="battery-bar"></div>
            </div>

            {/*Friend List */}
            <div id="contact-list-container">
                <button id="toggle-contact-list" className='toggle-contact-list' style={{ display: 'none', opacity: 0 }}></button>
                <div id="contact-list">
                  <h2 style={{textAlign: 'center', paddingBottom: '10px'}}>CONNECTED LINKS</h2>
                  <button id='toggle-contact' className='toggle-contact'></button>
                </div>
            </div>

            {/*Controller Settings */}
            <div id="settings-container">
                <button id="toggle-settings" className="toggle-settings"></button>
                <div id="settings-window" className='display: block;'>
                  <h2 style={{textAlign: 'center', paddingBottom: '10px'}}>CONTROLLER</h2>
                  <button id='toggle-settings-window' className='toggle-settings-window'></button>
                  <div id='joystick-setup-container' className='joystick-setup-container'>
                    {/* <button id="move-joystick-left"><i data-feather="arrow-down-left"></i> </button> */}
                    {/* <button id="move-joystick-right"><i data-feather="arrow-down-right"></i> </button> */}
                    </div>
                    {/* First div with 8 buttons to drag */}
                    <div id="button-setup" className="customize-button-container">
                        {/*  Create 8 draggable buttons */}
                        <button className="draggable btn1" id="btn1" draggable="true">
                          <div
                              className="button-icon"
                              style={{
                                  backgroundImage: `url('/images/mobile/paperPlane.png')`,
                              }}
                            />
                        </button>
                        <button className="draggable btn2" id="btn2" draggable="true">
                          <div
                              className="button-icon"
                              style={{
                                  backgroundImage: `url('/images/mobile/doubleTriangle.png')`,
                              }}
                              />
                        </button>
                        <button className="draggable btn3" id="btn3" draggable="true">
                          <div
                                className="button-icon"
                                style={{
                                    backgroundImage: `url('/images/mobile/siren.png')`,
                                }}
                              />
                        </button>
                        <button className="draggable btn4" id="btn4" draggable="true">
                          <div
                                  className="button-icon"
                                  style={{
                                      backgroundImage: `url('/images/mobile/triangle.png')`,
                                  }}
                                />
                        </button>
                        <button className="draggable btn5" id="btn5" draggable="true">
                          <div
                                    className="button-icon"
                                    style={{
                                        backgroundImage: `url('/images/mobile/triangle.png')`,
                                        rotate: '180deg'
                                    }}
                                />
                        </button>
                        <button className="draggable btn6" id="btn6" draggable="true">
                          <div
                                    className="button-icon"
                                    style={{
                                        backgroundImage: `url('/images/mobile/cross.png')`,
                                    }}
                                />
                        </button>
                        <button className="draggable btn7" id="btn7" draggable="true">
                          <div
                                      className="button-icon"
                                      style={{
                                          backgroundImage: `url('/images/mobile/warning.png')`,
                                      }}
                                />
                        </button>
                        <button className="draggable btn8" id="btn8" draggable="true">
                          <div
                                        className="button-icon"
                                        style={{
                                            width: '70%',
                                            height: '70%',
                                            backgroundImage: `url('/images/mobile/start.png')`,
                                        }}
                                />
                        </button>
                    </div>

                    {/* Drop area container */}
                    <div id="drop-area" className="drop-container">
                        <div className="drop-slot" id="slot1" data-slot="1">
                            <span className="slot-label">1</span>
                        </div>
                        <div className="drop-slot" id="slot2" data-slot="2">
                            <span className="slot-label">2</span>
                        </div>
                        <div className="drop-slot" id="slot3" data-slot="3">
                            <span className="slot-label">3</span>
                        </div>
                        <div className="drop-slot" id="slot4" data-slot="4">
                            <span className="slot-label">4</span>
                        </div>
                        <div className="drop-slot" id="slot5" data-slot="5">
                            <span className="slot-label">5</span>
                        </div>
                        <div className="drop-slot" id="slot6" data-slot="6">
                            <span className="slot-label">6</span>
                        </div>
                        <div className="drop-slot" id="slot7" data-slot="7">
                            <span className="slot-label">7</span>
                        </div>
                        <div className="drop-slot" id="slot8" data-slot="8">
                            <span className="slot-label">8</span>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                      <button style={{paddingTop: '30px', paddingRight: '10px'}} id="reset-button">RESET</button>
                      <button style={{paddingTop: '30px', paddingLeft: '10px'}} id="save-settings-button">SAVE</button>
                    </div>
                </div>
            </div>

            {/*Popup Window */}
            <div id="no-target-popup" className="popup-container" style={{display: 'none'}}>
              <div className="popup-content">
                <p id="popup-message">Default message</p>
                <button id="ok-button">OKAY!</button>
              </div>
            </div>

            {/* Speedometer */}
            <div id="speedometer">
              <div id="needle"></div>
              <div id="speed-value"></div>
            </div>

            {/* Score Display */}
            <div id="score-status" className="player-score"></div>

            {/* Party Chat */}
            <button id="toggle-party-list" style={{ display: 'none', opacity: 0 }}></button>
            <button id="party-call-button" style={{display: 'none'}}>VOICE</button>
            <button id="toggle-lobby">INBOX</button>
            <div id="party-chat-container" className="chat-box" style={{ display: 'none' }}>
              <div id="party-chat-box" className="chat-box-body"></div>
              <div className="chat-box-footer">
                <input id="party-message-input" type="text" placeholder="Typing..." className="chat-input" />
                <button id="send-message-button" className="send-button">
                  <i data-feather="send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Hidden UI Elements */}
      <div id="coin-market" style={{ display: 'none', opacity: 0 }}></div>
      <button id="invite-button" style={{ display: 'none', opacity: 0 }}></button>
      <button id="friend-invite-button" style={{ display: 'none', opacity: 0 }}></button>
      <div id="touch-radio" style={{ opacity: 0 }}></div>
      <div id="touch-previous" style={{ opacity: 0 }}></div>
      <div id="touch-next" style={{ opacity: 0 }}></div>
      <div id="touch-mute" style={{ opacity: 0 }}></div>
      <input
        id="touch-slider"
        type="range"
        className="opacity-0"
        min="0"
        max="1"
        step="0.01"
      />
      <div id="score-animation-container"></div>

      {/* Switch Container */}
      <div id="switch-container">
        {/* <div id="switch">
          <div id="switch-toggle"></div>
        </div> */}
      </div>

    </main>
  );
};
