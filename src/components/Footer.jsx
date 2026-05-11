import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Signature Dishes', href: '#dishes' },
  { label: 'Drinks & Bar', href: '#drinks' },
  { label: 'Full Menu', href: '#menu' },
  { label: 'Reservations', href: '#reservations' },
]

const SOCIAL = [
  {
    label: 'Instagram',
    path: 'M2 2h20v20H2V2zm10 5a5 5 0 100 10A5 5 0 0012 7zm6.5-1.5a1 1 0 100 2 1 1 0 000-2z',
  },
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'TripAdvisor',
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z',
  },
]

export default function Footer({ reducedMotion }) {
  return (
    <footer className="bg-ardor-mid pt-16 pb-8">
      {/* Animated red rule */}
      <motion.div
        className="w-full h-px bg-ardor-red mb-16"
        initial={reducedMotion ? false : { scaleX: 0, originX: 0 }}
        whileInView={reducedMotion ? {} : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16">

        {/* Brand */}
        <div>
          <p className="font-cormorant font-bold text-white text-3xl tracking-widest mb-3">
            ARD<span className="text-ardor-red">O</span>R
          </p>
          <p className="font-cormorant italic text-ardor-muted text-base mb-6">Where Passion Meets the Plate</p>
          <div className="flex gap-4">
            {SOCIAL.map(s => (
              <motion.a
                key={s.label}
                href="#"
                aria-label={`ARDOR on ${s.label}`}
                className="text-ardor-muted cursor-pointer"
                whileHover={reducedMotion ? {} : { color: '#E63946', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-6">Navigate</h4>
          <ul className="space-y-3 font-montserrat text-sm text-ardor-muted">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white transition-colors duration-200">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-6">Find Us</h4>
          <address className="not-italic font-montserrat text-sm text-ardor-muted space-y-2">
            <p>Calle de la Pasión, 14</p>
            <p>28001 Madrid, Spain</p>
            <p className="pt-2">+34 91 234 56 78</p>
            <p>hola@ardor.es</p>
          </address>
          <div className="mt-6 font-montserrat text-xs text-ardor-muted space-y-1">
            <p><span className="text-white">Mon–Thu</span> · 7:00 PM – 11:00 PM</p>
            <p><span className="text-white">Fri–Sat</span> · 7:00 PM – 12:30 AM</p>
            <p><span className="text-white">Sunday</span> · Closed</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-montserrat text-xs text-ardor-muted">© 2026 ARDOR Madrid. All rights reserved.</p>
        <p className="font-montserrat text-xs text-ardor-muted">Crafted with passion in Madrid</p>
      </div>
    </footer>
  )
}
