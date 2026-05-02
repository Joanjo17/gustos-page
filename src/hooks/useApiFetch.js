import { API_URL } from "../constants.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCallback } from "react";

export function useApiFetch() {
  const { csrfToken, logout } = useAuth();

  const apiFetch = useCallback(
    async function fetchConReintento(endpoint, options = {}, retry = true) {
      let response = await fetch(API_URL + endpoint, {
        ...options,
        credentials: "include",
        headers: {
          ...(options.body ? { "Content-Type": "application/json" } : {}),
          ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
          ...options.headers,
        },
      });

      // Si la petición fue exitosa o si falló por CUALQUIER OTRA COSA que no sea un 401,
      // devolvemos la respuesta tal cual (el componente que la llame decidirá qué hacer con ese 404 o 500).
      if (response.ok || response.status !== 401) {
        return response;
      }

      // SI LLEGAMOS AQUÍ, ES 100% SEGURO QUE ES UN ERROR 401 (no autenticado)
      if (!retry) {
        // No reintentamos para evitar loops, devolvemos un error.
        throw new Error("Error al realizar la solicitud.");
      }

      const refreshResponse = await fetch(API_URL + "/api/v1/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": csrfToken,
        },
      });

      if (!refreshResponse.ok) {
        // Logout por no tener sesión válida
        logout();
        throw new Error("Sesión expirada. Por favor, inicia sesión de nuevo.");
      }

      // Reintentar la solicitud original sin permitir más reintentos
      return fetchConReintento(endpoint, options, false);
    },
    [csrfToken, logout],
  );

  return apiFetch;
}
