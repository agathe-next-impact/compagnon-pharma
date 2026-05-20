import type { CollectionConfig } from 'payload'

// Animations et ateliers en officine.
export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'capacity', 'published'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'pharmacist') return true
      return { published: { equals: true } }
    },
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'pharmacist',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'pharmacist',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'durationMinutes', type: 'number' },
    { name: 'capacity', type: 'number', defaultValue: 8 },
    { name: 'host', type: 'text', admin: { description: 'Intervenant ou laboratoire animateur.' } },
    { name: 'description', type: 'textarea' },
    { name: 'published', type: 'checkbox', defaultValue: true },
    {
      name: 'registrations',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: { description: 'Membres inscrits.' },
    },
  ],
  timestamps: true,
}
