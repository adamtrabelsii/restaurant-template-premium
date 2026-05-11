import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FIELD_CLASS = 'w-full bg-transparent border-b border-white/20 text-white font-montserrat text-sm py-2 outline-none placeholder:text-white/20 focus:border-ardor-red transition-colors duration-200'

export default function Reservations() {
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

  return (
    <section id="reservations" className="bg-ardor-dark py-24 md:py-32">
      <div className="max-w-xl mx-auto px-6">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-ardor-red mb-3">Join Us</p>
          <h2 className="font-cormorant font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Haz Tu Reserva
          </h2>
          <div className="w-16 h-px bg-ardor-gold mx-auto mt-5" />
          <p className="font-montserrat text-ardor-muted text-sm mt-5">
            Reserve your table at ARDOR. We look forward to welcoming you.
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
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Full Name</label>
                  <input type="text" required placeholder="Ana García" className={FIELD_CLASS} />
                </div>
                <div>
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Email</label>
                  <input type="email" required placeholder="ana@example.com" className={FIELD_CLASS} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Date</label>
                  <input type="date" required className={`${FIELD_CLASS} [color-scheme:dark]`} />
                </div>
                <div>
                  <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Time</label>
                  <select required className={`${FIELD_CLASS} bg-ardor-dark appearance-none`}>
                    <option value="" disabled defaultValue="">Select time</option>
                    {['7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM'].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-montserrat text-xs tracking-widest uppercase text-ardor-muted mb-2">Guests</label>
                <select required className={`${FIELD_CLASS} bg-ardor-dark appearance-none`}>
                  <option value="" disabled defaultValue="">Number of guests</option>
                  {['1 Guest','2 Guests','3 Guests','4 Guests','5 Guests','6 Guests','7+ Guests (please call)'].map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 text-center">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="font-montserrat text-sm tracking-[0.3em] uppercase bg-ardor-gold text-ardor-dark px-12 py-4 font-medium w-full md:w-auto disabled:opacity-60"
                  whileHover={{ backgroundColor: '#E63946', color: '#ffffff' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {loading ? 'Reserving…' : 'Confirm Reservation'}
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
              <p className="font-cormorant italic text-ardor-gold text-2xl mb-3">¡Perfecto! Your table is reserved.</p>
              <p className="font-montserrat text-ardor-muted text-xs">A confirmation will be sent to your email.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
