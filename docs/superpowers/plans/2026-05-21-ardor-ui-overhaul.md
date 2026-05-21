# Ardor UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the ContainerScroll scroll-animation component as a new DishScroll section and add Framer Motion scroll animations throughout every existing section.

**Architecture:** New `src/components/ui/container-scroll-animation.jsx` (JSX port of 21st.dev component) powers a new `DishScroll` section inserted between Hero and Press. `Reveal.jsx` gets a `blur` prop that upgrades all existing section entries. Targeted scroll-linked animations are added to Hero, About, Dishes, Gallery, and Press individually.

**Tech Stack:** React JSX · Vite · Tailwind CSS · framer-motion v11 (already installed) · Unsplash images (already in use)

---

## File Map

| Status | File | Responsibility |
|--------|------|----------------|
| CREATE | `src/components/ui/container-scroll-animation.jsx` | JSX port of 21st.dev ContainerScroll component |
| CREATE | `src/components/DishScroll.jsx` | New section: tilting 3D dish showcase |
| MODIFY | `src/App.jsx` | Insert `<DishScroll>` between Hero and Press |
| MODIFY | `src/components/common/Reveal.jsx` | Add `blur` prop for blur→sharp entry on all reveals |
| MODIFY | `src/components/Hero.jsx` | Deeper parallax, rotateY letters, ambient gold orbs |
| MODIFY | `src/components/About.jsx` | Scroll-linked vertical line draw, stat stagger |
| MODIFY | `src/components/Dishes.jsx` | Image parallax, shimmer on featured, hover glow |
| MODIFY | `src/components/Gallery.jsx` | Hover zoom + brightness |
| MODIFY | `src/components/Press.jsx` | whileInView scale pop on press badges |

---

## Task 1: ContainerScroll component (JSX port)

**Files:**
- Create: `src/components/ui/container-scroll-animation.jsx`

- [ ] **Step 1: Create the file**

```jsx
// src/components/ui/container-scroll-animation.jsx
import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scaleDimensions = () => isMobile ? [0.7, 0.9] : [1.05, 1]

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: '1000px' }}>
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  )
}

function ScrollHeader({ translate, titleComponent }) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

function ScrollCard({ rotate, scale, children }) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#3a2e28] p-2 md:p-6 bg-ardor-darker rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-ardor-mid md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify the file exists and has no syntax errors**

Run: `cd "c:/Adem/CODING/projects/restaurant-pro" && node --input-type=module <<< "import('./src/components/ui/container-scroll-animation.jsx').then(()=>console.log('ok')).catch(e=>console.error(e.message))" 2>&1 || echo "check manually in browser"`

(If the node check fails, just proceed — Vite will catch syntax errors when you run dev in Task 3.)

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/container-scroll-animation.jsx
git commit -m "feat: add ContainerScroll animation component (JSX port)"
```

---

## Task 2: Upgrade Reveal.jsx with blur prop

**Files:**
- Modify: `src/components/common/Reveal.jsx`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/common/Reveal.jsx
import { motion } from 'framer-motion'

