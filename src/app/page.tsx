import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { HOMEPAGE_FAQ, SERVICE_PAGES } from './content/services';
import { SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_URL } from './content/site';

export const metadata: Metadata = {
  title: 'Inaplanet Foundation.',
  description:
    'Custom web apps, mobile apps, AI integrations, backend systems, and real-time product engineering delivered by Inaplanet Foundation.',
  keywords: [
    'Inaplanet Foundation',
    'web app development',
    'mobile app development',
    'AI integrations',
    'backend systems',
    'real-time systems',
    'Next.js development',
    'custom software development',
    'startup MVP development',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Inaplanet Foundation.',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inaplanet Foundation.',
    description: SITE_DESCRIPTION,
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    availableLanguage: ['en', 'az', 'ru'],
    knowsAbout: [
      'web app development',
      'mobile app development',
      'backend systems',
      'real-time systems',
      'AI integrations',
      'custom software development',
    ],
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    areaServed: 'Worldwide',
    availableLanguage: ['en', 'az', 'ru'],
    description: SITE_DESCRIPTION,
    serviceType: SERVICE_PAGES.map((service) => service.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital product engineering services',
      itemListElement: SERVICE_PAGES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: `${SITE_URL}/services/${service.slug}`,
        },
      })),
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['en', 'az', 'ru'],
    description: SITE_DESCRIPTION,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const serviceItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: SERVICE_PAGES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceItemListSchema) }}
      />
      <HomeClient />
    </>
  );
}
