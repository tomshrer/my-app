import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Infer } from '@vinejs/vine/types'

export default class UserService {
  async register(auth: Authenticator<Authenticators>, data: Infer<typeof registerValidator>) {
    const user = await User.create(data)

    await auth.use()
  }
}
