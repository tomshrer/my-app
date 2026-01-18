export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3333/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  const res = await fetch("http://localhost:3333/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }
}

export async function fetchCurrentUser() {
  const res = await fetch("http://localhost:3333/me", {
    credentials: "include",
  });
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
