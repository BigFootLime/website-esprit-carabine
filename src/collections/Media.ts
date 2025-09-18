import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  fields: [{ name: 'alt', type: 'text', required: true, label: "Description de l'image" }],
  upload: {
    // 👇 dossier physique réel (toujours à partir de la racine du projet)
    staticDir: path.join(process.cwd(), 'public', 'uploads'),
  },
}
