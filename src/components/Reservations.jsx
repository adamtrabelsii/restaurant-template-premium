import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'

const FIELD = 'w-full bg-transparent border-b border-white/15 text-white font-montserrat text-sm py-3 outline-none placeholder:text-white/25 focus:border-ardor-neon transition-colors duration-200'
const TIMES = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8]
const STEPS = ['date', 'guests', 'details']
const EASE = [0.16, 1, 0.3, 1]

export default function Reservations({ reducedMotion }) {
  const { t } = useLanguage()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ date: '', time: '', guests: '', name: '', email: '' })

  const update = (k, v) => setData(d => ({ ...d, [k]: v }))

  const canNext = () => {
    if (step === 0) return data.date && data.time
    if (step === 1) return data.guests
    return data.name && data.email
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!canNext()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <section id="reservations" className="relative bg-ardor-darker py-28 md:py-40 overflow-hidden noise">
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(168,50,63,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 50% 80%, rgba(201,169,97,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-2xl mx-auto px-6">
        <Reveal reducedMotion={reducedMotion} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-ardor-red/60" />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-red">{t('reservations.eyebrow')}</p>
            <span className="w-8 h-px bg-ardor-red/60" />
          </div>
          <h2 className="font-cormorant font-bold italic text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {t('reservations.title')}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-ardor-gold to-transparent mx-auto mt-6" />
          <p className="font-montserrat text-white/60 text-sm mt-6">
            {t('reservations.blurb')}
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="glass rounded-sm p-8 md:p-10"
            >
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-4 mb-10">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => i <= step && setStep(i)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] transition-all duration-300 ${
                        i === step ? 'bg-ardor-neon text-ardor-darker' :
                        i < step ? 'bg-ardor-neon/20 text-ardor-neon cursor-pointer' :
                        'border border-white/15 text-white/30'
                      }`}
                      aria-label={`Step ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className="w-12 h-px bg-white/10 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-ardor-neon origin-left"
                          animate={{ scaleX: i < step ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step-date"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="space-y-7"
                    >
                      <div>
                        <label htmlFor="res-date" className="block font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted mb-3">{t('reservations.labels.date')}</label>
                        <input
                          id="res-date" type="date" required
                          value={data.date}
                          onChange={e => update('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className={`${FIELD} [color-scheme:dark]`}
                        />
                      </div>
                      <div>
                        <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted mb-3">{t('reservations.labels.time')}</p>
                        <div className="grid grid-cols-4 gap-2">
                          {TIMES.map(time => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => update('time', time)}
                              className={`font-mono text-xs py-3 rounded-sm border transition-all duration-200 cursor-pointer tabular ${
                                data.time === time
                                  ? 'border-ardor-neon text-ardor-neon bg-ardor-neon/5'
                                  : 'border-white/10 text-white/70 hover:border-white/30'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step-guests"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted mb-3">{t('reservations.labels.guests')}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {GUESTS.map(g => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => update('guests', g)}
                            className={`font-mono text-xl py-6 rounded-sm border transition-all duration-200 cursor-pointer tabular ${
                              data.guests === g
                                ? 'border-ardor-neon text-ardor-neon bg-ardor-neon/5'
                                : 'border-white/10 text-white/70 hover:border-white/30'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="space-y-7"
                    >
                      <div>
                        <label htmlFor="res-name" className="block font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted mb-3">{t('reservations.labels.name')}</label>
                        <input
                          id="res-name" type="text" required
                          value={data.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder={t('reservations.placeholders.name')}
                          className={FIELD}
                        />
                      </div>
                      <div>
                        <label htmlFor="res-email" className="block font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted mb-3">{t('reservations.labels.email')}</label>
                        <input
                          id="res-email" type="email" required
                          value={data.email}
                          onChange={e => update('email', e.target.value)}
                          placeholder={t('reservations.placeholders.email')}
                          className={FIELD}
                        />
                      </div>
                      <div className="pt-2 text-xs font-montserrat text-white/40 leading-relaxed">
                        {data.date} · {data.time} · {data.guests} {data.guests === 1 ? 'guest' : 'guests'}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="font-montserrat text-[11px] tracking-[0.3em] uppercase text-ardor-muted disabled:opacity-30 hover:text-white transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                  >
                    ← Back
                  </button>

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => canNext() && setStep(s => s + 1)}
                      disabled={!canNext()}
                      className="relative font-montserrat text-[11px] tracking-[0.3em] uppercase text-white px-8 py-3 rounded-full overflow-hidden border border-white/15 group disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #A8323F, #C9A961)' }} />
                      <span className="relative">Next →</span>
                    </button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={loading || !canNext()}
                      className="relative font-montserrat text-[11px] tracking-[0.3em] uppercase text-ardor-darker px-10 py-3 rounded-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      whileHover={reducedMotion || loading ? {} : { scale: 1.02 }}
                      whileTap={reducedMotion || loading ? {} : { scale: 0.97 }}
                    >
                      <span className="absolute inset-0" style={{ background: '#C9A961' }} />
                      <span className="relative">{loading ? t('reservations.submitting') : t('reservations.submit')}</span>
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="glass rounded-sm py-16 px-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-ardor-neon/10 border border-ardor-neon/40 mx-auto mb-6 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A961" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-cormorant italic text-ardor-neon text-3xl mb-3">{t('reservations.successTitle')}</p>
              <p className="font-montserrat text-white/60 text-xs tracking-wide">{t('reservations.successBody')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
