import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProperties, Property } from "@/api/properties.api";

export const Route = createFileRoute("/properties/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, error } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Liste des propriétés</h1>
      <Link
        to="/properties/create"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Créer une propriété
      </Link>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data && data.length > 0 ? (
          data.map((property) => (
            <li
              key={property.id}
              className="border rounded p-4 hover:shadow cursor-pointer"
            >
              <Link
                to="/properties/$propertyId"
                params={{ propertyId: property.id }}
                className="block"
              >
                <h2 className="font-semibold text-lg">{property.name}</h2>
                <p className="text-gray-600">{property.address}</p>
                <span>{property.user.email}</span>
              </Link>
            </li>
          ))
        ) : (
          <p>Aucune propriété trouvée</p>
        )}
      </ul>
    </div>
  );
}
