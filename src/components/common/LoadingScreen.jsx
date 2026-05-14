import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ reducedMotion }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reducedMotion) { setDone(true); return }
    const t = setTimeout(() => setDone(true), 1600)
    return () => clearTimeout(t)
  }, [reducedMotion])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ardor-darker"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            className="absolute inset-0 grid-bg opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="font-cormorant font-bold italic text-white"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              ARD<span className="text-ardor-red">O</span>R
            </motion.div>
            <div className="w-48 h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #A8323F, #C9A961)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-muted">
              Loading experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
