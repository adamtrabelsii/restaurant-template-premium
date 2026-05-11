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
