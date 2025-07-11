import type { CollectionConfig } from 'payload'

export const Coaching: CollectionConfig = {
  slug: 'coaching',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre du bloc de coaching',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images avec titre',
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
          required: true,
          label: 'Titre associé à l’image',
        },
      ],
      minRows: 1,
    },
  ],
}
