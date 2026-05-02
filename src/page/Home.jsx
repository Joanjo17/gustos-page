import styles from "./Home.module.css";

export function Home() {
  return (
    <section className={styles.container}>
      <h1>Bienvenido a Lista de Gustos</h1>
      <p>
        Aquí puedes crear tu propia lista de gustos, compartirla con tus amigos
        y descubrir los gustos de otras personas.
      </p>
    </section>
  );
}

export default Home;
