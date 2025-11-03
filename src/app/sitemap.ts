
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
    sitemapEntries.push({
      url: `${URL}/en${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'x-default': `${URL}/en${route}`,
          en: `${URL}/en${route}`,
          id: `${URL}/id${route}`,
        },
      },
    });
    // To avoid duplication in a strict sitemap, we don't add the /id URL with the same alternates.
    // Each URL (en and id) should appear once with its own alternates.
    // The previous implementation was creating duplicate alternate blocks.
  });
  
  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${URL}/id${route}`,
      lastModified: new Date(),
       alternates: {
        languages: {
          'x-default': `${URL}/en${route}`,
          en: `${URL}/en${route}`,
          id: `${URL}/id${route}`,
        },
      },
    });
  });

  // Remove duplicates that might arise from the logic
  const uniqueUrls = new Set(sitemapEntries.map(entry => entry.url));
  const uniqueSitemap = Array.from(uniqueUrls).map(url => {
    return sitemapEntries.find(entry => entry.url === url)!;
  });

  return uniqueSitemap;
}
