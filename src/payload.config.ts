// payload.config.ts
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

const ORIGINS = [
  process.env.PAYLOAD_PUBLIC_SERVER_URL, // ex: http://localhost:3000 en dev, https://www.esprit-carabine.fr en prod
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://www.esprit-carabine.fr',
].filter(Boolean)

export default buildConfig({
  // ⚠️ Très important : mets cette variable EXACTEMENT à l’origine où tu ouvres l’Admin
  // ex dev: http://localhost:3000  |  ex prod: https://www.esprit-carabine.fr
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,

  cors: ORIGINS,
  csrf: ORIGINS,

  admin: {
    user: Users.slug, // aucun access() ici → tout utilisateur connecté peut accéder à l’Admin
    importMap: { baseDir: path.resolve(dirname) },
  },

  collections: [Users, Media, UniversalConcept, Product, Coaching, About],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  plugins: [payloadCloudPlugin()],
})
