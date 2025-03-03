import axios from "axios";
import Swal from "sweetalert2"; // Importamos SweetAlert2

// Función para agregar productos al carrito
export const agregarCarrito = async (usuario, producto) => {
  if (!usuario || !usuario.id) {
    // Mostrar mensaje con SweetAlert2 si no está autenticado
    Swal.fire({
      icon: "warning",
      title: "Inicia sesión o regístrate",
      text: "Para agregar este producto al carrito, debes iniciar sesión o registrarte.",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  try {
    // Realizar la solicitud POST al backend para agregar al carrito
    const response = await axios.post(
      "http://localhost:4000/api/carrito/agregar",
      {
        usuario_id: usuario.id,
        producto_id: producto.id,
        cantidad: 1,
      },
      {
        withCredentials: true, // Asegura que las cookies se envíen con la solicitud
      }
    );

    // Mostrar mensaje de éxito con SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: response.data.message,
      confirmButtonText: "Aceptar",
    });
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
