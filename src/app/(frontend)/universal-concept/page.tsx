import React from 'react'
import { ArrowRight, Target, Grip, Rocket, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const UniversalConcept = async () => {
  const universalConceptData = await payload.find({
    collection: 'universalConcept',
  })

  const features = [
    {
      title: 'Fixation conventionnelle',
      description:
        'Notre système de fixation conventionnel offre une compatibilité maximale avec de nombreux modèles tout en garantissant une stabilité optimale.',
      icon: Target,
      points: [
        'Compatible avec la majorité des actions du marché',
        'Système de fixation par vis haute résistance',
        'Ajustement précis pour un alignement parfait',
        'Installation simple et rapide',
      ],
    },
    {
      title: 'Fixation par le canon',
      description:
        'Innovation exclusive Esprit Carabine, notre système de fixation par le canon révolutionne la précision et la stabilité.',
      icon: Grip,
      points: [
        'Serrage par cônes pour une rigidité maximale',
        'Réduction significative des vibrations',
        'Amélioration de la précision',
        'Système breveté unique sur le marché',
      ],
    },
    {
      title: 'Ergonomie et modularité',
      description:
        "Chaque tireur est unique, c'est pourquoi nous avons développé un système entièrement modulable pour une personnalisation totale.",
      icon: Rocket,
      points: [
        'Poignée rotative multi-axes',
        'Busc ajustable en hauteur et en angle',
        'Plaque de couche réglable',
        'Équilibrage modulable par masses additionnelles',
      ],
    },
  ]

  const paragraphs = [
    {
      title: 'La méthode conventionnelle',
      description: [
        "Le boîtier est fixé de manière conventionnelle sur la crosse par des vis, le canon restant flottant. L'Universal Concept offre la possibilité de fixer de cette manière la plupart des boîtiers de culasse les plus fréquemment utilisés en compétition, soit directement, soit par l'intermédiaire d'un insert d'adaptation.",
      ],
    },
    {
      title: 'La fixation par le canon',
      description: [
        "Dans ce cas c'est le canon qui est directement fixé à la crosse, le boîtier de culasse n'étant pas en contact avec celle ci. Nous utilisons pour cela un dispositif de serrage par cônes que nous avons conçu.",
        "Le canon étant rendu plus rigide par les deux blocs de fixation, ce procédé d'assemblage contribue à diminuer les mouvements de la bouche lors de la sortie de la balle. Ainsi fixé, le canon reste positionné très bas sur la crosse.",
        "Testé, validé et utilisé par des tireurs du plus haut niveau, ce dispositif procure une remarquable précision et une réaction de la carabine plus douce que dans le cas d'une action canonnée fixée classiquement dans une crosse métallique. Ce système permet d'autre part de fixer sur la crosse un grand nombre d'actions dotées de canons de calibre 22LR de diamètres allant de 20mm à 26mm.",
        "Ces deux procédés d'assemblage confèrent à notre crosse son caractère universel, laissant au tireur le libre choix de son boîtier et de son canon. De plus, il est ainsi possible d'utiliser la même crosse pour pratiquer le tir à 50 mètres ou à 300 mètres.",
      ],
    },
    {
      title: 'Ergonomie',
      description: [
        "L'ergonomie aboutie de l'Universal Concept convient aux tireurs de toutes morphologies grâce aux multiples réglages possibles et à leurs amplitudes.",
        "La partie arrière de la crosse, très courte pour s'adapter même aux petits gabarits, est conçue « en fourche » et permet que la force constituée par le recul de l'arme s'exerce parfaitement dans l'axe de celle-ci, permettant ainsi une réaction au départ du coup extrêmement saine.",
        "La poignée, montée sur rotule, est ajustable dans tous les plans et permet un positionnement parfait de la main et du poignet, contribuant ainsi à améliorer l'action de l'index sur la queue de détente.",
        'Le busc, réglable en tous sens et sans outil, permet au tireur de trouver aisément un placement parfait de la tête quelle que soit la position de tir.',
        "Afin de permettre au tireur de trouver l'équilibre idéal de sa carabine, notamment en position « debout », le busc de l'Universal Concept peut être équipé d'un contrepoids. Positionné exactement dans l'axe de la crosse, celui-ci ne déséquilibrera pas le tireur et n'engendrera aucune réaction latérale lors du départ du coup.",
        "Entièrement fabriquée sur centre d'usinage informatisé dans des matériaux de haut de gamme, l'Universal Concept a fait l'objet d'études et de tests approfondis garantissant à son utilisateur un fonctionnement parfait.",
        "Son universalité, les avancées technologiques qu'elle propose, sa robustesse et sa qualité de fabrication font de l'Universal Concept l'élément de liaison idéal qui permet au tireur de tirer le meilleur profit de son canon.",
        "Et comme nous savons qu'un carabinier aime sa carabine et que nous aimons aussi les belles choses, nous vous proposons un choix de finitions qui permettra sans doute d'exhausser vos souhaits.",
      ],
    },
  ]

  const informations = [
    {
      title: 'Crosse - Fixation - Conventionnelle',
      description: [
        "L'intérieur du fût de l'Universal Concept est usiné de manière à pouvoir recevoir la plupart des actions de compétition, soit directement, soit par l'intermédiaire d'un insert d'adaptation.",
      ],
      annexes: [
        {
          title: "Actions se fixant sans insert d'adaptation:",
          list: [
            'Anschütz série 2000',
            'Bleiker Challenger',
            'Grünig R2 / R3',
            'Rieder & Lenz « Z »',
          ],
        },
        {
          title: "Actions nécessitant l'utilisation d'un insert d'adaptation :",
          list: [
            'Anschütz séries Match 54 / 1800 / 1900 / 54.30',
            'Walther KK 200 / 300 / 500',
            'Bleiker pour le tir à 300 mètres',
            'Grünig ST200 / FT300',
          ],
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc) => doc.title === 'Crosse - Fixation - Conventionnelle')
          ?.images?.map((image) => image.image) || [],
    },
    {
      title: 'Crosse - Fixation - Par le canon par cônes de serrage',
      description: [
        'Ce dispositif a été conçu par Esprit Carabine pour répondre à la demande de tireurs qui recherchaient les avantages de la fixation par le canon tout en ayant le canon placé le plus bas possible sur la crosse.',
        'Le canon est maintenu par des cônes usinés dans un matériau qui assure la rigidité du montage et qui contribue également à limiter la transmission des vibrations et de la chaleur, permettant ainsi de réduire les problèmes liés à la dilatation lors de tirs effectués par hautes températures.',
        "La partie 'libre' du canon étant réduite, l'amplitude des mouvements de la bouche induits par les vibrations est moindre lors de la sortie de la balle.",
      ],
      images:
        universalConceptData?.docs
          .find((doc) => doc.title === 'Crosse - Fixation - Par le canon par cônes de serrage')
          ?.images?.map((image) => image.image) || [],
    },
    {
      title: 'Crosse - Finition - Anodisation dure (noir mat)',
      description: [
        "Une finition alliant l'élégance avec la robustesse. Réalisée après microbillage, l'aspect de la crosse est donc satiné.",
      ],
      annexes: [
        {
          title: 'Traitements des pièces annexes : Nickelage satiné',
          list: [
            'plaque de recouvrement arrière',
            'pontet',
            'pièces du busc',
            'support de plaque de couche',
            'adaptateur universel de plaque de couche',
            'blocs de fixation du canon',
          ],
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc) => doc.title === 'Crosse - Finition - Anodisation dure (noir mat)')
          ?.images?.map((image) => image.image) || [],
    },
    {
      title: 'Crosse - Finition - Anodisation en couleur',
      description: [
        "Pour les tireurs qui aiment la couleur nous proposons également l'anodisation classique, en rouge ou en bleu.",
        "Elle est aussi réalisée après microbillage et l'aspect de la crosse est donc toujours satiné.",
      ],
      annexes: [
        {
          title: 'Traitements des pièces annexes : Nickelage satiné',
          list: [
            'plaque de recouvrement arrière',
            'pontet',
            'pièces du busc',
            'support de plaque de couche',
            'adaptateur universel de plaque de couche',
            'blocs de fixation du canon',
          ],
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc) => doc.title === 'Crosse - Finition - Anodisation en couleur')
          ?.images?.map((image) => image.image) || [],
    },
    {
      title: 'Pommeau',
      description: [
        "Désormais reconnu comme l'un des meilleurs actuellement commercialisés, le pommeau d'Esprit Carabine permet un réglage dans tous les plans pour un poids maximal de seulement 371 grammes.",
        'La plaquette au contact de la main est finement quadrillée pour une adhérence optimale, avec ou sans gant de tir. Elle est disponible en deux largeurs, 50 ou 60 millimètres.',
      ],
      images:
        universalConceptData?.docs
          .find((doc) => doc.title === 'Pommeau')
          ?.images?.map((image) => image.image) || [],
    },
    {
      title: 'Contrepoids',
      description: [
        "Spécialement étudié pour le tir en position debout, ce contrepoids se fixe sur la crémaillère du busc. Il est positionné exactement dans l'axe de la crosse et ne peut pas occasionner de déséquilibre latéral.",
      ],
      images:
        universalConceptData?.docs
          .find((doc) => doc.title === 'Contrepoids')
          ?.images?.map((image) => image.image) || [],
    },
  ]

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">Principe</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90 mb-10">
            « L&apos;Universal Concept permet de choisir entre deux procédés d&apos;assemblage de la carabine. »
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-white text-link-primary font-semibold rounded-lg hover:bg-link-hover transition"
            >
              Acheter une crosse <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
  
      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16 flex flex-col items-center gap-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon
            return (
              <div
                key={index}
                className="bg-white text-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <FeatureIcon className="mr-4 text-accent-principle" />
                  <h3 className="text-2xl font-bold text-primary">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center text-primary">
                      <span className="mr-3 w-2 h-2 bg-accent-principle rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
  
        {/* Paragraphs Section */}
        <div className="w-full mt-16 space-y-12">
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-semibold text-white mb-4">{paragraph.title}</h3>
            <div className="border-t-2 border-sky-600 w-20 mb-6"></div> {/* 👈 ligne ajoutée */}
            <div className="space-y-4 text-gray-300 text-justify leading-relaxed">
              {paragraph.description.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          </div>
          
          ))}
        </div>
      </div>
  
      {/* Informations Section */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {informations.map((info, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4">{info.title}</h2>
            <div className="border-t-2 border-sky-600 w-20 mb-6"></div> 
  
            {info.images && info.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                {info.images.map((image, imageIndex) => (
                  <Image
                    key={imageIndex}
                    src={
                      typeof image === 'object' && image !== null && 'url' in image && image.url
                        ? image.url
                        : '/default-image.jpg'
                    }
                    alt={info.title}
                    className="rounded-lg shadow-md w-full object-cover"
                    width={500}
                    height={300}
                    layout="responsive"
                  />
                ))}
              </div>
            )}
  
            <div className="space-y-4 text-gray-300 text-justify">
              {info.description.map((desc, descIndex) => (
                <p key={descIndex}>{desc}</p>
              ))}
            </div>
  
            {info.annexes && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {info.annexes.map((annex, annexIndex) => (
                  <div key={annexIndex}>
                    <h3 className="text-xl font-semibold text-white mb-2">{annex.title}</h3>
                    <div className="border-t border-sky-600 w-16 mb-2"></div>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {annex.list.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* Call to Action */}
      <div className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à améliorer vos performances ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contactez-nous pour découvrir l&apos;Universal Concept et trouver la configuration parfaite pour vous.
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

export default UniversalConcept
