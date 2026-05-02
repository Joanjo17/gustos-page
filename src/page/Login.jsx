import styles from "./Auth.module.css";
import { login as loginUser } from "../util/api";
import { useId, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router";

export function Login() {
  const usernameId = useId();
  const passwordId = useId();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={"/u/" + user.username} />;
  }

  // La contraseña debe cumplir unos ciertos criterios de seguridad, como mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula y un número
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();

    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      alert("La contraseña debe contener al menos una mayúscula y un número");
      setLoading(false);
      return;
    }

    try {
      console.log("Iniciando sesión para el usuario:", username);
      const response = await loginUser(username, password);
      login({ username: response.username });
      navigate("/u/" + username);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={styles.authContainer}>
      <h1>Iniciar Sesión</h1>
      <form className={styles.authForm} onSubmit={handleLogin}>
        <div>
          <label htmlFor={usernameId}>Nombre de usuario</label>
          <input type="text" id={usernameId} name="username" required />
        </div>
        <div>
          <label htmlFor={passwordId}>Contraseña</label>
          <input type="password" id={passwordId} name="password" required />
        </div>
        <button disabled={loading} type="submit">
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </section>
  );
}

export default Login;
