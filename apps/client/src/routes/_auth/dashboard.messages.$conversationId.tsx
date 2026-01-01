import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute(
  '/_auth/dashboard/messages/$conversationId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { conversationId } = params
  const [conversation, setConversation] = useState<any>(null)

  useEffect(() => {
    if (!conversationId) return

    fetch(`http://localhost:3333/conversations/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConversation(data)
      })
  }, [conversationId])

  return (
    <div className="flex h-full flex-col border-b border-stone-700 pb-4">
      <h2 className="text-lg">{conversation?.otherUserEmail}</h2>
      <span>{conversation?.property?.title}</span>

      <div className="mt-4 grow overflow-auto"></div>

      <div className="mt-auto flex gap-2 border-t border-stone-700 pt-4">
        <input
          type="text"
          placeholder="Tape ton message..."
          className="grow rounded border border-stone-600 bg-stone-900 p-2 text-white"
        />
        <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          Envoyer
        </button>
      </div>
    </div>
  )
}
