# ARDOR Pro — React Premium Version
**Date:** 2026-05-11
**Status:** Approved

---

## Overview

A second, premium version of the ARDOR restaurant showcase website, living in `restaurant-pro/` alongside the existing static `restaurant/` version. Intended as the **high-end offering** to sell to clients — same brand identity, dramatically elevated with real-time WebGL 3D, Framer Motion scroll animations, and a React component architecture.

**Positioning:**
- `restaurant/` → low-cost static HTML deliverable
- `restaurant-pro/` → premium React deliverable

**Tagline:** *"Where Passion Meets the Plate"* (unchanged)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite + `@vitejs/plugin-react` | Build tooling, HMR dev server |
| React 18 | Component architecture |
| Framer Motion | All 2D animations (scroll reveals, hover, page mount) |
| Three.js + `@react-three/fiber` | WebGL 3D runtime |
| `@react-three/drei` | R3F helpers: `Environment`, `useTexture`, `OrbitControls` |
| Tailwind CSS (npm) | Utility styling — same design tokens as static version |
| Google Fonts | Cormorant + Montserrat (same as static) |

---

## Design System

Identical to the static version:

| Role | Value |
|------|-------|
| Background dark | `#0F0F0F` |
| Background mid | `#111111` |
| Background darker | `#0A0A0A` |
| Accent red | `#E63946` |
| Accent gold | `#D4AF37` |
| Text muted | `#9CA3AF` |

Fonts: `Cormorant` (headings, display, italic) · `Montserrat` (body, labels, caps)

---

## File Structure

```
restaurant-pro/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Dishes.jsx
    │   ├── Drinks.jsx
    │   ├── Menu.jsx
    │   ├── Reservations.jsx
    │   └── Footer.jsx
    └── canvas/
        └── DishScene.jsx
```

---

## Architecture

**Single-page SPA.** `App.jsx` renders all 8 section components in sequence — no React Router, no global state, no data fetching. All content is hardcoded (same as static version). Each component is fully self-contained.

---

## Sections & Animation Spec

### 1. Navbar (`Navbar.jsx`)
- Fixed, `z-50`
- `useScroll` from Framer Motion drives two `useMotionValue` values: `backdropBlur` (0 → 12px) and `backgroundColor` (transparent → `rgba(0,0,0,0.7)`) as the user scrolls past 50px
- Logo: `ARD`**O**`R` — the O in `text-red-500`
- Mobile drawer: `AnimatePresence` with `motion.div` slide-down (`y: -20 → 0, opacity: 0 → 1`)

### 2. Hero (`Hero.jsx`)
- Full-screen (`min-h-screen`), dark background
- Text block: Framer Motion `staggerChildren: 0.15` on mount — eyebrow, title, tagline each fade+slide up in sequence
- **Centrepiece:** Full-width `<Canvas>` (`@react-three/fiber`) rendered behind the text via `position: absolute, inset: 0`. Contains `<DishScene>` centred in the scene.
- Ember particles: 14 `motion.div` elements, each `animate={{ y: [-0, -120], opacity: [0.8, 0] }}` with `transition={{ repeat: Infinity, delay: random(0–5s), duration: random(3–6s) }}`
- CTA button: `whileHover={{ scale: 1.04 }}`, `whileTap={{ scale: 0.97 }}`
- Scroll indicator: `motion.div` bouncing with `animate={{ y: [0, 10, 0] }}` loop

### 3. About (`About.jsx`)
- White background, two-column layout
- Left (quote + chef): `motion.div` `whileInView={{ opacity: 1, x: 0 }}` from `x: -40`
- Right (image): `motion.div` `whileInView={{ opacity: 1, x: 0 }}` from `x: 40`, with `0.15s` delay
- Red vertical rule animates height from 0 → 100% via `motion.div` `scaleY`

### 4. Signature Dishes (`Dishes.jsx`)
- Dark background (`#111111`), 3-column card grid
- Each card has a **200×200px `<Canvas>`** rendering its own `<DishScene hovered={isHovered} texture={dishImageUrl} />`
- Card `onMouseEnter/Leave` sets `isHovered` state — passed to `DishScene` to accelerate spin
- Card container: `whileInView` fade+slide-up with `staggerChildren: 0.1`
- Card border: `whileHover={{ borderColor: 'rgba(230,57,70,0.4)' }}`

