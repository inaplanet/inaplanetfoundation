import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePageContent from '../HomePageContent';
import { isLocalizedSiteLocale } from '../i18n';
import { buildHomeMetadata } from '../seo';

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

  return buildHomeMetadata(params.lang);
}

export default function LocalizedHomePage({ params }: { params: Params }) {
  if (!isLocalizedSiteLocale(params.lang)) {
    notFound();
  }

  return <HomePageContent locale={params.lang} />;
}
