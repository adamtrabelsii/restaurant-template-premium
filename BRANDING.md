# Rebranding this template

Everything a buyer needs to turn this into their own restaurant site. Steps are ordered — doing them top to bottom takes roughly 20–30 minutes.

---

## 1. Name & identity (2 files + one search)

**`src/config/brand.js`** — the wordmark:

```js
export const BRAND = {
  name: 'ARDOR',      // your restaurant name (the animated hero letters + all logos)
  accentLetter: 3,    // zero-based index of the letter shown in the accent color
  storagePrefix: 'ardor', // lowercase, no spaces — namespaces browser storage
}
```

The hero title, navbar logo, footer logo and loading screen all render from this.

**Locale copy** — the name also appears inside sentences (about text, copyright, aria templates). Search-and-replace `ARDOR` in:
- `src/i18n/locales/en.json`
- `src/i18n/locales/es.json`

**`index.html`** — `<title>`, `<meta name="description">`, all `og:`/`twitter:` tags, and the JSON-LD block (see §7). The favicon is an inline SVG in the `<link rel="icon">` tag — change the letter and its `fill` color there (it cannot read CSS variables).

## 2. Colors (1 file)

The entire palette lives in **`src/index.css`**, in the `:root` block at the top. Edit only the `*-rgb` triplets (space-separated R G B):

```css
--red-rgb:    168 50 63;   /* primary accent  */
--gold-rgb:   201 169 97;  /* secondary accent */
--dark-rgb:   12 10 9;     /* page background */
...
```

Every Tailwind class (`text-ardor-gold`, `bg-ardor-darker/95`, …), every gradient, glow, ember, and spotlight derives from these variables. There is **no other place** colors are defined, with two exceptions that can't read CSS variables:
- `index.html` → `<meta name="theme-color">` and the favicon `fill`
- `public/og.jpg` → regenerate your social image to match (1200×630)

Tip: keep the same *roles* (one warm accent, one metallic accent, warm near-black grounds) — the design is tuned for a dark, warm scheme. A light theme would need contrast re-checks throughout.

## 3. Fonts

Families are aliased in `tailwind.config.js` (`font-cormorant` → display serif, `font-montserrat` → body sans — the names are historical, the loaded fonts are **Fraunces** and **Inter**). To swap:

1. Change the Google Fonts `<link>` in `index.html`.
2. Update the `fontFamily` entries in `tailwind.config.js` and the `body { font-family }` in `src/index.css`.
3. The hero uses Fraunces' variable axes via `.display-wonk` in `src/index.css` (`opsz/SOFT/WONK`). If your new display font isn't Fraunces, delete that class from the hero `<h1>` in `src/components/Hero.jsx` or the block in `index.css`.

## 4. Images

All photography is hot-linked from Unsplash (fine for a demo; for production, replace with the client's own photos):

| Where | File | Constant |
|---|---|---|
| Hero backdrop (also preloaded in `index.html`) | `src/components/Hero.jsx` | `HERO_IMG` |
| Signature dish showcase | `src/components/DishScroll.jsx` | `DISH_IMAGES` |
| Dish cards | `src/components/Dishes.jsx` | `DISH_IMAGES` |
| Drink cards | `src/components/Drinks.jsx` | `DRINK_IMAGES` |
| Gallery | `src/components/Gallery.jsx` | `IMAGES` |
| Chef portrait + kitchen | `src/components/About.jsx` | inline `src` |
| Social share image | `public/og.jpg` | 1200×630 JPEG |

Image *alt texts* live in the locale files (`gallery.images`, `dishes.items[].alt`, …) so they translate.

## 5. Menu & dish content

All names, descriptions, prices and dietary tags are in the two locale JSONs under `dishes`, `dishScroll`, `drinks`, and `menu.items`. Dietary tags per item: `"tags": ["v", "gf", "n"]` (vegetarian / gluten-free / nuts) — the menu filter chips read these.

## 6. Press & awards — placeholders, on purpose

The press marquee (`src/components/Press.jsx`) and the hero award strip (`src/components/Hero.jsx`) use **fictional publication names**. Do not invent endorsements from real guides or magazines (Michelin, 50 Best, etc.) — only list press the restaurant has actually received. Replace the placeholder names with real mentions, or delete the sections.

## 7. Contact details, hours & metadata (must stay in sync)

The address, phone, email and opening hours appear in **three places that must match**:
1. Locale files → `footer.address`, `footer.phone`, `footer.email`, `footer.hours`
2. `index.html` → JSON-LD block (`address`, `telephone`, `geo`, `openingHoursSpecification`)
3. `src/components/Reservations.jsx` → `timesFor()` (which weekdays are closed, lunch vs dinner slots) and `DINNER_TIMES` / `SUNDAY_TIMES`

Also in `index.html`, replace every occurrence of the deployment URL
(`https://ardor-restaurant-template-premium.vercel.app`) with the client's domain — canonical, `og:url`, `og:image`, `twitter:image` — plus `public/robots.txt` and `public/sitemap.xml`.

## 8. Forms are demo-only — wire a backend before real use

The reservation wizard and the newsletter form validate and animate but **do not send data anywhere**; the success message says so honestly. To make them real, in `src/components/Reservations.jsx` replace the `setTimeout` in `handleSubmit` with a `fetch` POST to one of:
- a form service (Formspree, Web3Forms, Basin — free tiers work),
- a small Vercel serverless function that emails via Resend/SendGrid,
- a booking widget (TheFork / OpenTable) — or link out to it instead.

Then update `reservations.successBody` in both locale files. Same pattern for the newsletter form in `src/components/Footer.jsx`.

## 9. Build & deploy

```bash
npm install
npm run dev       # local preview
npm run build     # production bundle → dist/
```

Deploys as a static site (Vercel/Netlify: framework "Vite", output `dist`). After deploying, verify: both languages end-to-end, the OG image via a share-preview tool, and Lighthouse on the production URL.
