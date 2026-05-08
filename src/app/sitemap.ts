
import { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

const URL = 'https://mpnsolutions.my.id';

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}> = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/about/company', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about/people', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/privacy', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/ict-solutions/iot', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ict-solutions/enterprise', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ict-solutions/umkm', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ict-solutions/web', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/career', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/insight/news', priority: 0.9, changeFrequency: 'daily' },
  { path: '/insight/article', priority: 0.9, changeFrequency: 'daily' },
  { path: '/insight/brochure', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insight/use-case', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/investor', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/program/website-1jt', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/program/website-murah', priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2024-01-01');
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach(({ path, priority, changeFrequency }) => {
    i18n.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${URL}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority,
      });
    });
  });

  return sitemapEntries;
}
