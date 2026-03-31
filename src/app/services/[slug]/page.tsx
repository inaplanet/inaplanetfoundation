import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
    <main className="service-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section className="service-page__shell landing-showcase__shell--orbitron">
        <div className="service-page__actions service-page__actions--top">
          <Link href="/" className="service-hub__link">
            Back to homepage
          </Link>
          <Link href="/services" className="service-hub__link">
            All services
          </Link>
        </div>
        <div className="service-page__hero">
          <p className="landing-showcase__eyebrow">INAPLANET SERVICE</p>
          <h1 className="service-page__title">{service.title}</h1>
          <p className="service-page__copy">{service.summary}</p>
        </div>
        <div className="service-page__keywords">
          {service.keywords.map((keyword) => (
            <span key={keyword} className="service-page__keyword">
              {keyword}
            </span>
          ))}
        </div>
        <div className="landing-showcase__divider" aria-hidden="true"></div>
        <div className="service-page__sections">
          {service.sections.map((section) => (
            <article key={section.title} className="service-page__card">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
        <div className="service-page__actions">
          <Link href="/" className="service-hub__link">
            Back to homepage
          </Link>
          <Link href="/services" className="service-hub__link">
            All services
          </Link>
        </div>
      </section>
    </main>
  );
}
