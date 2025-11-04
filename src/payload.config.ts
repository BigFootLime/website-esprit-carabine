import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { UniversalConcept } from './collections/UniversalConcept'
import { Product } from './collections/Product'
import { Coaching } from './collections/Coaching'
import { About } from './collections/About'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  // si tu utilises CORS/CSRF, pense à ajouter ton domaine :
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://www.esprit-carabine.fr'],
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://www.esprit-carabine.fr'],
  // ...
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, UniversalConcept, Product, Coaching, About],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    payloadCloudPlugin(), // tu peux l'enlever si non utilisé
  ],
})
