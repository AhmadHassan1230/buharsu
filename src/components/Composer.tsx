'use client';
import { useId, useMemo, useState } from 'react';
import { placeOptions, services, wa } from '@/data/site';
import { Arrow, WaIcon } from './ui';

// Quote composer: builds a formatted WhatsApp message. Nothing is stored or sent by the site;
// the customer's own WhatsApp opens with the text, ready to edit.
export function Composer({ service, place, compact }: { service?: string; place?: string; compact?: boolean }) {
  const id = useId();
  const [svc, setSvc] = useState(service ?? '');
  const [plc, setPlc] = useState(place ?? '');
  const [hood, setHood] = useState('');
  const [note, setNote] = useState('');

  const message = useMemo(() => {
    const lines = ['Merhaba BUHARSU, fiyat ve randevu bilgisi almak istiyorum.'];
    if (svc) lines.push(`Hizmet: ${svc}`);
    if (plc || hood) lines.push(`Bölge: ${[plc, hood].filter(Boolean).join(', ')}`);
    if (note.trim()) lines.push(`Not: ${note.trim()}`);
    return lines.join('\n');
  }, [svc, plc, hood, note]);

  return (
    <form className={`composer ${compact ? 'composer--compact' : ''}`} data-contact-channel="whatsapp" onSubmit={(e) => { e.preventDefault(); window.open(wa(message), '_blank', 'noopener'); }}>
      <div className="composer__row">
        <label className="field">
          <span className="field__label">Hizmet türü</span>
          <select value={svc} onChange={(e) => setSvc(e.target.value)} id={`${id}-svc`}>
            <option value="">Seçin (isteğe bağlı)</option>
            {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
            <option value="Birden fazla hizmet">Birden fazla hizmet</option>
          </select>
        </label>
        <label className="field">
          <span className="field__label">İlçe</span>
          <select value={plc} onChange={(e) => setPlc(e.target.value)} id={`${id}-plc`}>
            <option value="">Seçin (isteğe bağlı)</option>
            {placeOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
      </div>
      {!compact && (
        <label className="field">
          <span className="field__label">Mahalle veya site adı</span>
          <input type="text" value={hood} onChange={(e) => setHood(e.target.value)} autoComplete="off" placeholder="Örneğin: Sarıgazi" />
        </label>
      )}
      <label className="field">
        <span className="field__label">Kısa açıklama</span>
        <textarea rows={compact ? 2 : 3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Örneğin: 3+3+1 koltuk takımı, açık renk kumaş" />
      </label>
      <div className="composer__foot">
        <button className="btn btn--ink composer__send" type="submit" data-fill>
          <span className="btn__fill" aria-hidden="true" />
          <WaIcon className="btn__icon" />
          <span className="btn__label">Mesajı WhatsApp’ta aç</span>
          <Arrow className="btn__arrow" />
        </button>
        <p className="composer__note">
          Mesaj WhatsApp uygulamanızda açılır; göndermeden önce düzenleyebilirsiniz. Bu form hiçbir bilgiyi kaydetmez.
        </p>
      </div>
    </form>
  );
}
