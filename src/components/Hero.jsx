import { Suspense, useRef, lazy } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const Canvas = lazy(() =>
  import('@react-three/fiber').then((m) => ({ default: m.Canvas }))
)
const DishScene = lazy(() => import('../canvas/DishScene'))

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
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const scrollProgress = useRef(0)

  // Track scroll progress across the hero section: 0 at top, 1 when hero leaves viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollProgress.current = v
  })

  const motionProps = reducedMotion
    ? {}
    : { variants: container, initial: 'hidden', animate: 'show' }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-ardor-dark overflow-hidden"
    >

      {/* R3F Canvas — pinned, scroll-rotated dish */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
      >
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 1.6, 4], fov: 42 }}
            dpr={[1, 1.75]}
            shadows
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <DishScene
                scrollProgress={scrollProgress}
                reducedMotion={reducedMotion}
              />
            </Suspense>
          </Canvas>
        </Suspense>
      </motion.div>

      {/* Dark vignette overlay so title stays legible over the dish */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(15,15,15,0) 0%, rgba(15,15,15,0.55) 55%, rgba(15,15,15,0.85) 100%), radial-gradient(circle at 20% 50%, rgba(230,57,70,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />

      {/* Ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {!reducedMotion && PARTICLES.map((p) => (
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
          {t('hero.tagline')}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-cormorant font-bold italic leading-none text-white mb-4 select-none"
          style={{ fontSize: 'clamp(5rem, 15vw, 14rem)', letterSpacing: '-0.02em', textShadow: '0 8px 40px rgba(0,0,0,0.7)' }}
        >
          ARD<span className="text-ardor-red">O</span>R
        </motion.h1>

        <motion.p
          variants={item}
          className="font-cormorant text-xl md:text-2xl italic text-ardor-muted mb-10 tracking-wide"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.a
          variants={item}
          href="#reservations"
          className="font-montserrat text-sm tracking-[0.3em] uppercase bg-ardor-red text-white px-10 py-4 mt-4 cursor-pointer"
          whileHover={reducedMotion ? {} : { scale: 1.04, backgroundColor: '#fff', color: '#0F0F0F' }}
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          {t('hero.cta')}
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10"
        animate={reducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="font-montserrat text-xs tracking-widest uppercase text-ardor-muted">{t('hero.scroll')}</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 0v18M1 11l7 7 7-7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
