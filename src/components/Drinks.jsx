import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const DRINK_IMAGES = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=700&q=80',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=700&q=80',
  'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=700&q=80',
]

function PourSVG() {
  return (
    <svg aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-24 pointer-events-none" viewBox="0 0 48 96">
      <defs>
        <linearGradient id="pour" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0" />
          <stop offset="50%" stopColor="#C9A961" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#A8323F" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.path
        d="M24 0 C 22 30 26 50 24 96"
        stroke="url(#pour)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

function DrinkCard({ drink, image, reducedMotion, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden glass glass-hover rounded-sm cursor-pointer"
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden h-72 relative">
        <motion.img
          src={image}
          alt={drink.alt}
          loading="lazy"
          className="w-full h-full object-cover"
          animate={reducedMotion ? {} : { scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ardor-darker/80 via-transparent to-transparent" />

        {hovered && !reducedMotion && <PourSVG />}
      </div>
      <div className="p-6 relative">
        <p className="font-montserrat text-ardor-neon text-[10px] tracking-[0.4em] uppercase mb-2">{drink.label}</p>
        <h3 className="font-cormorant italic font-semibold text-white text-2xl mb-3">{drink.name}</h3>
        <p className="font-montserrat text-white/60 text-xs leading-relaxed">{drink.description}</p>
      </div>

      <AnimatePresence>
        {hovered && !reducedMotion && (
          <motion.div
            key="glow"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: 'radial-gradient(ellipse at top, rgba(201,169,97,0.16) 0%, transparent 60%)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Drinks({ reducedMotion }) {
  const { t } = useLanguage()
  const drinks = t('drinks.items')

  return (
    <section id="drinks" className="relative bg-ardor-darker py-28 md:py-40 overflow-hidden noise">
      <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 30% 20%, rgba(201,169,97,0.07) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(168,50,63,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal reducedMotion={reducedMotion} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-ardor-gold/60" />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-gold">{t('drinks.eyebrow')}</p>
            <span className="w-8 h-px bg-ardor-gold/60" />
          </div>
          <h2 className="font-cormorant font-bold italic text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('drinks.title')}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mx-auto mt-6" />
          <p className="font-montserrat text-white/60 text-sm mt-6 max-w-md mx-auto">
            {t('drinks.blurb')}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {drinks.map((drink, i) => (
            <DrinkCard key={i} drink={drink} image={DRINK_IMAGES[i]} reducedMotion={reducedMotion} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
