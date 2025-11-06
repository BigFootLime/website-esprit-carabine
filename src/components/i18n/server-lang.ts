import { cookies, headers } from 'next/headers'
import type { Lang } from './lang-context'

export async function detectInitialLang(): Promise<Lang> {
  const cookieStore = cookies()
  const c = (await cookieStore).get('lang')?.value
  if (c === 'en' || c === 'fr') return c as Lang

  // Fallback: Accept-Language
  const accept = (await headers()).get('accept-language') || ''
  return accept.toLowerCase().startsWith('en') ? 'en' : 'fr'
}
