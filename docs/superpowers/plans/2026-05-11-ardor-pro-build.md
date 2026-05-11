# ARDOR Pro — React Premium Version Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic React restaurant website in `restaurant-pro/` using Vite, Framer Motion, and React Three Fiber — the premium counterpart to the existing static `restaurant/` site.

**Architecture:** Single-page SPA, no router. `App.jsx` renders 8 self-contained section components in order. All 2D animation via Framer Motion. Real-time 3D via React Three Fiber — a reusable `DishScene` component renders a PBR ceramic plate inside `<Canvas>` elements in the Hero and Dishes sections.

**Tech Stack:** Vite 5, React 18, Framer Motion 11, Three.js, @react-three/fiber, @react-three/drei, Tailwind CSS 3 (npm), PostCSS, Autoprefixer, Google Fonts (Cormorant + Montserrat)

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies and scripts |
| `vite.config.js` | Vite + React plugin config |
| `tailwind.config.js` | ARDOR design tokens (colors, fonts) |
| `postcss.config.js` | Tailwind + Autoprefixer pipeline |
| `index.html` | HTML shell, Google Fonts import |
| `src/main.jsx` | React DOM root mount |
| `src/App.jsx` | Section orchestrator + `useReducedMotion` |
| `src/index.css` | Tailwind directives + CSS vars + global styles |
| `src/canvas/DishScene.jsx` | R3F: PBR plate geometry, lighting, useFrame spin |
| `src/components/Navbar.jsx` | Fixed nav, useScroll blur, mobile drawer |
| `src/components/Hero.jsx` | Full-screen hero, R3F Canvas, stagger text, embers |
| `src/components/About.jsx` | Two-column reveal, quote, chef avatar |
| `src/components/Dishes.jsx` | 3-column dish cards with mini R3F canvases |
| `src/components/Drinks.jsx` | 3-column drink cards with FM ripple |
| `src/components/Menu.jsx` | Tabbed menu with AnimatePresence + layoutId |
| `src/components/Reservations.jsx` | Form with animated underlines + success state |
| `src/components/Footer.jsx` | 3-column footer, scaleX rule animation |

---

### Task 1: Project Scaffold

**Files:**
- Create: `restaurant-pro/package.json`
- Create: `restaurant-pro/vite.config.js`
- Create: `restaurant-pro/tailwind.config.js`
- Create: `restaurant-pro/postcss.config.js`
- Create: `restaurant-pro/index.html`
- Create: `restaurant-pro/src/main.jsx`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "ardor-pro",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^9.105.0",
    "@react-three/fiber": "^8.16.0",
    "framer-motion": "^11.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "three": "^0.165.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Cormorant', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        ardor: {
          red:    '#E63946',
          gold:   '#D4AF37',
          dark:   '#0F0F0F',
          darker: '#0A0A0A',
          mid:    '#111111',
          muted:  '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ARDOR — Where Passion Meets the Plate</title>
  <meta name="description" content="ARDOR — Modern Spanish fine dining. Reserve your table today." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 6: Create `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 7: Install dependencies**

Run in `restaurant-pro/`:
```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 8: Commit**

```bash
git add package.json vite.config.js tailwind.config.js postcss.config.js index.html src/main.jsx
git commit -m "feat: scaffold Vite + React + Framer Motion + R3F project"
```

---

### Task 2: Global Styles + App Shell

**Files:**
- Create: `src/index.css`
- Create: `src/App.jsx`

- [ ] **Step 1: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --red:    #E63946;
  --gold:   #D4AF37;
  --dark:   #0F0F0F;
  --darker: #0A0A0A;
  --mid:    #111111;
  --muted:  #9CA3AF;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background: var(--dark);
  color: #F5F5F5;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--dark); }
