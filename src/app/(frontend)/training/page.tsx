import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const Training = async () => {
  const payload = await getPayload({ config })

  const coachingPhotosData = await payload.find({ collection: 'coaching' })

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-20 text-left">
          <h1 className="text-5xl max-w-3xl mx-auto font-bold mb-6 tracking-tight">
            Entraînement et coaching
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 mb-10">
            Vous êtes passionné par le tir sportif à la carabine ?
          </p>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Vous avez le sentiment que votre progression n’est pas à la hauteur de votre
            investissement ?<br />
            Vous voulez faire encore mieux mais pensez avoir besoin de meilleurs conseils ?<br />
            Quel que soit votre niveau, Esprit Carabine saura vous accompagner dans votre projet
            sportif.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {coachingPhotosData?.docs.map((photo, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-gray-800">
            {/* {photo.title && (
              <div className="p-4 text-center text-white text-lg font-semibold border-b border-white/20">
                {photo.title}
              </div>
            )} */}

            <div className="grid grid-cols-1 gap-6 p-4">
              {photo.images?.map((img, imgIndex) => (
                <div key={imgIndex}>
                  <Image
                    src={
                      typeof img?.image === 'object' &&
                      img.image !== null &&
                      'url' in img.image &&
                      img.image.url
                        ? img.image.url
                        : '/default-image.jpg'
                    }
                    alt={img?.caption || `Coaching image ${imgIndex + 1}`}
                    width={500}
                    height={300}
                    className="rounded-md w-full object-cover"
                  />
                  {/* <div className="mt-2 text-center text-white text-sm font-medium">
                    {img.caption}
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-4">À propos</h2>
        <div className="border-t-2 border-sky-600 w-20 mb-6"></div>
        <p className="text-lg text-gray-300">
          Membre des équipes de France pendant 27 ans, Champion du Monde et d’Europe, ancien
          recordman du Monde, entraîneur national arbalète match puis carabine pendant 10 ans,
          Pascal Bessy propose de vous faire bénéficier de son expérience dans toutes les épreuves
          carabine (ISSF) se tirant à 10, 50 ou 300 mètres.
        </p>
      </div>

      {/* Coaching Offers */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-4">Nos formules</h2>
        <div className="border-t-2 border-sky-600 w-20 mb-6"></div>
        <p className="text-gray-300 mb-6">
          Pour le moment les inscriptions se font uniquement par mail et sur appel téléphonique.
        </p>
        <p className="text-gray-300">Pour toute demande, merci de nous contacter :</p>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>
            Par mail :{' '}
            <a href="mailto:contact@espritcarabine.fr" className="text-blue-400 underline">
              contact@espritcarabine.fr
            </a>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à améliorer vos performances ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contactez-nous pour organiser votre séance d’entraînement personnalisée.
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

export default Training
