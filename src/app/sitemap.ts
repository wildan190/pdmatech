import type { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

const BASE_URL = 'https://mpnsolutions.my.id';

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
  const lastModified = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Validasi i18n.locales
  const locales = i18n?.locales || ['en', 'id', 'zh'];

  routes.forEach(({ path, priority, changeFrequency }) => {
    locales.forEach((locale) => {
      // Bangun URL dengan benar: BASE_URL/locale/path
      const pathname = path ? `/${locale}${path}` : `/${locale}`;
      const url = new URL(pathname, BASE_URL).toString();

      sitemapEntries.push({
        url: url.replace(/\/$/, ''), // Hapus trailing slash untuk konsistensi
        lastModified,
        changeFrequency,
        priority,
      });
    });
  });

  return sitemapEntries;
}
