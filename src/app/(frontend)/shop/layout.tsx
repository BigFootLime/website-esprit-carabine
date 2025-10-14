'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

const filters = [
  {
    id: 'type',
    name: 'Type de produit',
    options: [
      { value: 'cross', label: 'Crosses complètes' },
      { value: 'parts', label: 'Pièces détachées' },
    ],
  },
  {
    id: 'anodizing',
    name: 'Anodisation',
    options: [
      { value: 'black', label: 'Noire' },
      { value: 'red', label: 'Rouge' },
      { value: 'blue', label: 'Bleu' },
    ],
  },
  {
    id: 'handedness',
    name: 'Droitier ou Gaucher',
    options: [
      { value: 'right', label: 'Droitier' },
      { value: 'left', label: 'Gaucher' },
    ],
  },
]

interface Img {
  id: number
  alt: string
  url: string
  width: number
  height: number
}
interface Product {
  id: number
  title: string
  description: string
  price: number
  handedness: 'left' | 'right'
  anodizing: string
  type: string | null
  image: Img
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filtersActive, setFilters] = useState<string[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([]) //

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      const response = await fetch('/api/products?limit=1000&depth=1', { cache: 'no-store' })
      const data = await response.json()
      // Force id en string pour homogénéité
      const docs: Product[] = (data.docs || []).map((p: any) => ({ ...p, id: String(p.id) }))
      setProducts(docs)
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFilter = (sectionId: string, value: string, checked: boolean) => {
    const key = `${sectionId}-${value}`
    setFilters((prev) => (checked ? [...prev, key] : prev.filter((v) => v !== key)))
  }

  const filtered = products.filter((product) => {
    const anod = filtersActive.filter((f) => f.startsWith('anodizing-')).map((f) => f.split('-')[1])
    const hand = filtersActive
      .filter((f) => f.startsWith('handedness-'))
      .map((f) => f.split('-')[1])
    const type = filtersActive.filter((f) => f.startsWith('type-')).map((f) => f.split('-')[1])
    const anodMatch = anod.length === 0 || anod.includes(product.anodizing)
    const handMatch = hand.length === 0 || hand.includes(product.handedness)
    const typeMatch = type.length === 0 || type.includes(product.type || '')
    return anodMatch && handMatch && typeMatch
  })

  const isSelected = (id: string) => selectedIds.includes(id)
  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const contactHref = useMemo(() => {
    if (selectedIds.length === 0) return '/contact'
    const usp = new URLSearchParams()
    selectedIds.forEach((id) => usp.append('product', id)) // 👈 ?product=...&product=...
    return `/contact?${usp.toString()}`
  }, [selectedIds])

  return (
    <div className="min-h-screen bg-gray-950 bg-[radial-gradient(1200px_600px_at_-10%_-10%,#0b1a34_0%,transparent_60%),radial-gradient(1200px_600px_at_110%_-10%,#0a1330_0%,transparent_60%)]">
      {/* MOBILE FILTERS */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/70 transition-opacity data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl transition data-closed:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-semibold text-white">Filtres</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-900"
              >
                <span className="sr-only">Fermer</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <form className="mt-4 border-t border-white/10">
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-white/10 px-4 py-5"
                >
                  <DisclosureButton className="group flex w-full items-center justify-between py-1 text-white">
                    <span className="font-medium">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon className="size-5 group-data-open:hidden" />
                      <MinusIcon className="size-5 group-not-data-open:hidden" />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-3">
                    <div className="space-y-3">
                      {section.options.map((option, idx) => {
                        const key = `${section.id}-${option.value}`
                        const checked = filtersActive.includes(key)
                        return (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 text-gray-200"
                          >
                            <input
                              id={`m-${section.id}-${idx}`}
                              type="checkbox"
                              className="size-4 rounded border-white/20 bg-gray-900 accent-sky-500"
                              checked={checked}
                              onChange={(e) =>
                                toggleFilter(section.id, option.value, e.target.checked)
                              }
                            />
                            <span>{option.label}</span>
                          </label>
                        )
                      })}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex items-baseline justify-between border-b border-white/10 pt-24 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Boutique</h1>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="-m-2 ml-4 rounded-md p-2 text-sky-400 hover:text-sky-300 lg:hidden"
          >
            <span className="sr-only">Filtres</span>
            <FunnelIcon aria-hidden="true" className="size-5" />
          </button>
        </div>

        {/* CONTENT */}
        <section aria-labelledby="products-heading" className="pt-8 pb-24">
          <h2 id="products-heading" className="sr-only">
            Produits
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* FILTERS DESKTOP */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b last:border-0 border-white/10 py-4"
                  >
                    <DisclosureButton className="group flex w-full items-center justify-between text-sm text-white">
                      <span className="font-medium">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon className="size-5 group-data-open:hidden" />
                        <MinusIcon className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel className="pt-3">
                      <div className="space-y-2">
                        {section.options.map((option, idx) => {
                          const key = `${section.id}-${option.value}`
                          const checked = filtersActive.includes(key)
                          return (
                            <label
                              key={option.value}
                              className="flex items-center gap-3 text-white"
                            >
                              <input
                                id={`d-${section.id}-${idx}`}
                                type="checkbox"
                                className="size-4 rounded border-white/20 bg-gray-900 accent-sky-500"
                                checked={checked}
                                onChange={(e) =>
                                  toggleFilter(section.id, option.value, e.target.checked)
                                }
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {filtersActive.length > 0 && (
                  <button
                    onClick={() => setFilters([])}
                    className="mt-4 w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[420px] rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                    />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center text-gray-300 py-24 rounded-2xl border border-white/10 bg-white/5">
                  <p className="text-lg">Aucun produit ne correspond aux filtres.</p>
                  <button
                    className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500"
                    onClick={() => setFilters([])}
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((product) => {
                    const selected = isSelected(String(product.id))
                    return (
                      <li key={product.id}>
                        <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] shadow-2xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-sky-900/30 flex flex-col">
                          <div className="relative w-full aspect-[4/3] sm:aspect-square bg-white/[0.9]">
                            <Image
                              src={product.image?.url}
                              alt={product.image?.alt || product.title}
                              fill
                              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                              className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                            />
                            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-900 shadow">
                              {product.price} €
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col p-4 gap-3">
                            <h3 className="text-white font-semibold leading-tight line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-300 line-clamp-3">
                              {product.description}
                            </p>

                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                              {product.type && (
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                                  {product.type === 'cross'
                                    ? 'Crosses complètes'
                                    : 'Pièces détachées'}
                                </span>
                              )}
                              {product.handedness && (
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                                  {product.handedness === 'right' ? 'Droitier' : 'Gaucher'}
                                </span>
                              )}
                              {product.anodizing && (
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                                  {product.anodizing === 'black'
                                    ? 'Anodisation noire'
                                    : product.anodizing === 'red'
                                      ? 'Anodisation rouge'
                                      : product.anodizing === 'blue'
                                        ? 'Anodisation bleue'
                                        : product.anodizing}
                                </span>
                              )}
                            </div>

                            <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => toggleSelect(String(product.id))}
                                className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 ring-inset transition focus:outline-none
                                ${
                                  selected
                                    ? 'bg-emerald-600 text-white ring-emerald-400/40 hover:bg-emerald-500'
                                    : 'bg-white/10 text-white ring-white/20 hover:bg-white/15'
                                }`}
                              >
                                {selected ? 'Retirer' : 'Ajouter'}
                              </button>

                              <Link
                                href={`/contact?product=${product.id}`}
                                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-sky-400/30 transition hover:bg-sky-500"
                              >
                                Contacter
                              </Link>
                            </div>
                          </div>
                        </article>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>
        <div className="fixed inset-x-0 bottom-4 z-30 px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="mx-auto max-w-[100rem]">
            <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gray-900/80 px-4 py-3 backdrop-blur">
              <div className="text-sm text-white">
                {selectedIds.length === 0 ? (
                  'Aucun produit sélectionné'
                ) : (
                  <>
                    {selectedIds.length} produit{selectedIds.length > 1 ? 's' : ''} sélectionné
                    {selectedIds.length > 0 && ' · '}
                    <button
                      className="underline decoration-dotted hover:opacity-80"
                      onClick={() => setSelectedIds([])}
                    >
                      Tout effacer
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={contactHref}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-inset transition
                    ${
                      selectedIds.length === 0
                        ? 'pointer-events-none opacity-50 bg-white/10 text-white ring-white/20'
                        : 'bg-sky-600 text-white ring-sky-400/30 hover:bg-sky-500'
                    }`}
                >
                  Contacter pour acheter{selectedIds.length ? ` (${selectedIds.length})` : ''}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}
