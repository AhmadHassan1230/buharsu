// JSON-LD builders. Only verified facts: no address, hours or ratings until confirmed.
import { areas, services, site, type Faq, type Service } from '@/data/site';

const areaServed = areas.flatMap((a) =>
  a.scope === 'full'
    ? [{ '@type': 'AdministrativeArea', name: `${a.district}, İstanbul` }]
    : a.parts.map((p) => ({ '@type': 'Place', name: `${p}, ${a.district}, İstanbul` })),
);

export const businessId = `${site.url}/#business`;

export function businessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/icon.svg`,
    telephone: site.phones.primary.intl.replace(/\s/g, ''),
    contactPoint: [
      { '@type': 'ContactPoint', telephone: site.phones.primary.intl.replace(/\s/g, ''), contactType: 'customer service', availableLanguage: 'Turkish' },
      { '@type': 'ContactPoint', telephone: site.phones.secondary.intl.replace(/\s/g, ''), contactType: 'customer service', availableLanguage: 'Turkish' },
    ],
    sameAs: [site.instagram.url],
    areaServed,
    knowsLanguage: 'tr',
    knowsAbout: ['Koltuk yıkama', 'Halı yıkama', 'Buharlı koltuk temizliği', 'Yatak yıkama', 'Perde temizliği', 'Overlok tamiri'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Temizlik hizmetleri',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: `${site.url}/hizmetler/${s.slug}` },
      })),
    },
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: 'tr-TR',
    publisher: { '@id': businessId },
  };
}

export function serviceLd(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.lead,
    url: `${site.url}/hizmetler/${s.slug}`,
    provider: { '@id': businessId },
    areaServed,
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function breadcrumbLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.href === '/' ? '' : it.href}` })),
  };
}

export const ldScript = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });
