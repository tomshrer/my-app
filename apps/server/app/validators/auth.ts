import vine from '@vinejs/vine'

export const emailRule = () => vine.string().maxLength(254).email().trim().toLowerCase()

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(254).optional(),
    email: emailRule().unique(async (db, value) => {
      const exists = await db
        .from('users')
        .whereRaw('LOWER(email) = ?', [value])
        .select('id')
        .first()
      return !exists
    }),
    password: vine.string().minLength(8),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().toLowerCase().trim(),
    password: vine.string().minLength(8),
  })
)
