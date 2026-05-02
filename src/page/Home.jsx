import { NavLink } from "react-router";
import styles from "./Home.module.css";

export function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.hero}>
        <span className={styles.badge}>Tu diario personal</span>

        <h1>Guarda, ordena y comparte tus gustos.</h1>

        <p>
          Crea una lista con las cosas que te gustan, añade categorías, imágenes
          y compártela con quien quieras.
        </p>

        <div className={styles.actions}>
          <NavLink to="/register" className={styles.primaryButton}>
            Empezar ahora
          </NavLink>

          <NavLink to="/login" className={styles.secondaryButton}>
            Iniciar sesión
          </NavLink>
        </div>
      </div>

      <div className={styles.features}>
        <article>
          <h2>Organiza</h2>
          <p>Agrupa tus gustos por categorías para encontrarlos fácilmente.</p>
        </article>

        <article>
          <h2>Personaliza</h2>
          <p>Añade imágenes y descripciones para recordar por qué te gustan.</p>
        </article>

        <article>
          <h2>Comparte</h2>
          <p>Enseña tu lista pública a otras personas con tu perfil.</p>
        </article>
      </div>
    </section>
  );
}

export default Home;
