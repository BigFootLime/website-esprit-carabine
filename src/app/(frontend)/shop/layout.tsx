'use client'

import React, { useEffect, useState } from 'react'
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
import { cp } from 'fs'

const filters = [
  {
    id: 'type',
    name: 'Type de produit',
    options: [
      { value: 'cross', label: 'Crosses complètes', checked: false },
      { value: 'parts', label: 'Pièces détachées', checked: false },
    ],
  },
  {
    id: 'anodizing',
    name: 'Anodisation',
    options: [
      { value: 'black', label: 'Noire', checked: false },
      { value: 'red', label: 'Rouge', checked: false },
      { value: 'blue', label: 'Bleu', checked: false },
    ],
  },
  {
    id: 'handedness',
    name: 'Droitier ou Gaucher',
    options: [
      { value: 'right', label: 'Droitier', checked: false },
      { value: 'left', label: 'Gaucher', checked: false },
    ],
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [products, setProducts] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filtersActive, setFilters] = useState<any>([])

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    console.log(filtersActive)
  }, [filtersActive])

  async function getProducts() {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.docs || [])
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-link-primary"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-primary hover:text-gray-500">
                        <span className="font-medium text-primary">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  checked={filtersActive.includes(section.id + '-' + option.value)}
                                  onChange={(e) => {
                                    console.log(e.target.checked)
                                    const isChecked = e.target.checked
                                    console.log(section)
                                    console.log(option)
                                    const value = section.id + '-' + option.value
                                    setFilters((prev: any) => {
                                      const newFilters = [...prev]
                                      if (isChecked) {
                                        newFilters.push(value)
                                      } else {
                                        const index = newFilters.indexOf(value)
                                        if (index > -1) {
                                          newFilters.splice(index, 1)
                                        }
                                      }
                                      return newFilters
                                    })
                                  }}
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-primary">Boutique</h1>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-link-hover hover:text-link-hover sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  checked={filtersActive.includes(section.id + '-' + option.value)}
                                  onChange={(e) => {
                                    console.log(e.target.checked)
                                    const isChecked = e.target.checked
                                    const value = section.id + '-' + option.value
                                    setFilters((prev: any) => {
                                      const newFilters = [...prev]
                                      if (isChecked) {
                                        newFilters.push(value)
                                      } else {
                                        const index = newFilters.indexOf(value)
                                        if (index > -1) {
                                          newFilters.splice(index, 1)
                                        }
                                      }
                                      return newFilters
                                    })
                                  }}
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-primary"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-4 lg:max-w-7xl lg:px-8">
                    {loading ? (
                      <div className="w-full flex justify-center">
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      <div className="mt-6 grid gap-x-6 gap-y-10 xl:gap-x-8">
                        {products
                          ?.filter((product: any) => {
                            const anodisationFilters = filtersActive.filter((filter: string) =>
                              filter.startsWith('anodizing-'),
                            )
                            const handednessFilters = filtersActive.filter((filter: string) =>
                              filter.startsWith('handedness-'),
                            )
                            const typeFilters = filtersActive.filter((filter: string) =>
                              filter.startsWith('type-'),
                            )
                            const anodisationMatch =
                              anodisationFilters.length === 0 ||
                              anodisationFilters
                                .map((filter) => filter.split('-')[1])
                                .includes(product.anodizing)

                            const handednessMatch =
                              handednessFilters.length === 0 ||
                              handednessFilters
                                .map((filter) => filter.split('-')[1])
                                .includes(product.handedness)

                            const typeMatch =
                              typeFilters.length === 0 ||
                              typeFilters
                                .map((filter) => filter.split('-')[1])
                                .includes(product.type)

                            return anodisationMatch && handednessMatch && typeMatch
                          })
                          ?.map((product) => (
                            <div
                              key={product.id}
                              className="relative flex flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                              <Image
                                width={300}
                                height={300}
                                src={product.image.url}
                                alt={product.image.alt}
                                className="w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                              />
                              <div className="mt-4 p-4 w-full h-full grid grid-rows-[max-content_1fr_max-content] gap-2">
                                <div className="flex justify-between w-full">
                                  <div className="flex items-center gap-4 flex-row">
                                    <span>{product.title}</span>
                                    {product.anodizing && (
                                      <span className="mr-3 text-gray-400">
                                        {product.anodizing === 'black'
                                          ? 'Anodisation noire'
                                          : product.anodizing === 'red'
                                            ? 'Anodisation rouge'
                                            : product.anodizing === 'blue'
                                              ? 'Anodisation bleue'
                                              : ''}
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-bold">{product.price} €</span>
                                </div>
                                <p>{product.description}</p>
                                <div className="flex justify-between">
                                  <div className="flex gap-3">
                                    <span>
                                      {product.handedness
                                        ? product.handedness === 'right'
                                          ? 'Droitier'
                                          : 'Gaucher'
                                        : ''}
                                    </span>
                                    <span className="text-gray-400">
                                      {product.type
                                        ? product.type === 'cross'
                                          ? 'Crosses complètes'
                                          : 'Pièces détachées'
                                        : ''}
                                    </span>
                                  </div>
                                  <Link
                                    href={`/contact?product=${product.id}`}
                                    className="h-10 inline-flex items-center justify-center rounded-md border border-transparent bg-accent-principle px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary focus:ring-offset-2"
                                  >
                                    <span aria-hidden="true" />
                                    Contacter
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
