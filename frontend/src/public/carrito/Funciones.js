//src\components\cart\Funciones.js
import axios from "axios";
import { API_URL } from "../../ApiConexion";

export const obtenerCarrito = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/api/carrito/${usuarioId}`, {
      withCredentials: true,
    });
    return response.data || [];
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
};

// Actualizar la cantidad de un producto en el carrito
export const actualizarCantidad = async (usuarioId, productoId, cantidad) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/carrito/actualizarCantidad`,
      { usuario_id: usuarioId, producto_id: productoId, cantidad },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la cantidad:", error);
    throw error;
  }
};

// Eliminar un producto del carrito
export const eliminarDelCarrito = async (usuarioId, productoId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/carrito/eliminar`, {
      data: { usuario_id: usuarioId, producto_id: productoId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    throw error;
  }
};

// Vaciar el carrito
export const vaciarCarrito = async (usuarioId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/carrito/vaciar`, {
      data: { usuario_id: usuarioId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    throw error;
  }
};


export const obtenerCantidad = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/api/carrito/cantidad/${usuarioId}`, {
      withCredentials: true,
    });
    return response.data.totalCantidad || 0; // Retorna la cantidad total de productos o 0 si está vacío
  } catch (error) {
    console.error("Error al obtener la cantidad total de productos:", error);
    throw error;
  }
};