import { useForm } from '@tanstack/react-form'
import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { useAuth } from '@/auth'
import { sleep } from '@/utils'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const auth = useAuth()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await auth.login(value.email, value.password)
      await router.invalidate()
      await sleep(1)
      await navigate({ to: '/dashboard' })
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="grid w-full max-w-md grid-cols-1 gap-8"
      >
        <h1 className="text-2xl/8 font-semibold sm:text-xl/8">
          Log in to your accountdededede
        </h1>
        <div>
          <form.Field
            name="email"
            children={(field) => (
              <>
                <label
                  htmlFor="email"
                  className="text-base/6 select-none sm:text-sm/6"
                >
                  Email
                </label>
                <div className="mt-3">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="password"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor="password"
                    className="text-base/6 select-none sm:text-sm/6"
                  >
                    Password
                  </label>
                  <div className="mt-3">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                </>
              )
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-ful flex justify-center rounded-md bg-zinc-500 px-3 py-1.5 text-base/6 font-semibold text-white hover:bg-zinc-400 sm:text-sm/6"
            >
              {isSubmitting ? 'Logging in…' : 'Login'}
            </button>
          )}
        />
        <p className="text-base/6 text-zinc-400 sm:text-sm/6">
          Don't have an account?{' '}
          <Link
            className="text-white underline decoration-white/50 hover:decoration-white"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
