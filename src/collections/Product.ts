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
      required: true,
      defaultValue: 1,
      min: 1,
      max: 100,
      admin: { step: 1 },
      validate: (value: unknown) => {
        // allow required/min/max to do most work; add integer check:
        if (value == null) return true // 'required' handles empties
        if (Array.isArray(value)) return 'Must be a single number'
        const n = Number(value)
        if (Number.isNaN(n)) return 'Must be a number'
        if (!Number.isInteger(n)) return 'Must be an integer'
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
