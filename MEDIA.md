# BUHARSU: media status

**In place (2026-10-25):**
- **Hero film:** two Google Flow reels, cut and compressed by ffmpeg into seamless loops.
  - `public/videos/hero-desktop.mp4`: 20.7 s, 1920×1080, 4.0 MB
  - `hero-mobile.mp4`: 21.7 s, 720×1280, 2.4 MB
  - Posters are the first frames (`public/images/hero/`).
- **Stills:** ChatGPT mood stills for every service, the statement, craft and CTA sections, the
  About hero, the gallery and the before/after pair (`public/images/photos/`).
- **Placeholders:** all of the above are AI imagery, not BUHARSU jobs. Nothing is labelled on the
  page; each one carries `placeholder: true` in `src/data/site.ts`.

**Before launch, replace with real work (priority order):**
1. Before/after pair (`compare-before` / `compare-after`): one real sofa, same framing.
2. Gallery `g-1`…`g-6`: real jobs, captioned with the district. Label Urfa work as Şanlıurfa.
3. Optional: real service photos.

Re-cutting the reel: the edit list (clip, in-point, duration) and the seamless-loop trick live in
the build notes from 2026-10-25. Desktop order: room → wand → macro → carpet → room.

`tools/textiles/` can still render the old procedural fabric placeholders if ever needed.
## 3. Storefront concept

`public/images/brand/storefront-concept.jpg` is the supplied render. It appears only on Hakkımızda,
captioned "Konsept görsel… Fotoğraf değildir." Remove it if the owner prefers.

## 4. Instagram

The profile (@buharsu_hali_koltuk_04) needs a login to browse, so no posts were used. With the
owner's permission, export 6–12 of the best posts and use them in `gallery`.
