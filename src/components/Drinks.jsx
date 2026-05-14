import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const DRINK_IMAGES = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80',
  'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=500&q=80',
]

function DrinkCard({ drink, image, reducedMotion, delay }) {
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
            src={image}
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
  const { t } = useLanguage()
  const drinks = t('drinks.items')

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
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">{t('drinks.eyebrow')}</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t('drinks.title')}
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
          <p className="font-montserrat text-ardor-muted text-sm mt-5 max-w-md mx-auto">
            {t('drinks.blurb')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {drinks.map((drink, i) => (
            <DrinkCard key={i} drink={drink} image={DRINK_IMAGES[i]} reducedMotion={reducedMotion} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}
