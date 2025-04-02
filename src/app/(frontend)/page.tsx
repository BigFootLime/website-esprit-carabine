'use client'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import image1 from '../(frontend)/images/ImageUniversalConcept.png'
import image2 from '../(frontend)/images/ImageTraining.jpg'
import image3 from '../(frontend)/images/NosValeurs.jpg'
import { motion } from 'framer-motion'

export default function HomePage() {
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
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Excellence française du tir sportif
            </h2>
            <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto">
              Découvrez notre expertise et nos solutions innovantes pour les tireurs de tous niveaux
            </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] group">
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={image1}
                  alt="Universal Concept"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white">Universal Concept</h3>
                <p className="text-gray-300 mb-6">
                  Une innovation unique alliant ergonomie et modularité pour une précision maximale.
                  Découvrez notre système de crosses ajustables et personnalisables.
                </p>
                <Link
                  href="/universal-concept"
                  className="inline-flex items-center px-4 py-2 text-link-primary font-medium hover:text-link-hover transition-colors"
                >
                  Découvrir
                  <ChevronRightIcon className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] group">
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={image2}
                  alt="Entraînement & Coaching"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white">Entraînement & Coaching</h3>
                <p className="text-gray-300 mb-6">
                  Perfectionnez votre technique avec Pascal Bessy. Des stages personnalisés pour
                  tous les niveaux, du débutant au tireur de haut niveau.
                </p>
                <Link
                  href="/training"
                  className="inline-flex items-center px-4 py-2 text-link-primary font-medium hover:text-link-hover transition-colors"
                >
                  Se perfectionner
                  <ChevronRightIcon className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] group">
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={image3}
                  alt="Nos valeurs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white">Nos valeurs</h3>
                <p className="text-gray-300 mb-6">
                  Excellence française, innovation constante et passion du tir sportif. Découvrez
                  l&apos;histoire et les valeurs qui font Esprit Carabine.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center px-4 py-2 text-link-primary font-medium hover:text-link-hover transition-colors"
                >
                  En savoir plus
                  <ChevronRightIcon className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à améliorer vos performances ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Découvrez l&apos;Universal Concept ou réservez un stage d&apos;entraînement personnalisé
            avec Pascal Bessy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/universal-concept"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-link-primary bg-white hover:bg-link-hover transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Explorer l&apos;Universal Concept
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-link-primary bg-transparent border-2 border-white hover:bg-white/10 transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Nous contacter
              <ChevronRightIcon className="ml-2 h-5 w-5" />
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
