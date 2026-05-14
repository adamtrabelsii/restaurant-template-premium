import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const TABS = ['tapas', 'mains', 'postres', 'bebidas']

export default function Menu({ reducedMotion }) {
  const { t } = useLanguage()
  const [active, setActive] = useState('tapas')
  const items = t(`menu.items.${active}`)

  return (
    <section id="menu" className="bg-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">

        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">{t('menu.eyebrow')}</p>
          <h2 className="font-cormorant font-bold text-ardor-dark" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t('menu.title')}
          </h2>
          <div className="w-16 h-px bg-ardor-red mx-auto mt-5" />
        </motion.div>

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative font-montserrat text-xs tracking-[0.3em] uppercase px-6 py-3 cursor-pointer whitespace-nowrap transition-colors duration-200"
              style={{ color: active === tab ? '#0F0F0F' : '#9CA3AF' }}
            >
              {t(`menu.tabs.${tab}`)}
              {active === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-ardor-red"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-5"
          >
            {items.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-baseline border-b border-dotted border-gray-200 pb-4 last:border-0"
              >
                <div>
                  <p className="font-cormorant font-semibold text-ardor-dark text-lg">{item.name}</p>
                  <p className="font-montserrat text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
                <span className="font-montserrat text-ardor-red text-sm font-medium ml-6 flex-shrink-0">{item.price}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

      </div>
    </section>
  )
}
