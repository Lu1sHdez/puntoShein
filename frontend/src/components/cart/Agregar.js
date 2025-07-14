// src/components/cart/Agregar.js
import Swal from "sweetalert2";
import axios from "axios";
import { mostrarNotificacion } from "../../Animations/NotificacionSwal";
import { API_URL } from "../../ApiConexion";

mostrarNotificacion();
// Función para agregar productos al carrito
const agregarCarrito = async (usuario, producto) => {
  if (!usuario || !usuario.id) {
    Swal.fire({
      title: "Necesitas iniciar sesión",
      text: "Para agregar productos al carrito, debes iniciar sesión o registrarte.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Iniciar sesión",
      cancelButtonText: "Registrarse",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "/registro";
      }
    });
    
    return;
  }

  try {
    await axios.post(
      `${API_URL}/api/carrito/agregar`,
      {
        usuario_id: usuario.id,
        producto_id: producto.id,
        cantidad: 1,
      },
      {
        withCredentials: true,
      }
    );

  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Hubo un problema al agregar el producto al carrito",
      confirmButtonText: "Aceptar",
    });
  }
};

export default agregarCarrito; // Exportación por defecto
