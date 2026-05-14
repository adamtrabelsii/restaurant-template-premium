# ARDOR — Tone-Down Pass (fix2)

The first pass overshot on "futuristic" and now reads more **sci-fi sports brand** than **fine-dining house**. Two specific problems to solve:

1. The 3D dish in the hero looks like Saturn / a planet, not food.
2. The color system (electric teal + heavy chromatic aberration + neon glow) is louder than a high-end restaurant should ever be.

This document specifies a targeted dial-back. The goal is **classy and quietly modern** — closer to Noma's web identity than to a Cyberpunk loading screen.

---

## 1. Why the dish looks like a planet

Looking at [src/canvas/DishScene.jsx](src/canvas/DishScene.jsx), three things combine into the planet illusion:

### 1.1 The two orbital rings around the plate
Lines 38-58 add a horizontal **emissive teal torus** at radius 2.1 and a tilted **emissive red torus** at radius 2.35:

```jsx
<mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
  <torusGeometry args={[2.1, 0.012, 16, 128]} />
  <meshStandardMaterial color="#6FF7E5" emissive="#6FF7E5" emissiveIntensity={2} toneMapped={false} />
</mesh>
<mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, Math.PI / 3]}>
  <torusGeometry args={[2.35, 0.006, 16, 128]} />
  <meshStandardMaterial color="#FF3D54" emissive="#FF3D54" emissiveIntensity={1.5} toneMapped={false} />
</mesh>
```

Two glowing rings at different tilt angles around a spherical-ish object **is the textbook Saturn silhouette**. The brain reads "ringed planet" before it reads "plate of paella". This is the primary offender.

**Fix**: delete both ring meshes entirely. Nothing replaces them — the dish should stand on its own.

### 1.2 The rice mound is a hemisphere
Line 76: `<sphereGeometry args={[1.25, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2.8]} />` — that's a partial sphere capped at ~64° latitude. It produces a smooth dome that, especially under hard rim light, reads as a planet surface.

**Fix**: break the silhouette. Either:
- Lower the dome height (use `Math.PI / 4` or `/ 5` for the theta-length cap) so it's more "rice pile" than "globe".
- Or scatter visible grains on top via small instanced boxes (`<Instances>` from drei) to give the surface texture rather than smooth shading.
- Or swap the sphere for a slightly flattened cylinder with noisy displacement.

### 1.3 Chromatic aberration is too strong
`offset={[0.0006, 0.0006]}` is roughly **2× the cinematic-tasteful range**. Combined with bloom on emissive rings, you get that visible red/cyan fringe on the plate edge — which on a circular silhouette reads as **atmospheric scattering on a planet's limb**.

**Fix**: drop to `[0.00018, 0.00018]` (barely perceptible), or disable entirely.

### 1.4 Bloom is over-cranked for food
`intensity={0.7}, luminanceThreshold={0.6}` makes the emissive rings *and* the rim of the plate glow. Food does not glow.

**Fix**: `intensity={0.25}, luminanceThreshold={0.95}` — only true specular highlights bloom; the rest of the scene stays photographic.

