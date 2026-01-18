import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/invoices/$invoiceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { invoiceId } = Route.useParams();

  return (
    <div>
      <h1 className="text-xl font-bold">Invoice: {invoiceId}</h1>

      <p className="mt-2 text-gray-500">
        This is the page for invoice <strong>{invoiceId}</strong>
      </p>
    </div>
  );
}
