// src/app/(frontend)/layout.tsx
import React from 'react'
import Headers from './components/layout/header'
import MainLayout from './components/main-layout'
import Footer from './components/layout/footer'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Headers />
      <main>
        <MainLayout>{children}</MainLayout>
      </main>
      <Footer />
    </>
  )
}
