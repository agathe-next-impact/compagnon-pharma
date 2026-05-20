import type { Payload } from 'payload'

// Crée l'utilisateur admin initial si ADMIN_EMAIL / ADMIN_PASSWORD sont définis
// et qu'aucun admin n'existe encore. Sans-op sinon.
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
