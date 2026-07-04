import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './common/Reveal'
import FloatingPaths from './ui/floating-paths'

const FIELD = 'w-full bg-transparent border-b border-white/15 text-white font-montserrat text-sm py-3 outline-none placeholder:text-white/25 focus:border-ardor-gold transition-colors duration-200'
const DINNER_TIMES = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
const SUNDAY_TIMES = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8]
const STEPS = ['date', 'guests', 'details']
const EASE = [0.16, 1, 0.3, 1]

// Local date (not UTC) so the min doesn't drift around midnight
const todayLocal = () => new Date().toLocaleDateString('en-CA')

// Matches the opening hours in the footer + JSON-LD:
// closed Mondays, lunch-only Sundays, dinner Tue–Sat.
function timesFor(dateStr) {
  if (!dateStr) return DINNER_TIMES
  const day = new Date(`${dateStr}T12:00:00`).getDay()
  if (day === 1) return null // Monday — closed
  if (day === 0) return SUNDAY_TIMES
  return DINNER_TIMES
}

export default function Reservations({ reducedMotion }) {
  const { t } = useLanguage()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ date: '', time: '', guests: '', name: '', email: '' })

  const update = (k, v) => setData(d => ({ ...d, [k]: v }))
  const times = timesFor(data.date)
  const isMonday = data.date && times === null
  const isSunday = data.date && times === SUNDAY_TIMES

  const setDate = (v) => {
    const allowed = timesFor(v)
    setData(d => ({ ...d, date: v, time: allowed && allowed.includes(d.time) ? d.time : '' }))
  }

  const canNext = () => {
    if (step === 0) return data.date && data.time && !isMonday
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
      <FloatingPaths reducedMotion={reducedMotion} />
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgb(var(--red-rgb) / 0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 50% 80%, rgb(var(--gold-rgb) / 0.06) 0%, transparent 70%)' }}
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
              className="glass spotlight rounded-sm p-8 md:p-10"
            >
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-4 mb-10">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => i <= step && setStep(i)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] transition-all duration-300 ${
                        i === step ? 'bg-ardor-gold text-ardor-darker' :
                        i < step ? 'bg-ardor-gold/20 text-ardor-gold cursor-pointer' :
                        'border border-white/15 text-white/30'
                      }`}
                      aria-label={t('reservations.stepAria').replace('{n}', String(i + 1))}
                      aria-current={i === step ? 'step' : undefined}
                    >
                      {i + 1}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className="w-12 h-px bg-white/10 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-ardor-gold origin-left"
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
                          onChange={e => setDate(e.target.value)}
                          min={todayLocal()}
                          className={`${FIELD} [color-scheme:dark]`}
                        />
                        {isMonday && (
                          <p role="status" className="font-montserrat text-xs text-ardor-red mt-3">{t('reservations.closedMonday')}</p>
                        )}
                        {isSunday && (
                          <p role="status" className="font-montserrat text-xs text-ardor-gold/80 mt-3">{t('reservations.sundayLunch')}</p>
                        )}
                      </div>
                      {!isMonday && (
                        <div>
                          <p id="res-time-label" className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted mb-3">{t('reservations.labels.time')}</p>
                          <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-labelledby="res-time-label">
                            {(times || DINNER_TIMES).map(time => (
                              <button
                                key={time}
                                type="button"
                                role="radio"
                                aria-checked={data.time === time}
                                onClick={() => update('time', time)}
                                className={`font-mono text-xs py-3 rounded-sm border transition-all duration-200 cursor-pointer tabular ${
                                  data.time === time
                                    ? 'border-ardor-gold text-ardor-gold bg-ardor-gold/5'
                                    : 'border-white/10 text-white/70 hover:border-white/30'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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
                      <p id="res-guests-label" className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-ardor-muted mb-3">{t('reservations.labels.guests')}</p>
                      <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-labelledby="res-guests-label">
                        {GUESTS.map(g => (
                          <button
                            key={g}
                            type="button"
                            role="radio"
                            aria-checked={data.guests === g}
                            onClick={() => update('guests', g)}
                            className={`font-mono text-xl py-6 rounded-sm border transition-all duration-200 cursor-pointer tabular ${
                              data.guests === g
                                ? 'border-ardor-gold text-ardor-gold bg-ardor-gold/5'
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
                        {data.date} · {data.time} · {data.guests} {data.guests === 1 ? t('reservations.guestSingular') : t('reservations.guestPlural')}
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
                    {t('reservations.back')}
                  </button>

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => canNext() && setStep(s => s + 1)}
                      disabled={!canNext()}
                      className="relative font-montserrat text-[11px] tracking-[0.3em] uppercase text-white px-8 py-3 rounded-full overflow-hidden border border-white/15 group disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--red), var(--gold))' }} />
                      <span className="relative">{t('reservations.next')}</span>
                    </button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={loading || !canNext()}
                      className="relative font-montserrat text-[11px] tracking-[0.3em] uppercase text-ardor-darker px-10 py-3 rounded-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      whileHover={reducedMotion || loading ? {} : { scale: 1.02 }}
                      whileTap={reducedMotion || loading ? {} : { scale: 0.97 }}
                    >
                      <span className="absolute inset-0" style={{ background: 'var(--gold)' }} />
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
              <div className="w-16 h-16 rounded-full bg-ardor-gold/10 border border-ardor-gold/40 mx-auto mb-6 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-ardor-gold" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-cormorant italic text-ardor-gold text-3xl mb-3">{t('reservations.successTitle')}</p>
              <p className="font-montserrat text-white/60 text-xs tracking-wide">{t('reservations.successBody')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
