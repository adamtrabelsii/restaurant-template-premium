// src/components/Gallery.jsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const EASE = [0.16, 1, 0.3, 1]

// Alt texts live in i18n (gallery.images), index-matched to these sources.
const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1100&q=80', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80',     span: 'md:col-span-1 md:row-span-1' },
  { src: 'https://images.unsplash.com/photo-1663530761401-15eefb544889?w=700&q=80',  span: 'md:col-span-1 md:row-span-1' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&q=80',  span: 'md:col-span-1 md:row-span-1' },
  { src: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=700&q=80',  span: 'md:col-span-1 md:row-span-1' },
]

export default function Gallery({ reducedMotion }) {
  const { t, tArray } = useLanguage()
  const alts = tArray('gallery.images')
  const [lightbox, setLightbox] = useState(null) // index or null
  const closeButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)

  const open = (i, e) => {
    lastTriggerRef.current = e.currentTarget
    setLightbox(i)
  }
  const close = () => {
    setLightbox(null)
    lastTriggerRef.current?.focus()
  }

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section id="gallery" className="relative bg-ardor-darker py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal reducedMotion={reducedMotion} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-ardor-gold/60" />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-gold">
              {t('gallery.eyebrow')}
            </p>
            <span className="w-8 h-px bg-ardor-gold/60" />
          </div>
          <h2 className="font-cormorant font-bold italic text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('gallery.title')}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mx-auto mt-6" />
        </Reveal>

        <LayoutGroup>
          <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 auto-rows-[14rem]">
            {IMAGES.map((img, i) => (
              <motion.button
                key={i}
                onClick={(e) => open(i, e)}
                initial={reducedMotion ? false : { opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                className={`group relative overflow-hidden rounded-sm cursor-pointer ${img.span}`}
                aria-label={t('gallery.openAria').replace('{name}', alts[i] || '')}
              >
                {lightbox !== i && (
                  <motion.img
                    layoutId={reducedMotion ? undefined : `gallery-img-${i}`}
                    src={img.src}
                    alt={alts[i] || ''}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={reducedMotion ? {} : { scale: 1.06, filter: 'brightness(1.12)' }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ardor-darker/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 font-montserrat text-[10px] tracking-[0.4em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {alts[i] || ''}
                </span>
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full border border-ardor-gold/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-ardor-gold" />
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {lightbox !== null && (
              <motion.div
                className="fixed inset-0 z-[80] bg-ardor-darker/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
                role="dialog"
                aria-modal="true"
                aria-label={alts[lightbox] || ''}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={close}
              >
                <motion.img
                  layoutId={reducedMotion ? undefined : `gallery-img-${lightbox}`}
                  src={IMAGES[lightbox].src}
                  srcSet={`${IMAGES[lightbox].src} 1100w, ${IMAGES[lightbox].src.replace(/w=\d+/, 'w=1800')} 1800w`}
                  sizes="90vw"
                  alt={alts[lightbox] || ''}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm cursor-default"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  ref={closeButtonRef}
                  className="absolute top-6 right-6 text-white/70 hover:text-white font-montserrat text-xs tracking-[0.4em] uppercase cursor-pointer"
                  onClick={close}
                  aria-label={t('gallery.close')}
                >
                  {t('gallery.close')} ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  )
}
