import { useAuth } from "@/contexts/contextAuth";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { user } = useAuth();
  return (
    <main>
      Ceci est la page d'accueil
      {user ? (
        <Link to="/dashboard" className="underline block">
          J'accéde à mon dashboard
        </Link>
      ) : (
        <Link to="/login" className="underline block">
          Je veux me connecter
        </Link>
      )}
      <Link to="/properties" className="underline">
        Voir les propriétés
      </Link>
    </main>
  );
}
