import { Link, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const { auth } = Route.useRouteContext()

  return (
    <main>
      <Header />
      <div className="relative overflow-hidden px-4">
        <div className="relative mx-auto max-w-6xl py-20">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl sm:text-6xl">
              Musical widget for streamers!
            </h1>
            <div className="flex justify-center bg-blue-500 p-4 text-white"></div>
            <p className="text-xl font-thin text-stone-400">
              Compatible with{''}{' '}
              <span className="font-normal">AppleMusic</span>,
              <span className="font-normal">Spotify</span>
              {''} on Windows and MacOS.
            </p>
            <div className="flex gap-5 py-20">
              <Link
                to="/properties"
                className="flex items-center justify-center gap-2 rounded bg-stone-200 px-2 py-3 text-center text-sm text-stone-950 transition-colors duration-400 ease-in-out"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
