import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export default async function Page() {
  const products = await payload.find({
    collection: 'product',
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid gap-x-6 gap-y-10 xl:gap-x-8">
          {products?.docs?.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {typeof product.image === 'object' ? (
                <Image
                  width={300}
                  height={300}
                  src={product.image.url || ''}
                  alt={product.image.alt}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 max-w-[200px] lg:max-w-[300px]"
                />
              ) : (
                <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center text-gray-500">
                  Pas d&apos;image
                </div>
              )}

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
                  <div>
                    {product.handedness && (
                      <span className="mr-3 w-2 h-2 bg-accent-principle rounded-full"></span>
                    )}
                    {product.handedness === 'right' ? 'Droitier' : 'Gaucher'}
                  </div>
                  <div>
                    {product.type && (
                      <span className="mr-3 w-2 h-2 bg-accent-secondary rounded-full"></span>
                    )}
                    {product.type === 'cross' ? 'Crosses complètes' : 'Pièces détachées'}
                  </div>
                  <Link
                    href={`/contact?product=${product.id}`}
                    className="h-10 inline-flex items-center justify-center rounded-md border border-transparent bg-accent-principle px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary focus:ring-offset-2"
                  >
                    Contacter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
