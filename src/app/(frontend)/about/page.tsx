import React from 'react'
import { Send, Calendar, Video, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Training = () => {
  const coachingServices = [
    {
      title: 'Stage Individuel (Week-end)',
      description: 'Programme personnalisé avec Pascal Bessy',
      imagePlaceholder: '400/250',
      imageAlt: 'Entraînement individuel avec Pascal Bessy',
      icon: Calendar,
      buttonText: "S'inscrire",
      buttonLink: '/inscription',
    },
    {
      title: 'Stage Groupe (Week-end)',
      description: 'Formez-vous en équipe pour progresser ensemble',
      imagePlaceholder: '400/250',
      imageAlt: 'Stage de groupe de tir sportif',
      icon: Users,
      buttonText: 'Voir les prochaines dates',
      buttonLink: '/calendrier',
    },
    {
      title: 'Coaching à Distance',
      description: 'Accompagnement par vidéo, téléphone et mail',
      imagePlaceholder: '400/250',
      imageAlt: 'Coaching à distance par visioconférence',
      icon: Video,
      buttonText: 'En savoir plus',
      buttonLink: '/coaching-distance',
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Pascal Bessy Coaching Section */}
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-12">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-justify">
            Créée au début de l&apos;année 2014 par Cécile et Pascal Bessy, anciens membres des
            équipes de France de tir à la carabine à 10 mètres, 50 mètres et 300 mètres, la société
            Esprit Carabine conçoit et commercialise des crosses de carabine et des accessoires
            destinés à la compétition pour les distances de 50 et 300 mètres. Nos produits sont donc
            élaborés par des carabiniers pour satisfaire tous les carabiniers, du débutant au plus
            grand champion international. La compétition est notre passion, ainsi que
            l&apos;innovation dans le domaine de la recherche de la précision. Notre vécu
            d&apos;athlètes et notre expertise dans le domaine du tir de haut niveau font notre
            force. Nous sommes aussi en relation permanente avec un vaste réseau composé de tireurs,
            d&apos;entraîneurs et de revendeurs et nous avons également une parfaite connaissance
            des techniques mises en œuvre dans le cadre de l&apos;élaboration et de la fabrication
            du matériel destiné au tir sportif à la carabine. Ainsi, nous sommes à même de concevoir
            et de développer les produits qui répondent le plus à vos attentes. » Nos partenaires,
            qui œuvrent avec nous pour vous satisfaire, sont tous situés en région
            Auvergne-Rhône-Alpes car nous souhaitons contribuer à faire connaître le savoir faire de
            notre région. Par leurs compétences, ils apportent ainsi à nos produits le gage de la
            qualité « Made in France ». Compétiteurs dans l&apos;âme, nous saurons de plus vous
            accompagner dans votre projet sportif en vous conseillant et en vous guidant dans le
            cadre de votre entraînement. Choisir Esprit Carabine, c&apos;est aussi partager une
            passion commune.
          </p>
        </section>

        {/* Why Coaching Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-primary mb-6">Pascal</h3>
          <p className="text-justify mb-4">
            Membre de l&apos;Equipe de France de tir pendant 27 ans, Pascal Bessy a toujours été
            passionné par la recherche de la performance. Il a ainsi logiquement cherché à améliorer
            la précision de ses carabines et s&pos;est en particulier attaché à faire évoluer les
            crosses.
          </p>
          <p className="text-justify">
            Champion du Monde senior à la carabine 10 mètres, médaillé à plusieurs reprises lors de
            coupes du Monde, ancien recordman du Monde du 3X40 à 50 mètres avec finale, vice
            champion du Monde du 3X40 à 50 mètres et à 300 mètres, champion d&pos;Europe du 3X40 et
            du 60 balles couché à 300 mètres et de multiples fois champion et recordman de France,
            il fut ensuite Entraîneur National de 2010 à 2020. Il est aujourd&pos;hui le président
            d&pos;Esprit Carabine et utilise son expérience du haut niveau pour concevoir et
            améliorer les produits mais aussi pour conseiller les tireurs ainsi que pour encadrer
            les stages proposés par Esprit Carabine.
          </p>
        </section>
        <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-primary mb-6">Cécile</h3>
          <p className="text-justify">Rien de changé</p>
        </section>

        {/* Coaching Services Cards */}
        <section>
          <h3 className="text-3xl font-bold text-primary mb-8 text-center">
            Nos Formules de Coaching
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {coachingServices.map((service, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Image
                  width={400}
                  height={250}
                  src={`/api/placeholder/${service.imagePlaceholder}`}
                  alt={service.imageAlt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="mr-3 text-accent-principle" />
                    <h4 className="text-xl font-bold text-primary">{service.title}</h4>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link
                    href={service.buttonLink}
                    className="inline-flex items-center px-4 py-2 bg-accent-principle text-white font-medium rounded-lg hover:bg-accent-secondary transition"
                    aria-label={`Plus d'infos sur ${service.title}`}
                  >
                    {service.buttonText}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Call to Action */}
      <footer className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à améliorer vos performances ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contactez-nous pour découvrir l&apos;Universal Concept et bénéficier d&apos;un coaching
            personnalisé avec Pascal Bessy.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition"
            aria-label="Nous contacter pour un coaching"
          >
            Nous contacter <Send className="ml-2" />
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Training
