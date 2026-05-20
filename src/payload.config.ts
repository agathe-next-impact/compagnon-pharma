import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Profiles } from './collections/Profiles'
import { Diagnostics } from './collections/Diagnostics'
import { Routines } from './collections/Routines'
import { Products } from './collections/Products'
import { Events } from './collections/Events'
import { ensureSchema, seedAdminUser } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || undefined,
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
  editor: lexicalEditor(),
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '· Karinthi',
      icons: [{ url: '/icons/favicon-32.png', rel: 'icon', sizes: '32x32', type: 'image/png' }],
    },
  },
  collections: [Users, Profiles, Diagnostics, Routines, Products, Events],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || '*'].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Crée automatiquement le schéma au boot — pratique pour Neon + Vercel.
    push: true,
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  // Au boot : pousse le schéma vers Postgres (no-op si déjà à jour), puis
  // seed l'utilisateur admin si ADMIN_EMAIL/PASSWORD sont fournis.
  onInit: async (payload) => {
    await ensureSchema(payload)
    await seedAdminUser(payload)
  },
})
