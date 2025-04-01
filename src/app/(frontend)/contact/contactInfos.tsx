'use client'
import React, { useEffect, useState } from 'react'

import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type Product = {
  id: string
  title: string
  description: string
  price: number
  image: {
    url: string
    alt: string
  }
  anodizing: string
  handedness: string
}[]

export default function ContactInfos() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [productList, setProductList] = useState<Product>([])
  const productId = searchParams.get('product')

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProductList(data.docs || [])
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
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
              Nous contacter
            </h2>
            <p className="mt-6 text-lg/8 text-primary">
              Nous contacter pour toute question ou demande d&apos;information.
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-primary">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  545 Mavis Island
                  <br />
                  Chicago, IL 99191
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  <Link href="tel:+1 (555) 234-5678" className="hover:text-primary">
                    +1 (555) 234-5678
                  </Link>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-primary" />
                </dt>
                <dd>
                  <Link href="mailto:hello@example.com" className="hover:text-link-hover">
                    hello@example.com
                  </Link>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Whatsapp</span>
                  <Link
                    target="_blank"
                    href="https://wa.me/15552345678"
                    className="hover:text-gray-900"
                  ></Link>
                </dt>
              </div>
            </dl>
          </div>
        </div>
        <form action="#" method="POST" className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  Produit
                </label>
                <div className="mt-2.5">
                  {loading ? (
                    <span>
                      <Loader2 className="animate-spin" />
                    </span>
                  ) : (
                    <select
                      id="product"
                      name="product"
                      className="w-full p-3 rounded-lg border border-gray-300 bg-white"
                      defaultValue={productId || ''}
                      required
                    >
                      <option value="">Sélectionnez un produit</option>
                      {productList?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.title}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  Prénom
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                  Nom
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Numéro de téléphone
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent-principle"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-accent-principle px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-accent-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-principle transition-colors"
              >
                Envoyer un message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
