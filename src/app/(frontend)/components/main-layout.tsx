'use client'

import { usePathname } from 'next/navigation'
import { hero as heroData } from '../data/hero'
import HeroComponent from './hero'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const heroContent = heroData.find((item) => item.href === pathname)

  return (
    <div className="relative isolate bg-white">
      {heroContent && <HeroComponent {...heroContent} />}
      <div className="mt-20">{children}</div>
    </div>
  )
}
