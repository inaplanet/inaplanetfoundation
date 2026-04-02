import HomeClient from './HomeClient';
import { HOMEPAGE_FAQ, SERVICE_PAGES } from './content/services';
import { SERVICE_ROUTE_TRANSLATIONS } from './content/serviceRouteCopy';
import { SITE_EMAIL, SITE_NAME, SITE_URL } from './content/site';
import { getLocalePath, getLocaleUrl, type SiteLocale } from './i18n';
import { HOME_METADATA_COPY } from './seo';

type HomePageContentProps = {
  locale: SiteLocale;
};

export default function HomePageContent({ locale }: HomePageContentProps) {
  const localeDescription = HOME_METADATA_COPY[locale].description;
  const pageUrl = getLocaleUrl(locale);
  const localizedServices =
    locale === 'en'
      ? SERVICE_PAGES.map((service) => ({ ...service, localizedTitle: service.title, localizedDescription: service.description }))
      : SERVICE_PAGES.map((service) => {
          const localizedCopy = SERVICE_ROUTE_TRANSLATIONS[locale][service.slug];

          return {
            ...service,
            localizedTitle: localizedCopy?.title ?? service.title,
            localizedDescription: localizedCopy?.summary ?? service.description,
          };
        });

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    description: localeDescription,
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
    url: pageUrl,
    email: SITE_EMAIL,
    areaServed: 'Worldwide',
    availableLanguage: ['en', 'az', 'ru'],
    description: localeDescription,
    serviceType: localizedServices.map((service) => service.localizedTitle),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital product engineering services',
      itemListElement: localizedServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.localizedTitle,
          description: service.localizedDescription,
          url: `${SITE_URL}${getLocalePath(locale, `/services/${service.slug}`)}`,
        },
      })),
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: pageUrl,
    inLanguage: locale,
    description: localeDescription,
  };

  const faqSchema = locale === 'en'
    ? {
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
      }
    : null;

  const serviceItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: localizedServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.localizedTitle,
      url: `${SITE_URL}${getLocalePath(locale, `/services/${service.slug}`)}`,
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
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceItemListSchema) }}
      />
      <HomeClient initialLanguage={locale} />
    </>
  );
}
