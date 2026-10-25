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
        <h2>İsteğe bağlı reklam ölçümü</h2>
        <p>
          Onay verirseniz Google Ads, WhatsApp veya telefon iletişim düğmelerine tıklanmasını iletişim niyeti olarak ölçebilir.
          Bu ölçüm, mesaj metnini, telefon numarasını, adresi veya bağlantının sorgu bilgilerini Google’a göndermez. İlk
          tercihinizde onay vermezseniz Google ölçüm etiketi yüklenmez. Onayı sonradan geri çekerseniz yeni iletişim
          tıklamalarını ölçmeyiz; daha önce gönderilmiş ölçümler silinmez. Tercihinizi sitedeki “Çerez tercihleri” düğmesinden
          değiştirebilirsiniz.
        </p>
        <h2>WhatsApp ve telefon görüşmeleri</h2>
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
