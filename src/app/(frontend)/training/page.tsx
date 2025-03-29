import React from 'react'
import { ArrowRight, Send, Calendar, Video, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Training = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=2574',
      alt: 'Universal Concept',
      width: 400,
      height: 250,
    },
    {
      src: 'https://images.unsplash.com/photo-1598026595010-5d479e544d14?auto=format&fit=crop&q=80&w=2574',
      alt: 'Entraînement & Coaching',
      width: 400,
      height: 250,
    },
  ]

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
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">Principe</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90 mb-10">
            « L&apos;Universal Concept permet de choisir entre deux procédés d&apos;assemblage de la
            carabine. »
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-white text-link-primary font-semibold rounded-lg hover:bg-link-hover transition"
              aria-label="En savoir plus sur l'entraînement"
            >
              En savoir plus <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </header>
      {/* Pascal Bessy Coaching Section */}
      <main className="container mx-auto px-4 py-16">
        {/* Images */}
        <section className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-64 mb-8">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="object-cover w-full h-full rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-bold">Vous êtes passionné par le tir sportif à la carabine ?</h2>
          <p>
            Vous avez le sentiment que votre progression n&apos;est pas à la hauteur de votre
            investissement ?
          </p>
          <p>Vous voulez faire encore mieux mais pensez avoir besoin de meilleurs conseils ?</p>

          <p>
            Quel que soit votre niveau, <strong>Esprit Carabine</strong> saura vous accompagner dans
            votre projet sportif.
          </p>

          <p>Pour vous faire progresser techniquement mais aussi pour vous aider à :</p>
          <ul className="list-disc list-inside mb-4">
            <li>Définir vos objectifs en fonction de votre niveau</li>
            <li>Planifier votre saison sportive</li>
            <li>
              Construire vos plans d&apos;entraînement en prenant en compte votre disponibilité
            </li>
          </ul>

          <p>
            Nous pouvons aussi être à vos côtés pour vous aider à préparer une compétition ou vous y
            accompagner dans le cadre d&apos;un coaching personnalisé.
          </p>

          <h2 className="font-bold mt-3">À propos</h2>
          <p>
            Membre des équipes de France pendant 27 ans puis entraîneur national pendant 10 ans dans
            les disciplines arbalète match et carabine, <strong>Pascal Bessy</strong> propose de
            vous faire bénéficier de son vécu et de ses compétences dans toutes les disciplines
            carabine qu&apos;il a pratiqué au plus haut niveau en tant que tireur ou entraîneur :
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Carabine 10m</li>
            <li>Carabine 50m</li>
            <li>Carabine 300m</li>
          </ul>

          <h2 className="font-bold mt-3">Nos Formules</h2>
          <p>
            Esprit Carabine vous propose plusieurs formules afin de répondre au mieux à vos besoins
            :
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Stages individuels d&apos;un ou deux jours durant les week-ends (site à définir avec
              le tireur)
            </li>
            <li>
              Stages de groupes d&apos;un ou deux jours durant les week-ends (site à définir avec le
              groupe)
            </li>
            <li>
              Suivi à distance (un rendez-vous par vidéo par semaine, contact téléphonique et par
              mail)
            </li>
          </ul>

          <h2 className="font-bold mt-3">Thèmes abordés</h2>
          <ul>
            <li>Préparation technique (du débutant au tireur de haut niveau)</li>
            <li>Préparation du matériel (armes, crosses, munitions)</li>
            <li>Préparation à la compétition</li>
            <li>Coaching</li>
          </ul>

          <h2 className="font-bold mt-3">Contact</h2>
          <p>
            Tarifs sur demande par mail à :{' '}
            <a href="mailto:contact@esprit-carabine.fr">contact@esprit-carabine.fr</a>
          </p>
        </section>

        {/* Coaching with Pascal Bessy Section */}

        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Coaching avec Pascal Bessy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Améliorez vos performances avec un coach expert du tir de haut niveau.
          </p>
        </section>

        {/* Why Coaching Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-primary mb-6">Pourquoi se faire coacher ?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Le coaching par un expert comme Pascal Bessy vous apporte :
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-primary">
                  <span className="mr-3 w-2 h-2 bg-accent-principle rounded-full"></span>
                  Une analyse technique personnalisée
                </li>
                <li className="flex items-center text-primary">
                  <span className="mr-3 w-2 h-2 bg-accent-principle rounded-full"></span>
                  Des méthodes d'entraînement éprouvées au plus haut niveau
                </li>
                <li className="flex items-center text-primary">
                  <span className="mr-3 w-2 h-2 bg-accent-principle rounded-full"></span>
                  Un accompagnement mental pour progresser en compétition
                </li>
                <li className="flex items-center text-primary">
                  <span className="mr-3 w-2 h-2 bg-accent-principle rounded-full"></span>
                  Des ajustements précis de votre équipement
                </li>
              </ul>
            </div>
            <div>
              <Image
                width={500}
                height={300}
                src="/api/placeholder/500/300"
                alt="Pascal Bessy coaching un tireur"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
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
