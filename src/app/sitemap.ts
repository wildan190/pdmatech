import { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

const URL = 'https://mpnsolutions.my.id';

export default function sitemap(): MetadataRoute.Sitemap {
  // Exclude under-construction pages from the sitemap
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
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${URL}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          'x-default': `${URL}/en${route}`,
          en: `${URL}/en${route}`,
          id: `${URL}/id${route}`,
        },
      },
    });
     sitemapEntries.push({
      url: `${URL}/id${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          'x-default': `${URL}/en${route}`,
          en: `${URL}/en${route}`,
          id: `${URL}/id${route}`,
        },
      },
    });
  });

  return sitemapEntries;
}
