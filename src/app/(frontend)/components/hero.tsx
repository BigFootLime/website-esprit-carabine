import Image from 'next/image'

export default function HeroComponent({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) {
  return (
    <div className="relative py-24 sm:py-24 flex sm:flex-row flex-col min-h-[calc(100vh-70px)] ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center justify-center flex flex-col">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-primary">{description}</p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-accent-principle to-accent-secondary blur-3xl xl:aspect-[1155/678] xl:w-[72.1875rem]" />
        </div>
      </div>
      {image && (
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:w-1/2 items-center justify-center flex flex-col">
          <Image
            src={image}
            alt={title}
            width={1000}
            height={1600}
            className="rounded-xl shadow-xl ring-1 ring-gray-400/10 w-full max-h-100 object-cover"
          />
        </div>
      )}
    </div>
  )
}
