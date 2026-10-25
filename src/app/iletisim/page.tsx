import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { areas, coverageSentence, site, wa } from '@/data/site';
import { Band, PageHero } from '@/components/page/Parts';
import { Arrow, PhoneIcon, WaIcon } from '@/components/ui';
import { Composer } from '@/components/Composer';
import { AreaMap } from '@/components/AreaMap';

export const metadata: Metadata = pageMeta({
  title: 'İletişim: WhatsApp ve telefon',
  description: 'BUHARSU İstanbul iletişim: 0505 188 80 63 (telefon ve WhatsApp), alternatif hat 0543 962 45 49. Fiyat için mesajınızı hazırlayın.',
  path: '/iletisim',
});

export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'İletişim', href: '/iletisim' }]}
        title={<>Bir mesaj<br />yeterli.</>}
        lead="Fiyat ve randevu için WhatsApp’tan yazın ya da arayın. Eşyanızın fotoğrafı, ölçüsü ve mahalleniz, size doğru bilgi vermemizi kolaylaştırır."
        aside={
          <div className="paside paside--desk">
            <p className="paside__label">Telefon ve WhatsApp</p>
            <a className="paside__big" href={site.phones.primary.tel}>{site.phones.primary.display}</a>
            <p className="paside__note">Alternatif hat: <a href={site.phones.secondary.tel}>{site.phones.secondary.display}</a></p>
          </div>
        }
      />

      <section className="contact" aria-label="İletişim bilgileri">
        <a className="contact__card contact__card--wa" href={wa()} target="_blank" rel="noopener">
          <WaIcon className="contact__icon" />
          <span className="contact__kind">WhatsApp</span>
          <span className="contact__value">{site.phones.primary.display}</span>
          <span className="contact__go">Yazın <Arrow /></span>
        </a>
        <a className="contact__card" href={site.phones.primary.tel}>
          <PhoneIcon className="contact__icon" />
          <span className="contact__kind">Telefon</span>
          <span className="contact__value">{site.phones.primary.display}</span>
          <span className="contact__go">Arayın <Arrow /></span>
        </a>
        <a className="contact__card" href={site.phones.secondary.tel}>
          <PhoneIcon className="contact__icon" />
          <span className="contact__kind">Alternatif hat</span>
          <span className="contact__value">{site.phones.secondary.display}</span>
          <span className="contact__go">Arayın <Arrow /></span>
        </a>
        <a className="contact__card" href={site.instagram.url} target="_blank" rel="noopener">
          <span className="contact__icon contact__icon--ig" aria-hidden="true" />
          <span className="contact__kind">Instagram</span>
          <span className="contact__value">{site.instagram.handle}</span>
          <span className="contact__go">Takip edin <Arrow /></span>
        </a>
      </section>

      <Band title="Mesajınızı hazırlayın" tone="stone">
        <Composer />
      </Band>

      <Band title="Hizmet bölgemiz" aside={<div className="band__map"><AreaMap compact /></div>}>
        <p className="prose">{coverageSentence}</p>
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
    </>
  );
}
