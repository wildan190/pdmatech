
import { MetadataRoute } from 'next';

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
  ];

  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${URL}/en${route}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        'x-default': `${URL}/en${route}`,
        en: `${URL}/en${route}`,
        id: `${URL}/id${route}`,
      },
    },
  }));

  return sitemapEntries;
}
