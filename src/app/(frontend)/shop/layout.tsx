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

// i18n
import T from '@/components/i18n/T'
import type { TextPair } from '@/components/i18n/lang-context'

// ---------------- i18n helpers ----------------
const isTextPair = (v: any): v is TextPair => v && typeof v === 'object' && 'fr' in v && 'en' in v

const renderMaybePair = (v: string | TextPair) => (isTextPair(v) ? <T pair={v} /> : v)

// ---------------- Static text (pairs) ----------------
const TEXT = {
  shop: { fr: 'Boutique', en: 'Shop' } as TextPair,
  filters: { fr: 'Filtres', en: 'Filters' } as TextPair,
  reset: { fr: 'Réinitialiser', en: 'Reset' } as TextPair,
  noneMatch: {
    fr: 'Aucun produit ne correspond aux filtres.',
    en: 'No products match the selected filters.',
  } as TextPair,
  resetFilters: {
    fr: 'Réinitialiser les filtres',
    en: 'Reset filters',
  } as TextPair,
  noneSelected: {
    fr: 'Aucun produit sélectionné',
    en: 'No product selected',
  } as TextPair,
  clearAll: {
    fr: 'Tout effacer',
    en: 'Clear all',
  } as TextPair,
  contactToBuy: {
    fr: 'Acheter',
    en: 'Contact to buy',
  } as TextPair,

  // Filters
  fTypeName: { fr: 'Type de produit', en: 'Product type' } as TextPair,
  fTypeCross: { fr: 'Crosses complètes', en: 'Complete stocks' } as TextPair,
  fTypeParts: { fr: 'Pièces détachées', en: 'Spare parts' } as TextPair,

  fAnodName: { fr: 'Anodisation', en: 'Anodizing' } as TextPair,
  fAnodBlack: { fr: 'Noire', en: 'Black' } as TextPair,
  fAnodRed: { fr: 'Rouge', en: 'Red' } as TextPair,
  fAnodBlue: { fr: 'Bleu', en: 'Blue' } as TextPair,

  fHandName: { fr: 'Droitier ou Gaucher', en: 'Right- or left-hand' } as TextPair,
  fHandRight: { fr: 'Droitier', en: 'Right' } as TextPair,
  fHandLeft: { fr: 'Gaucher', en: 'Left' } as TextPair,

  // Badges / Buttons
  badgeCross: { fr: 'Crosses complètes', en: 'Complete stocks' } as TextPair,
  badgeParts: { fr: 'Pièces détachées', en: 'Spare parts' } as TextPair,
  badgeRight: { fr: 'Droitier', en: 'Right' } as TextPair,
  badgeLeft: { fr: 'Gaucher', en: 'Left' } as TextPair,
  anodBlack: { fr: 'Anodisation noire', en: 'Black anodizing' } as TextPair,
  anodRed: { fr: 'Anodisation rouge', en: 'Red anodizing' } as TextPair,
  anodBlue: { fr: 'Anodisation bleue', en: 'Blue anodizing' } as TextPair,

  add: { fr: 'Ajouter', en: 'Add' } as TextPair,
  remove: { fr: 'Retirer', en: 'Remove' } as TextPair,

  // Misc
  productsSrOnly: { fr: 'Produits', en: 'Products' } as TextPair,
  close: { fr: 'Fermer', en: 'Close' } as TextPair,
} as const

// ---------------- Filters config (labels as pairs) ----------------
const filters = [
  {
    id: 'type',
    name: TEXT.fTypeName,
    options: [
      { value: 'cross', label: TEXT.fTypeCross },
      { value: 'parts', label: TEXT.fTypeParts },
    ],
  },
  {
    id: 'anodizing',
    name: TEXT.fAnodName,
    options: [
      { value: 'black', label: TEXT.fAnodBlack },
      { value: 'red', label: TEXT.fAnodRed },
      { value: 'blue', label: TEXT.fAnodBlue },
    ],
  },
  {
    id: 'handedness',
    name: TEXT.fHandName,
    options: [
      { value: 'right', label: TEXT.fHandRight },
      { value: 'left', label: TEXT.fHandLeft },
    ],
  },
] satisfies {
  id: string
  name: TextPair
  options: { value: string; label: TextPair }[]
}[]

