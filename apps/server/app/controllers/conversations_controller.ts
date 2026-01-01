import Conversation from '#models/conversation'
import ConversationParticipant from '#models/conversation_participant'
import Property from '#models/property'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConversationsController {
  public async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ message: 'Utilisateur non authentifié' })
    }

    const conversations = await Conversation.query()
      .whereHas('participants', (participantsQuery) => {
        participantsQuery.where('user_id', user.id)
      })
      .preload('participants', (participantsQuery) => {
        participantsQuery.where('user_id', '!=', user.id).preload('user', (userQuery) => {
          userQuery.select(['id', 'email'])
          userQuery.preload('profile', (profileQuery) => {
            profileQuery.select(['id', 'full_name'])
          })
        })
      })

    return response.ok({
      message: 'Liste des conversations',
      data: conversations,
    })
  }

  public async create({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const { propertyId } = request.only(['propertyId'])

    const property = await Property.findOrFail(propertyId)

    if (property.userId === user.id) {
      return response.badRequest({
        message: 'Vous ne pouvez pas créer une conversation avec vous-même',
      })
    }

    const existingConv = await Conversation.query()
      .where('property_id', propertyId)
      .whereHas('participants', (query) => {
        query.where('user_id', user.id)
      })
      .whereHas('participants', (query) => {
        query.where('user_id', property.userId)
      })
      .first()

    if (existingConv) {
      return response.ok({
        message: 'Conversation existante',
        data: existingConv,
      })
    }

    const conversation = await Conversation.create({
      propertyId: property.id,
    })

    await ConversationParticipant.createMany([
      {
        conversationId: conversation.id,
        userId: property.userId,
      },
      {
        conversationId: conversation.id,
        userId: user.id,
      },
    ])

    return response.created({
      message: 'Conversation créée',
      data: conversation,
    })
  }
}
