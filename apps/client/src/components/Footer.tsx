export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 px-8 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Logo / Nom */}
        <div className="text-2xl font-extrabold tracking-wide">ImmoSite</div>

        {/* Navigation liens */}
        <nav className="flex flex-wrap gap-8 text-lg font-semibold">
          <a
            href="/properties"
            className="transition hover:text-gray-300 hover:underline"
          >
            Propriétés
          </a>
          <a
            href="/agents"
            className="transition hover:text-gray-300 hover:underline"
          >
            Agents
          </a>
          <a
            href="/contact"
            className="transition hover:text-gray-300 hover:underline"
          >
            Contact
          </a>
          <a
            href="/about"
            className="transition hover:text-gray-300 hover:underline"
          >
            À propos
          </a>
          <a
            href="/privacy"
            className="transition hover:text-gray-300 hover:underline"
          >
            Politique de confidentialité
          </a>
        </nav>

        {/* Mentions légales */}
        <div className="text-sm text-gray-200">
          &copy; {new Date().getFullYear()} ImmoSite. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