### 5. Drinks & Bar (`Drinks.jsx`)
- Very dark background (`#0A0A0A`), 3-column card grid
- **No R3F** — pure Framer Motion ripple effect on hover
- Ripple: absolute `motion.div` inside each card, `whileHover` triggers `animate={{ scale: [0, 4], opacity: [0.4, 0] }}` transition `duration: 0.7`
- Image: `whileHover={{ scale: 1.05 }}` zoom
- Cards: `whileInView` stagger reveal same as Dishes

### 6. Menu Preview (`Menu.jsx`)
- White background, tab interface
- `useState` for active tab
- `<AnimatePresence mode="wait">` wraps tab panel — exiting panel animates `opacity: 0, y: -10`, entering panel animates `opacity: 1, y: 0`
- Active tab underline: `motion.div` layoutId="underline" slides between tabs with `layout` animation

### 7. Reservations (`Reservations.jsx`)
- Dark background, centred form (max-width 560px)
- Input focus: `motion.div` animated underline scales from 0 → 1 on focus
- Submit button: `whileHover={{ backgroundColor: '#E63946' }}`, `whileTap={{ scale: 0.97 }}`
- On submit: 1.2s timeout → success message fades in via `AnimatePresence`

### 8. Footer (`Footer.jsx`)
- `#111111`, 3-column layout — identical content to static version
- Red top rule: `motion.div` `whileInView={{ scaleX: 1 }}` from `scaleX: 0` (draws in from left)
- Social icons: `whileHover={{ color: '#E63946', y: -2 }}`

---

## 3D Scene Spec (`canvas/DishScene.jsx`)

**Geometry:**
- Plate rim: `<TorusGeometry args={[1.2, 0.10, 32, 128]}>`
- Plate body: `<CylinderGeometry args={[1.15, 1.15, 0.08, 64]}>`
- Food surface: `<CircleGeometry args={[1.1, 64]}>` with `useTexture(textureUrl)` mapped on

**Materials:**
- Rim + body: `<meshStandardMaterial color="#F0EDE8" metalness={0.2} roughness={0.15}>` — warm ceramic
- Food: `<meshStandardMaterial map={texture} roughness={0.8}>`

**Lighting:**
- `<Environment preset="sunset">` from Drei — warm ambient matching red/gold palette
- `<pointLight color="#E63946" intensity={2} position={[0, -2, 0]}>` — red glow beneath plate
- `<pointLight color="#D4AF37" intensity={0.8} position={[3, 3, 3]}>` — gold highlight

**Animation (`useFrame`):**
- Base spin: `mesh.rotation.y += 0.004` per frame
- When `hovered`: `mesh.rotation.y += 0.02` (5× faster)
- Tilt: `mesh.rotation.x = -0.3` (constant — shows plate surface)

**Camera:** `position={[0, 1.5, 4]}`, `fov={45}`, no controls (no user interaction with the canvas)

---

## Animation Summary

| Element | Technique | Trigger |
|---------|-----------|---------|
| Navbar blur | `useScroll` motion values | Scroll > 50px |
| Hero text | `staggerChildren` mount | On load |
| Hero dish | R3F `useFrame` | Continuous |
| Ember particles | `motion.div` repeat infinite | On load |
| Section reveals | `whileInView` | Scroll into view |
| Dish spin accelerate | R3F `useFrame` + hovered state | Hover |
| Drink ripple | `whileHover` `motion.div` | Hover |
| Menu tab switch | `AnimatePresence` + `layoutId` | Click |
| Footer rule | `whileInView scaleX` | Scroll into view |
| Form success | `AnimatePresence` | Form submit |

All animations respect `prefers-reduced-motion` via Framer Motion's built-in `useReducedMotion` hook applied in `App.jsx`.

---

## What's NOT included

- Backend / real reservation system (same as static — form is cosmetic)
- React Router / multiple pages
- `canvas/DrinkScene.jsx` — reserved, not built in this version
- GLTF model loading
- Unit tests

---

## Folder Context

```
C:/Adem/CODING/projects/
├── restaurant/          ← static HTML (low-cost deliverable)
└── restaurant-pro/      ← React + R3F (premium deliverable)
```
