'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Logo from '../images/Logo.svg'

import { useLang, type TextPair } from '@/components/i18n/lang-context'
import LangToggle from '@/components/i18n/lang-toggle'

type HeroProps = {
  title: TextPair
  description: TextPair
  image?: string
  images?: string[] // on utilisera uniquement images[1] si disponible
}

const navigation: { name: TextPair; href: string }[] = [
  { name: { fr: 'Accueil', en: 'Home' }, href: '/' },
  { name: { fr: 'Qui sommes nous ?', en: 'About us' }, href: '/about' },
  { name: { fr: 'Universal Concept', en: 'Universal Concept' }, href: '/universal-concept' },
  { name: { fr: 'Boutique', en: 'Shop' }, href: '/shop' },
  { name: { fr: 'Entraînement', en: 'Training' }, href: '/training' },
  { name: { fr: 'Partenaires', en: 'Partners' }, href: '/partners' },
  { name: { fr: 'Témoignages', en: 'Testimonials' }, href: '/testimonials' },
  { name: { fr: 'Contact', en: 'Contact' }, href: '/contact' },
]

export default function HeroComponent({ title, description, image, images }: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLang()

  // on choisit la 2e image si elle existe
  const heroSrc = Array.isArray(images) && images[1] ? images[1] : image

  return (
    <div className="bg-gray-900">
      {/* HEADER */}
      <header className="absolute inset-x-0 top-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Ligne 1 : Logo plein largeur, centré, avec glow */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between lg:justify-center relative">
            <Link href="/" className="group/logo relative inline-flex items-center">
              {/* glow conservé */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-[999px] bg-sky-400/20 blur-3xl group-hover/logo:bg-sky-400/30 transition"
              />
              <Image
                src={Logo}
                alt="Logo Esprit Carabine"
                priority
                sizes="(max-width: 1024px) 80vw, 60vw"
                className="h-[auto] w-[18rem] sm:w-[24rem] md:w-[30rem] lg:w-[38rem] xl:w-[44rem]
                           drop-shadow-[0_8px_30px_rgba(56,189,248,0.55)]
                           transition-transform duration-300 group-hover/logo:scale-[1.02]"
              />
            </Link>

            {/* Right cluster: Lang toggle + Burger */}
            <div className="flex items-center gap-2">
              <LangToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                aria-label={t({ fr: 'Ouvrir le menu', en: 'Open menu' })}
              >
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </div>

          {/* Ligne 2 : Navigation centrée sous le logo (desktop) */}
          <nav aria-label="Global" className="hidden lg:block border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        relative text-sm md:text-base font-medium whitespace-nowrap
                        text-white/80 hover:text-white transition-colors
                        px-3 py-2 rounded-xl hover:bg-white/5 group
                      "
                    >
                      {t(item.name)}
                      <span
                        className="
                          absolute left-1/2 bottom-1 h-[2px] w-0
                          bg-sky-400/70 transition-all duration-300
                          group-hover:left-3 group-hover:w-[calc(100%-1.5rem)]
                          rounded-full
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Menu mobile (drawer) */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 text-gray-900 font-semibold">
                  Esprit Carabine
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-indigo-600 transition-colors"
                  aria-label={t({ fr: 'Fermer le menu', en: 'Close menu' })}
                >
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* toggle in drawer */}
              <div className="mt-4 mb-6">
                <LangToggle className="w-full justify-center" />
              </div>

              <div className="mt-2 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t(item.name)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </motion.div>
      </header>

      {/* HERO */}
      <div className="relative isolate pt-40 sm:pt-48">
        {/* TOP GRADIENT */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="py-20 sm:py-40 lg:pb-40">
          <div className="mx-auto max-w-full px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-white">
                  {t(title)}
                </h1>
                <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">
                  {t(description)}
                </p>
              </motion.div>
            </div>

            {/* Image héro : uniquement la 2e image */}
            {heroSrc && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mt-16 sm:mt-24"
              >
                <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
                  <Image
                    src={heroSrc}
                    alt={t(title)}
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* BOTTOM GRADIENT */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
