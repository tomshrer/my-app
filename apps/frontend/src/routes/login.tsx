import { login } from "@/api/auth.api";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login({ email: value.email, password: value.password });
    },
  });

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
              Sign in
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4 md:space-y-6"
            >
              <em className="text-blue-500">
                {form.state.errors?.length > 0 && (
                  <p style={{ color: "blue" }}>{form.state.errors[0]}</p>
                )}
              </em>
              <div>
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) {
                        return "Email is required";
                      }
                      if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                      ) {
                        return "Invalid email address";
                      }
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        Adresse e-mail
                      </label>
                      <input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="py-3 px-2 border border-neutral-200 rounded-sm w-full placeholder:text-gray-500"
                        placeholder="Email"
                      />
                      {!field.state.meta.isValid && (
                        <em className="text-red-500">
                          {field.state.meta.errors.join(",")}
                        </em>
                      )}
                    </>
                  )}
                />
              </div>
              <div>
                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) {
                        return "Le mot de passe est obligatoire.";
                      }
                      if (value.length < 8) {
                        return "Le mot de passe doit contenir au moins 8 caractères.";
                      }
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <>
                      <label htmlFor={field.name}>Mot de passe</label>
                      <input
                        id={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="py-3 px-2 border border-gray-900 rounded-sm w-full placeholder:text-gray-500"
                        placeholder="Password"
                      />
                      {!field.state.meta.isValid && (
                        <em className="text-red-500">
                          {field.state.meta.errors.join(",")}
                        </em>
                      )}
                    </>
                  )}
                />
              </div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    className="bg-blue-700 text-white px-6 py-2 rounded-sm shadow-inner"
                    type="submit"
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? "..." : "Login"}
                  </button>
                )}
              />
            </form>
            <p className="mt-6 text-center text-gray-700">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Créez-en un
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
