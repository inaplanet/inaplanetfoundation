import type { Metadata } from 'next';
import { SERVICE_ROUTE_UI, type ServiceRouteLanguage } from './content/serviceRouteCopy';
import { SITE_NAME, SITE_URL } from './content/site';
import { buildLocaleAlternates, getLocaleUrl, type SiteLocale } from './i18n';

export const DEFAULT_SHARE_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} preview`,
} as const;

export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/twitter-image`;

export const SHARED_SITE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: [
    'web app development',
    'mobile app development',
    'backend systems',
    'real-time systems',
    'multiplayer web development',
    'AI workflows',
    'product engineering',
    'Azerbaijan software development',
    'Russian speaking development team',
    'Inaplanet',
  ],
  openGraph: {
    siteName: SITE_NAME,
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_TWITTER_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'technology',
};

export const HOME_METADATA_COPY: Record<SiteLocale, { title: string; description: string }> = {
  en: {
    title: 'Inaplanet Foundation.',
    description:
      'Custom web apps, mobile apps, AI integrations, backend systems, and real-time product engineering delivered by Inaplanet Foundation.',
  },
  az: {
    title: 'Inaplanet Foundation.',
    description:
      'Inaplanet Foundation tərəfindən təqdim olunan web tətbiqlər, mobil tətbiqlər, AI inteqrasiyaları, backend sistemləri və real-time məhsul mühəndisliyi.',
  },
  ru: {
    title: 'Inaplanet Foundation.',
    description:
      'Web-приложения, мобильные приложения, AI-интеграции, backend-системы и real-time product engineering от Inaplanet Foundation.',
  },
};

export function buildHomeMetadata(locale: SiteLocale): Metadata {
  const copy = HOME_METADATA_COPY[locale];
  const pageUrl = getLocaleUrl(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates(locale),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: pageUrl,
      type: 'website',
      images: [DEFAULT_SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}

export function buildServicesIndexMetadata(locale: ServiceRouteLanguage): Metadata {
  const title = SERVICE_ROUTE_UI[locale].servicesTitle;
  const description = SERVICE_ROUTE_UI[locale].servicesCopy;
  const pageUrl = getLocaleUrl(locale, '/services');

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: buildLocaleAlternates(locale, '/services'),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: pageUrl,
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
