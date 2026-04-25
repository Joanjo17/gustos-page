import { useState, useMemo, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside.js";
import { AddLike } from "../components/AddLike.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

import styles from "./Home.module.css";

const STORAGE_KEY = "mis-gustos";

export function Home() {
  const [likes, setLikes] = useLocalStorage(STORAGE_KEY, []);

  const [open, setOpen] = useState(false);
  const dialogRef = useRef();
  useClickOutside(dialogRef, () => {
    if (open) setOpen(false);
  });

  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingLike, setEditingLike] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(
      likes.flatMap((like) => like.categories).filter(Boolean),
    );
    return ["Todas", ...Array.from(set).sort()];
  }, [likes]);

  const filteredLikes = useMemo(() => {
    return likes.filter((like) => {
      const matchesCategory =
        activeCategory === "Todas" || like.categories.includes(activeCategory);

      const term = searchTerm.toLowerCase();
      const matchesSearch =
        like.name.toLowerCase().includes(term) ||
        like.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [likes, activeCategory, searchTerm]);

  const handleDeleteLike = (id) => {
    // Guardamos solo los gustos que no tengan el id a eliminar
    setLikes((likes) => likes.filter((like) => like.id !== id));
  };

  const handleEditLike = (like) => {
    setEditingLike(like);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setEditingLike(null);
  };
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Diario de gustos</h1>
        <p>Para que no te olvides de lo que te gusta y por qué.</p>
        <button className={styles.addButton} onClick={() => setOpen(true)}>
          Agregar gusto
        </button>
      </section>

      {open && (
        <AddLike
          refModal={dialogRef}
          addLike={(newLike) =>
            setLikes((prevLikes) => [...prevLikes, newLike])
          }
          closeModal={closeModal}
          likeToEdit={editingLike}
          updateLike={(updatedLike) => {
            setLikes((prevLikes) => {
              const likes = prevLikes.filter(
                (like) => like.id !== updatedLike.id,
              );

              return [...likes, updatedLike];
            });
          }}
        />
      )}

      <section className={styles.likesSection}>
        <div className={styles.sectionHeader}>
          <h2>Gustos agregados</h2>
          <span>{filteredLikes.length} gustos</span>
        </div>

        <div className={styles.controls}>
          <input
            name="search"
            type="text"
            placeholder="Buscar gustos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? styles.active : ""}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredLikes.length === 0 ? (
          <p className={styles.empty}>¡Prueba a añadir algún gusto!</p>
        ) : (
          <ul className={styles.likesList}>
            {filteredLikes.map((like) => (
              <li key={like.id} className={styles.likeCard}>
                <div className={styles.likeContent}>
                  {like.imageUrl && <img src={like.imageUrl} alt={like.name} />}

                  {like.categories.map((category, index) => (
                    <span key={`${category}-${index}`}>{category}</span>
                  ))}
                  <h3>{like.name}</h3>
                  <p>{like.description}</p>
                </div>

                <div className={styles.manageLike}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteLike(like.id)}
                  >
                    Eliminar
                  </button>

                  <button
                    className={styles.editButton}
                    onClick={() => handleEditLike(like)}
                  >
                    Editar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
