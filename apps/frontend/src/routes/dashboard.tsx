import { useAuth } from "@/contexts/contextAuth";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, loading, error, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!user) return;

  return (
    <div>
      <header>
        Je suis connecté,{" "}
        <button onClick={logout} className="underline">
          je veux me déconnecter
        </button>
      </header>
      <Outlet />
    </div>
  );
}
