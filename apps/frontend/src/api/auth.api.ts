const API_URL = "http://localhost:3333";

export async function register() {
  const response = await fetch(`${API_URL}/auth/register`, {});
}

export async function login(payload) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}
