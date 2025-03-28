// src/utils/funtionProductos.js
import axios from "axios";
import { API_URL } from '../ApiConexion';


export const obtenerProductosPorFiltros = async (filtros) => {
  try {
    const params = new URLSearchParams(filtros).toString();
    const url = `${API_URL}/api/productos/filtrar?${params}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos con filtros:", error);
    return [];
  }
};


export const mostrarStock = (stock) => {
    if (stock === 0) {
      return {
        mensaje: "¡Sin stock!",
        color: "text-red-600",
        icono: (
          <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8Zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-4V7a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0Z"/>
          </svg>
        )
      };
    } else if (stock > 0 && stock <= 5) {
      return {
        mensaje: `¡Solo ${stock} disponibles!`,
        color: "text-orange-600",
        icono: (
          <svg className="w-5 h-5 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8Zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-4V7a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0Z"/>
          </svg>
        )
      };
    } else {
      return {
        mensaje: `Hay ${stock} en stock`,
        color: "text-green-600",
        icono: (
          <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8Zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-4V7a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0Z"/>
          </svg>
        )
      };
    }
  };