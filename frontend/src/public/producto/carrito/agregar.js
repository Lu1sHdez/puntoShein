// src/public/carrito/agregar.js
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
export const agregarAlCarrito = async ({ producto_id, usuario_id, cantidad = 1,talla_id }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/carrito/agregar`,
      {
        producto_id,
        usuario_id,
        cantidad,
        talla_id,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    throw error;
  }
};
