
import { MetadataRoute } from 'next';

const URL = 'https://mpnsolutions.my.id';

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
  '/contact',
  '/insight/news',
  '/insight/article',
  '/insight/brochure'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = routes
    .filter(route => !route.includes('under-construction')) // Filter out under-construction pages if any
    .map((route) => ({
      url: `${URL}/en${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'en': `${URL}/en${route}`,
          'id': `${URL}/id${route}`,
        },
      },
  }));

  return sitemapEntries;
}

    