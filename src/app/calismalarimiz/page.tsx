import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { home, site } from '@/data/site';
import { PageHero } from '@/components/page/Parts';
import { FinalCta, Transformation, Work } from '@/components/home/Sections';

export const metadata: Metadata = pageMeta({
  title: 'Çalışmalarımız: koltuk ve halı yıkama öncesi, sonrası',
  description: 'BUHARSU’nun koltuk, halı ve ev tekstili temizliği çalışmalarından seçkiler. Güncel öncesi ve sonrası paylaşımlarımız Instagram’da.',
  path: '/calismalarimiz',
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Çalışmalarımız', href: '/calismalarimiz' }]}
        title={home.work.title}
        lead="Gerçek çalışmalarımızı, öncesi ve sonrası karşılaştırmalarıyla burada ve Instagram hesabımızda paylaşıyoruz. Her fotoğrafın nerede çekildiğini açıkça belirtiyoruz."
        aside={
          <div className="paside">
            <p className="paside__label">Instagram</p>
            <a className="paside__big" href={site.instagram.url} target="_blank" rel="noopener">{site.instagram.handle}</a>
            <p className="paside__note">Yeni işler ve öncesi, sonrası videoları</p>
          </div>
        }
      />
      <Work head={false} />
      <Transformation />
      <FinalCta />
    </>
  );
}
