import type { CollectionConfig } from 'payload'

export const UniversalConcept: CollectionConfig = {
  slug: 'universalConcept',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
      minRows: 1,
    },
  ],
}
