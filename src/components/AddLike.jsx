import { useState } from "react";
import styles from "./AddLike.module.css";

export function AddLike({ refModal, addLike, closeModal }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const handleAddLike = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const category = form.category.trim();
    const description = form.description.trim();

    if (!name || !category || !description) return;

    const newLike = {
      id: Date.now(),
      name,
      category,
      description,
    };
    //Añadimos el gusto a la lista.
    addLike(newLike);

    //Limpiamos los campos
    setForm({
      name: "",
      category: "",
      description: "",
    });

    closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div ref={refModal} className={styles.modal}>
        <button onClick={closeModal} className={styles.closeButton}>
          <span>✖</span>
        </button>
        <h2>Agregar gusto</h2>
        <form onSubmit={handleAddLike} className={styles.form}>
          <div>
            <input
              type="text"
              placeholder="Nombre"
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Categoria"
              id="category"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="¿Por qué te gusta?"
              id="description"
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
}
