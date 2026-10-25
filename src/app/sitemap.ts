import type { MetadataRoute } from 'next';
import { localPages, services, site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/hizmetler', '/hakkimizda', '/calismalarimiz', '/hizmet-bolgeleri', '/iletisim',
    ...services.map((s) => `/hizmetler/${s.slug}`),
    ...localPages.map((p) => `/bolgeler/${p.slug}`),
  ];
  return paths.map((p) => ({
    url: `${site.url}${p === '/' ? '' : p}`,
    lastModified: new Date('2026-10-25'),
    changeFrequency: 'monthly',
    priority: p === '/' ? 1 : p.startsWith('/bolgeler') || p.startsWith('/hizmetler/') ? 0.8 : 0.6,
  }));
}
