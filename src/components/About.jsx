// src/components/About.jsx
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const EASE = [0.16, 1, 0.3, 1]

const STATS = [
  { value: 8,  suffix: '',  labelKey: 'about.stats.years',   accent: 'var(--gold)' },
  { value: 2,  suffix: '★', labelKey: 'about.stats.michelin',accent: 'var(--gold)' },
  { value: 87, suffix: '',  labelKey: 'about.stats.wines',   accent: 'var(--red)' },
  { value: 4,  suffix: '',  labelKey: 'about.stats.chefs',   accent: 'var(--gold)' },
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
        style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 30%, rgb(var(--red-rgb) / 0.10) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 10% 80%, rgb(var(--gold-rgb) / 0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: quote */}
        <Reveal direction="left" reducedMotion={reducedMotion}>
          <div className="flex gap-6 items-start">
            {/* Scroll-linked vertical line */}
            <motion.div
              className="w-px flex-shrink-0 self-stretch origin-top"
              style={reducedMotion
                ? { background: 'linear-gradient(180deg, var(--red) 0%, var(--gold) 100%)' }
                : {
                    background: 'linear-gradient(180deg, var(--red) 0%, var(--gold) 100%)',
                    scaleY: lineScaleY,
                  }
              }
            />
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-gold mb-5">
                {t('about.eyebrow')}
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

        {/* Right: image with mask reveal */}
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
            <span className="absolute top-3 left-3 w-5 h-5 border-l border-t border-ardor-gold/60" />
            <span className="absolute top-3 right-3 w-5 h-5 border-r border-t border-ardor-gold/60" />
            <span className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-ardor-gold/60" />
            <span className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-ardor-gold/60" />
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
