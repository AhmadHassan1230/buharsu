// BUHARSU İstanbul: every business fact and every visible string lives here.
//
// Rules for editing:
// - Phones, WhatsApp, Instagram and the coverage list are client-confirmed. Change them here only.
// - Anything with `confirmed: false` is NOT rendered on the site until the owner confirms it.
// - `placeholder: true` media are AI photography / Flow footage, not photos of BUHARSU jobs.
//   Nothing is labelled on the page; MEDIA.md / LAUNCH.md list what to replace with real work.
//
// Assumptions / open items (mirrored in LAUNCH.md):
// - Domain: `site.url` is a placeholder until the Istanbul domain is chosen.
// - The Istanbul process (on-site vs. pickup, curtain removal, overlock colours) is not confirmed,
//   so the copy describes it neutrally ("birlikte planlıyoruz").
// - Neighbourhood (mahalle) lists are taken from official district lists and should be checked.

export const site = {
  name: 'BUHARSU',
  legalName: 'BUHARSU Halı ve Koltuk Yıkama', // CONFIRM: official trade name for KVKK / footer
  url: 'https://buharsuyikama.com',
  locale: 'tr_TR',
  tagline: 'Koltuk, halı ve ev tekstili temizliği',
  description:
    'BUHARSU, İstanbul Anadolu Yakası’nda Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamında; Kurtköy, Kavakpınar, Aydınlı ve Orhanlı’da koltuk ve halı yıkama hizmeti verir.',
  phones: {
    primary: { display: '0505 188 80 63', intl: '+90 505 188 80 63', tel: 'tel:+905051888063' },
    secondary: { display: '0543 962 45 49', intl: '+90 543 962 45 49', tel: 'tel:+905439624549' },
  },
  whatsapp: {
    number: '905051888063', // primary line only; the secondary is not confirmed as WhatsApp
    defaultMessage: 'Merhaba BUHARSU, İstanbul’da temizlik hizmeti için fiyat ve randevu bilgisi almak istiyorum.',
  },
  instagram: {
    handle: '@buharsu_hali_koltuk_04',
    url: 'https://www.instagram.com/buharsu_hali_koltuk_04/',
  },
  // Google AdSense publisher ID (from the AdSense site page). Loads adsbygoogle.js on every page.
  adsense: 'ca-pub-5284223273537745',
  // Search engine verification codes (meta tag content values). Empty = not rendered.
  verification: { google: '', yandex: '' },
  facts: {
    istanbulAddress: { value: '', confirmed: false },
    hours: { value: '', confirmed: false },
  },
} as const;

/** WhatsApp deep link with a correctly encoded message. */
export const wa = (message: string = site.whatsapp.defaultMessage) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

// ---------------------------------------------------------------------------------------------
// Media

export type Media = { src: string; alt: string; w: number; h: number; placeholder?: boolean };
// AI-generated mood photography (ChatGPT) and Google Flow footage. Not photos of BUHARSU jobs:
// `placeholder: true` keeps them on the replace-before-launch list (LAUNCH.md); nothing shows on the page.
const photo = (name: string, alt: string, w: number, h: number): Media => ({
  src: `/images/photos/${name}.jpg`, alt, w, h, placeholder: true,
});

export const media = {
  hero: {
    // Google Flow reels (see MEDIA.md). Desktop 16:9 1920x1080, phone 9:16 720x1280; both loop seamlessly.
    video: { desktop: '/videos/hero-desktop.mp4' as string | null, mobile: '/videos/hero-mobile.mp4' as string | null },
    // Posters are the first frame of each reel, so the poster dissolves into the film without a jump.
    poster: { src: '/images/hero/poster-desktop.jpg', alt: 'Sabah ışığında bej bukle kanepeli modern bir oturma odası', w: 1920, h: 1080, placeholder: true } as Media,
    posterMobile: { src: '/images/hero/poster-mobile.jpg', alt: 'Sabah ışığında bej kanepeli modern bir oturma odası', w: 720, h: 1280, placeholder: true } as Media,
  },
  about: photo('hero-desktop', 'İstanbul manzaralı, bej bukle kanepeli aydınlık bir oturma odası', 1672, 941),
  statement: photo('statement', 'Yakın plan, açık renk keten döşemelik kumaşın dokusu', 1122, 1402),
  craft: photo('craft', 'Yandan gelen ışıkta koyu lacivert dokuma kumaş', 1672, 941),
  cta: photo('cta', 'Akşam lamba ışığında sakin bir oturma odası', 1672, 941),
  storefront: {
    src: '/images/brand/storefront-concept.jpg',
    alt: 'BUHARSU mağaza cephesi için hazırlanmış konsept görsel',
    w: 1408, h: 768, placeholder: false,
  } as Media,
  compare: {
    before: photo('compare-before', 'Uygulama öncesi: lekeli ve donuk görünen açık bej kanepe', 1586, 992),
    after: photo('compare-after', 'Uygulama sonrası: temiz ve canlı görünen açık bej kanepe', 1586, 992),
  },
};

// ---------------------------------------------------------------------------------------------
// Services

