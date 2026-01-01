import { Link } from '@tanstack/react-router'
import { useAuth } from '@/auth'

export default function Header() {
  const { user } = useAuth()

  return (
    <div className="border-b border-stone-50/10 px-4">
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-black hover:underline">
          ImmoSite
        </Link>

        {/* Navigation */}
        <nav className="hidden space-x-6 font-medium text-gray-700 md:flex">
          <Link to="/properties" className="transition hover:text-black">
            Propriétés
          </Link>
          <Link to="/" className="transition hover:text-black">
            Agents
          </Link>
          <Link to="/" className="transition hover:text-black">
            Contact
          </Link>
        </nav>

        {/* User actions */}
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="underline">
                My Account Dashboard
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
