// src/app/(frontend)/layout.tsx
import React from 'react'
import Headers from './components/layout/header'
import MainLayout from './components/main-layout'
import Footer from './components/layout/footer'

// ⬇️ Add these two:
import { LanguageProvider } from '@/components/i18n/lang-context'
import { detectInitialLang } from '@/components/i18n/server-lang'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const initialLang = await detectInitialLang() // runs on server

  return (
    <LanguageProvider initialLang={initialLang}>
      <Headers />
      <main>
        <MainLayout>{children}</MainLayout>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
