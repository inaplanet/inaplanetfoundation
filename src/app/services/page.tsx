import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { SERVICE_PAGES } from '../content/services';
import { SITE_NAME, SITE_URL } from '../content/site';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Top-level software services offered by Inaplanet Foundation, including web apps, mobile apps, AI integrations, backend systems, and real-time platforms.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: `${SITE_NAME} Services`,
    description: 'Explore Inaplanet services for web apps, mobile apps, AI integrations, backend systems, and real-time platforms.',
    url: `${SITE_URL}/services`,
    type: 'website',
  },
};

export default function ServicesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: SERVICE_PAGES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/services/${service.slug}`,
      name: service.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ServicesClient />
    </>
  );
}
