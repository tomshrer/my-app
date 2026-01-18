import { tuyau } from "@/tuyau";

export type Property = {
  id: string;
  name: string;
  address: string;
};

export async function getProperties() {
  const result = await tuyau.properties.$get();
  return result.data;
}

export async function getProperty(id: string): Promise<Property> {
  const response = await fetch(`http://localhost:3333/properties/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}

export async function createProperty(data: { name: string; address: string }) {
  const response = await fetch("http://localhost:3333/properties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create property");
  }

  return response.json();
}

export async function deleteProperty(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3333/properties/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete property");
  }
}

export async function updateProperty(
  id: string,
  data: { name: string; address: string }
): Promise<Property> {
  const response = await fetch(`http://localhost:3333/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update property");
  }

  return response.json();
}
