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

export default function Hero({ reducedMotion }) {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120])

  const motionProps = reducedMotion
    ? {}
    : { variants: container, initial: 'hidden', animate: 'show' }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-ardor-darker overflow-hidden noise"
    >
      {/* Photographic backdrop — candlelit interior */}
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

      {/* Warm color wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 30%, rgba(168,50,63,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 80% 75%, rgba(201,169,97,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Deep vignette to anchor the title */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(12,10,9,0.35) 0%, rgba(12,10,9,0.75) 60%, rgba(12,10,9,0.95) 100%)',
        }}
      />

      {/* Decorative thin gold frame */}
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
              initial={reducedMotion ? false : { y: 120, opacity: 0, rotateX: 60 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: EASE }}
              style={{ display: 'inline-block', transformOrigin: 'bottom' }}
            >
              {L}
            </motion.span>
          ))}
        </motion.h1>

        {/* Thin gold rule under title */}
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
          <span
            className="absolute inset-0 opacity-90"
            style={{ background: 'linear-gradient(135deg, #A8323F 0%, #C9A961 100%)' }}
          />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: '#F4EFE7' }} />
          <span className="relative">{t('hero.cta')}</span>
        </motion.a>

        <motion.div variants={item} className="flex items-center gap-8 mt-12 font-montserrat text-[10px] tracking-[0.3em] uppercase text-ardor-text/40">
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
        <span className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-text/40">{t('hero.scroll')}</span>
        <div className="w-px h-10 bg-gradient-to-b from-ardor-gold/60 to-transparent" />
      </motion.div>
    </section>
  )
}
