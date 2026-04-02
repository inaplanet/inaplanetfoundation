import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import AppShell from '../AppShell';
import { SITE_NAME, SITE_URL } from '../content/site';
import { isLocalizedSiteLocale } from '../i18n';
import { DEFAULT_SHARE_IMAGE, DEFAULT_TWITTER_IMAGE } from '../seo';

export const metadata: Metadata = {
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
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: 'az' }, { lang: 'ru' }];
}

export default function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { lang: string };
}>) {
  if (!isLocalizedSiteLocale(params.lang)) {
    notFound();
  }

  return <AppShell lang={params.lang}>{children}</AppShell>;
}
