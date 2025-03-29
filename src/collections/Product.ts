import type { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'product',
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
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price',
    },
    {
      name: 'handedness',
      type: 'select',
      options: [
        { label: 'Droiter', value: 'right' },
        { label: 'Gaucher', value: 'left' },
      ],
      required: false,
      label: 'Droitier ou Gaucher',
    },
    {
      name: 'anodizing',
      type: 'select',
      options: [
        { label: 'Noir', value: 'black' },
        { label: 'Rouge', value: 'red' },
        { label: 'Bleu', value: 'blue' },
      ],
      required: false,
      label: 'Anodisation',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Crosses complètes', value: 'cross' },
        { label: 'Pièces détachées', value: 'parts' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
  ],
}
