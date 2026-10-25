import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { areaMessage, areas, coverageSentence, wa } from '@/data/site';
import { Band, Faqs, PageHero } from '@/components/page/Parts';
import { Arrow, Btn } from '@/components/ui';
import { Areas } from '@/components/home/Areas';
import { FinalCta } from '@/components/home/Sections';

export const metadata: Metadata = pageMeta({
  title: 'Hizmet bölgeleri: Sancaktepe, Sultanbeyli, Çekmeköy',
  description: 'BUHARSU’nun İstanbul hizmet bölgeleri: Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamı; Pendik’te Kurtköy ve Kavakpınar; Tuzla’da Aydınlı ve Orhanlı.',
  path: '/hizmet-bolgeleri',
});

const faqs = [
  { q: 'İstanbul’un tamamına hizmet veriyor musunuz?', a: 'Hayır. Şu an yalnızca Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamında; Pendik’te Kurtköy ve Kavakpınar, Tuzla’da Aydınlı ve Orhanlı mahallelerinde hizmet veriyoruz.' },
  { q: 'Pendik’in diğer mahallelerine geliyor musunuz?', a: 'Şu an Pendik’te yalnızca Kurtköy ve Kavakpınar’a hizmet veriyoruz.' },
  { q: 'Tuzla’nın diğer mahallelerine geliyor musunuz?', a: 'Şu an Tuzla’da yalnızca Aydınlı ve Orhanlı’ya hizmet veriyoruz.' },
  { q: 'Bölgemin listede olup olmadığından emin değilim.', a: 'Mahallenizi WhatsApp’tan yazın; hizmet bölgemizde olup olmadığını size hemen söyleyelim.' },
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Hizmet bölgeleri', href: '/hizmet-bolgeleri' }]}
        title={<>İstanbul’da<br />size yakınız.</>}
        lead={coverageSentence}
        aside={
          <nav className="paside paside--desk" aria-label="Bölge sayfaları">
            <p className="paside__label">Bölge sayfaları</p>
            <ul className="paside__links">
              {areas.map((a) => <li key={a.id}><a href={`/bolgeler/${a.page}`}>{a.scope === 'full' ? a.district : `${a.district}: ${a.parts.join(', ')}`}<Arrow /></a></li>)}
            </ul>
          </nav>
        }
      >
        <Btn href={wa()} icon="wa">WhatsApp’tan bölgenizi sorun</Btn>
      </PageHero>

      <Areas title="Haritada hizmet bölgemiz" lead="Bir ilçe seçin; kapsadığımız mahalleleri görün ve o bölge için hazır bir WhatsApp mesajıyla bize yazın." />

      <Band title="Bölge sayfaları" tone="stone">
        <ul className="areacards" role="list">
          {areas.map((a) => (
            <li key={a.id} className="areacard">
              <h3 className="areacard__name">{a.district}</h3>
              <p className="areacard__cov">{a.scope === 'full' ? 'Tüm mahalleler' : `Yalnızca ${a.parts.join(' ve ')}`}</p>
              <p className="areacard__hoods">{a.scope === 'full' ? a.parts.join(', ') : `${a.genitive} diğer mahallelerinde şu an hizmet vermiyoruz.`}</p>
              <div className="areacard__links">
                <a href={`/bolgeler/${a.page}`}>Bölge sayfası <Arrow /></a>
                <a href={wa(areaMessage(a))} target="_blank" rel="noopener">WhatsApp’tan sor <Arrow /></a>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      <Faqs items={faqs} />
      <FinalCta />
    </>
  );
}
