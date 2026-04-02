import type { MetadataRoute } from 'next';
import { SERVICE_PAGES } from './content/services';
import { SITE_URL } from './content/site';
import { LOCALIZED_LOCALES } from './i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const localizedRoutes: MetadataRoute.Sitemap = LOCALIZED_LOCALES.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/${locale}/services`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...SERVICE_PAGES.map((service) => ({
      url: `${SITE_URL}/${locale}/services/${service.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]);

  return [...staticRoutes, ...serviceRoutes, ...localizedRoutes];
}
