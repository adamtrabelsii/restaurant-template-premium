import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const FIELD_CLASS = 'w-full bg-transparent border-b border-white/20 text-white font-montserrat text-sm py-2 outline-none placeholder:text-white/20 focus:border-ardor-red transition-colors duration-200'
const TIMES = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM']

export default function Reservations({ reducedMotion }) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const guestsOptions = t('reservations.guestsOptions')

  return (
    <section id="reservations" className="bg-ardor-dark py-24 md:py-32">
      <div className="max-w-xl mx-auto px-6">

        <motion.div
          className="text-center mb-12"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">{t('reservations.eyebrow')}</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t('reservations.title')}
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
          <p className="font-montserrat text-ardor-muted text-sm mt-5">
            {t('reservations.blurb')}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="res-name" className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">{t('reservations.labels.name')}</label>
                  <input id="res-name" type="text" required placeholder={t('reservations.placeholders.name')} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="res-email" className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">{t('reservations.labels.email')}</label>
                  <input id="res-email" type="email" required placeholder={t('reservations.placeholders.email')} className={FIELD_CLASS} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="res-date" className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">{t('reservations.labels.date')}</label>
                  <input id="res-date" type="date" required className={`${FIELD_CLASS} [color-scheme:dark]`} />
                </div>
                <div>
                  <label htmlFor="res-time" className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">{t('reservations.labels.time')}</label>
                  <select id="res-time" required defaultValue="" className={`${FIELD_CLASS} bg-ardor-dark appearance-none`}>
                    <option value="" disabled>{t('reservations.placeholders.time')}</option>
                    {TIMES.map(time => (
                      <option key={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="res-guests" className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">{t('reservations.labels.guests')}</label>
                <select id="res-guests" required defaultValue="" className={`${FIELD_CLASS} bg-ardor-dark appearance-none`}>
                  <option value="" disabled>{t('reservations.placeholders.guests')}</option>
                  {guestsOptions.map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 text-center">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="font-montserrat text-sm tracking-[0.3em] uppercase bg-ardor-gold text-ardor-dark px-12 py-4 font-medium w-full md:w-auto disabled:opacity-60"
                  whileHover={reducedMotion ? {} : { backgroundColor: '#E63946', color: '#ffffff' }}
                  whileTap={reducedMotion ? {} : { scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {loading ? t('reservations.submitting') : t('reservations.submit')}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <p className="font-cormorant italic text-ardor-gold text-2xl mb-3">{t('reservations.successTitle')}</p>
              <p className="font-montserrat text-ardor-muted text-xs">{t('reservations.successBody')}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
