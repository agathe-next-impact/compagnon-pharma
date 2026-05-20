import type { Payload } from 'payload'
import { pushDevSchema } from '@payloadcms/drizzle'

// Crée les tables Postgres au premier démarrage en s'appuyant sur le diff
// Drizzle. Idempotent : si le schéma est déjà à jour, l'appel est un no-op
// (cache module + diff). Sécurisé via try/catch pour ne pas faire planter
// l'init si la push échoue — on log et on continue.
export async function ensureSchema(payload: Payload): Promise<void> {
  if (process.env.PAYLOAD_AUTO_PUSH === 'false') {
    payload.logger.info('[init] PAYLOAD_AUTO_PUSH=false, push de schéma ignoré.')
    return
  }
  try {
    // payload.db est un adapter Drizzle (postgres) pour cette config.
    await pushDevSchema(payload.db as unknown as Parameters<typeof pushDevSchema>[0])
    payload.logger.info('[init] schéma Postgres synchronisé.')
  } catch (err) {
    payload.logger.error({ err }, '[init] échec de la synchronisation du schéma')
  }
}

// Crée l'utilisateur admin initial si ADMIN_EMAIL / ADMIN_PASSWORD sont définis
// et qu'aucun compte avec cet email n'existe encore. Sans-op sinon.
export async function seedAdminUser(payload: Payload): Promise<void> {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    payload.logger.info('[seed] ADMIN_EMAIL / ADMIN_PASSWORD non définis, seed admin ignoré.')
    return
  }

  try {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
    })

    if (existing.totalDocs > 0) {
      payload.logger.info(`[seed] Admin ${email} déjà présent.`)
      return
    }

    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'admin',
        firstName: 'Admin',
        memberTier: 'Cercle',
      },
    })

    payload.logger.info(`[seed] Admin ${email} créé.`)
  } catch (err) {
    payload.logger.error({ err }, '[seed] Échec création admin initial')
  }
}
