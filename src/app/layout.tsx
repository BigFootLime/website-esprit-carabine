// src/app/layout.tsx
import React from 'react'
import './(frontend)/styles.css'
import { Geist, Geist_Mono } from 'next/font/google'

// fonts at the root is fine
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = {
  title: 'Esprit-Carabine',
  description: 'Vendeur de carabines',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="oZK17Mq0oMkCjpkb81l-7HBMPY2KE0MBM6QlvGp0TtM"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* DO NOT put Header/Footer here, so /admin won't get them */}
        {children}
      </body>
    </html>
  )
}
