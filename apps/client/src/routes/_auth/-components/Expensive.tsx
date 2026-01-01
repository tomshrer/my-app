import * as React from 'react'
import { useAuth } from '@/auth'
import { tuyau } from '@/tuyau'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'

interface Property {
  id: number
  title: string
  description?: string
  price: number
  surface: number
  city: string
  available: boolean
  createdAt: string
}

export default function Expensive() {
  const router = useRouter()
  const navigate = useNavigate()
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
        const data = await tuyau.properties.mine
          .$get({
            headers: { Authorization: `Bearer ${token}` },
          })
          .unwrap()
        console.log(data)
        setAnimals(data)
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
      <section className="p-2">
        <h2 className="mb-4 text-lg font-semibold text-stone-300">
          Your Properties
        </h2>

        {isLoading ? (
          <p>Not profdez...</p>
        ) : animals.length === 0 ? (
          <p>You haven’t posted any preof yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-stone-700 text-sm text-stone-300">
              <thead className="bg-stone-800">
                <tr>
                  <th className="border border-stone-700 px-3 py-2 text-left">
                    Title
                  </th>
                  <th className="border border-stone-700 px-3 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-stone-700 px-3 py-2 text-left">
                    Price
                  </th>
                  <th className="border border-stone-700 px-3 py-2 text-left">
                    Surface
                  </th>
                  <th className="border border-stone-700 px-3 py-2 text-left">
                    City
                  </th>
                  <th className="border border-stone-700 px-3 py-2 text-left">
                    Available
                  </th>
                  <th className="border border-stone-700 px-3 py-2 text-left">
                    Created At
                  </th>
                </tr>
              </thead>

              <tbody>
                {animals.map((animal) => (
                  <tr
                    key={animal.id}
                    className="odd:bg-stone-900 even:bg-stone-800 hover:bg-stone-700"
                  >
                    <td className="border border-stone-700 px-3 py-2">
                      {animal.title}
                    </td>
                    <td className="border border-stone-700 px-3 py-2">
                      {animal.description}
                    </td>
                    <td className="border border-stone-700 px-3 py-2">
                      {animal.price}
                    </td>
                    <td className="border border-stone-700 px-3 py-2">
                      {animal.surface}
                    </td>
                    <td className="border border-stone-700 px-3 py-2">
                      {animal.city}
                    </td>
                    <td className="border border-stone-700 px-3 py-2">
                      {animal.available ? 'Yes' : 'No'}
                    </td>
                    <td className="border border-stone-700 px-3 py-2">
                      {new Date(animal.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
