import styles from "./Likes.module.css";
import { useState } from "react";

export function LikeImage({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <div className={styles.imagePlaceholder}>Sin imagen</div>;
  }

  return (
    <img src={src} alt={alt} onError={() => setHasError(true)} loading="lazy" />
  );
}
