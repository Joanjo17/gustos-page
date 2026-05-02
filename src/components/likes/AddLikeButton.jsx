import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Likes.module.css";

export function AddLikeButton({ onClick, userOwner }) {
  const { user } = useAuth();

  if (user?.username !== userOwner) return null;

  return (
    <button className={styles.addButton} onClick={onClick}>
      Agregar gusto
    </button>
  );
}
