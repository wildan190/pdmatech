import { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

const URL = 'https://mpnsolutions.my.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about/company',
    '/about/people',
    '/about/privacy',
    '/ict-solutions/iot',
    '/ict-solutions/enterprise',
    '/ict-solutions/umkm',
    '/ict-solutions/web',
    '/career',
    '/insight/news',
    '/insight/article',
    '/insight/brochure',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    i18n.locales.forEach((locale) => {
      const isDefaultLocale = locale === i18n.defaultLocale;
      const url = isDefaultLocale ? `${URL}${route}` : `${URL}/${locale}${route}`;
      
      // The logic for sitemap can be improved to avoid adding default locale prefix
      // but for now, we will add both versions /en/... and /...
      // And rely on canonical tags. Let's create both.
      
      sitemapEntries.push({
        url: `${URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
         alternates: {
          languages: {
            en: `${URL}/en${route}`,
            id: `${URL}/id${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
