'use client';
import { useEffect, useRef } from 'react';
import { getImageProps } from 'next/image';
import { media } from '@/data/site';

// The film slot. Until the Google Flow renders are dropped into /public/videos and their paths
// set in site.ts, the poster carries the hero and no video request is made.
// The source is chosen by viewport (portrait cut for phones) and attached after first paint, so
// the poster stays the LCP element. Reduced motion: no autoplay, the poster stays.
export function HeroFilm() {
  const { video, poster, posterMobile } = media.hero;
  const ref = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(video.desktop || video.mobile);

  useEffect(() => {
    const v = ref.current;
    if (!v || !hasVideo) return;
    const phone = matchMedia('(max-width: 767px)').matches;
    const src = (phone ? video.mobile : video.desktop) ?? video.desktop ?? video.mobile!;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    v.src = src;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onPlay = () => v.classList.add('is-on');
    v.addEventListener('playing', onPlay);
    if (!reduced) v.play().catch(() => {});
    // Pause when the hero is fully covered (saves battery and decode on phones).
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!reduced) v.play().catch(() => {});
    });
    io.observe(v);
    return () => { io.disconnect(); v.removeEventListener('playing', onPlay); };
  }, [hasVideo, video.desktop, video.mobile]);

  const common = { alt: poster.alt, sizes: '100vw', quality: 80 } as const;
  const { props: { srcSet: desk } } = getImageProps({ ...common, src: poster.src, width: poster.w, height: poster.h });
  const { props: { srcSet: mob } } = getImageProps({ ...common, src: posterMobile.src, width: posterMobile.w, height: posterMobile.h });
  const { props: img } = getImageProps({ ...common, src: poster.src, width: poster.w, height: poster.h, priority: true });

  return (
    <div className="hero__film">
      <div className="hero__media" data-hero-media>
        <picture>
          <source media="(max-width: 767px)" srcSet={mob} />
          <source media="(min-width: 768px)" srcSet={desk} />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...img} className="hero__poster" fetchPriority="high" loading="eager" />
        </picture>
        {hasVideo && (
          <video ref={ref} className="hero__video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        )}
      </div>
      <div className="hero__scrim" aria-hidden="true" />
    </div>
  );
}
