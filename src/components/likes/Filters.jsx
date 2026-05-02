import styles from "./Likes.module.css";

export function Filters({
  categories,
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className={styles.controls}>
      <input
        aria-label="Buscar gustos por nombre o descripción"
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
  );
}
