'use client';
import { useState } from 'react';
import { areaMessage, areas, coverageSentence, home, wa, type Area } from '@/data/site';
import { AreaMap } from '../AreaMap';
import { Btn, TextLink } from '../ui';


export function Areas({ headingLevel = 2, title = home.areas.title, lead = coverageSentence }: { headingLevel?: 2 | 3; title?: string; lead?: string }) {
  const [sel, setSel] = useState<Area['id']>('sancaktepe');
  const a = areas.find((x) => x.id === sel)!;
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section className="areas" aria-labelledby="areas-title">
      <div className="areas__copy">
        <H id="areas-title" className="areas__title">{title}</H>
        <p className="areas__lead">{lead}</p>

        <div className="areas__picker" role="group" aria-label="Bölge seçin">
          {areas.map((x) => (
            <button
              key={x.id}
              type="button"
              className="areas__opt"
              aria-pressed={x.id === sel}
              onClick={() => setSel(x.id)}
            >
              <span className="areas__opt-name">{x.district}</span>
              <span className="areas__opt-cov">{x.coverage}</span>
            </button>
          ))}
        </div>

        <div className="areas__detail" aria-live="polite">
          <p className="areas__detail-title">
            {a.scope === 'full' ? `${a.district}: tüm mahalleler` : `${a.district}: yalnızca ${a.parts.join(' ve ')}`}
          </p>
          {a.scope === 'full' ? (
            <p className="areas__hoods">{a.parts.join(', ')}</p>
          ) : (
            <p className="areas__hoods">{a.genitive} diğer mahallelerinde şu an hizmet vermiyoruz.</p>
          )}
          <div className="areas__actions">
            <Btn href={wa(areaMessage(a))} icon="wa">{home.areas.cta}</Btn>
            <TextLink href={`/bolgeler/${a.page}`}>{a.district} sayfası</TextLink>
          </div>
        </div>
      </div>
      <div className="areas__map">
        <AreaMap selected={sel} onSelect={setSel} />
        <p className="areas__credit">Harita verisi © OpenStreetMap katkıcıları</p>
      </div>
    </section>
  );
}
