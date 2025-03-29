import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export default function TestimonialCard({
  description,
  author,
  stars,
}: {
  description: string
  author: string
  stars: number
}) {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <p className="sr-only">stars</p>
        <div className="flex gap-x-1 text-accent-principle">
          {[...Array(stars)].map((_, index) => (
            <StarIcon key={index} aria-hidden="true" className="size-5 flex-none" />
          ))}
        </div>
        <blockquote className="mt-10 text-xl/8 font-semibold tracking-tight text-primary sm:text-2xl/9">
          <p>{description}</p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-x-6">
          <Image
            width={48}
            height={48}
            alt=""
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80"
            className="size-12 rounded-full bg-gray-50"
          />
          <div className="text-sm/6">
            <div className="font-semibold text-primary">{author}</div>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
