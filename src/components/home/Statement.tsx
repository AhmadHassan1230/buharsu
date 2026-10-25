import Image from 'next/image';
import { home, media } from '@/data/site';
import { TextLink } from '../ui';

export function Statement() {
  const s = home.statement;
  return (
    <section className="statement" aria-labelledby="statement-title">
      <h2 id="statement-title" className="statement__title" data-split="lines">
        {s.title[0]}<br />{s.title[1]}
      </h2>
      <figure className="statement__media" data-lanes>
        <div className="statement__frame">
          <Image src={media.statement.src} alt={media.statement.alt} width={media.statement.w} height={media.statement.h} sizes="(max-width: 767px) 70vw, 28vw" quality={80} data-parallax-img />
        </div>
      </figure>
      <div className="statement__text">
        <p data-reveal="fade">{s.text}</p>
        <TextLink href="/hakkimizda">{s.link}</TextLink>
      </div>
    </section>
  );
}
