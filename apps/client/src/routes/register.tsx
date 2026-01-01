import { sleep } from '@/utils'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: RegisterComponent,
})

function RegisterComponent() {
  const { auth } = Route.useRouteContext()
  const navigate = Route.useNavigate()
  const form = useForm({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      await auth.register(value.email, value.fullName, value.password)
      await sleep(1)
      navigate({ to: '/' })
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="grid w-full max-w-md grid-cols-1 gap-8"
      >
        <h1 className="text-2xl/8 font-semibold text-white sm:text-xl/8">
          Create your account
        </h1>
        <div>
          <form.Field
            name="email"
            children={(field) => (
              <>
                <label
                  htmlFor="email"
                  className="text-base/6 text-white select-none sm:text-sm/6"
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
            name="fullName"
            children={(field) => (
              <>
                <label
                  htmlFor="fullName"
                  className="text-base/6 text-white select-none sm:text-sm/6"
                >
                  Full name
                </label>
                <div className="mt-3">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
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
                    className="text-base/6 text-white select-none sm:text-sm/6"
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
              className="flex w-full justify-center rounded-md bg-zinc-500 px-3 py-1.5 text-base/6 font-semibold text-white hover:bg-zinc-400 sm:text-sm/6"
            >
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>
          )}
        />
        <p className="text-base/6 text-zinc-400 sm:text-sm/6">
          Already have an account?{' '}
          <Link
            className="text-white underline decoration-white/50 hover:decoration-white"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
