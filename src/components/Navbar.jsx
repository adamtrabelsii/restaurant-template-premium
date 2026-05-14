import { useState, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageToggle from './LanguageToggle'
import useActiveSection from '../hooks/useActiveSection'

const LINK_KEYS = [
  { key: 'about',   href: '#about',   id: 'about' },
  { key: 'dishes',  href: '#dishes',  id: 'dishes' },
  { key: 'drinks',  href: '#drinks',  id: 'drinks' },
  { key: 'menu',    href: '#menu',    id: 'menu' },
]

const SECTION_IDS = ['hero', 'about', 'dishes', 'drinks', 'menu', 'reservations']

export default function Navbar({ reducedMotion }) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()
  const active = useActiveSection(SECTION_IDS)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 50)
    const diff = y - lastY.current
    if (!mobileOpen) {
      if (diff > 6 && y > 200) setHidden(true)
      else if (diff < -6) setHidden(false)
    }
    lastY.current = y
  })

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }

  return (
    <motion.nav
      className="fixed top-3 left-3 right-3 md:top-4 md:left-4 md:right-4 z-50 rounded-2xl border border-white/[0.06]"
      animate={{
        y: hidden ? -100 : 0,
        backgroundColor: scrolled ? 'rgba(7,7,11,0.72)' : 'rgba(7,7,11,0.25)',
        backdropFilter: scrolled ? 'blur(18px)' : 'blur(8px)',
        paddingTop: scrolled ? '10px' : '16px',
        paddingBottom: scrolled ? '10px' : '16px',
      }}
      transition={transition}
      style={{ WebkitBackdropFilter: 'blur(18px)' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-7 flex items-center justify-between">
        <a href="#hero" className="font-cormorant text-2xl font-bold italic tracking-widest text-white select-none">
          ARD<span className="text-ardor-red">O</span>R
        </a>

        <ul className="hidden md:flex items-center gap-7 font-montserrat text-[11px] font-medium tracking-[0.25em] uppercase">
          {LINK_KEYS.map(l => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                className={`transition-colors duration-200 ${active === l.id ? 'text-white' : 'text-ardor-muted hover:text-white'}`}
              >
                {t(`navbar.links.${l.key}`)}
              </a>
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
          <li>
            <a href="#reservations"
               className="relative inline-flex items-center gap-2 border border-ardor-red/60 text-white px-4 py-2 rounded-full overflow-hidden group cursor-pointer">
              <span className="absolute inset-0 bg-ardor-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative">{t('navbar.reserve')}</span>
            </a>
          </li>
          <li><LanguageToggle reducedMotion={reducedMotion} /></li>
        </ul>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle reducedMotion={reducedMotion} />
          <button
            className="relative w-10 h-10 flex flex-col items-center justify-center cursor-pointer rounded-md"
            aria-label={t('navbar.toggleMenu')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
          >
            <motion.span
              className="w-6 h-px bg-white block absolute"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 0 : -5 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="w-6 h-px bg-white block absolute"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="w-6 h-px bg-white block absolute"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 0 : 5 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-3 pt-5 px-7 pb-5 mt-3 border-t border-white/10 font-montserrat text-xs font-medium tracking-[0.25em] uppercase text-ardor-muted">
              {LINK_KEYS.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setMobileOpen(false)}
                     className="block py-1 hover:text-white transition-colors duration-200">{t(`navbar.links.${l.key}`)}</a>
                </li>
              ))}
              <li>
                <a href="#reservations" onClick={() => setMobileOpen(false)}
                   className="inline-block mt-2 border border-ardor-red text-ardor-red px-5 py-2 rounded-full">
                  {t('navbar.reserve')}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
