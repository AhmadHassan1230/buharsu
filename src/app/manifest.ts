import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | Koltuk ve halı yıkama`,
    short_name: site.name,
    description: site.description,
    lang: 'tr-TR',
    start_url: '/',
    display: 'browser',
    background_color: '#F1F2EF',
    theme_color: '#0E1216',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  };
}
