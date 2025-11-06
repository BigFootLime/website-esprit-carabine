'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

// i18n
import T from '@/components/i18n/T'
import type { TextPair } from '@/components/i18n/lang-context'

// ---------- helpers ----------
const isTextPair = (v: any): v is TextPair => v && typeof v === 'object' && 'fr' in v && 'en' in v
const renderMaybePair = (v?: string | TextPair) => (v ? isTextPair(v) ? <T pair={v} /> : v : null)

// ---------- static text ----------
const TEXT = {
  contactHeading: { fr: 'Nous contacter', en: 'Contact us' } as TextPair,
  contactLead: {
    fr: "Nous contacter pour toute question ou demande d'information.",
    en: 'Contact us for any question or information request.',
  } as TextPair,

  addressSr: { fr: 'Adresse', en: 'Address' } as TextPair,
  phoneSr: { fr: 'Téléphone', en: 'Telephone' } as TextPair,
  emailSr: { fr: 'Email', en: 'Email' } as TextPair,
  whatsappSr: { fr: 'WhatsApp', en: 'WhatsApp' } as TextPair,

  yourSelection: { fr: 'Votre sélection', en: 'Your selection' } as TextPair,
  loadingProducts: {
    fr: 'Chargement des produits…',
    en: 'Loading products…',
  } as TextPair,
  noneSelected: {
    fr: 'Aucun produit sélectionné. Retournez à la boutique pour en ajouter.',
    en: 'No product selected. Go back to the shop to add some.',
  } as TextPair,
  total: { fr: 'Total', en: 'Total' } as TextPair,

  firstName: { fr: 'Prénom', en: 'First name' } as TextPair,
  lastName: { fr: 'Nom', en: 'Last name' } as TextPair,
  email: { fr: 'Email', en: 'Email' } as TextPair,
  phone: { fr: 'Numéro de téléphone', en: 'Phone number' } as TextPair,
  message: { fr: 'Message', en: 'Message' } as TextPair,
  messagePh: {
    fr: 'Ajoutez des précisions utiles (quantités, couleurs, délais, etc.)',
    en: 'Add useful details (quantities, colours, lead times, etc.)',
  } as TextPair,

  sentOk: {
    fr: 'Merci ! Votre demande a bien été envoyée.',
    en: 'Thanks! Your request was sent.',
  } as TextPair,
  sentErr: {
    fr: 'Oups, une erreur est survenue. Réessayez ou contactez-nous par téléphone.',
    en: 'Oops, something went wrong. Try again or call us.',
  } as TextPair,

  sending: { fr: 'Envoi…', en: 'Sending…' } as TextPair,
  sendBtn: { fr: 'Envoyer un message', en: 'Send message' } as TextPair,
} as const

// ---------- data types ----------
type ProductItem = {
  id: string
  title: string | TextPair
  description?: string | TextPair
  price: number
  image?: { url: string; alt: string }
  anodizing?: string
  handedness?: string
}
type ProductsResponse = { docs: ProductItem[] }

export default function ContactInfos() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<null | 'ok' | 'error'>(null)
  const [productList, setProductList] = useState<ProductItem[]>([])
  const productIdsFromURL = searchParams.getAll('product').map(String)

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      // If your REST is Payload v3, list endpoint is usually /api/product
      // Keep your existing route if it’s wired in your app:
      const response = await fetch('/api/products', { cache: 'no-store' })
      const data: ProductsResponse = await response.json()
      const docs = (data.docs || []).map((p: any) => ({ ...p, id: String(p.id) })) as ProductItem[]
      setProductList(docs)
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedProducts = useMemo(
    () => productList.filter((p) => productIdsFromURL.includes(p.id)),
    [productList, productIdsFromURL],
  )

  const total = useMemo(
    () => selectedProducts.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [selectedProducts],
  )

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setSent(null)

    try {
      const form = e.currentTarget
      const fd = new FormData(form)

      // ensure IDs from URL are always sent
      productIdsFromURL.forEach((id) => fd.append('productIds[]', id))

      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Request failed')
      setSent('ok')
      form.reset()
    } catch (err) {
      console.error(err)
      setSent('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
              <T pair={TEXT.contactHeading} />
            </h2>
            <p className="mt-6 text-lg/8 text-primary">
              <T pair={TEXT.contactLead} />
            </p>

            <dl className="mt-10 space-y-4 text-base/7 text-primary">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">
                    <T pair={TEXT.addressSr} />
                  </span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  468 Route de Port Galland
                  <br />
                  01800 SAINT JEAN DE NIOST
                </dd>
              </div>

              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">
                    <T pair={TEXT.phoneSr} />
                  </span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  <Link href="tel:+33614167886" className="hover:text-primary">
                    +33 6 14 16 78 86
                  </Link>
                </dd>
              </div>

              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">
                    <T pair={TEXT.emailSr} />
                  </span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  <Link href="mailto:esprit.carabine@orange.fr" className="hover:text-link-hover">
                    esprit.carabine@orange.fr
                  </Link>
                </dd>
              </div>

              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">
                    <T pair={TEXT.whatsappSr} />
                  </span>
                </dt>
                <dd>{/* Optional WhatsApp link, update number if you want it visible */}</dd>
              </div>
            </dl>
          </div>
        </div>

        <form onSubmit={onSubmit} className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            {/* Selection summary */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <T pair={TEXT.yourSelection} />
              </h3>

              {loading ? (
                <p className="mt-2 text-sm text-gray-600 inline-flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> <T pair={TEXT.loadingProducts} />
                </p>
              ) : selectedProducts.length === 0 ? (
                <p className="mt-2 text-sm text-gray-600">
                  <T pair={TEXT.noneSelected} />
                </p>
              ) : (
                <>
                  <ul className="mt-3 divide-y divide-gray-100">
                    {selectedProducts.map((p) => (
                      <li key={p.id} className="py-2 flex items-center justify-between">
                        <span className="text-sm text-gray-800 line-clamp-1">
                          {renderMaybePair(p.title)}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{p.price} €</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <span className="text-base font-semibold text-gray-900">
                      <T pair={TEXT.total} />
                    </span>
                    <span className="text-base font-semibold text-gray-900">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                </>
              )}

              {/* hidden IDs always sent */}
              {productIdsFromURL.map((id) => (
                <input key={id} type="hidden" name="productIds[]" value={id} />
              ))}
              {/* hidden client total (also validate server-side) */}
              <input type="hidden" name="clientTotal" value={total.toFixed(2)} />
            </div>

            {/* Contact fields */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div>
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  <T pair={TEXT.firstName} />
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                  <T pair={TEXT.lastName} />
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                  <T pair={TEXT.email} />
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm/6 font-semibold text-gray-900">
                  <T pair={TEXT.phone} />
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                  <T pair={TEXT.message} />
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                    placeholder={
                      TEXT.messagePh
                        .fr /* your <T /> isn’t available in attr; keep FR here or compute outside */
                    }
                  />
                </div>
              </div>

              {/* honeypot */}
              <input
                type="text"
                name="company"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="mt-8 flex items-center justify-between">
              {sent === 'ok' && (
                <p className="text-sm text-emerald-700">
                  <T pair={TEXT.sentOk} />
                </p>
              )}
              {sent === 'error' && (
                <p className="text-sm text-red-700">
                  <T pair={TEXT.sentErr} />
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-accent-principle px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-principle transition-colors disabled:opacity-60"
              >
                {submitting ? <T pair={TEXT.sending} /> : <T pair={TEXT.sendBtn} />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
