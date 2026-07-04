import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { BRAND } from '../../config/brand'
import Wordmark from './Wordmark'

const SESSION_KEY = `${BRAND.storagePrefix}-visited`

function alreadyVisited() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export default function LoadingScreen({ reducedMotion }) {
  const { t } = useLanguage()
  const [done, setDone] = useState(() => reducedMotion || alreadyVisited())

  useEffect(() => {
    if (done) return
    let cancelled = false
    const finish = () => {
      if (cancelled) return
      try { window.sessionStorage.setItem(SESSION_KEY, '1') } catch { /* private mode */ }
      setDone(true)
    }
    // End on real readiness (fonts decoded), capped at 800ms — never an
    // artificial wait longer than the content needs.
    const cap = setTimeout(finish, 800)
    if (document.fonts?.ready) {
      document.fonts.ready.then(finish)
    }
    return () => {
      cancelled = true
      clearTimeout(cap)
    }
  }, [done])

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
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Wordmark />
            </motion.div>
            <div className="w-48 h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, var(--red), var(--gold))' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-ardor-muted">
              {t('loading.label')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
