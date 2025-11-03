
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
    '/career'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
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
  }));

  // Adding the Indonesian routes separately to ensure alternates are correct
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

  // Ensure unique URLs to avoid duplication issues, which can happen with this approach
  const uniqueUrls = new Map<string, MetadataRoute.Sitemap[0]>();
  sitemapEntries.forEach(entry => {
    if (!uniqueUrls.has(entry.url)) {
      uniqueUrls.set(entry.url, entry);
    }
  });

  return Array.from(uniqueUrls.values());
}
