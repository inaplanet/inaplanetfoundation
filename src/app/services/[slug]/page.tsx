import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicesClient from '../ServicesClient';
import { SERVICE_PAGE_MAP, SERVICE_PAGES } from '../../content/services';
import { SITE_NAME, SITE_URL } from '../../content/site';

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = SERVICE_PAGE_MAP[params.slug];

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${SITE_NAME}`,
      description: service.description,
      url: `${SITE_URL}/services/${service.slug}`,
      type: 'article',
    },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = SERVICE_PAGE_MAP[params.slug];

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesClient slug={service.slug} />
    </>
  );
}
