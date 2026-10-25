# BUHARSU İstanbul: launch checklist

Everything below is either hidden on the site or written neutrally until confirmed. Edit
`src/data/site.ts`, then rebuild.

## Must confirm before publishing

- [ ] **Domain.** `site.url` is a placeholder (`https://www.buharsu.com.tr`). Canonicals, the
      sitemap, OG tags and JSON-LD all use it.
- [ ] **Hero film** and **real photos** (see MEDIA.md). No labels on the page (owner's choice);
      placeholder media are tracked with `placeholder: true` in `src/data/site.ts`.
- [ ] **Before/after pair.** Currently a demo (procedural, or AI if swapped in). Replace with a real
      job photographed before and after before going live.
- [ ] **Legal identity** for KVKK: trade name (`site.legalName`), address, MERSİS / tax number,
      data-controller contact. `/kvkk` is an honest interim notice and is set to `noindex`.
- [ ] **Secondary phone on WhatsApp?** 0543 962 45 49 is shown as a call-only line.
- [ ] **Mahalle lists** for Sancaktepe (19), Sultanbeyli (15) and Çekmeköy (21) in `areas[].parts`.
      They come from the official district lists; double-check them.

## Process facts (copy is neutral until these are known)

- [ ] On-site vs. pickup and delivery, per service (carpets especially). Currently: "birlikte
      planlıyoruz".
- [ ] Curtain removal and re-hanging included? (Perde FAQ)
- [ ] Overlock thread colour options. (Overlok FAQ)
- [ ] Equipment and methods. The site says "profesyonel ekipman" and "buhar, uygun kumaşlarda".
      No temperatures, percentages or chemical-free claims are made.

## Hidden until confirmed (`confirmed: false` in `site.facts`)

- [ ] Istanbul address (only if customers can visit). Also add it to JSON-LD.
- [ ] Opening hours. Add `openingHours` to JSON-LD once known.

## Not used on purpose

- Urfa statistics (5000+ müşteri, %100 memnuniyet, 10.000+ koltuk). Unverified.
- Any Şanlıurfa content: the site is Istanbul Anadolu Yakası only (owner's decision, 2026-10-25).
- Invented reviews. `reviews` in site.ts is empty; Yorumlar sections show a "send your review" invite until real, permissioned reviews from the service area are added.
- Claims like 140 °C, %99,9 bakteri, kimyasalsız, hızlı kuruma garantisi, ücretsiz servis,
  indirim.

## After launch

- [ ] Google Business Profile with the same name, phones and service area (no address if it is a
      service-area business).
- [ ] Submit `sitemap.xml` in Search Console.
- [ ] Add real Google reviews to `reviews` once there are some (only with permission).
