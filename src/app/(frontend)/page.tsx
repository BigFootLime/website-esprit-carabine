'use client'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import image1 from '../(frontend)/images/UniversalConcept.jpg'
import image2 from '../(frontend)/images/entrainement.jpeg'
import image3 from '../(frontend)/images/NosValeurs.jpg'
import { motion } from 'framer-motion'
import { useLang, type TextPair } from '@/components/i18n/lang-context'

export default function HomePage() {
  const { t } = useLang()

  const pageTitle: TextPair = {
    fr: 'Excellence française en tir sportif',
    en: 'French excellence in sport shooting',
  }
  const pageSubtitle: TextPair = {
    fr: 'Découvrez notre expertise, au service des tireurs de tous niveaux',
    en: 'Discover our expertise, serving shooters of all levels',
  }

  const cards = [
    {
      img: image1,
      title: { fr: 'Universal Concept', en: 'Universal Concept' } as TextPair,
      text: {
        fr: 'Une innovation unique alliant modularité, ergonomie et précision maximale',
        en: 'A unique innovation combining modularity, ergonomics, and maximum precision',
      } as TextPair,
      cta: { fr: 'Découvrir', en: 'Discover' } as TextPair,
      alt: { fr: 'Universal Concept', en: 'Universal Concept' } as TextPair,
      href: '/universal-concept',
    },
    {
      img: image2,
      title: { fr: 'Entraînement & Coaching', en: 'Training & Coaching' } as TextPair,
      text: {
        fr: 'Perfectionnez votre technique avec Pascal Bessy. Des stages personnalisés pour tous les niveaux.',
        en: 'Improve your technique with Pascal Bessy. Personalized training for all levels.',
      } as TextPair,
      cta: { fr: 'Se perfectionner', en: 'Improve' } as TextPair,
      alt: { fr: 'Entraînement & Coaching', en: 'Training & Coaching' } as TextPair,
      href: '/training',
    },
    {
      img: image3,
      title: { fr: 'Qui sommes nous', en: 'About us' } as TextPair,
      text: {
        fr: "Excellence française, innovation constante et passion du tir sportif. Découvrez l'histoire et les valeurs d'Esprit Carabine.",
        en: 'French excellence, constant innovation and passion for sport shooting. Discover our story and values.',
      } as TextPair,
      cta: { fr: 'En savoir plus', en: 'Learn more' } as TextPair,
      alt: { fr: 'Nos valeurs', en: 'Our values' } as TextPair,
      href: '/about',
    },
  ]

  const cta = {
    title: {
      fr: 'Prêt à améliorer vos performances ?',
      en: 'Ready to improve your performance?',
    } as TextPair,
    text: {
      fr: "Découvrez l'Universal Concept ou réservez un stage d'entraînement personnalisé avec Pascal Bessy",
      en: 'Discover the Universal Concept or book a personalized training session with Pascal Bessy',
    } as TextPair,
    primary: {
      fr: "Explorer l'Universal Concept",
      en: 'Explore the Universal Concept',
    } as TextPair,
    secondary: { fr: 'Nous contacter', en: 'Contact us' } as TextPair,
  }

  return (
    <main className="relative isolate bg-gray-900 overflow-hidden ">
      {/* Featured Sections */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-120"
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

      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-5xl">
                {t(pageTitle)}
              </h2>
              <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto">{t(pageSubtitle)}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((c) => (
              <div
                key={c.href}
                className="bg-gray-800 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] group"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={c.img}
                    alt={t(c.alt)}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white">{t(c.title)}</h3>
                  <p className="text-gray-300 mb-6">{t(c.text)}</p>
                  <Link
                    href={c.href}
                    className="inline-flex items-center px-4 py-2 text-link-primary font-medium hover:text-link-hover transition-colors"
                  >
                    {t(c.cta)}
                    <ChevronRightIcon className="ml-1 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t(cta.title)}</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">{t(cta.text)}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/universal-concept"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-sky-700 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >
              {t(cta.primary)}
              <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white bg-transparent rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-white/10 hover:shadow-2xl"
            >
              {t(cta.secondary)}
              <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
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
    </main>
  )
}
