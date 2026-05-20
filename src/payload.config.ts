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
import { migrations } from './migrations'
import { seedAdminUser } from './seed'

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
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // En dev, sync direct du schéma. En prod, on s'appuie sur les migrations
    // versionnées dans src/migrations/ et exécutées automatiquement par
    // l'adapter au boot (cf. prodMigrations).
    push: true,
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  // Seed l'admin si ADMIN_EMAIL/PASSWORD sont définis et la table users existe.
  onInit: async (payload) => {
    await seedAdminUser(payload)
  },
})
