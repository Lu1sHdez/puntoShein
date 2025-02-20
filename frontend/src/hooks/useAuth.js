import { useState, useEffect } from "react";

const useAuth = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const verificarSesion = () => {
      setUsuarioAutenticado(!!localStorage.getItem("token"));
    };

    // Escuchar cambios en el localStorage
    window.addEventListener("storage", verificarSesion);

    return () => {
      window.removeEventListener("storage", verificarSesion);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUsuarioAutenticado(true);
    window.dispatchEvent(new Event("storage")); // Notificar cambios globales
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuarioAutenticado(false);
    window.dispatchEvent(new Event("storage")); // Notificar cambios globales
  };

  return { usuarioAutenticado, login, logout };
};

export default useAuth;