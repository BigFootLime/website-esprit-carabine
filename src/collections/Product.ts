// src/collections/Product.ts
import type { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['position', 'title', 'type', 'price'],
    defaultSort: 'position', // tri par défaut dans la List View
  },
  fields: [
    {
      name: 'position',
      type: 'number',
      required: true,
      defaultValue: 9999, // évite le NOT NULL sans valeur
      admin: { width: '100px' },
    },

    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'description', type: 'textarea', label: 'Description' },
    { name: 'price', type: 'number', required: true, label: 'Price' },
    {
      name: 'handedness',
      type: 'select',
      label: 'Droitier ou Gaucher',
      options: [
        { label: 'Droitier', value: 'right' },
        { label: 'Gaucher', value: 'left' },
      ],
    },
    {
      name: 'anodizing',
      type: 'select',
      label: 'Anodisation',
      options: [
        { label: 'Noir', value: 'black' },
        { label: 'Rouge', value: 'red' },
        { label: 'Bleu', value: 'blue' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'parts',
      options: [
        { label: 'Crosses complètes', value: 'cross' },
        { label: 'Pièces détachées', value: 'parts' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Image' },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (operation !== 'create') return
        if (!data) return
        if (typeof data.position === 'number') return
        const res = await req.payload.find({
          collection: 'product',
          limit: 1,
          sort: '-position',
          depth: 0,
        })
        const last = res?.docs?.[0]?.position ?? 0
        data.position = last + 1
      },
    ],
  },
}
