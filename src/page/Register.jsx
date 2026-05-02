import styles from "./Auth.module.css";
import { useId, useState } from "react";
import { register } from "../util/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router";
import { AlertMessage } from "../components/ui/AlertMessage.jsx";

export function Register() {
  const usernameId = useId();
  const passwordId = useId();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (user) {
    return <Navigate to={`/u/${user.username}`} replace />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSymbol) {
      setErrorMessage(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.",
      );
      setLoading(false);
      return;
    }

    try {
      const response = await register(username, password);
      login({ username: response.username });
      navigate(`/u/${response.username}`, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.authContainer}>
      <h1>Registrarse</h1>

      <AlertMessage
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <form className={styles.authForm} onSubmit={handleRegister}>
        <div>
          <label htmlFor={usernameId}>Nombre de usuario</label>
          <input type="text" id={usernameId} name="username" required />
        </div>

        <div>
          <label htmlFor={passwordId}>Contraseña</label>
          <input type="password" id={passwordId} name="password" required />
        </div>

        <button disabled={loading} type="submit">
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </section>
  );
}

export default Register;
