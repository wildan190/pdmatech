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
    '/insight/news',
    '/insight/article',
    '/insight/brochure'
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
  });
  
  routes.forEach((route) => {
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

  // To avoid duplication, we'll use a Set
  const uniqueUrls = new Set(sitemapEntries.map(e => e.url));
  const uniqueSitemap: MetadataRoute.Sitemap = [];
  uniqueUrls.forEach(url => {
    // find the first entry with this url
    const entry = sitemapEntries.find(e => e.url === url);
    if(entry) {
      uniqueSitemap.push(entry);
    }
  });

  return uniqueSitemap;
}
