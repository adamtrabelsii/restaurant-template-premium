import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import en from './locales/en.json'
import es from './locales/es.json'

const DICTS = { en, es }
const STORAGE_KEY = 'lang'
const DEFAULT_LANG = 'es'

const LanguageContext = createContext(null)

function readStoredLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'en' || stored === 'es' ? stored : DEFAULT_LANG
}

function lookup(dict, key) {
  const parts = key.split('.')
  let cur = dict
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = cur[p]
  }
  return cur
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (next !== 'en' && next !== 'es') return
    window.localStorage.setItem(STORAGE_KEY, next)
    setLangState(next)
  }, [])

  const t = useCallback((key) => {
    const value = lookup(DICTS[lang], key)
    return value === undefined ? key : value
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
