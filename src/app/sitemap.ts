import type { MetadataRoute } from 'next';
import { SERVICE_PAGES } from './content/services';
import { SITE_URL } from './content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
