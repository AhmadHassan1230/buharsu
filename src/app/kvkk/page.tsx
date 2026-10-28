import type { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { site } from '@/data/site';
import { PageHero } from '@/components/page/Parts';

export const metadata: Metadata = pageMeta({
  title: 'KVKK ve gizlilik',
  description: 'BUHARSU web sitesinde kişisel verilerin nasıl ele alındığına, WhatsApp ve telefon görüşmelerinde paylaşılan bilgilerin nasıl kullanıldığına dair bilgilendirme.',
  path: '/kvkk', noindex: true,
});

// Honest interim notice. The full KVKK aydınlatma metni needs the confirmed legal entity
// (unvan, adres, MERSİS / vergi no) and is listed as a launch blocker in LAUNCH.md.
export default function Kvkk() {
  return (
    <>
      <PageHero crumbs={[{ name: 'KVKK ve gizlilik', href: '/kvkk' }]} title="KVKK ve gizlilik" />
      <section className="legal">
        <h2>Bu site hangi bilgileri topluyor?</h2>
        <p>
          Bu web sitesinde form verisi saklanmaz. “Mesajı WhatsApp’ta aç” düğmesi, yazdığınız metni yalnızca kendi
          WhatsApp uygulamanızda açar; mesajı gönderip göndermemek size kalmıştır.
        </p>
        <h2>Reklamlar ve çerezler</h2>
        <p>
          Bu sitede Google AdSense reklamları gösterilebilir. Google ve iş ortakları, size ilgili reklamlar sunmak
          için çerezler kullanarak bu siteye ve diğer sitelere yaptığınız ziyaretlere dair bilgileri işleyebilir.
          Kişiselleştirilmiş reklamları{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Reklam Ayarları</a>
          {' '}üzerinden kapatabilir, Google’ın bu verileri nasıl kullandığını{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">buradan</a>
          {' '}inceleyebilirsiniz.
        </p>
        <h2>WhatsApp ve telefon görüşmeleri</h2>
        <p>
          Google Ads reklamlarının performansını değerlendirmek için telefon ve WhatsApp bağlantılarına yapılan
          tıklamalar ölçülebilir. Bir tıklama, görüşmenin yapıldığı veya randevunun tamamlandığı anlamına gelmez.
          WhatsApp mesaj alanına yazdığınız metin bu ölçüm kapsamında Google’a gönderilmez.
        </p>
        <p>
          Bize WhatsApp’tan yazdığınızda ya da {site.phones.primary.display} numarasını aradığınızda paylaştığınız bilgiler
          (ad, telefon, adres, eşya fotoğrafları) yalnızca talebinizi yanıtlamak ve hizmeti planlamak için kullanılır.
        </p>
        <h2>Veri sorumlusu</h2>
        <p>
          Veri sorumlusunun unvanı ve iletişim bilgileri ile ayrıntılı aydınlatma metni yakında bu sayfada yayımlanacaktır.
          Sorularınız için {site.phones.primary.display} numarasından bize ulaşabilirsiniz.
        </p>
      </section>
    </>
  );
}
