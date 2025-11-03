
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
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // Add entry for 'en'
    sitemapEntries.push({
      url: `${URL}/en${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'en': `${URL}/en${route}`,
          'id': `${URL}/id${route}`,
          'x-default': `${URL}/en${route}`,
        },
      },
    });

    // Add entry for 'id'
    sitemapEntries.push({
        url: `${URL}/id${route}`,
        lastModified: new Date(),
        alternates: {
            languages: {
                'en': `${URL}/en${route}`,
                'id': `${URL}/id${route}`,
                'x-default': `${URL}/en${route}`,
            },
        },
    });
  });

  // Simple deduplication based on URL
  const uniqueSitemap = Array.from(new Map(sitemapEntries.map(entry => [entry.url, entry])).values());


  return uniqueSitemap;
}
