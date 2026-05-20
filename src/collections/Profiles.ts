import type { CollectionConfig } from 'payload'

// Profil 1:1 avec un utilisateur. Stocke les préférences peau / moment de vie.
export const Profiles: CollectionConfig = {
  slug: 'profiles',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'user', 'skinType', 'lifeMoment', 'updatedAt'],
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
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'displayName',
      type: 'text',
      admin: { description: 'Nom affiché dans l\'app (prénom ou pseudonyme).' },
    },
    {
      name: 'skinType',
      type: 'select',
      options: [
        { label: 'Sèche', value: 'seche' },
        { label: 'Mixte', value: 'mixte' },
        { label: 'Grasse', value: 'grasse' },
        { label: 'Normale', value: 'normale' },
        { label: 'Sensible', value: 'sensible' },
      ],
    },
    {
      name: 'lifeMoment',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'Aucun', value: 'none' },
        { label: 'Grossesse', value: 'grossesse' },
        { label: 'Post-partum', value: 'postpartum' },
        { label: 'Ménopause', value: 'menopause' },
      ],
    },
    {
      name: 'concerns',
      type: 'select',
      hasMany: true,
      options: [
        'Imperfections', 'Rides & ridules', 'Taches', 'Rougeurs',
        'Déshydratation', 'Manque d\'éclat', 'Pores', 'Sensibilité',
      ].map((c) => ({ label: c, value: c })),
    },
    {
      name: 'sunExposure',
      type: 'select',
      options: [
        { label: 'Faible', value: 'low' },
        { label: 'Modérée', value: 'med' },
        { label: 'Forte', value: 'high' },
      ],
    },
    {
      name: 'routineHabit',
      type: 'select',
      options: [
        { label: 'Oui, régulière', value: 'yes' },
        { label: 'Occasionnelle', value: 'occ' },
        { label: 'Non', value: 'no' },
      ],
    },
    {
      name: 'favorites',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
