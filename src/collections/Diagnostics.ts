import type { CollectionConfig } from 'payload'

// Historique des diagnostics réalisés par l'utilisateur.
export const Diagnostics: CollectionConfig = {
  slug: 'diagnostics',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'skinType', 'lifeMoment', 'createdAt'],
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
    { name: 'skinType', type: 'text' },
    { name: 'lifeMoment', type: 'text' },
    {
      name: 'concerns',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
    },
    { name: 'sunExposure', type: 'text' },
    { name: 'routineHabit', type: 'text' },
    {
      name: 'answers',
      type: 'json',
      admin: { description: 'Réponses brutes du parcours diagnostic.' },
    },
    {
      name: 'recommendations',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Synthèse générée pour l\'utilisateur.' },
    },
  ],
  timestamps: true,
}