interface Img {
  id: number
  alt: string
  url: string
  width: number
  height: number
}
interface Product {
  id: string
  title: string | TextPair
  description: string | TextPair
  price: number
  handedness: 'left' | 'right'
  anodizing: string
  type: string | null
  image: Img
  position: number
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filtersActive, setFilters] = useState<string[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      const [frRes, enRes] = await Promise.all([
        // FR as your source of truth
        fetch('/api/product?limit=1000&depth=1&locale=fr', { cache: 'no-store' }),
        // EN **without** fallback — important!
        fetch('/api/product?limit=1000&depth=1&locale=en', { cache: 'no-store' }),
      ])
      const [frData, enData] = await Promise.all([frRes.json(), enRes.json()])

      const frById = new Map((frData?.docs ?? []).map((p: any) => [String(p.id), p]))

      const merged: Product[] = (enData?.docs ?? []).map((enP: any) => {
        const id = String(enP.id)
        const frP = (frById.get(id) as any) ?? {}

        const title: TextPair = {
          fr: frP.title ?? '',
          // if EN missing, fall back to FR yourself
          en: enP?.title ?? frP.title ?? '',
        }

        const descFr =
          typeof frP.description === 'object' && frP.description?.fr
            ? frP.description.fr
            : frP.description
        const descEn =
          typeof enP.description === 'object' && enP.description?.en
            ? enP.description.en
            : enP.description

        const description: TextPair = {
          fr: (descFr ?? descEn ?? '') as string,
          en: (descEn ?? descFr ?? '') as string,
        }

        return {
          ...enP,
          id,
          title,
          description,
        }
      })

      merged.sort((a, b) => (a.position ?? 1e9) - (b.position ?? 1e9))
      setProducts(merged)
    } catch (e) {
      console.error('Erreur lors du chargement des produits:', e)
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
    selectedIds.forEach((id) => usp.append('product', id))
    return `/contact?${usp.toString()}`
  }, [selectedIds])

  // Badge label helpers (return <T />)
  const typeBadge = (t: Product['type']) =>
    t === 'cross' ? <T pair={TEXT.badgeCross} /> : t === 'parts' ? <T pair={TEXT.badgeParts} /> : t

  const handBadge = (h: Product['handedness']) =>
    h === 'right' ? <T pair={TEXT.badgeRight} /> : <T pair={TEXT.badgeLeft} />

  const anodBadge = (a: string) =>
    a === 'black' ? (
      <T pair={TEXT.anodBlack} />
    ) : a === 'red' ? (
      <T pair={TEXT.anodRed} />
    ) : a === 'blue' ? (
      <T pair={TEXT.anodBlue} />
    ) : (
      a
    )

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
              <h2 className="text-lg font-semibold text-white">
                <T pair={TEXT.filters} />
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-900"
              >
                <span className="sr-only">
                  <T pair={TEXT.close} />
                </span>
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
                    <span className="font-medium">
                      <T pair={section.name} />
                    </span>
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
                            className="flex items-center gap-3 text-gray-2 00"
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
                            <span>
                              <T pair={option.label} />
                            </span>
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
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            <T pair={TEXT.shop} />
          </h1>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="-m-2 ml-4 rounded-md p-2 text-sky-400 hover:text-sky-300 lg:hidden"
          >
            <span className="sr-only">
              <T pair={TEXT.filters} />
            </span>
            <FunnelIcon aria-hidden="true" className="size-5" />
          </button>
        </div>

        {/* CONTENT */}
        <section aria-labelledby="products-heading" className="pt-8 pb-24">
          <h2 id="products-heading" className="sr-only">
            <T pair={TEXT.productsSrOnly} />
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
                      <span className="font-medium">
                        <T pair={section.name} />
                      </span>
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
                              <span className="text-sm">
                                <T pair={option.label} />
                              </span>
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
                    <T pair={TEXT.reset} />
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
                  <p className="text-lg">
                    <T pair={TEXT.noneMatch} />
                  </p>
                  <button
                    className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500"
                    onClick={() => setFilters([])}
                  >
                    <T pair={TEXT.resetFilters} />
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
                              alt={
                                product.image?.alt ||
                                (typeof product.title === 'string'
                                  ? product.title
                                  : product.image?.alt || '')
                              }
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
                              {renderMaybePair(product.title)}
                            </h3>

                            <p className="text-sm text-gray-300 line-clamp-3">
                              {renderMaybePair(product.description)}
                            </p>

                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                              {product.type && (
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                                  {typeBadge(product.type)}
                                </span>
                              )}
                              {product.handedness && (
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                                  {handBadge(product.handedness)}
                                </span>
                              )}
                              {product.anodizing && (
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                                  {anodBadge(product.anodizing)}
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
                                {selected ? <T pair={TEXT.remove} /> : <T pair={TEXT.add} />}
                              </button>

                              <Link
                                href={`/contact?product=${product.id}`}
                                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-sky-400/30 transition hover:bg-sky-500"
                              >
                                <T pair={TEXT.contactToBuy} />
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

        {/* Footer selection bar */}
        <div className="fixed inset-x-0 bottom-4 z-30 px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="mx-auto max-w-[100rem]">
            <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gray-900/80 px-4 py-3 backdrop-blur">
              <div className="text-sm text-white">
                {selectedIds.length === 0 ? (
                  <T pair={TEXT.noneSelected} />
                ) : (
                  <>
                    {/* Keep grammar simple across languages: number • "selected" */}
                    <span className="font-semibold">{selectedIds.length}</span>
                    <span className="mx-2">•</span>
                    <T pair={{ fr: 'sélectionné(s)', en: 'selected' }} />
                    {selectedIds.length > 0 && (
                      <>
                        <span className="mx-2">·</span>
                        <button
                          className="underline decoration-dotted hover:opacity-80"
                          onClick={() => setSelectedIds([])}
                        >
                          <T pair={TEXT.clearAll} />
                        </button>
                      </>
                    )}
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
                  <T pair={TEXT.contactToBuy} />
                  {selectedIds.length ? ` (${selectedIds.length})` : ''}
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
