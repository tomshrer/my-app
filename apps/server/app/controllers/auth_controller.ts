import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, auth, response }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])

    const user = await User.create({ fullName, email, password })

    await auth.use('web').login(user)

    return response.created({
      message: 'Inscription réussie',
    })
  }

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      return response.status(200)
    } catch (error) {
      return response.unauthorized({
        message: 'Email ou mot de passe incorrect.',
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.ok({
      message: 'Logged out successfully',
    })
  }

  async me({ auth }: HttpContext) {
    await auth.authenticate()

    const user = auth.user

    return user
  }
}