::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }
```

- [ ] **Step 2: Create `src/App.jsx`**

```jsx
import { useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Dishes from './components/Dishes'
import Drinks from './components/Drinks'
import Menu from './components/Menu'
import Reservations from './components/Reservations'
import Footer from './components/Footer'

export default function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <main>
      <Navbar reducedMotion={prefersReducedMotion} />
      <Hero reducedMotion={prefersReducedMotion} />
      <About reducedMotion={prefersReducedMotion} />
      <Dishes reducedMotion={prefersReducedMotion} />
      <Drinks reducedMotion={prefersReducedMotion} />
      <Menu />
      <Reservations />
      <Footer reducedMotion={prefersReducedMotion} />
    </main>
  )
}
```

- [ ] **Step 3: Create placeholder stubs for all components** (so the app compiles)

Create each of these files with a minimal placeholder — replace one at a time in later tasks:

`src/components/Navbar.jsx`:
```jsx
export default function Navbar() { return <nav style={{height:60,background:'#111'}} /> }
```

`src/components/Hero.jsx`:
```jsx
export default function Hero() { return <section style={{minHeight:'100vh',background:'#0F0F0F'}} /> }
```

`src/components/About.jsx`:
```jsx
export default function About() { return <section style={{minHeight:400,background:'#fff'}} /> }
```

`src/components/Dishes.jsx`:
```jsx
export default function Dishes() { return <section style={{minHeight:400,background:'#111'}} /> }
```

`src/components/Drinks.jsx`:
```jsx
export default function Drinks() { return <section style={{minHeight:400,background:'#0A0A0A'}} /> }
```

`src/components/Menu.jsx`:
```jsx
export default function Menu() { return <section style={{minHeight:400,background:'#fff'}} /> }
```

`src/components/Reservations.jsx`:
```jsx
export default function Reservations() { return <section style={{minHeight:400,background:'#0F0F0F'}} /> }
```

`src/components/Footer.jsx`:
```jsx
export default function Footer() { return <footer style={{minHeight:200,background:'#111'}} /> }
```

`src/canvas/DishScene.jsx`:
```jsx
export default function DishScene() { return null }
```

- [ ] **Step 4: Start dev server and verify**

```bash
npm run dev
```

Open `http://localhost:5173`. Expected: dark page with coloured placeholder sections stacked vertically, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/
git commit -m "feat: add global styles, App shell, and component stubs"
```

---

### Task 3: DishScene — 3D Plate Component

**Files:**
- Replace: `src/canvas/DishScene.jsx`

- [ ] **Step 1: Create `src/canvas/` directory and `DishScene.jsx`**

```bash
mkdir -p src/canvas
```

```jsx
import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { TextureLoader } from 'three'

export default function DishScene({ hovered = false, textureUrl }) {
  const groupRef = useRef()
  const texture = useLoader(TextureLoader, textureUrl)

  useFrame(() => {
    if (!groupRef.current) return
    const speed = hovered ? 0.02 : 0.004
    groupRef.current.rotation.y += speed
  })

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <pointLight color="#E63946" intensity={3} position={[0, -2, 1]} />
      <pointLight color="#D4AF37" intensity={1} position={[3, 3, 3]} />

      <group ref={groupRef} rotation={[-0.3, 0, 0]}>
        {/* Plate rim */}
        <mesh>
          <torusGeometry args={[1.2, 0.10, 32, 128]} />
          <meshStandardMaterial color="#F0EDE8" metalness={0.2} roughness={0.15} />
        </mesh>

        {/* Plate body */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.08, 64]} />
          <meshStandardMaterial color="#F5F2EE" metalness={0.1} roughness={0.2} />
        </mesh>

        {/* Food surface (textured disc) */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 64]} />
          <meshStandardMaterial map={texture} roughness={0.8} />
        </mesh>
      </group>
    </>
  )
}
```

- [ ] **Step 2: Verify DishScene is importable**

The dev server should still run without errors after saving. No visual change yet — DishScene is only wired up in Hero and Dishes tasks.

- [ ] **Step 3: Commit**

```bash
git add src/canvas/DishScene.jsx
git commit -m "feat: add DishScene R3F component with PBR ceramic plate and texture"
```

---

### Task 4: Navbar

**Files:**
- Replace: `src/components/Navbar.jsx`

- [ ] **Step 1: Replace `src/components/Navbar.jsx`**

```jsx
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Dishes', href: '#dishes' },
  { label: 'Drinks', href: '#drinks' },
  { label: 'Menu', href: '#menu' },
]

