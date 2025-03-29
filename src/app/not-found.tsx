import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative isolate min-h-full">
      <Image
        height={1080}
        width={1920}
        alt=""
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        className="absolute inset-0 -z-10 size-full object-cover object-top"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base/8 font-semibold text-white">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Page non trouvée
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">
          Désolé, nous n&apos;avons pas trouvé la page que vous recherchez.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/" className="text-sm/7 font-semibold text-white">
            <span aria-hidden="true">&larr;</span> Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
