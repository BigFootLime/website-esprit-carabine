'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Send, ArrowRight } from 'lucide-react'
import heroFallback from '../images/who1.jpg'
import heroFallback2 from '../images/who2.jpg'

type MediaRef = { url?: string }
type AboutImage = { image?: MediaRef | string; caption?: string }
type AboutDoc = { images?: AboutImage[] }
type AboutRes = { docs?: AboutDoc[] }

export default function AboutPage() {
  const [doc, setDoc] = useState<AboutDoc | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Helpers to safely extract URLs from Payload (or fallbacks)
  const getUrl = (item?: AboutImage) => {
    if (!item?.image) return undefined
    if (typeof item.image === 'string') return item.image
    if ('url' in item.image!) return (item.image as MediaRef).url
    return undefined
  }

  const heroUrl = getUrl(doc?.images?.[0]) // first image
  const secondUrl = getUrl(doc?.images?.[1]) // second image

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Qui sommes nous ?</h1>

            <p className="text-xl max-w-3xl text-white/90 mb-6">
              La société Esprit Carabine a vu le jour au début de l’année 2014. Créée par Cécile et
              Pascal Bessy, anciens membres des équipes de France à la carabine 10m, 50m et 300m,
              Esprit Carabine conçoit et commercialise des crosses de carabine et des accessoires
              destinés à la compétition dans les disciplines ISSF tirées à 50m et 300m.
            </p>
            <p className="text-xl max-w-3xl text-white/90 mb-6">
              Passionnés par la compétition et l’innovation, nous mettons notre vécu d’athlètes et
              notre expérience au service de tous les tireurs.
            </p>
            <p className="text-xl max-w-3xl text-white/90 mb-6">
              Nos partenaires, implantés en région Auvergne–Rhône–Alpes, contribuent à faire
              connaître le savoir-faire de notre région et apportent à nos produits le gage de la
              qualité « Made in France ».
            </p>
            <p className="text-xl max-w-3xl text-white/90 mb-10">
              Compétiteurs dans l’âme, nous vous accompagnons dans votre projet sportif, en vous
              conseillant et en vous guidant à l’entraînement comme en compétition.
            </p>

            <div className="flex justify-start">
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
              >
                Acheter une crosse <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Right: two-image stack */}
          <div className="w-full">
            <div className="grid grid-rows-2 gap-6">
              {/* Top (Hero) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800">
                <Image
                  src={heroFallback}
                  alt="Esprit Carabine – Qui sommes-nous (image 1)"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Bottom (Second image) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800">
                <Image
                  src={heroFallback2}
                  alt="Esprit Carabine – Qui sommes-nous (image 2)"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* subtle top divider to separate visually when stacked */}
                <div className="pointer-events-none absolute -top-3 left-8 right-8 h-0.5 bg-white/10 rounded-full" />
              </div>
            </div>

            {error ? <p className="mt-3 text-sm text-red-400">Erreur : {error}</p> : null}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Prêt à améliorer vos performances ?</h2>
          <p className="text-xl mb-8 max-w-3xl opacity-90">
            Contactez-nous pour découvrir l&apos;Universal Concept et trouver la configuration
            parfaite pour vous.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Nous contacter <Send className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
