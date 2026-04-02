import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageContent from '../../../ServicePageContent';
import { SERVICE_PAGE_MAP, SERVICE_PAGES } from '../../../content/services';
import { SERVICE_ROUTE_TRANSLATIONS } from '../../../content/serviceRouteCopy';
import { SITE_NAME, SITE_URL } from '../../../content/site';
import { buildLocaleAlternates, getLocaleUrl, isLocalizedSiteLocale } from '../../../i18n';
import { DEFAULT_SHARE_IMAGE, DEFAULT_TWITTER_IMAGE } from '../../../seo';

type Params = {
  lang: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ['az', 'ru'].flatMap((lang) => SERVICE_PAGES.map((service) => ({ lang, slug: service.slug })));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isLocalizedSiteLocale(params.lang)) {
    return {};
  }

  const service = SERVICE_PAGE_MAP[params.slug];

  if (!service) {
    return {};
  }

  const localizedService = SERVICE_ROUTE_TRANSLATIONS[params.lang][service.slug];
  const title = localizedService?.title ?? service.title;
  const description = localizedService?.summary ?? service.description;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: service.keywords,
    alternates: buildLocaleAlternates(params.lang, `/services/${service.slug}`),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: getLocaleUrl(params.lang, `/services/${service.slug}`),
      type: 'website',
      images: [DEFAULT_SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}

export default function LocalizedServiceDetailPage({ params }: { params: Params }) {
  if (!isLocalizedSiteLocale(params.lang)) {
    notFound();
  }

  return <ServicePageContent locale={params.lang} slug={params.slug} />;
}
