'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Send } from 'lucide-react'

// i18n
import T from '@/components/i18n/T'
import type { TextPair } from '@/components/i18n/lang-context'

import crpPreview from '@/app/(frontend)/images/IMG_Main.png'

// --- Types ---
type MaybeStatic = string | StaticImageData

type WebsitePreviewCardProps = {
  href: string
  title: TextPair
  subtitle?: TextPair
  image: MaybeStatic
  ariaLabel?: TextPair
  external?: boolean
  /** Page-only red button */
  redCta?: boolean
}

// --- Localized static text ---
const TEXT = {
  partnerTitle: { fr: 'Notre partenaire', en: 'Our Partner' } as TextPair,

  // Body paragraphs
  p1: {
    fr: 'Croix-Rousse Précision (CRP) est un acteur de référence en usinage de haute précision, basé en région lyonnaise. Habituée aux exigences des secteurs industriels les plus pointus, l’équipe CRP accompagne ses clients de la pré-étude jusqu’à la production série.',
    en: 'Croix-Rousse Précision (CRP) is a leading high-precision machining company based in the Lyon area. Used to the most demanding industrial sectors, the CRP team supports clients from pre-study to series production.',
  } as TextPair,
  p2: {
    fr: 'Nous collaborons avec CRP sur la conception et la fabrication de pièces clés, afin de garantir la fiabilité, la répétabilité et la qualité « Made in France » qui font la réputation d’Esprit Carabine.',
    en: 'We work with CRP on the design and manufacturing of key parts, ensuring the reliability, repeatability, and “Made in France” quality that Esprit Carabine is known for.',
  } as TextPair,
  p3: {
    fr: 'Leur savoir-faire en usinage 3-5 axes, assemblage et contrôle qualité est un atout majeur pour nos développements produits — du prototypage à l’industrialisation.',
    en: 'Their expertise in 3-5 axis machining, assembly, and quality control is a major asset for our product developments — from prototyping to industrialization.',
  } as TextPair,

  // Buttons (top band)
  visitCRP: { fr: 'Visiter le site CRP', en: 'Visit CRP website' } as TextPair,
  contactUs: { fr: 'Nous contacter', en: 'Contact us' } as TextPair,

  // Card ctas
  ctaVisit: { fr: 'Visiter le site', en: 'Visit website' } as TextPair,
  ctaDiscover: { fr: 'Découvrir', en: 'Discover' } as TextPair,

  // Captions / notes
  previewNote: {
    fr: '*Aperçu non contractuel. Cliquez pour ouvrir le site dans un nouvel onglet.',
    en: '*Non-contractual preview. Click to open the website in a new tab.',
  } as TextPair,

  // CTA band bottom
  bandTitle: { fr: 'Envie d’aller plus loin ?', en: 'Want to go further?' } as TextPair,
  bandText: {
    fr: 'Parlons de vos besoins : de la configuration optimale à la fabrication, nous vous accompagnons de bout en bout.',
    en: 'Let’s talk about your needs: from optimal configuration to manufacturing, we support you end-to-end.',
  } as TextPair,

  // Cards
  crpTitle: { fr: 'Croix-Rousse Précision', en: 'Croix-Rousse Précision' } as TextPair,
  crpSubtitle: {
    fr: 'Usinage de haute précision — Lyon',
    en: 'High-precision machining — Lyon',
  } as TextPair,
  crpAria: {
    fr: 'Aperçu du site de Croix-Rousse Précision',
    en: 'Preview of Croix-Rousse Précision website',
  } as TextPair,

  ecTitle: { fr: 'Esprit Carabine', en: 'Esprit Carabine' } as TextPair,
  ecSubtitle: {
    fr: 'Découvrez nos crosses & l’Universal Concept',
    en: 'Discover our stocks & the Universal Concept',
  } as TextPair,
  ecAria: {
    fr: 'Aperçu du site Esprit Carabine',
    en: 'Preview of Esprit Carabine website',
  } as TextPair,
} as const

// --- Page-only red button style helper ---
const redBtn =
  'inline-flex items-center px-6 py-3 rounded-lg font-semibold transition bg-red-600 text-white hover:bg-red-500'

// --- Card component (bilingual with red CTA option) ---
function WebsitePreviewCard({
  href,
  title,
  subtitle,
  image,
  ariaLabel,
  external = false,
  redCta = true, // red by default on this page
}: WebsitePreviewCardProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ? undefined : undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gray-800"
    >
      {/* Image preview */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={image || '/images/placeholder-wide.jpg'} // set a safe placeholder
          alt={typeof title === 'string' ? title : title.fr}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 960px"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Overlay content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-2xl font-semibold leading-tight">
          <T pair={title} />
        </h3>
        {subtitle ? (
          <p className="mt-1 text-white/80">
            <T pair={subtitle} />
          </p>
        ) : null}

        <div
          className={`${redCta ? redBtn : 'inline-flex items-center px-4 py-2 rounded-lg bg-white text-blue-900 font-semibold transition hover:bg-gray-100'} mt-4 gap-2`}
        >
          {external ? (
            <>
              <T pair={TEXT.ctaVisit} /> <ExternalLink className="h-4 w-4" />
            </>
          ) : (
            <>
              <T pair={TEXT.ctaDiscover} /> <ArrowRight className="h-4 w-4" />
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function PartnerPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text content */}
          <div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              <T pair={TEXT.partnerTitle} />
            </h1>

            <p className="text-xl max-w-3xl text-white/90 mb-6">
              <T pair={TEXT.p1} />
            </p>
            <p className="text-xl max-w-3xl text-white/90 mb-6">
              <T pair={TEXT.p2} />
            </p>
            <p className="text-xl max-w-3xl text-white/90 mb-10">
              <T pair={TEXT.p3} />
            </p>

            <div className="flex flex-wrap gap-3">
              {/* Red buttons only for this page */}
              <Link
                href="https://croix-rousse-precision.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className={redBtn}
              >
                <T pair={TEXT.visitCRP} /> <ExternalLink className="ml-2 h-4 w-4" />
              </Link>

              {/* <Link href="/contact" className={redBtn}>
                <T pair={TEXT.contactUs} /> <Send className="ml-2 h-4 w-4" />
              </Link> */}
            </div>
          </div>

          {/* Right: previews */}
          <div className="w-full">
            <WebsitePreviewCard
              href="https://croix-rousse-precision.fr/"
              title={TEXT.crpTitle}
              subtitle={TEXT.crpSubtitle}
              image={crpPreview} // <-- mets une image locale ou une URL autorisée
              external
              ariaLabel={TEXT.crpAria}
              redCta
            />

            <p className="mt-3 text-sm text-gray-300">
              <T pair={TEXT.previewNote} />
            </p>

            <div className="my-8 h-px w-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            <T pair={TEXT.bandTitle} />
          </h2>
          <p className="text-xl mb-8 max-w-3xl opacity-90">
            <T pair={TEXT.bandText} />
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            <T pair={TEXT.contactUs} /> <Send className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
