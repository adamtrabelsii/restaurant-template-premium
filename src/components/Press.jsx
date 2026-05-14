import { useLanguage } from '../i18n/LanguageContext'

const ITEMS = [
  'Michelin Guide',
  "World's 50 Best",
  'Condé Nast Traveler',
  'El País Gastro',
  'Wine Spectator',
  'GQ España',
  'Forbes Travel',
  'Time Out Madrid',
]

export default function Press({ reducedMotion }) {
  const { t } = useLanguage()

  const items = [...ITEMS, ...ITEMS]

  return (
    <section aria-label="Press and awards" className="relative bg-ardor-mid py-16 border-y border-white/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-center gap-3">
        <span className="w-8 h-px bg-ardor-neon/40" />
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-neon">
          {t('press.eyebrow') || 'As featured in'}
        </p>
        <span className="w-8 h-px bg-ardor-neon/40" />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--mid) 0%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, var(--mid) 0%, transparent 100%)' }} />

        <div className={`flex gap-12 w-max ${reducedMotion ? '' : 'animate-marquee'}`}>
          {items.map((label, i) => (
            <div
              key={i}
              className="font-cormorant italic text-2xl md:text-3xl text-white/40 hover:text-ardor-neon transition-colors duration-300 whitespace-nowrap"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
