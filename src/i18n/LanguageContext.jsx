import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import en from './locales/en.json'
import es from './locales/es.json'
import { BRAND } from '../config/brand'

const DICTS = { en, es }
const STORAGE_KEY = `${BRAND.storagePrefix}-lang`
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
    const dict = DICTS[lang]
    document.documentElement.lang = lang
    document.title = dict.meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', dict.meta.description)
    const skip = document.querySelector('.skip-link')
    if (skip) skip.textContent = dict.meta.skipLink
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

  // Like t(), but guaranteed to return an array — a missing key can never
  // reach a .map() as the key string.
  const tArray = useCallback((key) => {
    const value = lookup(DICTS[lang], key)
    return Array.isArray(value) ? value : []
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t, tArray }), [lang, setLang, t, tArray])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
