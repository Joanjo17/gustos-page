import { API_URL } from "../constants";

// Función para obtener el token CSRF
// Excecion si no se ha podido obtener el token
export const getCsrfToken = async () => {
  const response = await fetch(API_URL + "/api/v1/auth/csrf", {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener el token CSRF");
  const data = await response.json();
  return data.token;
};

// Función para obtener los datos del usuario autenticado
// Excecion si no se ha podido obtener el usuario (no autenticado o error en la solicitud)
export const getUserMe = async (csrfToken, retry = true) => {
  const userResponse = await fetch(API_URL + "/api/v1/users/me", {
    credentials: "include",
  });
  if (userResponse.ok) {
    return await userResponse.json();
  }
  // Si da error 401 (Token caducado) y es nuestro primer intento (retry es true)
  if (userResponse.status === 401 && retry) {
    try {
      // Intentamos refrescar las cookies de sesión
      const refreshResponse = await fetch(API_URL + "/api/v1/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": csrfToken,
        },
      });

      // Si el refresh tiene éxito, volvemos a intentar pedir el usuario, sin reintentos.
      if (refreshResponse.ok) {
        return await getUserMe(csrfToken, false);
      }
    } catch (refreshError) {
      console.error("Fallo de red al intentar refrescar:", refreshError);
    }
  }

  // Si llegamos aquí es porque no era un 401, el refresh falló, o ya reintentamos y volvió a fallar
  throw new Error("Error de autenticación");
};

export const loadLikesByUser = async (username) => {
  const response = await fetch(API_URL + "/api/v1/likes/user/" + username, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Error al cargar los gustos");
  }
  return await response.json();
};

export const login = async (username, password) => {
  const response = await fetch(API_URL + "/api/v1/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Usuario o contraseña incorrectos");
  }
  return await response.json();
};

export const register = async (username, password) => {
  const response = await fetch(API_URL + "/api/v1/auth/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Error al registrar el usuario");
  }
  return await response.json();
};
