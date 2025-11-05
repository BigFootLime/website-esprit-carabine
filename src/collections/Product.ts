import type { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'product',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'position',
      type: 'number',
      label: 'Position',
      required: true,
      index: true,
      unique: false, // set to true if you want every number to be unique
      defaultValue: 1,
      admin: { width: '25%' },
      validate: (val) => {
        if (typeof val !== 'number') return 'Must be a number'
        if (val < 1 || val > 100) return 'Enter a value between 1 and 100'
        return true
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
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
      label: 'Type',
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
