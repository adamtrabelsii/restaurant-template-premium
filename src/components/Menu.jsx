import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const TABS = ['tapas', 'mains', 'postres', 'bebidas']
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'v',   label: 'V', title: 'Vegetarian' },
  { id: 'gf',  label: 'GF', title: 'Gluten-free' },
  { id: 'n',   label: 'N', title: 'Contains nuts' },
]

export default function Menu({ reducedMotion }) {
  const { t } = useLanguage()
  const [active, setActive] = useState('tapas')
  const [filter, setFilter] = useState('all')
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const items = t(`menu.items.${active}`) || []

  return (
    <section id="menu" className="relative bg-ardor-mid py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-6">
        <Reveal reducedMotion={reducedMotion} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-ardor-neon/60" />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-neon">{t('menu.eyebrow')}</p>
            <span className="w-8 h-px bg-ardor-neon/60" />
          </div>
          <h2 className="font-cormorant font-bold italic text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('menu.title')}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-red to-transparent mx-auto mt-6" />
        </Reveal>

        {/* Tab bar */}
        <div className="flex border-b border-white/10 mb-6 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative font-montserrat text-[11px] tracking-[0.4em] uppercase px-5 py-4 cursor-pointer whitespace-nowrap transition-colors duration-200"
              style={{ color: active === tab ? '#F4EFE7' : '#A89E92' }}
            >
              {t(`menu.tabs.${tab}`)}
              {active === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-10 flex-wrap" role="group" aria-label="Dietary filters">
          {FILTERS.map(f => {
            const isActive = filter === f.id
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                title={f.title}
                aria-pressed={isActive}
                className="font-montserrat text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: isActive ? '#C9A961' : 'rgba(244,239,231,0.10)',
                  color: isActive ? '#C9A961' : '#A89E92',
                  background: isActive ? 'rgba(201,169,97,0.06)' : 'transparent',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-10">
          {/* Items */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={active + filter}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1"
            >
              {items.map((item, i) => (
                <li
                  key={i}
                  className="group relative flex justify-between items-baseline border-b border-dotted border-white/10 py-4 cursor-default"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <span className="absolute left-0 top-0 bottom-0 w-px scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 bg-ardor-neon" />
                  <div className="pl-4">
                    <p className="font-cormorant italic font-semibold text-white text-xl group-hover:text-ardor-neon transition-colors duration-300">
                      {item.name}
                    </p>
                    <p className="font-montserrat text-white/50 text-xs mt-1">{item.desc}</p>
                  </div>
                  <span className="font-mono text-ardor-gold text-sm font-medium ml-6 flex-shrink-0 tabular">{item.price}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Hover preview (desktop only) */}
          <div className="hidden md:block w-64 sticky top-32 self-start">
            <div className="aspect-[3/4] rounded-sm overflow-hidden glass relative">
              <AnimatePresence mode="wait">
                {hoveredIdx !== null && items[hoveredIdx] ? (
                  <motion.div
                    key={`${active}-${hoveredIdx}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center p-6 text-center"
                    style={{ background: 'radial-gradient(circle at center, rgba(201,169,97,0.10) 0%, transparent 60%)' }}
                  >
                    <div>
                      <p className="font-cormorant italic text-ardor-neon text-3xl mb-3">{items[hoveredIdx].name}</p>
                      <p className="font-mono text-ardor-gold text-sm tabular">{items[hoveredIdx].price}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center p-6 text-center"
                  >
                    <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-white/30">
                      Hover a dish
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
