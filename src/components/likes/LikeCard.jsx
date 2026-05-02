import { LikeImage } from "./LikeImage.jsx";
import styles from "./Likes.module.css";

export function LikeCard({ like, canManage, saving, onEdit, onDelete }) {
  return (
    <li className={styles.likeCard}>
      <div className={styles.likeContent}>
        {like.imageUrl && (
          <LikeImage src={like.imageUrl} alt={`Imagen de ${like.name}`} />
        )}

        {like.categories.map((category, index) => (
          <span key={`${category}-${index}`}>{category}</span>
        ))}

        <h3>{like.name}</h3>
        <p>{like.description}</p>
      </div>

      {canManage && (
        <div className={styles.manageLike}>
          <button
            aria-label={`Eliminar ${like.name}`}
            disabled={saving}
            className={styles.deleteButton}
            onClick={() => onDelete(like)}
          >
            Eliminar
          </button>

          <button
            className={styles.editButton}
            onClick={() => onEdit(like)}
            disabled={saving}
          >
            Editar
          </button>
        </div>
      )}
    </li>
  );
}
