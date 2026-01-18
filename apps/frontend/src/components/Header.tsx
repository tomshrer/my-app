import { useAuth } from "@/contexts/auth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg justify-between">
      <h1 className="text-xl font-semibold">
        {user ? `Connecté : ${user.email}` : "Non connecté"}
      </h1>
      {user && (
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      )}
    </header>
  );
}
