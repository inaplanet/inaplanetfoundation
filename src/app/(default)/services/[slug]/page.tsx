import type { Metadata } from 'next';
import ServicePageContent from '../../../ServicePageContent';
import { SERVICE_PAGE_MAP, SERVICE_PAGES } from '../../../content/services';
import { SITE_NAME, SITE_URL } from '../../../content/site';
import { buildLocaleAlternates, getLocaleUrl } from '../../../i18n';
import { DEFAULT_SHARE_IMAGE, DEFAULT_TWITTER_IMAGE } from '../../../seo';

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
    metadataBase: new URL(SITE_URL),
    title: `${service.title} | ${SITE_NAME}.`,
    description: service.description,
    keywords: service.keywords,
    alternates: buildLocaleAlternates('en', `/services/${service.slug}`),
    openGraph: {
      title: `${service.title} | ${SITE_NAME}.`,
      description: service.description,
      url: getLocaleUrl('en', `/services/${service.slug}`),
      type: 'website',
      images: [DEFAULT_SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | ${SITE_NAME}.`,
      description: service.description,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  return <ServicePageContent locale="en" slug={params.slug} />;
}
