import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Filters } from "./Filters.jsx";
import { LikeCard } from "./LikeCard.jsx";
import styles from "./Likes.module.css";

export function LikesList({ userOwner, likes, deleteLike, editLike, saving }) {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    const set = new Set(
      likes.flatMap((like) => like.categories).filter(Boolean),
    );

    return ["Todas", ...Array.from(set).sort()];
  }, [likes]);

  const filteredLikes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return likes.filter((like) => {
      const matchesCategory =
        activeCategory === "Todas" || like.categories.includes(activeCategory);

      const matchesSearch =
        !term ||
        like.name.toLowerCase().includes(term) ||
        like.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [likes, activeCategory, searchTerm]);

  const canManage = userOwner === user?.username;

  return (
    <section className={styles.likesSection}>
      <div className={styles.sectionHeader}>
        <h2>Gustos agregados</h2>
        <span>{filteredLikes.length} gustos</span>
      </div>

      <Filters
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {filteredLikes.length === 0 ? (
        <p className={styles.empty}>
          {likes.length === 0
            ? "Todavía no hay gustos publicados."
            : "No hay gustos que coincidan con esta búsqueda."}
        </p>
      ) : (
        <ul className={styles.likesList}>
          {filteredLikes.map((like) => (
            <LikeCard
              key={like.id}
              like={like}
              canManage={canManage}
              saving={saving}
              onEdit={editLike}
              onDelete={deleteLike}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
