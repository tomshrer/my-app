import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import { tuyau } from '@/tuyau'

export const Route = createFileRoute('/properties/')({
  component: Example,
  loader: async () => {
    return await tuyau.properties.$get().unwrap()
  },
})

function Example() {
  const initialData = Route.useLoaderData()
  const { isPending, error, data } = useQuery({
    queryKey: ['properties'],
    queryFn: () => tuyau.properties.$get().unwrap(),
    initialData,
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurrend: ' + error.message

  if (!data || data.length === 0)
    return (
      <div className="p-6 text-center text-gray-500">
        Aucun animal pour le moment 🐾
        <div className="mt-4">
          <Link
            to="/properties/create"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
          >
            Ajouter un animal
          </Link>
        </div>
      </div>
    )

  return (
    <div>
      <Header />
      <div className="p-6 pt-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {data.map((property: any) => {
            const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/${property.imageUrl}`
            return (
              <Link
                key={property.id}
                to="/property/$propertyId"
                params={{ propertyId: property.id }}
                className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-500 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p>{property.description}</p>
                <div>
                  <strong>Price:</strong> {property.price} €
                </div>
                <div>
                  <strong>Surface:</strong> {property.surface} m²
                </div>
                <div>
                  <strong>City:</strong> {property.city}
                </div>
                <img src={imageUrl} />
                {property.user && (
                  <div>
                    <strong>User:</strong> {property.user.fullName} (
                    {property.user.email})
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
