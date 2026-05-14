# ARDOR — Audit & Upgrade Plan

A scan of the current restaurant-pro codebase and a prioritized roadmap to elevate it from a polished classic-luxe template into an **advanced, futuristic, 3D-animated high-end modern restaurant** showcase.

---

## 1. Current State Summary

**Stack**: React 18 + Vite 5 + Framer Motion 11 + R3F 8 + Three.js 0.165 + Tailwind 3.
**Pages/sections**: Navbar, Hero (3D dish), About, Dishes, Drinks, Menu (tabs), Reservations, Footer.
**Strengths**:
- Clean component decomposition, single-page scroll narrative.
- `useReducedMotion` plumbed everywhere (a11y win).
- Lazy-loaded R3F Canvas (smart for FCP).
- i18n EN/ES context already wired.
- Form labels associated via `htmlFor`.

**Overall feel today**: classic dark-luxe Spanish restaurant. **Goal**: futuristic, immersive, cinematic — more "Noma 2030" than "tapas bar".

---

## 2. Critical Issues (fix first)

### 2.1 R3F is loaded but never split out — bundle size
- `@react-three/fiber`, `@react-three/drei`, `three` are imported via `lazy()` in [Hero.jsx:5-8](src/components/Hero.jsx#L5-L8) but Vite has no `manualChunks` config in [vite.config.js](vite.config.js). Three.js alone is ~600 KB.
- **Fix**: add `build.rollupOptions.output.manualChunks` to split `three`, `@react-three/*`, `framer-motion` into separate chunks.

### 2.2 Single hero 3D scene — under-leveraged 3D
A futuristic restaurant template should treat 3D as a **first-class narrative element**, not just a hero gimmick. Currently only Hero uses R3F. About/Dishes/Drinks are flat image grids.
- **Fix**: introduce a persistent shared Canvas (`@react-three/drei`'s `View` + `tunnel-rat`) that morphs across sections (dish → wine glass → flame → restaurant interior), scroll-driven.

### 2.3 GLB model fetch is fragile
[DishScene.jsx:135-139](src/canvas/DishScene.jsx#L135-L139) probes `/models/dish.glb` with HEAD and the content-type check `!== false` is logically backwards (truthy unless explicitly `false`, which a missing header is not). It works by accident only because of the network error catch.
- **Fix**: remove the HEAD probe; use `useGLTF` inside Suspense with an `ErrorBoundary` falling back to `ProceduralDish`. Cleaner, no extra round-trip.

### 2.4 No actual GLB asset shipped
The procedural paella is decent but reads as primitive on a "futuristic high-end" template. There is no `/public/models/dish.glb`.
- **Fix**: ship a Draco/Meshopt-compressed GLB (or generate one with KitBash / Sketchfab CC0), use `useGLTF.preload()`, target ≤ 500 KB.

### 2.5 Unsplash hot-linking
Every image in About/Dishes/Drinks is fetched from `images.unsplash.com` ([Dishes.jsx:4-11](src/components/Dishes.jsx#L4-L11), [Drinks.jsx:5-9](src/components/Drinks.jsx#L5-L9)). Unreliable, slow LCP, no AVIF, no `srcset`.
- **Fix**: download, convert to AVIF + WebP, ship in `/public/img/` with `<picture>` + `srcset` and explicit `width`/`height` to prevent CLS.

### 2.6 Hero uses Cormorant + clamp(15vw) without `font-display: swap` guarantee
Cormorant is loaded with `&display=swap` (good), but the giant H1 (up to 14rem) will FOIT then FOUT massively. Add `<link rel="preload" as="font">` for the Cormorant 700-italic WOFF2 specifically.

### 2.7 Accessibility gaps
- **Color contrast**: `text-ardor-muted` is `#9CA3AF` on `#0F0F0F` (passes ~7:1) but on the white About section, `text-gray-400` for chef role is borderline. Run axe.
- **Focus rings**: Tailwind's default `outline-none` is everywhere on inputs/buttons; only the bottom-border color changes. Add explicit `focus-visible:ring-2 focus-visible:ring-ardor-red focus-visible:ring-offset-2` rings.
- **Skip link**: no "Skip to content" anchor for keyboard users.
- **Reservations form**: no client validation messages, no `aria-live` for the success state.
- **Reduced motion**: hero ember particles render at full opacity rather than being suppressed when `reducedMotion` is true (already conditional via `!reducedMotion &&`, good — but the dark vignette still animates via the Canvas `motion.div` initial/animate; gate that too).

### 2.8 SEO / metadata
[index.html](index.html) has only `title` + `description`. Missing: `og:*`, `twitter:card`, `lang="es"` toggle when locale switches, `application/ld+json` for `Restaurant` schema (huge for Google maps & rich results), favicon set, `theme-color`.

---

## 3. Visual / Design Upgrade — to "Futuristic High-End"

### 3.1 Color system overhaul
Current palette is classic Spanish-tavern: red `#E63946` + gold `#D4AF37` on near-black. Beautiful but **not futuristic**.

**Recommended futuristic-luxury palette** (keep an option to switch):
```
--bg-0:    #07070B   (deeper, slightly blue-black)
--bg-1:    #0E0E14
--surface: #15151E
--accent:  #FF3D54   (ember red — slightly more neon)
--accent-2:#FFB547   (warmer amber gold)
--neon:    #6FF7E5   (electric teal — futuristic highlight)
--text:    #F2F2F7
--muted:   #8B8B95
```
- Use `--neon` sparingly: focus rings, hover micro-accents, chart-like dividers, glow on 3D specular.
- Keep red/gold as primary, add teal as the "future" signature.

### 3.2 Typography
Cormorant + Montserrat works but is the default luxury template combo. For futuristic-luxury, try:
- **Display**: `Fraunces` (variable, optical sizing) — sci-fi-meets-serif elegance, OR keep Cormorant for the brand mark only and use `Söhne` / `Inter Display` for headings.
- **Body**: `Inter` or `Geist` — modern, neutral, supports tabular numbers for prices.
- Wire in `font-variation-settings` for weight/optical-size sweeps on hover.

### 3.3 Style direction — combine three style tokens
1. **Cinematic dark** (already there): deep blacks, dramatic spotlight gradients.
2. **Glassmorphism** for floating cards: `backdrop-blur-xl bg-white/5 border border-white/10` on Dishes/Drinks/Reservations cards.
3. **Bento grid** for the menu / featured section instead of a uniform 3-column row — varied tile sizes feel more modern.

### 3.4 Motion language
- Replace generic `easeOut` with custom cubic-bezier `[0.16, 1, 0.3, 1]` (expo-out) for a softer, more cinematic feel.
- Add **scroll-pinned chapters** (`framer-motion`'s `useScroll` + `useTransform`) so each section feels like a film cut, not a scroll.
- Add a **cursor follower** (subtle blurred glow that trails the mouse, blend-mode `screen`) — instantly futuristic, costs almost nothing.
- Add a **page transition / loading shell** with the ARDOR logo dissolving into the hero.

---

## 4. 3D / R3F Roadmap

### 4.1 Asset upgrades
- Use real PBR GLBs for: paella, wine glass, copper pan, candle flame.
- Compress with `gltf-transform optimize` (Draco + Meshopt).
- Preload next section's asset while user is reading current section.

### 4.2 Lighting & post-processing
Add `@react-three/postprocessing`:
- `Bloom` (intensity 0.6, luminanceThreshold 0.9) — instant high-end specular glow.
- `ChromaticAberration` (offset 0.0005) — subtle, cinematic.
- `Vignette` for organic edge falloff (cheaper than the CSS radial-gradient).
- `SSAO` only on desktop (gate by `dpr` + GPU tier check via `detect-gpu`).

### 4.3 Materials
- Switch plate to `MeshPhysicalMaterial` with `transmission: 0.1`, `thickness: 0.5`, `iridescence: 0.3` — porcelain that catches the light.
- Use HDRI from Poly Haven (`studio_small_03_1k.hdr`) instead of the `warehouse` preset — warmer, more food-photography-like.

### 4.4 Interaction
- Mouse-parallax the camera (`useFrame` lerps camera position toward mouse).
- Click-to-explode the dish into ingredient labels (`Html` from drei with floating tags + connector lines).
- Section-tied morphs: as scroll enters Dishes, dish reduces opacity → wine glass fades in.

### 4.5 Performance budget
- Cap `dpr` at `[1, 1.5]` on mobile (current `[1, 1.75]` is fine on desktop only — branch on `window.devicePixelRatio` + viewport).
- `frameloop="demand"` when the hero scrolls off screen; resume on intersect.
- Wrap `Canvas` in `IntersectionObserver` to pause GPU work entirely when out of view.

---

## 5. Section-by-Section Improvements

### Hero
- Add particle field (GPU, not 14 DOM spans). Use `drei`'s `Sparkles` or instanced points.
- Animated kinetic typography: each letter of `ARDOR` enters with stagger + slight 3D rotation.
- Replace static red `O` with a 3D animated ember/ring around the letter (`Html` overlay or canvas-rendered).
- Add subtle audio cue toggle (ambient restaurant murmur, muted by default with clear icon — accessibility).

### About
- Currently a flat white section — jarring contrast break. Use a **dark-to-light gradient mesh** transition (or keep dark + add an off-white card-on-dark composition).
- Replace static chef photo with an animated portrait reveal (mask-clip-path sweep).
- Add a horizontal stat strip: `12 years · 2 Michelin · 87 wines · 4 chefs` with count-up animation.

### Dishes
- Bento grid (1 large + 2 small) instead of 3-equal.
- On hover: card lifts, image zooms, **the 3D dish in background morphs to match the hovered card** (the killer feature).
- Add micro-ingredient tags (`Tagliatelle · 24h fermented`) with monospace mini-labels.

### Drinks
- Pair each cocktail with a **WebGL liquid simulation** or at minimum an animated SVG pour.
- Add a "Sommelier's pick" pinned card with a video loop (muted, autoplay, < 2 MB).

### Menu
- Keep tabbed structure (it works) but:
  - Add price filtering / dietary filters (V, GF, N) — chips, animated.
  - Tab transitions feel snappy already; add a **hover preview** on the right side (dish image fades in on item hover, desktop only).
  - Tabular numbers (`font-variant-numeric: tabular-nums`) for clean price alignment.

### Reservations
- Replace the bare form with a **multi-step wizard** (Date → Guests → Details → Confirm) with progress dots. Feels premium.
- Add real-time availability indicators (mock data is fine for a template).
- Integrate a calendar component (custom, themed) rather than the native `type="date"` which looks dated.
- Submit currently uses `setTimeout` — fine, but also wire success state into `aria-live="polite"`.

### Footer
- Add a small embedded map (lightweight: static Mapbox image or Leaflet with one marker).
- Newsletter inline form ("Receive our seasonal menu by email").
- Replace home-rolled SVG paths for socials ([Footer.jsx:5-17](src/components/Footer.jsx#L5-L17)) with **Lucide** or **Simple Icons** — the current Instagram path is geometrically wrong.

### Navbar
- Add a scroll-progress thin line under the navbar.
- Active section indicator (use `IntersectionObserver` to highlight current section link).
- On scroll-up after deep scroll: show navbar; on scroll-down: hide (classic premium pattern).

---

## 6. Performance Optimizations

| Issue | Fix | Est. Impact |
|---|---|---|
| Three.js in main bundle on first viz | `manualChunks` in vite config | -400 KB initial JS |
| Unsplash hotlinks | Self-host AVIF/WebP + `srcset` | -50% LCP |
| No image dimensions | Add `width`/`height` to all `<img>` | Eliminate CLS |
| Canvas always rendering | `frameloop="demand"` + IO pause | -40% idle GPU |
| Framer Motion full import | Use `m` + `LazyMotion` with `domAnimation` | -30 KB |
| Google Fonts blocking | Preload critical face + `font-display: optional` | -200ms FCP |
| No service worker | Add Vite PWA plugin for offline + asset caching | Repeat-view ~instant |
| `dpr={[1, 1.75]}` on mobile | Branch by screen | -25% GPU mobile |

Add `vite-plugin-compression` (brotli) and `vite-plugin-imagemin` while you're in there.

---

## 7. Code Quality & Architecture

- **No TypeScript**. For a premium template that others will fork, TS adds enormous polish and editor DX. Migrate gradually (`allowJs: true`).
- **No tests**. Add Vitest + Playwright for at least the reservation flow and the language toggle.
- **Magic strings everywhere** (colors hex repeated in CSS-in-JS — `#E63946`, `#0F0F0F`). Centralize in `tailwind.config.js` `theme.colors` and reference via classes only. Several `style={{ background: 'radial-gradient(...)' }}` blocks belong in CSS modules.
- **Particle config recomputed on every render** ([Hero.jsx:10-18](src/components/Hero.jsx#L10-L18)): `PARTICLES` is module-scope, fine — but `Math.random()` runs at module-eval, so server-rendering/hydration would mismatch. If SSR is ever added, gate with `useEffect`.
- **`dangerouslySetInnerHTML`** for the About quote ([About.jsx:40](src/components/About.jsx#L40)) — i18n strings are author-controlled so risk is low, but prefer a `<Trans>`-style component splitting on a sentinel.
- **Repeated `motion.div` viewport+initial+whileInView triplets** — extract a `<Reveal>` wrapper component. Will cut ~30% of motion boilerplate.
- **Mobile menu hamburger has no animation** between bars → X transform. One-line fix, huge polish gain.
- **No router**: fine for one-pager, but consider Next.js or TanStack Router if you want individual dish detail routes.

---

## 8. Suggested New Sections (to feel "complete")

1. **Gallery** — interactive 3D restaurant interior fly-through (R3F + scroll camera path) OR Lightbox image grid.
2. **Press & Awards** — Michelin / 50 Best logos, horizontal infinite marquee.
3. **Private Events** — separate CTA path for the lucrative private-dining buyer.
4. **Chef's Journal / Blog** — even 3 posts adds depth and SEO surface area.
5. **Loading Screen** — full-bleed logo dissolve on first paint.
6. **Cookie / consent banner** — required for EU restaurant (you're targeting Madrid).

---

## 9. Concrete Next-Step Checklist (in order)

1. [ ] Add `manualChunks` to Vite config; verify bundle with `vite build --report`.
2. [ ] Ship a real Draco-compressed GLB at `/public/models/dish.glb`; remove HEAD probe.
3. [ ] Self-host hero/about/dishes/drinks imagery as AVIF+WebP, add `width`/`height`.
4. [ ] Install `@react-three/postprocessing`, enable Bloom + ChromaticAberration + Vignette.
5. [ ] Implement persistent Canvas with section-driven 3D morph (the headline feature).
6. [ ] Extract `<Reveal>` component, refactor 7 sections to use it.
7. [ ] Replace native date input with custom calendar; convert reservations to 3-step wizard.
8. [ ] Add JSON-LD `Restaurant` schema + OG/Twitter meta + favicons.
9. [ ] Add focus-visible rings globally; run axe-core; fix contrast on white sections.
10. [ ] Migrate to TypeScript; add Vitest + Playwright smoke tests.
11. [ ] Add Loading screen + cursor follower + scroll-progress bar.
12. [ ] Introduce futuristic palette token (`--neon`) and apply to focus/hover accents.
13. [ ] Replace Footer social SVGs with Lucide.
14. [ ] Add Gallery section with R3F interior fly-through.

---

## 10. Out of Scope but Worth Considering

- **Backend integration**: real reservation system (OpenTable, SevenRooms API, or Supabase).
- **CMS**: Sanity / Contentful so the menu can be edited without code.
- **Analytics**: Plausible or Fathom (privacy-respecting, fits the brand).
- **A/B test the hero CTA** ("Reserve" vs "Book your table" vs "Reservar mesa").
- **Internationalization expansion**: FR + CA for tourists.

---

*Audit performed 2026-05-14 against branch `main` @ `ae55902`.*
