import { SITE_URL } from './content/site';

export const DEFAULT_LOCALE = 'en';
export const LOCALIZED_LOCALES = ['az', 'ru'] as const;
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, ...LOCALIZED_LOCALES] as const;

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];
export type LocalizedSiteLocale = (typeof LOCALIZED_LOCALES)[number];

export function isSiteLocale(value: string): value is SiteLocale {
  return SUPPORTED_LOCALES.includes(value as SiteLocale);
}

export function isLocalizedSiteLocale(value: string): value is LocalizedSiteLocale {
  return LOCALIZED_LOCALES.includes(value as LocalizedSiteLocale);
}

export function getLocalePath(locale: SiteLocale, path = '/') {
  const normalizedPath =
    path === '/' || path === ''
      ? ''
      : path.startsWith('/')
        ? path
        : `/${path}`;

  if (locale === DEFAULT_LOCALE) {
    return normalizedPath || '/';
  }

  return normalizedPath ? `/${locale}${normalizedPath}` : `/${locale}`;
}

export function getLocaleUrl(locale: SiteLocale, path = '/') {
  return new URL(getLocalePath(locale, path), SITE_URL).toString();
}

export function buildLocaleAlternates(locale: SiteLocale, path = '/') {
  return {
    canonical: getLocalePath(locale, path),
    languages: {
      en: getLocalePath('en', path),
      az: getLocalePath('az', path),
      ru: getLocalePath('ru', path),
      'x-default': getLocalePath(DEFAULT_LOCALE, path),
    },
  };
}
