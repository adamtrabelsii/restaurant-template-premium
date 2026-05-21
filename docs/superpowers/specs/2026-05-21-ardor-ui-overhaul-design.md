# Ardor UI Overhaul — Cinematic Depth Design

**Date:** 2026-05-21  
**Approach:** Cinematic Depth (A) — ContainerScroll dish showcase + Framer Motion scroll animations throughout  
**Stack:** React JSX · Vite · Tailwind CSS · framer-motion v11 (already installed)

---

## Overview

A full UI overhaul of the Ardor restaurant site. The centrepiece is a new `DishScroll` section (using the `ContainerScroll` component from 21st.dev) inserted between Hero and Press. Every existing section receives upgraded Framer Motion scroll animations. No new dependencies beyond what is already in `package.json`. Design rules from **impeccable** and **awesome-design-md** are applied throughout.

---

## Design Principles Applied

From **impeccable**:
- No pure black — all dark backgrounds are warm-tinted (`#06050A`, `#0C0A09`)
- No bounce/elastic easing — cinema cubic-bezier `(0.16, 1, 0.3, 1)` throughout
- Tinted neutrals — muted uses `#A89E92` (warm), never cool gray
- No nested cards — `ContainerScroll` is a standalone section, not nested

From **awesome-design-md** (luxury/fine-dining profile):
- Cinema-black canvas with extreme sparseness
- Gold accent used only for emphasis, never as fill
- Reduced-motion respected — all animations gated on existing `reducedMotion` prop

---

## Page Scroll Flow

### 1. Hero — Enhanced
**File:** `src/components/Hero.jsx`

Current state: parallax bg, letter stagger, scroll indicator.

Changes:
- Deepen `bgY` parallax from `[0, 120]` to `[0, 160]`
- Replace `rotateX` per-letter with `rotateY` for a more dimensional feel
- Add 3 ambient floating gold orbs via `motion.div` with looping `animate` (y: ±20px, opacity: 0.06→0.12, duration staggered 4s/6s/8s)
- Tighten scroll indicator: replace infinite y bounce with a `pathLength` SVG line that draws on scroll

### 2. DishScroll — New Section
**File:** `src/components/DishScroll.jsx` (new)  
**Component:** `src/components/ui/container-scroll-animation.jsx` (new)

The `ContainerScroll` component from 21st.dev adapted to JSX. Wraps a 3-dish bento grid. Inserted in `App.jsx` between `<Hero>` and `<Press>`.

**Title above card:** `"Crafted with obsession."` (Cormorant italic, clamp 2.5rem→4rem)  
**Eyebrow:** `"Signature Dishes"` (Montserrat caps, gold)

**Inside the 3D card — dish bento grid:**
- Featured dish (col-span-2): `photo-1534080564583-6be75777b70a` — Toro Tartare, €38
- Compact dish 1: `photo-1432139509613-5c4255815697` — Ibérico Presa, €42
- Compact dish 2: `photo-1559847844-5315695dadae` — Black Truffle Risotto, €56
- Each dish card: image + gradient overlay + name + price, stagger `delay={i * 0.12}` inside the scroll card

**Animation (from `container-scroll-animation.jsx`):**
- `rotateX`: `[20, 0]` over `scrollYProgress [0, 1]`
- `scale`: `[1.05, 1]` (desktop) / `[0.7, 0.9]` (mobile)
- `translateY` on title: `[0, -100]`

### 3. Press — Enhanced
**File:** `src/components/Press.jsx`

- Each press logo/badge: add `whileInView={{ scale: [0.92, 1.03, 1] }}` pop on enter, `once: true`
- Marquee: no change to CSS animation (speed-up requires JS orchestration, out of scope for this pass)

### 4. About — Enhanced
**File:** `src/components/About.jsx`

- Vertical accent line: change from `whileInView scaleY` to `useScroll` + `useTransform` so it draws as the section scrolls into view (scroll-linked, not snap-on-enter)
- Stats strip: add `x: [-40, 0]` slide-in per stat with `staggerChildren: 0.07` on the grid wrapper

### 5. Dishes — Enhanced
**File:** `src/components/Dishes.jsx`

- Inside each `DishCard`: add `useScroll` + `useTransform` on the inner image for a `y: [30, -30]` parallax (image moves slower than card scroll)
- Featured card (i === 0): add `shimmer` class (already defined in `index.css`) on the image overlay
- Hover: existing `whileHover scale: 1.08` kept; add `boxShadow` transition to gold glow via `whileHover` on the article

### 6. Gallery — Enhanced
**File:** `src/components/Gallery.jsx`

- Each image: `whileHover={{ scale: 1.06, filter: 'brightness(1.12)' }}` with `transition: { duration: 0.6, ease: [0.16,1,0.3,1] }`
- Reveal entry: blur 8px→0 + y 40→0

### 7. Drinks, Menu, Reservations, Footer — Consistent Reveal Upgrades
**Files:** respective component files

- Upgrade `Reveal` component (`src/components/common/Reveal.jsx`) to support a `blur` prop (default `true`): adds `filter: blur(6px)→blur(0)` to all existing reveals
- Section headers: add a gold hairline `scaleX 0→1` draw under each `<h2>` on enter

---

## Component Architecture

### `src/components/ui/container-scroll-animation.jsx`
Direct JSX port of the 21st.dev TSX component. Changes from original:
- Remove TypeScript types
- Replace `"use client"` directive (not needed in Vite/React)
- Keep all framer-motion hooks: `useScroll`, `useTransform`, `useRef`, `useState`, `useEffect`

### `src/components/DishScroll.jsx`
New standalone section. Uses `ContainerScroll` with:
- `titleComponent`: eyebrow + heading markup
- `children`: 3-dish bento grid (plain divs, Tailwind, Unsplash images)
- Receives `reducedMotion` prop, passes appropriate animation flags

### `src/components/common/Reveal.jsx`
Add optional `blur` prop (default `true`). When true, initial state includes `filter: 'blur(6px)'` and final state `filter: 'blur(0px)'`. Existing `direction`, `delay`, `className` props unchanged.

---

## Files Changed

| Status | File |
|--------|------|
| NEW | `src/components/ui/container-scroll-animation.jsx` |
| NEW | `src/components/DishScroll.jsx` |
| MOD | `src/App.jsx` — insert `<DishScroll>` between Hero and Press |
| MOD | `src/components/Hero.jsx` — deeper parallax, rotateY letters, ambient orbs |
| MOD | `src/components/About.jsx` — scroll-linked line draw, stat stagger |
| MOD | `src/components/Dishes.jsx` — image parallax, shimmer, hover glow |
| MOD | `src/components/Gallery.jsx` — hover zoom + brightness |
| MOD | `src/components/common/Reveal.jsx` — blur prop |
| MOD | `src/components/Press.jsx` — whileInView badge pop |
| MOD | `src/components/Drinks.jsx` — Reveal blur upgrade (via Reveal component) |
| MOD | `src/components/Menu.jsx` — Reveal blur upgrade (via Reveal component) |
| MOD | `src/components/Reservations.jsx` — Reveal blur upgrade (via Reveal component) |

---

## Out of Scope

- TypeScript migration (project uses JSX)
- shadcn/ui setup (not needed; component ported directly to JSX)
- Backend/data changes
- New fonts or Tailwind theme changes (existing palette is kept)
- Marquee velocity animation (requires additional orchestration complexity)
