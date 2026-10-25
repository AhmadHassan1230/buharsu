import Image from 'next/image';
import { home, services } from '@/data/site';
import { Arrow, TextLink } from '../ui';

export function Services() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);
  return (
    <section className="services" id="hizmetler" aria-labelledby="services-title" data-lanes-edge>
      <div className="services__head">
        <h2 id="services-title" className="services__title" data-split="lines">{home.services.title}</h2>
        <p className="services__lead" data-reveal="fade" data-delay="0.15">{home.services.lead}</p>
      </div>

      <ul className="services__features" role="list">
        {featured.map((s, i) => (
          <li key={s.slug} className={`feature feature--${i ? 'b' : 'a'}`}>
            <a className="feature__link" href={`/hizmetler/${s.slug}`}>
              <figure className="feature__media" data-lanes>
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  width={s.image.w}
                  height={s.image.h}
                  sizes="(max-width: 767px) 92vw, (max-width: 1199px) 50vw, 46vw"
                  quality={80}
                />
              </figure>
              <div className="feature__body">
                <h3 className="feature__name">{s.name}</h3>
                <p className="feature__text">{s.short}</p>
                <span className="feature__go">
                  <span>Hizmeti incele</span>
                  <Arrow />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="services__index">
        <h3 className="services__more">{home.services.more}</h3>
        <ul className="srows" role="list">
          {rest.map((s) => (
            <li key={s.slug}>
              <a className="srow" href={`/hizmetler/${s.slug}`}>
                <span className="srow__swatch" aria-hidden="true">
                  <Image src={s.image.src} alt="" width={s.image.w} height={s.image.h} sizes="(max-width: 767px) 64px, 160px" quality={70} />
                </span>
                <span className="srow__name">{s.name}</span>
                <span className="srow__text">{s.short}</span>
                <Arrow className="srow__arrow" />
              </a>
            </li>
          ))}
        </ul>
        <TextLink href="/hizmetler" className="services__all">Tüm hizmetler ve detaylar</TextLink>
      </div>
    </section>
  );
}