const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  zoom:  { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

export default function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  once = true,
  blur = true,
  reducedMotion = false,
  className,
  ...rest
}) {
  const Motion = motion[Tag] || motion.div

  if (reducedMotion) {
    return <Tag className={className} {...rest}>{children}</Tag>
  }

  const base = VARIANTS[direction] || VARIANTS.up
  const variants = blur
    ? {
        hidden: { ...base.hidden, filter: 'blur(6px)' },
        show:   { ...base.show,   filter: 'blur(0px)' },
      }
    : base

  return (
    <Motion
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Motion>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/common/Reveal.jsx
git commit -m "feat: add blur prop to Reveal for blur-to-sharp entry animations"
```

---

## Task 3: Create DishScroll section

**Files:**
- Create: `src/components/DishScroll.jsx`

- [ ] **Step 1: Create the file**

```jsx
// src/components/DishScroll.jsx
import { motion } from 'framer-motion'
import { ContainerScroll } from './ui/container-scroll-animation'
import { useLanguage } from '../i18n/LanguageContext'

const DISHES = [
  {
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=1200&q=80&auto=format&fit=crop',
    name: 'Toro Tartare',
    price: '€38',
    desc: 'Bluefin tuna, smoked roe, crispy capers',
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=700&q=80&auto=format&fit=crop',
    name: 'Ibérico Presa',
    price: '€42',
    desc: 'Charcoal-grilled, romesco, wild herbs',
    featured: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=700&q=80&auto=format&fit=crop',
    name: 'Black Truffle Risotto',
    price: '€56',
    desc: 'Carnaroli, aged parmesan, shaved truffle',
    featured: false,
  },
]

const EASE = [0.16, 1, 0.3, 1]

function DishTile({ dish, delay, reducedMotion, className = '' }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl group ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ardor-darker via-ardor-darker/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={`font-cormorant italic font-semibold text-white ${dish.featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
            {dish.name}
          </h3>
          <span className="font-mono text-ardor-gold text-sm flex-shrink-0 tabular">{dish.price}</span>
        </div>
        <p className="font-montserrat text-white/55 text-[11px] mt-1 leading-relaxed">{dish.desc}</p>
      </div>
    </motion.div>
  )
}

export default function DishScroll({ reducedMotion }) {
  const { t } = useLanguage()

  const titleComponent = (
    <div>
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="w-8 h-px bg-ardor-red/60" />
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red">
          Signature Dishes
        </p>
        <span className="w-8 h-px bg-ardor-red/60" />
      </div>
      <h2
        className="font-cormorant font-bold italic text-ardor-text"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
      >
        Crafted with obsession.
      </h2>
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mx-auto mt-6" />
    </div>
  )

  return (
    <section id="dish-scroll" className="relative bg-ardor-darker overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(168,50,63,0.10) 0%, transparent 65%)',
        }}
      />
      <ContainerScroll titleComponent={titleComponent}>
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-3 p-1">
          <DishTile
            dish={DISHES[0]}
            delay={0}
            reducedMotion={reducedMotion}
            className="row-span-2"
          />
          <DishTile dish={DISHES[1]} delay={0.12} reducedMotion={reducedMotion} />
          <DishTile dish={DISHES[2]} delay={0.24} reducedMotion={reducedMotion} />
        </div>
      </ContainerScroll>
    </section>
  )
}
```

- [ ] **Step 2: Insert DishScroll into App.jsx**

Open `src/App.jsx`. The current import block ends around line 11 and the JSX starts at line 16. Replace the entire file with:

```jsx
// src/App.jsx
import { useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DishScroll from './components/DishScroll'
import About from './components/About'
import Press from './components/Press'
import Dishes from './components/Dishes'
import Drinks from './components/Drinks'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reservations from './components/Reservations'
import Footer from './components/Footer'
import ScrollProgress from './components/common/ScrollProgress'
import CursorFollower from './components/common/CursorFollower'
import LoadingScreen from './components/common/LoadingScreen'

export default function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <LoadingScreen reducedMotion={prefersReducedMotion} />
      <ScrollProgress />
      <CursorFollower reducedMotion={prefersReducedMotion} />

      <Navbar reducedMotion={prefersReducedMotion} />
      <main>
        <Hero reducedMotion={prefersReducedMotion} />
        <DishScroll reducedMotion={prefersReducedMotion} />
        <Press reducedMotion={prefersReducedMotion} />
        <About reducedMotion={prefersReducedMotion} />
        <Dishes reducedMotion={prefersReducedMotion} />
        <Drinks reducedMotion={prefersReducedMotion} />
        <Menu reducedMotion={prefersReducedMotion} />
        <Gallery reducedMotion={prefersReducedMotion} />
        <Reservations reducedMotion={prefersReducedMotion} />
        <Footer reducedMotion={prefersReducedMotion} />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:5173`. Scroll past the Hero — the DishScroll section should appear with the 3-dish grid tilting from ~20° perspective into flat as you scroll into it. The featured dish (Toro Tartare) spans the full left column; the two compact dishes stack on the right.

Expected: no console errors, card tilts smoothly, dish images load.

- [ ] **Step 4: Commit**

```bash
git add src/components/DishScroll.jsx src/App.jsx
git commit -m "feat: add DishScroll section with ContainerScroll 3D dish showcase"
```

---

## Task 4: Enhance Hero — deeper parallax + ambient orbs + rotateY letters

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Hero.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

const LETTERS = ['A', 'R', 'D', 'O', 'R']

// Ambient orb config: [xPercent, yPercent, duration, size]
const ORBS = [
  { x: '25%', y: '20%', duration: 6, size: 320, delay: 0 },
  { x: '70%', y: '65%', duration: 9, size: 200, delay: 2 },
  { x: '50%', y: '80%', duration: 7, size: 140, delay: 1 },
]

export default function Hero({ reducedMotion }) {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const titleY      = useTransform(scrollYProgress, [0, 1], [0, -80])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgY         = useTransform(scrollYProgress, [0, 1], [0, 160])

  const motionProps = reducedMotion
    ? {}
    : { variants: container, initial: 'hidden', animate: 'show' }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-ardor-darker overflow-hidden noise"
    >
      {/* Photographic backdrop */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={reducedMotion ? {} : { y: bgY }}
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2200&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-[115%] object-cover opacity-40"
        />
      </motion.div>

      {/* Ambient gold orbs */}
      {!reducedMotion && ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: 'radial-gradient(circle, rgba(201,169,97,0.09) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Warm color wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 30%, rgba(168,50,63,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 80% 75%, rgba(201,169,97,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Deep vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(12,10,9,0.35) 0%, rgba(12,10,9,0.75) 60%, rgba(12,10,9,0.95) 100%)',
        }}
      />

      {/* Decorative gold frame */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none border border-ardor-gold/10" aria-hidden="true" />
      <div className="absolute inset-6 md:inset-10 pointer-events-none" aria-hidden="true">
        <span className="absolute top-0 left-0 w-6 h-6 border-l border-t border-ardor-gold/40 -translate-x-px -translate-y-px" />
        <span className="absolute top-0 right-0 w-6 h-6 border-r border-t border-ardor-gold/40 translate-x-px -translate-y-px" />
        <span className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-ardor-gold/40 -translate-x-px translate-y-px" />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-ardor-gold/40 translate-x-px translate-y-px" />
      </div>

      {/* Text content */}
      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={reducedMotion ? {} : { y: titleY, opacity: titleOpacity }}
        {...motionProps}
      >
        <motion.div variants={item} className="flex items-center gap-3 mb-7">
          <span className="w-10 h-px bg-ardor-gold/40" />
          <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-gold/80">
            {t('hero.tagline')}
          </p>
          <span className="w-10 h-px bg-ardor-gold/40" />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-cormorant font-bold italic leading-none text-ardor-text mb-6 select-none flex"
          style={{
            fontSize: 'clamp(5rem, 15vw, 14rem)',
            letterSpacing: '-0.03em',
            textShadow: '0 8px 60px rgba(0,0,0,0.85)',
          }}
        >
          {LETTERS.map((L, i) => (
            <motion.span
              key={i}
              className={L === 'O' ? 'text-ardor-red' : ''}
              initial={reducedMotion ? false : { y: 120, opacity: 0, rotateY: 60 }}
              animate={{ y: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: EASE }}
              style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
            >
              {L}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          variants={item}
          className="w-24 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mb-8"
          aria-hidden="true"
        />

        <motion.p
          variants={item}
          className="font-cormorant text-xl md:text-2xl italic text-ardor-text/75 mb-12 tracking-wide max-w-2xl"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.a
          variants={item}
          href="#reservations"
          className="relative font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-text group-hover:text-ardor-dark px-12 py-4 mt-2 group cursor-pointer overflow-hidden rounded-full border border-ardor-text/15 transition-colors duration-300"
          whileHover={reducedMotion ? {} : { scale: 1.03 }}
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <span className="absolute inset-0 opacity-90"
            style={{ background: 'linear-gradient(135deg, #A8323F 0%, #C9A961 100%)' }} />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: '#F4EFE7' }} />
          <span className="relative">{t('hero.cta')}</span>
        </motion.a>

        <motion.div
          variants={item}
          className="flex items-center gap-8 mt-12 font-montserrat text-[10px] tracking-[0.3em] uppercase text-ardor-text/40"
        >
          <span>★★ Michelin</span>
          <span className="text-ardor-gold/60">·</span>
          <span>50 Best</span>
          <span className="text-ardor-gold/60">·</span>
          <span>Madrid · 2018</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-text/40">
          {t('hero.scroll')}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-ardor-gold/60 to-transparent" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

With `npm run dev` still running, reload `http://localhost:5173`. Check:
- Hero letters flip in with a `rotateY` dimension (more depth than before)
- 3 soft gold glow orbs are slowly drifting up and down in the background
- Scrolling past the hero causes the background image to move faster than the text (deeper parallax)

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: enhance Hero with deeper parallax, rotateY letters, ambient gold orbs"
```

---

## Task 5: Enhance About — scroll-linked line draw + stat stagger

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Replace the accent line and stats grid**

The key changes are:
1. Add `useRef`/`useScroll`/`useTransform` to the left quote column for a scroll-linked vertical line
2. Add `staggerChildren` wrapper around the stats grid

Replace the entire file:

```jsx
// src/components/About.jsx
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const EASE = [0.16, 1, 0.3, 1]

const STATS = [
  { value: 12, suffix: '',  labelKey: 'about.stats.years',   accent: '#C9A961' },
  { value: 2,  suffix: '★', labelKey: 'about.stats.michelin',accent: '#C9A961' },
  { value: 87, suffix: '',  labelKey: 'about.stats.wines',   accent: '#A8323F' },
  { value: 4,  suffix: '',  labelKey: 'about.stats.chefs',   accent: '#C9A961' },
]

const statsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const statItem = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  show:   { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

function CountUp({ to, suffix = '', active, reducedMotion }) {
  const [n, setN] = useState(reducedMotion ? to : 0)
  useEffect(() => {
    if (!active || reducedMotion) { setN(to); return }
    let raf
    const start = performance.now()
    const dur = 1400
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to, reducedMotion])
  return <>{n}{suffix}</>
}

export default function About({ reducedMotion }) {
  const { t } = useLanguage()
  const statsRef = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(statsRef, { once: true, amount: 0.4 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} id="about" className="relative bg-ardor-darker py-28 md:py-40 overflow-hidden noise">
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 30%, rgba(168,50,63,0.10) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(201,169,97,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: quote */}
        <Reveal direction="left" reducedMotion={reducedMotion}>
          <div className="flex gap-6 items-start">
            {/* Scroll-linked vertical line */}
            <motion.div
              className="w-px flex-shrink-0 self-stretch origin-top"
              style={reducedMotion
                ? { background: 'linear-gradient(180deg, #A8323F 0%, #C9A961 100%)' }
                : {
                    background: 'linear-gradient(180deg, #A8323F 0%, #C9A961 100%)',
                    scaleY: lineScaleY,
                  }
              }
            />
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-neon mb-5">
                {t('about.eyebrow') || 'Our story'}
              </p>
              <p
                className="font-cormorant italic text-white leading-[1.05] mb-7"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                dangerouslySetInnerHTML={{ __html: t('about.quote') }}
              />
              <p className="font-montserrat text-white/60 text-sm leading-relaxed mb-9 max-w-md">
                {t('about.body')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-ardor-red/60 flex-shrink-0 ring-2 ring-ardor-red/10">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=96&q=80"
                    alt={t('about.chefAlt')}
                    width="48" height="48"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-cormorant font-semibold text-white text-lg">{t('about.chefName')}</p>
                  <p className="font-montserrat text-[10px] text-ardor-muted tracking-[0.3em] uppercase">{t('about.chefRole')}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: image */}
        <Reveal direction="right" reducedMotion={reducedMotion} delay={0.15}>
          <div className="relative overflow-hidden rounded-sm">
            <motion.img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
              alt={t('about.imageAlt')}
              width="900" height="600"
              className="w-full h-96 md:h-[28rem] object-cover"
              initial={reducedMotion ? false : { scale: 1.15 }}
              whileInView={reducedMotion ? {} : { scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <motion.div
              className="absolute inset-0 bg-ardor-darker origin-left"
              initial={reducedMotion ? false : { scaleX: 1 }}
              whileInView={reducedMotion ? {} : { scaleX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-sm" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6">
              <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-white/70">{t('about.imageCaption')}</p>
            </div>
            <span className="absolute top-3 left-3 w-5 h-5 border-l border-t border-ardor-neon/60" />
            <span className="absolute top-3 right-3 w-5 h-5 border-r border-t border-ardor-neon/60" />
            <span className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-ardor-neon/60" />
            <span className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-ardor-neon/60" />
          </div>
        </Reveal>
      </div>

      {/* Stats strip */}
      <motion.div
        ref={statsRef}
        className="relative max-w-7xl mx-auto px-6 mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]"
        variants={reducedMotion ? {} : statsContainer}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            variants={reducedMotion ? {} : statItem}
            className="relative bg-ardor-darker p-8 flex flex-col items-start"
          >
            <span className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />
            <p className="font-cormorant italic font-bold text-white tabular"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
              <CountUp to={s.value} suffix={s.suffix} active={inView} reducedMotion={reducedMotion} />
            </p>
            <p className="mt-3 font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted">
              {t(s.labelKey)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Scroll to the About section. Check:
- The vertical red-to-gold line on the left of the quote draws upward as you scroll into the section
- The 4 stat cards slide in from the left in a staggered sequence when the strip enters the viewport

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: scroll-linked line draw and staggered stat cards in About"
```

---

## Task 6: Enhance Dishes — image parallax + shimmer on featured + hover glow

**Files:**
- Modify: `src/components/Dishes.jsx`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Dishes.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const EASE = [0.16, 1, 0.3, 1]

const UNSPLASH = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const DISH_IMAGES = [
  UNSPLASH('1534080564583-6be75777b70a'),
  UNSPLASH('1432139509613-5c4255815697'),
  UNSPLASH('1559847844-5315695dadae'),
]

const SPANS = [
  'md:col-span-2 md:row-span-2 md:min-h-[36rem]',
  'md:col-span-1 md:row-span-1 md:min-h-[17.5rem]',
  'md:col-span-1 md:row-span-1 md:min-h-[17.5rem]',
]

function DishCard({ dish, image, reducedMotion, delay, span, featured }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <motion.article
      ref={cardRef}
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      whileHover={reducedMotion ? {} : {
        boxShadow: '0 0 0 1px rgba(201,169,97,0.45), 0 20px 60px -20px rgba(201,169,97,0.25)',
      }}
      className={`group relative overflow-hidden rounded-sm glass cursor-pointer ${span}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={image}
          alt={dish.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={reducedMotion ? {} : { y: imgY }}
          whileHover={reducedMotion ? {} : { scale: 1.06 }}
          transition={{ duration: 1, ease: EASE }}
        />
        {/* Shimmer sweep on featured card */}
        {featured && !reducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(201,169,97,0.08) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ardor-darker via-ardor-darker/30 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,97,0.10) 0%, transparent 70%)' }} />

      <span className="absolute top-4 left-4 w-4 h-4 border-l border-t border-ardor-neon/40 group-hover:border-ardor-neon transition-colors" />
      <span className="absolute top-4 right-4 w-4 h-4 border-r border-t border-ardor-neon/40 group-hover:border-ardor-neon transition-colors" />

      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {featured && (
          <span className="self-start mb-3 font-montserrat text-[9px] tracking-[0.4em] uppercase text-ardor-neon border border-ardor-neon/40 px-2 py-1 rounded-sm">
            Signature
          </span>
        )}
        <div className="flex justify-between items-baseline gap-4">
          <h3 className={`font-cormorant font-semibold italic text-white ${featured ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
            {dish.name}
          </h3>
          <span className="font-mono text-ardor-gold text-sm tabular flex-shrink-0">{dish.price}</span>
        </div>
        <p className={`font-montserrat text-white/60 text-xs leading-relaxed mt-3 ${featured ? 'max-w-md' : ''}`}>
          {dish.description}
        </p>
        <div className="mt-5 flex items-center gap-2 font-montserrat text-[10px] tracking-[0.3em] uppercase text-ardor-neon/70">
          <span className="w-6 h-px bg-ardor-neon/50" />
          <span>Explore</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Dishes({ reducedMotion }) {
  const { t } = useLanguage()
  const dishes = t('dishes.items')

  return (
    <section id="dishes" className="relative bg-ardor-mid py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal reducedMotion={reducedMotion} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-ardor-red/60" />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red">{t('dishes.eyebrow')}</p>
            <span className="w-8 h-px bg-ardor-red/60" />
          </div>
          <h2 className="font-cormorant font-bold italic text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('dishes.title')}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mx-auto mt-6" />
        </Reveal>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-5">
          {dishes.map((dish, i) => (
            <DishCard
              key={i}
              dish={dish}
              image={DISH_IMAGES[i]}
              reducedMotion={reducedMotion}
              delay={i * 0.1}
              span={SPANS[i] || ''}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Scroll to the Dishes section. Check:
- The images inside each card shift vertically at a slower rate than the page scroll (parallax)
- The featured card (Toro Tartare) has a subtle shimmer sweep moving across the image every few seconds
- Hovering any card shows a warm gold border glow

- [ ] **Step 3: Commit**

```bash
git add src/components/Dishes.jsx
git commit -m "feat: image parallax, shimmer, and hover glow in Dishes section"
```

---

## Task 7: Enhance Gallery — hover zoom + brightness

**Files:**
- Modify: `src/components/Gallery.jsx`

- [ ] **Step 1: Replace the `motion.img` whileHover inside Gallery**

The existing `whileHover` on the image only scales. Replace the entire `motion.img` element in the `map` block (lines 49–56) to add `brightness`:

```jsx
// src/components/Gallery.jsx — full file replacement
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const EASE = [0.16, 1, 0.3, 1]

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1100&q=80', alt: 'Dining room', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80',     alt: 'Bar detail',  span: 'md:col-span-1 md:row-span-1' },
  { src: 'https://images.unsplash.com/photo-1559339352-bea4d68fc0e7?w=700&q=80',     alt: 'Plating',     span: 'md:col-span-1 md:row-span-1' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&q=80',  alt: 'Open fire',   span: 'md:col-span-1 md:row-span-1' },
  { src: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=700&q=80',  alt: 'Cellar',      span: 'md:col-span-1 md:row-span-1' },
]

export default function Gallery({ reducedMotion }) {
  const { t } = useLanguage()
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="relative bg-ardor-darker py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal reducedMotion={reducedMotion} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-ardor-gold/60" />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-gold">
              {t('gallery.eyebrow') || 'The space'}
            </p>
            <span className="w-8 h-px bg-ardor-gold/60" />
          </div>
          <h2 className="font-cormorant font-bold italic text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('gallery.title') || 'A room for the senses'}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-neon to-transparent mx-auto mt-6" />
        </Reveal>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 auto-rows-[14rem]">
          {IMAGES.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(img)}
              initial={reducedMotion ? false : { opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${img.span}`}
              aria-label={`Open ${img.alt}`}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={reducedMotion ? {} : { scale: 1.06, filter: 'brightness(1.12)' }}
                transition={{ duration: 0.6, ease: EASE }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ardor-darker/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 font-montserrat text-[10px] tracking-[0.4em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.alt}
              </span>
              <span className="absolute top-3 right-3 w-6 h-6 rounded-full border border-ardor-neon/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-ardor-neon" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[80] bg-ardor-darker/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox.src.replace(/w=\d+/, 'w=1800')}
              alt={lightbox.alt}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white font-montserrat text-xs tracking-[0.4em] uppercase cursor-pointer"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Gallery. Check:
- Each image enters the viewport with blur→sharp entry (matches all other sections now)
- Hovering an image shows a slightly brighter, zoomed image
- Lightbox still opens on click

- [ ] **Step 3: Commit**

```bash
git add src/components/Gallery.jsx
git commit -m "feat: blur-to-sharp entry and brightness hover in Gallery"
```

---

## Task 8: Enhance Press — whileInView scale pop on badges

**Files:**
- Modify: `src/components/Press.jsx`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Press.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

const ITEMS = [
  'Michelin Guide',
  "World's 50 Best",
  'Condé Nast Traveler',
  'El País Gastro',
  'Wine Spectator',
  'GQ España',
  'Forbes Travel',
  'Time Out Madrid',
]

export default function Press({ reducedMotion }) {
  const { t } = useLanguage()
  const items = [...ITEMS, ...ITEMS]

  return (
    <section aria-label="Press and awards" className="relative bg-ardor-mid py-16 border-y border-white/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-center gap-3">
        <span className="w-8 h-px bg-ardor-neon/40" />
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-neon">
          {t('press.eyebrow') || 'As featured in'}
        </p>
        <span className="w-8 h-px bg-ardor-neon/40" />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--mid) 0%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, var(--mid) 0%, transparent 100%)' }} />

        <div className={`flex gap-12 w-max ${reducedMotion ? '' : 'animate-marquee'}`}>
          {items.map((label, i) => (
            <motion.div
              key={i}
              className="font-cormorant italic text-2xl md:text-3xl text-white/40 hover:text-ardor-neon transition-colors duration-300 whitespace-nowrap"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.88 }}
              whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % ITEMS.length) * 0.04 }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Scroll to the Press marquee. Each publication name should pop in with a quick scale from 0.88→1 as it enters the viewport for the first time.

- [ ] **Step 3: Commit**

```bash
git add src/components/Press.jsx
git commit -m "feat: whileInView scale pop on Press publication badges"
```

---

## Task 9: Final check — full scroll-through

- [ ] **Step 1: Run dev server and do a full scroll-through**

```bash
npm run dev
```

Open `http://localhost:5173`. Scroll from top to bottom and verify each section:

| Section | What to check |
|---------|--------------|
| Hero | Ambient gold orbs drifting, letters flip with rotateY, deeper BG parallax |
| DishScroll | 3D card tilts from ~20° to flat as you scroll into it; 3 dishes visible |
| Press | Publication names pop in with scale on first appearance |
| About | Left accent line draws as section enters; stat cards slide from left staggered |
| Dishes | Image parallax inside cards; shimmer on featured; gold border glow on hover |
| Gallery | Blur→sharp entry per image; hover zoom + brightness |
| Drinks | Blur→sharp Reveal on section header (from Reveal blur upgrade) |
| Menu | Blur→sharp Reveal on section header |
| Reservations | Blur→sharp Reveal on section header |

- [ ] **Step 2: Check reduced-motion**

In browser DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Reload and scroll — no animations should fire, all content should be visible at rest.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Ardor UI overhaul — ContainerScroll + Framer Motion scroll animations"
```
