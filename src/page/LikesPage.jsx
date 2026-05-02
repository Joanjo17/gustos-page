import { useCallback, useRef, useState } from "react";
import { useParams } from "react-router";
import { useClickOutside } from "../hooks/useClickOutside.js";
import { useLikes } from "../hooks/useLikes.js";
import { AddLike } from "../components/likes/AddLike.jsx";
import { AddLikeButton } from "../components/likes/AddLikeButton.jsx";
import { LikesList } from "../components/likes/LikesList.jsx";
import { AlertMessage } from "../components/ui/AlertMessage.jsx";
import { ConfirmDialog } from "../components/ui/ConfirmDialog.jsx";
import { LoadingPage } from "./LoadingPage.jsx";
import styles from "./LikesPage.module.css";

export function LikesPage() {
  const { userOwner } = useParams();

  const {
    likes,
    loading,
    saving,
    errorMessage,
    setErrorMessage,
    addLike,
    updateLike,
    deleteLike,
  } = useLikes(userOwner);

  const [open, setOpen] = useState(false);
  const [editingLike, setEditingLike] = useState(null);
  const [likeToDelete, setLikeToDelete] = useState(null);

  const dialogRef = useRef();

  const closeModal = useCallback(() => {
    setOpen(false);
    setEditingLike(null);
  }, []);

  useClickOutside(dialogRef, () => {
    if (open && !saving) closeModal();
  });

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Gustos de {userOwner}</h1>

        <div className={styles.heroActions}>
          <AddLikeButton userOwner={userOwner} onClick={() => setOpen(true)} />
        </div>
      </section>

      <AlertMessage
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      {open && (
        <AddLike
          refModal={dialogRef}
          addLike={addLike}
          closeModal={closeModal}
          likeToEdit={editingLike}
          updateLike={updateLike}
          saving={saving}
        />
      )}

      <LikesList
        userOwner={userOwner}
        likes={likes}
        deleteLike={(like) => setLikeToDelete(like)}
        editLike={(like) => {
          setEditingLike(like);
          setOpen(true);
        }}
        saving={saving}
      />

      <ConfirmDialog
        open={Boolean(likeToDelete)}
        title="Eliminar gusto"
        message={
          likeToDelete
            ? `¿Seguro que quieres eliminar "${likeToDelete.name}"?`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={saving}
        onCancel={() => setLikeToDelete(null)}
        onConfirm={async () => {
          if (!likeToDelete) return;

          await deleteLike(likeToDelete.id);
          setLikeToDelete(null);
        }}
      />
    </>
  );
}

export default LikesPage;
