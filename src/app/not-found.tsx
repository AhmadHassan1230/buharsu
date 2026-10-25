import { services } from '@/data/site';
import { Btn } from '@/components/ui';

// 404 in the concept's voice: a lane that was never passed.
export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="nf__lanes" aria-hidden="true"><i /><i /><i /></div>
      <p className="nf__code">404</p>
      <h1 id="nf-title" className="nf__title">Bu köşeye henüz uğramadık.</h1>
      <p className="nf__text">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Buradan devam edebilirsiniz:</p>
      <div className="nf__actions">
        <Btn href="/">Anasayfaya dön</Btn>
      </div>
      <ul className="nf__links" role="list">
        {services.slice(0, 4).map((s) => <li key={s.slug}><a href={`/hizmetler/${s.slug}`}>{s.name}</a></li>)}
        <li><a href="/hizmet-bolgeleri">Hizmet bölgeleri</a></li>
        <li><a href="/iletisim">İletişim</a></li>
      </ul>
    </section>
  );
}
