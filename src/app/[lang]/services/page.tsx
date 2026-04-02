import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageContent from '../../ServicePageContent';
import { isLocalizedSiteLocale } from '../../i18n';
import { buildServicesIndexMetadata } from '../../seo';

type Params = {
  lang: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: 'az' }, { lang: 'ru' }];
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isLocalizedSiteLocale(params.lang)) {
    return {};
  }

  return buildServicesIndexMetadata(params.lang);
}

export default function LocalizedServicesPage({ params }: { params: Params }) {
  if (!isLocalizedSiteLocale(params.lang)) {
    notFound();
  }

  return <ServicePageContent locale={params.lang} />;
}
