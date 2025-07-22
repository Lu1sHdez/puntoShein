import axios from "axios";
import { API_URL } from "../../../ApiConexion";

/**
 * Lógica completa para validar y agregar producto al carrito.
 * Devuelve { ok, error, requiresLogin }
 */
export const procesarAgregarAlCarrito = async ({
  usuario_id,
  producto_id,
  talla_id,
  cantidad = 1,
  token,
}) => {
  // Validación de sesión
  if (!usuario_id || !token) {
    return { ok: false, requiresLogin: true };
  }

  // Validación de talla seleccionada
  if (!talla_id) {
    return { ok: false, error: "Debes seleccionar una talla antes de continuar." };
  }

  try {
    const res = await axios.post(
      `${API_URL}/api/carrito/agregar`,
      {
        usuario_id,
        producto_id,
        talla_id,
        cantidad,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { ok: true, data: res.data };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || "Error al agregar al carrito",
    };
  }
};
