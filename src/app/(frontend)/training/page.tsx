import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'

// i18n
import T from '@/components/i18n/T'
import type { TextPair } from '@/components/i18n/lang-context'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

// ----- helpers -----
const isTextPair = (v: any): v is TextPair => v && typeof v === 'object' && 'fr' in v && 'en' in v
const renderMaybePair = (v: string | TextPair | undefined) =>
  v ? isTextPair(v) ? <T pair={v} /> : v : null

// ----- static text -----
const TEXT = {
  h1: { fr: 'Entraînement et coaching', en: 'Training & Coaching' } as TextPair,
  leadQ1: {
    fr: 'Vous êtes passionné par le tir sportif à la carabine ?',
    en: 'Are you passionate about rifle target shooting?',
  } as TextPair,
  leadQ2: {
    fr: 'Vous avez le sentiment que votre progression n’est pas à la hauteur de votre investissement ?',
    en: 'Do you feel your progress doesn’t match your effort?',
  } as TextPair,
  leadQ3: {
    fr: 'Vous voulez faire encore mieux mais pensez avoir besoin de meilleurs conseils ?',
    en: 'Want to go further but need better guidance?',
  } as TextPair,
  leadEnd: {
    fr: 'Quel que soit votre niveau, Esprit Carabine saura vous accompagner dans votre projet sportif.',
    en: 'Whatever your level, Esprit Carabine will support your sporting goals.',
  } as TextPair,

  aboutTitle: { fr: 'À propos', en: 'About' } as TextPair,
  aboutBody: {
    fr: `Membre des équipes de France pendant 27 ans, Champion du Monde et d’Europe, ancien recordman du Monde, entraîneur national arbalète match puis carabine pendant 10 ans, Pascal Bessy propose de vous faire bénéficier de son expérience dans toutes les épreuves carabine (ISSF) se tirant à 10, 50 ou 300 mètres.`,
    en: `A member of the French national teams for 27 years, World and European Champion, former World Record holder, and national coach for match crossbow then rifle for 10 years, Pascal Bessy offers his experience across all ISSF rifle events at 10, 50 and 300 meters.`,
  } as TextPair,

  offersTitle: { fr: 'Nos formules', en: 'Our offers' } as TextPair,
  offersLead: {
    fr: 'Pour le moment les inscriptions se font uniquement par mail et sur appel téléphonique.',
    en: 'For now, registrations are by email and phone call only.',
  } as TextPair,
  offersHow: {
    fr: 'Pour toute demande, merci de nous contacter :',
    en: 'For any request, please contact us:',
  } as TextPair,
  emailLabel: { fr: 'Par mail :', en: 'By email:' } as TextPair,

  ctaTitle: {
    fr: 'Prêt à améliorer vos performances ?',
    en: 'Ready to improve your performance?',
  } as TextPair,
  ctaText: {
    fr: 'Contactez-nous pour organiser votre séance d’entraînement personnalisée.',
    en: 'Contact us to arrange your personalised training session.',
  } as TextPair,
  ctaBtn: { fr: 'Nous contacter', en: 'Contact us' } as TextPair,
}

const Training = async () => {
  const payload = await getPayload({ config })

  // If you want EN content from Payload for this page automatically:
  // const coachingPhotosData = await payload.find({ collection: 'coaching', locale: 'en', fallbackLocale: 'fr' })
  const coachingPhotosData = await payload.find({ collection: 'coaching' })

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-20 text-left">
          <h1 className="text-5xl max-w-3xl mx-auto font-bold mb-6 tracking-tight">
            <T pair={TEXT.h1} />
          </h1>

          <p className="text-xl max-w-3xl mx-auto text-white/90 mb-4">
            <T pair={TEXT.leadQ1} />
          </p>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            <T pair={TEXT.leadQ2} />
            <br />
            <T pair={TEXT.leadQ3} />
            <br />
            <T pair={TEXT.leadEnd} />
          </p>
        </div>
      </div>

      {/* Photos (title/caption support string or localized object) */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {coachingPhotosData?.docs?.map((photo: any, index: number) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-gray-800">
            {/* Optional card title from backend */}
            {photo?.title && (
              <div className="p-4 text-center text-white text-lg font-semibold border-b border-white/20">
                {renderMaybePair(photo.title)}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 p-4">
              {photo?.images?.map((img: any, imgIndex: number) => {
                const src =
                  typeof img?.image === 'object' && img?.image?.url
                    ? img.image.url
                    : typeof img?.image === 'string'
                      ? img.image
                      : '/default-image.jpg'
                const alt =
                  (isTextPair(img?.caption) ? (img.caption as TextPair).fr : img?.caption) ||
                  `Coaching image ${imgIndex + 1}`

                return (
                  <div key={imgIndex}>
                    <Image
                      src={src}
                      alt={alt}
                      width={500}
                      height={300}
                      className="rounded-md w-full object-cover"
                    />
                    {img?.caption && (
                      <div className="mt-2 text-center text-white text-sm font-medium">
                        {renderMaybePair(img.caption)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          <T pair={TEXT.aboutTitle} />
        </h2>
        <div className="border-t-2 border-sky-600 w-20 mb-6" />
        <p className="text-lg text-gray-300">
          <T pair={TEXT.aboutBody} />
        </p>
      </div>

      {/* Coaching Offers */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          <T pair={TEXT.offersTitle} />
        </h2>
        <div className="border-t-2 border-sky-600 w-20 mb-6" />
        <p className="text-gray-300 mb-6">
          <T pair={TEXT.offersLead} />
        </p>
        <p className="text-gray-300">
          <T pair={TEXT.offersHow} />
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>
            <T pair={TEXT.emailLabel} />{' '}
            <a href="mailto:contact@esprit-carabine.fr" className="text-blue-400 underline">
              contact@esprit-carabine.fr
            </a>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <T pair={TEXT.ctaTitle} />
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            <T pair={TEXT.ctaText} />
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            <T pair={TEXT.ctaBtn} /> <Send className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Training
