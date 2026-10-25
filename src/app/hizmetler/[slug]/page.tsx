import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { notFound } from 'next/navigation';
import { areas, serviceBySlug, services, wa } from '@/data/site';
import { Band, Faqs, PageHero } from '@/components/page/Parts';
import { Arrow, Btn, TextLink } from '@/components/ui';
import { AreaMap } from '@/components/AreaMap';
import { FinalCta } from '@/components/home/Sections';
import { ldScript, serviceLd } from '@/lib/schema';

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/hizmetler/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  return s ? pageMeta({ title: s.seo.title, description: s.seo.description, path: `/hizmetler/${s.slug}` }) : {};
}

export default async function ServicePage({ params }: PageProps<'/hizmetler/[slug]'>) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Hizmetler', href: '/hizmetler' }, { name: s.name, href: `/hizmetler/${s.slug}` }]}
        title={s.name}
        lead={s.lead}
        media={s.image}
      >
        <Btn href={wa(s.wa)} icon="wa">WhatsApp’tan teklif al</Btn>
        <TextLink href="#surec">Nasıl çalışıyoruz</TextLink>
      </PageHero>

      <Band title="Neler dahil?">
        <ul className="ticks" role="list">
          {s.includes.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </Band>

      <Band title="Nasıl çalışıyoruz?" tone="stone" id="surec">
        <ol className="steps">
          {s.process.map((x, i) => (
            <li key={x}>
              <span className="steps__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span>{x}</span>
            </li>
          ))}
        </ol>
        <p className="expect"><strong>Bilmeniz gereken:</strong> {s.expect}</p>
      </Band>

      <Band
        title="Hizmet verdiğimiz bölgeler"
        aside={<div className="band__map"><AreaMap compact /></div>}
      >
        <ul className="arealinks" role="list">
          {areas.map((a) => (
            <li key={a.id}>
              <a href={`/bolgeler/${a.page}`}>
                <span className="arealinks__name">{a.district}</span>
                <span className="arealinks__cov">{a.scope === 'full' ? 'Tüm mahalleler' : `Yalnızca ${a.parts.join(' ve ')}`}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <Faqs items={s.faqs} />

      <Band title="Diğer hizmetler" tone="stone">
        <ul className="srows srows--compact" role="list">
          {others.map((o) => (
            <li key={o.slug}>
              <a className="srow" href={`/hizmetler/${o.slug}`}>
                <span className="srow__name">{o.name}</span>
                <span className="srow__text">{o.short}</span>
                <Arrow className="srow__arrow" />
              </a>
            </li>
          ))}
        </ul>
      </Band>

      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(serviceLd(s))} />
    </>
  );
}
