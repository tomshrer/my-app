import { getProperty, updateProperty } from "@/api/properties.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/properties/$propertyId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { propertyId } = Route.useParams();
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["property"],
    queryFn: () => getProperty(propertyId),
  });
  const mutation = useMutation({
    mutationFn: (updatedData) => updateProperty(propertyId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
    },
  });
  const [name, setName] = useState("");
  const [address, setAdresse] = useState("");
  useEffect(() => {
    if (data) {
      setName(data.name);
      setAdresse(data.address);
    }
  }, [data]);
  if (!data) return <p>Propriété introuvable</p>;
  if (isPending) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, address });
  };
  return (
    <div>
      <h1>Modifier la propriété</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