### 1.5 Lighting is fighting the food
[DishScene.jsx:139-143](src/canvas/DishScene.jsx#L139-L143) has a red key-fill, a **teal kicker**, and a gold accent. Teal light on cooked rice/prawns reads as alien terrain.

**Fix**: replace the teal directional light with a soft warm white. Keep one warm rim (gold) and one cool fill (subtle cool *grey*, not teal) at low intensity. Food should be lit like food photography — warm key + soft cool fill + gold rim.

### 1.6 Camera angle
At `position={[0, 1.6, 4]}, fov: 42`, the camera is high enough to see the dome of rice as the dominant shape. Drop to `[0, 1.1, 3.6]` for a more food-photography 3/4 angle — the plate elongates into an ellipse, the food gets distinct contour shadows, and the silhouette stops being circular.

### 1.7 Iridescence on porcelain
`iridescence={0.3}` plus `clearcoat={0.8}` gives the plate that rainbow-oil sheen — beautiful in jewelry, weird on dinnerware.

**Fix**: `iridescence={0}, clearcoat={0.25}, clearcoatRoughness={0.4}` — a quiet ceramic glaze, not a soap bubble.

---

## 2. Color system: "classy" recalibration

The current palette is too saturated and too cool. Restaurants at this price point cue **warmth, restraint, and confidence** — not "the future".

### 2.1 Current vs proposed tokens

| Token | Current | Proposed | Why |
|---|---|---|---|
| `ardor.red` | `#FF3D54` (neon ember) | `#A8323F` *(deep burgundy / wine)* | Less candy, more cellar. Reads as wine and copper, not energy drinks. |
| `ardor.gold` | `#FFB547` (bright amber) | `#C9A961` *(brushed brass)* | Muted brass instead of marigold; sits beside ivory without screaming. |
| `ardor.neon` | `#6FF7E5` (electric teal) | **REMOVED**, or `#7A8F88` (sage smoke) used only on charts/dividers, **never as accent text or focus glow** | Teal is the offender for "futuristic". Remove it from the visual hierarchy entirely. |
| `ardor.dark` | `#07070B` (blue-black) | `#0C0A09` *(warm carbon)* | Currently slightly cool — push warm. |
| `ardor.darker` | `#040406` | `#06050A` | Same — drop the blue cast. |
| `ardor.mid` | `#0E0E14` | `#15110F` *(espresso)* | Warm undertone for white-space contrast. |
| `ardor.surface` | `#15151E` | `#1C1815` | Same family. |
| `ardor.muted` | `#8B8B95` (cool grey) | `#A89E92` *(stone/linen)* | Warm muted reads as natural materials, not UI grey. |
| `ardor.text` | `#F2F2F7` | `#F4EFE7` *(parchment off-white)* | Pure white is cold; a hint of cream is restaurant-quality. |
| **New** `ardor.copper` | — | `#B87333` *(used VERY sparingly, no glow)* | Optional warm secondary accent for moments when you need lift. |

### 2.2 Where the neon teal currently lives — and what to replace it with

A grep across the codebase will turn up `ardor.neon` / `#6FF7E5` / `rgba(111, 247, 229, …)` in many places. Each needs a deliberate replacement:

| Location | Current | Replace with |
|---|---|---|
| Focus ring (`:focus-visible` in [index.css](src/index.css)) | `outline: 2px solid var(--neon)` | `outline: 1px solid var(--gold); outline-offset: 4px` (thin brass, more elegant) |
| `ScrollProgress` gradient | red→gold→teal | red→gold (drop teal stop), or just solid `var(--gold)` at 1px |
| `CursorFollower` glow | teal → red radial | warm amber → transparent only (60% opacity max) |
| Navbar active-section underline | teal gradient | thin solid `var(--gold)` at 60% opacity |
| Hero tagline `text-ardor-neon` | teal | `text-ardor-muted` (the eyebrow doesn't need color — letterspacing carries it) |
| Hero awards-bar dot bullets | teal pellets | `var(--gold)` at 50% opacity, or a `·` middot character |
| Hero "O" orbital ring (CSS layer) | teal border ring | **delete**; the title doesn't need ornament |
| Section eyebrow lines (Menu/Reservations/etc.) | teal gradients | gold gradients, or simply remove and use only the centered text |
| Dishes/Drinks/Menu/Gallery corner brackets | teal | `rgba(255,255,255,0.15)` — almost invisible ivory |
| Menu hover-rail (left vertical bar) | teal | warm white `rgba(255,255,255,0.4)` |
| Reservations step dots, time/guest selected state | teal background | brass: `var(--gold)` with `text-ardor-darker` |
| Reservations success checkmark ring | teal | `var(--gold)` |
| Footer social hover, newsletter focus | teal | `var(--gold)` |
| Loading-screen gradient bar | red→gold→teal | red→gold only |
| Gallery lightbox dot, Press marquee hover | teal | `var(--gold)` |

After this pass there should be **zero** teal pixels on the page.

### 2.3 Effects to remove or quiet

- **`grid-bg` (cyan grid)** in [index.css](src/index.css) — drop the teal color or remove the utility from Hero/Dishes/Menu/Gallery. A subtle warm-grey grid at 3% opacity is plenty, or just delete it.
- **Conic gradient meshes** in Hero — the current "20% red, 80% teal, 50% gold" mix is busy. Use just two stops: warm amber bottom-left, deeper red top-right, ~30% opacity each.
- **`noise::after`** opacity 0.04 — keep, it's good. Don't change.
- **`shimmer` keyframe** — no longer needed if no neon, can stay unused.
- **Animated marquee in Press** — fine, but ensure hovered item color becomes ivory or brass, not teal.

### 2.4 Typography

Display font is currently `Fraunces` — actually excellent for "classy fine-dining". **Keep it.** Just make sure:
- The italic weight you ship is `700` only (not the 900 ultra). Heavier weights start to feel like a magazine cover, not a restaurant.
- Optical-size axis: set `font-variation-settings: "opsz" 144` on the giant hero title for the elegant high-contrast cut, and `"opsz" 36` on smaller display text.

Body font is `Inter` — neutral and safe. Consider swapping to **`Söhne`** or **`Untitled Sans`** if you can license one; both have the warmer, less-tech feel Inter lacks. Otherwise leave it.

### 2.5 Hero title — the `R` styling

Currently the `O` in `ARDOR` is red. After the palette pass it'll be deep burgundy — good, but **also remove the rotating ring**. The colored letter alone is the move; the orbital ring is the part that screams "tech startup".

### 2.6 Buttons and CTAs

- Hero "Reserve a Table" CTA is currently `linear-gradient(135deg, #FF3D54, #FFB547)` with a hover swap to `#6FF7E5 → #FF3D54`. Replace with: rest `linear-gradient(135deg, #A8323F 0%, #C9A961 100%)`, hover gradient swap to solid `#F4EFE7` background with `#0C0A09` text. Quiet, two-state, no rainbow flip.
- Reservations primary submit is currently teal→gold. Make it solid brass `#C9A961` with `#0C0A09` text. No gradient.
- Reservations "Next →" stays as red→gold but with the new burgundy and brass tones — much calmer.

### 2.7 Glass surfaces

The `.glass` utility uses `rgba(255,255,255,0.04)` over a dark base — fine. But `.glass-hover:hover` adds a **teal box-shadow** (`rgba(111, 247, 229, 0.25)`). Swap to a **brass shadow**: `rgba(201, 169, 97, 0.18)`. Subtler, warmer, more "candlelight on porcelain".

---

## 3. Concrete change list (in priority order)

1. **[src/canvas/DishScene.jsx](src/canvas/DishScene.jsx)**
   - Delete the two `<mesh>` orbital rings (lines ~38–58).
   - Reduce rice dome height (theta-length `Math.PI / 4`).
   - Replace teal directional light at `[2, -2, 4]` with warm white `#FFF1DD` at 0.3.
   - Drop pepper-strip `emissiveIntensity` from `0.15` to `0`.
   - Plate material: `iridescence: 0`, `clearcoat: 0.25`.
   - Bloom: `intensity={0.25}, luminanceThreshold={0.95}`.
   - Chromatic aberration: `offset={[0.00018, 0.00018]}` or delete the pass.
   - Camera: `position={[0, 1.1, 3.6]}, fov: 38`.
   - Sparkles color: `#C9A961` (brass), count `25`, opacity `0.35`.

2. **[tailwind.config.js](tailwind.config.js)** — update the `ardor` color tokens per §2.1. Add `copper`. Keep `neon` defined for backwards-compatible search-and-replace but stop using it.

3. **[src/index.css](src/index.css)**
   - Update `:root` variables to match new tokens.
   - Change `:focus-visible` outline to `1px solid var(--gold); outline-offset: 4px`.
   - Drop teal from `::-webkit-scrollbar-thumb` gradient — make it solid brass.
   - Remove or de-saturate `grid-bg` color.
   - Adjust `.glass-hover` shadow to brass.

4. **Sweep every component** for the locations in §2.2. Replace teal usages mechanically.

5. **Hero**
   - Remove the rotating ring around the `O` (the `motion.span` border block).
   - Simplify the conic gradient mesh background to two warm stops.
   - Awards-bar pellets → middots.
   - Tagline color → muted, not neon.

6. **CTAs** per §2.6 — burgundy/brass gradients only, no teal.

7. **Press marquee, Gallery hover, Menu hover preview** — verify the brass swap looks good (these are the spots where teal is most prominent).

8. **Rebuild and visually compare against the screenshot.** The hero should now show: warm-dark room → dim brass spotlight → cream plate of food → no glowing rings → small "ARDOR" wordmark with a single burgundy "O" → quiet brass CTA.

---

## 4. Anti-patterns to keep out

When making this pass, resist the urge to:
- Add a different neon (purple, blue, etc.) "to balance" the removal. The point is **less color**, not different color.
- Replace orbital rings with "subtle particles in their place". Negative space is the upgrade.
- Keep teal "just for focus rings, it's an a11y thing". Gold at 1.5px with 4px offset passes contrast and looks expensive.
- Add a film-grain overlay to "make it cinematic". The noise utility is already there at 4%; don't push it.
- Use gradients on body text. Headings only, sparingly.

---

## 5. What's intentionally NOT changing

- The structural layout (bento for Dishes, 3-step wizard for Reservations, marquee for Press, lightbox Gallery). All good.
- Framer Motion easing `[0.16, 1, 0.3, 1]`. Stays.
- Fraunces + Inter pairing. Stays.
- Reveal/CursorFollower/ScrollProgress component architecture. Stays.
- i18n, JSON-LD, focus-visible plumbing, skip link, build chunking. All stays.

The bones are right. The skin is too loud.

---

*Audit added 2026-05-14 against branch `main` after the first upgrade pass.*
