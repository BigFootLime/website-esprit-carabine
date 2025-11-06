/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ArrowRight, Target, Grip, Rocket, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

// i18n
import T from '@/components/i18n/T'
import type { TextPair } from '@/components/i18n/lang-context'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/** Image encadrée avec fond clair + légère augmentation de taille */
function FramedImage({
  src,
  alt,
  className = '',
  priority = false,
  heightClass = 'h-80',
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  heightClass?: string
}) {
  return (
    <div className={`rounded-2xl bg-white/10 ring-1 ring-white/15 p-2 ${className}`}>
      <div className={`relative w-full ${heightClass} overflow-hidden rounded-xl`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  )
}

/** Carte générique avec titre + séparateur + description (bilingue) */
function InfoCard({
  title,
  description,
  children,
  className = '',
}: {
  title: TextPair
  description?: TextPair[] | null
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-gray-800/95 rounded-2xl p-8 shadow-lg ring-1 ring-white/10 ${className}`}>
      <T as="h2" pair={title} className="text-3xl font-bold text-white mb-4" />
      <div className="border-t-2 border-sky-600 w-20 mb-6" />
      {description && description.length > 0 && (
        <div className="space-y-4 text-gray-200/90 text-justify mb-6">
          {description.map((d, i) => (
            <p key={i}>
              <T pair={d} />
            </p>
          ))}
        </div>
      )}
      {children}
    </div>
  )
}

/** Utilitaires robustes pour récupérer les URLs d'images */
const toImageArray = (raw: any) => {
  if (!raw) return []
  return raw
    .map((x: any) => {
      if (!x) return null
      if (typeof x === 'string') return { url: x }
      if (typeof x === 'object') {
        if ('url' in x && x.url) return { url: x.url }
        if ('image' in x && x.image) {
          if (typeof x.image === 'string') return { url: x.image }
          if (typeof x.image === 'object' && 'url' in x.image) return { url: x.image.url }
        }
      }
      return null
    })
    .filter(Boolean)
}
const urls = (arr: any[]) =>
  toImageArray(arr)
    .map((i: any) => i.url)
    .filter(Boolean)

/** composant serveur (async autorisé) */
const UniversalConcept = async () => {
  const payload = await getPayload({ config })
  const universalConceptData = await payload.find({ collection: 'universalConcept' })

  /** === Contenu bilingue === */
  type Feature = {
    title: TextPair
    description: TextPair
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    points: TextPair[]
  }

  const features: Feature[] = [
    {
      title: { fr: 'Fixation conventionnelle', en: 'Conventional bedding' },
      description: {
        fr: 'Notre crosse permet l’utilisation de ce mode d’assemblage soit directement, soit par l’intermédiaire d’inserts d’adaptation.',
        en: 'Our stock supports traditional action bedding, either directly or via adapter inserts.',
      },
      icon: Target,
      points: [
        {
          fr: 'Compatibilité avec la majorité des actions utilisées en compétition.',
          en: 'Compatible with most competition-grade actions.',
        },
        { fr: 'Installation simple et rapide', en: 'Quick, straightforward installation' },
        { fr: 'Légèreté de la carabine', en: 'Keeps the rifle light' },
      ],
    },
    {
      title: { fr: 'Fixation par le canon', en: 'Barrel clamping system' },
      description: {
        fr: 'Innovation exclusive d’Esprit Carabine, notre système de fixation par le canon révolutionne la conception d’une carabine de compétition en offrant une modularité et une précision exceptionnelles.',
        en: 'An Esprit Carabine exclusive, our barrel clamping system revolutionises competition rifle design by offering exceptional modularity and precision.',
      },
      icon: Grip,
      points: [
        {
          fr: 'Serrage du canon par cônes pour une rigidité maximale',
          en: 'Cone-based clamping for maximum rigidity',
        },
        { fr: 'Réduction significative des vibrations', en: 'Significant vibration reduction' },
        {
          fr: 'Plus grande facilité dans le choix des lots de munition',
          en: 'Easier, more consistent ammo lot selection',
        },
      ],
    },
    {
      title: { fr: 'Ergonomie et modularité', en: 'Ergonomics & modularity' },
      description: {
        fr: 'Chaque tireur est unique. C’est pourquoi nous avons développé un système de crosse entièrement modulable pour des réglages faciles, rapides et fiables.',
        en: ' Every shooter is unique. That’s why we developed a fully modular stock system for easy, quick, and reliable adjustments.',
      },
      icon: Rocket,
      points: [
        { fr: 'Poignée rotative multi-axes', en: 'Multi-axis rotating pistol grip' },
        {
          fr: 'Busc entièrement ajustable, avec appui-joue à réglage micrométrique sans outil',
          en: 'Fully adjustable cheekpiece with tool-free micro-adjust',
        },
        {
          fr: 'Crémaillères dotées de butées réglables permettant un pré-réglage rapide et précis.',
          en: 'Racks with adjustable stops for quick, precise presets',
        },
        {
          fr: 'Contrepoids additionnel de busc, positionné parfaitement dans l’axe du canon.',
          en: 'Cheekpiece counterweight perfectly aligned with the barrel axis',
        },
      ],
    },
  ]

  const informations = [
    {
      title: { fr: 'La Fixation conventionnelle', en: 'Conventional bedding' },
      description: [
        {
          fr: 'Le boîtier de culasse est fixé de manière classique, par des vis, le canon étant flottant. L’Universal Concept offre la possibilité de fixer de cette manière la plupart des actions utilisées en compétition ISSF. Soit directement, soit grâce à un insert d’adaptation fourni avec la crosse.',
          en: 'The receiver is conventionally bedded via screws, with a free-floating barrel. Universal Concept allows most ISSF competition actions to be mounted this way—either directly or using an adapter insert supplied with the stock.',
        },
      ],
      annexes: [
        {
          title: {
            fr: "Actions se fixant sans insert d'adaptation:",
            en: 'Actions mounted without adapter:',
          } as TextPair,
          list: [
            'Anschütz série 2000',
            'Bleiker Challenger',
            'Grünig R2 / R3',
            'Rieder & Lenz « Z »',
          ],
        },
        {
          title: {
            fr: "Actions nécessitant l'utilisation d'un insert d'adaptation :",
            en: 'Actions requiring an adapter insert:',
          } as TextPair,
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
          .find((doc: any) => doc.title === 'La Fixation conventionnelle')
          ?.images?.map((image: any) => image.image) || [],
    },
    {
      title: { fr: 'La fixation par le canon', en: 'Barrel clamping' },
      description: [
        {
          fr: 'Dans ce cas, c’est le canon qui est directement fixé à la crosse, le boîtier de culasse n’ayant aucun contact avec celle-ci. Ce dispositif a été conçu par Esprit Carabine pour répondre à la demande de tireurs qui recherchaient les avantages de la fixation par le canon tout en ayant le canon placé très bas sur la crosse.',
          en: 'Here, the barrel is clamped directly to the stock, with no contact from the receiver. This system was designed by Esprit Carabine to meet the needs of shooters seeking the benefits of barrel clamping while keeping the barrel positioned low on the stock.',
        },
        {
          fr: 'Nous utilisons pour cela un dispositif de serrage par cônes que nous avons conçu. Usinés dans un matériau qui assure la rigidité du montage et qui contribue également à limiter la transmission des vibrations et de la chaleur, ces cônes permettent également de réduire les problèmes liés à la dilatation. La partie « libre » du canon étant réduite, l’amplitude des mouvements de la bouche induits par les vibrations est moindre lors de la sortie de la balle.',
          en: 'We employ a cone-based clamping system we designed. Machined from a material that ensures mounting rigidity while helping limit vibration and heat transmission, these cones also mitigate issues related to thermal expansion. With a reduced free-floating barrel section, the amplitude of muzzle movement induced by vibrations is minimized as the bullet exits.',
        },
        {
          fr: 'Testé, validé et utilisé par des tireurs du plus haut niveau, ce dispositif procure une remarquable précision et une réaction de la carabine plus douce que dans le cas d’une action fixée classiquement sur une crosse métallique. Ce système permet d’autre part de fixer sur la crosse un grand nombre d’actions dotées de canons de calibre 22LR, de diamètres allant de 20mm à 26mm.',
          en: 'Tested, validated, and used by top-level shooters, this system provides remarkable accuracy and a smoother rifle reaction compared to a conventionally mounted action on a metal stock. Additionally, it allows for the mounting of a wide range of .22LR actions with barrel diameters from 20mm to 26mm.',
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc: any) => doc.title === 'La fixation par le canon')
          ?.images?.map((image: any) => image.image) || [],
    },
    {
      title: { fr: 'Ergonomie', en: 'Ergonomics' },
      description: [
        {
          fr: "L'ergonomie aboutie de l'Universal Concept convient aux tireurs de toutes morphologies grâce aux multiples réglages possibles et à leurs amplitudes.",
          en: 'The refined ergonomics of Universal Concept suit shooters of all physiques thanks to its multiple adjustment options and their ranges.',
        },
        {
          fr: "La partie arrière de la crosse, très courte pour s'adapter même aux petits gabarits, est conçue « en fourche » et permet que la force constituée par le recul de l'arme s'exerce parfaitement dans l'axe de celle-ci, permettant ainsi une réaction au départ du coup extrêmement saine.",
          en: 'The rear part of the stock, very short to fit even small builds, is designed in a "fork" shape and allows the force generated by the recoil to act perfectly along its axis, thus enabling an extremely healthy reaction at the shot.',
        },
        {
          fr: "La poignée, montée sur rotule, est ajustable dans tous les plans et permet un positionnement parfait de la main et du poignet, contribuant ainsi à améliorer l'action de l'index sur la queue de détente.",
          en: "The grip, mounted on a ball joint, is adjustable in all planes and allows for perfect positioning of the hand and wrist, thus improving the index finger's action on the trigger.",
        },
        {
          fr: 'Le busc, réglable en tous sens et sans outil, permet au tireur de trouver aisément un placement parfait de la tête quelle que soit la position de tir.',
          en: 'The cheekpiece, adjustable in all directions and without tools, allows the shooter to easily find a perfect head placement regardless of the shooting position.',
        },
        {
          fr: "Afin de permettre au tireur de trouver l'équilibre idéal de sa carabine, notamment en position « debout », le busc de l'Universal Concept peut être équipé d'un contrepoids. Positionné exactement dans l'axe de la crosse, celui-ci ne déséquilibrera pas le tireur et n'engendrera aucune réaction latérale lors du départ du coup.",
          en: 'In order to allow the shooter to find the ideal balance of their rifle, especially in the standing position, the cheekpiece of the Universal Concept can be equipped with a counterweight. Positioned exactly in the axis of the stock, it will not unbalance the shooter and will not generate any lateral reaction when the shot is fired.',
        },
        {
          fr: "Entièrement fabriquée sur centre d'usinage informatisé dans des matériaux de haut de gamme, l'Universal Concept a fait l'objet d'études et de tests approfondis garantissant à son utilisateur un fonctionnement parfait.",
          en: 'Entirely manufactured on a computerized machining center from high-end materials, the Universal Concept has undergone extensive studies and tests to ensure perfect operation for its user.',
        },
        {
          fr: "Son universalité, les avancées technologiques qu'elle propose, sa robustesse et sa qualité de fabrication font de l'Universal Concept l'élément de liaison idéal qui permet au tireur de tirer le meilleur profit de son canon.",
          en: 'Its universality, the technological advancements it offers, its robustness, and its manufacturing quality make the Universal Concept the ideal link that allows the shooter to get the best out of their barrel.',
        },
        {
          fr: "Et comme nous savons qu'un carabinier aime sa carabine et que nous aimons aussi les belles choses, nous vous proposons un choix de finitions qui permettra sans doute d'exhausser vos souhaits.",
          en: 'And since we know that a marksman loves their rifle and that we also appreciate beautiful things, we offer you a choice of finishes that will undoubtedly fulfill your wishes.',
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc: any) => doc.title === 'Ergonomie')
          ?.images?.map((image: any) => image.image) || [],
    },
    {
      title: {
        fr: 'Crosse - Finition - Anodisation dure (noir mat)',
        en: 'Stock – Finish – Hard anodising (matte black)',
      },
      description: [
        {
          fr: "Une finition alliant l'élégance avec la robustesse. Réalisée après microbillage, l'aspect de la crosse est donc satiné.",
          en: 'A finish combining elegance with durability. Achieved after bead-blasting, the stock has a satin appearance.',
        },
      ],
      annexes: [
        {
          title: {
            fr: 'Traitements des pièces annexes : Nickelage satiné',
            en: 'Ancillary parts: satin nickel plating',
          } as TextPair,
          list: [
            { fr: 'plaque de recouvrement arrière', en: 'rear cover plate' },
            { fr: 'pontet', en: 'trigger guard' },
            { fr: 'pièces du busc', en: 'cheekpiece parts' },
            { fr: 'support de plaque de couche', en: 'butt plate support' },
            { fr: 'adaptateur universel de plaque de couche', en: 'universal butt plate adapter' },
            { fr: 'blocs de fixation du canon', en: 'barrel mounting blocks' },
          ] as TextPair[],
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc: any) => doc.title === 'Crosse - Finition - Anodisation dure (noir mat)')
          ?.images?.map((image: any) => image.image) || [],
    },
    {
      title: {
        fr: 'Crosse - Finition - Anodisation en couleur',
        en: 'Stock – Finish – Colour anodising',
      },
      description: [
        {
          fr: "Pour les tireurs qui aiment la couleur nous proposons également l'anodisation classique, en rouge ou en bleu.",
          en: 'For shooters who love color, we also offer classic anodizing in red or blue.',
        },
      ],
      annexes: [
        {
          title: {
            fr: 'Traitements des pièces annexes : Nickelage satiné',
            en: 'Ancillary parts: satin nickel plating',
          } as TextPair,
          list: [
            { fr: 'plaque de recouvrement arrière', en: 'rear cover plate' },
            { fr: 'pontet', en: 'trigger guard' },
            { fr: 'pièces du busc', en: 'cheekpiece parts' },
            { fr: 'support de plaque de couche', en: 'butt plate support' },
            { fr: 'adaptateur universel de plaque de couche', en: 'universal butt plate adapter' },
            { fr: 'blocs de fixation du canon', en: 'barrel mounting blocks' },
          ] as TextPair[],
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc: any) => doc.title === 'Crosse - Finition - Anodisation en couleur')
          ?.images?.map((image: any) => image.image) || [],
    },
    {
      title: { fr: 'Pommeau', en: 'Palm rest' },
      description: [
        {
          fr: "Désormais reconnu comme l'un des meilleurs actuellement commercialisés, le pommeau d'Esprit Carabine permet un réglage dans tous les plans pour un poids maximal de seulement 371 grammes.",
          en: 'Now recognized as one of the best currently on the market, the Esprit Carabine palm rest allows adjustment in all planes for a maximum weight of only 371 grams.',
        },
        {
          fr: 'La plaquette au contact de la main est finement quadrillée pour une adhérence optimale, avec ou sans gant de tir. Elle est disponible en deux largeurs, 50 ou 60 millimètres.',
          en: 'The surface in contact with the hand is finely checkered for optimal grip, with or without shooting gloves. It is available in two widths, 50 or 60 millimeters.',
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc: any) => doc.title === 'Pommeau')
          ?.images?.map((image: any) => image.image) || [],
    },
    {
      title: { fr: 'Contrepoids de busc', en: 'Cheekpiece counterweight' },
      description: [
        {
          fr: "Spécialement étudié pour le tir en position debout, ce contrepoids se fixe sur la crémaillère du busc. Il est positionné exactement dans l'axe de la crosse et ne peut pas occasionner de déséquilibre latéral.",
          en: 'Specifically designed for standing position shooting, this counterweight attaches to the cheekpiece rack. It is positioned exactly in line with the stock and cannot cause lateral imbalance.',
        },
      ],
      images:
        universalConceptData?.docs
          .find((doc: any) => doc.title === 'Contrepoids de busc')
          ?.images?.map((image: any) => image.image) || [],
    },
  ]

  /** Raccourcis par titre FR */
  const byTitle = (tf: string) => informations.find((i) => i.title.fr === tf)!
  const fixConv = byTitle('La Fixation conventionnelle')
  const fixCanon = byTitle('La fixation par le canon')
  const ergonomie = byTitle('Ergonomie')
  const finDure = byTitle('Crosse - Finition - Anodisation dure (noir mat)')
  const finCouleur = byTitle('Crosse - Finition - Anodisation en couleur')
  const pommeau = byTitle('Pommeau')
  const contrepoids = byTitle('Contrepoids de busc')

  const imgFixConv = urls(fixConv.images as any[])
  const imgFixCanon = urls(fixCanon.images as any[])
  const imgErgo = urls(ergonomie.images as any[])
  const imgFinDure = urls(finDure.images as any[])
  const imgFinCouleur = urls(finCouleur.images as any[])
  const imgPommeau = urls(pommeau.images as any[])
  const imgContrepoids = urls(contrepoids.images as any[])

  const ANN1: TextPair = {
    fr: "Actions se fixant sans insert d'adaptation:",
    en: 'Actions mounted without adapter:',
  }
  const ANN2: TextPair = {
    fr: "Actions nécessitant l'utilisation d'un insert d'adaptation :",
    en: 'Actions requiring an adapter insert:',
  }

  const heroTitle: TextPair = { fr: 'Principe', en: 'Principle' }
  const heroParagraph: TextPair = {
    fr: `La crosse Universal Concept a été développée pour offrir au tireur la plus grande polyvalence. Adaptable sur la plupart des actions utilisées en compétition, en tir à 50m ou à 300m, elle permet également de choisir le mode d'assemblage de l'action canonnée sur la crosse. Fixation conventionnelle par le boîtier de culasse ou fixation par le canon.`,
    en: 'The Universal Concept stock was developed to provide maximum versatility. It fits most competition actions for 50 m and 300 m, and lets you choose how the barreled action mates with the stock: conventional receiver bedding or barrel clamping.',
  }

  const ctaTitle: TextPair = {
    fr: 'Prêt à améliorer vos performances ?',
    en: 'Ready to improve your performance?',
  }
  const ctaText: TextPair = {
    fr: "Contactez-nous pour découvrir l'Universal Concept et trouver la configuration parfaite pour vous.",
    en: 'Get in touch to discover Universal Concept and find your perfect configuration.',
  }
  const ctaBtn: TextPair = { fr: 'Nous contacter', en: 'Contact us' }
  const buyBtn: TextPair = { fr: 'Acheter une crosse', en: 'Buy a stock' }

  function RenderMaybePair({ value }: { value: string | TextPair }) {
    return typeof value === 'string' ? <>{value}</> : <T pair={value} />
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-20 text-center">
          <T as="h1" pair={heroTitle} className="text-5xl font-bold mb-6 tracking-tight" />
          <p className="text-xl text-left max-w-3xl mx-auto text-white/90 mb-10">
            <T pair={heroParagraph} />
          </p>
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
            >
              <T pair={buyBtn} /> <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="container mx-auto px-4 py-16 flex flex-col items-center gap-8">
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon
            return (
              <div
                key={index}
                className="bg-gray-800/95 rounded-2xl shadow-lg p-6 ring-1 ring-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <FeatureIcon className="mr-4 text-accent-principle" />
                  <T as="h3" pair={feature.title} className="text-2xl font-bold" />
                </div>
                <p className="text-gray-300 mb-6">
                  <T pair={feature.description} />
                </p>
                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-3 w-2 h-2 bg-accent-principle rounded-full" />
                      <T pair={point} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Fixation conventionnelle : image 1 ↔ sans insert | image 2 ↔ avec insert */}
        <InfoCard title={fixConv.title} description={fixConv.description}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Col 1 : Sans insert */}
            <div>
              {imgFixConv[0] && (
                <FramedImage
                  className="bg-white/[0.9]"
                  src={imgFixConv[0]}
                  alt={`${fixConv.title.fr} - sans insert`}
                />
              )}
              {Array.isArray(fixConv.annexes) &&
                fixConv.annexes
                  .filter((a: any) => (a.title as TextPair)?.fr?.trim() === ANN1.fr)
                  .map((ann: any, idx: number) => (
                    <div key={idx} className="mt-6">
                      <T as="h3" pair={ANN1} className="text-xl font-semibold mb-2" />
                      <div className="border-t border-sky-600 w-16 mb-2" />
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {(ann as any).list?.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
            </div>

            {/* Col 2 : Avec insert */}
            <div>
              {imgFixConv[1] && (
                <FramedImage
                  className="bg-white/[0.9]"
                  src={imgFixConv[1]}
                  alt={`${fixConv.title.fr} - avec insert`}
                />
              )}
              {Array.isArray(fixConv.annexes) &&
                fixConv.annexes
                  .filter((a: any) => (a.title as TextPair)?.fr?.trim() === ANN2.fr)
                  .map((ann: any, idx: number) => (
                    <div key={idx} className="mt-6">
                      <T as="h3" pair={ANN2} className="text-xl font-semibold mb-2" />
                      <div className="border-t border-sky-600 w-16 mb-2" />
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {(ann as any).list?.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
            </div>
          </div>
        </InfoCard>

        {/* Fixation par le canon : 1 image -> hero */}
        <InfoCard title={fixCanon.title} description={fixCanon.description}>
          {imgFixCanon[0] && (
            <FramedImage
              src={imgFixCanon[0]}
              alt={fixCanon.title.fr}
              priority
              className="mt-2 max-w-3xl bg-white/[0.9]"
              heightClass="h-96"
            />
          )}
        </InfoCard>

        {/* Ergonomie : grille élégante */}
        <InfoCard title={ergonomie.title} description={ergonomie.description}>
          {imgErgo.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {imgErgo.map((src: string, i: number) => (
                <FramedImage
                  className="bg-white/[0.9]"
                  key={i}
                  src={src}
                  alt={`${ergonomie.title.fr} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </InfoCard>

        {/* Finitions combinées */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InfoCard title={finDure.title} description={finDure.description}>
            {imgFinDure.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {imgFinDure.map((src: string, i: number) => (
                  <FramedImage
                    className="bg-white/[0.9]"
                    key={i}
                    src={src}
                    alt={`${finDure.title.fr} ${i + 1}`}
                  />
                ))}
              </div>
            )}
            {Array.isArray(finDure.annexes) &&
              finDure.annexes.map((ann: any, idx: number) => (
                <div key={idx} className="mt-6">
                  <T as="h3" pair={ann.title as TextPair} className="text-xl font-semibold" />
                  <div className="border-t border-sky-600 w-16 mb-2" />
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {(ann as any).list?.map((item: string | TextPair, i: number) => (
                      <li key={i}>
                        <RenderMaybePair value={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </InfoCard>

          <InfoCard title={finCouleur.title} description={finCouleur.description}>
            {imgFinCouleur.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {imgFinCouleur.map((src: string, i: number) => (
                  <FramedImage
                    className="bg-white/[0.9]"
                    key={i}
                    src={src}
                    alt={`${finCouleur.title.fr} ${i + 1}`}
                  />
                ))}
              </div>
            )}
            {Array.isArray(finCouleur.annexes) &&
              finCouleur.annexes.map((ann: any, idx: number) => (
                <div key={idx} className="mt-6">
                  <T as="h3" pair={ann.title as TextPair} className="text-xl font-semibold" />
                  <div className="border-t border-sky-600 w-16 mb-2" />
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {(ann as any).list?.map((item: string | TextPair, i: number) => (
                      <li key={i}>
                        <RenderMaybePair value={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </InfoCard>
        </div>

        {/* Pommeau */}
        <InfoCard title={pommeau.title} description={pommeau.description}>
          {imgPommeau.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {imgPommeau.map((src: string, i: number) => (
                <FramedImage
                  className="bg-white/[0.9]"
                  key={i}
                  src={src}
                  alt={`${pommeau.title.fr} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </InfoCard>

        {/* Contrepoids de busc */}
        <InfoCard title={contrepoids.title} description={contrepoids.description}>
          {imgContrepoids.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {imgContrepoids.map((src: string, i: number) => (
                <FramedImage
                  className="bg-white/[0.9]"
                  key={i}
                  src={src}
                  alt={`${contrepoids.title.fr} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </InfoCard>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-accent-principle to-accent-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <T as="h2" pair={ctaTitle} className="text-4xl font-bold mb-6" />
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            <T pair={ctaText} />
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            <T pair={ctaBtn} /> <Send className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UniversalConcept
