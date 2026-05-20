import type { CollectionConfig } from 'payload'

// Routines personnalisées sauvegardées par l'utilisateur.
export const Routines: CollectionConfig = {
  slug: 'routines',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'user', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { user: { equals: user.id } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { user: { equals: user.id } }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { user: { equals: user.id } }
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Ma routine',
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'phase',
              type: 'select',
              required: true,
              options: [
                { label: 'Matin', value: 'Matin' },
                { label: 'Soir', value: 'Soir' },
              ],
            },
            { name: 'order', type: 'number', defaultValue: 1 },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'instructions', type: 'textarea' },
        { name: 'product', type: 'relationship', relationTo: 'products' },
      ],
    },
  ],
  timestamps: true,
}
