import { useState } from "react";
import styles from "./AddLike.module.css";

export function AddLike({
  refModal,
  addLike,
  closeModal,
  likeToEdit,
  updateLike,
}) {
  const [form, setForm] = useState({
    name: likeToEdit?.name ?? "",
    categories: likeToEdit?.categories?.join(", ") ?? "",
    description: likeToEdit?.description ?? "",
    imageUrl: likeToEdit?.imageUrl ?? "",
  });

  const handleAddLike = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const categories = form.categories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const description = form.description.trim();
    const imageUrl = form.imageUrl.trim();

    if (!name || categories.length === 0 || !description) return;

    let newLike = {
      name,
      categories,
      description,
      imageUrl,
    };

    if (!likeToEdit) {
      newLike.id = Date.now();
      //Añadimos el gusto a la lista.
      addLike(newLike);
    } else {
      newLike.id = likeToEdit.id;
      updateLike(newLike);
    }

    //Limpiamos los campos
    setForm({
      name: "",
      categories: "",
      description: "",
      imageUrl: "",
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
              placeholder="Categoria/s separadas por comas"
              id="categories"
              required
              value={form.categories}
              aria-details="Separar por comas"
              onChange={(e) => setForm({ ...form, categories: e.target.value })}
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
            <input
              type="text"
              placeholder="https://tuImagen.jpg"
              id="imageUrl"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
}
