// src/hooks/useLikes.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loadLikesByUser } from "../util/api.js";
import { useApiFetch } from "./useApiFetch.js";

export function useLikes(userOwner) {
  const navigate = useNavigate();
  const apiFetch = useApiFetch();

  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadLikes = async () => {
      try {
        setLoading(true);
        const data = await loadLikesByUser(userOwner);
        setLikes(data.likes);
      } catch (error) {
        console.error(error);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadLikes();
  }, [userOwner, navigate]);

  const addLike = async (newLike) => {
    if (saving) {
      throw new Error("Ya hay una operación en curso.");
    }

    setSaving(true);
    setErrorMessage("");

    try {
      const response = await apiFetch("/api/v1/likes", {
        method: "POST",
        body: JSON.stringify(newLike),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el gusto.");
      }

      const data = await response.json();
      setLikes((prevLikes) => [...prevLikes, data]);

      return data;
    } catch (error) {
      console.error("Error al agregar el gusto:", error);
      setErrorMessage("No se pudo agregar el gusto. Inténtalo de nuevo.");
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const updateLike = async (updatedLike) => {
    if (saving) {
      throw new Error("Ya hay una operación en curso.");
    }

    setSaving(true);
    setErrorMessage("");

    try {
      const response = await apiFetch(`/api/v1/likes/${updatedLike.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedLike),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el gusto.");
      }

      setLikes((prevLikes) =>
        prevLikes.map((like) =>
          like.id === updatedLike.id ? updatedLike : like,
        ),
      );

      return updatedLike;
    } catch (error) {
      console.error("Error al actualizar el gusto:", error);
      setErrorMessage("No se pudo actualizar el gusto. Inténtalo de nuevo.");
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const deleteLike = async (id) => {
    if (saving) return;

    setSaving(true);
    setErrorMessage("");

    try {
      const response = await apiFetch(`/api/v1/likes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el gusto.");
      }

      setLikes((prevLikes) => prevLikes.filter((like) => like.id !== id));
    } catch (error) {
      console.error("Error al eliminar el gusto:", error);
      setErrorMessage("No se pudo eliminar el gusto. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  return {
    likes,
    loading,
    saving,
    errorMessage,
    setErrorMessage,
    addLike,
    updateLike,
    deleteLike,
  };
}
