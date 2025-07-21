// src/public/carrito/carritoService.js
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
export const obtenerCarritoUsuario = async (usuario_id) => {
  try {
    const response = await axios.get(`${API_URL}/api/carrito/${usuario_id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
};
