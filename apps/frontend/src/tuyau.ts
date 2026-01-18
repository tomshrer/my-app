import { createTuyau } from "@tuyau/client";
import { api } from "@my-app/server/api";

export const tuyau = createTuyau({
  api,
  baseUrl: "http://localhost:3333",
  credentials: 'include'
});
