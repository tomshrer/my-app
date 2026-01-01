import Header from '@/components/Header'
import { tuyau } from '@/tuyau'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from '@tanstack/react-router'

export const Route = createFileRoute('/property/$propertyId')({
  component: RouteComponent,
})

const queryClient = new QueryClient()

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { propertyId } = Route.useParams()
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const { isPending, error, data } = useQuery({
    queryKey: ['animal', propertyId],
    queryFn: () => tuyau.properties({ id: propertyId }).$get().unwrap(),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurrend: ' + error.message

  const handleGo = async () => {
    try {
      const res = await fetch('http://localhost:3333/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ propertyId }),
      })

      if (!res.ok) {
        throw new Error('Failed to create conversation')
      }
      const response = await res.json()
      const conversationId = response.data?.id

      router.navigate({
        to: `/dashboard/messages/${conversationId}`,
      })
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la création de la conversation')
    }
  }

  return (
    <div>
      <Header />
      <div className="p-6 pt-24">
        <strong>Title:</strong> {data.title}
        <p>Espèce: {data.species}</p>
        <p>
          Âge: {data.age} an{data.age > 1 ? 's' : ''}
        </p>
        <img src={`${import.meta.env.VITE_API_URL}/uploads/${data.imageUrl}`} />
        <p>{data.adopted ? 'Adopté' : 'Non adopté'}</p>
        {canGoBack ? (
          <button onClick={() => router.history.back()}>Go back</button>
        ) : null}
      </div>
      <button
        onClick={handleGo}
        className="mt-4 rounded bg-black px-4 py-2 text-white"
      >
        Contacter
      </button>
    </div>
  )
}
