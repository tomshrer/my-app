import {
  Link,
  Outlet,
  createFileRoute,
  linkOptions,
  useRouter,
} from '@tanstack/react-router'
import { ArrowLeftToLine, ChevronDown, ChevronUp, LogOut } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { useAuth } from '@/auth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardComponent,
})

const options = [
  linkOptions({
    to: '/dashboard',
    label: 'Home',
    activeOptions: { exact: true },
    icon: 'home',
  }),
  linkOptions({
    to: '/dashboard/invoices',
    label: 'Invoices',
    icon: 'file-text',
  }),
  linkOptions({
    to: '/dashboard/messages',
    label: 'Messages',
    icon: 'mail',
  }),
  linkOptions({
    to: '/dashboard/expensive',
    label: 'Expensive',
    icon: 'dollar-sign',
  }),
  linkOptions({
    to: '/dashboard/settings',
    label: 'Settings',
    icon: 'user',
  }),
]

function DashboardComponent() {
  return (
    <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col dark:bg-stone-950">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 border-r border-stone-200 max-lg:hidden dark:border-stone-700">
        <div className="flex h-full min-h-0 flex-col">
          <AccountToggle />
          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <RouteSelect />
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="flex flex-1 flex-col pl-64">
        <div className="grow bg-white dark:bg-stone-950">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const AccountToggle = () => {
  const { user } = useAuth()
  const auth = useAuth()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/' })
        })
      })
    }
  }

  return (
    <Menu as="div" className="flex flex-col border-b border-zinc-950/5 p-4">
      <MenuButton className="relative flex w-full items-center gap-2 rounded p-0.5 transition-colors hover:bg-stone-800 data-open:bg-red-700">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="size-8 shrink-0 rounded bg-blue-500 shadow"
        />
        <div className="text-start">
          <span className="block text-sm font-semibold">
            {user?.profile?.fullName}
          </span>
          <span className="block text-xs text-stone-500">{user?.email}</span>
        </div>

        <ChevronDown
          size={12}
          className="absolute top-1/2 right-2 translate-y-[calc(-50%+4px)]"
        />
        <ChevronUp
          size={12}
          className="absolute top-1/2 right-2 translate-y-[calc(-50%-4px)]"
        />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom start"
        className="min-w-80 rounded-xl border border-white/5 bg-stone-900 p-4 [--anchor-gap:--spacing(1)] focus:outline-none lg:min-w-64"
      >
        <MenuItem as="div" className="flex items-center gap-4 px-3 py-1.5">
          <ArrowLeftToLine size={20} />
          <Link className="block text-stone-200" to="/properties">
            Go home
          </Link>
        </MenuItem>
        <MenuItem as="div" className="flex items-center gap-4 px-3 py-1.5">
          <LogOut size={20} />
          <button onClick={handleLogout} className="block text-stone-200">
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

const RouteSelect = () => {
  return (
    <div className="flex flex-col gap-0.5">
      {options.map((option) => {
        return (
          <Link
            {...option}
            key={option.to}
            activeProps={() => ({
              className: 'bg-stone-800 text-stone-200 shadow',
            })}
            inactiveProps={() => ({
              className:
                'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none',
            })}
            className="group flex w-full items-center justify-start gap-2 rounded px-2 py-1.5 transition-[box-shadow_background-color_color]"
          >
            {({ isActive }) => {
              return (
                <>
                  <DynamicIcon
                    size={20}
                    name={option.icon}
                    className={isActive ? 'text-blue-500' : ''}
                  />
                  <span className="text-base font-medium">{option.label}</span>
                </>
              )
            }}
          </Link>
        )
      })}
    </div>
  )
}
