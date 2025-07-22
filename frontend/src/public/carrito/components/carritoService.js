import axios from "axios";
import { API_URL } from "../../../ApiConexion";

export const obtenerCarritoUsuario = async (usuarioId) => {
  const res = await axios.get(`${API_URL}/api/carrito/${usuarioId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const vaciarCarritoUsuario = async (usuarioId) => {
    const res = await axios.delete(`${API_URL}/api/carrito/vaciar`, {
      data: { usuario_id: usuarioId },
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    return res.data;
  };