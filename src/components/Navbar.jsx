import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Dishes', href: '#dishes' },
  { label: 'Drinks', href: '#drinks' },
  { label: 'Menu', href: '#menu' },
]

export default function Navbar({ reducedMotion }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 50)
  })

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.3 }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6"
      animate={{
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px',
        backgroundColor: scrolled ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      }}
      transition={transition}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-cormorant text-2xl font-bold tracking-widest text-white select-none">
          ARD<span className="text-ardor-red">O</span>R
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-montserrat text-xs font-medium tracking-widest uppercase text-ardor-muted">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-white transition-colors duration-200">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#reservations"
               className="border border-ardor-red text-ardor-red px-4 py-2 rounded-full hover:bg-ardor-red hover:text-white transition-all duration-200">
              Reserve
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          {[0, 1, 2].map(i => (
            <span key={i} className="w-6 h-0.5 bg-white block" />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="md:hidden mt-4 pb-4 border-t border-white/10"
          >
            <ul className="flex flex-col gap-4 pt-4 px-2 font-montserrat text-xs font-medium tracking-widest uppercase text-ardor-muted">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setMobileOpen(false)}
                     className="block hover:text-white transition-colors duration-200">{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#reservations" onClick={() => setMobileOpen(false)}
                   className="inline-block border border-ardor-red text-ardor-red px-4 py-2 rounded-full">
                  Reserve
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
