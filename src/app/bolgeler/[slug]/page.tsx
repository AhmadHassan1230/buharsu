import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { notFound } from 'next/navigation';
import { areaById, localPages, placeName, services, site, wa } from '@/data/site';
import { Band, Faqs, PageHero } from '@/components/page/Parts';
import { Arrow, Btn, TextLink } from '@/components/ui';
import { AreaMap } from '@/components/AreaMap';
import { Composer } from '@/components/Composer';
import { FinalCta } from '@/components/home/Sections';

export const dynamicParams = false;
export function generateStaticParams() {
  return localPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/bolgeler/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = localPages.find((x) => x.slug === slug);
  return p ? pageMeta({ title: p.title, description: p.description, path: `/bolgeler/${p.slug}` }) : {};
}

export default async function LocalPage({ params }: PageProps<'/bolgeler/[slug]'>) {
  const { slug } = await params;
  const p = localPages.find((x) => x.slug === slug);
  if (!p) notFound();
  const a = areaById(p.areaId);
  const place = placeName(a);
  const msg = (svc: string) => `Merhaba BUHARSU, ${place} için ${svc.toLocaleLowerCase('tr')} hakkında bilgi ve fiyat almak istiyorum.`;
  const composerPlace = a.scope === 'full' ? a.district : undefined;

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Hizmet bölgeleri', href: '/hizmet-bolgeleri' }, { name: p.h1, href: `/bolgeler/${p.slug}` }]}
        title={p.h1}
        lead={p.intro[0]}
        aside={<div className="paside paside__map"><AreaMap selected={a.id} compact /></div>}
      >
        <Btn href={wa(msg('Koltuk ve halı yıkama'))} icon="wa">WhatsApp’tan teklif al</Btn>
        <TextLink href={site.phones.primary.tel}>{site.phones.primary.display}</TextLink>
      </PageHero>

      <Band
        title={a.scope === 'full' ? `${a.district}: tüm mahalleler` : `${a.district}: yalnızca ${a.parts.join(' ve ')}`}
      >
        <p className="prose">{p.intro[1]}</p>
        {a.scope === 'full' ? (
          <ul className="hoods" role="list" aria-label={`${a.district} mahalleleri`}>
            {a.parts.map((h) => <li key={h}>{h}</li>)}
          </ul>
        ) : (
          <ul className="hoods hoods--partial" role="list" aria-label="Hizmet verilen mahalleler">
            {a.parts.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
        <div className="note">
          <h3>{p.note.title}</h3>
          <p>{p.note.text}</p>
        </div>
      </Band>

      <Band title={`${a.locative} hizmetlerimiz`} tone="stone">
        <ul className="srows srows--compact" role="list">
          {services.map((s) => (
            <li key={s.slug}>
              <div className="srow srow--split">
                <a className="srow__main" href={`/hizmetler/${s.slug}`}>
                  <span className="srow__name">{s.name}</span>
                  <span className="srow__text">{s.short}</span>
                </a>
                <a className="srow__wa" href={wa(msg(s.name))} target="_blank" rel="noopener" aria-label={`${s.name} için WhatsApp’tan sor`}>
                  Sor <Arrow />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      <Band title="Fiyat için mesajınızı hazırlayın">
        <Composer place={composerPlace} />
      </Band>

      <Faqs items={p.faqs} title={`${a.district} için sık sorulanlar`} />
      <FinalCta />
    </>
  );
}
