import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProperty } from "@/api/properties.api";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/contexts/contextAuth";
import { useEffect } from "react";

export const Route = createFileRoute("/properties/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      router.navigate({ to: "/properties" });
    },
  });
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user) {
      router.navigate({ to: "/login" });
    }
  }, [user, loading]);

  if (loading) return <div>Chargement...</div>;
  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded">
      <button
        onClick={() => router.navigate({ to: "/properties" })}
        className="mb-4 text-blue-600 hover:underline"
        type="button"
      >
        ← Retour à la liste
      </button>

      <h1 className="text-xl font-semibold mb-6 text-center">
        Créer une propriété
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="name"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Name</label>
                <input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="address"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Address</label>
                <input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
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
              {isSubmitting ? "..." : "Créer"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