export type Faq = { q: string; a: string };
export type Service = {
  slug: string;
  name: string;
  short: string; // one line, used on cards and lists
  lead: string; // page intro, 2–3 sentences
  includes: string[];
  process: string[];
  expect: string; // honest expectation note
  faqs: Faq[];
  image: Media;
  featured?: boolean;
  wa: string; // WhatsApp message for this service
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: 'koltuk-yikama',
    name: 'Koltuk yıkama',
    short: 'Kanepe, berjer ve köşe takımları için kumaşa uygun derin temizlik.',
    lead: 'Koltuk, evin en çok kullanılan eşyasıdır. Toz, ter ve günlük lekeler zamanla kumaşın derinine işler. Kumaşı inceleyip ona uygun yöntemi seçiyor, yüzeyle birlikte dolgu çevresine biriken kiri de hedefliyoruz.',
    includes: ['Üçlü, ikili ve tekli koltuklar', 'Köşe takımları ve L koltuklar', 'Berjerler', 'Minder ve kırlentler', 'Sedir ve oturma minderleri'],
    process: ['Kumaş ve etiket kontrolü', 'Toz alma ve ön hazırlık', 'Lekelere uygun ön işlem', 'Yıkama ve su çekimi', 'Son kontrol ve kuruma önerileri'],
    expect: 'Uzun süre beklemiş bazı lekeler kumaşın rengini kalıcı olarak değiştirmiş olabilir. Böyle bir durumu uygulamadan önce değerlendirip sizinle paylaşırız.',
    faqs: [
      { q: 'Koltuk yıkama ne kadar sürer?', a: 'Süre; koltuğun ölçüsüne, kumaşına ve kirlilik durumuna göre değişir. Net bilgi için koltuğunuzun fotoğrafını WhatsApp’tan göndermeniz yeterli.' },
      { q: 'Koltuklar ne zaman kurur?', a: 'Kuruma süresi kumaş türüne, dolguya ve odanın havalanmasına bağlıdır. Uygulama sonunda kullanım için önerilerimizi iletiriz.' },
      { q: 'Her kumaş yıkanabilir mi?', a: 'Döşemelik kumaşların çoğu yıkanabilir. Deri, ipek ve bazı hassas kumaşlar ise farklı bir bakım ister. Kumaşınızı birlikte değerlendiririz.' },
      { q: 'Fiyat nasıl belirleniyor?', a: 'Fiyat; koltuk sayısına, ölçüsüne ve kumaşına göre belirlenir. Fotoğraf ve konum bilgisiyle WhatsApp üzerinden fiyat alabilirsiniz.' },
    ],
    image: photo('koltuk', 'Aydınlık bir oturma odasında açık bej keten kanepe', 1122, 1402),
    featured: true,
    wa: 'Merhaba BUHARSU, koltuk yıkama hizmeti için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Koltuk yıkama | Sancaktepe, Sultanbeyli, Çekmeköy',
      description: 'Kanepe, köşe takımı ve berjerler için kumaşa uygun koltuk yıkama. Sancaktepe, Sultanbeyli, Çekmeköy, Kurtköy, Kavakpınar, Aydınlı ve Orhanlı’da.',
    },
  },
  {
    slug: 'hali-yikama',
    name: 'Halı yıkama',
    short: 'Makine, el dokuma ve yolluk halılar için dokusuna uygun yıkama.',
    lead: 'Bir halının ipliği, dokuma şekli ve boyası nasıl yıkanacağını belirler. Makine halısıyla el dokuma bir halıyı aynı şekilde ele almıyoruz; her halıyı kendi yapısına göre değerlendiriyoruz.',
    includes: ['Makine halıları', 'El dokuma halılar ve kilimler', 'Yolluk ve paspaslar', 'Shaggy ve uzun tüylü halılar', 'Çocuk odası halıları'],
    process: ['Halı türü, ölçü ve iplik kontrolü', 'Toz alma', 'Lekelere uygun ön işlem', 'Dokuya uygun yıkama', 'Durulama, kurutma ve son kontrol'],
    expect: 'El dokuma ve eski halılarda boya ve iplik durumunu önceden kontrol ederiz. Yıpranmış kenarlar için overlok onarımını aynı anda planlayabilirsiniz.',
    faqs: [
      { q: 'Halılar evde mi yıkanıyor, alınıp mı götürülüyor?', a: 'İstanbul’daki uygulama şeklini halının türüne ve ölçüsüne göre birlikte planlıyoruz. Detaylar için WhatsApp’tan yazabilirsiniz.' },
      { q: 'El dokuma halılar yıkanabilir mi?', a: 'Evet, ama el dokuma halılar daha dikkatli bir süreç ister. Boya ve iplik durumunu kontrol ederek uygun yöntemi seçiyoruz.' },
      { q: 'Halı yıkama fiyatı neye göre belirlenir?', a: 'Halının metrekaresine, türüne ve kirlilik durumuna göre. Halınızın ölçüsünü ve bir fotoğrafını göndermeniz fiyatı netleştirir.' },
    ],
    image: photo('hali', 'Ahşap zemin üzerinde kök boya kırmızısı motifli el dokuma halı', 1122, 1402),
    featured: true,
    wa: 'Merhaba BUHARSU, halı yıkama hizmeti için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Halı yıkama | İstanbul Anadolu Yakası',
      description: 'Makine halısı, el dokuma halı, kilim ve yolluklar için dokusuna uygun halı yıkama. Sancaktepe, Sultanbeyli, Çekmeköy ve seçili Pendik, Tuzla mahallelerinde.',
    },
  },
  {
    slug: 'yatak-yikama',
    name: 'Yatak yıkama',
    short: 'Yatak yüzeyinde biriken toz, ter ve lekelere yönelik bakım.',
    lead: 'Yatak her gece kullanılır ama nadiren temizlenir. Yatağın yüzeyini ve kenar şeritlerini, kumaşına ve iç yapısına uygun yöntemle temizliyoruz.',
    includes: ['Tek ve çift kişilik yataklar', 'Bebek ve çocuk yatakları', 'Kumaş kaplı yatak başlıkları', 'Yatak pedleri'],
    process: ['Yüzey ve kumaş kontrolü', 'Toz alma', 'Lekelere uygun ön işlem', 'Yıkama ve su çekimi', 'Kuruma önerileri'],
    expect: 'Yatağın kullanılmadan önce tamamen kuruması gerekir. Süre yatağın yapısına ve odanın havalanmasına göre değişir.',
    faqs: [
      { q: 'Yatak yıkandıktan sonra hemen kullanılabilir mi?', a: 'Yatağın önce tamamen kuruması gerekir. Süre yatağın yapısına ve odanın havalanmasına göre değişir; uygulama sonunda önerilerimizi iletiriz.' },
      { q: 'Yataktaki sarı lekeler çıkar mı?', a: 'Lekenin türüne ve ne kadar süredir beklediğine bağlıdır. Bazı eski lekeler açılır ama tamamen kaybolmayabilir. Bunu uygulamadan önce konuşuruz.' },
    ],
    image: photo('yatak', 'Sabah ışığında beyaz kapitone yatak yüzeyi', 1254, 1254),
    wa: 'Merhaba BUHARSU, yatak yıkama hizmeti için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Yatak yıkama | İstanbul Anadolu Yakası',
      description: 'Tek ve çift kişilik yataklar, bebek yatakları ve yatak başlıkları için yatak yıkama. Sancaktepe, Sultanbeyli, Çekmeköy, Kurtköy, Kavakpınar, Aydınlı, Orhanlı.',
    },
  },
  {
    slug: 'sandalye-puf-yikama',
    name: 'Sandalye ve puf yıkama',
    short: 'Kumaş kaplı yemek sandalyeleri, puflar ve oturma bankları.',
    lead: 'Yemek sandalyeleri, dökülen yemek ve içecekle en çabuk kirlenen yüzeylerdir. Sandalye ve pufları oturma yüzeyine ve kumaşına göre tek tek temizliyoruz.',
    includes: ['Kumaş kaplı yemek sandalyeleri', 'Çalışma koltukları', 'Puf ve tabureler', 'Oturma bankları'],
    process: ['Kumaş kontrolü', 'Toz alma', 'Lekelere ön işlem', 'Yıkama ve su çekimi', 'Son kontrol'],
    expect: 'Sandalye sayısı ve kumaş türü fiyatı ve süreyi belirler. Bir fotoğraf ve adet bilgisi göndermeniz yeterli.',
    faqs: [
      { q: 'Sandalye sayısı fiyatı etkiler mi?', a: 'Evet. Fiyat sandalye sayısına, kumaşına ve kirlilik durumuna göre belirlenir.' },
      { q: 'Kadife sandalyeler yıkanabilir mi?', a: 'Kadife dikkat isteyen bir kumaştır. Tüy yönünü ve kumaşın yapısını kontrol ederek uygun yöntemi seçiyoruz.' },
    ],
    image: photo('sandalye', 'Ahşap yemek masası çevresinde adaçayı yeşili kadife sandalyeler ve puf', 1254, 1254),
    wa: 'Merhaba BUHARSU, sandalye ve puf yıkama hizmeti için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Sandalye ve puf yıkama | İstanbul Anadolu Yakası',
      description: 'Kumaş kaplı yemek sandalyeleri, puflar ve oturma bankları için yıkama. Sancaktepe, Sultanbeyli, Çekmeköy ve seçili Pendik, Tuzla mahallelerinde.',
    },
  },
  {
    slug: 'perde-yikama',
    name: 'Perde temizliği',
    short: 'Tül, fon ve stor perdeler için kumaşına uygun temizlik.',
    lead: 'Perdeler evin tozunu ve mutfak buharını sessizce toplar. Tül, fon ve stor perdeleri kumaşına ve yapısına göre ayırarak temizliyoruz.',
    includes: ['Tül perdeler', 'Fon perdeler', 'Stor perdeler', 'Güneşlik ve kruvaze perdeler'],
    process: ['Kumaş ve etiket kontrolü', 'Toz alma', 'Kumaşa uygun yıkama', 'Kurutma ve son kontrol'],
    expect: 'Güneşte uzun süre kalmış perdelerde solma ve kumaş yorulması olabilir; temizlik bu durumu geri getirmez. Bunu önceden konuşuruz.',
    faqs: [
      { q: 'Perdelerin sökülüp takılması dahil mi?', a: 'Bu konuyu İstanbul’daki hizmet planına göre birlikte netleştiriyoruz. Detaylar için WhatsApp’tan yazabilirsiniz.' },
      { q: 'Tül perdeler çeker mi?', a: 'Kumaşın türüne göre çekme riski değişir. Etiketi ve kumaşı kontrol ederek uygun yıkama yöntemini seçiyoruz.' },
    ],
    image: photo('perde', 'Pencere önünde yumuşak kıvrımlı beyaz tül ve gri fon perde', 1122, 1402),
    wa: 'Merhaba BUHARSU, perde temizliği hizmeti için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Perde temizliği | İstanbul Anadolu Yakası',
      description: 'Tül, fon ve stor perdeler için kumaşına uygun perde temizliği. Sancaktepe, Sultanbeyli, Çekmeköy, Kurtköy, Kavakpınar, Aydınlı ve Orhanlı’da.',
    },
  },
  {
    slug: 'battaniye-yorgan-yikama',
    name: 'Battaniye ve yorgan yıkama',
    short: 'Evde yıkanamayacak kadar büyük battaniye, yorgan ve pikeler.',
    lead: 'Battaniye ve yorganlar çamaşır makinesine sığmayacak kadar büyüktür ve çoğu zaman mevsim değişince yenilenmeyi bekler. Dolgu türüne göre uygun yıkama yöntemini seçiyoruz.',
    includes: ['Battaniyeler', 'Elyaf, pamuk ve yün yorganlar', 'Pike ve örtüler'],
    process: ['Dolgu ve kumaş kontrolü', 'Kumaşa uygun yıkama', 'Kurutma', 'Son kontrol'],
    expect: 'Yün ve pamuk yorganlar elyaftan farklı bir süreç ister. Yorganınızın dolgusunu biliyorsanız mesajınıza eklemeniz işimizi kolaylaştırır.',
    faqs: [
      { q: 'Yün yorgan yıkanabilir mi?', a: 'Yün yorganlar dikkatli bir süreç ister. Yorganın yapısını görüp uygun yöntemi birlikte belirliyoruz.' },
      { q: 'Battaniye ve yorganı birlikte gönderebilir miyim?', a: 'Evet. Adetleri ve türlerini WhatsApp’tan yazmanız yeterli.' },
    ],
    image: photo('battaniye', 'Yatak üzerinde katlanmış battaniye ve yorgan yığını', 1254, 1254),
    wa: 'Merhaba BUHARSU, battaniye ve yorgan yıkama hizmeti için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Battaniye ve yorgan yıkama | İstanbul Anadolu Yakası',
      description: 'Battaniye, yorgan ve pikeler için dolgu türüne uygun yıkama. Sancaktepe, Sultanbeyli, Çekmeköy ve seçili Pendik, Tuzla mahallelerinde.',
    },
  },
  {
    slug: 'overlok-tamiri',
    name: 'Overlok tamiri',
    short: 'Halı kenarlarındaki açılma ve yıpranmalar için kenar onarımı.',
    lead: 'Halının kenarı açılmaya başladığında söküm zamanla yayılır. Kenarı overlok ile sararak halının dokusunu korumaya ve ömrünü uzatmaya yardımcı oluyoruz.',
    includes: ['Yıpranmış halı kenarları', 'Kesilip ölçüsü değiştirilen halılar', 'Yolluk ve paspas kenarları'],
    process: ['Kenar ve doku kontrolü', 'İplik rengi seçimi', 'Overlok uygulaması', 'Son kontrol'],
    expect: 'Overlok, açılmış kenarı sarar ve sökümün ilerlemesini durdurmaya yardımcı olur; eksilmiş dokuyu yeniden örmez.',
    faqs: [
      { q: 'Overlok ipliğinin rengi seçilebilir mi?', a: 'İplik rengini halınıza uygun seçmeye çalışırız. Mevcut seçenekleri WhatsApp’tan sorabilirsiniz.' },
      { q: 'Halı yıkama ile birlikte yapılabilir mi?', a: 'Evet. Yıkama ve overlok onarımını aynı halı için birlikte planlayabilirsiniz.' },
    ],
    image: photo('overlok', 'Motifli halının overlok ile sarılmış kenarı', 1254, 1254),
    wa: 'Merhaba BUHARSU, halı overlok tamiri için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Halı overlok tamiri | İstanbul Anadolu Yakası',
      description: 'Halı ve yolluk kenarlarındaki açılmalar için overlok tamiri. Sancaktepe, Sultanbeyli, Çekmeköy, Kurtköy, Kavakpınar, Aydınlı ve Orhanlı’da.',
    },
  },
  {
    slug: 'buharli-koltuk-temizligi',
    name: 'Buharlı koltuk temizliği',
    short: 'Uygun kumaşlarda yüzeyi gevşeten ve tazeleyen buharlı uygulama.',
    lead: 'BUHARSU adını buhardan alıyor. Buharlı uygulama, uygun kumaşlarda yüzeydeki kiri gevşetmeye ve kumaşı tazelemeye yardımcı olur. Buharın hangi kumaşa uygulanacağına eşyanızı gördükten sonra karar veriyoruz.',
    includes: ['Kumaş koltuk ve kanepeler', 'Yatak yüzeyleri', 'Minder, puf ve sandalye kumaşları'],
    process: ['Kumaşın ısıya uygunluğunun kontrolü', 'Toz alma', 'Buharlı uygulama', 'Gerekirse yıkama ve su çekimi', 'Kuruma önerileri'],
    expect: 'Isıya hassas bazı kumaşlara buhar uygulanmaz. Böyle bir kumaşta size uygun başka bir yöntem öneririz.',
    faqs: [
      { q: 'Buhar her kumaşa uygulanır mı?', a: 'Hayır. Isıya hassas bazı kumaşlarda buhar önerilmez. Kumaşı ve etiketini kontrol ederek en uygun yöntemi seçiyoruz.' },
      { q: 'Buharlı temizlik ile yıkama arasındaki fark nedir?', a: 'Yıkama, kumaşın derinindeki kiri su ve vakumla dışarı alır. Buhar ise yüzeyi gevşetip tazelemeye odaklanır. Çoğu zaman iki yöntem birlikte planlanır.' },
    ],
    image: photo('buharli', 'Gri dokuma kanepe üzerinde buharlı temizleme başlığı', 1448, 1086),
    wa: 'Merhaba BUHARSU, buharlı koltuk temizliği için bilgi ve fiyat almak istiyorum.',
    seo: {
      title: 'Buharlı koltuk yıkama | İstanbul Anadolu Yakası',
      description: 'Uygun kumaşlarda buharlı koltuk temizliği. Sancaktepe, Sultanbeyli, Çekmeköy, Kurtköy, Kavakpınar, Aydınlı ve Orhanlı’da BUHARSU.',
    },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

// ---------------------------------------------------------------------------------------------
// Coverage. The client confirmed these boundaries; keep them exact everywhere.

export type Area = {
  id: 'sancaktepe' | 'sultanbeyli' | 'cekmekoy' | 'pendik' | 'tuzla';
  district: string;
  scope: 'full' | 'partial';
  coverage: string; // short line shown in lists
  parts: string[]; // mahalle list (full) or the only served neighbourhoods (partial)
  page: string; // local landing page slug under /bolgeler/
  locative: string; // "Sancaktepe’de"
  genitive: string; // "Pendik’in", "Tuzla’nın"
  mapName: string; // name in the OSM map data
};

export const areas: Area[] = [
  {
    id: 'sancaktepe', district: 'Sancaktepe', scope: 'full', coverage: 'Tüm mahalleler', locative: 'Sancaktepe’de', mapName: 'Sancaktepe', genitive: 'Sancaktepe’nin',
    parts: ['Abdurrahmangazi', 'Akpınar', 'Atatürk', 'Emek', 'Eyüp Sultan', 'Fatih', 'Hilal', 'İnönü', 'Kemal Türkler', 'Meclis', 'Merve', 'Mevlana', 'Osmangazi', 'Paşaköy', 'Safa', 'Sarıgazi', 'Veysel Karani', 'Yenidoğan', 'Yunus Emre'],
    page: 'sancaktepe-koltuk-yikama',
  },
  {
    id: 'sultanbeyli', district: 'Sultanbeyli', scope: 'full', coverage: 'Tüm mahalleler', locative: 'Sultanbeyli’de', mapName: 'Sultanbeyli', genitive: 'Sultanbeyli’nin',
    parts: ['Abdurrahmangazi', 'Adil', 'Ahmet Yesevi', 'Akşemsettin', 'Battalgazi', 'Fatih', 'Hamidiye', 'Hasanpaşa', 'Mecidiye', 'Mehmet Akif', 'Mimar Sinan', 'Necip Fazıl', 'Orhangazi', 'Turgut Reis', 'Yavuz Selim'],
    page: 'sultanbeyli-koltuk-yikama',
  },
  {
    id: 'cekmekoy', district: 'Çekmeköy', scope: 'full', coverage: 'Tüm mahalleler', locative: 'Çekmeköy’de', mapName: 'Çekmeköy', genitive: 'Çekmeköy’ün',
    parts: ['Alemdağ', 'Aydınlar', 'Cumhuriyet', 'Çamlık', 'Çatalmeşe', 'Ekşioğlu', 'Güngören', 'Hamidiye', 'Hüseyinli', 'Kirazlıdere', 'Koçullu', 'Mehmet Akif', 'Merkez', 'Mimar Sinan', 'Nişantepe', 'Ömerli', 'Reşadiye', 'Sırapınar', 'Soğukpınar', 'Sultançiftliği', 'Taşdelen'],
    page: 'cekmekoy-koltuk-yikama',
  },
  {
    id: 'pendik', district: 'Pendik', scope: 'partial', coverage: 'Yalnızca Kurtköy ve Kavakpınar', locative: 'Kurtköy ve Kavakpınar’da', mapName: 'Pendik', genitive: 'Pendik’in',
    parts: ['Kurtköy', 'Kavakpınar'],
    page: 'kurtkoy-kavakpinar-koltuk-yikama',
  },
  {
    id: 'tuzla', district: 'Tuzla', scope: 'partial', coverage: 'Yalnızca Aydınlı ve Orhanlı', locative: 'Aydınlı ve Orhanlı’da', mapName: 'Tuzla', genitive: 'Tuzla’nın',
    parts: ['Aydınlı', 'Orhanlı'],
    page: 'aydinli-orhanli-koltuk-yikama',
  },
];

export const coverageSentence =
  'İstanbul Anadolu Yakası’nda Sancaktepe, Sultanbeyli ve Çekmeköy’ün tamamında; Pendik’te Kurtköy ve Kavakpınar, Tuzla’da ise Aydınlı ve Orhanlı bölgelerinde hizmetinizdeyiz.';

/** Every place a customer can pick, in the order they appear in selectors. */
export const placeOptions = [
  'Sancaktepe', 'Sultanbeyli', 'Çekmeköy', 'Pendik / Kurtköy', 'Pendik / Kavakpınar', 'Tuzla / Aydınlı', 'Tuzla / Orhanlı',
];

// ---------------------------------------------------------------------------------------------
// Local landing pages: each one carries its own content, not a find-and-replace of the others.

export type LocalPage = {
  slug: string;
  areaId: Area['id'];
  h1: string;
  title: string;
  description: string;
  intro: string[];
  note: { title: string; text: string };
  faqs: Faq[];
};

export const localPages: LocalPage[] = [
  {
    slug: 'sancaktepe-koltuk-yikama', areaId: 'sancaktepe',
    h1: 'Sancaktepe koltuk ve halı yıkama',
    title: 'Sancaktepe koltuk yıkama ve Sancaktepe halı yıkama',
    description: 'Sancaktepe’nin tüm mahallelerinde koltuk yıkama, halı yıkama ve ev tekstili temizliği. Sarıgazi’den Paşaköy’e BUHARSU. WhatsApp: 0505 188 80 63.',
    intro: [
      'Sancaktepe, yeni konut siteleri ve geniş aile evleriyle büyüyen bir ilçe. Sarıgazi’den Paşaköy’e, Yenidoğan’dan Osmangazi’ye ilçenin bütün mahallelerinde koltuk, halı ve ev tekstili temizliği yapıyoruz.',
      'Sancaktepe koltuk yıkama ve Sancaktepe halı yıkama taleplerinde köşe takımları, yemek sandalyeleri ve büyük salon halıları öne çıkıyor. Her birini kumaşına göre ayrı değerlendiriyoruz.',
    ],
    note: {
      title: 'Sitede oturuyorsanız',
      text: 'Birçok sitede giriş, otopark ve asansör kullanımı için yönetimin kuralları vardır. Randevu konuşurken bunları bize iletmeniz, günün sorunsuz ilerlemesini sağlar.',
    },
    faqs: [
      { q: 'Sancaktepe’nin hangi mahallelerine hizmet veriyorsunuz?', a: 'Sancaktepe’nin tüm mahallelerine hizmet veriyoruz. Mahallenizi mesajınıza eklemeniz yeterli.' },
      { q: 'Sancaktepe’de halı yıkama da yapıyor musunuz?', a: 'Evet. Koltuk yıkamanın yanında halı, yatak, perde, battaniye ve yorgan için de hizmet veriyoruz.' },
      { q: 'Sancaktepe için fiyat nasıl alırım?', a: 'Eşyanızın fotoğrafını ve mahallenizi WhatsApp’tan 0505 188 80 63 numarasına gönderin; fiyat bilgisini size iletelim.' },
    ],
  },
  {
    slug: 'sultanbeyli-koltuk-yikama', areaId: 'sultanbeyli',
    h1: 'Sultanbeyli koltuk ve halı yıkama',
    title: 'Sultanbeyli koltuk yıkama ve Sultanbeyli halı yıkama',
    description: 'Sultanbeyli’nin tüm mahallelerinde koltuk yıkama, halı yıkama, yatak ve perde temizliği. Fiyat için WhatsApp’tan yazın: 0505 188 80 63.',
    intro: [
      'Sultanbeyli’de Abdurrahmangazi’den Yavuz Selim’e, ilçenin her mahallesinde hizmet veriyoruz. Kalabalık sofraların kurulduğu evlerde koltuklar ve halılar daha çabuk yorulur; biz de bakımı bu tempoya göre planlıyoruz.',
      'Sultanbeyli koltuk yıkama ve Sultanbeyli halı yıkama için salon takımından çocuk odası halısına kadar eşyalarınızı tek bir mesajla listeleyebilir, hepsi için aynı anda fiyat alabilirsiniz.',
    ],
    note: {
      title: 'Birden fazla eşya için',
      text: 'Koltuk, halı ve yatak gibi farklı eşyaları aynı gün için planlamak isterseniz hepsini tek mesajda yazın. Fotoğraflar, doğru fiyat vermemizi kolaylaştırır.',
    },
    faqs: [
      { q: 'Sultanbeyli’nin tüm mahallelerine geliyor musunuz?', a: 'Evet, Sultanbeyli’nin tüm mahallelerinde hizmet veriyoruz.' },
      { q: 'Aynı gün hem koltuk hem halı yıkatabilir miyim?', a: 'Eşyalarınızı mesajınızda listeleyin; uygun planı ve fiyatı birlikte netleştirelim.' },
      { q: 'Sultanbeyli’de yatak yıkama yapıyor musunuz?', a: 'Evet. Tek ve çift kişilik yataklar, bebek yatakları ve yatak başlıkları için hizmet veriyoruz.' },
    ],
  },
  {
    slug: 'cekmekoy-koltuk-yikama', areaId: 'cekmekoy',
    h1: 'Çekmeköy koltuk ve halı yıkama',
    title: 'Çekmeköy koltuk yıkama ve Çekmeköy halı yıkama',
    description: 'Çekmeköy’ün tüm mahallelerinde koltuk yıkama ve halı yıkama: Taşdelen, Alemdağ, Ömerli, Sırapınar ve diğerleri. WhatsApp: 0505 188 80 63.',
    intro: [
      'Çekmeköy; Taşdelen ve Merkez’in apartmanlarından Ömerli ve Sırapınar’ın bahçeli evlerine kadar çok farklı yaşam alanlarını bir araya getiriyor. İlçenin tüm mahallelerinde hizmet veriyoruz.',
      'Çekmeköy koltuk yıkama ve Çekmeköy halı yıkamanın yanında, bahçeli evlerde dış mekân minderleri ve kış öncesi battaniye, yorgan yıkama da sık sorulan işler arasında. Hepsini aynı mesajda sorabilirsiniz.',
    ],
    note: {
      title: 'Kuruma için küçük bir öneri',
      text: 'Yıkanan koltuk ve halılar, havası iyi dolaşan bir odada daha rahat kurur. Uygulama gününden önce pencere açabileceğiniz bir oda düşünmeniz yeterli.',
    },
    faqs: [
      { q: 'Ömerli ve Sırapınar gibi uzak mahallelere de geliyor musunuz?', a: 'Evet. Çekmeköy’ün tüm mahallelerinde hizmet veriyoruz.' },
      { q: 'Dış mekân minderleri yıkanır mı?', a: 'Kumaşına göre değişir. Minderlerinizin fotoğrafını gönderin, uygun yöntemi birlikte belirleyelim.' },
      { q: 'Çekmeköy için nasıl fiyat alırım?', a: 'Eşyanızın fotoğrafını ve mahallenizi WhatsApp’tan gönderin; fiyat bilgisini size iletelim.' },
    ],
  },
  {
    slug: 'kurtkoy-kavakpinar-koltuk-yikama', areaId: 'pendik',
    h1: 'Kurtköy ve Kavakpınar koltuk yıkama',
    title: 'Kurtköy koltuk yıkama ve Kavakpınar koltuk yıkama',
    description: 'Pendik’te Kurtköy ve Kavakpınar mahallelerinde koltuk yıkama ve halı yıkama. Pendik’in diğer mahallelerinde şu an hizmet vermiyoruz.',
    intro: [
      'Pendik’te yalnızca Kurtköy ve Kavakpınar mahallelerinde hizmet veriyoruz. Bu iki mahallede koltuk, halı, yatak ve ev tekstili temizliği için bize WhatsApp’tan ulaşabilirsiniz.',
      'Kurtköy koltuk yıkama ve Kavakpınar koltuk yıkama taleplerinde, konut sitelerinde ve apartmanlarda aynı özenle çalışıyoruz. Mesajınıza sitenizin ya da sokağınızın adını eklemeniz yeterli.',
    ],
    note: {
      title: 'Pendik’in diğer mahalleleri',
      text: 'Pendik’in Kurtköy ve Kavakpınar dışındaki mahallelerinde şu an hizmet vermiyoruz. Hizmet bölgemiz genişlediğinde bu sayfada duyuracağız.',
    },
    faqs: [
      { q: 'Pendik’in tamamına hizmet veriyor musunuz?', a: 'Hayır. Pendik’teki hizmet bölgemiz Kurtköy ve Kavakpınar mahalleleriyle sınırlı.' },
      { q: 'Kurtköy’de halı yıkama yapıyor musunuz?', a: 'Evet. Kurtköy ve Kavakpınar’da koltuk yıkamanın yanında halı yıkama da yapıyoruz.' },
    ],
  },
  {
    slug: 'aydinli-orhanli-koltuk-yikama', areaId: 'tuzla',
    h1: 'Aydınlı ve Orhanlı koltuk yıkama',
    title: 'Aydınlı koltuk yıkama ve Orhanlı koltuk yıkama',
    description: 'Tuzla’da Aydınlı ve Orhanlı mahallelerinde koltuk yıkama ve halı yıkama. Tuzla’nın diğer mahallelerinde şu an hizmet vermiyoruz.',
    intro: [
      'Tuzla’da yalnızca Aydınlı ve Orhanlı mahallelerinde hizmet veriyoruz. Bu iki mahallede koltuk, halı, yatak ve ev tekstili temizliği için WhatsApp’tan yazabilir ya da arayabilirsiniz.',
      'Aydınlı koltuk yıkama ve Orhanlı koltuk yıkama taleplerinizde mahallenizi ve eşyalarınızı tek mesajda yazmanız, planlamayı hızlandırır. Halı ve yatak yıkama için de aynı mesajla bilgi alabilirsiniz.',
    ],
    note: {
      title: 'Tuzla’nın diğer mahalleleri',
      text: 'Tuzla’nın Aydınlı ve Orhanlı dışındaki mahallelerinde şu an hizmet vermiyoruz. Hizmet bölgemiz genişlediğinde bu sayfada duyuracağız.',
    },
    faqs: [
      { q: 'Tuzla’nın tamamına hizmet veriyor musunuz?', a: 'Hayır. Tuzla’daki hizmet bölgemiz Aydınlı ve Orhanlı mahalleleriyle sınırlı.' },
      { q: 'Orhanlı’da yatak yıkama yapıyor musunuz?', a: 'Evet. Aydınlı ve Orhanlı’da yatak, koltuk ve halı yıkama hizmeti veriyoruz.' },
    ],
  },
];

export const areaById = (id: Area['id']) => areas.find((a) => a.id === id)!;
export const placeName = (a: Area) => (a.scope === 'full' ? a.district : `${a.district} (${a.parts.join(' / ')})`);
export const areaMessage = (a: Area) =>
  `Merhaba BUHARSU, ${placeName(a)} için koltuk ve halı yıkama hakkında bilgi ve fiyat almak istiyorum.`;

// ---------------------------------------------------------------------------------------------
// Home copy

export const home = {
  hero: {
    title: ['Yaşam alanlarınıza', 'yeniden ferahlık.'],
    sub: 'İstanbul Anadolu Yakası’nda koltuk yıkama, halı yıkama ve ev tekstili temizliği.',
    primary: 'WhatsApp’tan teklif al',
    secondary: 'Hizmetleri keşfet',
  },
  services: {
    title: 'Her yüzeye özel, özenli bakım.',
    lead: 'Koltuğun kumaşı, halının ipliği, perdenin dokusu birbirinden farklıdır. Yöntemi eşyaya göre seçiyoruz.',
    more: 'Diğer hizmetler',
  },
  statement: {
    title: ['Her detayda özen.', 'Her dokunuşta ferahlık.'],
    text: 'BUHARSU, İstanbul Anadolu Yakası’nda koltuk, halı ve ev tekstili temizliği yapıyor. Sancaktepe’den Tuzla’ya, hizmet verdiğimiz her mahallede aynı özenle çalışıyoruz. Amacımız yalnızca temizlemek değil; eşyalarınıza özenli bir bakım sunmak.',
    link: 'Hikâyemiz',
  },
  compare: {
    title: ['Farkı görün.', 'Ferahlığı hissedin.'],
    text: 'Tutamacı sürükleyin: aynı kumaşın uygulama öncesi ve sonrası.',
    before: 'Önce',
    after: 'Sonra',
  },
  process: {
    title: 'Temizliğe giden yol çok kolay.',
    steps: [
      { title: 'Bize ulaşın', text: 'WhatsApp’tan ihtiyacınızı yazın; mümkünse eşyanızın fotoğrafını da ekleyin.' },
      { title: 'Detayları belirleyelim', text: 'Ürün, ölçü ve konum bilgisine göre uygulamayı ve fiyatı birlikte netleştirelim.' },
      { title: 'Profesyonel uygulama', text: 'Eşyanızın kumaşına uygun temizleme sürecini uygulayalım.' },
      { title: 'Yenilenen ferahlık', text: 'Temiz ve özenle bakılmış yaşam alanınızın keyfini çıkarın.' },
    ],
  },
  craft: {
    title: ['Temizlikte kalite,', 'detaylarda saklı.'],
    points: [
      { title: 'Kumaşı tanımak', text: 'Uygulamadan önce kumaşın etiketine, lif yapısına ve boyasına bakarız.' },
      { title: 'Hazırlık', text: 'Toz alma ve lekelere ön işlem, iyi bir yıkamanın yarısıdır.' },
      { title: 'Doğru yöntem', text: 'Buhar, yıkama ya da ikisi birden. Karar eşyaya göre verilir.' },
      { title: 'Profesyonel ekipman', text: 'Ev tipi makinelerin ulaşamadığı derinliğe profesyonel ekipmanla ulaşırız.' },
      { title: 'Dikkatli çalışma', text: 'Çalıştığımız alanı korur, eşyalarınızı özenle tutarız.' },
      { title: 'Açık iletişim', text: 'Ne yapacağımızı ve ne bekleyebileceğinizi baştan konuşuruz.' },
    ],
  },
  work: {
    title: 'İşimiz konuşsun.',
    text: 'Gerçek çalışmalarımızı ve öncesi, sonrası karşılaştırmalarını Instagram hesabımızda paylaşıyoruz.',
    cta: 'Instagram’da daha fazlasını gör',
  },
  areas: {
    title: 'İstanbul’da size yakınız.',
    cta: 'Bu bölge için WhatsApp’tan yaz',
  },
  trust: {
    title: 'Yorumlar',
    lead: 'Müşterilerimizin deneyimleri.',
    emptyTitle: 'Deneyiminizi bizimle paylaşın.',
    emptyText: 'Hizmetimizden memnun kaldıysanız birkaç cümlelik yorumunuzu WhatsApp’tan gönderin; izninizle burada yayımlayalım.',
    emptyCta: 'Yorumunuzu gönderin',
    emptyMessage: 'Merhaba BUHARSU, aldığım hizmetle ilgili yorumumu paylaşmak istiyorum:',
    points: [
      { title: 'Doğrudan iletişim', text: 'Bize 0505 188 80 63 numarasından hem arayarak hem WhatsApp’tan ulaşırsınız. Alternatif hattımız: 0543 962 45 49.' },
      { title: 'Net hizmet bölgesi', text: 'Hangi mahallelere gittiğimizi açıkça yazıyoruz. Bölgemiz dışında söz vermiyoruz.' },
      { title: 'Anadolu Yakası’na odaklı', text: 'Yalnızca hizmet bölgemizdeki mahallelerde çalışıyoruz; bu sayede randevuları rahat planlıyoruz.' },
    ],
  },
  cta: {
    title: ['Evinizdeki ferahlık,', 'bir mesaj uzağınızda.'],
    text: 'Koltuk, halı ve diğer temizlik ihtiyaçlarınız için bize ulaşın. Detayları birlikte değerlendirelim.',
    primary: 'WhatsApp’tan teklif al',
    secondary: 'Hemen ara',
  },
};

// Customer reviews. Add only real reviews, with the customer's permission.
// `place` must be inside the service area (checked by `reviewsFor`); `service` is a service slug
// and decides which hizmet page shows the review (home shows all of them).
//   { name: 'Ayşe K.', place: 'Sancaktepe / Sarıgazi', service: 'koltuk-yikama', rating: 5, text: '…' }
export type Review = { name: string; place: string; service: string; rating: number; text: string };
export const reviews: Review[] = [
  { name: 'Emre Yılmaz', place: 'Sancaktepe', service: 'genel', rating: 5, text: 'Buharsu’ya ilk defa temizlik yaptırdık, gayet memnun kaldık. Baştan sona iletişimleri iyiydi, söyledikleri saatte geldiler. Sefa Bey ve ekibine ilgileri ve emekleri için teşekkür ederiz.' },
  { name: 'Elif Demir', place: 'Çekmeköy', service: 'genel', rating: 5, text: 'Bir tanıdığımızın tavsiyesiyle ulaştık. Koltukları ve halıları temizlettik, ikisi de içimize sindi. Evde küçük çocuk olunca insan temizliğe daha çok dikkat ediyor. Ekibin de eli oldukça özenliydi, sağ olsunlar.' },
  { name: 'Burak Aydın', place: 'Kurtköy', service: 'genel', rating: 5, text: 'Hem koltuk hem perde yıkama için Buharsu’yu tercih ettik. Aklımıza takılanları arayıp sorduk, hepsini güzelce anlattılar. İşlerini de özenerek yaptılar. Sefa Bey’e ve ekibine ayrıca teşekkür ediyorum.' },
  { name: 'Zeynep Çelik', place: 'Sancaktepe', service: 'genel', rating: 5, text: 'Taşınma öncesi halı ve koltuk işini aradan çıkarmak istedik. Randevuyu da bize uygun şekilde ayarladılar, çok yardımcı oldular. Temizlikten memnunuz, ihtiyaç olduğunda yine arayacağız.' },
  { name: 'Derya Şahin', place: 'Çekmeköy', service: 'perde-yikama', rating: 5, text: 'Tülleri uzun zamandır yıkatmak istiyordum, sonunda fırsat buldum. Temizlenince odanın havası bile değişti. Teslim alırken de getirirken de özenliydiler. Sefa Bey ve ekibinin eline sağlık, ben çok memnun kaldım.' },
  { name: 'Mert Kaya', place: 'Kurtköy', service: 'koltuk-yikama', rating: 5, text: 'Açık renk koltuklarımız özellikle kol kısımlarından bayağı kirlenmişti. Temizlikten sonra belirgin şekilde fark etti. Kuruması konusunda da neye dikkat etmemiz gerektiğini anlattılar. Aceleye getirmeden çalıştıkları için teşekkür ederiz.' },
  { name: 'Serkan Arslan', place: 'Sancaktepe', service: 'hali-yikama', rating: 5, text: 'Salondaki büyük halıyı ve yollukları verdik. Gayet temiz, düzgün paketlenmiş şekilde geldi. Saçaklarına kadar ilgilenilmiş olması hoşuma gitti. Sefa Bey’e ve ekibine teşekkürler, ellerine sağlık.' },
  { name: 'Ebru Yıldız', place: 'Çekmeköy', service: 'yatak-yikama', rating: 5, text: 'İlk kez yatak yıkama hizmeti aldım. Nasıl yapılacağını pek bilmiyordum, başlamadan önce anlattılar. Özellikle kenar kısımlarla da uğraştılar, üstten geçip bırakmadılar. Sonuçtan memnun kaldım, ekibe teşekkür ederim.' },
];

/** True when a review's place is a confirmed service area (whole district, or an allowed mahalle). */
export function inServiceArea(place: string) {
  const [district, hood] = place.split('/').map((x) => x.trim());
  const a = areas.find((x) => x.district === district || x.parts.includes(district));
  if (!a) return false;
  if (a.scope === 'full') return true;
  return a.parts.includes(hood ?? district);
}

// Home: every review. A hizmet page: its own reviews first, then the general ones ('genel').
export const reviewsFor = (service?: string) => {
  const ok = reviews.filter((r) => inServiceArea(r.place));
  if (!service) return ok;
  return [...ok.filter((r) => r.service === service), ...ok.filter((r) => r.service === 'genel')];
};
export const hasOwnReviews = (service: string) => reviews.some((r) => r.service === service && inServiceArea(r.place));

export const gallery: (Media & { caption: string })[] = [
  { ...photo('g-1', 'Profesyonel makineyle yıkanan motifli halı', 1122, 1402), caption: 'Halı yıkama' },
  { ...photo('g-2', 'Lacivert kadife sandalyeli aydınlık yemek odası', 1448, 1086), caption: 'Sandalye ve puf' },
  { ...photo('g-3', 'Yatak üzerinde temiz, katlanmış battaniyeler ve yorgan', 1254, 1254), caption: 'Battaniye ve yorgan' },
  { ...photo('g-4', 'Mavi gri kanepede yıkama başlığıyla temizlik', 1122, 1402), caption: 'Koltuk yıkama' },
  { ...photo('g-5', 'Yıkama sonrası temiz, beyaz kapitone yatak', 1448, 1086), caption: 'Yatak yıkama' },
  { ...photo('g-6', 'Temizlenmiş krem bukle berjer ve kanepe', 1254, 1254), caption: 'Koltuk yıkama' },
];

export const nav = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/calismalarimiz', label: 'Çalışmalarımız' },
  { href: '/hizmet-bolgeleri', label: 'Hizmet bölgeleri' },
  { href: '/iletisim', label: 'İletişim' },
];
