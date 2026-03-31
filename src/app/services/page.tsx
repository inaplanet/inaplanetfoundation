import type { Metadata } from 'next';
import Link from 'next/link';
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
    <main className="service-hub">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <section className="service-hub__shell landing-showcase__shell--orbitron">
        <div className="service-hub__hero">
          <p className="landing-showcase__eyebrow">INAPLANET.COM</p>
          <h1 className="service-hub__title">Top-Level Services</h1>
          <p className="service-hub__copy">
            These routes exist to make Inaplanet easier to understand for search engines, AI assistants, and technical buyers who need a clear map of what we build.
          </p>
        </div>
        <div className="service-hub__actions">
          <Link href="/" className="service-hub__link">
            Back to homepage
          </Link>
        </div>
        <div className="landing-showcase__divider" aria-hidden="true"></div>
        <div className="service-hub__grid">
          {SERVICE_PAGES.map((service) => (
            <article key={service.slug} className="service-hub__card">
              <p className="service-hub__card-eyebrow">Top-level route</p>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <Link href={`/services/${service.slug}`} className="service-hub__link">
                Explore service
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
