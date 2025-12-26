
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
  '/investor',
  '/program/website-1jt',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => {
    const alternates: { [key: string]: string } = {};
    i18n.locales.forEach(locale => {
      alternates[locale] = `${URL}/${locale}${route}`;
    });

    return {
      url: `${URL}/${i18n.defaultLocale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: alternates,
      },
    };
  });

  return sitemapEntries;
}
