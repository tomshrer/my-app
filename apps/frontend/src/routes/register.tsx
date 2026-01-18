import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("http://localhost:3333/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "Error");
      setLoading(false);
      return;
    }

    alert("Account successfully created");
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center md:h-screen">
      <div className="space-y-2 w-full sm:max-w-md">
        <h2 className="">Create an account</h2>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col border border-zinc-100 rounded p-4 space-y-4">
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="py-2 px-4 rounded-lg border border-zinc-100"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 rounded-lg border border-zinc-100"
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 rounded-lg border border-zinc-100"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 mt-2"
          >
            {loading ? "..." : "Create an account"}
          </button>
        </form>
      </div>
    </div>
  );
}
