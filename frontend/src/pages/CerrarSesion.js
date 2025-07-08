//src\pages\CerrarSesion.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Para mostrar una alerta
import axios from "axios";
import useAuth from "../hooks/useAuth"; // Hook de autenticación
import { API_URL } from "../ApiConexion";


const CerrarSesion = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const cerrarSesion = async () => {
      try {
        await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });
        
        logout(); //Borra la autenticación

        Swal.fire({
          icon: "success",
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => navigate("/"), 2000); // Redirige después de 2 segundos
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al cerrar sesión",
          text: error.response?.data?.mensaje || "Ocurrió un error.",
        });
      }
    };

    cerrarSesion();
  }, [navigate, logout]);

  return null; // No renderiza nada
};

export default CerrarSesion;