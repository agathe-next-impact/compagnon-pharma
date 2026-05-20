import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 jours
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'role', 'memberTier', 'createdAt'],
  },
  access: {
    // Un utilisateur peut lire son propre compte ; un admin lit tout.
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // Création publique (signup) acceptée.
    create: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
    admin: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: false,
    },
    {
      name: 'lastName',
      type: 'text',
      required: false,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Membre', value: 'member' },
        { label: 'Pharmacien', value: 'pharmacist' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        // Seul un admin peut changer le rôle.
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'memberTier',
      type: 'select',
      defaultValue: 'Membre',
      options: [
        { label: 'Membre', value: 'Membre' },
        { label: 'Privilège', value: 'Privilège' },
        { label: 'Cercle', value: 'Cercle' },
      ],
    },
    {
      name: 'consent',
      type: 'group',
      fields: [
        { name: 'marketing', type: 'checkbox', defaultValue: false },
        { name: 'dataProcessing', type: 'checkbox', defaultValue: true },
        { name: 'acceptedAt', type: 'date', admin: { readOnly: true } },
      ],
    },
  ],
  timestamps: true,
}
