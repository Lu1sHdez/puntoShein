// src/pages/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../ApiConexion";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const cerrarSesionPorExpiracion = async () => {
      try {
        // Llama al backend para limpiar cookies (opcional)
        await axios.post(`${API_URL}/api/autenticacion/logout`, {}, {
          withCredentials: true,
        });

        logout(); // Elimina token, datos del usuario, etc.

        // Redirige al inicio sin mostrar el mensaje
        navigate("/");
      } catch (error) {
        console.error("Error al cerrar sesión automáticamente:", error);
        navigate("/"); // Redirige en caso de error
      }
    };

    cerrarSesionPorExpiracion(); // Ejecuta el cierre de sesión
  }, [logout, navigate]);

  return null; // No muestra nada en pantalla
};

export default Logout;
