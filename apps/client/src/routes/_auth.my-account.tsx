import { useAuth } from '@/auth'
import { tuyau } from '@/tuyau'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_auth/my-account')({
  component: DashboardComponent,
})

interface Property {
  id: number
  title: string
  description?: string
  price: number
  surface: number
  city: string
  available: boolean
}

function DashboardComponent() {
  const router = useRouter()
  const navigate = Route.useNavigate()
  const auth = useAuth()
  const [animals, setAnimals] = React.useState<Property[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/' })
        })
      })
    }
  }

  React.useEffect(() => {
    const fetchAnimals = async () => {
      if (!auth.isAuthenticated) return setIsLoading(false)

      try {
        const token = localStorage.getItem('auth-token')
        const animals = await tuyau.properties.mine
          .$get({
            headers: { Authorization: `Bearer ${token}` },
          })
          .unwrap()
        setAnimals(animals)
      } catch (err) {
        console.error('Failed to fetch animals', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnimals()
  }, [auth.isAuthenticated])

  return (
    <div className="h-full p-2">
      <button
        type="button"
        className="me-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleLogout}
      >
        Logout
      </button>
      <section className="grid gap-2 p-2">
        <input value={auth.user?.fullName} />
        <input value={auth.user?.email} />

        <h2 className="mt-900 text-lg font-semibold">Your Animals</h2>
        {isLoading ? (
          <p>Loading animals...</p>
        ) : animals.length === 0 ? (
          <p>You haven’t posted any animals yet.</p>
        ) : (
          <ul className="list-disc space-y-1 pl-5">
            {animals.map((animal) => (
              <li key={animal.id}>
                {animal.title} - {animal.description} - {animal.price} -{' '}
                {animal.surface} - {animal.city}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
