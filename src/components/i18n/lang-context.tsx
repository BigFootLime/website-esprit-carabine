'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Lang = 'fr' | 'en'
export type TextPair = { fr: string; en: string }

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (pair: TextPair) => string
}

const LanguageContext = createContext<Ctx | null>(null)

type ProviderProps = {
  initialLang: Lang // provided by server (cookie)
  children: React.ReactNode
}

export function LanguageProvider({ initialLang, children }: ProviderProps) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  // keep cookie + localStorage in sync
  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}`
      localStorage.setItem('lang', l)
      // update <html lang="">
      if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', l)
    } catch {}
  }

  // on first client load, prefer localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Lang | null
      if (stored && stored !== lang) setLang(stored)
      else document.documentElement.setAttribute('lang', lang)
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const t = (pair: TextPair) => (lang === 'en' ? pair.en : pair.fr)

  const value = useMemo(() => ({ lang, setLang, t }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
