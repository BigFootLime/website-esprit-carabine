import React from 'react'
import './(frontend)/styles.css'

import { Geist, Geist_Mono } from 'next/font/google'
import Headers from './(frontend)/components/layout/header'
import MainLayout from './(frontend)/components/main-layout'
import Footer from './(frontend)/components/layout/footer'

export const metadata = {
  description: 'Vendeur de carabines',
  title: 'Payload Blank Template',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Headers />
        <main>
          <MainLayout>{children}</MainLayout>
        </main>
        <Footer />
      </body>
    </html>
  )
}
