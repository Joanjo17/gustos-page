import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { useApiFetch } from "../hooks/useApiFetch.js";
import { HeartIcon, OnOffIcon } from "./HeaderIcons.jsx";

export function Header() {
  const { user, logout } = useAuth();
  return (
    <header>
      <h2>
        <NavLink to="/">Diario de gustos</NavLink>
      </h2>

      <div>
        <nav>
          {user && (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : ""
                }
                to={`/u/${user.username}`}
              >
                Mis Gustos
                <HeartIcon />
              </NavLink>
            </>
          )}
        </nav>

        <AuthHeaderSection user={user} logout={logout} />
      </div>
    </header>
  );
}

export function AuthHeaderSection({ user, logout }) {
  const navigate = useNavigate();
  const apiFetch = useApiFetch();
  const handleLogout = async () => {
    try {
      await apiFetch("/api/v1/auth/logout", { method: "POST" });
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="auth-header-controls">
      {user ? (
        <>
          <button onClick={handleLogout}>
            <OnOffIcon />
          </button>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            to="/login"
          >
            Iniciar sesión
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "nav-link-active" : "")}
          >
            Registrarse
          </NavLink>
        </>
      )}
    </div>
  );
}

export default Header;
