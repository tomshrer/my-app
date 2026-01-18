import { deleteProperty, getProperty } from "@/api/properties.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/properties/$propertyId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter();
  const { propertyId } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["property"],
    queryFn: () => getProperty(propertyId),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteProperty(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      router.navigate({ to: "/properties" });
    },
  });

  if (!data) return <p>Propriété introuvable</p>;

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded mt-8 space-y-4">
      <button
        onClick={() => navigate({ to: "/properties" })}
        className="px-4 py-2 border rounded hover:bg-gray-100 transition"
      >
        ← Retour en arrière
      </button>
      <button
        onClick={handleDelete}
        className="underline text-red-600 hover:text-red-800"
      >
        Supprimer
      </button>
      <Link
        to="/properties/$propertyId/edit"
        params={{ propertyId: data.id }}
        className="underline text-blue-600 hover:text-blue-800"
      >
        Modifier
      </Link>

      <h1 className="text-xl font-semibold">{data.name}</h1>
      <p>{data.address}</p>
    </div>
  );
}
