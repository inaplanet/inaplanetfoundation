export type ServicePage = {
  slug: string;
  title: string;
  navLabel: string;
  summary: string;
  description: string;
  keywords: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'corporate-websites',
    title: 'Corporate Websites',
    navLabel: 'Corporate Websites',
    summary: 'Corporate website delivery for companies that need a clear offer, strong positioning, and a business-facing web presence that converts.',
    description: 'Inaplanet designs and delivers corporate websites that explain the business clearly, structure the offer, and turn visitor attention into contact and trust.',
    keywords: ['corporate website development', 'company website design', 'business website development', 'corporate web design'],
    sections: [
      {
        title: 'What we build',
        body: 'We build company websites that explain the offer, present the business professionally, and make it easier for buyers, partners, and talent to understand what the company actually does.',
      },
      {
        title: 'What matters',
        body: 'A corporate website is not only visual polish. It needs clear structure, strong messaging, fast loading, and a content hierarchy that turns curiosity into contact.',
      },
      {
        title: 'Who this fits',
        body: 'This service fits companies that need a sharper public-facing presence, a modern replacement for an outdated website, or a stronger digital presentation before sales and outreach scale up.',
      },
    ],
  },
  {
    slug: 'landing-pages',
    title: 'Landing Pages',
    navLabel: 'Landing Pages',
    summary: 'Landing pages built around one message, one audience, and one conversion goal.',
    description: 'Inaplanet designs and ships landing pages for product launches, campaigns, and service offers with strong message hierarchy, performance, and conversion-focused structure.',
    keywords: ['landing page development', 'campaign landing page', 'conversion landing page', 'product landing page'],
    sections: [
      {
        title: 'What we build',
        body: 'We build focused landing pages for launches, paid campaigns, product announcements, and service offers where the page has to move a visitor toward one clear action.',
      },
      {
        title: 'Why this matters',
        body: 'Landing pages fail when they try to say everything. The right build keeps the hierarchy sharp, the message direct, and the page fast enough to convert on mobile and desktop.',
      },
      {
        title: 'How we deliver',
        body: 'We turn the brief into a clear structure for narrative, proof, conversion flow, and technical implementation so the page works as a business tool rather than a decorative screen.',
      },
    ],
  },
  {
    slug: 'web-app-development',
    title: 'Web App Development',
    navLabel: 'Web Apps',
    summary: 'Custom web application development for products that need clear UX, stable architecture, and production-grade delivery.',
    description: 'Inaplanet designs and delivers custom web applications, dashboards, marketplaces, admin panels, and product platforms with scalable frontend and backend architecture.',
    keywords: ['web app development', 'custom web applications', 'next.js development', 'dashboard development'],
    sections: [
      {
        title: 'What we build',
        body: 'We build operational web products: customer-facing apps, admin systems, internal dashboards, marketplaces, and browser-based product experiences that need long-term maintainability instead of short demo value.',
      },
      {
        title: 'How we deliver',
        body: 'We turn a rough brief or Figma into scope, architecture, implementation sequencing, and launch-ready execution. The goal is to ship a working product surface that is commercially usable, not just visually polished.',
      },
      {
        title: 'Who this fits',
        body: 'This service fits startups launching MVPs, teams replacing legacy internal tools, and companies that need a custom product instead of another CMS-shaped website.',
      },
    ],
  },
  {
    slug: 'e-commerce-development',
    title: 'E-Commerce Development',
    navLabel: 'E-Commerce',
    summary: 'Commerce systems built for product discovery, checkout reliability, repeat use, and operational control.',
    description: 'Inaplanet builds e-commerce experiences with storefronts, catalog systems, checkout flows, admin tooling, and backend coordination for real commercial use.',
    keywords: ['e-commerce development', 'online store development', 'checkout flow development', 'custom ecommerce platform'],
    sections: [
      {
        title: 'What we build',
        body: 'We build storefronts, product catalogs, carts, checkout flows, order management, and the operational tooling needed to support repeat sales and post-purchase flows.',
      },
      {
        title: 'What makes it work',
        body: 'Good commerce systems depend on more than product cards. They need reliable payment behavior, clear product structure, strong admin visibility, and stable backend coordination.',
      },
      {
        title: 'Who this fits',
        body: 'This service fits brands, founders, and operators who need a custom commerce surface instead of forcing their product model into a generic template.',
      },
    ],
  },
  {
    slug: 'marketplace-development',
    title: 'Marketplace Development',
    navLabel: 'Marketplace',
    summary: 'Marketplace platforms with vendor logic, listings, moderation, role separation, and operational tooling.',
    description: 'Inaplanet designs and delivers marketplace platforms with multi-party flows, listing systems, vendor operations, moderation, and payout-aware architecture.',
    keywords: ['marketplace development', 'multi-vendor platform', 'marketplace app development', 'platform product development'],
    sections: [
      {
        title: 'What we build',
        body: 'We build marketplace products with buyer and seller flows, listing management, moderation tools, role separation, and platform operations behind the public product surface.',
      },
      {
        title: 'What is difficult here',
        body: 'Marketplace products are not just catalogs. They depend on trust systems, permissions, payout logic, dispute paths, and operational visibility across many actors at once.',
      },
      {
        title: 'Why custom matters',
        body: 'Teams usually need a marketplace to reflect their specific commercial model. That requires product architecture, not a generic store with a vendor badge attached to it.',
      },
    ],
  },
  {
    slug: 'social-network-development',
    title: 'Social Network Development',
    navLabel: 'Social Networks',
    summary: 'Social product engineering for feeds, profiles, messaging, communities, and retention-oriented interaction loops.',
    description: 'Inaplanet builds social network products with profiles, feeds, messaging, community behavior, and the backend systems needed to support live user interaction.',
    keywords: ['social network development', 'community platform development', 'messaging app development', 'social app development'],
    sections: [
      {
        title: 'What we build',
        body: 'We build social product surfaces such as feeds, profiles, messaging, community areas, notifications, and interaction loops designed to keep users engaged over time.',
      },
      {
        title: 'What makes it valuable',
        body: 'Social products depend on retention behavior, not only UI. The important work is how content, communication, and feedback loops fit together once real users arrive.',
      },
      {
        title: 'Who this fits',
        body: 'This service fits founders and teams building community-led products, networked user experiences, or platforms where interaction itself is part of the product value.',
      },
    ],
  },
  {
    slug: 'multiplayer-game-development',
    title: 'Multiplayer Game Development',
    navLabel: 'Multiplayer Games',
    summary: 'Browser-based and real-time multiplayer product engineering for synchronized, interactive environments.',
    description: 'Inaplanet builds multiplayer and shared interactive browser experiences with synchronized state, real-time logic, and backend coordination for live users.',
    keywords: ['multiplayer game development', 'browser game development', 'real-time multiplayer', 'interactive web experiences'],
    sections: [
      {
        title: 'What we build',
        body: 'We build shared interactive environments where multiple users join the same experience, move through synchronized sessions, and interact in real time inside the browser.',
      },
      {
        title: 'What makes it hard',
        body: 'The hard part is not visuals alone. It is synchronized state, session continuity, reconnection handling, performance budgets, and making the experience feel stable under live usage.',
      },
      {
        title: 'Why this matters commercially',
        body: 'Multiplayer systems are strong proof-of-capability for companies that need live coordination, rich interactivity, or product differentiation through technical experience.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    navLabel: 'Mobile Apps',
    summary: 'Mobile product delivery for apps that need clear UX, reliable backend integration, and fast iteration.',
    description: 'Inaplanet builds mobile applications with product-focused UX, backend integration, payment flows, auth, and scalable delivery for launches and iterative releases.',
    keywords: ['mobile app development', 'app development company', 'startup MVP app', 'react native development'],
    sections: [
      {
        title: 'What we build',
        body: 'We deliver mobile apps for product launches, customer services, marketplaces, social features, operations, and any workflow that needs a reliable mobile surface connected to a real backend.',
      },
      {
        title: 'What matters',
        body: 'The important part is not just the screen design. It is release discipline, backend coordination, auth and payment reliability, and making sure the app is ready for repeat usage after launch.',
      },
      {
        title: 'Why clients choose this',
        body: 'Teams usually come to us when they need an MVP that can actually evolve into a product, or when they need to stabilize a half-built mobile app that was assembled without strong delivery structure.',
      },
    ],
  },
  {
    slug: 'ai-integrations',
    title: 'AI Integrations',
    navLabel: 'AI Integrations',
    summary: 'AI-assisted product flows and internal automations integrated into real business operations, not added as gimmicks.',
    description: 'Inaplanet designs and integrates AI workflows, assistants, copilots, and automation systems into web products, mobile apps, and internal business processes.',
    keywords: ['AI integrations', 'AI solutions', 'AI workflows', 'product automation'],
    sections: [
      {
        title: 'What we build',
        body: 'We build AI-powered product flows, internal copilots, task automations, content and support assistants, and operational systems where AI shortens delivery loops or reduces manual work.',
      },
      {
        title: 'How we apply AI',
        body: 'AI should serve the product and the business process. We integrate it where it improves throughput, response quality, or internal efficiency, while keeping architecture and risk-sensitive decisions under human control.',
      },
      {
        title: 'Why this ranks as a core service',
        body: 'For many companies, AI is now part of the product strategy rather than a side experiment. The valuable work is making it reliable, scoped, and commercially useful inside an actual system.',
      },
    ],
  },
  {
    slug: 'backend-systems',
    title: 'Backend Systems',
    navLabel: 'Backend Systems',
    summary: 'Backend architecture, APIs, databases, and operational systems designed for stable product delivery and scale.',
    description: 'Inaplanet builds backend systems, APIs, databases, queues, admin tooling, and infrastructure-oriented product layers for stable long-term operations.',
    keywords: ['backend systems', 'API development', 'backend architecture', 'cloud systems'],
    sections: [
      {
        title: 'What we build',
        body: 'We design and implement API layers, database structures, event-driven logic, operational tooling, and infrastructure-facing systems that support the actual product instead of limiting it.',
      },
      {
        title: 'What strong backend work means',
        body: 'Strong backend delivery is not invisible plumbing. It defines reliability, speed of future iteration, monitoring quality, and whether the product can support growth without operational chaos.',
      },
      {
        title: 'Who this is for',
        body: 'This service is for teams launching serious web or mobile products, replacing unstable backend foundations, or building internal systems that need clear operational ownership.',
      },
    ],
  },
  {
    slug: 'real-time-systems',
    title: 'Real-Time Systems',
    navLabel: 'Real-Time Systems',
    summary: 'Real-time product engineering for multiplayer, live dashboards, live ops, collaborative tools, and synchronized user experiences.',
    description: 'Inaplanet delivers real-time systems with synchronized state, socket-driven coordination, backend event handling, and browser-based interactive experiences.',
    keywords: ['real-time systems', 'multiplayer web development', 'live dashboards', 'socket architecture'],
    sections: [
      {
        title: 'What we build',
        body: 'We build synchronized real-time products such as live dashboards, collaborative tools, session-based browser experiences, multiplayer environments, and operational systems that need low-latency coordination.',
      },
      {
        title: 'What makes it difficult',
        body: 'The challenge is not only sockets. It is state ownership, reconnection behavior, failure recovery, bounded updates, and making sure the UI stays understandable while many events happen at once.',
      },
      {
        title: 'Why Inaplanet is credible here',
        body: 'The multiplayer world inside this project acts as a public proof-of-concept for this exact capability: real-time synchronization, browser graphics, backend orchestration, and user-facing interaction working together.',
      },
    ],
  },
  {
    slug: 'auth-payment-flows',
    title: 'Auth and Payment Flows',
    navLabel: 'Auth / Payment',
    summary: 'Authentication, access, subscription, and payment systems designed to reduce friction and failure.',
    description: 'Inaplanet builds auth and payment flows for web and mobile products, including identity, roles, subscriptions, checkout logic, and recovery paths.',
    keywords: ['auth flow development', 'payment flow development', 'checkout systems', 'subscription platform development'],
    sections: [
      {
        title: 'What we build',
        body: 'We build sign-up, sign-in, recovery, onboarding, subscriptions, checkout, access-control, and payment-related product flows that users rely on repeatedly.',
      },
      {
        title: 'Why this matters',
        body: 'When auth or payment flows break, revenue and trust break with them. These flows need clarity, resilience, and a product structure that removes confusion instead of adding it.',
      },
      {
        title: 'What clients gain',
        body: 'Clients get a product path that is easier to use, easier to monitor, and less likely to fail at the exact point where identity or money becomes part of the experience.',
      },
    ],
  },
  {
    slug: 'vpc-cloud-infrastructure',
    title: 'VPC and Cloud Infrastructure',
    navLabel: 'VPC Infrastructure',
    summary: 'Cloud and VPC infrastructure design for secure boundaries, operational reliability, and deployable environments.',
    description: 'Inaplanet designs VPC and cloud infrastructure layouts with subnet strategy, service isolation, environment structure, and deployment-aware architecture.',
    keywords: ['VPC infrastructure', 'cloud architecture', 'private public subnet design', 'deployable cloud environment'],
    sections: [
      {
        title: 'What we build',
        body: 'We design infrastructure layouts with private and public subnet separation, secure service boundaries, deployable cloud environments, and the operational structure needed for real products.',
      },
      {
        title: 'Why this matters',
        body: 'Infrastructure shapes product reliability and security. Good environment design makes deployment cleaner, operations calmer, and growth easier to manage.',
      },
      {
        title: 'Who this fits',
        body: 'This service fits teams building serious products that need clearer cloud structure, safer network boundaries, or a more maintainable operational foundation.',
      },
    ],
  },
  {
    slug: 'smart-contract-development',
    title: 'Smart Contract Development',
    navLabel: 'Smart Contracts',
    summary: 'Smart contract delivery for token mechanics, treasury logic, on-chain rules, and product-linked blockchain flows.',
    description: 'Inaplanet designs and implements smart contracts, tokenomics logic, treasury behavior, and on-chain product rules tied to real user flows.',
    keywords: ['smart contract development', 'solidity development', 'tokenomics development', 'web3 product engineering'],
    sections: [
      {
        title: 'What we build',
        body: 'We build Solidity-based contracts, token mechanics, treasury rules, claims, and on-chain product logic that connects to a real application surface rather than existing in isolation.',
      },
      {
        title: 'What matters here',
        body: 'Smart contracts need more than code generation. They need disciplined logic, product alignment, and a clear understanding of how on-chain rules affect actual user flows.',
      },
      {
        title: 'Why teams use this',
        body: 'This service fits teams building tokenized products, blockchain-enabled platforms, or systems where trust, ownership, and programmable rules belong inside the product itself.',
      },
    ],
  },
];

export const SERVICE_PAGE_MAP = Object.fromEntries(
  SERVICE_PAGES.map((service) => [service.slug, service])
) as Record<string, ServicePage>;

export const HOMEPAGE_FAQ = [
  {
    question: 'What services does Inaplanet provide?',
    answer: 'Inaplanet builds custom web apps, mobile apps, backend systems, AI integrations, real-time platforms, and product infrastructure for launches, MVPs, and long-term product delivery.',
  },
  {
    question: 'Does Inaplanet build MVPs for startups?',
    answer: 'Yes. We help startups turn rough briefs into technical scope, delivery phases, architecture, and launch-ready implementation for web and mobile products.',
  },
  {
    question: 'Can Inaplanet handle real-time systems and multiplayer-style architecture?',
    answer: 'Yes. Real-time coordination, synchronized state, browser-based interactivity, and backend orchestration are part of the product capability this project already demonstrates publicly.',
  },
] as const;
