import { useState } from "react";
import styles from "./AddLike.module.css";

export function AddLike({
  refModal,
  addLike,
  closeModal,
  likeToEdit,
  updateLike,
  saving,
}) {
  const [form, setForm] = useState({
    name: likeToEdit?.name ?? "",
    categories: likeToEdit?.categories?.join(", ") ?? "",
    description: likeToEdit?.description ?? "",
    imageUrl: likeToEdit?.imageUrl ?? "",
  });

  const handleAddLike = async (event) => {
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

    try {
      if (!likeToEdit) {
        await addLike(newLike);
      } else {
        await updateLike({ ...newLike, id: likeToEdit.id });
      }
      //Limpiamos los campos
      setForm({
        name: "",
        categories: "",
        description: "",
        imageUrl: "",
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div ref={refModal} className={styles.modal}>
        <button
          type="button"
          onClick={closeModal}
          className={styles.closeButton}
          disabled={saving}
        >
          <span>✖</span>
        </button>
        <h2>{likeToEdit ? "Editar gusto" : "Agregar gusto"}</h2>
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
          <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : likeToEdit ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>
    </div>
  );
}
