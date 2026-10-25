import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import Image from 'next/image';
import { home, media, site, wa } from '@/data/site';
import { Band, PageHero } from '@/components/page/Parts';
import { Btn } from '@/components/ui';
import { FinalCta } from '@/components/home/Sections';

export const metadata: Metadata = pageMeta({
  title: 'Hakkımızda: Anadolu Yakası’nda koltuk ve halı bakımı',
  description: 'BUHARSU, İstanbul Anadolu Yakası’nda koltuk, halı ve ev tekstili temizliği yapar. Sancaktepe, Sultanbeyli, Çekmeköy, Kurtköy, Kavakpınar, Aydınlı ve Orhanlı’da.',
  path: '/hakkimizda',
});

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Hakkımızda', href: '/hakkimizda' }]}
        title={<>Anadolu Yakası’nın<br />koltuk ve halı bakımı.</>}
        lead="BUHARSU, İstanbul Anadolu Yakası’nda koltuk, halı ve ev tekstili temizliği yapan bir ekip. Az sayıda bölgeye odaklanıyor, her işi aynı özenle yapıyoruz."
        media={media.about}
      />

      <section className="story" aria-label="Hikâyemiz">
        <div className="story__chapter">
          <p className="story__label">Adımız</p>
          <h2 className="story__title" data-split="lines">Adımız, işimizin iki aracından geliyor: buhar ve su.</h2>
          <p className="story__text" data-reveal="fade">
            Koltuk, yatak, halı ve perde temizliğinde her eşyaya aynı soruyla başlıyoruz: bu kumaş neye ihtiyaç duyuyor? Buhar mı, yıkama mı, ikisi birden mi; kararı eşyayı görünce veriyoruz.
          </p>
        </div>
        <figure className="story__media" data-lanes>
          <Image src={media.storefront.src} alt={media.storefront.alt} width={media.storefront.w} height={media.storefront.h} sizes="(max-width: 767px) 100vw, 58vw" quality={80} />
          <figcaption>Konsept görsel: BUHARSU mağaza cephesi tasarımı. Fotoğraf değildir.</figcaption>
        </figure>
        <div className="story__chapter story__chapter--b">
          <p className="story__label">Hizmet bölgemiz</p>
          <h2 className="story__title" data-split="lines">Anadolu Yakası’nda, size yakın.</h2>
          <p className="story__text" data-reveal="fade">
            Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamında; Pendik’te Kurtköy ve Kavakpınar, Tuzla’da Aydınlı ve Orhanlı’da hizmet veriyoruz.
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
