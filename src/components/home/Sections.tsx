import Image from 'next/image';
import { gallery, home, media, reviews, site, wa } from '@/data/site';
import { Compare } from '../Compare';
import { Btn, TextLink } from '../ui';

export function Transformation() {
  const c = home.compare;
  return (
    <section className="transform" aria-labelledby="transform-title" data-tone="dark">
      <div className="transform__head">
        <h2 id="transform-title" className="transform__title" data-split="lines">
          {c.title[0]}<br />{c.title[1]}
        </h2>
        <p className="transform__text" data-reveal="fade">{c.text}</p>
      </div>
      <div data-reveal="up">
        <Compare
          before={media.compare.before}
          after={media.compare.after}
          labels={{ before: c.before, after: c.after }}
        />
      </div>
    </section>
  );
}

export function Process() {
  const p = home.process;
  return (
    <section className="process" aria-labelledby="process-title">
      <h2 id="process-title" className="process__title" data-split="lines">{p.title}</h2>
      <div className="process__track" data-process>
      <span className="process__rail" aria-hidden="true"><span className="process__rail-fill" data-rail /></span>
      <ol className="process__list">
        {p.steps.map((s, i) => (
          <li key={s.title} className="process__step" data-reveal="up" data-delay={String(i * 0.08)}>
            <span className="process__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="process__name">{s.title}</h3>
            <p className="process__text">{s.text}</p>
          </li>
        ))}
      </ol>
      </div>
      <div className="process__cta">
        <Btn href={wa()} icon="wa">İlk adımı atın</Btn>
      </div>
    </section>
  );
}

export function Craft() {
  const c = home.craft;
  return (
    <section className="craft" aria-labelledby="craft-title" data-tone="dark">
      <div className="craft__bg" aria-hidden="true">
        <Image src={media.craft.src} alt="" fill sizes="100vw" quality={70} data-parallax-img />
      </div>
      <div className="craft__inner">
        <h2 id="craft-title" className="craft__title" data-split="lines">
          {c.title[0]}<br />{c.title[1]}
        </h2>
        <ul className="craft__list" role="list">
          {c.points.map((pt, i) => (
            <li key={pt.title} data-reveal="up" data-delay={String((i % 3) * 0.08)}>
              <h3>{pt.title}</h3>
              <p>{pt.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Work({ head = true }: { head?: boolean }) {
  const w = home.work;
  return (
    <section className={`work ${head ? '' : 'work--bare'}`} aria-labelledby={head ? 'work-title' : undefined} aria-label={head ? undefined : 'Çalışma fotoğrafları'}>
      {head && <div className="work__head">
        <h2 id="work-title" className="work__title" data-split="lines">{w.title}</h2>
        <div className="work__side">
          <p data-reveal="fade">{w.text}</p>
          <TextLink href={site.instagram.url}>{w.cta}</TextLink>
        </div>
      </div>}
      <ul className="wall" role="list">
        {gallery.map((g, i) => (
          <li key={g.src} className={`wall__item wall__item--${i + 1}`}>
            <figure data-lanes>
              <div className="wall__frame">
                <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(max-width: 767px) 46vw, 30vw" quality={75} />
              </div>
              <figcaption>{g.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Trust() {
  const t = home.trust;
  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <div className="reviews__head">
        <h2 id="reviews-title" className="reviews__title" data-split="lines">{t.title}</h2>
        <p className="reviews__lead" data-reveal="fade">{t.lead}</p>
      </div>
      <ul className="reviews__list" role="list">
        {reviews.map((r, i) => (
          <li key={r.name} className="review" data-reveal="up" data-delay={String((i % 2) * 0.08)}>
            <figure>
              <p className="review__stars" aria-label={`${r.rating} üzerinden ${r.rating} yıldız`}>
                {Array.from({ length: r.rating }, (_, k) => (
                  <svg key={k} viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
                  </svg>
                ))}
              </p>
              <blockquote className="review__text">“{r.text}”</blockquote>
              <figcaption className="review__who">
                <span className="review__name">{r.name}</span>
                <span className="review__place">{r.place}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="reviews__hint" aria-hidden="true">Kaydırarak tüm yorumları görün <svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 12h16m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></p>
    </section>
  );
}

export function FinalCta() {
  const c = home.cta;
  return (
    <section className="fcta" aria-labelledby="fcta-title" data-tone="dark" data-hide-bar>
      <div className="fcta__bg" aria-hidden="true">
        <Image src={media.cta.src} alt="" fill sizes="100vw" quality={70} />
      </div>
      <div className="fcta__inner">
        <h2 id="fcta-title" className="fcta__title" data-split="lines">
          {c.title[0]}<br />{c.title[1]}
        </h2>
        <p className="fcta__text" data-reveal="fade">{c.text}</p>
        <div className="fcta__actions" data-reveal="up" data-delay="0.1">
          <Btn href={wa()} tone="light" icon="wa">{c.primary}</Btn>
          <Btn href={site.phones.primary.tel} tone="night" icon="phone">{c.secondary}</Btn>
        </div>
        <p className="fcta__phones">
          <a href={site.phones.primary.tel}>{site.phones.primary.display}</a>
          <span aria-hidden="true">/</span>
          <a href={site.phones.secondary.tel}>{site.phones.secondary.display}</a>
        </p>
      </div>
    </section>
  );
}
