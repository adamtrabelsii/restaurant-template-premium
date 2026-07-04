import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Send } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import Wordmark from './common/Wordmark'

const SOCIAL = [
  { label: 'Instagram', Icon: Instagram, href: 'https://www.instagram.com/ardormadrid' },
  { label: 'Facebook',  Icon: Facebook,  href: 'https://www.facebook.com/ardormadrid' },
]

export default function Footer({ reducedMotion }) {
  const { t, tArray } = useLanguage()
  const navLinks = tArray('footer.links')
  const address = tArray('footer.address')
  const socialAriaTpl = t('footer.socialAria')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="relative bg-ardor-mid pt-20 pb-8 overflow-hidden">
      {/* Animated gradient rule */}
      <motion.div
        className="w-full h-px mb-16"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--red) 35%, var(--gold) 65%, transparent 100%)' }}
        initial={reducedMotion ? false : { scaleX: 0, originX: 0 }}
        whileInView={reducedMotion ? {} : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <p className="font-cormorant font-bold italic text-white text-4xl tracking-wider mb-3">
            <Wordmark />
          </p>
          <p className="font-cormorant italic text-white/60 text-base mb-6">{t('footer.tagline')}</p>
          <div className="flex gap-3">
            {SOCIAL.map(({ label, Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialAriaTpl.replace('{network}', label)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-ardor-gold hover:border-ardor-gold/40 transition-colors duration-200 cursor-pointer"
                whileHover={reducedMotion ? {} : { y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={16} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="md:col-span-2">
          <h4 className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red mb-6">{t('footer.navigateHeading')}</h4>
          <ul className="space-y-3 font-montserrat text-sm text-white/60">
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ardor-gold transition-colors duration-200">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <h4 className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red mb-6">{t('footer.findUsHeading')}</h4>
          <address className="not-italic font-montserrat text-sm text-white/60 space-y-2">
            {address.map((line, i) => <p key={i}>{line}</p>)}
            <p className="pt-2 font-mono tabular">
              <a href={`tel:${t('footer.phone').replace(/\s/g, '')}`} className="hover:text-ardor-gold transition-colors">{t('footer.phone')}</a>
            </p>
            <p>
              <a href={`mailto:${t('footer.email')}`} className="hover:text-ardor-gold transition-colors">{t('footer.email')}</a>
            </p>
          </address>
          <div className="mt-6 font-montserrat text-[11px] text-white/50 space-y-1">
            <p><span className="text-white">{t('footer.hours.weekdays.label')}</span> · <span className="font-mono tabular">{t('footer.hours.weekdays.value')}</span></p>
            <p><span className="text-white">{t('footer.hours.weekend.label')}</span> · <span className="font-mono tabular">{t('footer.hours.weekend.value')}</span></p>
            <p><span className="text-white">{t('footer.hours.sunday.label')}</span> · <span className="font-mono tabular">{t('footer.hours.sunday.value')}</span></p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3">
          <h4 className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red mb-6">{t('footer.newsletter.heading')}</h4>
          <p className="font-montserrat text-xs text-white/50 mb-4 leading-relaxed">
            {t('footer.newsletter.blurb')}
          </p>
          {subscribed ? (
            <p className="font-cormorant italic text-ardor-gold text-sm">{t('footer.newsletter.subscribed')}</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }}
              className="flex items-center gap-2 border-b border-white/15 focus-within:border-ardor-gold transition-colors"
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('footer.newsletter.placeholder')}
                aria-label={t('footer.newsletter.emailAria')}
                className="flex-1 bg-transparent text-sm text-white py-2 outline-none placeholder:text-white/25 font-montserrat"
              />
              <button type="submit" className="text-white/60 hover:text-ardor-gold transition-colors cursor-pointer" aria-label={t('footer.newsletter.submitAria')}>
                <Send size={16} strokeWidth={1.5} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-montserrat text-[11px] text-white/40">{t('footer.copyright')}</p>
        <p className="font-montserrat text-[11px] text-white/40">{t('footer.crafted')}</p>
      </div>
    </footer>
  )
}
