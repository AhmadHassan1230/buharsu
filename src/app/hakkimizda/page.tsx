import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import Image from 'next/image';
import { home, media, site, wa } from '@/data/site';
import { Band, PageHero } from '@/components/page/Parts';
import { Btn } from '@/components/ui';
import { FinalCta } from '@/components/home/Sections';

export const metadata: Metadata = pageMeta({
  title: 'Hakkımızda: Şanlıurfa’dan İstanbul’a',
  description: 'BUHARSU, Şanlıurfa’da koltuk ve halı temizliğiyle başlayan bir işletme. Şimdi İstanbul Anadolu Yakası’nda aynı özenle hizmet veriyor.',
  path: '/hakkimizda',
});

export default function About() {
  const since = site.facts.urfaSince.confirmed ? ` ${site.facts.urfaSince.value} yılından bu yana` : '';
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Hakkımızda', href: '/hakkimizda' }]}
        title={<>Şanlıurfa’dan<br />İstanbul’a.</>}
        lead="BUHARSU, Şanlıurfa’da koltuk ve halı temizliğiyle başlayan bir işletme. Aynı işi şimdi İstanbul Anadolu Yakası’nda yapıyoruz."
        media={media.about}
      />

      <section className="story" aria-label="Hikâyemiz">
        <div className="story__chapter">
          <p className="story__label">Şanlıurfa</p>
          <h2 className="story__title" data-split="lines">Adımız, işimizin iki aracından geliyor: buhar ve su.</h2>
          <p className="story__text" data-reveal="fade">
            BUHARSU,{since} Şanlıurfa’da koltuk, yatak, halı ve şark köşesi temizliği yapıyor. Her eşyada aynı soruyla başlıyoruz: bu kumaş neye ihtiyaç duyuyor?
          </p>
        </div>
        <figure className="story__media" data-lanes>
          <Image src={media.storefront.src} alt={media.storefront.alt} width={media.storefront.w} height={media.storefront.h} sizes="(max-width: 767px) 100vw, 58vw" quality={80} />
          <figcaption>Konsept görsel: BUHARSU mağaza cephesi tasarımı. Fotoğraf değildir.</figcaption>
        </figure>
        <div className="story__chapter story__chapter--b">
          <p className="story__label">İstanbul</p>
          <h2 className="story__title" data-split="lines">Aynı özen, yeni bir şehirde.</h2>
          <p className="story__text" data-reveal="fade">
            İstanbul’da Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamında; Pendik’te Kurtköy ve Kavakpınar, Tuzla’da Aydınlı ve Orhanlı’da hizmet veriyoruz.
          </p>
        </div>
      </section>

      <Band title={<>{home.craft.title[0]}<br />{home.craft.title[1]}</>} tone="dark">
        <ul className="craft__list craft__list--band" role="list">
          {home.craft.points.map((pt) => (
            <li key={pt.title}>
              <h3>{pt.title}</h3>
              <p>{pt.text}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band title="Bizimle çalışmak">
        <p className="prose">
          Fiyat ve randevu için en hızlı yol WhatsApp. Eşyanızın bir fotoğrafını, ölçüsünü ve mahallenizi yazmanız yeterli. Telefonla da arayabilirsiniz: {site.phones.primary.display}.
        </p>
        <div className="band__actions">
          <Btn href={wa()} icon="wa">WhatsApp’tan yazın</Btn>
        </div>
      </Band>

      <FinalCta />
    </>
  );
}
