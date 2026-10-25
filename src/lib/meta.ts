import type { Metadata } from 'next';
import { site } from '@/data/site';

/** One source for every page's SEO tags: title, description, canonical, Open Graph, Twitter. */
export function pageMeta({ title, description, path, absolute, noindex }: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  noindex?: boolean;
}): Metadata {
  const full = absolute ? title : `${title} | ${site.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: { 'tr-TR': path } },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: full,
      description,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'BUHARSU koltuk ve halı yıkama, İstanbul Anadolu Yakası' }],
    },
    twitter: { card: 'summary_large_image', title: full, description, images: ['/og.jpg'] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
