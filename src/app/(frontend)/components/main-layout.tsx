'use client'

import { usePathname } from 'next/navigation'
import { hero as heroData } from '../data/hero'
import HeroComponent from './hero'
import type { TextPair } from '@/components/i18n/lang-context'

// accept string OR TextPair, then normalize to TextPair
type MaybePair = string | TextPair
const toPair = (v: MaybePair): TextPair => (typeof v === 'string' ? { fr: v, en: v } : v)

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const heroContent = heroData.find((item) => item.href === pathname)

  // normalize only if we found a hero
  const normalizedHero = heroContent && {
    ...heroContent,
    // if your data already holds TextPair, this keeps it; if it's a string, it duplicates to fr/en
    title: toPair((heroContent as any).title),
    description: toPair((heroContent as any).description),
  }

  return (
    <div className="relative isolate bg-white">
      {normalizedHero && <HeroComponent {...(normalizedHero as any)} />}
      <div className="">{children}</div>
    </div>
  )
}
