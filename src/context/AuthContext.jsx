import { createContext } from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import { getUserMe, getCsrfToken } from "../util/api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const login = useCallback((user) => {
    setUser(user);
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    setCsrfToken(null);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      console.log("Inicializando autenticación...");
      try {
        const tokenData = await getCsrfToken();
        setCsrfToken(tokenData);

        const userData = await getUserMe(tokenData);
        setUser(userData);
      } catch (error) {
        console.error("Error initAuth:", error);
      } finally {
        setLoadingAuth(false);
        console.log("Autenticación inicializada.");
      }
    };
    initAuth();
  }, []);

  const value = {
    user,
    setUser,
    csrfToken,
    setCsrfToken,
    login,
    logout,
    loadingAuth,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
