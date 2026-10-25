import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import Image from 'next/image';
import { services, wa } from '@/data/site';
import { PageHero } from '@/components/page/Parts';
import { Btn, Arrow } from '@/components/ui';
import { Areas } from '@/components/home/Areas';
import { FinalCta } from '@/components/home/Sections';

export const metadata: Metadata = pageMeta({
  title: 'Hizmetlerimiz: koltuk, halı, yatak ve perde temizliği',
  description: 'Koltuk yıkama, buharlı koltuk temizliği, halı yıkama, yatak, sandalye, perde, battaniye, yorgan yıkama ve overlok tamiri. İstanbul Anadolu Yakası’nda BUHARSU.',
  path: '/hizmetler',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Hizmetler', href: '/hizmetler' }]}
        title={<>Her kumaşa<br />hak ettiği özen.</>}
        lead="Koltuktan halıya, yataktan perdeye. Her eşyayı kumaşına ve kullanımına göre ayrı değerlendiriyor, yöntemi ona göre seçiyoruz."
        aside={
          <nav className="paside paside--desk" aria-label="Hizmet listesi">
            <p className="paside__label">{services.length} hizmet</p>
            <ul className="paside__links">
              {services.map((s) => <li key={s.slug}><a href={`/hizmetler/${s.slug}`}>{s.name}<Arrow /></a></li>)}
            </ul>
          </nav>
        }
      >
        <Btn href={wa()} icon="wa">WhatsApp’tan teklif al</Btn>
      </PageHero>

      <section className="sgrid" aria-label="Tüm hizmetler">
        <ul role="list">
          {services.map((s, i) => (
            <li key={s.slug} className={`scard ${i < 2 ? 'scard--lg' : ''}`}>
              <a href={`/hizmetler/${s.slug}`} className="scard__link">
                <figure className="scard__media" data-lanes>
                  <Image src={s.image.src} alt={s.image.alt} width={s.image.w} height={s.image.h} sizes={i < 2 ? '(max-width: 767px) 92vw, 46vw' : '(max-width: 767px) 92vw, 30vw'} quality={75} />
                  <span className="scard__badge" aria-hidden="true"><Arrow /></span>
                </figure>
                <h2 className="scard__name">{s.name}</h2>
                <p className="scard__text">{s.short}</p>
                <span className="scard__go"><span>Detayları gör</span> <Arrow /></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Areas />
      <FinalCta />
    </>
  );
}
