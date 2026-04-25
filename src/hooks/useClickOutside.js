import { useEffect } from "react";

export function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      // Si el click NO está dentro del elemento
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}
