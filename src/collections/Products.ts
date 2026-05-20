import type { CollectionConfig } from 'payload'

// Catalogue produits (lecture publique, écriture réservée aux admins).
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['brand', 'name', 'category', 'price', 'stock'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'pharmacist',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'pharmacist',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'brand', type: 'text', required: true },
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Visage', 'Cheveux', 'Corps', 'Bébé', 'Compléments', 'Soins ciblés']
        .map((c) => ({ label: c, value: c })),
    },
    { name: 'price', type: 'text', admin: { description: 'Au format "16,90".' } },
    { name: 'size', type: 'text' },
    { name: 'stock', type: 'checkbox', defaultValue: true },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'inci',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'function', type: 'text' },
        {
          name: 'flag',
          type: 'select',
          options: [
            { label: '—', value: 'none' },
            { label: 'Bon', value: 'good' },
            { label: 'Attention', value: 'warn' },
          ],
          defaultValue: 'none',
        },
      ],
    },
  ],
  timestamps: true,
}
