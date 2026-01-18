import Property from '#models/property'
import type { HttpContext } from '@adonisjs/core/http'

export default class PropertiesController {
  public async list({ response }: HttpContext) {
    const properties = await Property.query().preload('user')
    return response.json(properties)
  }

  public async show({ params, response }: HttpContext) {
    const property = await Property.findOrFail(params.id)
    return response.json(property)
  }

  public async create({ request, auth, response }: HttpContext) {
    try {
      const data = request.only(['name', 'address'])

      const property = await Property.create({ ...data, userId: auth.user?.id })

      return response.status(201).json(property)
    } catch (error) {
      return response.status(500).json({ message: 'Erreur serveur', error })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const payload = request.only(['name', 'address'])
    const animal = await Property.findOrFail(params.id)
    animal.merge(payload)
    await animal.save()
    return response.json(animal)
  }

  public async delete({ params, response }: HttpContext) {
    const animal = await Property.findOrFail(params.id)
    await animal.delete()
    return response.status(204).noContent()
  }

  public async mine({ auth, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not logged in' })
    }
    const animals = await Property.query().where('user_id', auth.user.id)
    return response.ok(animals)
  }
}
