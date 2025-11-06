'use client'

import { useLang } from './lang-context'

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  const isEN = lang === 'en'

  return (
    <button
      type="button"
      onClick={() => setLang(isEN ? 'fr' : 'en')}
      aria-label={isEN ? 'Passer en français' : 'Switch to English'}
      className={`relative inline-flex items-center rounded-full bg-white/10 text-white/90
                  px-2 py-1 text-xs font-medium ring-1 ring-white/15 hover:bg-white/15 transition
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${className}`}
    >
      <span
        className={`mr-1 rounded-full px-2 py-0.5 ${!isEN ? 'bg-white text-gray-900' : 'text-white/80'}`}
      >
        FR
      </span>
      <span
        className={`rounded-full px-2 py-0.5 ${isEN ? 'bg-white text-gray-900' : 'text-white/80'}`}
      >
        EN
      </span>
    </button>
  )
}
