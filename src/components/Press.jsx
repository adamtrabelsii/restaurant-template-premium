// src/components/Press.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const EASE = [0.16, 1, 0.3, 1]

// Fictional publications — replace with the client's real press mentions.
// Deliberately not real magazine trademarks (see BRANDING.md §6).
const ITEMS = [
  'Guía Brasa',
  'The Ember Review',
  'Sobremesa Magazine',
  'Mesa Capital',
  'Cocina & Cava',
  'The Plate Journal',
  'Madrid à Table',
  'Fuego y Sal',
]

export default function Press({ reducedMotion }) {
  const { t } = useLanguage()
  const items = [...ITEMS, ...ITEMS]

  return (
    <section aria-label={t('press.sectionAria')} className="relative bg-ardor-mid py-16 border-y border-white/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-center gap-3">
        <span className="w-8 h-px bg-ardor-gold/40" />
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-gold">
          {t('press.eyebrow')}
        </p>
        <span className="w-8 h-px bg-ardor-gold/40" />
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
              aria-hidden={i >= ITEMS.length || undefined}
              className="font-cormorant italic text-2xl md:text-3xl text-white/40 hover:text-ardor-gold transition-colors duration-300 whitespace-nowrap"
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
