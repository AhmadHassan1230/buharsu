import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { Hero } from '@/components/home/Hero';
import { Services } from '@/components/home/Services';
import { Statement } from '@/components/home/Statement';
import { Areas } from '@/components/home/Areas';
import { Craft, FinalCta, Process, Transformation, Trust, Work } from '@/components/home/Sections';

export const metadata: Metadata = pageMeta({
  title: 'BUHARSU | Koltuk ve halı yıkama, İstanbul Anadolu Yakası',
  description: 'Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamında; Kurtköy, Kavakpınar, Aydınlı ve Orhanlı’da koltuk, halı, yatak ve perde temizliği. WhatsApp: 0505 188 80 63.',
  path: '/', absolute: true,
});

export default function Home() {
  return (
    <>
      <div className="stage">
        <Hero />
        <Services />
      </div>
      <Statement />
      <Transformation />
      <Process />
      <Craft />
      <Work />
      <Areas />
      <Trust />
      <FinalCta />
    </>
  );
}
