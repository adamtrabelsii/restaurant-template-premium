import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

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
          <h2 className="font-cormorant font-bold italic text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('gallery.title') || 'A room for the senses'}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-neon to-transparent mx-auto mt-6" />
        </Reveal>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 auto-rows-[14rem]">
          {IMAGES.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(img)}
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${img.span}`}
              aria-label={`Open ${img.alt}`}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={reducedMotion ? {} : { scale: 1.08 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
