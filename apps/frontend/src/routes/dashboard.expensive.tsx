import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/expensive")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/expensive"!</div>;
}
