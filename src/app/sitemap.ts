
import { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

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
  '/insight/brochure',
  '/insight/use-case',
  '/investor',
  '/program/website-1jt',
  '/program/website-murah',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    i18n.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${URL}/${locale}${route}`,
        lastModified: new Date(),
      });
    });
  });

  return sitemapEntries;
}
