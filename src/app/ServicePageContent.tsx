import { notFound } from 'next/navigation';
import ServicesClient from './services/ServicesClient';
import { SERVICE_PAGE_MAP, SERVICE_PAGES } from './content/services';
import { SERVICE_ROUTE_TRANSLATIONS, type ServiceRouteLanguage } from './content/serviceRouteCopy';
import { SITE_NAME, SITE_URL } from './content/site';
import { getLocalePath } from './i18n';

type ServicePageContentProps = {
  locale: ServiceRouteLanguage;
  slug?: string;
};

export default function ServicePageContent({ locale, slug }: ServicePageContentProps) {
  const service = slug ? SERVICE_PAGE_MAP[slug] : null;

  if (slug && !service) {
    notFound();
  }

  if (!service) {
    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: SERVICE_PAGES.map((entry, index) => {
        const localizedEntry = locale === 'en' ? null : SERVICE_ROUTE_TRANSLATIONS[locale][entry.slug];

        return {
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}${getLocalePath(locale, `/services/${entry.slug}`)}`,
          name: localizedEntry?.title ?? entry.title,
        };
      }),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <ServicesClient initialLanguage={locale} />
      </>
    );
  }

  const localizedService = locale === 'en' ? null : SERVICE_ROUTE_TRANSLATIONS[locale][service.slug];
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: localizedService?.title ?? service.title,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    inLanguage: locale,
    description: localizedService?.summary ?? service.description,
    url: `${SITE_URL}${getLocalePath(locale, `/services/${service.slug}`)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesClient slug={service.slug} initialLanguage={locale} />
    </>
  );
}
