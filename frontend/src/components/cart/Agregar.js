// src/components/cart/Agregar.js
import Swal from "sweetalert2";
import axios from "axios";
import { mostrarNotificacion } from "../../Animations/NotificacionSwal";

mostrarNotificacion();
// Función para agregar productos al carrito
const agregarCarrito = async (usuario, producto) => {
  if (!usuario || !usuario.id) {
    Swal.fire({
      icon: "warning",
      title: "Inicia sesión o regístrate",
      text: "Para agregar este producto al carrito, debes iniciar sesión o registrarte.",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:4000/api/carrito/agregar",
      {
        usuario_id: usuario.id,
        producto_id: producto.id,
        cantidad: 1,
      },
      {
        withCredentials: true,
      }
    );

    mostrarNotificacion("success", "Producto agregado al carrito");

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
