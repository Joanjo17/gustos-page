// src/components/ui/AlertMessage.jsx
import styles from "./AlertMessage.module.css";

export function AlertMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className={styles.alert} role="alert">
      <span>{message}</span>

      <button type="button" onClick={onClose}>
        ✖
      </button>
    </div>
  );
}
