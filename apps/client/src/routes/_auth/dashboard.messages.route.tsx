import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_auth/dashboard/messages')({
  component: RouteComponent,
})

function RouteComponent() {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    fetch('http://localhost:3333/conversations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConversations(data.data)
      })
  }, [])

  console.log(conversations)

  return (
    <div className="flex h-full">
      <div className="h-full min-w-64 border-r border-stone-200 p-4 dark:border-stone-800">
        <Link to="/dashboard/messages">
          <h2 className="mb-4 text-lg text-stone-900 dark:text-stone-50">
            Messages
          </h2>
        </Link>
        {conversations.map((conv: any) => {
          return (
            <Link
              key={conv.id}
              to="/dashboard/messages/$conversationId"
              params={{ conversationId: conv.id }}
              className="block cursor-pointer border-b border-stone-100 py-2 hover:bg-stone-700 dark:border-stone-800"
            >
              <div className="text-stone-900 dark:text-stone-50">
                {conv.participants?.[0]?.user.profile.fullName}
              </div>
            </Link>
          )
        })}
      </div>

      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
