import { motion } from 'framer-motion'

const revealLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const revealRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
}

export default function About({ reducedMotion }) {
  const vp = { once: true, amount: 0.2 }
  const initial = reducedMotion ? false : 'hidden'
  const whileInView = reducedMotion ? {} : 'show'

  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left: quote */}
        <motion.div variants={revealLeft} initial={initial} whileInView={whileInView} viewport={vp}>
          <div className="flex gap-6 items-start">
            {/* Animated red rule */}
            <motion.div
              className="w-1 bg-ardor-red rounded flex-shrink-0"
              initial={reducedMotion ? false : { scaleY: 0, originY: 0 }}
              whileInView={reducedMotion ? {} : { scaleY: 1 }}
              viewport={vp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ height: '100%' }}
            />
            <div>
              <p
                className="font-cormorant italic text-ardor-dark leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                "Fire. Flavor.<br />Feeling."
              </p>
              <p className="font-montserrat text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
                Born in the kitchens of Madrid, ARDOR brings the untamed spirit of Spanish cuisine to every plate.
                We cook with charcoal, patience, and a relentless obsession with flavour — from the finest Ibérico
                to the freshest coastal catch.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ardor-red flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=96&q=80"
                    alt="Head chef at ARDOR"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-cormorant font-semibold text-ardor-dark text-lg">Chef Alejandro Vega</p>
                  <p className="font-montserrat text-xs text-gray-400 tracking-widest uppercase">Executive Chef & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div variants={revealRight} initial={initial} whileInView={whileInView} viewport={vp}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="ARDOR kitchen atmosphere"
              className="w-full h-96 md:h-[28rem] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-white/70">Madrid, Spain</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