export default function Navbar({ reducedMotion }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 50)
  })

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.3 }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6"
      animate={{
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px',
        backgroundColor: scrolled ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      }}
      transition={transition}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-cormorant text-2xl font-bold tracking-widest text-white select-none">
          ARD<span className="text-ardor-red">O</span>R
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-montserrat text-xs font-medium tracking-widest uppercase text-ardor-muted">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-white transition-colors duration-200">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#reservations"
               className="border border-ardor-red text-ardor-red px-4 py-2 rounded-full hover:bg-ardor-red hover:text-white transition-all duration-200">
              Reserve
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          {[0, 1, 2].map(i => (
            <span key={i} className="w-6 h-0.5 bg-white block" />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="md:hidden mt-4 pb-4 border-t border-white/10"
          >
            <ul className="flex flex-col gap-4 pt-4 px-2 font-montserrat text-xs font-medium tracking-widest uppercase text-ardor-muted">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setMobileOpen(false)}
                     className="block hover:text-white transition-colors duration-200">{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#reservations" onClick={() => setMobileOpen(false)}
                   className="inline-block border border-ardor-red text-ardor-red px-4 py-2 rounded-full">
                  Reserve
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
```

- [ ] **Step 2: Verify navbar**

Open `http://localhost:5173`. Expected: dark navbar at top. Scroll down → background becomes frosted glass. On narrow viewport (DevTools mobile) → hamburger visible, click → drawer slides down.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add Navbar with Framer Motion scroll blur and mobile drawer"
```

---

### Task 5: Hero Section

**Files:**
- Replace: `src/components/Hero.jsx`

- [ ] **Step 1: Replace `src/components/Hero.jsx`**

```jsx
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import DishScene from '../canvas/DishScene'

const DISH_TEXTURE = 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=512&q=80'

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  bottom: `${Math.random() * 40}%`,
  size: Math.random() * 4 + 2,
  color: i % 2 === 0 ? '#E63946' : '#D4AF37',
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 3,
}))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero({ reducedMotion }) {
  const motionProps = reducedMotion
    ? {}
    : { variants: container, initial: 'hidden', animate: 'show' }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-ardor-dark overflow-hidden">

      {/* R3F Canvas — full background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
          <Suspense fallback={null}>
            <DishScene textureUrl={DISH_TEXTURE} />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(230,57,70,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />

      {/* Ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {!reducedMotion && PARTICLES.map(p => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{ left: p.left, bottom: p.bottom, width: p.size, height: p.size, background: p.color }}
            animate={{ y: [0, -120], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Text content */}
      <motion.div className="relative z-10 text-center px-6 flex flex-col items-center" {...motionProps}>
        <motion.p
          variants={item}
          className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-muted mb-6"
        >
          Madrid · Est. 2018
        </motion.p>

        <motion.h1
          variants={item}
          className="font-cormorant font-bold italic leading-none text-white mb-4 select-none"
          style={{ fontSize: 'clamp(5rem, 15vw, 14rem)', letterSpacing: '-0.02em' }}
        >
          ARD<span className="text-ardor-red">O</span>R
        </motion.h1>

        <motion.p
          variants={item}
          className="font-cormorant text-xl md:text-2xl italic text-ardor-muted mb-10 tracking-wide"
        >
          Where Passion Meets the Plate
        </motion.p>

        <motion.a
          variants={item}
          href="#reservations"
          className="font-montserrat text-sm tracking-[0.3em] uppercase bg-ardor-red text-white px-10 py-4 mt-4"
          whileHover={reducedMotion ? {} : { scale: 1.04, backgroundColor: '#fff', color: '#0F0F0F' }}
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          Reserve a Table
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        animate={reducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="font-montserrat text-xs tracking-widest uppercase text-ardor-muted">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 0v18M1 11l7 7 7-7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify Hero**

Open `http://localhost:5173`. Expected:
- Full-screen dark section
- Huge italic "ARDOR" text with red O, staggered fade-in on load
- 3D plate spinning slowly in the background (may take 1–2s to load texture)
- Red + gold ember particles floating upward
- Bouncing scroll arrow at bottom
- "Reserve a Table" button scales on hover

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add Hero section with R3F DishScene, Framer Motion stagger, and ember particles"
```

---

### Task 6: About Section

**Files:**
- Replace: `src/components/About.jsx`

- [ ] **Step 1: Replace `src/components/About.jsx`**

```jsx
import { motion } from 'framer-motion'

const revealLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const revealRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
}

export default function About({ reducedMotion }) {
  const vp = { once: true, amount: 0.2 }
  const initial = reducedMotion ? false : 'hidden'
  const whileInView = reducedMotion ? {} : 'show'

  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left: quote */}
        <motion.div variants={revealLeft} initial={initial} whileInView={whileInView} viewport={vp}>
          <div className="flex gap-6 items-start">
            {/* Animated red rule */}
            <motion.div
              className="w-1 bg-ardor-red rounded flex-shrink-0"
              initial={reducedMotion ? false : { scaleY: 0, originY: 0 }}
              whileInView={reducedMotion ? {} : { scaleY: 1 }}
              viewport={vp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ height: '100%' }}
            />
            <div>
              <p
                className="font-cormorant italic text-ardor-dark leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                "Fire. Flavor.<br />Feeling."
              </p>
              <p className="font-montserrat text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
                Born in the kitchens of Madrid, ARDOR brings the untamed spirit of Spanish cuisine to every plate.
                We cook with charcoal, patience, and a relentless obsession with flavour — from the finest Ibérico
                to the freshest coastal catch.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ardor-red flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=96&q=80"
                    alt="Head chef at ARDOR"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-cormorant font-semibold text-ardor-dark text-lg">Chef Alejandro Vega</p>
                  <p className="font-montserrat text-xs text-gray-400 tracking-widest uppercase">Executive Chef & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div variants={revealRight} initial={initial} whileInView={whileInView} viewport={vp}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="ARDOR kitchen atmosphere"
              className="w-full h-96 md:h-[28rem] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-white/70">Madrid, Spain</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify About**

