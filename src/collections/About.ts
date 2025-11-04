// src/collections/About.ts
import type { CollectionConfig } from 'payload'

export const About: CollectionConfig = {
  slug: 'about',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Titre (interne / optionnel)',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images (avec légende optionnelle)',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'caption',
          type: 'text',
          required: false,
          label: 'Légende (facultatif)',
        },
      ],
    },
  ],
}
