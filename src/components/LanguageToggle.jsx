import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle({ reducedMotion, className = '' }) {
  const { lang, setLang, t } = useLanguage()

  const options = [
    { code: 'en', label: 'EN', aria: t('navbar.switchToEnglish') },
    { code: 'es', label: 'ES', aria: t('navbar.switchToSpanish') },
  ]

  return (
    <div
      className={`relative inline-flex items-center rounded-full border border-white/15 p-0.5 font-montserrat text-[10px] font-medium tracking-[0.2em] uppercase ${className}`}
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => {
        const active = lang === opt.code
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLang(opt.code)}
            aria-pressed={active}
            aria-label={opt.aria}
            className="relative px-3 py-1 cursor-pointer transition-colors duration-200"
            style={{ color: active ? '#fff' : '#9CA3AF' }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-ardor-red"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 400, damping: 30 }
                }
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