Scroll to About. Expected: white section, quote slides in from left, image slides in from right, red vertical rule draws down, chef avatar visible.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: add About section with Framer Motion slide-in reveals"
```

---

### Task 7: Dishes Section

**Files:**
- Replace: `src/components/Dishes.jsx`

- [ ] **Step 1: Replace `src/components/Dishes.jsx`**

```jsx
import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import DishScene from '../canvas/DishScene'

const DISHES = [
  {
    id: 1,
    name: 'Paella Valenciana',
    description: 'Saffron bomba rice, free-range rabbit, green beans, slow-cooked over orange wood fire.',
    price: '€28',
    texture: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=512&q=80',
  },
  {
    id: 2,
    name: 'Secreto Ibérico',
    description: 'Hidden cut of pure-bred Ibérico pork, charcoal grilled, Pedro Ximénez reduction, roasted peppers.',
    price: '€34',
    texture: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=512&q=80',
  },
  {
    id: 3,
    name: 'Gambas al Ajillo',
    description: 'Wild Atlantic prawns, sizzling in garlic, guindilla chilli, dry sherry, served in a clay cazuela.',
    price: '€22',
    texture: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=512&q=80',
  },
]

function DishCard({ dish, reducedMotion, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="bg-ardor-dark border border-white/5 overflow-hidden"
        animate={{ borderColor: hovered ? 'rgba(230,57,70,0.4)' : 'rgba(255,255,255,0.05)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Mini R3F canvas */}
        <div className="h-64 bg-black/30">
          <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
            <Suspense fallback={null}>
              <DishScene hovered={hovered} textureUrl={dish.texture} />
            </Suspense>
          </Canvas>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-cormorant font-semibold text-white text-xl">{dish.name}</h3>
            <span className="font-montserrat text-ardor-gold text-sm font-medium ml-4 flex-shrink-0">{dish.price}</span>
          </div>
          <p className="font-montserrat text-ardor-muted text-xs leading-relaxed">{dish.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Dishes({ reducedMotion }) {
  return (
    <section id="dishes" className="bg-ardor-mid py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">Our Specialities</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Platos Estrella
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {DISHES.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} reducedMotion={reducedMotion} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify Dishes**

Scroll to Dishes. Expected: dark section, 3 cards each with a live 3D spinning plate. Hover over a card → plate spins faster, border glows red.

- [ ] **Step 3: Commit**

```bash
git add src/components/Dishes.jsx
git commit -m "feat: add Dishes section with per-card R3F canvases and hover-accelerated spin"
```

---

### Task 8: Drinks Section

**Files:**
- Replace: `src/components/Drinks.jsx`

- [ ] **Step 1: Replace `src/components/Drinks.jsx`**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DRINKS = [
  {
    id: 1,
    name: 'Sangria Ardiente',
    label: 'Signature',
    description: 'Tempranillo, blood orange, cinnamon, vanilla, seasonal berries.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80',
    alt: 'Sangria Ardiente cocktail',
  },
  {
    id: 2,
    name: 'Cava Blanco',
    label: 'Refreshing',
    description: 'Cava Brut, elderflower, cucumber, fresh mint, splash of tonic.',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80',
    alt: 'Cava Blanco cocktail',
  },
  {
    id: 3,
    name: 'Fuego Negro',
    label: 'Bold',
    description: 'Mezcal, activated charcoal, smoked honey syrup, lime, chilli salt rim.',
    image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=500&q=80',
    alt: 'Fuego Negro cocktail',
  },
]

function DrinkCard({ drink, reducedMotion, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer"
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="border border-white/5"
        animate={{ borderColor: hovered ? 'rgba(230,57,70,0.3)' : 'rgba(255,255,255,0.05)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="overflow-hidden h-64">
          <motion.img
            src={drink.image}
            alt={drink.alt}
            className="w-full h-full object-cover"
            animate={reducedMotion ? {} : { scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
        <div className="p-6 bg-ardor-dark">
          <h3 className="font-cormorant font-semibold text-white text-xl mb-1">{drink.name}</h3>
          <p className="font-montserrat text-ardor-gold text-xs tracking-widest uppercase mb-3">{drink.label}</p>
          <p className="font-montserrat text-ardor-muted text-xs leading-relaxed">{drink.description}</p>
        </div>
      </motion.div>

      {/* Framer Motion ripple overlay */}
      <AnimatePresence>
        {hovered && !reducedMotion && (
          <motion.div
            key="ripple"
            className="absolute rounded-full pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              width: 80,
              height: 80,
              marginTop: -40,
              marginLeft: -40,
              background: 'rgba(230, 57, 70, 0.25)',
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Drinks({ reducedMotion }) {
  return (
    <section id="drinks" className="bg-ardor-darker py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">Cocktails & Wine</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            La Barra
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
          <p className="font-montserrat text-ardor-muted text-sm mt-5 max-w-md mx-auto">
            Handcrafted cocktails inspired by the flavours of Spain. Each glass tells a story.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {DRINKS.map((drink, i) => (
            <DrinkCard key={drink.id} drink={drink} reducedMotion={reducedMotion} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify Drinks**

Scroll to Drinks. Expected: very dark section, 3 cocktail cards. Hover → image zooms slightly, red ripple radiates from centre and fades out.

- [ ] **Step 3: Commit**

```bash
git add src/components/Drinks.jsx
git commit -m "feat: add Drinks section with Framer Motion ripple and image zoom on hover"
```

---

### Task 9: Menu Section

**Files:**
- Replace: `src/components/Menu.jsx`

- [ ] **Step 1: Replace `src/components/Menu.jsx`**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = ['tapas', 'mains', 'postres', 'bebidas']

const TAB_LABELS = { tapas: 'Tapas', mains: 'Mains', postres: 'Postres', bebidas: 'Bebidas' }

const MENU_ITEMS = {
  tapas: [
    { name: 'Pan con Tomate', desc: 'Sourdough, grated heirloom tomato, Arbequina oil, sea salt', price: '€8' },
    { name: 'Patatas Bravas', desc: 'Crispy potatoes, smoky bravas sauce, garlic alioli', price: '€9' },
    { name: 'Croquetas de Jamón', desc: 'Hand-rolled jamón ibérico croquettes, béchamel, crispy crumb', price: '€12' },
    { name: 'Pimientos de Padrón', desc: 'Blistered Padrón peppers, flor de sal, lemon', price: '€9' },
  ],
  mains: [
    { name: 'Paella Valenciana', desc: 'Saffron bomba rice, rabbit, beans, orange wood fire (for 2)', price: '€56' },
    { name: 'Secreto Ibérico', desc: 'Charcoal-grilled Ibérico pork, PX reduction, peppers', price: '€34' },
    { name: 'Lubina a la Sal', desc: 'Whole sea bass baked in salt crust, garlic butter, capers', price: '€38' },
    { name: 'Cochinillo Asado', desc: 'Segovian suckling pig, slow-roasted 6 hours, apple compote', price: '€42' },
  ],
  postres: [
    { name: 'Crema Catalana', desc: 'Classic custard, caramelised crust, orange zest', price: '€9' },
    { name: 'Churros con Chocolate', desc: 'Fried dough, cinnamon sugar, thick dark chocolate dipping sauce', price: '€11' },
    { name: 'Tarta de Santiago', desc: 'Almond cake, powdered sugar cross, Pedro Ximénez ice cream', price: '€10' },
  ],
  bebidas: [
    { name: 'Sangria Ardiente', desc: 'House red wine, blood orange, cinnamon, berries', price: '€14' },
    { name: 'Rioja Reserva', desc: 'Bodegas Muga, aged 18 months in oak, deep cherry notes', price: '€12' },
    { name: 'Agua de Valencia', desc: "Fresh orange juice, Cava, vodka, gin — Valencia's signature", price: '€13' },
  ],
}

export default function Menu() {
  const [active, setActive] = useState('tapas')

  return (
    <section id="menu" className="bg-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">Explore</p>
          <h2 className="font-cormorant font-bold text-ardor-dark" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Nuestra Carta
          </h2>
          <div className="w-16 h-px bg-ardor-red mx-auto mt-5" />
        </motion.div>

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative font-montserrat text-xs tracking-[0.3em] uppercase px-6 py-3 cursor-pointer whitespace-nowrap transition-colors duration-200"
              style={{ color: active === tab ? '#0F0F0F' : '#9CA3AF' }}
            >
              {TAB_LABELS[tab]}
              {active === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-ardor-red"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-5"
          >
            {MENU_ITEMS[active].map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-baseline border-b border-dotted border-gray-200 pb-4 last:border-0"
              >
                <div>
                  <p className="font-cormorant font-semibold text-ardor-dark text-lg">{item.name}</p>
                  <p className="font-montserrat text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
                <span className="font-montserrat text-ardor-red text-sm font-medium ml-6 flex-shrink-0">{item.price}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify Menu**

Scroll to Menu. Expected: white section, 4 tabs. Click a tab → underline slides to it (spring animation), panel fades out/in. Prices in red, names in Cormorant.

- [ ] **Step 3: Commit**

```bash
git add src/components/Menu.jsx
git commit -m "feat: add Menu section with AnimatePresence tab transitions and layoutId underline"
```

---

### Task 10: Reservations Section

**Files:**
- Replace: `src/components/Reservations.jsx`

- [ ] **Step 1: Replace `src/components/Reservations.jsx`**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FIELD_CLASS = 'w-full bg-transparent border-b border-white/20 text-white font-montserrat text-sm py-2 outline-none placeholder:text-white/20 focus:border-ardor-red transition-colors duration-200'

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <section id="reservations" className="bg-ardor-dark py-24 md:py-32">
      <div className="max-w-xl mx-auto px-6">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">Join Us</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Haz Tu Reserva
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
          <p className="font-montserrat text-ardor-muted text-sm mt-5">
            Reserve your table at ARDOR. We look forward to welcoming you.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Full Name</label>
                  <input type="text" required placeholder="Ana García" className={FIELD_CLASS} />
                </div>
                <div>
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Email</label>
                  <input type="email" required placeholder="ana@example.com" className={FIELD_CLASS} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Date</label>
                  <input type="date" required className={`${FIELD_CLASS} [color-scheme:dark]`} />
                </div>
                <div>
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Time</label>
                  <select required className={`${FIELD_CLASS} bg-ardor-dark appearance-none`}>
                    <option value="" disabled defaultValue="">Select time</option>
                    {['7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM'].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Guests</label>
                <select required className={`${FIELD_CLASS} bg-ardor-dark appearance-none`}>
                  <option value="" disabled defaultValue="">Number of guests</option>
                  {['1 Guest','2 Guests','3 Guests','4 Guests','5 Guests','6 Guests','7+ Guests (please call)'].map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 text-center">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="font-montserrat text-sm tracking-[0.3em] uppercase bg-ardor-gold text-ardor-dark px-12 py-4 font-medium w-full md:w-auto disabled:opacity-60"
                  whileHover={{ backgroundColor: '#E63946', color: '#ffffff' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {loading ? 'Reserving…' : 'Confirm Reservation'}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <p className="font-cormorant italic text-ardor-gold text-2xl mb-3">¡Perfecto! Your table is reserved.</p>
              <p className="font-montserrat text-ardor-muted text-xs">A confirmation will be sent to your email.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify Reservations**

Scroll to Reservations. Expected: dark section, underline-only fields. Fill in and submit → button shows "Reserving…" → form fades out → success message fades in. Hover over button → turns red.

- [ ] **Step 3: Commit**

```bash
git add src/components/Reservations.jsx
git commit -m "feat: add Reservations section with AnimatePresence form/success transition"
```

---

### Task 11: Footer

**Files:**
- Replace: `src/components/Footer.jsx`

- [ ] **Step 1: Replace `src/components/Footer.jsx`**

```jsx
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Signature Dishes', href: '#dishes' },
  { label: 'Drinks & Bar', href: '#drinks' },
  { label: 'Full Menu', href: '#menu' },
  { label: 'Reservations', href: '#reservations' },
]

const SOCIAL = [
  {
    label: 'Instagram',
    path: 'M2 2h20v20H2V2zm10 5a5 5 0 100 10A5 5 0 0012 7zm6.5-1.5a1 1 0 100 2 1 1 0 000-2z',
  },
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'TripAdvisor',
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z',
  },
]

export default function Footer({ reducedMotion }) {
  return (
    <footer className="bg-ardor-mid pt-16 pb-8">
      {/* Animated red rule */}
      <motion.div
        className="w-full h-px bg-ardor-red mb-16"
        initial={reducedMotion ? false : { scaleX: 0, originX: 0 }}
        whileInView={reducedMotion ? {} : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16">

        {/* Brand */}
        <div>
          <p className="font-cormorant font-bold text-white text-3xl tracking-widest mb-3">
            ARD<span className="text-ardor-red">O</span>R
          </p>
          <p className="font-cormorant italic text-ardor-muted text-base mb-6">Where Passion Meets the Plate</p>
          <div className="flex gap-4">
            {SOCIAL.map(s => (
              <motion.a
                key={s.label}
                href="#"
                aria-label={`ARDOR on ${s.label}`}
                className="text-ardor-muted cursor-pointer"
                whileHover={reducedMotion ? {} : { color: '#E63946', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-6">Navigate</h4>
          <ul className="space-y-3 font-montserrat text-sm text-ardor-muted">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white transition-colors duration-200">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-6">Find Us</h4>
          <address className="not-italic font-montserrat text-sm text-ardor-muted space-y-2">
            <p>Calle de la Pasión, 14</p>
            <p>28001 Madrid, Spain</p>
            <p className="pt-2">+34 91 234 56 78</p>
            <p>hola@ardor.es</p>
          </address>
          <div className="mt-6 font-montserrat text-xs text-ardor-muted space-y-1">
            <p><span className="text-white">Mon–Thu</span> · 7:00 PM – 11:00 PM</p>
            <p><span className="text-white">Fri–Sat</span> · 7:00 PM – 12:30 AM</p>
            <p><span className="text-white">Sunday</span> · Closed</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-montserrat text-xs text-ardor-muted">© 2026 ARDOR Madrid. All rights reserved.</p>
        <p className="font-montserrat text-xs text-ardor-muted">Crafted with passion in Madrid</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify Footer**

Scroll to bottom. Expected: red rule draws in from left, 3-column layout, social icons turn red on hover with upward nudge, hours and contact visible.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer with scaleX rule animation and social icon hover"
```

---

### Task 12: Final Verification & Production Build

**Files:** None

- [ ] **Step 1: Full scroll-through verification**

With `npm run dev` running, scroll through all sections and verify:
- [ ] Navbar: transparent → frosted glass on scroll, mobile hamburger works
- [ ] Hero: text staggers in on load, 3D plate spins, embers float, CTA button hover works
- [ ] About: quote slides from left, image from right, red rule draws down
- [ ] Dishes: 3 live 3D canvases, hover accelerates spin + border glows red
- [ ] Drinks: image zooms, red ripple radiates from centre on hover
- [ ] Menu: tab underline springs between tabs, panel fades in/out
- [ ] Reservations: form submits, loading state, success message fades in
- [ ] Footer: red rule draws in, social icons nudge up on hover
- [ ] `prefers-reduced-motion`: in DevTools Rendering tab, enable "Emulate prefers-reduced-motion" → all animations disabled, content still fully visible

- [ ] **Step 2: Production build check**

```bash
npm run build
```

Expected: `dist/` folder created, no build errors. Bundle size warning for Three.js is expected (~600kb) — acceptable for a premium showcase site.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4173`. Verify everything works identically to dev mode.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete ARDOR Pro — React + Framer Motion + R3F premium restaurant showcase"
```
