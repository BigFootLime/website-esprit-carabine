'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../images/Logo.svg'
import { motion } from 'framer-motion'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel' // shadcn/ui
import type { CarouselApi } from '@/components/ui/carousel' // exposé par le composant shadcn

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Qui sommes-nous ?', href: '/about' },
  { name: 'Universal Concept', href: '/universal-concept' },
  { name: 'Boutique', href: '/shop' },
  { name: 'Entraînement', href: '/training' },
  { name: 'Témoignages', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
]

type HeroProps = {
  title: string
  description: string
  image?: string
  images?: string[] // <-- nouveau
}

export default function HeroComponent({ title, description, image, images }: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // --- Embla / shadcn carousel API & state pour les "dots"
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1) // 1=vers la droite, -1=vers la gauche

  // Synchronise les dots
  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Autoplay "aller-retour" sans loop
  useEffect(() => {
    if (!api) return
    const interval = setInterval(() => {
      if (!api) return
      if (direction === 1) {
        if (api.canScrollNext()) {
          api.scrollNext()
        } else {
          setDirection(-1)
          if (api.canScrollPrev()) api.scrollPrev()
        }
      } else {
        if (api.canScrollPrev()) {
          api.scrollPrev()
        } else {
          setDirection(1)
          if (api.canScrollNext()) api.scrollNext()
        }
      }
    }, 20000) // délai entre slides

    return () => clearInterval(interval)
  }, [api, direction])

  const handleDotClick = useCallback((index: number) => api?.scrollTo(index), [api])

  return (
    <div className="bg-gray-900">
      {/* HEADER INTÉGRÉ */}
      <header className="absolute inset-x-0 top-0 z-50">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-x-0 top-0 z-50"
        >
          <nav
            aria-label="Global"
            className="mx-auto flex  items-center justify-between p-6 lg:px-8"
          >
            {/* LOGO — BIG + GLOW */}
            <Link href="/" className="group/logo relative flex items-center">
              {/* soft glow backdrop */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-[999px] bg-sky-400/20 blur-3xl group-hover/logo:bg-sky-400/30 transition"
              />
              <Image
                src={Logo}
                alt="Logo Esprit Carabine"
                priority
                sizes="(max-width: 1024px) 70vw, 40vw"
                className="
            h-auto
            w-[16rem] sm:w-[20rem] md:w-[24rem] lg:w-[30rem] xl:w-[36rem]
            drop-shadow-[0_8px_30px_rgba(56,189,248,0.55)]
            transition-transform duration-300 group-hover/logo:scale-[1.02]
          "
              />
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Desktop nav — understated so the logo stands out */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
              relative text-sm md:text-base font-medium whitespace-nowrap
              text-white/80 hover:text-white transition-colors
              px-3 py-2 rounded-xl hover:bg-white/5
              group
            "
                >
                  {item.name}
                  <span
                    className="
                absolute left-1/2 bottom-1 h-[2px] w-0
                bg-sky-400/70 transition-all duration-300
                group-hover:left-3 group-hover:w-[calc(100%-1.5rem)]
                rounded-full
              "
                  />
                </Link>
              ))}
            </div>
          </nav>
        </motion.header>

        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                {/* small logo in drawer for brand consistency */}
                <Image src={Logo} alt="Esprit Carabine" className="h-10 w-auto" priority />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* HERO SECTION */}
      <div className="relative isolate pt-24 sm:pt-32">
        {/* TOP GRADIENT */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-full px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mx-auto max-w-2xl text-center"
              >
                <h1 className="text-5xl text-sky-600 font-semibold tracking-tight text-white sm:text-7xl">
                  {title}
                </h1>
                <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">{description}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6"></div>
              </motion.div>
            </div>

            {/* --- CAROUSEL (si >= 2 images) --- */}
            {Array.isArray(images) && images.length >= 2 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mt-16 sm:mt-24"
              >
                <Carousel
                  setApi={setApi}
                  opts={{
                    loop: false, // pas de boucle, on veut aller-retour
                    align: 'center',
                    containScroll: 'trimSnaps',
                    duration: 30, // transition un peu plus douce
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {images.map((src, i) => (
                      <CarouselItem key={i} className="p-0">
                        {/* wrapper flex centré */}
                        <div className="relative w-screen h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center">
                          <Image
                            src={src}
                            alt={`${title} - slide ${i + 1}`}
                            fill
                            priority={i === 0}
                            className="object-contain"
                            sizes="100vw"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Pas de flèches */}
                </Carousel>

                {/* Dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  {Array.from({ length: count }).map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Aller au slide ${i + 1}`}
                      onClick={() => handleDotClick(i)}
                      className={[
                        'h-2.5 w-2.5 rounded-full transition-all',
                        'outline-none focus-visible:ring-0 focus-visible:outline-none',
                        i === current ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60',
                      ].join(' ')}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              // --- Fallback image unique (si fourni)
              image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="mt-16 sm:mt-24"
                >
                  <Image
                    src={image}
                    alt={title}
                    width={1200}
                    height={800}
                    className="rounded-md w-full h-auto object-contain"
                  />
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* BOTTOM GRADIENT */}
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
      </div>
    </div>
  )
}
